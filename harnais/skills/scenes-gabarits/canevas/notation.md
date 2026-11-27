# Planches sur le canevas de design : notation

Essai 3 du pilote FME001 (`docs/essai-3-design.md`). Le graphiste compose la planche d'une scène sur le canevas de design (outil Artifact, type Design) ; Ilyas la voit et la corrige à la main ; `scripts/planche_vers_donnees.mjs` l'exporte en `content/design/scenes/Sxx.json` (format `docs/gabarits.md` du projet). Rien n'est recopié : positions, tailles, largeurs de texte et nombre de lignes sont mesurés sur la planche rendue avec les polices de la leçon.

Une scène = deux artboards du canevas :

- `Sxx.dc.html`, la **planche** : 1920 × 1080, la feuille de la charte (cadre, carroyage, échelle, rose) et les zones interdites, verrouillées et visibles (titre, sous-titres, zone d'action, marge ; face utile x 104 à 1424, y 180 à 860 en tireté bleu), puis les éléments à leur place finale (état `Sxx-FIN`).
- `Sxx-partition.dc.html`, la **partition** : une ligne par étape, son numéro, son état (`data-board`) et sa locution, mot pour mot de la narration dite (`src/generated/narration.ts`). L'étape 1 est l'image 0.

## Le repère : ce que le gabarit doit savoir, écrit sur l'élément

Chaque élément porte un repère, petite étiquette violette au-dessus de lui (case « repères » de la planche pour le montrer ou le cacher ; le moteur ne le dessine jamais). Le repère se lit et se retape à la main :

```
3.2 frappe                 étape 3, deuxième geste : le texte se tape
2.2 balayage bas 0,3       balayage de haut en bas en 0,3 s (droite, gauche, bas, haut)
3.1 trace 0,25             trait tracé en 0,25 s, dans son sens
5.3 trace avec             tracé en même temps que le geste précédent (même durée)
1.1 poser                  posé à l'image 0
6.3 deplacement 0,3 avec   l'illustration va à son arrivée (pièce « arrivée »)
4.1 bande 1 0,25           bande 1 de la feuille en 0,25 s
dans saif                  texte découvert dans le balayage de l'illustration qui le contient
évidence 7 → 8             mise en évidence de l'étape 7 à l'étape 8 (« → fin » : jusqu'à la fin)
```

Plusieurs gestes sur un élément : séparés par « | » (feuille : `4.1 bande 1 0,25 | 6.1 bande 2 0,25`). Dans une étape, les gestes s'enchaînent dans l'ordre des rangs (`avec` : en même temps que le précédent). La locution d'un geste est celle de son étape dans la partition. Le titre de scène se pose par le gabarit ; son repère dit seulement quand il se tape.

## Les éléments

Un élément est un `div` placé en absolu (`left`, `top`, `width` en px de scène), qui porte `data-g` (sa nature) et `data-id` (son identifiant dans les données, `data-testid` `sxx-<id>`) ; le repère est son premier enfant, `<span data-repere>…</span>`. Un élément posé **dans** un autre (texte dans une carte, hachure dans la feuille) est son enfant : il bouge avec lui, et le texte devient `place: "carte"`.

| `data-g` | Ce que c'est | Ce qu'on règle sur le canevas | Champs |
|---|---|---|---|
| `illustration` | une illustration de `content/design/assets/` (`<img>` enfant) | place, largeur (la hauteur suit le `viewBox`) | `data-fichier`, facultatifs `data-aplat="fond"`, `data-decoupe="cercle"`, `data-bandes` (feuille : bas des bandes en fraction de sa hauteur), `data-sur` (posée sur une autre illustration) |
| `texte` | un texte de `## Écran`, recopié tel quel | place ; `width` = largeur de retour à la ligne ; `text-align: center` = centré (une ligne) | `data-ecran`, `data-style` (nom du style dans les données), facultatifs `data-reserve`, `data-langue="en"` ; police, taille, graisse, interligne, interlettrage, capitales, italique et couleur viennent du style CSS du texte |
| `titre`, `source` | titre de scène et mention de source | rien (le gabarit les place) | `data-ecran` |
| `trait` | jalon, route, trait, filet | boîte : horizontale ou verticale, son épaisseur est sa hauteur (ou sa largeur) | facultatifs `data-sens` (défaut : droite, ou bas pour un trait vertical), `data-couleur` (jeton), `data-couches="ecriture"` ou `"lecture"` (route : bord, chaussée, axe) |
| `pointe` | pointe pleine d'une route | boîte du triangle | `data-sens` (défaut droite), `data-remplissage` (défaut `ecriture`) |
| `frise` | la ligne de temps et sa pointe | boîte : la hauteur est celle de la pointe | `data-epaisseur` (défaut 3) |
| `cases` | cases des années (couche foncée) | boîte ; la case claire est son enfant `data-g="claire"` | |
| `arrivee` | où va une illustration qui se déplace (tireté gris) | coin haut gauche | `data-de` (l'illustration) |
| `evidence` | rectangle de mise en évidence (tireté bleu) | boîte | `data-forme="cercle"` facultatif |

Pièces à copier (styles exacts de la charte ; la pièce « Pièces » du canevas les montre) :

```html
<div data-g="illustration" data-id="sceau" data-fichier="s02-ill-sceau" style="position: absolute; left: 262px; top: 670px; width: 160px">
  <span data-repere>2.2 balayage bas 0,3</span><img src="asset:s02-ill-sceau" alt="" style="display: block; width: 100%"></div>

<div data-g="texte" data-id="jalon-1993-libelle" data-ecran="4" data-style="libelle" style="position: absolute; left: 478px; top: 616px; width: 380px; font: 400 36px/1.15 'Source Serif 4', serif; color: #23281F"><span data-repere>3.2 frappe</span>1993 · Fondation de Safe Software</div>

<div data-g="trait" data-id="jalon-1993" style="position: absolute; left: 460.75px; top: 560px; width: 2.5px; height: 40px; background: #23281F"><span data-repere>3.1 trace 0,25</span></div>

<div data-g="trait" data-id="route-1" data-couches="ecriture" style="position: absolute; left: 600px; top: 261.5px; width: 196px; height: 11px; background: #23281F; display: flex; align-items: center">
  <span data-repere>5.2 trace 0,4</span><div style="width: 100%; height: 8px; background: #FFFFFF; display: flex; align-items: center"><div style="width: 100%; height: 4px; background: #C4472B"></div></div></div>

<div data-g="pointe" data-id="pointe-1" style="position: absolute; left: 796px; top: 255px; width: 16px; height: 24px">
  <span data-repere>5.5 trace 0,1</span><svg width="16" height="24" viewBox="0 0 16 24" style="display: block"><path d="M1 1 L15 12 L1 23 Z" fill="#C4472B" stroke="#23281F" stroke-width="2"></path></svg></div>

<div data-g="frise" style="position: absolute; left: 436px; top: 571px; width: 988px; height: 18px">
  <div style="position: absolute; left: 0; top: 7.5px; right: 18px; height: 3px; background: #23281F"></div>
  <svg width="18" height="18" viewBox="0 0 18 18" style="position: absolute; right: 0; top: 0"><path d="M0 0 L18 9 L0 18 Z" fill="#23281F"></path></svg></div>

<div data-g="cases" data-id="cases" style="position: absolute; left: 462px; top: 573px; width: 404px; height: 14px; background: #23281F">
  <span data-repere>8.2 trace 0,45</span><div data-g="claire" style="position: absolute; left: 134.7px; top: 2px; width: 134.6px; height: 10px; background: #FBFCF8"></div></div>

<div data-g="arrivee" data-de="contour" style="position: absolute; left: 817px; top: 350px; width: 163px; height: 114px; box-sizing: border-box; border: 2px dashed #7D8576"><span data-repere>arrivée du contour</span></div>

<div data-g="evidence" data-id="traduction" style="position: absolute; left: 607px; top: 200px; width: 198px; height: 51px; box-sizing: border-box; border: 2.5px dashed #2F6DA8"><span data-repere>évidence 7 → 8</span></div>
```

Une mise en évidence s'allume seule à la fois : sur la planche finale elles sont toutes dessinées, chacune avec ses étapes ; la case « repères » les montre avec leurs étiquettes.

## Export

```bash
# 1. relire la planche publiée (outil Artifact, action read, paths project/S02.dc.html et project/S02-partition.dc.html)
# 2. exporter, depuis le dossier de la leçon
node ../../../../harnais/skills/scenes-gabarits/scripts/planche_vers_donnees.mjs \
  --planche <copie>/project/S02.dc.html --partition <copie>/project/S02-partition.dc.html --projet . --apercu .studio/qa/planche-S02.png
flock /tmp/fme001-sync.lock npm run check:scenes
```

Le script refuse une planche incomplète et dit quoi faire : élément sans repère, étape absente de la partition, locution qui n'est pas dite mot pour mot ou dite deux fois, texte différent de `## Écran`, texte d'Écran posé nulle part ou deux fois, texte hors de la face, texte sur un trait, sur un texte ou (texte de la face) sur une illustration, texte qui déborde de sa carte, illustrations qui se chevauchent sans `data-sur`, élément sous les sous-titres, dans la zone d'action ou dans la marge, texte sous 23 px, police ou couleur hors charte. Les contrôles du gabarit (enchaînements, une seule mise en évidence, feuille remplie) suivent au chargement.

`--apercu` écrit l'image de la planche rendue avec les polices de la leçon (repères compris, sauf `--sans-reperes`) : le graphiste la regarde avant de rendre la main.

## Écrire une planche (graphiste)

`scripts/planche_canevas.mjs` écrit les deux artboards à partir d'un fragment d'éléments (`src="asset:<fichier>"`, remplacé par l'adresse téléversée lue dans `blobs.json` du canevas) et d'une liste d'étapes (`N | état | locution`). Une fois la planche sur le canevas, elle fait foi : on la relit et on l'exporte, on ne la régénère pas.
