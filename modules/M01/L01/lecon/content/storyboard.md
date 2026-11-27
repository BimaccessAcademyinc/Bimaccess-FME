# L'idée

- **Objectifs du brief et ce que leurs verbes demandent** : 1. *expliquer* ce que fait l'outil que désigne le nom d'origine de FME (comprendre une raison : pour traduire une donnée d'un logiciel à l'autre, il faut savoir ce qu'elle contient, comment on la fait passer, et ce qui relie tous les formats ; le brief écrit « les trois mots », lu ici sans dérouler le sigle, voir `# Points ouverts`) ; 2. *dire* qui a créé FME, quand, et pour quel problème de départ (savoir, dans le fil du récit, sans liste à retenir) ; 3. *reconnaître*, devant une donnée géographique, les trois parties d'une entité géographique (identifier et nommer : S04 les nomme une à une sur un bâtiment ; plus d'exercice, décision d'Ilyas du 2026-11-27, G28) ; et, demandé par Ilyas le 2026-11-27 (G27), *dire ce qu'est* FME : un logiciel, et non un format ni une norme comme SAIF (S02, S03).
- **L'idée en trois phrases** :

> Au début des années 1990, en Colombie-Britannique, Don Murray et Dale Lutz voient de près le problème d'un projet forestier : les entreprises doivent partager leurs données géographiques avec le gouvernement, chacune sur son logiciel. Ils remportent un contrat, fondent Safe Software en 1993 et commencent par traduire les données vers SAIF, le format du gouvernement ; en 1996, leur entreprise sort son logiciel, FME, qui fait passer les données géographiques d'un logiciel à l'autre : SAIF est un format et une norme, FME est le logiciel qui lit dans un format et écrit dans un autre. Pour cela, FME traite des entités géographiques (géométrie, attributs, système de coordonnées), les lit, les transforme et les écrit, comme un moteur central au milieu des formats.

- **Ce qu'un débutant en a dit** : pas encore recueilli (voir `# Test du débutant`).

# Jauge

| Idée | Source | Poids | Difficulté | En pratique |
|---|---|---|---|---|
| Au début des années 1990, Don Murray et Dale Lutz travaillent en Colombie-Britannique sur un projet de partage de données géographiques forestières, et y voient de près un problème à résoudre | A-origines-20 (énoncé, et extrait Techcouver pour les deux fondateurs et « saw firsthand a challenge to be solved ») | fort | simple | L'ouverture en récit (G22, G26) : les fondateurs sont les acteurs du problème |
| Les entreprises forestières partagent leurs données avec le gouvernement de la Colombie-Britannique | A-origines-20 (extrait de l'éditeur : « exchange maps with the provincial government ») | fort | simple | L'enjeu du projet : un échange entre plusieurs parties |
| Les entreprises utilisent des logiciels différents, et le gouvernement ne veut pas leur imposer un même éditeur | A-origines-23 (porte Q11) | fort | simple | Le cœur du problème : chacun garde son logiciel, et l'échange doit quand même se faire. Mal compris : on croit que l'échange se règle en imposant un logiciel à tous |
| Le gouvernement de la Colombie-Britannique lance un appel d'offres ; Murray et Lutz remportent le contrat, d'où naît Safe Software, fondée en 1993 | A-origines-15, A-origines-02, A-origines-14 ; porte Q1 | moyen | évidente | Répond au « qui » de l'objectif 2, dans le fil du récit ; le contrat fait naître l'entreprise, pas FME |
| SAIF, format du gouvernement de la Colombie-Britannique, norme canadienne d'échange de données géographiques ; le nom de Safe vient de SAIF | A-origines-24, A-origines-17, A-origines-07 | moyen | simple | Dit après la question d'ouverture, comme le format vers lequel il faut traduire ; jamais « propre à un éditeur » ni « que tous utilisent » |
| Safe Software commence par une technologie de traduction pour SAIF | A-origines-24 | fort | simple | Le chaînon du récit entre le problème et l'outil |
| La première version de FME sort en 1996, trois ans après la fondation ; à l'origine Feature Manipulation Engine | A-origines-22, A-nom-17, A-nom-04 ; porte Q1, Q2 | moyen | évidente | Le nom d'origine dit une fois, sans traduction ni glose (G23, G24) |
| FME permet de partager des données géographiques entre des logiciels différents | A-nom-18 | fort | simple | La réponse à la question d'ouverture |
| FME est un logiciel : un ensemble d'applications qui traitent des données spatiales, le produit phare de Safe Software | A-nom-19 ; G27 | fort | mal comprise | Dit dès que FME paraît (S02, « son logiciel »), puis classé en S03. Mal compris : on prend FME pour un format, comme SAIF, ou pour une norme |
| SAIF est un format et une norme canadienne d'échange ; FME n'est ni l'un ni l'autre : il lit des données dans un format et les écrit dans un autre | A-origines-24, A-origines-17, A-nom-13 (seconde moitié) | fort | contre-intuitive | La légende de S03 classe les deux noms du récit, chacun avec son exemple ; « lire, transformer, écrire » est la façon de travailler de FME, jamais appelée « méthode » |
| Safe Software présente FME comme une plateforme d'intégration de données, qui comprend FME Form, pour construire les traitements, et FME Flow, pour les automatiser | A-nom-20, A-sig-09 ; porte Q12 | moyen | simple | Les deux noms que le public lira ensuite ; FME Flow est nommé, pas expliqué (l'automatisation est la matière de L05) |
| Siège à Surrey, en Colombie-Britannique | A-sig-07 | faible | évidente | Une mention, au présent, hors de la frise (la remise ne date pas le siège) |
| Une entité géographique représente une chose du monde réel, pas son seul dessin | A-nom-16 ; terminologie Q3 | fort | contre-intuitive | Le professionnel habitué aux plans voit un contour dessiné là où les données portent le bâtiment réel. Mal compris : on échange des dessins en croyant échanger des objets |
| Une entité a une géométrie (information de position : points, lignes, surfaces), des attributs, un système de coordonnées | A-nom-06, A-nom-07, A-nom-08 | fort | mal comprise | Ce qu'il faut savoir d'une donnée pour la traduire ; la géométrie porte l'information de position, le système de coordonnées donne la position sur la Terre. Mal compris : on croit que le tracé seul situe l'objet sur la Terre |
| FME lit les données source, ses outils de transformation manipulent géométrie et attributs, puis il écrit les données de destination | A-nom-09 (lecture et écriture), A-nom-11 | moyen | simple | Comment la donnée passe : ce qui lui arrive entre le logiciel qui l'envoie et celui de l'équipe qui la reçoit |
| Safe Software décrit FME comme un moteur central au milieu d'un large éventail de formats : lu depuis n'importe lequel, écrit vers n'importe quel autre | A-nom-13 ; VIS-01 | fort | simple | Ce qui relie tous les formats ; referme le problème de S01 |

Hors contenu :

- **Hors remise** (attend l'expert, ou contexte) : la date de constitution (A-origines-01), l'introduction de FME en 1993 selon la page actuelle (A-origines-09), la date de 1996 au jour près et FME présenté comme première solution de traduction (A-origines-08), le parcours des fondateurs avant le projet (A-origines-03, porte Q8), le ministère client et le suivi de l'exploitation forestière (A-origines-04), Surrey comme lieu de fondation (A-origines-21), les premiers travaux CAD vers SIG (A-origines-05), la nature et l'organisme de SAIF (A-origines-06, A-origines-18, A-origines-19), la boîte à outils SAIF (A-origines-16), le problème des données éparpillées et le choix du gouvernement d'inventer un format avec des traducteurs (A-sig-01, A-sig-02), le changement de nom des produits en version 23.0, la version actuelle de la documentation et l'effectif (A-sig-06, A-nom-05, A-sig-08 ; FME Form et FME Flow sont nommés par A-sig-09, porte Q12), le nombre de formats et d'intégrations (A-sig-03, A-sig-04), les étapes de 1997 (A-origines-10, A-origines-11), le partenaire SIG et son extension (A-sig-05, A-origines-12, porte Q6), les normes nommées (A-nom-01, A-nom-03), les exemples du glossaire du W3C (A-nom-02), les readers, writers et transformers (A-nom-10), la ligne de commande et Workbench (A-nom-14), la date du siège (A-origines-13).
- **Écarté par choix** : le moteur au sens du glossaire, composant qui traite les demandes de travaux (A-nom-12), qui rejouerait le dernier mot du sigle (B2) et demanderait les espaces de travail de L03 ; les entités sans géométrie (A-nom-06, seconde moitié), qui brouilleraient l'idée des trois parties à la première rencontre ; les attributs de format et leur second jeu (A-nom-09) et les attributs utilisateur (A-nom-07), qui demandent deux sens du mot « attribut » deux scènes après sa définition ; le nom de l'outil FME Workbench (A-nom-11), remplacé par « les outils de transformation ».
- **Leçons voisines** (brief) : formats et systèmes de coordonnées en détail (L02), construire un espace de travail (L03), usages SIG détaillés (L04), FME Flow et l'automatisation, le BIM vers SIG (L05) ; FME Flow est seulement nommé en S03.

# Objectifs

- **Savoir-faire** : dire qui a créé FME, quand, et pour quel problème de départ (S01, S02) ; dire ce qu'est FME, un logiciel, et le distinguer d'un format ou d'une norme comme SAIF (S02, S03) ; expliquer ce que fait FME, par ce qu'il faut savoir d'une donnée pour la traduire, comment elle passe et ce qui relie les formats (S04, S05, S06) ; reconnaître, sur une donnée géographique, la géométrie, les attributs et le système de coordonnées d'une entité (S04).
- **Point central** : FME vient d'un échange de données géographiques entre des parties qui gardaient chacune leur logiciel ; c'est un logiciel, pas un format ni une norme, et il fait passer chaque entité géographique, avec sa géométrie, ses attributs et son système de coordonnées, d'un format à l'autre, par un moteur central au milieu des formats.
- **Déjà connu du public** : plans, modèles, cartouches et échanges de fichiers entre équipes sur un projet de construction ; ni FME ni le SIG.
- **Vocabulaire introduit** :

| Terme (voix et écran) | Anglais, pour la version anglaise | Scène |
|---|---|---|
| SAIF | Spatial Archive and Interchange Format | S02 |
| format, norme, logiciel | format, standard, software | S03 (la légende qui classe) |
| FME Form, FME Flow | FME Form, FME Flow | S03 |
| entité géographique | feature (dit une fois, dans le nom d'origine, S02) | S04 |
| géométrie, attributs, système de coordonnées | geometry, attributes, coordinate system | S04 (une seule figure, REGLES 2.3) |
| outils de transformation | transformers | S05 |
| moteur central | central engine | S06 |

# Budget

Durées de voix estimées à 150 mots par minute, avec le temps des animations. Aucun exercice (G28).

| Idée | Poids | Difficulté | Forme | Scène | Durée |
|---|---|---|---|---|---:|
| Le projet forestier, les logiciels différents, le problème vu de près | fort | simple | Ouverture en récit | S01 | 0:40 |
| Le contrat, 1993, SAIF et la traduction, FME en 1996, son logiciel, et ce qu'il fait, Surrey | fort | simple | Exemple (le cas réel documenté, en frise) | S02 | 1:00 |
| FME est un logiciel ; SAIF est un format et une norme ; FME Form et FME Flow | fort | mal comprise | Exposé avec schéma (une légende qui classe) | S03 | 0:55 |
| L'entité géographique et ses trois parties | fort | contre-intuitive | Exposé avec schéma | S04 | 0:45 |
| Lire, transformer, écrire | moyen | simple | Geste fait devant la personne | S05 | 0:30 |
| Le moteur central au milieu des formats, le problème refermé | fort | simple | Exposé avec schéma | S06 | 0:45 |
| Format et système de coordonnées : la question de L02 | faible | simple | Pont | S07 | 0:12 |
| | | | | **Total** | **4:47** |

Lecture du budget : sept scènes. Le récit ouvre la leçon et la porte jusqu'à l'outil : deux fondateurs voient un problème, remportent un contrat, fondent une entreprise, commencent par traduire, sortent leur logiciel. Dès que FME paraît, la leçon dit ce qu'il est (S02), puis le classe à côté de SAIF, que le récit vient de nommer (S03) : le temps libéré par l'exercice va à cette scène. Les notions viennent ensuite parce que le récit en a besoin : pour traduire une donnée d'un logiciel à l'autre, il faut savoir ce qu'elle contient (S04), comment on la fait passer (S05), et ce qui relie tous les formats (S06, où les fondateurs reviennent et où le problème de S01 se referme). L'entité géographique et la nature de FME reçoivent le plus de temps après le récit, parce que ce sont les idées que le public confond le plus. Accroches, de scène en scène : un enjeu de projet (un échange arrêté sur un manque), une frise ouverte, une légende aux lignes vides, une idée reçue, deux formats qui ne s'accordent pas, une figure incomplète, la question du pont. Environ 3:30 de voix ; avec l'écran « Lancer », les pauses de la voix et les animations, la leçon jouée approche 5 minutes ; rien n'est ajouté pour remplir.

# S01 · Chaque entreprise forestière garde son logiciel

## Intention

Poser le problème de départ, vu de près par Don Murray et Dale Lutz : des parties qui doivent partager des données géographiques en gardant chacune son logiciel.

## Mise en scène

- **Objet étudié** : non (la voix parle du projet et de ses parties ; FME n'est pas encore nommé, SAIF non plus).
- **Accroche** (un enjeu sur le projet) : dès la première seconde, la limite de territoire « Colombie-Britannique » en tiret-point, et dedans la carte de rôle « Don Murray · Dale Lutz » (deux silhouettes d'échelle), en haut.
- **Écran** : à gauche, la carte de rôle « Entreprises forestières » (une silhouette) ; à droite, la carte de rôle « Gouvernement de la Colombie-Britannique » (une silhouette) ; entre elles, une liaison qui part des entreprises et s'arrête à mi-chemin sur un manque marqué en or (REGLES 4.8 : rien ne lui répond encore ; S02 y répond par la traduction). Sous la carte des entreprises, des fenêtres de logiciel redessinées, chacune d'un dessin différent (zone de travail différente), sans nom de produit ni logo : ce sont « des logiciels différents ». Dans la marge, la mention de source « D'après la presse spécialisée et Safe Software », cliquable (REGLES 4.6).
- **Mouvement** : territoire, carte des fondateurs et mention de source dès la première image ; les deux cartes de rôle se dessinent sur « Les entreprises forestières doivent » ; la liaison se trace des entreprises vers le gouvernement sur « partager leurs données géographiques » et s'arrête sur le manque or ; les fenêtres se posent sous la carte des entreprises sur « utilisent des logiciels différents » ; le titre se tape et une mise en évidence se pose sur les fenêtres sur « garde donc son logiciel » ; la mise en évidence passe à la carte des fondateurs sur « voient de près ce problème ». La question finale ne change rien à l'écran. État final : le territoire, les fondateurs, les deux parties, leurs logiciels, la liaison arrêtée sur son manque.
- **Affirmations** : début des années 1990, Colombie-Britannique, Murray et Lutz sur un projet forestier, qui y voient de près un problème à résoudre → A-origines-20 (énoncé ; les deux fondateurs et « saw firsthand a challenge to be solved » viennent de son extrait Techcouver, voir `# Points ouverts`) ; les entreprises forestières partagent leurs données géographiques avec le gouvernement de la Colombie-Britannique → A-origines-20 (énoncé, et extrait de l'éditeur « exchange maps with the provincial government »), formule « gouvernement de la Colombie-Britannique » décidée par Ilyas ; logiciels différents, pas d'éditeur imposé → A-origines-23 ; « Chaque entreprise garde donc son logiciel, et l'échange doit pourtant se faire » → conséquence directe de A-origines-23 et A-origines-20, sans fait ajouté. La question d'ouverture (REGLES 2.4) ne pose aucun fait, et sa réponse n'est pas encore donnée : S02 y répond (A-origines-24, A-nom-18), S06 la referme (A-nom-13).
- **Pour la voix** : « Don Murray », « Dale Lutz » à l'anglaise.

## Écran

- `Chaque entreprise garde son logiciel.`
- `Colombie-Britannique`
- `Don Murray · Dale Lutz`
- `Entreprises forestières`
- `Gouvernement de la Colombie-Britannique`
- `D'après la presse spécialisée et Safe Software`

## Narration

Au début des années 1990, Don Murray et Dale Lutz travaillent en Colombie-Britannique sur un projet forestier.

Les entreprises forestières doivent y partager leurs données géographiques avec le gouvernement de la Colombie-Britannique.

Or les entreprises utilisent des logiciels différents, et le gouvernement ne veut pas leur imposer un même éditeur.

Chaque entreprise garde donc son logiciel, et l'échange doit pourtant se faire.

Murray et Lutz voient de près ce problème à résoudre.

Comment faire passer les mêmes données géographiques d'un logiciel à l'autre ?

# S02 · Safe Software commence par traduire vers SAIF

## Intention

Raconter comment Murray et Lutz passent du problème à l'outil : un contrat remporté, une entreprise fondée, un premier travail de traduction vers le format du gouvernement, puis leur logiciel, FME, qui fait passer les données géographiques d'un logiciel à l'autre. Dire net, dès que FME paraît, que c'est un logiciel (G27).

## Mise en scène

- **Objet étudié** : oui à partir de « la première version de son logiciel » ; avant, la voix parle du contrat, de l'entreprise et de la traduction. L'outil se montre par son nom et par le logo « FME by Safe Software » (`fme-logo.svg`, couleurs d'origine, jamais déformé ni recoloré, une seule fois à l'écran, G29), jamais par une capture.
- **Accroche** (frise ouverte) : dès la première seconde, une frise horizontale dont le bout droit reste ouvert (pointe pleine, sans jalon), et à son départ la feuille « Contrat du gouvernement » à bandeau titré, avec, à côté, la carte de rôle des fondateurs (les mêmes deux silhouettes qu'en S01, « Don Murray · Dale Lutz »). Aucun manque or.
- **Écran** : dans la feuille du contrat, la rubrique « Appel d'offres remporté » ; sur la frise, deux jalons, « 1993 · Fondation de Safe Software » et « 1996 · Première version de FME », l'échelle en cases d'une année seulement entre les deux ; au-dessus de la frise, entre les deux jalons, la feuille de format « SAIF » à bandeau titré, et, venant des fenêtres de logiciel de S01 redessinées en petit à gauche, des routes de traduction qui y arrivent, sous l'étiquette « Traduction » ; sous le jalon 1996, le logo « FME by Safe Software », puis sous le logo le nom d'origine « Feature Manipulation Engine », écrit comme une ligne de rubrique, sans lettre agrandie ni lettre détachée ; hors de la frise, à droite, la carte de lieu « Siège : Surrey », sans date. Dans la marge, la mention de source « D'après Safe Software et la presse spécialisée », cliquable.
- **Mouvement** : frise, feuille du contrat, carte des fondateurs et mention de source dès la première image ; la rubrique « Appel d'offres remporté » se déroule sur « remportent le contrat » ; le jalon 1993 se pose sur « fondée en 1993 » ; la feuille « SAIF » se pose sur « Le gouvernement a son format » ; les routes de traduction se tracent des fenêtres vers SAIF sur « doivent être traduites » ; une mise en évidence sur les routes et leur étiquette « Traduction » sur « une technologie de traduction pour SAIF » ; le titre se tape sur la même phrase ; le jalon 1996 se pose sur « en 1996 » ; le logo se pose sous le jalon, par un balayage, sur « la première version de son logiciel » ; le nom d'origine se tape sur « à l'origine Feature Manipulation Engine » ; la mise en évidence passe au jalon 1996 et à son nom sur « fait passer les données géographiques » ; la carte de lieu sur « Son siège est à Surrey ». État final : la frise et ses deux jalons, le contrat et les fondateurs au départ, SAIF et ses routes de traduction entre les jalons, le logo et le nom d'origine sous 1996, la carte de lieu à part.
- **Affirmations** : appel d'offres du gouvernement (celui de la Colombie-Britannique, nommé en S01), contrat remporté par Murray et Lutz, d'où naît leur entreprise → A-origines-15 (extrait BCBusiness « the B.C. government posted a request for proposal »), A-origines-02 ; fondée en 1993 → A-origines-14 ; SAIF, format du gouvernement de la Colombie-Britannique → A-origines-24 ; norme canadienne d'échange de données géographiques → A-origines-17 ; « les données de chaque logiciel doivent être traduites vers ce format » → conséquence de A-origines-24 et A-origines-23, formulée par le scénariste (voir `# Points ouverts`) ; Murray et Lutz commencent par une technologie de traduction pour SAIF → A-origines-24 (Safe Software, leur entreprise) ; le nom de Safe vient de SAIF → A-origines-07, dit sans la prononciation (G23) ; première version de FME en 1996, trois ans après la fondation → A-origines-22, sortie par leur entreprise ; « son logiciel » → A-nom-19 (FME est un logiciel, le produit phare de Safe Software), ce qu'est FME dit au premier mot qui le nomme (G27) ; à l'origine Feature Manipulation Engine, l'éditeur dit aujourd'hui FME → A-nom-17, A-nom-04 (« feature » dit une seule fois, ici, sans traduction ni glose) ; fait passer les données géographiques d'un logiciel à l'autre → A-nom-18 ; siège à Surrey → A-sig-07. La voix ne dit pas que le contrat fait naître FME, ni que FME a été conçu pour le projet forestier : la traduction et FME se suivent dans le temps, sans lien de cause dit.
- **Pour la voix** : seul passage en anglais de la leçon, une fois : « Feature Manipulation Engine », à l'anglaise ; « Murray », « Lutz », « Safe Software », « Surrey » à l'anglaise ; « SAIF » se dit « safe ».

## Écran

- `Safe Software commence par traduire.`
- `Contrat du gouvernement`
- `Don Murray · Dale Lutz`
- `Appel d'offres remporté`
- `1993 · Fondation de Safe Software`
- `SAIF`
- `Traduction`
- `1996 · Première version de FME`
- `Feature Manipulation Engine`
- `Siège : Surrey`
- `D'après Safe Software et la presse spécialisée`

## Narration

Le gouvernement lance un appel d'offres, et Murray et Lutz remportent le contrat.

De ce contrat naît leur entreprise, Safe Software, fondée en 1993.

Le gouvernement a son format, SAIF, une norme canadienne d'échange de données géographiques.

Pour échanger avec lui, les données de chaque logiciel doivent être traduites vers ce format.

Murray et Lutz commencent par ce travail : leur entreprise développe une technologie de traduction pour SAIF. Son nom, Safe, vient d'ailleurs de ce format.

Trois ans après la fondation, en 1996, leur entreprise sort la première version de son logiciel, FME, à l'origine Feature Manipulation Engine.

FME fait passer les données géographiques d'un logiciel à l'autre.

Aujourd'hui, l'éditeur dit simplement FME. Son siège est à Surrey, en Colombie-Britannique.

# S03 · FME est un logiciel, SAIF un format et une norme

## Intention

Dire ce qu'est FME et le distinguer de son voisin du récit : SAIF est un format, une norme canadienne d'échange ; FME n'est ni l'un ni l'autre, c'est un logiciel, qui lit des données dans un format et les écrit dans un autre, et dont la plateforme comprend FME Form et FME Flow (G27).

## Mise en scène

- **Objet étudié** : oui (la voix dit ce qu'est FME) ; l'outil se montre par le logo « FME by Safe Software » (`fme-logo.svg`, couleurs d'origine, jamais déformé ni recoloré, une seule fois à l'écran, G29), jamais par une capture ni une fenêtre de produit.
- **Accroche** (figure incomplète) : dès la première seconde, à gauche, le cartouche « Légende » à bandeau titré, comme la légende d'une feuille de carte, avec trois cases de symbole déjà dessinées au trait et leurs lignes encore vides ; à droite, la feuille de format « SAIF » de S02 à bandeau titré, redessinée en petit. Les symboles : une feuille de format (le dessin de la feuille SAIF), un cachet de norme au double filet, une fenêtre de logiciel (le dessin des fenêtres de S01) ; le graphiste en fixe le trait. Aucun manque or.
- **Écran** : dans la légende, trois lignes, toujours dans cet ordre, chacune avec son exemple pris dans la leçon : « Format : SAIF », « Norme : SAIF », « Logiciel : FME » ; sous la ligne « Logiciel : FME », en retrait, deux lignes de rubrique : « FME Form : construire les traitements », « FME Flow : automatiser les traitements ». À droite, sous la feuille SAIF, le logo « FME by Safe Software », relié à la ligne « Logiciel : FME » par une ligne de repère ; la feuille SAIF reliée de même aux lignes « Format » et « Norme ». Entre la feuille SAIF et le logo, une route rouge de traduction qui entre dans le logo, et une seconde qui en ressort vers une petite feuille de format sans nom (un autre contenu de feuille) : lire dans un format, écrire dans un autre ; aucune étiquette sur ces routes. Dans la marge, la mention de source « D'après Safe Software et la presse spécialisée », cliquable (REGLES 4.6). Rien sous les sous-titres ni dans la zone d'action.
- **Mouvement** : légende vide, feuille SAIF et mention de source dès la première image ; le titre se tape sur « SAIF et FME ne désignent pas » ; « Format : SAIF » se tape, et sa ligne de repère se trace depuis la feuille SAIF, sur « SAIF est un format », avec une mise en évidence sur la ligne ; « Norme : SAIF » sur « C'est aussi une norme », la mise en évidence passe à cette ligne ; le logo se pose sous la feuille SAIF, par un balayage, sur « FME n'est ni un format » ; « Logiciel : FME » se tape et sa ligne de repère se trace depuis le logo sur « C'est un logiciel », la mise en évidence passe à cette ligne ; la route de lecture se trace de la feuille SAIF vers le logo sur « Il lit des données dans un format », la feuille sans nom se pose et la route d'écriture s'y trace sur « les écrit dans un autre » ; la mise en évidence passe au logo sur « L'éditeur le présente » ; « FME Form : construire les traitements » se tape sur « comprend FME Form », « FME Flow : automatiser les traitements » sur « et FME Flow », la mise en évidence suivant la ligne dite. État final : la légende remplie, la feuille SAIF, le logo et ses deux routes, les lignes de repère.
- **Affirmations** : SAIF, format du gouvernement de la Colombie-Britannique → A-origines-24 ; norme canadienne d'échange de données géographiques → A-origines-17 ; FME est un logiciel, un ensemble d'applications qui traitent des données spatiales, le produit phare de Safe Software → A-nom-19 ; « Il lit des données dans un format et les écrit dans un autre » → A-nom-13 (seconde moitié de l'énoncé, l'extrait « Data can be read from any format and written to any other »), dit au présent ; présenté par l'éditeur comme une plateforme d'intégration de données → A-nom-20 ; FME Form pour construire les traitements, FME Flow pour les automatiser → A-sig-09, porte Q12. « SAIF et FME ne désignent pas le même genre de chose » et « FME n'est ni un format ni une norme » → conséquences de ces énoncés, sans fait ajouté. La voix ne définit ni « format » ni « norme » au-delà de SAIF (aucune affirmation ne le fait ; les formats sont la matière de L02), et n'appelle jamais « lire, transformer, écrire » une méthode.
- **Pour la voix** : « SAIF » se dit « safe » ; « FME Form », « FME Flow », « Safe Software » à l'anglaise.

## Écran

- `FME est un logiciel.`
- `Légende`
- `SAIF`
- `Format : SAIF`
- `Norme : SAIF`
- `Logiciel : FME`
- `FME Form : construire les traitements`
- `FME Flow : automatiser les traitements`
- `D'après Safe Software et la presse spécialisée`

## Narration

SAIF et FME ne désignent pas le même genre de chose.

SAIF est un format, celui du gouvernement de la Colombie-Britannique. C'est aussi une norme canadienne d'échange de données géographiques.

FME n'est ni un format ni une norme. C'est un logiciel : un ensemble d'applications qui traitent des données spatiales, le produit phare de Safe Software.

Il lit des données dans un format et les écrit dans un autre.

L'éditeur le présente comme une plateforme d'intégration de données. Elle comprend FME Form, pour construire les traitements, et FME Flow, pour les automatiser.

# S04 · Une entité géographique porte trois parties

## Intention

Faire voir ce qu'il faut savoir d'une donnée pour la traduire d'un logiciel à l'autre : une entité géographique, qui représente une chose du monde réel et non son seul dessin, avec trois parties.

## Mise en scène

- **Objet étudié** : non (la voix parle de l'entité géographique) ; aucun nom ni image de l'outil.
- **Accroche** (idée reçue) : dès la première seconde, un fond de carte au trait (îlot, rues) et, dessus, le contour d'un bâtiment seul, à l'encre ; rien d'autre.
- **Écran** : à gauche, le bâtiment réel dessiné en élévation simple ; à droite, la feuille « Entité géographique » à bandeau titré, reliée au bâtiment par un trait qui part du bâtiment ; dans la feuille, trois rubriques lisibles, toujours dans cet ordre : « Géométrie » (le contour du bâtiment en surface hachurée, à côté trois petits signes au trait : un point, une ligne, une surface), « Attributs » (la ligne « Usage : bureaux »), « Système de coordonnées » (le globe au trait où le contour se pose). Vert pour le terme nouveau « Entité géographique » au moment où il se nomme. Dans la marge, la mention de source « D'après Safe Software et l'OGC », cliquable.
- **Mouvement** : le titre se tape sur « Traduire une donnée » ; la mention de source dès la première image ; le bâtiment en élévation et le trait vers la feuille sur « représente le bâtiment réel » ; le bandeau « Entité géographique » sur « on l'appelle une entité géographique » ; puis chaque rubrique se déroule sur la phrase qui la nomme : « Sa géométrie porte » (le contour passe de la carte dans la rubrique, mouvement géométrique), « en points, lignes ou surfaces » (les trois signes), « Ses attributs la décrivent » puis « des bureaux », « Son système de coordonnées » (le contour se pose sur le globe) ; une seule mise en évidence à la fois, sur la rubrique dite. État final : la feuille entière, le bâtiment à gauche.
- **Affirmations** : « Traduire une donnée d'un logiciel à l'autre suppose de savoir ce qu'elle contient » → lien du récit (consigne du brief 11), sans fait ajouté ; la donnée représente le bâtiment réel → A-nom-16 (abstraction d'un phénomène ou d'une entité du monde réel), dit en clair, sans nommer les normes dans la voix (I1) ; le terme « entité géographique » → terminologie Q3 ; « C'est sur elle que FME travaille » → A-nom-08 (toute entité traitée par FME) ; géométrie, information de position, points, lignes, surfaces → A-nom-06 ; attributs qui décrivent l'entité → A-nom-07 ; système de coordonnées et position sur la Terre → A-nom-08. Le bâtiment et son usage sont un exemple d'illustration, sans valeur de fait (voir `# Points ouverts`).

## Écran

- `Une entité géographique a trois parties.`
- `Entité géographique`
- `Géométrie : points, lignes, surfaces`
- `Attributs`
- `Usage : bureaux`
- `Système de coordonnées`
- `D'après Safe Software et l'OGC`

## Narration

Traduire une donnée d'un logiciel à l'autre suppose de savoir ce qu'elle contient.

Sur une carte, un bâtiment apparaît comme un contour dessiné. La donnée, elle, représente le bâtiment réel : on l'appelle une entité géographique.

C'est sur elle que FME travaille.

Sa géométrie porte l'information de position, en points, lignes ou surfaces. Ici, le contour forme une surface.

Ses attributs la décrivent : ici, l'usage, des bureaux. Son système de coordonnées lui donne sa position sur la Terre.

# S05 · FME lit, transforme, puis écrit

## Intention

Montrer comment une entité géographique passe du logiciel qui l'envoie au logiciel de l'équipe qui la reçoit : FME la lit, ses outils de transformation manipulent sa géométrie et ses attributs, FME l'écrit dans le format attendu.

## Mise en scène

- **Objet étudié** : oui (la voix parle de ce que fait FME) ; l'outil se montre par son travail, sans fenêtre ni capture.
- **Accroche** (deux pièces qui ne s'accordent pas) : dès la première seconde, à gauche une feuille de format au bandeau « Format de départ », qui contient une petite carte d'entité (un contour et sa ligne d'attribut, sans reprendre le bâtiment de S04) ; à droite une feuille de format au bandeau « Format attendu », d'un autre contenu de feuille (autre trame) ; les deux feuilles se font face, rien entre elles : aucune case réservée, aucun manque or.
- **Écran** : de gauche à droite, la feuille « Format de départ », la route de lecture à pointe « Lire », le bloc « Outils de transformation », la route d'écriture à pointe « Écrire », la feuille « Format attendu ». La carte d'entité fait le trajet de gauche à droite (mouvement géométrique, pas une désignation). Dans la marge, la mention de source « D'après Safe Software », cliquable.
- **Mouvement** : les deux feuilles et la mention de source dès la première image ; le titre se tape sur « Une entité quitte son logiciel » ; la route « Lire » se trace sur « commence par lire » et la carte en sort ; le bloc « Outils de transformation » se dessine sur « Ses outils de transformation » et la carte y entre ; mise en évidence du contour de la carte sur « manipulent la géométrie », puis de sa ligne d'attribut sur « et les attributs » ; la route « Écrire » se trace et la carte rejoint la feuille « Format attendu » sur « FME peut alors écrire », où elle prend la trame de cette feuille. État final : la chaîne complète, la carte arrivée dans la feuille de droite.
- **Affirmations** : lire les données source, écrire les données de destination → A-nom-09, dit au présent ; outils de transformation qui manipulent géométrie et attributs des données → A-nom-11 (« des données spatiales »), dit au présent ; format de départ et format attendu → A-nom-13 (lu depuis un format, écrit vers un autre) ; « celui que le logiciel de l'équipe sait ouvrir » → A-nom-18 (partage entre logiciels différents), formulé par le scénariste. Les attributs de format, leur second jeu et les attributs utilisateur restent hors de la leçon (voir `# Jauge`, « Écarté par choix »).

## Écran

- `FME lit, transforme, puis écrit.`
- `Format de départ`
- `Format attendu`
- `Lire`
- `Outils de transformation`
- `Écrire`
- `D'après Safe Software`

## Narration

Une entité quitte son logiciel dans un format de départ, et l'équipe qui la reçoit en attend un autre.

FME commence par lire les données source.

Ses outils de transformation manipulent la géométrie et les attributs des données.

FME peut alors écrire les données de destination dans le format attendu, celui que le logiciel de l'équipe sait ouvrir.

# S06 · Un moteur central relie les formats pris en charge

## Intention

Faire voir ce qui relie tous les formats : Safe Software décrit FME comme un moteur central au milieu des formats pris en charge, lu depuis n'importe lequel et écrit vers n'importe quel autre ; le problème vu par Murray et Lutz se referme, et rejoint celui du public.

## Mise en scène

- **Objet étudié** : oui (la voix parle de FME comme moteur) ; le moteur se dessine en point géodésique au centre, nommé « Moteur », sans logo ni capture.
- **Accroche** (figure incomplète) : dès la première seconde, une couronne de feuilles de format non reliées, au tireté (formats génériques, chacune d'un contenu de feuille différent : aucun nom de format, ils viennent en L02), et une seule liaison qui part d'une feuille vers le centre et s'arrête sur un manque marqué en or (REGLES 4.8). La voix ne dit pas que rien ne les relie : le manque reste à l'écran seul.
- **Écran** : la couronne et son étiquette de groupe « Formats pris en charge » ; au centre, le point géodésique « Moteur » et ses courbes de niveau, où la liaison arrive ; des routes de lecture qui y entrent et des routes d'écriture qui en ressortent vers toutes les autres feuilles ; en haut à gauche, la carte de rôle des fondateurs « Don Murray · Dale Lutz », petite, la même qu'en S01 et S02. Dans la marge, la mention de source « D'après Safe Software », cliquable, qui ouvre la référence de la page « What is FME » (REGLES 4.6). D'après la figure « What is FME » de la documentation de Safe Software, redessinée (pack, VIS-01).
- **Mouvement** : couronne, liaison arrêtée, manque or et mention de source dès la première image ; « Formats pris en charge » sur « les formats pris en charge forment » ; le titre se tape et le moteur se dessine au bout de la liaison, à la place du manque, sur « un moteur central », avec une mise en évidence sur le moteur ; les routes de lecture se tracent sur « se lisent depuis », les routes d'écriture vers toutes les autres feuilles sur « vers n'importe quel autre » ; la carte des fondateurs se pose sur « Murray et Lutz avaient vu de près » ; les feuilles passent du tireté au trait plein sur « un logiciel différent n'empêche pas » ; la dernière phrase ne change rien. État final : l'étoile complète, les fondateurs en haut.
- **Affirmations** : large éventail de formats pris en charge, moteur central au milieu, lu depuis n'importe lequel et écrit vers n'importe quel autre → A-nom-13, la seule attribution de la voix (« Safe Software décrit », l'éditeur qui se décrit) ; « Pour le problème que Murray et Lutz avaient vu de près, c'est la réponse : un logiciel différent n'empêche pas l'échange » → A-nom-18 et A-nom-13 rapprochés du problème de S01 (A-origines-20, A-origines-23) par le scénariste, sans dire que FME a été conçu pour le projet ; « C'est aussi la situation de toute équipe qui reçoit des données géographiques d'un autre bureau » → lien pédagogique vers le public (relecture d'Ilyas, I3), sans fait sur FME (voir `# Points ouverts`).

## Écran

- `Le moteur relie les formats.`
- `Formats pris en charge`
- `Moteur`
- `Don Murray · Dale Lutz`
- `D'après Safe Software`
- `Lire`
- `Écrire`

## Narration

Autour de FME, les formats pris en charge forment un large éventail.

Safe Software décrit FME comme un moteur central au milieu de ces formats.

Les données se lisent depuis n'importe lequel d'entre eux, et s'écrivent vers n'importe quel autre.

Pour le problème que Murray et Lutz avaient vu de près, c'est la réponse : un logiciel différent n'empêche pas l'échange.

C'est aussi la situation de toute équipe qui reçoit des données géographiques d'un autre bureau, sur un autre logiciel.

# S07 · Une entité géographique vit dans un format

## Intention

Poser la question de la leçon suivante : dans quel format et dans quel système de coordonnées vit une entité géographique.

## Mise en scène

- **Objet étudié** : non.
- **Écran** : au centre, une petite feuille « Entité géographique » (un contour au trait, nouveau, qui ne reprend pas le bâtiment de S04) ; deux traits en partent et s'arrêtent chacun sur un manque or, le premier portant « Format », le second « Système de coordonnées » (REGLES 4.8 : rien ne leur répond encore, la leçon suivante y répond).
- **Mouvement** : la feuille et ses deux traits arrêtés dès la première seconde de voix, le titre tapé sur « Reste à savoir » ; « Format » se pose sur « dans quel format », « Système de coordonnées » sur « dans quel système de coordonnées ». État final : la feuille et ses deux manques nommés.
- **Affirmations** : une entité a ses attributs stockés dans un format et connaît son système de coordonnées → A-nom-07, A-nom-08, posés en question, sans rien affirmer de plus. Le pont pose la question sans annoncer la leçon suivante (REGLES 2.4).

## Écran

- `Une entité vit dans un format.`
- `Entité géographique`
- `Format`
- `Système de coordonnées`

## Narration

Reste à savoir où vit une entité géographique : dans quel format est-elle stockée, et dans quel système de coordonnées ?

# Points ouverts

| Point | Proposition |
|---|---|
| Liens de récit écrits par le scénariste (S01, S02, S06) | « Chaque entreprise garde donc son logiciel, et l'échange doit pourtant se faire » (S01, conséquence de A-origines-23) ; « Pour échanger avec lui, les données de chaque logiciel doivent être traduites vers ce format » (S02 : A-origines-24 dit une traduction « pour » SAIF, sans en donner le sens ; le sens « vers SAIF » suit la consigne du brief) ; « Pour le problème que Murray et Lutz avaient vu de près, c'est la réponse » (S06, A-nom-18 rapproché de A-origines-23). La traduction pour SAIF et FME en 1996 se suivent sans lien de cause dit : si Ilyas ouvre A-origines-08 (FME présenté en 1996 comme une solution de traduction), S02 peut dire « De ce travail sort, en 1996, la première version de FME ». À confirmer un par un. |
| Les fondateurs comme acteurs (S01, S02, S06) | « Murray et Lutz voient de près ce problème à résoudre » s'appuie sur l'extrait Techcouver de A-origines-20, l'énoncé ne nommant pas les fondateurs ; « Murray et Lutz commencent par ce travail » et « leur entreprise sort la première version de son logiciel » attribuent la traduction et FME à Safe Software, que la remise dit fondée par eux (A-origines-02, A-origines-24, A-origines-22), pas à eux en personne ; le contrat et le projet forestier se suivent sans être soudés (A-origines-04 en attente). À confirmer, ou A-origines-04 à ouvrir pour dire « remportent ce contrat ». |
| Objectif 1 du brief et lien au public | Le brief écrit « expliquer ce que désignent les trois mots de Feature Manipulation Engine » ; la relecture (B2) et le brief 11 demandent de ne pas dérouler le sigle : l'objectif est lu comme « expliquer ce que fait FME » (S04, S05, S06). À reformuler dans `content/brief.md` par Ilyas ou le Super Agent. La phrase de S06 « C'est aussi la situation de toute équipe qui reçoit des données géographiques d'un autre bureau » est un lien pédagogique proposé par la relecture d'Ilyas (I3), à confirmer ; une accroche par l'écart entre le dessin et le modèle, vécu par le public entre le DAO et le BIM (remarque de fond de la même relecture), reste à proposer à Ilyas, non écrite. |
| Formulations à confirmer (S04) | « La donnée, elle, représente le bâtiment réel » pour A-nom-16 (abstraction d'un phénomène du monde réel : l'examinateur préférait le vocabulaire des normes, la relecture d'Ilyas une phrase en clair ; la phrase en clair est retenue, les normes vont à la mention de source) ; exemples d'illustration sans valeur de fait (bâtiment « Usage : bureaux », fenêtres de logiciel en nombre non compté) et globe pour le système de coordonnées. L'exercice de la conduite d'eau est retiré (G28) : `s04-conduite.svg` ne sert plus. À confirmer par Ilyas, ou à remplacer par ses exemples. |
| Ce qu'est FME (S02, S03) | A-nom-19 et A-nom-20 sont ajoutées au registre le 2026-11-27 et pas encore vérifiées (`verifie` vide) : à vérifier avant la voix. La voix porte maintenant deux présentations de l'éditeur par lui-même, « L'éditeur le présente comme une plateforme d'intégration de données » (S03, A-nom-20, demandé par le brief 15) et « Safe Software décrit FME comme un moteur central » (S06, A-nom-13), et aucune formule « selon » ou « d'après » ; pour revenir à une seule, S03 peut dire « La plateforme FME comprend FME Form, pour construire les traitements, et FME Flow, pour les automatiser » (A-sig-09 seule) et laisser « plateforme d'intégration de données » à la mention de source. « Il lit des données dans un format et les écrit dans un autre » (S03) dit sans attribution la seconde moitié de A-nom-13, que S06 reprend avec le moteur. Le logo « FME by Safe Software » est celui d'aujourd'hui, posé sur le jalon 1996 parce que la voix y nomme FME pour la première fois ; il peut aller sur « Aujourd'hui, l'éditeur dit simplement FME » si Ilyas le préfère. La légende écrit SAIF deux fois (format, norme), comme le demande le brief 15. `content/brief.md` reste à mettre à jour par Ilyas ou le Super Agent : plus d'exercice (ligne Interactivité, Défauts retenus), FME Form et FME Flow nommés (porte Q12, contre « ni noms des produits actuels »), objectif 3 montré et non plus pratiqué. |
| Durée, question d'ouverture et mentions de source | Environ 3:30 de voix sans exercice, la leçon jouée vers 5 minutes, sous la fourchette de 6 à 8 minutes du brief, comme le demande le brief 15 ; rallonger demanderait d'ouvrir des affirmations en attente (A-origines-03, A-origines-04, A-sig-02). La question d'ouverture peut devenir une affirmation (« Reste à faire passer les mêmes données géographiques d'un logiciel à l'autre. »). Les mentions de source de la marge (« D'après la presse spécialisée et Safe Software », « D'après Safe Software et l'OGC »…) sont à caler par le graphiste sur la convention de la carte. |

# Test du débutant

Non fait dans ce rôle : il demande un lecteur neuf, sans aucun fichier du projet, à qui l'on donne une seule fois, dans l'ordre, la narration et les textes à l'écran (conventions BIMaccess § 0), et ce rôle ne peut pas lancer un autre agent. À faire par le Super Agent avant la voix ; réponses à recopier ici mot pour mot : l'idée dite avec ses mots, les mots non compris, ce qu'il a dû retenir, et ce qu'est FME pour lui (logiciel, format, norme ou méthode).
