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
# Résolution du dessin : « 4K » (5504 × 3072, gardé à 3840 × 2160, net sur un écran haute définition).
# Sans réglage, le modèle renvoie environ 1376 × 768 : agrandi à 1920 px, l'image est floue et pixelisée.
TAILLE = os.environ.get("PLANCHE_TAILLE", "4K")
SOURCE_W, SOURCE_H = 3840, 2160

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


def style_du_programme(style: Path | None) -> str:
    """Signature d'image du programme (design/style-image.md : bloc ```style```), sinon le style intégré."""
    if style and style.exists():
        t = style.read_text(encoding="utf-8")
        if "```style" in t:
            return t.split("```style", 1)[1].split("```", 1)[0].strip()
    return STYLE


def cle_dessin(texte: str, ref: Path | None) -> str:
    import hashlib
    h = hashlib.sha256((IMAGE + "\n" + TAILLE + "\n" + texte).encode())
    if ref and ref.exists():
        h.update(ref.read_bytes())
    return h.hexdigest()[:16]


def dessiner(plan: dict, dossier: Path, ref: Path | None, etape: str, style: Path | None = None, forcer: bool = False) -> Path:
    sid = plan["scene"]
    parts: list[dict] = []
    if ref and ref.exists() and ref.name != f"{sid}.png":
        parts += [b64(ref), {"text": REF}]
    else:
        ref = None
    texte = style_du_programme(style) + "\n\nComposition:\n" + plan["dessin"]
    parts.append({"text": texte})
    # Cache : même modèle, même invite, même référence → image gardée, aucun appel
    cle = cle_dessin(texte, ref)
    fcle = dossier / f"{sid}.cle"
    if not forcer and (dossier / f"{sid}.png").exists() and fcle.exists() and fcle.read_text().strip() == cle:
        return dossier / f"{sid}.png"
    corps = {"contents": [{"parts": parts}], "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": "16:9", "imageSize": TAILLE}}}
    d = appel(IMAGE, corps, f"{etape} dessin {sid}")
    for c in d.get("candidates", []):
        for p in c.get("content", {}).get("parts", []):
            data = (p.get("inlineData") or p.get("inline_data") or {}).get("data")
            if data:
                out = dossier / f"{sid}.png"
                from PIL import Image
                img = Image.open(io.BytesIO(base64.b64decode(data))).convert("RGB").resize((SOURCE_W, SOURCE_H), Image.LANCZOS)
                img.save(out)
                fcle.write_text(cle + "\n")
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
    # La vision n'a pas besoin de la 4K : une copie JPEG à la taille de composition, plus légère à envoyer
    from PIL import Image
    tampon = io.BytesIO()
    Image.open(png).convert("RGB").resize((W, H), Image.LANCZOS).save(tampon, "JPEG", quality=90)
    vue = {"inline_data": {"mime_type": "image/jpeg", "data": base64.b64encode(tampon.getvalue()).decode()}}
    corps = {"contents": [{"parts": [vue, {"text": invite}]}], "generationConfig": {"responseMimeType": "application/json", "temperature": 0}}
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
        k = img.shape[1] / W
        x, y, w, h = [int(v * k) for v in boites.get(el, [0, 0, W, H])]
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
    Image.fromarray(rgba, "RGBA").save(out, "WEBP", quality=82, method=6)
    return out


FOND_MAX = 12          # distance au papier sous laquelle un tracé est du fond
TEXTURE_MAX = 400      # au-delà, l'élément reste en image (trame dense)


def _bbox(d: str, tx: float, ty: float) -> tuple[float, float, float, float]:
    import re
    n = [float(x) for x in re.findall(r"-?\d+\.?\d*", d)]
    xs, ys = n[0::2], n[1::2]
    return min(xs) + tx, min(ys) + ty, max(xs) + tx, max(ys) + ty


