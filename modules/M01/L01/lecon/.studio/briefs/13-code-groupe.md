# Brief 13 · code · scènes d'un groupe, sur voix provisoire muette

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon. Toutes les commandes se lancent depuis ce dossier.

Trois codeurs travaillent en même temps, chacun sur un groupe de scènes. Ton groupe t'est donné dans l'invite.

## Ta tâche

Écrire les scènes de ton groupe (`src/lesson/scenes/sNN.tsx`), à partir du storyboard et de la spécification visuelle, dans la signature `carte` (déjà en place dans le moteur). Ta méthode est le skill scènes du plugin. Il n'y a pas encore de voix : le minutage est estimé sur le texte et les sous-titres s'affichent ; tout instant vient d'une locution, il se recalera tout seul quand la voix arrivera.

Règles propres à ce travail à trois :

- **Aucune écriture dans `content/beats.json`** (trois codeurs l'écriraient en même temps) : chaque instant vient d'une locution dite mot pour mot, `V.said("…")` ou `E.said("…")`, assez longue pour être unique dans son clip.
- N'écris que tes fichiers `src/lesson/scenes/sNN.tsx` (et, si ta scène en a besoin, un composant propre à elle dans `src/lesson/components/sNN-*.tsx`). `src/lesson/lesson.ts` et `scenes/attente.tsx` ne changent pas : chaque scène y est déjà déclarée ; tu remplaces seulement le contenu de tes fichiers.
- Les contrôles régénèrent des fichiers communs : lance-les **sous verrou**, toujours ainsi : `flock /tmp/fme001-sync.lock npm run check:scenes` (et de même pour `npm run check`). Pas de `npm run build` ni de `test:play` (l'orchestrateur les lance une fois les trois groupes rendus) ; aucun serveur, aucun navigateur.
- Si le moteur ne sait pas faire ce que la spécification demande (écarts de la coque, `.studio/reports/06-code.md`), ne le modifie pas : fais au plus proche dans ta scène, et écris l'écart dans ton rapport.

Ce qui fait foi :

- le storyboard pour les textes (aucun texte littéral dans une scène : tout passe par `sceneTexts`, `exerciseOf`, `illustration`), et la narration pour les locutions ;
- la spécification (`content/design/spec.md`, section de chaque scène) pour la composition, les états `data-board`, les instants et la mise en évidence ;
- les illustrations de `content/design/assets/` (groupes nommés révélés chacun sur ses mots avec `Svg` et `parts`).

## À lire, et rien d'autre

- /home/user/bimaccess-studio/plugins/studio/skills/scenes/SKILL.md et ses références `animation-grammar.md`, `engine-api.md` (où `${CLAUDE_SKILL_DIR}` vaut /home/user/bimaccess-studio/plugins/studio/skills/scenes)
- CLAUDE.md du projet (§ 4 à 8) et docs/player-contract.md
- content/storyboard.md (tes scènes), content/design/spec.md (tes sections), content/design/assets/ (tes illustrations), src/generated/*.ts après `check:scenes`
- .studio/reports/06-code.md (écarts de la coque)
- l'API du moteur, en lecture : src/engine/

## À écrire, seulement

- src/lesson/scenes/sNN.tsx de ton groupe (et src/lesson/components/sNN-*.tsx si besoin)
- .studio/reports/13-code-<ton groupe>.md : ton rapport

Aucune opération git.

## Contrôles avant de rendre

- `node /home/user/bimaccess-studio/plugins/studio/skills/scenes/scripts/check-literals.mjs src/lesson` : aucun texte littéral dans tes fichiers
- `flock /tmp/fme001-sync.lock npm run check` : code 0, avec « scènes chargées : 7 » (si un autre groupe casse le chargement, cite l'erreur et rends quand même : l'orchestrateur tranche)

## Rapport

Au format de la section 3 de /home/user/bimaccess-studio/plugins/studio/skills/produce/references/briefs.md : fichiers, contrôles (code de sortie, extrait), pour chaque scène ses états et les locutions qui les déclenchent, les écarts à la spécification et leur raison, ce que le moteur devrait savoir faire.
