# Rapport 201 · données de scène · S03

Brief : `.studio/briefs/201-donnees-S03.md`. Gabarit `FicheRubriques`, composition « Légende » du graphiste (`content/design/spec.md`, `## S03` ; rapport `103-graphiste-S03.md`). Coût : 0 $ (aucun appel payant, aucun dessin neuf).

## Fichiers écrits

- `content/design/scenes/S03.json` : 7 illustrations, 10 tracés, 7 textes, titre (rang 0), source (rang 8), habillage (échelle, rose), feuille à bandes `legende` (`bandes` 286,7 ; 502,8 ; 632,6), ordre de pose de la spécification, 11 étapes (`S03-1` à `S03-10`, puis `S03-FIN`), 6 mises en évidence. Locutions, gestes et durées recopiés de la table « Apparitions » ; places et tailles de la spécification, sauf l'écart listé plus bas.
- `src/lesson/scenes/s03.tsx` : trois lignes, `defineScene(FicheRubriques.scene(data))`.
- `src/lesson/lesson.ts` : `sceneEnAttente("S03")` remplacé par `s03`, et `import { s03 } from "./scenes/s03"` ajouté. **Un troisième changement, forcé** : `sceneEnAttente` retiré de l'import du moteur (`import { defineLesson } from "../engine"`). Comme S03 était la dernière scène en attente, l'import restait inutilisé et `tsc` refusait (`noUnusedLocals`, sortie ci-dessous). Rien d'autre n'a changé dans ce fichier (le commentaire d'en-tête, qui nomme `sceneEnAttente`, est resté tel quel).
- `content/sources.json` a déjà une adresse pour S03 (`docs.safe.com`, FME_Components) : rien à signaler.
- Temporaires : `.studio/tmp/201-*` (sorties de check et de build, recadrages des captures).

## Contrôles

| Commande | Code | Extrait |
|---|---|---|
| `sous-verrou -- npm run check:scenes` (premier essai) | 0 | `scènes chargées : 7, locutions, ordre, textes et illustrations nommées vérifiés` |
| `sous-verrou -- npm run check` (premier essai) | 2 | `src/lesson/lesson.ts(6,24): error TS6133: 'sceneEnAttente' is declared but its value is never read.` |
| `sous-verrou -- npm run check` (après correction de l'import, puis après l'écart sur `autre`) | 0 | `[sync] scènes chargées : 7, …` puis `tsc` sans erreur |
| `check-literals.mjs src/lesson` | 0 | `[literals] 11 fichier(s) lu(s), 0 texte(s) en dur` |
| `sous-verrou -- npm run build` | 0 | `dist/index.html 2,485.50 kB`, `✓ built` |
| `planche.mjs --scenes S03 --out .studio/qa/sens` | 0 | `S03 : 9 captures`, `0 erreur(s) de page ou de console` |
| `shots.mjs --scene 3 --times end --out .studio/qa/donnees/S03 --width 2400 --height 1350` | 0 | `"board":"S03-FIN"`, 0 erreur |

Aucune `GabaritError` : la composition finale passe les contrôles de `docs/gabarits.md` § 6 du premier coup.

## Planche par phrase (`.studio/qa/sens/planche-S03.png`)

1. « SAIF et FME ne désignent pas… » : légende vide (bandeau `LÉGENDE`, trois symboles), feuille SAIF et son nom, source, échelle, rose ; titre tapé. Conforme à S03-1 et S03-2.
2. « SAIF est un format… » : point, ligne de repère et `Format : SAIF`, mise en évidence sur la ligne. Conforme à S03-3.
3. « C'est aussi une norme… » : `Norme : SAIF` et son repère, la mise en évidence passe à cette ligne. Conforme à S03-4.
4. « FME n'est ni un format ni une norme. » : logo sous la feuille SAIF, aucune mise en évidence. Conforme à S03-5.
5. « C'est un logiciel… » : `Logiciel : FME` et son repère depuis le logo, mise en évidence. Conforme à S03-6.
6. « Il lit des données dans un format et les écrit dans un autre. » : à mi-phrase (25,02 s), seule la route de lecture est là. La feuille sans nom et la route d'écriture arrivent à 25,2 s, sur « les écrit dans un autre », au milieu de la phrase. C'est ce que demandent la spécification et le storyboard (point 2 ci-dessous).
7. « L'éditeur le présente… » : la mise en évidence passe au logo. Conforme à S03-9.
8. « Elle comprend FME Form… » : `FME Form : construire les traitements` tapé, mise en évidence. Conforme à S03-10.
9. État final : conforme à S03-FIN.

## Image finale (`.studio/qa/donnees/S03/s03-end.png`) : règles R1 à R8

| # | Règle | Vu sur l'image finale |
|---|---|---|
| R1 | gabarit de composition | conforme : « Légende », cartouche à gauche (x 104 à 772, toute la hauteur), à droite la chose qu'elle explique (feuille SAIF, logo, feuille sans nom). |
| R2 | feuille remplie | conforme : de x 104 à 1424, de y 186 à 854 ; le contrôle bloquant passe. Le plus grand vide est en haut à droite, au-dessus de la feuille sans nom (environ 126 px de haut, accepté). |
| R3 | échelle plutôt que vide | conforme : légende à 668 px, feuille SAIF à 300 px, logo à 360 px ; aucun élément ajouté. À juger sur le lecteur : la rubrique Format (y 287 à 500) ne porte qu'une ligne et paraît aérée (le contrôle compte la légende comme pleine). |
| R4 | rien sur un trait | conforme : chaque palier finit 24 px à droite de son texte, et aucun repère ni aucune route ne passe sur un texte. Un défaut voisin, hors texte : le bord droit de la mise en évidence de `FME Flow` (x 742) colle au cadre intérieur de la légende (x 743,4), si bien que le tireté et le filet se confondent (point 1 ci-dessous). |
| R5 | évidences et textes dans la face | conforme : textes de x 224 à 1039 ; cadres de x 214 à 1270 et de y 360 à 853. |
| R6 | marge réservée | conforme : la marge ne porte que l'échelle (y 84), la mention de source (calée à y 820) et la rose ; aucun débord. |
| R7 | pas de chevauchement | conforme : symboles et textes contenus dans la légende, `SAIF` dans la feuille, illustrations disjointes ; les routes touchent la feuille SAIF, le logo et la feuille sans nom seulement à leurs bouts. |
| R8 | le sens | conforme : chaque élément répond à un mot de la voix (« un format », « une norme », « un logiciel », « Il lit », « les écrit dans un autre », « FME Form », « FME Flow ») ; le logo paraît une seule fois, couleurs d'origine. Le signe de format réduit à 50 px se lit, mais plus pâle que le cachet et la fenêtre. |

## Écarts à la spécification (le graphiste revoit l'image finale)

| Élément | Spécification | Données | Pourquoi |
|---|---|---|---|
| `illustrations.autre` (`s03-feuille-vegetation`) | x 1160, sans aplat | **x 1164**, `"aplat": "fond"` | La croix de carroyage (1414, 464) se voyait dans l'intervalle transparent entre les deux cadres de la feuille sans nom, et son bras sortait de 2 px à droite du cadre extérieur (x 1420 contre 1422). La spécification dit cette croix couverte par la feuille. Avec l'aplat `fond`, elle l'est. Le décalage de 4 px couvre aussi le bout du bras, et la feuille finit à x 1424, bord de la face. Vérifié à la capture : la croix ne se voit plus. |

Conséquences : la route d'écriture (x 1340) et sa pointe sont inchangées ; elles touchent toujours le bas de la feuille, désormais 40 px à droite de son milieu au lieu de 50. Le couloir entre la feuille SAIF et la feuille sans nom passe de 20 à 24 px. Aucune autre place, taille, locution, aucun autre geste ni aucune autre illustration n'a changé.

## Au graphiste

1. Le cadre de mise en évidence de `FME Flow : automatiser les traitements` (238 à 742) touche le cadre intérieur de la légende (743,4) : sur le lecteur, son côté droit se confond avec le filet. Trois corrections possibles, à choisir par le graphiste : retrait des rangs 6 et 7 ramené à 20 px (x 244, cadre jusqu'à 738) ; rubrique en 25 px ; ou cadre resserré à 6 px du texte à droite. Je ne l'ai pas changé : c'est un choix de typographie et de composition.
2. L'étape 8 (« les écrit dans un autre ») est calée au milieu d'une phrase, comme le veulent le storyboard et la spécification. À mi-phrase, la planche ne montre que la route de lecture. Cela s'écarte de la règle « l'image devance la voix, prise au début de la phrase », sauf si ce découpage est voulu. À confirmer.
3. Aérer ou non la rubrique Format (R3) : elle ne porte qu'une ligne. Rien à faire si la place est voulue.

## Au scénariste

Rien de nouveau. Les points du rapport 103 restent ouverts : « route rouge » dans `## Mise en scène`, et quand se trace le repère de « Norme ».

## Résumé

- Fichiers écrits : `content/design/scenes/S03.json`, `src/lesson/scenes/s03.tsx`, `src/lesson/lesson.ts` (import de `s03`, `s03` dans la liste, `sceneEnAttente` retiré de l'import du moteur, retrait forcé par `tsc`).
- Sortie de check : `npm run check` sous verrou en 0, « scènes chargées : 7 », `tsc` sans erreur ; check-literals en 0 ; build en 0 ; planche en 0, 9 captures, 0 erreur.
- Écart à la spécification : `autre` à x 1164 (au lieu de 1160) avec aplat `fond`, pour couvrir la croix de carroyage (1414, 464).
