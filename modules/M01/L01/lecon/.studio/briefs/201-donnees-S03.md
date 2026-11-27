Projet studio : /home/user/Bimaccess-FME/modules/M01/L01/lecon (leçon FME001-M01-L01, signature carte, programme FME001). Plugin Studio : /home/user/bimaccess-studio/plugins/studio.
Règles de cette production (Ilyas, autorité finale) :
- français, sans tiret cadratin ; aucun libellé de statut ; aucun nom de modèle de langage dans les fichiers de la leçon ;
- aucun appel payant (modèle d'image, voix) : un dessin neuf indispensable se signale avec sa commande, jamais lancé ;
- le texte du storyboard (content/storyboard.md) est d'Ilyas : il ne change jamais ; un défaut de texte se signale ;
- un seul écrivain par fichier : tu n'écris que les fichiers que ta tâche nomme ;
- toute commande sync, check, check:scenes, build passe par « node /home/user/bimaccess-studio/plugins/studio/scripts/sous-verrou.mjs -- <commande> » (d'autres agents travaillent en même temps sur le projet) ; un seul Chromium à la fois (shots.mjs et planche.mjs attendent le verrou partagé) ; jamais npm run test:play (le contrôle final le fait) ;
- un échec de check qui nomme une autre scène que la tienne vient d'un autre agent en cours : attends une minute et relance, ne touche pas à son fichier ;
- aucune opération git ; temporaires dans /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/tmp/ ;
- commence par recopier ta tâche (ce message) dans /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/briefs/<ton fichier de brief> puis écris ton rapport dans /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/reports/ sous le même nom.
Face utile de la signature carte : x 104 à 1424, y 180 à 860 ; marge x 1448 à 1830 réservée à l'échelle, à la rose et à la mention de source ; titre en x 104, y 84 ; rien sous y 860 dans la face, rien dans la zone d'action (x 1454, y 834, 360 × 140). Charte : /home/user/Bimaccess-FME/design/CHARTE-FME001.md.

Tu es l'agent des données de scène (rôle donnees-scene). Lis d'abord ta définition /home/user/bimaccess-studio/plugins/studio/agents/donnees-scene.md en entier, puis ton skill /home/user/bimaccess-studio/plugins/studio/skills/scenes-gabarits/SKILL.md, puis /home/user/Bimaccess-FME/modules/M01/L01/lecon/docs/gabarits.md (§ 0 à 8).
Brief : 201-donnees-S03.md.
Tâche : écrire les données de S03 d'après la section « ## S03 » de /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/spec.md (composition du graphiste, gabarit FicheRubriques ; rapport du graphiste : /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/reports/103-graphiste-S03.md). Écris :
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/scenes/S03.json ;
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/lesson/scenes/s03.tsx, trois lignes sur le modèle de /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/lesson/scenes/s04.tsx ;
- dans /home/user/Bimaccess-FME/modules/M01/L01/lecon/src/lesson/lesson.ts, remplace seulement sceneEnAttente("S03") par s03 et ajoute son import (exception accordée par le Super Agent : c'est la seule ligne de ce fichier que tu touches) ;
- si content/sources.json n'a pas d'adresse pour S03 et que la spécification en demande une, signale-le, n'invente pas d'adresse.
Mêmes illustrations, mêmes locutions que la spécification ; tu ne rends pas la main tant que « node /home/user/bimaccess-studio/plugins/studio/scripts/sous-verrou.mjs -- npm run check » refuse. Puis check-literals (node /home/user/bimaccess-studio/plugins/studio/skills/scenes/scripts/check-literals.mjs src/lesson), « node /home/user/bimaccess-studio/plugins/studio/scripts/sous-verrou.mjs -- npm run build », puis la planche par phrase de S03 : node /home/user/bimaccess-studio/plugins/studio/skills/qa/scripts/planche.mjs --scenes S03 --out .studio/qa/sens (depuis /home/user/Bimaccess-FME/modules/M01/L01/lecon). Regarde /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/qa/sens/planche-S03.png et l'image finale, compare à R1 à R8, une ligne par règle dans ton rapport.
Termine par un résumé : fichiers écrits, sortie de check, écarts à la spécification.
