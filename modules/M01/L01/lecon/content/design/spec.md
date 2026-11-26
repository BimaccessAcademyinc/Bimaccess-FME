# Spécification visuelle · FME001-M01-L01

Charte : `/home/user/Bimaccess-FME/design/CHARTE-FME001.md` (signature carte). Réunie depuis `.studio/spec/spec-a.md` (S01, S02), `spec-b.md` (S03, S04) et `spec-c.md` (S05 à S07), écrites en parallèle par trois graphistes.

Règles communes, harmonisées par l'orchestrateur : mention de source calée par le bas à y 820 dans la marge ; sans légende, échelle graphique à x 1480, y 84.

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
| Illustration de scène | en coordonnées de scène, échelle 1:1, aucune conversion : `s01-projet.svg`, `viewBox="100 180 1400 690"`, à poser à `left 100, top 180, width 1400, height 690` (le territoire déborde dans la marge jusqu'à x 1494) ; `s02-frise.svg`, `viewBox="100 180 1328 680"`, à poser à `left 100, top 180, width 1328, height 680` | posée au-dessus de la feuille de `SceneRoot` (ses aplats `papier` couvrent les amorces) ; décor (tout ce qui n'est pas dans un groupe nommé) à la première image : `<Svg … at={0} dur={0} parts={…}>` ; chaque groupe `sNN-…-…` balayé sur sa locution ; les textes HTML posés **au-dessus** du SVG |
| Habillage de marge | `echelle-graphique.svg` à x 1480, y 96, 300 × 34 ; `rose-des-vents.svg` à x 1712, y 700, 116 × 116 | copies de la charte (déjà présentes dans `content/design/assets/`, identiques au fichier de `design/symboles/`) ; `at={0} dur={0}` ; sans légende dans ces deux scènes (aucun texte d'« Écran » n'est un libellé de légende), l'échelle prend la place du haut de la légende |
| Titre de scène | x 104, y 84 (haut de la boîte) ; serif 600, 66 px, -0,01 em, interligne 1 ; filet double de 300 px dessous (dessiné par `Title`) | tapé à la cadence du thème (`TypeText` de `Title`) sur la locution donnée par la scène |
| Mention de source (marge) | x 1448, **calée par le bas à y 820**, 250 px de large au plus ; serif italique 400, 24 px, interligne 1,2, couleur `lien` ; filet `encre` 1,2 px de 220 px, 10 px au-dessus de la première ligne, dessiné par le code (bord haut du bloc) | à la première image, sans animation ; cliquable (lien vers la référence, REGLES 4.6) : adresse lue dans `content/sources.json` (clé `sources`, par scène), nouvel onglet (`target="_blank"`, `rel="noopener"`), soulignée, `lienSurvol` au survol. Calée par le bas et non à y 772 (charte) : à y 772, un bloc de deux ou trois lignes entrerait dans la zone d'action (y 834) |
| Carte de rôle | boîte = contour extérieur ; contour 0,8 px, bordure `papier` 2 px décalée de 4 px, bandeau fermé par un filet 1,2 px, sol 1,2 px, silhouettes de `personne.svg` pleines `encre` | le nom du rôle (texte d'« Écran ») en en-tête de cartouche : Barlow 600, 26 px (agrandi avec la composition), capitales, 0,32 em, interligne 1,2, `encre`, centré dans le bandeau ; il apparaît avec sa carte (même `Wipe`, même instant, même sens) |
| Carte des fondateurs (S01, S02) | 440 × 220 ; bandeau de 60 px ; deux silhouettes à l'échelle 1,35 | le même dessin dans les deux scènes (seule sa position change) |
| Fenêtre de logiciel | dessin de `logiciel.svg` redessiné à la taille : barre de titre (filet 1,5 px, trait de titre 3 px, deux cases), filet `carroyage`, zone de travail ; trois zones de travail différentes : trois boîtes liées, un tableau, un dessin (contour et trait) | sans nom, sans logo, sans capture ; S01 en 128 × 87, S02 en 130 × 89, mêmes trois dessins dans le même ordre |
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

Recomposition (porte du sens, 2026-11-26) : la face est occupée sur toute sa largeur ; le territoire s'élargit jusqu'au bord droit de la face et déborde dans la marge entre y 378 et y 688 (débord permis par la charte, § 4, sans toucher un élément de marge) ; les deux parties sont aux deux bouts de la face, les fondateurs au centre, au-dessus du manque. Rien d'ajouté qui ne se nomme pas.

**Composition** (état final) :

- Limite de territoire en tiret-point (`encre` 2 px, 16 5 3 5), polygone (112, 196), (770, 186), (1420, 204), (1426, 378), (1494, 396), (1490, 672), (1424, 688), (1418, 858), (720, 866), (118, 852) : décor de `s01-projet.svg`, à la première image. Rien ne passe sous un texte.
- `Colombie-Britannique` (Écran, rang 2, `X.screen(1)`) : nom de lieu, Barlow 600, **38 px** (agrandi depuis 34 px avec la composition), capitales, 0,3 em, `encre`, aligné à droite sur x 1400, haut à y 788 (largeur mesurée 549), dans le territoire, en bas à droite ; réserve `fond` 2 px. À la première image.
- Carte des fondateurs : décor, contour extérieur x 555 à 995, y 210 à 430, au centre haut du territoire, au-dessus du manque. `Don Murray · Dale Lutz` (rang 3, `X.screen(2)`) centré dans son bandeau (boîte x 559 à 991, y 214 à 274). À la première image.
- Carte des entreprises : groupe `s01-projet-entreprises`, x 150 à 560, y 450 à 706, bandeau de 96 px, une silhouette (échelle 1,3). `Entreprises forestières` (rang 4, `X.screen(3)`) centré dans le bandeau sur deux lignes, boîte x 154 à 556, y 454 à 550 (largeur maximale 340 px : « Entreprises » / « forestières »).
- Carte du gouvernement : groupe `s01-projet-gouvernement`, x 990 à 1400, y 450 à 706, bandeau de 96 px, une silhouette (échelle 1,3). `Gouvernement de la Colombie-Britannique` (rang 5, `X.screen(4)`) centré sur deux lignes, boîte x 994 à 1396, y 454 à 550 (largeur maximale 402 px : « Gouvernement de la » / « Colombie-Britannique », 386 px au plus).
- Liaison : trait `encre` 2,5 px **tracé par le code** (`Trace`, bouts nets), points `[[566, 578], [742, 578]]`, de la carte des entreprises vers le gouvernement ; il s'arrête sur le manque.
- Manque : groupe `s01-projet-manque`, carré tireté `manque` 3 px (8 5) sur `manqueFond`, x 745 à 805, y 548 à 608 (à mi-chemin entre les deux cartes, sous les fondateurs) ; aucun libellé.
- Fenêtres des logiciels : groupe `s01-projet-logiciels`, trois fenêtres de 128 × 87 sous la carte des entreprises, x 150, 291, 432, y 730 à 817 (boîtes liées, tableau, dessin), sur la largeur de la carte.
- Titre `Chaque entreprise garde son logiciel.` (rang 1, `X.screen(0)`) : x 104, y 84, largeur mesurée 1162.
- Marge : `D'après la presse spécialisée et Safe Software` (rang 6, `X.screen(5)`), bloc x 1448, bas à y 820, trois lignes, filet à y 724 environ ; lien vers l'adresse de S01 de `content/sources.json` ; échelle et rose.

Amorces : `Colombie-Britannique` (x 851 à 1402, y 786 à 828 avec sa réserve), titre et mention de source ne touchent aucune croix. Les croix (730, 236) et (958, 236) sont sous la carte des fondateurs ; (274, 464), (502, 464), (274, 692) et (502, 692) sous la carte des entreprises ; (1186, 464) et (1186, 692) sous celle du gouvernement : les noms de rôle sont sur l'aplat `papier` de leur carte. Les croix (730, 464), (958, 464), (730, 692) et (958, 692) restent visibles entre les cartes, sans texte dessus ; (1414, 464) est à 6 px du bord droit du gouvernement, sans le toucher.

| État | Ce qui est visible |
|---|---|
| S01-1 | territoire et son nom, carte des fondateurs et leurs noms, mention de source, échelle, rose ; zone du titre vide |
| S01-2 | + carte des entreprises et carte du gouvernement, avec leurs noms |
| S01-3 | + liaison tracée des entreprises vers le gouvernement, arrêtée sur le manque or |
| S01-4 | + les trois fenêtres sous la carte des entreprises |
| S01-5 | + titre tapé ; mise en évidence sur les trois fenêtres |
| S01-FIN | la mise en évidence passe à la carte des fondateurs ; composition finale : territoire, fondateurs, les deux parties, leurs logiciels, la liaison arrêtée sur son manque, mise en évidence sur les fondateurs (la question finale ne change rien) |

Chaque élément arrive au début de la phrase qui le dit (première locution de la phrase) ; deux éléments d'une même phrase s'enchaînent.

| Étape | Élément | Locution (mot pour mot, unique dans le clip S01-01) | Mouvement |
|---|---|---|---|
| 1 | décor de `s01-projet.svg` (territoire, carte des fondateurs), `Colombie-Britannique`, `Don Murray · Dale Lutz`, mention de source, `echelle-graphique`, `rose-des-vents` | (début de scène, posé à la première image) | aucun (`at={0} dur={0}`) |
| 2 | groupes `s01-projet-entreprises` et `s01-projet-gouvernement`, avec `Entreprises forestières` et `Gouvernement de la Colombie-Britannique` | « Les entreprises forestières doivent » | balayage gauche → droite, 0,3 s, les deux cartes au même instant |
| 3 | liaison `[[566, 578], [742, 578]]`, puis groupe `s01-projet-manque` | même phrase, à la fin du balayage des cartes (+ 0,3 s) | tracé à vitesse constante (0,4 s) des entreprises vers le gouvernement ; le carré se balaie de gauche à droite (0,25 s) quand le trait l'atteint |
| 4 | groupe `s01-projet-logiciels` | « Or les entreprises utilisent » | balayage gauche → droite (0,4 s) : les fenêtres paraissent l'une après l'autre |
| 5 | titre | « Chaque entreprise garde donc » | frappe (`Title`) |
| 5 | mise en évidence A | « Chaque entreprise garde donc » | tireté tracé en 0,25 s |
| 6 | mise en évidence B (A s'éteint d'un coup) | « Murray et Lutz voient » | tireté tracé en 0,25 s |

Mise en évidence : A, rectangle x 140, y 720, 430 × 108 (les trois fenêtres), de « Chaque entreprise garde donc » à « Murray et Lutz voient » ; B, rectangle x 545, y 200, 460 × 240 (la carte des fondateurs), de « Murray et Lutz voient » à la fin de la scène. Une seule à la fois ; B reste dans l'image finale, puisque la question finale ne change rien à l'écran.

`data-board` : `S01-1` à `0`, `S01-2` à « Les entreprises forestières doivent », `S01-3` à la fin du balayage des cartes, `S01-4` à « Or les entreprises utilisent », `S01-5` à « Chaque entreprise garde donc », `S01-FIN` à « Murray et Lutz voient ».

Écran étroit : rien de simplifié ; tous les textes font 24 px au moins (noms de rôle 26 px), les traits porteurs de sens 2 px au moins (liaison 2,5 px, tireté du manque 3 px) ; les fenêtres gardent leur barre de titre lisible à 128 px de large.

## S02 · Safe Software commence par traduire vers SAIF

Objet étudié : oui à partir de « leur entreprise sort la première version de FME » ; FME s'y montre par son nom (jalon 1996 et nom d'origine), jamais par une fenêtre, une capture ni un logo. Avant, la voix parle du contrat, de l'entreprise et de la traduction.

