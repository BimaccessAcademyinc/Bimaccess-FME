## Rapport · graphiste · brief 20 (essai : S02 et S04 composées par la chaîne, illustrations commandées)

### Fichiers écrits
- `content/design/illustrations/s02-ill-{fondateurs,contrat,sceau,logiciels,saif,lieu}.json`, `content/design/illustrations/s04-ill-{carte,contour,batiment,feuille,signes,hachure,globe,repere}.json` : 14 commandes (format, dessin en anglais, sans texte). Chaque commande correspond au dessin livré : celle du contrat a été remise au texte du dessin existant après le refus 402, pour que le cache reste utilisable.
- `content/design/assets/s02-ill-*.svg` (6) et `s04-ill-*.svg` (8), avec leurs `.apercu.png` : écrits par `illustrations.py`, jamais retouchés à la main. Aucun autre fichier de `assets/` touché.
- `content/design/spec.md` : sections `## S02` et `## S04` réécrites en entier (illustrations avec x, y, largeur ; tracés du code ; textes par rang d'`## Écran` avec style, place et réserve ; états ; apparitions avec leurs locutions ; mises en évidence ; couleurs par fonction ; ce que le code doit faire ; points ouverts). Le reste du fichier est inchangé (vérifié par diff).

### Contrôles
- Analyse XML des 14 SVG `s0[24]-ill-*.svg` → aucun mal formé.
- Compte des tirets cadratins de `content/design/spec.md` (commande du brief) → 0.
- `flock /tmp/fme001-sync.lock npm run sync` → code 0 ; « 7 scène(s), 7 clip(s) dont 7 avec voix, 0 exercice(s), 29 illustration(s), signature carte ».
- `check-design.mjs content/design --signature neutral` (il refuse `carte`) → « 53 locution(s) de spec.md contrôlée(s) » : toutes sont dites, aucune ambiguë. Il signale aussi 15 erreurs « identifiant non préfixé » : `<g id="dessin">` dans les 14 SVG de l'outil et `Layer_1` dans `fme-logo.svg`. `sync` les accepte.
- Maquette de contrôle (scratchpad, non livrée) : aperçus posés aux places de la spécification, textes mesurés avec Source Serif 4 et Barlow Condensed. Résultat : aucun texte sur un trait d'illustration, aucun texte sur une amorce du carroyage, rien sous y 860 hors des mises en évidence, rien dans la zone d'action.

### Composition et moment fort
- **S02** : à gauche, la carte des fondateurs au-dessus du contrat, d'où part la frise ouverte (image 0). Entre les jalons 1993 et 1996, trois fenêtres de logiciel envoient trois routes d'écriture rouges dans la feuille SAIF ; sous 1996, le libellé, le logo puis le nom d'origine ; en haut à droite, au-dessus du bout ouvert, la carte de lieu de Surrey. Moment fort : sur « Trois ans après la fondation », le jalon 1996 se trace, les cases des années courent de 1993 à 1996, puis le logo et « Feature Manipulation Engine » viennent sous le jalon. Ensuite, la mise en évidence suit la voix : libellé, nom d'origine, logo.
- **S04** : en projection européenne, le bâtiment réel en élévation est au-dessus de son contour sur la carte, et la carte avec le contour seul forme l'image 0. À droite, la fiche « Entité géographique » grandit bande par bande, et un trait relie le bâtiment au bandeau. Moment fort : sur « Sa géométrie porte », la rubrique se déroule et le contour quitte la carte pour se poser dans la rubrique ; les trois signes suivent, puis les hachures sur « Ici, le contour forme une surface ».

### Illustrations (nom · ce qu'elle montre · reprises)
- `s02-ill-fondateurs` : carte de rôle à bandeau vide, deux hommes en silhouettes d'échelle · 0 reprise. Coins légèrement arrondis.
- `s02-ill-contrat` : feuille, bandeau de titre vide (14 % de la hauteur), filet double, corps vide · 1 reprise demandée (bandeau à 25 %) et refusée : 402, crédits épuisés.
- `s02-ill-sceau` : sceau rond neutre, festonné, rosace, deux rubans, sans emblème ni lettre · 0.
- `s02-ill-logiciels` : trois fenêtres empilées (boîtes liées, tableau, dessin), sans nom ni logo · 0. Coins légèrement arrondis.
- `s02-ill-saif` : feuille de format à double cadre, bandeau vide, courbes de niveau et rivière · 0.
- `s02-ill-lieu` : carte de lieu, limite en tiret-point, signe de localité, moitié droite vide pour le toponyme · 1 reprise (la première ne laissait pas de place au texte).
- `s04-ill-carte` : îlots orthogonaux au trait gris, îlot central vide · 1 reprise (la première avait un quadrillage incliné, sur lequel un contour droit ne tombait pas juste).
- `s04-ill-contour` : rectangle à trait épais, intérieur papier · 0.
- `s04-ill-batiment` : élévation d'un immeuble de bureaux · 1 reprise (la première avait une porte vitrée en bleu `lecture`, couleur de fonction) ; la reprise a six niveaux.
- `s04-ill-feuille` : fiche à double cadre, bandeau et trois rubriques vides · 0. Une bande étroite en trop en bas.
- `s04-ill-signes` : point, ligne, surface hachurée · 0.
- `s04-ill-hachure` : plage de hachures fines sans contour · 2 réponses sans image, puis 1 dessin sur une description reformulée. 562 ko, hachures plus fines que la charte.
- `s04-ill-globe` : globe au trait (équateur, deux parallèles, un méridien) · 0.
- `s04-ill-repere` : petite emprise hachurée · 0. Hachures un peu irrégulières, sans effet à 32 px sur le globe.

Bilan : 17 dessins livrés, dont 14 gardés ; 2 réponses sans image ; 1 refus 402. Cela fait environ 2,2 $ à 0,13 $ le dessin. Chaque lot met de 15 à 17 s par dessin, en parallèle.

### Ce que le code devra faire que le moteur ne fait pas encore
- S04 : révéler une même illustration par bandes horizontales, chacune balayée sur sa locution. Faisable dans la scène : 4 `Wipe` à `overflow: hidden`, chacun avec le `Svg` décalé (valeurs dans la spécification). Je propose au moteur une prop `bands` de `Svg`.
- S02 : la frise doit être posée entière à l'image 0, soit par un `Trace` à durée nulle, soit par un trait posé sans animation. Les pointes de sens sont des `Trace` fermés avec `fill`. Les cases des années sont deux `Trace` superposés, `encre` 14 px et `papier` 10 px, à la même vitesse.
- Réserve de chaque texte (`papier` dans une carte, `fond` sur la face) : dans l'élément du texte, balayée ou tapée avec lui.
- Les illustrations de l'outil portent `width`, `height` et un `<g id="dessin">` non préfixé. Aucune `parts` n'est demandée, mais cet identifiant revient 14 fois dans la page.

### Décisions à prendre par l'utilisateur
Aucune bloquante. À confirmer par Ilyas sur planche (points ouverts de la spécification) :
- le contenu cartographique de la feuille SAIF (la remise ne dit pas quel genre de donnée porte SAIF ; sinon, corps vide) ;
- S04 : le bâtiment placé au-dessus de la carte ;
- `SAIF` en couleur `terme`.

### Signalements pour l'utilisateur ou un autre rôle
- **Écarts au storyboard** (Scénariste) :
  - les apparitions sont calées sur le début de la phrase qui les dit (REGLES 5.2), avec des gestes enchaînés, et non sur les mots en milieu de phrase de la mise en scène ; les mises en évidence suivent les mots de la voix (REGLES 5.3) ;
  - S02 : la mise en évidence est sur l'étiquette `Traduction` seule, car un rectangle autour des routes passerait sur les cadres des fenêtres et de SAIF ;
  - S04 : la carte est sous le bâtiment, pour que le trait arrive sur le bandeau, seule partie de la feuille déjà dessinée sur « représente le bâtiment réel » ;
  - aucun texte manquant. Les deux noms possibles pour la carte et le bâtiment de S04 restent proposés, non ajoutés.
- **Écarts à la charte** :
  - `Don Murray · Dale Lutz` est en interlettrage 0,16 em au lieu de 0,32 em : le contrat dessiné limite la colonne à 332 px ;
  - le titre du contrat est en serif 600 de 24 px, sur une ligne ;
  - les cartes des fondateurs et des fenêtres ont des coins légèrement arrondis ;
  - les SVG vectorisés portent des couleurs voisines des jetons, pas les valeurs exactes (par exemple `#F8F9F3` pour `papier`) ;
  - `s04-ill-hachure` dépasse les 200 ko.
- **Ce que j'aurais redessiné** si le modèle avait répondu :
  - le contrat, avec un bandeau à 25 %, pour rendre aux fondateurs leur interlettrage 0,32 em et au titre 28 px ;
  - les fondateurs et les fenêtres, à coins vifs ;
  - les hachures, plus grossières (environ 9 px d'écart) et plus légères ;
  - la carte, avec moins d'îlots et des îlots plus grands ;
  - l'emprise, avec des hachures parallèles nettes ;
  - la fiche, sans la bande basse.
- **Orchestrateur** :
  - hors de mes sections, `spec.md` garde des lignes de groupe devenues fausses pour S02 et S04 : « Ce que le code doit faire (écarts de la coque, rapport 06) », lignes 6 et 4 (routes à bouts ronds, composant `Route`, inutiles maintenant que les routes finissent sur la fenêtre et la pointe) ; « Points ouverts » du groupe a, n° 3 à 5 et 7 ; « Points ouverts du groupe b », n° 1 à 3 ; la phrase d'en-tête sur la provenance. À réconcilier ;
  - les fondateurs de S01 et S06 restent dessinés à la main : si l'essai est retenu, la même illustration doit servir aux trois scènes ;
  - je n'ai pas lancé la mesure `tokens.py`, qui ne figurait pas dans les fichiers à écrire.
- **Harnais (`illustrations.py`)** : préfixer l'identifiant du groupe (`<nom>-dessin`), retirer `width` et `height` de la racine, ramener les couleurs aux jetons après vectorisation. L'aperçu rend le `papier` presque transparent (alpha calculé sur l'écart au fond), alors que le SVG le garde opaque.

### Blocage
Aucun pour la spécification. Le modèle d'image a refusé la reprise du contrat : `illustrations.py --noms s02-ill-contrat` → « erreur 402 : Your prepayment credits are depleted ». Je n'ai fait aucun autre appel ensuite.
