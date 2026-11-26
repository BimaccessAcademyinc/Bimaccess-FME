## Rapport · code · brief 13 · groupe a (S01, S02)

Écart au brief appliqué : la spécification suivie est `.studio/spec/spec-a.md` (pas encore réunie dans `content/design/spec.md`), avec le rapport `.studio/reports/12-graphiste-a.md`.

### Fichiers écrits

- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/lesson/scenes/s01.tsx : scène narrée S01 (remplace l'attente).
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/lesson/scenes/s02.tsx : scène narrée S02 (remplace l'attente).
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/lesson/components/s01-commun.tsx (nouveau) : pièces communes à S01 et S02, d'après les « composants récurrents du groupe » de la spec : `partBox` (boîte de balayage d'un groupe de SVG, pour qu'un nom posé dans une carte se découvre avec le même bord que sa carte), `RoleName` (en-tête de cartouche), `Source` (mention de source en marge, bas à y 820, filet de 220 px), `RESERVE` (réserve `fond` de 2 px).
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/lesson/components/s02-route.tsx (nouveau) : route d'écriture à bouts ronds (voir les écarts).

Rien d'autre : ni `content/beats.json`, ni `lesson.ts`, ni `attente.tsx`, ni le moteur.

### Contrôles

- `node /home/user/bimaccess-studio/plugins/studio/skills/scenes/scripts/check-literals.mjs src/lesson` → code 0 ; extrait : « [literals] 11 fichier(s) lu(s), 0 texte(s) en dur ».
- `flock /tmp/fme001-sync.lock npm run check:scenes` → code 0 ; extrait : « [sync] scènes chargées : 7, locutions, ordre, textes et illustrations nommées vérifiés ».
- `flock /tmp/fme001-sync.lock npm run check` → code 0 ; extrait : « [sync] 7 scène(s), 8 clip(s) dont 0 avec voix, 1 exercice(s), 15 illustration(s), signature carte, programme FME001 (#00A64F) » ; « [sync] scènes chargées : 7, … vérifiés » ; tsc sans erreur.
- Relecture à la grammaire d'animation : aucune opacité, aucun minuteur ni `useState`, aucun journal (grep vide) ; une seule mise en évidence à la fois (`focusAt`) ; décor `at={0} dur={0}` ; aucun tiret cadratin.
- Pas de `npm run build` ni de `test:play` (brief : l'orchestrateur les lance) : les scènes n'ont pas été vues dans un navigateur.

### S01 · états et locutions (clip S01-01, instants estimés sans voix)

| État `data-board` | Locution | Instant estimé | Ce qui arrive |
|---|---|---|---|
| S01-1 | (image 0) | 0 | territoire, `Colombie-Britannique`, carte des fondateurs et `Don Murray · Dale Lutz`, mention de source, échelle, rose |
| S01-2 | « Les entreprises forestières doivent » | 9,40 s | groupes entreprises et gouvernement balayés à droite (0,3 s) avec leurs noms dans le même balayage |
| S01-3 | « partager leurs données géographiques » | 12,03 s | liaison `[[546, 550], [730, 550]]` tracée (0,4 s, encre 2,5, bouts nets), puis groupe du manque balayé (0,25 s) à la fin du tracé |
| S01-4 | « utilisent des logiciels différents » | 20,40 s | groupe des fenêtres balayé à droite (0,4 s) |
| S01-5 | « garde donc son logiciel » | 29,68 s | titre tapé ; mise en évidence A (fenêtres, contour x 160, y 664, 390 × 98), tracée en 0,25 s |
| S01-FIN | « voient de près ce problème » | 36,38 s | mise en évidence B (fondateurs, contour x 530, y 216, 460 × 210), tenue jusqu'à la fin |

### S02 · états et locutions (clip S02-01, instants estimés sans voix)

| État `data-board` | Locution | Instant estimé | Ce qui arrive |
|---|---|---|---|
| S02-1 | (image 0) | 0 | fondateurs, contrat titré, frise à bout ouvert, mention de source, échelle, rose |
| S02-2 | « remportent le contrat » | 4,63 s | filet de rubrique balayé vers le bas (0,25 s), puis `Appel d'offres remporté` tapé |
| S02-3 | « fondée en 1993 » | 11,38 s | jalon 1993 tracé de haut en bas (0,25 s), puis libellé tapé |
| S02-4 | « Le gouvernement a son format » | 13,71 s | feuille SAIF et `SAIF` (couleur `terme`) balayés ensemble (0,3 s) |
| S02-5 | « les données de chaque logiciel » | 23,68 s | fenêtres balayées vers le bas (0,3 s) |
| S02-6 | « doivent être traduites » | 25,77 s | trois routes tracées ensemble (0,4 s), pointes balayées à l'arrivée (0,15 s), puis `Traduction` tapé |
| S02-7 | « Murray et Lutz commencent par ce travail » | 29,66 s | titre tapé |
| S02-8 | « une technologie de traduction pour SAIF » | 34,62 s | mise en évidence A (routes et étiquette, contour x 744, y 184, 312 × 272) |
| S02-9 | « en 1996 » | 44,97 s | jalon 1996 tracé (0,25 s), cases des années balayées de 1993 vers 1996 (0,3 s), puis libellé tapé |
| S02-10 | « à l'origine Feature Manipulation Engine » | 49,38 s | nom d'origine tapé, en italique (`lang="en"`) |
| S02-11 | « fait passer les données géographiques » | 53,73 s | mise en évidence B (1996 et nom d'origine, contour x 973, y 566, 387 × 125) |
| S02-FIN | « Son siège est à Surrey » | 62,91 s | mise en évidence éteinte ; carte de lieu et `Siège : Surrey` balayées ensemble (0,3 s) |

Toutes les locutions sont uniques dans leur clip (vérifié par `check:scenes` et par un comptage sur les mots générés). Les gestes qui suivent un autre sur la même locution partent à la fin du précédent : l'instant de la locution plus une durée de la spec, jamais un instant écrit.

### Écarts à la spécification et leur raison

1. Routes de S02 à bouts ronds : `Trace` n'a pas de prop de bout (bouts nets en carte) et le moteur ne se modifie pas. `src/lesson/components/s02-route.tsx` reprend le procédé de `Trace` (pathLength 1, stroke-dashoffset, avancement linéaire `prog`) avec `stroke-linecap: round` et angles vifs ; chaque route est faite de trois traits (bord `encre` 11, chaussée `chaussee` 8, axe `ecriture` 4), même chemin, même instant, même durée. Ce n'est donc pas `Trace` mais un tracé à vitesse constante de même mécanique, propre à la scène. Les routes sont posées sous l'illustration, pour que les pointes de sens couvrent leur bout rond (qui dépasserait sinon de 3,5 px sur le bord gauche des pointes) ; les jalons, eux, sont au-dessus (sur la frise et les cases).
2. Mention de source non cliquable : la cible du lien n'est pas fournie (point ouvert 1 de la spec) ; le texte est posé sans lien plutôt qu'avec une adresse inventée.
3. Durée du balayage des pointes de sens : la spec dit « à l'arrivée » sans durée ; 0,15 s, la durée de la pointe de `Trace`.
4. Noms posés dans une carte (`Entreprises forestières`, `Gouvernement de la Colombie-Britannique`, `SAIF`, `Siège : Surrey`) : balayés dans un `Wipe` de la même boîte que le groupe de leur carte (boîte du groupe et marge de `Svg`, recopiée dans `partBox`), pour un même bord, un même instant, un même sens. Si le moteur change la marge de `Svg`, `partBox` est à mettre à jour.
5. Interlettrage des capitales (0,32 em, 0,3 em) compensé à gauche (`paddingLeft` de la même valeur) pour que le texte reste centré dans son bandeau malgré l'espace laissé après la dernière lettre.
6. Locutions prises en milieu de phrase (« garde donc son logiciel », « partager leurs données géographiques », « en 1996 »…) : la spec les donne ainsi et fait foi ; la règle A2 demande le début de la phrase. Écart de un à quelques mots, signalé à la QA.

### Ce que le moteur devrait savoir faire

- `Trace` : une prop `cap` (`"butt"` par défaut, `"round"`) appliquée à `stroke-linecap`, pour remplacer `s02-route.tsx` par trois `Trace cap="round"` (et servir aux routes de S04 et S05).
- Une mention de source commune (composant ou classe de `carte.tsx`), calée par le bas à y 820 avec son filet et un lien facultatif, pour qu'elle reste à la même place dans les sept scènes.
- Une réserve de texte sur la face (classe `carte-reserve` par exemple).
- `Svg` : exposer la boîte de balayage d'un groupe (ou accepter des enfants HTML par groupe), pour qu'un texte posé dans une carte se découvre dans le même balayage sans recopier la règle de marge.

### Décisions à prendre par l'utilisateur

- Routes de traduction de S02 en route d'écriture rouge (`ecriture`) : décision appliquée par l'orchestrateur, révisable ; point ouvert 2 de la spec, à confirmer par Ilyas. Changer de forme ne touche que `s02-route.tsx` (couleurs des trois couches) et le groupe des pointes du SVG.

### Signalements pour l'utilisateur ou un autre rôle

- Scénariste : adresse des liens des deux mentions de source (S01, S02) à donner (référence du pack) ; en attendant, elles ne sont pas cliquables.
- QA : vérifier sur la page construite le recouvrement des bouts ronds par les pointes, le centrage des noms de rôle, et les deux lignes des libellés de jalon (largeur 230 et 320 px).
- Orchestrateur : `npm run build` et `test:play` non lancés (brief).

### Blocage

Aucun.
