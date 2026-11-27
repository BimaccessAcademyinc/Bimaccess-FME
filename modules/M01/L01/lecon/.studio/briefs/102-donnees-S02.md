# Brief · données de S02 (agent donnees-scene)

Projet : `/home/user/Bimaccess-FME/modules/M01/L01/lecon`. Plugin : `/home/user/bimaccess-studio/plugins/studio`.

## Ton rôle
Lis d'abord ta définition `/home/user/bimaccess-studio/plugins/studio/agents/donnees-scene.md` en entier (mission, interdits, rapport), puis ton skill `/home/user/bimaccess-studio/plugins/studio/skills/scenes-gabarits/SKILL.md`, puis `/home/user/Bimaccess-FME/modules/M01/L01/lecon/docs/gabarits.md` (§ 0, 2, 3, 6, 7, 8). Tu es une scène, un agent ; l'autre scène par gabarit est faite en même temps par un autre agent : toute commande `sync`, `check`, `check:scenes`, `build` passe par `node /home/user/bimaccess-studio/plugins/studio/scripts/sous-verrou.mjs -- <commande>`.

## Tâche
`content/design/scenes/S02.json` vient de l'essai lecon-gabarits ; le nouveau contrôle bloquant le refuse. Fais-le passer **en ne changeant que des places, des tailles et des largeurs de texte** : mêmes illustrations, mêmes textes, mêmes gestes, mêmes locutions. La composition est dans `/home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/spec.md`, section `## S02` ; elle reste juste dans son sens.

Refus constatés :
- mise en évidence `nom` hors face de 5 px en bas (y 865 > 860) ;
- vides : x 439 à 879, y 700 à 860 (440 × 160, en bas au centre), x 1049 à 1424, y 405 à 570 (375 × 165), x 1164 à 1424, y 655 à 820 (260 × 165). La face va de x 104 à 1424, y 180 à 860.

## Fichiers à écrire
Seulement `content/design/scenes/S02.json` et ton rapport `.studio/reports/102-donnees-S02.md`. Ne touche pas à `src/lesson/scenes/s02.tsx` sauf s'il ne suit plus le moteur (il appelle déjà le gabarit). Captures dans `.studio/qa/donnees/S02/`.

## Contrôles
`node /home/user/bimaccess-studio/plugins/studio/scripts/sous-verrou.mjs -- npm run check:scenes` : une autre scène peut encore échouer ; seul compte qu'aucune erreur ne nomme `S02.json`. Puis l'image finale (`build` sous verrou, `shots.mjs --scene 02 --times end`), regardée, R1 à R8 en une ligne chacune.

## Rapport
Ce que tu as changé (champ, avant, après), sortie des contrôles, ce que tu as vu sur l'image, ce qui remonte au graphiste. Aucun appel payant, aucune opération git, aucune question à l'utilisateur.
