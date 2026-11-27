# Contrat du lecteur

Ce document décrit ce que le lecteur fait réellement : les fichiers, l'API exacte du moteur, les attributs lus par les tests. Il fait foi entre les rôles (scénariste, voix, graphiste, code, qa). Une différence entre ce document et le code est un défaut à signaler, pas une liberté.

Le projet joue des contenus narrés et interactifs (formations, présentations, explications) et se construit en **une page HTML autonome** lisible partout, y compris ouverte directement depuis le disque (`file://`).

## 1. Pile et contraintes

- Vite 8, React 19, TypeScript strict (`noUncheckedIndexedAccess`, `noUnusedLocals`), Remotion 4 (`remotion`, `@remotion/player`), `yaml` pour la synchronisation, `@fontsource/azeret-mono`, `@fontsource/ibm-plex-sans`, `@fontsource/fraunces` (polices de la signature bimaccess), `@fontsource/source-serif-4`, `@fontsource/barlow-condensed` (polices de la signature carte), licence OFL.
- `vite-plugin-singlefile` : `npm run build` produit `dist/index.html` (JavaScript et CSS en ligne) et `dist/audio/*.mp3` (copiés depuis `public/audio/`, que remplit `scripts/sync.mjs`).
- La page marche servie (`npm run preview`) **et** en `file://` : aucun `fetch` de données (tout est dans les modules générés), l'audio est lu par `<Html5Audio>` de Remotion depuis un chemin relatif (`audio/S01-01.mp3`).
- Aucune dépendance réseau à l'exécution. Polices : celles de la signature (§ 9), paquets `@fontsource` mis en ligne dans `dist/index.html` par la construction (`data:font/woff2`) ; signature neutre : polices système. Une autre police s'ajoute de la même façon (paquet, `@font-face` en ligne), jamais par un lien distant.
- Licence Remotion : gratuite pour les particuliers et les structures de trois personnes au plus, licence d'entreprise au-delà. `studio.config.json` → `"acknowledgeRemotionLicense"` (absent ou `false` par défaut) est transmis tel quel au `<Player>` : seul l'utilisateur le passe à `true`, après avoir vérifié sa situation. Tant qu'il vaut `false`, Remotion écrit un avertissement (pas une erreur) en console.
- Playwright n'est pas une dépendance : `scripts/play-check.mjs` le cherche ailleurs (§ 8).

## 2. Contenu, dans `content/`

| Fichier | Rôle | Producteur |
|---|---|---|
| `content/brief.md` | besoin, public, durée, ton, langue | Super Agent |
| `content/storyboard.md` | scènes et textes (format ci-dessous) | Scénariste |
| `content/design/theme.json` | `signature` (facultatif : le thème ne vaut que pour elle), `colors` (signature carte : les jetons de la charte, § 9, dont les clés communes sont dérivées ; sinon `background`, `ink`, `muted`, `accent`, `accent2`, `success`, `line`, `panel`, et les jetons de la signature : `panel2`, `gridDot`, `lineSoft`, `lineFaint`, `ink2`, `red`, `gold`, `goldText`, `yellowFill`, `green`, `cyan`, `blue`, `magenta`, `grip`, `gripHover`, `gripHot`, `selectBg`, `tooltip`, `shadow`), `fonts` (`body`, `mono`, `display`, `paper`), `radius`, `grid`, `typingCps` ; chaque clé absente prend la valeur par défaut de la signature (§ 9) | Graphiste |
| `content/design/assets/*.svg` | illustrations, inlinées dans la page (sans prologue XML, sans `<script>`) ; XML bien formé (balises équilibrées, une seule racine `<svg>`) ; groupes animés à part nommés `<g id="fichier-partie">` | Graphiste |
| `content/design/spec.md` | composition de chaque scène, états (`data-board`), ce qui apparaît sur quels mots | Graphiste |
| `content/voice/voice-manifest.yaml`, `content/voice/Sxx/Sxx-yy.mp3`, `.alignment.json` | voix ElevenLabs ; absent = contenu sans voix (minutage estimé, sous-titres actifs) | Voix |
| `content/beats.json` | `{ "S01-01": { "cle": "locution dite mot pour mot" } }` | Code (et Voix par `suggested_beats`) |

