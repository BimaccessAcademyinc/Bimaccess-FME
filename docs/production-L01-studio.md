# FME001-M01-L01 avec le harnais Studio exporté

Demandé par Ilyas le 2026-11-27 : produire la leçon FME001-M01-L01 avec le plugin « BIMaccess Studio » du dépôt `bimaccess-studio` (branche `main`, export du commit 8d3a4f2a du dépôt du cours). La matière est faite : pack de recherche, storyboard passé par la porte du ton, charte FME001, illustrations de S02 et S04, voix V4.

## Constat de départ

| Point | État |
|---|---|
| Plugin | dépôt cloné ; l'installation par `claude plugin install studio@bimaccess` est refusée dans cette session. Repli : le skill `plugins/studio/skills/produce/SKILL.md` est suivi à la main, chaque rôle délégué reçoit sa définition (`plugins/studio/agents/<rôle>.md`) et lit ses skills. |
| Autre session | « Production FME001-M01-L01 » (ancien harnais) a poussé dans `modules/M01/L01/lecon/` : projet refait (bcd5125), composition et 22 commandes d'illustrations de S01, S03, S05, S06, S07, sans aucun dessin (833c6fe à 0466540), contrôles bloquants écrits dans la leçon, S02 et S04 repassées (be441bb). Elle travaille ensuite sur L02. **On ne touche pas à `lecon/` tant qu'Ilyas n'a pas dit qu'elle est arrêtée.** |
| Projet neuf | créé hors du dépôt (dossier temporaire de la session) par `new-project.mjs --signature carte --program FME001 --program-color "#00A64F" --theme lecon-gabarits/content/design/theme.json`, avec le storyboard, la voix, les repères, les sources, les données et les illustrations de S02 et S04 de `lecon-gabarits` ; les cinq autres scènes déclarées par `sceneEnAttente`. |
| Nouveau contrôle sur S02 (`lecon-gabarits`) | refus, 4 défauts : mise en évidence `nom` hors face de 5 px en bas (y 865 > 860) ; vides de 440 × 160 px (x 439 à 879, y 700 à 860, en bas au centre), 375 × 165 px (x 1049 à 1424, y 405 à 570) et 260 × 165 px (x 1164 à 1424, y 655 à 820). |
| Nouveau contrôle sur S04 (`lecon-gabarits`) | refus : `textes.entite` sans largeur (`largeurMesuree`, ou `largeur` et `lignes`), puis les textes suivants de même. |
| S02 et S04 de `lecon/` (autre session) | refusées aussi par le nouveau moteur : champ `illustrations.sceau.sur` inconnu. Elles suivent le moteur de la leçon, pas celui du gabarit Studio ; elles ne se reprennent pas telles quelles. |

## Plan

Le projet se crée dans `modules/M01/L01/lecon/` dès qu'Ilyas dit que l'autre session est arrêtée (le script refuse un dossier non vide : l'ancien `lecon/` sort d'abord du dossier, il reste dans l'historique git). D'ici là, tout se prépare sur le projet hors du dépôt.

| Étape | Rôle | Livre | Contrôle |
|---|---|---|---|
| 1 | Super Agent | projet neuf, `content/brief.md`, `.gitignore` | `npm run check` (« scènes chargées : 7 »), `find-playwright.mjs` |
| 2 | 5 graphistes en parallèle, une scène chacun (S01, S03, S05, S06, S07) | gabarit de composition, section de `spec.md`, commandes d'illustrations, devis sans appel | `check-design.mjs`, `npm run check` |
| · | Ilyas | **devis des illustrations** (ci-dessous) | sortie de l'outil |
| 3a | code | `lesson.ts` complet, `beats.json` | `npm run check` |
| 3b | 7 agents `donnees-scene` en parallèle, une scène chacun : S02 et S04 corrigées pour le nouveau contrôle (places et tailles seulement, mêmes éléments, gestes et locutions), S01, S03, S05, S06, S07 par gabarit ; `code` pour une forme sans gabarit | `content/design/scenes/Sxx.json`, `sNN.tsx` | chaque agent : `npm run check` en 0 sous verrou et son image finale ; puis `check-literals`, `build`, `test:play` |
| 4 | qa | planche par phrase des 7 scènes | **porte du sens** (Ilyas, sur le lecteur et les planches) |
| 5 | voix | les 7 clips V4 gardés tant que le texte dit ne change pas ; un clip dont le texte change se regénère sur devis | `npm run voice -- verify` |
| 6 | code et données | recalage si un clip change | `sync`, `check`, `build` |
| 7 | qa | rapport, captures de la signature carte | `test:play` ; push ; lecteur Railway |

Aucune porte sur la composition. Chaque étape se mesure (`harnais/mesures/tokens.py`, registre du pilote et `.studio/mesures/` du projet).

## Devis prévisible des illustrations

| Poste | Dessins | Modèle | Prix unitaire | Total |
|---|---|---|---|---|
| S02 et S04 | 0 (14 dessins repris de `lecon-gabarits`, SVG présents) | | | 0 $ |
| S01, S03, S05, S06, S07 | 22 (nombre des commandes écrites par l'autre session ; les graphistes de cette chaîne peuvent en écrire un peu plus ou un peu moins, et reprennent d'abord la bibliothèque) | Flash 3.1, 1K | 0,067 $ | 1,48 $ |
| Reprises, une au plus par dessin | 22 au plus | Flash 3.1, 1K | 0,067 $ | 1,48 $ au plus |
| **Plafond proposé** | 44 au plus | | | **2,95 $** |

Devis lu dans la sortie de `illustrations.py` lancé sans `--approuve` sur les 22 commandes (code 3, aucun appel) : « 1.474 $, soit 1.48 $ à approuver (22 dessins, flash 1K à 0.067 $) ». Le devis exact se refait sur les commandes des graphistes de l'étape 2, avant tout appel. La voix ne coûte rien tant que le texte dit ne change pas.

## À décider par Ilyas

1. L'autre session est-elle arrêtée ? Sans ta réponse, `lecon/` ne bouge pas.
2. Les compositions et les 22 commandes de l'autre session pour S01, S03, S05, S06, S07 : les graphistes de cette chaîne les lisent comme point de départ (gain de temps), ou repartent de zéro ?
3. Le plafond de 2,95 $ pour les illustrations, à engager seulement après le devis exact de l'étape 2.
