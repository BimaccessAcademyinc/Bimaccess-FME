# Thème 3 · Le flux · notes de la planche S03

Planche : état final de S03 « Où passe la conduite », 1920 × 1080, `planche.svg`. Places et couleurs tirées de la fiche de planche du thème 3 (`directions.md`).

## Chaque élément et le mot de la voix auquel il répond

| Élément (groupe du SVG) | Place | Répond à |
|---|---|---|
| Liaison d'arrivée, flèche pleine et port d'entrée plein (`theme3-arrivee`) | de 0, 172 à 412, 172 ; port 412, 164 | « une équipe reçoit une conduite d'eau » |
| Carte de donnée à bandeau « Conduite d'eau », contour 3 px, ombre décalée 6 × 8 (`theme3-carte`) | 420, 140, 680 × 560 | « une conduite d'eau », « sur la donnée reçue » |
| Compartiment du tracé : polyligne 4 px à deux coudes, de bord à bord | 420, 204, 680 × 280 | « le tracé est la géométrie » |
| Compartiment du tableau : « Usage : eau potable », « Matériau : fonte » | 420, 484, 360 × 216 | « L'usage et le matériau sont ses attributs » |
| Cartouche « Repère » : globe Ø 120, deux méridiens, un parallèle, un point | 780, 484, 320 × 216 | « le repère du cartouche » |
| Port vide et boîte « Géométrie » (`theme3-geometrie`) | boîte 96, 320 ; port bord gauche y 344 | « le tracé est la géométrie » |
| Port vide et boîte « Attributs » (`theme3-attributs`) | boîte 96, 568 ; port bord gauche y 592 | « sont ses attributs » |
| Port vide et boîte « Système de coordonnées » (`theme3-systeme`) | boîte 620, 740 ; port bord bas x 940 | « le repère du cartouche son système de coordonnées » |
| Accolade cyan à angles vifs, pointe à droite (`theme3-accolade`) | x 1114 à 1146, y 204 à 700 | « se lit donc dans deux parties » |
| Mise en évidence unique : tireté `grip` et quatre poignées pleines autour du cartouche (`theme3-evidence`) | 772, 476, 336 × 232 | « le système de coordonnées la rattache à la Terre » |
| Panneau de choix : question, a sélectionné (bord plein bleu et poignées, pas de tireté), b, c, conséquence de a (`theme3-choix`) | 1200, 120, 624 × 560 | « Choisissez, sur la donnée reçue, la partie qui le lui dit » ; conséquence après VALIDER |

Étiquettes du schéma : « Conduite d'eau », « Repère », « Géométrie », « Attributs », « Système de coordonnées » (cinq). Plus petit texte : 24 px. Rien sous y 788 ; zone d'action et bande des sous-titres libres.

## Ce que j'ai dû décider faute d'indication

- **Aucun titre display.** L'écran de S03 n'a aucun texte de titre ; le titre de la scène est porté par la barre d'état du lecteur, hors planche. Je n'en ai pas ajouté.
- **CONTINUER, barre d'état et icône SCU non dessinés** : ce sont des composants du lecteur, et le brief demande de laisser libres la zone d'action et la bande des sous-titres (l'icône SCU y tomberait).
- **Dessin du panneau de choix** : imité de quiz-choice (lettres Azeret Mono `ink-3`, choix à bord `line`, sélection à bord plein `grip` 2 px et poignées pleines aux coins), fond blanc, filet `line-soft`, ombre décalée. Le vrai rendu est celui du lecteur.
- **Conséquence sans couleur de verdict** : fond `panel`, filet gauche 4 px `ink-2`. Je n'ai pas pris le cyan « information » du panneau de rétroaction, pour garder au cyan une seule fonction dans ce thème (l'accolade, liaison de lecture), comme le dit la fiche. Si le lecteur impose le cyan, l'accolade et la conséquence partageront la couleur.
- **Tracé** : points 420, 270 → 610, 270 → 790, 412 → 1100, 412 (deux coudes, de bord à bord), placé au-dessus de y 344 pour laisser lisible le port de la géométrie.
- **Tableau** : un filet `line` 1 px sépare les deux lignes ; le port des attributs tombe sur ce filet.
- **Globe** : le méridien double est un tracé de deux arcs (pas d'`ellipse`, pour ne porter aucun attribut `rx`) ; point plein Ø 10 en haut à droite du centre, sans signification de lieu.
- **Liaisons des boîtes de nom** à 1,2 px, comme la fiche (la règle des SVG relève les repères à 1,5 px pour la lecture réduite : à trancher si la planche est retenue).
- **Liaison d'arrivée** : la flèche pleine s'arrête à x 412, au contact du port plein ; la carte est déjà immobile.
- Le `<title>` du fichier et les commentaires ne sont pas visibles ; aucun texte visible hors storyboard.