`studio.config.json` : `id` (lettres, chiffres, tirets ; clé de progression ; préfixe du code de scène `<id>-<Sxx>`), `title`, `lang` (`fr` ou `en…`, choisit les libellés d'interface), `signature` (`bimaccess`, par défaut, `carte` ou `neutral` ; § 9), `program` (code de programme facultatif, majuscules et chiffres, ex. `CER001`), `programColor` (`#RRVVBB`, facultatif : couleur d'un programme absent de la table, ou qui la remplace), `fps` (30), `width` × `height` (1920 × 1080), `voiceStart` (0,4 s : début de la narration d'entrée dans la scène), `tail` (0,8 s après la dernière voix), `intro` (3 s, durée d'une scène sans narration d'entrée), chemins `storyboard`, `manifest`, `beats`, `theme`, `assets`, `speechRate` (minutage estimé sans voix), `acknowledgeRemotionLicense`.

### Storyboard

Mots-clés français ou anglais, au choix :

```
# S01 · Titre de la scène            (séparateur ·, -, –, — ou :)

## Intention / ## Mise en scène     (libres, lus par les humains)

## Écran                            (ou ## Screen)
- `Texte à l'écran 1`
- `Texte à l'écran 2`

## Narration                        (clip linéaire S01-01, joué à l'entrée)
Texte dit, mot pour mot.

## Exercice                         (ou ## Exercise)
Question : `Texte de la question`   (ou Question: `…`)
- a · `Choix A` → `Conséquence A`
- b · `Choix B` → `Conséquence B`
Attendu : b                         (ou Expected: b ; facultatif : sans lui, mode conséquence, aucun verdict)

## Narration déclenchée             (ou ## Triggered narration : clip event S01-02, joué après le geste)
Texte dit après la validation.
```

Les clips sont numérotés dans l'ordre des sections « Narration… » de la scène : `Sxx-01`, `Sxx-02`… Une seule narration linéaire par scène. Un titre `# …` qui n'est pas une scène (addenda, notes) n'est jamais une source de textes ; mais un titre qui ressemble à une scène sans en respecter la forme (`# S02` sans titre, `# S02 · ` titre vide, `# S03 Titre` sans séparateur, `# S2 · Titre` sans deux chiffres, `# Scène 2`) fait échouer la sync au lieu de faire disparaître la scène. Les lettres de choix et d'« Attendu » s'écrivent en minuscule (`- c ·`, `Attendu : b`) ; une majuscule fait échouer la sync.

### Manifeste voix (champs lus)

```yaml
clips:
  - clip_id: S01-01
    trigger: linear            # ou event ; doit être celui du storyboard
    text: "…"                  # mot pour mot le texte du storyboard
    tts_text: "…"              # texte réellement envoyé (dictionnaire appliqué) ; sync y compare l'alignement
    trigger_label: "Narration déclenchée"   # clips event : titre de la section (information, non lu)
    audio: S01/S01-01.mp3      # relatif à la racine du projet ou au dossier du manifeste
    alignment: S01/S01-01.alignment.json   # JSON ElevenLabs : alignment.characters, character_start_times_seconds, character_end_times_seconds
    duration_s: 16.771
    suggested_beats: { consigne: "Écrivez la carte" }
```

## 3. Synchronisation : `npm run sync` (`scripts/sync.mjs`)

Lit `studio.config.json` et `content/`, écrit `src/generated/` (jamais édité à la main, réécrit seulement s'il change) et `public/audio/`. Imprime chaque repère trouvé (`[sync] S02-01.condenseur = 15.182 s « Dans le condenseur »`, secondes depuis le début du clip) ; un repère introuvable ou ambigu n'a jamais de ligne « = » : `[sync] S02-01.condenseur introuvable « … »`, puis la ligne `ÉCHEC` qui l'explique.

Échoue (code 1, lignes `[sync] ÉCHEC …`) sur : champ de configuration manquant, scène ou section en double, titre de scène mal écrit (`# S02`, `# S02 · `, `# S03 Titre`, `# S2 · …`), `signature` autre que `bimaccess`, `carte` ou `neutral`, `program` mal écrit (`cer001`) ou inconnu sans `programColor`, `programColor` qui n'est pas `#RRVVBB`, `signature` de `theme.json` inconnue, paquet de police de la signature absent, exercice mal formé (question absente, moins de deux choix, choix mal écrit ou en majuscule, « Attendu » en majuscule, mal écrit ou hors des choix), plus d'une narration linéaire dans une scène, narration vide, manifeste illisible, clip du manifeste absent du storyboard, déclencheur contradictoire, texte du manifeste différent du storyboard, audio ou alignement introuvable, alignement vide, aux instants invalides (null, NaN, négatif) ou qui reculent, ou plus long que `duration_s`, repère pour un clip inconnu, locution de repère introuvable ou ambiguë, couleur ou `typingCps` invalide, SVG mal formé (analyse XML stricte, `scripts/lib/svg-xml.mjs` : balise jamais fermée ou fermée en trop, plusieurs racines, racine autre que `<svg>`, attribut sans guillemets ou en double, entité non XML comme `&nbsp;` ; message avec le fichier et la ligne : `ÉCHEC illustration x.svg, ligne 2 : </svg> ferme <g> ouvert ligne 1 : balise <g> jamais fermée`), SVG qui contient `<script>`, illustration nommée en clair dans `src/lesson/` et absente de `content/design/assets/` (`<Svg name="…">`, `asset("…")`, `illustration("…")`) ou groupe de `parts` absent du fichier (`group: "…"` d'un `<Svg name="…">` ou d'un `<Svg svg={X}>` avec `const X = illustration("…")` dans le même fichier), avec fichier et ligne de la scène.

`--scenes` (passé par `npm run check`, `npm run build` et `npm run check:scenes`) : après l'écriture, charge `src/lesson/lesson.ts` par Vite (rendu serveur, sans navigateur), ce qui exécute les vérifications de chargement des scènes (`said`, `b`, `word`, `ordered`, `sceneTexts`, `defineScene`, `defineLesson`). Une erreur arrête tout : `[sync] ÉCHEC chargement des scènes : LocutionError : S01-01 : locution introuvable « … »`, code 1, aucune page construite. Seules les erreurs levées au chargement des modules sont vues ainsi ; une erreur levée au rendu (dans `View`) reste du ressort de `npm run test:play`. C'est pourquoi les illustrations se déclarent au niveau du module (`const MAISON = illustration("maison", ["maison-air"])`, vérifié au chargement), et pourquoi sync contrôle en plus les noms écrits en clair (ci-dessus) ; un nom calculé dans `View` n'est vu qu'au rendu.

Avertit seulement (`[sync] attention …`) quand l'alignement ne reprend pas le texte mot pour mot (un dictionnaire de prononciation peut faire dire « P zéro un » pour « P-01 ») : les locutions se cherchent dans ce qui est **dit** ; quand `theme.json` est écrit pour l'autre signature (il est alors ignoré) ; en signature bimaccess, quand `accent` diffère de la couleur du programme, quand le fond n'est pas `#FFFFFF`, quand `radius` n'est pas 0 (le lecteur l'ignore) ; en signature carte, quand le fond n'est pas `#F1F3EC`, quand `radius` ou `grid` ne sont pas 0 ; quand `programColor` remplace la couleur d'un programme connu ; quand `program` est donné en signature neutre.

Modules générés :

- `texts.ts` : `TEXTS[sceneId] = { title, screen: string[], sections: { [nom]: { codes, lines } } }` (`screen` = textes entre accents graves de « Écran » / « Screen ») ; `EXERCISES[sceneId] = { question, choices: [{ key, label, feedback }], expected: string | null }` ; `SCENE_IDS` (ordre du storyboard).
- `narration.ts` : `CLIPS[clipId] = { id, scene, trigger, text, src: string | null, duration, words: { text, start, end }[], beats: Record<string, number> }` (secondes depuis le début du clip ; type `Clip`).
- `theme.ts` (`THEME`), `assets.ts` (`ASSETS[nom] = svg`), `meta.ts` (`META = { id, title, lang, fps, width, height, voiceStart, tail, intro, typingCps, acknowledgeRemotionLicense, signature, program, programColor }`, type `Signature = "bimaccess" | "carte" | "neutral"` ; `program` et `programColor` : `string | null`, couleur résolue par la table des programmes ou `programColor`).
- `fonts.css` : `@font-face` des polices de la signature (chemins de paquets `@fontsource`, résolus et mis en ligne par la construction) ; un commentaire seul en signature neutre.

## 4. Moteur : `src/engine/` (importé par `../../engine` depuis une scène)

### Ligne de temps (`timeline.ts`)

| API | Effet |
|---|---|
| `voice(clipId, offset = META.voiceStart): Voice` | narration d'entrée placée dans la scène ; `TimelineError` si le clip est inconnu ou déclenché |
| `eventVoice(clipId, startAt = 0): Voice` | clip déclenché ; au chargement, instants relatifs à son début ; `TimelineError` s'il n'est pas `event` |
| `Voice` | `{ clip, start, end, words, b(key), said(phrase), saidEnd(phrase), word(phrase, i), at(start) }`, tous les instants en secondes de scène |
| `v.b("cle")` | instant d'un repère de `content/beats.json` ; `TimelineError` si absent |
| `v.said("locution")`, `v.saidEnd(…)` | début du premier mot, fin du dernier mot d'une locution dite mot pour mot et unique ; `LocutionError` sinon |
| `v.word("locution", i)` | début du i-ème mot dit (à partir de 0) ; `LocutionError` hors limites |
| `v.at(start)` | le même clip placé ailleurs (clip déclenché dans la vue : `E.at(eventStart(id))`) |
| `ordered({ a: t1, b: t2 }, "S02")` ou `ordered([t1, t2], …)` | renvoie l'argument ; `OrderError` nommée si un instant précède le précédent |
| `focusAt(steps, t)` | `steps = [{ at, on }]` ordonnés → `on` de la dernière étape commencée (ou null) ; `OrderError` si désordonné |
| `prog(t, start, dur)`, `ease(x)`, `typedUntil(text, at, cps?)` | avancement 0 → 1, sortie cubique, fin d'une frappe |
| `findLocution`, `normalizeToken`, `tokenize`, `clipOf` | outils ; normalisation identique à celle de `sync.mjs` (minuscules, apostrophes unifiées, ponctuation de bord retirée) |

Les erreurs sont levées **au chargement du module de la scène** : `npm run check` et `npm run build` échouent alors (`sync --scenes`, § 3) ; une page construite autrement afficherait `data-testid="load-error"` avec `LocutionError : S01-01 : locution introuvable « … »` et l'écrirait en console. Les instants se calculent donc au niveau du module (`const T = ordered({ … })`), pas dans `View`.

### Textes (`texts.ts`)

`sceneTexts(id, { screen?: n })` → `{ id, title, all, screen(i), codes(section) }` ; `TextError` si la scène, le texte n° i ou la section manque, ou si le nombre de textes d'« Écran » diffère de `n`. `asset(nom)` → SVG de `content/design/assets/nom.svg` ; `TextError` si absent. `illustration(nom, groupes = [])` → `{ name, svg, ids }` à passer à `<Svg svg={…}>` ; `TextError` au chargement si le fichier manque ou si un des `groupes` (`id` d'un `<g>`) en est absent. À appeler au niveau du module.

### Animation (`anim.tsx`)

| Composant | Props |
|---|---|
| `useT()` | temps de scène en secondes |
| `Wipe` | `children` (obligatoire), `at`, `dur = 0.5`, `dir = "right" \| "left" \| "down" \| "up"`, `style`, `className`, `testId` ; enveloppe ses enfants dans un `<div>` (positionné par `style`), invisible et inerte avant `at` |
| `Trace` (dans un `<svg>`) | `d` ou `points`, `at`, `dur = 0.6`, `color`, `width = 4`, `dashed` (motif), `arrow` (avec `points`), `fill` (posé quand le contour est fermé) ; vitesse constante |
| `TypeText` | `text`, `at`, `cps = META.typingCps`, `caret = true`, `style`, `className`, `testId` ; la partie non tapée garde sa place |
| `Highlight` (HTML) | `children` (obligatoire), `on`, `pad = 10`, `style`, `testId` : enveloppeur `<div>` en `position: relative` (le placer avec `style`) ; contour tireté et quatre poignées carrées bleues autour des enfants quand `on`, `data-highlight="on"` (bimaccess : tireté et poignées pleines `grip`) ; `shape = "rect" | "circle"` et `at` (début du tracé de 0,25 s), lus en signature carte seulement : tireté `accent` 2,5 px (10 6), sans poignée, rectangle à `pad` px ou cercle de rayon demi-diagonale + `pad` |
| `HighlightRect` (SVG, dans un `<svg>`) | `on`, `x`, `y`, `w`, `h`, `pad = 12` (carte : 10), `at` (carte : début du tracé de 0,25 s) ; `data-highlight="on"` |
| `Grips` (HTML) | `size = 12`, `offset = -7`, `color = THEME.colors.grip` : quatre poignées pleines aux coins du parent (en `position: relative`), sans `data-highlight` (ce n'est pas une mise en évidence) |
| `Move` | `children` (obligatoire), `at`, `dur = 0.6`, `from`, `to` (`{ x, y, scale }`), `style` ; enveloppeur `<div>` transformé (origine en haut à gauche) |
| `rectPath(x, y, w, h)`, `wipeProgress(t, at, dur)` | outils |

Il n'existe pas de `Pop` ni de fondu d'opacité. Exemple de mise en évidence d'une carte placée dans la scène :

```tsx
<Highlight on={focus === "carte"} pad={12} style={{ position: "absolute", left: 120, top: 300, width: 520 }} testId={tid(ID, "carte")}>
  <Wipe at={T.carte}>…contenu de la carte…</Wipe>
</Highlight>
```

### Composants de scène (`components.tsx`)

| Composant | Props |
|---|---|
| `SceneRoot` | `id` (« S01 »), `board` (état affiché), `style` ; pose `data-board`, `data-testid="s01-scene"`, `user-select: none`, fond et police du thème ; bimaccess : grille de points (`THEME.grid`), icône SCU en bas à gauche, zone d'action (`data-zone="actions"`, bas droite à 48 px des bords, contexte `ActionZone`) |
| `Title` | `text`, `at`, `size = 64`, `style`, `testId` (titre tapé) |
| `Bullets` | `items: { text, at }[]`, `size = 44`, `gap = 30`, `style`, `testIdPrefix` (puce n → `prefix-n`) |
| `Diagram` | `width`, `height`, `nodes: { id, x, y, w, h, label, at, color? }[]`, `links: { id, points, at, dur?, color?, arrow?, dashed?, width? }[]`, `focus` (id ou null), `style`, `testIdPrefix`, `children` (SVG sous les nœuds) |
| `Svg` | `name` (fichier sans `.svg`, lu au rendu) ou `svg` (objet de `illustration(…)`, vérifié au chargement : à préférer), `at`, `dur = 0.8`, `dir`, `parts: { group, at, dur?, dir? }[]`, `style` (position et taille), `testId` ; sans `parts`, l'illustration entière se balaie à `at` ; avec `parts`, chaque groupe `<g id="group">` reste caché jusqu'à son `at` puis se balaie dans sa propre boîte (`dur`, `dir` de la partie, sinon ceux de l'illustration), le reste (le décor) se balaie à `at` ; un `at` de partie se place au plus tôt au `at` de l'illustration ; groupe absent du fichier : `TextError` (et `ÉCHEC` de sync quand le nom est écrit en clair) ; le groupe révélé porte `data-part`, `data-revealed="false" \| "partial" \| "true"` |
| `Callout` | `anchor` [x, y], `label` [x, y], `text`, `at`, `width = 420`, `color`, `size = 32`, `testId` ; bimaccess : ligne de repère (point de 6 px sur l'objet, oblique jusqu'à 52 px avant le texte, palier, texte Azeret Mono), encre par défaut |
| `Dimension` (SVG, `cad.tsx`) | `from`, `to` (points mesurés), `offset = 40` (ligne de cote à gauche du sens from → to ; négatif : de l'autre côté), `label` (storyboard), `at`, `dur = 0.5`, `color = THEME.colors.cyan`, `size = 30`, `width = 1.5`, `testId` : lignes d'attache tracées, ligne de cote, traits obliques, texte mono tapé (MAJUSCULES en bimaccess) |
| `Osnap` (`cad.tsx`) | `kind` (`endpoint` ■, `midpoint` ▲, `center` ○, `intersection` ✕, `perpendicular` ⊥, `quadrant` ◇), `size = 16`, `color = THEME.colors.gold`, `cx`/`cy` (centre, dans un `<svg>`), `style`, `testId` : marqueur d'accrochage (icônes `osnap-*.svg` du design-system) |
| `Captions` | `voices: Voice[]`, `size` (38 ; bimaccess 34) (posé par le lecteur, pas par les scènes) |
| `ChoicePanel` | `sceneId`, `exercise`, `state`, `send`, `at`, `actedAt`, `continueAt?`, `onContinue?`, `verdict = false`, `width = 1180`, `style` (placement du panneau) |
| `SceneClock` | contexte React `{ narrationEnd }` (secondes de scène) posé par le lecteur autour de la vue ; lu par `ChoicePanel` |
| `tid(sceneId, nom)` | `data-testid` préfixé : `tid("S03", "choice-a")` → `s03-choice-a` |

`ChoicePanel` : question tapée à `at` (cadence `META.typingCps`), choix et VALIDER balayés ensemble à la fin de la frappe (`typedUntil(question, at) + 0.2`, aucun instant ni plafond écrit en dur) ; boutons `role="radio"` (`data-role="choice"`, `data-key`, `aria-checked`) ; choix sélectionné : bord plein épais et barre à gauche en couleur `accent`, lettre en `accent` (bimaccess : quiz-choice, bord plein `grip` et quatre poignées, réponse attendue marquée d'un accrochage ■ si verdict), **jamais** le contour tireté de la mise en évidence ni `data-highlight` (ce n'est pas une mise en évidence : une scène d'exercice peut mettre un élément en évidence pendant le clip déclenché, et l'image finale n'en montre aucune qu'elle n'a pas voulue) ; VALIDER (`data-role="validate"`) inactif sans sélection, sélection modifiable jusqu'à VALIDER puis figée, garde contre le double-clic ; conséquence (`data-role="feedback"`, `data-verdict="none" | "expected" | "other"`) balayée à `actedAt` ; CONTINUER (`data-role="continue"`) à `continueAt` (par défaut `actedAt`), jamais avant la fin de la narration d'entrée (fournie par le lecteur dans le contexte `SceneClock`, `{ narrationEnd }` en secondes de scène ; 0 hors lecteur) ; verdict seulement si `verdict` ET `exercise.expected`. Clavier : flèches et lettres dans la liste, Tab jusqu'à VALIDER, Entrée ou Espace. Signature bimaccess : VALIDER et CONTINUER (action-button, poignées) sont rendus dans la zone d'action de `SceneRoot` (portail React, bas droite) : hors `SceneRoot`, ils restent sous le panneau ; ils arrivent après le contenu de la scène dans l'ordre de tabulation ; rétroaction selon feedback-panel (`bim-feedback is-info` sans verdict, `is-right` attendue, `is-review` autre).

### Exercice (`exercise.ts`, logique pure)

`ChoiceState = { selected: string | null, validated: boolean }`, `ChoiceAction = { type: "select", key } | { type: "validate" }`, `select(key)`, `validate()`, `initialChoice`, `exerciseOf(sceneId)` (`TextError` si absent), `reduceChoice(exercise, state, action)`, `restore(exercise, raw)` (tolérant), `statusOf(state)`, `triggersOf(prev, next, clips)` (clips seulement sur non validé → validé), `verdictOf(exercise, state, wanted)`, `choiceExercise(sceneId, { events })` → `SceneModel<ChoiceState, ChoiceAction>` (Suivant permis quand validé ET clips déclenchés entendus ET narration d'entrée finie : valider tôt ne coupe jamais la narration).

### Scènes et leçon (`scene.ts`, `types.ts`)

```ts
defineScene({ id, clip?: Voice, events?: string[], intro?: number, exercise?: SceneModel, model?: SceneModel, View })
defineLesson({ scenes: [s01, s02, s03] })
```

- `SceneModel<S, A> = { initial, reduce(state, action), restore(raw), status({ state, narrationDone, eventsDone }) → { nextAllowed, completed }, triggers?(prev, next) → clipIds }`. Sans `exercise` ni `model` : scène narrée (Suivant libre à la fin de la narration). Quel que soit le modèle, le lecteur exige en plus `narrationDone` pour Suivant et pour « terminée ».
- `SceneViewProps<S, A>` reçues par `View` : `state`, `send(action)`, `revisit`, `actedAt` (secondes de scène ou null), `eventStart(clipId)` (secondes de scène ou null), `next()` (= Suivant, s'il est permis), `hasNext`.
- `defineScene` lève `LessonError` / `TimelineError` au chargement si une narration du storyboard de la scène n'est pas branchée (`clip`, `events`), si le storyboard a un exercice et la scène aucun, si des clips déclenchés n'ont pas de logique qui les demande, si un clip appartient à une autre scène. `defineLesson` lève `LessonError` si une scène manque, est en trop, en double ou hors de l'ordre du storyboard.
- Thème et réglages : `THEME` et `META` sont réexportés par `../../engine` (`import { THEME } from "../../engine"` ; une scène n'importe jamais `../../generated/`).
- Règles : racine `SceneRoot` ; `data-board` = identifiant de l'état affiché (`S03-1`, `S03-FIN`) ; `data-testid` préfixés `sNN-` ; aucun texte littéral (tout vient de `sceneTexts`, `exerciseOf`, `asset`).

## 5. Lecteur : `src/player/`, `src/main.tsx`, `src/i18n.ts`

- Coque (`App.tsx`) : en-tête (titre du contenu, titre de la scène `data-testid="scene-title"`, position `03 / 07` en `data-testid="position"` ; bimaccess : barre d'état, § 9) ; scène (`Stage.tsx` : `<Player>` Remotion, `controls={false}`, `clickToPlay={false}`, `spaceKeyToPlayOrPause={false}`, `moveToBeginningWhenEnded={false}`, cinq éléments audio partagés) ; pied (`Controls.tsx`) : `previous`, `narration-toggle` (`aria-label` lire / mettre en pause, `aria-pressed`), `narration-scrub` (curseur, valeur = image), `captions-toggle` (`aria-pressed`), `next`, et `next-locked` (cadenas) tant que Suivant n'est pas permis.
- Démarrage : écran `data-testid="start-screen"`, bouton `data-testid="start"` (« Lancer », « Reprendre » si une progression existe) ; son clic appelle `play(event)` du lecteur, ce qui débloque l'audio. Ensuite chaque scène démarre seule à l'entrée. **Jamais d'avance automatique.** Après la dernière scène, Suivant (« Terminer ») ou CONTINUER ouvre l'écran `data-testid="end"` (bouton `restart` : progression effacée, retour à la scène 1).
- Une seule composition (`composition.tsx`, `LessonComposition`) rend la scène courante : sa vue, sa narration d'entrée (`<Sequence from={voiceStart}>` + `<Html5Audio>`), ses clips déclenchés audibles, les sous-titres. L'état descend par `inputProps` ; `send` et `next` remontent par `RuntimeContext`, fourni au-dessus du `<Player>`.
- Horloge (`schedule.ts`) : durée = max(fin de la narration d'entrée, fin des clips déclenchés, dernier geste `actedAt` + 1 s) + `tail` ; sans narration d'entrée, `intro`. Un geste fait à la dernière image (exercice sans clip déclenché validé après la narration) allonge la scène et relance la lecture : la conséquence et CONTINUER ont le temps d'être balayés. Un clip déclenché part à l'image de la demande, au plus tôt 0,4 s après la narration d'entrée ou après le clip déclenché précédent (jamais deux voix à la fois).
- Statut : `narrationDone` = l'image atteinte **dans la visite** a dépassé la fin de la narration d'entrée (le curseur amené à la fin compte) ; `eventsDone` = tous les clips demandés entendus en entier. Suivant permis si la scène est déjà terminée ou si `status().nextAllowed` ET `narrationDone`. Scène terminée (`status().completed` ET `narrationDone`) → notée `completed`.
- Visite : chaque entrée dans une scène (Suivant, Précédent, adresse, « Recommencer », chargement) ouvre une visite ; l'image courante et l'image atteinte sont rattachées à elle (`{ key, frame, reached }`). Jusqu'à l'entrée effective, la position vaut l'image de départ (0, ou la dernière image en revisite) : une image rapportée pour la scène quittée ne libère jamais Suivant, ne marque jamais un clip entendu, ne note jamais une scène terminée.
- Clip déclenché : à l'action qui le demande (`triggers`), le lecteur note l'image courante, la durée s'allonge et la lecture continue ; entendu en entier (image de la visite courante au-delà de sa fin), il est noté dans `heard` et n'est plus jamais audible (il reste placé : l'image finale le montre).
- Progression (`progress.ts`) dans `localStorage["studio.<META.id>"]` : `{ version: 1, last, captions, scenes: { S03: { visited, completed, state, requested: { "S03-02": image }, heard: [], actedAt } } }`. Lectures et écritures en try/catch ; données abîmées ignorées champ par champ ; champs valides mais contradictoires corrigés à la lecture (un `actedAt` postérieur à la première demande de clip déclenché est ramené à elle) ; sans stockage, la progression vit en mémoire.
- Revisite d'une scène terminée : ouverte à sa dernière image, en pause, état restauré, aucun clip déclenché audible.
- Adresse `#/3` = scène 3 (tenue à jour pendant la navigation). Choix assumé : l'adresse ouvre la scène même si les précédentes ne sont pas terminées (lien partagé, reprise, tests) ; elle saute donc le verrou de Suivant des scènes d'avant. Un contenu qui doit imposer l'ordre ne doit pas diffuser ces adresses. Clavier : Espace (lecture/pause, hors bouton et champ), flèches gauche/droite (précédent, suivant si permis ; ignorées dans un champ et dans une liste de choix).
- Sous-titres : actifs par défaut quand la scène n'a pas de voix ; le choix de l'apprenant est conservé (`captions`). Ils s'effacent 0,5 s après la dernière phrase : l'image finale reste la composition.
- Attributs de `data-testid="stage"` : `data-stage-ready` (« true » quand la scène courante est montée), `data-scene`, `data-frame`, `data-duration`, `data-narration-end` (image de fin de la narration d'entrée), `data-playing`, `data-voice` (audio de la narration d'entrée ou vide), `data-events` (JSON `[{ id, start, audible, src }]`), `data-next` (`open` / `locked`), `data-completed`, `data-revisit`.
- Thème : `main.tsx` pose `data-signature` sur `<html>` et `THEME` en variables CSS (`--c-*` pour chaque couleur, `--c-program` en bimaccess et carte, `--f-*`, `--radius` (0 en bimaccess et carte), `--ratio`, `--comp-w`) ; `player.css` met la scène à l'échelle de la fenêtre et, sous 720 px de large, passe les contrôles sur deux lignes ; `player-bimaccess.css` habille la coque et les composants en signature bimaccess, `player-carte.css` en signature carte.
- Écrans étroits : la composition 1920 × 1080 est réduite à l'échelle de la fenêtre. Tenue à la verticale (390 px), elle fait environ 0,19 de sa taille (texte de 32 px ≈ 6 px) : un bandeau `data-testid="narrow-hint"` propose de tourner l'appareil et, si le navigateur le permet, un bouton `data-testid="fullscreen"` (plein écran, verrouillage à l'horizontale tenté). À l'horizontale sur téléphone (hauteur ≤ 540 px et largeur ≤ 940 px) ou en plein écran : plus d'en-tête, contrôles sur une ligne, la scène prend la hauteur (844 × 390 → environ 0,29, texte de 32 px ≈ 9 px). Limite connue : le contenu se lit confortablement à partir d'environ 1000 px de large ; un écran de téléphone reste un usage de secours.
- Libellés d'interface : `src/i18n.ts` seulement (`L.start`, `L.next`, `L.submit`, `L.continue`, `L.captions`…), français ou anglais selon `META.lang`.

## 6. Grammaire d'animation

Aucune apparition en fondu d'opacité : balayages, traits tracés à vitesse constante, frappe à cadence fixe, mouvements géométriques. L'image devance la voix : chaque apparition est à l'écran au plus tard au début de la phrase qui la dit (repère ou locution pris au début de la phrase, jamais un instant écrit à la main ; seul 0, le début de la scène, s'écrit). Une seule mise en évidence à la fois, avec poignées (`focusAt`) ; le choix sélectionné d'un exercice n'en est pas une (bord plein, jamais de tireté ni `data-highlight` ; poignées de quiz-choice en bimaccess). Une illustration se révèle d'un seul balayage, ou partie par partie sur leurs mots (`<Svg parts>`, groupes nommés du SVG). Pas de longue scène vide au début. L'image finale d'une scène est sa composition finale. Jamais d'avance automatique. Aucun verdict en mode conséquence.

## 7. Démo livrée

« Pompe à chaleur : comment elle chauffe », sans voix, en signature bimaccess (programme CER001) : `content/brief.md`, `content/storyboard.md`, `content/design/theme.json`, `content/design/spec.md`, `content/design/assets/maison.svg` (élévation au trait), `content/beats.json`, `src/lesson/lesson.ts` et trois scènes modèles : `s01.tsx` (narrée simple : titre display, illustration déclarée par `illustration("maison", […])` dont deux groupes se révèlent sur leurs mots avec `parts`, trois idées, deux lignes de repère `Callout`), `s02.tsx` (titre display, mur en coupe hachurée, deux cotes de zone `Dimension`, schéma du cycle tracé sur la voix, accrochages, une mise en évidence à la fois), `s03.tsx` (titre display, exercice en mode conséquence, VALIDER et CONTINUER dans la zone d'action, narration déclenchée).

## 8. Scripts

- `npm run sync` : § 3. `npm run check` : sync et chargement des scènes (`--scenes`) puis `tsc --noEmit`. `npm run check:scenes` : sync et chargement des scènes seuls. `npm run build` : sync et chargement des scènes puis `vite build`. `npm run preview` : sert `dist/` sur le port 4173. `npm run dev` : sync puis serveur de développement.
- `npm run test:play` (`scripts/play-check.mjs`) : ouvre `dist/index.html` en `file://` (et `--url <adresse>` en plus ; `--only-url` pour l'adresse seule) et vérifie : « Lancer » ; pour chaque scène `data-stage-ready`, position, démarrage seul, voix réellement jouée (élément audio sans erreur, temps qui avance), Suivant verrouillé puis libre (curseur à la fin), `data-board`, texte non sélectionnable ; exercices au clavier (premier passage, Tab d'un choix à VALIDER) puis à la souris (scène ouverte par `#/n`, progression effacée, geste dès que les choix sont actifs : VALIDER présent avec eux, Suivant et CONTINUER absents tant que la narration d'entrée n'est pas finie), clip déclenché demandé une seule fois, joué, jamais rejoué, toujours à entendre après un aller-retour vers la scène la plus longue ; conséquence et CONTINUER entièrement visibles à la dernière image ; écran de fin ; rechargement qui restaure (scène, état, dernière image, pause, aucune voix) ; Précédent et flèche droite ; « Recommencer » : première scène verrouillée et non terminée ; scène neuve ouverte juste après la fin de la plus longue : verrouillée et non terminée ; progression contradictoire (geste après le clip) affichée sans erreur ; écran étroit (390 px) sans défilement horizontal, bandeau « tournez l'appareil » ; téléphone à l'horizontale (844 × 390) sans en-tête, scène sur au moins 70 % de la hauteur ; fenêtres d'ordinateur basses (960 × 540, 1280 × 520) avec titre de scène et position visibles ; une mise en évidence au plus à la fois (`[data-highlight="on"]` visibles), sur toute la durée de chaque scène (balayage image par image, pas de 8 images, exercice validé et clip déclenché compris) et juste après la validation ; aucune erreur de console ou de page ; aucun appel réseau externe. `--shots <dossier>` : capture de l'état final de chaque scène (`s01-fin.png`…), de l'écran étroit (`ecran-etroit.png`) et du téléphone à l'horizontale (`telephone-horizontal.png`). Un seul Chromium à la fois sur la machine : verrou `studio-chromium.lock` dans le dossier temporaire du système (`scripts/lib/chromium-lock.mjs`, avec le PID ; périmé si le processus n'existe plus) ; si un autre outil le tient, attente jusqu'à `--wait-lock <s>` (600 par défaut ; `--no-wait` : aucune). Codes de sortie : 0 tout passe ; 1 au moins un échec, ou `dist/index.html` absent ; 2 environnement (aucun Playwright utilisable, ou verrou toujours tenu à la fin de l'attente) : rien n'a été vérifié. Playwright : `--from <dossier>`, puis le projet et ses parents, puis `npm root -g` ; le premier dont Chromium démarre est retenu (`--chromium <chemin>` ou `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` pour le navigateur).
- `npm run voice`, `npm run lint:story` : scripts des rôles Voix et Scénariste (`docs/voice.md`) ; choix de la voix : `npm run voice -- voices [--lang fr]`, puis `npm run voice -- try "<phrase>" --voice <voice_id>`.
- `scripts/new-project.mjs` (au niveau du plugin) : copie le template sans `node_modules`, `dist`, `src/generated`, puis `npm install`.

## 9. Signature

La signature graphique se choisit dans `studio.config.json` et ne change que la présentation : mêmes props, mêmes `data-testid`, `data-role` et `data-board`, même comportement (verrou de Suivant, Lancer, progression, clavier, écrans étroits).

### Clés

| Clé (`studio.config.json`) | Valeurs | Effet |
|---|---|---|
| `signature` | `"bimaccess"` (défaut), `"carte"` ou `"neutral"` ; autre valeur : échec de sync | thème par défaut, polices embarquées, coque, rendu des composants |
| `program` | code en majuscules et chiffres (`"CER001"`), facultatif | affiché dans la barre d'état (sauf si `id` commence déjà par lui) et sur l'écran « Lancer » ; donne la couleur de programme |
| `programColor` | `"#RRVVBB"`, facultatif | couleur d'un programme absent de la table, ou qui la remplace (avertissement) |

Table des programmes (`scripts/sync.mjs`, d'après `DESIGN.md` § 2) : `CER001` → cyan ACI 4 `#0096C7`. Un autre code sans `programColor` fait échouer la sync, avec la couleur suivante à prendre (3 vert `#00A64F`, 6 magenta `#C800C8`, 1 rouge `#E0261B`, 2 or `#D99A00`). Exposé dans `META.signature`, `META.program`, `META.programColor` ; `BIM` et `CARTE` (booléens) et `PROGRAM_COLOR` (couleur de programme, sinon `accent`) par `../../engine`.

### Jetons (signature bimaccess)

Thème par défaut = jetons de `design-system/DESIGN.md` § 2 et § 3, copiés dans `content/design/theme.json` (le graphiste peut le modifier ; `"signature": "bimaccess"` y marque le thème de cette signature) :

| Clé du thème | Jeton | Valeur |
|---|---|---|
| `background` | paper | `#FFFFFF` |
| `panel`, `panel2` | panel, panel-2 | `#F4F6F8`, `#E9ECF0` |
| `gridDot`, `lineSoft`, `line`, `lineFaint` | grid-dot, line-soft, line, line-faint | `#D3D8DF`, `#D5DAE1`, `#C4CAD2`, `#E6E9ED` |
| `ink`, `ink2`, `muted` | ink, ink-2, ink-3 | `#111418`, `#4A525D`, `#5E6773` |
| `accent` | couleur de programme | `#0096C7` (CER001) |
| `accent2`, `gold` | aci-2 or (puces, accrochages) | `#D99A00` |
| `goldText` | or lisible (en-tête « à revoir », feedback-panel) | `#8A6200` |
| `success`, `green` | aci-3 vert | `#00A64F` |
| `red`, `yellowFill`, `cyan`, `blue`, `magenta` | aci-1, aci-2 jaune (remplissage seulement), aci-4, aci-5, aci-6 | `#E0261B`, `#FFD400`, `#0096C7`, `#1F6BFF`, `#C800C8` |
| `grip`, `gripHover`, `gripHot` | poignée, survolée, chaude | `#1F6BFF`, `#FF6FD8`, `#FF2A2A` |
| `selectBg`, `tooltip` | select-bg, infobulle d'accrochage | `#E3EDFB`, `#FFFFC8` |
| `shadow` | ombre décalée des panneaux | `rgba(17, 20, 24, 0.08)` |
| `fonts.display`, `fonts.mono` | Azeret Mono | 200, 300, 400, 500 embarquées |
| `fonts.body` | IBM Plex Sans | 400, 500, 600 embarquées |
| `fonts.paper` | Fraunces (espace papier) | 300, 600, 600 italique, embarquées seulement si une scène emploie `fonts.paper` ou « Fraunces » (ou un SVG « Fraunces ») |
| `radius` | aucun coin arrondi | 0 (une autre valeur est ignorée, avertissement) |
| `grid` | pas de la grille de points (px de composition) | 24 (0 : aucune grille) |

Polices : sous-ensemble latin des paquets `@fontsource` (woff2), `font-display: block`, en ligne dans `dist/index.html` (environ 150 ko) ; aucune requête réseau, la page reste lisible en `file://`.

### Composants

| Élément | Rendu bimaccess | Composant de la charte |
|---|---|---|
| Coque | cadre centré d'un seul bloc : barre d'état de 28 px (fond `panel2`, Azeret Mono 12 px : pastille et code du programme, code de scène `<id>-<Sxx>` en `data-testid="scene-code"`, titre de la scène, barre de progression à la couleur du programme, position `03 / 07`), scène à filet `line`, barre de contrôles (`panel`) ; fond de page blanc ; écrans Lancer et Fin en feuille à angles droits et ombre décalée, eyebrow du programme | scene-frame.html |
| Boutons de la coque | Azeret Mono 12 px en MAJUSCULES, filet encre, quatre poignées de 8 px ; principal (Suivant, Lancer, Recommencer) plein encre ; survol : bord et poignée haute droite roses ; actif : rouge, poignée basse droite blanche ; inactif ou verrouillé : gris, poignées grises, cadenas au trait ; sous-titres actifs : fond `selectBg`, bord `grip` ; focus : tireté `grip` ; curseur de narration : filet de 3 px rempli à la couleur du programme, poignée carrée | grip-button.html, action-button.html |
| Scène | fond blanc, grille de points, icône SCU, zone d'action en bas à droite | scene-frame.html |
| `Title` | Azeret Mono 200, MAJUSCULES par le style, interlettrage -0,03 em, interligne 1,02 | échelle display § 3 |
| `Bullets` | IBM Plex Sans 500, puce = accrochage « extrémité » or | accrochages § 6 |
| `Diagram` | cadres au trait de 3 px sur fond blanc, libellés Azeret Mono 32 px en MAJUSCULES, liaisons de 3 px à bouts nets, accrochage or au départ de chaque liaison pendant son tracé puis à l'arrivée (0,4 s) | § 7, § 9 (réticule) |
| `Trace` | bouts nets (`butt`), angles vifs (`miter`) | § 7 |
| `Highlight`, `HighlightRect` | tireté 2 px et poignées pleines `grip` | § 5, poignées |
| `Callout` | ligne de repère : point, oblique, palier, texte Azeret Mono, encre | leader.html |
| `Dimension`, `Osnap` | cote cyan à traits obliques ; marqueurs d'accrochage | dimension.html, assets/icons/osnap-*.svg |
| `ChoicePanel` | question IBM Plex Sans 600 40 px ; choix : touche mono sur `panel`, texte 32 px, filet `line`, survol rose, sélection bord `grip` et poignées, choix non retenus en `ink-3` après validation, réponse attendue : accrochage ■ ; rétroaction : filet haut 4 px (cyan information, vert attendue, or à revoir), en-tête mono, ombre décalée ; VALIDER (principal) et CONTINUER (retour ↵ dessiné) à poignées dans la zone d'action | quiz-choice.html, feedback-panel.html, action-button.html |
| `Captions` | bandeau blanc à filet `line`, filet haut encre, IBM Plex Sans 34 px, mots à venir en `ink-3`, 1 180 px de large au plus | sobriété § 4 |
| Libellés (`src/i18n.ts`) | en-têtes de rétroaction « Réponse attendue », « À revoir » (en : « Expected answer », « To review ») ; MAJUSCULES par le style ; aucun tiret cadratin | feedback-panel.html |

Classes CSS des composants de scène (`player-bimaccess.css`, en pixels de composition) : `bim-btn` (`is-primary`), `bim-g` (`tl`, `tr`, `bl`, `br`), `bim-choice` (`is-selected`, `is-dimmed`, `bim-choice-key`, `bim-choice-txt`, `bim-choice-mark`), `bim-feedback` (`is-info`, `is-right`, `is-review`, `bim-feedback-head`, `bim-feedback-body`), `bim-sr`.

### Règles appliquées par le code, règles laissées à l'auteur

Le code garantit : fond blanc et grille, polices de la charte en ligne, aucun coin arrondi ni ombre floue, poignées et états des boutons, une seule mise en évidence visible (`test:play`), choix et rétroaction de la charte (jamais de rouge pour un verdict), boutons de scène en bas à droite, barre d'état avec code de scène, libellés d'interface sans tiret cadratin.

Reste à l'auteur, dans `storyboard.md`, `spec.md` et les illustrations : titres display de six mots au plus, terminés par un point ; une couleur = une fonction (à écrire dans `spec.md`) ; dessins au trait (plan, coupe, élévation), cinq étiquettes au plus par schéma ; SVG aux couleurs des jetons, sans dégradé, flou ni coin arrondi, traits à bouts nets ; jamais de tiret cadratin ; noms d'entités IFC seulement dans un contenu qui les enseigne ; rien d'important sous les sous-titres (y ≥ 880) ni dans la zone d'action ; `ChoicePanel` dans `SceneRoot`.

### Signature carte

`"signature": "carte"` : signature « carte topographique », la scène est une feuille de carte imprimée. Thème par défaut = jetons de la charte (noms en camelCase) ; les clés communes en sont dérivées par `sync.mjs` après la fusion avec `theme.json`, sauf celles que `theme.json` donne lui-même :

| Clé commune | Jeton | Valeur par défaut |
|---|---|---|
| `background` | fond | `#F1F3EC` |
| `panel`, `tooltip` | papier | `#FBFCF8` |
| `ink`, `success`, `goldText`, `gripHot` | encre (aucune couleur de verdict ; le libellé du manque en encre) | `#23281F` |
| `ink2`, `muted` | encre2 | `#545B4C` |
| `line`, `gridDot` | carroyage | `#7D8576` |
| `accent`, `cyan`, `blue`, `grip`, `gripHover` | lecture (mise en évidence, choix sélectionné, focus) | `#2F6DA8` |
| `selectBg` | lectureFond | `#E3ECF4` |
| `accent2`, `red` | ecriture | `#C4472B` |
| `gold`, `yellowFill` | manque, manqueFond | `#C99700`, `#FBF1C8` |
| `green` | terme | `#1E6E3C` |
| `magenta` | lien | `#7A4A22` |
| `panel2`, `lineFaint` | survol | `#E5E9DD` |
| `lineSoft` | verrouTrait | `#A3AA9B` |
| `shadow` | aucune ombre | `rgba(0, 0, 0, 0)` |
| `fonts.body`, `fonts.display`, `fonts.paper` | serif : Source Serif 4 | 400, 600, italiques 400 et 600 embarquées |
| `fonts.mono` | capitales : Barlow Condensed | 500, 600 embarquées |

Autres jetons, sous leur nom seulement : `relief`, `reliefMaitresse`, `chaussee`, `eauFond`, `vegetation`, `vegetationFond`, `imageClair`, `imageFonce`, `lienSurvol`. `radius` 0, `grid` 0. La couleur de programme n'est pas un jeton de scène (`META.programColor`, barre d'état seulement).

| Élément | Rendu carte |
|---|---|
| Coque | cadre centré d'un seul bloc ; valeurs de la charte en pixels de composition, mises à l'échelle de la scène (`--u`), avec un plancher de lisibilité : en-tête de feuille de 44 px (Barlow 500 23 px en capitales, 0,12 em, filet double dessous : pastille du programme, programme, code de scène `data-testid="scene-code"`, titre de la scène en serif italique, échelle graphique `data-testid="progress-scale"` (une case par scène : terminées en encre, courante en couleur de programme, à venir en papier), position `03 / 08`), scène sans filet ni ombre, barre de contrôles sous filet double ; écrans Lancer et Fin en cartouche |
| Boutons de la coque et de la scène | cartouche : Barlow 600 26 px (LANCER 34 px) en capitales, 0,24 em, bordure 2 px et contour 1 px décalé de 3 px ; repos papier, survol `panel2`, actif (et sous-titres actifs) encre pleine, verrouillé gris (`lineSoft`) ; focus trait plein `accent` 3 px ; curseur de narration en petite échelle, cadenas au trait |
| Scène | fond, feuille (cadre 2 px en 34, bordure graduée en damier de 12 px à cases de 76 px, filets à 46 et 58, carroyage tous les 228 px depuis x 274, y 236), zone d'action `data-zone="actions"` x 1454, y 834, 360 × 140 |
| `Title` | serif 600, 66 px, -0,01 em, interligne 1, filet double de 300 px tracé avec la frappe |
| `Bullets` | serif 400, 30 px, puce en aplat carré d'encre |
| `Diagram` | feuilles : bordure 2 px sur `panel`, contour 1 px décalé de 3 px ; libellés Barlow 600 26 px en capitales, 0,24 em ; liaisons d'encre 2,5 px |
| `Trace` | bouts nets (`butt`), angles vifs (`miter`) |
| `Highlight`, `HighlightRect` | tireté `accent` 2,5 px, motif 10 6, sans poignée ni fond ; rectangle à 10 px ou cercle ; tracé en 0,25 s avec `at` |
| `Callout` | point 4 px, oblique, palier, encre 1,5 px, mot tapé en serif 30 px |
| `ChoicePanel` | panneau cartouche (`carte-panel`) qui se déroule avec la question (serif 600 32 px) ; choix serif 28 px à lettre en capitales dans une case ; sélection : bord plein `accent` 3 px, fond `selectBg`, lettre pleine ; rétroaction dans le panneau, sous filet double, en-tête en capitales, encre sur papier ; VALIDER et CONTINUER (`carte-btn`) dans la zone d'action |
| `Captions` | bandeau `panel`, filet 2 px dessus et 0,8 px dessous, serif 34 px, x 104, bas à y 1000, 1 180 px au plus |

Classes CSS des composants de scène (`player-carte.css`, en pixels de composition) : `carte-btn`, `carte-panel` (`carte-panel-question`), `carte-choices`, `carte-choice` (`is-selected`, `is-dimmed`, `carte-choice-key`, `carte-choice-txt`, `carte-choice-mark`), `carte-feedback` (`carte-feedback-head`, `carte-feedback-body`), `carte-sr`.

### Signature neutre

`"signature": "neutral"` : rendu d'origine du template, à l'identique (thème neutre par défaut : fond papier `#F4F1EA`, polices système, rayon 10 ; aucune police embarquée ; composants et coque d'origine). Un `theme.json` marqué `"signature": "bimaccess"` est alors ignoré (avertissement) : retirer cette clé ou écrire un thème neutre.
