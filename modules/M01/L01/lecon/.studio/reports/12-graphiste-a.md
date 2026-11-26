## Rapport · graphiste a · brief 12

### Fichiers écrits
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/spec/spec-a.md : sections `## S01` et `## S02` au gabarit du skill (composition en px, états `S01-1` à `S01-FIN` et `S02-1` à `S02-FIN`, apparitions sur les locutions exactes, mises en évidence, couleurs par fonction), composants récurrents du groupe, ce que le code doit faire pour les écarts de la coque, points ouverts.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/s01-projet.svg : territoire en tiret-point et carte des fondateurs (décor) ; groupes `s01-projet-entreprises`, `s01-projet-gouvernement`, `s01-projet-manque`, `s01-projet-logiciels`. `viewBox="100 180 1328 680"`, en coordonnées de scène, à poser 1:1.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/s02-frise.svg : carte des fondateurs, feuille du contrat, frise à bout ouvert (décor) ; groupes `s02-frise-rubrique`, `s02-frise-saif`, `s02-frise-logiciels`, `s02-frise-pointes`, `s02-frise-annees`, `s02-frise-lieu`. Même `viewBox`, posée de la même façon.
- Symboles partagés : `echelle-graphique.svg` et `rose-des-vents.svg` étaient déjà copiés par un autre graphiste, identiques à `design/symboles/` (vérifié avec `cmp`) : je ne les ai pas réécrits.
- Illustrations tirées de la charte : silhouettes de `personne.svg` et `carte-role.svg`, fenêtres de `logiciel.svg`, feuille de `document.svg`, feuille de `feuille-format.svg`, frise de `frise.svg`, manque de `manque.svg`, lieu de `lieu.svg`, pointe de `route-ecriture-sens.svg`. Repris de `.studio/tmp/graphiste-interrompu/` : l'idée des cartes de rôle et de la frise (s06-projet, s07-frise) ; leur géométrie a été refaite, parce que le storyboard actuel place les fondateurs, les fenêtres, SAIF et les routes autrement.

### Contrôles
- Boucle `xml.dom.minidom` sur `content/design/assets/s0*.svg` → aucune sortie « mal formé » (les SVG de mes deux scènes et ceux des autres groupes déjà présents).
- Comptage des tirets cadratins du brief (`grep -c`) sur `.studio/spec/spec-a.md` → 0 ; 0 aussi dans les deux SVG.
- `node /home/user/bimaccess-studio/plugins/studio/skills/graphisme/scripts/check-design.mjs content/design --signature neutral` → code 0 ; extrait : « 15 SVG contrôlé(s), 0 locution(s) de spec.md contrôlée(s), 0 erreur(s) ». Le script ne connaît pas la signature `carte` (seulement `bimaccess` ou `neutral`). Ses avertissements portent sur le thème de la charte, qu'il ne connaît pas, et sur les `width`/`height` des deux symboles copiés de la charte. Aucun ne vise mes SVG.
- Textes mesurés avec les vraies polices du projet (métriques de `@fontsource/source-serif-4` et `@fontsource/barlow-condensed`, fontTools). Chaque boîte de texte a été comparée aux croix du carroyage, aux zones des sous-titres et d'action et aux autres textes (script dans le dossier de travail) : aucun texte de face ne touche une croix, aucun texte n'entre dans une zone réservée, aucun ne chevauche un autre.
- Locutions de la spécification : chacune est dite une seule fois dans la narration de sa scène, dans l'ordre des états (contrôle par script sur `content/storyboard.md`).
- Pas de `npm run sync` ni de navigateur (brief).

