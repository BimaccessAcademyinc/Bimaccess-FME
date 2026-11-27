# Rapport 31 : S02 comme données (essai 2, phase B)

## Fichiers
- `content/design/scenes/S02.json` (toute la scène, gabarit `Frise`)
- `src/lesson/scenes/s02.tsx` (appel du gabarit, export `s02`)

## Contrôles
- `npm run check` : code 0, « scènes chargées : 7 », zone x 104 à 1424, y 180 à 860 (le contrôle de remplissage passe).
- `npm run build` : réussi ; `check-literals` : 0 texte en dur.
- Planche `.studio/qa/b-s02` regardée : rien sur un trait, aucun chevauchement, première image sobre (décor seul), une seule mise en évidence à la fois, feuille remplie à la dernière image.
- `test:play` non lancé (consigne).

## Positions changées (zone utile, par rapport à la spécification)
- Colonne gauche (fondateurs, contrat, textes de cartes) et frise (436 à 1406, pointe 1424) : inchangées. Sceau agrandi : 160 de large à (262, 670).
- Fenêtres de logiciel : 124 de large à (476, 218,5) au lieu de 110 à (482, 274,5) ; routes (axes à y 267, 379,7, 491,3) et pointes (±12) refaites sur elles, de x 599,4 à x 812.
- SAIF : 236 de large à (812, 184) au lieu de 204 à (800, 247) ; nom SAIF à 36 px centré dans son bandeau.
- Traduction : x centré 706, y 210 (26 px, inchangé) ; mise en évidence 603, 200, 198 x 51.
- Carte de lieu : 342 de large à (1082, 186) au lieu de 300 à (1124, 196) ; « Siège : Surrey » 34 px à (1202, 274).
- Jalon 1996 à x 866 au lieu de 1024 ; cases 462 à 866 (claire 596,7 à 731,3) ; libellés 1993 et 1996 à 36 px (1993 sur deux lignes, largeur 380, y 616 ; 1996 à x 882, y 612).
- Logo : 280 de large à (882, 670) au lieu de 190 à (1040, 704) ; nom d'origine 30 px à (882, 820) ; mises en évidence recalées sur ces boîtes (libellé 872, 602 ; logo 872, 660 ; nom 872, 810).
- Sur la planche : la feuille est remplie sur toute la largeur de la face ; le vide sous la frise a disparu (libellé 1993 agrandi, bloc 1996 déplacé vers la gauche et agrandi) ; la deuxième moitié porte SAIF, le lieu et le bloc 1996.

## Écarts à la spécification
- Positions et tailles seulement (consigne). Textes de carte avec réserve `papier` (spécification à la lettre). Échelle à (1480, 84).
- Mises en évidence : rectangles refaits à 10 px des nouvelles boîtes ; largeurs des libellés estimées puis vérifiées à la planche (1996 : 530, nom : 411).

## Manques du gabarit ou de sa documentation
- Rien de bloquant : aucun besoin non couvert. Le gabarit n'offre pas de mesure de texte : les largeurs des mises en évidence se règlent à l'œil sur la planche ; un champ « evidence sur texte » qui prendrait la boîte du texte (avec pad 10) éviterait ce réglage.
- La zone utile a changé deux fois en cours de tâche (1424, puis 1816, puis 1424) : ce qui m'a coûté le plus. Un générateur Python en scratchpad calcule les positions à partir de quelques paramètres, ce qui a rendu les reprises rapides.

## Note de l'agent principal

Réserves des textes de carte ramenées de `papier` à `aucune` (défaut du gabarit, recommandation du rapport 21) : les pavés clairs autour de « Appel d'offres remporté » et « Siège : Surrey » étaient revenus.
