# L'idée

- **Objectif** : expliquer ce que disent les trois mots de Feature Manipulation Engine ; dire d'où vient FME ; reconnaître, devant une donnée géographique, ce qu'est une entité géographique.
- **Ce que demande le verbe** : *expliquer* et *reconnaître* demandent de faire comprendre une raison et de faire repérer trois parties, pas d'apprendre une procédure.
- **L'idée en trois phrases** :

> FME est un nom qui se lit comme une phrase : Feature Manipulation Engine, soit une entité géographique, une manipulation, un moteur. Une entité géographique est un objet du monde réel réduit à trois parties : une géométrie, des attributs, un système de coordonnées. FME est né chez Safe Software, dont le nom vient de SAIF, le format d'un projet d'échange de données forestières en Colombie-Britannique.

# Jauge

| Idée | Source | Poids | Difficulté | En pratique |
|---|---|---|---|---|
| FME veut dire à l'origine Feature Manipulation Engine ; l'éditeur dit aujourd'hui FME | A-nom-04, A-nom-17 | fort | simple | Un professionnel du BIM rencontre « FME » sans rien y lire ; le nom déplié donne les trois mots du métier |
| « Feature » se dit entité géographique : l'abstraction d'un phénomène du monde réel | A-nom-16 | fort | contre-intuitive | Devant une donnée, savoir si l'on a un objet décrit ou un simple dessin ; sinon on déplace des contours sans savoir ce qu'ils sont |
| Géométrie : l'information de position, point, ligne ou surface | A-nom-06 | fort | simple | Première chose que l'on voit d'une donnée ; seule, elle ne dit ni ce qu'est l'objet ni où il est sur la Terre |
| Attributs : ils font toujours partie de l'entité, quel que soit le format de stockage | A-nom-07 | fort | simple | Ce qui décrit l'objet (usage, matériau) ; une donnée sans eux est une forme muette |
| Système de coordonnées : l'entité sait où elle est sur la Terre | A-nom-08 | fort | mal comprise | Le plus oublié des trois ; sans lui, la forme et la description existent mais rien ne les place sur la Terre |
| Manipulation : les outils de transformation manipulent géométrie et attributs | A-nom-11 | moyen | simple | Ce que l'on fait entre lire et écrire |
| Engine : le composant qui traite les demandes de travaux, au centre d'un large éventail de formats | A-nom-12, A-nom-13 | moyen | simple | Pourquoi le même outil passe d'un format à n'importe quel autre |
| Lecture dans un format source, écriture dans un format de destination | A-nom-09, A-nom-13 | moyen | simple | Le trajet d'une entité à travers FME |
| Problème de départ : échanger des données géographiques forestières entre entreprises et gouvernement | A-origines-20 | fort | simple | Le besoin réel d'où l'outil est parti |
| SAIF, norme canadienne d'échange, prononcé « safe » ; le nom Safe en vient | A-origines-17, A-origines-07 | moyen | simple | Explique le nom de l'éditeur |
| Fondateurs, contrat remporté sur appel d'offres | A-origines-02, A-origines-15 | moyen | évidente | Qui est derrière l'outil |
| 1993 fondation, 1996 sortie de FME | A-origines-14, A-origines-22 | moyen | évidente | Trois ans entre l'entreprise et le produit |
| Siège à Surrey | A-sig-07 | faible | évidente | Une mention suffit |
| Entités sans géométrie | A-nom-06 | faible | contre-intuitive | Cas particulier qui brouillerait l'idée des trois parties |

Hors contenu : tout ce que la remise classe « contexte » ou « expert en attente » (parcours MDA et BCIT, première vente en Finlande, effectifs, nombre de formats, noms FME Form et FME Flow, Esri) ; le détail des attributs de format (A-nom-09) ; la construction d'un espace de travail (leçon 3) ; les formats et systèmes de coordonnées en détail (leçon 2).

# Objectifs

- **Savoir-faire** : expliquer ce que désignent les trois mots du nom Feature Manipulation Engine ; dire quand, par qui et pour quel problème de départ FME est né ; repérer, devant une donnée de bâtiment, la géométrie, les attributs et le système de coordonnées d'une entité géographique.
- **Point central** : une entité géographique réunit trois parties, et FME est le moteur qui les lit, les transforme et les écrit.
- **Déjà connu du public** : le bâtiment, le plan, le modèle ; pas la carte ni le SIG.
- **Vocabulaire introduit** : entité géographique (S01, S02), géométrie, attributs, système de coordonnées (S02), manipulation, moteur (S04), SAIF (S05).

