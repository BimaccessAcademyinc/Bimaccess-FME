# Brief 30 · code · essai 2, phase A : deux composants de gabarit dans le moteur

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon-gabarits (copie de `lecon-essai`, identifiant `FME001-M01-L01-gabarits`). Toutes les commandes se lancent depuis ce dossier.

## Pourquoi

L'essai 1 a construit S02 et S04 en environ 28 Ko de code sur mesure par scène (27 min de codeur). Hypothèse de l'essai 2 : la plupart des scènes suivent quelques formes (`/home/user/Bimaccess-FME/harnais/skills/planche-image/gabarits.md`). Un composant d'animation par gabarit, écrit une fois et piloté par des données, fait de chaque scène un petit fichier JSON. Tu écris les deux premiers ; deux autres agents écriront ensuite S02 et S04 comme données seulement, avec ta documentation pour seule aide. Ta documentation et tes messages d'erreur décident donc de leur temps.

## Ta tâche

Dans `src/engine/gabarits/`, exportés par `src/engine/index.ts` :

1. **`Frise`** (forme de S02) : ligne et pointe posées à l'image 0 ; jalons tracés ; cases des années tracées à vitesse constante (deux couches, `encre` et `papier`, même vitesse, tirée de `getLength`) ; éléments (illustrations, textes, routes à trois couches et leurs pointes) posés au-dessus et au-dessous de la ligne, chacun révélé sur sa locution, les gestes d'une même phrase enchaînés ; une seule mise en évidence à la fois.
2. **`FicheRubriques`** (forme de S04) : feuille révélée bande par bande (une seule illustration découpée par un rectangle dont le bas descend, jamais des `Wipe` empilés : couture) ; bandeau, rubriques, éléments posés dans chaque rubrique ; un objet qui voyage d'une boîte à une autre (`Move`, ou un chemin avec `getPointAtLength` si tu le juges plus exact) ; traits et filets tracés ; une seule mise en évidence à la fois.

Chaque composant lit un fichier de données `content/design/scenes/Sxx.json`, importé par la scène. Le format est à toi, mais il doit couvrir tout ce que disent les sections S02 et S04 de `content/design/spec.md` : illustrations (nom, x, y, largeur ; hauteur tirée du `viewBox`), textes par indice de `## Écran` (`sceneTexts`), style, place et réserve, tracés, locutions mot pour mot, gestes (balayage et sens, frappe, tracé, déplacement) avec leurs durées, enchaînements, mises en évidence (rectangle, de, à), `data-board` par état (dernier `Sxx-FIN`), mention de source, habillage de marge. Une scène doit se réduire à :

```tsx
import data from "../../../content/design/scenes/S02.json"
export default defineScene({ ...Frise.scene(data) })   // ou l'équivalent que tu choisis
```

Les données se contrôlent au chargement (le `sync` charge chaque scène) : locution introuvable, indice de texte hors de `## Écran`, illustration inconnue, enchaînement qui déborde sur l'étape suivante, deux mises en évidence qui se recouvrent : une erreur qui dit le fichier, le champ et quoi faire. Aucun instant écrit à la main, aucun texte littéral (`check-literals.mjs` doit rester à 0 sur `src/lesson`).

Grammaire (passe avant les exemples de Remotion) : jamais de fondu, de ressort ni de rebond ; vitesse constante ; une seule mise en évidence ; `data-board` par état.

Garde ce que l'essai 1 a appris (rapport `.studio/reports/21-code-essai.md`, § « Corrigé après la planche » et « Ce que le moteur devrait savoir faire ») : bandes par une seule découpe ; réserves (`fond` sur la face ; dans une carte ou une feuille, une option par texte, par défaut aucune, recommandation du rapport 21, décision d'Ilyas encore ouverte) ; aplat `fond` sous une illustration sans aplat ; découpe en cercle (globe) ; mesure de texte seulement polices chargées. Les pièces de `src/lesson/components/s02-s04-commun.tsx` et `s01-commun.tsx` (`poser`, `Texte`, `Source`) peuvent passer dans le moteur.

