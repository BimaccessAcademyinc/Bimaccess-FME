# Rapport 102 · données de S02

Fichier changé : `content/design/scenes/S02.json` (seul). Mêmes illustrations, textes, gestes, locutions. Sauvegarde de l'avant : scratchpad `S02.avant.json`.

## Changements (champ : avant -> après)
- illustrations.lieu : x 1082, y 186, largeur 342 -> x 1052, y 220, largeur 372 (hauteur 236, vide restant au-dessus 40 px, au-dessous 122 px)
- textes.siege : x 1202, y 273,9 -> x 1180, y 317,6 (même position relative au signe de la carte de lieu)
- illustrations.logo : x 882, y 670, largeur 280 -> x 746, y 666, largeur 360
- traces.jalon-1996 : x 866 -> x 730
- annees.cases : a 866 -> 730 ; claire 596,7 à 731,3 -> 551,3 à 640,7 (trois cases égales)
- textes.jalon-1993-libelle : largeur 380, 2 lignes -> largeur 240, 3 lignes
- textes.jalon-1996-libelle : x 882 -> x 746
- textes.nom-origine : x 882, y 820, largeurMesuree 411 -> x 1126, y 700, largeur 200, 3 lignes (à droite du logo, plus sous lui)
- evidences.jalon-1996 : x 872 -> 736 ; evidences.nom : x 872, y 810, 431 x 55 -> x 1116, y 690, 220 x 124 (bas 814 : plus de sortie de la face) ; evidences.logo : x 872, y 660, 300 x 154 -> x 736, y 656, 380 x 193

## Contrôles
- check:scenes sous verrou : « scènes chargées : 7 », aucune erreur nommant S02.json.
- check : code 0 ; check-literals : 0 texte en dur ; build : ok ; shots : 0 erreur.
- Image : `.studio/qa/donnees/S02/s02-end.png`.

## Image finale (S02-FIN)
Frise de bord à bord, jalon 1996 plus proche du jalon 1993 (échelle des années raccourcie), logo agrandi sous son libellé, nom d'origine sur trois lignes à droite du logo, carte de lieu agrandie.
- R1 conforme (gabarit frise).
- R2 conforme : contrôle bloquant passé.
- R3 conforme : logo et carte de lieu agrandis, hauteurs tirées du viewBox.
- R4 conforme : aucun texte sur un trait.
- R5 conforme : mises en évidence et textes dans la face (nom : bas à y 814).
- R6 conforme : marge ne porte que échelle, source, rose.
- R7 conforme : pas de chevauchement vu.
- R8 conforme dans le sens, deux écarts à la spécification (ci-dessous).

## Remonte au graphiste (places changées par rapport à spec.md, à revoir sur l'image finale)
1. Le jalon 1996 passe de x 866 à x 730 (cases raccourcies à 89 px l'année) : à 866 il fallait vider l'espace sous la frise, impossible sans changer les éléments.
2. « Feature Manipulation Engine » est à droite du logo sur trois lignes, non sous lui sur une ligne (spec : « sous le logo »).
3. La carte de lieu est à y 220 à 456 (non collée au haut de la face) : la centrer verticalement garde chaque vide sous 136 px.
4. Le libellé 1993 passe sur trois lignes ; vérifié sur l'image (trois lignes réelles).
