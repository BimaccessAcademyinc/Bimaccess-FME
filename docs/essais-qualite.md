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

## Essai 2 · S02 et S04 par gabarits

Projet `modules/M01/L01/lecon-gabarits/`. Phase A (une fois) : deux composants de gabarit dans le moteur (`src/engine/gabarits/`), `Frise` et `FicheRubriques`, pilotés par un fichier de données par scène, avec contrôle au chargement (locutions, indices d'Écran, illustrations, enchaînements, mises en évidence, feuille remplie) et leur documentation (`docs/gabarits.md`). Phase B : S02 et S04 refaites comme données seulement (`content/design/scenes/S02.json` 10 Ko, `S04.json` 6,5 Ko ; `s02.tsx` et `s04.tsx` d'une instruction, contre 15 et 13 Ko de code à l'essai 1), un agent par scène en parallèle, sur le modèle intermédiaire. Mêmes illustrations que l'essai 1, aucun appel payant. Le contrôle d'Ilyas sur l'essai 1 (feuille à remplir) a été pris en compte en cours de phase A.

| Mesure | Phase A (une fois, Opus) | S02 (Sonnet) | S04 (Sonnet) | Essai 1 (graphiste et codeur, Opus) |
|---|---|---|---|---|
| Temps d'agent | 15,3 min | 8,1 min | 6,3 min (deux passes) | 58 min (31 + 27), environ 29 min par scène ; codeur seul 13,5 min par scène |
| Tokens | 0,33 M écrits, 9,3 M lus, 0,09 M en sortie | 0,19 M écrits, 2,7 M lus, 0,04 M en sortie | 0,18 M écrits, 2,5 M lus, 0,03 M en sortie | 1,08 M écrits, 44,5 M lus, 0,29 M en sortie |
| Coût des tokens (prix publics, cache écrit à 1,25 à 2 fois l'entrée) | environ 5,4 à 6,3 $ | environ 1,2 à 1,5 $ | environ 1,0 à 1,3 $ | environ 20 à 24 $, plus 2,67 $ d'illustrations |

Les deux scènes de la phase B ont tourné en même temps : 8 min de bout en bout. Par scène, sans la phase A : environ 7 min et 1,2 $, contre 13,5 min et 5 $ pour le seul codeur de l'essai 1. Phase A comprise et partagée sur deux scènes : environ 15 min par scène ; elle se partage ensuite sur toutes les frises et fiches du module. Le graphiste de l'essai 1 (spécification, illustrations) n'a pas été refait : la phase B reprend sa spécification. Agent principal (orchestration, contrôles, corrections) : environ 31 min de session, 0,24 M écrits, 15,7 M lus, 0,04 M en sortie, environ 5 $ ; l'essai 1 ne le comptait pas.

| Contrôle | Résultat |
|---|---|
| Agent principal | `check` et `build` en code 0, `check-literals` 0 texte en dur, `test:play` « tout est conforme » (S02 214 images, S04 133, une mise en évidence au plus). Planche par phrase (`.studio/qa/controle/`) : mêmes illustrations et mêmes gestes que l'essai 1 (frise et pointe à l'image 0, cases à deux couches, routes à trois couches, feuille par bandes sans couture, contour qui voyage, globe découpé), une seule mise en évidence, aucun texte sur un trait. Feuille : S02 remplit maintenant la face (plus de vide sous la frise ; fenêtres, SAIF, lieu et bloc 1996 agrandis, jalon 1996 rapproché) ; S04 occupe la face de haut en bas (carte, bâtiment et fiche agrandis, projection européenne gardée, trait droit). Corrections de l'agent principal : zone utile d'abord élargie à tort jusqu'à x 1816 (la marge de la charte), ce qui a fait mettre le bâtiment de S04 dans la marge, puis ramenée à la face x 104 à 1424 et S04 reprise ; réserves `papier` des textes de carte remises à aucune (pavés clairs revenus). Reste : le carré de l'aplat du sceau sur le contrat (fichier, déjà vu à l'essai 1) ; la colonne de marge reste vide hors échelle, source et rose, comme le veut la charte. |
| Ilyas | à venir |

Le modèle intermédiaire a suffi en phase B : données justes du premier coup sur les gestes et les locutions, composition à reprendre une fois sur S04 (cause : consigne de l'agent principal), réserves mises à la lettre de la spécification plutôt qu'au défaut du gabarit.

## Essais suivants proposés

- Modèle d'image rapide contre modèle Pro sur trois éléments de l'essai 1 (environ 0,12 $) : qualité côte à côte, puis choix du modèle par défaut des éléments.
- Planche préparée par le graphiste dans le canevas de design, validée par Ilyas avant le code ; animation par les skills de Remotion et le skill des scènes.
