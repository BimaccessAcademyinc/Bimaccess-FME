## Rapport · code · brief 21 (essai : S02 et S04 construites selon la spécification du graphiste)

### Fichiers écrits
- `src/lesson/scenes/s02.tsx` : réécrite. Sept illustrations `s02-ill-*` et le logo posés par leur largeur, frise et sa pointe posées à l'image 0 (`Trace` `at={0} dur={0}`), jalons, cases des années (deux couches, même vitesse tirée de `getLength`), routes (neuf `Trace` à bouts nets) et pointes (`Trace` fermé, `fill` `ecriture`), onze textes, quatre mises en évidence.
- `src/lesson/scenes/s04.tsx` : réécrite. Huit illustrations `s04-ill-*`, feuille révélée par bandes, trait et filet tracés, contour déplacé par `Move` (349, 544 → 829, 344, 0,3 s), six textes, cinq mises en évidence.
- `src/lesson/components/s02-s04-commun.tsx` (nouveau) : `poser` (hauteur tirée du `viewBox`, `TextError` au chargement s'il manque), `Texte` (texte en px de scène sur sa réserve 2 px / 6 px, balayée avec lui ou posée à l'instant où il paraît ; centrage avec compensation de l'interlettrage), `RESERVE_CARTE`.
- Rien d'autre. `s01-commun.tsx` réemployé tel quel (`Source`, `sourceHref`). `src/lesson/components/s02-route.tsx` n'est plus importé par aucune scène (les routes finissent maintenant sur la fenêtre et la pointe, à bouts nets) ; je l'ai laissé en place.

### Contrôles
- `node …/scenes/scripts/check-literals.mjs src/lesson` → code 0 ; « 12 fichier(s) lu(s), 0 texte(s) en dur ».
- `flock /tmp/fme001-sync.lock npm run check` → code 0 ; « [sync] scènes chargées : 7, locutions, ordre, textes et illustrations nommées vérifiés », `tsc` sans erreur.
- `flock /tmp/fme001-sync.lock npm run build` → code 0 ; « dist/index.html 2,442.39 kB ».
- `node …/planche-par-phrase-studio/planche.mjs --scenes S02,S04 --out .studio/qa/sens` → code 0 ; « 0 erreur(s) de page ou de console », S02 11 captures, S04 9 captures (`.studio/qa/sens/planche-S02.png`, `planche-S04.png`).
- `timeout 500 npm run test:play` → code 0 ; « tout est conforme » ; « S02 : une mise en évidence au plus à la fois sur toute la scène (214 images examinées) », « S04 : … (133 images examinées) », « S04 : dernière image, 1 mise(s) en évidence ».
- En plus : captures à chaque geste (`shots.mjs`, 2100 × 1400 : `.studio/tmp/hd2/` pour S02, `.studio/tmp/hd4/` pour S04) et boîtes mesurées dans la page construite, polices chargées, comparées à la spécification : toutes les illustrations à leur x, y, largeur exacts ; textes à 2 px au plus de leur boîte (ex. « 1993 · Fondation de Safe Software » x 478 à 950, « Feature Manipulation Engine » x 1040 à 1403,6, « Géométrie : points, lignes, surfaces » x 829 à 1300,5) ; rectangles de mise en évidence exacts. `.studio/tmp/hd/` et `hd3/` gardent des captures d'avant les corrections (suppression refusée par le garde-fou de l'environnement) : à ne pas lire.

### États et locutions
Toutes les locutions sont prises au début de la phrase ; les gestes d'une même phrase s'enchaînent (instant + durées de la spécification) ; un `ordered` contrôle au chargement que chaque enchaînement finit avant l'étape suivante.

S02 (instants de scène, voix à 0,4 s) : `S02-1` image 0 ; `S02-2` « Le gouvernement lance » (0,40 : rubrique tapée, sceau balayé de haut en bas à la fin de la frappe) ; `S02-3` « De ce contrat naît » (5,68 : jalon 1993 puis libellé) ; `S02-4` « Le gouvernement a son format » (12,16 : SAIF et son nom dans le même balayage) ; `S02-5` « Pour échanger avec lui » (18,35 : fenêtres, routes, pointes, « Traduction ») ; `S02-6` « Murray et Lutz commencent par ce travail » (23,80 : titre) ; `S02-7` « une technologie de traduction pour SAIF » (27,68 : mise en évidence « Traduction ») ; `S02-8` « Trois ans après la fondation » (33,76 : extinction, jalon 1996, cases, libellé, logo, nom d'origine, fini à 36,39) ; `S02-9` « la première version de son logiciel » (38,32) ; `S02-10` « à l'origine Feature Manipulation Engine » (41,92) ; `S02-11` « FME fait passer » (45,28) ; `S02-FIN` « Son siège est à Surrey » (52,64 : extinction, carte de lieu, toponyme).

S04 : `S04-1` image 0, titre sur « Traduire une donnée » (0,40) ; `S04-2` « Sur une carte, un bâtiment » (5,36) ; `S04-3` « La donnée, elle » (9,20 : B1, bâtiment du sol au toit, trait, « Entité géographique ») ; `S04-4` « on l'appelle une entité géographique » (12,56) ; `S04-5` « Sa géométrie porte » (17,84 : B2, titre tapé pendant le déplacement du contour, signes) ; `S04-6` « Ici, le contour forme une surface » (23,36 : hachures) ; `S04-7` « Ses attributs la décrivent » (26,24 : B3, titre, « Usage : bureaux » et son filet ensemble) ; `S04-FIN` « Son système de coordonnées » (30,48 : B4, titre, globe, emprise ; mise en évidence jusqu'à la fin).

