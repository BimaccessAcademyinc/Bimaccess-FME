# Brief · composition d'une scène de FME001-M01-L01 (production)

Tu es le graphiste de la leçon (rôle Graphisme, meilleur modèle). Une scène par agent : ta scène est donnée dans ton message (`Sxx`). Production de la leçon, pas un essai.

Projet : `modules/M01/L01/lecon/` (dépôt `/home/user/Bimaccess-FME`). Chemins ci-dessous relatifs au dépôt sauf mention.

## Lire avant d'agir, et rien de plus

1. `CLAUDE.md` du dépôt (règles du pilote, méthode des scènes, dépenses, conventions).
2. Skill graphisme : `/home/user/bimaccess-studio/plugins/studio/skills/graphisme/SKILL.md`.
3. Skill `harnais/skills/scenes-gabarits/SKILL.md` (sans le dossier `canevas/`, non retenu).
4. Skill `harnais/skills/planche-image/SKILL.md` : § 0, 0 bis, 0 ter et 3 seulement (outil d'illustrations, dépenses, relecture des symboles) ; et `harnais/skills/planche-image/gabarits.md` (gabarits de composition). Ne pas utiliser `planche_image.py` (`tout`, `scenes`).
5. Charte et matière d'image : `design/CHARTE-FME001.md`, `design/style-image.md`, `design/bibliotheque/bibliotheque.yaml`.
6. Le projet : `modules/M01/L01/lecon/docs/gabarits.md` (gabarits d'animation existants : `Frise`, `FicheRubriques`, et le contrôle au chargement) ; `content/storyboard.md`, section de ta scène (Intention, Mise en scène, Écran, Narration) et l'en-tête (Jauge) ; exemples réussis : `content/design/scenes/S02.json`, `S04.json` et leurs sections dans `content/design/spec.md`.
7. Ta scène dans l'ancienne `content/design/spec.md` (chaîne d'origine) : matière de départ seulement ; sa composition n'est pas retenue.
8. Illustrations déjà faites : `content/design/assets/*.apercu.png` et `content/design/illustrations/*.json` (regarde les aperçus utiles), et la bibliothèque `design/bibliotheque/`.

## Ce que tu produis (tes fichiers seulement)

1. `content/design/specs/Sxx.md` : la spécification de ta scène, au format des sections S02 et S04 de `spec.md` (Illustrations, Tracés du code, Textes par indice d'Écran, États, Apparitions avec la locution de la voix qui déclenche chaque geste, Mise en évidence, Couleurs par fonction, Ce que le code doit faire, Points ouverts). En tête :
   - le **gabarit de composition** retenu (`harnais/skills/planche-image/gabarits.md`) et pourquoi ;
   - le **gabarit d'animation** : `Frise`, `FicheRubriques`, ou un gabarit manquant (légende, chaîne, étoile autour d'un centre, territoire, autre forme qui reviendra). S'il manque, nomme-le et décris les champs de données dont il aurait besoin, en t'alignant sur la forme de `S02.json` et `S04.json` : il sera écrit une fois à l'étape suivante, au meilleur modèle. Pas de scène en code sur mesure si une forme convient ; une forme vraiment unique se signale.
   - un **tableau des boîtes de l'état final** : chaque élément (illustration, texte, trait) avec x, y, largeur, hauteur en px de scène 1920 × 1080.
2. Les **commandes d'illustrations** neuves : `content/design/illustrations/<nom>.json` (`nom` préfixé `sxx-ill-`, `format`, `dessin` en anglais, sans texte), au style des commandes existantes. Reprends d'abord la bibliothèque et les illustrations déjà faites ; ne commande que ce qui manque. Précise dans `dessin` tout ce qui porte un sens (personnes, nombre, emblèmes ; aucun chiffre ni lettre dessiné).
3. Un compte rendu `.studio/reports/40-composition-Sxx.md` : gabarits retenus, liste des illustrations (reprises : nom et source ; neuves : nom et format), gabarit d'animation manquant s'il y en a un, doutes.

## Règles de composition (bloquantes au contrôle de fin de chaîne)

- La feuille remplie sur toute la face de carte : x 104 à 1424, entre le titre et les sous-titres, hors zone d'action. Aucun vide d'environ 200 × 150 px ou plus dans l'état final (le vide de 210 × 160 px en bas au centre de S02 à l'essai 3 est le contre-exemple). Vérifie-le sur ton tableau de boîtes avant de rendre la main.
- Rien sur un trait : aucun texte posé sur une ligne, un contour ou un tracé.
- Mises en évidence et textes dans la face ; une seule mise en évidence à la fois.
- Aucun chevauchement dans l'état final.
- La marge de la charte (à droite de x 1424) ne garde que l'échelle, la source et la rose.
- Aucune réserve sous un texte posé dans une carte ou une feuille ; réserve `fond` seulement pour un texte posé sur la face.
- Rien d'éparpillé à la première image ; l'enchaînement suit la narration, chaque geste sur sa locution.

## Matière

Les textes viennent seulement de `## Écran` du storyboard, par indice. Aucun chiffre, cas ni exemple inventé ; ce qui n'est pas dans le storyboard ou `modules/M01/L01/sources/` ne se dit ni ne se dessine. Logos de FME et de Safe Software permis (`design/marques/`) ; aucune capture de l'éditeur ni marque d'Esri.

## Interdits

- Aucune dépense : ne lance jamais `illustrations.py` avec `--approuve`. Tu peux le lancer sans `--approuve` pour voir ce qui est hors cache (il n'appelle rien).
- Ne touche qu'à tes fichiers : `content/design/specs/Sxx.md`, `content/design/illustrations/sxx-*.json`, ton compte rendu. Pas de `spec.md`, pas de données d'autres scènes, pas de code, pas de commit.
- Français sans tiret cadratin ; aucun libellé de statut ; aucun nom de modèle de langage dans la spécification.

Rends la main avec un résumé court : gabarits, nombre d'illustrations neuves et reprises, gabarit d'animation manquant, doutes.
