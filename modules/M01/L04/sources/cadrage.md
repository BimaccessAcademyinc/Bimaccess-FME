# FME001-M01-L04 · Cadrage de la leçon

Seule entrée des chercheurs. Écrit par l'orchestrateur depuis le plan du module (`modules/M01/plan-module.md`) ; Ilyas le corrige.

## La leçon

| | |
|---|---|
| Identifiant | FME001-M01-L04 |
| Titre de travail | FME dans le travail SIG |
| Public | professionnels du BIM et de la construction qui n'ont jamais ouvert FME ; ils ont vu L01 (Safe Software, le sens de « feature »), L02 (les quatre obstacles : formats, modèles de données, systèmes de coordonnées, sémantique) et L03 (espace de travail, lecteurs, transformers, writers, flux des entités) |
| Acquis visé | reconnaître les usages types de FME en SIG (conversion de format, reprojection, contrôle qualité, intégration de sources) et, pour un cas simple, choisir le transformer qui convient |
| Durée | 8 à 10 minutes |
| Langue | français, version anglaise ensuite |

## Limites

- La leçon dit : chaque usage type, avec ce qu'il règle des obstacles de L02 ; les transformers qui le portent, d'après leur page de référence ; la reprojection en pratique (ici seulement se manipulent les systèmes de coordonnées et les codes EPSG nommés en L02) ; des cas réels d'organisations qui emploient FME pour ces usages ; le lien entre FME et l'extension ArcGIS Data Interoperability d'Esri (renvoyé de L01 à L04 par décision d'Ilyas).
- Elle ne dit pas : l'histoire de Safe Software (L01) ; les obstacles eux-mêmes (L02) ; le fonctionnement d'un espace de travail, des ports et du flux (L03) ; FME Flow, l'automatisation, le BIM vers SIG et l'IFC (L05).

## Axes et questions de recherche

### Axe `conversion` · Convertir un format

- Q1 : Comment la documentation de FME décrit-elle une conversion de format simple (un lecteur, un writer, sans transformer ou presque) ; ce que l'éditeur appelle une traduction, et l'outil de traduction rapide s'il existe (nom, version) ?
- Q2 : Quels exemples de conversion documentés pour le SIG (shapefile vers GeoPackage, DWG ou DGN vers un format SIG, données tabulaires avec coordonnées vers des points) ; ce que la documentation dit de ce qui se perd ou se garde ?

### Axe `reprojection` · Changer de système de coordonnées

- Q3 : Quels transformers servent à la reprojection (Reprojector, CsmapReprojector, CoordinateSystemSetter) et en quoi diffèrent-ils, d'après leurs pages de référence : déclarer un système contre transformer les coordonnées ?
- Q4 : Comment FME désigne-t-il un système de coordonnées (codes EPSG, noms de la bibliothèque de systèmes) ; un exemple documenté au Canada ou en France ?
- Q5 : Que dit une source fiable (documentation, agence géodésique) d'une transformation entre référentiels faite par grille (NTv2, NADCON) dans FME ou en général ; un cas documenté ?

### Axe `qualite` · Contrôler la qualité

- Q6 : Quels transformers servent au contrôle qualité (GeometryValidator, AttributeValidator, Tester, DuplicateFilter ou Matcher, ChangeDetector), et ce qu'ils vérifient d'après leurs pages de référence ?
- Q7 : Un cas réel et documenté de contrôle qualité de données géographiques avec FME (agence publique, municipalité, publication) : ce qui était contrôlé, ce qui en est sorti ?

### Axe `integration` · Intégrer des sources

- Q8 : Quels transformers servent à joindre des données : jointure attributaire (FeatureMerger, FeatureJoiner, DatabaseJoiner) et jointure spatiale (SpatialRelator, PointOnAreaOverlayer, Clipper), d'après leurs pages de référence ?
- Q9 : Un cas réel et documenté d'intégration de plusieurs sources avec FME (agence, municipalité, réseau, publication) : quelles sources, quel résultat ?

### Axe `usages` · FME dans les organisations SIG

- Q10 : Quel est le lien entre FME et l'extension ArcGIS Data Interoperability d'Esri : repose-t-elle sur FME, depuis quand, que permet-elle (outils ETL spatiaux, Workbench) ? Une source d'Esri et une de Safe Software.
- Q11 : Comment la documentation aide-t-elle à choisir un transformer pour une tâche (galerie par catégories, recherche, « transformers par tâche ») ?
- Q12 : Quelles organisations publiques ou parapubliques décrivent elles-mêmes leur emploi de FME pour ces usages (rapport, page, présentation datée) ; au moins un cas au Canada si une source le dit ?

## Sources déjà connues

- https://docs.safe.com/ (documentation de FME Form et référence des transformers)
- La documentation de l'extension ArcGIS Data Interoperability d'Esri (pro.arcgis.com)
- https://epsg.org/ (registre EPSG) et les agences géodésiques (Ressources naturelles Canada, NOAA NGS, IGN)
- Les packs de L01 (`modules/M01/L01/sources/affirmations.yaml`, axe `sig` : Esri), L02 (`modules/M01/L02/sources/affirmations.yaml` : systèmes de coordonnées, codes EPSG, NAD 27 et NAD 83) et L03 (`modules/M01/L03/sources/affirmations.yaml` : transformers), pour ne pas rechercher deux fois ce qui y est déjà sourcé.
