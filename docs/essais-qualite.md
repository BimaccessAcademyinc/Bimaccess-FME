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
| Ilyas (2026-11-27) | Les cinq changements approuvés : scènes par gabarits et données, modèle intermédiaire pour les données, une scène par agent en parallèle, feuille remplie vérifiée par le gabarit, aucune réserve sous les textes de carte tant que les illustrations ne sont pas aux jetons. Portés dans `harnais/skills/scenes-gabarits/` et `CLAUDE.md`. |

Le modèle intermédiaire a suffi en phase B : données justes du premier coup sur les gestes et les locutions, composition à reprendre une fois sur S04 (cause : consigne de l'agent principal), réserves mises à la lettre de la spécification plutôt qu'au défaut du gabarit.

## Essai 3 · S02 et S04 composées sur le canevas de design, exportées en données de gabarit

Projet `modules/M01/L01/lecon-design/`, canevas https://claude.ai/artifact/XS6m3KLLs7CAJ9nLqmKyiE (consignes : `docs/essai-3-design.md`). Une seule chose change par rapport à l'essai 2 : la composition. Le graphiste (skill graphisme, meilleur modèle) compose la planche de l'état final dans la notation du canevas (`harnais/skills/scenes-gabarits/canevas/notation.md`), la regarde rendue avec les polices de la leçon avant de rendre la main, l'agent principal la publie, Ilyas la valide ou la corrige à la main sur le canevas, puis `planche_vers_donnees.mjs` la relit et écrit `Sxx.json`. Mêmes illustrations, mêmes gabarits, mêmes gestes et locutions que l'essai 2 ; aucun appel payant.

Mise en place (une fois) : planche vierge à la charte (cadre, carroyage, échelle, rose) avec zones interdites verrouillées et visibles ; notation lisible par Ilyas et par un script (un repère violet par élément, « 3.2 frappe », « 2.2 balayage bas 0,3 », « évidence 7 → 8 », et une partition par scène : étape, état, locution) ; `planche_canevas.mjs` (écrit les artboards) et `planche_vers_donnees.mjs` (rend la planche dans Chromium, mesure positions, largeurs de texte et lignes, refuse une planche incomplète). Vérifiée par un aller-retour sur les données de l'essai 2 : mêmes données au dixième de pixel, largeurs de texte mesurées au lieu d'estimées, chargées sans erreur par le gabarit.

| Mesure (Opus) | Mise en place, une fois | Composition S02 | Composition S04 | Corrections d'Ilyas | Orchestration et publication | Export et contrôles | Essai 1, graphiste |
|---|---|---|---|---|---|---|---|
| Temps d'agent | 11,6 min (lecture comprise) | 4,9 min | 4,0 min | aucune (validée telle quelle, « pour moi ça a l'air bon ») | 5,5 min | 3,3 min | 31 min pour deux scènes |
| Tokens | 0,26 M écrits, 10,3 M lus, 0,06 M en sortie | 0,20 M écrits, 3,7 M lus, 0,03 M en sortie | 0,20 M écrits, 3,1 M lus, 0,02 M en sortie | | 0,02 M écrits, 5,8 M lus, 0,005 M en sortie | 0,05 M écrits, 5,9 M lus, 0,004 M en sortie | 0,66 M écrits, 18,2 M lus, 0,18 M en sortie |
| Coût des tokens (même barème que les essais 1 et 2) | environ 5 à 5,6 $ | environ 2,3 à 2,7 $ | environ 2,0 à 2,4 $ | 0 | environ 1,9 $ | environ 2 $ | environ 11 à 13 $ |

Les deux compositions ont tourné en parallèle (règle 3) : 5,2 min de bout en bout pour les deux planches, contre 31 min au graphiste de l'essai 1, et environ 4,5 $ contre 11 à 13 $. De la première lecture des consignes au lecteur redéployé : 25 min. Les données sortent de la planche sans recopie : l'export final (planche relue sur le canevas après la validation) a rendu exactement les fichiers vus par Ilyas.

