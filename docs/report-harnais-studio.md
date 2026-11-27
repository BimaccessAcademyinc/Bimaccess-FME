# Report des acquis du pilote dans le harnais Studio du cours

Demandé par Ilyas le 2026-11-27 : mettre les modifications du pilote dans le harnais Studio du dépôt du cours, pour les futures leçons. Bilan de ce qui a fait ses preuves : `bimaccess-studio/docs/pilote-fme/bilan.md` (lire d'abord).

## Cadre commun aux deux agents

- **Cible** : dépôt du cours `/home/user/BIMaccess-Learning-Platform`, branche `production`, déjà extraite. Le plugin est `plugins/studio/` (marketplace `bimaccess`, activé pour tout le monde). Lire son `CLAUDE.md` racine (section Git et conventions) et `plugins/README.md`.
- **Aucune opération git qui écrit** (pas de commit, checkout, switch, stash, reset, pull, rebase) : l'agent principal relit, fait le commit et pousse. Un autre agent travaille en même temps sur d'autres fichiers : ne touche à rien hors de ton périmètre.
- **Sources, en lecture seule** : dépôt du pilote `/home/user/Bimaccess-FME`.
  - `modules/M01/L01/lecon-gabarits/` : projet Studio le plus récent de la méthode approuvée (lecteur, scripts, moteur, gabarits).
  - `modules/M01/L01/lecon-essai/` : outils Remotion (`src/engine/outils.ts`, dépendances 4.0.533).
  - `modules/M01/L01/lecon/` : voix à la recette V4 (`content/voice/`).
  - `harnais/skills/*`, `.claude/agents/*`, `harnais/mesures/tokens.py`, `CLAUDE.md` (règles du pilote), `docs/essais-qualite.md` (essais et décisions).
  - Les projets du pilote sont nés de `plugins/studio/template/` tel qu'il est sur `production` (il n'a pas changé depuis) : `diff -r` entre le gabarit et `lecon-gabarits` montre exactement ce que le pilote a modifié.
- **Ce qui ne se reporte pas** : la composition sur le canevas de design (essai 3 : `harnais/skills/scenes-gabarits/canevas/`, `planche_canevas.mjs`, `planche_vers_donnees.mjs`), non retenue par Ilyas (2026-11-27) : le remplissage se garantit par le skill et par les contrôles bloquants du gabarit ; l'assemblage automatique des planches (`planche_image.py tout`, `scenes`), refusé ; le contenu propre à FME001 (scènes, storyboard, charte, logos, `src/lesson/`) ; le banc des modèles.
- **Conventions** : français, sans tiret cadratin ; aucun libellé de statut ; aucun nom de modèle de langage dans les fichiers, sauf les champs `model:` des définitions d'agents ; un texte écrit par Ilyas ne change pas en silence ; ne jamais mettre `acknowledgeRemotionLicense` à vrai ; aucun rendu vidéo ; aucun appel payant (ElevenLabs, images) : le faux serveur ElevenLabs du gabarit suffit aux tests.
- **Rendre** : la liste des fichiers modifiés ou créés, avec une ligne par changement ; les commandes de vérification lancées et leur sortie ; ce qui a été laissé de côté et pourquoi.

## Agent A · le gabarit de projet

Périmètre : `plugins/studio/template/**`, `plugins/studio/scripts/new-project.mjs`, `plugins/studio/scripts/check-load.mjs`.

