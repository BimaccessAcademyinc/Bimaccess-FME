# FME001-M01-L02 · Pack de sources

Construit par recherche (skill `pack-recherche`), faute de pack fourni. Chaque paragraphe renvoie à ses affirmations `[A-axe-NN]` de `affirmations.yaml`, qui portent les sources, les extraits et la confiance calculée par `check_pack.py`. Cinq axes de recherche, 114 affirmations, 107 après fusion des doublons, 121 avec les sources et affirmations ajoutées à la consolidation (2026-11-27), 130 avec les neuf affirmations découpées après vérification.

Le pack suit l'état vérifié. Une affirmation refusée par le vérificateur (`verifie: false`) ne se cite plus comme sûre : quand une affirmation plus étroite en a été découpée (champ `decoupe_de`, `verifie: null`), c'est elle que le pack cite ; sinon la phrase passe dans ce qui attend l'expert ou ce qui ne se dit pas (§ 10). Une affirmation passée en `expert` se lit « à la porte », quelle que soit sa confiance.

Lecture des confiances : **forte** veut dire au moins deux éditeurs indépendants dont une source primaire ; **moyenne**, une source primaire seule ; **faible**, le reste. Un chiffre, une date ou un numéro de norme que la voix dirait demande la confiance forte.

## 1. Identification et portée

| | |
|---|---|
| Identifiant | FME001-M01-L02 |
| Titre de travail | Le problème de l'interopérabilité |
| Public | professionnels du BIM et de la construction qui n'ont jamais ouvert FME ; ils ont vu L01 (« feature », histoire de Safe Software, FME qui lit, transforme et écrit) |
| Acquis visé | dire pourquoi deux SIG ne s'échangent pas leurs données tels quels, en nommant quatre obstacles (formats, modèles de données, systèmes de coordonnées, sémantique), et à quoi servent les normes ouvertes |
| Durée | 6 à 8 minutes |
| Limites | ni l'histoire de Safe Software (L01), ni l'espace de travail FME (L03), ni la reprojection et sa manipulation (L04), ni FME Form, FME Flow, le BIM vers SIG et l'IFC (L05) |

## 2. Ce que les sources établissent, par question

### Q1 · Définir l'interopérabilité des données géographiques

La définition la plus sûre est celle de la directive européenne INSPIRE : la possibilité de combiner des jeux de données spatiales et de faire interagir des services sans intervention manuelle répétée, avec un résultat cohérent et une valeur accrue des données et services. Elle est lue dans le texte de la directive et reprise mot pour mot par une publication académique indépendante (confiance forte). [A-interop-01]

