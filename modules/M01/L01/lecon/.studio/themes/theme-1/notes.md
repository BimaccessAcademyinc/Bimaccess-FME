# Thème 1 · Feuille de donnée · planche de S03 (état final)

Fichier : `planche.svg`, 1920 × 1080, espace objet (fond blanc, grille de points de 24 px). Place de chaque objet : celle de la fiche de planche de `directions.md`, sauf les écarts notés plus bas.

## Chaque élément et le mot de la voix auquel il répond

| Élément | Dessin | Mot de la voix |
|---|---|---|
| Feuille « Conduite d'eau » | 330, 96, 780 × 604 ; contour 3 px `ink`, ombre décalée 6 × 8 px | « une conduite d'eau » (narration d'entrée) |
| Bandeau titré | fond `panel`, filet bas 1,4 px `ink` ; « Conduite d'eau » Azeret Mono 400, 30 px | « une conduite d'eau » |
| Cadre principal et tracé | cadre 1,4 px `line` ; tracé `ink` 4 px, bouts nets, angles vifs, qui entre par le bord gauche, fait deux coudes et sort par le bord droit | « une conduite d'eau » ; nommé sur « le tracé est la géométrie » |
| Tableau de deux lignes | « Usage : eau potable », « Matériau : fonte », Plex 400, 26 px, filet `line-faint` entre les lignes | « L'usage et le matériau sont ses attributs » |
| Cartouche « Repère » | case de titre 48 px (« Repère » Azeret Mono 400, 24 px, `ink-2`) ; globe au trait Ø 112, trois méridiens et deux parallèles 1 px `ink-2`, point plein Ø 10 `ink` posé à une intersection du graticule | « le repère du cartouche » |
| Étiquette « Géométrie » | ligne de repère de la charte (point 4 px, oblique à 45°, palier), 1,2 px `ink`, texte Azeret Mono 400, 26 px ; le point tombe sur le tracé | « le tracé est la géométrie » |
| Étiquette « Attributs » | idem ; le point tombe dans la première ligne du tableau | « sont ses attributs » |
| Étiquette « Système de coordonnées » | idem, repère qui descend du globe sous la feuille ; texte aligné à droite sur x 1086 | « le repère du cartouche son système de coordonnées » |
| Accolade cyan | x 1124 à 1156, y 184 à 676, pointe à droite à y 430 ; paliers droits, aucune courbe, 1,6 px `cyan` ; elle ne tient que le cadre principal et le cartouche | « se lit donc dans deux parties » |
| Mise en évidence unique | tireté `grip` 2 px à 8 px autour du cartouche (736, 486, 358 × 198), poignées carrées pleines de 12 px aux quatre coins | « la rattache à la Terre » (dernier déplacement : état final) |
| Panneau de choix | 1200, 120, 624 × 600 ; question Plex 600, 30 px ; choix a, b, c en cases 560 × 64 ; a sélectionné : fond `select-bg`, bord plein `grip`, poignées bleues aux coins | « Choisissez, sur la donnée reçue » |
| Conséquence de a | case d'information sous les choix, filet gauche `cyan`, texte du storyboard mot pour mot, Plex 400, 24 px | après VALIDER |

Couleurs : `ink` pour la donnée, `ink-2` pour le titre du cartouche et le graticule, `line` et `line-faint` pour les filets des zones, `panel` pour le bandeau, `cyan` pour l'accolade (et le filet d'information du panneau), `grip` pour la mise en évidence et la sélection. Aucun or, aucun rouge, aucun vert (le vert de programme ne vit que dans la barre d'état, hors de la planche).

## Décidé faute d'indication

- **Forme du tracé** : trois segments, horizontal, oblique, horizontal (coudes à 600, 330 et 760, 410), pour que le point de « Géométrie » tombe sur le tracé au point que donne la fiche (380, 330).
- **Lignes de repère** : texte posé sur le palier, oblique qui rejoint l'extrémité du palier la plus proche de l'objet. Pour « Géométrie » et « Attributs », textes placés 32 et 8 px plus haut que la fiche (lignes de base 280 et 580) pour une oblique franche à 45° ; pour « Système de coordonnées », l'oblique rejoint l'extrémité droite du palier (x 1086), la longueur du texte (372 px mesurés dans la police) ne laissant pas l'extrémité gauche sous la feuille.
- **Globe** : méridiens en ligne centrale et deux ellipses (rx 22 et 42), parallèles en deux droites à ± 24 px de l'équateur (globe vu de face, sans inclinaison) ; point posé à l'intersection d'un méridien et d'un parallèle. Le point de repère de l'étiquette (4 px) est sur le méridien central, loin du point posé (10 px), pour ne pas les confondre.
- **Bordure des zones** : le tableau et le cartouche ont, comme le cadre principal, un filet 1,4 px `line` ; la case de titre du cartouche est séparée par le même filet.
- **Panneau de choix et conséquence** : dessinés d'après `quiz-choice` et `feedback-panel` de la charte, pour la comparaison seulement ; le rendu réel est celui du lecteur. Conséquence sans en-tête de verdict (mode conséquence), en case d'information (filet `cyan`) : le cyan y a la fonction « information » du panneau, distincte de l'accolade.
- **CONTINUER** et **icône SCU** : non dessinés. Le brief demande de laisser libres la zone d'action (dernier 360 × 140) et la bande des sous-titres ; le lecteur y place CONTINUER et l'icône SCU lui-même.
- **Barre d'état** : hors de la planche (elle est au-dessus de la zone de scène).

## Écarts à la fiche

- Lignes de base de « Géométrie » (280 au lieu de 312) et « Attributs » (580 au lieu de 572), pour l'oblique à 45° de la charte.
- CONTINUER absent de la zone d'action, par la règle du brief.
