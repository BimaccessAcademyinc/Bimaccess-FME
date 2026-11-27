# FME001-M01-L05 · Cadrage de la leçon

Seule entrée des chercheurs. Écrit par l'orchestrateur depuis le plan du module (`modules/M01/plan-module.md`) ; Ilyas le corrige.

## La leçon

| | |
|---|---|
| Identifiant | FME001-M01-L05 |
| Titre de travail | Du poste à l'automatisation, et vers le BIM |
| Public | professionnels du BIM et de la construction qui n'ont jamais ouvert FME ; ils ont vu L01 à L04 (Safe Software, les obstacles de l'interopérabilité, l'espace de travail, les usages en SIG) ; ils connaissent le BIM, pas forcément l'IFC dans le détail |
| Acquis visé | situer FME Form (le poste, où se construit un espace de travail) et FME Flow (l'automatisation sur un serveur) ; voir comment un modèle IFC devient une donnée SIG : ce que FME lit d'un IFC, comment le modèle se place dans un système de coordonnées, ce qui se garde et ce qui se perd |
| Durée | 6 à 8 minutes |
| Langue | français, version anglaise ensuite |

## Limites

- La leçon dit : FME Form et FME Flow, ce que chacun fait et leurs anciens noms ; ce qu'est une automatisation dans FME Flow (déclencheurs, planifications) ; ce qu'est l'IFC ; ce que le lecteur IFC de FME produit (types d'entités, géométrie, propriétés) ; le géoréférencement d'un modèle IFC ; un cas réel et documenté de BIM vers SIG.
- Elle ne dit pas : l'histoire de Safe Software (L01) ; les obstacles de l'interopérabilité (L02) ; le fonctionnement d'un espace de travail (L03) ; les usages SIG et la reprojection en détail (L04) ; les prix et les licences ; la modélisation BIM elle-même.

## Axes et questions de recherche

### Axe `produits` · FME Form et FME Flow

- Q1 : Que sont FME Form et FME Flow d'après Safe Software ; leurs anciens noms (FME Desktop, FME Server) et la date ou la version du changement ; ce que l'éditeur appelle la plateforme FME ?
- Q2 : Comment FME Form et FME Flow travaillent-ils ensemble : un espace de travail construit dans Form et publié sur Flow ; FME Flow Hosted ?

### Axe `automatisation` · L'automatisation dans FME Flow

- Q3 : Qu'est-ce qu'une automatisation dans FME Flow (déclencheurs, actions, planifications, webhooks, surveillance d'un dossier ou d'une base), d'après la documentation ?
- Q4 : Qu'est-ce qu'un travail (job) et une file d'attente dans FME Flow ; un exemple documenté d'automatisation de données géographiques (agence, municipalité, publication) ?

### Axe `ifc` · L'IFC et sa lecture par FME

- Q5 : Qu'est-ce que l'IFC d'après buildingSMART : à quoi il sert, la norme ISO qui le porte (ISO 16739-1, édition), les versions en usage (IFC2x3, IFC4, IFC4.3) ?
- Q6 : Que produit le lecteur IFC de FME d'après sa documentation : quelles versions il lit, comment les entités IFC deviennent des types d'entités, comment la géométrie (solides, surfaces, maillages) et les propriétés (jeux de propriétés) deviennent des géométries et des attributs ?

### Axe `georeferencement` · Placer un modèle BIM sur la carte

- Q7 : Comment un modèle IFC porte-t-il sa position : coordonnées locales du projet, IfcSite (latitude, longitude), IfcMapConversion et IfcProjectedCRS en IFC4 ? Le guide de géoréférencement de buildingSMART (titre, édition, date) et ce qu'il recommande.
- Q8 : Comment FME place-t-il un modèle IFC dans un système de coordonnées (lecture des informations de géoréférencement, transformers employés), d'après la documentation ou un didacticiel de l'éditeur ?

### Axe `bimsig` · Du BIM au SIG en pratique

- Q9 : Que se garde et que se perd en passant de l'IFC à un format SIG (CityGML, géodatabase, GeoPackage) : sémantique, géométrie, niveaux de détail, d'après des publications académiques ou des agences ?
- Q10 : Un cas réel et documenté de BIM vers SIG avec FME (agence publique, aéroport, ville, réseau, publication académique), et une étude indépendante sur l'intégration BIM et SIG (par exemple les travaux GeoBIM de l'ISPRS et d'EuroSDR) ?

## Sources déjà connues

- https://docs.safe.com/ (documentation de FME Form, de FME Flow et du lecteur IFC)
- https://www.buildingsmart.org/ (IFC, guide de géoréférencement) et https://technical.buildingsmart.org/
- https://www.iso.org/ (ISO 16739-1 ; le texte est payant : chercher les pages publiques)
- Le pack de L01, `modules/M01/L01/sources/affirmations.yaml` (axe `sig` : FME Form, FME Flow, anciens noms), pour ne pas rechercher deux fois ce qui y est déjà sourcé.
