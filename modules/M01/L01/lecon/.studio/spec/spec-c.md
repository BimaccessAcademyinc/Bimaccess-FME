## S05 · FME lit, transforme, puis écrit

D'où vient l'idée : la phrase décrit un trajet (« quitte », « lire », « écrire », « dans le format attendu ») ; la carte topographique le dessine comme une route qui part d'une feuille et arrive à une autre, la route bleue pour ce que FME lit, la rouge pour ce qu'il écrit (charte § 1). Objet étudié : oui, « FME commence par lire les données source » ; l'outil se montre par son travail, sans fenêtre ni capture.

**Composition** (px de scène 1920 × 1080) : une chaîne horizontale centrée sur l'axe y 540, de x 104 à x 1488 ; la feuille d'arrivée déborde dans la marge entre y 360 et y 676 (débord permis jusqu'à x 1500 entre y 360 et 690) ; pas de légende (les deux routes portent leur nom le long de leur tracé).

- Habillage posé à la première image (`at={0} dur={0}`) : `ASSETS["echelle-graphique"]` en x 1480, y 84, 300 × 34 (pas de légende : l'échelle prend le haut de la marge, comme en S03 et S04) ; `ASSETS["rose-des-vents"]` en x 1712, y 700, 116 × 116.
- Titre `FME lit, transforme, puis écrit.` (Écran, rang 1) : composant `Title`, x 104, y 84, Serif 600 66 px, une ligne (largeur mesurée avec Source Serif 4 : 958 px, fin à x 1062), filet double de 300 px dessous.
- Chaîne `ASSETS["s05-chaine"]` en x 100, y 356, 1392 × 324 (le `viewBox` du fichier est en px de scène : `100 356 1392 324`). Décor du fichier, posé à la première image :
  - feuille `Format de départ` : x 104 à 464, y 360 à 676 (aplat `papier`, bordure 2 px, contour 1 px décalé de 3 px), bandeau de y 360 à 416, trame de lignes horizontales `carroyage` 0,8 px tous les 12 px ;
  - feuille `Format attendu` : x 1128 à 1488, y 360 à 676, même dessin, bandeau de y 360 à 416, trame quadrillée `carroyage` 0,8 px tous les 16 px : l'autre trame, l'autre format.
- Groupes du fichier révélés plus tard : `s05-chaine-outils` (cartouche `Outils de transformation`, x 646 à 946, y 360 à 676, aplat `papier`, bordure 2 px, contour 0,8 px décalé de 3,6 px, bandeau de y 364 à 440) ; `s05-chaine-lire-pointe` (pointe de sens de la lecture, triangle `lecture` à bord `encre` 2 px de x 618 à 644, y 526 à 554) ; `s05-chaine-ecrire-pointe` (pointe de l'écriture, triangle `ecriture` de x 1100 à 1126, y 526 à 554).
- Carte d'entité `ASSETS["s05-carte"]`, 140 × 100 : cadre `papier` à bordure `encre` 2 px, trame horizontale de sa feuille de départ, un contour de parcelle (quadrilatère `encre` 3 px, pas le bâtiment de S03) et sa ligne d'attribut (barre `encre-2` 3 px). Groupe révélé plus tard : `s05-carte-trame-attendue` (la même carte sur la trame quadrillée de la feuille d'arrivée : aplat `papier` sur tout l'intérieur, quadrillage, contour et ligne redessinés). La carte se déplace d'un bloc (`Move`, même échelle), haut gauche de la carte :
  - C0, dans la feuille de départ : x 214, y 490 (posée à la première image) ;
  - C1, sortie au bout de la route de lecture : x 656, y 490 ;
  - C2, dans les outils de transformation : x 726, y 490 ;
  - C3, dans la feuille d'arrivée : x 1238, y 490.
- Routes tracées par le code, trois `Trace` superposés par route (bord, chaussée, axe : même chemin, même `at`, même durée 0,4 s, plancher de la charte pour un trajet de 154 px), bouts nets (`Trace` en carte) : un bout de route ne se voit nulle part dans cette scène, il touche une feuille ou une pointe :
  - route de lecture : de (464, 540) à (618, 540), du bord droit de la feuille de départ à la base de la pointe ; bord `encre` 13 px, chaussée `chaussee` #FFFFFF 10 px, axe `lecture` 5 px ;
  - route d'écriture : de (946, 540) à (1100, 540), du bord droit des outils à la base de sa pointe ; bord `encre` 11 px, chaussée 8 px, axe `ecriture` 4 px.
  La pointe de chaque route touche la chose où elle arrive (lecture : pointe à x 644, outils à x 646 ; écriture : pointe à x 1126, feuille à x 1128).
- Textes placés :
  - `Format de départ` (Écran, rang 2) : en-tête de cartouche (Barlow Condensed 600, 24 px, capitales, interlettrage 0,32 em), x 124, y 374, sur le `papier` du bandeau (mesuré : 287 px) ;
  - `Format attendu` (Écran, rang 3) : même style, x 1148, y 374 (257 px) ;
  - `Lire` (Écran, rang 4) : nom de lieu petit (Barlow Condensed 600, 26 px, capitales, 0,24 em), centré sur x 541 au-dessus de la route, boîte y 494 à 528 (65 px) ;
  - `Outils de transformation` (Écran, rang 5) : en-tête de cartouche sur deux lignes, coupure après « de » (« OUTILS DE », 155 px ; « TRANSFORMATION », 259 px), interligne 32 px, boîte x 666 à 926, y 370 à 434 ; si le rendu dépasse 260 px, l'interlettrage descend à 0,24 em, jamais la taille ;
  - `Écrire` (Écran, rang 6) : nom de lieu petit, centré sur x 1023 au-dessus de la route, boîte y 494 à 528 (102 px) ;
  - `D'après Safe Software` (Écran, rang 7) : marge, filet `encre` 0,8 px de 220 px en x 1448, y 764 ; texte en mention de source (Serif italique 400, 24 px, `lien` #7A4A22) en x 1448, haut à y 772, une ligne (228 px) ; lien cliquable vers la référence (REGLES 4.6) ; posé à la première image.

Réserves du carroyage (amorces en x 274, 502, 730, 958, 1186, 1414, 1642 et y 236, 464, 692, 920) : chaque texte posé sur le `fond` (`Lire`, `Écrire`, le titre, la mention de source) porte un fond `fond` #F1F3EC avec 2 px de marge en haut et en bas, 6 px à gauche et à droite, balayé avec son texte ; les textes des bandeaux reposent sur le `papier` de leur feuille. Contrôle fait : les feuilles et les outils couvrent entièrement les amorces (274, 464), (730, 464), (1186, 464) et (1414, 464), bras compris ; aucune amorce n'est à moins de 4 px d'un texte ou d'une feuille ; les rangées 236 et 692 restent libres au-dessus et au-dessous de la chaîne (feuilles arrêtées à y 676 pour cela) ; l'amorce (958, 464) reste visible entre les outils et `Écrire`, à 4 px du bord des outils, hors de tout texte.

| État | Ce qui est visible |
|---|---|
| S05-1 | habillage, les deux feuilles et leur bandeau, la carte en C0 sur la trame horizontale, mention de source ; le titre se tape |
| S05-2 | route de lecture tracée, sa pointe, `Lire` ; la carte sortie en C1, au bout de la route |
| S05-3 | outils de transformation et leur bandeau ; la carte entrée en C2 |
| S05-4 | mise en évidence sur le contour de la carte |
| S05-5 | mise en évidence sur la ligne d'attribut de la carte |
| S05-6 | route d'écriture tracée, sa pointe, `Écrire` ; la carte arrivée en C3 dans la feuille `Format attendu` ; aucune mise en évidence |
| S05-FIN | la carte prend la trame quadrillée de sa nouvelle feuille : la chaîne complète, titre, habillage, mention de source (composition finale) |

| Étape | Élément | Locution (mot pour mot, unique dans le clip S05-01) | Mouvement |
|---|---|---|---|
| 1 | habillage, décor de `ASSETS["s05-chaine"]`, carte en C0, `Format de départ`, `Format attendu`, mention de source et son filet | (début de scène, posés à la première image) | aucun |
| 2 | titre | « Une entité quitte son logiciel » | frappe à la cadence du thème (35 caractères par seconde) |
| 3 | route de lecture (trois `Trace`), puis groupe `s05-chaine-lire-pointe`, et `Lire` | « FME commence par lire » | tracé de (464, 540) vers (618, 540) en 0,4 s ; la pointe se pose à la fin du tracé (instant de la locution + 0,4 s, balayage gauche → droite 0,1 s) ; `Lire` balayé gauche → droite (0,3 s) au début du tracé |
| 4 | carte, de C0 à C1 | « FME commence par lire » | déplacement en ligne droite, 0,4 s, linéaire, à la fin du tracé (instant de la locution + 0,4 s) : la carte quitte sa feuille par la route |
| 5 | groupe `s05-chaine-outils` et `Outils de transformation` | « Ses outils de transformation manipulent » | balayage gauche → droite du cartouche (0,3 s), puis le bandeau se balaie gauche → droite (0,3 s) |
| 6 | carte, de C1 à C2 | « Ses outils de transformation manipulent » | déplacement en ligne droite, 0,25 s, easeOutCubic, à la fin du balayage du cartouche (instant de la locution + 0,3 s) |
| 7 | route d'écriture (trois `Trace`), puis groupe `s05-chaine-ecrire-pointe`, et `Écrire` | « FME peut alors écrire » | tracé de (946, 540) vers (1100, 540) en 0,4 s ; pointe à la fin du tracé ; `Écrire` balayé gauche → droite (0,3 s) au début du tracé |
| 8 | carte, de C2 à C3 | « FME peut alors écrire » | déplacement en ligne droite, 0,45 s, linéaire, à la fin du tracé (instant de la locution + 0,4 s) |
| 9 | groupe `s05-carte-trame-attendue` | « dans le format attendu » | balayage gauche → droite (0,3 s) : la nouvelle trame recouvre l'ancienne, sans fondu |

Mise en évidence (tireté `lecture` 2,5 px, motif 10 6, sans poignée, rectangle à angles vifs, tracé en 0,25 s depuis le coin haut gauche, `at` = instant de l'étape) : le contour de la carte en C2, rectangle x 738, y 494, 88 × 68, de « manipulent la géométrie » à « et les attributs » ; puis la ligne d'attribut, rectangle x 738, y 562, 104 × 24, de « et les attributs » à « FME peut alors écrire » ; aucune à la fin. Les deux rectangles ne se touchent pas ; un seul à la fois.

Couleurs par fonction : `encre` #23281F textes, cadres, contour, bord des routes ; `encre-2` #545B4C la ligne d'attribut (barre de texte du symbole, jamais un texte) ; `carroyage` #7D8576 les deux trames ; `papier` #FBFCF8 feuilles, outils, carte ; `chaussee` #FFFFFF chaussée des routes ; `lecture` #2F6DA8 axe et pointe de la route de lecture, et la mise en évidence (jamais en même temps qu'un tracé de lecture) ; `ecriture` #C4472B axe et pointe de la route d'écriture ; `lien` #7A4A22 la mention de source ; `fond` #F1F3EC réserves. Aucune couleur de thème cartographique : les deux trames sont au trait `carroyage`.

Écran étroit : textes de 24 px au moins, routes de 13 et 11 px, contour de la carte 3 px ; la carte (140 × 100) reste lisible réduite au cinquième ; rien d'autre n'a été simplifié.

## S06 · Un moteur central relie les formats pris en charge

D'où vient l'idée : la figure « What is FME » de la documentation de Safe Software (VIS-01, redessinée, sans logo) et la convention de la carte : le moteur est le point géodésique auquel tout se rattache, au centre de ses courbes de niveau ; les formats en feuilles autour de lui forment un éventail ouvert en bas, où se pose son nom ; chaque feuille est reliée au moteur par une route double, bleue pour ce qui se lit, rouge pour ce qui s'écrit, puisque chaque format se lit et s'écrit. Objet étudié : oui, « Safe Software décrit FME comme un moteur central au milieu de ces formats ».

**Composition** (px de scène 1920 × 1080) : le moteur au centre (860, 552), huit feuilles de format en éventail autour de lui, la carte des fondateurs en haut à gauche sous le titre ; pas de légende (voir « Points ouverts »).

- Habillage posé à la première image : `ASSETS["echelle-graphique"]` en x 1480, y 84, 300 × 34 ; `ASSETS["rose-des-vents"]` en x 1712, y 700, 116 × 116.
- Titre `Le moteur relie les formats.` (Écran, rang 1) : composant `Title`, x 104, y 84, Serif 600 66 px, une ligne (mesuré : 861 px, fin à x 965), filet double de 300 px dessous.
- Couronne `ASSETS["s06-couronne"]` en x 230, y 248, 1260 × 526 (`viewBox` en px de scène : `230 248 1260 526`). Décor du fichier, posé à la première image : huit feuilles de format de 158 × 106 au tireté `encre` 6 4 (feuille non reliée), chacune avec un contenu différent, sans nom de format (haut gauche de chaque feuille) : courbes (607, 252), hydrographie (955, 252), cadastre (1233, 352), routes (1328, 510), végétation (1204, 664), points (358, 664), image (234, 510), bâti (329, 352) ; la liaison `encre` 2,5 px qui part de la feuille image, de (392, 570.2) à (829, 561.1), et s'arrête sur le manque `manque` tireté 3 px (8 5), fond `manque-fond`, carré x 833 à 887, y 525 à 579.
- Groupes du fichier révélés plus tard :
  - `s06-couronne-courbes` : courbes de niveau autour du centre (trois anneaux `relief` 0,72 px dans le fichier agrandi 1,8 fois, soit 1,3 px en scène, et la maîtresse `relief-maitresse` 2,2 px en scène), boîte x 690 à 1039, y 441 à 682, sous tout le reste du fichier ;
  - `s06-couronne-moteur` : une réserve `fond` x 794 à 926, y 514 à 590, qui couvre le manque et le bout de la liaison (aucune courbe n'est dessous, contrôlé), puis le point géodésique (triangle `papier` à contour `encre` 3 px, sommet (860, 525), base y 579 de x 830 à 890, point central (860, 561) de 5,5 px de rayon) ;
  - `s06-couronne-reliees` : le trait plein des huit feuilles (bordure 2 px, contour 1 px), posé exactement sur leur tireté.
- Carte des fondateurs `ASSETS["s06-fondateurs"]` en x 104, y 192, 420 × 140 : carte de rôle `papier`, bordure 2 px, contour 0,8 px, bandeau de y 192 à 240, deux silhouettes d'échelle pleines `encre` (70 px) debout sur un sol, la même carte qu'en S01 et S02 (dessin de `carte-role.svg`), réduite en hauteur.
- Routes tracées par le code (seize, une route de lecture et une route d'écriture par feuille, côte à côte, la lecture à droite du sens qui entre au moteur) : trois `Trace` superposés par route, même chemin, même `at`, même durée 0,4 s ; lecture : bord `encre` 13 px, chaussée #FFFFFF 10 px, axe `lecture` 5 px, tracée de la feuille vers le moteur ; écriture : bord `encre` 11 px, chaussée 8 px, axe `ecriture` 4 px, tracée du moteur vers la feuille. Pas de pointe : le sens se lit dans la couleur (S05) et dans le sens du tracé. Le bout côté feuille touche le bord de la feuille ; le bout côté moteur s'arrête à 64 px du centre et doit être **rond** (voir « Ce que le code doit faire »).

| Feuille | Route | Côté feuille (x, y) | Côté moteur (x, y) |
|---|---|---|---|
| courbes | lecture | (712.8, 358) | (816.5, 505.1) |
| courbes | écriture | (732.4, 358) | (829.5, 495.7) |
| hydrographie | lecture | (986.4, 358) | (889.6, 495.3) |
| hydrographie | écriture | (1006, 358) | (902.8, 504.4) |
| cadastre | lecture | (1233, 421.4) | (917.7, 524.3) |
| cadastre | écriture | (1233, 438.3) | (922.8, 539.4) |
| routes | lecture | (1328, 553.2) | (923.6, 544.8) |
| routes | écriture | (1328, 569.2) | (923.4, 560.8) |
| végétation | lecture | (1204, 677.4) | (922.2, 567.2) |
| végétation | écriture | (1204, 694.6) | (916.5, 582.1) |
| points | lecture | (516, 695.7) | (804, 583) |
| points | écriture | (516, 678.5) | (798.1, 568.2) |
| image | lecture | (392, 570.2) | (796.8, 561.8) |
| image | écriture | (392, 554.2) | (796.3, 545.8) |
| bâti | lecture | (487, 439.3) | (797.1, 540.4) |
| bâti | écriture | (487, 422.5) | (801.9, 525.2) |

  La route de lecture de la feuille image suit exactement la liaison du décor et la recouvre (bord de 13 px sur un trait de 2,5 px) ; le reste de la liaison, jusqu'au manque, est sous la réserve du moteur depuis l'étape 4.
- Textes placés :
  - `Formats pris en charge` (Écran, rang 2) : étiquette de groupe en légende (Serif italique 400, 27 px, `encre`), centrée sur x 860, boîte x 724 à 996, y 186 à 222, au-dessus des deux feuilles du haut (mesuré : 271 px) ;
  - `Moteur` (Écran, rang 3) : nom de lieu (Barlow Condensed 600, 34 px, capitales, 0,3 em), centré sur x 860 sous le point géodésique, boîte x 776 à 945, y 618 à 658, dans l'ouverture de l'éventail : 16 px au moins de chaque route, 10 px sous le cercle de mise en évidence (mesuré : 157 px) ;
  - `Don Murray · Dale Lutz` (Écran, rang 4) : en-tête de cartouche (Barlow Condensed 600, 24 px, capitales, 0,32 em), centré dans le bandeau de la carte des fondateurs, x 124 à 504, y 201 à 231, sur le `papier` (mesuré : 381 px) ;
  - `D'après Safe Software` (Écran, rang 5) : marge, filet `encre` 0,8 px de 220 px en x 1448, y 764 ; texte en mention de source en x 1448, haut à y 772, une ligne ; lien cliquable vers la page « What is FME » (REGLES 4.6) ; posé à la première image.

Réserves du carroyage : `Formats pris en charge`, `Moteur`, le titre et la mention de source portent un fond `fond` avec 2 px de marge en haut et en bas, 6 px à gauche et à droite, balayé avec leur texte ; `Moteur` pose ainsi sa réserve sur les courbes de niveau, comme un nom de lieu sur une carte. Contrôle fait : la carte des fondateurs couvre entièrement (274, 236) et (502, 236), la feuille points couvre (502, 692) ; les amorces (730, 236) et (958, 236) restent entières entre `Formats pris en charge` (bas à y 222) et les feuilles du haut (y 252) ; aucune feuille ne coupe une amorce (positions de l'éventail choisies pour cela) ; les amorces (730, 464), (958, 464), (1186, 464), (730, 692) et (958, 692) restent visibles parmi les courbes et sous les routes, loin de tout texte.

| État | Ce qui est visible |
|---|---|
| S06-1 | habillage, l'éventail des huit feuilles au tireté avec leur contenu, la liaison arrêtée sur le manque, mention de source |
| S06-2 | `Formats pris en charge` au-dessus de l'éventail |
| S06-3 | le titre se tape ; courbes de niveau, point géodésique à la place du manque, `Moteur` |
| S06-4 | mise en évidence (cercle) sur le moteur |
| S06-5 | huit routes de lecture tracées des feuilles vers le moteur ; aucune mise en évidence |
| S06-6 | huit routes d'écriture tracées du moteur vers les feuilles : l'étoile |
| S06-7 | carte des fondateurs en haut à gauche |
| S06-FIN | les huit feuilles passent au trait plein : l'étoile complète, les fondateurs en haut, titre, habillage, mention de source (composition finale ; la dernière phrase ne change rien) |

| Étape | Élément | Locution (mot pour mot, unique dans le clip S06-01) | Mouvement |
|---|---|---|---|
| 1 | habillage, décor de `ASSETS["s06-couronne"]` (feuilles au tireté, liaison, manque), mention de source et son filet | (début de scène, posés à la première image) | aucun |
| 2 | `Formats pris en charge` | « Autour de FME » | balayage gauche → droite (0,4 s), au début de la phrase qui le dit |
| 3 | titre | « Safe Software décrit FME » | frappe à la cadence du thème |
| 4 | groupe `s06-couronne-courbes`, puis groupe `s06-couronne-moteur`, puis `Moteur` | « Safe Software décrit FME » | courbes : balayage gauche → droite (0,8 s) ; moteur : balayage gauche → droite (0,3 s) qui recouvre le manque, au même instant que les courbes ; `Moteur` balayé gauche → droite (0,3 s) à la fin du balayage du moteur |
| 5 | huit routes de lecture (24 `Trace`) | « Les données se lisent depuis » | tracé de chaque feuille vers le moteur, toutes ensemble, 0,4 s, coordonnées de la table |
| 6 | huit routes d'écriture (24 `Trace`) | « et s'écrivent vers » | tracé du moteur vers chaque feuille, toutes ensemble, 0,4 s |
| 7 | carte des fondateurs `ASSETS["s06-fondateurs"]` et `Don Murray · Dale Lutz` | « Pour le problème que Murray et Lutz » | balayage haut → bas de la carte (0,3 s), puis le nom se balaie gauche → droite dans le bandeau (0,3 s) |
| 8 | groupe `s06-couronne-reliees` | « un logiciel différent n'empêche pas » | balayage gauche → droite sur tout l'éventail (0,6 s) : chaque feuille passe du tireté au trait plein au passage du balayage, sans fondu |

Mise en évidence : cercle tireté `lecture` 2,5 px (10 6) autour du point géodésique, centre (860, 552), rayon 56 (demi-diagonale du symbole 68 × 62 plus 10 px ; boîte du symbole x 826, y 521, 68 × 62), tracé en 0,25 s depuis le haut, de « un moteur central » à « Les données se lisent depuis » ; aucune ensuite ; aucune à la fin.

Couleurs par fonction : `encre` #23281F textes, feuilles, liaison, point géodésique, silhouettes, bord des routes ; `chaussee` #FFFFFF chaussée des routes ; `lecture` #2F6DA8 axe des routes de lecture, puis la mise en évidence (jamais visibles ensemble : elle s'éteint quand les routes de lecture se tracent) ; `ecriture` #C4472B axe des routes d'écriture ; `manque` #C99700 et `manque-fond` #FBF1C8 le manque du départ ; `relief` #B08A62 et `relief-maitresse` #8E6640 les courbes autour de ce que la voix met au centre ; `papier` #FBFCF8 feuilles, point géodésique, carte des fondateurs ; `lien` #7A4A22 la mention de source ; `fond` #F1F3EC réserves. Les couleurs de thème (`eau-fond`, `vegetation`, `vegetation-fond`, `image-clair`, `image-fonce`, et `lecture` et `ecriture` comme eau et routes) ne paraissent qu'à l'intérieur des huit feuilles.

Écran étroit : six libellés au plus (titre, `Formats pris en charge`, `Moteur`, `Don Murray · Dale Lutz`, mention de source) ; textes de 24 px au moins ; routes de 13 et 11 px, lisibles réduites ; les contenus des feuilles sont des aplats et des traits de 1,2 px au moins, qui se lisent comme des trames différentes même réduits. Rien n'a été simplifié.

## S07 · Une entité géographique vit dans un format

D'où vient l'idée : la question du pont a deux moitiés, « dans quel format » et « dans quel système de coordonnées » ; la convention du manque (REGLES 4.8) les pose comme deux liaisons arrêtées sur ce qui ne répond pas encore, chacune nommée au moment où la voix la dit. Objet étudié : non (la voix parle de l'entité géographique).

**Composition** (px de scène 1920 × 1080) : la feuille d'entité à gauche (x 260 à 680), deux traits arrêtés sur deux manques, les deux noms à droite des manques ; ensemble centré sur la face (x 260 à 1306) ; pas de légende, pas de mention de source (le storyboard n'en donne pas).

- Habillage posé à la première image : `ASSETS["echelle-graphique"]` en x 1480, y 84, 300 × 34 ; `ASSETS["rose-des-vents"]` en x 1712, y 700, 116 × 116.
- Titre `Une entité vit dans un format.` (Écran, rang 1) : composant `Title`, x 104, y 84, Serif 600 66 px, une ligne (mesuré : 931 px, fin à x 1035), filet double de 300 px dessous.
- `ASSETS["s07-entite"]` en x 256, y 356, 744 × 308 (`viewBox` en px de scène : `256 356 744 308`), entièrement posé à la première image, sans groupe révélé : feuille `papier` x 260 à 680, y 360 à 660 (bordure 2 px, contour 0,8 px décalé de 3,6 px), bandeau de y 364 à 414 ; dans la feuille, un contour d'entité au trait `encre` 3 px, nouveau (hexagone irrégulier de x 372 à 578, y 452 à 612 : ni le bâtiment de S03, ni la conduite de S04, ni la parcelle de S05) ; deux traits `encre` 2,5 px qui partent du bord droit de la feuille, de (680, 448) à (936, 448) et de (680, 568) à (936, 568) ; deux manques `manque` tiretés 3 px (8 5), fond `manque-fond`, x 940 à 994, y 421 à 475 et y 541 à 595.
- Textes placés :
  - `Entité géographique` (Écran, rang 2) : en-tête de cartouche (Barlow Condensed 600, 24 px, capitales, 0,32 em), centré dans le bandeau, x 302 à 639, y 374 à 404, `encre` (le terme a été nommé en S03), sur le `papier` (mesuré : 337 px) ; posé à la première image ;
  - `Format` (Écran, rang 3) : nom de lieu (Barlow Condensed 600, 34 px, capitales, 0,3 em), `encre`, à droite du premier manque, boîte x 1010 à 1166, y 428 à 468, centrée sur le trait (mesuré : 156 px) ;
  - `Système de coordonnées` (Écran, rang 4) : nom de lieu sur deux lignes, coupure après « de » (« SYSTÈME DE », 248 px ; « COORDONNÉES », 286 px), interligne 40 px, `encre`, à droite du second manque, boîte x 1010 à 1296, y 528 à 608, centrée sur le trait.

Réserves du carroyage : le titre, `Format` et `Système de coordonnées` portent un fond `fond` avec 2 px de marge en haut et en bas, 6 px à gauche et à droite, balayé avec leur texte ; `Entité géographique` repose sur le `papier` du bandeau. Contrôle fait : la feuille couvre entièrement (274, 464) et (502, 464) ; le premier manque couvre entièrement (958, 464) (traits placés à y 448 et 568 pour cela) ; `Format` finit à 8 px du bras gauche de l'amorce (1186, 464) ; l'amorce (730, 464) passe 7 px sous le premier trait, sans le toucher ; aucune amorce dans `Système de coordonnées`.

| État | Ce qui est visible |
|---|---|
| S07-1 | habillage, la feuille d'entité, ses deux traits arrêtés sur leurs manques ; le titre se tape |
| S07-2 | `Format` à côté du premier manque |
| S07-FIN | `Système de coordonnées` à côté du second manque : la feuille et ses deux manques nommés, titre, habillage (composition finale) |

| Étape | Élément | Locution (mot pour mot, unique dans le clip S07-01) | Mouvement |
|---|---|---|---|
| 1 | habillage, `ASSETS["s07-entite"]`, `Entité géographique` | (début de scène, posés à la première image) | aucun |
| 2 | titre | « Reste à savoir » | frappe à la cadence du thème |
| 3 | `Format` | « dans quel format » | balayage gauche → droite (0,3 s) |
| 4 | `Système de coordonnées` | « dans quel système de coordonnées » | balayage gauche → droite des deux lignes ensemble (0,4 s) |

Les étapes 3 et 4 tombent au milieu de l'unique phrase de la scène : chacune arrive sur les mots qui la disent, comme le demande le storyboard ; les caler toutes deux sur le début de la phrase effacerait les deux moitiés de la question.

Mise en évidence : aucune (le storyboard n'en demande pas ; les deux manques sont nommés l'un après l'autre).

Couleurs par fonction : `encre` #23281F textes, feuille, contour, traits ; `papier` #FBFCF8 feuille ; `manque` #C99700 et `manque-fond` #FBF1C8 les deux manques (jamais du texte : les noms sont en `encre` à côté) ; `fond` #F1F3EC réserves. Aucune couleur de thème cartographique, aucun `terme`.

Écran étroit : trois libellés en plus du titre, de 24 et 34 px ; manques de 54 px ; rien n'a été simplifié.

## Ce que le code doit faire (S05, S06, S07)

| # | Écart de la coque (rapport 06) | Scène | Ce que le code fait |
|---|---|---|---|
| 1 | Routes à bouts ronds (écart 6) | S05 | Rien de plus : chaque bout de route touche une feuille, les outils ou la base d'une pointe ; les bouts nets de `Trace` ne se voient pas. Les pointes sont dans le SVG, à rendre sous les `Trace` ; la route s'arrête exactement à la base de la pointe (x 618 et x 1100), sans la recouvrir |
| 2 | Routes à bouts ronds (écart 6) | S06 | Le bout côté moteur des seize routes se voit : il doit être rond. Ajouter au moteur une prop `cap` à `Trace` (`"round"`), lue en carte, et la passer aux 48 `Trace` des routes. À défaut, poser `ASSETS["s06-bouts"]` (`viewBox` `780 472 160 140`, en x 780, y 472, 160 × 140) **sous** les `Trace` des routes, sans décor : groupe `s06-bouts-lecture` révélé à la fin du tracé des routes de lecture (« Les données se lisent depuis » + 0,4 s), groupe `s06-bouts-ecriture` révélé au début du tracé des routes d'écriture (« et s'écrivent vers ») ; chaque bout est fait de trois disques concentriques (bord, chaussée, axe) centrés sur le point côté moteur de la table. Avec la prop `cap`, ce fichier n'est pas employé |
| 3 | Mise en évidence sans instant (écart 4) | S05, S06 | Passer `at` = l'instant de l'étape de `focusAt` (« manipulent la géométrie », « et les attributs », « un moteur central ») pour que le tireté se trace en 0,25 s |
| 4 | Cercle de mise en évidence (écart 5) | S06 | `Highlight shape="circle"` (HTML) posé sur une boîte vide x 826, y 521, 68 × 62 au-dessus du point géodésique : rayon calculé 56, centre (860, 552) |
| 5 | Courbes de niveau tracées anneau par anneau (charte § 7) | S06 | Pas faisable sans recopier les chemins dans la scène : le groupe `s06-couronne-courbes` est balayé d'un bloc. Proposition au moteur : un tracé de chemin `d` (avec transformation) pour `Trace`, ou un mode « tracé » de `Svg` pour un groupe, qui permettrait le tracé de la charte |
| 6 | Réserves | S05, S06, S07 | Chaque texte posé sur le `fond` reçoit `background: THEME.colors.fond` et un remplissage de 2 px en haut et en bas, 6 px à gauche et à droite, dans le même élément que le texte, balayé avec lui |
| 7 | Instants dérivés | S05, S06 | Les étapes qui suivent un tracé ou un balayage se calent sur l'instant de leur locution plus la durée de ce qui les précède (S05 étapes 3, 4, 6, 8 ; S06 étape 4 et bouts de secours), jamais sur un instant écrit à la main |

## Points ouverts (groupe c)

| # | Point | Proposition |
|---|---|---|
| 1 | S06 : seize routes bleues et rouges sans clé à l'écran ; `Lire` et `Écrire` ne sont nommés qu'en S05 | Ajouter `Lire` et `Écrire` à « ## Écran » de S06 pour une légende de marge (x 1448, y 84 : route de lecture → `Lire`, route d'écriture → `Écrire`, arrivées avec les routes, « Les données se lisent depuis » et « et s'écrivent vers ») ; l'échelle descendrait sous la légende. Au scénariste de l'écrire, puis au graphiste de la placer |
| 2 | S06 : la carte des fondateurs fait 420 × 140 contre 440 × 190 en S01 et S02 (`s01-projet`, `s02-frise`) : « petite » en hauteur seulement, car `Don Murray · Dale Lutz` en en-tête de cartouche à 24 px demande 381 px | À harmoniser avec le graphiste a (style du nom dans le bandeau en S01 et S02 ; s'il est plus petit, la carte de S06 rétrécit d'autant, sans passer sous 23 px) |
| 3 | S06 : les routes d'écriture se calent sur « et s'écrivent vers », au milieu de la phrase, comme le demande le storyboard, et non sur son début | Garder ainsi (la lecture puis l'écriture, chacune sur ses mots) ; sinon, enchaîner l'écriture à la fin du tracé de lecture, au début de la phrase |
| 4 | S05 : la carte attend en C1, sur la place des outils encore absents, entre « FME commence par lire » et « Ses outils de transformation manipulent » ; les outils se dessinent sous elle, puis elle avance de 70 px au centre | Aucune locution à ajouter ; à revoir sur planche si l'entrée paraît trop courte |
| 5 | S03 à S07 : sans légende, l'échelle graphique prend le haut de la marge (x 1480, y 84), comme dans la spécification du graphiste b | Règle commune à confirmer par l'orchestrateur pour S01 et S02 |
