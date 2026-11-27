# Compte rendu · composition de S03 (graphiste)

Spécification : `content/design/specs/S03.md`.

## Gabarits retenus

- Composition : « Légende de carte (S03) » (`harnais/skills/planche-image/gabarits.md`) : cartouche « Légende » à gauche (x 104 à 844, y 196 à 788), trois entrées et deux lignes en retrait ; à droite, en V, la feuille SAIF et la feuille sans nom en haut, le logo en bas entre elles, route de lecture vers le logo, route d'écriture vers l'autre feuille.
- Animation : **gabarit manquant `Legende`** (`"gabarit": "legende"`), décrit en fin de spécification : pièce `legende` (cartouche, entête, entrées avec symbole, texte, repère, lignes `sous`) et pièce `reperes` (lignes de repère : point et trait, geste `repere`), avec les contrôles au chargement. Routes et pointes : tracés à couches comme S02.

## Illustrations

Reprises :

| Nom | Source | Usage |
|---|---|---|
| `s02-ill-saif` | S02 (`content/design/assets/`) | la feuille SAIF (200 px) et le symbole « format » de la légende (64 px) |
| `fme-logo` | `design/marques/`, déjà dans `assets/` | le logiciel, aplat `fond` |
| `echelle-graphique`, `rose-des-vents` | habillage de la charte | marge |

Neuves (commandes écrites, rien dessiné) :

| Nom | Format |
|---|---|
| `s03-ill-legende` | 5:4 |
| `s03-ill-cachet` | 1:1 |
| `s03-ill-fenetre` | 4:3 |
| `s03-ill-feuille-autre` | 3:4 |

Devis affiché par `illustrations.py` sans `--approuve` : **0,27 $, 4 dessins** (modèle d'image par défaut, 1K), rien en cache. Aucune dépense faite.

Non retenues : `s02-ill-sceau` pour la norme (il dit le contrat remporté en S02 : le même sceau mêlerait les deux) ; `s02-ill-logiciels` (trois fenêtres en un fichier, la légende n'en veut qu'une). Sans coût, si Ilyas le préfère : copier `design/symboles/logiciel.svg` et `feuille-vegetation.svg` dans `assets/` au lieu de deux des dessins.

## Contrôles faits sur le tableau des boîtes

Feuille remplie (plus grand vide 580 × 115 px, sous le logo), rien dans la marge hors échelle, source et rose, rien sous y 860 ni dans la zone d'action, aucun texte sur un trait, une seule mise en évidence à la fois, aucune réserve sous un texte posé dans une carte, croix du carroyage couvertes (aplat `fond` sous le logo).

## Doutes

1. Les positions du cartouche et des trois symboles neufs se recalent sur les aperçus après le dessin (bandeau, bord intérieur droit).
2. Le storyboard dit la route d'entrée « rouge » puis « route de lecture » : spécifiée en bleu (lecture) selon la charte ; correction à proposer au scénariste.
3. Ligne de repère et extinction de la mise en évidence de « Norme » non écrites dans la mise en scène : choisies (spécification, Points ouverts 3).
4. Les lignes de repère de « Format » et « Norme » partent du bord du bandeau SAIF, pas du mot lui-même.
5. Les paliers des lignes de repère croisent le cadre du cartouche : à vérifier contre le contrôle de chevauchement de `npm run check` quand le gabarit sera écrit.
6. Locutions choisies sans le mot « SAIF » (dit « safe » par la voix) ; à vérifier au chargement.
