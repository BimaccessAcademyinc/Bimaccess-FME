# Feuille de route du pilote

## 1. Ce qui fait un projet réussi

Une leçon produite de A à Z, de meilleure qualité que les leçons CER001, plus vite et pour moins de tokens, avec un harnais qui ouvre la voie à d'autres leçons. Chaque point se mesure :

| Critère | Mesure | Référence | Cible |
|---|---|---|---|
| Qualité | défauts trouvés par Ilyas sur la planche par phrase, par scène, rangés dans sa grille (G1 à G21) | rapports `qa/…-visuels-refaits.md` de CER001 (onze leçons refaites) | moins d'un défaut de sens par scène au premier passage |
| Exactitude | affirmations dites par la voix sans source de confiance forte ou moyenne | aucune trace dans CER001 | zéro, prouvé par `check_pack.py --extraits` |
| Tours | allers-retours avec Ilyas jusqu'à la leçon acceptée | journaux de leçon CER001 | en baisse de L01 à L05 |
| Temps | minutes de travail des agents par étape, par leçon (`tokens.py`) | L01 du pilote | L02 à L05 sous L01 |
| Tokens et coût | tokens par étape et par leçon, crédits de voix | L01 du pilote | L02 à L05 sous L01, à qualité égale |
| Mise à l'échelle | ce qu'il faut écrire à la main pour lancer une leçon de plus | aujourd'hui : pack, fiche, contextes | un cadrage d'une page |

## 2. Les étapes

| Étape | Livrable | Rôle | État au 2026-11-26 |
|---|---|---|---|
| 0 | Plan du module, cadrage L01 | orchestrateur, Ilyas | fait, à corriger par Ilyas |
| 1 | Pack de recherche L01 : axes, consolidation, extraits vérifiés par script, vérification du sens | chercheurs, consolidateur, vérificateur | fait ; réparation des extraits tronqués en cours |
| 2 | Porte de l'expert du pack : quatre questions posées, le reste appliqué et révisable | Ilyas | fait (Q1, Q2, Q3, Q6 tranchées le 2026-11-26) |
| 3 | Storyboard L01 : deux candidats au banc, trois relecteurs en aveugle, une passe de correction | scénaristes, relecteurs | fait (8 scènes, environ 5 min jouées) |
| 4 | Thèmes des planches : première série écartée (restée dans la charte CAD de buildingSMART), deuxième série faite avec l'outil de design | direction artistique, design, Ilyas | fait : thème 1 « carte topographique », enrichi de conventions cartographiques, fond `#F1F3EC` |
| 5 | Charte FME001 « carte topographique » : jetons, typographie, bibliothèque de symboles, coque du lecteur, artboard « Composants » | graphiste | en cours |
| 6 | Signature « carte » dans le lecteur (troisième signature, polices embarquées hors ligne) | code | à venir |
| 7 | Spécification et planches des huit scènes, scènes codées sur voix provisoire muette, contrôles verts | graphiste, code, QA | à venir |
| 8 | Porte du sens : planche par phrase, plus les trois points révisables (durée, exemples, noms des fondateurs) | Ilyas | à venir |
| 9 | Corrections, voix finale ElevenLabs une seule fois (clé par le formulaire sécurisé), recalage | voix, code | à venir |
| 10 | Livraison `dist/index.html` et bilan L01 (temps, tokens, défauts vus par Ilyas et ratés par les relecteurs) | QA, orchestrateur | à venir |
| 11 | Report du harnais dans le dépôt source et export ; L02 à L05 dans la charte FME001, sans étape des thèmes (une charte est en place) | tous | à venir |

## 3. Les améliorations du harnais essayées ici

| Amélioration | Pourquoi | Où | Report prévu |
|---|---|---|---|
| Pack de recherche | sans pack fourni, la chaîne n'a pas de matière ; la mémoire d'un modèle n'est pas une source | `harnais/skills/pack-recherche/` | skill de la chaîne et étape 0 du plugin Studio |
| Confiance calculée par script | un agent ne juge pas lui-même la solidité de ses sources | `check_pack.py` | idem |
| Extraits vérifiés mot pour mot | la lecture web d'un agent résume ; seul le texte brut prouve la citation | `lire_page.py`, `check_pack.py --extraits` | idem |
| Registre de mesures | « ce qui manque encore » selon le README du harnais | `harnais/mesures/` | `agents/` et plugin |
| Banc d'essai des modèles | modèles fixés « sans essai comparatif » | `harnais/banc-modeles/` | choix de `model:` des agents justifiés par un essai |
| Étape des thèmes des planches | la chaîne CER001 essaie trois directions dans une scène ; Ilyas veut quatre thèmes, chacun avec une planche d'exemple, choisis une fois avant toute planche | étape 4 ci-dessus | `REGLES.md` § 10.8 et rôle design |
| Vérification du sens obligatoire | première passe : 12 affirmations refusées sur 36, dont 7 en narration, alors que tous les extraits étaient exacts | `pack-recherche` § 2.5 | idem |
| Remise au scénariste générée | le pack lisible a divergé des usages dès la vérification | `check_pack.py --remise` | idem |
| Agents à outils restreints | chaque sous-agent généraliste paie environ 100 000 tokens de contexte avant de commencer (mesuré) | à faire | définitions d'agents |

## 4. Les autres modèles

Droits ouverts par Ilyas : gammes Claude, Gemini, modèles ouverts par OpenRouter, images ElevenLabs. Ordre des essais :

1. Gammes Claude d'abord (aucune clé à ajouter) : recherche (Sonnet contre Haiku), vérification (Opus contre Sonnet), storyboard (Opus contre Fable).
2. Relecteurs de familles différentes (Claude, Gemini, modèle ouvert) contre trois relecteurs Claude, sur un jeu de défauts connus de CER001 : l'idée est que des familles différentes ratent des choses différentes.
3. Images : seulement pour ce que le SVG du graphiste ne sait pas faire, et toujours sous la règle du sens.

Il faudra, au moment de l'essai : une clé Google (Gemini) et une clé OpenRouter, saisies dans le formulaire sécurisé de l'environnement, et leurs domaines ouverts dans le réseau de l'environnement.
