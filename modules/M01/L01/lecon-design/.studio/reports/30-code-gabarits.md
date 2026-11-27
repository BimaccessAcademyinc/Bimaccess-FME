## Rapport · code · brief 30 (essai 2, phase A : gabarits Frise et FicheRubriques)

### Fichiers écrits
- `src/engine/gabarits/donnees.ts` (nouveau) : lecture et contrôle de forme des données (`GabaritError`, lecteur de champs à chemin : fichier, champ, quoi faire).
- `src/engine/gabarits/plan.ts` (nouveau) : instants (locutions, durées, enchaînements), contrôles croisés, ordre de pose, états, mises en évidence, contrôle de remplissage de la zone utile (`ZONE`, `VIDE_MAX`).
- `src/engine/gabarits/vue.tsx` (nouveau) : rendu, vue pure de `useT` (Svg, Wipe, Trace, TypeText, Move, Highlight, Title du moteur).
- `src/engine/gabarits/pieces.tsx` (nouveau) : `poser`, `Texte`, `Source`, `sourceHref` repris de `src/lesson/components/s02-s04-commun.tsx` et `s01-commun.tsx` (copiés : les scènes de l'essai 1 importent toujours les originaux, laissés intacts), `cssDe`.
- `src/engine/gabarits/index.ts` (nouveau) : `Frise.scene(data)`, `FicheRubriques.scene(data)`.
- `src/engine/index.ts` : une ligne d'export ajoutée (gabarits, `GabaritError`, `ZONE`, `VIDE_MAX`, pièces).
- `docs/gabarits.md` (nouveau) : format champ par champ, pièces propres à chaque gabarit, gestes, exemples courts, remplissage de la feuille, table des erreurs, commandes de vérification.
- `content/design/scenes/` : dossier créé, vide. `src/lesson/scenes/s02.tsx` et `s04.tsx` : branchés le temps de l'essai, puis rétablis depuis `lecon-essai` (`diff -q` : identiques). Aucun fichier d'essai restant ; `.studio/qa/a/` garde les deux planches d'essai.

### Contrôles
- `node …/scenes/scripts/check-literals.mjs src/lesson` → code 0 ; « 12 fichier(s) lu(s), 0 texte(s) en dur ».
- `flock /tmp/fme001-sync.lock npm run check` (scènes rétablies) → code 0 ; « [sync] scènes chargées : 7, locutions, ordre, textes et illustrations nommées vérifiés », `tsc` sans erreur.
- Essai S02 en `Frise` (toutes les places de la spécification, scène en trois lignes) : `npm run check:scenes` refuse d'abord la composition de la spécification : « GabaritError : content/design/scenes/S02.json, champ « (composition finale) » : la feuille n'est pas remplie : vide de x 444 à 854, y 650 à 860 (410 × 210 px) … éléments qui le bordent : illustrations.contrat, illustrations.sceau, textes.jalon-1993-libelle » (le défaut relevé par Ilyas). Carte de lieu passée dans ce vide et logo en haut à droite pour l'essai : chargement en 0 ; `npm run build` en 0 ; `planche.mjs --scenes S02 --out .studio/qa/a` en 0, « 0 erreur(s) de page ou de console », 11 captures, regardées : frise et pointe à l'image 0, jalons, cases à deux couches, routes à trois couches et pointes, frappes, une seule mise en évidence à la fois, état final composé.
- Essai S04 en `FicheRubriques` (places de la spécification) : chargement en 0, planche `.studio/qa/a/planche-S04.png` en 0, 9 captures, regardées : bandes sans couture, bâtiment du sol au toit sur son aplat, contour déplacé vers la rubrique, globe découpé à son cercle, filet tracé pendant la frappe, une seule mise en évidence, dernière tenue jusqu'à la fin.
- Erreurs de chargement provoquées sur l'essai S02, chacune avec fichier, champ et correction : locution introuvable, indice hors de `## Écran`, illustration inconnue, enchaînement qui déborde (« finissent à 25,15 s, après le début de l'étape suivante etapes[5] … déborde de 1,35 s »), deux mises en évidence qui se recouvrent, dernier état autre que `S02-FIN`, sens de balayage manquant, champ inconnu.
- Pas de `test:play` (consigne du brief).

