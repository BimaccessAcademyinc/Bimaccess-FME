# Brief · données de S04 (agent donnees-scene)

Projet : `/home/user/Bimaccess-FME/modules/M01/L01/lecon`. Plugin : `/home/user/bimaccess-studio/plugins/studio`.

## Ton rôle
Lis d'abord ta définition `/home/user/bimaccess-studio/plugins/studio/agents/donnees-scene.md` en entier (mission, interdits, rapport), puis ton skill `/home/user/bimaccess-studio/plugins/studio/skills/scenes-gabarits/SKILL.md`, puis `/home/user/Bimaccess-FME/modules/M01/L01/lecon/docs/gabarits.md` (§ 0, 2, 3, 6, 7, 8). Tu es une scène, un agent ; l'autre scène par gabarit est faite en même temps par un autre agent : toute commande `sync`, `check`, `check:scenes`, `build` passe par `node /home/user/bimaccess-studio/plugins/studio/scripts/sous-verrou.mjs -- <commande>`.

## Tâche
`content/design/scenes/S04.json` vient de l'essai lecon-gabarits ; le nouveau contrôle bloquant le refuse. Fais-le passer **en ne changeant que des places, des tailles et des largeurs de texte** : mêmes illustrations, mêmes textes, mêmes gestes, mêmes locutions. La composition est dans `/home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/spec.md`, section `## S04` ; elle reste juste dans son sens.

Refus constatés :
- `textes.entite` : largeur du texte inconnue (`largeurMesuree`, ou `largeur` et `lignes`) ; les autres textes ont sans doute le même défaut, puis d'autres contrôles (remplissage, chevauchement) peuvent suivre.

## Copie de travail
S02 est refusée tant que l'autre agent ne l'a pas corrigée, et le contrôle s'arrête à la première scène refusée. Tu travailles donc dans la copie `/tmp/claude-0/-home-user-Bimaccess-FME/68d7a78b-be4f-5c51-92be-927951b4e583/scratchpad/copie-S04` (S02 y est en attente), sans verrou : lance tes commandes depuis ce dossier, sans `sous-verrou.mjs`. Le Super Agent recopie ensuite ton `S04.json` dans le projet.

## Fichiers à écrire
Seulement `content/design/scenes/S04.json` de la copie, et ton rapport dans le projet : `/home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/reports/104-donnees-S04.md`. Ne touche pas à `src/lesson/scenes/s04.tsx` sauf s'il ne suit plus le moteur (il appelle déjà le gabarit). Captures dans `.studio/qa/donnees/S04/` de la copie.

## Contrôles
`npm run check:scenes` dans la copie, en 0. Puis l'image finale (`build` sous verrou, `shots.mjs --scene 04 --times end`), regardée, R1 à R8 en une ligne chacune.

## Rapport
Ce que tu as changé (champ, avant, après), sortie des contrôles, ce que tu as vu sur l'image, ce qui remonte au graphiste. Aucun appel payant, aucune opération git, aucune question à l'utilisateur.
