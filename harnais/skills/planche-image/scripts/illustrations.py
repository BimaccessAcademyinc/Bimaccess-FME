#!/usr/bin/env python3
"""Illustrations commandées par le graphiste au modèle d'image, livrées en SVG.

Un outil du graphiste, pas un rôle : le graphiste compose la scène dans sa
spécification, et commande ici un dessin par élément qui paraît à son propre
moment (une carte de rôle, une feuille, un sceau…). Le script dessine
l'élément seul sur fond uni, dans la signature d'image du programme et le
style de l'image de référence, retire le fond, recadre, vectorise, et écrit
`content/design/assets/<nom>.svg` (lu par `Svg name="<nom>"`), plus un aperçu
PNG à regarder avant de spécifier.

Commande d'un élément : `content/design/illustrations/<nom>.json`
  { "nom": "s02-contrat", "format": "3:4", "dessin": "description en anglais, sans texte" }
  format : 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9

Usage (depuis le projet Studio) :
  python3 illustrations.py --style <programme>/design/style-image.md --ref <programme>/design/references/style-carte.png
                           [--noms s02-contrat s02-saif] [--forcer] [--etape "<leçon> illustrations"]

Dépenses : sans `--approuve <montant en $>` donné par Ilyas, le script annonce
le coût et n'appelle rien (code 3). Cache : même invite, même référence, même
modèle → aucun appel. Une ligne par
appel dans harnais/mesures/appels.csv. Clé injectée par le proxy.
"""
from __future__ import annotations

import argparse
import base64
import hashlib
import io
import json
import re
import sys
import tempfile
import time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import planche_image as P  # noqa: E402

TAILLE = "1K"  # un élément s'affiche sur 150 à 700 px : 1K suffit, net à 2× (environ 0,13 $ l'image)


def style_element(style: Path | None) -> str:
    if style and style.exists():
        t = style.read_text(encoding="utf-8")
        if "```style-element" in t:
            return t.split("```style-element", 1)[1].split("```", 1)[0].strip()
    return ("Flat vector illustration in the style of a printed topographic map sheet. ONE single isolated element, centered, "
            "filling about 85% of the frame, on a flat uniform background #F1F3EC, edge to edge. Nothing else in the image. "
            "Ink #23281F, crisp 3 px lines, sharp corners, no shadow, no gradient, no 3D, no texture on the background. "
            "Cards and sheets are flat pale rectangles #FBFCF8 with a 2 px ink outline. People are flat ink silhouettes. "
            "ABSOLUTELY NO TEXT: no letters, no numbers, no labels, no logos.")


def cle_element(cmd: dict, style: Path | None, ref: Path | None) -> tuple[str, str]:
    texte = style_element(style) + "\n\nElement:\n" + cmd["dessin"]
    h = hashlib.sha256((P.IMAGE + TAILLE + cmd.get("format", "1:1") + texte).encode())
    if ref and ref.exists():
        h.update(ref.read_bytes())
    return texte, h.hexdigest()[:16]


def en_cache(cmd: dict, dossier: Path, style: Path | None, ref: Path | None) -> bool:
    _, cle = cle_element(cmd, style, ref)
    png, fcle = dossier / f"{cmd['nom']}.png", dossier / f"{cmd['nom']}.cle"
    return png.exists() and fcle.exists() and fcle.read_text().strip() == cle


def dessiner(cmd: dict, dossier: Path, style: Path | None, ref: Path | None, forcer: bool, etape: str) -> Path:
    nom = cmd["nom"]
    texte, cle = cle_element(cmd, style, ref)
    png, fcle = dossier / f"{nom}.png", dossier / f"{nom}.cle"
    if not forcer and en_cache(cmd, dossier, style, ref):
        return png
    parts = ([P.b64(ref), {"text": P.REF.replace("Draw a NEW composition as described", "Draw only the single element described")}] if ref and ref.exists() else []) + [{"text": texte}]
    corps = {"contents": [{"parts": parts}], "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": {"aspectRatio": cmd.get("format", "1:1"), "imageSize": TAILLE}}}
    d = P.appel(P.IMAGE, corps, f"{etape} {nom}")
    for c in d.get("candidates", []):
        for p in c.get("content", {}).get("parts", []):
            data = (p.get("inlineData") or p.get("inline_data") or {}).get("data")
            if data:
                from PIL import Image
                Image.open(io.BytesIO(base64.b64decode(data))).convert("RGB").save(png)
                fcle.write_text(cle + "\n")
                return png
    raise RuntimeError(f"{nom} : pas d'image dans la réponse")


