# Brief 16 · code · bibliothèque de composants « carte » du moteur

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon.

## Pourquoi

Sur L01, les graphistes ont passé l'essentiel de leur temps (environ 73 minutes d'attente sur 170) à dessiner les SVG coordonnée par coordonnée, à mesurer des textes et à improviser des rendus. Ilyas : un modèle de langage ne doit pas dessiner ; il porte l'idée. La bibliothèque change la façon de travailler : le graphiste écrit un plan court (« carte de rôle Murray et Lutz en haut à gauche ; route de lecture de la feuille cadastre vers le moteur sur "se lisent depuis" »), et la scène assemble des composants qui savent se dessiner et s'animer dans la charte.

## Ta tâche

Écrire `src/engine/carte-kit.tsx` (exporté par `src/engine/index.ts`), une bibliothèque de composants de la signature `carte`, sans aucune référence à FME ou à cette leçon (elle ira dans le template du plugin). Chaque composant :

- se place par `x`, `y` (coin haut gauche, px de composition 1920 × 1080) et une taille par défaut tirée de la charte, modifiable ;
- s'anime avec `at` (instant d'apparition, en secondes de scène, venu d'une locution) et `dur` facultatif, par les gestes de la grammaire (balayage `Wipe`, tracé `Trace`, frappe `TypeText`), jamais de fondu ;
- prend ses couleurs dans `THEME.colors` (jetons de la charte), ses polices dans `THEME.fonts` ;
- porte un `testId` facultatif et un `data-part` pour la planche par phrase ;
- reçoit ses textes en props (venus de `sceneTexts` dans la scène) : aucun texte littéral dans le moteur.

Composants (reprends les dessins de la bibliothèque `design/symboles/` et des scènes déjà codées, qui font foi pour l'aspect) :

| Composant | Props principales | Reprend |
|---|---|---|
| `FeuilleFormat` | `contenu` : `courbes`, `hydrographie`, `cadastre`, `bati`, `routes`, `vegetation`, `points`, `image`, `vide` ; `tireté` (non reliée) ; `titre` facultatif | `feuille-*.svg`, couronne de S06 |
| `CarteRole` | `nom` ; `personnes` (1 à 3 silhouettes) | `carte-role.svg`, S01, S02, S06 |
| `Route` | `points` (polyligne) ; `sens` `lecture` ou `ecriture` ; `pointe` ; bouts ronds | routes de S02, S05, S06 (`s02-route.tsx` : remplace-le dans la bibliothèque) |
| `Frise` | `de`, `a` (x), `y` ; `jalons` : liste `{ x, libelle, at }` ; bout ouvert | S02 |
| `Legende` | `titre` ; `lignes` : liste `{ symbole, texte, at }` (symbole : un des composants en petit, ou `route-lecture`, `route-ecriture`) | légende de S06 |
| `Logo` | `nom` de l'illustration (ex. `fme-logo`), `largeur` ; couleurs d'origine, jamais recoloré | logo de marque |
| `Globe` | `point` facultatif ; `contour` facultatif | `globe*.svg`, S03 (entité) |
| `PointGeodesique` | `libelle` (capitales espacées) ; `courbes` (anneaux de relief) | S06 |
| `Manque` | taille | `manque.svg` |
| `Source` | `texte`, `href` (lu par la scène dans `content/sources.json`) ; marge, filet, lien nouvel onglet | `s01-commun.tsx` (`Source`) : remplace-le |
| `Reserve` | enveloppe un texte posé sur la face : fond plein, pour que le carroyage ne le traverse pas | `RESERVE` de `s01-commun.tsx` |

Ajoute `cap` (`butt` défaut, `round`) à `Trace` si `Route` en a besoin, sans changer le rendu des autres signatures.

Écris aussi `docs/carte-kit.md` : une page courte, une ligne par composant, ses props, un exemple d'usage dans une scène, pour que le graphiste écrive son plan avec ces noms et que le codeur l'applique.

**Ne modifie aucune scène** : un autre agent met à jour les scènes en même temps ; la nouvelle S03 sera la première à employer la bibliothèque. Les scènes existantes gardent leurs composants propres pour l'instant.

## À lire

- /home/user/Bimaccess-FME/design/CHARTE-FME001.md (§ 2 couleurs, § 5 symboles, § 7 animation) et design/tokens.json, design/symboles/*.svg
- CLAUDE.md du projet (§ 4 à 6), docs/player-contract.md, le moteur src/engine/ (en particulier anim.tsx, carte.tsx, components.tsx, index.ts)
- les scènes existantes comme modèles d'aspect : src/lesson/scenes/s02.tsx, s06.tsx, src/lesson/components/s01-commun.tsx, s02-route.tsx

## Contrôles

- `flock /tmp/fme001-sync.lock npm run check` : code 0 (« scènes chargées »)
- Une scène de démonstration temporaire est permise pour voir les composants (`flock /tmp/fme001-sync.lock npm run build` puis captures avec `node /home/user/bimaccess-studio/plugins/studio/skills/qa/scripts/shots.mjs`, un seul Chromium) : retire-la avant de rendre, et `npm run check` doit repasser.
- Les signatures `bimaccess` et `neutral` compilent toujours (`npm run check` avec chacune, puis retour à `carte`).

Aucune opération git.

## Rapport (court)

Fichiers, contrôles, la liste des composants avec leurs props, ce qui reste dessiné à la main dans une scène (et pourquoi), chemins des captures de démonstration.
