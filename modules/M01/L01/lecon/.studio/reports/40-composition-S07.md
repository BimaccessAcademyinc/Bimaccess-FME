# Compte rendu · composition de S07 (Graphisme)

Spécification : `content/design/specs/S07.md`. Commande neuve : `content/design/illustrations/s07-ill-entite.json`. Rien d'autre n'a été touché ; aucune dépense, aucun commit.

## Gabarits retenus

- Composition : « Pont : deux manques (S07) » (`harnais/skills/planche-image/gabarits.md`), agrandi pour remplir la face : feuille d'entité x 104 à 704, traits x 704 à 924, manques de 250 px x 924 à 1174, noms x 1204 à 1406 ; rangées y 226 à 476 et y 600 à 850.
- Animation : gabarit manquant **`Pont`** (une pièce reliée à des manques), champs décrits dans la spécification : la racine commune aux deux gabarits plus une pièce `manques` (`x`, `y`, `cote`, `trait` facultatif), dessinée par le moteur aux jetons exacts (fond `manqueFond`, contour `manque` 3 px, tireté 8 5), gestes `poser` ou `trace`, contrôles (trait arrivé sur le bord, aucun texte dans un manque). Variante plus petite : un champ `tirets` sur tout tracé. Données de S07 données en forme dans la spécification.

## Illustrations

| Illustration | Origine | Format | Place |
|---|---|---|---|
| `s07-ill-entite` | neuve : feuille d'entité à double cadre, bandeau vide, contour irrégulier à sept côtés, sans texte | 1:1 | x 104, y 220, 600 px |
| manques (2), traits (2) | au code (tracés et pièce `manques`), pas d'illustration | | |
| `echelle-graphique`, `rose-des-vents` | reprises, `content/design/assets/` (habillage de la charte) | | marge |

Reprises examinées et écartées : `feuille-saif` et `fondateurs-murray-lutz` (bibliothèque), `s04-ill-feuille` (trois rubriques), `s04-ill-contour` (le bâtiment de S04, exclu par le storyboard), `s02-ill-contrat` (se lirait comme le contrat). L'ancien `s07-entite.svg` n'est plus employé.

Devis du script sans accord (`illustrations.py`, aucun appel) : « Coût estimé : 0.07 $ (1 dessin(s) gemini-3.1-flash-image 1K sur 1 commande(s)) ». À annoncer à Ilyas par l'agent principal.

## Contrôle de remplissage (sur le tableau des boîtes)

Plus grands vides : 220 × 370 entre les traits, 250 × 328 dans la colonne des noms, 720 × 124 entre les deux manques ; aucun ne dépasse à la fois 264 px de large et 170 px de haut. Aucun texte sur un trait, aucun chevauchement, aucune mise en évidence, rien dans la marge sauf l'échelle et la rose, rien sous y 860 ni dans la zone d'action. Amorces du carroyage couvertes entières ou laissées libres, jamais coupées.

## Doutes

1. « Petite feuille » du storyboard contre la règle de remplissage : feuille de 600 px (au scénariste ou à Ilyas).
2. Noms en 26 px (nom de lieu petit) pour garder la colonne des noms sous 264 px ; 28 px possible.
3. Bord droit de la feuille et bandeau à remesurer sur l'aperçu une fois l'illustration dessinée, avant `S07.json`.
4. Contour d'entité sans valeur de fait, à confirmer par Ilyas.
5. Gestes au milieu de l'unique phrase, comme le demande la mise en scène.
