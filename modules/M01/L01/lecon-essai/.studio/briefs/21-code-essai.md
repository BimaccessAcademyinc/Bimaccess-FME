# Brief 21 · code · essai : S02 et S04 construites selon la spécification du graphiste

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon-essai. Toutes les commandes se lancent depuis ce dossier.

## Ta tâche

Réécrire `src/lesson/scenes/s02.tsx` et `src/lesson/scenes/s04.tsx` à partir du storyboard et des sections `## S02` et `## S04` de `content/design/spec.md`, que le graphiste vient de refaire avec des illustrations commandées au modèle d'image (`content/design/assets/s02-ill-*.svg`, `s04-ill-*.svg`, un groupe `<g id="dessin">` chacune). Ta méthode est le skill scènes du plugin. La voix est générée (recette V4) : chaque instant vient d'une locution dite mot pour mot.

Ce qu'Ilyas a refusé dans la variante précédente, et qui ne doit pas revenir : textes posés sur les traits d'un dessin, formes éparpillées à la première image, trous dans un trait déjà dessiné, textes qui se chevauchent, assemblage « au hasard ». La spécification fait foi pour chaque position : applique-la au pixel, et ce qu'elle ne dit pas, demande-le dans ton rapport plutôt que de l'inventer.

Règles :

- Aucun texte littéral : `sceneTexts`, `illustration` ; aucun instant écrit à la main : `V.said("…")` sur la narration réellement dite (`src/generated/narration.ts`), `ordered` pour l'ordre.
- Une illustration par `Svg` (balayage dans le sens que dit la spécification, `at` sur sa locution, `dur={0}` pour le décor de l'image 0) ; tracés des routes et liaisons par `Trace` ; une seule mise en évidence à la fois (`focusAt` + `Highlight`) ; `data-board` selon les états de la spécification, dernier état `Sxx-FIN`.
- N'écris que `s02.tsx`, `s04.tsx` (et, si besoin, `src/lesson/components/s02-*.tsx`, `s04-*.tsx`). Les composants communs existants (`src/lesson/components/s01-commun.tsx` : `Source`, `RESERVE`, `RoleName`…) se réutilisent tels quels.
- Moteur, lecteur et scripts : ne les modifie pas ; un manque se note dans le rapport, avec ce que tu as fait à la place.

## À lire, et rien d'autre

- /home/user/bimaccess-studio/plugins/studio/skills/scenes/SKILL.md et ses références `animation-grammar.md`, `engine-api.md` (`${CLAUDE_SKILL_DIR}` = /home/user/bimaccess-studio/plugins/studio/skills/scenes)
- CLAUDE.md du projet (§ 4 à 8), docs/player-contract.md
- content/storyboard.md (S02, S04), content/design/spec.md (S02, S04 et l'en-tête commun), content/design/assets/s02-ill-*.svg, s04-ill-*.svg, `.studio/reports/20-graphiste-essai.md`
- les scènes actuelles s02.tsx et s04.tsx (ce qu'elles font déjà de juste), src/lesson/components/s01-commun.tsx, l'API du moteur en lecture (src/engine/)

## Contrôles avant de rendre

- `node /home/user/bimaccess-studio/plugins/studio/skills/scenes/scripts/check-literals.mjs src/lesson` : 0 texte en dur
- `flock /tmp/fme001-sync.lock npm run check` : code 0, « scènes chargées : 7 »
- `flock /tmp/fme001-sync.lock npm run build`, puis la planche par phrase : `node /home/user/Bimaccess-FME/harnais/skills/planche-par-phrase-studio/planche.mjs --scenes S02,S04 --out .studio/qa/sens` ; regarde chaque capture (outil Read) et compare-la à la spécification : rien sur un trait, aucun chevauchement, rien d'éparpillé, rien sous les sous-titres ni dans la zone d'action. Corrige ce qui ne va pas, puis recommence.
- `timeout 500 npm run test:play` : « tout est conforme »

Aucune opération git ; un seul navigateur à la fois (les scripts prennent le verrou).

## Rapport

`.studio/reports/21-code-essai.md`, au format de la section 3 de /home/user/bimaccess-studio/plugins/studio/skills/produce/references/briefs.md : fichiers, contrôles (codes, extraits), pour chaque scène ses états et les locutions qui les déclenchent, les écarts à la spécification et leur raison, ce que tu as corrigé après la planche par phrase, ce que le moteur devrait savoir faire.
