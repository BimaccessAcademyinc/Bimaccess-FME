# Essai 2 · scènes par gabarits (consignes de la session qui le mène)

Demandé par Ilyas le 2026-11-27. Cette session part des fichiers, pas d'une conversation : tout ce qu'il faut savoir est ici et dans les fichiers cités.

## Pourquoi

L'essai 1 (S02 et S04 par la chaîne, `modules/M01/L01/lecon-essai/`) a réglé l'assemblage mais pas le temps : 58 min d'agents pour deux scènes (graphiste 31 min, codeur 27 min), environ 29 min par scène, plus lent que la leçon d'origine (environ 9 min par scène). Les images ne sont pas le goulot (3 min) : le temps part à relire les règles à chaque agent, à écrire une composition au pixel puis à la retraduire en environ 28 Ko de code sur mesure, et aux contrôles en série. Détail : `docs/essais-qualite.md`, essai 1.

Hypothèse à vérifier : la plupart des scènes suivent quelques formes (gabarits de `harnais/skills/planche-image/gabarits.md` : frise, légende, chaîne, étoile, territoire, fiche à rubriques). Un composant d'animation par gabarit, écrit une fois, fait de chaque scène un petit fichier de données. But mesuré : environ 5 à 8 min d'agent par scène au lieu de 29, qualité au moins égale à l'essai 1.

## Ce qu'il faut faire

1. **Lire d'abord, et rien de plus** : `CLAUDE.md` (racine), ce fichier, `docs/essais-qualite.md`, la dernière section de `docs/journal-methode.md`, `harnais/skills/planche-image/gabarits.md`, les rapports de l'essai 1 (`modules/M01/L01/lecon-essai/.studio/reports/20-graphiste-essai.md`, `21-code-essai.md`) et les sections S02 et S04 de sa spécification (`content/design/spec.md`). Le skill des scènes de Studio est dans le dépôt `bimaccess-studio` (`plugins/studio/skills/scenes/`) ; les skills Remotion, à la version des leçons (4.0.533), sont dans `.claude/skills/remotion-*` de ce dépôt (prendre ceux-là, pas ceux du plugin du compte, en 4.0.528).
2. **Projet de l'essai** : copier `modules/M01/L01/lecon-essai/` vers `modules/M01/L01/lecon-gabarits/` (sans `node_modules`, `dist`, `.studio/tmp`, `.studio/qa`), identifiant `FME001-M01-L01-gabarits`, titre suivi de « (essai gabarits) », puis `npm ci`. Le lecteur de relecture Railway prend tout dossier `lecon-*` au prochain push.
3. **Phase A, une fois, mesurée à part** : deux composants de gabarit dans le moteur du projet (`src/engine/gabarits/`), exportés par `src/engine/index.ts`, pilotés par des données :
   - `Frise` (S02) : ligne et pointe, jalons, cases des années tracées à vitesse constante, éléments posés au-dessus et au-dessous, chacun révélé sur sa locution, mise en évidence par élément ;
   - `FicheRubriques` (S04) : feuille révélée bande par bande, bandeau, rubriques, éléments posés dans chaque rubrique, un objet qui voyage d'une boîte à une autre.
   Chaque composant lit un fichier de données (`content/design/scenes/Sxx.json` : illustrations, textes par indice de `## Écran`, positions, locutions, gestes, mises en évidence), applique la grammaire (jamais de fondu, vitesse constante, une seule mise en évidence, `data-board` par état) et emploie les outils Remotion du moteur (`src/engine/outils.ts`) là où ils rendent le geste exact. Garder ce que l'essai 1 a appris (rapport 21 : bandes par une seule découpe, réserves, globe découpé en cercle). Écrire aussi `docs/gabarits.md` dans le projet : le format des données, un exemple par gabarit.
4. **Phase B, mesurée par scène** : S02 et S04 refaites comme données seulement (`content/design/scenes/S02.json`, `S04.json`, et `s02.tsx`, `s04.tsx` réduits à l'appel du gabarit), à partir de la spécification de l'essai 1 (mêmes positions, mêmes illustrations : aucun dessin à commander). Une scène par agent, les deux en parallèle ; essayer le modèle intermédiaire pour cette phase et noter sa qualité.
5. **Contrôle de l'agent principal**, selon `docs/essais-qualite.md` : planche par phrase de S02 et S04 (`harnais/skills/planche-par-phrase-studio/planche.mjs`), comparée à l'essai 1 ; symboles, aucun texte sur un trait, rien d'éparpillé, une seule mise en évidence ; `npm run check`, `build`, `test:play` une seule fois à la fin.
6. **Livraison** : commit et push sur la branche de travail, vérification que le lecteur Railway a redéployé (service `fme-reader-review`), puis compte rendu à Ilyas avec un tableau : temps et tokens de la phase A (une fois), de chaque scène de la phase B, comparés à l'essai 1 ; ce qui est mieux, pareil ou moins bien ; les liens `…/FME001-M01-L01-gabarits/#/2` et `#/4`. Ilyas fait le contrôle final.
7. **Écrire les résultats** dans `docs/essais-qualite.md` (essai 2) et `docs/journal-methode.md`, mesures au registre (`harnais/mesures/tokens.py --csv harnais/mesures/registre.csv --etape "FME001-M01-L01 essai 2 …"`, une ligne par phase et par scène).

## Règles

- La chaîne d'abord, l'agent principal orchestre et délègue (`CLAUDE.md`).
- Aucun appel payant (images, vision, voix) : cet essai n'en a pas besoin. Si un besoin apparaît, annoncer le coût à Ilyas et attendre son accord (règle des dépenses de `CLAUDE.md`, gardes des scripts).
- Modèle d'image par défaut, si un jour il en faut : Flash 3.1 (`harnais/skills/planche-image/SKILL.md`).
- Ne pas toucher aux autres versions de la leçon (`lecon/`, `lecon-image/`, `lecon-essai/`) : elles servent de comparaison.
- Français, sans tiret cadratin, aucun libellé de statut, aucun nom de modèle dans les messages de commit (hors lignes d'attribution) ; branche `claude/zen-gates-2suoao`, jamais de pull request.

## Décisions d'Ilyas encore ouvertes (à lui rappeler, pas à trancher)

- Réserve des textes dans une carte ou une feuille : le codeur de l'essai 1 recommande aucune réserve tant que les illustrations ne sont pas ramenées aux jetons de la charte (rapport 21).
- Suite du pilote après les essais : planches préparées dans le canevas de design (essai 3), report dans le harnais du cours, reste de L01, L02 à L05 (`bimaccess-studio/docs/pilote-fme/avancement.md`).
