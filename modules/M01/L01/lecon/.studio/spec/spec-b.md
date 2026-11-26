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
