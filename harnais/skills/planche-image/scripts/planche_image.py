#!/usr/bin/env python3
"""Planches dessinées par un modèle d'image, repérées par la vision, détourées.

Le modèle de langage ne dessine pas : il écrit un plan court par scène
(content/design/planches/Sxx.json : dessin, éléments à repérer, révélations,
textes, mises en évidence). Ce script fait le reste, toutes les scènes en
parallèle :

  dessiner   plan.dessin → Sxx.png (modèle d'image, sans aucun texte ; une
             image de référence tient le même style d'une scène à l'autre)
  reperer    Sxx.png + plan.elements → Sxx.boites.json (vision : une boîte par
             élément, en px de composition 1920 × 1080)
  detourer   Sxx.png → Sxx.webp (le papier devient transparent : la feuille de
             la signature et son carroyage se voient dessous)
  tout       les trois, dans l'ordre, par scène

Usage :
  python3 planche_image.py tout --planches content/design/planches [--scenes S01 S02]
                                [--ref S01.png] [--etape "FME001-M01-L01 planches"]

Clés : injectées par le proxy de l'environnement (jamais dans un fichier ni en
argument). Mesures : une ligne par appel dans harnais/mesures/appels.csv.
"""
from __future__ import annotations

import argparse
import base64
import csv
import io
import json
import os
import ssl
import sys
import time
import urllib.error
import urllib.request
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime
from pathlib import Path

ICI = Path(__file__).resolve().parent
JOURNAL = ICI.parents[2] / "mesures" / "appels.csv"
API = "https://generativelanguage.googleapis.com/v1beta/models/{}:generateContent"
IMAGE = os.environ.get("PLANCHE_MODELE_IMAGE", "gemini-3-pro-image")
VISION = os.environ.get("PLANCHE_MODELE_VISION", "gemini-3.5-flash")
W, H = 1920, 1080

STYLE = """Flat vector illustration in the style of a printed topographic map sheet (Swiss or IGN cartography), seen from above or as simple flat pictograms.
Background: ONE flat uniform color #F1F3EC everywhere, edge to edge. No paper texture, no border, no frame, no grid, no graticule, no margin decoration, no compass, no scale bar, no shadow, no gradient, no 3D.
Ink lines #23281F, crisp, 3 px, sharp corners. Use only these map colors: water fill #BFD5E6, vegetation #6E8B4E and #D3DFC3, relief contour lines brown #B08A62, reading routes blue #2F6DA8 (round line caps), writing routes red #C4472B (round line caps), missing piece gold #C99700 with fill #FBF1C8.
Cards and sheets are flat pale rectangles #FBFCF8 with a 2 px ink outline. People are small flat ink silhouettes, like map scale figures.
ABSOLUTELY NO TEXT anywhere: no letters, no numbers, no words, no labels, no logos, no signatures. Code adds all text later.
Keep these areas completely empty (only the background color): the top 20% of the image, the bottom 19% of the image, and the lower right corner (right 26% of the width, from 58% of the height down).
Leave generous empty space around each element: labels will be placed above or below them.
16:9 landscape composition."""

REF = "Use the reference image only for its visual style (same line weight, same colors, same flat cards, same silhouettes, same empty background). Draw a NEW composition as described, not the reference one."


def ssl_ctx() -> ssl.SSLContext:
    ca = os.environ.get("SSL_CERT_FILE") or os.environ.get("REQUESTS_CA_BUNDLE")
    return ssl.create_default_context(cafile=ca) if ca and Path(ca).exists() else ssl.create_default_context()