Agrandissement (porte du sens, 2026-11-26) : la composition prend la face de x 104 à 1424 et de y 188 à 856 ; textes de 26 px au moins sur la face (la mention de source garde les 24 px de la marge, communs à toutes les scènes).

**Composition** (état final) :

- Carte des fondateurs : décor, x 104 à 544, y 210 à 430 (le même dessin qu'en S01). `Don Murray · Dale Lutz` (rang 3, `X.screen(2)`) centré dans le bandeau, boîte x 108 à 540, y 214 à 274.
- Feuille du contrat : décor, x 104 à 544, y 450 à 706 (document : bordure 2 px, contour 0,8 px, filet double sous le titre à y 524 et 527). `Contrat du gouvernement` (rang 2, `X.screen(1)`) : serif 600, 32 px, interligne 1,15, `encre`, x 128, y 474, largeur mesurée 400. À la première image.
- Rubrique : groupe `s02-frise-rubrique` (filet `carroyage` 0,8 px de x 128 à 520, y 652) et `Appel d'offres remporté` (rang 4, `X.screen(3)`) : ligne de rubrique, serif 400, 30 px, interligne 1,25, x 128, y 596, largeur mesurée 341.
- Frise : décor, trait simple `encre` 3 px de (544, 578) à (1398, 578), qui part du bord droit du contrat, et bout ouvert (pointe pleine, sommet à 1424, 578). Aucune case et aucun jalon à la première image.
- Jalon 1993 : trait vertical `encre` 2,5 px **tracé par le code**, de (900, 555) à (900, 601). `1993 · Fondation de Safe Software` (rang 5, `X.screen(4)`) : serif 400, 30 px, interligne 1,15, `encre`, aligné à droite sur x 900, haut à y 609, largeur maximale 250 (deux lignes : « 1993 · Fondation » / « de Safe Software », 234 et 235 px) ; réserve `fond`.
- Jalon 1996 : trait vertical tracé par le code, de (1350, 555) à (1350, 601). `1996 · Première version de FME` (rang 8, `X.screen(7)`) : même style, aligné à droite sur x 1350, haut à y 609, largeur maximale 350 (« 1996 · Première version » / « de FME », 334 px au plus) ; réserve `fond`.
- Cases des années : groupe `s02-frise-annees`, x 900 à 1350, y 571 à 585, trois cases d'une année (150 px) : `encre`, `papier`, `encre`, seulement entre les deux jalons dits.
- `Feature Manipulation Engine` (rang 9, `X.screen(8)`) : ligne de rubrique en serif **italique** 400, 30 px (le nom d'origine est de l'anglais, charte § 3), `encre`, aligné à droite sur x 1350, haut à y 704 (boîte x 957 à 1350, y 704 à 742), sans lettre agrandie ni détachée ; réserve `fond`.
- Feuille SAIF : groupe `s02-frise-saif`, x 1110 à 1370, y 268 à 480, bandeau fermé à y 342, au-dessus de la frise, entre les deux jalons. `SAIF` (rang 6, `X.screen(5)`) : nom de lieu, Barlow 600, 40 px, capitales, 0,3 em, couleur `terme` (terme nouveau de S02), centré dans le bandeau (boîte x 1114 à 1366, y 272 à 342). Le corps de la feuille reste vide : la remise ne dit pas le genre de donnée que porte SAIF.
- Fenêtres des logiciels : groupe `s02-frise-logiciels`, trois fenêtres de 130 × 89, x 664 à 794, y 226, 324 et 422 (en colonne, à gauche de SAIF ; mêmes trois dessins qu'en S01).
- Routes de traduction : **tracées par le code**, trois routes d'écriture, chacune faite de trois traits superposés (bord `encre` 13 px, chaussée `chaussee` 9 px, axe `ecriture` 5 px), **bouts ronds**, même chemin, même instant, même durée, de la fenêtre vers SAIF :
  - route 1 : `[[802, 270], [930, 270], [984, 324], [1080, 324]]`
  - route 2 : `[[802, 368], [1080, 368]]`
  - route 3 : `[[802, 466], [930, 466], [984, 412], [1080, 412]]`
- Pointes de sens : groupe `s02-frise-pointes`, trois triangles `ecriture` à bord `encre` 2 px, de x 1074 à 1106, centrés à y 324, 368, 412 (le bout de chaque route, contre le bord gauche de SAIF).
- `Traduction` (rang 7, `X.screen(6)`) : nom de lieu petit, Barlow 600, 28 px, capitales, 0,24 em, `encre`, x 845, y 188 (haut), largeur mesurée 191, au-dessus des routes ; réserve `fond`.
- Carte de lieu : groupe `s02-frise-lieu`, x 1104 à 1424, y 770 à 856, hors de la frise, en bas à droite ; signe de localité (cercle 2,5 px, point central) en (1146, 813). `Siège : Surrey` (rang 10, `X.screen(9)`) : toponyme, serif italique 400, 32 px, `encre`, x 1172, y 793 (haut), largeur mesurée 188. Sans date.
- Titre `Safe Software commence par traduire.` (rang 1, `X.screen(0)`) : x 104, y 84, largeur mesurée 1199.
- Marge : `D'après Safe Software et la presse spécialisée` (rang 11, `X.screen(10)`), bloc x 1448, bas à y 820, deux lignes, filet à y 753 environ ; lien vers l'adresse de S02 de `content/sources.json` ; échelle et rose.

Amorces : `Traduction` (y 186 à 226 avec sa réserve), les deux libellés de jalon (y 607 à 680), `Feature Manipulation Engine` (y 702 à 744) et la mention de source ne touchent aucune croix (les croix (730, 692), (958, 692) et (1186, 692) vont de y 684 à 700, entre les libellés et le nom d'origine). Les croix (274, 236) et (502, 236) sont sous la carte des fondateurs, (274, 464), (502, 464), (274, 692) et (502, 692) sous le contrat, (730, 236) et (730, 464) sous la première et la troisième fenêtre, (1186, 464) sous SAIF. Le nom `SAIF`, la rubrique et `Siège : Surrey` sont sur l'aplat `papier` de leur feuille.

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

Chaque élément arrive **au début de la phrase qui le dit**, sur la première locution de la phrase, jamais après (porte du sens) ; plusieurs éléments d'une même phrase s'enchaînent, le suivant partant à la fin du geste du précédent.

| Étape | Élément | Locution (mot pour mot, unique dans le clip S02-01) | Mouvement |
|---|---|---|---|
| 1 | décor de `s02-frise.svg` (fondateurs, contrat, frise), `Don Murray · Dale Lutz`, `Contrat du gouvernement`, mention de source, `echelle-graphique`, `rose-des-vents` | (début de scène, posé à la première image) | aucun (`at={0} dur={0}`) |
| 2 | groupe `s02-frise-rubrique`, puis `Appel d'offres remporté` | « Le gouvernement lance » | la rubrique se balaie de haut en bas (0,25 s), puis le texte se tape |
| 3 | jalon 1993 `[[900, 555], [900, 601]]`, puis `1993 · Fondation de Safe Software` | « De ce contrat naît » | trait tracé de haut en bas (0,25 s), puis libellé tapé |
| 4 | groupe `s02-frise-saif` avec `SAIF` | « Le gouvernement a son format » | balayage gauche → droite (0,3 s), feuille et nom ensemble |
| 5 | groupe `s02-frise-logiciels` | « Pour échanger avec lui » | balayage haut → bas (0,3 s) : les fenêtres paraissent l'une après l'autre |
| 6 | routes 1, 2, 3, puis groupe `s02-frise-pointes`, puis `Traduction` | même phrase, à la fin des fenêtres (+ 0,3 s) | les neuf traits ensemble, à vitesse constante (0,4 s), des fenêtres vers SAIF ; les pointes se balaient de gauche à droite à l'arrivée (0,15 s) ; puis le libellé se tape |
| 7 | titre | « Murray et Lutz commencent par ce travail » | frappe (`Title`) |
| 8 | mise en évidence A | même phrase, à la fin de la frappe du titre | tireté tracé en 0,25 s |
| 9 | jalon 1996 `[[1350, 555], [1350, 601]]`, groupe `s02-frise-annees`, `1996 · Première version de FME` | « Trois ans après la fondation » | trait tracé de haut en bas (0,25 s), puis les cases se balaient de gauche à droite, de 1993 vers 1996 (0,3 s), puis libellé tapé |
| 10 | `Feature Manipulation Engine` | même phrase, à la fin de la frappe du libellé 1996 | frappe |
| 11 | mise en évidence B (A s'éteint d'un coup) | « FME fait passer » | tireté tracé en 0,25 s |
| 12 | mise en évidence éteinte ; groupe `s02-frise-lieu` avec `Siège : Surrey` | « Son siège est à Surrey » | balayage gauche → droite (0,3 s), carte et toponyme ensemble |

Mise en évidence : A, rectangle x 798, y 178, 308 × 305 (les routes et leur étiquette, borné par le bord des fenêtres et celui de SAIF), de la fin de la frappe du titre à « FME fait passer » ; B, rectangle x 947, y 599, 413 × 153 (le libellé du jalon 1996 et le nom d'origine, sous le trait du jalon), de « FME fait passer » à « Son siège est à Surrey ». Aucune à la fin : la carte de lieu est un sujet à part, une mise en évidence restée sur 1996 la ferait lire comme datée.

`data-board` : `S02-1` à `0`, puis `S02-2` à `S02-11` et `S02-FIN` sur les instants des étapes 2 à 12 du tableau, dans cet ordre.

Écran étroit : rien de simplifié ; les fenêtres de S02 (130 × 89) redisent celles de S01, et leurs routes de 9 à 13 px restent lisibles réduites ; les libellés de jalon sont sur deux lignes pour garder 30 px.

## Ce que le code doit faire (écarts de la coque, rapport 06)

| Écart | Où ce groupe en dépend | Ce que le code doit faire |
|---|---|---|
| 6 · `Trace` sans bouts ronds en carte | S02, routes de traduction | ajouter à `Trace` une prop de bout (`cap="round"`, défaut `butt`) appliquée à `stroke-linecap`, et poser chaque route en trois `Trace` superposés avec `cap="round"` (bord, chaussée, axe ; même `points`, même `at`, même durée). Ne pas mettre les routes dans le SVG : elles doivent se tracer. La liaison de S01 et les jalons restent à bouts nets. En attendant le moteur : composant de scène `Route` (`src/lesson/components/s02-route.tsx`) |
| 4 · `Highlight` sans `at` | S01 (A, B), S02 (A, B) | passer à `Highlight` l'instant de l'étape de `focusAt` qui l'allume (`at`), pour le tracé de 0,25 s |
| 5 · cercle seulement en HTML | aucune | toutes les mises en évidence du groupe sont des rectangles (`Highlight` sur une boîte en px de scène) ; aucun symbole ponctuel n'est désigné |
| 3 · croix dans la zone d'action | aucune | rien |
| Mention de source cliquable | S01, S02 | l'adresse vient de `content/sources.json` (clé `sources`, par scène), lue par import JSON, jamais écrite en dur ; lien `target="_blank"`, `rel="noopener"`, souligné, `lien` au repos, `lienSurvol` au survol |

## Points ouverts

| # | Point | Proposition |
|---|---|---|
| 1 | Adresse des liens des mentions de source | tranché : `content/sources.json`, tirée du pack (S01 : Techcouver, 2023 ; S02 : Amerisurv, 2008) |
| 2 | Routes de traduction de S02 dessinées en routes d'écriture (rouge) | tranché : gardées par Ilyas (porte du sens, 2026-11-26) |
| 3 | `SAIF` en couleur `terme` | SAIF est du vocabulaire introduit en S02 (storyboard, `# Objectifs`) ; la charte cite « Entité géographique » comme exemple de terme, sans exclure les autres. À confirmer |
| 4 | Étape sans indication de la mise en scène : les fenêtres de S02 paraissent au début de la phrase « Pour échanger avec lui, les données de chaque logiciel doivent être traduites vers ce format » | la phrase nomme les logiciels et fait tracer les routes ; au scénariste de confirmer |
| 5 | Mise en évidence de S01 sur les fondateurs gardée jusqu'à la fin, celle de S02 éteinte sur « Son siège est à Surrey » | choix du graphiste, d'après « la question finale ne change rien à l'écran » (S01) et l'état final de S02 qui n'en porte pas |
| 6 | Mention de source calée par le bas à y 820 au lieu de y 772 | à reporter dans la charte (§ 4, marge) et à suivre par les deux autres groupes pour qu'elle reste à la même place d'une scène à l'autre |
| 7 | Tailles de texte au-dessus de l'échelle de la charte (§ 3) en S01 et S02 : noms de rôle 26 px (24), `Colombie-Britannique` 38 px et `SAIF` 40 px (34), rubriques et libellés de jalon 30 px (28), titre du contrat 32 px, `Traduction` 28 px (26), toponyme 32 px (30) | conséquence de l'agrandissement demandé à la porte du sens ; à reporter dans la charte si la règle des 26 px au moins devient générale |

## S03 · Une entité géographique porte trois parties

Signature : carte, charte suivie `/home/user/Bimaccess-FME/design/CHARTE-FME001.md` (jetons `design/tokens.json`). D'où vient l'idée : la convention du métier du bâtiment qui met le plan au-dessus de l'élévation, alignés (le contour sur la carte, le bâtiment réel dessous, à la même largeur), et la fiche d'objet à bandeau et rubriques de la charte (§ 5, « Comment se dessine une entité géographique »).

Objet étudié : non. La voix parle de l'entité géographique (« on l'appelle une entité géographique ») ; « C'est sur elle que FME travaille » nomme l'outil sans le montrer : aucune fenêtre, aucun nom d'outil à l'écran.

**Composition** (px de scène 1920 × 1080) :

- Habillage posé à la première image (`at={0} dur={0}`) : `ASSETS["echelle-graphique"]` en x 1480, y 84, 300 × 34 (la scène n'a pas de légende : l'échelle prend la place du haut de la légende) ; `ASSETS["rose-des-vents"]` en x 1712, y 700, 116 × 116.
- Titre `Une entité géographique a trois parties.` (Écran, rang 1) : x 104, y 84, Serif 600 66 px, une ligne (largeur mesurée avec Source Serif 4 : 1 234 px, fin à x 1 338), filet double de 300 px dessous (composant `Title`).
- Fond de carte `ASSETS["s03-carte"]` en x 104, y 210, 600 × 310 : îlots et rues au trait `carroyage` 1,2 px, limites de parcelles 0,8 px ; posé à la première image.
- Contour du bâtiment `ASSETS["s03-contour"]` (206 × 126, contour `encre` 3 px) : à la première image en x 327, y 287 (contour réel de x 330 à 530, y 290 à 410, dans l'îlot du centre) ; il se déplace ensuite vers x 821, y 327 (contour de x 824 à 1 024, y 330 à 450, dans la rubrique Géométrie), même taille. Groupe `s03-contour-hachure` : la hachure de surface, cachée jusqu'à sa locution.
- Bâtiment réel `ASSETS["s03-batiment"]` en x 300, y 600, 260 × 221 (élévation de la bibliothèque, échelle 1,3 : façade de x 334 à 526, sol à y 811), aligné sous le contour de la carte.
- Trait « représente » : de (526, 720), façade droite du bâtiment, à (796, 720), bord gauche de la feuille ; `encre` 2 px, bouts nets, sans pointe ; tracé par le code (`Trace`), du bâtiment vers la feuille.
- Feuille `ASSETS["s03-entite"]` en x 796, y 196, 628 × 654 (feuille `papier` de x 800 à 1 420, y 200 à 846, bordure 2 px, contour 0,8 px décalé de 3,6 px ; bandeau de y 200 à 256). Décor du fichier (groupe `s03-entite-feuille` et ce qui n'est dans aucun groupe révélé) : la feuille et le filet du bandeau. Groupes révélés chacun sur sa locution : `s03-entite-geometrie` (filet bas de la rubrique Géométrie, y 490), `s03-entite-signes` (un point, une ligne, une surface hachurée, de x 1 130 à 1 370, y 352 à 429), `s03-entite-attributs` (filet bas de la rubrique Attributs, y 620), `s03-entite-usage` (filet `carroyage` sous la ligne d'attribut, y 600, x 824 à 1 396), `s03-entite-systeme` (globe au trait, centre 904, 760, rayon 66), `s03-entite-globe-contour` (petit contour posé sur le globe, x 912 à 940, y 732 à 752).
- Textes de la feuille, posés par le code, tous à x 824 (24 px de la bordure) :
  - `Entité géographique` (Écran, rang 2) : en-tête de cartouche (Barlow 600, 24 px, capitales, 0,32 em ; 337 px), haut du texte à y 216, couleur `terme` (`THEME.colors.terme`, #1E6E3C) : c'est le terme nouveau, au moment où la voix le nomme ;
  - `Géométrie : points, lignes, surfaces` (Écran, rang 3) : titre de rubrique (Barlow 600, 24 px, capitales, 0,16 em ; 473 px), haut à y 274, `encre` ;
  - `Attributs` (Écran, rang 4) : titre de rubrique, haut à y 508, `encre` ;
  - `Usage : bureaux` (Écran, rang 5) : ligne de rubrique (Serif 400, 28 px, interligne 1,25 ; 213 px), haut à y 554, `encre` ;
  - `Système de coordonnées` (Écran, rang 6) : titre de rubrique, haut à y 638, `encre`.
- Mention de source `D'après Safe Software et l'OGC` (Écran, rang 7) dans la marge : filet `encre` 0,8 px de 220 px en x 1 448, y 764 ; texte en mention de source (Serif italique 400, 24 px, `lien` #7A4A22, interligne 1,15) en x 1 448, haut à y 772, 250 px de large au plus : deux lignes (« D'après Safe Software » 228 px, puis « et l'OGC »), fin vers y 827, hors de la zone d'action ; lien cliquable vers la référence (REGLES 4.6) ; posée à la première image.

Réserves du carroyage (amorces en x 274, 502, 730, 958, 1 186, 1 414, 1 642 et y 236, 464, 692, 920) : le titre (y 84 à 170) et la mention de source (x 1 448 à 1 698, y 764 à 827) ne contiennent aucune amorce ; le code leur donne tout de même un fond `fond` (`THEME.colors.fond`) avec 2 px de marge, pour qu'une amorce ne passe jamais sous un texte si la place bouge. Les textes de la feuille reposent sur le `papier` de la feuille, qui couvre les amorces 958, 1 186 et 1 414 sur les trois rangées ; le fichier porte sous la feuille un aplat `fond` de x 796 à 1 424, pour que le bras droit de l'amorce de x 1 414 (jusqu'à x 1 422) ne dépasse pas entre la bordure et le contour. L'amorce (502, 692) tombe dans le bâtiment, couverte par sa façade `papier`. Les amorces du fond de carte restent visibles : aucun texte n'y est posé.

Zones libres : rien sous y 860 ; sous-titres (y ≥ 880, x < 1 300) et zone d'action (x 1 454, y 834, 360 × 140) vides.

| État | Ce qui est visible |
|---|---|
| S03-1 | habillage, fond de carte et contour seul dessus, mention de source ; le titre se tape |
| S03-2 | en plus : la feuille vide (bandeau sans texte), le bâtiment réel à gauche, le trait du bâtiment vers la feuille |
| S03-3 | `Entité géographique` tapé dans le bandeau, en `terme` ; mise en évidence sur le bandeau |
| S03-4 | rubrique Géométrie : son titre et son filet, le contour arrivé de la carte, puis les trois signes, puis la hachure du contour ; mise en évidence sur la rubrique Géométrie |
| S03-5 | rubrique Attributs : titre, filet, puis `Usage : bureaux` et son filet ; mise en évidence sur la rubrique Attributs |
| S03-FIN | rubrique Système de coordonnées : titre, globe, puis le contour posé sur le globe ; mise en évidence sur cette rubrique, jusqu'à la fin : la feuille entière, le bâtiment à gauche, le fond de carte (îlot vide) en haut à gauche |

| Étape | Élément | Locution (mot pour mot, unique dans le clip S03-01) | Mouvement |
|---|---|---|---|
| 1 | habillage, fond de carte, contour sur la carte, mention de source et son filet | (début de scène, posés à la première image) | aucun |
| 2 | titre `Une entité géographique a trois parties.` | « Traduire une donnée » | frappe à la cadence du thème |
| 3 | feuille `ASSETS["s03-entite"]` (décor : feuille et filet du bandeau) | « La donnée, elle » | balayage haut → bas, 0,4 s |
| 4 | bâtiment `ASSETS["s03-batiment"]` | « représente le bâtiment réel » | balayage bas → haut (du sol au toit), 0,5 s |
| 5 | trait de (526, 720) à (796, 720) | « représente le bâtiment réel » | tracé par le code, du bâtiment vers la feuille, à vitesse constante, en même temps que l'étape 4 |
| 6 | `Entité géographique`, couleur `terme` | « on l'appelle une entité géographique » | frappe |
| 7 | titre `Géométrie : points, lignes, surfaces` et groupe `s03-entite-geometrie` | « Sa géométrie porte » | balayage haut → bas (la rubrique se déroule) |
| 8 | contour `ASSETS["s03-contour"]` | « Sa géométrie porte » | déplacement en ligne droite de (327, 287) à (821, 327), même échelle, 0,3 s, easeOutCubic (`Move`) |
| 9 | groupe `s03-entite-signes` | « en points, lignes ou surfaces » | balayage gauche → droite |
| 10 | groupe `s03-contour-hachure` | « Ici, le contour forme une surface » | balayage gauche → droite dans le contour |
| 11 | titre `Attributs` et groupe `s03-entite-attributs` | « Ses attributs la décrivent » | balayage haut → bas |
| 12 | `Usage : bureaux` et groupe `s03-entite-usage` | « l'usage, des bureaux » | balayage gauche → droite (texte et filet ensemble) |
| 13 | titre `Système de coordonnées` et groupe `s03-entite-systeme` | « Son système de coordonnées » | balayage haut → bas |
| 14 | groupe `s03-entite-globe-contour` | « lui donne sa position » | balayage haut → bas (le contour se pose sur le globe) |

Le titre est présent dès les premiers mots ; la feuille arrive sur « La donnée, elle », un peu avant « représente le bâtiment réel » que donne le storyboard, pour que le trait du bâtiment arrive sur une chose déjà nommée et ne finisse pas dans le vide (la feuille est « la donnée » de la phrase).

Mise en évidence (une seule à la fois, rectangle tireté `lecture` 2,5 px, motif 10 6, sans poignée, tracé en 0,25 s depuis le coin haut gauche : le code passe à `Highlight` l'instant `at` de l'étape de `focusAt`, écart 4 du rapport 06 ; l'ancienne disparaît d'un coup quand la nouvelle se trace) :

- le bandeau, autour du texte `Entité géographique` à 10 px (x 814, y 206, environ 357 × 46), de « on l'appelle une entité géographique » à « Sa géométrie porte » ;
- la rubrique Géométrie, rectangle en retrait de 10 px dans la rubrique (x 810, y 266, 600 × 214), de « Sa géométrie porte » à « Ses attributs la décrivent » ;
- la rubrique Attributs (x 810, y 500, 600 × 110), de « Ses attributs la décrivent » à « Son système de coordonnées » ;
- la rubrique Système de coordonnées (x 810, y 630, 600 × 206), de « Son système de coordonnées » jusqu'à la fin de la scène (la dernière phrase parle d'elle ; elle fait partie de S03-FIN).

Les rubriques se touchent : leur rectangle est en retrait de 10 px dans la rubrique, et non autour, pour ne pas mordre sur la voisine. Aucun cercle dans cette scène (écart 5 du rapport 06 sans effet).

Couleurs par fonction : `encre` #23281F textes, traits, contour, bâtiment, globe, signes ; `carroyage` #7D8576 fond de carte et filet sous la ligne d'attribut (jamais du texte) ; `terme` #1E6E3C le seul texte `Entité géographique` ; `papier` #FBFCF8 feuille et façade ; `fond` #F1F3EC réserves ; `lecture` #2F6DA8 la seule mise en évidence ; `lien` #7A4A22 la mention de source. Aucune couleur de thème cartographique : il n'y a pas de feuille de format dans cette scène.

Écran étroit (téléphone à l'horizontale, scène réduite au quart environ) : le contour (3 px), le globe et le bâtiment restent lisibles ; les filets de 0,8 px et la hachure de 1,2 px s'effacent sans perte de sens (la surface reste un contour épais) ; aucun texte sous 24 px.

## S04 · Une équipe doit situer la conduite d'eau reçue

D'où vient l'idée : la feuille de plan d'un réseau, que le public connaît du chantier (cadre de dessin, nomenclature en tableau, cartouche en bas à droite), dessinée comme la fiche de donnée de la charte (§ 5, « Feuille de donnée ») ; les noms de partie arrivent comme des appels de légende, sur des lignes de repère.

Objet étudié : non. La voix parle d'une donnée reçue (« une conduite d'eau sous forme d'entité géographique ») ; aucune fenêtre, aucun nom d'outil.

**Composition** (px de scène 1920 × 1080) : la feuille à gauche (x 104 à 624), les noms de partie autour d'elle, le panneau d'exercice à droite (x 884 à 1 424). Pas de titre de scène à l'écran (le storyboard n'en donne pas pour S04 ; le titre est dans la barre d'état), pas de mention de source (exemple d'illustration), pas de légende.

- Habillage posé à la première image : `ASSETS["echelle-graphique"]` en x 1 480, y 84, 300 × 34 ; `ASSETS["rose-des-vents"]` en x 1 712, y 700, 116 × 116.
- Feuille `ASSETS["s04-conduite"]` en x 100, y 146, 572 × 598 (le fichier est en px de scène : feuille `papier` de x 108 à 620, y 154 à 736, bordure 2 px, contour 0,8 px décalé de 3,6 px ; filet du bandeau à y 210). Décor du fichier : la feuille et le filet du bandeau. Groupes révélés :
  - `s04-conduite-cadre` : le cadre principal (x 128 à 600, y 230 à 490, 1,5 px) et le tracé de la conduite, ligne `encre` 3 px, angles vifs, par (150, 460), (280, 400), (420, 420), (580, 280) ;
  - `s04-conduite-tableau` : le petit tableau (x 128 à 420, y 510 à 610), deux lignes séparées à y 560 ;
  - `s04-conduite-cartouche` : le cartouche (x 440 à 600, y 510 à 720, 2 px), filet de titre à y 546, globe au trait (centre 520, 633, rayon 44) et son point posé (533, 622, rayon 5,3), le même dessin que le globe de S03, sans nom de système ;
  - `s04-conduite-accolade` : l'accolade de lecture `lecture` 2,5 px, de (636, 230) à (636, 720), pointe à (666, 475) : elle embrasse le cadre du tracé, en haut, et le cartouche, en bas.
- Textes de la feuille, posés par le code (`encre`) :
  - `Conduite d'eau` (Écran, rang 1) : en-tête de cartouche (Barlow 600, 24 px, capitales, 0,32 em ; 244 px), x 132, haut à y 170 ;
  - `Usage : eau potable` (Écran, rang 2) : ligne de rubrique (Serif 400, 28 px ; 256 px), x 144, haut à y 518 (première ligne du tableau) ;
  - `Matériau : fonte` (Écran, rang 3) : ligne de rubrique, x 144, haut à y 568 (seconde ligne) ;
  - `Repère` (Écran, rang 4) : en-tête de cartouche (110 px), centré dans le cartouche (x 465 à 575), haut à y 516.
- Noms de partie, après la validation, chacun au bout d'une ligne de repère (charte § 5 et § 7 : le point se pose, l'oblique puis le palier se tracent, le mot se tape ; `encre` 1,5 px, point de 4 px ; mot en titre de rubrique, Barlow 600, 24 px, capitales, 0,16 em, `encre`, posé 6 px au-dessus du palier, 12 px après le coude). Coordonnées : point P, coude K, bout du palier E :
  - `Géométrie` (Écran, rang 5) : P (540, 315), sur le tracé ; K (650, 120) ; E (802, 120) ; mot de x 662 à 790, y 90 à 114. L'oblique coupe le cadre et le bandeau à droite du texte `Conduite d'eau` (qui finit à x 376), jamais un texte ;
  - `Attributs` (Écran, rang 6) : P (200, 610), sur le bord bas du tableau ; K (240, 806) ; E (391, 806) ; mot de x 252 à 379, y 776 à 800 ;
  - `Système de coordonnées` (Écran, rang 7) : P (470, 720), sur le bord bas du cartouche ; K (500, 806) ; E (839, 806) ; mot de x 512 à 827, y 776 à 800.
- Panneau d'exercice (`ChoicePanel`, dessiné par le lecteur) : x 884, y 140, largeur 540 (`width={540}`). Mesures avec les polices de la charte : question (Serif 600, 32 px, 921 px de texte) sur deux lignes, trois choix d'une ligne chacun (289 à 308 px pour environ 397 px utiles), conséquence (Serif 26 px, 1 502 à 1 781 px de texte) sur quatre lignes, cinq au plus. Hauteur estimée : environ 350 px avant validation, environ 560 px après (590 px avec une cinquième ligne) : le bas du panneau finit vers y 700 à 730, au-dessus des noms de partie (y 776) et de la bande des sous-titres. VALIDER puis CONTINUER sont dans la zone d'action (x 1 454, y 834, 360 × 140), pas sous le panneau.

Réserves du carroyage : la feuille (`papier`) couvre les amorces (274 et 502 ; 236, 464 et 692) ; le panneau (`papier`, bordure jusqu'à x 1 424) couvre les amorces 958, 1 186 et 1 414 des trois rangées, bras compris. Les mots des lignes de repère sont posés hors de toute amorce (rangées 692 et 920 évitées : mots entre y 776 et 800 ; `Géométrie` au-dessus de la rangée 236) ; le code leur donne quand même un fond `fond` de 2 px de marge, comme un nom de lieu sur sa réserve (charte § 3). L'amorce (730, 692) reste libre entre la feuille et le panneau, loin de tout texte.

Zones libres : rien sous y 860 ; sous-titres et zone d'action vides.

| État | Ce qui est visible |
|---|---|
| S04-1 | la feuille se déroule zone par zone (feuille et bandeau, cadre et tracé, tableau, cartouche), puis le panneau, la question tapée, les choix et VALIDER ; reste affiché tant que l'exercice n'est pas validé (sélection comprise) |
| S04-2 | après VALIDER : choix figé, conséquence du choix fait écrite dans le panneau sous son filet double |
| S04-3 | `Géométrie` sur sa ligne de repère ; mise en évidence sur le cadre du tracé |
| S04-4 | `Attributs` sur sa ligne de repère ; mise en évidence sur le tableau |
| S04-5 | `Système de coordonnées` sur sa ligne de repère ; mise en évidence sur le cartouche |
| S04-FIN | l'accolade de lecture ; aucune mise en évidence : la feuille et ses trois noms, l'accolade, le choix et sa conséquence, CONTINUER |

| Étape | Élément | Locution (mot pour mot, unique dans son clip) | Mouvement |
|---|---|---|---|
| 1 | habillage | (début de scène, posé à la première image) | aucun |
| 2 | feuille `ASSETS["s04-conduite"]` (décor) et `Conduite d'eau` | « Sur un projet » (S04-01) | balayage haut → bas de la feuille, 0,4 s, puis frappe du bandeau |
| 3 | groupe `s04-conduite-cadre` (cadre et tracé) | « une conduite d'eau » (S04-01) | balayage haut → bas |
| 4 | groupe `s04-conduite-tableau`, `Usage : eau potable`, `Matériau : fonte` | « sous forme » (S04-01) | balayage haut → bas (cadre du tableau et ses deux lignes ensemble) |
| 5 | groupe `s04-conduite-cartouche` et `Repère` | « d'entité géographique » (S04-01) | balayage haut → bas |
| 6 | panneau d'exercice (question, puis choix et VALIDER à la fin de la frappe) | « Choisissez, sur la donnée reçue » (S04-01) | déroulé du lecteur |
| 7 | conséquence du choix fait | (validation) | balayage du lecteur |
| 8 | ligne de repère et `Géométrie` | « Sur cette donnée, le tracé est la géométrie » (S04-02) | point posé, oblique et palier tracés, mot tapé (`Callout`) |
| 9 | ligne de repère et `Attributs` | « L'usage et le matériau sont ses attributs » (S04-02) | idem |
| 10 | ligne de repère et `Système de coordonnées` | « le repère du cartouche son système » (S04-02) | idem |
| 11 | groupe `s04-conduite-accolade` | « La position de la conduite se lit donc dans deux parties » (S04-02) | balayage haut → bas (l'accolade se dessine du cadre vers le cartouche) |

Le storyboard fait dérouler la feuille sur « une conduite d'eau » : la feuille et son bandeau arrivent un peu plus tôt, sur « Sur un projet », pour que la scène ne reste pas vide pendant les premiers mots ; les trois zones suivent sur trois locutions successives de la même phrase, dans l'ordre du storyboard (cadre et tracé, tableau, cartouche), toutes avant « Elle doit savoir où », pour que rien ne désigne le cartouche quand la voix dit « où ». Les noms de partie sont calés sur le début de chaque proposition (« Sur cette donnée », « L'usage et le matériau », « le repère du cartouche ») et non sur « le tracé est la géométrie » ou « sont ses attributs », pour que l'image devance la voix.

Mise en évidence (rectangle tireté `lecture` 2,5 px, motif 10 6, sans poignée, 10 px autour de la zone, tracé en 0,25 s avec `at`, écart 4 du rapport 06) : aucune avant la validation (le choix sélectionné, bord plein bleu, n'en est pas une) ; le cadre du tracé (x 118, y 220, 492 × 280) de « Sur cette donnée, le tracé est la géométrie » à « L'usage et le matériau sont ses attributs » ; le tableau (x 118, y 500, 312 × 120) de « L'usage et le matériau sont ses attributs » à « le repère du cartouche son système » ; le cartouche (x 430, y 500, 180 × 230) de « le repère du cartouche son système » à « La position de la conduite se lit donc dans deux parties » ; aucune ensuite (l'accolade, en `lecture`, porte seule la lecture conjointe ; une mise en évidence bleue en même temps se confondrait avec elle).

Couleurs par fonction : `encre` #23281F textes, traits, tracé, globe, lignes de repère ; `papier` #FBFCF8 feuille ; `fond` #F1F3EC réserves des mots ; `lecture` #2F6DA8 l'accolade de lecture et la mise en évidence, jamais en même temps. Pas de `terme` : les trois noms ont été nommés en S03 et s'écrivent en `encre`. Aucune couleur de verdict.

Écran étroit : le tracé (3 px), les cadres (1,5 à 2 px), le globe et l'accolade (2,5 px) restent lisibles ; les mots des lignes de repère (24 px) sont au plancher de la charte et ne descendent pas plus bas ; les lignes de repère (1,5 px) deviennent fines mais le mot reste au bout de chacune.

## Points ouverts du groupe b

| # | Point | Proposition |
|---|---|---|
| 1 | S03 : le storyboard dit la mention « D'après Safe Software et l'OGC » cliquable, sans donner la référence qu'elle ouvre (REGLES 4.6) | au scénariste de donner la référence (page de Safe Software et document de l'OGC qui portent A-nom-06 à A-nom-08 et A-nom-16) |
| 2 | S03 : la carte et le bâtiment ne portent pas de nom à l'écran ; la voix les nomme (« Sur une carte », « le bâtiment réel ») et l'élévation se reconnaît sans explication | aucun texte ajouté ; si Ilyas veut les nommer, deux toponymes à écrire dans `## Écran` (par exemple `Sur la carte` et `Bâtiment réel`), à proposer par le scénariste |
| 3 | S03 : la feuille arrive sur « La donnée, elle » et non sur « représente le bâtiment réel » | décision de composition (le trait arrive sur une chose nommée) ; à confirmer |
| 4 | S04 : la feuille arrive sur « Sur un projet » et non sur « une conduite d'eau » ; les mises en évidence par zone ne sont pas datées par le storyboard | décisions de composition ; à confirmer |
| 5 | S03 et S04 : la scène n'a pas de légende ; l'échelle graphique se pose à la place du haut de la légende (x 1 480, y 84) | règle à harmoniser avec les deux autres graphistes par l'orchestrateur |
| 6 | Charte § 5 : le tableau des symboles cite l'ancienne numérotation (entité en S02, conduite en S03, pont en S08) | à mettre à jour dans la charte (S03, S04, S07), sans effet sur ces scènes |

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

