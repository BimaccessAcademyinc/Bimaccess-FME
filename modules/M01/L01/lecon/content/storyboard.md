# L'idée

- **Objectifs du brief et ce que leurs verbes demandent** : 1. *expliquer* ce que désignent les trois mots du nom (comprendre une raison : pourquoi ce nom décrit l'outil) ; 2. *dire* qui a créé FME, quand, et pour quel problème de départ (savoir, en deux scènes courtes, sans liste à retenir) ; 3. *reconnaître*, devant une donnée géographique, les trois parties d'une entité géographique (identifier et nommer : c'est ce que l'exercice fait pratiquer, sur une donnée montrée).
- **L'idée en trois phrases** :

> FME portait à l'origine un nom qui décrit son travail : Feature Manipulation Engine, un moteur qui manipule des entités géographiques. Une entité géographique, c'est une chose du monde réel gardée dans des données, avec sa géométrie, ses attributs et son système de coordonnées. L'outil est né en Colombie-Britannique d'un projet d'échange de données forestières, et son éditeur, Safe Software, tient son nom du format de ce projet.

- **Ce qu'un débutant en a dit** : pas encore recueilli (voir `# Test du débutant`).

# Jauge

| Idée | Source | Poids | Difficulté | En pratique |
|---|---|---|---|---|
| FME voulait dire à l'origine Feature Manipulation Engine ; l'éditeur dit aujourd'hui FME | A-nom-04, A-nom-17 ; porte Q2 | fort | simple | Le professionnel du BIM qui découvre l'outil lit trois lettres opaques ; les trois mots lui disent à quoi il sert. Mal fait : on fait croire que l'éditeur a abandonné le nom d'origine, ce que ses sources ne disent pas |
| Une entité géographique est l'abstraction d'une chose du monde réel | A-nom-16 ; terminologie Q3 | fort | contre-intuitive | Le professionnel habitué aux plans voit un contour dessiné là où les données portent un objet complet. Mal compris : on échange des dessins en croyant échanger des objets |
| Une entité a une géométrie (information de position : points, lignes, surfaces), des attributs, un système de coordonnées | A-nom-06, A-nom-07, A-nom-08 | fort | mal comprise | Devant une donnée reçue, c'est ce qu'on cherche. Mal compris : on croit que le tracé seul situe l'objet sur la Terre |
| La position sur la Terre se lit dans la géométrie, rattachée par le système de coordonnées | A-nom-06, A-nom-08 | fort | mal comprise | L'équipe qui reçoit une conduite doit savoir où elle passe ; l'exercice fait chercher cette partie sur la donnée |
| FME lit les données source, ses outils de transformation manipulent géométrie et attributs, puis il écrit les données de destination | A-nom-09 (lecture et écriture), A-nom-11 | moyen | simple | C'est le deuxième mot du nom en geste : ce qui arrive à une entité entre un format de départ et le format attendu |
| Safe Software décrit FME comme un moteur central au milieu d'un large éventail de formats : lu depuis n'importe lequel, écrit vers n'importe quel autre | A-nom-13 ; VIS-01 | fort | simple | Une équipe passe de n'importe quel format pris en charge à n'importe quel autre |
| Le moteur, dans le glossaire de FME, est le composant qui traite les demandes de travaux | A-nom-12 | faible | simple | Dit en mots de données (« chaque traitement demandé ») : « demandes de travaux » se lirait comme un ordre de chantier |
| Au début des années 1990, un projet d'échange de données géographiques forestières entre les entreprises forestières et le gouvernement provincial de la Colombie-Britannique | A-origines-20 | fort | simple | Le problème de départ de l'outil est déjà un échange de données géographiques entre plusieurs parties |
| SAIF, norme canadienne d'échange de données géographiques prononcée « safe », donne son nom à Safe | A-origines-17, A-origines-07 | moyen | contre-intuitive | Le nom de l'éditeur se lit comme le mot anglais « sûr » : idée reçue qui sert d'accroche |
| Safe Software naît d'un contrat du gouvernement de la Colombie-Britannique, remporté sur appel d'offres par ses fondateurs, Don Murray et Dale Lutz | A-origines-15, A-origines-02 | moyen | évidente | Répond au « qui » de l'objectif 2 ; une phrase |
| Safe Software est fondée en 1993, FME sort en 1996 | A-origines-14, A-origines-22 ; porte Q1 | moyen | évidente | Deux dates imposées par Ilyas ; une phrase chacune, sur une frise |
| Siège à Surrey, en Colombie-Britannique | A-sig-07 | faible | évidente | « Safe Software en bref » : une mention, hors de la frise (la remise ne date pas le siège) |

Hors contenu :

- **Hors remise** (attend l'expert, ou contexte) : la date de constitution (A-origines-01), l'introduction de FME en 1993 selon la page actuelle (A-origines-09), la date de 1996 au jour près (A-origines-08), le parcours des fondateurs (A-origines-03), le ministère client et le suivi de l'exploitation forestière (A-origines-04), Surrey comme lieu de fondation (A-origines-21), les premiers travaux CAD vers SIG (A-origines-05), la nature et l'organisme de SAIF (A-origines-06, A-origines-18, A-origines-19), la boîte à outils SAIF (A-origines-16), le problème des données éparpillées et le choix du gouvernement d'inventer un format (A-sig-01, A-sig-02), les noms des produits actuels et l'effectif (A-nom-05, A-sig-06, A-sig-08), le nombre de formats et d'intégrations (A-sig-03, A-sig-04), les étapes de 1997 (A-origines-10, A-origines-11), Esri (A-sig-05, A-origines-12, porte Q6), les normes nommées (A-nom-01, A-nom-03), les exemples du glossaire du W3C (A-nom-02), les readers, writers et transformers (A-nom-10), la ligne de commande et Workbench (A-nom-14), la date du siège (A-origines-13).
- **Écarté par choix** : les entités sans géométrie (A-nom-06, seconde moitié), qui brouilleraient l'idée des trois parties à la première rencontre ; les attributs de format et leur second jeu (A-nom-09) et les attributs utilisateur (A-nom-07), qui demandent deux sens du mot « attribut » deux scènes après sa définition ; les espaces de travail (A-nom-12, seconde moitié), qui s'apprennent en L03 ; le nom de l'outil FME Workbench (A-nom-11), remplacé par « les outils de transformation ».
- **Leçons voisines** (brief) : formats et systèmes de coordonnées en détail (L02), construire un espace de travail (L03), usages SIG détaillés (L04), FME Flow et l'automatisation, le BIM vers SIG (L05).

# Objectifs

- **Savoir-faire** : expliquer ce que désignent les trois mots du nom d'origine de FME (S01, S02, S04, S05) ; dire qui a créé FME, quand, et pour quel problème de départ (S06, S07) ; reconnaître, sur une donnée géographique, la géométrie, les attributs et le système de coordonnées d'une entité, et lesquelles de ces parties la situent sur la Terre (S02, S03).
- **Point central** : le nom d'origine de FME décrit son travail : un moteur qui manipule des entités géographiques, chacune faite d'une géométrie, d'attributs et d'un système de coordonnées.
- **Déjà connu du public** : plans, modèles, cartouches et échanges de fichiers sur un projet de construction ; ni FME ni le SIG.
- **Vocabulaire introduit** :

| Terme (voix et écran) | Anglais, pour la version anglaise | Scène |
|---|---|---|
| entité géographique | feature (montré et dit une fois, dans le nom d'origine) | S01, défini en S02 |
| géométrie, attributs, système de coordonnées | geometry, attributes, coordinate system | S02 (une seule figure, REGLES 2.3) |
| outils de transformation | transformers | S04 |
| moteur | engine | S01, défini en S05 |
| SAIF | Spatial Archive and Interchange Format | S06 |

# Budget

Durées de voix estimées à 150 mots par minute ; S03 ajoute le temps du choix.

| Idée | Poids | Difficulté | Forme | Scène | Durée |
|---|---|---|---|---|---:|
| Le nom d'origine et ses trois mots | fort | simple | Ouverture | S01 | 0:35 |
| L'entité géographique et ses trois parties | fort | contre-intuitive | Exposé avec schéma | S02 | 0:45 |
| Reconnaître les parties sur une conduite d'eau | fort | mal comprise | Exercice | S03 | 1:15 |
| Lire, manipuler, écrire | moyen | simple | Geste fait devant la personne | S04 | 0:25 |
| Le moteur au centre des formats | fort | simple | Exposé avec schéma | S05 | 0:30 |
| Le projet forestier, SAIF et le nom Safe | fort | contre-intuitive | Exemple (le cas réel documenté) | S06 | 0:30 |
| Le contrat, les fondateurs, 1993, 1996, Surrey | moyen | évidente | Frise | S07 | 0:20 |
| Où vit une entité : la question de L02 | faible | simple | Pont | S08 | 0:15 |
| | | | | **Total** | **4:35** |

Lecture du budget : huit scènes courtes. L'entité géographique reçoit le plus de temps (S02 puis l'exercice S03), parce que c'est l'idée que le public confond le plus (un contour pris pour l'objet, le tracé pris pour la position sur la Terre). L'histoire tient en deux scènes : le projet et le format d'où vient le nom, puis l'entreprise et ses dates. Un seul exercice, juste après la notion qu'il pratique. Accroches, de scène en scène : un nom opaque, une idée reçue, l'exercice, deux formats qui ne s'accordent pas, une figure incomplète (le seul manque or avant le pont), une idée reçue, une frise ouverte, la question du pont. Environ 3:50 de voix ; avec l'écran « Lancer », les pauses de la voix et le temps du choix, la leçon jouée approche 5 minutes ; rien n'est ajouté pour remplir.

# S01 · Trois lettres, trois mots

## Intention

Faire lire le nom d'origine de FME comme une description de son travail : un moteur qui manipule des entités géographiques.

## Mise en scène

- **Objet étudié** : oui (la voix parle de FME, l'outil) ; l'outil se montre par son nom, jamais par une capture ni un logo de Safe Software.
- **Accroche** (un nom opaque) : dès la première seconde, les trois lettres « FME » en très grand, seules sur la page, à l'encre. Aucune case vide, aucun manque or : l'écart est le nom lui-même, qui ne dit rien.
- **Écran** : le titre ; les trois lettres ; l'étiquette « Nom d'origine » ; chaque lettre se prolonge en son mot anglais, posé sous elle ; sous chaque mot anglais, sa traduction française, accrochée par une ligne de repère (point, oblique, palier) ; vert pour « Entité géographique », le terme nouveau.
- **Mouvement** : titre et lettres sur « Trois lettres désignent » ; « Nom d'origine » puis le nom d'origine se tape à partir des lettres sur « Feature Manipulation Engine » ; les traductions se tracent une à une sur « par entité géographique », « en français : manipulation », « par moteur » ; sur la dernière phrase, une seule mise en évidence passe de « Moteur » sur « un moteur qui » à « Manipulation » sur « qui manipule » puis à « Entité géographique » sur « des entités géographiques », dans l'ordre où la voix les dit. État final : les lettres, le nom d'origine et ses trois traductions.
- **Affirmations** : nom d'origine, « selon la documentation de l'éditeur », et nom actuel → A-nom-04, A-nom-17 (l'éditeur dit aujourd'hui FME ; rien ne dit qu'il a abandonné le nom d'origine) ; « outil qui travaille sur des données géographiques » → A-nom-11 ; traduction de « feature » → terminologie décidée (porte Q3).
- **Pour la voix** : seul passage en anglais de la leçon, une fois : « Feature Manipulation Engine », à l'anglaise.

## Écran

- `Trois lettres, trois mots.`
- `FME`
- `Nom d'origine`
- `Feature Manipulation Engine`
- `Entité géographique`
- `Manipulation`
- `Moteur`

## Narration

Trois lettres désignent un outil qui travaille sur des données géographiques : FME. Prises seules, elles ne disent rien de son métier.

Selon la documentation de l'éditeur, leur nom d'origine est Feature Manipulation Engine. Aujourd'hui, l'éditeur, Safe Software, dit simplement FME.

Le premier mot se traduit par entité géographique. Le deuxième reste le même en français : manipulation. Le troisième se traduit par moteur.

Ces trois mots décrivent le métier de l'outil : un moteur qui manipule des entités géographiques. Ils disent à quoi sert l'outil avant même de l'ouvrir.

# S02 · Ce qu'est une entité

## Intention

Faire voir qu'une entité géographique est plus qu'un dessin : une chose du monde réel gardée dans des données, avec trois parties.

## Mise en scène

- **Objet étudié** : non (la voix parle de l'entité géographique, pas de l'outil) ; aucun nom ni image de l'outil.
- **Accroche** (idée reçue) : dès la première seconde, un fond de carte au trait (îlot, rues) et, dessus, le contour d'un bâtiment seul, à l'encre ; rien d'autre.
- **Écran** : à gauche, le bâtiment du monde réel dessiné en élévation simple ; à droite, la feuille « Entité géographique » à bandeau titré, reliée au bâtiment par un trait qui part du bâtiment ; dans la feuille, trois rubriques lisibles, rangée par rangée : « Géométrie » (le contour du bâtiment en surface, à côté trois petits signes au trait : un point, une ligne, une surface), « Attributs » (la ligne « Usage : bureaux »), « Système de coordonnées » (un petit globe au trait où le contour se pose). Vert pour le terme nouveau « Entité géographique » au moment où il se nomme.
- **Mouvement** : le titre se tape sur « semble n'être qu'un contour dessiné » ; le bâtiment en élévation et le trait vers la feuille sur « une chose du monde réel » ; le bandeau « Entité géographique » sur « le premier mot du nom » ; puis chaque rubrique se déroule sur son mot : « D'abord sa géométrie » (le contour passe de la carte dans la rubrique, mouvement géométrique), « points, de lignes ou de surfaces » (les trois signes), « Ensuite ses attributs » puis « des bureaux », « Enfin son système de coordonnées » (le contour se pose sur le globe) ; une seule mise en évidence à la fois, sur la rubrique dite. État final : la feuille entière, le bâtiment à gauche.
- **Affirmations** : abstraction d'une chose du monde réel, attribuée aux normes → A-nom-16 (le terme français « entité géographique » est rattaché au premier mot du nom, décision Q3, pas aux normes) ; géométrie, information de position, points, lignes, surfaces → A-nom-06 ; attributs qui décrivent l'entité → A-nom-07 ; système de coordonnées et position sur la Terre → A-nom-08. Le bâtiment et son usage sont un exemple d'illustration, sans valeur de fait (voir `# Points ouverts`).

## Écran

- `Plus qu'un contour dessiné.`
- `Entité géographique`
- `Géométrie : points, lignes, surfaces`
- `Attributs`
- `Usage : bureaux`
- `Système de coordonnées`

## Narration

Sur une carte, un bâtiment semble n'être qu'un contour dessiné.

Les normes de l'information géographique y voient davantage : l'abstraction d'une chose du monde réel, ce que les données en retiennent. C'est ce que désigne le premier mot du nom : l'entité géographique.

Dans FME, une entité porte trois parties. D'abord sa géométrie : son information de position, faite de points, de lignes ou de surfaces. Pour ce bâtiment, le contour est une surface.

Ensuite ses attributs, qui la décrivent : ici, l'usage, des bureaux. Enfin son système de coordonnées, qui lui donne sa position sur la Terre.

Devant une donnée géographique, ce sont ces trois parties qu'il faut chercher.

# S03 · Où passe la conduite

## Intention

Faire reconnaître, sur une donnée montrée dont les parties ne portent pas leur nom, la géométrie, les attributs et le système de coordonnées d'une entité, et voir lesquelles la situent sur la Terre.

## Mise en scène

- **Objet étudié** : non.
- **Accroche** : l'exercice est sa propre accroche (REGLES 2.8).
- **Écran** : une feuille de donnée au bandeau titré « Conduite d'eau », dessinée comme une feuille de plan, avec trois zones **sans titre de rubrique** : le cadre principal, où le tracé de la conduite est une ligne au trait ; un petit tableau de deux lignes, « Usage : eau potable » et « Matériau : fonte » ; un cartouche en bas à droite de la feuille, titré « Repère », qui porte un petit globe au trait avec un point posé dessus (le même dessin que le globe de S02, sans nom de système : la remise n'en donne aucun et les systèmes de coordonnées sont la matière de L02). La question et les trois choix à droite. Aucune carte de fond.
- **Mouvement** : la feuille se déroule zone par zone sur « une conduite d'eau » (cadre et tracé, tableau, cartouche) ; question et choix après la consigne. Après la validation, la conséquence du choix s'écrit ; puis, sur la narration déclenchée, chaque zone reçoit son nom de partie, une à la fois, dans un trait de repère : « Géométrie » sur « le tracé est la géométrie », « Attributs » sur « sont ses attributs », « Système de coordonnées » sur « le repère du cartouche » ; enfin le tracé et le cartouche se relient par une accolade cyan sur « se lit donc dans deux parties ». Une seule mise en évidence à la fois. État final : la feuille et ses trois noms, l'accolade, le choix et sa conséquence.
- **Choix** : chacun désigne une zone par ce qu'elle montre (le tracé, l'usage et le matériau, le repère), jamais par le nom de sa partie ni par « sans » ou « avec » ; c'est à la personne de reconnaître de quelle partie il s'agit. Le piège attendu est le tracé : il montre où va la conduite, mais seul il ne la rattache pas à la Terre.
- **Affirmations** : géométrie, information de position → A-nom-06 ; attributs qui décrivent → A-nom-07 ; système de coordonnées, position sur la Terre → A-nom-08. La conduite d'eau, son usage, son matériau et le cartouche sont un exemple d'illustration choisi par le scénariste, sans valeur de fait (voir `# Points ouverts`).
- Mode conséquence, sans verdict (brief) : pas de ligne « Attendu ».

## Écran

- `Conduite d'eau`
- `Usage : eau potable`
- `Matériau : fonte`
- `Repère`
- `Géométrie`
- `Attributs`
- `Système de coordonnées`

## Narration d'entrée

Sur un projet, une équipe reçoit une conduite d'eau sous forme d'entité géographique. Elle doit savoir où la conduite passe sur la Terre.

Choisissez, sur la donnée reçue, la partie qui le lui dit.

## Exercice

Question : `Quelle partie de cette donnée situe la conduite sur la Terre ?`
- a · `Le tracé de la conduite` → `Le tracé est la géométrie : il porte l'information de position de la conduite. Seul, il ne dit pas où cette position se trouve sur la Terre.`
- b · `L'usage et le matériau` → `L'usage et le matériau sont des attributs : ils décrivent la conduite. L'équipe sait ce qu'elle reçoit, pas encore où la conduite passe.`
- c · `Le repère du cartouche` → `Le repère est le système de coordonnées : il rattache l'entité à la Terre. Il situe le tracé, qui porte l'information de position.`

## Narration déclenchée

Sur cette donnée, le tracé est la géométrie de la conduite. L'usage et le matériau sont ses attributs, le repère du cartouche son système de coordonnées.

La position de la conduite se lit donc dans deux parties. La géométrie la porte, le système de coordonnées la rattache à la Terre.

# S04 · Lire, manipuler, écrire

## Intention

Montrer le deuxième mot du nom en geste : ce que FME fait d'une entité entre un format de départ et le format attendu.

## Mise en scène

- **Objet étudié** : oui (la voix parle de ce que fait FME) ; l'outil se montre par son travail, sans fenêtre ni capture.
- **Accroche** (deux pièces qui ne s'accordent pas) : dès la première seconde, à gauche une feuille au bandeau « Format de départ », qui contient une petite carte d'entité (le contour d'un bâtiment et sa ligne d'attribut) ; à droite une feuille au bandeau « Format attendu », d'un autre dessin (autre bordure, autre trame) ; les deux feuilles se font face, rien entre elles : aucune case réservée, aucun manque or.
- **Écran** : de gauche à droite, la feuille « Format de départ », une flèche « Lire », le bloc « Outils de transformation », une flèche « Écrire », la feuille « Format attendu ». La carte d'entité fait le trajet de gauche à droite (mouvement géométrique, pas une désignation).
- **Mouvement** : les deux feuilles dès la première image ; la flèche « Lire » se trace sur « commence par lire » et la carte en sort ; le bloc « Outils de transformation » se dessine sur « Ses outils de transformation » et la carte y entre ; mise en évidence du contour de la carte sur « la géométrie », puis de sa ligne d'attribut sur « et les attributs » ; la flèche « Écrire » se trace et la carte rejoint la feuille « Format attendu » sur « Il reste à écrire », où elle prend la trame de cette feuille. État final : la chaîne complète, la carte arrivée dans la feuille de droite.
- **Affirmations** : lire les données source, écrire les données de destination → A-nom-09, « selon sa documentation » ; outils de transformation qui servent à manipuler géométrie et attributs → A-nom-11, « d'après l'éditeur » ; format de départ et format attendu → A-nom-13 (lu depuis un format, écrit vers un autre). Les attributs de format, leur second jeu et les attributs utilisateur sont retirés (voir `# Jauge`, « Écarté par choix »).

## Écran

- `D'un format à l'autre.`
- `Format de départ`
- `Format attendu`
- `Lire`
- `Outils de transformation`
- `Écrire`

## Narration

Une entité géographique arrive dans un format de départ, et l'équipe qui la reçoit en attend un autre.

Selon sa documentation, FME commence par lire les données source.

Ses outils de transformation servent ensuite, d'après l'éditeur, à manipuler la géométrie et les attributs : c'est le deuxième mot du nom.

Il reste à écrire les données de destination, dans le format attendu.

# S05 · Un moteur au centre

## Intention

Faire comprendre le troisième mot : Safe Software décrit FME comme le moteur central au milieu des formats, qui relie chacun à tous les autres.

## Mise en scène

- **Objet étudié** : oui (la voix parle de FME comme moteur) ; le moteur se dessine comme un bloc central, sans logo ni capture.
- **Accroche** (figure incomplète) : dès la première seconde, une couronne de feuilles de format au tireté (formats génériques : aucun nom de format, ils viennent en L02), et une seule liaison qui part d'une feuille vers le centre et s'arrête sur un manque marqué en or (REGLES 4.8). C'est le seul manque or avant le pont ; les scènes voisines n'en ont pas.
- **Écran** : la couronne et son étiquette de groupe « Formats pris en charge » ; au centre, le bloc « Moteur », où la liaison arrive ; des liaisons qui en ressortent vers toutes les autres feuilles. En bas, le crédit court « D'après Safe Software », cliquable, qui ouvre la référence de la page « What is FME » (REGLES 4.6). D'après la figure « What is FME » de la documentation de Safe Software, redessinée (pack, VIS-01).
- **Mouvement** : couronne, liaison arrêtée et manque or dès la première image ; « Formats pris en charge » sur « Un large éventail » ; le bloc « Moteur » se dessine au bout de la liaison, à la place du manque, sur « un moteur central », et le crédit se pose avec lui ; les liaisons sortantes se tracent vers toutes les autres feuilles sur « vers n'importe quel autre » ; une seule mise en évidence, le moteur, sur « le troisième mot du nom ». État final : l'étoile complète.
- **Affirmations** : moteur central au milieu d'un large éventail de formats, lu depuis n'importe lequel et écrit vers n'importe quel autre, « Safe Software décrit » → A-nom-13 ; composant qui traite les travaux demandés, « le glossaire de FME » → A-nom-12, dit en mots de données (« chaque traitement demandé ») plutôt que « demandes de travaux », qu'un public de chantier lirait comme un ordre de travail. Les deux sens restent attribués chacun à sa source.

## Écran

- `Un moteur au centre.`
- `Formats pris en charge`
- `Moteur`
- `D'après Safe Software`

## Narration

Un large éventail de formats pris en charge entoure FME. Rien ne les relie encore.

Safe Software décrit FME comme un moteur central au milieu de ces formats. Une équipe peut y lire ses données depuis n'importe quel format, et les écrire vers n'importe quel autre.

C'est le troisième mot du nom. Le glossaire de FME lui donne aussi un sens précis : le composant qui exécute chaque traitement demandé.

# S06 · Un nom venu d'un format

## Intention

Dire pour quel problème de départ FME est né, en partant du nom de son éditeur : un projet d'échange de données forestières et son format, SAIF.

## Mise en scène

- **Objet étudié** : non (la voix parle du projet et du nom de l'éditeur).
- **Accroche** (idée reçue) : dès la première seconde, le nom « Safe Software » en grand, et sous « Safe » sa traduction « Sûr », accrochée par une ligne de repère. Rien n'est barré, aucun rouge : la traduction est juste, et elle reste à l'écran ; ce que la scène montre, c'est d'où vient le nom.
- **Écran** : sous le nom, un cadre « Colombie-Britannique » (cadre de projet) ; dedans, deux cartes de rôle nommées, « Entreprises forestières » et « Gouvernement provincial », reliées par une liaison à double sens ; sur la liaison, la feuille du format « SAIF ». Puis une seconde ligne de repère part de la feuille « SAIF » et monte jusqu'au mot « Safe » du nom : la lecture « Sûr » et l'origine « SAIF » restent toutes deux accrochées au même mot.
- **Mouvement** : le nom et « Sûr » dès la première image ; le cadre « Colombie-Britannique » sur « Le projet de départ » ; les deux cartes et leur liaison sur « Il relie les entreprises forestières » ; la feuille « SAIF » sur la liaison sur « s'appelle SAIF » ; la ligne de repère de « SAIF » à « Safe » se trace sur « se prononce comme Safe ». Une seule mise en évidence à la fois. État final : le nom avec ses deux lignes de repère, le projet et son format.
- **Affirmations** : projet de départ, début des années 1990, échange de données géographiques forestières entre entreprises forestières et gouvernement provincial → A-origines-20 ; SAIF, norme canadienne d'échange de données géographiques, prononcée « safe », format du projet de départ → A-origines-17, A-origines-07 ; nom de l'entreprise venu de SAIF → A-origines-07 (la voix ne prête le geste à personne). « Un mot anglais qui veut dire sûr » : traduction d'un mot courant, pas une affirmation du pack (voir `# Points ouverts`). Le contrat et les fondateurs sont en S07, sans être soudés au projet forestier.
- **Pour la voix** : « SAIF » se dit « safe » ; la phrase « se prononce comme Safe » repose sur cette homophonie.

## Écran

- `Un nom venu d'un format.`
- `Safe Software`
- `Sûr`
- `Colombie-Britannique`
- `Entreprises forestières`
- `Gouvernement provincial`
- `SAIF`

## Narration

Le nom Safe Software commence par un mot anglais qui veut dire sûr. Il vient pourtant d'un format de données.

Le projet de départ, au début des années 1990 en Colombie-Britannique, porte sur l'échange de données géographiques forestières. Il relie les entreprises forestières et le gouvernement provincial.

Le format de ce projet s'appelle SAIF : une norme canadienne d'échange de données géographiques. Ce sigle se prononce comme Safe, et c'est de lui que l'entreprise tient son nom.

# S07 · D'un contrat à FME

## Intention

Dire qui a fondé l'éditeur de FME, et quand l'entreprise puis l'outil sont nés.

## Mise en scène

- **Objet étudié** : oui à la fin (« la première version de FME ») ; avant, la voix parle de l'entreprise.
- **Accroche** (frise ouverte) : dès la première seconde, une frise horizontale dont le bout droit reste ouvert (flèche du temps, sans jalon), et à son départ la feuille « Contrat du gouvernement de la Colombie-Britannique » à bandeau titré. Aucun manque or.
- **Écran** : la feuille du contrat avec sa rubrique « Appel d'offres remporté » ; sous elle, une carte de rôle « Fondateurs » à deux silhouettes d'échelle, nommée « Don Murray · Dale Lutz » ; sur la frise, deux jalons, « 1993 · Fondation de Safe Software » et « 1996 · Première version de FME » ; hors de la frise, à droite, une carte de lieu « Siège : Surrey », sans date (la remise ne date pas le siège).
- **Mouvement** : frise et feuille du contrat dès la première image ; la rubrique « Appel d'offres remporté » et la carte des fondateurs sur « sur appel d'offres » ; le jalon 1993 sur « fondée en 1993 » ; le jalon 1996 se pose sur « en 1996 » ; la carte de lieu sur « son siège est à Surrey ». Une seule mise en évidence à la fois. État final : la frise et ses deux jalons, le contrat au départ, la carte de lieu à part.
- **Affirmations** : contrat du gouvernement de la Colombie-Britannique remporté sur appel d'offres, d'où naît Safe Software → A-origines-15 ; fondateurs → A-origines-02 (la voix dit « fondateurs de Safe Software », pas « créateurs de FME » : la remise ne dit pas qui a conçu FME) ; fondée en 1993 → A-origines-14 ; première version de FME en 1996, trois ans après → A-origines-22 ; siège à Surrey → A-sig-07.
- **Pour la voix** : « Safe Software », « Don Murray », « Dale Lutz », « Surrey » à l'anglaise.

## Écran

- `D'un contrat à FME.`
- `Contrat du gouvernement de la Colombie-Britannique`
- `Appel d'offres remporté`
- `Fondateurs`
- `Don Murray · Dale Lutz`
- `1993 · Fondation de Safe Software`
- `1996 · Première version de FME`
- `Siège : Surrey`

## Narration

Safe Software naît d'un contrat du gouvernement de la Colombie-Britannique.

Ses fondateurs, Don Murray et Dale Lutz, remportent ce contrat sur appel d'offres. L'entreprise est fondée en 1993.

Trois ans plus tard, en 1996, sort la première version de FME. Aujourd'hui, son siège est à Surrey, dans la même province.

# S08 · Où vit une entité

## Intention

Poser la question de la leçon suivante : dans quel format et dans quel système de coordonnées vit une entité géographique.

## Mise en scène

- **Objet étudié** : non.
- **Écran** : au centre, une petite carte « Entité géographique » (un contour au trait, nouveau, qui ne reprend ni le bâtiment de S02 ni la conduite de S03) ; deux traits tiretés en partent et s'arrêtent chacun sur un manque or, le premier portant « Format », le second « Système de coordonnées » (REGLES 4.8 : rien ne leur répond encore, la leçon suivante y répond).
- **Mouvement** : la carte et ses deux traits arrêtés dès la première seconde de voix ; « Format » se pose sur « dans quel format », « Système de coordonnées » sur « dans quel système de coordonnées ». État final : la carte et ses deux manques nommés.
- **Affirmations** : une entité a ses attributs stockés dans un format et connaît son système de coordonnées → A-nom-07, A-nom-08, posés en question, sans rien affirmer de plus ; contenu de la leçon suivante → brief (L02).

## Écran

- `Format et coordonnées.`
- `Entité géographique`
- `Format`
- `Système de coordonnées`

## Narration

Reste à savoir où vit une entité géographique : dans quel format est-elle stockée, et dans quel système de coordonnées ?

La leçon suivante détaille les formats et les systèmes de coordonnées.

# Points ouverts

| Point | Proposition |
|---|---|
| Exemples d'illustration et leurs valeurs : le bâtiment « Usage : bureaux » (S02) ; la conduite d'eau « Usage : eau potable », « Matériau : fonte », et son repère dans un cartouche (S03) | Appliqué, révisable : les exemples restent (décision du brief), sans affirmer de fait ; la remise n'en donne aucun. Les valeurs sont nécessaires pour que l'exercice montre une vraie donnée à reconnaître (G6). À confirmer par Ilyas, ou à remplacer par l'objet et les valeurs qu'il choisit. |
| Le système de coordonnées dessiné en globe, sans nom de système (S02, S03) | Proposition : le globe, que deux relecteurs reconnaissent pour « sur la Terre », plutôt qu'une croix de repère ou un nom de système (hors remise, matière de L02). Ilyas peut préférer un autre signe. |
| Gloses et synthèses pédagogiques : « ce que les données en retiennent » pour « abstraction » (S02) ; « une entité porte trois parties » (S02, synthèse du pack de A-nom-06 à A-nom-08, les entités sans géométrie laissées hors contenu) ; « un mot anglais qui veut dire sûr » (S06, traduction hors pack) ; « chaque traitement demandé » pour « job requests » (S05) | Formulations du scénariste, qui ne changent pas le fait. À confirmer par Ilyas, une par une. |
| Attributs de format et attributs utilisateur (A-nom-09, A-nom-07) retirés de S04 | Proposition : les garder hors de cette leçon, où « attribut » vient d'être défini, et les ouvrir avec les formats en L02, où leur enjeu se montre. Ilyas peut demander de les rétablir. |
| Huit scènes, environ 3:50 de voix | Le brief prévoit 5 à 7 scènes et 6 à 8 minutes ; l'histoire coupée en deux (S06, S07) fait huit scènes courtes, et la leçon jouée approche 5 minutes, au bas de la durée décidée (5 à 6 minutes). Appliqué, révisable : rien n'est ajouté hors remise ; rallonger demanderait d'ouvrir des affirmations en attente de l'expert (parcours des fondateurs A-origines-03, problème des données éparpillées A-sig-01). |

# Test du débutant

Non fait dans ce rôle : il demande un lecteur neuf, sans aucun fichier du projet, à qui l'on donne une seule fois, dans l'ordre, la narration et les textes à l'écran (conventions BIMaccess § 0), et ce rôle ne peut pas lancer un autre agent. À faire par le Super Agent avant la voix ; réponses à recopier ici mot pour mot : l'idée dite avec ses mots, les mots non compris, ce qu'il a dû retenir, sa réponse à l'exercice de S03.
