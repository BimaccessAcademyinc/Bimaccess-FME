# L'idée

- **Objectifs du brief et ce que leurs verbes demandent** : 1. *expliquer* ce que désignent les trois mots du nom (comprendre une raison : pourquoi ce nom décrit l'outil) ; 2. *dire* qui a créé FME, quand, et pour quel problème de départ (savoir, en une scène, sans liste à retenir) ; 3. *reconnaître*, devant une donnée géographique, les trois parties d'une entité géographique (identifier et nommer : c'est l'objectif que l'exercice pratique).
- **L'idée en trois phrases** :

> FME portait à l'origine un nom qui décrit son travail : Feature Manipulation Engine, un moteur qui manipule des entités géographiques. Une entité géographique, c'est une chose du monde réel gardée dans des données, avec sa géométrie, ses attributs et son système de coordonnées. L'outil est né en Colombie-Britannique d'un projet d'échange de données forestières, et son éditeur, Safe Software, tient son nom du format de ce projet.

- **Ce qu'un débutant en a dit** : pas encore recueilli. Le test se fait avec un lecteur neuf, que ce rôle ne peut pas lancer (voir `# Test du débutant` et `# Points ouverts`).

# Jauge

| Idée | Source | Poids | Difficulté | En pratique |
|---|---|---|---|---|
| FME voulait dire à l'origine Feature Manipulation Engine ; l'éditeur dit aujourd'hui FME | A-nom-04, A-nom-17 ; porte Q2 | fort | simple | Le professionnel du BIM qui découvre l'outil lit trois lettres opaques ; les trois mots lui disent à quoi il sert. Mal fait : on présente le développement comme le nom commercial actuel |
| Une entité géographique est l'abstraction d'une chose du monde réel | A-nom-16 ; terminologie Q3 | fort | contre-intuitive | Le professionnel habitué aux plans voit un contour dessiné là où les données portent un objet complet. Mal compris : on échange des dessins en croyant échanger des objets |
| Une entité a une géométrie (information de position : points, lignes, surfaces), des attributs, un système de coordonnées | A-nom-06, A-nom-07, A-nom-08 | fort | mal comprise | Devant une donnée reçue, c'est ce qu'on cherche. Mal compris : on croit que la géométrie seule situe l'objet sur la Terre |
| Certaines entités n'ont pas de géométrie | A-nom-06 | faible | contre-intuitive | Utile à l'usage de l'outil, pas à la première rencontre ; hors contenu (voir plus bas) |
| FME lit les données source, ses outils de transformation manipulent géométrie et attributs, puis il écrit les données de destination | A-nom-09, A-nom-11 | moyen | simple | C'est le deuxième mot du nom en geste : ce qui arrive à une entité entre deux formats |
| Les attributs de l'utilisateur restent dans l'entité, quel que soit le format | A-nom-07 | moyen | simple | L'équipe qui reçoit retrouve la description de l'objet dans son format à elle |
| FME est un moteur central au milieu d'un large éventail de formats : lu depuis n'importe lequel, écrit vers n'importe quel autre | A-nom-13 | fort | simple | Un format pris en charge rejoint tous les autres par le même centre |
| Le moteur est le composant qui traite les travaux demandés en exécutant des espaces de travail | A-nom-12 | moyen | simple | Le mot « espace de travail » se nomme ici et s'apprend dans une prochaine leçon (REGLES 2.7) |
| Au début des années 1990, un projet d'échange de données géographiques forestières entre les entreprises forestières et le gouvernement provincial de la Colombie-Britannique | A-origines-20 | fort | simple | Le premier problème de l'outil est déjà un échange de données géographiques entre plusieurs parties |
| Safe Software naît d'un contrat de ce gouvernement, remporté sur appel d'offres par Don Murray et Dale Lutz, ses fondateurs | A-origines-15, A-origines-02 | moyen | évidente | Répond au « qui » de l'objectif 2 ; une phrase |
| SAIF, norme canadienne d'échange de données géographiques prononcée « safe », donne son nom à Safe | A-origines-17, A-origines-07 | moyen | contre-intuitive | Le nom de l'éditeur se lit comme le mot anglais « sûr » : idée reçue qui sert d'accroche |
| Safe Software est fondée en 1993, FME sort en 1996 | A-origines-14, A-origines-22 ; porte Q1 | moyen | évidente | Deux dates imposées par Ilyas ; une phrase chacune, sur une frise |
| Siège à Surrey, en Colombie-Britannique | A-sig-07 ; porte Q5, Q9 | faible | évidente | « Safe Software en bref » : une mention |

Hors contenu :

- **Hors remise** (attend l'expert, ou contexte) : la date de constitution (A-origines-01), l'introduction de FME en 1993 selon la page actuelle (A-origines-09), la date de 1996 au jour près (A-origines-08), le parcours des fondateurs (A-origines-03, porte Q8), le ministère client (A-origines-04, porte Q4), Surrey comme lieu de fondation (A-origines-21, porte Q5), les premiers travaux CAD vers SIG (A-origines-05), le développement de SAIF et sa nature (A-origines-06, A-origines-18, A-origines-19), la boîte à outils SAIF (A-origines-16), le problème des données éparpillées et le choix du gouvernement d'inventer un format (A-sig-01, A-sig-02), les noms des produits actuels et l'effectif (A-nom-05, A-sig-06, A-sig-08, porte Q9), le nombre de formats (A-sig-03, A-sig-04, porte Q7), les étapes de 1997 (A-origines-10, A-origines-11, porte Q10), Esri (A-sig-05, A-origines-12, porte Q6), les normes nommées (A-nom-01, A-nom-03), les exemples du glossaire du W3C (A-nom-02), les readers, writers et transformers (A-nom-10), la ligne de commande et Workbench (A-nom-14).
- **Écarté par choix** : les entités sans géométrie (A-nom-06, seconde moitié) brouilleraient l'idée des trois parties à la première rencontre ; le nom de l'outil FME Workbench (A-nom-11) est remplacé par « les outils de transformation de FME ».
- **Leçons voisines** (cadrage) : construire un espace de travail (L03), formats et systèmes de coordonnées en détail (L02), usages SIG (L04), FME Flow et l'automatisation, le BIM vers SIG (L05).

# Objectifs

- **Savoir-faire** : expliquer ce que désignent les trois mots du nom d'origine de FME (S01, S02, S04, S05) ; dire qui a créé FME, quand, et pour quel problème de départ (S06) ; reconnaître, sur une donnée géographique, la géométrie, les attributs et le système de coordonnées d'une entité, et laquelle de ces parties la situe sur la Terre (S02, S03).
- **Point central** : le nom d'origine de FME décrit son travail : un moteur qui manipule des entités géographiques, chacune faite d'une géométrie, d'attributs et d'un système de coordonnées.
- **Déjà connu du public** : plans, modèles et échanges de fichiers sur un projet de construction ; ni FME ni le SIG.
- **Vocabulaire introduit** :

| Terme (voix et écran) | Anglais, pour la version anglaise | Scène |
|---|---|---|
| entité géographique | feature (montré une fois, dans le nom d'origine) | S01, défini en S02 |
| géométrie, attributs, système de coordonnées | geometry, attributes, coordinate system | S02 (une seule figure, REGLES 2.3) |
| outils de transformation | transformers | S04 |
| moteur | engine | S01, défini en S05 |
| espace de travail | workspace | S05 (nommé, appris dans une prochaine leçon) |
| SAIF | Spatial Archive and Interchange Format | S06 |

# Budget

Durées de voix estimées à 150 mots par minute ; S03 ajoute le temps du choix.

| Idée | Poids | Difficulté | Forme | Scène | Durée |
|---|---|---|---|---|---:|
| Le nom d'origine et ses trois mots | fort | simple | Ouverture | S01 | 0:35 |
| L'entité géographique et ses trois parties | fort | contre-intuitive | Exposé avec schéma | S02 | 0:45 |
| Où se lit la position d'une entité | fort | mal comprise | Exercice | S03 | 1:10 |
| Lire, manipuler, écrire | moyen | simple | Geste fait devant la personne | S04 | 0:50 |
| Le moteur au centre des formats | fort | simple | Exposé avec schéma | S05 | 0:40 |
| Le projet forestier, SAIF, Safe Software, 1993 et 1996 | fort | contre-intuitive | Exemple (le cas réel documenté) | S06 | 0:50 |
| Formats et systèmes de coordonnées, la suite | faible | simple | Pont | S07 | 0:25 |
| | | | | **Total** | **5:15** |

Lecture du budget : sept scènes ; l'entité géographique reçoit le plus de temps (S02 puis l'exercice S03), parce que c'est l'idée que le public confond le plus (un contour dessiné pris pour l'objet, la géométrie prise pour la position sur la Terre). L'histoire tient en une scène, ses dates sur une frise. Un seul exercice, au milieu, juste après la notion qu'il pratique. Avec l'écran « Lancer », les pauses de la voix et le temps de lecture des planches, la leçon jouée approche 6 minutes, la fourchette basse du brief : la matière autorisée par la remise ne demande pas plus, et rien n'est ajouté pour remplir.

# S01 · Trois lettres, trois mots

## Intention

Faire lire le nom d'origine de FME comme une description de son travail : un moteur qui manipule des entités géographiques.

## Mise en scène

- **Objet étudié** : oui (la voix parle de FME, l'outil) ; l'outil se montre par son nom, jamais par une capture ni un logo de Safe Software.
- **Accroche** (figure incomplète) : dès la première seconde, les trois lettres « FME » en très grand, et sous chaque lettre une case de mot vide, marquée en or (le manque).
- **Écran** : le titre ; les trois lettres ; l'étiquette « Nom d'origine » ; le nom d'origine, chaque mot posé sous sa lettre, l'initiale accrochée à la lettre par un trait ; sous chaque mot anglais, sa traduction française, reliée par une cote verticale (vert pour « Entité géographique », le terme nouveau).
- **Mouvement** : titre et lettres sur « Trois lettres » ; les cases or sur « Chaque lettre cache un mot » ; « Nom d'origine » puis le nom d'origine se tapent dans les cases sur « voulaient dire Feature Manipulation Engine » ; les traductions se tracent une à une sur « entité géographique », « manipulation », « moteur » ; la traduction « Manipulation » s'ancre sur « en français : manipulation » et « Moteur » sur « se traduit par moteur » (les deux mots reviennent dans le clip) ; sur « Lu dans l'ordre », mise en évidence (une seule à la fois) qui passe de « Moteur » à « Manipulation » puis à « Entité géographique », l'ordre de la phrase « un moteur qui manipule des entités géographiques ».
- **Affirmations** : nom d'origine et nom actuel → A-nom-04, A-nom-17 ; « outil qui travaille sur des données géographiques » → A-nom-11 ; « son éditeur, Safe Software » → A-nom-04 ; traduction de « feature » → terminologie décidée (porte Q3).

## Écran

- `Trois lettres, trois mots.`
- `FME`
- `Nom d'origine`
- `Feature Manipulation Engine`
- `Entité géographique`
- `Manipulation`
- `Moteur`

## Narration

Trois lettres désignent un outil qui travaille sur des données géographiques : FME. Chaque lettre cache un mot.

À l'origine, ces lettres voulaient dire Feature Manipulation Engine. Aujourd'hui, son éditeur, Safe Software, ne garde que les trois lettres.

Le premier mot se traduit par entité géographique. Le deuxième reste le même en français : manipulation. Le troisième se traduit par moteur.

Lu dans l'ordre, ce nom d'origine décrit le métier de l'outil : un moteur qui manipule des entités géographiques. Ces trois mots disent à quoi sert l'outil, avant même de l'ouvrir.

# S02 · Ce qu'est une entité

## Intention

Faire voir qu'une entité géographique est plus qu'un dessin : une chose du monde réel gardée dans des données, avec trois parties.

## Mise en scène

- **Objet étudié** : non (la voix parle de l'entité géographique, pas de l'outil) ; aucun nom ni image de l'outil.
- **Accroche** (idée reçue) : dès la première seconde, un fond de carte au trait (îlot, rues) et, dessus, le contour d'un bâtiment seul, à l'encre ; rien d'autre.
- **Écran** : à gauche, le bâtiment du monde réel dessiné en élévation simple (un bâtiment, pas une maison de la vie courante) ; à droite, la feuille « Entité géographique » à bandeau titré, reliée au bâtiment par un trait qui part du bâtiment ; dans la feuille, trois rubriques lisibles, rangée par rangée : « Géométrie » (le contour du bâtiment dessiné en surface, à côté trois petits signes au trait : un point, une ligne, une surface), « Attributs » (la ligne « usage du bâtiment »), « Système de coordonnées » (une petite croix de repère accrochée au contour). Vert pour le terme nouveau « Entité géographique » au moment où il se nomme.
- **Mouvement** : le titre se tape sur « semble n'être qu'un contour dessiné » ; le bâtiment en élévation et le trait vers la feuille sur « une chose du monde réel » ; le bandeau « Entité géographique » sur « l'entité géographique » ; puis chaque rubrique se déroule sur son mot : « sa géométrie » (le contour passe de la carte dans la rubrique, mouvement géométrique), « points, de lignes ou de surfaces » (les trois signes), « ses attributs », « son système de coordonnées » ; une seule mise en évidence à la fois, sur la rubrique dite. État final : la feuille entière, le bâtiment à gauche.
- **Affirmations** : abstraction d'une chose du monde réel → A-nom-16 ; géométrie, information de position, points, lignes, surfaces → A-nom-06 ; attributs, ce qui décrit l'entité → A-nom-07 ; système de coordonnées et position sur la Terre → A-nom-08. L'exemple du bâtiment et de son usage est un exemple d'illustration choisi par le scénariste, sans source (voir `# Points ouverts`).

## Écran

- `Plus qu'un contour dessiné.`
- `Entité géographique`
- `Géométrie : points, lignes, surfaces`
- `Attributs : usage du bâtiment`
- `Système de coordonnées`

## Narration

Sur une carte, un bâtiment semble n'être qu'un contour dessiné.

Les normes de l'information géographique y voient davantage : une chose du monde réel, gardée dans des données sous une forme simplifiée. Elles appellent cette abstraction l'entité géographique.

Dans FME, une entité réunit trois parties. D'abord sa géométrie : son information de position, faite de points, de lignes ou de surfaces. Pour le bâtiment, le contour est une surface.

Ensuite ses attributs : ce qui la décrit, par exemple l'usage du bâtiment. Enfin son système de coordonnées, qui lui donne sa position sur la Terre.

Devant une donnée géographique, ce sont ces trois parties qu'il faut chercher.

# S03 · Où passe la conduite

## Intention

Faire reconnaître, sur une donnée reçue, quelle partie d'une entité géographique la situe sur la Terre : la géométrie, lue avec son système de coordonnées.

## Mise en scène

- **Objet étudié** : non.
- **Accroche** : l'exercice est sa propre accroche (REGLES 2.8).
- **Écran** : une feuille « Entité géographique » au bandeau titré « Conduite d'eau », avec ses trois rubriques lisibles : « Géométrie » (une ligne de tracé au trait), « Attributs » (une ligne de description), « Système de coordonnées » (le nom du système, en petites capitales). La question et les trois choix à droite. Aucune carte de fond : la feuille seule, puisque la question porte sur ce qui situe la conduite.
- **Mouvement** : la feuille se déroule rangée par rangée sur « une conduite d'eau » ; question et choix après la consigne. Après la validation, la conséquence du choix s'écrit ; puis, sur la narration déclenchée, la rubrique « Géométrie » et la rubrique « Système de coordonnées » se relient par une accolade cyan (lien, retour d'information) sur « deux de ses parties à la fois ». État final : la feuille, l'accolade, le choix et sa conséquence.
- **Affirmations** : géométrie, information de position → A-nom-06 ; système de coordonnées, position sur la Terre → A-nom-08 ; attributs qui décrivent → A-nom-07. La conduite d'eau est un exemple d'illustration choisi par le scénariste, sans source (voir `# Points ouverts`).
- Mode conséquence, sans verdict (brief) : pas de ligne « Attendu ».

## Écran

- `Conduite d'eau`

## Narration d'entrée

Sur un projet, une équipe reçoit une conduite d'eau sous forme d'entité géographique. Elle a une ligne pour son tracé, des attributs et un système de coordonnées.

L'équipe doit savoir où passe la conduite sur la Terre. Choisissez la partie de l'entité qui le lui dit.

## Exercice

Question : `Où l'équipe lit-elle la position de la conduite sur la Terre ?`
- a · `Dans la ligne du tracé, seule` → `La ligne porte l'information de position de la conduite. C'est son système de coordonnées qui situe cette position sur la Terre.`
- b · `Dans les attributs de la conduite` → `Les attributs décrivent la conduite. L'information de position est dans la géométrie, et le système de coordonnées la situe sur la Terre.`
- c · `Dans la ligne, avec son système de coordonnées` → `La ligne porte l'information de position, et le système de coordonnées la situe sur la Terre : l'équipe sait où passe la conduite.`

## Narration déclenchée

Ce qui reste : la position d'une entité se lit dans deux de ses parties à la fois. La géométrie la porte, le système de coordonnées la rattache à la Terre.

# S04 · Lire, manipuler, écrire

## Intention

Montrer le deuxième mot du nom en geste : ce que FME fait d'une entité entre un format de départ et un format d'arrivée.

## Mise en scène

- **Objet étudié** : oui (la voix parle de ce que fait FME) ; l'outil se montre par son travail, sans fenêtre ni capture.
- **Accroche** (enjeu sur le projet) : dès la première seconde, à gauche une feuille « Données source », à droite une feuille « Données de destination » ; entre les deux, l'espace vide marqué en or (le manque).
- **Écran** : de gauche à droite, la feuille « Données source », une flèche « Lire », le bloc « Outils de transformation » dans l'espace qui était vide, une flèche « Écrire », la feuille « Données de destination ». Une petite carte d'entité fait le trajet de gauche à droite : le contour d'un bâtiment et deux rubriques lisibles, « Attributs de format » et « Attributs utilisateur ».
- **Mouvement** : les deux feuilles et le manque or dès la première image ; la flèche « Lire » se trace sur « lire les données source », la carte d'entité sort de la feuille source et sa rubrique « Attributs de format » s'écrit sur « attributs propres au format de départ » ; le bloc « Outils de transformation » se dessine dans le manque sur « outils de transformation » et la carte y entre ; la flèche « Écrire » et la carte qui rejoint la feuille de destination sur « écrire les données de destination » ; la rubrique « Attributs de format » s'efface par balayage et se récrit sur « un second jeu d'attributs », tandis que « Attributs utilisateur » ne bouge pas ; mise en évidence de la rubrique « Attributs utilisateur » sur « donnés par l'utilisateur ». État final : la chaîne complète, la carte arrivée dans la feuille de destination.
- **Affirmations** : lire les données source, ranger l'information des entités dans des attributs de format, écrire les données de destination avec un second jeu d'attributs de format → A-nom-09 ; outils de transformation qui manipulent géométrie et attributs → A-nom-11 ; attributs de l'utilisateur attachés à l'entité quel que soit le format → A-nom-07. L'ordre lire, transformer, écrire suit la synthèse du pack (source-pack.md § 3 et § 9).

## Écran

- `D'un format à l'autre.`
- `Données source`
- `Lire`
- `Attributs de format`
- `Outils de transformation`
- `Écrire`
- `Données de destination`
- `Attributs utilisateur`

## Narration

Une entité géographique arrive dans un format de données, et sa destination en attend un autre.

Selon sa documentation, FME commence par lire les données source. Il range l'information de chaque entité dans des attributs propres au format de départ.

Ses outils de transformation manipulent ensuite la géométrie et les attributs : c'est le deuxième mot du nom.

Il reste à écrire les données de destination. FME crée alors un second jeu d'attributs, propres au format d'arrivée.

Les attributs donnés par l'utilisateur, eux, restent attachés à l'entité, quel que soit le format qui les stocke. L'équipe qui reçoit retrouve ainsi ce qui décrit l'objet.

# S05 · Un moteur au centre

## Intention

Faire comprendre le troisième mot : FME est le moteur placé au centre des formats, qui relie chacun à tous les autres.

## Mise en scène

- **Objet étudié** : oui (la voix parle de FME comme moteur) ; le moteur se dessine comme un bloc central, sans logo ni capture.
- **Accroche** (figure incomplète) : dès la première seconde, une couronne de feuilles de format au tireté (formats génériques : aucun nom de format, ils viennent dans la leçon suivante), avec au centre une place vide marquée en or.
- **Écran** : la couronne et son étiquette de groupe « Formats pris en charge » ; au centre, le bloc « Moteur » ; des liaisons qui partent d'une feuille, entrent dans le moteur et en ressortent vers toutes les autres ; à côté du moteur, une petite pile de feuilles « Espaces de travail » qui entre dans le bloc. D'après la figure « What is FME » de la documentation de Safe Software, redessinée (pack, VIS-01).
- **Mouvement** : couronne et place or dès la première image ; « Formats pris en charge » sur « large éventail de formats » ; le bloc « Moteur » se dessine dans la place vide sur « au centre de ces formats, comme un moteur » ; une liaison entre d'une feuille sur « se lisent depuis n'importe quel format », puis les liaisons sortantes se tracent vers toutes les autres sur « s'écrivent vers n'importe quel autre » ; la pile « Espaces de travail » sur « il exécute des espaces de travail ». Une seule mise en évidence : le moteur, sur « le troisième mot du nom ». État final : l'étoile complète, la pile accrochée au moteur.
- **Affirmations** : moteur central au milieu d'un large éventail de formats, lu depuis n'importe lequel et écrit vers n'importe quel autre → A-nom-13 ; composant qui traite les travaux demandés en exécutant des espaces de travail → A-nom-12. « Qu'une prochaine leçon apprend à construire » : cadrage (L03) ; c'est l'unique annonce de la suite hors du pont (REGLES 2.6).

## Écran

- `Un moteur au centre.`
- `Formats pris en charge`
- `Moteur`
- `Espaces de travail`

## Narration

Un large éventail de formats entoure FME, et rien ne dit encore comment ils se rejoignent.

Safe Software place FME au centre de ces formats, comme un moteur. Les données se lisent depuis n'importe quel format, et s'écrivent vers n'importe quel autre.

C'est le troisième mot du nom : dans le vocabulaire de FME, il désigne le composant qui traite chaque travail demandé. Pour cela, il exécute des espaces de travail, qu'une prochaine leçon apprend à construire.

Pour une équipe, un format pris en charge rejoint ainsi tous les autres par le même centre.

# S06 · Un nom venu d'un format

## Intention

Dire qui a créé FME, quand, et pour quel problème de départ, en partant du nom de l'éditeur.

## Mise en scène

- **Objet étudié** : oui à la fin (« la première version de FME ») ; avant, la voix parle du projet et de l'éditeur.
- **Accroche** (idée reçue) : dès la première seconde, le nom « Safe Software » en grand, et sous « Safe » sa lecture « Sûr », reliée par une ligne de repère ; sur « Il vient pourtant d'un format », cette ligne de repère se barre d'un trait rouge (idée reçue barrée) : le mot « sûr » reste juste, c'est l'origine du nom qui est ailleurs.
- **Écran**, deux états :
  1. le projet de départ : un cadre « Colombie-Britannique » (cadre de projet en magenta) ; dedans, deux cartes de rôle nommées, « Entreprises forestières » et « Gouvernement provincial », reliées par une liaison à double sens ; sur la liaison, la feuille du format « SAIF » ; sous le gouvernement, une carte de rôle « Don Murray · Dale Lutz » (silhouettes d'échelle, deux personnes) reliée au gouvernement par le contrat ;
  2. la frise : le projet se réduit avec son texte en tête de frise ; puis trois jalons sur la frise, « Fondation · 1993 », « Première version de FME · 1996 », « Siège : Surrey ».
- **Mouvement** : le nom et « Sûr » dès la première image, le trait rouge sur la ligne de repère sur « pourtant d'un format » ; le cadre et les deux cartes sur « les entreprises forestières et le gouvernement provincial » ; la carte des fondateurs et le contrat sur « remportent le contrat » ; la feuille « SAIF » sur la liaison sur « Le format du projet s'appelle SAIF » ; une liaison se trace de la feuille « SAIF » au mot « Safe » du nom, réduit en haut de la scène, sur « Ce sigle se prononce safe » ; la frise et ses jalons, chacun sur sa phrase (« fondée en 1993 », « en 1996 », « son siège à Surrey »). Une seule mise en évidence à la fois. État final : la frise et ses trois jalons, le projet réduit en tête.
- **Affirmations** : projet d'échange de données géographiques forestières entre entreprises forestières et gouvernement provincial, début des années 1990 → A-origines-20 ; contrat du gouvernement de la Colombie-Britannique remporté sur appel d'offres → A-origines-15 ; fondateurs → A-origines-02 ; SAIF, norme canadienne d'échange de données géographiques, prononcée « safe », format du projet de départ → A-origines-17, A-origines-07 ; nom de l'entreprise venu de SAIF → A-origines-07 ; fondée en 1993 → A-origines-14 ; première version de FME en 1996, trois ans après → A-origines-22 ; siège à Surrey → A-sig-07. « Le mot anglais qui veut dire sûr » : traduction du mot, pas une affirmation du pack (voir `# Points ouverts`).

## Écran

- `Un nom venu d'un format.`
- `Safe Software`
- `Sûr`
- `Colombie-Britannique`
- `Entreprises forestières`
- `Gouvernement provincial`
- `Don Murray · Dale Lutz`
- `SAIF`
- `Fondation · 1993`
- `Première version de FME · 1996`
- `Siège : Surrey`

## Narration

Le nom Safe Software commence par un mot anglais qui veut dire sûr. Il vient pourtant d'un format de données.

Au début des années 1990, en Colombie-Britannique, un projet porte sur l'échange de données géographiques forestières. Il relie les entreprises forestières et le gouvernement provincial.

Ce gouvernement lance un appel d'offres, et Don Murray et Dale Lutz remportent le contrat.

Le format du projet s'appelle SAIF : une norme canadienne d'échange de données géographiques. Ce sigle se prononce safe. Les deux associés en tirent le nom de leur entreprise, fondée en 1993.

Trois ans plus tard, en 1996, sort la première version de FME. Aujourd'hui, l'éditeur a son siège à Surrey, dans la même province.

Dès le départ, le métier de l'éditeur est donc l'échange de données géographiques.

# S07 · La suite : formats et coordonnées

## Intention

Ouvrir la leçon suivante par la question qu'elle traite, sans résumer celle-ci.

## Mise en scène

- **Objet étudié** : non.
- **Écran** : le titre ; deux feuilles côte à côte, chacune au bandeau titré par sa question, en vrais mots : « Ce que contient un format » et « Comment un système de coordonnées situe une entité » ; un accrochage or sur chaque bandeau (question ouverte, que la leçon suivante traite). Aucune rubrique vide.
- **Mouvement** : le titre sur « deux mots restés sans détail » ; la première feuille sur « ce que contient un format », la seconde sur « comment un système de coordonnées » ; sur la dernière phrase, une seule mise en évidence passe d'une feuille à l'autre (« stockée dans un format », puis « porte un système de coordonnées »). État final : les deux feuilles.
- **Affirmations** : toute entité traitée par FME a un système de coordonnées → A-nom-08 ; les attributs stockés dans un format, quel qu'il soit → A-nom-07 ; contenu de la leçon suivante → cadrage (L02).

## Écran

- `Deux questions pour la suite.`
- `Ce que contient un format`
- `Comment un système de coordonnées situe une entité`

## Narration

La leçon suivante reprend deux mots restés sans détail ici : le format et le système de coordonnées.

Elle part d'une question en deux temps : ce que contient un format, et comment un système de coordonnées situe une entité.

Toute entité que traite FME est stockée dans un format, et porte un système de coordonnées.

# Points ouverts

| Point | Proposition |
|---|---|
| Exemples d'illustration sans source : le bâtiment et son usage (S02), la conduite d'eau reçue par une équipe (S03) | Les conventions BIMaccess (§ 0.3) demandent un exemple tiré d'un projet de construction, et le pack n'en donne aucun. Ces deux objets n'affirment aucun fait : ils appliquent A-nom-06 à A-nom-08. À confirmer par Ilyas, ou à remplacer par l'objet qu'il choisit. |
| Noms des fondateurs dits à la voix et montrés en carte de rôle (S06) | REGLES § 3.2 demande des fonctions plutôt que des noms, mais l'objectif 2 du brief demande « qui a créé FME » et A-origines-02 est dans la remise. Proposition : garder les deux noms une fois ; repli si Ilyas préfère : « deux associés remportent le contrat », sans noms. |
| « Le mot anglais qui veut dire sûr » (S06) | Traduction d'un mot courant, pas une affirmation du pack ; elle sert l'accroche (idée reçue). À confirmer par Ilyas. |
| Développement de SAIF (Spatial Archive and Interchange Format) | Dans la remise (A-origines-17), mais en anglais ; gardé au tableau Vocabulaire pour la version anglaise, ni dit ni affiché (REGLES § 3.5). Ilyas peut demander de l'afficher. |
| « Une entité réunit trois parties » (S02) | Synthèse de A-nom-06, A-nom-07 et A-nom-08 faite par le pack (source-pack.md § 3) ; aucune page de l'éditeur ne le dit en une phrase (pack § 7, « Feature en une phrase »). Les entités sans géométrie (A-nom-06) restent hors contenu pour garder l'idée simple ; Ilyas peut demander de les nommer en une phrase. |
| « Un format pris en charge rejoint ainsi tous les autres » (S05) et « l'équipe qui reçoit retrouve ce qui décrit l'objet » (S04) | Conséquences pour le professionnel (REGLES § 3.4) tirées de A-nom-13 et A-nom-07, non dites telles quelles par les sources. À confirmer. |
| Durée | 5:15 au budget (voix à 150 mots par minute, choix de S03 compris), sous la fourchette basse du brief (6 à 8 minutes) ; la leçon jouée approche 6 minutes. La remise ne porte pas plus de matière ; rallonger demanderait d'ouvrir des affirmations en attente (par exemple A-origines-03, parcours des fondateurs, porte Q8). |
| Prononciation (rôle voix) | « Feature Manipulation Engine » à l'anglaise ; « FME » lettre par lettre ; « SAIF » se dit « safe » (la phrase repose sur cette homophonie) ; « Safe Software », « Surrey », « Don Murray », « Dale Lutz » à l'anglaise. |
| Version anglaise | Le français est la langue source ; la traduction de chaque texte sera une proposition, à relire par Ilyas. |

# Test du débutant

Non fait dans ce rôle : il demande un lecteur neuf, sans aucun fichier du projet, à qui l'on donne une seule fois, dans l'ordre, la narration et les textes à l'écran (conventions BIMaccess § 0), et ce rôle ne peut pas lancer un autre agent. À faire par le Super Agent avant la voix ; réponses à recopier ici mot pour mot : l'idée dite avec ses mots, les mots non compris, ce qu'il a dû retenir, sa réponse à l'exercice de S03.
