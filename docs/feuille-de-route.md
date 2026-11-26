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
| 1 | Pack de recherche L01 : axes, consolidation, extraits vérifiés par script | chercheurs, consolidateur | en cours |
| 2 | Porte de l'expert du pack (dix questions au plus) | Ilyas | à venir |
| 3 | Storyboard L01, relecture par trois lecteurs | scénariste, relecteurs | à venir |
| 4 | Trois directions artistiques essayées dans la scène la plus difficile | direction artistique | à venir |
| 5 | Scènes codées sur voix provisoire muette, planche par phrase | graphiste, code, QA | à venir |
| 6 | Porte du sens (planche par phrase vue par Ilyas) | Ilyas | à venir |
| 7 | Voix finale, recalage, contrôle, livraison | voix, code, QA | à venir |
| 8 | Bilan L01 : mesures, défauts, causes, corrections du harnais | orchestrateur | à venir |
| 9 | L02 à L05 avec le harnais corrigé ; report dans le dépôt source et export | tous | à venir |

## 3. Les améliorations du harnais essayées ici

| Amélioration | Pourquoi | Où | Report prévu |
|---|---|---|---|
| Pack de recherche | sans pack fourni, la chaîne n'a pas de matière ; la mémoire d'un modèle n'est pas une source | `harnais/skills/pack-recherche/` | skill de la chaîne et étape 0 du plugin Studio |
| Confiance calculée par script | un agent ne juge pas lui-même la solidité de ses sources | `check_pack.py` | idem |
| Extraits vérifiés mot pour mot | la lecture web d'un agent résume ; seul le texte brut prouve la citation | `lire_page.py`, `check_pack.py --extraits` | idem |
| Registre de mesures | « ce qui manque encore » selon le README du harnais | `harnais/mesures/` | `agents/` et plugin |
| Banc d'essai des modèles | modèles fixés « sans essai comparatif » | `harnais/banc-modeles/` | choix de `model:` des agents justifiés par un essai |
| Agents à outils restreints | chaque sous-agent généraliste paie environ 100 000 tokens de contexte avant de commencer (mesuré) | à faire | définitions d'agents |

## 4. Les autres modèles

Droits ouverts par Ilyas : gammes Claude, Gemini, modèles ouverts par OpenRouter, images ElevenLabs. Ordre des essais :

1. Gammes Claude d'abord (aucune clé à ajouter) : recherche (Sonnet contre Haiku), vérification (Opus contre Sonnet), storyboard (Opus contre Fable).
2. Relecteurs de familles différentes (Claude, Gemini, modèle ouvert) contre trois relecteurs Claude, sur un jeu de défauts connus de CER001 : l'idée est que des familles différentes ratent des choses différentes.
3. Images : seulement pour ce que le SVG du graphiste ne sait pas faire, et toujours sous la règle du sens.

Il faudra, au moment de l'essai : une clé Google (Gemini) et une clé OpenRouter, saisies dans le formulaire sécurisé de l'environnement, et leurs domaines ouverts dans le réseau de l'environnement.
