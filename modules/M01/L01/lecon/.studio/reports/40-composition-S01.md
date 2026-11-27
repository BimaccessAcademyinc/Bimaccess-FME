# Compte rendu · composition de S01 (rôle Graphisme)

Spécification : `content/design/specs/S01.md`.

## Gabarits

- Composition : « Territoire et parties (S01) » de `harnais/skills/planche-image/gabarits.md`, sans rivière ni relief, une silhouette par carte, fenêtres ajoutées sous les entreprises (storyboard).
- Animation : gabarit manquant **`Territoire`** (`"gabarit": "territoire"`) : racine commune, plus `territoire` { `illustration`, `interieur` } posé à l'image 0 ; contrôles : rien à cheval sur la limite, la boîte du territoire ne compte ni comme pleine au remplissage ni au chevauchement de ce qu'elle contient. Forme qui reviendra (S06, leçons suivantes).

## Illustrations

| Nom | Origine | Format | Place |
|---|---|---|---|
| `s02-ill-fondateurs` | reprise (S02, `content/design/assets/`) | 1051 × 665 | x 531, y 236, 346 px |
| `s01-ill-territoire` | neuve | 16:9 | x 104, y 183, 1200 px |
| `s01-ill-role` | neuve, posée deux fois (entreprises, gouvernement) | 4:5 | x 190 et 893, y 236, 325 px |
| `s01-ill-logiciels` | neuve (les trois dessins de `s02-ill-logiciels`, en rangée) | 21:9 | x 190, y 658, 325 px |
| `s01-ill-manque` | neuve | 1:1 | x 668, y 512, 72 px |

Devis (script lancé sans `--approuve`, rien appelé) : « Coût estimé : 0.27 $ (4 dessin(s) gemini-3.1-flash-image 1K sur 4 commande(s), le reste en cache) ». À annoncer à Ilyas par l'agent principal.

## Contrôles faits sur le tableau de boîtes

Plus grand vide de la face : 378 × 152 px (sous 264 × 170) ; aucun chevauchement hors contenance dans le territoire ; aucun texte sur un trait ; une seule mise en évidence à la fois ; marge : échelle, source, rose seulement.

## Doutes

1. Hauteurs des illustrations neuves sur format nominal : à recaler sur les `viewBox` réels, puis textes des bandeaux, liaison et rectangles de mise en évidence.
2. La limite du territoire peut entrer dans l'intérieur plus que demandé : regarder l'aperçu avant les données.
3. Manque : possible sans dépense, à partir de `design/symboles/manque.svg` (couleurs exactes), au lieu de la commande.
4. Noms de carte en 24 px et 0,16 em (comme S02), pas en en-tête de cartouche : « Colombie-Britannique » ne tiendrait pas dans une carte de 325 px.
5. Étape 3 au milieu d'une phrase (« partager leurs données géographiques »), comme le demande la mise en scène.
