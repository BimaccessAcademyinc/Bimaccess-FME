# Signature d'image du programme FME001

Invite de style envoyée au modèle d'image avant chaque composition (`planche_image.py --style design/style-image.md`). Elle tient la charte « carte topographique » (`CHARTE-FME001.md`, `tokens.json`) : couleurs, trait, cartes plates, aucune lettre. Image de référence de style : `design/references/style-carte.png` (la planche S01 de L01), donnée avec `--ref` pour que chaque scène ait le même trait.

Changer ce bloc change toutes les futures planches du programme ; les planches déjà dessinées restent en cache tant qu'on ne relance pas avec `--forcer` (le cache compare l'invite complète, la référence et le modèle).

```style
Flat vector illustration in the style of a printed topographic map sheet (Swiss or IGN cartography), seen from above or as simple flat pictograms.
Background: ONE flat uniform color #F1F3EC everywhere, edge to edge. No paper texture, no border, no frame, no grid, no graticule, no margin decoration, no compass, no scale bar, no shadow, no gradient, no 3D.
Ink lines #23281F, crisp, 3 px, sharp corners. Use only these map colors: water fill #BFD5E6, vegetation #6E8B4E and #D3DFC3, relief contour lines brown #B08A62, reading routes blue #2F6DA8 (round line caps), writing routes red #C4472B (round line caps), missing piece gold #C99700 with fill #FBF1C8.
Cards and sheets are flat pale rectangles #FBFCF8 with a 2 px ink outline. People are small flat ink silhouettes, like map scale figures.
ABSOLUTELY NO TEXT anywhere: no letters, no numbers, no words, no labels, no logos, no signatures. Code adds all text later. The percentages and coordinates in the composition are layout instructions only: never draw them, never write any percentage or tick label.
Keep these areas completely empty (only the background color): the top 20% of the image, the bottom 19% of the image, and the lower right corner (right 26% of the width, from 58% of the height down).
Leave generous empty space around each element: labels will be placed above or below them.
16:9 landscape composition.
```

## Élément seul (illustrations commandées par le graphiste)

Invite de style d'un élément isolé (`harnais/skills/planche-image/scripts/illustrations.py`) : le graphiste compose la scène, et commande un dessin par élément qui paraît à son propre moment.

```style-element
Flat vector illustration in the style of a printed topographic map sheet (Swiss or IGN cartography), drawn as one simple flat pictogram.
ONE single isolated element, centered, filling about 85% of the frame, on a flat uniform background #F1F3EC, edge to edge. Nothing else in the image: no frame, no border, no grid, no shadow, no ground line unless asked.
Ink lines #23281F, crisp, 3 px, sharp corners. Use only these map colors when the element needs them: water fill #BFD5E6, vegetation #6E8B4E and #D3DFC3, relief contour lines brown #B08A62, reading routes blue #2F6DA8, writing routes red #C4472B, missing piece gold #C99700 with fill #FBF1C8.
Cards and sheets are flat pale rectangles #FBFCF8 with a 2 px ink outline. People are flat ink silhouettes, like map scale figures; draw the number and kind of people asked, nothing more.
ABSOLUTELY NO TEXT anywhere: no letters, no numbers, no words, no labels, no logos, no national emblems. Positions or sizes in the description are instructions, never draw them.
```