# Budget

| Idée | Poids | Difficulté | Forme | Scène | Durée |
|---|---|---|---|---|---:|
| Le nom en trois mots | fort | simple | Ouverture | S01 | 0:30 |
| Une entité géographique et ses trois parties | fort | mal comprise | Exposé avec schéma | S02 | 1:00 |
| Reconnaître une entité complète | fort | mal comprise | Exercice | S03 | 1:15 |
| Manipulation et moteur | moyen | simple | Exposé avec schéma | S04 | 0:50 |
| SAIF, le projet de départ, le nom Safe | fort | simple | En pratique | S05 | 0:40 |
| Fondateurs, 1993, 1996, siège | moyen | évidente | Exposé avec schéma | S06 | 0:30 |
| Où vit une entité | moyen | simple | Pont | S07 | 0:15 |
| | | | **Total** | | **5:00** |

# S01 · Les trois mots du nom

## Intention

Le nom FME, déplié, donne trois mots, et chacun répond à une part du métier.

## Mise en scène

- **Objet étudié** : non.
- **Écran** : les trois lettres FME en grand, seules sur la page. Le nom se déplie ensuite en trois mots posés côte à côte, comme les trois champs d'une même ligne : Feature, Manipulation, Engine. Sous Feature, son équivalent français (entité géographique) ; sous Engine, moteur.
- **Mouvement** : FME dès la première image, avec la question de la voix. Les trois mots se posent un à un sur « Feature Manipulation Engine ». Chaque équivalent français arrive sur la phrase qui le dit, dans l'ordre. C'est ici, et seulement ici, que le mot « feature » est montré comme le mot de l'outil.
- **Écart d'ouverture** : trois lettres sans sens, avec la question posée.
- **Affirmations** : A-nom-04 et A-nom-17 (le nom d'origine, l'éditeur dit FME), terminologie décidée pour « feature ».
- **Pour la voix** : prononcer Feature Manipulation Engine à l'anglaise, une fois.

## Écran

- `Un nom qui dit le métier.`
- `FME`
- `Feature`
- `Manipulation`
- `Engine`
- `entité géographique`
- `moteur`

## Narration

FME : trois lettres qui ne disent rien du métier. Que cachent-elles ?

À l'origine, FME signifie Feature Manipulation Engine. Aujourd'hui, l'éditeur dit simplement FME.

Trois mots, et chacun nomme une part du travail. Feature désigne l'entité géographique : ce que FME traite. Manipulation, c'est ce qu'il lui fait. Engine, c'est le moteur qui fait le travail.

# S02 · Une entité géographique

## Intention

Une entité géographique est un objet du monde réel réduit à trois parties : sa géométrie, ses attributs et son système de coordonnées.

## Mise en scène

- **Objet étudié** : oui, un bâtiment vu en plan, parce que la voix parle de lui. Exemple unique, qui ne continue dans aucune autre scène.
- **Écran** : le contour d'un bâtiment, seul, dessiné en plan sur la page. De ce contour partent deux traits tiretés or qui s'arrêtent sur un manque : le contour ne dit rien d'autre. Une fiche se dessine ensuite autour du contour et devient la fiche de l'entité, avec ses trois parties : la géométrie (le contour, et trois petits tracés étiquetés Point, Ligne, Surface), les attributs (une feuille avec deux lignes lisibles), le système de coordonnées (un globe où le bâtiment est posé).
- **Mouvement** : le contour est à l'écran dès la première seconde de voix, avec ses deux manques or. Sur « Complété, il devient une entité géographique », la fiche se trace autour du contour. Sur « La géométrie », le contour est mis en évidence ; sur « un point, une ligne ou une surface », les trois tracés apparaissent, puis la surface est mise en évidence sur « Ici, c'est une surface ». Sur « Les attributs », le premier trait or se prolonge jusqu'à la feuille, dont les deux lignes s'écrivent sur « son usage et son matériau ». Sur « Le système de coordonnées », le second trait se prolonge jusqu'au globe, où le bâtiment se pose. Une seule mise en évidence à la fois.
- **Écart d'ouverture** : figure incomplète, le contour seul avec ses deux manques.
- **Affirmations** : A-nom-16 (entité), A-nom-06 (géométrie), A-nom-07 (attributs), A-nom-08 (système de coordonnées). La glose « une représentation qui garde ce qui sert à le décrire » est pédagogique, voir Points ouverts.
- **Cinq étiquettes** : Géométrie, Attributs, Système de coordonnées, plus les trois petits tracés Point, Ligne, Surface comptés comme un seul groupe. Les valeurs « Usage : bureaux » et « Matériau : béton » sont des exemples, pas des étiquettes.