def vers_svg(png: Path, sortie: Path) -> tuple[int, int, int]:
    """Fond retiré (couleur du bord), recadrage au dessin, vectorisation ; aperçu PNG détouré à côté."""
    import numpy as np
    import vtracer
    from PIL import Image
    img = np.asarray(Image.open(png).convert("RGB")).astype(np.float32)
    bord = np.concatenate([img[:6].reshape(-1, 3), img[-6:].reshape(-1, 3), img[:, :6].reshape(-1, 3), img[:, -6:].reshape(-1, 3)])
    fond = np.median(bord, axis=0)
    dist = np.sqrt(((img - fond) ** 2).sum(axis=2))
    ys, xs = np.where(dist > 14)
    if not len(xs):
        raise RuntimeError(f"{png.name} : image vide")
    m = 2  # marge serrée : le tracé du fond le plus large épouse le dessin, sans liseré autour
    x0, y0 = max(0, xs.min() - m), max(0, ys.min() - m)
    x1, y1 = min(img.shape[1], xs.max() + m), min(img.shape[0], ys.max() + m)
    crop = Image.open(png).convert("RGB").crop((x0, y0, x1, y1))
    alpha = np.clip((dist[y0:y1, x0:x1] - 10) / 22, 0, 1)
    Image.fromarray(np.dstack([np.asarray(crop), alpha * 255]).astype(np.uint8), "RGBA").save(sortie.with_suffix(".apercu.png"))
    with tempfile.TemporaryDirectory() as t:
        src = Path(t) / "c.png"
        crop.save(src)
        vtracer.convert_image_to_svg_py(str(src), str(Path(t) / "c.svg"), colormode="color", hierarchical="stacked", mode="spline",
                                        filter_speckle=4, color_precision=6, layer_difference=20, corner_threshold=60,
                                        length_threshold=4.0, splice_threshold=45, path_precision=1)
        svg = (Path(t) / "c.svg").read_text()
    w, h = x1 - x0, y1 - y0
    chemins = []
    for d, f, tx, ty in re.findall(r'<path d="([^"]+)" fill="([^"]+)" transform="translate\(([-\d.]+),([-\d.]+)\)"/>', svg):
        rgb = np.array([int(f[k:k + 2], 16) for k in (1, 3, 5)], dtype=np.float32)
        nums = [float(v) for v in re.findall(r"-?\d+\.?\d*", d)]
        bw = max(nums[0::2]) - min(nums[0::2]) if nums else 0
        bh = max(nums[1::2]) - min(nums[1::2]) if nums else 0
        # fond : couleur du papier et tracé qui couvre presque tout le cadre
        if np.sqrt(((rgb - fond) ** 2).sum()) < 12 and bw > 0.9 * w and bh > 0.9 * h:
            continue
        chemins.append(f'<path d="{d}" fill="{f}" transform="translate({tx},{ty})"/>')
    sortie.write_text(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}">\n'
                      f'<g id="dessin">\n' + "\n".join(chemins) + "\n</g>\n</svg>\n", encoding="utf-8")
    return w, h, len(chemins)


def une(cmd_path: Path, assets: Path, style: Path | None, ref: Path | None, forcer: bool, etape: str) -> str:
    cmd = json.loads(cmd_path.read_text(encoding="utf-8"))
    t0 = time.time()
    png = dessiner(cmd, cmd_path.parent, style, ref, forcer, etape)
    t1 = time.time()
    w, h, n = vers_svg(png, assets / f"{cmd['nom']}.svg")
    return f"{cmd['nom']} : dessin {t1 - t0:.1f} s, SVG {w} × {h}, {n} tracés, aperçu {assets / (cmd['nom'] + '.apercu.png')}"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--projet", type=Path, default=Path("."))
    ap.add_argument("--style", type=Path)
    ap.add_argument("--ref", type=Path)
    ap.add_argument("--noms", nargs="*")
    ap.add_argument("--forcer", action="store_true")
    ap.add_argument("--etape", default="illustrations")
    ap.add_argument("--approuve", type=float, help="montant en $ approuvé par Ilyas (sans lui : coût annoncé, aucun appel)")
    a = ap.parse_args()
    dossier = a.projet / "content" / "design" / "illustrations"
    assets = a.projet / "content" / "design" / "assets"
    cmds = sorted(dossier.glob("*.json"))
    if a.noms:
        cmds = [c for c in cmds if c.stem in a.noms]
    if not cmds:
        print(f"aucune commande dans {dossier}")
        return 2
    n = sum(1 for c in cmds if a.forcer or not en_cache(json.loads(c.read_text(encoding="utf-8")), dossier, a.style, a.ref))
    if not P.garde_depense(n * P.prix_image(P.IMAGE, TAILLE), a.approuve, f"{n} dessin(s) {P.IMAGE} {TAILLE} sur {len(cmds)} commande(s), le reste en cache"):
        return 3
    ok = True
    with ThreadPoolExecutor(max_workers=8) as ex:
        futs = {ex.submit(une, c, assets, a.style, a.ref, a.forcer, a.etape): c.stem for c in cmds}
        for f, nom in futs.items():
            try:
                print(f.result(), flush=True)
            except Exception as e:  # noqa: BLE001
                ok = False
                print(f"{nom} : ÉCHEC {e}", flush=True)
    return 0 if ok else 1


if __name__ == "__main__":
    sys.exit(main())
