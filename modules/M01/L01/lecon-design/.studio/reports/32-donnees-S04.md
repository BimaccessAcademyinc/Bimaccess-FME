## Rapport · code · brief 32 (essai 2, phase B : S04 comme données)

Recopié par l'agent principal depuis le dernier message de l'agent, qui ne l'avait pas écrit dans ce fichier.

### Fichiers écrits
- `content/design/scenes/S04.json` : toute la scène, gabarit `fiche-rubriques` (7 textes d'Écran, 8 illustrations, 2 tracés, 9 étapes, 5 mises en évidence).
- `src/lesson/scenes/s04.tsx` : trois lignes, `defineScene(FicheRubriques.scene(data))`, export `s04`.

### Contrôles
- `npm run check` → code 0, « scènes chargées : 7 », contrôle de remplissage de la face passé.
- `npm run build` → code 0 ; planche `.studio/qa/b-s04/planche-S04.png` (9 captures, 0 erreur de console) et image finale regardées : première image sobre (carte et contour seuls), une seule mise en évidence à la fois, aucun texte sur un trait, aucun chevauchement.

### Deux passes
1. Sur la consigne erronée de l'agent principal (zone utile jusqu'à x 1816) : bâtiment passé à droite de la fiche, dans la marge, trait coudé. Projection européenne perdue : abandonné.
2. Reprise dans la face de la charte (x 104 à 1424) : projection européenne rétablie.

### Positions changées (passe 2)
- Carte : x 104, y 540, 636 de large (spec : y 440, 650). Contour centré dans l'îlot : 340,4 ; 639,4 ; 163,2.
- Bâtiment : x 177, y 200, 490 de large (spec : 264, 192, 330), au-dessus de la carte, dans l'axe du contour (centre x 422).
- Fiche : x 764, y 195, 660 de large (échelle 1,0201), bord droit à x 1424 ; tout son contenu suit la même transformation (bandes 299,9 ; 505,8 ; 628,3, textes, filet, signes, hachures, globe, emprise, arrivée du contour 817 ; 350,1, rectangles), tailles de police inchangées.
- Trait « représente » : droit et horizontal, de (632,1 ; 257,2) à (766,6 ; 257,2).
- Inchangés : habillage, source, locutions, gestes, durées, états.

### Écarts à la spécification
- Positions et tailles seulement. Les vides restants frôlent le seuil (environ 167 px entre le titre et le bâtiment).
- Réserves des textes de la fiche : l'agent avait mis `papier` ; l'agent principal les a ramenées à `aucune` (défaut du gabarit, recommandation du rapport 21, pavés clairs visibles sinon).

### Ce que le gabarit ou sa documentation devraient mieux faire
- Un champ `echelle` pour une fiche entière (bandes, textes, tracés, mises en évidence) : le recalcul affine s'est fait par script.
- Dire que les polices ne suivent pas l'échelle des illustrations, et que `content/design/scenes/` n'existe pas au départ.

### Blocage
Aucun.
