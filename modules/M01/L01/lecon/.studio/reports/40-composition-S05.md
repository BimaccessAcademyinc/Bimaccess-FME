# Compte rendu · composition de S05 (rôle Graphisme)

Fichiers écrits :

- `content/design/specs/S05.md` (spécification, tableau des boîtes de l'état final, gabarit `Chaine` décrit)
- `content/design/illustrations/s05-ill-depart.json`, `s05-ill-attendu.json`, `s05-ill-outils.json`, `s05-ill-carte-depart.json`, `s05-ill-carte-attendue.json`

## Gabarits retenus

- Composition : « Chaîne de traitement (S05) » (`harnais/skills/planche-image/gabarits.md`) : la narration est un trajet de gauche à droite. Écarts : pas de pictogrammes d'outils dans le bloc (aucun mot de la voix), trames neutres `carroyage` dans les feuilles au lieu de l'eau et de la végétation (l'entité ne change pas de nature, seulement de format).
- Animation : **gabarit manquant `Chaine`** (`"gabarit": "chaine"`). `FicheRubriques` exige une feuille par bandes et n'admet qu'un déplacement par illustration ; la carte en fait trois. Champs demandés : `maillons`, `liens` (route, pointe, de, vers, avec contrôle de contact), `voyageur` (stations nommées), plusieurs `deplacement` pour le voyageur, geste `remplace` (balayage d'une illustration par-dessus une autre, l'ancienne retirée et non comptée au contrôle), contenus dans un maillon non comptés comme chevauchements. Détail dans la spécification. La forme resservira (S06, traitements de L03 à L05).

## Illustrations

Reprises :

| Nom | Source |
|---|---|
| `echelle-graphique` | habillage de la charte (`content/design/assets/`) |
| `rose-des-vents` | habillage de la charte |

Neuves (aucune dessinée : rien n'a été dépensé) :

| Nom | Format | Place |
|---|---|---|
| `s05-ill-depart` | 2:3 | x 104, y 260, 320 de large |
| `s05-ill-attendu` | 2:3 | x 1104, y 260, 320 |
| `s05-ill-outils` | 2:3 | x 614, y 275, 300 |
| `s05-ill-carte-depart` | 3:2 | stations C0 à C3, 200 |
| `s05-ill-carte-attendue` | 3:2 | C3 (x 1164, y 470), 200 |

Écartées : `s02-ill-saif` (dit SAIF), `s04-ill-contour` (le bâtiment de S04, exclu par le storyboard) ; la bibliothèque n'a rien pour cette scène.

Devis affiché par `illustrations.py` sans `--approuve` (aucun appel) : « Coût estimé : 0.34 $ (5 dessin(s) gemini-3.1-flash-image 1K sur 5 commande(s), le reste en cache) ». À annoncer à Ilyas par l'agent principal.

## Contrôles faits sur le tableau des boîtes

- Remplissage : couloirs entre maillons de 190 px de large (sous 200) ; bandes vides au-dessus et au-dessous de 80 à 135 px de haut (sous 150). Aucun vide de 200 × 150.
- Aucun texte sur un trait ni sur une amorce ; aucun chevauchement hors contenus ; marge réduite à l'échelle, la rose, la source ; rien sous y 860 ni dans la zone d'action.
- Une seule mise en évidence à la fois (contour, puis ligne d'attribut) ; chaque geste enchaîné finit avant la locution suivante (0,9 s, 0,65 s, 1,25 s).

## Doutes

1. Trames neutres au lieu de l'eau et de la végétation : à confirmer par Ilyas sur le lecteur.
2. Deux dessins séparés pour la carte : le polygone peut différer un peu au remplacement ; sommets imposés en pourcentages ; sinon une reprise (environ 0,07 $, sur devis).
3. C1 à 40 px de C2 : la carte attend sur la place du bloc, qui se dessine sous elle.
4. En-têtes à 0,24 em au lieu de 0,32 em (largeur des feuilles).
5. Toutes les places internes (bandeaux, polygone, barre, hauteurs) sont celles des commandes : à remesurer sur les aperçus avant d'écrire `S05.json`.
