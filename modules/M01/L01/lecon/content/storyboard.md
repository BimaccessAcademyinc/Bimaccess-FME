# L'idée

- **Objectifs du brief et ce que leurs verbes demandent** : 1. *expliquer* ce que désigne le nom d'origine de FME (comprendre une raison : le nom décrit le travail de l'outil, et ce travail se comprend par ce qu'il faut faire passer d'un logiciel à l'autre) ; 2. *dire* qui a créé FME, quand, et pour quel problème de départ (savoir, dans le fil du récit, sans liste à retenir) ; 3. *reconnaître*, devant une donnée géographique, les trois parties d'une entité géographique (identifier et nommer : c'est ce que l'exercice fait pratiquer, sur une donnée montrée).
- **L'idée en trois phrases** :

> Au début des années 1990, en Colombie-Britannique, des entreprises forestières qui utilisent des logiciels différents doivent échanger des données géographiques avec le gouvernement, qui ne veut pas leur imposer un même éditeur. De ce projet naissent Safe Software, puis FME, un outil qui permet de partager des données géographiques entre des logiciels différents. Pour cela, FME lit chaque entité géographique (sa géométrie, ses attributs, son système de coordonnées), la transforme et l'écrit dans le format attendu, comme un moteur au centre des formats.

- **Ce qu'un débutant en a dit** : pas encore recueilli (voir `# Test du débutant`).

# Jauge

| Idée | Source | Poids | Difficulté | En pratique |
|---|---|---|---|---|
| Au début des années 1990, Don Murray et Dale Lutz travaillent en Colombie-Britannique sur un projet d'échange de données géographiques forestières entre les entreprises forestières et le gouvernement provincial | A-origines-20 (énoncé, et extrait Techcouver pour les deux fondateurs) | fort | simple | Le problème de départ de l'outil est un échange de données géographiques entre plusieurs parties, ce que vit toute équipe de projet qui reçoit des données d'un autre bureau. C'est l'ouverture en récit (G22, G26) |
| Les entreprises utilisent des logiciels différents, et le gouvernement ne veut pas leur imposer un même éditeur | A-origines-23 (porte Q11) | fort | simple | Le cœur du problème : chacun garde son logiciel, et l'échange doit quand même se faire. Mal compris : on croit que l'échange se règle en imposant un logiciel à tous |
| Le format du projet est SAIF, une norme canadienne d'échange de données géographiques, prononcée « safe » | A-origines-17, A-origines-07 | moyen | simple | Une mention dans le récit, puis l'origine du nom de l'entreprise, dite simplement (G23) |
| Safe Software naît d'un contrat du gouvernement de la Colombie-Britannique, remporté sur appel d'offres par Murray et Lutz | A-origines-15, A-origines-02 | moyen | évidente | Répond au « qui » de l'objectif 2, dans le fil du récit |
| Safe Software est fondée en 1993, son nom vient de SAIF ; FME sort en 1996 | A-origines-14, A-origines-07, A-origines-22 ; porte Q1 | moyen | évidente | Deux dates imposées par Ilyas, sur une frise ; aucune autre date |
| FME s'appelait à l'origine Feature Manipulation Engine ; l'éditeur dit aujourd'hui FME | A-nom-04, A-nom-17 ; porte Q2 | fort | simple | Dit une fois, comme la description du travail de l'outil, jamais comme une énigme (G23). Mal fait : faire croire que l'éditeur a abandonné le nom d'origine |
| FME permet de partager des données géographiques entre des logiciels différents | A-nom-18 | fort | simple | La réponse au problème du récit : chaque partie garde son logiciel |
| Siège à Surrey, en Colombie-Britannique | A-sig-07 | faible | évidente | Une mention, au présent, hors de la frise (la remise ne date pas le siège) |
| Une entité géographique est l'abstraction d'une chose du monde réel | A-nom-16 ; terminologie Q3 | fort | contre-intuitive | Le professionnel habitué aux plans voit un contour dessiné là où les données portent un objet complet. Mal compris : on échange des dessins en croyant échanger des objets |
| Une entité a une géométrie (information de position : points, lignes, surfaces), des attributs, un système de coordonnées | A-nom-06, A-nom-07, A-nom-08 | fort | mal comprise | C'est ce qui passe d'un logiciel à l'autre, et ce qu'une équipe cherche devant une donnée reçue. Mal compris : on croit que le tracé seul situe l'objet sur la Terre |
| La position sur la Terre se lit dans la géométrie, rattachée par le système de coordonnées | A-nom-06, A-nom-08 | fort | mal comprise | L'équipe qui reçoit une conduite doit savoir où elle passe ; l'exercice fait chercher cette partie sur la donnée |
| FME lit les données source, ses outils de transformation manipulent géométrie et attributs, puis il écrit les données de destination | A-nom-09 (lecture et écriture), A-nom-11 | moyen | simple | Le mécanisme de l'échange : ce qui arrive à une entité entre le logiciel qui l'envoie et celui de l'équipe qui la reçoit |
| Safe Software décrit FME comme un moteur central au milieu d'un large éventail de formats : lu depuis n'importe lequel, écrit vers n'importe quel autre | A-nom-13 ; VIS-01 | fort | simple | Chaque partie d'un échange garde son logiciel ; le moteur fait le lien entre tous les formats |
| Le moteur, dans le glossaire de FME, est le composant qui traite les demandes de travaux | A-nom-12 | faible | simple | Dit en mots de données (« chaque traitement demandé ») : « demandes de travaux » se lirait comme un ordre de chantier |

