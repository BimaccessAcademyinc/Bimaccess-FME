# FME001-M01-L02 · Cadrage de la leçon

Seule entrée des chercheurs. Écrit par l'orchestrateur depuis le plan du module (`modules/M01/plan-module.md`) ; Ilyas le corrige.

## La leçon

| | |
|---|---|
| Identifiant | FME001-M01-L02 |
| Titre de travail | Le problème de l'interopérabilité |
| Public | professionnels du BIM et de la construction qui n'ont jamais ouvert FME ; notions de base du SIG non supposées ; ils ont vu L01 (le sens de « feature », l'histoire de Safe Software et de SAIF, FME qui lit, transforme et écrit) |
| Acquis visé | dire pourquoi deux SIG ne s'échangent pas leurs données tels quels, en nommant les quatre obstacles : les formats, les modèles de données, les systèmes de coordonnées, la sémantique ; et dire à quoi servent les normes ouvertes face à ces obstacles |
| Durée | 6 à 8 minutes |
| Langue | français, version anglaise ensuite |

## Limites

- La leçon dit : ce qu'est l'interopérabilité des données géographiques ; ce que chaque obstacle fait perdre ou fausser lors d'un échange (avec des exemples réels et sourcés) ; les systèmes de coordonnées **nommés** (ce qu'ils sont, pourquoi deux données ne se superposent pas) ; les normes ouvertes (OGC, ISO/TC 211) comme réponse partielle ; pourquoi une conversion reste nécessaire.
- Elle ne dit pas : l'histoire de Safe Software et de SAIF (L01) ; comment se construit un espace de travail FME, lecteurs, transformers, writers (L03) ; la manipulation des systèmes de coordonnées, la reprojection et les cas d'usage SIG (L04) ; FME Form, FME Flow, le BIM vers SIG et l'IFC (L05).

## Axes et questions de recherche

### Axe `interop` · Ce qu'est l'interopérabilité des données géographiques

- Q1 : Comment l'OGC, l'ISO/TC 211 (ISO 19119, ISO 19101) ou une institution publique (INSPIRE, ministère, agence cartographique) définissent-ils l'interopérabilité des données ou des services géographiques ? Une définition courte et sourcée.
- Q2 : Distingue-t-on des niveaux d'interopérabilité (syntaxique, structurelle ou schématique, sémantique) dans les textes de référence ou la littérature académique ? Lesquels, et avec quelle définition ?
- Q3 : Quel coût ou quel effet du manque d'interopérabilité est documenté par une source fiable (étude publique, rapport d'agence, publication académique) ? Seulement des chiffres et des cas réels, datés.

### Axe `formats` · Les formats

- Q4 : Qu'est-ce qu'un format de données géographiques : fichier natif d'un logiciel, format ouvert publié ? Exemples documentés : shapefile (spécification technique d'Esri, 1998), GeoPackage (norme OGC), GML (norme OGC et ISO 19136), DWG ou DGN côté DAO, KML, GeoJSON (RFC 7946).
- Q5 : Que perd-on, documenté, en passant d'un format à un autre (limites du shapefile : longueur des noms de champs, un seul type de géométrie par fichier, taille ; arcs et courbes ; topologie ; styles) ? Sources : spécifications, documentation d'éditeurs, guides d'agences.
- Q6 : Combien de formats existent ou circulent en pratique : chiffres datés et sourcés (catalogues de GDAL/OGR, de l'éditeur de FME), sans en inventer.

### Axe `modeles` · Les modèles de données

- Q7 : Qu'est-ce qu'un modèle de données géographiques ou un schéma d'application (ISO 19109, règles pour les schémas d'application) : classes d'entités, attributs, relations, géométrie ?
- Q8 : Quelles différences de modèle empêchent un échange tel quel : géométrie simple contre topologie (arcs-nœuds), vecteur contre raster, une couche par type de géométrie contre plusieurs, attributs à plat contre structures imbriquées ? Exemples documentés (OGC Simple Features, ISO 19107).
- Q9 : Qu'est-ce que la transformation de schéma (schema mapping, restructuration) d'après l'OGC, INSPIRE ou la littérature ? Un exemple réel documenté de deux schémas pour les mêmes objets.

### Axe `coordonnees` · Les systèmes de coordonnées (nommés seulement)

- Q10 : Qu'est-ce qu'un système de référence de coordonnées, d'après ISO 19111 ou l'OGC, et ses parties (référentiel géodésique ou datum, ellipsoïde, projection, unités) ? Définitions courtes.
- Q11 : Qu'est-ce qu'un code EPSG (registre EPSG de l'IOGP) ; exemples documentés au Canada et en France : NAD83, NAD83(CSRS), MTM, UTM ; RGF93 / Lambert-93 ; WGS 84.
- Q12 : Quel écart documenté obtient-on quand deux données sont dans deux systèmes différents et ne sont pas reprojetées (ordre de grandeur sourcé, par exemple NAD27 contre NAD83, ou un datum mal déclaré) ?

### Axe `semantique` · La sémantique et les normes ouvertes

- Q13 : Qu'est-ce que l'interopérabilité sémantique pour des données géographiques : même mot pour deux choses, deux mots pour la même chose, codes et listes de valeurs différents ? Exemples réels documentés (nomenclatures d'occupation du sol, classes de routes, INSPIRE).
- Q14 : Que sont l'OGC et l'ISO/TC 211, et quelles normes visent l'échange (Simple Features, GML, GeoPackage, WFS, CityGML) ? Ce qu'elles résolvent et ce qu'elles ne résolvent pas, d'après des sources.
- Q15 : Comment Safe Software décrit-elle le problème de l'interopérabilité et le rôle d'un outil de conversion (formats, schémas, coordonnées) ; une source indépendante qui décrit ce même rôle (presse spécialisée, publication académique, agence publique) ?

## Sources déjà connues

- https://www.ogc.org/standards/ (catalogue des normes de l'OGC)
- https://www.isotc211.org/ (comité ISO/TC 211)
- https://inspire.ec.europa.eu/ (directive INSPIRE, guides de données)
- https://epsg.org/ (registre EPSG de l'IOGP)
- https://www.esri.com/content/dam/esrisites/sitecore-archive/Files/Pdfs/library/whitepapers/pdfs/shapefile.pdf (spécification technique du shapefile)
- https://www.geopackage.org/ et https://datatracker.ietf.org/doc/html/rfc7946 (GeoPackage, GeoJSON)
- https://gdal.org/en/stable/drivers/vector/index.html (catalogue de formats de GDAL/OGR)
- https://www.safe.com/ (pages de l'éditeur sur l'interopérabilité)
- Le pack de L01, `modules/M01/L01/sources/affirmations.yaml` (axe `sig`, Q9), pour ne pas rechercher deux fois ce qui y est déjà sourcé.
