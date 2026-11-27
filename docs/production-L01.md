# Production de FME001-M01-L01 par la méthode retenue

Demandé par Ilyas le 2026-11-27 : passer au contenu et finir la leçon M01-L01. Cette session part des fichiers, pas d'une conversation. Ce n'est plus un essai : c'est la production de la leçon, avec la méthode que les essais 1 et 2 ont fait retenir.

## Lire d'abord, et rien de plus

1. `CLAUDE.md` (règles du pilote : la chaîne d'abord, méthode des scènes, dépenses, conventions).
2. `docs/essais-qualite.md` : décisions d'Ilyas sur les essais 1, 2 et 3.
3. Le bilan du pilote : dépôt `bimaccess-studio`, `docs/pilote-fme/bilan.md` (ajouter le dépôt avec l'outil `add_repo` s'il n'est pas dans la session).
4. Skills : `harnais/skills/scenes-gabarits/SKILL.md` (sans le dossier `canevas/`, non retenu) ; `harnais/skills/planche-image/SKILL.md`, seulement l'outil d'illustrations, les dépenses (§ 0 bis, 0 ter), `gabarits.md` et la relecture des symboles (§ 3). Ne pas utiliser l'assemblage automatique des planches (`tout`, `scenes`). Plus les skills Studio `graphisme`, `scenes`, `qa` et `voix` (`bimaccess-studio/plugins/studio/skills/`).
5. Le projet de départ : `modules/M01/L01/lecon-gabarits/` (`docs/gabarits.md`, `content/storyboard.md`, `content/design/scenes/S02.json` et `S04.json`).

## Où se fait la leçon

La leçon de production est `modules/M01/L01/lecon/`, identifiant `FME001-M01-L01`, titre sans mention d'essai. Elle se refait à partir de `lecon-gabarits/` : moteur avec gabarits, lecteur, signature « carte », S02 et S04 en données, illustrations, voix. Le storyboard et la voix y sont identiques à ceux de `lecon/`. L'ancienne version de `lecon/` reste dans l'historique git. Ne pas toucher aux dossiers d'essai (`lecon-image`, `lecon-essai`, `lecon-gabarits`, `lecon-design`).

## La chaîne, scène par scène

Sept scènes : S01 à S07. S02 et S04 existent en données ; il reste S01, S03, S05, S06 et S07.

1. **Composition** (graphiste, meilleur modèle, skills `graphisme` et `scenes-gabarits`). Pour chaque scène restante :
   - le gabarit de composition qui convient (`gabarits.md`) ;
   - la spécification de la scène ;
   - la liste des illustrations nécessaires, en reprenant d'abord la bibliothèque (`design/bibliotheque/`) et les illustrations déjà faites.

   Règles :
   - la feuille remplie sur toute la face (x 104 à 1424) ;
   - rien sur un trait ;
   - mises en évidence et textes dans la face ;
   - la marge réservée à l'échelle, à la source et à la rose.

   Une scène par agent, en parallèle. Aucune porte d'Ilyas sur la composition.
2. **Illustrations sur devis.** Le graphiste écrit ses commandes (`content/design/illustrations/<nom>.json`) et rend la main sans dessiner. L'agent principal lance `illustrations.py` sans `--approuve`, puis présente le devis à Ilyas : nombre de dessins, modèle (Flash 3.1 en 1K), prix unitaire, total. La commande ne se relance avec `--approuve <montant>` qu'une fois le montant approuvé par Ilyas.
3. **Gabarits manquants.** Une forme qui revient (légende, chaîne, étoile autour d'un centre, territoire) et qui n'a pas encore de gabarit s'écrit une fois, au meilleur modèle, documentée dans `docs/gabarits.md`. Pas de scène en code sur mesure si une forme convient.
4. **Contrôles de composition bloquants**, avant les scènes. Le contrôle au chargement (`src/engine/gabarits/plan.ts`) doit refuser :
   - un vide trop grand : le seuil actuel a laissé passer le vide en bas au centre de S02 à l'essai 3, d'environ 210 × 160 px ;
   - une mise en évidence ou un texte hors de la face ;
   - un texte posé sur un trait ;
   - un chevauchement dans l'état final.

   Ces contrôles sont en train d'être écrits dans le gabarit Studio du dépôt du cours (`BIMaccess-Learning-Platform`, branche `production`, `plugins/studio/template/src/engine/gabarits/plan.ts`). S'ils y sont déjà, reprends-les ; sinon, écris-les dans la leçon selon la même règle et dis-le dans le compte rendu. Repasse S02 et S04 à ces contrôles.
5. **Données de scène** : une scène par agent, en parallèle, modèle intermédiaire. Chaque agent écrit `content/design/scenes/Sxx.json`. Il ne rend pas la main tant que `npm run check` refuse, et il regarde l'image finale de sa scène avant de la rendre.
6. **Contrôles** :
   - `npm run check`, `build`, `check-literals` et `test:play` ;
   - la planche par phrase de chaque scène (`harnais/skills/planche-par-phrase-studio/planche.mjs`) ;
   - le contrôle de l'agent principal, dans l'ordre de `docs/essais-qualite.md` ;
   - push, puis vérification du lecteur Railway (`…/FME001-M01-L01/`).
7. **Porte du sens** : Ilyas juge la leçon sur le lecteur et la planche par phrase. Ses corrections se font, puis se reverifient.
8. **Voix.**
   - Les sept clips V4 existent déjà et se gardent tant que le texte dit ne change pas.
   - Avant de toucher à la voix, lis les décisions les plus récentes du rôle Voix du cours (dépôt du cours, `agents/voix/`, état et notes d'essai).
   - Respirations de 0,9 s entre les idées et 0,4 s de silence en fin de clip : sans crédit si c'est faisable.
   - Un clip dont le texte change après la porte du sens se regénère sur devis (`npm run voice -- generate`, `--approuve <caractères>`), puis recalage (`npm run sync`, `test:play`).
9. **Contrôle final d'Ilyas** sur le lecteur, puis bilan de L01 dans `docs/essais-qualite.md` (section « Production L01 »), `docs/journal-methode.md` et `bimaccess-studio/docs/pilote-fme/avancement.md` :
   - temps, tokens et coût par étape et par scène ;
   - défauts vus par Ilyas par scène ;
   - nombre de tours ;
   - comparaison avec les essais et avec CER001.

## Règles

- La chaîne d'abord : l'agent principal orchestre et délègue ; chaque rôle lit ses skills avant d'agir.
- **Aucun appel payant sans l'accord d'Ilyas**, coût annoncé avant. Un agent délégué ne dépense rien.
- Mesure à la fin de chaque étape : `python3 harnais/mesures/tokens.py --csv harnais/mesures/registre.csv --etape "FME001-M01-L01 production <étape>"`.
- Ne s'arrêter pour attendre Ilyas qu'aux portes prévues (devis, porte du sens, écoute si la voix change, contrôle final) ; le reste s'enchaîne.
- Ne pas modifier le dépôt du cours ni les parties exportées de `bimaccess-studio` : le report du harnais se fait dans une autre session.
- Français, sans tiret cadratin ; aucun libellé de statut ; aucun nom de modèle de langage dans la leçon ni dans les messages de commit, hors lignes d'attribution.
- Branche `claude/zen-gates-2suoao`, jamais de pull request ; si un push est refusé parce que la branche distante a avancé, fusionner (`git fetch`, `git merge --no-edit FETCH_HEAD`), puis pousser à nouveau.
- Ne jamais mettre `acknowledgeRemotionLicense` à vrai ; aucun rendu vidéo.
