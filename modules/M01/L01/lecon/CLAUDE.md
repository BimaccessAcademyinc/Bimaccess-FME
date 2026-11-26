# Projet studio : contenu narré et interactif

Ce projet produit un contenu narré et interactif (formation, présentation, explication) et le construit en **une page HTML autonome**, `dist/index.html`, qui s'ouvre partout, y compris directement depuis le disque. Les scènes sont des compositions Remotion jouées par un lecteur React : elles se déroulent comme une vidéo bien montée, mais restent interactives et modifiables.

À lire en entier avant toute tâche. Le contrat détaillé du lecteur est `docs/player-contract.md` : il fait foi.

Signature graphique par défaut de ce template : **`bimaccess`**, la signature « CAD 2D » de BIMaccess (§ 6). `"signature": "neutral"` dans `studio.config.json` redonne la signature neutre d'origine.

## 1. Où sont les choses

```
studio.config.json          id, titre, langue, signature, programme, fps, taille, voiceStart, tail, intro, chemins, licence Remotion
content/                    SOURCES DE VÉRITÉ du contenu
  brief.md                  besoin, public, durée, ton, langue
  storyboard.md             scènes « # S01 · Titre », textes à l'écran, narrations, exercices
  beats.json                repères : { "S01-01": { "cle": "locution dite mot pour mot" } }
  design/theme.json         couleurs (jetons de la signature), polices, rayon, grille, cadence de frappe
  design/spec.md            composition et états de chaque scène, sur quels mots
  design/assets/*.svg       illustrations
  voice/voice-manifest.yaml + voice/Sxx/Sxx-yy.mp3 + .alignment.json   voix (facultative)
src/
  generated/                GÉNÉRÉ par npm run sync : ne jamais éditer
  engine/                   moteur de scènes (temps, locutions, animation, composants, exercices)
    bimaccess.tsx           rendu des composants dans la signature bimaccess
    cad.tsx                 grammaire CAD : accrochages (Osnap), cotes (Dimension)
  player/                   lecteur (coque, contrôles, progression, horloge, composition Remotion)
    player.css              coque, signature neutre et base commune
    player-bimaccess.css    coque et composants de la signature bimaccess
  lesson/lesson.ts          liste des scènes, dans l'ordre du storyboard
  lesson/scenes/sNN.tsx     une scène par fichier
  i18n.ts                   libellés d'interface fr / en (Lancer, Suivant, Valider…)
  main.tsx                  thème en variables CSS, signature, polices, chargement du lecteur
scripts/
  sync.mjs                  content/ → src/generated/ + public/audio/ ; échoue sur une source fausse
  play-check.mjs            parcours complet dans un vrai navigateur (file:// et --url)
  voice.mjs, lint-storyboard.mjs   voix ElevenLabs, contrôle du storyboard (rôles Voix et Scénariste)
docs/player-contract.md     contrat du lecteur (API exacte, attributs de test)
dist/                       page construite (index.html + audio/) : ce qu'on livre
```

## 2. Commandes

