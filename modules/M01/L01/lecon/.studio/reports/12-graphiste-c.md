## Rapport · graphiste c (S05, S06, S07) · brief 12

### Fichiers écrits
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/spec/spec-c.md : sections `## S05`, `## S06`, `## S07` au gabarit du skill (composition en px, états `S05-1`… `S07-FIN`, apparitions sur locutions exactes, mise en évidence, couleurs par fonction, réserves du carroyage), puis « Ce que le code doit faire » et « Points ouverts (groupe c) ».
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/s05-chaine.svg : feuilles `Format de départ` (trame horizontale) et `Format attendu` (trame quadrillée) en décor ; groupes `s05-chaine-outils`, `s05-chaine-lire-pointe`, `s05-chaine-ecrire-pointe`.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/s05-carte.svg : carte d'entité (parcelle et ligne d'attribut) qui fait le trajet ; groupe `s05-carte-trame-attendue`.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/s06-couronne.svg : huit feuilles de format au tireté en éventail (contenus de la bibliothèque), liaison arrêtée sur le manque en décor ; groupes `s06-couronne-courbes`, `s06-couronne-moteur` (réserve qui couvre le manque, point géodésique), `s06-couronne-reliees` (trait plein des feuilles). Repris et corrigé de `s05-couronne` de la version interrompue (positions recalculées, identifiants renommés).
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/s06-fondateurs.svg : carte de rôle des fondateurs, deux silhouettes (dessin de `carte-role.svg`), 420 × 140.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/s06-bouts.svg : bouts ronds des routes au moteur, de secours seulement (groupes `s06-bouts-lecture`, `s06-bouts-ecriture`), inutile si `Trace` reçoit une prop `cap`.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/s07-entite.svg : feuille d'entité (contour nouveau), deux traits arrêtés sur deux manques, entièrement en décor.
- Symboles partagés `echelle-graphique.svg` et `rose-des-vents.svg` : déjà copiés à l'identique par un autre graphiste (vérifié par `cmp`), non réécrits.

### Contrôles
- `for f in content/design/assets/s0*.svg; do python3 -c "import xml.dom.minidom,sys;xml.dom.minidom.parse(sys.argv[1])" "$f" || echo "mal formé : $f"; done` → aucun SVG mal formé (ceux des groupes a et b compris).
- `grep -c` du tiret cadratin sur `.studio/spec/spec-c.md` (commande du brief) → 0 ; même contrôle sur mes six SVG → 0.
- `node …/graphisme/scripts/check-design.mjs content/design --signature neutral`, lancé sur une copie temporaire (storyboard, spec-c.md comme spec.md, mes SVG) pour les contrôles SVG et les locutions → code 0 ; extrait : « 8 SVG contrôlé(s), 23 locution(s) de spec.md contrôlée(s), 0 erreur(s), 3 avertissement(s) » (thème absent de la copie ; width/height des deux symboles partagés, identiques à la bibliothèque).
- Largeurs de texte mesurées avec les vraies polices (Source Serif 4, Barlow Condensed des paquets @fontsource) ; amorces de quadrillage contrôlées par script contre chaque feuille, texte et trait (aucune amorce coupée à moitié par une feuille, aucune dans un texte) ; planches de contrôle rendues hors navigateur pour vérifier la composition finale des trois scènes.
- `npm run sync` non lancé (consigne du brief).

Une ligne par scène :
- S05 : la chaîne lire, transformer, écrire, de la feuille `Format de départ` à la feuille `Format attendu` par la route bleue, le cartouche des outils, la route rouge ; moment fort : la carte d'entité arrive dans la feuille d'arrivée et prend sa trame sur « dans le format attendu ».
- S06 : l'éventail de huit formats non reliés autour d'un manque ; le point géodésique `Moteur` se pose à sa place dans ses courbes de niveau, seize routes (une de lecture, une d'écriture par feuille) en font une étoile, les fondateurs reviennent ; moment fort : les feuilles passent du tireté au trait plein sur « un logiciel différent n'empêche pas ».
- S07 : la feuille `Entité géographique` et deux traits arrêtés sur deux manques ; moment fort : `Format` puis `Système de coordonnées` se posent chacun sur sa moitié de la question.

Ce que le code devra ajouter au moteur :
- `Trace` : une prop `cap` (`"round"`) lue en carte, pour les bouts des routes au moteur en S06 (sinon `ASSETS["s06-bouts"]`, sous les routes) ;
- un tracé de chemin `d` avec transformation (ou un mode « tracé » de `Svg` pour un groupe), pour tracer les courbes de niveau anneau par anneau comme la charte le demande ; en attendant, balayage d'un bloc ;
- rien d'autre : `at` de `Highlight` et `shape="circle"` existent déjà, la spécification dit où les passer.

### Décisions à prendre par l'utilisateur
Aucune.

### Signalements pour l'utilisateur ou un autre rôle
- Scénariste (texte voulu, non ajouté) : S06 n'a pas de `Lire` ni d'`Écrire` à l'écran, alors que seize routes bleues et rouges y paraissent ; proposition : ajouter `Lire` et `Écrire` à « ## Écran » de S06 pour une légende de marge, arrivées avec les routes.
- Graphiste a / orchestrateur : la carte des fondateurs de S06 (420 × 140) n'a pas la taille de celle de S01 et S02 (440 × 190) ; `Don Murray · Dale Lutz` en en-tête de cartouche à 24 px demande 381 px, d'où la largeur ; à harmoniser avec le style du nom choisi en S01 et S02.
- Orchestrateur : sans légende, l'échelle graphique se pose en x 1480, y 84 (même règle que le graphiste b) ; à appliquer aussi en S01 et S02 si elles n'ont pas de légende.
- Code : S05 n'a besoin d'aucun bout rond (chaque bout de route touche une feuille ou une pointe) ; les pointes sont dans le SVG, sous les `Trace`, et la route s'arrête à leur base. Les instants qui suivent un tracé se calent sur la locution plus la durée du tracé (détail dans spec-c.md).
- Scénariste (pour information) : S06 cale les routes d'écriture sur « et s'écrivent vers » et S07 cale ses deux noms au milieu de son unique phrase, comme le storyboard le demande ; les autres apparitions sont calées sur le début de leur phrase (« FME commence par lire », « Autour de FME », « Pour le problème que Murray et Lutz »…).
- Charte : le tableau des symboles de CHARTE-FME001.md (§ 5) cite encore l'ancienne numérotation des scènes (S05 couronne, S06 Safe Software, S07 fondateurs, S08 pont) ; à mettre à jour hors de cette leçon.

### Blocage
Aucun.