## Écran

- `Une entité géographique, trois parties.`
- `Géométrie`
- `Point`
- `Ligne`
- `Surface`
- `Attributs`
- `Usage : bureaux`
- `Matériau : béton`
- `Système de coordonnées`

## Narration

Un contour de bâtiment, seul, ne dit ni ce qu'est ce bâtiment, ni où il se trouve sur la Terre.

Complété, il devient une entité géographique : l'abstraction d'un phénomène du monde réel, c'est-à-dire une représentation qui garde ce qui sert à le décrire.

Une entité géographique se compose de trois parties. La géométrie donne la position : un point, une ligne ou une surface. Ici, c'est une surface.

Les attributs décrivent l'entité : son usage et son matériau. Ils en font toujours partie, quel que soit le format où ils sont stockés.

Le système de coordonnées, enfin, situe l'entité sur la Terre. Toute entité traitée par FME le connaît.

# S03 · Reconnaître une entité

## Intention

La personne choisit, parmi trois données, celle qui réunit les trois parties, et voit ce qui manque aux autres.

## Mise en scène

- **Objet étudié** : non, la scène ne montre aucun dessin du bâtiment : la décision porte sur trois descriptions.
- **Écran** : le titre de la situation, puis le panneau de question avec trois choix de longueur comparable. Rien d'autre : le panneau porte la scène.
- **Mouvement** : le titre se tape sur la première phrase, la question et les choix arrivent ensemble. Après la validation, la conséquence du choix s'écrit sous le panneau, puis la narration déclenchée.
- **Mode conséquence** : aucun verdict ni « Attendu ». La conséquence de chaque choix dit ce qui manque ou ce qui est réuni, en s'appuyant sur A-nom-06, A-nom-07, A-nom-08.
- **Écart** : l'exercice est sa propre accroche.

## Écran

- `Trois données de bâtiment.`

## Narration d'entrée

Trois données de bâtiment vous sont remises. Elles ne contiennent pas les mêmes parties.

## Exercice

Question : `Laquelle de ces données réunit les trois parties d'une entité géographique ?`
- a · `Un contour de bâtiment, sans attributs ni système de coordonnées.` → `Le contour donne la forme du bâtiment et rien d'autre : ni ce qu'il est, ni où il se trouve sur la Terre. Deux parties manquent : les attributs et le système de coordonnées.`
- b · `Un contour, un usage et un matériau, sans système de coordonnées.` → `La forme, l'usage et le matériau sont là. Sans système de coordonnées, rien ne rattache le bâtiment à sa position sur la Terre : la troisième partie manque.`
- c · `Un contour, un usage et un matériau, avec un système de coordonnées.` → `Les trois parties sont réunies : le contour donne la forme, l'usage et le matériau décrivent le bâtiment, le système de coordonnées le situe sur la Terre.`

## Narration déclenchée

Devant une donnée géographique, cherchez ces trois parties dans cet ordre : géométrie, attributs, système de coordonnées. La première qui manque est la première à réclamer à qui vous a remis la donnée.

# S04 · Le moteur au milieu

## Intention

Les deux derniers mots du nom : FME manipule la géométrie et les attributs d'une entité, et son moteur passe d'un format à n'importe quel autre.

## Mise en scène

