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

## Remotion : les skills et les outils

L'animation passe par Remotion et ses skills officiels (décision d'Ilyas) : skills installés dans le dépôt à la version exacte du Remotion des leçons (4.0.533), `/home/user/Bimaccess-FME/.claude/skills/`. Lis `remotion-markup/SKILL.md` (règles de contenu et d'animation), puis seulement ses références utiles à tes deux scènes : `timing.md`, `sequencing.md`, `measuring-text.md`, `text-highlights.md`, `measuring-dom-nodes.md`, `images.md`. Lis aussi les règles d'emploi de la chaîne : `/home/user/bimaccess-studio/chaine/agents/code/skills/narrated-lesson-build/references/remotion-outils.md`.

Les outils de dessin de Remotion sont dans le moteur de cette leçon (`src/engine/outils.ts`, importés par `../../engine`, jamais par le nom du paquet) : `evolvePath`, `getLength` (tracé à vitesse constante, durée proportionnelle à la longueur), `getPointAtLength`, `getTangentAtLength` (objet qui voyage sur un chemin), `interpolatePath`, `makeArrow` et les autres formes exactes, `measureText`, `fitText` (mesurer un texte avant de le placer, pour qu'il ne tombe jamais sur un trait), `makeTransform`. Emploie-les là où ils rendent le geste exact : les routes et leur pointe, la frise, le contour de S04 qui voyage de la carte à la rubrique, la taille des textes dans leur place.

Priorité : la grammaire du projet et la spécification passent avant les exemples de Remotion (jamais de fondu d'opacité, de ressort ni de rebond ; avancement linéaire ; une seule mise en évidence). Aucun rendu vidéo, aucun Remotion Studio, aucun appel payant (aucune illustration à commander : celles du graphiste suffisent).

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