### Corrigé après la planche et les captures
1. Réserves `papier` dans les cartes et la feuille : pavés plus clairs visibles autour de « Contrat du gouvernement », « Appel d'offres remporté », « SAIF », « Siège : Surrey » et des cinq textes de la feuille de S04, et devant le texte pendant la frappe. Cause mesurée : l'aplat des illustrations n'est pas le jeton `papier` (#FBFCF8) mais #F7F8F2 à #F8F9F3 (#F6F7F1 dans le bandeau de SAIF). Retirées (`RESERVE_CARTE = null`) : voir la décision 1. Les réserves `fond` sur la face sont gardées (identiques à la face, invisibles).
2. Amorce (502, 464) visible entre les fenêtres 2 et 3 et touchant le bas de la fenêtre 2 : `s02-ill-logiciels` n'a pas d'aplat entre les fenêtres. Réserve `fond` sous l'illustration (balayée avec elle) ; même chose sous `s04-ill-batiment`, transparent autour de la façade, qui laissait l'amorce (274, 236) dans sa boîte.
3. Globe noir hors du cercle : le fichier `s04-ill-globe.svg` garde un fond sombre aux quatre coins (l'aperçu ne le montre pas). Découpé à son cercle (`clip-path: circle(50%)` sur une enveloppe) : il redevient le globe au trait de la spécification.
4. Lignes claires à travers le cadre de la feuille aux bords des bandes (y 289,5, 497,9, 624,6) avec quatre `Wipe` empilés comme le proposait la spécification, et encore avec un recouvrement de 1 px : un trou dans un trait déjà dessiné. Remplacé par une seule feuille découpée par un rectangle dont le bas descend bande par bande, au même avancement que `Wipe` (`wipeProgress`) : même image, plus de couture (contrôlé pixel par pixel sur la capture finale).

### Écarts à la spécification et leur raison
- Réserves dans les cartes et la feuille absentes (point 1 ci-dessus). La spécification est suivie à la lettre en passant `RESERVE_CARTE` à `THEME.colors.papier`.
- Fond `fond` sous les fenêtres et le bâtiment, globe découpé à son cercle (points 2 et 3) : rendent l'image conforme à ce que la spécification dit de ces illustrations (aplat qui couvre les amorces, globe au trait).
- Feuille par bandes réalisée par une seule découpe au lieu de quatre `Wipe` (point 4) : même mouvement, sans couture.
- La réserve d'un texte tapé se pose au début de la frappe, entière (et non lettre par lettre) : `TypeText` n'expose pas la partie tapée.
- `measureText` et `fitText` non employés au rendu : leur cache garde une mesure faite avant le chargement des polices. Les tailles de la spécification sont gardées et vérifiées après coup par les boîtes mesurées dans la page (contrôles ci-dessus).
- Pointes de sens écrites par leurs trois points : `makeTriangle` ne fait que des triangles équilatéraux, la spécification donne un triangle de 14 × 20.

### Décisions à prendre par l'utilisateur
1. Réserve des textes dans les cartes et la feuille. Options : (a) `papier` comme la spécification, avec les pavés clairs visibles tant que les illustrations ne sont pas aux jetons ; (b) aucune réserve dans une carte, le texte posé sur l'aplat de son illustration (état actuel). Recommandation : (b) maintenant, puis (a) le jour où `illustrations.py` ramène les couleurs aux jetons (proposition du graphiste) ; aucun trait ne passe sous ces textes. À regarder : `/home/user/Bimaccess-FME/modules/M01/L01/lecon-essai/.studio/tmp/hd2/s02-end.png`, `/home/user/Bimaccess-FME/modules/M01/L01/lecon-essai/.studio/tmp/hd4/s04-end.png` (état actuel). Rien n'est bloqué en attendant.

### Signalements pour l'utilisateur ou un autre rôle
- Graphiste : défauts des fichiers vus sur les captures, hors du code : `s04-ill-globe.svg` à fond sombre hors du cercle ; `s02-ill-contrat.svg` porte un trait parasite au-dessus de son bord haut, à gauche (x 104 à 260 environ, y 410) ; l'aplat du sceau se devine en carré sur le corps du contrat ; `s02-ill-logiciels.svg` et `s04-ill-batiment.svg` sans aplat ; aplats à #F7F8F2 au lieu de `papier`.
- Graphiste : allumés, le bas du rectangle du libellé 1996 (y 687) et le haut de celui du logo (y 694) passent sur la branche verticale de l'amorce (1186, 692) ; le texte, lui, n'y touche pas.
- Orchestrateur : `s02-route.tsx` n'a plus d'emploi ; les lignes de groupe de `spec.md` que le graphiste a signalées comme fausses le restent.
- Mesure `tokens.py` non lancée : elle écrit dans `harnais/mesures/`, hors des fichiers de ce brief.
- Ce que le moteur devrait savoir faire : (1) `Svg` `bands={[{ bottom, at, dur }]}`, réalisé comme ici par une seule découpe dont le bas descend, jamais par des boîtes empilées (couture) ; (2) une réserve d'illustration (`background` d'aplat sous un SVG sans aplat) et une découpe de forme (`clip="circle"`) en props de `Svg` ; (3) `TypeText` avec un style de la partie tapée, pour une réserve tapée avec le texte ; (4) une mesure de texte qui attend `document.fonts.ready` avant de remplir le cache de `measureText`.

### Blocage
Aucun.
