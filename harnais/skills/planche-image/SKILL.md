---
name: planche-image
description: Planches de scène dessinées par un modèle d'image, repérées par la vision, passées en vecteurs et animées au trait par une scène générique. Le modèle de langage écrit seulement un plan court par scène. Pour toute leçon Studio en signature carte (ou autre charte dotée d'une signature d'image).
---

# Planche image tracée

Un modèle de langage ne dessine pas : il porte l'idée. Le dessin vient d'un modèle d'image, la position des objets d'un modèle de vision, le geste d'un vectoriseur, et la scène générique (`src/engine/planche.tsx`) anime le tout dans la grammaire : tracé à vitesse constante, aplat posé quand le trait se ferme, déplacement géométrique, textes exacts posés par le code.

Mesures sur FME001-M01-L01 (7 scènes) : dessin et repérage 59 s d'appels, environ 1,50 $ ; vectorisation 6 s, locale. L'ancienne méthode (graphistes qui codent les SVG) : environ 48 min d'agents et 16 $ pour les mêmes scènes.

## 0. Ce qui se réutilise (avant d'écrire un plan)

| Quoi | Où | Règle |
|---|---|---|
| Signature d'image du programme | `design/style-image.md` (bloc `style`) | toujours passée par `--style` ; jamais réécrite dans un plan |
| Image de référence de style | `design/references/style-*.png` | passée par `--ref` à chaque dessin : même trait d'une scène et d'une leçon à l'autre |
| Bibliothèque d'éléments | `design/bibliotheque/` (`bibliotheque.yaml`, un `.json` de tracés et un `.png` par élément) | un élément qui revient (fondateurs, feuille SAIF, fenêtre de logiciel…) se réutilise par `"biblio"` dans le plan au lieu d'être redessiné : identique partout, zéro appel |
| Gabarits de composition | `gabarits.md` (ce dossier) | une composition qui a marché se reprend mot pour mot dans `dessin`, puis s'adapte |
| Cache des dessins | `Sxx.cle` à côté de `Sxx.png` | même modèle, même invite, même référence : aucun appel ; `--forcer` pour regénérer |

Lire `bibliotheque.yaml` et `gabarits.md` avant le premier plan d'une leçon.

## 0 bis. Dépenses

Aucun dessin ni repérage sans l'accord d'Ilyas, coût annoncé avant (règle du 2026-11-27). Sans `--approuve <montant en $>`, `planche_image.py` et `illustrations.py` affichent « Coût estimé : … » (dessins hors cache × prix du modèle, repérages) et n'appellent rien. Un agent délégué (graphiste) écrit ses commandes et rend la main ; l'agent principal annonce le coût, Ilyas approuve, puis la commande se relance avec `--approuve`. Prix des modèles d'image : `PRIX_IMAGE` dans `planche_image.py`, à revérifier sur la page de prix.

## 1. Le plan d'une scène (`content/design/planches/Sxx.json`)

```json
{
 "scene": "S05",
 "dessin": "composition en anglais, positions en % ; aucun texte ; un gabarit de gabarits.md adapté",
 "elements": { "bloc": "ce que la vision doit encadrer, en anglais, sans ambiguïté" },
 "revele":  [ { "el": "bloc", "at": "locution dite mot pour mot", "dur": 1.2 } ],
 "deplace": [ { "el": "carte-depart", "vers": "carte-bloc", "at": "locution", "copie": true } ],
 "biblio":  { "fondateurs": { "biblio": "fondateurs-murray-lutz" } },
 "couleurs": { "lire": "#2F6DA8", "ecrire": "#C4472B" },
 "textes":  [ { "ecran": 0, "role": "titre", "at": "locution" },
              { "ecran": 3, "role": "etiquette", "el": "lire", "pos": "dessus", "at": "locution" },
              { "ecran": 6, "role": "source" } ],
 "focus":   [ { "el": "contour-bloc", "at": "locution" }, { "el": null, "at": "locution" } ],
 "logos":   [ { "nom": "fme-logo", "el": "jalon1996", "pos": "dessous", "dy": 62, "w": 180, "at": "locution" } ],
 "manques": [ { "el": "centre", "jusqua": "locution" } ],
 "zones":   { "ligne-format": [270, 330, 560, 60] },
 "source":  { "x": 110, "bas": 830 }
}
```