def tracés(png: Path) -> list[tuple[str, str, float, float]]:
    """Image → tracés vectoriels (d, couleur, tx, ty) en px de composition, dans l'ordre d'empilement."""
    import re
    from PIL import Image
    width = Image.open(png).size[0]
    import tempfile
    import vtracer
    with tempfile.NamedTemporaryFile(suffix=".svg") as tmp:
        vtracer.convert_image_to_svg_py(str(png), tmp.name, colormode="color", hierarchical="stacked", mode="spline",
                                        filter_speckle=6, color_precision=6, layer_difference=24, corner_threshold=60,
                                        length_threshold=4.0, splice_threshold=45, path_precision=1)
        svg = Path(tmp.name).read_text()
    k = W / width
    echelle = (lambda d: re.sub(r"-?\d+\.?\d*", lambda m: f"{float(m.group()) * k:.1f}", d)) if k != 1 else (lambda d: d)
    return [(echelle(d.strip()), f, float(x) * k, float(y) * k) for d, f, x, y in re.findall(r'<path d="([^"]+)" fill="([^"]+)" transform="translate\(([-\d.]+),([-\d.]+)\)"/>', svg)]


def vectoriser(sid: str, dossier: Path) -> Path:
    """Tracés rangés par élément (la plus petite boîte qui les contient), ordre d'empilement gardé.

    Sortie Sxx.traces.json : { "traces": [[élément, d, couleur, tx, ty, rang]], "images": [éléments en trame] }.
    `rang` (0 → 1) : moment du tracé dans l'élément, de gauche à droite, les grandes formes d'abord.
    """
    import numpy as np
    from PIL import Image
    plan = json.loads((dossier / f"{sid}.json").read_text(encoding="utf-8"))
    boites = json.loads((dossier / f"{sid}.boites.json").read_text(encoding="utf-8"))["boites"]
    img = np.asarray(Image.open(dossier / f"{sid}.png").convert("RGB")).astype(np.float32)
    k = img.shape[1] / W
    bord = np.concatenate([img[:12].reshape(-1, 3), img[-12:].reshape(-1, 3)])
    fond = np.median(bord, axis=0)
    # Seuls les éléments que le plan anime reçoivent des tracés (révélés, déplacés, de bibliothèque)
    animes = {r["el"] for r in plan.get("revele", [])} | {m["el"] for m in plan.get("deplace", [])} | {m["vers"] for m in plan.get("deplace", [])}
    els = [e for e in plan["elements"] if e in boites and e in animes]
    par_el: dict[str, list] = {e: [] for e in els}
    for i, (d, f, tx, ty) in enumerate(tracés(dossier / f"{sid}.png")):
        rgb = np.array([int(f[k:k + 2], 16) for k in (1, 3, 5)], dtype=np.float32)
        x0, y0, x1, y1 = _bbox(d, tx, ty)
        if x1 - x0 > 0.9 * W:
            continue
        # Couleur du papier : gardée (elle recouvre ce qui est dessous dans l'empilement), rendue au jeton « fond »
        if np.sqrt(((rgb - fond) ** 2).sum()) < FOND_MAX:
            f = "fond"
        best = None
        # 1. Couleur réservée (plan « couleurs » : routes de lecture, d'écriture…) près de la boîte de l'élément
        cx, cy = (x0 + x1) / 2, (y0 + y1) / 2
        for e, hexa in (plan.get("couleurs") or {}).items():
            if e not in boites:
                continue
            cible = np.array([int(hexa[k:k + 2], 16) for k in (1, 3, 5)], dtype=np.float32)
            bx, by, bw, bh = boites[e]
            if np.sqrt(((rgb - cible) ** 2).sum()) < 70 and bx - 30 <= cx <= bx + bw + 30 and by - 30 <= cy <= by + bh + 30:
                best = e
        # 2. Sinon la plus petite boîte qui recouvre au moins 80 % du tracé (les boîtes de la vision sont approchées) ;
        #    à défaut, celle qui en recouvre le plus, au-delà de 30 %
        if best is None:
            aire = max(1.0, (x1 - x0) * (y1 - y0))
            couv = {}
            for e in els:
                bx, by, bw, bh = boites[e]
                ix = max(0.0, min(x1, bx + bw + 10) - max(x0, bx - 10))
                iy = max(0.0, min(y1, by + bh + 10) - max(y0, by - 10))
                couv[e] = ix * iy / aire
            dedans = [e for e, c in couv.items() if c >= 0.8]
            if dedans:
                best = min(dedans, key=lambda e: boites[e][2] * boites[e][3])
            elif f != "fond" and couv and max(couv.values()) > 0.3:
                best = max(couv, key=couv.get)
        # Un aplat de papier plus grand que sa boîte n'appartient pas à l'élément : il recouvrirait ses voisins
        if best and f == "fond":
            bx, by, bw, bh = boites[best]
            if (x1 - x0) * (y1 - y0) > 1.2 * bw * bh:
                best = None
        if best:
            par_el[best].append((i, d, f, tx, ty, (x1 - x0) * (y1 - y0), x0))
    images = [e for e, l in par_el.items() if len(l) > TEXTURE_MAX]
    sortie = []
    for e, l in par_el.items():
        if e in images or not l:
            continue
        bx, by, bw, bh = boites[e]
        ordre = sorted(l, key=lambda p: (0 if p[5] > 0.4 * bw * bh else 1, p[6]))
        rang = {p[0]: k / max(1, len(ordre) - 1) for k, p in enumerate(ordre)}
        sortie += [(p[0], [e, p[1], p[2], round(p[3], 1), round(p[4], 1), round(rang[p[0]], 3)]) for p in l]
    sortie.sort(key=lambda x: x[0])
    # Élément tracé posé dans un élément en trame : la teinte moyenne autour de lui bouche son trou tant qu'il n'est pas dit
    fonds = {}
    for e in els:
        if e in images:
            continue
        bx, by, bw, bh = boites[e]
        for parent in images:
            px, py, pw, ph = boites[parent]
            if bx >= px and by >= py and bx + bw <= px + pw and by + bh <= py + ph:
                y0, y1, x0, x1 = max(0, by - 14), min(H, by + bh + 14), max(0, bx - 14), min(W, bx + bw + 14)
                zone = img[int(y0 * k):int(y1 * k), int(x0 * k):int(x1 * k)].reshape(-1, 3)
                c = np.median(zone, axis=0).astype(int)
                fonds[e] = "#%02x%02x%02x" % tuple(c)
    out = dossier / f"{sid}.traces.json"
    out.write_text(json.dumps({"scene": sid, "traces": [t for _, t in sortie], "images": images, "fonds": fonds}, ensure_ascii=False, separators=(",", ":")), encoding="utf-8")
    return out


