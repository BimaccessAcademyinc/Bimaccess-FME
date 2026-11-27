"""Banc : même commande d'élément, modèle d'image rapide contre Pro (mêmes invite, style et référence)."""
import base64, io, json, sys, time
from pathlib import Path
sys.path.insert(0, "/home/user/Bimaccess-FME/harnais/skills/planche-image/scripts")
import planche_image as P
import illustrations as I
from PIL import Image
ICI = Path(__file__).resolve().parent
CMD = Path("/home/user/Bimaccess-FME/modules/M01/L01/lecon-essai/content/design/illustrations")
STYLE = Path("/home/user/Bimaccess-FME/design/style-image.md")
REF = Path("/home/user/Bimaccess-FME/design/references/style-carte.png")
modele, noms = sys.argv[1], sys.argv[2:]
def un(nom):
    cmd = json.loads((CMD / f"{nom}.json").read_text())
    texte = I.style_element(STYLE) + "\n\nElement:\n" + cmd["dessin"]
    parts = [P.b64(REF), {"text": P.REF.replace("Draw a NEW composition as described", "Draw only the single element described")}, {"text": texte}]
    cfg = {"aspectRatio": cmd.get("format", "1:1")}
    if "pro" in modele or modele.split("-")[1].startswith("3"):
        cfg["imageSize"] = "1K"
    corps = {"contents": [{"parts": parts}], "generationConfig": {"responseModalities": ["IMAGE"], "imageConfig": cfg}}
    t0 = time.time()
    d = P.appel(modele, corps, f"FME001-M01-L01 banc flash {nom}")
    u = d.get("usageMetadata", {})
    for c in d.get("candidates", []):
        for p in c.get("content", {}).get("parts", []):
            data = (p.get("inlineData") or {}).get("data")
            if data:
                im = Image.open(io.BytesIO(base64.b64decode(data))).convert("RGB")
                im.save(ICI / f"{nom}.{modele}.png")
                return f"{nom} {modele} {time.time()-t0:.1f} s {im.size} sortie {u.get('candidatesTokenCount')}"
    return f"{nom} {modele} : pas d'image ({json.dumps(d)[:200]})"
from concurrent.futures import ThreadPoolExecutor
with ThreadPoolExecutor(4) as ex:
    for r in ex.map(un, noms): print(r, flush=True)