Écris aussi `docs/gabarits.md` : le format des données champ par champ, un exemple court par gabarit (quelques éléments, pas S02 ni S04 entières), les erreurs de chargement et ce qu'elles veulent dire, et comment vérifier une scène (commandes ci-dessous).

## Ce que tu n'écris pas

- `content/design/scenes/S02.json`, `S04.json`, ni les scènes `src/lesson/scenes/*.tsx` : c'est la phase B. Pour éprouver tes composants, tu peux brancher un essai court sur `s02.tsx` ou `s04.tsx`, mais à la fin ces deux fichiers doivent être identiques à ceux de `lecon-essai` (`cp ../lecon-essai/src/lesson/scenes/s0{2,4}.tsx src/lesson/scenes/`) et aucun fichier d'essai ne reste dans `content/design/scenes/`.
- Rien hors de ce projet ; ni lecteur (`src/player/`), ni scripts, ni `content/` hors `content/design/scenes/` (vide à la fin).
- Aucun appel payant, aucune illustration à commander, aucun rendu vidéo, aucune opération git.

## À lire, et rien d'autre

- /home/user/bimaccess-studio/plugins/studio/skills/scenes/SKILL.md, références `animation-grammar.md` et `engine-api.md`
- /home/user/Bimaccess-FME/.claude/skills/remotion-markup/SKILL.md et ses références `timing.md`, `sequencing.md`, `measuring-text.md` ; /home/user/bimaccess-studio/chaine/agents/code/skills/narrated-lesson-build/references/remotion-outils.md
- CLAUDE.md du projet (§ 4 à 8), docs/player-contract.md
- content/design/spec.md : en-tête commun (l. 1 à 60), sections S02 (l. 61 à 194) et S04 (l. 217 à 345)
- `.studio/reports/21-code-essai.md` ; les scènes `src/lesson/scenes/s02.tsx`, `s04.tsx` (ce qu'elles font de juste, à reprendre dans les gabarits) ; `src/lesson/components/` ; l'API du moteur (`src/engine/`)

## Contrôles avant de rendre

- `node /home/user/bimaccess-studio/plugins/studio/skills/scenes/scripts/check-literals.mjs src/lesson` : 0 texte en dur
- `flock /tmp/fme001-sync.lock npm run check` : code 0, « scènes chargées : 7 »
- ton essai court vu à la planche par phrase (`flock /tmp/fme001-sync.lock npm run build` puis `node /home/user/Bimaccess-FME/harnais/skills/planche-par-phrase-studio/planche.mjs --scenes S02 --out .studio/qa/a`, regarder l'image avec Read), puis scènes rétablies et `npm run check` de nouveau à 0
- pas de `test:play` (l'agent principal le lance une fois à la fin de l'essai)

## Rapport

`.studio/reports/30-code-gabarits.md`, format de la section 3 de /home/user/bimaccess-studio/plugins/studio/skills/produce/references/briefs.md : fichiers, contrôles, le format choisi en dix lignes, ce que les gabarits ne savent pas encore faire, ce que la phase B doit savoir. Français, sans tiret cadratin, aucun libellé de statut.

## Complément (envoyé à l'agent en cours de phase, après le contrôle d'Ilyas sur l'essai 1)

Images et gestes de l'essai 1 à garder tels quels ; défaut à corriger : la composition n'occupe pas toute la feuille (S02 surtout). Les gabarits déclarent la zone utile (bas du titre vers y 180 à haut des sous-titres y 860, x 104 à la marge vers x 1424, hors zone d'action), contrôlent au chargement que la composition finale l'occupe sans grand vide, donnent aux données le moyen de la remplir, et `docs/gabarits.md` le documente pour la phase B.