def journal(etape: str, modele: str, secondes: float, statut: str, entree: int = 0, sortie: int = 0) -> None:
    JOURNAL.parent.mkdir(parents=True, exist_ok=True)
    nouveau = not JOURNAL.exists()
    with JOURNAL.open("a", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        if nouveau:
            w.writerow(["date", "etape", "alias", "fournisseur", "modele", "entree", "sortie", "secondes", "cout_estime", "statut"])
        w.writerow([datetime.now().isoformat(timespec="seconds"), etape, modele, "gemini", modele, entree, sortie, round(secondes, 1), "", statut])


def appel(modele: str, corps: dict, etape: str) -> dict:
    t0 = time.time()
    req = urllib.request.Request(API.format(modele), data=json.dumps(corps).encode(), headers={"content-type": "application/json"})
    for essai in range(3):
        try:
            with urllib.request.urlopen(req, context=ssl_ctx(), timeout=300) as r:
                d = json.loads(r.read())
            u = d.get("usageMetadata", {})
            journal(etape, modele, time.time() - t0, "ok", u.get("promptTokenCount", 0), u.get("candidatesTokenCount", 0))
            return d
        except urllib.error.HTTPError as e:
            msg = e.read()[:300].decode(errors="replace")
            if e.code in (429, 500, 503) and essai < 2:
                time.sleep(4 * (essai + 1))
                continue
            journal(etape, modele, time.time() - t0, f"http {e.code}")
            raise RuntimeError(f"{modele} : erreur {e.code} : {msg}") from None
    raise RuntimeError("inaccessible")


def b64(p: Path) -> dict:
    return {"inline_data": {"mime_type": "image/png", "data": base64.b64encode(p.read_bytes()).decode()}}


def dessiner(plan: dict, dossier: Path, ref: Path | None, etape: str) -> Path:
    sid = plan["scene"]
    parts: list[dict] = []
    if ref and ref.exists() and ref.name != f"{sid}.png":
        parts += [b64(ref), {"text": REF}]
    parts.append({"text": STYLE + "\n\nComposition:\n" + plan["dessin"]})
    corps = {"contents": [{"parts": parts}], "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "16:9"}}}
    d = appel(IMAGE, corps, f"{etape} dessin {sid}")
    for c in d.get("candidates", []):
        for p in c.get("content", {}).get("parts", []):
            data = (p.get("inlineData") or p.get("inline_data") or {}).get("data")
            if data:
                out = dossier / f"{sid}.png"
                from PIL import Image
                img = Image.open(io.BytesIO(base64.b64decode(data))).convert("RGB").resize((W, H), Image.LANCZOS)
                img.save(out)
                return out
    raise RuntimeError(f"{sid} : pas d'image dans la réponse ({json.dumps(d)[:300]})")


def reperer(plan: dict, dossier: Path, etape: str) -> Path:
    sid = plan["scene"]
    png = dossier / f"{sid}.png"
    liste = "\n".join(f"- {k}: {v}" for k, v in plan["elements"].items())
    invite = (
        "Locate each element of this illustration. Return a JSON array, one object per element id listed below, "
        '{"id": "<id>", "box_2d": [ymin, xmin, ymax, xmax]} normalized to 0-1000, tight around the drawn pixels of that element '
        "(include its whole outline, nothing of its neighbours). If an element is absent, return box_2d null.\n" + liste
    )
    corps = {"contents": [{"parts": [b64(png), {"text": invite}]}], "generationConfig": {"responseMimeType": "application/json", "temperature": 0}}
    d = appel(VISION, corps, f"{etape} reperage {sid}")
    texte = "".join(p.get("text", "") for c in d.get("candidates", []) for p in c.get("content", {}).get("parts", []))
    boites = {}
    for o in json.loads(texte):
        b = o.get("box_2d")
        if not b:
            continue
        y0, x0, y1, x1 = b
        boites[o["id"]] = [round(x0 * W / 1000), round(y0 * H / 1000), round((x1 - x0) * W / 1000), round((y1 - y0) * H / 1000)]
    manque = [k for k in plan["elements"] if k not in boites]
    out = dossier / f"{sid}.boites.json"
    out.write_text(json.dumps({"scene": sid, "boites": boites, "absents": manque}, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    return out


def detourer(sid: str, dossier: Path) -> Path:
    """Papier → transparent : distance à la couleur dominante du bord, rampe douce."""
    from PIL import Image
    import numpy as np

    img = np.asarray(Image.open(dossier / f"{sid}.png").convert("RGB")).astype(np.float32)
    bord = np.concatenate([img[:12].reshape(-1, 3), img[-12:].reshape(-1, 3), img[:, :12].reshape(-1, 3), img[:, -12:].reshape(-1, 3)])
    fond = np.median(bord, axis=0)
    dist = np.sqrt(((img - fond) ** 2).sum(axis=2))
    alpha = np.clip((dist - 10) / 22, 0, 1)
    # Calques de couleur (plan « calques » : élément → couleur, ex. routes de
    # lecture bleues) : les pixels proches de la couleur, dans la boîte de
    # l'élément, passent dans leur propre image et quittent l'image de base
    plan = json.loads((dossier / f"{sid}.json").read_text(encoding="utf-8"))
    boites = json.loads((dossier / f"{sid}.boites.json").read_text(encoding="utf-8"))["boites"]
    for el, hexa in (plan.get("calques") or {}).items():
        cible = np.array([int(hexa[i:i + 2], 16) for i in (1, 3, 5)], dtype=np.float32)
        proche = np.sqrt(((img - cible) ** 2).sum(axis=2)) < 75
        dans = np.zeros(proche.shape, bool)
        x, y, w, h = boites.get(el, [0, 0, W, H])
        dans[max(0, y - 8):y + h + 8, max(0, x - 8):x + w + 8] = True
        m = proche & dans
        # dilatation de 2 px : les bords adoucis du trait suivent la couleur
        for _ in range(2):
            m = m | np.roll(m, 1, 0) | np.roll(m, -1, 0) | np.roll(m, 1, 1) | np.roll(m, -1, 1)
        m = m & dans & (alpha > 0)
        calque = np.dstack([img, np.where(m, alpha, 0) * 255]).astype(np.uint8)
        Image.fromarray(calque, "RGBA").save(dossier / f"{sid}-{el}.webp", "WEBP", quality=88, method=6)
        alpha = np.where(m, 0, alpha)
    rgba = np.dstack([img, alpha * 255]).astype(np.uint8)
    out = dossier / f"{sid}.webp"
    Image.fromarray(rgba, "RGBA").save(out, "WEBP", quality=88, method=6)
    return out


def une_scene(plan_path: Path, ref: Path | None, etape: str, etapes: list[str]) -> str:
    plan = json.loads(plan_path.read_text(encoding="utf-8"))
    sid = plan["scene"]
    dossier = plan_path.parent
    t0 = time.time()
    if "dessiner" in etapes:
        dessiner(plan, dossier, ref, etape)
    t1 = time.time()
    if "reperer" in etapes:
        reperer(plan, dossier, etape)
    t2 = time.time()
    if "detourer" in etapes:
        detourer(sid, dossier)
    absents = json.loads((dossier / f"{sid}.boites.json").read_text())["absents"] if (dossier / f"{sid}.boites.json").exists() else []
    return f"{sid} : dessin {t1 - t0:.1f} s, repérage {t2 - t1:.1f} s, détourage {time.time() - t2:.1f} s" + (f" ; absents : {', '.join(absents)}" if absents else "")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("commande", choices=["tout", "dessiner", "reperer", "detourer"])
    ap.add_argument("--planches", type=Path, required=True)
    ap.add_argument("--scenes", nargs="*")
    ap.add_argument("--ref", type=Path)
    ap.add_argument("--etape", default="planches image")
    a = ap.parse_args()
    plans = sorted(p for p in a.planches.glob("S[0-9][0-9].json"))
    if a.scenes:
        plans = [p for p in plans if p.stem in a.scenes]
    etapes = ["dessiner", "reperer", "detourer"] if a.commande == "tout" else [a.commande]
    t0 = time.time()
    with ThreadPoolExecutor(max_workers=8) as ex:
        futs = {ex.submit(une_scene, p, a.ref, a.etape, etapes): p.stem for p in plans}
        ok = True
        for f, sid in futs.items():
            try:
                print(f.result(), flush=True)
            except Exception as e:  # noqa: BLE001
                ok = False
                print(f"{sid} : ÉCHEC {e}", flush=True)
    print(f"{len(plans)} scène(s) en {time.time() - t0:.1f} s")
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
