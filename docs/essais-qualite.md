# Essais de qualité : coût, temps, contrôles

Un essai change une seule chose dans la chaîne et se juge en trois temps : mesures (temps, tokens, appels hors Claude), contrôle de l'agent principal selon le harnais en place, puis contrôle final d'Ilyas. Ce qu'un essai prouve se porte dans le harnais ; ce qu'il réfute se note ici avec sa raison.

Contrôle de l'agent principal, dans cet ordre (harnais en place) : symboles à l'agrandissement (personnes, emblèmes, aucun chiffre ni lettre dessiné) ; planche par phrase de chaque scène comparée à la spécification ; règle du sens et une seule mise en évidence ; aucun texte sur un trait, aucun chevauchement, rien d'éparpillé à la première image, rien sous les sous-titres ni dans la zone d'action ; `npm run check`, `build`, `test:play`.

Mesures : `harnais/mesures/registre.csv` (tokens et minutes par agent, `tokens.py`), `harnais/mesures/appels.csv` (appels hors Claude). Coûts au prix public des API.

## Essai 1 · S02 et S04 par la chaîne, illustrations commandées au modèle d'image

Projet `modules/M01/L01/lecon-essai/`. Graphiste (skill graphisme) qui compose et commande une illustration par élément ; codeur (skill scènes) qui construit selon la spécification.

| Mesure | Graphiste | Codeur | Total |
|---|---|---|---|
| Temps d'agent | 31 min | 27 min | 58 min pour deux scènes |
| Tokens | 0,66 M écrits en cache, 18,2 M lus, 0,18 M en sortie | 0,42 M écrits, 26,4 M lus, 0,11 M en sortie | |
| Coût des tokens (estimation) | environ 11 à 13 $ | environ 9,5 à 11 $ | environ 20 à 24 $ |
| Illustrations | 19 dessins livrés, 2 refus (crédits épuisés), 2,67 $ | sans objet | 2,67 $ |

| Contrôle | Résultat |
|---|---|
| Agent principal | Assemblage réglé : première image composée (fondateurs, contrat, frise), aucun texte sur un trait, aucun chevauchement, aucun trou, une seule mise en évidence, `test:play` conforme, illustrations au pixel de la spécification. Faiblesses : la composition n'occupe que les deux tiers gauches de la feuille (S02, S04), les illustrations sont petites et plates comparées aux planches 4K, le contour de S04 est un rectangle au lieu de l'empreinte du bâtiment, les hachures et l'emprise sur le globe sortent en gris bruité, la carte de S04 est chargée. Défauts de fichiers relevés par le codeur : fond sombre aux coins du globe, trait parasite au-dessus du contrat, aplats des SVG proches mais pas égaux au jeton `papier`. |
| Ilyas (2026-11-27) | Qualité des images et de l'animation au niveau attendu (« la qualité des images est bien là »), semblable à la version de la chaîne. D'accord sur le défaut de composition : S02 surtout, sa deuxième moitié à moitié vide ; la composition doit occuper toute la feuille. |

## Essais suivants proposés

- Modèle d'image rapide contre modèle Pro sur trois éléments de l'essai 1 (environ 0,12 $) : qualité côte à côte, puis choix du modèle par défaut des éléments.
- Planche préparée par le graphiste dans le canevas de design, validée par Ilyas avant le code ; animation par les skills de Remotion et le skill des scènes.