- `at` vaut `0` (décor de la première image) ou une locution dite mot pour mot : vérifiée au chargement, jamais d'instant écrit à la main.
- `textes` : un par texte de `## Écran`, dans n'importe quel ordre ; rôles `titre`, `etiquette`, `terme` (vert du terme nouveau), `lieu`, `jalon`, `rubrique`, `source` ; positions `dessus`, `dessous`, `dedans`, `dedans-haut`, `dedans-bas-gauche`, `dedans-haut-droite`, `droite`, `gauche`, avec `dx`, `dy`, `w`, `size`. Le code cale un texte qui sortirait de la feuille.
- `deplace` : l'élément (ou sa copie) voyage de sa boîte à celle de `vers` (centre et échelle) ; `vers` paraît, entier, à l'arrivée. Pas de `revele` pour une cible de déplacement.
- `couleurs` : les tracés de cette couleur près de la boîte vont à cet élément (routes qui traversent d'autres boîtes).
- `zones` : boîtes écrites à la main pour ce que la vision ne voit pas (une ligne de légende vide, la place d'un logo).

Règles de composition (dans `dessin`) : laisser vides le haut (20 %, titre), le bas (19 %, sous-titres) et le coin bas droit (source, zone d'action) ; de l'espace autour de chaque élément pour ses étiquettes ; un élément animé séparément = un objet distinct dans le dessin (une copie dessinée à chaque étape d'un trajet) ; pas de texte, jamais.

## 2. Commandes

```bash
S=harnais/skills/planche-image/scripts/planche_image.py
P=modules/M01/Lyy/lecon-image/content/design/planches
python3 $S tout --planches $P --scenes S01 --style design/style-image.md --ref design/references/style-carte.png --etape "<leçon> planches"
python3 $S tout --planches $P --style design/style-image.md --ref design/references/style-carte.png --etape "<leçon> planches"
python3 $S extraire --planches $P --scenes S01 --element fondateurs --id fondateurs-murray-lutz --biblio design/bibliotheque --description "…"
python3 $S scenes --planches $P --vers <projet>/src/lesson/scenes --biblio design/bibliotheque
```

`tout` = dessiner (cache), repérer, détourer, vectoriser, toutes les scènes en parallèle ; une ligne par appel dans `harnais/mesures/appels.csv`. Puis `npm run check`, `npm run build`, captures (`planche-par-phrase-studio`) et captures en cours d'animation (`shots.mjs --times`).

## 3. Relecture (ce qui se regarde, dans cet ordre)

0. Les symboles, à l'agrandissement : personnes (nombre, genre : deux fondateurs hommes ne sont pas un couple), emblèmes et sceaux (jamais un emblème national qui n'est pas celui du sujet), aucun chiffre ni lettre dessiné. Le modèle d'image complète ce qu'on ne lui dit pas : préciser dans `dessin` ce qui porte un sens.
1. Les boîtes sur l'image (`Sxx.boites.json`) : un élément absent ou mal encadré se corrige dans `elements` (description plus précise), puis `reperer` seul (quelques centimes).
2. Les captures en cours de tracé : un élément qui paraît trop tôt est un tracé rangé dans le mauvais élément (une boîte trop large, une route : `couleurs`).
3. L'image finale : textes, source, rien sous les sous-titres ni dans la zone d'action.

## 4. Limites connues

- Résolution : dessin en « 4K » (`PLANCHE_TAILLE`, défaut), gardé à 3840 × 2160 ; sans ce réglage le modèle renvoie environ 1376 × 768, flou et pixelisé une fois agrandi. Coût environ 0,31 $ l'image au lieu de 0,13 $.
- Une position en % dans `dessin` peut être dessinée comme texte : écrire les positions en mots (« un tiers de la largeur ») pour les objets placés sur une échelle (frise, axe).
- Une trame dense (plus de 400 tracés) reste en image et se découvre par balayage, sans tracé.
- Un trait relié à un autre (jalon sur la frise) forme un seul tracé : il paraît avec lui ; le décrire comme objet séparé dans `dessin` (« a tick above the line, not touching it »).
- Les routes très fines peuvent sortir écrasées du vectoriseur : à terme, les tracer par le code (`Trace`) sur les points donnés par la vision.
