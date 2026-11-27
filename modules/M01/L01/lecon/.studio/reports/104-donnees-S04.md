# Rapport 104 · données de S04

Fichier changé : `content/design/scenes/S04.json` de la copie `/tmp/claude-0/-home-user-Bimaccess-FME/68d7a78b-be4f-5c51-92be-927951b4e583/scratchpad/copie-S04` (à recopier dans le projet).

## Changements (champ, avant, après)
Ajout de `largeurMesuree` (largeur sur une ligne, prise de la colonne « Place » de spec.md § S04) :
- textes.entite : absent, 365
- textes.geometrie : absent, 472
- textes.attributs : absent, 126
- textes.usage : absent, 211
- textes.systeme : absent, 313

Aucune place, taille, illustration, texte, geste ni locution changés. `s04.tsx` inchangé.

## Contrôles
- `npm run check:scenes` (copie) : code 0, « scènes chargées : 7 ». Aucun autre défaut (remplissage, chevauchement) n'est apparu.
- `build` sous verrou : réussi. `shots.mjs --scene 04 --times end` : 0 erreur, board S04-FIN. Capture : `.studio/qa/donnees/S04/s04-end.png` de la copie.
- `check` (tsc) et `check-literals` non lancés (non demandés).

## Image finale
R1 conforme (gabarit fiche à rubriques). R2 conforme : bâtiment, carte et feuille couvrent la face. R3 conforme. R4 conforme : aucun texte sur un trait. R5 conforme : textes et cadre de mise en évidence dans la face. R6 conforme : la marge ne porte que l'échelle, la source et la rose. R7 conforme : aucun chevauchement visible. R8 conforme : chaque élément se nomme et suit sa locution.

## Remonte au graphiste
Rien de bloquant. Seule remarque : la rubrique « Système de coordonnées » montre le globe à gauche et un grand espace à droite dans sa bande (vide interne à la feuille, accepté par le contrôle, composition de spec.md).
