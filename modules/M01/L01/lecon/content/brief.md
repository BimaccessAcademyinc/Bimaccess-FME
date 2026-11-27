# Brief · FME : partager les données géographiques entre logiciels

| Point | Valeur |
|---|---|
| Sujet | Le problème d'échange de données géographiques que Don Murray et Dale Lutz rencontrent en Colombie-Britannique au début des années 1990, la réponse qu'ils construisent (Safe Software, puis FME), et ce que FME fait d'une donnée géographique ; première leçon du module FME001-M01 |
| Public | professionnels du BIM et de la construction qui n'ont jamais ouvert FME ; notions de base du SIG non supposées |
| Objectif | 1. raconter le problème de départ (des logiciels différents qui doivent échanger des données géographiques) et la réponse que FME y apporte ; 2. dire qui a créé FME et quand (Safe Software, 1993 ; FME, 1996) ; 3. dire ce qu'est FME (un logiciel, une plateforme d'intégration de données, avec FME Form et FME Flow) et le distinguer d'un format et d'une norme comme SAIF ; 4. reconnaître les trois parties d'une entité géographique (géométrie, attributs, système de coordonnées)  ; 5. expliquer que FME lit, transforme puis écrit les données, comme un moteur au milieu des formats |
| Durée maximale | 8 minutes (6 à 8) |
| Langue | fr |
| Voix | voix V4 d'usage, sept clips déjà générés (repris de lecon-gabarits, content/voice/) ; gardés tant que le texte dit ne change pas ; un clip qui change se regénère sur devis |
| Contrôle automatique | Playwright utilisable (find-playwright.mjs : Playwright 1.63.0, Chromium 158) |
| Ton | clair et direct, narration à la troisième personne |
| Interactivité | aucun exercice (décision d'Ilyas, 2026-11-27 : « y'avait pas besoin d'exercice ») |
| Signature | carte (feuille topographique imprimée) |
| Programme | FME001, leçon FME001-M01-L01, couleur de programme vert ACI #00A64F |
| Dépôt de la formation | hors du dépôt de la formation ; projet dans `/home/user/Bimaccess-FME` (dépôt pilote du module FME001) |
| Règles du projet | `/home/user/bimaccess-studio/chaine/agents/REGLES.md`, à lire comme règles d'écriture de BIMaccess : § 2.3, 2.4, 2.7, 2.8 (une scène, une affirmation ; questions d'ouverture et de pont ; rien de nommé avant sa leçon ; l'accroche), § 3 à 8, § 11 (grille d'Ilyas). Ne s'appliquent pas : § 1.2 sur le pack (remplacé par la ligne Sources), § 2.1, 2.2, 2.5, 2.6 (filtre de certification et durée propres à CER001), les mentions du bâtiment fil rouge de CER001, de l'IFC et du BoK |
| Autorité du contenu | Ilyas (exactitude technique, sens pédagogique, exemples, questions, publication) |
| Charte | `/home/user/Bimaccess-FME/design/CHARTE-FME001.md` fait foi ; thème `content/design/theme.json` (repris de lecon-gabarits) ; symboles dessinés `/home/user/Bimaccess-FME/design/symboles/`, bibliothèque `/home/user/Bimaccess-FME/design/bibliotheque/` |

## Sources

Seule matière autorisée. Ce qui n'y est pas ne se dit pas, aucun chiffre, cas ni exemple inventé.

- `/home/user/Bimaccess-FME/modules/M01/L01/sources/remise-scenariste.md` : **ce que la voix et l'écran peuvent dire** (généré depuis le registre), la terminologie décidée, et ce qui ne se dit pas.
- `/home/user/Bimaccess-FME/modules/M01/L01/sources/source-pack.md` : synthèse lisible du pack, pour comprendre ; en cas d'écart avec la remise, la remise l'emporte.
- `/home/user/Bimaccess-FME/modules/M01/L01/sources/porte-expert.md` : décisions d'Ilyas (Q1 à Q10).
- `/home/user/Bimaccess-FME/modules/M01/L01/sources/cadrage.md` : acquis visé, limites, leçons voisines.

## Textes imposés par l'utilisateur

Aucun texte écrit par Ilyas à ce jour. Ses décisions de porte sont des contraintes :

- « Safe Software est fondée en 1993 », puis « FME sort en 1996 » (Q1).
- FME, « à l'origine » Feature Manipulation Engine (Q2).
- « entité géographique » partout dans la voix et à l'écran ; « feature » montré une seule fois, comme le mot de l'outil (Q3).
- Pas d'Esri dans cette leçon (Q6).

## Défauts retenus

- Durée 6 à 8 minutes, 5 à 7 scènes, phrases de 22 mots au plus.
- Le siège à Surrey seulement pour « Safe Software en bref » ; ni effectif, ni nombre de formats, ni noms des produits actuels (Q7, Q9).

## Reprise (décision d'Ilyas, 2026-11-27)

Utiliser ce qui a déjà été créé dans les essais, pour économiser tokens et temps : storyboard, voix, sources, repères, données et illustrations de S02 et S04, scènes codées S01, S05, S06, S07 et leurs SVG, tous repris de `lecon-gabarits`. Composition de l'ancienne version de `lecon/` dans `.studio/reprise/`. Pack de recherche dans `../sources/`, pas refait.

## Dépenses approuvées

Aucune à ce jour. Ilyas trouve le devis de 2,95 $ trop cher : viser beaucoup plus bas. Règle de cette production : aucun dessin neuf tant qu'un SVG existant (symboles, bibliothèque, essais) ou un tracé du moteur peut servir ; un dessin neuf indispensable passe par un devis.

## Hors sujet

- Construire un espace de travail, les formats et systèmes de coordonnées en détail (L02, L03), les usages SIG détaillés (L04), FME Flow et l'automatisation, le BIM vers SIG (L05), Esri.
