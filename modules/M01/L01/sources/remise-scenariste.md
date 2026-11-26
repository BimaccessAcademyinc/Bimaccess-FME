# Remise au scénariste

Générée par `check_pack.py --remise` depuis `affirmations.yaml` : ne pas modifier à la main.

## Ce que la voix et l'écran peuvent dire

| Affirmation | Énoncé | Confiance | Question |
|---|---|---|---|
| A-nom-04 | Safe Software présente FME comme l'acronyme de « Feature Manipulation Engine » ; sa documentation actuelle écrit que FME était « à l'origine » le Feature Manipulation Engine. | forte | Q2 |
| A-nom-06 | Dans la documentation FME, la géométrie représente l'information de position d'une feature, et peut se composer de points, de lignes ou de surfaces ; des features sans géométrie existent aussi. | moyenne | Q3 |
| A-nom-07 | Dans FME, les attributs utilisateur font toujours partie de la feature, quel que soit le format dans lequel ils sont stockés. | moyenne | Q3 |
| A-nom-08 | Toute feature traitée par FME connaît son système de coordonnées et donc sa position sur la Terre. | moyenne | Q3 |
| A-nom-09 | Selon la documentation, FME lit les données source et stocke l'information de leurs features dans des attributs de format, puis écrit les données de destination en créant un second jeu d'attributs de format. | moyenne | Q3 |
| A-nom-11 | Safe Software décrit les outils de transformation de FME Workbench comme servant à manipuler la géométrie et les attributs des données spatiales. | moyenne | Q3 |
| A-nom-12 | Le glossaire de la documentation FME définit l'engine comme le composant de FME qui traite les demandes de travaux en exécutant des espaces de travail (workspaces). | moyenne | Q4 |
| A-nom-13 | Safe Software décrit FME comme un moteur central au milieu d'un large éventail de formats pris en charge ; les données peuvent être lues depuis n'importe quel format et écrites vers n'importe quel autre. | moyenne | Q4 |
| A-nom-16 | Dans le vocabulaire des normes de l'information géographique, une feature est l'abstraction d'un phénomène (ou d'une entité) du monde réel. | forte | Q1 |
| A-origines-02 | Safe Software a été fondée par Don Murray et Dale Lutz. | forte | Q5 |
| A-origines-07 | Le nom « Safe » vient de SAIF (prononcé comme « safe »), format du projet de départ. | forte | Q7 |
| A-origines-14 | Safe Software a été fondée en 1993. | forte | Q5 |
| A-origines-15 | Safe Software est née d'un contrat du gouvernement de la Colombie-Britannique, remporté par Murray et Lutz sur appel d'offres. | forte | Q6 |
| A-origines-17 | SAIF (Spatial Archive and Interchange Format, prononcé « safe ») est une norme canadienne d'échange de données géographiques. | forte | Q7 |
| A-origines-20 | Le projet de départ, au début des années 1990, portait sur l'échange de données géographiques forestières en Colombie-Britannique, entre les entreprises forestières et le gouvernement provincial. | forte | Q6 |
| A-sig-07 | Safe Software a son siège à Surrey, en Colombie-Britannique. | forte | Q12 |
| A-origines-22 | La première version de FME sort en 1996, trois ans après la fondation de Safe Software. | forte | Q8 |
| A-nom-17 | FME s'appelait à l'origine Feature Manipulation Engine ; l'éditeur dit aujourd'hui FME. | forte | Q2 |
| A-nom-18 | FME permet de partager des données géographiques entre des logiciels différents. | forte | Q9 |
| A-origines-23 | Les entreprises forestières utilisaient des logiciels différents, et le gouvernement ne voulait pas leur imposer un même éditeur. | forte | Q6 |
| A-origines-24 | Safe Software commence par développer une technologie de traduction pour un format du gouvernement de la Colombie-Britannique, SAIF. | moyenne | Q6 |

## Terminologie décidée

