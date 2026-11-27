# Compte rendu · composition de S06 (graphiste)

Spécification : `content/design/specs/S06.md`.

## Gabarits retenus

- Composition : « Étoile autour d'un centre (S06) » de `harnais/skills/planche-image/gabarits.md`, adapté : huit feuilles (charte § 5), carte des fondateurs dans le coin haut gauche, feuilles lues à gauche, écrites à droite et en bas.
- Animation : gabarit manquant, `Etoile` (`"gabarit": "etoile"`). Champs décrits dans la spécification (§ « Gabarit `Etoile` ») : pièce `feuilles` (cadre au tireté posé à l'image 0, puis geste `relier` qui trace le trait plein, contenu en illustration), pièce `centre` (point géodésique dessiné par le moteur, réserve `fond` qui couvre le manque), et deux champs de tracé, `tirets` (manque) et `bouts: "ronds"` (routes). Forme qui reviendra (L02 à L05 : formats autour du moteur ; manques de S01 et S07).

## Illustrations

Reprise :

| Nom | Source |
|---|---|
| `s02-ill-fondateurs` | `content/design/assets/` (commandée pour S02, même carte que `design/bibliotheque/fondateurs-murray-lutz`) |
| `echelle-graphique`, `rose-des-vents` | habillage de la charte, déjà dans `content/design/assets/` |

Neuves (commandes dans `content/design/illustrations/`, format 3:2, contenus de feuille bord à bord, sans cadre : le cadre est au code) :

| Nom | Contenu |
|---|---|
| `s06-ill-courbes` | courbes de niveau, une maîtresse |
| `s06-ill-hydrographie` | lac et rivière |
| `s06-ill-cadastre` | parcelles au trait |
| `s06-ill-bati` | emprises de bâtiments pleines |
| `s06-ill-routes` | réseau de routes rouges à bords encre |
| `s06-ill-vegetation` | taches de forêt et semis d'arbres |
| `s06-ill-points` | semis de points |
| `s06-ill-image` | mosaïque de pixels en deux verts |

Devis (`illustrations.py` sans `--approuve`, rien appelé) : « Coût estimé : 0.54 $ (8 dessin(s) gemini-3.1-flash-image 1K sur 8 commande(s)) ». À annoncer à Ilyas par l'agent principal.

Non repris : `s06-couronne.svg`, `s06-fondateurs.svg`, `s06-bouts.svg` (composition de l'ancienne chaîne, non retenue) ; `feuille-saif` de la bibliothèque (feuille cadrée, contenu mêlé).

## Contrôles faits sur le tableau des boîtes

- Remplissage : aucun vide de 200 × 150 px ou plus dans la face x 104 à 1424, y 180 à 860 (grille de 10 px).
- Aucun chevauchement entre feuilles, carte, textes et symbole ; rien sous y 860 ; marge : échelle, rose, source seulement.
- Aucun texte sur un trait : `Moteur` dans l'interruption des courbes (8 px de marge), à 8,5 px au moins des routes ; `Lire` et `Écrire` à 12,5 et 13,5 px de leur route.
- Amorces du carroyage : chaque croix entièrement couverte ou à 4 px au moins des feuilles et des textes.
- Une seule mise en évidence (cercle sur le moteur, éteinte avant les routes).

## Doutes

1. Trois feuilles lues, cinq écrites (lecture du storyboard « vers toutes les autres feuilles ») : risque de faire croire qu'un format ne se lit que d'un côté ; au scénariste.
2. `Lire` et `Écrire` placés et animés sans indication de la mise en scène : à confirmer.
3. Courbes tracées ensemble (0,8 s) au lieu de l'une après l'autre (charte § 7), faute de temps entre deux locutions.
4. Largeurs de `Lire` et `Écrire` estimées ; contenus commandés bord à bord, à vérifier sur les aperçus (marge de fond possible) ; positions des contenus à recaler sur le `viewBox` réel.
5. Reste de la liaison visible entre la route de lecture de la feuille image et le triangle : voulu, à confirmer à la planche.
