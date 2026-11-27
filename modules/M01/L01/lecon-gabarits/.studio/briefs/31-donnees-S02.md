# Brief 31 · code · essai 2, phase B : S02 comme données

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon-gabarits. Toutes les commandes se lancent depuis ce dossier.

## Ta tâche

Refaire S02 comme données seulement, avec le gabarit `Frise` du moteur (écrit en phase A) :

- `content/design/scenes/S02.json` : toute la scène, d'après la section S02 de `content/design/spec.md` (mêmes positions, mêmes illustrations, mêmes locutions, mêmes états, mêmes mises en évidence). Aucun dessin à commander, aucune illustration nouvelle.
- `src/lesson/scenes/s02.tsx` : réduit à l'appel du gabarit, comme le montre `docs/gabarits.md`. Il garde son export (`s02`), déclaré dans `src/lesson/lesson.ts`.

Tu n'écris que ces deux fichiers. Le moteur, les gabarits, les autres scènes (S04 est faite en même temps par un autre agent), `content/` hors `S02.json`, ne se touchent pas. Si le gabarit ne sait pas faire une chose que la spécification demande, fais au plus près avec ce qu'il offre et note le manque dans ton rapport ; ne modifie pas le gabarit.

## À lire, et rien d'autre

- `docs/gabarits.md` (format des données, exemple, erreurs)
- `content/design/spec.md`, l. 1 à 60 (en-tête commun) et section S02 (l. 61 à 194)
- `content/storyboard.md`, scène S02 (pour les indices de `## Écran`) ; `src/generated/narration.ts` après `npm run sync` si une locution échoue
- au besoin, la scène de l'essai 1 `../lecon-essai/src/lesson/scenes/s02.tsx` pour retrouver un instant ou une valeur (lecture seule)

## Contrôles avant de rendre

- `flock /tmp/fme001-sync.lock npm run check` : code 0, « scènes chargées : 7 »
- `flock /tmp/fme001-sync.lock npm run build`, puis `node /home/user/Bimaccess-FME/harnais/skills/planche-par-phrase-studio/planche.mjs --scenes S02 --out .studio/qa/b-s02` ; regarde la planche (outil Read) et compare-la à la spécification : rien sur un trait, aucun chevauchement, rien d'éparpillé à la première image, une seule mise en évidence. Corrige les données, puis recommence. Le build se fait sous le verrou : l'autre agent peut l'avoir lancé en même temps, c'est normal d'attendre.
- si `check` ou `build` échoue sur l'autre scène (que l'autre agent est en train d'écrire), ce n'est pas ton erreur : attends une minute et relance, sans toucher à son fichier
- pas de `test:play` (l'agent principal le lance à la fin)

Aucune opération git, aucun appel payant. Français, sans tiret cadratin.

## Rapport

`.studio/reports/31-donnees-S02.md`, format de la section 3 de /home/user/bimaccess-studio/plugins/studio/skills/produce/references/briefs.md : fichiers, contrôles, écarts à la spécification et leur raison, ce que le gabarit ou sa documentation devrait mieux faire (ce qui t'a coûté du temps).
