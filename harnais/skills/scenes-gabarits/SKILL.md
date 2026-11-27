---
name: scenes-gabarits
description: Construire une scène de forme connue (frise, fiche à rubriques, puis légende, chaîne, étoile, territoire) par un gabarit d'animation Remotion du moteur et un fichier de données, au lieu de code sur mesure. Méthode retenue par Ilyas le 2026-11-27 après les essais 1 et 2 du pilote FME001.
---

# Scènes par gabarits

Une scène de forme connue ne se code plus à la main : un gabarit du moteur (écrit une fois, avec Remotion et la grammaire d'animation) l'anime à partir d'un fichier de données `content/design/scenes/Sxx.json` ; la scène tient en trois lignes. Format, champs et exemples : `docs/gabarits.md` du projet (référence : `modules/M01/L01/lecon-gabarits/docs/gabarits.md`) ; gabarits : `src/engine/gabarits/`.

Mesures (essai 2, `docs/essais-qualite.md`) : environ 7 min et 1,2 $ de tokens par scène pour les données, contre 13,5 min et 5 $ de code sur mesure ; deux scènes en 8 min en parallèle ; écrire un gabarit : environ 15 min et 6 $, une fois pour tout le programme.

## Les cinq règles approuvées par Ilyas (2026-11-27)

1. **Gabarit d'abord.** Une scène qui suit une forme connue (`harnais/skills/planche-image/gabarits.md`) se fait par gabarit et données. Un gabarit manquant s'écrit une fois, par le meilleur modèle, dans le moteur, avec sa documentation et ses contrôles au chargement ; une forme vraiment unique reste en code sur mesure, et se signale.
2. **Modèle intermédiaire pour les données** d'une scène ; le meilleur modèle pour écrire un gabarit et pour la composition (graphiste).
3. **Une scène par agent, en parallèle**, chacun ne touchant que ses fichiers (`content/design/scenes/Sxx.json`, `src/lesson/scenes/sNN.tsx`) ; contrôles sous verrou (`flock`) ; `test:play` une fois à la fin.
4. **La feuille remplie** : la composition occupe toute la face de carte (x 104 à 1424, entre le titre et les sous-titres, hors zone d'action) ; le gabarit le vérifie au chargement. La marge de la charte ne garde que l'échelle, la source et la rose.
5. **Aucune réserve sous un texte posé dans une carte ou une feuille** tant que les illustrations ne sont pas ramenées aux couleurs exactes des jetons de la charte (sinon des pavés clairs paraissent) ; réserve `fond` seulement pour un texte posé sur la face.

## Déroulé pour une scène

1. Le graphiste compose (skill graphisme) et donne positions, illustrations, textes par indice d'Écran, locutions, gestes et mises en évidence (spécification, ou directement les données quand le gabarit existe).
2. Un agent, sur le modèle intermédiaire, écrit `Sxx.json` et la scène d'une instruction ; `npm run check:scenes` sous verrou (une donnée fausse arrête la construction avec une `GabaritError` qui dit le fichier, le champ et quoi faire).
3. Planche par phrase de la scène, comparée à la spécification ; corrections dans les données seulement.
4. Aucune porte d'Ilyas sur la composition (décision du 2026-11-27) : la scène ne se rend pas tant que `npm run check` refuse (remplissage, mises en évidence et textes dans la face, rien sur un trait, aucun chevauchement) ; Ilyas juge sur le lecteur. Composition sur le canevas (essai 3) non retenue.
5. Après toutes les scènes : `npm run build`, `test:play`, contrôle de l'agent principal, push, contrôle final d'Ilyas.
