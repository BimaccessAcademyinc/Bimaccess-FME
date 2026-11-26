## Rapport · code · brief 06

### Fichiers écrits

Moteur, lecteur, scripts (fonction du template : aucune référence au programme ni à la leçon, seulement à la signature `carte`) :

- /home/user/Bimaccess-FME/modules/M01/L01/lecon/scripts/sync.mjs : `carte` dans `SIGNATURES` (liste commune des messages d'échec : `SIGNATURE_LIST`) ; thème par défaut `carte` = les 23 jetons de la charte en camelCase (`fond`, `papier`, `encre`, `encre2`, `carroyage`, `relief`, `reliefMaitresse`, `chaussee`, `ecriture`, `lecture`, `lectureFond`, `eauFond`, `vegetation`, `vegetationFond`, `imageClair`, `imageFonce`, `terme`, `manque`, `manqueFond`, `lien`, `lienSurvol`, `survol`, `verrouTrait`), polices `serif` et `capitales` ; les clés communes que lisent le moteur et les scènes (`background`, `ink`, `accent`, `panel`…, `body`, `mono`…) sont **dérivées** de ces jetons après la fusion avec theme.json (`CARTE_ALIASES`), sauf si theme.json les donne lui-même : une seule source ; polices Source Serif 4 (400, 600, italiques 400 et 600) et Barlow Condensed (500, 600), en ligne ; programme et couleur affichés en `bimaccess` et `carte` (`PROGRAM_SIGNATURES`, avertissement seulement en neutre) ; avertissements carte (fond autre que `#F1F3EC`, `radius` ou `grid` non nuls) ; type `Signature` généré depuis la liste.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/engine/signature.ts : `CARTE` à côté de `BIM` (inchangé) ; `SHEET_SHADOW` vaut `none` en carte.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/engine/carte.tsx (nouveau) : SceneRoot (fond, feuille dessinée dès l'image 0 et jamais animée, d'après la géométrie de cadre-feuille.svg : cadre 2 px, damier de 12 px à cases de 76 px, filets 46 et 58, carroyage depuis 274, 236 tous les 228 px ; aucune grille de points ni SCU ; zone d'action `data-zone="actions"` x 1454, y 834, 360 × 140, 16 px d'écart), Title, Bullets, Diagram, Callout, Captions, ChoicePanel : mêmes props, mêmes `data-testid`, `data-role`, `data-board`, même comportement que bimaccess.tsx. N'emploie que les clés communes du thème : compile dans les trois signatures.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/engine/components.tsx : délégation à carte.tsx comme à bimaccess.tsx ; tailles par défaut de `Title` et `Bullets` propres à chaque signature (rendus neutres inchangés).
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/engine/anim.tsx : `Trace` à bouts nets et angles vifs en carte ; caret de frappe en encre ; `Highlight` et `HighlightRect` au dessin de la charte en carte : tireté `accent` 2,5 px, motif 10 6, sans poignée, `pad` 10 ; ajouts facultatifs `shape="circle"` (Highlight, rayon = demi-diagonale + pad) et `at` (tracé en 0,25 s, rectangle depuis le coin haut gauche, cercle depuis le haut), lus en carte seulement.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/engine/index.ts : export de `CARTE`. /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/engine/shared.ts : commentaires (trois signatures).
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/player/player-carte.css (nouveau) : coque sous `:root[data-signature="carte"]` (en-tête de feuille 44 px, filet double, pastille, échelle graphique, position ; boutons LANCER, SUIVANT, PRÉCÉDENT, SOUS-TITRES en cartouche et leurs états ; focus en trait plein bleu ; écrans Lancer et Fin ; écrans étroits, téléphone, plein écran) et classes de scène `carte-btn`, `carte-panel`, `carte-choice`, `carte-feedback`, `carte-sr` aux valeurs du § 6.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/player/App.tsx : barre d'état carte (programme toujours nommé, échelle graphique `data-testid="progress-scale"` : terminées en encre, courante à la couleur du programme, à venir en papier).
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/player/Controls.tsx : curseur rempli et cadenas au trait aussi en carte.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/main.tsx : import de player-carte.css ; `--radius` 0 et `--c-program` en carte ; `--comp-w` (largeur de composition, pour l'échelle de la coque).
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/CLAUDE.md et /home/user/Bimaccess-FME/modules/M01/L01/lecon/docs/player-contract.md : signature carte documentée (§ 6 et § 9, valeurs, jetons, dérivation, props `shape` et `at`), pour que le contrat reste conforme au code.

Projet de la leçon :

- /home/user/Bimaccess-FME/modules/M01/L01/lecon/studio.config.json : `"signature": "carte"` (rien d'autre ; `acknowledgeRemotionLicense` inchangé).
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/theme.json : remis aux jetons de la charte (`"signature": "carte"`, 23 couleurs, `serif`, `capitales`, `radius` 0, `grid` 0, `typingCps` 35) ; plus d'accent cyan.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/lesson/scenes/s01.tsx : scène du gabarit mise en accord avec le storyboard au minimum : `sceneTexts("S01", { screen: 7 })`, titre et six textes d'écran dès l'image 0.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/lesson/scenes/attente.tsx (nouveau) et /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/lesson/lesson.ts : S02 à S08 en attente (voir Signalements).

### Contrôles

- `npm run check` → code 0 ; extrait : « [sync] 8 scène(s), 9 clip(s) dont 0 avec voix, 1 exercice(s), 0 illustration(s), signature carte, programme FME001 (#00A64F), 6 police(s) embarquée(s) » ; « [sync] scènes chargées : 8, locutions, ordre, textes et illustrations nommées vérifiés » ; tsc sans erreur.
- `npm run build` → code 0 ; extrait : « dist/index.html  852.27 kB │ gzip: 338.22 kB » ; « ✓ built ».
- `npm run test:play -- --shots …/.studio/tmp/shots-signature` → code 0 ; 158 contrôles « ok » ; extrait : « écran étroit : aucun défilement horizontal (page 390 px, scène 358 px, fenêtre 390 px) », « téléphone à l'horizontale : sans en-tête, scène 562 × 316 px (81 % de la hauteur) », « [play-check] tout est conforme ». Un seul Chromium, fermé (verrou chromium-lock).
- `studio.config.json` à `bimaccess` puis `neutral`, `npm run check` → code 0 chaque fois (avertissement attendu : theme.json écrit pour « carte », ignoré) ; revenu à `carte`.
- Mise en évidence vérifiée à part (scène de test temporaire, retirée, puis reconstruction) : cercle et rectangle tiretés, sans poignée, tracés à mi-course depuis le haut et depuis le coin haut gauche.

Captures (dossier /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/tmp/shots-signature/) :
- lancement.png (écran Lancer, page entière), s01-coque.png (S01 en lecture, avec barre d'état, sous-titres et contrôles), s03-selection-focus.png (choix sélectionné, VALIDER au focus clavier dans la zone d'action), s03-coque-verrou.png (contrôles, Suivant verrouillé)
- s01-fin.png à s08-fin.png (images finales, scène seule ; s03-fin.png : conséquence sans verdict et CONTINUER), ecran-etroit.png, telephone-horizontal.png

Comparaison au § 6 : fond, feuille, barre d'état (pastille verte, programme, code, titre italique, échelle, position), cartouches à double filet, choix sélectionné à bord plein bleu sans tireté, rétroaction sous filet double sans couleur, sous-titres papier à filets à x 104 et bas à y 1000 : conformes.

### Écarts à la charte (ce que le lecteur fait autrement)

1. Coque à l'échelle : les valeurs du § 6 sont en pixels de composition ; la coque (hors scène) les multiplie par `--u` (un pixel de composition estimé sur la fenêtre, plafonné à 1 px) avec un plancher de lisibilité (texte ≥ 12 px, barre ≥ 28 px, bouton ≥ 34 px). Sur une petite fenêtre, la barre et les boutons sont donc proportionnellement plus grands que dans la charte.
2. Position « 03 / 08 » (zéro de tête) et non « 3 / 8 » : play-check lit ce format.
3. Une croix de carroyage (1642, 920) tombe dans la zone d'action, comme dans cadre-feuille.svg ; elle reste sous les boutons (habillage).
4. `Highlight` ne sait pas quand il s'est allumé : le tracé de 0,25 s demande que la scène passe `at` (l'instant de l'étape de `focusAt`) ; sans `at`, le tireté paraît entier d'un coup.
5. Cercle seulement pour la mise en évidence HTML (`Highlight shape="circle"`) ; `HighlightRect` (dans un SVG, schémas) reste rectangulaire.
6. `Trace` n'a pas de bouts ronds en carte (angles vifs partout) : les routes (bouts ronds) se dessinent dans leurs SVG, ou il faut une prop `cap` (proposition pour l'étape des scènes S04 et S05).
7. Choix sans équivalent dans la charte : puce de `Bullets` = aplat carré d'encre ; libellés de nœud de `Diagram` en « nom de lieu petit » (Barlow 600, 26 px, 0,24 em) ; curseur de narration en petite échelle à bord encre ; voile des écrans Lancer et Fin à 90 % du fond (fonctionnel) ; CONTINUER sans icône ↵.
8. Clés communes sans jeton équivalent : `success`, `goldText`, `gripHot` → encre ; `magenta` → lien ; `accent2`, `red` → ecriture. Une scène carte doit employer les noms de la charte (`THEME.colors.lecture`, `.terme`…), qui n'existent qu'en signature carte.
9. Non adaptés (hors brief) : `Dimension` et `Osnap` (cad.tsx) gardent leur dessin CAD ; `src/i18n.ts` inchangé (en mode verdict, en-têtes « C'est la réponse attendue » / « Ce n'est pas la réponse attendue » ; en mode conséquence, « Ce qui se passe », affiché en en-tête de cartouche).
10. La barre d'état nomme le programme avant le code même quand l'identifiant commence par lui (exemple du § 6) ; bimaccess évite ce doublon.

### Fichiers du template à reporter dans le plugin

Chemins relatifs au projet, à reporter dans le template de `plugins/studio/` du dépôt source, puis à exporter :

- scripts/sync.mjs
- src/engine/signature.ts
- src/engine/index.ts
- src/engine/anim.tsx
- src/engine/components.tsx
- src/engine/carte.tsx (nouveau)
- src/engine/shared.ts (commentaires seulement)
- src/player/App.tsx
- src/player/Controls.tsx
- src/player/player-carte.css (nouveau)
- src/main.tsx
- CLAUDE.md
- docs/player-contract.md
- package.json : dépendances `@fontsource/source-serif-4` et `@fontsource/barlow-condensed` (déjà présentes ici ; à ajouter au package.json du template s'il ne les a pas)

Ne pas reporter (propres à la leçon) : studio.config.json, content/design/theme.json, src/lesson/.

### Décisions à prendre par l'utilisateur

Aucune.

### Signalements pour l'utilisateur ou un autre rôle

- Super Agent / code : le brief demandait de ne coder que S01, mais `npm run check` ne peut pas passer avec une seule scène : le storyboard en a huit et `defineLesson` refuse une scène absente (garde-fou non affaibli). J'ai donc ajouté src/lesson/scenes/attente.tsx : S02 à S08 en scènes d'attente génériques (narrations et exercice de S03 branchés, textes d'écran en titre et liste, aucune composition, aucun instant calé sur la voix). L'étape suivante les remplace une à une.
- Graphiste : content/design/spec.md est encore le gabarit (S01 « titre à x 120, y 120, largeur 1680 ») ; S01 place maintenant son titre à x 104, y 84 (zone de titre de la charte). La spec des huit scènes reste à écrire.
- Graphiste : trancher les choix de l'écart 7 (puce, libellé de nœud, curseur, voile) si la charte doit les fixer.

### Blocage

Aucun.