def extraire(sid: str, dossier: Path, el: str, ident: str, biblio: Path, description: str) -> Path:
    """Élément d'une planche → bibliothèque du programme (tracés relatifs à sa boîte, aperçu, fiche)."""
    import yaml
    from PIL import Image
    tr = json.loads((dossier / f"{sid}.traces.json").read_text(encoding="utf-8"))
    bx, by, bw, bh = json.loads((dossier / f"{sid}.boites.json").read_text(encoding="utf-8"))["boites"][el]
    paths = [[d, f, round(tx - bx, 1), round(ty - by, 1), r] for e, d, f, tx, ty, r in tr["traces"] if e == el]
    if not paths:
        raise RuntimeError(f"{sid} : aucun tracé pour « {el} » (élément en trame ?)")
    biblio.mkdir(parents=True, exist_ok=True)
    (biblio / f"{ident}.json").write_text(json.dumps({"id": ident, "w": bw, "h": bh, "traces": paths}, separators=(",", ":")), encoding="utf-8")
    src = Image.open(dossier / f"{sid}.png")
    k = src.size[0] / W
    src.crop((int(bx * k), int(by * k), int((bx + bw) * k), int((by + bh) * k))).save(biblio / f"{ident}.png")
    fiche = biblio / "bibliotheque.yaml"
    idx = (yaml.safe_load(fiche.read_text(encoding="utf-8")) if fiche.exists() else None) or {"elements": {}}
    plan = json.loads((dossier / f"{sid}.json").read_text(encoding="utf-8"))
    idx["elements"][ident] = {"description": description, "source": f"{dossier.resolve().parents[3].name}/{dossier.resolve().parents[2].name}/{sid}#{el}",
                              "vision": plan["elements"].get(el, ""), "taille": [bw, bh], "traces": len(paths),
                              "modele": IMAGE, "date": datetime.now().date().isoformat()}
    fiche.write_text("# Bibliothèque d'éléments dessinés du programme : un élément dessiné une fois, réutilisé par « biblio » dans un plan.\n"
                     + yaml.safe_dump(idx, allow_unicode=True, sort_keys=True), encoding="utf-8")
    return biblio / f"{ident}.json"