Deux autres définitions existent, toutes deux à la porte : celle qu'un rapport de l'OGC attribue à ISO 19119 (communiquer, exécuter des programmes, transférer des données entre unités fonctionnelles sans que l'utilisateur ait à connaître leurs particularités), dont l'attribution à une norme est contestée, et celle qu'un wiki attribue à l'OGC (2004), dont le texte d'origine n'a pas été retrouvé. [A-interop-02, A-interop-03]

À titre de contexte seulement : l'évaluation d'INSPIRE note que ses règles d'interopérabilité sont souvent jugées sur-spécifiées par les fournisseurs de données. [A-interop-12]

### Q2 · Les niveaux d'interopérabilité

Deux niveaux ont chacun une définition sûre. L'**interopérabilité syntaxique** : les systèmes peuvent échanger des données ; l'OGC la décrit comme la connexion technique qui permet de transférer les données. [A-interop-13] L'**interopérabilité sémantique** : le contenu est compris de la même façon dans les deux systèmes. [A-interop-14] Les mêmes notions se lisent, en confiance moindre, dans un rapport de l'OGC (à la porte) et un wiki (contexte). [A-interop-09, A-interop-08]

Le **niveau structurel** (les données sont structurées différemment) n'a qu'une source, un article des annales ISPRS (à la porte). [A-interop-06] Un article d'ISPRS (Bishr et al.) et une publication sur INSPIRE parlent aussi de différences ou d'un niveau « schématiques » (contexte). [A-interop-07, A-modeles-25]

Le **nombre de niveaux** est discuté (§ 5) : le modèle de référence ISO 19101-1 en nomme quatre (système, syntaxique, structurel, sémantique), ce que confirme une publication académique (à la porte : numéro de norme). [A-interop-04] L'article ISPRS écrit, au conditionnel et d'après Brodeur et al., que l'hétérogénéité « may be classified » en trois catégories ; cette phrase n'est dans aucun extrait, et l'affirmation est refusée par le vérificateur : elle ne se dit pas. [A-interop-05]

### Q3 · Coût du manque d'interopérabilité

Le seul chiffre sourcé vient des installations, pas du SIG : une étude commandée par le NIST a estimé à 15,8 milliards de dollars par an le coût d'une interopérabilité insuffisante dans l'industrie des installations (« capital facilities ») aux États-Unis, que la page découpe en bâtiments commerciaux et institutionnels et installations industrielles, pour l'année 2002 (confiance forte). [A-interop-15] La formulation d'avant, qui disait « bâtiments [...] industriels » et « américaine » sans extrait, est refusée. [A-interop-10] Le rapport juge ce chiffre probablement prudent. [A-interop-11] Aucun chiffre propre aux données géographiques n'a été trouvé (§ 8).

### Q4 · Ce qu'est un format, exemples

Le **shapefile** stocke la géométrie et les attributs sans topologie, selon sa description technique d'Esri. [A-formats-01] Cette description est un livre blanc de juillet 1998 (date à la porte). [A-formats-02]

Formats ouverts publiés : **GeoPackage**, format ouvert fondé sur des normes, qui range les données dans une base SQLite ; [A-formats-03, A-semantique-13] **GML**, grammaire XML de l'OGC pour exprimer des entités géographiques, aussi norme ISO 19136:2007 (confiance forte) ; [A-formats-04] **GeoJSON**, format d'échange fondé sur JSON, décrit dans une RFC de l'IETF ; [A-formats-05] **KML**, qui encode ce qu'il faut montrer dans un navigateur terrestre et comment. [A-formats-09]

Côté DAO, **DWG** est un format propriétaire d'Autodesk sans spécification publiée (une seule source, à la porte) ; GDAL liste un pilote pour **DGN** de MicroStation (contexte). [A-formats-07, A-formats-08]

Safe Software écrit qu'il y a de nombreuses raisons de devoir transformer des données entre formats, parmi lesquelles l'intégration de données gérées par des systèmes SIG, DAO, en trois dimensions ou de bases de données différents : une raison parmi d'autres, pas la description du besoin. [A-formats-20] La formulation d'avant (« décrit le besoin ») est refusée. [A-formats-16]

### Q5 · Ce qu'on perd en changeant de format

Le shapefile sert d'exemple documenté. Un nom de champ ne peut dépasser 10 caractères (Esri et GDAL, forte). [A-formats-10] Esri limite chaque fichier composant à 2 Go, soit un maximum d'environ 70 millions de points ; GDAL ne confirme pas cette limite et en donne d'autres (contradiction, § 5) : Esri seul, deux chiffres, à la porte. [A-formats-21, A-formats-11] Toutes les formes non nulles d'un shapefile sont du même type. [A-formats-12] Les arcs de cercle ne sont pas pris en charge : à l'export, ils deviennent des lignes à sommets rapprochés. [A-formats-13] Un shapefile ne stocke pas de valeur nulle, arrondit les nombres et gère mal l'Unicode. [A-formats-14] Il ne porte pas non plus les domaines et sous-types des géodatabases. [A-modeles-10]

Un format peut aussi imposer un système de coordonnées : en GeoJSON (RFC 7946), les coordonnées sont géographiques, en WGS 84 (IETF et GDAL, forte). [A-formats-06]

### Q6 · Combien de formats

GDAL, bibliothèque ouverte de traduction de formats, présente un modèle abstrait unique pour le raster et un pour le vecteur, quel que soit le format. [A-formats-17] La documentation de FME explique le grand nombre de formats qu'il contient par la diversité des domaines qui utilisent des données spatiales. [A-formats-19] Le nombre lui-même est contradictoire (800+ ou 300+, § 5). [A-formats-18] Aucun total de formats en circulation n'est sourcé.

### Q7 · Modèle de données et schéma d'application

Dans ISO 19109 (extrait public), un schéma d'application est un schéma conceptuel des données requises par une ou plusieurs applications ; une entité est une abstraction de phénomènes du monde réel ; un attribut, une caractéristique d'une entité ; la norme distingue types, attributs, relations entre types et comportement. Toutes ces affirmations portent un numéro de norme et une seule source : elles sont à la porte. [A-modeles-01, A-modeles-02, A-modeles-03, A-modeles-04] Dans GDAL, le schéma d'une couche est l'ensemble de ses définitions de champs (contexte). [A-modeles-05]

### Q8 · Différences de modèle qui empêchent l'échange tel quel

Le modèle des Simple Features de l'OGC part d'une classe Geometry, avec Point, Curve, Surface et GeometryCollection, et associe chaque géométrie à un système de référence spatial. [A-modeles-14, A-modeles-15] La même norme porte le nom ISO 19125 (à la porte). [A-semantique-11] ISO 19107 traite la géométrie et la topologie jusqu'à trois dimensions ; ISO 19101-1 fait d'une image raster un exemple de couverture (à la porte). [A-modeles-06, A-modeles-12]

Différences documentées : le shapefile, sans topologie et à un seul type de forme par fichier, face à des modèles plus riches ; [A-formats-01, A-formats-12, A-modeles-10] des attributs imbriqués dans certains profils GML, comme celui d'Ordnance Survey MasterMap, que GDAL détecte ; [A-modeles-13] des formats fortement normalisés en centaines de tables ou de couches, d'autres non. [A-modeles-19] Dans GDAL, une même définition d'entité peut porter plusieurs champs de géométrie (contexte). [A-modeles-09]

Safe Software donne des exemples de transformations entre différentes représentations spatiales : entre des coordonnées (x,y) stockées dans des colonnes numériques et une géométrie de point stockée dans une colonne de géométrie ; entre des attributs de surfaces associés à un point intérieur et des attributs associés directement aux entités surfaciques (découpées : « entre », comme la page, pas « de... à »). [A-modeles-33, A-modeles-34] Les formulations d'avant (« le passage de... à ») sont refusées. [A-modeles-17, A-modeles-18]

### Q9 · La transformation de schéma

Safe Software écrit que traduire entre modèles de données est nettement plus difficile que traduire entre formats, et touche les composantes spatiales et non spatiales. [A-modeles-16] Dans INSPIRE, l'harmonisation transforme les données d'un schéma source vers le modèle de la directive, le schéma cible (forte) ; [A-modeles-23] l'interopérabilité visée passe par des transformations entre formes de données nationales et formes communes. [A-modeles-32]

Selon ISO 19109, passer d'un schéma à un autre peut être difficile, voire impossible, si les schémas divergent trop ; l'interopérabilité complète suppose des schémas identiques ; le transfert passe par deux mises en correspondance (à la porte : numéro de norme, une seule source). [A-modeles-20, A-modeles-21, A-modeles-22] Une publication décrit des États membres qui stockent leurs données dans leurs propres structures et systèmes de coordonnées, incompatibles entre eux (à la porte). [A-modeles-24] Le guide technique du service de transformation INSPIRE classe ces services en formats, systèmes de coordonnées et schémas logiques (contexte, document de 2010 marqué Draft). [A-modeles-26]

Le cas portugais (carte COS vers INSPIRE) est au § 7. [A-modeles-27, A-modeles-28, A-modeles-29, A-modeles-30] ISO/TC 211 liste une norme ISO 19166 de correspondance BIM vers SIG (contexte, hors périmètre : L05). [A-modeles-31]

### Q10 · Système de référence de coordonnées

D'après la spécification abstraite de l'OGC sur le référencement par coordonnées (lue à la place d'ISO 19111, que l'ISO refuse) : un système de référence de coordonnées est un système de coordonnées relié à un objet par un référentiel (datum) ; [A-coordonnees-01] un système de coordonnées est un ensemble de règles mathématiques qui attribuent des coordonnées à des points ; [A-coordonnees-02] le référentiel fixe l'origine, l'échelle et l'orientation ; [A-coordonnees-03] une projection cartographique convertit des coordonnées ellipsoïdales vers un plan, et un système projeté dérive d'un système géographique par une projection ; [A-coordonnees-05, A-coordonnees-06] les coordonnées sont qualifiées par des unités ; [A-coordonnees-07] une transformation de coordonnées change les valeurs, pas la définition du référentiel. [A-coordonnees-08] L'ellipsoïde est une surface de référence (contexte). [A-coordonnees-04] Ces définitions ont une seule source (OGC) : confiance moyenne, dicibles sans chiffre.

La directive INSPIRE en donne une autre formulation : des systèmes qui repèrent l'information spatiale par des coordonnées ou par la latitude, la longitude et la hauteur, sur la base d'un référentiel géodésique. [A-coordonnees-33]

### Q11 · Le code EPSG et des systèmes nommés

Le registre EPSG de l'IOGP contient des définitions de systèmes de référence de coordonnées et de transformations, de portée mondiale à locale ; [A-coordonnees-09] un code EPSG identifie l'un de ces systèmes, et des logiciels comme PROJ s'en servent pour le désigner (forte). [A-coordonnees-32] L'IOGP présente le registre comme la norme de fait, lancé en 1985 et rendu public en 1993 (dates à la porte) ; son modèle suit ISO 19111:2019 (contexte). [A-coordonnees-10, A-coordonnees-11]

Systèmes nommés, lus dans le registre EPSG (une seule source chacun, codes chiffrés : à la porte) : 4326 WGS 84 ; 4617 NAD83(CSRS), Canada ; 26917 NAD83 / UTM zone 17N ; 32183 NAD83 / MTM zone 3, Québec et Terre-Neuve-et-Labrador ; 2154 RGF93 v1 / Lambert-93, France. [A-coordonnees-12, A-coordonnees-13, A-coordonnees-14, A-coordonnees-15, A-coordonnees-16, A-coordonnees-17]

En France métropolitaine, le système de référence se compose du RGF93 et de deux projections, Lambert 93 et CC 9 zones (à la porte : le BKG ne confirme que RGF93 et Lambert-93, « CC 9 zones » repose sur la DGFiP seule). [A-coordonnees-19] Le RGF93 et son ellipsoïde GRS80 sont à la porte. [A-coordonnees-18] Au Canada : adoption de NAD83 en 1990, NAD83-CSRS officiel en Ontario, zones UTM et MTM (sources provinciales, faibles : à la porte ou en contexte). [A-coordonnees-20, A-coordonnees-21, A-coordonnees-22, A-coordonnees-23] NAD83 est compatible avec WGS 84 (contexte). [A-coordonnees-29]

### Q12 · L'écart entre deux systèmes

Le cas sûr : dans les États-Unis contigus, passer de NAD 27 à NAD 83 déplace la position des points de 10 à 100 mètres selon le lieu (NGS et USGS, forte). [A-coordonnees-31] L'USGS ajoute que les valeurs UTM changent davantage, environ 200 mètres (une seule source, à la porte). [A-coordonnees-27] Les deux référentiels n'ont pas le même ellipsoïde (Clarke 1866, GRS 1980 ; une source provinciale, à la porte). [A-coordonnees-24] En Alberta, les moyennes publiées sont de 6 à 7 m vers le nord et 20 m vers l'ouest en géographiques, 225 m et 70 m en coordonnées planes Mercator transverse (une seule source provinciale, à la porte). [A-coordonnees-25, A-coordonnees-26] PROJ signale qu'une transformation approximative, sans changement de datum, peut se tromper de quelques centaines de mètres (contexte). [A-coordonnees-28]

### Q13 · La sémantique

Le cas le plus sûr est celui de la **forêt** : les États membres de l'UE appliquent des définitions différentes de la superficie forestière, et la littérature rapporte de façon répétée des sens différents donnés au terme (forte). [A-semantique-31] La fin de la formulation d'avant, « ce qui met à l'épreuve l'interopérabilité », est refusée : la phrase de Leeds qui la porte parle des informations géographiques en général, au conditionnel. [A-semantique-23] L'Agence européenne pour l'environnement ajoute que terres cultivées, prairies et zones humides se recoupent d'une politique à l'autre, et juge l'alignement sémantique la couche d'interopérabilité la plus critique pour l'utilisation des terres. [A-semantique-02, A-semantique-03]

Safe Software donne l'exemple du mot « pond » (étang), qui peut désigner des choses différentes d'un jeu de données à l'autre. [A-semantique-01] Le cadre IGIF de l'ONU écrit que, lorsque la terminologie utilisée dans les modèles de données est différente, elle peut être source de confusion et rendre difficile la mise en correspondance des données (une source B, à la porte). [A-semantique-34] La formulation d'avant, « devient difficile, voire impossible », est refusée : les sources disent « peut » et « may », et chacune n'en porte qu'une moitié. [A-semantique-29]

À la porte ou en contexte : l'hétérogénéité de syntaxe et de sémantique comme principal goulot d'étranglement ; [A-semantique-04] les 34 thèmes d'INSPIRE ; [A-semantique-07] selon l'IGN espagnol, de nombreux pays membres ont produit des bases d'occupation du sol pour leurs propres besoins, d'où des inventaires aux échelles, nomenclatures et unités minimales de cartographie très différentes (une source B) ; [A-semantique-25] le projet Cross-Forest ; [A-semantique-06] plus de 600 définitions de la forêt, chiffre de seconde main. [A-semantique-24] Ne se dit pas : ISO/TS 19150-1 et l'année 2012, lues seulement dans le titre de la fiche de BSI (adoption britannique), affirmation refusée. [A-semantique-05]

### Q14 · OGC, ISO/TC 211 et normes d'échange

L'**OGC** est une organisation internationale à but non lucratif qui élabore des normes pour l'information et les services géospatiaux (forte) ; [A-semantique-26] il élabore et met à disposition des normes ouvertes destinées à l'interopérabilité (moyenne : le cadre IGIF reprend la présentation de l'OGC par lui-même). [A-semantique-27] L'**ISO/TC 211** est le comité de l'ISO chargé de la normalisation de l'information géographique numérique, et les normes de l'OGC s'appuient sur les normes abstraites de l'ISO/TC 211 : sur ces deux points, l'IGIF reprend la présentation des organismes eux-mêmes, ce n'est pas une source indépendante (moyenne, à la porte). [A-semantique-10, A-semantique-28] L'année de fondation de l'OGC (1994) et le nombre de ses normes (150+) sont à la porte. [A-semantique-09, A-semantique-08]

