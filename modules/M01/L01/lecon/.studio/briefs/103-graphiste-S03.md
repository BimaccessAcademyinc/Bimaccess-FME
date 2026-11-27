# Brief · composition de S03 (agent graphiste)

Projet : `/home/user/Bimaccess-FME/modules/M01/L01/lecon`. Plugin : `/home/user/bimaccess-studio/plugins/studio`. Dépôt pilote : `/home/user/Bimaccess-FME` (hors du dépôt de la formation).

## Ton rôle
Lis d'abord ta définition `/home/user/bimaccess-studio/plugins/studio/agents/graphiste.md` en entier, puis tes skills : `/home/user/bimaccess-studio/plugins/studio/skills/graphisme/SKILL.md`, `/home/user/bimaccess-studio/plugins/studio/skills/illustrations/SKILL.md` (§ dépenses et gabarits de composition, `/home/user/bimaccess-studio/plugins/studio/skills/illustrations/gabarits.md`), `/home/user/bimaccess-studio/plugins/studio/skills/scenes-gabarits/SKILL.md`. Puis `/home/user/Bimaccess-FME/modules/M01/L01/lecon/docs/gabarits.md` (§ 0, 3, 6).

## Tâche
Composer S03 (« FME est un logiciel, SAIF un format et une norme ») : section `## S03` de `content/design/spec.md`, à insérer entre les sections S02 et S04 existantes, **sans toucher aux autres sections**. Point de départ, à reprendre plutôt qu'à refaire : l'ancienne composition `/home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/reprise/specs/S03.md` (gabarit « Légende de carte », boîtes mesurées, lignes de repère, routes).

**Règle de dépense de cette production (Ilyas) : aucun dessin neuf.** L'ancienne composition commandait 4 dessins (`s03-ill-legende`, `s03-ill-cachet`, `s03-ill-fenetre`, `s03-ill-feuille-autre`) : remplace chacun par un SVG qui existe déjà, ou par un tracé du moteur (cadre, cercle, filet). Réserve : `/home/user/Bimaccess-FME/design/symboles/` (par exemple `cadre-feuille.svg`, `logiciel.svg`, `feuille-vegetation.svg`, `document.svg`, `feuille-format.svg`), `/home/user/Bimaccess-FME/design/bibliotheque/`, `/home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/` (S02, S04, `fme-logo.svg`, S01, S05 à S07). Regarde chaque SVG retenu (rendu en PNG) avant de le spécifier. Recopie dans `content/design/assets/` sous un nom `s03-<nom>.svg` les symboles que tu prends dans `design/symboles/`. Si un élément ne peut vraiment pas se faire sans dessin, écris sa commande et le devis de l'outil (lancé **sans** `--approuve`), dans « Décisions à prendre par l'utilisateur ».

Gabarit d'animation : `Frise` ou `FicheRubriques` si la légende s'y range sans en trahir le sens (la scène passe alors par l'agent des données) ; sinon dis « forme unique » et la scène sera codée par le rôle code, d'après ta section. Dis lequel en tête de section.

Charte : `/home/user/Bimaccess-FME/design/CHARTE-FME001.md` et `content/design/theme.json`. Storyboard : `content/storyboard.md`, `# S03` (lis seulement cette scène et l'ouverture). Face remplie de x 104 à 1424, y 180 à 860 ; marge réservée à l'échelle, à la source et à la rose ; rien sur un trait ; aucune réserve sous un texte posé dans une feuille.

## Fichiers à écrire
La section S03 de `content/design/spec.md`, les SVG `content/design/assets/s03-*.svg`, ton rapport `.studio/reports/103-graphiste-S03.md`. Temporaires dans `.studio/tmp/graphiste-S03/`. Deux agents des données travaillent en même temps sur S02 et S04 : ne lance ni `sync`, ni `check`, ni `build` ; `node /home/user/bimaccess-studio/plugins/studio/skills/graphisme/scripts/check-design.mjs content/design` est permis.

## Rapport
Gabarit retenu, table des éléments (source de chaque SVG), coût (0 $ attendu), contrôles lancés et leur code, décisions pour Ilyas. Aucune opération git, aucun appel payant, aucune question à l'utilisateur.