def ecrire_scenes(dossier: Path, scenes_dir: Path, biblio: Path | None) -> list[str]:
    """Un fichier de scène par plan (importe plan, boîtes, image, tracés, éléments de bibliothèque)."""
    import shutil
    faits = []
    for plan_path in sorted(dossier.glob("S[0-9][0-9].json")):
        sid = plan_path.stem
        plan = json.loads(plan_path.read_text(encoding="utf-8"))
        n = sid[1:].lstrip("0") or "0"
        bibs = sorted({v["biblio"] for v in (plan.get("biblio") or {}).values()} if isinstance(plan.get("biblio"), dict) else set())
        imports = ""
        noms = []
        for b in bibs:
            if biblio:
                shutil.copy(biblio / f"{b}.json", dossier / f"biblio-{b}.json")
            var = "B_" + b.upper().replace("-", "_")
            imports += f'import {var} from "../../../content/design/planches/biblio-{b}.json"\n'
            noms.append(f'"{b}": {var}')
        (scenes_dir / f"s{sid[1:]}.tsx").write_text(f"""/** {sid} : planche image tracée (dessin, repérage, tracés, plan : content/design/planches/{sid}.*). */
import BOITES from "../../../content/design/planches/{sid}.boites.json"
import PLAN from "../../../content/design/planches/{sid}.json"
import TRACES from "../../../content/design/planches/{sid}.traces.json"
import IMAGE from "../../../content/design/planches/{sid}.webp"
{imports}import SOURCES from "../../../content/sources.json"
import {{ planche }} from "../../engine/planche"

export const s{sid[1:]} = planche(PLAN, BOITES, {{ base: IMAGE }}, SOURCES.sources, TRACES, {{ {", ".join(noms)} }})
""", encoding="utf-8")
        faits.append(sid)
    return faits


def une_scene(plan_path: Path, ref: Path | None, etape: str, etapes: list[str], style: Path | None = None, forcer: bool = False) -> str:
    plan = json.loads(plan_path.read_text(encoding="utf-8"))
    sid = plan["scene"]
    dossier = plan_path.parent
    t0 = time.time()
    if "dessiner" in etapes:
        dessiner(plan, dossier, ref, etape, style, forcer)
    t1 = time.time()
    if "reperer" in etapes:
        reperer(plan, dossier, etape)
    t2 = time.time()
    if "detourer" in etapes:
        detourer(sid, dossier)
    if "vectoriser" in etapes:
        vectoriser(sid, dossier)
    absents = json.loads((dossier / f"{sid}.boites.json").read_text())["absents"] if (dossier / f"{sid}.boites.json").exists() else []
    return f"{sid} : dessin {t1 - t0:.1f} s, repérage {t2 - t1:.1f} s, détourage {time.time() - t2:.1f} s" + (f" ; absents : {', '.join(absents)}" if absents else "")


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("commande", choices=["tout", "dessiner", "reperer", "detourer", "vectoriser", "extraire", "scenes"])
    ap.add_argument("--style", type=Path, help="signature d'image du programme (design/style-image.md)")
    ap.add_argument("--forcer", action="store_true", help="regénérer même si l'invite n'a pas changé")
    ap.add_argument("--biblio", type=Path, help="dossier de la bibliothèque du programme (design/bibliotheque)")
    ap.add_argument("--element"), ap.add_argument("--id"), ap.add_argument("--description", default="")
    ap.add_argument("--vers", type=Path, help="scenes : dossier src/lesson/scenes du projet")
    ap.add_argument("--planches", type=Path, required=True)
    ap.add_argument("--scenes", nargs="*")
    ap.add_argument("--ref", type=Path)
    ap.add_argument("--etape", default="planches image")
    a = ap.parse_args()
    plans = sorted(p for p in a.planches.glob("S[0-9][0-9].json"))
    if a.scenes:
        plans = [p for p in plans if p.stem in a.scenes]
    if a.commande == "extraire":
        print(extraire(a.scenes[0], a.planches, a.element, a.id, a.biblio, a.description))
        return 0
    if a.commande == "scenes":
        print("scènes écrites : " + ", ".join(ecrire_scenes(a.planches, a.vers, a.biblio)))
        return 0
    etapes = ["dessiner", "reperer", "detourer", "vectoriser"] if a.commande == "tout" else [a.commande]
    t0 = time.time()
    with ThreadPoolExecutor(max_workers=8) as ex:
        futs = {ex.submit(une_scene, p, a.ref, a.etape, etapes, a.style, a.forcer): p.stem for p in plans}
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
