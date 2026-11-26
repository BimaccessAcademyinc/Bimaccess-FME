# Brief 14 · corrections après la porte du sens (FME001-M01-L01)

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon. Deux agents corrigent en même temps, chacun ses scènes (groupe donné dans l'invite). Chacun joue le graphiste et le codeur de ses scènes : il corrige la spécification (`content/design/spec.md`, seulement les sections de ses scènes), les illustrations de ses scènes (`content/design/assets/sNN-*.svg`) et le code (`src/lesson/scenes/sNN.tsx`, `src/lesson/components/sNN-*.tsx`).

## Décisions d'Ilyas à la porte du sens (2026-11-26)

- Corrections retenues (les miennes, ci-dessous).
- Gardés : les exemples illustratifs, les routes de traduction rouges (S02), Don Murray et Dale Lutz nommés de S01 à S06, la durée d'environ 5 minutes.
- **Aucune voix pour l'instant** : revue sur l'animation avec sous-titres.

## Corrections

- **S02** : chaque élément arrive **au début de la phrase** qui le dit, jamais après (le jalon 1993 n'est pas là quand la voix dit « fondée en 1993 ») : caler sur la première locution de la phrase. Agrandir la composition, qui occupe aujourd'hui un petit quart de la face, tassée à gauche : la frise et les cartes prennent la largeur de la face (x 104 à 1424), textes de 26 px au moins.
- **S01** : la moitié droite de la face reste vide pendant tout le récit ; recomposer pour occuper la face (le territoire « Colombie-Britannique » plus large, les cartes mieux réparties), sans rien ajouter qui ne se nomme pas.
- **S06** : légende de marge « Lire » (route bleue) et « Écrire » (route rouge), deux nouveaux textes d'écran (6 et 7 du storyboard), qui arrivent avec les routes qu'ils nomment.
- **S07** : « Système de coordonnées » arrive au début de la phrase, pas à sa fin.
- **Mentions de source cliquables** (S01, S02, S03, S05, S06) : l'adresse de chaque scène est dans `content/sources.json` (clé `sources`, par scène), tirée du pack. Lire ce fichier depuis la scène (import JSON), jamais écrire l'adresse en dur ; lien ouvert dans un nouvel onglet (`target="_blank"`, `rel="noopener"`).

## Règles

- Les textes viennent du storyboard ; ne change aucun texte d'écran ni de narration.
- Aucune écriture dans `content/beats.json` : instants sur des locutions dites mot pour mot.
- Contrôles sous verrou : `flock /tmp/fme001-sync.lock npm run check` (code 0, « scènes chargées : 7 ») ; `node /home/user/bimaccess-studio/plugins/studio/skills/scenes/scripts/check-literals.mjs src/lesson` (code 0). Pas de build, de test:play ni de navigateur : l'orchestrateur refait les planches.
- Charte : /home/user/Bimaccess-FME/design/CHARTE-FME001.md ; méthode : skills graphisme et scènes du plugin (/home/user/bimaccess-studio/plugins/studio/skills/graphisme/, /home/user/bimaccess-studio/plugins/studio/skills/scenes/).
- Aucune opération git ; ne touche qu'à tes scènes.

## Rapport (court)

Fichiers, contrôles (code de sortie, extrait), pour chaque correction ce qui a changé (anciens et nouveaux instants ou positions).
