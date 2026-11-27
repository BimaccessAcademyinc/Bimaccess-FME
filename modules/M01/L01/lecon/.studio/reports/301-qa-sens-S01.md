# Lecture de S01 (sens, planche par phrase)

Preuves : `.studio/qa/sens/planche-S01.png`, captures `.studio/qa/sens/S01/` (t4.16, t11.12, t17.72, t23.78, t27.98, t31.84, end) ; zooms `.studio/tmp/zoom-win.png`, `.studio/tmp/zoom-fond.png`. Aucune capture supplémentaire nécessaire.

## Lecture phrase par phrase

| # | Instant | Phrase dite | Ce qu'une personne voit sans la voix |
|---|---|---|---|
| 1 | 4,16 s | Au début des années 1990, Don Murray et Dale Lutz travaillent en Colombie-Britannique sur un projet forestier. | Un territoire en tiret-point nommé COLOMBIE-BRITANNIQUE, et une carte « DON MURRAY · DALE LUTZ » avec deux silhouettes. Se lit : deux personnes nommées dans un lieu. Rien n'est forestier à l'écran, mais la phrase suivante le nomme. Conforme à S01-1. |
| 2 | 11,12 s | Les entreprises forestières doivent y partager leurs données géographiques avec le gouvernement de la Colombie-Britannique. | Deux cartes de rôle nommées (ENTREPRISES FORESTIÈRES à gauche, GOUVERNEMENT DE LA COLOMBIE-BRITANNIQUE à droite, une silhouette chacune), un trait qui part des entreprises et s'arrête sur un carré jaune tireté sans nom. Les deux parties se lisent. Le « partage de données » ne se voit que par un trait vers un carré anonyme : voir défaut 2. |
| 3 | 17,72 s | Or les entreprises utilisent des logiciels différents, et le gouvernement ne veut pas leur imposer un même éditeur. | Trois fenêtres de logiciel de dessins différents (schéma de boîtes, tableau, tracé de lignes) sous la carte des entreprises. Se reconnaissent comme des fenêtres d'applications, « différents » se voit. Rien ne se rapporte au gouvernement qui refuse d'imposer : acceptable, c'est une négation. Conforme. |
| 4 | 23,78 s | Chaque entreprise garde donc son logiciel, et l'échange doit pourtant se faire. | Le titre « Chaque entreprise garde son logiciel. » est tapé et le contour bleu entoure les trois fenêtres : l'élément nommé est celui qui est mis en évidence. Le carré jaune reste anonyme. Conforme. |
| 5 | 27,98 s | Murray et Lutz voient de près ce problème à résoudre. | Le contour passe sur la carte des fondateurs, un seul contour. Conforme. |
| 6 | 31,84 s | Comment faire passer les mêmes données géographiques d'un logiciel à l'autre ? | Image inchangée (contour sur les fondateurs), comme le prévoit la spécification. Aucun élément ne répond à « d'un logiciel à l'autre » : voir défaut 2. |
| 7 | fin | (état final) | Identique à 6. Conforme à S01-FIN : territoire, fondateurs avec contour, deux parties, trois fenêtres, liaison arrêtée sur le manque, titre, mention de source, échelle, rose. |

## Éléments (nom, mot de la phrase, reconnaissance, traits)

- Carte des fondateurs, entreprises, gouvernement : nommées, silhouettes reconnues, un nom par silhouette de carte. Conforme.
- Fenêtres : reconnues sans explication (barre de titre, boutons de fenêtre, contenus différents). Conforme.
- Territoire : nommé par son texte. Conforme.
- Trait entreprises vers manque : part d'une chose nommée, arrive sur une chose non nommée (défaut 2).
- Carré jaune : aucun nom, aucun mot ne le fait paraître (défaut 2).

## Image finale contre S01-FIN

Conforme élément par élément (positions relevées sur `s01-end.png`, converties à l'échelle 1920 : fenêtres x 150, y 730 à 817 ; fondateurs x 555 à 995 ; mention de source x 1448, y 722 à 818 ; libellé du territoire y 793 à 828). Un seul contour (fondateurs). Texte du titre et des cartes identique au storyboard.

## Composition

| Règle | Résultat |
|---|---|
| R1 | Conforme : forme de carte de rôle et feuille |
| R2 / R3 | Défaut 1 : deux vides en haut de la face |
| R4 | Conforme : aucun texte sur un trait (libellé du territoire à 22 px du trait de limite, titre au-dessus du territoire) |
| R5 | Conforme : contours et textes dans x 104 à 1424, y 180 à 860 (contour des fondateurs à environ x 545, y 200) ; rien sous y 860, rien dans la zone d'action |
| R6 | Conforme : la marge ne porte que l'échelle, la mention de source et la rose ; le territoire déborde dans la marge entre y 396 et 672, débord permis |
| R7 | Conforme : aucun chevauchement |
| R8 | Voir défaut 2 |
| Mise en évidence | Conforme : une seule à la fois (t23,78 fenêtres, t27,98 et fin fondateurs) |

## Symboles à l'agrandissement

Deux silhouettes identiques et sobres pour les fondateurs, une par partie ; aucune lettre ni chiffre dessiné dans les fenêtres (zoom-win.png) ; aucun emblème ni logo. Conforme.

## Défauts

1. Composition (graphiste) : la scène étant codée sur mesure, le contrôle de remplissage des gabarits ne s'applique pas. Sur `s01-end.png`, deux vides en haut de la face : à gauche x 104 à 550, y 180 à 450, et à droite x 1000 à 1424, y 180 à 450 (un carré vide de 270 px de côté dans chacun, contre 136 px au plus selon le seuil des gabarits, `COMPOSITION.videCarre` 0,2 de la face). Seul le tireté du territoire les borde. Les silhouettes ne remplissent qu'un tiers de leur carte.
2. Sens (graphiste, texte éventuel à Ilyas) : à la phrase 2 (11,12 s) le trait part des entreprises et arrive sur un carré jaune sans nom, que rien ne désigne ; les données géographiques qui se partagent ne sont pas dessinées. À la phrase 6 (31,84 s) la question « d'un logiciel à l'autre » n'a aucun élément à l'écran, le contour restant sur les fondateurs. Le carré est décidé en spécification (aucun libellé), mais sans la voix il ne se comprend pas.
