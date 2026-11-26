# Banc d'essai des modèles

Aujourd'hui, chaque agent de la chaîne a un modèle et un effort fixés « sans essai comparatif ». Le banc remplace ce choix d'intuition par une mesure : pour une étape donnée, quel modèle donne la qualité voulue au coût et au temps les plus bas ?

## Ce qu'on compare

Une **étape** de la chaîne, avec une **entrée figée** (les mêmes fichiers pour chaque candidat), jouée par plusieurs **candidats** (modèle et effort). Une étape se compare seulement quand son entrée et sa sortie sont des fichiers : c'est déjà la règle de la chaîne.

| Étape | Sortie jugée | Contrôle par script | Jugement | Candidats de départ |
|---|---|---|---|---|
| Recherche d'un axe | `recherche/<axe>.yaml` | `check_pack.py --axe` | affirmations justes et utiles par question, sources rouvertes | Sonnet, Haiku, Gemini Flash |
| Vérification croisée | `verifie` et notes | aucune | erreurs volontairement glissées dans un registre, retrouvées ou non | Opus, Sonnet |
| Storyboard | `storyboard.md` | `lint:story`, `sync` | grille d'Ilyas (G1 à G21), en aveugle | Opus, Fable, Gemini Pro |
| Relecture du storyboard | liste de défauts | aucune | défauts connus retrouvés, faux défauts | trois lecteurs **de familles différentes** contre trois Opus |
| Contrôles mécaniques | rapport | code de sortie | concordance avec le script | Haiku, modèle ouvert |
| Images d'illustration | image | `check-design.mjs` pour les SVG | règle du sens (planche par phrase) | SVG du graphiste, Nano Banana, ElevenLabs |

## Comment on juge

1. **Le script d'abord.** Ce qui se vérifie par une commande ne se juge pas par un modèle.
2. **Le juge en aveugle.** Les sorties sont renommées `X`, `Y`, `Z` avant d'être jugées. Le juge n'est jamais de la même famille que tous les candidats. Il note sur une grille écrite à l'avance, une ligne par critère, avec la phrase qui justifie la note.
3. **Des cas connus.** Les défauts déjà trouvés par Ilyas sur CER001 (grille de `REGLES.md` § 11, rapports `qa/…-visuels-refaits.md`) forment un jeu de cas : un relecteur se note sur les défauts connus qu'il retrouve. C'est le « jeu de cas tiré des refus de l'expert » que le README du harnais annonce comme manquant.
4. **L'expert tranche sur un échantillon.** Ilyas voit deux sorties côte à côte, sans savoir d'où elles viennent, quand le juge et le script ne départagent pas.

## Ce qu'on mesure

Pour chaque candidat : la note, les tokens (entrée, cache, sortie), le coût estimé, les minutes, et plus tard les défauts que l'expert a trouvés en aval et que l'étape aurait dû voir.

- Sous-agents Claude : `python3 ../mesures/tokens.py --agents "<description>"`.
- Autres fournisseurs : `appel.py` écrit une ligne dans `../mesures/appels.csv` à chaque appel.

## Brancher un fournisseur

1. Clé : demandée par le formulaire sécurisé de l'environnement (jamais collée dans la conversation, jamais écrite dans un fichier). Le proxy l'ajoute aux requêtes vers le domaine du fournisseur.
2. Identifiants de modèles : relevés dans le catalogue du fournisseur, écrits dans `modeles.yaml` avec les prix et leur date de relevé.
3. Essai : `python3 appel.py --test`, puis un appel court.

## Règles

- Un essai garde une trace : entrée, sorties anonymisées, notes, mesures, dans `essais/<date>-<étape>/`.
- Un changement de modèle dans un agent de la chaîne suit un essai qui le justifie, cité dans le message de commit.
- Les noms et identifiants de modèles vivent ici et dans les définitions d'agents, jamais dans un contenu de leçon ni dans un message de commit.