1. **Lecteur** : bouton pour revoir (`narration-replay`) et vitesse de 0,5 à 2 (`narration-rate`, gardée par leçon dans le stockage local), libellés dans `src/i18n.ts`, mise en page étroite (`Controls.tsx`, `App.tsx`, `Stage.tsx`, `player.css`).
2. **`scripts/sync.mjs`** : `toWritten`, sous-titres et locutions au texte du storyboard aligné sur les mots dits ; reprendre aussi les autres corrections génériques du diff, chacune nommée dans le rapport.
3. **`scripts/voice.mjs`** : `generate` refuse sans `--approuve <caractères>` et annonce le coût en caractères ; garder l'autotest (`voice-selftest`, faux serveur) vert ; `docs/voice.md` à jour.
4. **Voix française à la recette V4** : la référence est le rôle Voix du cours (`agents/voix/CONTEXT.md`, `agents/voix/skills/voice-production/`, sur `production`), appliquée dans `lecon/content/voice/` du pilote ; `content/voice/voice.config.yaml` et `pronunciations.yaml` du gabarit.
5. **Outils Remotion** : `src/engine/outils.ts` et les dépendances `@remotion/paths`, `@remotion/shapes`, `@remotion/layout-utils`, `@remotion/animation-utils` à la même version exacte que `remotion` (4.0.533) ; `package-lock.json` régénéré.
6. **Gabarits d'animation** : `src/engine/gabarits/` (`Frise`, `FicheRubriques`, données, contrôle au chargement) et `docs/gabarits.md`. Les rendre génériques : la face utile, les marges et les jetons viennent de la signature active, pas de valeurs de FME001 écrites en dur. Prouver qu'ils marchent dans le gabarit (par exemple une scène d'exemple pilotée par un fichier `content/design/scenes/Sxx.json`, ou un contrôle dans `npm run check`).
7. **Signature « carte »** : troisième signature du lecteur (`src/engine/carte.tsx`, `src/player/player-carte.css`, `signature.ts`, polices embarquées hors ligne), choisie par `new-project.mjs --signature carte`. Les autres changements du moteur (`anim.tsx`, `components.tsx`, `shared.ts`, `index.ts`, `main.tsx`) se reportent s'ils sont génériques.
8. `template/CLAUDE.md` et `template/docs/player-contract.md` à jour.
9. **Vérifier** pour chaque signature (`bimaccess`, `neutral`, `carte`) : nouveau projet par `new-project.mjs` dans un dossier temporaire, `npm ci`, `npm run check`, `npm run build`, `npm run test:play` (Chromium déjà installé : `/opt/pw-browsers/chromium` si besoin), autotest de la voix.

## Agent B · skills, agents et documentation

Périmètre : `plugins/studio/skills/**`, `plugins/studio/agents/**`, `plugins/studio/README.md`, `plugins/README.md`, `plugins/studio/.claude-plugin/plugin.json`, et des fichiers nouveaux sous `plugins/studio/scripts/` (pas `new-project.mjs` ni `check-load.mjs`). Les chemins du gabarit écrits par l'agent A : `src/engine/gabarits/`, `docs/gabarits.md`, `src/engine/outils.ts`, `content/design/scenes/Sxx.json`, `--signature carte`, `npm run voice -- generate --approuve <caractères>`.

1. **Super Agent** (`skills/produce/SKILL.md` et ses références) : la chaîne et ses règles.
   - La chaîne d'abord : l'agent principal orchestre et délègue ; un nouvel outil entre comme outil d'un rôle, jamais à sa place ; chaque rôle lit ses skills avant d'agir.
   - Leçon sans source pack : pack de recherche d'abord, porte de l'expert.
   - Storyboard : banc de candidats et relecteurs en aveugle, porte du ton.
   - Thème : étape `themes-planches` seulement quand le programme n'a pas de thème.
   - Voix : voix provisoire muette (minutage estimé, sous-titres) pour toute la revue ; voix payée seulement après la porte du sens, sur devis ; puis recalage sur la vraie voix.
   - Dépenses : aucun appel payant sans l'accord d'Ilyas ; devis annoncé (nombre d'appels, modèle, prix unitaire, total), montant approuvé, puis `--approuve` ; un agent délégué ne dépense rien.
   - Portes d'Ilyas : expert, ton, sens, écoute ; aucune autre, en particulier aucune porte sur la composition (le graphiste en a la charge) ; la chaîne ne s'arrête pas pour attendre une validation.
   - Scènes : formes connues par gabarits et données, une scène par agent en parallèle, modèle intermédiaire pour les données, meilleur modèle pour écrire un gabarit et pour la composition.
   - Mesures à chaque étape (`tokens.py`) ; un travail long se délègue à des agents qui relisent les fichiers plutôt qu'à une longue conversation.
2. **Skills nouveaux** (chemins adaptés au plugin, `${CLAUDE_PLUGIN_ROOT}`) : `pack-recherche` (scripts, modèles) ; `porte-du-ton` ; `themes-planches` ; `scenes-gabarits` (les cinq règles, sans les parties canevas) ; `illustrations`, tiré de `planche-image` : seulement l'outil d'éléments (`illustrations.py` et ce qu'il emprunte à `planche_image.py` : dessin, cache, vectorisation, `garde_depense`, prix, Flash 3.1 par défaut, Pro sur accord), la signature d'image d'un programme, la bibliothèque d'éléments, les gabarits de composition, la relecture des symboles ; `planche-par-phrase` rangé avec le skill `qa`.
3. **Skills existants** : `graphisme` (la composition est à lui, feuille remplie, illustrations par l'outil sur devis, règle des réserves, symboles), `scenes` (formes connues renvoyées à `scenes-gabarits`, outils Remotion), `voix` (recette V4, voix muette d'abord, devis), `qa` (planche par phrase, ordre de contrôle de `essais-qualite.md`), `scenario` (grille de la porte du ton).
4. **Agents** : `graphiste`, `code`, `voix`, `qa`, `scenariste` mis à jour (skills, règle des dépenses) ; nouveaux `chercheur`, `consolidateur`, `verificateur` (repris de `.claude/agents/` du pilote) et `donnees-scene` (fichier de données d'une scène par gabarit ; modèle intermédiaire, effort moyen).
5. **Mesures** : `tokens.py` sous `plugins/studio/scripts/mesures/`, avec son mode d'emploi dans le Super Agent.
6. **Documentation** : `plugins/studio/README.md` et `plugins/README.md` (chaîne, portes, dépenses, voix V4 à l'image du rôle Voix du cours, nouveaux skills et agents, signature `carte`).
7. **Vérifier** : chaque skill et agent cité existe et son en-tête est valide ; chaque chemin cité existe (en comptant ceux de l'agent A) ; `python3 -m py_compile` sur les scripts Python, `--help` sur les scripts ; recherche de tiret cadratin, de libellés de statut et de noms de modèles hors champs `model:`.