- **Objet étudié** : non. L'entité n'est qu'une vignette reprise de la scène S02 (un contour et une ligne « Usage : bureaux »), citée comme objet, pas redessinée en grand.
- **Écran** : un schéma de gauche à droite : à gauche une pile de feuilles de formats, étiquetée Format source ; à droite une autre pile, étiquetée Format de destination ; entre les deux, un cadre en tireté or, vide, qui se remplit ensuite et se nomme Moteur.
- **Mouvement** : dès la première seconde, les deux piles et le cadre or vide (le manque : deux mots du nom restent à expliquer). Sur « FME lit une entité dans un format source », la vignette sort de la pile de gauche et entre dans le cadre. Sur « assurent la manipulation », la mise en évidence passe sur le contour de la vignette, puis sur sa ligne d'attribut, et l'étiquette Manipulation se pose. Sur « FME écrit l'entité dans un format de destination », la vignette sort vers la pile de droite. Sur « se dit moteur », le cadre devient plein et reçoit son étiquette Moteur. Sur « large éventail de formats », les deux piles se déploient en plusieurs feuilles.
- **Écart d'ouverture** : enjeu, deux mots du nom attendent leur explication ; le cadre or vide le marque.
- **Affirmations** : A-nom-09 (lecture et écriture), A-nom-11 (manipuler), A-nom-12 (moteur), A-nom-13 (large éventail de formats, aucun nom de format cité : la remise n'en donne pas).

## Écran

- `Un moteur au milieu des formats.`
- `Format source`
- `Manipulation`
- `Format de destination`
- `Moteur`

## Narration

Deux mots du nom restent à expliquer.

FME lit une entité dans un format source. Ses outils de transformation assurent la manipulation de la géométrie et des attributs de cette entité. Puis FME écrit l'entité dans un format de destination.

Le dernier mot du nom, engine, se dit moteur : c'est le composant de FME qui traite les demandes de travaux.

Ce moteur se trouve au centre d'un large éventail de formats : les données peuvent être lues depuis n'importe lequel, et écrites vers n'importe quel autre.

# S05 · Safe vient de SAIF

## Intention

Le nom de l'éditeur vient d'un format, SAIF, qui servait un projet d'échange de données géographiques forestières.

## Mise en scène

- **Objet étudié** : non.
- **Écran** : deux cartes de nom, FME et Safe Software, reliées par un trait tireté or qui s'arrête sur un manque. Le manque se remplit par une fiche SAIF, avec son nom développé en dessous et sa prononciation. Sous la fiche, deux cartes de rôle nommées, Entreprises forestières et Gouvernement de la Colombie-Britannique, reliées par une double flèche portant « Données géographiques forestières ». Aucun logo de Safe Software ni de FME : les noms sont des cartes dessinées.
- **Mouvement** : les cartes FME et Safe Software sont à l'écran dès la première seconde de voix, avec le trait or qui s'arrête sur un manque. Sur « un format : SAIF », la fiche SAIF remplit le manque. Sur « Spatial Archive and Interchange Format », le nom développé s'écrit sous elle, et sur « se prononce », sa prononciation. Sur « projet de départ », la fiche SAIF se range en haut et les deux cartes de rôle apparaissent ; sur « l'échange de données géographiques forestières », la double flèche se trace.
- **Écart d'ouverture** : deux noms qui ne se ressemblent pas, FME et Safe, avec le lien manquant.
- **Affirmations** : A-nom-04 (Safe Software présente FME), A-origines-07 (le nom Safe vient de SAIF, format du projet de départ), A-origines-17 (SAIF, norme canadienne d'échange), A-origines-20 (le projet de départ).
- **Pour la voix** : SAIF se prononce « safe » ; le développé anglais se dit en anglais.

## Écran

- `Safe vient de SAIF.`
- `FME`
- `Safe Software`
- `SAIF`
- `Spatial Archive and Interchange Format`
- `Prononcé « safe »`
- `Entreprises forestières`
- `Gouvernement de la Colombie-Britannique`
- `Données géographiques forestières`

## Narration

FME est publié par Safe Software, dont le nom vient d'un format : SAIF.

SAIF signifie Spatial Archive and Interchange Format. C'est une norme canadienne d'échange de données géographiques, et son sigle se prononce « safe ».

C'est le format du projet de départ. Ce projet portait sur l'échange de données géographiques forestières, entre les entreprises forestières et le gouvernement de la Colombie-Britannique.

# S06 · Une entreprise, deux dates

## Intention

Safe Software naît d'un contrat remporté par ses deux fondateurs ; FME sort trois ans après la fondation.

## Mise en scène

- **Objet étudié** : non.
- **Écran** : une frise horizontale. Un repère 1993, un intervalle en or, un repère 1996 : l'intervalle est le manque que la voix comble. Sous la frise, une feuille titrée « Contrat du gouvernement de la Colombie-Britannique » avec sa rubrique « Appel d'offres remporté », et deux cartes de rôle nommées, Don Murray et Dale Lutz, sous le mot Fondateurs. À droite de la frise, une carte de lieu : « Siège : Surrey, Colombie-Britannique ».
- **Mouvement** : la frise est à l'écran dès la première seconde, avec ses deux repères et l'intervalle or. Sur « fondation de Safe Software », le repère 1993 se met en évidence ; sur « sortie de FME », le repère 1996. Sur « contrat du gouvernement », la feuille se déroule rangée par rangée, puis les deux cartes de rôle arrivent sur leurs noms. Sur « son siège est à Surrey », la carte de lieu se pose.
- **Écart d'ouverture** : un intervalle de trois ans entre l'entreprise et le produit, marqué en or.
- **Affirmations** : A-origines-14 (1993), A-origines-22 (1996, trois ans plus tard), A-origines-15 (contrat remporté sur appel d'offres), A-origines-02 (fondateurs), A-sig-07 (siège à Surrey). La voix dit « fondateurs de Safe Software », pas « créateurs de FME » : la remise ne dit pas qui a conçu FME.
- **Pour la voix** : Murray, Lutz, Surrey.

## Écran

- `De 1993 à 1996.`
- `1993 · Safe Software est fondée`
- `1996 · FME sort`
- `Contrat du gouvernement de la Colombie-Britannique`
- `Appel d'offres remporté`
- `Fondateurs`
- `Don Murray`
- `Dale Lutz`
- `Siège : Surrey, Colombie-Britannique`

## Narration

Trois ans séparent la fondation de Safe Software, en 1993, de la sortie de FME, en 1996.

Safe Software naît d'un contrat du gouvernement de la Colombie-Britannique, remporté sur appel d'offres par ses fondateurs, Don Murray et Dale Lutz.

Aujourd'hui, son siège est à Surrey, en Colombie-Britannique.

# S07 · Où vit une entité

## Intention

Poser la question de la leçon suivante : dans quel format et dans quel système de coordonnées vit une entité.

## Mise en scène

- **Objet étudié** : non. La vignette de l'entité (S02) est reprise, réduite, comme point de départ de deux flèches.
- **Écran** : la vignette de l'entité au centre, avec deux traits tiretés or qui s'arrêtent sur deux manques : le premier porte « Format », le second « Système de coordonnées ».
- **Mouvement** : la vignette et ses deux traits or sont en place dès la première seconde de voix ; chaque étiquette se pose sur le mot qui la dit.
- **Écart d'ouverture** : les deux manques or, qui sont la question.
- **Affirmations** : A-nom-07 et A-nom-08 (une entité est stockée dans un format et connaît son système de coordonnées) ; la leçon suivante, d'après le cadrage.

## Écran

- `Format et coordonnées.`
- `Format`
- `Système de coordonnées`

## Narration

Reste à savoir où vit une entité géographique : dans quel format est-elle stockée, et dans quel système de coordonnées ? La leçon suivante détaille ce format et ces coordonnées.

# Points ouverts

| Point | Proposition |
|---|---|
| Objectif « dire qui a créé FME » : la remise dit que Safe Software a été fondée par Don Murray et Dale Lutz (A-origines-02), pas qui a conçu FME | S06 dit « ses fondateurs » ; à Ilyas de confirmer si « créé FME » peut se dire des fondateurs |
| Noms de personnes : REGLES § 3.2 les écarte, l'objectif 2 de la leçon demande « qui » | Les deux noms sont dits une fois, en S06, avec les fonctions ; à Ilyas de trancher |
| Exemple du bâtiment (contour, usage « bureaux », matériau « béton ») : la remise ne fournit aucun exemple, A-nom-16 parle seulement de « phénomène du monde réel » | Exemple illustratif, sans valeur de fait ; à remplacer si Ilyas préfère un autre objet de projet |
| Glose de « abstraction » en S02 (« une représentation qui garde ce qui sert à le décrire ») : le sens est celui de A-nom-16, la formulation est pédagogique | À valider par Ilyas |
| « feature » : la voix dit Feature Manipulation Engine (S01) puis « Feature désigne l'entité géographique » ; l'écran montre le mot une seule fois (S01) | Conforme à la décision Q3 si la voix peut le prononcer deux fois ; sinon retirer la glose de la voix |
| A-nom-13 (S04) : le porte-expert note qu'elle a été refusée par le vérificateur, la remise la liste en confiance moyenne | La remise l'emporte ; à confirmer par Ilyas |
| Ministère, Surrey comme lieu de fondation, nombre de formats, effectif : non dits (Q4, Q5, Q7, Q9, repli appliqué) | Rien à faire ; révisables si Ilyas répond |
| Prononciation : Feature Manipulation Engine, Spatial Archive and Interchange Format, SAIF (« safe »), Murray, Lutz, Surrey | Pour le rôle voix |
| Test du débutant : non exécuté, aucun lecteur extérieur n'était disponible dans cette session | À lancer par le Super Agent sur `# L'idée` puis sur les scènes |
