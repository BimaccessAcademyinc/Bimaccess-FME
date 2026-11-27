# Rapport 103 · graphiste · composition de S03

## Gabarit retenu

- Composition : « Légende » (`illustrations/gabarits.md`), reprise de l'ancienne composition (`.studio/reprise/specs/S03.md`) : légende à gauche, feuille SAIF, logo et feuille sans nom en V à droite, trois lignes de repère, deux routes.
- Animation : **`FicheRubriques`** (`"gabarit": "fiche-rubriques"`), la scène passe par l'agent des données. La légende est la feuille à bandes : le fichier repris (`s04-ill-feuille`) a un bandeau et trois rubriques, une par genre (format, norme, logiciel). Ses quatre bandes se révèlent toutes dans l'étape de début (4 × 0,07 s, finies avant le premier mot à 0,4 s) : la légende est là, vide, dès la première seconde, comme le veut l'accroche. Le reste est fait de pièces ordinaires (illustrations, textes tapés, tracés à couches, pointes, lignes de repère en tracés, disques en chemin `d`). Le gabarit `Legende` demandé par l'ancienne composition n'est plus nécessaire pour cette scène.
- Recomposée pour le seuil de vide actuel : l'ancienne composition laissait un vide de 156 px de large sous la feuille SAIF, que le contrôle refuserait aujourd'hui (seuil 136 px).

## Fichiers écrits

- `content/design/spec.md` : section `## S03` insérée entre la fin du groupe a (après ses « Points ouverts ») et `## S04`, sans toucher aux autres sections (lignes 265 à 437).
- `content/design/assets/s03-logiciel.svg` : copie de `design/symboles/logiciel.svg`, `width` et `height` retirés de la racine.
- `content/design/assets/s03-feuille-vegetation.svg` : copie de `design/symboles/feuille-vegetation.svg`, `width` et `height` retirés, identifiants `face` et `contenu` préfixés en `s03-feuille-vegetation-…` ; le dessin n'a pas changé.
- Fichiers temporaires dans `.studio/tmp/graphiste-S03/` : rendus `p1.png` et `p2.png`, maquette `maquette.png`, mesure des textes `mesure.mjs`, contrôle de remplissage `compo.py`, sortie `check-design.txt`.

## Éléments et source de chaque SVG

| Élément (ancienne commande) | Fichier retenu | Source | x, y, largeur |
|---|---|---|---|
| cartouche de légende (`s03-ill-legende`, neuf) | `s04-ill-feuille` | `assets/` (S04) | 104, 186, 668 |
| cachet de norme (`s03-ill-cachet`, neuf) | `s02-ill-sceau` | `assets/` (S02) | 147, 531,3, 64 |
| fenêtre de logiciel (`s03-ill-fenetre`, neuve) | `s03-logiciel` | `design/symboles/logiciel.svg` | 145, 647,6, 68 |
| feuille sans nom (`s03-ill-feuille-autre`, neuve) | `s03-feuille-vegetation` | `design/symboles/feuille-vegetation.svg` | 1160, 306, 260 |
| symbole format | `s02-ill-saif` | `assets/` (S02) | 154, 358,4, 50 |
| feuille SAIF | `s02-ill-saif` | `assets/` (S02) | 840, 186, 300 |
| logo | `fme-logo` | `assets/` (marque, `design/marques/`) | 900, 670, 360 |
| points et lignes de repère, routes, pointes | tracés du moteur | `spec.md`, « Tracés du code » | |

J'ai rendu en PNG et regardé chaque SVG retenu avant de le spécifier, puis la composition entière en maquette, avec les vrais fichiers et les polices de la page.

## Coût

0 $. Aucun dessin neuf, aucune commande d'illustration, aucun appel payant.

## Contrôles lancés

- `node /home/user/bimaccess-studio/plugins/studio/skills/graphisme/scripts/check-design.mjs content/design` : **code 1**, « 31 SVG contrôlé(s), 63 locution(s) de spec.md contrôlée(s), 15 erreur(s), 32 avertissement(s) ».
  - Les 10 locutions de S03 (53 locutions contrôlées avant l'ajout, 63 après) sont toutes dites dans la narration, sans erreur ni avertissement.
  - Les deux SVG `s03-*` ne reçoivent ni erreur ni avertissement.
  - Les 15 erreurs existaient déjà et sont les mêmes avant et après mon travail : identifiant `dessin` non préfixé dans les 14 illustrations `s02-ill-*` et `s04-ill-*`, et `Layer_1` dans `fme-logo.svg`. Ces fichiers sont ceux de S02 et S04, sur lesquels deux agents des données travaillent en ce moment, et la marque ne se modifie pas : je ne les ai pas touchés. Il suffit de préfixer l'identifiant (`<nom>-dessin`, `fme-logo-layer-1`) ; aucun code ne s'appuie sur ces identifiants (`spec.md` S04, « Ce que le code doit faire », point 4).
  - Les 32 avertissements portent tous sur des fichiers existants : couleurs hors jetons des illustrations vectorisées et du logo, `width`/`height` à la racine, `s04-ill-hachure` à 562 ko. C'est pour cela qu'aucun texte posé dans la légende ou la feuille SAIF ne prend de réserve.
- Contrôle de remplissage (copie de `docs/gabarits.md` § 6, règles 10 et 11, grille de 5 px) sur les boîtes de l'état final : plus grand carré vide **125 px** (seuil 136), aucune bande vide refusée (la plus épaisse fait 62 px, seuil 68).
- Je n'ai lancé ni `sync`, ni `check`, ni `build`, selon le brief. Les données de S03 n'existent pas encore : le contrôle bloquant au chargement viendra avec l'agent des données.

## Décisions pour Ilyas

Aucune dépense à approuver. Points à trancher sur le lecteur, sans coût (détail dans `spec.md`, « Points ouverts (S03) ») :

1. La cartouche de légende est la feuille de S04 : le même dessin paraît deux scènes de suite, en légende puis en fiche d'entité. Pour avoir un dessin propre à S03, il faudrait une commande d'illustration, sur devis.
2. Le cachet de norme est le sceau du contrat de S02 : il a le double cercle demandé et ne porte aucun emblème.
3. La route d'écriture part du milieu de la pastille cyan du logo.

## Points pour le scénariste

- La mise en scène dit « une route rouge de traduction qui entre dans le logo ». J'ai suivi la charte : la route qui entre dans le logo est la lecture, en bleu ; la route d'écriture, qui en sort, est en rouge. Il faut corriger « rouge » dans `## Mise en scène`.
- La mise en scène ne dit pas quand se trace la ligne de repère de « Norme », ni quand s'éteint sa mise en évidence. Ma proposition : tracée sur « C'est aussi une norme », éteinte sur « FME n'est ni un format ».