Hors contenu :

- **Hors remise** (attend l'expert, ou contexte) : la date de constitution (A-origines-01), l'introduction de FME en 1993 selon la page actuelle (A-origines-09), la date de 1996 au jour près (A-origines-08), le parcours des fondateurs avant le projet (A-origines-03, porte Q8), le ministère client et le suivi de l'exploitation forestière (A-origines-04), Surrey comme lieu de fondation (A-origines-21), les premiers travaux CAD vers SIG (A-origines-05), la nature et l'organisme de SAIF (A-origines-06, A-origines-18, A-origines-19), la boîte à outils SAIF (A-origines-16), le problème des données éparpillées et le choix du gouvernement d'inventer un format avec des traducteurs (A-sig-01, A-sig-02), les noms des produits actuels et l'effectif (A-nom-05, A-sig-06, A-sig-08), le nombre de formats et d'intégrations (A-sig-03, A-sig-04), les étapes de 1997 (A-origines-10, A-origines-11), Esri (A-sig-05, A-origines-12, porte Q6), les normes nommées (A-nom-01, A-nom-03), les exemples du glossaire du W3C (A-nom-02), les readers, writers et transformers (A-nom-10), la ligne de commande et Workbench (A-nom-14), la date du siège (A-origines-13).
- **Écarté par choix** : les entités sans géométrie (A-nom-06, seconde moitié), qui brouilleraient l'idée des trois parties à la première rencontre ; les attributs de format et leur second jeu (A-nom-09) et les attributs utilisateur (A-nom-07), qui demandent deux sens du mot « attribut » deux scènes après sa définition ; les espaces de travail (A-nom-12, seconde moitié), qui s'apprennent en L03 ; le nom de l'outil FME Workbench (A-nom-11), remplacé par « les outils de transformation ».
- **Leçons voisines** (brief) : formats et systèmes de coordonnées en détail (L02), construire un espace de travail (L03), usages SIG détaillés (L04), FME Flow et l'automatisation, le BIM vers SIG (L05).

# Objectifs

- **Savoir-faire** : dire qui a créé FME, quand, et pour quel problème de départ (S01, S02) ; expliquer ce que décrit le nom d'origine de FME, par ce que l'outil fait passer et comment (S02, S03, S05, S06) ; reconnaître, sur une donnée géographique, la géométrie, les attributs et le système de coordonnées d'une entité, et lesquelles de ces parties la situent sur la Terre (S03, S04).
- **Point central** : FME est né d'un échange de données géographiques entre des parties qui gardaient chacune leur logiciel ; il fait passer chaque entité géographique, avec sa géométrie, ses attributs et son système de coordonnées, d'un format à l'autre, comme un moteur au centre des formats.
- **Déjà connu du public** : plans, modèles, cartouches et échanges de fichiers entre équipes sur un projet de construction ; ni FME ni le SIG.
- **Vocabulaire introduit** :

| Terme (voix et écran) | Anglais, pour la version anglaise | Scène |
|---|---|---|
| SAIF | Spatial Archive and Interchange Format | S01 |
| entité géographique | feature (dit une fois, dans le nom d'origine) | nommé S02, défini S03 |
| géométrie, attributs, système de coordonnées | geometry, attributes, coordinate system | S03 (une seule figure, REGLES 2.3) |
| outils de transformation | transformers | S05 |
| moteur | engine | nommé S02, défini S06 |

# Budget

Durées de voix estimées à 150 mots par minute ; S04 ajoute le temps du choix.

| Idée | Poids | Difficulté | Forme | Scène | Durée |
|---|---|---|---|---|---:|
| Le projet forestier, les logiciels différents, SAIF | fort | simple | Ouverture en récit | S01 | 0:40 |
| Le contrat, 1993, le nom tiré de SAIF, FME en 1996 et ce qu'il permet, Surrey | fort | simple | Exemple (le cas réel documenté, en frise) | S02 | 0:45 |
| L'entité géographique et ses trois parties | fort | contre-intuitive | Exposé avec schéma | S03 | 0:45 |
| Reconnaître les parties sur une conduite d'eau | fort | mal comprise | Exercice | S04 | 1:15 |
| Lire, transformer, écrire | moyen | simple | Geste fait devant la personne | S05 | 0:30 |
| Le moteur au centre des formats | fort | simple | Exposé avec schéma | S06 | 0:40 |
| Format et système de coordonnées : la question de L02 | faible | simple | Pont | S07 | 0:15 |
| | | | | **Total** | **4:50** |

Lecture du budget : sept scènes. Le récit ouvre la leçon et la porte jusqu'à la réponse : deux fondateurs, un échange entre des parties qui gardent chacune leur logiciel, un contrat, une entreprise, un outil. Les notions viennent ensuite comme le moyen de comprendre comment l'outil répond : ce qu'il fait passer (S03, pratiqué tout de suite en S04), comment il le fait passer (S05), et pourquoi chacun peut garder son logiciel (S06, qui referme le problème de S01). L'entité géographique reçoit le plus de temps, parce que c'est l'idée que le public confond le plus. Accroches, de scène en scène : un enjeu de projet (deux parties, des logiciels différents), une frise ouverte, une idée reçue, l'exercice, deux formats qui ne s'accordent pas, une figure incomplète (le seul manque or avant le pont), la question du pont. Environ 3:40 de voix ; avec l'écran « Lancer », les pauses de la voix et le temps du choix, la leçon jouée approche 5 minutes ; rien n'est ajouté pour remplir.

# S01 · Échanger sans imposer de logiciel

## Intention

Poser le problème de départ, vécu par Don Murray et Dale Lutz : des parties qui doivent échanger des données géographiques en gardant chacune son logiciel.

## Mise en scène

- **Objet étudié** : non (la voix parle du projet et de ses parties ; FME n'est pas encore nommé).
- **Accroche** (un enjeu sur le projet) : dès la première seconde, la limite de territoire « Colombie-Britannique » en tiret-point, et dedans la carte de rôle « Don Murray · Dale Lutz » (deux silhouettes d'échelle). Ni manque or ni case vide : l'écart se construit avec les parties de l'échange.
- **Écran** : à gauche, la carte de rôle « Entreprises forestières » (une silhouette) ; à droite, la carte de rôle « Gouvernement de la Colombie-Britannique » (une silhouette) ; entre elles, une liaison d'échange à double pointe (jamais une route : FME n'est pas encore là). Sous la carte des entreprises, trois fenêtres de logiciel redessinées, chacune d'un dessin différent (zone de travail différente), sans nom de produit ni logo : ce sont « des logiciels différents ». Sur la liaison, la feuille de format « SAIF ». La carte des fondateurs reste en haut, au-dessus de l'échange.
- **Mouvement** : territoire et carte des fondateurs dès la première image ; les deux cartes de rôle et leur liaison se dessinent sur « L'échange se fait entre » ; les trois fenêtres se posent sous la carte des entreprises sur « utilisent des logiciels différents » ; une seule mise en évidence, sur les trois fenêtres ensemble, sur « garde donc son logiciel » ; la feuille « SAIF » se pose sur la liaison sur « Le projet a son format ». La question finale ne change rien à l'écran. État final : le territoire, les fondateurs, les deux parties, leurs logiciels, la liaison et SAIF.
- **Affirmations** : début des années 1990, Colombie-Britannique, Murray et Lutz sur un projet d'échange de données géographiques forestières → A-origines-20 (énoncé ; les deux fondateurs viennent de son extrait Techcouver, voir `# Points ouverts`) ; échange entre entreprises forestières et gouvernement provincial → A-origines-20, dit « le gouvernement de la Colombie-Britannique » (décision d'Ilyas) ; logiciels différents, pas d'éditeur imposé → A-origines-23 ; « Chaque entreprise garde donc son logiciel » → conséquence directe de A-origines-23, formulée par le scénariste ; SAIF, format du projet, norme canadienne d'échange de données géographiques → A-origines-07, A-origines-17. La question d'ouverture (REGLES 2.4) ne pose aucun fait ; S02 et S06 y répondent (A-nom-18, A-nom-13).
- **Pour la voix** : « Don Murray », « Dale Lutz » à l'anglaise ; « SAIF » se dit « safe ».

## Écran

- `Chaque entreprise garde son logiciel.`
- `Colombie-Britannique`
- `Don Murray · Dale Lutz`
- `Entreprises forestières`
- `Gouvernement de la Colombie-Britannique`
- `SAIF`

## Narration

Au début des années 1990, en Colombie-Britannique, Don Murray et Dale Lutz travaillent sur un projet d'échange de données géographiques forestières.

L'échange se fait entre les entreprises forestières et le gouvernement de la Colombie-Britannique.

Les entreprises utilisent des logiciels différents, et le gouvernement ne veut pas leur imposer un même éditeur. Chaque entreprise garde donc son logiciel, et l'échange doit pourtant réunir leurs données.

Le projet a son format, SAIF : une norme canadienne d'échange de données géographiques.

Comment des logiciels différents peuvent-ils partager les mêmes données géographiques ?

# S02 · Du contrat naissent Safe Software et FME

## Intention

Dire comment le projet donne naissance à une entreprise puis à un outil, et ce que cet outil permet : partager des données géographiques entre des logiciels différents.

## Mise en scène

- **Objet étudié** : oui à partir de « la première version de FME » ; avant, la voix parle du contrat et de l'entreprise. L'outil se montre par son nom, jamais par une capture ni un logo de Safe Software.
- **Accroche** (frise ouverte) : dès la première seconde, une frise horizontale dont le bout droit reste ouvert (pointe pleine, sans jalon), et à son départ la feuille « Contrat du gouvernement de la Colombie-Britannique » à bandeau titré, avec, à côté, la carte de rôle des fondateurs (les mêmes deux silhouettes qu'en S01, nommées « Don Murray · Dale Lutz »). Aucun manque or.
- **Écran** : dans la feuille du contrat, la rubrique « Appel d'offres remporté » ; sur la frise, deux jalons, « 1993 · Fondation de Safe Software » et « 1996 · Première version de FME », l'échelle en cases d'une année seulement entre les deux ; sous le jalon 1996, le nom d'origine « Feature Manipulation Engine », écrit comme une ligne de rubrique, sans lettre agrandie ni lettre détachée ; hors de la frise, à droite, la carte de lieu « Siège : Surrey », sans date. SAIF, dit en passant dans la voix, ne se redessine pas : sa feuille est celle de S01 (voir `# Points ouverts`).
- **Mouvement** : frise, feuille du contrat et carte des fondateurs dès la première image ; la rubrique « Appel d'offres remporté » se déroule sur « remportent sur appel d'offres » ; le jalon 1993 se pose sur « fondée en 1993 » ; le jalon 1996 sur « en 1996 » ; le nom d'origine se tape sur « Son nom d'origine » ; une seule mise en évidence, sur le jalon 1996 et son nom, sur « partager des données géographiques » ; la carte de lieu sur « son siège est à Surrey ». État final : la frise et ses deux jalons, le contrat et les fondateurs au départ, le nom d'origine sous 1996, la carte de lieu à part.
- **Affirmations** : contrat du gouvernement de la Colombie-Britannique, remporté sur appel d'offres par Murray et Lutz, d'où naît Safe Software → A-origines-15, A-origines-02 (la voix dit qu'ils fondent l'entreprise, pas qu'ils conçoivent FME : la remise ne le dit pas) ; fondée en 1993 → A-origines-14 ; nom tiré de SAIF, prononcé comme « safe » → A-origines-07, dit simplement, sans traduction ni jeu sur le mot anglais (G23) ; première version de FME en 1996, trois ans après → A-origines-22 ; nom d'origine, et l'éditeur dit aujourd'hui FME → A-nom-04, A-nom-17 ; « un moteur qui manipule des entités géographiques » → description du nom d'origine, terminologie Q3 (« feature » dit une seule fois, ici) ; partager des données géographiques entre des logiciels différents → A-nom-18 ; « ce que le projet forestier demandait » → lien du scénariste entre A-nom-18 et A-origines-20, A-origines-23, que l'objectif 2 du brief pose (« pour quel problème de départ ») ; siège actuel à Surrey → A-sig-07.
- **Pour la voix** : seul passage en anglais de la leçon, une fois : « Feature Manipulation Engine », à l'anglaise ; « Murray », « Lutz », « Safe Software », « Surrey » à l'anglaise ; « SAIF » se dit « safe ».

## Écran

- `Du contrat naissent l'entreprise et FME.`
- `Contrat du gouvernement de la Colombie-Britannique`
- `Don Murray · Dale Lutz`
- `Appel d'offres remporté`
- `1993 · Fondation de Safe Software`
- `1996 · Première version de FME`
- `Feature Manipulation Engine`
- `Siège : Surrey`

## Narration

Murray et Lutz remportent sur appel d'offres un contrat du gouvernement de la Colombie-Britannique, d'où naît leur entreprise.

Safe Software est fondée en 1993. Son nom vient de SAIF, le format du projet, qui se prononce comme Safe.

Trois ans plus tard, en 1996, sort la première version de FME. Son nom d'origine, Feature Manipulation Engine, décrit son travail : un moteur qui manipule des entités géographiques.

FME fait ce que le projet forestier demandait : partager des données géographiques entre des logiciels différents.

Aujourd'hui, l'éditeur dit simplement FME, et son siège est à Surrey, dans la même province.

# S03 · Une entité géographique porte trois parties

## Intention

Faire voir ce que FME fait passer d'un logiciel à l'autre : une entité géographique, plus qu'un dessin, une chose du monde réel gardée dans des données, avec trois parties.

## Mise en scène

- **Objet étudié** : non (la voix parle de l'entité géographique) ; aucun nom ni image de l'outil.
- **Accroche** (idée reçue) : dès la première seconde, un fond de carte au trait (îlot, rues) et, dessus, le contour d'un bâtiment seul, à l'encre ; rien d'autre.
- **Écran** : à gauche, le bâtiment du monde réel dessiné en élévation simple ; à droite, la feuille « Entité géographique » à bandeau titré, reliée au bâtiment par un trait qui part du bâtiment ; dans la feuille, trois rubriques lisibles, toujours dans cet ordre : « Géométrie » (le contour du bâtiment en surface hachurée, à côté trois petits signes au trait : un point, une ligne, une surface), « Attributs » (la ligne « Usage : bureaux »), « Système de coordonnées » (le globe au trait où le contour se pose). Vert pour le terme nouveau « Entité géographique » au moment où il se nomme.
- **Mouvement** : le titre se tape sur « un bâtiment apparaît comme un contour » ; le bâtiment en élévation et le trait vers la feuille sur « une chose du monde réel » ; le bandeau « Entité géographique » sur « s'appelle une entité géographique » ; puis chaque rubrique se déroule sur la phrase qui la nomme : « Sa géométrie porte » (le contour passe de la carte dans la rubrique, mouvement géométrique), « points, de lignes ou de surfaces » (les trois signes), « Ses attributs la décrivent » puis « des bureaux », « Son système de coordonnées » (le contour se pose sur le globe) ; une seule mise en évidence à la fois, sur la rubrique dite. État final : la feuille entière, le bâtiment à gauche.
- **Affirmations** : abstraction d'une chose du monde réel, attribuée aux normes → A-nom-16 (le terme français « entité géographique » est la terminologie décidée, Q3) ; « c'est elle qui passe d'un logiciel à l'autre » → A-nom-18 et A-nom-08 (toute entité traitée par FME) ; géométrie, information de position, points, lignes, surfaces → A-nom-06 ; attributs qui décrivent l'entité → A-nom-07 ; système de coordonnées et position sur la Terre → A-nom-08. Le bâtiment et son usage sont un exemple d'illustration, sans valeur de fait (voir `# Points ouverts`).

## Écran

- `L'entité géographique a trois parties.`
- `Entité géographique`
- `Géométrie : points, lignes, surfaces`
- `Attributs`
- `Usage : bureaux`
- `Système de coordonnées`

## Narration

Sur une carte, un bâtiment apparaît comme un contour dessiné.

Pour les normes de l'information géographique, la donnée en retient davantage : l'abstraction d'une chose du monde réel. Dans FME, elle s'appelle une entité géographique, et c'est elle qui passe d'un logiciel à l'autre.

Sa géométrie porte l'information de position, faite de points, de lignes ou de surfaces : pour ce bâtiment, le contour forme une surface.

Ses attributs la décrivent : ici, l'usage, des bureaux. Son système de coordonnées lui donne sa position sur la Terre.

Devant une donnée reçue d'un autre logiciel, ce sont ces trois parties qu'une équipe cherche.

# S04 · Situer une conduite d'eau reçue

## Intention

Faire reconnaître, sur une donnée montrée dont les parties ne portent pas leur nom, la géométrie, les attributs et le système de coordonnées d'une entité, et voir lesquelles la situent sur la Terre.

## Mise en scène

- **Objet étudié** : non.
- **Accroche** : l'exercice est sa propre accroche (REGLES 2.8).
- **Écran** : une feuille de donnée au bandeau titré « Conduite d'eau », dessinée comme une feuille de plan, avec trois zones **sans titre de rubrique** : le cadre principal, où le tracé de la conduite est une ligne au trait ; un petit tableau de deux lignes, « Usage : eau potable » et « Matériau : fonte » ; un cartouche en bas à droite de la feuille, titré « Repère », qui porte un petit globe au trait avec un point posé dessus (le même dessin que le globe de S03, sans nom de système : la remise n'en donne aucun et les systèmes de coordonnées sont la matière de L02). La question et les trois choix à droite. Aucune carte de fond.
- **Mouvement** : la feuille se déroule zone par zone sur « une conduite d'eau » (cadre et tracé, tableau, cartouche) ; question et choix après la consigne. Après la validation, la conséquence du choix s'écrit ; puis, sur la narration déclenchée, chaque zone reçoit son nom de partie, une à la fois, dans un trait de repère : « Géométrie » sur « le tracé est la géométrie », « Attributs » sur « sont ses attributs », « Système de coordonnées » sur « le repère du cartouche » ; enfin le tracé et le cartouche se relient par l'accolade de lecture sur « se lit donc dans deux parties ». Une seule mise en évidence à la fois. État final : la feuille et ses trois noms, l'accolade, le choix et sa conséquence.
- **Choix** : chacun désigne une zone par ce qu'elle montre (le tracé, l'usage et le matériau, le repère), jamais par le nom de sa partie ni par « sans » ou « avec » ; c'est à la personne de reconnaître de quelle partie il s'agit. Le piège attendu est le tracé : il montre où va la conduite, mais seul il ne la rattache pas à la Terre.
- **Affirmations** : géométrie, information de position → A-nom-06 ; attributs qui décrivent → A-nom-07 ; système de coordonnées, position sur la Terre → A-nom-08. La conduite d'eau, son usage, son matériau et le cartouche sont un exemple d'illustration choisi par le scénariste, sans valeur de fait (voir `# Points ouverts`).
- Mode conséquence, sans verdict (brief) : pas de ligne « Attendu ». Exercice, narrations et conséquences repris tels qu'ils ont passé la relecture ; seul le titre de scène change (G25).

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

# S05 · FME lit, transforme, puis écrit

## Intention

Montrer comment FME fait passer une entité géographique du logiciel qui l'envoie au logiciel de l'équipe qui la reçoit : lire, manipuler la géométrie et les attributs, écrire dans le format attendu.

## Mise en scène

- **Objet étudié** : oui (la voix parle de ce que fait FME) ; l'outil se montre par son travail, sans fenêtre ni capture.
- **Accroche** (deux pièces qui ne s'accordent pas) : dès la première seconde, à gauche une feuille de format au bandeau « Format de départ », qui contient une petite carte d'entité (un contour et sa ligne d'attribut, sans reprendre le bâtiment de S03) ; à droite une feuille de format au bandeau « Format attendu », d'un autre contenu de feuille (autre trame) ; les deux feuilles se font face, rien entre elles : aucune case réservée, aucun manque or.
- **Écran** : de gauche à droite, la feuille « Format de départ », la route de lecture à pointe « Lire », le bloc « Outils de transformation », la route d'écriture à pointe « Écrire », la feuille « Format attendu ». La carte d'entité fait le trajet de gauche à droite (mouvement géométrique, pas une désignation).
- **Mouvement** : les deux feuilles dès la première image ; la route « Lire » se trace sur « commence par lire » et la carte en sort ; le bloc « Outils de transformation » se dessine sur « ses outils de transformation » et la carte y entre ; mise en évidence du contour de la carte sur « manipuler la géométrie », puis de sa ligne d'attribut sur « et les attributs » ; la route « Écrire » se trace et la carte rejoint la feuille « Format attendu » sur « peut alors écrire », où elle prend la trame de cette feuille. État final : la chaîne complète, la carte arrivée dans la feuille de droite.
- **Affirmations** : lire les données source, écrire les données de destination → A-nom-09, « selon sa documentation » ; outils de transformation qui servent à manipuler géométrie et attributs → A-nom-11, « d'après l'éditeur » ; format de départ et format attendu → A-nom-13 (lu depuis un format, écrit vers un autre) ; « celui que le logiciel de l'équipe sait ouvrir » → A-nom-18 (partage entre logiciels différents), formulé par le scénariste. Les attributs de format, leur second jeu et les attributs utilisateur restent hors de la leçon (voir `# Jauge`, « Écarté par choix »).

## Écran

- `FME lit, transforme, puis écrit.`
- `Format de départ`
- `Format attendu`
- `Lire`
- `Outils de transformation`
- `Écrire`

## Narration

Une entité géographique quitte le logiciel qui l'envoie dans son format de départ, et l'équipe qui la reçoit en attend un autre.

Selon sa documentation, FME commence par lire les données source.

D'après l'éditeur, ses outils de transformation servent à manipuler la géométrie et les attributs de chaque entité.

FME peut alors écrire les données de destination dans le format attendu, celui que le logiciel de l'équipe sait ouvrir.

# S06 · Un moteur au centre des formats

## Intention

Faire comprendre pourquoi chaque partie d'un échange peut garder son logiciel : Safe Software décrit FME comme le moteur central au milieu des formats, qui relie chacun à tous les autres.

## Mise en scène

- **Objet étudié** : oui (la voix parle de FME comme moteur) ; le moteur se dessine en point géodésique au centre, nommé « Moteur », sans logo ni capture.
- **Accroche** (figure incomplète) : dès la première seconde, une couronne de feuilles de format non reliées, au tireté (formats génériques, chacune d'un contenu de feuille différent : aucun nom de format, ils viennent en L02), et une seule liaison qui part d'une feuille vers le centre et s'arrête sur un manque marqué en or (REGLES 4.8). C'est le seul manque or avant le pont ; les scènes voisines n'en ont pas.
- **Écran** : la couronne et son étiquette de groupe « Formats pris en charge » ; au centre, le point géodésique « Moteur » et ses courbes de niveau, où la liaison arrive ; des routes de lecture qui y entrent et des routes d'écriture qui en ressortent vers toutes les autres feuilles. En bas, le crédit court « D'après Safe Software », cliquable, qui ouvre la référence de la page « What is FME » (REGLES 4.6). D'après la figure « What is FME » de la documentation de Safe Software, redessinée (pack, VIS-01).
- **Mouvement** : couronne, liaison arrêtée et manque or dès la première image ; « Formats pris en charge » sur « Un large éventail » ; le moteur se dessine au bout de la liaison, à la place du manque, sur « un moteur central », et le crédit se pose avec lui ; les routes de lecture se tracent sur « y lit ses données », les routes d'écriture vers toutes les autres feuilles sur « vers n'importe quel autre » ; une seule mise en évidence, le moteur, sur « au sens du glossaire » ; les feuilles passent du tireté au trait plein sur « chaque partie d'un échange ». État final : l'étoile complète.
- **Affirmations** : moteur central au milieu d'un large éventail de formats, lu depuis n'importe lequel et écrit vers n'importe quel autre, « Safe Software décrit » → A-nom-13 ; composant qui traite les travaux demandés, « le glossaire de FME » → A-nom-12, dit en mots de données (« chaque traitement demandé ») plutôt que « demandes de travaux », qu'un public de chantier lirait comme un ordre de travail ; « chaque partie d'un échange garde son logiciel » → A-nom-18, rapproché du problème de S01 (A-origines-23) par le scénariste, sans affirmer ce que firent les entreprises du projet.

## Écran

- `Un moteur au centre des formats.`
- `Formats pris en charge`
- `Moteur`
- `D'après Safe Software`

## Narration

Un large éventail de formats pris en charge entoure FME, et rien ne les relie encore.

Safe Software décrit FME comme un moteur central au milieu de ces formats. Une équipe y lit ses données depuis n'importe quel format, et les écrit vers n'importe quel autre.

Le moteur, au sens du glossaire de FME, est le composant qui exécute chaque traitement demandé.

Ainsi, chaque partie d'un échange garde son logiciel, et le moteur fait passer les données de l'un à l'autre.

# S07 · Format et système de coordonnées

## Intention

Poser la question de la leçon suivante : dans quel format et dans quel système de coordonnées vit une entité géographique.

## Mise en scène

- **Objet étudié** : non.
- **Écran** : au centre, une petite feuille « Entité géographique » (un contour au trait, nouveau, qui ne reprend ni le bâtiment de S03 ni la conduite de S04) ; deux traits en partent et s'arrêtent chacun sur un manque or, le premier portant « Format », le second « Système de coordonnées » (REGLES 4.8 : rien ne leur répond encore, la leçon suivante y répond).
- **Mouvement** : la feuille et ses deux traits arrêtés dès la première seconde de voix ; « Format » se pose sur « dans quel format », « Système de coordonnées » sur « dans quel système de coordonnées ». État final : la feuille et ses deux manques nommés.
- **Affirmations** : une entité a ses attributs stockés dans un format et connaît son système de coordonnées → A-nom-07, A-nom-08, posés en question, sans rien affirmer de plus ; contenu de la leçon suivante → brief (L02). Narration reprise telle qu'elle a passé la relecture.

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
| Don Murray et Dale Lutz sur le projet forestier (S01) | La phrase « Don Murray et Dale Lutz travaillent sur un projet d'échange de données géographiques forestières » s'appuie sur l'extrait Techcouver de A-origines-20 (« While working on a geospatial forestry data sharing project in British Columbia in the early 90s, Don Murray and Dale Lutz saw firsthand a challenge to be solved »), alors que l'énoncé de la remise ne nomme pas les fondateurs. Appliqué, révisable : c'est ce qui fait d'eux les personnages du récit (consigne d'Ilyas). Si Ilyas préfère s'en tenir à l'énoncé, la première phrase devient « Au début des années 1990, en Colombie-Britannique, un projet porte sur l'échange de données géographiques forestières », et les fondateurs entrent en S02. |
| Liens de récit formulés par le scénariste | « Chaque entreprise garde donc son logiciel, et l'échange doit pourtant réunir leurs données » (S01, conséquence de A-origines-23) ; « FME fait ce que le projet forestier demandait » (S02, lien entre A-nom-18 et A-origines-20, A-origines-23, posé par l'objectif 2 du brief) ; « chaque partie d'un échange garde son logiciel, et le moteur fait passer les données » (S06, A-nom-18 et A-nom-13). Aucun ne dit ce que firent les entreprises du projet ni que FME traduisait vers SAIF (A-sig-02, A-origines-16, hors remise). À confirmer par Ilyas, un par un. |
| Le contrat et le projet forestier (S01, S02) | La remise ne dit pas que le contrat remporté sur appel d'offres (A-origines-15) est le projet forestier (A-origines-04, en attente de l'expert). Le récit les met l'un après l'autre sans les souder : « un contrat du gouvernement de la Colombie-Britannique, d'où naît leur entreprise ». Si Ilyas confirme A-origines-04, S02 peut dire « remportent ce contrat » et le récit gagne un lien. |
| La question d'ouverture (S01) | « Comment des logiciels différents peuvent-ils partager les mêmes données géographiques ? » : la question d'ouverture de REGLES 2.4, à laquelle S02 (A-nom-18) puis S06 répondent ; `lint:story` la signale comme question dans la narration. Ilyas peut préférer une affirmation (« Reste à faire partager les mêmes données géographiques à des logiciels différents. »). |
| SAIF non redessiné en S02 | La voix dit « Son nom vient de SAIF, le format du projet » sans nouvelle image de SAIF : la feuille est en S01, et une ligne de repère de « SAIF » vers « Safe » referait l'ancien jeu (G23). Proposition : rien de plus à l'écran. |
| Les fondateurs montrés deux fois (S01, S02) | La même carte de rôle « Don Murray · Dale Lutz » revient en S02, où la voix les nomme à nouveau : ce sont les personnages du récit (décision d'Ilyas), et une personne nommée se montre (REGLES 4.6). Proposition : la garder, petite, au départ de la frise. |
| Exemples d'illustration et leurs valeurs : le bâtiment « Usage : bureaux » (S03) ; la conduite d'eau « Usage : eau potable », « Matériau : fonte », et son repère dans un cartouche (S04) | Appliqué, révisable : les exemples restent (décision du brief), sans affirmer de fait ; la remise n'en donne aucun. À confirmer par Ilyas, ou à remplacer par l'objet et les valeurs qu'il choisit. |
| Le système de coordonnées dessiné en globe, sans nom de système (S03, S04) | Proposition : le globe, que deux relecteurs reconnaissent pour « sur la Terre », plutôt qu'une croix de repère ou un nom de système (hors remise, matière de L02). Ilyas peut préférer un autre signe. |
| Gloses et synthèses pédagogiques | « un moteur qui manipule des entités géographiques » pour le nom d'origine (S02) ; « une entité porte trois parties » (S03, synthèse de A-nom-06 à A-nom-08, les entités sans géométrie laissées hors contenu) ; « chaque traitement demandé » pour « job requests » (S05 de l'ancienne version, S06 ici) ; « celui que le logiciel de l'équipe sait ouvrir » (S05). Formulations du scénariste, qui ne changent pas le fait. À confirmer par Ilyas. |
| Titres de scène changés | Tous les titres sont réécrits en affirmations (G25), y compris ceux des scènes gardées : « Où passe la conduite » devient « Situer une conduite d'eau reçue » (S04), « Lire, manipuler, écrire » devient « FME lit, transforme, puis écrit » (S05), « Un moteur au centre » devient « Un moteur au centre des formats » (S06), « Où vit une entité » devient « Format et système de coordonnées » (S07). Ilyas peut rétablir un ancien titre. |
| Titre de la leçon | Le titre du brief et de `studio.config.json`, « Feature Manipulation Engine : un nom qui dit le métier », porte la leçon sur le sigle (G23). Proposition, hors de ce fichier : « FME : partager les données géographiques entre logiciels ». À trancher par Ilyas ; le changement revient au Super Agent. |
| Durée | Sept scènes, environ 3:40 de voix ; la leçon jouée approche 5 minutes, au bas de la fourchette de 5 à 8 minutes. Rien n'est ajouté hors remise ; rallonger demanderait d'ouvrir des affirmations en attente de l'expert (parcours des fondateurs A-origines-03, ministère client A-origines-04, problème des données éparpillées A-sig-01). |

# Test du débutant

Non fait dans ce rôle : il demande un lecteur neuf, sans aucun fichier du projet, à qui l'on donne une seule fois, dans l'ordre, la narration et les textes à l'écran (conventions BIMaccess § 0), et ce rôle ne peut pas lancer un autre agent. À faire par le Super Agent avant la voix ; réponses à recopier ici mot pour mot : l'idée dite avec ses mots, les mots non compris, ce qu'il a dû retenir, sa réponse à l'exercice de S04.