- **feature** : « entité géographique » partout dans la voix et à l'écran ; « feature » montré une fois comme le mot de l'outil (porte-expert.md#Q3)

## Ce qui ne se dit pas (contexte, ou en attente de l'expert)

- A-nom-01 (expert) : Dans la norme ISO 19101, une feature est l'abstraction d'un phénomène du monde réel.
- A-nom-02 (contexte) : Le glossaire cité par le W3C donne comme exemples de features presque tout ce qui peut être placé dans le temps et l'espace : bureaux, bâtiments, villes, arbres, pipelines, et précise que les termes feature et objet sont souvent employés comme synonymes.
- A-nom-03 (contexte) : Simple Feature Access, partie 1, est aussi publiée comme ISO 19125 et décrit l'architecture commune de la géométrie des simple features.
- A-nom-05 (contexte) : La documentation de Safe Software nomme ses produits actuels « FME Form » (version 2026.3) ; le nom du produit n'y est plus « Feature Manipulation Engine » mais FME, l'expansion étant rappelée comme nom d'origine.
- A-nom-10 (expert) : La documentation d'FME Form organise le travail en deux gestes distincts : lire et écrire les données avec des readers et des writers, transformer les données avec des transformers.
- A-nom-14 (contexte) : La documentation d'FME Form décrit une FME Command-Line Engine qui permet de soumettre des demandes de traduction en ligne de commande, et présente Workbench comme l'outil de création des modèles d'FME Flow.
- A-origines-01 (expert) : Safe Software a été officiellement constituée en société le 13 décembre 1993.
- A-origines-03 (expert) : Don Murray et Dale Lutz se sont rencontrés en travaillant sur un projet de moteur d'analyse de données chez MacDonald, Dettwiler and Associates (MDA) ; Murray a ensuite quitté MDA pour enseigner au British Columbia Institute of Technology, tout en restant en contact avec Lutz.
- A-origines-04 (expert) : Le projet de départ était un contrat pour le gouvernement canadien (Colombie-Britannique) visant à suivre l'exploitation forestière par des entreprises privées ; Murray et Lutz ont remporté le contrat portant sur les premiers travaux de ce projet.
- A-origines-05 (expert) : Les premiers travaux de Safe Software portaient sur le passage de données CAD vers le SIG.
- A-origines-06 (expert) : SAIF est le sigle de Spatial Archive and Interchange Format, un format propriétaire développé par le gouvernement de la Colombie-Britannique.
- A-origines-08 (expert) : Selon la presse spécialisée (2008), Safe Software a publié FME le 14 novembre 1996, présenté comme la première solution technologique de traduction et de manipulation de données spatiales.
- A-origines-09 (expert) : L'éditeur situe en 1993 l'introduction de FME au monde, début d'un parcours qu'il dit durer depuis 33 ans.
- A-origines-10 (expert) : En 1997, Safe Software a réalisé sa première vente internationale, à l'Arpentage national de Finlande (National Land Survey), qui a adopté FME.
- A-origines-11 (expert) : Esri Sverige a été l'un des premiers revendeurs à valeur ajoutée de Safe Software (entrée datée de 1997 sur la page de l'éditeur).
- A-origines-12 (contexte) : Safe Software s'est retrouvée liée très tôt à SDE d'Esri, ce qui lui a apporté de gros projets avec des entreprises de télécommunications et de services publics.
- A-origines-13 (contexte) : Le siège de Safe Software à Surrey (Colombie-Britannique) a été dévoilé en 2018.
- A-origines-16 (contexte) : La Surveys and Resource Mapping Branch de la Colombie-Britannique a chargé Safe Software de produire la SAIF Toolkit, ensemble de composants logiciels pour utiliser SAIF.
- A-origines-18 (expert) : SAIF est un produit de la Surveys and Resource Mapping Branch du ministère de l'Environnement, des Terres et des Parcs de la Colombie-Britannique.
- A-origines-19 (contexte) : SAIF a été approuvé en 1993, par le processus de l'Office des normes générales du Canada (CGSB), comme norme nationale du Canada.
- A-origines-21 (expert) : Selon Safe Software, l'entreprise a été fondée à Surrey, en Colombie-Britannique.
- A-sig-01 (expert) : Safe Software décrit le problème de départ comme des données spatiales stockées dans de nombreux systèmes différents, chacun avec ses propres conventions de structure et de coordonnées.
- A-sig-02 (expert) : Selon un article de XYHT, le problème de départ venait de ce que les entreprises forestières de Colombie-Britannique utilisaient des logiciels différents, et le gouvernement a choisi d'inventer son propre format avec des traducteurs vers les logiciels commerciaux.
- A-sig-03 (expert) : La page d'accueil de démarrage de FME annonce « 800+ supported formats » (formats pris en charge).
- A-sig-04 (expert) : La page des intégrations de FME annonce « over 1,000 integrations ».
- A-sig-05 (contexte) : L'extension ArcGIS Data Interoperability d'Esri repose sur la technologie FME de Safe Software.
- A-sig-06 (expert) : À partir de la version 23.0, FME Desktop devient FME Form et FME Server devient FME Flow ; les versions antérieures gardent leurs noms d'origine.
- A-sig-08 (expert) : En octobre 2024, Techcouver écrit que Safe Software approche les 300 employés.
