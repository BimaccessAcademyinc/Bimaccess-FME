---
name: themes-planches
description: "Choisir le thème graphique des planches d'un cours ou d'un module qui n'en a pas encore : quatre identités nées du sujet, chacune jouée sur la même scène, choisies une fois par l'expert, puis la charte du cours tirée du thème choisi."
when_to_use: "Après le storyboard de la première leçon d'un cours ou d'un module, et seulement si aucun thème n'est déjà en place pour cette leçon."
---

# Thèmes des planches

## 0. Faut-il cette étape ?

**Seulement si aucun thème n'est déjà en place pour la leçon.** Avant tout, chercher une charte qui couvre la leçon :

| Cas | Ce qui se fait |
|---|---|
| Le cours ou le module a déjà sa charte (ex. `design/CHARTE-FME001.md` pour FME001, `design-system/DESIGN.md` pour CER001) | **pas d'étape des thèmes** : la leçon suit la charte en place, le graphiste la lit et dessine |
| Le cours est nouveau, ou l'expert demande un thème propre à ce module | l'étape se fait, une fois, pour tout le cours ou le module |
| Une leçon d'un cours qui a sa charte semble demander autre chose | ne pas relancer l'étape : signaler à l'expert, qui décide |

## 1. Ce que l'étape ne fait pas

- **N'imposer la charte d'aucun autre cours.** Une charte appartient à un cours : la charte CAD 2D de BIMaccess a été construite pour la formation buildingSMART. Un nouveau cours ne l'hérite pas (FME001, 2026-11-26 : une première série de quatre thèmes, tous restés dans la charte CAD parce que le brief l'imposait, a été écartée).
- N'imposer aucun socle commun aux quatre thèmes : ce que les quatre partagent, l'expert ne peut plus l'écarter.

## 2. Déroulé

1. **Scène d'essai** : celle qui montre le plus de ce qui distingue les thèmes (l'objet étudié, ses parties, ses relations), pas seulement la plus difficile à animer. FME001 : la S05 « Un moteur au centre » (entité, formats, moteur), et non l'exercice S03, qui ne montrait ni format ni moteur.
2. **Quatre identités**, de la plus sage à la plus audacieuse, chacune née du sujet : les conventions de dessin du métier enseigné (FME001 : carte topographique, diagramme de flux, plan de réseau, imagerie satellite), les mots de la leçon, la matière du pack. Pour chacune : d'où elle vient, comment elle montre l'objet étudié, une personne, un document, une date.
3. **Une planche par thème**, sur le canevas de l'outil de design (un artboard de 1920 × 1080 par thème), l'état final de la scène d'essai, textes d'écran du storyboard mot pour mot. Les zones du lecteur restent libres (sous-titres, zone d'action).
4. **L'expert choisit**, et peut demander d'enrichir le thème choisi (FME001 : « ajoutez des références à la carte », fond gardé).
5. **La charte du cours** se tire du thème choisi : jetons, typographie, bibliothèque de symboles, coque du lecteur, gestes d'animation, avec un artboard « Composants » sur le même canevas. Elle vit dans le dépôt du cours (`design/`) et sert à toutes ses leçons.
6. **La signature du lecteur** : si la coque du lecteur ne sait pas encore dessiner ce thème, le rôle code l'ajoute comme une signature de plus (`studio.config.json` « signature »), avec ses polices embarquées.

## 3. Outils

- `scripts/rendre_planches.mjs` : rend des planches SVG en PNG avec les polices d'un projet studio, et une planche contact (pour des planches dessinées hors du canevas).
- L'outil de design (canevas) : les planches et l'artboard des composants, que l'expert regarde et commente en place.