Normes qui visent l'échange : GML (grammaire XML, ISO 19136, forte ; encodage pour le transport et le stockage conforme à ISO 19118, à la porte) ; [A-formats-04, A-semantique-12] GeoPackage (stockage SQLite d'entités vectorielles, de tuiles et de tables) ; [A-semantique-13] WFS (accès aux entités et à leurs propriétés par des opérations de découverte, requête, verrouillage et transaction), dont l'OGC recommande aujourd'hui le successeur OGC API - Features (contexte) ; [A-semantique-14, A-semantique-15] Simple Features (numéro ISO 19125 à la porte) ; [A-modeles-14, A-semantique-11] CityGML 3.0, modèle sémantique commun d'objets urbains 3D (à la porte). [A-semantique-16] Le cadre de l'ONU écrit que les normes ouvertes facilitent l'interopérabilité et le partage (contexte). [A-semantique-30]

Ce qu'elles ne résolvent pas : une norme commune ne supprime pas la transformation. Même avec INSPIRE, il faut transformer les données nationales vers les formes communes ; [A-modeles-23, A-modeles-32] que la mise en correspondance de schémas soit difficile quand les modèles divergent n'a que des sources seules, à la porte (IGIF : une terminologie différente « peut » la rendre difficile ; ISO 19109 : « difficile, voire impossible » si les schémas sont trop divergents). [A-semantique-34, A-modeles-20]

### Q15 · Comment Safe Software décrit le problème

Safe Software écrit qu'un défi courant (« A common challenge ») pour tirer de la valeur des données est qu'elles sont stockées un peu partout : dans des applications, des bases de données et des formats différents, et avec des modèles de données et des systèmes de coordonnées différents. [A-semantique-32] Sa documentation écrit que, traditionnellement, les logiciels qui traduisaient des données vers un autre format avaient des capacités limitées, la plupart des données étant forcées à travers un modèle de données limité, d'où une grande part du sens perdue ; elle présente FME comme un outil conçu pour être une application d'ETL spatial, centrée sur la traduction de données géographiques. [A-semantique-33]

