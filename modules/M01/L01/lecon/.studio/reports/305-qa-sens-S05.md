# Lecture S05 · FME lit, transforme, puis écrit

Preuves : planche-S05.png, captures S05/ (t3.56, t8.22, t12.08, t18.40, end) et S05/extra/ (t13.20, t14.20, t15.20, t16.20, faites pour juger la seconde mise en évidence et le passage de la carte). shots.mjs : 0 erreur de page ou de console.

## Phrase par phrase (ce que dirait une personne du public sans la voix)

1. « Une entité quitte son logiciel dans un format de départ, et l'équipe qui la reçoit en attend un autre. » (t3.56) Deux feuilles se font face, « FORMAT DE DÉPART » à lignes horizontales avec une petite carte dedans, « FORMAT ATTENDU » à quadrillage ; entre elles, du vide. Les deux formats se nomment, les deux trames différentes disent « deux formats ». La petite carte (contour et barre) n'a aucun nom à l'écran : on devine l'objet qui va partir, rien ne dit « entité » (D3).
2. « FME commence par lire les données source. » (t8.22) Route bleue « LIRE » qui sort de la feuille de départ, pointe vers la droite ; la carte est sortie et attend au bout. Le trait part de la chose dont on parle (la feuille de départ). Il arrive sur une pointe, pas sur une chose nommée : la route est posée avant le bloc des outils. Conforme au minutage de la spécification.
3. « Ses outils de transformation manipulent la géométrie et les attributs des données. » (t12.08) Un cadre « OUTILS DE TRANSFORMATION » apparaît, la carte y entre, tireté bleu sur son contour. À t13.20 le tireté passe à la barre (attribut). Une seule mise en évidence à la fois, sur la bonne partie à chaque mot. Mais le cadre des outils est vide hors la carte : aucun outil ne se reconnaît, seul le bandeau les nomme (D2).
4. « FME peut alors écrire les données de destination dans le format attendu, celui que le logiciel de l'équipe sait ouvrir. » (t18.40) Route rouge « ÉCRIRE » du cadre des outils vers « FORMAT ATTENDU », la carte arrivée dans la feuille quadrillée, aucune mise en évidence. Le trajet se lit. Pendant le passage (extra t15.20), la carte recouvre l'étiquette « ÉCRIRE » (D4).
5. État final : voir ci-dessous.

## Image finale contre S05-FIN

La chaîne complète (feuille de départ, LIRE, outils, ÉCRIRE, feuille attendue), la carte dans la feuille de droite sur la trame quadrillée, titre, échelle, rose, mention de source dans la marge, aucune mise en évidence : conforme à l'état. Textes retrouvés dans le storyboard (« FME lit, transforme, puis écrit. », « Format de départ », « Format attendu », « Lire », « Outils de transformation », « Écrire », « D'après Safe Software »), sans tiret cadratin.

## Composition (R1 à R8)

- R1 : le gabarit ne couvre pas cette forme ; scène codée sur mesure, forme déclarée par la spécification. Pas jugé.
- R2 et R3 : défaut D1. La chaîne n'occupe que y 360 à 676 de la face y 180 à 860 : bandes vides d'environ 180 px au-dessus et 184 px au-dessous (s05-end.png : y capture 129 à 259 et 486 à 618, seules des croix du carroyage). En largeur la chaîne va jusqu'à x 1488 (débord permis).
- R4 : conforme (LIRE et ÉCRIRE au-dessus de leur route, à 5 px du bord).
- R5 : conforme (mises en évidence dans les outils, textes dans la face, rien sous y 860, rien dans la zone d'action).
- R6 : conforme (marge : échelle, rose, mention de source seulement ; la feuille d'arrivée déborde de x 1424 à 1488 dans le débord permis).
- R7 : défaut D4 à t15.20 seulement ; à l'arrêt, aucun chevauchement.
- R8 : défauts D2 et D3.

## Symboles à l'agrandissement

Aucune personne, aucun sceau. Aucun chiffre ni lettre dessiné dans une illustration (carte : contour et barre ; rose sans lettre). Conforme.

## Défauts

- D1 (composition, graphiste, spec.md S05 et s05-chaine.svg) : face à moitié vide, la chaîne fait 316 px de haut sur 680. Preuve : s05-end.png, s05-t18.40.png. Attendu : face remplie (R2, R3), éléments à la bonne échelle ; agrandir la chaîne et la carte, sans élément que la narration ne nomme pas.
- D2 (sens, graphiste, s05-chaine.svg) : le cadre « Outils de transformation » est vide dans l'image finale (s05-end.png, s05-t18.40.png) ; la phrase 3 parle de géométrie et d'attributs, seule la carte de passage les montre, et elle repart. Attendu : le cadre porte de quoi se reconnaître (par exemple les deux objets de la phrase, le contour et la ligne d'attribut), sans nouveau texte.
- D3 (sens, ilyas, storyboard `## Écran`) : la carte qui voyage n'est nommée nulle part alors que la phrase 1 dit « une entité » ; le texte étant d'Ilyas, à lui de dire si un nom à l'écran est voulu. Non corrigé par un agent.
- D4 (composition, graphiste, spec.md S05 étape 8) : en transit de C2 à C3 la carte (y 490 à 590) recouvre l'étiquette « ÉCRIRE » (boîte y 494 à 528) et la route (extra/s05-t15.20.png). Attendu : aucun chevauchement (R7), par exemple un trajet qui passe sous l'étiquette ou une étiquette hors de la bande de la carte.