| But | Commande |
|---|---|
| Installer | `npm install` |
| Régénérer `src/generated/` depuis `content/` | `npm run sync` |
| Types (sync, chargement des scènes, puis `tsc` ; doit finir sans erreur) | `npm run check` |
| Chargement des scènes seul (locutions, ordre, textes) | `npm run check:scenes` |
| Construire `dist/index.html` (sync et chargement des scènes d'abord) | `npm run build` |
| Servir la page construite (port 4173) | `npm run preview` |
| Développer (rechargement à chaud) | `npm run dev` |
| Parcours complet en file:// | `npm run test:play` |
| Idem, servi, avec captures | `npm run test:play -- --url http://localhost:4173/ --shots /chemin/captures` |
| Voix, contrôle du storyboard | `npm run voice`, `npm run lint:story` |

- Toute modification de `content/` passe par `npm run sync` (inclus dans `check`, `build`, `dev`).
- `check` et `build` chargent aussi les scènes (`sync --scenes`) : une locution introuvable ou ambiguë dans un `said(…)`, un ordre rompu, un nombre de textes changé les font échouer avec l'erreur nommée, sans construire de page.
- `test:play` exige une construction à jour (`npm run build` d'abord). Playwright n'est pas une dépendance du projet : il est cherché dans `--from <dossier>`, puis le projet, puis l'installation globale de npm ; `--chromium <chemin>` désigne le navigateur. Codes : 0 conforme, 1 échec, 2 environnement (Playwright absent, ou autre Chromium toujours actif : rien n'a été vérifié). Un verrou machine (`scripts/lib/chromium-lock.mjs`) fait attendre la fin d'un autre Chromium (`--wait-lock <s>`, `--no-wait`).
- `sync` refuse un SVG mal formé (fichier et ligne), une illustration ou un groupe nommés dans une scène et absents de `content/design/assets/`, une `signature` autre que `bimaccess` ou `neutral`, un `program` mal écrit ou sans couleur connue (sans `programColor`), un `programColor` qui n'est pas `#RRVVBB`.
- Un serveur lancé en arrière-plan s'arrête par son PID, jamais par `pkill -f`. Un seul navigateur de test à la fois, et le fermer.

## 3. Sources de vérité et rôles

| Quoi | Source | Qui la change |
|---|---|---|
| Textes à l'écran, narrations, exercices | `content/storyboard.md` | Scénariste |
| Couleurs, polices, illustrations, composition | `content/design/` | Graphiste |
| Voix, alignements | `content/voice/` | Voix (`ELEVENLABS_API_KEY` dans l'environnement seulement : jamais écrite, affichée ni journalisée) |
| Instants des animations | `content/beats.json` + locutions dans les scènes | Code |
| Scènes | `src/lesson/` | Code |
| Moteur, lecteur, scripts | `src/engine/`, `src/player/`, `scripts/` | personne pendant la production : un défaut se signale |
| `src/generated/`, `public/audio/`, `dist/` | dérivés | personne : on change la source et on relance |

Le contenu écrit par l'utilisateur ne se change jamais en silence : une proposition se présente, l'utilisateur tranche. Les fichiers font foi, pas l'historique de conversation.

## 4. Écrire une scène

Chaque scène importe le moteur par `../../engine`. Aucun texte visible n'est écrit dans une scène ; aucun instant n'est écrit à la main (seul `0`, le début de la scène).

### Scène narrée

```tsx
import { Bullets, defineScene, focusAt, ordered, SceneRoot, sceneTexts, Svg, Title, tid, useT, voice } from "../../engine"

const ID = "S01"
const X = sceneTexts(ID, { screen: 4 })      // TextError si « ## Écran » n'a plus 4 textes
const V = voice("S01-01")                    // narration d'entrée, placée à META.voiceStart
const T = ordered(                           // OrderError si l'ordre de la narration casse
  { title: V.said("Une pompe à chaleur ne fabrique"), prend: V.b("prend"), concentre: V.b("concentre") },
  ID,
)
const BOARDS = [{ at: 0, on: "S01-1" }, { at: T.prend, on: "S01-2" }, { at: T.concentre, on: "S01-FIN" }] as const

function View() {
  const t = useT()
  return (
    <SceneRoot id={ID} board={focusAt(BOARDS, t) ?? "S01-1"}>
      <div style={{ position: "absolute", left: 120, top: 120 }}><Title text={X.screen(0)} at={T.title} /></div>
      <Bullets style={{ position: "absolute", left: 120, top: 420 }} items={[{ text: X.screen(1), at: T.prend }, { text: X.screen(2), at: T.concentre }]} testIdPrefix={tid(ID, "idea")} />
      <Svg name="maison" at={T.prend} style={{ position: "absolute", left: 1060, top: 250, width: 760, height: 570 }} />
    </SceneRoot>
  )
}
export const s01 = defineScene({ id: ID, clip: V, View })
```

### Schéma tracé sur la voix, une mise en évidence à la fois

```tsx
import { Diagram, focusAt, THEME, useT } from "../../engine"   // THEME et META passent aussi par le moteur
const FOCUS = [{ at: T.evaporateur, on: "evaporateur" }, { at: T.compresseur, on: "compresseur" }, { at: T.fin, on: null }] as const
<Diagram width={1700} height={900} focus={focusAt(FOCUS, t)}
  nodes={[{ id: "evaporateur", x: 40, y: 380, w: 380, h: 130, label: X.screen(2), at: T.evaporateur }]}
  links={[{ id: "a-b", points: [[230, 380], [230, 195], [540, 195]], at: T.gaz, color: THEME.colors.accent2 }]} />
```

### Exercice avec narration déclenchée

```tsx
const EX = exerciseOf("S03")                 // « ## Exercice » du storyboard
const E = eventVoice("S03-02")               // instants relatifs au début du clip déclenché
const TE = ordered({ air: E.b("air"), end: E.end }, "S03 (S03-02)")

function View({ state, send, actedAt, eventStart, next }: SceneViewProps<ChoiceState, ChoiceAction>) {
  const ev = eventStart("S03-02")            // secondes de scène, null tant qu'il n'est pas demandé
  const at = (rel: number) => (ev === null ? Number.POSITIVE_INFINITY : ev + rel)
  return (
    <SceneRoot id="S03" board={state.validated ? "S03-2" : "S03-1"}>
      <ChoicePanel sceneId="S03" exercise={EX} state={state} send={send} at={T.question} actedAt={actedAt}
        continueAt={at(TE.end)} onContinue={next} verdict={false} style={{ position: "absolute", left: 110, top: 90 }} />
    </SceneRoot>
  )
}
export const s03 = defineScene({ id: "S03", clip: V, events: ["S03-02"], exercise: choiceExercise("S03", { events: ["S03-02"] }), View })
```

Suivant (et CONTINUER, qui s'affiche au plus tôt à la fin de la narration d'entrée) attend la validation, la fin des clips déclenchés ET la fin de la narration d'entrée : valider tôt ne coupe jamais la narration. Les choix et VALIDER arrivent ensemble à la fin de la frappe de la question.

Une autre interaction : `defineScene({ …, model: { initial, reduce, restore, status, triggers } })` (réducteur pur, relecture tolérante, statut `{ nextAllowed, completed }` calculé à partir de `{ state, narrationDone, eventsDone }`, clips déclenchés demandés sur une transition). Le lecteur exige en plus la fin de la narration d'entrée pour Suivant et pour « terminée ».

Puis déclarer la scène dans `src/lesson/lesson.ts`, dans l'ordre du storyboard (`defineLesson` refuse un oubli).

### Primitives disponibles

`useT`, `THEME`, `META`, `Wipe` (balayage), `Trace` (trait tracé, flèche, tireté), `TypeText` (frappe), `Highlight` / `HighlightRect` (contour tireté + poignées), `Grips` (poignées seules), `Move` (position, échelle), `Title`, `Bullets`, `Diagram`, `Svg` (avec `parts` : groupes du SVG révélés chacun sur ses mots) et `illustration("nom", ["groupe"])` (vérifiée au chargement), `Callout` (ligne de repère), `Dimension` (cote), `Osnap` (accrochage), `ChoicePanel`, `SceneRoot`, `tid`, `BIM`, `PROGRAM_COLOR`. Temps : `voice`, `eventVoice`, `.said`, `.saidEnd`, `.word`, `.b`, `.at`, `ordered`, `focusAt`, `prog`, `ease`, `typedUntil`. Props exactes : `docs/player-contract.md` § 4.

## 5. Grammaire d'animation

- Jamais de fondu d'opacité : balayage (`Wipe`), trait tracé à vitesse constante (`Trace`), frappe à cadence fixe (`TypeText`, `typingCps` du thème), mouvement géométrique (`Move`). Pas de rebond, pas d'apparition grossissante.
- L'image devance la voix : chaque apparition est à l'écran au plus tard au début de la phrase qui la dit, par un repère de `content/beats.json` (`V.b("cle")`) ou une locution dite mot pour mot (`V.said("…")`), pris au début de la phrase.
- Un décor présent dès la première image s'écrit `<Svg … at={0} dur={0}>` (avec `dur > 0`, l'image 0 reste vide).
- Une seule mise en évidence à la fois (`focusAt` + `Highlight`), contour tireté et poignées carrées ; le choix sélectionné d'un `ChoicePanel` n'en est pas une (bord plein, jamais de tireté ; en signature bimaccess il porte les poignées de quiz-choice, sans `data-highlight`). `test:play` le vérifie sur toute la durée de chaque scène.
- Pas de longue scène vide au début : le premier élément arrive sur les premiers mots.
- L'image finale d'une scène est sa composition finale (sans sous-titre) ; `data-board` nomme chaque état comme `content/design/spec.md`.
- Jamais d'avance automatique : seul l'apprenant passe à la suite (Suivant, CONTINUER).
- Mode conséquence (pas d'« Attendu ») : aucun verdict, la conséquence tient lieu de rétroaction.

## 6. Signature graphique

`studio.config.json` : `"signature"` (`"bimaccess"` par défaut, ou `"neutral"`), `"program"` (code de programme facultatif, ex. `"CER001"`) ou `"programColor"` (`#RRVVBB`, pour un programme sans couleur connue). `sync` les valide et les expose dans `META` (`signature`, `program`, `programColor`). Une scène ne teste pas la signature : elle passe par les composants du moteur et par `THEME`.

**bimaccess** : signature « CAD 2D » de BIMaccess. La référence est `design-system/DESIGN.md` du dépôt de la formation (fichier à lire, ce template n'en recopie que ce que le code applique). Le code applique :

| Règle de la charte | Où c'est fait |
|---|---|
| Jetons de couleur (`DESIGN.md` § 2) dans `theme.json` : `background` = paper `#FFFFFF`, `muted` = ink-3, `accent` = couleur du programme, `accent2` = or (puces, accrochages), `success` = vert ; `panel`, `panel2`, `gridDot`, `lineSoft`, `line`, `lineFaint`, `ink`, `ink2`, `red`, `gold`, `goldText`, `yellowFill`, `green`, `cyan`, `blue`, `magenta`, `grip`, `gripHover`, `gripHot`, `selectBg`, `tooltip`, `shadow` | `content/design/theme.json` (modifiable par le graphiste), défauts dans `scripts/sync.mjs` |
| Couleur de programme : CER001 = cyan `#0096C7` ; autre programme : `programColor` | `sync.mjs` (table des programmes) ; barre d'état, progression, curseur |
| Polices Azeret Mono (200 à 500) et IBM Plex Sans (400 à 600), en ligne dans la page, hors ligne ; Fraunces (espace papier) embarquée seulement si une scène emploie `fonts.paper` ou « Fraunces » | `sync.mjs` → `src/generated/fonts.css` (paquets `@fontsource`) |
| Fond blanc, grille de points de 24 px (`theme.grid`), icône SCU en bas à gauche | `SceneRoot` |
| Barre d'état mince de 28 px au-dessus de la scène : pastille et code du programme, code de scène `<id>-<Sxx>`, titre de la scène, progression, position | `App.tsx`, `player-bimaccess.css` |
| Aucun coin arrondi (`radius` ignoré), aucune ombre floue ; seule l'ombre décalée 6 × 8 px des panneaux et feuilles | `player-bimaccess.css`, `bimaccess.tsx` |
| Boutons à poignées carrées bleues, Azeret Mono ; survol rose, actif rouge, verrouillé gris ; focus en tireté bleu | coque : `player-bimaccess.css` ; scène : classes `bim-btn` |
| Titres display : Azeret Mono 200 en MAJUSCULES (par le style), interlettrage -0,03 em | `Title` |
| Puces = accrochage « extrémité » or ; liaisons de schéma qui partent d'un accrochage ; traits à bouts nets et angles vifs | `Bullets`, `Diagram`, `Trace` |
| Mise en évidence : tireté et poignées pleines `grip` ; une seule à la fois | `Highlight`, `HighlightRect` |
| Choix d'exercice selon quiz-choice (sélection = poignées bleues et bord plein, réponse attendue = accrochage ■), rétroaction selon feedback-panel (information cyan, attendue vert, à revoir or, jamais rouge), VALIDER et CONTINUER selon action-button dans la **zone d'action en bas à droite** de la scène | `ChoicePanel`, `SceneRoot` |
| Lignes de repère (point, oblique, palier, texte mono) et cotes (traits obliques, texte mono cyan) | `Callout`, `Dimension` |
| Sous-titres sobres : bandeau blanc à filet, Plex 34 px, 1 180 px de large au plus (la zone d'action reste libre) | `Captions` |
| Libellés d'interface sans tiret cadratin ; en-têtes de rétroaction « Réponse attendue », « À revoir » | `src/i18n.ts` |

Ce qui reste à l'auteur (le code ne peut pas le garantir) : titres display de six mots au plus, terminés par un point (le storyboard garde la casse, le style met en majuscules) ; une couleur = une fonction (chaleur, froid, cotes : à écrire dans `spec.md`) ; dessins au trait (élévation, coupe, plan), cinq étiquettes au plus par schéma ; illustrations SVG aux couleurs des jetons, sans dégradé ni coin arrondi ; jamais de tiret cadratin ; rien sous les sous-titres (y ≥ 880) ni dans la zone d'action (bas droite).

**neutral** : rendu d'origine du template (fond papier, polices système, coins arrondis), thème par défaut neutre. Un `theme.json` qui porte `"signature": "bimaccess"` ne s'applique pas à la signature neutre (avertissement de sync) : retirer la clé ou écrire un thème neutre pour l'adapter.

## 7. Règles

- Aucun texte littéral visible dans `src/lesson/` : tout vient de `sceneTexts`, `exerciseOf`, `asset`. Les libellés d'interface vivent dans `src/i18n.ts` seulement.
- Ne jamais éditer `src/generated/` ni `public/audio/` : changer `content/` puis `npm run sync`.
- Ne jamais affaiblir un garde-fou (`ordered`, `sceneTexts(…, { screen })`, échecs de `sync.mjs`, contrôles de `play-check.mjs`) pour faire passer une construction : corriger la source.
- Aucune étiquette de statut (brouillon, validé, publié…) dans les fichiers, les noms ou les messages.
- Aucun appel réseau à l'exécution (pas de `fetch`, pas de police ni de script distants) : la page doit marcher hors ligne et en `file://`. Les polices de la signature sont des paquets `@fontsource` mis en ligne dans la page par la construction ; une autre police s'ajoute de la même façon, jamais par un lien.
- Secret ElevenLabs : la variable d'environnement `ELEVENLABS_API_KEY` seulement ; jamais écrite dans un fichier, affichée ni journalisée.
- Licence Remotion : gratuite pour les particuliers et les structures de trois personnes au plus, licence d'entreprise au-delà. `acknowledgeRemotionLicense` de `studio.config.json` est la décision de l'utilisateur : un agent ne le passe jamais à `true`.
- Avant de dire « fini » : `npm run check`, `npm run build`, `npm run test:play` (et `--url` sur `npm run preview`), puis regarder les captures `--shots` et les comparer à `content/design/spec.md`.

## 8. Pièges connus

| Piège | Ce qui arrive | Parade |
|---|---|---|
| Locution introuvable ou ambiguë | `LocutionError` au chargement : `npm run check` et `npm run build` échouent (`[sync] ÉCHEC chargement des scènes : …`) | allonger la locution, la copier mot pour mot de ce qui est dit ; calculer les instants au niveau du module, pas dans `View` |
| Titre de scène mal écrit | `# S02`, `# S02 · ` (vide), `# S03 Titre` (sans séparateur), `# S2 · …` : la sync échoue | écrire `# S02 · Titre` |
| Lettre de choix en majuscule | `- C · …` ou `Attendu : B` : la sync échoue | lettres en minuscule : `- c · …`, `Attendu : b` |
| Adresse `#/3` | ouvre la scène 3 même si les précédentes ne sont pas terminées (choix assumé : lien, reprise, tests) | ne pas diffuser ces adresses si l'ordre doit être imposé |
| Téléphone tenu à la verticale | la composition 16:9 y fait environ un cinquième de sa taille (texte de 32 px ≈ 6 px) | bandeau « tournez l'appareil » et plein écran fournis par le lecteur ; à l'horizontale, environ 9 px : lisible de secours, confortable à partir d'environ 1000 px de large |
| Voix regénérée | les instants changent, des locutions disparaissent | relancer `npm run sync` (il imprime chaque repère), corriger `beats.json` et les `said(…)`, puis `test:play` |
| Prononciation adaptée | l'alignement dit « P zéro un » pour « P-01 » ; la sync avertit | ancrer les locutions sur des mots dits tels quels ; les sous-titres montrent ce qui est dit |
| Texte du manifeste ≠ storyboard | la sync échoue (« voix à regénérer ») | regénérer la voix, ne pas maquiller le texte |
| Nombre de textes d'« Écran » changé | `TextError` au chargement | mettre à jour les indices `X.screen(i)` et `{ screen: n }` |
| Instants dans le désordre | `OrderError` au chargement | revoir l'ordre des états, ou la narration avec le Scénariste |
| Clip déclenché dans la vue | `eventStart` vaut null avant la validation | `ev === null ? Infinity : ev + rel` ; locutions vérifiées au chargement avec `eventVoice(id)` |
| Élément caché par `Wipe` | invisible mais à sa place, inerte avant `at` | normal : la mise en page ne bouge pas pendant l'animation |
| Bas de l'image | les sous-titres occupent la bande y ≥ 800 (neutre : jusqu'à 78 % de la largeur ; bimaccess : 1 180 px au plus, en général y ≥ 880) ; signature bimaccess : zone d'action en bas à droite (48 px des bords) | ne rien mettre d'important dessous ni dans la zone d'action |
| Signature changée | `theme.json` écrit pour l'autre signature (clé `signature`) : ignoré, avertissement de sync | retirer la clé ou adapter le thème |
| Police absente | `ÉCHEC police … paquet @fontsource/… absent` | `npm install` |
| Bouton de scène hors `SceneRoot` (bimaccess) | VALIDER et CONTINUER restent sous le panneau au lieu de la zone d'action | `ChoicePanel` toujours dans `SceneRoot` ; un élément focalisable placé après lui dans la scène passe avant VALIDER à la tabulation |
| Stockage indisponible | `file://`, navigation privée : `localStorage` refusé | rien à faire : la progression reste en mémoire pour la visite |
| Audio bloqué par le navigateur | sans geste, pas de son | l'écran « Lancer » débloque l'audio ; ne pas le retirer |
| Avertissement Remotion en console | note de licence tant que `acknowledgeRemotionLicense` vaut `false` | c'est un avertissement, pas une erreur ; la décision revient à l'utilisateur |
| SVG avec prologue ou `<script>` | la sync retire le prologue, refuse le script | fournir un SVG propre, tailles en `viewBox` |
| `noUncheckedIndexedAccess` | `tableau[i]` est `T \| undefined` | passer par `X.screen(i)` (qui lève une erreur nommée) ou tester la valeur |
| Exercice sans clip déclenché validé à la fin | le geste allonge la scène d'environ 1,8 s et relance la lecture | normal : la conséquence et CONTINUER ont le temps d'être balayés |
| Ancienne copie de Playwright | « Executable doesn't exist » | `play-check` essaie le candidat suivant ; sinon `--from` ou `--chromium` |
