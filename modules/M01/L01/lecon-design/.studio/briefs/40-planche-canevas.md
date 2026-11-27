# Brief 40 · graphiste · essai 3 : la planche d'une scène sur le canevas de design

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon-design. Toutes les commandes se lancent depuis ce dossier. Ta scène est donnée par l'agent principal (`S02` ou `S04`) ; un autre graphiste compose l'autre scène en même temps : ne touche jamais à ses fichiers.

## Ta tâche

Composer la planche de ta scène (état final, `Sxx-FIN`) dans la notation du canevas de design, la contrôler sur son image rendue, et rendre la main. Tu es le graphiste de la chaîne (skill graphisme) ; le canevas est ton outil. L'agent principal publie ta planche sur le canevas et la montre à Ilyas, qui la corrigera à la main : elle doit être juste avant qu'il la voie.

Ce qui change par rapport aux essais 1 et 2 : seulement la méthode de composition. Mêmes illustrations, mêmes textes d'Écran, même gabarit (`Frise` pour S02, `FicheRubriques` pour S04), mêmes gestes, mêmes locutions, mêmes états, mêmes mises en évidence (table « Apparitions » et « Mise en évidence » de ta section de `content/design/spec.md`). La **composition** (places et tailles) est à refaire : le défaut relevé par Ilyas sur l'essai 1 est que la composition n'occupait pas toute la feuille (S02 surtout, deuxième moitié à moitié vide). Les positions de la spécification ne sont pas ta cible : compose pour remplir la face utile (x 104 à 1424, y 180 à 860 ; jusqu'à x 1500 entre y 360 et 690), dans l'ordre de lecture et le sens de la scène, illustrations à une taille qui se lit (largeur libre, jamais étirées), aucun texte sur un trait, aucun chevauchement, rien d'éparpillé.

## À lire, et rien d'autre

1. `/home/user/bimaccess-studio/plugins/studio/skills/graphisme/SKILL.md`, § 3 bis (le sens avant le dessin), § 5 (spécification : apparitions, une seule mise en évidence), § 6 (lisibilité). La signature est « carte » : la charte FME001 remplace la signature BIMaccess.
2. `/home/user/Bimaccess-FME/design/CHARTE-FME001.md` : § 3 (typographie, tailles exactes), § 4 (mise en page, zones), § 5 (symboles, comment se dessine une entité géographique), § 6 (mise en évidence), § 8.
3. `content/storyboard.md`, ta scène (S02 : l. 109 à 155 ; S04 : l. 195 à 230) : Intention, Mise en scène, Écran, Narration.
4. `content/design/spec.md`, ta section (S02 : l. 109 à 242 ; S04 : l. 265 à 394) : illustrations (ce qu'elles montrent, `viewBox`), textes (rang, style), états, apparitions, mises en évidence, points ouverts.
5. `/home/user/Bimaccess-FME/harnais/skills/scenes-gabarits/canevas/notation.md` : la notation (repères, éléments, pièces à copier) et l'export.
6. `docs/gabarits.md` § 2 à 4 et § 6 (ce que le gabarit sait faire, la feuille remplie).

Ne lis pas les données des essais précédents (`../lecon-gabarits/`, `../lecon-essai/`) : la composition se refait.

Les illustrations (fichiers de `content/design/assets/`) : regarde leurs aperçus (`*.apercu.png`, outil Read) pour placer les textes posés dedans dans une zone vide.

## Ce que tu écris (seulement ces fichiers)

- `design-canevas/brouillons/Sxx.elements.html` : les éléments de la planche, dans la notation (`src="asset:<fichier>"` pour une illustration). Les textes posés dans une illustration sont ses enfants. Chaque élément porte son repère (étape et geste) ; chaque mise en évidence est posée avec son repère `évidence N → M`.
- `design-canevas/brouillons/Sxx.etapes.txt` : une ligne par étape, `N | état | locution` (étape 1 : `1 | Sxx-1 | début`), locutions recopiées mot pour mot de la table « Apparitions ».
- `content/design/scenes/Sxx.json` : écrit par l'export (ci-dessous), jamais à la main.

## Boucle de travail

```bash
S=S02; G=frise            # S04 : G=fiche-rubriques
H=/home/user/Bimaccess-FME/harnais/skills/scenes-gabarits/scripts
node $H/planche_canevas.mjs --scene $S --gabarit $G --titre "$S · planche (essai 3)" \
  --elements design-canevas/brouillons/$S.elements.html --etapes design-canevas/brouillons/$S.etapes.txt \
  --blobs design-canevas/blobs.json --sortie design-canevas
node $H/planche_vers_donnees.mjs --planche design-canevas/project/$S.dc.html --partition design-canevas/project/$S-partition.dc.html \
  --projet . --apercu .studio/qa/planche-$S.png
flock /tmp/fme001-sync.lock npm run check:scenes
```

1. Écris les éléments et les étapes, lance les trois commandes.
2. Lis chaque refus de l'export (il dit l'élément et quoi faire) et chaque `GabaritError` de `check:scenes` (enchaînements, feuille remplie) ; corrige les brouillons, relance.
3. Quand tout passe, **regarde l'aperçu** `.studio/qa/planche-$S.png` (outil Read) comme Ilyas le verra : la feuille remplie, rien de petit ou d'éparpillé, l'ordre de lecture, aucun texte sur un trait, les mises en évidence autour de leur élément à 10 px, les textes posés dans les zones vides des illustrations. Corrige et relance tant que l'image n'est pas juste. Une version sans repères : ajouter `--sans-reperes`.
4. Arrête-toi dès que la planche est juste : pas d'optimisation au pixel près, Ilyas corrigera à la main.

Pas de `build`, pas de planche par phrase, pas de `test:play` (l'agent principal les lance après la validation d'Ilyas). Aucun appel payant (aucun modèle d'image). Ne modifie ni les scripts, ni le moteur, ni les illustrations : un manque de l'outil se note dans le rapport, on le contourne au plus simple.

## Rapport (court, dans ta réponse)

- ce que tu as composé, en quelques lignes (l'idée de la composition, ce qui remplit la face) ;
- sortie finale des trois commandes (dernières lignes) ;
- combien d'allers-retours export ou gabarit, et pourquoi ;
- ce que la notation ou le canevas ne permet pas, ou rend difficile ;
- points ouverts pour Ilyas.