### Scènes
- S01 : le territoire « Colombie-Britannique » contient les fondateurs en haut, puis les entreprises et le gouvernement. La liaison part des entreprises et s'arrête à mi-chemin sur le manque or, et leurs trois logiciels apparaissent sous les entreprises. Moment fort : la mise en évidence passe des fenêtres (« garde donc son logiciel ») à la carte des fondateurs (« voient de près ce problème »).
- S02 : une frise part du contrat, à côté des fondateurs. 1993 se pose, puis la feuille SAIF au-dessus de la frise ; les routes de traduction se tracent depuis les trois fenêtres. 1996 ajoute les cases des années et le nom d'origine, et Surrey vient à part. Moment fort : les routes rouges qui arrivent sur SAIF sous « Traduction », mises en évidence sur « une technologie de traduction pour SAIF ».

### Ce que le code devra ajouter au moteur
- `Trace` : une prop de bout (`cap="round"`, défaut `butt`) pour les routes de S02. Chaque route = trois `Trace` superposés (bord `encre` 11, chaussée `chaussee` 8, axe `ecriture` 4), même chemin, même instant, même durée. Les points sont donnés dans la spec.
- `Highlight` : la scène lui passe `at` (instant de l'étape de `focusAt`). Toutes les mises en évidence du groupe sont des rectangles, aucun cercle.
- Une réserve de texte sur la face : `background` `fond`, `padding` 2 px, pour chaque texte posé hors d'une carte. Une classe de `carte.tsx` (par exemple `carte-reserve`) éviterait de la répéter scène par scène.
- Une mention de source en marge, calée par le bas à y 820, avec son filet de 220 px, cliquable : un petit composant commun aux sept scènes serait plus sûr que des positions recopiées.
- Les SVG de scène se posent au-dessus de la feuille et sous les textes HTML ; un texte posé dans une carte apparaît dans le même `Wipe` que le groupe de sa carte (même instant, même sens).

### Décisions à prendre par l'utilisateur
- Routes de traduction de S02. Question : quelle forme pour la traduction vers SAIF, qui précède FME, alors que la charte réserve les routes à ce que FME lit et écrit ? Options : route d'écriture rouge ; liaison d'échange noire ; trait simple. Recommandation : la route d'écriture, parce que la phrase dit des données « traduites vers ce format », donc écrites dans SAIF ; la liaison d'échange désigne un échange entre deux parties, et un trait simple ne dirait pas que des données passent. Fichier à regarder : /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/spec/spec-a.md (S02). Rien n'est bloqué en attendant : seule la couleur des routes changerait.

### Signalements pour l'utilisateur ou un autre rôle
- Scénariste : la cible des liens des mentions de source manque. Le storyboard veut « D'après la presse spécialisée et Safe Software » (S01) et « D'après Safe Software et la presse spécialisée » (S02) cliquables, sans donner d'adresse ni de référence ; le code ne doit pas l'inventer.
- Scénariste : S02, les fenêtres de logiciel paraissent sur « les données de chaque logiciel », étape que la mise en scène ne date pas (elle fait seulement partir les routes des fenêtres). À confirmer.
- Ilyas ou orchestrateur : « SAIF » est en couleur `terme` (vocabulaire introduit en S02), comme « Entité géographique » en S03. À confirmer.
- Orchestrateur, graphistes b et c : la mention de source est calée par le bas à y 820 et non à y 772 comme dans la charte. À y 772, un bloc de deux ou trois lignes entre dans la zone d'action (y 834). Pour que la mention reste à la même place dans toutes les scènes, la même règle est à suivre ailleurs et à reporter dans la charte (§ 4). Sans légende, l'échelle graphique est à x 1480, y 96.
- Code : `check-design.mjs` ne connaît pas la signature `carte`. Il faudra le reporter dans le plugin pour que la QA contrôle les SVG et la spécification dans cette signature (contrastes, jetons, locutions de `spec.md`).
- Choix de placement, pour la QA : les libellés des jalons de S02 sont alignés à droite sur leur trait et tiennent sur deux lignes. Sur une ligne, celui de 1996 sortirait de la face.
- Textes que j'aurais voulus et que le storyboard ne donne pas : aucun d'indispensable. Le corps de la feuille SAIF reste vide, faute de matière sur le genre de donnée qu'elle porte : ne rien y ajouter sans une affirmation de la remise.

### Blocage
Aucun.
