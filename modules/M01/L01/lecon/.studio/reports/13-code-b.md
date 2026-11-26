## Rapport · code · brief 13 · groupe b (S03, S04)

Spécification suivie : `.studio/spec/spec-b.md` (sections S03 et S04), qui fait foi tant que `content/design/spec.md` ne la réunit pas ; rapport du graphiste `.studio/reports/12-graphiste-b.md`. Aucune écriture dans `content/beats.json` : chaque instant vient d'une locution dite mot pour mot.

### Fichiers écrits

- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/lesson/scenes/s03.tsx : scène narrée S03 (clip S03-01), qui remplace l'attente.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/lesson/scenes/s04.tsx : exercice S04 (clips S04-01 et S04-02 déclenché), qui remplace l'attente ; la ligne de repère est composée dans le fichier (`Repere`), sans composant à part.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/reports/13-code-b.md : ce rapport.

Je n'ai touché ni à `lesson.ts`, ni à `attente.tsx`, ni aux illustrations, ni aux scènes des autres groupes.

### Contrôles

- `node /home/user/bimaccess-studio/plugins/studio/skills/scenes/scripts/check-literals.mjs src/lesson` → code 0 ; extrait : « [literals] 9 fichier(s) lu(s), 0 texte(s) en dur ».
- `flock /tmp/fme001-sync.lock npm run check:scenes` → code 0.
- `flock /tmp/fme001-sync.lock npm run check` → code 0 ; extrait : « [sync] 7 scène(s), 8 clip(s) dont 0 avec voix, 1 exercice(s), 15 illustration(s), signature carte, programme FME001 (#00A64F) » ; « [sync] scènes chargées : 7, locutions, ordre, textes et illustrations nommées vérifiés » ; `tsc --noEmit` sans erreur.
- Recherche dans s03.tsx et s04.tsx de `opacity`, `setTimeout`, `setInterval`, `useState`, `console.`, paramètres de test et tiret cadratin → aucune occurrence.
- `npm run build` et `test:play` non lancés (consigne du brief : c'est l'orchestrateur qui les lance). Aucun rendu n'a donc été regardé.

### S03 · états et locutions (clip S03-01, minutage estimé)

| État `data-board` | Locution qui le déclenche | Instant estimé |
|---|---|---|
| S03-1 | image 0 : échelle, rose, fond de carte, contour, mention de source ; titre tapé sur « Traduire une donnée » | 0 ; 0,40 s |
| S03-2 | « La donnée, elle » (feuille, balayage vers le bas, 0,4 s) ; « représente le bâtiment réel » (bâtiment balayé du sol au toit, 0,5 s, et `Trace` de (526, 720) à (796, 720), 0,5 s) | 12,20 s ; 13,84 s |
| S03-3 | « on l'appelle une entité géographique » : bandeau tapé en `terme`, mise en évidence du bandeau | 16,17 s |
| S03-4 | « Sa géométrie porte » : titre et filet de la rubrique, `Move` du contour (0,3 s, ease de sortie cubique, même échelle), mise en évidence Géométrie ; « en points, lignes ou surfaces » : signes ; « Ici, le contour forme une surface » : hachure | 23,53 s ; 26,90 s ; 29,69 s |
| S03-5 | « Ses attributs la décrivent » : rubrique Attributs, mise en évidence ; « l'usage, des bureaux » : ligne d'attribut et filet | 33,55 s ; 36,40 s |
| S03-FIN | « Son système de coordonnées » : rubrique et globe, mise en évidence jusqu'à la fin ; « lui donne sa position » : le contour se pose sur le globe | 38,59 s ; 40,41 s |

Une seule mise en évidence à la fois (`focusAt`) : bandeau (pad 10 autour du texte), puis les trois rubriques, rectangles en retrait de 10 px (810, 266, 600 × 214 ; 810, 500, 600 × 110 ; 810, 630, 600 × 206). Chaque `Highlight` reçoit l'instant `at` de son étape, pour le tracé de 0,25 s (écart 4 du rapport 06).

### S04 · états et locutions (clips S04-01 et S04-02)

Verdict : `verdict={false}` (pas de ligne « Attendu » ; le storyboard dit « Mode conséquence, sans verdict »).

| État `data-board` | Locution ou geste | Instant estimé |
|---|---|---|
| S04-1 | image 0 : échelle, rose ; « Sur un projet » : feuille (balayage vers le bas, 0,4 s), puis bandeau `Conduite d'eau` tapé à la fin du déroulé ; « une conduite d'eau » : cadre et tracé ; « sous forme » : tableau et ses deux lignes ; « d'entité géographique » : cartouche et `Repère` ; « Choisissez, sur la donnée reçue » : panneau (x 884, y 140, largeur 540), question, puis choix et VALIDER. Tenu jusqu'à la validation | 0,40 ; 2,87 ; 4,16 ; 4,90 ; 11,80 s (S04-01) |
| S04-2 | validation (`actedAt`) : conséquence du choix fait | geste |
| S04-3 | « Sur cette donnée, le tracé est la géométrie » : `Géométrie` sur sa ligne de repère, mise en évidence du cadre | début du clip S04-02 |
| S04-4 | « L'usage et le matériau sont ses attributs » : `Attributs`, mise en évidence du tableau | + 4,74 s |
| S04-5 | « le repère du cartouche son système » : `Système de coordonnées`, mise en évidence du cartouche | + 7,89 s |
| S04-FIN | « La position de la conduite se lit donc dans deux parties » : accolade (balayage vers le bas), plus de mise en évidence ; CONTINUER à la fin du clip S04-02 | + 12,59 s ; fin + 22,61 s |

Aucune mise en évidence avant la validation. Les instants du clip déclenché sont placés par `eventStart` ; les états suivants ne passent jamais avant `actedAt` (garde `Math.max` contre une progression relue incohérente, pour que `focusAt` ne lève pas d'`OrderError` en cours de lecture).

### Écarts à la spécification, et leur raison

1. S04, lignes de repère : `Callout` du moteur (carte) pose le mot en serif 30 px à droite d'un palier court de 30 px (coude 40 px avant le mot) ; la spécification veut un palier de longueur donnée (K → E) et le mot au-dessus, en titre de rubrique (Barlow 600, 24 px, capitales, 0,16 em). Composée dans la scène avec les primitives du moteur (point posé à `at`, `Trace` P → K → E en 0,5 s, `TypeText` du mot à la fin du tracé), aux coordonnées de la spécification. Point de rayon 4 px, comme `Callout` et `ligne-repere.svg` (la charte dit « point 4 px »).
2. S03, mention de source : la spécification la veut cliquable, mais aucune référence n'est donnée (point ouvert 1 du graphiste). Posée en texte simple (italique, `lien`), sans lien : un lien sans adresse ne s'invente pas.
3. S04, bandeau `Conduite d'eau` : tapé à la fin du déroulé de la feuille (`T.projet` + 0,4 s, durée du balayage, comme `Callout` le fait pour son mot) ; la spécification dit « balayage … puis frappe du bandeau », sans locution à part.
4. Durées des balayages sans valeur dans la spécification (rubriques, signes, hachure, zones de S04, accolade) : 0,5 s (0,4 s pour le petit contour du globe), défaut du moteur.

### Ce que le moteur devrait savoir faire

- `Callout` (carte) : un palier de longueur donnée (`end`) et le mot posé au-dessus du palier, avec un style de mot au choix (titre de rubrique en capitales) ; sans cela chaque scène refait la ligne de repère à la main (S04 ici, et S01 et S06 d'après la charte).
- Un petit composant « mention de source » (filet de 220 px, texte en italique `lien`, lien vers une référence, réserve de fond), demandé aussi par le graphiste b pour S01, S02, S03, S05, S06.
- `Highlight` qui connaîtrait lui-même l'instant où il s'allume (écart 4 du rapport 06) : la scène doit aujourd'hui recopier l'instant de chaque étape de `FOCUS`.

### Décisions à prendre par l'utilisateur

Aucune.

### Signalements pour l'utilisateur ou un autre rôle

- Scénariste : S03, la référence qu'ouvre la mention « D'après Safe Software et l'OGC » manque au storyboard (REGLES 4.6) ; la mention reste non cliquable jusque-là (même point que le graphiste b).
- Orchestrateur : `npm run build` et `test:play` restent à lancer ; à regarder en particulier sur les captures : le `Move` du contour au-dessus de la feuille (S03), la hauteur du panneau après validation par rapport aux mots des lignes de repère à y 776 (S04, estimée par le graphiste à y 700 à 730), et le centrage de `Repère` dans le cartouche.
- Graphiste / Ilyas : écarts de calage déjà signalés par le graphiste b (feuille de S03 sur « La donnée, elle », feuille de S04 sur « Sur un projet ») appliqués tels quels.

### Blocage

Aucun.
