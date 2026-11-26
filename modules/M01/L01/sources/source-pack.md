# FME001-M01-L01 · Pack de sources

Construit par recherche (skill `pack-recherche`), faute de pack fourni. Chaque paragraphe renvoie à ses affirmations `[A-axe-NN]` de `affirmations.yaml`, qui portent les sources, les extraits et la confiance calculée par `check_pack.py`. Trois axes fusionnés (`nom`, `origines`, `sig`), 44 affirmations, consultées le 2026-11-26.

## 1. Identification et portée

| | |
|---|---|
| Identifiant | FME001-M01-L01 |
| Titre de travail | Feature Manipulation Engine : un nom qui dit le métier |
| Acquis visé | expliquer ce que désignent « feature », « manipulation » et « engine » ; dire qui a créé FME, pour quel problème de départ, et pourquoi l'outil a fini au centre des échanges de données SIG |
| Durée | 6 à 8 minutes |
| Public | professionnels du BIM et de la construction, sans notion de SIG supposée |

La leçon dit le sens des trois mots, l'histoire de départ (fondateurs, lieu, date, premier client, premier format), le problème de l'interopérabilité des données spatiales en une idée, et Safe Software en bref. Elle laisse aux leçons voisines la construction d'un espace de travail (L03), le détail des formats et des systèmes de coordonnées (L02), les cas d'usage SIG (L04), FME Flow et l'automatisation, le BIM vers SIG (L05).

## 2. Ce que les sources établissent, par question

### Q1 · Que veut dire « feature » en information géographique ?

Dans le vocabulaire des normes de l'information géographique, une feature est l'abstraction d'un phénomène, ou d'une entité, du monde réel : c'est la définition de la spécification abstraite de l'OGC, que le W3C cite aussi d'après ISO 19101. [A-nom-16] La formulation propre à ISO 19101 ne vient que d'une citation du W3C, le texte de la norme n'ayant pas été lu. [A-nom-01] Le même glossaire donne pour exemples presque tout ce qui se place dans le temps et l'espace (bâtiments, villes, arbres, pipelines) et note que « feature » et « objet » s'emploient souvent comme synonymes. [A-nom-02] La norme Simple Feature Access de l'OGC est aussi publiée comme ISO 19125. [A-nom-03]

### Q2 · Safe Software présente-t-elle FME comme « Feature Manipulation Engine » ?

Oui : la fiche de l'éditeur écrit « FME (Feature Manipulation Engine) », et deux médias indépendants (Techcouver, Business in Vancouver) donnent le même développement. [A-nom-04] La documentation actuelle écrit toutefois que FME était « à l'origine » le Feature Manipulation Engine, et nomme ses produits FME Form et FME Flow : le développement y est présenté comme le nom d'origine, sans que l'éditeur dise l'avoir abandonné. [A-nom-04, A-nom-05] Aucune date de début ni d'abandon du développement n'a été trouvée (§ 7).

### Q3 · Que fait FME d'une feature ?

Dans la documentation FME, une feature porte une géométrie, qui représente son information de position (points, lignes ou surfaces ; des features sans géométrie existent) [A-nom-06], des attributs, qui font toujours partie de la feature quel que soit le format de stockage [A-nom-07], et un système de coordonnées, qui lui donne sa position sur la Terre [A-nom-08]. FME lit les données source et range l'information de leurs features dans des attributs de format, puis écrit les données de destination avec un second jeu d'attributs de format. [A-nom-09] La documentation sépare deux gestes : lire et écrire avec des readers et des writers, transformer avec des transformers [A-nom-10], ceux-ci servant à manipuler la géométrie et les attributs des données spatiales [A-nom-11]. C'est le « manipulation » du nom, dans les mots de l'éditeur.

### Q4 · Que veut dire « engine » ?

Le glossaire de FME définit l'engine comme le composant qui traite les demandes de travaux en exécutant des espaces de travail. [A-nom-12] Safe Software décrit FME comme un moteur central au milieu d'un large éventail de formats : les données se lisent depuis un format et s'écrivent vers n'importe quel autre. [A-nom-13] La documentation décrit aussi une FME Command-Line Engine, et présente Workbench comme l'outil où se créent les modèles exécutés par FME Flow. [A-nom-14] Le « moteur commun » à plusieurs produits n'est attesté que par l'extension d'Esri (Q11) : pas de page qui le dise pour FME Form et FME Flow ensemble (§ 7).

### Q5 · Qui a fondé Safe Software, quand, où ?

