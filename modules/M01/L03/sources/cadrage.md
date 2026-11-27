# FME001-M01-L03 · Cadrage de la leçon

Seule entrée des chercheurs. Écrit par l'orchestrateur depuis le plan du module (`modules/M01/plan-module.md`) ; Ilyas le corrige.

## La leçon

| | |
|---|---|
| Identifiant | FME001-M01-L03 |
| Titre de travail | Lire, transformer, écrire |
| Public | professionnels du BIM et de la construction qui n'ont jamais ouvert FME ; ils ont vu L01 (le sens de « feature », Safe Software, FME qui lit, transforme et écrit) et L02 (les quatre obstacles : formats, modèles de données, systèmes de coordonnées, sémantique) |
| Acquis visé | lire un espace de travail FME : reconnaître les lecteurs, les transformers, les writers et les liaisons qui les relient ; suivre le flux des entités d'un bout à l'autre ; prévoir ce que donne un petit flux (combien d'entités sortent, avec quels attributs, vers quelle sortie) |
| Durée | 8 à 10 minutes |
| Langue | français, version anglaise ensuite |

## Limites

- La leçon dit : ce qu'est un espace de travail dans FME Form (Workbench) et ce qu'il contient ; ce que font un lecteur, un writer et un transformer ; les types d'entités ; les ports et les liaisons ; comment les entités traversent un flux, une à une ou en groupe ; comment voir ce qui passe (journal, compteurs sur les liaisons, inspection) ; un petit flux réel, documenté, et son résultat.
- Elle ne dit pas : les obstacles de l'interopérabilité (L02) ; les usages types en SIG et le choix d'un transformer pour un cas (L04) ; la reprojection et la manipulation des systèmes de coordonnées (L04) ; FME Flow, l'automatisation, le BIM vers SIG et l'IFC (L05).

## Axes et questions de recherche

### Axe `espace` · L'espace de travail

- Q1 : Qu'est-ce qu'un espace de travail (workspace) d'après la documentation de FME Form : où il se crée (Workbench), ce qu'il contient (lecteurs, transformers, writers, liaisons, paramètres), sous quelle forme il s'enregistre ?
- Q2 : Que se passe-t-il quand on exécute un espace de travail : ce que fait FME pendant la traduction, ce que montre le journal (log) à la fin (nombre d'entités lues et écrites, avertissements) ?
- Q3 : Comment la documentation présente-t-elle l'interface de Workbench (canevas, fenêtres) à un débutant ? Seulement ce qu'une page décrit ; les captures restent des références à redessiner.

### Axe `lecteurs` · Lecteurs et writers

- Q4 : Qu'est-ce qu'un lecteur (reader) : un format et un jeu de données d'entrée, des paramètres ; qu'est-ce qu'un type d'entité (feature type) du côté du lecteur (couche, table, classe) et son schéma (attributs, géométrie) ?
- Q5 : Qu'est-ce qu'un writer : un format et un jeu de données de sortie ; ses types d'entités et leur schéma ; comment une entité atteint un type d'entité de sortie ?
- Q6 : Comment la documentation distingue-t-elle le schéma source du schéma de destination, et que se passe-t-il pour un attribut qui n'existe pas dans le schéma de sortie ? Seulement ce qui est écrit.

### Axe `transformers` · Les transformers

- Q7 : Qu'est-ce qu'un transformer d'après la documentation : ce qu'il reçoit, ce qu'il fait, ses ports d'entrée et de sortie, ses paramètres ?
- Q8 : Comment la documentation classe-t-elle les transformers (catégories, galerie) ; un nombre de transformers est-il donné, par qui et à quelle date ?
- Q9 : Que font, d'après leur page de référence, quelques transformers de base qu'un petit flux emploie (par exemple AttributeManager, Tester, Counter, AreaCalculator) : leurs ports de sortie (par exemple Passed et Failed) et ce qui en sort ?

### Axe `flux` · Le flux des entités

- Q10 : Comment les entités traversent-elles un espace de travail : une à une le long des liaisons, ou en groupe ? Comment la documentation distingue-t-elle les transformers qui traitent une entité à la fois de ceux qui attendent un groupe (« group-based », « blocking »), et ce que change un paramètre de regroupement (Group By) ?
- Q11 : Comment voir ce qui passe : les compteurs d'entités sur les liaisons après une exécution, la mise en cache des entités (feature caching), l'inspection des données (Visual Preview, Data Inspector) ? Ce que la documentation en dit.
- Q12 : Un petit flux réel et documenté, avec ses données d'exemple et son résultat attendu (didacticiel de l'éditeur, cours d'une université, guide d'une agence publique) : ce qu'il lit, ce qu'il transforme, ce qu'il écrit, et ce qui en sort.
- Q13 : Une source indépendante de l'éditeur qui décrit un espace de travail FME et son flux (publication académique, cours universitaire, guide d'une agence publique, documentation d'un partenaire comme l'extension ArcGIS Data Interoperability).

## Sources déjà connues

- https://docs.safe.com/fme/html/FME-Form-Documentation/FME-Form/Workbench/What_is_FME.htm (documentation de FME Form, page « What is FME »)
- https://docs.safe.com/ (documentation de FME Form et référence des transformers)
- La documentation de l'extension ArcGIS Data Interoperability d'Esri (outils ETL spatiaux construits avec FME Workbench), pour une description d'un tiers.
- Le pack de L01, `modules/M01/L01/sources/affirmations.yaml` (axe `nom`, Q3 et Q4 : feature, readers, writers, transformers, engine), et celui de L02, `modules/M01/L02/sources/affirmations.yaml` (ETL spatial), pour ne pas rechercher deux fois ce qui y est déjà sourcé.
