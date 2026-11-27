# Rapport 41 · contrôles de composition bloquants (FME001-M01-L01, étape 4)

## Ce qui a été écrit

- `src/engine/gabarits/controles.ts` (nouveau) : les quatre contrôles, appelés à la fin de `planifier` (`plan.ts`) à la place de l'ancien contrôle de remplissage. Tous les défauts d'une scène sont listés dans une seule `GabaritError` (fichier, champ, ce qui est faux, quoi faire).
- `src/engine/gabarits/donnees.ts` : champ `sur` (illustrations et textes : support sur lequel l'élément est posé) ; clé de police du style gardée pour la mesure. `largeurMesuree` et `lignes` restent acceptés mais sont sans effet : la mesure les remplace.
- `src/engine/gabarits/plan.ts`, `index.ts`, `src/engine/index.ts` : ancien contrôle retiré (`VIDE_MAX`, `VIDE_MAX_LARGEUR`, `boitesFinales`) ; export de `ZONE`, `DEBORD_FRISE`, `VIDE_MIN_LARGEUR`, `VIDE_MIN_HAUTEUR`, `mesurer`.
- `scripts/metriques-polices.mjs` (nouveau) → `src/engine/gabarits/metriques.json` : avance de chaque caractère des polices embarquées, lue dans les WOFF `@fontsource`.
- `scripts/metriques-verifier.mjs` (nouveau) : compare la mesure estimée de chaque texte à la boîte posée par Chromium dans l'état final (prend le verrou Chromium).
- `docs/gabarits.md` : § 6 réécrit, `sur` aux § 2, erreurs au § 7, nouveau § 9 (contrôles, seuils, mesure des textes).

## Contrôles et seuils

| N° | Refuse | Seuil |
|---|---|---|
| 1 | vide dans la face (x 104 à 1424, y 180 à 860 ; la zone d'action est hors de la face) | aucun rectangle vide d'au moins 200 × 150 px ; grille de 2 px, méthode de l'histogramme ; boîtes : illustrations (place d'arrivée), textes (encre mesurée), tracés, frise, cases |
| 2 | débord hors de la face | 0,5 px de tolérance ; textes, mises en évidence (tireté de 2,5 px compris, cercle par sa demi-diagonale), illustrations (départ et arrivée), tracés ; la ligne de la frise seule jusqu'à x 1500 entre y 360 et y 690 |
| 3 | texte sur un trait | aucun point d'un trait (épaisseur comprise) dans la boîte du texte agrandie de sa réserve (6 px, 2 px) ; traits : tracés, frise et pointe, cases, contour des mises en évidence allumées pendant que le texte est à l'écran |
| 4 | chevauchement final | aucune intersection de plus de 0,5 px entre illustrations et textes, sauf avec son support (`sur`, `dans`, en chaîne), dans lequel l'élément doit tenir en entier |

Mesure des textes : avances de Source Serif 4 (400, 600, italiques) et Barlow Condensed (500, 600) × corps, plus l'interlettrage entre caractères, capitales mises en majuscules, retour à la ligne glouton à `largeur`, hauteur = lignes × corps × interligne. Crénage ignoré. Vérification contre Chromium (polices chargées) sur les 14 textes de S02 et S04 : écart de -0,1 à +4,3 px en largeur (presque toujours par excès, donc du côté prudent), même nombre de lignes partout.

Essais négatifs (copie de S02 modifiée, hors du projet) : logo réduit → vide refusé ; mise en évidence `nom` à 11 px au-delà de x 1424 → refusée ; texte `traduction` descendu sur la route 1 → refusé (route et contour) ; `siege` sorti du lieu → chevauchement avec SAIF et débord du support refusés ; logo poussé sur le contrat → chevauchements refusés et vide de **210 × 160 px** (x 580 à 790, y 700 à 860) refusé : c'est le cas de l'essai 3 ; jalon prolongé sous y 860 → refusé.

## Résultats sur S02 et S04, avant correction

- S02 : 8 défauts. Mise en évidence `nom` 6,3 px sous y 860 ; libellé 1996 touché par le contour de sa mise en évidence (texte de 538 px trop long pour la place jusqu'à 1424) ; textes de carte et sceau sans support déclaré (5 chevauchements) ; vide de x 436 à 882, y 700 à 860 (446 × 160 px). Après ce vide venaient aussi le bas à droite et le dessous du lieu (x 1082 à 1424, y 403 à 570).
- S04 : 12 chevauchements, tous des empilements voulus non déclarés (objets et textes sur la feuille, hachure sur le contour, repère sur le globe). Ni vide, ni débord, ni texte sur un trait.

## Corrections de données (seulement `S02.json`, `S04.json`)

S02 (mêmes illustrations, gestes, locutions, états) :
- logiciels agrandis (largeur 150, y 182) ; routes et pointes recalées sur ses trois fenêtres ; feuille SAIF au bout des routes en haut à droite (x 1151, largeur 273), `saif-nom` recentré ; `traduction` recentré sur les routes (cx 880, y 192) ;
- lieu en bas à droite sous la frise (x 1094, y 612, largeur 330), `siege` à la même place relative ;
- jalon 1996 à x 780, cases de 462 à 780 (case claire au tiers du milieu, 568 à 674) ;
- libellés 1993 et 1996 sur deux lignes (`largeur` 290 et 280) ;
- logo sous le libellé 1993, à gauche du jalon 1996 (x 480, y 714, largeur 280) ; nom d'origine sur deux lignes à sa droite (x 790, y 746, `largeur` 296) ;
- rectangles des quatre mises en évidence recalculés sur les nouvelles boîtes, dans la face ;
- `sur` : sceau et `contrat-titre`, `rubrique` sur le contrat, `fondateurs-nom` sur les fondateurs, `siege` sur le lieu ; `largeurMesuree` et `lignes` retirés.

S04 : seulement `sur` (contour, signes, globe et les cinq textes sur la feuille, hachure sur le contour, repère sur le globe) ; aucune place changée.

## Captures regardées

`npm run build`, puis `planche.mjs --scenes S02,S04 --out .studio/qa/41-controles` : `planche-S02.png`, `planche-S04.png`, `S02/s02-end.png`, `S04/s04-end.png` (et l'état final de S02 avant correction, construit dans une copie hors du projet).
- S02 final : face remplie, rien sur un trait, chaque mise en évidence autour de son élément, une à la fois. Point à juger sur le lecteur : le logo FME est sous le libellé 1993 (sous la barre des trois années, à gauche du jalon 1996), le nom d'origine sous le libellé 1996 ; les routes de traduction sont longues (environ 510 px). Si la lecture « logo = 1996 » ne passe pas, c'est une décision de composition pour le graphiste.
- S04 final : inchangé ; le tireté de la mise en évidence `systeme` passe à environ 2 px au-dessus du texte (permis par le contrôle, serré à l'œil).

## Vérifications de fin

`npm run check` 0 (7 scènes chargées, tsc sans erreur) ; `npm run build` construit ; `check-literals` : 0 texte en dur ; `npm run test:play` : tout est conforme.

## Hors contrôle, à la planche

Traits dessinés dans les SVG (un texte de carte sur un trait du dessin), croisement d'un tracé et d'une illustration, sens. Le skill `harnais/skills/scenes-gabarits/SKILL.md` et le gabarit Studio du dépôt du cours ne sont pas modifiés : report à faire si ces contrôles sont retenus.