Safe Software a été fondée par Don Murray et Dale Lutz [A-origines-02], en 1993 [A-origines-14]. L'éditeur donne le jour exact de la constitution en société, le 13 décembre 1993, mais seul [A-origines-01]. Il situe la fondation à Surrey, en Colombie-Britannique, sans source indépendante pour ce lieu [A-origines-21] ; Surrey est attesté par des tiers comme siège actuel [A-sig-07]. Les deux fondateurs s'étaient rencontrés chez MacDonald, Dettwiler and Associates (MDA), et Murray avait ensuite enseigné au British Columbia Institute of Technology : trois médias le disent, aucune page de l'éditeur. [A-origines-03]

### Q6 · Quel projet, quel client, quel problème au départ ?

Safe Software est née d'un contrat du gouvernement de la Colombie-Britannique, remporté par Murray et Lutz sur appel d'offres. [A-origines-15] Le projet, au début des années 1990, portait sur l'échange de données géographiques forestières entre les entreprises forestières et le gouvernement provincial. [A-origines-20] Selon XYHT, ces entreprises utilisaient des logiciels différents, et le gouvernement, plutôt que d'imposer un éditeur, a choisi d'inventer son propre format avec des traducteurs vers les logiciels du commerce. [A-sig-02, A-origines-04] Les premiers travaux de l'entreprise portaient sur le passage de données CAD vers le SIG. [A-origines-05] Le ministère client n'est nommé par aucune page lue (§ 7, porte Q4).

### Q7 · Qu'est-ce que SAIF, et quel lien avec « Safe » ?

SAIF, Spatial Archive and Interchange Format, prononcé « safe », est une norme canadienne d'échange de données géographiques. [A-origines-17] C'est un produit de la Surveys and Resource Mapping Branch du ministère de l'Environnement, des Terres et des Parcs de la Colombie-Britannique [A-origines-18], approuvé en 1993 comme norme nationale du Canada par le processus de l'Office des normes générales du Canada [A-origines-19]. Le nom de l'entreprise vient de là : SAIF se prononce « safe », et les fondateurs en ont fait le nom de la société et du domaine safe.com. [A-origines-07] La même Branch a chargé Safe Software de produire la boîte à outils logicielle de SAIF, et la FAQ de SAIF était tenue par Dale Lutz : l'entreprise était au cœur du format. [A-origines-16] Le communiqué de Safe de 2008 parle d'un « format propriétaire », ce que la spécification contredit (§ 5). [A-origines-06]

### Q8 · Quand FME est-il devenu un produit ?

Les sources ne s'accordent pas sur la date d'apparition de FME : 1993 sur la page d'histoire actuelle de l'éditeur, 14 novembre 1996 dans son communiqué de 2008 (§ 5). [A-origines-08, A-origines-09] L'éditeur date de 1997 sa première vente internationale, à l'Arpentage national de Finlande [A-origines-10], et l'arrivée d'Esri Sverige parmi ses premiers revendeurs [A-origines-11]. Selon Lutz, l'entreprise s'est liée très tôt à SDE d'Esri, ce qui lui a ouvert de gros projets avec des entreprises de télécommunications et de services publics. [A-origines-12]

### Q9 · Quel problème d'interopérabilité FME résout-il ?

Safe Software décrit le problème comme des données spatiales stockées dans de nombreux systèmes différents, chacun avec ses conventions de structure et de coordonnées. [A-sig-01] Le cas de départ en donne l'image concrète : des entreprises forestières aux logiciels différents, un gouvernement qui veut échanger avec toutes. [A-origines-20, A-sig-02]

### Q10 · Combien de formats ?

L'éditeur annonce « 800+ supported formats » sur une page et « over 1,000 integrations » sur une autre, sans date de mise à jour visible ; XYHT parlait de 400 formats environ. [A-sig-03, A-sig-04] Aucun chiffre n'est en narration (porte Q7).

### Q11 · Quel lien entre FME et Esri ?

L'extension ArcGIS Data Interoperability d'Esri repose sur la technologie FME : Esri le dit sur deux pages, et Dale Lutz le dit aussi. [A-sig-05] Lutz parle d'un produit FME « sous une autre marque », Esri d'une extension qui « utilise la technologie FME » (§ 5). L'année de début du partenariat n'a pas été trouvée (§ 7).

### Q12 · Safe Software aujourd'hui