Refusées, elles ne se disent pas : « le problème de départ » pour ce que la page appelle « A common challenge » ; [A-semantique-17] « les outils de traduction antérieurs » où la page dit « Traditionally », et « le premier outil » (revendication de l'éditeur). [A-semantique-19] Des descriptions extérieures existent, à la porte ou en contexte : un guide de 2010 rédigé pour le JRC qualifie FME de solution ETL spatiale très utilisée ; la documentation d'Esri décrit les outils d'ETL spatial (Esri est partenaire de Safe Software). [A-semantique-21, A-semantique-22]

## 3. Terminologie

| Terme | Sens dans la leçon | Affirmation |
|---|---|---|
| interopérabilité | possibilité de combiner des jeux de données et de faire interagir des services sans intervention manuelle répétée (INSPIRE) | A-interop-01 |
| interopérabilité syntaxique | les systèmes peuvent échanger les données (connexion technique) | A-interop-13 |
| interopérabilité sémantique | le contenu est compris de la même façon des deux côtés | A-interop-14 |
| hétérogénéité structurelle | données structurées différemment (une seule source, à la porte) | A-interop-06 |
| schéma d'application | schéma conceptuel des données requises par une ou plusieurs applications (ISO 19109, à la porte) | A-modeles-01 |
| harmonisation (INSPIRE) | transformation des données d'un schéma source vers le schéma cible de la directive | A-modeles-23 |
| système de référence de coordonnées | système de coordonnées relié à un objet par un référentiel | A-coordonnees-01 |
| référentiel (datum) | paramètres qui fixent l'origine, l'échelle et l'orientation d'un système de coordonnées | A-coordonnees-03 |
| projection cartographique | conversion de coordonnées ellipsoïdales vers un plan | A-coordonnees-05 |
| code EPSG | identifiant d'un système de référence de coordonnées du registre EPSG | A-coordonnees-32 |
| transformation de coordonnées | change les valeurs des coordonnées entre deux systèmes, pas la définition du référentiel | A-coordonnees-08 |
| ETL spatial | ce pour quoi FME a été conçu selon sa documentation : une application centrée sur la traduction de données géographiques ; sans « le premier » | A-semantique-33 |
| installations (« capital facilities ») | le champ du chiffre du NIST : bâtiments commerciaux et institutionnels, et installations industrielles ; pas « bâtiments industriels » | A-interop-15 |

## 4. Nuances et pièges

- Un écart de référentiel n'est pas un décalage à l'écran : les chiffres NAD 27 vers NAD 83 mesurent le déplacement des coordonnées entre deux référentiels. Ne pas les reformuler en « deux couches décalées de X mètres ». [A-coordonnees-31, A-coordonnees-27]
- Une transformation de coordonnées opère entre deux systèmes de référence de coordonnées, pas entre deux référentiels. [A-coordonnees-08]
- Le chiffre du NIST concerne l'industrie des installations aux États-Unis en 2002, pas les données géographiques. Garder le découpage de la page : bâtiments commerciaux et institutionnels, et installations industrielles ; ne pas dire « bâtiments industriels ». [A-interop-15]
- La limite de 2 Go et les 70 millions de points d'un shapefile ne sont dits que par Esri ; GDAL donne d'autres limites (§ 5). Deux chiffres en confiance moyenne : à la porte. [A-formats-21]
- « Le premier outil conçu comme ETL spatial » est une revendication de Safe Software, refusée avec son énoncé : la leçon dit « conçu pour être une application d'ETL spatial », sans « le premier ». [A-semantique-33, A-semantique-19]
- Les mots et la modalité de la source se gardent : « many reasons [...] including » ne devient pas « le besoin » ; [A-formats-20] « peut », « may » ne deviennent pas « devient » ; [A-semantique-34] « A common challenge » ne devient pas « le problème de départ » ; [A-semantique-32] « Traditionally » ne devient pas « antérieurs » ; [A-semantique-33] « between » ne devient pas « de... à ». [A-modeles-33, A-modeles-34]
- La forêt illustre des définitions différentes d'un même mot ; la phrase de Leeds sur l'interopérabilité mise à l'épreuve porte sur les informations géographiques en général, au conditionnel : ne pas la rattacher à la forêt. [A-semantique-31]
- Le cas des nomenclatures d'occupation du sol se dit avec les mots de la source : « pays membres » (Member Countries), bases produites « pour leurs propres besoins » (their own requirements). [A-semantique-25]
- Une norme commune n'efface pas la conversion : la directive INSPIRE elle-même passe par des transformations entre données nationales et formes communes. [A-modeles-32]
- La définition d'INSPIRE est lue dans deux copies du même texte de loi (EUR-Lex et legislation.gov.uk) : ce sont une seule source ; la confiance forte vient de la publication académique qui la reprend. [A-interop-01]
- Le guide technique du service de transformation INSPIRE est l'oeuvre de ses auteurs (Rob Walker Consultancy, RSW Geomatics, 1Spatial), pas une position de la Commission ; il porte la mention Draft. [A-modeles-26, A-semantique-21]

## 5. Contradictions entre sources

**Attribution d'une définition de l'interopérabilité.** Le rapport OGC Testbed-12 attribue la définition « capacité de communiquer, d'exécuter des programmes ou de transférer des données entre unités fonctionnelles… » à ISO 19119 ; le wiki marinespecies.org attribue la même phrase à ISO 19118. Aucun texte ISO n'a été lu. [A-interop-02]

**Nombre de formats de FME.** La page de démarrage de FME affiche « 800+ supported formats » ; une fiche de Safe Software chez Esri, non datée, affiche « 300+ spatial and non-spatial formats ». [A-formats-18]

**Trois ou quatre niveaux d'interopérabilité.** L'extrait public d'ISO 19101-1, et une publication de 2020 qui le cite, nomment quatre niveaux : système, syntaxique, structurel, sémantique. Un article des annales ISPRS (2012) écrit que l'hétérogénéité « may be classified » en trois catégories, syntaxique, structurelle, sémantique, d'après Brodeur et al. ; cette phrase est sur la page mais dans aucun extrait (A-interop-05 refusée). La même publication de 2020 écrit aussi que l'interopérabilité de l'information géographique se décompose en six couches, et cite un modèle (LCIM) à sept niveaux. [A-interop-04, A-interop-05, A-interop-06]

**Limite de taille d'un shapefile.** Esri : chaque fichier composant d'un shapefile est limité à 2 Go, soit un maximum d'environ 70 millions d'entités ponctuelles. GDAL : le format peut aller jusqu'à 8 Go, l'implémentation OGR est limitée à 4 Go, et au-delà de 2 Go c'est déconseillé pour la compatibilité avec d'autres logiciels (« it is not recommended to use a file size over 2GB »). Relevée par le vérificateur ; on ne choisit pas. [A-formats-11, A-formats-21]

## 6. Banque visuelle documentaire

| ID | Source | Description | Utilité | Usage |
|---|---|---|---|---|
| VIS-formats-01 | [GDAL, pilotes vectoriels](https://gdal.org/en/stable/drivers/vector/index.html) (OSGeo) | tableau des pilotes vectoriels de GDAL | montrer la diversité des formats pris en charge par une bibliothèque ouverte | REFERENCE_ONLY |
| VIS-modeles-01 | [ISO 19109:2005, extrait](https://cdn.standards.iteh.ai/samples/39891/c281ac12b30444a2b8cd105138b6c638/ISO-19109-2005.pdf) (ISO) | figures 1 et 2 : échange par transfert entre schéma du fournisseur et schéma de l'utilisateur | placer les deux mises en correspondance de schémas | REDRAW |
| VIS-modeles-02 | [DGT, harmonisation COS avec HALE](https://fenix.ciencias.ulisboa.pt/downloadFile/1688987299218824/HALE_COS__Ingles_Patricio.pdf) (DGT) | processus d'harmonisation : analyse, correspondance, transformation, validation, publication | référence du déroulé d'un cas réel | REFERENCE_ONLY |

## 7. Exemples et cas réels

Seulement les cas qu'une source décrit. La confiance est celle du script ; la dernière colonne dit l'usage et l'état vérifié (« découpée » : affirmation plus étroite, `verifie: null`).

| Obstacle | Cas | Ce que la source dit | Affirmations | Confiance | Usage |
|---|---|---|---|---|---|
| Format | le shapefile tronque les noms de champs | un nom de champ ne dépasse pas 10 caractères | A-formats-10 | forte | narration |
| Format | arcs de cercle exportés en shapefile | les arcs deviennent des lignes à sommets rapprochés | A-formats-13 | moyenne | narration |
| Format | valeurs nulles, nombres, Unicode | le shapefile ne stocke pas de nulle, arrondit, gère mal l'Unicode | A-formats-14 | moyenne | narration |
| Format | GeoJSON impose WGS 84 | les coordonnées sont géographiques, en WGS 84 | A-formats-06 | forte | narration |
| Format | taille d'un shapefile | 2 Go par fichier composant, environ 70 millions de points (Esri) ; GDAL donne d'autres limites (§ 5) | A-formats-21 | moyenne | porte (découpée) |
| Modèle | domaines et sous-types des géodatabases | le shapefile ne les porte pas | A-modeles-10 | moyenne | narration |
| Modèle | formats normalisés ou non | certains formats répartissent les données en des centaines de tables ou de couches, d'autres non (Safe Software) | A-modeles-19 | moyenne | narration |
| Modèle | coordonnées en colonnes et géométrie de point | exemple de Safe Software de transformation entre représentations spatiales | A-modeles-33 | moyenne | narration (découpée) |
| Modèle | attributs sur un point intérieur et attributs de la surface | exemple de Safe Software de transformation entre représentations spatiales | A-modeles-34 | moyenne | narration (découpée) |
| Modèle | attributs imbriqués d'Ordnance Survey MasterMap | hiérarchie d'attributs non plate en GML | A-modeles-13 | moyenne | narration |
| Modèle | carte COS du Portugal harmonisée vers INSPIRE | table de correspondance entre classes, attributs, listes de codes ; 225 classes au niveau le plus fin ; outil HALE | A-modeles-27, A-modeles-28, A-modeles-29, A-modeles-30 | moyenne | porte (A-modeles-30 en contexte) |
| Modèle | données nationales vers INSPIRE | transformations entre formes nationales et formes communes | A-modeles-23, A-modeles-32 | forte, moyenne | narration |
| Coordonnées | NAD 27 contre NAD 83 aux États-Unis | 10 à 100 m pour les points ; environ 200 m en UTM | A-coordonnees-31, A-coordonnees-27 | forte, faible | narration, porte |
| Coordonnées | NAD 27 contre NAD 83 en Alberta | 6 à 7 m et 20 m en géographiques ; 225 m et 70 m en Mercator transverse | A-coordonnees-25, A-coordonnees-26 | faible | porte |
| Sémantique | la forêt | définitions différentes selon les États membres et la littérature, sans « ce qui met à l'épreuve l'interopérabilité » | A-semantique-31, A-semantique-02 | forte, moyenne | narration (découpée), narration |
| Sémantique | « pond » (étang) | même mot, choses différentes selon le jeu de données | A-semantique-01 | moyenne | narration |
| Sémantique | nomenclatures d'occupation du sol | de nombreux pays membres ont produit des bases pour leurs propres besoins ; échelles, nomenclatures et unités minimales très différentes | A-semantique-25 | faible | porte |
| Coût | NIST, installations aux États-Unis, 2002 | 15,8 milliards de dollars par an ; bâtiments commerciaux et institutionnels, installations industrielles | A-interop-15 | forte | narration (découpée) |

## 8. Lacunes

Les lacunes des cinq axes sont conservées dans `affirmations.yaml`, avec, quand la consolidation les a réduites, un champ `apres_consolidation`. Ce qui reste ouvert :

- **Textes ISO** (19101-1, 19109, 19111, 19119) : iso.org refuse (403) ; seuls des extraits publics et les textes libres de l'OGC sont lus. Les numéros de norme restent à la porte.
- **Niveau structurel** : une seule source (ISPRS). Le niveau « système » d'ISO 19101-1 n'a aucune définition lue.
- **Coût propre aux données géographiques** : aucun chiffre sourcé ; le seul est celui du bâtiment (NIST).
- **Cas de modèle indépendant de l'organisme qui l'a mené** : la carte COS n'a que des documents de la DGT.
- **Écart de coordonnées au Canada ou en France** (NTF vers RGF93, données non reprojetées) : non trouvé ; pages NRCan illisibles par script, Statistique Canada refusée.
- **Code EPSG** : le guide IOGP 7-1 n'est pas lu ; la définition repose sur la page « About » d'epsg.org et la FAQ de PROJ.
- **Définition du système de référence de coordonnées** : une seule source (OGC) ; la formulation d'INSPIRE en est une autre.
- **Ce que les normes ne résolvent pas** : peu de sources directes ; la leçon peut dire seulement que la transformation reste nécessaire (A-modeles-32). Que des modèles divergents rendent la correspondance difficile n'a que des sources seules, à la porte (A-semantique-34, A-modeles-20).
- **Limite de taille du shapefile** : Esri et GDAL ne disent pas la même chose (§ 5) ; aucune source tierce lue.
- **Nombre de formats** de GDAL ou en circulation : aucun total sourcé.
- **Description indépendante du rôle de FME** : seulement un guide de 2010 et la documentation d'Esri, partenaire.
- **Styles perdus d'un format à l'autre**, longueur des champs texte du dBASE, spécification de DGN : à sourcer.

## 9. Carte des sources

| Source | Éditeur | Niveau | Affirmations |
|---|---|---|---|
| [Interoperability (guide UTCATF, base de connaissances GES)](https://www.eea.europa.eu/en/ghg-knowledge-hub/lulucf/guidance/interoperability) | Agence européenne pour l'environnement | A | A-semantique-02, A-semantique-03, A-semantique-23, A-semantique-31 |
| [PD ISO/TS 19150-1:2012 Geographic information. Ontology. Framework](https://knowledge.bsigroup.com/products/geographic-information-ontology-framework) | BSI | A | A-semantique-05 |
| [Coordinate Reference Systems of France - FR](https://crs.bkg.bund.de/crs/eu-countrysel.php?country=FR) | Bundesamt für Kartographie und Geodäsie | B | A-coordonnees-19 |
| [Infrastructure for Spatial Information in Europe (INSPIRE) - towards interoperability of land-cover, land-use, and agricultural data sets](https://publications.jrc.ec.europa.eu/repository/handle/JRC63951) | Centre commun de recherche (JRC) | B | A-semantique-07 |
| [Document du Conseil ST 11462/2022 ADD 1 (évaluation d'INSPIRE)](https://data.consilium.europa.eu/doc/document/ST-11462-2022-ADD-1/en/pdf) | Conseil de l'Union européenne | A | A-interop-12 |
| [Land Cover spatial datasets harmonization in Portugal using HALE, présentation de la DGT](https://fenix.ciencias.ulisboa.pt/downloadFile/1688987299218824/HALE_COS__Ingles_Patricio.pdf) | DGT (Portugal) | A | A-modeles-23, A-modeles-27, A-modeles-28, A-modeles-29, A-modeles-30 |
| [CAD - Travaux topographiques du cadastre - Les canevas](https://bofip.impots.gouv.fr/doctrine/pgp/5101-PGP) | Direction générale des Finances publiques | A | A-coordonnees-18, A-coordonnees-19 |
| [Study of Data Roadblocks Costs Tags Capital Facilities Industry With $15.8 Billion Loss (ENR, 2004-08-09)](https://www.enr.com/articles/30495-study-of-data-roadblocks-costs-tags-capital-facilities-industry-with-15-8-billion-loss-8-9-2004) | Engineering News-Record | B | A-interop-10, A-interop-15 |
| [ESRI Shapefile Technical Description](https://www.esri.com/content/dam/esrisites/sitecore-archive/Files/Pdfs/library/whitepapers/pdfs/shapefile.pdf) | Esri | A | A-formats-01, A-formats-02, A-formats-12 |
| [Geoprocessing considerations for shapefile output](https://pro.arcgis.com/en/pro-app/latest/tool-reference/appendices/geoprocessing-considerations-for-shapefile-output.htm) | Esri | A | A-formats-10, A-formats-11, A-formats-13, A-formats-14, A-formats-21, A-modeles-10 |
| [Spatial ETL tools (ArcGIS Help 10.2)](https://resources.arcgis.com/en/help/main/10.2/004m/004m0000000m000000.htm) | Esri | B | A-semantique-22 |
| [Cross-Forest project (Frontiers in Forests and Global Change)](https://www.frontiersin.org/articles/10.3389/ffgc.2024.1329812/full) | Frontiers | B | A-semantique-06 |
| [Vector Data Model, GDAL documentation](https://gdal.org/en/stable/user/vector_data_model.html) | GDAL / OSGeo | A | A-modeles-05, A-modeles-09 |
| [GML, Geography Markup Language, GDAL documentation](https://gdal.org/en/stable/drivers/vector/gml.html) | GDAL / OSGeo | A | A-modeles-13 |
| [Semantic and Syntactic Interoperability Issues in the Context of SDI (A. Chojka, Geomatics and Environmental Engineering 14(3), 2020)](https://yadda.icm.edu.pl/baztech/element/bwmeta1.element.baztech-d37f25f7-6762-47cb-8279-2772045d2157/c/geom.2020.14.3.5.pdf) | Geomatics and Environmental Engineering (AGH, Cracovie) | B | A-interop-01, A-interop-04, A-interop-13, A-interop-14, A-semantique-29 |
| [Impact of NAD83 adoption (fiche technique)](https://open.alberta.ca/dataset/126ab60f-9f71-4052-bca0-a463fb0e392d/resource/0cb1bbc7-054a-4eee-b933-34aa365982c0/download/factsheet02-impactnad83adoption-feb2010.pdf) | Gouvernement de l'Alberta | B | A-coordonnees-20, A-coordonnees-24, A-coordonnees-25, A-coordonnees-26, A-coordonnees-29 |
| [GO-ITS 541TES NAD83-CSRS official horizontal geodetic datum for Ontario](https://www.ontario.ca/page/go-its-541tes-nad83-csrs-official-horizontal-geodetic-datum) | Gouvernement de l'Ontario | B | A-coordonnees-21 |
| [Technical Support: Projections in Nova Scotia](https://geonova.novascotia.ca/sites/default/files/resource-library/NSCRS%20Technical%20Support%200004%20Projections%2029Feb2016.pdf) | Gouvernement de la Nouvelle-Écosse | B | A-coordonnees-22, A-coordonnees-23 |
| [RFC 7946, The GeoJSON Format](https://datatracker.ietf.org/doc/html/rfc7946) | IETF | A | A-formats-05, A-formats-06 |
| [SIOSE, a successful test bench towards harmonization and integration of land cover/use information (ISPRS Archives XXXVII-B8, 2008)](https://WWW.ISPRS.org/proceedings/XXXVII/congress/8_pdf/11_WG-VIII-11/28.pdf) | Instituto Geográfico Nacional (Espagne), actes ISPRS | B | A-semantique-25 |
| [EPSG Geodetic Parameter Dataset](https://epsg.org/home.html) | IOGP | A | A-coordonnees-09, A-coordonnees-10, A-coordonnees-11 |
| [EPSG:4326 WGS 84](https://epsg.org/crs_4326/WGS-84.html) | IOGP | A | A-coordonnees-12 |
| [EPSG:4617 NAD83(CSRS)](https://epsg.org/crs_4617/NAD83-CSRS.html) | IOGP | A | A-coordonnees-13, A-coordonnees-14 |
| [EPSG:26917 NAD83 / UTM zone 17N](https://epsg.org/crs_26917/NAD83-UTM-zone-17N.html) | IOGP | A | A-coordonnees-15 |
| [EPSG:32183 NAD83 / MTM zone 3](https://epsg.org/crs_32183/NAD83-MTM-zone-3.html) | IOGP | A | A-coordonnees-16 |
| [EPSG:2154 ETRS89-FRA [RGF93 v1] / Lambert-93](https://epsg.org/crs_2154/RGF93-v1-Lambert-93.html) | IOGP | A | A-coordonnees-17 |
| [About the EPSG Dataset](https://epsg.org/about.html) | IOGP | A | A-coordonnees-32 |
| [ISO 19101-1:2014 Geographic information, Reference model, Part 1 (extrait public)](https://cdn.standards.iteh.ai/samples/59164/0ccf5036e7cb46c196c18432af34f6b4/ISO-19101-1-2014.pdf) | ISO | A | A-interop-04, A-modeles-12 |
| [ISO 19109:2005 Geographic information, Rules for application schema (extrait)](https://cdn.standards.iteh.ai/samples/39891/c281ac12b30444a2b8cd105138b6c638/ISO-19109-2005.pdf) | ISO | A | A-modeles-01, A-modeles-02, A-modeles-03, A-modeles-04, A-modeles-20, A-modeles-21, A-modeles-22 |
| [ISO 19107:2003 Geographic information, Spatial schema](https://standards.iteh.ai/catalog/standards/iso/acd5af2e-2319-4a2d-b94b-d75be70b7b36/iso-19107-2003) | ISO | A | A-modeles-06 |
| [ISO/TC 211, liste complète des projets](https://committee.iso.org/sites/tc211/home/projects/projects---complete-list/iso-19107.html) | ISO | A | A-modeles-31 |
| [ISO/TC 211 Geographic information/Geomatics](https://committee.iso.org/home/tc211) | ISO | A | A-semantique-10 |
| [A Guide to the Role of Standards in Geospatial Information Management, document de référence pour l'UN-GGIM (2013)](https://ggim.un.org/ggim_20171012/docs/meetings/3rd%20UNCE/E_C.20_2013_8_ISO-OGC-IHO%20Standards%20background%20paper.pdf) | ISO/TC 211, OGC et OHI (rapport commun à l'UN-GGIM) | A | A-formats-04, A-semantique-28 |
| [ISPRS Annals I-2 (2012), p. 217](https://isprs-annals.copernicus.org/articles/I-2/217/2012/isprsannals-I-2-217-2012.pdf) | ISPRS | B | A-interop-05, A-interop-06 |
| [A context sensitive model for sharing distributed geospatial information (Bishr, Molenaar, Radwan)](https://www.isprs.org/proceedings/XXXII/part4/bishr49.pdf) | ISPRS | B | A-interop-07 |
| [A GML schema mapping approach to overcome semantic heterogeneity in GIS](https://www.isprs.org/proceedings/XXXVI/part4/WG-IV-2-5.pdf) | ISPRS | B | A-semantique-04 |
| [DWG, AutoCAD Drawing (Sustainability of Digital Formats, Library of Congress)](https://loc.gov/preservation/digital/formats//fdd/fdd000445.shtml) | Library of Congress | B | A-formats-07 |
| [Interoperability (marinespecies.org, traits wiki)](https://www.marinespecies.org/traits/wiki/Interoperability) | marinespecies.org (wiki) | C | A-interop-03, A-interop-08 |
| [Cadre intégré de l'information géospatiale (IGIF), Voie stratégique 6 : Normes](https://ggim.un.org/UN-IGIF/documents/FR_SP6-%20Normes_final20240909.pdf) | Nations Unies, UN-GGIM (IGIF) | B | A-semantique-10, A-semantique-26, A-semantique-27, A-semantique-28, A-semantique-29, A-semantique-30, A-semantique-34 |
| [NIST GCR 04-867, Cost Analysis of Inadequate Interoperability in the U.S. Capital Facilities Industry](https://nvlpubs.nist.gov/nistpubs/gcr/2004/NIST.GCR.04-867.pdf) | NIST | A | A-interop-10, A-interop-11, A-interop-15 |
| [NGS Toolkit, Part 8: The National Geodetic Survey NADCON Tool (D. M. Mulcare)](https://nweb.ngs.noaa.gov/TOOLS/Professional_Surveyor_Articles/NADCON.pdf) | NOAA National Geodetic Survey | A | A-coordonnees-31 |
| [Implementation of INSPIRE Schema Transformation Service, Nordic Journal of Surveying and Real Estate Research 8:1](https://journal.fi/njs/article/view/4306/5275) | Nordic Journal of Surveying and Real Estate Research | B | A-modeles-23, A-modeles-24, A-modeles-25, A-modeles-32 |
| [GeoPackage](https://www.geopackage.org/) | OGC | A | A-formats-03 |
| [GeoPackage Standard – Open SQLite Format for Geospatial Data](https://www.ogc.org/standards/geopackage/) | OGC | A | A-formats-03 |
| [GML Standard](https://www.ogc.org/standards/gml/) | OGC | A | A-formats-04 |
| [KML, Open Geospatial Consortium](https://www.ogc.org/standards/kml/) | OGC | A | A-formats-09 |
| [Simple Feature Access, Part 1: Common Architecture, OGC](https://www.ogc.org/standards/sfa) | OGC | A | A-modeles-14, A-modeles-15, A-semantique-11 |
| [About the Open Geospatial Consortium](https://www.ogc.org/about-ogc/) | OGC | A | A-semantique-08, A-semantique-09, A-semantique-26, A-semantique-27 |
| [GML Standard – Geography Markup Language for Geospatial Data](https://www.ogc.org/standards/gml) | OGC | A | A-semantique-12 |
| [GeoPackage Standard – Open SQLite Format for Geospatial Data](https://www.ogc.org/standards/geopackage) | OGC | A | A-semantique-13 |
| [OGC WFS Standard / Web Feature Service Specification](https://www.ogc.org/standards/wfs) | OGC | A | A-semantique-14, A-semantique-15 |
| [CityGML (OGC)](https://www.ogc.org/standards/citygml) | OGC | A | A-semantique-16 |
| [OGC Testbed-12 Semantic Portrayal, Registry and Mediation Engineering Report](https://docs.ogc.org/per/16-059.html) | Open Geospatial Consortium | A | A-interop-02, A-interop-09, A-interop-13, A-interop-14 |
| [OGC Abstract Specification Topic 2: Referencing by coordinates Corrigendum](https://docs.ogc.org/as/18-005r5/18-005r5.html) | Open Geospatial Consortium | A | A-coordonnees-01, A-coordonnees-02, A-coordonnees-03, A-coordonnees-04, A-coordonnees-05, A-coordonnees-06, A-coordonnees-07, A-coordonnees-08 |
| [GeoJSON driver, GDAL documentation](https://gdal.org/en/stable/drivers/vector/geojson.html) | OSGeo | B | A-formats-06 |
| [Vector drivers, GDAL documentation](https://gdal.org/en/stable/drivers/vector/index.html) | OSGeo | B | A-formats-08 |
| [ESRI Shapefile / DBF, GDAL documentation](https://gdal.org/en/stable/drivers/vector/shapefile.html) | OSGeo | B | A-formats-10, A-formats-11 ; contradiction notée sur A-formats-21 |
| [GDAL documentation](https://gdal.org/en/stable/) | OSGeo | A | A-formats-17 |
| [Application of the GeoUML tools for the production and validation of INSPIRE datasets (Belussi, Marca, Negri, Pelagatti)](https://re.public.polimi.it/bitstream/11311/822136/4/2013inspire.pdf) | Politecnico di Milano | B | A-modeles-32 |
| [Glossary, PROJ documentation](https://proj.org/en/stable/glossary.html) | PROJ (OSGeo) | B | A-coordonnees-28 |
| [FAQ, PROJ documentation](https://proj.org/en/stable/faq.html) | PROJ (OSGeo) | B | A-coordonnees-32 |
| [Technical Guidance for the INSPIRE Schema Transformation Network Service, glossaire](https://cnig.gouv.fr/IMG/documents_wordpress/2015/01/JRC_INSPIRE-TransformService_TG_v2-0.pdf) | Rob Walker Consultancy pour le JRC | B | A-formats-04, A-modeles-26, A-semantique-21, A-semantique-26 |
| [Challenges in Spatial Database Interoperability](https://fme.safe.com/blog/2009/04/challenges-in-spatial-database-interoperability/) | Safe Software | A | A-formats-16, A-formats-20, A-modeles-16, A-modeles-17, A-modeles-18, A-modeles-19, A-modeles-33, A-modeles-34, A-semantique-01, A-semantique-17, A-semantique-32 |
| [Get started with FME](https://fme.safe.com/get-started/) | Safe Software | A | A-formats-18 |
| [Reading and Writing Data, FME Form documentation](https://docs.safe.com/fme/html/FME-Form-Documentation/FME-Form/Workbench/reading-writing-data.htm) | Safe Software | A | A-formats-19 |
| [What is FME (documentation de FME Form)](https://docs.safe.com/fme/html/FME-Form-Documentation/FME-Form/Workbench/What_is_FME.htm) | Safe Software | A | A-semantique-19, A-semantique-33 |
| [Directive 2007/2/EC, article 3 (legislation.gov.uk)](https://www.legislation.gov.uk/eudr/2007/2/article/3) | The National Archives (legislation.gov.uk) | A | A-interop-01 |
| [How large is the North American Datum of 1927 (NAD 27) to NAD 83 shift?](https://www.usgs.gov/faqs/how-large-north-american-datum-1927-nad-27-nad-83-shift) | U.S. Geological Survey | B | A-coordonnees-27, A-coordonnees-31 |
| [Directive 2007/2/EC (EUR-Lex)](https://eur-lex.europa.eu/eli/dir/2007/2/2024-11-26) | Union européenne (EUR-Lex) | A | A-interop-01, A-coordonnees-33 |
| [D2.8.I.1 INSPIRE Data Specification on Coordinate Reference Systems, Technical Guidelines](https://inspire-mif.github.io/technical-guidelines/data/rs/dataspecification_rs.html) | Union européenne (INSPIRE) | A | A-coordonnees-33 |
| [Talking about Forests: an Example of Sharing Information Expressed with Vague Terms (Gómez Álvarez, Bennett, Richard-Bollans)](https://eprints.whiterose.ac.uk/122977/7/WINKS_paper_3.pdf) | University of Leeds (White Rose eprints) | B | A-semantique-23, A-semantique-24, A-semantique-31 |

## 10. Remise au scénariste

Seules les affirmations en narration avec `verifie: true`, ou découpées après vérification (`decoupe_de`, `verifie: null`), se disent ; `check_pack.py --remise` en tire la liste du registre.

**Ce qui est sûr (confiance forte), dicible par la voix et l'écran.** La définition d'INSPIRE [A-interop-01] ; les niveaux syntaxique et sémantique [A-interop-13, A-interop-14] ; le shapefile et ses 10 caractères par nom de champ [A-formats-10] ; GeoJSON en WGS 84 [A-formats-06] ; GML, grammaire XML de l'OGC et norme ISO 19136 [A-formats-04] ; l'harmonisation INSPIRE d'un schéma source vers un schéma cible [A-modeles-23] ; le code EPSG [A-coordonnees-32] ; NAD 27 contre NAD 83, 10 à 100 m aux États-Unis [A-coordonnees-31] ; la forêt, définie différemment selon les États membres et la littérature, sans « ce qui met à l'épreuve l'interopérabilité » (découpée) [A-semantique-31] ; l'OGC, organisation internationale à but non lucratif qui élabore des normes géospatiales [A-semantique-26] ; le chiffre du NIST, en disant son champ, les installations aux États-Unis (bâtiments commerciaux et institutionnels, installations industrielles), et l'année 2002 (découpée) [A-interop-15].

**Dicible sans chiffre ni date (confiance moyenne, narration).** Les définitions du système de référence de coordonnées, du référentiel, de la projection [A-coordonnees-01, A-coordonnees-02, A-coordonnees-03, A-coordonnees-05, A-coordonnees-06, A-coordonnees-07, A-coordonnees-08, A-coordonnees-09, A-coordonnees-33] ; les pertes du shapefile [A-formats-01, A-formats-12, A-formats-13, A-formats-14, A-modeles-10] ; les formats ouverts [A-formats-03, A-formats-05, A-formats-09, A-semantique-13, A-semantique-14] ; le modèle abstrait de GDAL [A-formats-17] ; les différences de modèle et les exemples de Safe Software entre représentations spatiales (découpées) [A-modeles-13, A-modeles-14, A-modeles-15, A-modeles-16, A-modeles-19, A-modeles-32, A-modeles-33, A-modeles-34] ; « pond » et l'AEE [A-semantique-01, A-semantique-02, A-semantique-03] ; l'OGC et les normes ouvertes pour l'interopérabilité [A-semantique-27] ; ce qu'écrit Safe Software, attribué à l'éditeur : de nombreuses raisons de transformer entre formats, dont l'intégration (découpée) [A-formats-20], un défi courant, des données stockées un peu partout (découpée) [A-semantique-32], des logiciels de traduction traditionnellement limités et FME conçu pour être une application d'ETL spatial, sans « le premier » (découpée) [A-semantique-33], le grand nombre de formats de FME, sans nombre [A-formats-19].

**Ce qui attend l'expert** (`porte-expert.md`) : la définition retenue et le nombre de niveaux ; les cas que la voix dira (COS, Alberta, taille d'un shapefile [A-formats-21]) ; RGF93, Lambert 93 et CC 9 zones [A-coordonnees-19] ; les codes EPSG à l'écran ; les numéros de norme ISO, l'ISO/TC 211 et son lien avec l'OGC [A-semantique-10, A-semantique-28] ; une terminologie différente qui « peut » rendre difficile la correspondance [A-semantique-34] ; les nomenclatures d'occupation du sol, avec « pays membres » et « pour leurs propres besoins » [A-semantique-25] ; le nombre de formats de FME ; la place du chiffre du NIST. Tant qu'il n'a pas répondu, ces affirmations restent hors narration.

**Ce qui ne se dit pas.** Les affirmations en `contexte` ; les affirmations refusées par le vérificateur, telles qu'elles sont écrites [A-interop-05, A-interop-10, A-formats-11, A-formats-16, A-modeles-17, A-modeles-18, A-semantique-05, A-semantique-17, A-semantique-19, A-semantique-23, A-semantique-29] : quand une affirmation en a été découpée, c'est elle qui se dit ou va à la porte ; en particulier « le passage de... à » pour les exemples de Safe Software, « le problème de départ », « les outils antérieurs », « bâtiments industriels », « ce qui met à l'épreuve l'interopérabilité », « devient difficile, voire impossible » ; ISO/TS 19150-1 et son année ; un nombre de formats pour FME ou pour GDAL ; un coût propre aux données géographiques ; un décalage « à l'écran » en mètres ; une définition d'ISO 19119 ou d'ISO 19118 ; « très utilisée » sans l'attribuer ; « le premier », même attribué ; tout ce qui n'est pas dans `affirmations.yaml`.
