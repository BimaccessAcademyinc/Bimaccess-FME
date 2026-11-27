# Spécification visuelle · FME001-M01-L01

Charte : `/home/user/Bimaccess-FME/design/CHARTE-FME001.md` (signature carte). Réunie depuis `.studio/spec/spec-a.md` (S01, S02), `spec-b.md` (S04) et `spec-c.md` (S05 à S07), écrites en parallèle par trois graphistes.

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

Version de l'essai « illustrations commandées » : composition refaite par le graphiste, chaque élément qui paraît à son propre moment est une illustration commandée au modèle d'image (`content/design/illustrations/s02-ill-*.json`, SVG dans `content/design/assets/`). Les textes, la frise, les jalons, les cases des années, les routes et leurs pointes, la mise en évidence et le logo sont au code. Elle remplace la composition « dessins SVG à la main » (`s02-frise.svg`, que cette version n'emploie plus).

D'où vient l'idée : la voix date deux faits, donc une frise graduée en années, avec au départ le document qui fait tout commencer (le contrat, scellé quand il est remporté) ; la traduction se dessine comme ce que FME dessinera plus tard, des routes d'écriture vers un format ; le siège se dit au présent, donc une carte de lieu hors de la frise, au-dessus de son bout ouvert, avec la limite en tiret-point de la Colombie-Britannique déjà vue en S01.

Objet étudié : oui à partir de la phrase « Trois ans après la fondation, en 1996, leur entreprise sort la première version de son logiciel, FME » ; il se montre par le logo `fme-logo` (couleurs d'origine, jamais déformé ni recoloré, une seule fois à l'écran) et par son nom d'origine, jamais par une fenêtre ni une capture. Avant, la voix parle du contrat, de l'entreprise et de la traduction.

Règle de placement : toutes les coordonnées en px de scène 1920 × 1080, boîte = coin haut gauche, largeur × hauteur. Une illustration se pose par sa largeur ; sa hauteur suit son `viewBox` (jamais étirée). Chaque illustration a un aplat `papier` opaque sous ses traits : elle couvre les amorces du carroyage qu'elle recouvre. Aucun texte n'est posé sur un trait : chaque texte a sa place mesurée sur l'aperçu de l'illustration, dans une zone vide, et reçoit une réserve (fond du texte, 2 px en haut et en bas, 6 px à gauche et à droite) `papier` dans une carte ou une feuille, `fond` sur la face. Contrôle fait sur maquette (aperçus posés aux places ci-dessous, textes mesurés avec Source Serif 4 et Barlow Condensed) : aucun texte sur un trait d'illustration, aucun texte sur une amorce du carroyage, rien sous y 860 hors des mises en évidence, rien dans la zone d'action.

### Illustrations

| Illustration (`ASSETS[…]`) | Ce qu'elle montre (aperçu regardé) | x | y | largeur × hauteur | Arrivée |
|---|---|---|---|---|---|
| `s02-ill-fondateurs` (`viewBox` 1051 × 665) | carte de rôle `papier`, bandeau vide fermé par un filet, deux hommes debout en silhouettes d'échelle pleines `encre`, sur un sol | 104 | 186 | 332 × 210 | première image |
| `s02-ill-contrat` (714 × 950) | feuille portrait `papier`, bandeau de titre vide fermé par un filet double, corps vide | 104 | 410 | 332 × 442 | première image |
| `s02-ill-sceau` (745 × 820) | sceau rond neutre : bord festonné, double cercle, rosace au trait, deux rubans ; ni drapeau, ni feuille d'érable, ni couronne, ni blason, ni lettre | 276 | 684 | 140 × 154 | « Le gouvernement lance » |
| `s02-ill-logiciels` (400 × 1031) | trois fenêtres de logiciel empilées, barre de titre à deux cases, zones de travail différentes : boîtes liées, tableau, dessin (contour et trait) ; sans nom ni logo | 482 | 274,5 | 110 × 283,5 | « Pour échanger avec lui » |
| `s02-ill-saif` (744 × 1046) | feuille de format à double cadre, bandeau vide fermé par un filet, corps : courbes de niveau `relief` et une rivière (`eau-fond`, berges `lecture`) | 800 | 247 | 204 × 287 | « Le gouvernement a son format » |
| `s02-ill-lieu` (935 × 593) | carte de lieu `papier` : limite de territoire en tiret-point à gauche, signe de localité (cercle et point) à droite de la limite, moitié droite vide | 1124 | 196 | 300 × 190 | « Son siège est à Surrey » |
| `fme-logo` (216 × 103,7, fichier de la charte) | logo « FME by Safe Software », couleurs d'origine | 1040 | 704 | 190 × 91 | « Trois ans après la fondation » (enchaîné) |

Places mesurées dans les aperçus (px de scène) : bandeau des fondateurs, intérieur y 189 à 227 ; bandeau du contrat, intérieur y 414 à 474, filet double de y 474 à 478, corps de y 478 à 848 ; fenêtres de logiciel, boîtes y 276 à 359, 377 à 458, 476 à 557, bord droit x 591,5 ; feuille SAIF, bandeau intérieur y 251 à 300, filet y 300 à 301, cadre intérieur bas y 529 ; carte de lieu, centre du signe (1203, 291), rayon 10, limite en tiret-point à gauche de x 1180.

### Tracés du code

| Élément | Géométrie (px de scène) | Style |
|---|---|---|
| Frise | trait de (436, 580), bord droit du contrat, à (1406, 580), puis pointe pleine (1406, 571), (1424, 580), (1406, 589) : bout droit ouvert, sans jalon | `encre` 3 px, pointe pleine `encre` ; posée à la première image, sans tracé |
| Jalon 1993 | (462, 560) à (462, 600) | `encre` 2,5 px, bouts nets |
| Jalon 1996 | (1024, 560) à (1024, 600) | `encre` 2,5 px |
| Cases des années, seulement entre les deux jalons dits | couche A : (462, 580) à (1024, 580), `encre` 14 px ; couche B, la case du milieu : (649, 580) à (837, 580), `papier` 10 px, posée sur A | cases `encre`, `papier`, `encre` d'une année chacune (187 px), bord `encre` de 2 px autour de la case claire |
| Routes de traduction (trois routes d'écriture) | route 1 : (591,5, 318) à (786, 318) ; route 2 : (591,5, 418) à (786, 418) ; route 3 : (591,5, 517) à (786, 517) | chacune trois `Trace` superposés, même chemin, même instant, même durée : bord `encre` 11 px, chaussée `chaussee` #FFFFFF 8 px, axe `ecriture` 4 px ; bouts nets (ils touchent la fenêtre et la base de la pointe : aucun bout ne se voit) |
| Pointes de sens | trois triangles (786, y − 10), (800, y), (786, y + 10) pour y = 318, 418, 517 : la pointe touche le bord gauche de SAIF | `Trace` fermé, contour `encre` 2 px, `fill` `ecriture` |

### Textes

| Rang (`X.screen(i)`) | Texte | Style | Place (px de scène) | Réserve |
|---|---|---|---|---|
| 0 | `Safe Software commence par traduire.` | titre de scène (`Title`) | x 104, y 84, une ligne, 1190 px | `fond` |
| 1 | `Contrat du gouvernement` | serif 600, 24 px, interligne 1,15, `encre` | centré sur x 270 dans le bandeau du contrat, boîte x 121 à 419, y 430 à 458, une ligne (298 px) | `papier` |
| 2 | `Don Murray · Dale Lutz` | Barlow Condensed 600, 24 px, capitales, interlettrage 0,16 em, `encre` | centré sur x 270 dans le bandeau des fondateurs, boîte x 122 à 418, y 194 à 223 (295 px) | `papier` |
| 3 | `Appel d'offres remporté` | ligne de rubrique, serif 400, 28 px, interligne 1,25, `encre` | x 124, y 496, largeur maximale 292 : deux lignes (« Appel d'offres », « remporté »), boîte jusqu'à y 566 ; le sceau est plus bas (y 684) | `papier` |
| 4 | `1993 · Fondation de Safe Software` | serif 400, 30 px, interligne 1,15, `encre` | x 478 (jalon + 16), y 608, une ligne, x 478 à 950 | `fond` |
| 5 | `SAIF` | nom de lieu, Barlow Condensed 600, 34 px, capitales, 0,3 em, couleur `terme` | centré sur x 902 dans le bandeau de SAIF, boîte x 856 à 948, y 256 à 295 | `papier` |
| 6 | `Traduction` | nom de lieu petit, Barlow Condensed 600, 26 px, capitales, 0,24 em, `encre` | centré sur x 696, entre les fenêtres et SAIF, au-dessus de la route 1, boîte x 607 à 785, y 262 à 292 (route 1 commence à y 312,5) | `fond` |
| 7 | `1996 · Première version de FME` | même style que le rang 4 | x 1040 (jalon + 16), y 608, largeur maximale 250 : deux lignes (« 1996 · Première », « version de FME »), boîte x 1040 à 1261, y 608 à 677 | `fond` |
| 8 | `Feature Manipulation Engine` | ligne de rubrique en serif italique 400, 28 px, interligne 1,15, `encre` (nom d'origine, anglais en italique) ; aucune lettre agrandie ni détachée | x 1040, y 815, une ligne, x 1040 à 1404, sous le logo | `fond` |
| 9 | `Siège : Surrey` | toponyme, serif italique 400, 30 px, `encre` | dans la moitié vide de la carte de lieu, à droite du signe : x 1229, y 273, boîte jusqu'à x 1404, y 309 (bord intérieur de la carte : x 1422) | `papier` |
| 10 | `D'après Safe Software et la presse spécialisée` | mention de source (règle commune) | marge, x 1448, calée par le bas à y 820, deux lignes, filet à y 752 ; lien vers l'adresse de S02 de `content/sources.json` | `fond` |

Habillage de marge : `echelle-graphique` à x 1480, y 84, 300 × 34 ; `rose-des-vents` à x 1712, y 700, 116 × 116 ; à la première image.

Ordre de pose (dessous vers dessus) : feuille de `SceneRoot`, illustrations, frise et cases, jalons, routes, pointes, textes et leurs réserves, mise en évidence.

### États

| État | Ce qui est visible |
|---|---|
| S02-1 | carte des fondateurs et leurs noms, contrat titré au corps vide, frise en trait simple à bout ouvert qui part du contrat, mention de source, échelle, rose ; zone du titre vide |
| S02-2 | + `Appel d'offres remporté` dans le contrat, puis le sceau en bas à droite du contrat |
| S02-3 | + jalon 1993 et son libellé |
| S02-4 | + feuille SAIF et son nom |
| S02-5 | + les trois fenêtres, les trois routes de traduction et leurs pointes, `Traduction` |
| S02-6 | + titre tapé |
| S02-7 | mise en évidence sur `Traduction` |
| S02-8 | mise en évidence éteinte ; + jalon 1996, cases des années, son libellé, le logo, `Feature Manipulation Engine` |
| S02-9 | mise en évidence sur le libellé du jalon 1996 |
| S02-10 | la mise en évidence passe à `Feature Manipulation Engine` |
| S02-11 | la mise en évidence passe au logo |
| S02-FIN | mise en évidence éteinte ; + carte de lieu et `Siège : Surrey` ; composition finale : les fondateurs et le contrat scellé au départ de la frise, les deux jalons et leurs cases, SAIF et ses routes entre les jalons, le logo et le nom d'origine sous 1996, la carte de lieu à part, en haut à droite |

### Apparitions

Chaque élément arrive au début de la phrase qui le dit (REGLES 5.2, contrat du lecteur § 5) ; les éléments d'une même phrase s'enchaînent, le suivant partant à la fin du geste du précédent (instant de la locution + durée de ce qui précède, jamais un instant écrit à la main). Les mises en évidence, qui désignent sans rien ajouter, suivent les mots de la voix (REGLES 5.3).

| Étape | Élément | Locution (mot pour mot, unique dans le clip S02-01) | Mouvement |
|---|---|---|---|
| 1 | `s02-ill-fondateurs`, `s02-ill-contrat`, rangs 1 et 2, frise et sa pointe, mention de source, échelle, rose | (début de scène, posés à la première image) | aucun (`at={0} dur={0}`) |
| 2 | rang 3, puis `s02-ill-sceau` | « Le gouvernement lance » | frappe de la rubrique ; puis le sceau se balaie de haut en bas (0,3 s), posé comme un tampon |
| 3 | jalon 1993, puis rang 4 | « De ce contrat naît » | trait tracé de haut en bas (0,25 s), puis libellé tapé |
| 4 | `s02-ill-saif` avec le rang 5 | « Le gouvernement a son format » | balayage gauche → droite (0,4 s), feuille et nom dans le même balayage |
| 5 | `s02-ill-logiciels`, puis les trois routes et leurs pointes, puis le rang 6 | « Pour échanger avec lui » | fenêtres : balayage haut → bas (0,4 s) ; routes : les neuf traits ensemble, à vitesse constante, des fenêtres vers SAIF (0,4 s) ; pointes posées à l'arrivée (0,1 s) ; `Traduction` balayé gauche → droite (0,3 s) |
| 6 | rang 0 (titre) | « Murray et Lutz commencent par ce travail » | frappe (`Title`) |
| 7 | mise en évidence sur `Traduction` | « une technologie de traduction pour SAIF » | tireté tracé en 0,25 s |
| 8 | mise en évidence éteinte ; jalon 1996, cases des années, rang 7, `fme-logo`, rang 8 | « Trois ans après la fondation » | jalon tracé de haut en bas (0,25 s) ; cases tracées de gauche à droite, de 1993 vers 1996, à vitesse constante (couche A en 0,45 s, couche B partant quand A atteint x 649, 0,15 s) ; libellé tapé ; logo balayé gauche → droite (0,3 s) ; nom d'origine tapé |
| 9 | mise en évidence sur le rang 7 | « la première version de son logiciel » | tireté tracé en 0,25 s |
| 10 | mise en évidence sur le rang 8 | « à l'origine Feature Manipulation Engine » | idem, l'ancienne disparaît d'un coup |
| 11 | mise en évidence sur le logo | « FME fait passer » | idem |
| 12 | mise en évidence éteinte ; `s02-ill-lieu`, puis rang 9 | « Son siège est à Surrey » | carte balayée gauche → droite (0,4 s), puis toponyme tapé |

Image fixe : aucune ne dépasse 8 s pendant la voix (la plus longue va de « FME fait passer » à « Son siège est à Surrey », environ 7,4 s).

`data-board` : `S02-1` à `0`, puis `S02-2` à `S02-11` et `S02-FIN` sur les instants des étapes 2 à 12, dans cet ordre.

### Mise en évidence

Rectangle tireté `lecture` 2,5 px (10 6), angles vifs, sans poignée, à 10 px de l'élément, tracé en 0,25 s depuis le coin haut gauche (`at` = instant de l'étape) ; une seule à la fois, l'ancienne disparaît d'un coup.

| Désigne | Rectangle (x, y, largeur × hauteur) | De | À |
|---|---|---|---|
| `Traduction` | 597, 252, 198 × 50 (dans l'intervalle entre les fenêtres, x 591,5, et SAIF, x 800 ; au-dessus de la route 1) | « une technologie de traduction pour SAIF » | « Trois ans après la fondation » |
| libellé du jalon 1996 | 1030, 598, 241 × 89 | « la première version de son logiciel » | « à l'origine Feature Manipulation Engine » |
| `Feature Manipulation Engine` | 1030, 805, 384 × 52 | « à l'origine Feature Manipulation Engine » | « FME fait passer » |
| logo `fme-logo` | 1030, 694, 210 × 111 | « FME fait passer » | « Son siège est à Surrey » |

Aucune à la fin : la carte de lieu est un sujet à part, une mise en évidence restée sur 1996 la ferait lire comme datée. Le storyboard demande la mise en évidence « sur les routes et leur étiquette » : un rectangle autour des routes passerait sur les cadres des fenêtres et de SAIF, que les routes touchent ; elle se pose donc sur l'étiquette seule, dans l'intervalle libre.

### Couleurs par fonction

`encre` #23281F textes, cartes, silhouettes, frise, jalons, cases foncées, bord des routes, contour des pointes ; `papier` #FBFCF8 cartes, contrat, SAIF, fenêtres, case claire, réserves des textes dans une carte ; `fond` #F1F3EC réserves des textes sur la face ; `ecriture` #C4472B axe et pointes des routes de traduction (des données écrites vers le format SAIF) ; `chaussee` #FFFFFF chaussée des routes ; `terme` #1E6E3C le nom `SAIF`, terme nouveau de la scène ; `relief`, `eau-fond`, `lecture` (berges) seulement dans la feuille de format SAIF ; `lecture` #2F6DA8 la mise en évidence ; `lien` #7A4A22 la mention de source ; le logo garde ses couleurs d'origine.

Écran étroit : textes de 24 px au moins ; routes de 11 px ; silhouettes, sceau et fenêtres gardent leur forme réduits au quart ; rien n'a été simplifié.

### Ce que le code doit faire (S02)

| # | Besoin | Ce que le code fait |
|---|---|---|
| 1 | Frise présente à la première image | `Trace` avec `at={0}` et une durée nulle, ou à défaut un trait posé sans animation ; jamais tracé au début de la scène |
| 2 | Cases des années | deux `Trace` superposés (couche A `encre` 14 px, couche B `papier` 10 px), même vitesse, B partant quand A atteint x 649 |
| 3 | Pointes de sens | `Trace` fermé (`points` du triangle, `fill` `ecriture`, `color` `encre`, `width` 2), posé à la fin du tracé des routes |
| 4 | Textes dans une carte | réserve `papier` dans le même élément que le texte ; textes sur la face : réserve `fond` ; balayée ou tapée avec le texte |
| 5 | Illustrations | `Svg name="s02-ill-…"` par sa largeur, hauteur calculée depuis le `viewBox` ; elles portent `width` et `height` à la racine et un groupe `<g id="dessin">` non préfixé : ne pas s'appuyer sur cet identifiant (aucune `parts` dans cette scène) |
| 6 | Logo | `Svg name="fme-logo"`, 190 px de large, jamais recoloré |

### Points ouverts (S02)

| # | Point | Proposition |
|---|---|---|
| 1 | Le contenu de la feuille SAIF (courbes de niveau et rivière) dit « données géographiques » ; la remise ne dit pas quel genre de donnée porte SAIF | à confirmer par Ilyas ; sinon corps vide, comme la version de la chaîne |
| 2 | `Don Murray · Dale Lutz` en interlettrage 0,16 em au lieu de 0,32 em (en-tête de cartouche) : la carte ne peut pas dépasser 332 px, largeur imposée par le contrat dessiné (bandeau de 14 % de sa hauteur) | à reprendre si le contrat est redessiné avec un bandeau plus haut |
| 3 | Les fondateurs de S02 sont une illustration commandée, ceux de S01 et S06 restent dessinés à la main | si l'essai est retenu, la même illustration pour les trois scènes |
| 4 | `SAIF` en couleur `terme` (gardé de la version de la chaîne) | à confirmer |

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

## S04 · Une entité géographique porte trois parties

Version de l'essai « illustrations commandées » : composition refaite par le graphiste, chaque élément qui paraît à son propre moment est une illustration commandée au modèle d'image (`content/design/illustrations/s04-ill-*.json`, SVG dans `content/design/assets/`). Les textes, le trait du bâtiment vers la feuille, le filet de la ligne d'attribut et la mise en évidence sont au code. Elle remplace la composition « dessins SVG à la main » (`s03-carte.svg`, `s03-contour.svg`, `s03-batiment.svg`, `s03-entite.svg`, que cette version n'emploie plus).

D'où vient l'idée : la convention du dessin en projection européenne, vue de face au-dessus de la vue de dessus (le bâtiment réel en élévation au-dessus de son contour sur la carte, dans le même axe) ; et la fiche d'objet de la charte (§ 5, « Comment se dessine une entité géographique »), qui grandit rubrique par rubrique (charte § 7, « Une rubrique qui se déroule » ; REGLES 5.3, un conteneur grandit rangée par rangée, aucune case réservée vide).

Objet étudié : non. La voix parle de l'entité géographique ; « C'est sur elle que FME travaille » nomme l'outil sans le montrer : aucune fenêtre, aucun logo, aucun nom d'outil à l'écran.

Règle de placement : comme S02 (px de scène 1920 × 1080, illustration posée par sa largeur, hauteur suivant son `viewBox`, aplat `papier` opaque sous ses traits, texte jamais sur un trait, réserve `papier` dans la feuille, `fond` sur la face). Contrôle fait sur maquette : aucun texte sur un trait d'illustration ni sur une amorce du carroyage, rien sous y 860, rien dans la zone d'action.

### Illustrations

| Illustration (`ASSETS[…]`) | Ce qu'elle montre (aperçu regardé) | x | y | largeur × hauteur | Arrivée |
|---|---|---|---|---|---|
| `s04-ill-carte` (`viewBox` 1183 × 586) | fond de carte au trait `carroyage` dans un cadre : îlots orthogonaux, rues en double trait ; l'îlot central, plus grand, est vide | 104 | 440 | 650 × 322 | première image |
| `s04-ill-contour` (817 × 571) | le contour d'un bâtiment vu de dessus : rectangle à trait `encre` épais, intérieur `papier` | 349 | 544 | 160 × 112 | première image, dans l'îlot central ; se déplace ensuite |
| `s04-ill-batiment` (996 × 630) | élévation d'un immeuble de bureaux : façade `papier`, acrotère, fenêtres en grille sur six niveaux, porte d'entrée, ligne de sol | 264 | 192 | 330 × 209 | « La donnée, elle » (enchaîné) |
| `s04-ill-feuille` (863 × 863) | feuille d'entité à double cadre : bandeau, puis trois rubriques séparées par des filets, toutes vides ; une bande étroite sous la troisième | 777 | 192 | 647 × 647 | par bandes (ci-dessous) |
| `s04-ill-signes` (1029 × 194) | les trois signes de géométrie : un point plein, une ligne, une surface hachurée à contour épais | 1120 | 376,5 | 250 × 47 | « Sa géométrie porte » (enchaîné) |
| `s04-ill-hachure` (1129 × 710) | une plage de hachures fines à 45°, sans contour | 837,5 | 355 | 143 × 90 | « Ici, le contour forme une surface » |
| `s04-ill-globe` (670 × 669) | globe au trait : cercle `papier`, équateur, deux parallèles, un méridien ; sans continent | 829 | 672 | 104 × 104 | « Son système de coordonnées » (enchaîné) |
| `s04-ill-repere` (455 × 317) | petite emprise de bâtiment : rectangle à contour épais, hachures denses | 852,5 | 698 | 32 × 22 | « Son système de coordonnées » (enchaîné) |

Places mesurées dans les aperçus (px de scène) : îlot central de la carte, intérieur x 321,6 à 536,4, y 529 à 670,8 ; façade du bâtiment de x 288 à 570,5, acrotère jusqu'à y 210,6, sol à y 398,7 ; feuille : cadre extérieur gauche à x 780, intérieur x 804,7 à 1396,3 ; bandeau y 219,7 à 286,5 (filet jusqu'à 288,7) ; rubrique 1 y 288,7 à 496,4 ; rubrique 2 y 497,1 à 623,1 ; rubrique 3 y 623,8 à 794 ; bande basse y 794 à 811 ; contour : trait de 2,5 px, intérieur x 831,5 à 986,5, y 346,5 à 453,5 quand il est dans la rubrique.

La feuille grandit par bandes : la même illustration `s04-ill-feuille`, posée à x 777, y 192, 647 px, est découpée en quatre bandes horizontales (chacune coupe juste sous un filet, donc chaque état de la feuille paraît fermé), chacune balayée de haut en bas sur sa locution :

| Bande | Contenu | y (px de scène) | Locution |
|---|---|---|---|
| B1 | haut du double cadre et bandeau | 192 à 289,5 | « La donnée, elle » |
| B2 | rubrique Géométrie | 289,5 à 497,9 | « Sa géométrie porte » |
| B3 | rubrique Attributs | 497,9 à 624,6 | « Ses attributs la décrivent » |
| B4 | rubrique Système de coordonnées, bande basse et bas du cadre | 624,6 à 839 | « Son système de coordonnées » |

### Tracés du code

| Élément | Géométrie (px de scène) | Style |
|---|---|---|
| Trait « représente » | de (570,5, 253), bord droit de la façade, à (780, 253), cadre gauche de la feuille, au milieu du bandeau | `encre` 2 px, bouts nets, sans pointe ; tracé du bâtiment vers la feuille |
| Filet de la ligne d'attribut | de (829, 593) à (1372, 593) | `carroyage` 1,2 px |

Le contour se déplace (`Move`, même échelle) de x 349, y 544 (dans l'îlot) à x 829, y 344 (dans la rubrique Géométrie, sous son titre), en ligne droite, 0,3 s, easeOutCubic. Il passe au-dessus de la feuille (ordre de pose). Après son départ, l'îlot central de la carte reste vide, sans trou dans le dessin : la carte a été commandée avec cet îlot vide.

### Textes

| Rang (`X.screen(i)`) | Texte | Style | Place (px de scène) | Réserve |
|---|---|---|---|---|
| 0 | `Une entité géographique a trois parties.` | titre de scène (`Title`) | x 104, y 84, une ligne, 1225 px | `fond` |
| 1 | `Entité géographique` | en-tête de cartouche, Barlow Condensed 600, 26 px, capitales, 0,32 em, couleur `terme` (terme nouveau, au moment où il se nomme) | centré sur x 1100,5 dans le bandeau, boîte x 918 à 1283, y 238 à 268 | `papier` |
| 2 | `Géométrie : points, lignes, surfaces` | titre de rubrique, Barlow Condensed 600, 24 px, capitales, 0,16 em, `encre` | x 829, y 303, boîte jusqu'à x 1301, y 332 | `papier` |
| 3 | `Attributs` | titre de rubrique | x 829, y 511, boîte jusqu'à x 955, y 540 | `papier` |
| 4 | `Usage : bureaux` | ligne de rubrique, serif 400, 28 px, interligne 1,25, `encre` | x 829, y 550, boîte jusqu'à x 1040, y 585 ; filet dessous à y 593 | `papier` |
| 5 | `Système de coordonnées` | titre de rubrique | x 829, y 638, boîte jusqu'à x 1142, y 667 | `papier` |
| 6 | `D'après Safe Software et l'OGC` | mention de source (règle commune) | marge, x 1448, calée par le bas à y 820, deux lignes (« D'après Safe Software et », « l'OGC » selon la coupure du navigateur), filet à y 752 ; lien vers l'adresse de S04 de `content/sources.json` | `fond` |

Habillage de marge : `echelle-graphique` à x 1480, y 84, 300 × 34 ; `rose-des-vents` à x 1712, y 700, 116 × 116 ; à la première image.

Ordre de pose (dessous vers dessus) : feuille de `SceneRoot`, carte, bandes de la feuille, bâtiment, trait, contour (qui se déplace), hachures, signes, globe, emprise sur le globe, textes et leurs réserves, mise en évidence.

### États

| État | Ce qui est visible |
|---|---|
| S04-1 | le fond de carte et, dans l'îlot central, le contour seul ; mention de source, échelle, rose ; le titre se tape |
| S04-2 | mise en évidence sur le contour, dans la carte |
| S04-3 | mise en évidence éteinte ; + bandeau de la feuille (B1), bâtiment réel au-dessus de la carte, trait du bâtiment vers le bandeau, `Entité géographique` en `terme` |
| S04-4 | mise en évidence sur `Entité géographique` |
| S04-5 | + rubrique Géométrie (B2) et son titre ; le contour quitte la carte et se pose dans la rubrique ; les trois signes ; mise en évidence sur la rubrique Géométrie |
| S04-6 | + les hachures dans le contour |
| S04-7 | + rubrique Attributs (B3), son titre, `Usage : bureaux` et son filet ; mise en évidence sur la rubrique Attributs |
| S04-FIN | + rubrique Système de coordonnées (B4), son titre, le globe, l'emprise posée sur le globe ; mise en évidence sur cette rubrique jusqu'à la fin ; composition finale : le bâtiment relié à la feuille entière, la carte à l'îlot vide dessous |

### Apparitions

Chaque élément arrive au début de la phrase qui le dit ; les éléments d'une même phrase s'enchaînent (instant de la locution + durée de ce qui précède). Les mises en évidence suivent les mots de la voix.

| Étape | Élément | Locution (mot pour mot, unique dans le clip S04-01) | Mouvement |
|---|---|---|---|
| 1 | `s04-ill-carte`, `s04-ill-contour` dans l'îlot, mention de source, échelle, rose | (début de scène, posés à la première image) | aucun (`at={0} dur={0}`) |
| 2 | rang 0 (titre) | « Traduire une donnée » | frappe (`Title`) |
| 3 | mise en évidence sur le contour | « Sur une carte, un bâtiment » | tireté tracé en 0,25 s |
| 4 | mise en évidence éteinte ; bande B1, puis `s04-ill-batiment`, puis le trait, puis rang 1 | « La donnée, elle » | B1 balayée haut → bas (0,25 s) ; bâtiment balayé bas → haut, du sol au toit (0,5 s) ; trait tracé du bâtiment vers le bandeau (0,4 s) ; `Entité géographique` tapé |
| 5 | mise en évidence sur le rang 1 | « on l'appelle une entité géographique » | tireté tracé en 0,25 s |
| 6 | bande B2, puis rang 2 et, en même temps, le déplacement du contour, puis `s04-ill-signes` | « Sa géométrie porte » | B2 balayée haut → bas (0,25 s) ; titre tapé pendant que le contour se déplace (0,3 s) ; signes balayés gauche → droite (0,3 s) à la fin de la frappe |
| 7 | `s04-ill-hachure` | « Ici, le contour forme une surface » | balayage gauche → droite dans le contour (0,4 s) |
| 8 | bande B3, puis rang 3, puis rang 4 et son filet | « Ses attributs la décrivent » | B3 balayée haut → bas (0,25 s) ; titre tapé ; `Usage : bureaux` tapé pendant que le filet se trace de gauche à droite |
| 9 | bande B4, puis rang 5, puis `s04-ill-globe`, puis `s04-ill-repere` | « Son système de coordonnées » | B4 balayée haut → bas (0,25 s) ; titre tapé ; globe balayé haut → bas (0,3 s) ; l'emprise se pose sur le globe, balayée haut → bas (0,2 s) |

« C'est sur elle que FME travaille » ne change rien à l'écran. Image fixe : aucune ne dépasse 8 s pendant la voix (la plus longue, de la fin de l'étape 4 à « Sa géométrie porte », environ 6,5 s).

`data-board` : `S04-1` à `0`, `S04-2` à « Sur une carte, un bâtiment », `S04-3` à « La donnée, elle », `S04-4` à « on l'appelle une entité géographique », `S04-5` à « Sa géométrie porte », `S04-6` à « Ici, le contour forme une surface », `S04-7` à « Ses attributs la décrivent », `S04-FIN` à « Son système de coordonnées ».

### Mise en évidence

Rectangle tireté `lecture` 2,5 px (10 6), angles vifs, sans poignée, tracé en 0,25 s depuis le coin haut gauche (`at` = instant de l'étape) ; une seule à la fois.

| Désigne | Rectangle (x, y, largeur × hauteur) | De | À |
|---|---|---|---|
| le contour, dans la carte | 339, 534, 180 × 132 (à 10 px du contour, à 5 px des traits de l'îlot) | « Sur une carte, un bâtiment » | « La donnée, elle » |
| `Entité géographique` | 908, 228, 385 × 50 (dans le bandeau, à 8 px de ses traits) | « on l'appelle une entité géographique » | « Sa géométrie porte » |
| rubrique Géométrie | 814,7, 298,7, 571,6 × 187,7 (en retrait de 10 px dans la rubrique) | « Sa géométrie porte » | « Ses attributs la décrivent » |
| rubrique Attributs | 814,7, 507,1, 571,6 × 106 | « Ses attributs la décrivent » | « Son système de coordonnées » |
| rubrique Système de coordonnées | 814,7, 633,8, 571,6 × 150,2 | « Son système de coordonnées » | fin de la scène (état final) |

Les rubriques se touchent : leur rectangle est en retrait de 10 px dans la rubrique, et non autour, pour ne pas mordre sur la voisine ni passer sur un filet.

### Couleurs par fonction

`encre` #23281F textes, contour, bâtiment, cadre de la feuille, signes, globe, emprise, trait ; `carroyage` #7D8576 fond de carte et filet de la ligne d'attribut (jamais du texte) ; `terme` #1E6E3C le seul texte `Entité géographique` ; `papier` #FBFCF8 feuille, façade, intérieur du contour, réserves des textes de la feuille ; `fond` #F1F3EC réserve du titre ; `lecture` #2F6DA8 la mise en évidence ; `lien` #7A4A22 la mention de source. Aucune couleur de thème cartographique : il n'y a pas de feuille de format dans cette scène.

Écran étroit : textes de 24 px au moins ; le contour (2,5 px), le bâtiment et la feuille restent lisibles réduits au quart ; les hachures fines et le carroyage de la carte deviennent une trame grise, sans perte de sens (la surface reste un contour plein de trame) ; le globe (104 px) garde son cercle et son équateur.

### Ce que le code doit faire (S04)

| # | Besoin | Ce que le code fait |
|---|---|---|
| 1 | Feuille qui grandit par bandes | pour chaque bande, un `Wipe dir="down"` positionné à x 777, y = haut de la bande, 647 px de large, hauteur de la bande, `overflow: hidden`, qui contient `Svg name="s04-ill-feuille"` posé à `left 0, top` = décalage (0 ; −97,5 ; −305,9 ; −432,6), 647 × 647, `at={0} dur={0}` ; le moteur n'a pas de découpe d'une illustration en bandes (proposition : une prop `bands` de `Svg`) |
| 2 | Contour qui passe de la carte à la rubrique | `Move` de `{ x: 349, y: 544 }` à `{ x: 829, y: 344 }`, même échelle, autour de `Svg name="s04-ill-contour"` posé à la première image |
| 3 | Textes dans la feuille | réserve `papier` dans le même élément que le texte |
| 4 | Illustrations | `Svg name="s04-ill-…"` par sa largeur ; `width`, `height` et `<g id="dessin">` non préfixé à la racine de chaque fichier : aucune `parts`, ne pas s'appuyer sur cet identifiant |

### Points ouverts (S04)

| # | Point | Proposition |
|---|---|---|
| 1 | La carte et le bâtiment ne portent pas de nom à l'écran ; la voix les nomme (« Sur une carte », « le bâtiment réel ») et ils se reconnaissent sans explication | aucun texte ajouté ; si Ilyas veut les nommer, deux textes à écrire dans `## Écran` par le scénariste |
| 2 | Bâtiment au-dessus de la carte (projection européenne) au lieu de la carte au-dessus du bâtiment : le trait doit arriver sur le bandeau, seule partie de la feuille déjà là quand la voix dit « représente le bâtiment réel » | décision de composition, à confirmer sur planche |
| 3 | `s04-ill-hachure` pèse 562 ko (au-delà des 200 ko des règles SVG) et ses hachures sont plus fines que la charte (environ 4 px d'écart au lieu de 9) | à redessiner plus grossière dès que le modèle d'image répond ; sinon garder telle quelle |
| 4 | Le bâtiment a six niveaux (la commande en demandait trois) | sans effet sur le sens ; à redessiner seulement si Ilyas le demande |

## Points ouverts du groupe b

| # | Point | Proposition |
|---|---|---|
| 1 | S04 : le storyboard dit la mention « D'après Safe Software et l'OGC » cliquable, sans donner la référence qu'elle ouvre (REGLES 4.6) | au scénariste de donner la référence (page de Safe Software et document de l'OGC qui portent A-nom-06 à A-nom-08 et A-nom-16) |
| 2 | S04 : la carte et le bâtiment ne portent pas de nom à l'écran ; la voix les nomme (« Sur une carte », « le bâtiment réel ») et l'élévation se reconnaît sans explication | aucun texte ajouté ; si Ilyas veut les nommer, deux toponymes à écrire dans `## Écran` (par exemple `Sur la carte` et `Bâtiment réel`), à proposer par le scénariste |
| 3 | S04 : la feuille arrive sur « La donnée, elle » et non sur « représente le bâtiment réel » | décision de composition (le trait arrive sur une chose nommée) ; à confirmer |
| 4 | S04 : la scène n'a pas de légende ; l'échelle graphique se pose à la place du haut de la légende (x 1 480, y 84) | règle à harmoniser avec les deux autres graphistes par l'orchestrateur |
| 5 | Charte § 5 : le tableau des symboles cite l'ancienne numérotation (entité en S02, conduite en S03, pont en S08) | à mettre à jour dans la charte (entité en S04, pont en S07), sans effet sur ces scènes |

## S05 · FME lit, transforme, puis écrit

D'où vient l'idée : la phrase décrit un trajet (« quitte », « lire », « écrire », « dans le format attendu ») ; la carte topographique le dessine comme une route qui part d'une feuille et arrive à une autre, la route bleue pour ce que FME lit, la rouge pour ce qu'il écrit (charte § 1). Objet étudié : oui, « FME commence par lire les données source » ; l'outil se montre par son travail, sans fenêtre ni capture.

**Composition** (px de scène 1920 × 1080) : une chaîne horizontale centrée sur l'axe y 540, de x 104 à x 1488 ; la feuille d'arrivée déborde dans la marge entre y 360 et y 676 (débord permis jusqu'à x 1500 entre y 360 et 690) ; pas de légende (les deux routes portent leur nom le long de leur tracé).

- Habillage posé à la première image (`at={0} dur={0}`) : `ASSETS["echelle-graphique"]` en x 1480, y 84, 300 × 34 (pas de légende : l'échelle prend le haut de la marge, comme en S04) ; `ASSETS["rose-des-vents"]` en x 1712, y 700, 116 × 116.
- Titre `FME lit, transforme, puis écrit.` (Écran, rang 1) : composant `Title`, x 104, y 84, Serif 600 66 px, une ligne (largeur mesurée avec Source Serif 4 : 958 px, fin à x 1062), filet double de 300 px dessous.
- Chaîne `ASSETS["s05-chaine"]` en x 100, y 356, 1392 × 324 (le `viewBox` du fichier est en px de scène : `100 356 1392 324`). Décor du fichier, posé à la première image :
  - feuille `Format de départ` : x 104 à 464, y 360 à 676 (aplat `papier`, bordure 2 px, contour 1 px décalé de 3 px), bandeau de y 360 à 416, trame de lignes horizontales `carroyage` 0,8 px tous les 12 px ;
  - feuille `Format attendu` : x 1128 à 1488, y 360 à 676, même dessin, bandeau de y 360 à 416, trame quadrillée `carroyage` 0,8 px tous les 16 px : l'autre trame, l'autre format.
- Groupes du fichier révélés plus tard : `s05-chaine-outils` (cartouche `Outils de transformation`, x 646 à 946, y 360 à 676, aplat `papier`, bordure 2 px, contour 0,8 px décalé de 3,6 px, bandeau de y 364 à 440) ; `s05-chaine-lire-pointe` (pointe de sens de la lecture, triangle `lecture` à bord `encre` 2 px de x 618 à 644, y 526 à 554) ; `s05-chaine-ecrire-pointe` (pointe de l'écriture, triangle `ecriture` de x 1100 à 1126, y 526 à 554).
- Carte d'entité `ASSETS["s05-carte"]`, 140 × 100 : cadre `papier` à bordure `encre` 2 px, trame horizontale de sa feuille de départ, un contour de parcelle (quadrilatère `encre` 3 px, pas le bâtiment de S04) et sa ligne d'attribut (barre `encre-2` 3 px). Groupe révélé plus tard : `s05-carte-trame-attendue` (la même carte sur la trame quadrillée de la feuille d'arrivée : aplat `papier` sur tout l'intérieur, quadrillage, contour et ligne redessinés). La carte se déplace d'un bloc (`Move`, même échelle), haut gauche de la carte :
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
- `ASSETS["s07-entite"]` en x 256, y 356, 744 × 308 (`viewBox` en px de scène : `256 356 744 308`), entièrement posé à la première image, sans groupe révélé : feuille `papier` x 260 à 680, y 360 à 660 (bordure 2 px, contour 0,8 px décalé de 3,6 px), bandeau de y 364 à 414 ; dans la feuille, un contour d'entité au trait `encre` 3 px, nouveau (hexagone irrégulier de x 372 à 578, y 452 à 612 : ni le bâtiment de S04, ni la parcelle de S05) ; deux traits `encre` 2,5 px qui partent du bord droit de la feuille, de (680, 448) à (936, 448) et de (680, 568) à (936, 568) ; deux manques `manque` tiretés 3 px (8 5), fond `manque-fond`, x 940 à 994, y 421 à 475 et y 541 à 595.
- Textes placés :
  - `Entité géographique` (Écran, rang 2) : en-tête de cartouche (Barlow Condensed 600, 24 px, capitales, 0,32 em), centré dans le bandeau, x 302 à 639, y 374 à 404, `encre` (le terme a été nommé en S04), sur le `papier` (mesuré : 337 px) ; posé à la première image ;
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
| 5 | S04 à S07 : sans légende, l'échelle graphique prend le haut de la marge (x 1480, y 84), comme dans la spécification du graphiste b | Règle commune à confirmer par l'orchestrateur pour S01 et S02 |