### Le format en dix lignes
1. Un fichier `content/design/scenes/Sxx.json` ; la scène : `export const s02 = defineScene(Frise.scene(data))`.
2. Racine : `gabarit`, `scene`, `ecran` (nombre de textes d'Écran), `titre` et `source` (indices), `habillage`, `ordre` facultatif.
3. `illustrations` nommées : `fichier`, `x`, `y`, `largeur` (hauteur tirée du `viewBox`), `aplat` (jeton), `decoupe: "cercle"`.
4. `styles` nommés (police, taille, couleur par jeton…) ; `textes` nommés : `ecran`, `style`, `x` ou `cx`, `y`, `largeur`, `place` (face, carte), `reserve` (défaut `fond` sur la face, aucune dans une carte), `dans` (balayé avec son illustration).
5. `traces` nommés : `points` ou `d`, `epaisseur` ou `couches` (routes), `remplissage` (pointes).
6. `Frise` : `frise` (ligne et pointe posées à l'image 0), `annees` (couche foncée et case claire, même vitesse tirée de `getLength`).
7. `FicheRubriques` : `feuille` (`illustration`, bas des `bandes`), révélée par une seule découpe ; `deplacement` pour l'objet qui voyage.
8. `etapes` : `debut` ou `locution` (ou `repere`), `etat` (data-board), `gestes` enchaînés : `poser`, `balayage` (+ `sens`, `duree`), `frappe`, `trace`, `deplacement`, `bande` ; `avec: true` = en même temps que le précédent.
9. `evidences` nommées : rectangle, `de`, `a` (locutions ; absent = jusqu'à la fin), une seule à la fois.
10. Tout se contrôle au chargement, y compris le remplissage de la zone utile.

### Remplissage de la feuille (complément du coordinateur)
- Fait : `ZONE` (x 104 à 1424, y 180 à 860, zone d'action hors zone), commune aux deux gabarits ; au chargement, boîtes de la composition finale (illustrations à leur place d'arrivée, feuille, tracés avec épaisseur, frise, années, textes) sur une grille de 10 px, plus grand rectangle vide ; erreur s'il dépasse à la fois 25 % de la largeur et 25 % de la hauteur de la zone (`VIDE_MAX`), avec sa place et les éléments qui le bordent. Textes sans largeur : champ `largeurMesuree` (recopié de la spécification, sans effet sur l'image), `lignes` pour un texte sur plusieurs lignes ; aucune mesure de police au chargement.
- Pas fait : aucune échelle globale de composition. Une échelle uniforme ne comble pas un vide placé au milieu (c'est le cas de S02) : la phase B repositionne élément par élément, guidée par l'erreur. Documenté dans `docs/gabarits.md` § 6.
- Constat : le S04 de la spécification passe ce contrôle, même avec un seuil à 15 % (essayé, puis remis à 25 %). Le défaut qu'Ilyas voit dans S04 n'est donc pas un grand vide rectangulaire des boîtes ; voir la décision 2.

### Ce que les gabarits ne savent pas encore faire
- Un seul déplacement par illustration, en ligne droite (pas de chemin `getPointAtLength`).
- Réserve d'un texte tapé : posée entière au début de la frappe, pas lettre par lettre.
- Pas de `parts` (groupes d'un SVG révélés séparément) ni de `Callout`, `Dimension`, `Bullets`, exercice : scènes narrées seulement.
- Le contrôle de remplissage voit des boîtes, pas des traits : une illustration clairsemée compte comme pleine ; il ne remplace pas la planche.
- Pas de contrôle « aucun texte sur un trait » (il faudrait la géométrie des traits dessinés dans les SVG).
- Mention de source et titre à places fixes (x 1448 bas 820 ; x 104 y 84), règles communes de la spécification.

### Ce que la phase B doit savoir
- Lire `docs/gabarits.md` en entier ; recopier la spécification table par table : illustrations, textes (« Rang » = `ecran`), tracés, apparitions (une étape par ligne, gestes dans l'ordre de la colonne « Mouvement »), mise en évidence (rectangle, De, À), états.
- Les places de la spécification ne passent pas pour S02 : vide de x 444 à 854, y 650 à 860. Il faut repositionner (illustrations de taille libre, jamais étirées, mêmes gestes et locutions), puis replacer textes dans les cartes, routes, pointes, jalons et rectangles de mise en évidence, sans texte sur un trait.
- Chaque texte d'Écran doit être posé une fois ; donner `largeurMesuree` à chaque texte d'une ligne, sinon il compte pour une largeur nulle dans le contrôle de remplissage.
- Boucle courte : `flock /tmp/fme001-sync.lock npm run check:scenes` après chaque retouche, puis `check`, `build`, planche.

### Décisions à prendre par l'utilisateur
1. Seuil et forme du contrôle de remplissage. Options : (a) plus grand vide rectangulaire au plus 25 % × 25 % de la zone (en place) ; (b) seuil plus strict ; (c) un autre critère (taux d'occupation, vide par quart de feuille). Recommandation : (a) pour la phase B, qui attrape le défaut de S02 ; revoir après la planche de la phase B. Rien n'est bloqué.
2. S04 : à seuil de 25 % comme à 15 %, la composition de la spécification n'a aucun grand vide de boîtes. Ce qu'Ilyas juge incomplet doit être nommé (bande basse sous la carte et la feuille, y 762 à 860 ? marge gauche du bâtiment ?) pour que le gabarit le contrôle. À regarder : `/home/user/Bimaccess-FME/modules/M01/L01/lecon-gabarits/.studio/qa/a/planche-S04.png`, dernière capture. La phase B peut commencer sans cette réponse.
3. Réserve des textes dans une carte : défaut « aucune » (recommandation du rapport 21), `"reserve": "papier"` par texte pour suivre la spécification ; décision toujours ouverte.

### Signalements pour l'utilisateur ou un autre rôle
- Orchestrateur : `src/engine/` modifié par ce brief (rôle Code, essai) ; à reporter dans le moteur source si les gabarits sont retenus. `pieces.tsx` importe `content/sources.json` : un projet sans ce fichier ne se construirait plus, à prévoir au report dans le moteur source.
- Orchestrateur : `src/lesson/components/s02-s04-commun.tsx` et `s01-commun.tsx` restent employés par les scènes de l'essai 1 ; doublon avec `pieces.tsx` jusqu'à la phase B.
- Mesure `tokens.py` non lancée : elle écrit dans `harnais/mesures/`, hors du dossier de ce brief.

### Blocage
Aucun.