Safe Software a son siège à Surrey, en Colombie-Britannique [A-sig-07] ; l'éditeur date de 2018 l'inauguration de ce siège [A-origines-13]. Depuis la version 23.0, FME Desktop s'appelle FME Form et FME Server, FME Flow [A-sig-06]. L'effectif varie selon la source et la date : 180 et plus (fiche de l'éditeur, non datée), 270 (Business in Vancouver), près de 300 (Techcouver, octobre 2024). [A-sig-08]

## 3. Terminologie

| Terme | Sens dans la leçon | Affirmation |
|---|---|---|
| feature | abstraction d'un phénomène ou d'une entité du monde réel ; dans FME, une géométrie, des attributs et un système de coordonnées | A-nom-16, A-nom-06, A-nom-07, A-nom-08 |
| géométrie | information de position d'une feature (points, lignes, surfaces) | A-nom-06 |
| attribut | information descriptive, qui reste attachée à la feature quel que soit le format | A-nom-07 |
| reader, writer | ce qui lit et écrit les données dans un format | A-nom-09, A-nom-10 |
| transformer | outil qui manipule la géométrie et les attributs | A-nom-10, A-nom-11 |
| engine | composant de FME qui exécute les espaces de travail ; moteur central entre les formats | A-nom-12, A-nom-13 |
| SAIF | Spatial Archive and Interchange Format, norme canadienne d'échange de données géographiques, prononcée « safe » | A-origines-17 |
| FME Form, FME Flow | noms, depuis la version 23.0, de FME Desktop et FME Server | A-sig-06 |

La traduction française de « feature » (entité, objet géographique) n'est donnée par aucune source du pack : porte Q3.

## 4. Nuances et pièges

- **Constitution, fondation, sortie du produit.** Le 13 décembre 1993 est la date de constitution de la société [A-origines-01], pas celle de la sortie de FME [A-origines-08]. L'année 1993 seule est sûre pour la fondation [A-origines-14].
- **Siège et lieu de fondation.** Surrey est sûr comme siège actuel [A-sig-07] ; comme lieu de fondation, seul l'éditeur le dit [A-origines-21]. Le siège actuel date de 2018 [A-origines-13].
- **Gouvernement provincial, pas fédéral.** XYHT écrit « the Canadian government » pour un projet de la Colombie-Britannique ; les autres sources et la spécification SAIF parlent du gouvernement provincial. [A-origines-15, A-origines-18]
- **SAIF n'est pas un format propriétaire.** La spécification dit norme nationale approuvée par l'Office des normes générales du Canada. [A-origines-19, A-origines-06]
- **« À l'origine » Feature Manipulation Engine.** L'éditeur présente aujourd'hui le développement comme le nom d'origine ; dire que FME « signifie » Feature Manipulation Engine reste sourcé, mais la leçon ne doit pas laisser croire que c'est le nom commercial actuel. [A-nom-04, A-nom-05]
- **Un moteur, plusieurs produits.** Seul le cas d'Esri est attesté ; ne pas généraliser à « tous les produits du marché ». [A-sig-05]
- **Les sources de l'histoire parlent surtout de l'éditeur.** Le texte publié par The American Surveyor en 2008 est un communiqué de Safe Software : il compte comme source de l'éditeur, pas comme presse indépendante. La presse d'affaires (Business in Vancouver, BCBusiness, Techcouver, GeoConnexion) rapporte surtout des propos des fondateurs.

## 5. Contradictions entre sources

| Sujet | Version 1 | Version 2 | Affirmations |
|---|---|---|---|
| Apparition de FME | page d'histoire actuelle de l'éditeur : « We introduced FME to the world » en 1993 | communiqué de l'éditeur (2008) : FME publié le 14 novembre 1996 ; Wikipedia : première version en 1996 ; un fil du forum FME fête en 2012 les 16 ans de la sortie officielle | A-origines-09, A-origines-08 |
| Nature de SAIF | communiqué de l'éditeur (2008) : « proprietary format developed by the BC Government » | spécification SAIF : norme nationale du Canada approuvée en 1993 | A-origines-06, A-origines-19 |
| Gouvernement client | XYHT : « The Canadian government » | BCBusiness, communiqué de l'éditeur : gouvernement de la Colombie-Britannique | A-origines-15, A-origines-04 |
| Extension d'Esri | Dale Lutz (XYHT) : le produit FME Desktop « rebranded » | Esri : l'extension « uses FME technology », à côté d'un produit distinct, FME Esri Edition | A-sig-05 |
| Nombre de formats | « 800+ supported formats » | « over 1,000 integrations », « 500+ systems » ; XYHT : environ 400 formats | A-sig-03, A-sig-04 |
| Lieu | l'éditeur : fondée à Surrey | XYHT : « Vancouver, BC, area » ; Wikipedia : Vancouver (Surrey fait partie de la région de Vancouver) | A-origines-21, A-sig-07 |
| Effectif | fiche de l'éditeur : 180 et plus | Business in Vancouver : 270 ; Techcouver (2024) : près de 300 ; XYHT (ancien) : environ 150 | A-sig-08 |

## 6. Banque visuelle documentaire

| ID | Source | Description | Utilité | Usage |
|---|---|---|---|---|
| VIS-01 | docs.safe.com, « What is FME » (Safe Software) | figure signalée par sa légende : FME comme moteur central au milieu des formats pris en charge ; image non vue | modèle d'un schéma en étoile pour « engine » | REDRAW |

Aucune capture ni logo de Safe Software ou d'Esri n'est repris. La spécification SAIF (copyright 1994, Province de la Colombie-Britannique) n'a pas été examinée pour ses figures.

## 7. Lacunes

- **Texte d'ISO 19101** non lu (iso.org refuse) ; la définition passe par l'OGC et le W3C. La traduction française de « feature » n'est pas sourcée.
- **Date d'usage du développement** « Feature Manipulation Engine » : ni début ni abandon trouvés.
- **Feature en une phrase dans la documentation FME** : les éléments viennent de trois pages ; le glossaire FME renvoie 404.
- **Moteur commun à FME Form, FME Flow et aux extensions tierces** : non confirmé par une page ouverte, hors Esri.
- **Lieu de fondation** : seul l'éditeur dit Surrey.
- **Parcours de Dale Lutz** avant la fondation : seul MDA est attesté.
- **Ministère client** : une recherche cite le Ministry of Forests (ITWorldCanada, page refusée 403) ; la spécification SAIF nomme le ministère de l'Environnement, des Terres et des Parcs comme auteur du format, pas comme client du contrat.
- **Première sortie de FME** : aucune source indépendante de l'éditeur ; l'annonce de novembre 1996 dans un groupe de discussion n'a pas été ouverte.
- **Étapes datées 1996 à 1997** : seules celles de la page d'histoire de l'éditeur.
- **Définition du problème d'interopérabilité par un tiers** : seul XYHT ; Directions Magazine en erreur.
- **Nombre de formats** : pas de date de page, pas de source indépendante.
- **Début du partenariat avec Esri** : non trouvé (billet Esri refusé 403).
- **Date de sortie de FME 23.0** et effectif actuel : non lus sur une page datée.

Sans ces points, la leçon tient : elle date la fondation (1993) sans dater FME, nomme la Colombie-Britannique sans ville ni ministère, et ne donne aucun chiffre de formats.

## 8. Carte des sources

| Source | Éditeur | Niveau | Affirmations |
|---|---|---|---|
| docs.ogc.org, Features and geometry, Part 1: Feature models (17-087r13) | OGC | A | A-nom-16 |
| ogc.org, Simple Feature Access | OGC | A | A-nom-03 |
| w3.org, ISSUE-190 (glossaire, cite ISO 19101) | W3C | B | A-nom-01, A-nom-02, A-nom-16 |
| docs.safe.com, What is FME | Safe Software | A | A-nom-04, A-nom-05, A-nom-13 |
| docs.safe.com, About Feature Type Attributes | Safe Software | A | A-nom-06, A-nom-07, A-nom-09 |
| docs.safe.com, About Coordinate Systems | Safe Software | A | A-nom-08 |
| docs.safe.com, FME Form Documentation (accueil) | Safe Software | A | A-nom-10 |
| docs.safe.com, FME Components | Safe Software | A | A-nom-11, A-nom-14 |
| docs.safe.com, Engine (terminologie) | Safe Software | A | A-nom-12 |
| cdn.safe.com, FactSheet (PDF) | Safe Software | A | A-nom-04, A-origines-02, A-origines-14, A-origines-21 |
| fme.safe.com, It was 20 years ago today (2013) | Safe Software | A | A-origines-01 |
| amerisurv.com, Safe Software Celebrates 15 Years (communiqué) | Safe Software | A | A-origines-01, A-origines-04, A-origines-06, A-origines-07, A-origines-08, A-origines-15 |
| bctechnology.com, communiqué de 2017 (paragraphe « About Safe Software ») | Safe Software | A | A-origines-20, A-origines-21 |
| safe.com/company et safe.com/about/history-leadership | Safe Software | A | A-origines-09, A-origines-10, A-origines-11, A-origines-13, A-sig-07 |
| s2k-ftp.cs.berkeley.edu, SAIF FAQ (tenue par Dale Lutz) | Safe Software | A | A-origines-06, A-origines-17, A-origines-18, A-origines-19 |
| s2k-ftp.cs.berkeley.edu, The SAIF Toolkit | Safe Software | A | A-origines-16 |
| fme.safe.com, Challenges in Spatial Database Interoperability (2009) | Safe Software | A | A-sig-01 |
| fme.safe.com, Get started ; Integrations | Safe Software | A | A-sig-03, A-sig-04 |
| safe.com, nouveaux noms des produits | Safe Software | A | A-sig-06 |
| s2k-ftp.cs.berkeley.edu, SAIF 3.1 Foreword | Province de la Colombie-Britannique | A | A-origines-06, A-origines-07, A-origines-17, A-origines-18, A-origines-19 |
| esri.com, Safe Software Inc (Esri Partner Network) ; pro.arcgis.com, Data Interoperability | Esri | A | A-sig-05 |
| xyht.com, Freeing the data | XYHT | B | A-origines-02, A-origines-03, A-origines-04, A-origines-05, A-origines-07, A-origines-12, A-origines-15, A-origines-20, A-sig-02, A-sig-05 |
| nsnews.com, Don Murray is going for growth (article de Business in Vancouver) | Business in Vancouver | B | A-nom-04, A-origines-02, A-origines-03, A-origines-14 |
| bcbusiness.ca, Entrepreneur of the Year 2024 | BCBusiness | B | A-origines-03, A-origines-15 |
| techcouver.com, 2023 et 2024 | Techcouver | B | A-nom-04, A-origines-14, A-origines-20, A-sig-07, A-sig-08 |
| geoconnexion.com, entretien avec Don Murray | GeoConnexion | B | A-origines-05, A-origines-14 |
| en.wikipedia.org, FME (software) | Wikipedia | C | A-origines-02, A-origines-06, A-origines-08, A-sig-06 |
| community.safe.com, How old is FME? | Communauté FME (forum) | C | A-origines-08 |

## 9. Remise au scénariste

**Sûr (confiance forte, narration).** FME, à l'origine Feature Manipulation Engine, développement que donnent l'éditeur et deux médias [A-nom-04]. Une feature est l'abstraction d'un phénomène du monde réel [A-nom-16]. Safe Software a été fondée en 1993 [A-origines-14] par Don Murray et Dale Lutz [A-origines-02], à partir d'un contrat du gouvernement de la Colombie-Britannique remporté sur appel d'offres [A-origines-15], dans un projet d'échange de données géographiques forestières [A-origines-20]. Le format du projet s'appelait SAIF, norme canadienne prononcée « safe », produite par un service du gouvernement provincial [A-origines-17, A-origines-18] ; il a donné son nom à l'entreprise [A-origines-07]. L'extension ArcGIS Data Interoperability d'Esri repose sur FME [A-sig-05]. Le siège est à Surrey [A-sig-07].

**Sourcé par l'éditeur seul (confiance moyenne, narration possible sans date ni chiffre).** La feature dans FME : géométrie, attributs, système de coordonnées [A-nom-06, A-nom-07, A-nom-08] ; lire, transformer, écrire [A-nom-09, A-nom-10, A-nom-11] ; l'engine qui exécute et le moteur central entre les formats [A-nom-12, A-nom-13] ; le problème des données éparpillées [A-sig-01] ; les débuts CAD vers SIG, dit par deux médias [A-origines-05]. La voix dit « selon Safe Software » quand l'affirmation le porte.

**Attend l'expert (porte).** La date d'apparition de FME et le jour de constitution [A-origines-01, A-origines-08, A-origines-09] ; le cadrage du nom « à l'origine » [A-nom-05] ; la traduction de « feature » ; le ministère client [A-origines-04] ; Surrey comme lieu de fondation [A-origines-21] ; le parcours des fondateurs [A-origines-03] ; le nombre de formats [A-sig-03, A-sig-04] ; les noms FME Form et FME Flow et l'effectif [A-sig-06, A-sig-08] ; les étapes de 1997 [A-origines-10, A-origines-11].

**Ne se dit pas.** « Format propriétaire » pour SAIF [A-origines-06] ; « gouvernement canadien » pour le client [A-origines-04] ; une date de sortie de FME tant que l'expert n'a pas tranché ; un nombre de formats ; un ministère client ; « pionnier », « leader » ou « première solution » ; tout ce qui figure en § 7.