| Contrôle | Résultat |
|---|---|
| Agent principal | Export accepté sans refus, `check` code 0 (« scènes chargées : 7 »), 0 texte en dur, `build` conforme, `test:play` « tout est conforme ». Planche par phrase (`.studio/qa/essai3/`) : chaque élément sur sa phrase, une mise en évidence à la fois, aucun texte sur un trait, image finale identique à la planche du canevas. S02 : la frise traverse la face jusqu'au débord permis (x 1500), logiciels, routes et SAIF entre les jalons, libellés de jalon à 36 px sous la frise, carte de lieu en haut à droite ; reste un vide modéré en bas au centre, accepté par le contrôle. S04 : bâtiment et carte en projection européenne à gauche, feuille d'entité sur toute la hauteur à droite ; la droite des rubriques Attributs et Système de coordonnées reste vide. |
| Ilyas (2026-11-27) | Planches validées sur le canevas sans correction. Contrôle final sur le lecteur : https://fme-reader-review-development.up.railway.app/FME001-M01-L01-design/#/2 et `#/4`. |

Mieux : composition vue avant le code (le graphiste regarde l'image rendue, Ilyas aussi) ; plus de spécification écrite ni de recopie des positions ; largeurs de texte mesurées ; temps et coût de la composition divisés par six ; une correction d'Ilyas se ferait à la main sans repasser par un agent. Pareil : images, gestes, locutions, gabarits et contrôles de l'essai 2 ; la qualité de la composition reste celle du graphiste. Moins bien : une mise en place de plus (environ 12 min, 5 $, une fois) ; deux outils à tenir (notation, export) ; la planche finale montre toutes les mises en évidence à la fois, empilées sur S02.

Ce que le canevas ne sait pas faire, contourné : les locutions, les gestes et les étapes (repères écrits sur les éléments, partition à côté) ; le temps (la planche ne montre que l'état final : l'enchaînement se juge sur la planche par phrase) ; la découpe en cercle (ajoutée en CSS sur la planche) ; les bandes de la feuille (fractions de la hauteur, à calculer) ; l'ordre de pose (ordre du fichier : hachure, signes et globe restent frères de la feuille avec `data-sur`, pas ses enfants) ; les mises en évidence et le remplissage ne sont pas contrôlés par l'export (une mise en évidence de S02 dépasse x 1424 d'environ 10 px ; le vide se juge à l'œil, le gabarit le contrôle ensuite). Défaut de l'outil relevé par le graphiste et corrigé : le repère d'une arrivée était refusé.

Décision d'Ilyas (2026-11-27) : l'essai 3 n'est pas retenu. « Au final l'essai 3 n'apporte pas grand-chose » : son apport tenait surtout à la porte de composition, retirée le même jour ; la comparaison est biaisée (S02 et S04 étaient déjà composées par l'essai 2, que le graphiste avait sous les yeux) ; il ajoute deux outils à tenir. Le remplissage juste se garantit par le skill en amont et par une vérification bloquante à la fin, sans attendre que quelqu'un dise après coup « regarde, ce n'est pas bon, complète ». Suite : règles de composition dans les skills `graphisme` et `scenes-gabarits`, contrôles du gabarit resserrés (plus grand vide, mises en évidence et textes dans la face, aucun texte sur un trait, aucun chevauchement), portés dans le harnais Studio du cours. Le temps de composition se mesure sur les scènes neuves de L01.

## Essais suivants proposés

- Modèle d'image rapide contre modèle Pro sur trois éléments de l'essai 1 (environ 0,12 $) : qualité côte à côte, puis choix du modèle par défaut des éléments.
- Composition mesurée sur les scènes neuves de L01 (S01, S03, S05 à S07) avec les règles du skill et les contrôles bloquants ; si la spécification écrite du graphiste reste le goulot (environ 15 min par scène à l'essai 1), essayer sa composition écrite directement dans le fichier de données.
