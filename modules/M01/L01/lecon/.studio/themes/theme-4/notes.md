# Thème 4 · La vue éclatée · notes de la planche S03

Planche : `planche.svg`, 1920 × 1080, état final de S03 (« Où passe la conduite »), choix a sélectionné, mise en évidence sur le cartouche.

## Chaque élément et le mot de la voix auquel il répond

| Élément (groupe du SVG) | Dessin | Répond à |
|---|---|---|
| Bandeau « Conduite d'eau » (`planche4-bandeau`) | resté à plat en tête, 96, 80, 520 × 60, fond `panel`, Azeret Mono 400, 30 px | « une conduite d'eau » (narration d'entrée) |
| Pièce du cadre principal et tracé (`planche4-cadre`, `planche4-trace`) | parallélogramme isométrique 440 × 190 unités, contour 3 px `ink`, chant de 6 px ; tracé projeté sur la pièce, polyligne 4 px `ink` à deux coudes, de bord à bord | « le tracé est la géométrie » ; « La géométrie la porte » |
| Pièce du tableau (`planche4-tableau`) | 240 × 110 unités, 1,6 px `ink`, élevée au-dessus de sa place en plan | « sont ses attributs » |
| Étiquette à plat « Usage : eau potable » / « Matériau : fonte » (`planche4-etiquette-attributs`) | deux lignes Plex 400, 24 px, non projetées, posées sur la pièce par un repère court | « L'usage et le matériau » |
| Pièce du cartouche (`planche4-cartouche`) | 200 × 110 unités, 1,6 px `ink`, descendue sous sa place en plan | « le repère du cartouche » ; « la rattache à la Terre » |
| Globe debout (`planche4-globe`) | cercle Ø 96 de face, deux méridiens, un parallèle, point plein 10 px : posé sur la pièce, jamais projeté | « la rattache à la Terre » |
| « Repère » (`planche4-titre-cartouche`) | Azeret Mono 400, 24 px, `ink-2`, à plat sur repère court | « le repère du cartouche » |
| Lignes de rappel (`planche4-rappels`) | 4 traits verticaux continus 1,5 px `line`, des sommets arrière du tableau et du cartouche vers le cadre | accompagnent l'éclatement : chaque pièce garde sa place dans la feuille |
| « Attributs » (`planche4-nom-attributs`) | ligne de repère (point, oblique, palier), Azeret Mono 400, 26 px | « sont ses attributs » |
| « Géométrie » (`planche4-nom-geometrie`) | idem, le point sur le tracé | « le tracé est la géométrie » |
| « Système de coordonnées » (`planche4-nom-systeme`) | idem, le point sur la pièce du cartouche | « le repère du cartouche son système de coordonnées » |
| Accolade (`planche4-accolade`) | verticale à angles vifs, x 1080 à 1112, y 366 à 846, pointe à droite, 1,6 px `cyan` ; elle tient la pièce du tracé et celle du repère, pas le tableau | « se lit donc dans deux parties » |
| Mise en évidence (`planche4-mise-en-evidence`) | tireté `grip` 2 px qui suit le parallélogramme du cartouche, poignées carrées pleines de 12 px aux quatre sommets ; seule de la planche | « la rattache à la Terre » (dernière position) |
| Panneau de choix (`planche4-panneau-choix`) | redessin du composant : question, a, b, c ; a sélectionné (bord plein `grip`, poignées bleues, sans tireté) ; conséquence de a dans un cadre d'information à filet `cyan` | « Choisissez » ; conséquence après VALIDER |

Textes : seulement ceux de l'écran et de l'exercice de S03, mot pour mot ; aucun sous 24 px. Étiquettes du schéma : Attributs, Géométrie, Système de coordonnées, Repère, et l'étiquette des attributs (cinq). Pas de titre display dans cette scène.

## Décisions prises faute d'indication

- **Écarts des pièces** : la fiche dit 190 px entre pièces. À 190 px, le tableau, élevé au-dessus de sa place à l'avant gauche, mord sur le coin arrière du cadre en projection ; et le cartouche descendrait sous y 880. J'ai pris 245 px pour le tableau (aucun recouvrement) et 140 px pour le cartouche (bas de la mise en évidence à y 851, sous la limite de 860). L'échelle 1 unité = 1 px et l'isométrie à 30° sont gardées.
- **Orientation de l'isométrie** : le coin haut gauche de la feuille en plan est le sommet haut de chaque pièce ; le cartouche, en bas à droite en plan, tombe ainsi au sommet bas : il est en bas en plan comme en hauteur.
- **Boîtes à l'écran** : recalculées par la projection (cadre 476 à 1021 × 320 à 641, tableau 380 à 683 × 170 à 351, cartouche 588 à 857 × 675 à 836), un peu différentes des boîtes « approchées » de la fiche ; la vue est décalée à droite (sommet du cadre à x 640) pour laisser la colonne des noms libre à gauche.
- **Lignes de rappel** : seulement depuis les sommets arrière, qui tombent exactement sur un bord ou un sommet du cadre ; les sommets avant tomberaient dans le vide. Elles passent sous les pièces (le cadre les masque), pour ne pas croiser le tracé.
- **Globe et tireté** : le globe est debout devant le bord arrière du cartouche ; le tireté passe donc derrière lui, comme le bord qu'il suit.
- **Étiquette des attributs** : rectangle à plat à deux lignes séparées d'un filet `line-faint`, à droite du tableau (736, 156, 262 × 96).
- **Panneau de choix** : redessiné d'après la charte (quiz-choice, feedback-panel « information » cyan, aucun verdict), puisque la planche n'est pas rendue par le lecteur ; le rendu réel est celui du composant.
- **Zone d'action laissée vide** : CONTINUER, nommé par la fiche dans l'état final, n'est pas dessiné, le brief demandant de laisser libre le dernier 360 × 140 ; le lecteur l'y pose.
- **Non dessinés** (fournis par le lecteur) : barre d'état de 28 px (où paraît le vert de programme `#00A64F`, absent de la planche comme le veut la fiche), icône SCU, sous-titres. La grille de points de 24 px est dessinée.
- **Ombre décalée** 6 × 8 px : sur le bandeau et le panneau seulement ; aucune ombre sous les pièces (la fiche l'interdit).
