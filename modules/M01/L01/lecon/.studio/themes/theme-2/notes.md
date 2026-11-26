# Thème 2 · Feuille de carte · notes de planche (S03, état final)

Planche : `planche.svg`, 1920 × 1080, état final de S03 avec le choix a sélectionné et sa conséquence. Générée par un script de coordonnées (largeurs de texte mesurées sur les métriques des polices Azeret Mono et IBM Plex Sans du projet).

## Éléments et mots de la voix

| Élément | Place | Répond à |
|---|---|---|
| Cadre extérieur 3 px et cadre intérieur 1,4 px à 12 px, ombre décalée 6 × 8 px | 96, 80, 1034 × 712 ; 108, 92, 1010 × 688 | « une conduite d'eau » (narration d'entrée) |
| Titre de carte « Conduite d'eau », Azeret Mono 300, 34 px, interlettrage 4 px (0,12 em), filet `line` dessous à y 160 | centré sur x 613, ligne de base y 143 | « une conduite d'eau » |
| Face de carte, filet 1,4 px, vide sauf le tracé | 120, 170, 700 × 598 | « le tracé est la géométrie » (mise en évidence sur ce mot et sur « La géométrie la porte ») |
| Tracé de la conduite, polyligne 4 px `ink`, deux coudes, de bord à bord | 120,520 → 400,520 → 560,330 → 820,330 | « le tracé », « où la conduite passe » |
| Tableau en marge haute, filets `line-faint` : « Usage : eau potable », « Matériau : fonte », Plex 400, 24 px | 852, 186, 238 × 140 | « sont ses attributs » |
| Carton de localisation, cadre 1,4 px, « Repère » Azeret Mono 400, 24 px, `ink-2` | 852, 540, 238 × 212 | « le repère du cartouche » |
| Globe orthographique Ø 150, contour 1,6 px `ink`, graticule tous les 30° en 1 px `ink-3`, point plein 10 px `ink` | centre 971, 668 | « le système de coordonnées la rattache à la Terre » |
| « Géométrie », annotation posée dans le vide de la face, ligne de repère 1,2 px vers le segment oblique du tracé | texte 150, 256 ; point 470, 437 | « le tracé est la géométrie » |
| « Attributs », en marge, repère qui monte vers le tableau | texte 852, 376 ; point 1062, 300 | « sont ses attributs » |
| « Système de » / « coordonnées », en marge sur deux lignes, repère qui descend vers le globe | texte 852, 466 et 498 ; point 1014, 618 | « le repère du cartouche son système de coordonnées » |
| Accolade couchée à angles vifs, 1,6 px `cyan`, pointe vers le bas au milieu | x 120 à 1106, y 806 à 846 | « se lit donc dans deux parties » |
| Mise en évidence unique : tireté `grip` 2 px (10 6) et quatre poignées carrées pleines de 12 px autour du carton | 844, 532, 254 × 228 | « la rattache à la Terre » (dernière place de la mise en évidence) |
| Panneau de choix : question, choix a, b, c ; a sélectionné (bord plein `grip` 2 px, poignées carrées de 10 px, sans tireté) | 1180, 120, 644 × 556 | « Choisissez, sur la donnée reçue, la partie qui le lui dit » |
| Conséquence de a, panneau d'information (bord et barre gauche `cyan`), Plex 400, 24 px, trois lignes | 1212, 488, 580 × 156 | conséquence après VALIDER |
| CONTINUER, bouton à poignées, Azeret Mono 500, 26 px | 1612, 968, 260 × 64 (48 px des bords) | fin de la narration déclenchée |
| Fond blanc et grille de points de 24 px `grid-dot` | toute la scène | décor de `SceneRoot` |

Textes : seulement ceux de l'écran, de l'exercice et la conséquence de a du storyboard, mot pour mot, plus « CONTINUER » que nomme la fiche. Aucun texte sous 24 px. Couleurs : `ink`, `ink-2`, `ink-3`, `line`, `line-faint`, `line-soft`, `grid-dot`, `panel`, `paper`, `cyan`, `grip`. Aucun dégradé, filtre, coin arrondi, image matricielle.

## Décidé faute d'indication

- **Titre centré sur la feuille** (x 613) et non sur la seule face (x 470) : la fiche dit « centré sur la face », le concept dit « titre centré dans la marge haute » ; sur une carte, le titre se centre sur la feuille entière. À inverser si Ilyas lit autrement.
- **Casse du titre gardée** (« Conduite d'eau », pas de capitales espacées) : texte mot pour mot ; les capitales espacées du thème sont pour les toponymes, absents de S03.
- **Lignes du tableau sur une ligne chacune** : mesurées à 213 px et 175 px à 24 px, elles tiennent dans les 238 px de la marge ; la fiche permettait deux lignes « si besoin ».
- **Globe** : orthographique centré sur 20° de latitude, méridiens et parallèles à 60°, 30°, 0° ; point plein à 42° N, 28° à l'ouest du méridien central, choix sans valeur de fait (aucun lieu n'est dit). C'est aussi le dessin du globe de S02, sans nom de système.
- **Lignes de repère** : palier à droite du texte, oblique vers le point ; pour « Système de coordonnées », le palier part de la seconde ligne. Le repère de « Système de coordonnées » croise le haut du tireté de mise en évidence.
- **Panneau de choix et CONTINUER** dessinés d'après `DESIGN.md` (quiz-choice, feedback-panel, action-button), sans lire le code du lecteur : le rendu réel du composant fera foi. Pas d'en-tête dans le panneau de conséquence (mode conséquence, aucun verdict) ; pas de marque ■ de réponse attendue. Hauteur du panneau 556 px au lieu d'« environ 700 », ajustée au contenu.
- **CONTINUER dans la zone d'action** : le brief demande de la laisser libre, la fiche met CONTINUER dans l'état final ; seul ce composant du lecteur y est posé.
- **Barre d'état et icône SCU non dessinées** : la barre d'état est au-dessus de la scène (hors du 1920 × 1080) et l'icône SCU tomberait dans la bande des sous-titres. Le vert de programme, qui ne vit que dans la barre d'état pour cette scène, n'apparaît donc pas sur la planche.

## Points à regarder au rendu

- L'accolade couvre toute la largeur de la feuille, donc aussi la colonne de marge dont le haut porte le tableau : la lecture « tracé et carton » repose sur le bord bas, où seuls la face et le carton touchent. Si elle se lit comme « toute la feuille », raccourcir l'accolade n'est pas possible sans changer la composition (face et carton ne sont pas contigus).
- Les filets `line-faint` du tableau sont très pâles : le tableau se lit surtout par ses deux lignes de texte.
