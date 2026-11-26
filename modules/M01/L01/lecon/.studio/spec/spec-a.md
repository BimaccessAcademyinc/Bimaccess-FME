<!-- Graphiste a · groupe S01, S02 (le récit). L'orchestrateur réunit spec-a, spec-b et spec-c dans content/design/spec.md. -->

# Spécification visuelle · groupe a (S01, S02)

Storyboard suivi : `content/storyboard.md` (7 scènes ; ce fichier couvre S01 et S02). Thème : `content/design/theme.json` (jetons de la charte, inchangé). Signature : `carte`, charte suivie : `/home/user/Bimaccess-FME/design/CHARTE-FME001.md` et `design/tokens.json` (la charte CAD de BIMaccess ne s'applique pas). Programme : FME001, vert `#00A64F`, seulement dans la barre d'état (le lecteur l'y met ; aucune scène de ce groupe ne l'emploie).

D'où vient l'idée : la charte du module (la leçon se lit comme une feuille de carte imprimée) et les mots du récit. S01 est un territoire nommé où des parties doivent échanger (limite en tiret-point, cartes de rôle, un échange arrêté sur un manque) ; S02 est une frise, parce que la voix y date deux faits, avec au départ le document qui fait tout commencer (le contrat).

Toutes les coordonnées sont en px de la scène 1920 × 1080 ; une boîte se lit x, y (coin haut gauche), largeur × hauteur, ou x0 à x1, y0 à y1.

## Thème

Contrastes de la charte (§ 2, mesurés WCAG), sans changement :

| Rôle (clé de `THEME.colors`) | Couleur | Contraste mesuré |
|---|---|---|
| `encre` sur `fond` | #23281F sur #F1F3EC | 13,46:1 |
| `encre` sur `papier` | #23281F sur #FBFCF8 | 14,61:1 |
| `encre2` sur `fond` | #545B4C | 6,30:1 |
| `terme` sur `papier` (SAIF, S02) | #1E6E3C | 6,08:1 |
| `lien` sur `fond` (mentions de source) | #7A4A22 | 6,63:1 |
| `lecture` (mise en évidence, trait) sur `fond` | #2F6DA8 | 4,85:1 |
| `carroyage` sur `fond` (filets, jamais du texte) | #7D8576 | 3,42:1 |

Polices : Source Serif 4 (`fonts.serif`), Barlow Condensed (`fonts.capitales`). Rayon 0. Texte tapé : `typingCps` 35. Écarts au thème de la charte : aucun.

## Composants récurrents du groupe

| Composant | Géométrie (px de scène) | Règles |
|---|---|---|
| Illustration de scène | `s01-projet.svg`, `s02-frise.svg` : `viewBox="100 180 1328 680"`, en coordonnées de scène ; à poser à `left 100, top 180, width 1328, height 680` (échelle 1:1, aucune conversion de coordonnées) | posée au-dessus de la feuille de `SceneRoot` (ses aplats `papier` couvrent les amorces) ; décor (tout ce qui n'est pas dans un groupe nommé) à la première image : `<Svg … at={0} dur={0} parts={…}>` ; chaque groupe `sNN-…-…` balayé sur sa locution ; les textes HTML posés **au-dessus** du SVG |
| Habillage de marge | `echelle-graphique.svg` à x 1480, y 96, 300 × 34 ; `rose-des-vents.svg` à x 1712, y 700, 116 × 116 | copies de la charte (déjà présentes dans `content/design/assets/`, identiques au fichier de `design/symboles/`) ; `at={0} dur={0}` ; sans légende dans ces deux scènes (aucun texte d'« Écran » n'est un libellé de légende), l'échelle prend la place du haut de la légende |
| Titre de scène | x 104, y 84 (haut de la boîte) ; serif 600, 66 px, -0,01 em, interligne 1 ; filet double de 300 px dessous (dessiné par `Title`) | tapé à la cadence du thème (`TypeText` de `Title`) sur la locution donnée par la scène |
| Mention de source (marge) | x 1448, **calée par le bas à y 820**, 250 px de large au plus ; serif italique 400, 24 px, interligne 1,2, couleur `lien` ; filet `encre` 1,2 px de 220 px, 10 px au-dessus de la première ligne, dessiné par le code (bord haut du bloc) | à la première image, sans animation ; cliquable (lien vers la référence, REGLES 4.6 ; adresse à fournir, voir Points ouverts). Calée par le bas et non à y 772 (charte) : à y 772, un bloc de deux ou trois lignes entrerait dans la zone d'action (y 834) |
| Carte de rôle | boîte = contour extérieur ; contour 0,8 px, bordure `papier` 2 px décalée de 4 px, bandeau fermé par un filet 1,2 px, sol 1,2 px, silhouettes de `personne.svg` pleines `encre` | le nom du rôle (texte d'« Écran ») en en-tête de cartouche : Barlow 600, 24 px, capitales, 0,32 em, interligne 1,2, `encre`, centré dans le bandeau ; il apparaît avec sa carte (même `Wipe`, même instant, même sens) |
| Carte des fondateurs (S01, S02) | 440 × 190 ; bandeau de 56 px ; deux silhouettes à l'échelle 1,2 | le même dessin dans les deux scènes (seule sa position change) |
| Fenêtre de logiciel | dessin de `logiciel.svg` redessiné à la taille : barre de titre (filet 1,5 px, trait de titre 3 px, deux cases), filet `carroyage`, zone de travail ; trois zones de travail différentes : trois boîtes liées, un tableau, un dessin (contour et trait) | sans nom, sans logo, sans capture ; S01 en 114 × 78, S02 en petit, 100 × 68, mêmes trois dessins dans le même ordre |
| Réserve des textes (amorces de quadrillage) | chaque bloc de texte posé sur la face hors d'une carte reçoit `background: THEME.colors.fond` et `padding: 2px` (réserve de la charte, § 3, nom de lieu) | les textes sont placés hors des croix du carroyage (croix de 16 px, centres x 274 + 228 k, y 236 + 228 k), contrôlé boîte par boîte ci-dessous ; la réserve garantit qu'aucune croix ne passe sous une lettre si une boîte s'élargit ; les textes posés dans une carte ou une feuille sont sur l'aplat `papier` du SVG, qui couvre la croix |
| Mise en évidence | rectangle à angles vifs, tireté `lecture` 2,5 px (10 6), sans poignée, à 10 px de l'élément (`Highlight` en carte, rectangle) | une seule à la fois ; la scène passe `at` = l'instant de l'étape de `focusAt` (écart 4 du rapport 06), pour que le tireté se trace en 0,25 s depuis le coin haut gauche ; l'ancienne disparaît d'un coup |

Couleurs par fonction dans ce groupe (une couleur = une fonction) :

| Jeton | Fonction ici |
|---|---|
| `encre` #23281F | textes, traits, cartes, silhouettes, liaison de S01, frise, jalons, cases des années, bord des routes |
| `papier` #FBFCF8 | intérieur des cartes, du contrat, de SAIF, des fenêtres, cases claires de la frise |
| `fond` #F1F3EC | réserve des textes posés sur la face |
| `manque` #C99700, `manqueFond` #FBF1C8 | le manque de S01 (l'échange que rien ne fait encore aboutir) ; jamais du texte |
| `ecriture` #C4472B, `chaussee` #FFFFFF | routes de traduction de S02 (axe et pointe de sens `ecriture`, chaussée blanche) : les données écrites vers le format SAIF |
| `terme` #1E6E3C | le nom « SAIF », terme nouveau de S02, au moment où il est nommé |
| `lien` #7A4A22 | mentions de source |
| `lecture` #2F6DA8 | la mise en évidence, rien d'autre |
| `carroyage` #7D8576 | filets internes (rubrique du contrat, barre d'outils des fenêtres) |

## S01 · Chaque entreprise forestière garde son logiciel

Objet étudié : non. Aucune phrase de S01 ne parle de FME ni d'une donnée géographique dessinée ; la voix parle du projet et de ses parties.

**Composition** (état final) :

- Limite de territoire en tiret-point (`encre` 2 px, 16 5 3 5), polygone de (118, 204) à (1410, 214), (1404, 846), (124, 836) : décor de `s01-projet.svg`, à la première image. Rien ne passe sous un texte.
- `Colombie-Britannique` (Écran, rang 2, `X.screen(1)`) : nom de lieu, Barlow 600, 34 px, capitales, 0,3 em, `encre`, x 890, y 770 (haut), largeur mesurée 491, dans le territoire, en bas à droite ; réserve `fond` 2 px. À la première image.
- Carte des fondateurs : décor, contour extérieur x 540 à 980, y 226 à 416, au centre haut du territoire, au-dessus du manque. `Don Murray · Dale Lutz` (rang 3, `X.screen(2)`) centré dans son bandeau (boîte x 544 à 976, y 230 à 282 ; largeur mesurée 381). À la première image.
- Carte des entreprises : groupe `s01-projet-entreprises`, x 170 à 540, y 450 à 650, bandeau de 84 px, une silhouette. `Entreprises forestières` (rang 4, `X.screen(3)`) centré dans le bandeau sur deux lignes, boîte x 184 à 526, y 454 à 534 (largeur maximale 300 px : « Entreprises » / « forestières », 198 et 196 px).
- Carte du gouvernement : groupe `s01-projet-gouvernement`, x 980 à 1380, y 450 à 650, bandeau de 84 px, une silhouette. `Gouvernement de la Colombie-Britannique` (rang 5, `X.screen(4)`) centré sur deux lignes, boîte x 994 à 1366, y 454 à 534 (largeur maximale 372 px : « Gouvernement de la » / « Colombie-Britannique », 326 et 356 px).
- Liaison : trait `encre` 2,5 px **tracé par le code** (`Trace`, bouts nets), points `[[546, 550], [730, 550]]`, de la carte des entreprises vers le gouvernement ; il s'arrête sur le manque.
- Manque : groupe `s01-projet-manque`, carré tireté `manque` 3 px (8 5) sur `manqueFond`, x 733 à 787, y 523 à 577 (à mi-chemin entre les deux cartes) ; aucun libellé.
- Fenêtres des logiciels : groupe `s01-projet-logiciels`, trois fenêtres de 114 × 78 sous la carte des entreprises, x 170, 298, 426, y 674 à 752 (boîtes liées, tableau, dessin).
- Titre `Chaque entreprise garde son logiciel.` (rang 1, `X.screen(0)`) : x 104, y 84, largeur mesurée 1162.
- Marge : `D'après la presse spécialisée et Safe Software` (rang 6, `X.screen(5)`), bloc x 1448, bas à y 820, trois lignes (« D'après la presse » / « spécialisée et Safe » / « Software »), filet à y 724 environ ; échelle et rose.

Amorces : `Colombie-Britannique` (x 890 à 1381, y 768 à 806 avec sa réserve), titre et mention de source ne touchent aucune croix. Les croix (730, 236) et (958, 236) sont sous la carte des fondateurs, (274, 464) et (502, 464) sous la carte des entreprises, (1186, 464) sous celle du gouvernement, (274, 692) et (502, 692) sous la première et la troisième fenêtre : les noms de rôle sont sur l'aplat `papier` de leur carte. Avant le balayage des cartes, ces croix restent visibles sans aucun texte dessus.

| État | Ce qui est visible |
|---|---|
| S01-1 | territoire et son nom, carte des fondateurs et leurs noms, mention de source, échelle, rose ; zone du titre vide |
| S01-2 | + carte des entreprises et carte du gouvernement, avec leurs noms |
| S01-3 | + liaison tracée des entreprises vers le gouvernement, arrêtée sur le manque or |
| S01-4 | + les trois fenêtres sous la carte des entreprises |
| S01-5 | + titre tapé ; mise en évidence sur les trois fenêtres |
| S01-FIN | la mise en évidence passe à la carte des fondateurs ; composition finale : territoire, fondateurs, les deux parties, leurs logiciels, la liaison arrêtée sur son manque, mise en évidence sur les fondateurs (la question finale ne change rien) |

| Étape | Élément | Locution (mot pour mot, unique dans le clip S01-01) | Mouvement |
|---|---|---|---|
| 1 | décor de `s01-projet.svg` (territoire, carte des fondateurs), `Colombie-Britannique`, `Don Murray · Dale Lutz`, mention de source, `echelle-graphique`, `rose-des-vents` | (début de scène, posé à la première image) | aucun (`at={0} dur={0}`) |
| 2 | groupes `s01-projet-entreprises` et `s01-projet-gouvernement`, avec `Entreprises forestières` et `Gouvernement de la Colombie-Britannique` | « Les entreprises forestières doivent » | balayage gauche → droite, 0,3 s, les deux cartes au même instant |
| 3 | liaison `[[546, 550], [730, 550]]`, puis groupe `s01-projet-manque` | « partager leurs données géographiques » | tracé à vitesse constante (0,4 s) des entreprises vers le gouvernement ; le carré se balaie de gauche à droite (0,25 s) quand le trait l'atteint (même locution, après la durée du tracé) |
| 4 | groupe `s01-projet-logiciels` | « utilisent des logiciels différents » | balayage gauche → droite (0,4 s) : les fenêtres paraissent l'une après l'autre |
| 5 | titre | « garde donc son logiciel » | frappe (`Title`) |
| 5 | mise en évidence A | « garde donc son logiciel » | tireté tracé en 0,25 s |
| 6 | mise en évidence B (A s'éteint d'un coup) | « voient de près ce problème » | tireté tracé en 0,25 s |

Mise en évidence : A, rectangle x 160, y 664, 390 × 98 (les trois fenêtres), de « garde donc son logiciel » à « voient de près ce problème » ; B, rectangle x 530, y 216, 460 × 210 (la carte des fondateurs), de « voient de près ce problème » à la fin de la scène. Une seule à la fois ; B reste dans l'image finale, puisque la question finale ne change rien à l'écran.

`data-board` : `S01-1` à `0`, `S01-2` à « Les entreprises forestières doivent », `S01-3` à « partager leurs données géographiques », `S01-4` à « utilisent des logiciels différents », `S01-5` à « garde donc son logiciel », `S01-FIN` à « voient de près ce problème ».

Écran étroit : rien de simplifié ; tous les textes font 24 px au moins, les traits porteurs de sens 2 px au moins (liaison 2,5 px, tireté du manque 3 px) ; les fenêtres gardent leur barre de titre lisible à 114 px de large.

## S02 · Safe Software commence par traduire vers SAIF

Objet étudié : oui à partir de « leur entreprise sort la première version de FME » ; FME s'y montre par son nom (jalon 1996 et nom d'origine), jamais par une fenêtre, une capture ni un logo. Avant, la voix parle du contrat, de l'entreprise et de la traduction.

**Composition** (état final) :

- Carte des fondateurs : décor, x 104 à 544, y 226 à 416 (le même dessin qu'en S01). `Don Murray · Dale Lutz` (rang 3, `X.screen(2)`) centré dans le bandeau, boîte x 108 à 540, y 230 à 282.
- Feuille du contrat : décor, x 104 à 544, y 450 à 630 (document : bordure 2 px, contour 0,8 px, filet double sous le titre à y 512 et 515). `Contrat du gouvernement` (rang 2, `X.screen(1)`) : serif 600, 30 px, interligne 1,15, `encre`, x 124, y 468, largeur mesurée 375. À la première image.
- Rubrique : groupe `s02-frise-rubrique` (filet `carroyage` 0,8 px de x 124 à 524, y 592) et `Appel d'offres remporté` (rang 4, `X.screen(3)`) : ligne de rubrique, serif 400, 28 px, interligne 1,25, x 124, y 540, largeur mesurée 318.
- Frise : décor, trait simple `encre` 2,5 px de (544, 540) à (1388, 540), qui part du bord droit du contrat, et bout ouvert (pointe pleine, sommet à 1412, 540). Aucune case et aucun jalon à la première image.
- Jalon 1993 : trait vertical `encre` 2 px **tracé par le code**, de (900, 514) à (900, 566). `1993 · Fondation de Safe Software` (rang 5, `X.screen(4)`) : serif 400, 28 px, interligne 1,25, `encre`, aligné à droite sur x 900, haut à y 576, largeur maximale 230 (deux lignes : « 1993 · Fondation » / « de Safe Software », 218 et 219 px) ; réserve `fond`.
- Jalon 1996 : trait vertical tracé par le code, de (1350, 514) à (1350, 566). `1996 · Première version de FME` (rang 8, `X.screen(7)`) : même style, aligné à droite sur x 1350, haut à y 576, largeur maximale 320 (« 1996 · Première version » / « de FME », 312 px au plus) ; réserve `fond`.
- Cases des années : groupe `s02-frise-annees`, x 900 à 1350, y 534 à 546, trois cases d'une année (150 px) : `encre`, `papier`, `encre`, seulement entre les deux jalons dits.
- `Feature Manipulation Engine` (rang 9, `X.screen(8)`) : ligne de rubrique en serif **italique** 400, 28 px (le nom d'origine est de l'anglais, charte § 3), `encre`, aligné à droite sur x 1350, haut à y 646 (boîte x 983 à 1350, y 646 à 681), sans lettre agrandie ni détachée ; réserve `fond`.
- Feuille SAIF : groupe `s02-frise-saif`, x 1060 à 1250, y 280 à 420, bandeau fermé à y 340, au-dessus de la frise, entre les deux jalons. `SAIF` (rang 6, `X.screen(5)`) : nom de lieu, Barlow 600, 34 px, capitales, 0,3 em, couleur `terme` (terme nouveau de S02), centré dans le bandeau (boîte x 1108 à 1201, y 293 à 327). Le corps de la feuille reste vide : la remise ne dit pas le genre de donnée que porte SAIF.
- Fenêtres des logiciels : groupe `s02-frise-logiciels`, trois fenêtres de 100 × 68, x 640 à 740, y 226, 316 et 406 (en colonne, à gauche de SAIF ; mêmes trois dessins qu'en S01).
- Routes de traduction : **tracées par le code**, trois routes d'écriture, chacune faite de trois `Trace` superposés (bord `encre` 11 px, chaussée `chaussee` 8 px, axe `ecriture` 4 px), **bouts ronds**, même chemin, même instant, même durée, de la fenêtre vers SAIF :
  - route 1 : `[[748, 260], [870, 260], [914, 304], [1028, 304]]`
  - route 2 : `[[748, 350], [1028, 350]]`
  - route 3 : `[[748, 440], [870, 440], [914, 396], [1028, 396]]`
- Pointes de sens : groupe `s02-frise-pointes`, trois triangles `ecriture` à bord `encre` 2 px, de x 1030 à 1056, centrés à y 304, 350, 396 (le bout de chaque route, contre le bord gauche de SAIF).
- `Traduction` (rang 7, `X.screen(6)`) : nom de lieu petit, Barlow 600, 26 px, capitales, 0,24 em, `encre`, x 790, y 194 (haut), largeur mesurée 178, au-dessus des routes ; réserve `fond`.
- Carte de lieu : groupe `s02-frise-lieu`, x 1100 à 1400, y 736 à 820, hors de la frise, en bas à droite ; signe de localité (cercle 2,5 px, point central) en (1140, 778). `Siège : Surrey` (rang 10, `X.screen(9)`) : toponyme, serif italique 400, 30 px, `encre`, x 1166, y 760 (haut), largeur mesurée 177. Sans date.
- Titre `Safe Software commence par traduire.` (rang 1, `X.screen(0)`) : x 104, y 84, largeur mesurée 1199.
- Marge : `D'après Safe Software et la presse spécialisée` (rang 11, `X.screen(10)`), bloc x 1448, bas à y 820, deux lignes (« D'après Safe Software » / « et la presse spécialisée », 228 px chacune), filet à y 753 environ ; échelle et rose.

Amorces : `Traduction` (y 192 à 222), les deux libellés de jalon (y 574 à 648), `Feature Manipulation Engine` (y 644 à 683) et la mention de source ne touchent aucune croix (la plus proche, 1186, 692, commence à y 684). Les croix (274, 236) et (502, 236) sont sous la carte des fondateurs, (274, 464) et (502, 464) sous le contrat, (730, 236) et (730, 464) sous la première et la troisième fenêtre. Le nom `SAIF`, la rubrique et `Siège : Surrey` sont sur l'aplat `papier` de leur feuille.

| État | Ce qui est visible |
|---|---|
| S02-1 | carte des fondateurs, feuille du contrat titrée, frise en trait simple à bout ouvert, mention de source, échelle, rose ; zone du titre vide |
| S02-2 | + rubrique `Appel d'offres remporté` |
| S02-3 | + jalon 1993 et son libellé |
| S02-4 | + feuille SAIF et son nom |
| S02-5 | + les trois fenêtres de logiciel |
| S02-6 | + routes de traduction, pointes, `Traduction` |
| S02-7 | + titre tapé |
| S02-8 | mise en évidence sur les routes et `Traduction` |
| S02-9 | + jalon 1996, cases des années, son libellé |
| S02-10 | + `Feature Manipulation Engine` |
| S02-11 | la mise en évidence passe au jalon 1996 et à son nom |
| S02-FIN | mise en évidence éteinte ; + carte de lieu ; composition finale : la frise et ses deux jalons, le contrat et les fondateurs au départ, SAIF et ses routes entre les jalons, le nom d'origine sous 1996, la carte de lieu à part |

| Étape | Élément | Locution (mot pour mot, unique dans le clip S02-01) | Mouvement |
|---|---|---|---|
| 1 | décor de `s02-frise.svg` (fondateurs, contrat, frise), `Don Murray · Dale Lutz`, `Contrat du gouvernement`, mention de source, `echelle-graphique`, `rose-des-vents` | (début de scène, posé à la première image) | aucun (`at={0} dur={0}`) |
| 2 | groupe `s02-frise-rubrique`, puis `Appel d'offres remporté` | « remportent le contrat » | la rubrique se balaie de haut en bas (0,25 s), puis le texte se tape |
| 3 | jalon 1993 `[[900, 514], [900, 566]]`, puis `1993 · Fondation de Safe Software` | « fondée en 1993 » | trait tracé de haut en bas (0,25 s), puis libellé tapé |
| 4 | groupe `s02-frise-saif` avec `SAIF` | « Le gouvernement a son format » | balayage gauche → droite (0,3 s), feuille et nom ensemble |
| 5 | groupe `s02-frise-logiciels` | « les données de chaque logiciel » | balayage haut → bas (0,3 s) : les fenêtres paraissent l'une après l'autre |
| 6 | routes 1, 2, 3, puis groupe `s02-frise-pointes`, puis `Traduction` | « doivent être traduites » | les neuf `Trace` ensemble, à vitesse constante (0,4 s), des fenêtres vers SAIF ; les pointes se balaient de gauche à droite à l'arrivée ; puis le libellé se tape |
| 7 | titre | « Murray et Lutz commencent par ce travail » | frappe (`Title`) |
| 8 | mise en évidence A | « une technologie de traduction pour SAIF » | tireté tracé en 0,25 s |
| 9 | jalon 1996 `[[1350, 514], [1350, 566]]`, groupe `s02-frise-annees`, `1996 · Première version de FME` | « en 1996 » | trait tracé de haut en bas (0,25 s), puis les cases se balaient de gauche à droite, de 1993 vers 1996 (0,3 s), puis libellé tapé |
| 10 | `Feature Manipulation Engine` | « à l'origine Feature Manipulation Engine » | frappe |
| 11 | mise en évidence B (A s'éteint d'un coup) | « fait passer les données géographiques » | tireté tracé en 0,25 s |
| 12 | mise en évidence éteinte ; groupe `s02-frise-lieu` avec `Siège : Surrey` | « Son siège est à Surrey » | balayage gauche → droite (0,3 s), carte et toponyme ensemble |

Mise en évidence : A, rectangle x 744, y 184, 312 × 272 (les routes et leur étiquette, borné par le bord des fenêtres et celui de SAIF), de « une technologie de traduction pour SAIF » à « fait passer les données géographiques » ; B, rectangle x 973, y 566, 387 × 125 (le libellé du jalon 1996 et le nom d'origine, sous le trait du jalon), de « fait passer les données géographiques » à « Son siège est à Surrey ». Aucune à la fin : la carte de lieu est un sujet à part, une mise en évidence restée sur 1996 la ferait lire comme datée.

`data-board` : `S02-1` à `0`, puis `S02-2` à `S02-11` et `S02-FIN` sur les locutions des étapes 2 à 12 du tableau, dans cet ordre.

Écran étroit : rien de simplifié ; les fenêtres de S02 sont petites (100 × 68) mais redisent celles de S01, et leurs routes de 8 à 11 px restent lisibles réduites ; les libellés de jalon sont sur deux lignes pour garder 28 px.

## Ce que le code doit faire (écarts de la coque, rapport 06)

| Écart | Où ce groupe en dépend | Ce que le code doit faire |
|---|---|---|
| 6 · `Trace` sans bouts ronds en carte | S02, routes de traduction | ajouter à `Trace` une prop de bout (`cap="round"`, défaut `butt`) appliquée à `stroke-linecap`, et poser chaque route en trois `Trace` superposés avec `cap="round"` (bord, chaussée, axe ; même `points`, même `at`, même durée). Ne pas mettre les routes dans le SVG : elles doivent se tracer. La liaison de S01 et les jalons restent à bouts nets |
| 4 · `Highlight` sans `at` | S01 (A, B), S02 (A, B) | passer à `Highlight` l'instant de l'étape de `focusAt` qui l'allume (`at`), pour le tracé de 0,25 s |
| 5 · cercle seulement en HTML | aucune | toutes les mises en évidence du groupe sont des rectangles (`Highlight` sur une boîte en px de scène) ; aucun symbole ponctuel n'est désigné |
| 3 · croix dans la zone d'action | aucune | rien |

## Points ouverts

| # | Point | Proposition |
|---|---|---|
| 1 | Adresse des liens des mentions de source (S01 « D'après la presse spécialisée et Safe Software », S02 « D'après Safe Software et la presse spécialisée ») : le storyboard demande qu'elles soient cliquables (REGLES 4.6) mais ne donne pas leur cible | au scénariste : donner pour chaque mention la référence du pack (adresse ou fiche) ; le code ne doit pas l'inventer |
| 2 | Routes de traduction de S02 dessinées en routes d'écriture (rouge) : la charte réserve les routes à ce que FME lit et écrit, et la traduction vers SAIF précède FME | retenu : la route d'écriture, parce que la phrase dit des données « traduites vers ce format », donc écrites dans SAIF ; la liaison d'échange ne convient pas (ce n'est pas un échange entre deux parties). À confirmer par Ilyas |
| 3 | `SAIF` en couleur `terme` | SAIF est du vocabulaire introduit en S02 (storyboard, `# Objectifs`) ; la charte cite « Entité géographique » comme exemple de terme, sans exclure les autres. À confirmer |
| 4 | Étape sans indication de la mise en scène : les fenêtres de S02 paraissent sur « les données de chaque logiciel » (la mise en scène fait partir les routes des fenêtres sans dire quand elles arrivent) | la locution nomme les logiciels au début de la phrase qui fait tracer les routes ; au scénariste de confirmer |
| 5 | Mise en évidence de S01 sur les fondateurs gardée jusqu'à la fin, celle de S02 éteinte sur « Son siège est à Surrey » | choix du graphiste, d'après « la question finale ne change rien à l'écran » (S01) et l'état final de S02 qui n'en porte pas |
| 6 | Mention de source calée par le bas à y 820 au lieu de y 772 | à reporter dans la charte (§ 4, marge) et à suivre par les deux autres groupes pour qu'elle reste à la même place d'une scène à l'autre |
