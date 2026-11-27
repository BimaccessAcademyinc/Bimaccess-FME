# Essai 3 · planches composées sur le canevas de design, exportées en données de gabarit

Demandé par Ilyas le 2026-11-27. Cette session part des fichiers, pas d'une conversation.

## Pourquoi

Après l'essai 2 (méthode des scènes approuvée : gabarits et données, `harnais/skills/scenes-gabarits/`), le goulot est le graphiste : environ 15 min par scène à l'essai 1 (31 min pour S02 et S04), parce qu'il compose à l'aveugle, en texte (positions au pixel, largeurs de texte estimées, spécification écrite), qu'un défaut de composition ne se voit qu'à la fin (S02 à moitié vide), et que ses positions sont ensuite recopiées dans les données.

Hypothèse : la planche de chaque scène se compose sur le canevas de design (l'outil de design de Claude, déjà employé pour les thèmes du programme : artefact https://claude.ai/artifact/WNw9om7abHZ37faQzMDSgG, composants de la charte copiés dans `design/composants.dc.html`), Ilyas la voit et la corrige à la main sur le canevas avant le code, puis un script l'exporte en fichier de données du gabarit (`content/design/scenes/Sxx.json`). But mesuré : composition en environ 5 min par scène, défauts vus avant le code, aucune recopie.

Un essai change une seule chose : mêmes scènes que les essais 1 et 2 (S02 et S04), mêmes gabarits (`Frise`, `FicheRubriques`), mêmes illustrations. Seule la composition change de méthode. Aucun appel payant n'est prévu.

## Ce qu'il faut faire

1. **Lire d'abord, et rien de plus** : `CLAUDE.md`, ce fichier, `docs/essais-qualite.md` (essais 1 et 2), `harnais/skills/scenes-gabarits/SKILL.md`, `modules/M01/L01/lecon-gabarits/docs/gabarits.md` (format des données), les données de l'essai 2 (`modules/M01/L01/lecon-gabarits/content/design/scenes/S02.json`, `S04.json`), le skill graphisme de Studio (dépôt `bimaccess-studio`, `plugins/studio/skills/graphisme/`), la charte (`design/CHARTE-FME001.md`, `design/tokens.json`, `design/composants.dc.html`).
2. **Projet** : copier `modules/M01/L01/lecon-gabarits/` vers `modules/M01/L01/lecon-design/` (sans `node_modules`, `dist`, `.studio/tmp`, `.studio/qa`), identifiant `FME001-M01-L01-design`, titre suivi de « (essai design) », `npm ci`. Ne pas toucher aux autres versions (`lecon`, `lecon-image`, `lecon-essai`, `lecon-gabarits`).
3. **Mise en place, une fois, mesurée à part** :
   - sur le canevas de design, une planche par scène au format 1920 × 1080, dans la charte FME001 (fond, carroyage, marges, cadre), zones interdites verrouillées et visibles (titre, sous-titres y ≥ 880 et x < 1300, zone d'action x 1454 y 834 360 × 140, marge de la charte), face utile x 104 à 1424 ;
   - les éléments à poser : les illustrations de la leçon (`content/design/assets/s02-ill-*.svg`, `s04-ill-*.svg`, téléversées comme fichiers de l'artefact), les textes de `## Écran` dans les polices de la charte à leur vraie taille, et les pièces des gabarits (ligne de frise, jalons, cases, routes, feuille à rubriques) ;
   - chaque élément porte, dans le canevas, ce que le gabarit doit savoir : son identifiant, la locution qui le fait apparaître (mot pour mot de la narration réellement dite, `src/generated/narration.ts`), son geste et sa mise en évidence ; choisir une notation lisible par Ilyas et par un script ;
   - un script `harnais/skills/scenes-gabarits/scripts/planche_vers_donnees.py` (ou `.mjs`) qui lit la planche publiée (outil Artifact, action `read`, ou fichiers de l'artefact) et écrit `Sxx.json` au format de `docs/gabarits.md` ; il refuse une planche incomplète (élément sans locution, texte hors face, chevauchement) avec un message clair.
4. **Composition, mesurée par scène** : le graphiste (skill graphisme, meilleur modèle) compose S02 puis S04 sur le canevas, en remplissant la face (règle 4), sans texte sur un trait. Publier, donner à Ilyas le lien du canevas et lui demander de valider ou de corriger à la main ; attendre sa réponse. Noter le temps de composition jusqu'à la planche prête, puis séparément le temps de ses corrections.
5. **Export et scène** : exporter S02 et S04 en données, lancer `npm run check`, `build`, la planche par phrase (`harnais/skills/planche-par-phrase-studio/planche.mjs`) ; comparer à l'essai 2 (même gabarit, données venues du canevas au lieu de la spécification). `test:play` une fois à la fin.
6. **Livraison et compte rendu** : commit et push sur la branche de travail, vérification que le lecteur Railway a redéployé (`…/FME001-M01-L01-design/#/2` et `#/4`), puis tableau pour Ilyas : temps et tokens de la mise en place (une fois), de la composition de chaque scène, de ses corrections, de l'export, comparés au graphiste de l'essai 1 (31 min pour deux scènes) ; ce qui est mieux, pareil ou moins bien ; ce que le canevas ne sait pas faire. Ilyas fait le contrôle final.
7. **Écrire les résultats** dans `docs/essais-qualite.md` (essai 3) et `docs/journal-methode.md`, mesures au registre (`harnais/mesures/tokens.py --csv harnais/mesures/registre.csv --etape "FME001-M01-L01 essai 3 …"`, une ligne par phase et par scène).

## Règles

- La chaîne d'abord : le canevas est un outil du graphiste, pas un rôle de plus ; l'agent principal orchestre et délègue (`CLAUDE.md`).
- Aucun appel payant (images, vision, voix). Si un besoin apparaît, annoncer le coût à Ilyas et attendre son accord (gardes `--approuve` des scripts).
- Ce que le canevas ne sait pas faire (par exemple les locutions, les gestes) se note et se contourne le plus simplement possible ; ne pas construire d'outil lourd avant d'avoir vu si la planche se lit bien.
- Français, sans tiret cadratin, aucun libellé de statut, aucun nom de modèle dans les messages de commit (hors lignes d'attribution) ; branche `claude/zen-gates-2suoao`, jamais de pull request.
