# Projet studio : contenu narré et interactif

Ce projet produit un contenu narré et interactif (formation, présentation, explication) et le construit en **une page HTML autonome**, `dist/index.html`, qui s'ouvre partout, y compris directement depuis le disque. Les scènes sont des compositions Remotion jouées par un lecteur React : elles se déroulent comme une vidéo bien montée, mais restent interactives et modifiables.

À lire en entier avant toute tâche. Le contrat détaillé du lecteur est `docs/player-contract.md` : il fait foi.

Signature graphique par défaut de ce template : **`bimaccess`**, la signature « CAD 2D » de BIMaccess (§ 6). `"signature": "carte"` donne la signature « carte topographique » (§ 6) ; `"signature": "neutral"` redonne la signature neutre d'origine.

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
  design/scenes/Sxx.json    données d'une scène à gabarit (docs/gabarits.md)
  sources.json              adresse de la mention de source de chaque scène à gabarit
  voice/voice.config.yaml   voix : recette V4 du rôle Voix du cours (eleven_v4, langue imposée)
  voice/voice-manifest.yaml + voice/Sxx/Sxx-yy.mp3 + .alignment.json   voix (facultative)
src/
  generated/                GÉNÉRÉ par npm run sync : ne jamais éditer
  engine/                   moteur de scènes (temps, locutions, animation, composants, exercices)
    bimaccess.tsx           rendu des composants dans la signature bimaccess
    carte.tsx               rendu des composants dans la signature carte
    cad.tsx                 grammaire CAD : accrochages (Osnap), cotes (Dimension)
    signature.ts            signature active (BIM, CARTE) et sa mise en page (PAGE : face utile, débord, marge, titre, source)
    gabarits/               gabarits de scène pilotés par des données (Frise, FicheRubriques) et contrôles de composition
    attente.tsx             sceneEnAttente : scène pas encore construite (narrations et exercice branchés, textes posés)
    outils.ts               outils de dessin de Remotion (paths, shapes, layout-utils, animation-utils), même version que remotion
  player/                   lecteur (coque, contrôles, progression, horloge, composition Remotion)
    player.css              coque, signature neutre et base commune
    player-bimaccess.css    coque et composants de la signature bimaccess
    player-carte.css        coque et composants de la signature carte
  lesson/lesson.ts          liste des scènes, dans l'ordre du storyboard
  lesson/scenes/sNN.tsx     une scène par fichier
  i18n.ts                   libellés d'interface fr / en (Lancer, Suivant, Valider…)
  main.tsx                  thème en variables CSS, signature, polices, chargement du lecteur
scripts/
  sync.mjs                  content/ → src/generated/ + public/audio/ ; échoue sur une source fausse
  play-check.mjs            parcours complet dans un vrai navigateur (file:// et --url)
  voice.mjs, lint-storyboard.mjs   voix ElevenLabs, contrôle du storyboard (rôles Voix et Scénariste)
  gabarits-selftest.mjs     auto-test des gabarits dans la signature du projet
docs/player-contract.md     contrat du lecteur (API exacte, attributs de test)
docs/gabarits.md            format des données d'une scène à gabarit, contrôles de composition
docs/voice.md               voix et storyboard : mode d'emploi
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
| Voix finale, sur devis (après la porte du sens et l'accord d'Ilyas sur le montant) | `npm run voice -- status` (devis), puis `npm run voice -- generate --approuve <caractères>` |
| Auto-test des gabarits de scène (avec `--play` : rendu dans un vrai navigateur) | `npm run test:gabarits` |

- Toute modification de `content/` passe par `npm run sync` (inclus dans `check`, `build`, `dev`).
- `check` et `build` chargent aussi les scènes (`sync --scenes`) : une locution introuvable ou ambiguë dans un `said(…)`, un ordre rompu, un nombre de textes changé, une donnée de gabarit fausse ou une composition finale défaillante (face non remplie, texte ou mise en évidence hors de la face, texte sur un trait, chevauchement : `GabaritError`, `docs/gabarits.md` § 6) les font échouer avec l'erreur nommée, sans construire de page.
- Dépenses : aucun appel payant (voix, essais de prononciation) sans l'accord d'Ilyas. `npm run voice -- generate` et `try` annoncent le coût en caractères et refusent (code 3) sans `--approuve <caractères>` qui le couvre ; un agent délégué prépare la commande et rend la main, l'agent principal annonce le coût.
- `test:play` exige une construction à jour (`npm run build` d'abord). Playwright n'est pas une dépendance du projet : il est cherché dans `--from <dossier>`, puis le projet, puis l'installation globale de npm ; `--chromium <chemin>` désigne le navigateur. Codes : 0 conforme, 1 échec, 2 environnement (Playwright absent, ou autre Chromium toujours actif : rien n'a été vérifié). Un verrou machine (`scripts/lib/chromium-lock.mjs`) fait attendre la fin d'un autre Chromium (`--wait-lock <s>`, `--no-wait`).
- `sync` refuse un SVG mal formé (fichier et ligne), une illustration ou un groupe nommés dans une scène et absents de `content/design/assets/`, une `signature` autre que `bimaccess`, `carte` ou `neutral`, un `program` mal écrit ou sans couleur connue (sans `programColor`), un `programColor` qui n'est pas `#RRVVBB`.
- Un serveur lancé en arrière-plan s'arrête par son PID, jamais par `pkill -f`. Un seul navigateur de test à la fois, et le fermer.
- Plusieurs agents en parallèle sur le même projet (une scène par agent) : `sync`, `check`, `check:scenes` et `build` réécrivent les mêmes fichiers générés ; chacun les lance sous verrou, `node "${CLAUDE_PLUGIN_ROOT}/scripts/sous-verrou.mjs" -- npm run check:scenes`.

## 3. Sources de vérité et rôles

| Quoi | Source | Qui la change |
|---|---|---|
| Textes à l'écran, narrations, exercices | `content/storyboard.md` | Scénariste |
| Couleurs, polices, illustrations, composition | `content/design/` | Graphiste |
| Données des scènes à gabarit (places, gestes, locutions) | `content/design/scenes/Sxx.json` | Graphiste (composition), agent des données de scène |
| Voix, alignements | `content/voice/` | Voix (`ELEVENLABS_API_KEY` dans l'environnement seulement : jamais écrite, affichée ni journalisée) |
| Instants des animations | `content/beats.json` + locutions dans les scènes | Code |
| Scènes | `src/lesson/` | Code |
| Moteur, lecteur, scripts | `src/engine/`, `src/player/`, `scripts/` | personne pendant la production : un défaut se signale |
| `src/generated/`, `public/audio/`, `dist/` | dérivés | personne : on change la source et on relance |

Le contenu écrit par l'utilisateur ne se change jamais en silence : une proposition se présente, l'utilisateur tranche. Les fichiers font foi, pas l'historique de conversation.

## 4. Écrire une scène

Chaque scène importe le moteur par `../../engine`. Aucun texte visible n'est écrit dans une scène ; aucun instant n'est écrit à la main (seul `0`, le début de la scène).

### Scène de forme connue : un gabarit et un fichier de données

Une scène dont la forme a un gabarit (frise chronologique : `Frise` ; fiche à rubriques : `FicheRubriques`) ne s'écrit pas en code sur mesure : ses places, ses gestes, ses locutions et ses mises en évidence vont dans `content/design/scenes/Sxx.json` (format et contrôles : `docs/gabarits.md`), et la scène tient en trois lignes :

```tsx
import data from "../../../content/design/scenes/S02.json"
import { defineScene, Frise } from "../../engine"

export const s02 = defineScene(Frise.scene(data))
```

La mise en page (face utile, débord, titre, mention de source) et les jetons viennent de la signature active (`PAGE`, `THEME`). Au chargement, les données et la composition finale sont contrôlées : face remplie, textes et mises en évidence dans la face, aucun texte sur un trait, aucun chevauchement. Une forme nouvelle et répétée mérite un gabarit nouveau, écrit une fois dans `src/engine/gabarits/` : le défaut se signale, il ne s'écrit pas dans une scène.

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

### Scène pas encore construite

`defineLesson` veut toutes les scènes du storyboard dès la déclaration de la leçon. Une scène pas encore écrite se déclare par `sceneEnAttente("S04")` (moteur, `src/engine/attente.tsx`) : elle branche ce que le storyboard donne pour la scène (narration d'entrée, narrations déclenchées, exercice), pose ses textes d'écran à l'image 0 (le premier en titre à la place de la signature, les autres en liste dans la face) et rien d'autre ; `data-board` vaut `S04-FIN` (exercice : `S04-1`, puis `S04-FIN` une fois validé). La page se construit et se joue entière dès le premier jour ; le rôle code remplace chaque appel par la vraie scène.

```ts
import { defineLesson, sceneEnAttente } from "../engine"
import { s01 } from "./scenes/s01"

export const LESSON = defineLesson({ scenes: [s01, sceneEnAttente("S02"), sceneEnAttente("S03")] })
```

### Primitives disponibles

`useT`, `THEME`, `META`, `PAGE` (mise en page de la signature), `Wipe` (balayage), `Trace` (trait tracé, flèche, tireté), `TypeText` (frappe), `Highlight` / `HighlightRect` (contour tireté + poignées ; carte : tireté bleu sans poignée, `shape="circle"` et `at` pour le tracé), `Grips` (poignées seules), `Move` (position, échelle), `Title`, `Bullets`, `Diagram`, `Svg` (avec `parts` : groupes du SVG révélés chacun sur ses mots) et `illustration("nom", ["groupe"])` (vérifiée au chargement), `Callout` (ligne de repère), `Dimension` (cote), `Osnap` (accrochage), `ChoicePanel`, `SceneRoot`, `tid`, `BIM`, `CARTE`, `PROGRAM_COLOR`, `sceneEnAttente`. Temps : `voice`, `eventVoice`, `.said`, `.saidEnd`, `.word`, `.b`, `.at`, `ordered`, `focusAt`, `prog`, `ease`, `typedUntil`. Gabarits : `Frise`, `FicheRubriques`, `GabaritError`, `COMPOSITION`, `ZONE`. Outils de dessin de Remotion, par `../../engine` seulement (jamais par le nom du paquet) : `evolvePath`, `getLength`, `getPointAtLength`, `getTangentAtLength`, `getBoundingBox`, `interpolatePath`… (`@remotion/paths`), `makeArrow`, `makeRect`, `makeCircle`… (`@remotion/shapes`), `measureText`, `fitText`… (`@remotion/layout-utils`, dans le navigateur, polices chargées : jamais au chargement d'un module), `makeTransform`, `translate`, `scale`, `rotate` (`@remotion/animation-utils`) ; la grammaire du § 5 passe avant leurs exemples. Props exactes : `docs/player-contract.md` § 4.

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

`studio.config.json` : `"signature"` (`"bimaccess"` par défaut, `"carte"` ou `"neutral"`), `"program"` (code de programme facultatif, ex. `"CER001"`) ou `"programColor"` (`#RRVVBB`, pour un programme sans couleur connue). `sync` les valide et les expose dans `META` (`signature`, `program`, `programColor`). Une scène ne teste pas la signature : elle passe par les composants du moteur et par `THEME`.

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
| Mise en page d'une scène à gabarit : face utile x 110 à 1810, y 180 à 860 (au-dessus des sous-titres), titre x 110, y 64, mention de source en bas à gauche (x 110, bas à y 1040, à côté de l'icône SCU) | `PAGE` (`signature.ts`), gabarits de scène |
| Libellés d'interface sans tiret cadratin ; en-têtes de rétroaction « Réponse attendue », « À revoir » | `src/i18n.ts` |

Ce qui reste à l'auteur (le code ne peut pas le garantir) : titres display de six mots au plus, terminés par un point (le storyboard garde la casse, le style met en majuscules) ; une couleur = une fonction (chaleur, froid, cotes : à écrire dans `spec.md`) ; dessins au trait (élévation, coupe, plan), cinq étiquettes au plus par schéma ; illustrations SVG aux couleurs des jetons, sans dégradé ni coin arrondi ; jamais de tiret cadratin ; rien sous les sous-titres (y ≥ 880) ni dans la zone d'action (bas droite).

**carte** : signature « carte topographique » : la scène se lit comme une feuille de carte imprimée. La référence est la charte du programme qui l'emploie (ses jetons `tokens.json` et son § 6, valeurs CSS de la coque). Sans `theme.json`, la signature prend une **palette neutre** (papier et encre gris, conventions de la carte imprimée, bleu de la mise en évidence, or du manque, aucune couleur de programme) ; la palette du programme (charte FME001 : fond `#F1F3EC`, terme vert, lien brun…) va tout entière dans `content/design/theme.json`, que `new-project.mjs --theme <fichier>` copie à la création. Le code applique :

| Règle de la charte | Où c'est fait |
|---|---|
| Jetons de couleur sous leurs noms (camelCase : `fond`, `papier`, `encre`, `encre2`, `carroyage`, `relief`, `reliefMaitresse`, `chaussee`, `ecriture`, `lecture`, `lectureFond`, `eauFond`, `vegetation`, `vegetationFond`, `imageClair`, `imageFonce`, `terme`, `manque`, `manqueFond`, `lien`, `lienSurvol`, `survol`, `verrouTrait`) ; les clés communes en sont dérivées (`background` = fond, `panel` = papier, `ink` = encre, `ink2` et `muted` = encre2, `line` = carroyage, `accent` = lecture, `panel2` = survol, `selectBg` = lectureFond, `lineSoft` = verrouTrait…) sauf si `theme.json` les donne ; polices `serif` et `capitales` (→ `body`, `display`, `paper` et `mono`) | `content/design/theme.json`, défauts et dérivation dans `scripts/sync.mjs` |
| Couleur de programme (`programColor`) seulement dans la barre d'état : pastille, case courante de l'échelle | `App.tsx`, `player-carte.css` |
| Polices Source Serif 4 (400, 600, italiques 400 et 600) et Barlow Condensed (500, 600), en ligne dans la page | `sync.mjs` → `src/generated/fonts.css` |
| Fond `background`, feuille dès l'image 0 et jamais animée (cadre 2 px, bordure graduée en damier, filets à 46 et 58, carroyage), aucune grille de points ni icône SCU, zone d'action x 1454, y 834, 360 × 140 | `SceneRoot` |
| En-tête de feuille : barre d'état de 44 px (à l'échelle de la scène), filet double, pastille et programme, code de scène, titre en italique, échelle graphique de progression (une case par scène), position | `App.tsx`, `player-carte.css` |
| Aplats et traits, aucun coin arrondi, aucune ombre, angles vifs | `player-carte.css`, `carte.tsx`, `Trace` |
| Boutons en cartouche (double filet, capitales espacées) : repos papier, survol, actif encre pleine, verrouillé gris ; focus en trait plein bleu | coque : `player-carte.css` ; scène : classe `carte-btn` |
| Titre de scène serif 600 66 px, filet double de 300 px ; puces en aplat d'encre ; lignes de repère encre 1,5 px, mot tapé | `Title`, `Bullets`, `Callout` |
| Mise en évidence : tireté bleu 2,5 px (10 6), sans poignée, rectangle à 10 px ou cercle (`shape="circle"`), tracé en 0,25 s avec `at` ; une seule à la fois | `Highlight`, `HighlightRect` |
| Panneau d'exercice cartouche, choix sélectionné à bord plein bleu 3 px et fond lecture-fond, rétroaction en rubrique sous filet double, sans couleur de verdict | `ChoicePanel` |
| Sous-titres : bandeau papier à filets (2 px, 0,8 px), serif 34 px, x 104, bas à y 1000, 1 180 px au plus | `Captions` |
| Mise en page de la feuille : face utile x 104 à 1424, y 180 à 860 (débord d'un dessin jusqu'à x 1500 entre y 360 et 690), marge x 1448 à 1830 (échelle, rose, source), titre x 104, y 84 | `PAGE` (`signature.ts`), gabarits de scène |

Reste à l'auteur : la règle du sens, une couleur = une fonction (les couleurs de thème cartographique seulement dans une feuille de format), symboles et habillage de marge (légende, échelle, rose) dans les illustrations, textes de 23 px et plus, rien sous les sous-titres ni dans la zone d'action. `Trace` n'a pas de bouts ronds en carte : les routes à bouts ronds se dessinent dans le SVG.

**neutral** : rendu d'origine du template (fond papier, polices système, coins arrondis), thème par défaut neutre. Un `theme.json` qui porte `"signature": "bimaccess"` ne s'applique pas à la signature neutre (avertissement de sync) : retirer la clé ou écrire un thème neutre pour l'adapter.

## 7. Règles

- Aucun texte littéral visible dans `src/lesson/` : tout vient de `sceneTexts`, `exerciseOf`, `asset`. Les libellés d'interface vivent dans `src/i18n.ts` seulement.
- Ne jamais éditer `src/generated/` ni `public/audio/` : changer `content/` puis `npm run sync`.
- Ne jamais affaiblir un garde-fou (`ordered`, `sceneTexts(…, { screen })`, échecs de `sync.mjs`, contrôles de `play-check.mjs`, contrôles de composition des gabarits et leurs seuils `COMPOSITION`) pour faire passer une construction : corriger la source.
- Une scène de forme connue passe par un gabarit et un fichier de données (§ 4), jamais par du code sur mesure.
- Aucune étiquette de statut (brouillon, validé, publié…) dans les fichiers, les noms ou les messages.
- Aucun appel réseau à l'exécution (pas de `fetch`, pas de police ni de script distants) : la page doit marcher hors ligne et en `file://`. Les polices de la signature sont des paquets `@fontsource` mis en ligne dans la page par la construction ; une autre police s'ajoute de la même façon, jamais par un lien.
- Secret ElevenLabs : la variable d'environnement `ELEVENLABS_API_KEY` seulement ; jamais écrite dans un fichier, affichée ni journalisée.
- Dépenses : aucun appel payant sans l'accord d'Ilyas, coût annoncé avant (nombre d'appels ou de caractères, modèle, prix, total) ; `--approuve` seulement après son accord, jamais par défaut. Toute la revue se fait sur la voix provisoire muette (minutage estimé, sous-titres) ; la voix finale se paie après la porte du sens, puis les locutions se recalent sur la vraie voix.
- Licence Remotion : gratuite pour les particuliers et les structures de trois personnes au plus, licence d'entreprise au-delà. `acknowledgeRemotionLicense` de `studio.config.json` est la décision de l'utilisateur : un agent ne le passe jamais à `true`.
- Avant de dire « fini » : `npm run check`, `npm run build`, `npm run test:play` (et `--url` sur `npm run preview`), puis regarder les captures `--shots` et les comparer à `content/design/spec.md`.

Lecteur : bouton pour revoir la scène depuis le début (`narration-replay`) et vitesse de lecture de ×0,5 à ×2 (`narration-rate`, voix comprise, gardée par contenu dans le stockage du navigateur quand il le permet) ; `test:play` les vérifie.

## 8. Pièges connus

| Piège | Ce qui arrive | Parade |
|---|---|---|
| Locution introuvable ou ambiguë | `LocutionError` au chargement : `npm run check` et `npm run build` échouent (`[sync] ÉCHEC chargement des scènes : …`) | allonger la locution, la copier mot pour mot de ce qui est dit ; calculer les instants au niveau du module, pas dans `View` |
| Titre de scène mal écrit | `# S02`, `# S02 · ` (vide), `# S03 Titre` (sans séparateur), `# S2 · …` : la sync échoue | écrire `# S02 · Titre` |
| Lettre de choix en majuscule | `- C · …` ou `Attendu : B` : la sync échoue | lettres en minuscule : `- c · …`, `Attendu : b` |
| Adresse `#/3` | ouvre la scène 3 même si les précédentes ne sont pas terminées (choix assumé : lien, reprise, tests) | ne pas diffuser ces adresses si l'ordre doit être imposé |
| Téléphone tenu à la verticale | la composition 16:9 y fait environ un cinquième de sa taille (texte de 32 px ≈ 6 px) | bandeau « tournez l'appareil » et plein écran fournis par le lecteur ; à l'horizontale, environ 9 px : lisible de secours, confortable à partir d'environ 1000 px de large |
| Voix regénérée | les instants changent, des locutions disparaissent | relancer `npm run sync` (il imprime chaque repère), corriger `beats.json` et les `said(…)`, puis `test:play` |
| Prononciation adaptée | l'alignement dit « P. zéro un » pour « P-01 » ; la sync ramène les mots dits aux mots écrits du storyboard (ligne « prononciation adaptée ») | les sous-titres montrent le storyboard ; les locutions se cherchent dans le texte écrit, mot pour mot |
| Composition d'une scène à gabarit | `GabaritError … (composition finale) : N défaut(s)` au chargement : vide dans la face, texte ou mise en évidence hors de la face, texte sur un trait, chevauchement | corriger les places et les tailles dans `content/design/scenes/Sxx.json` selon chaque « À faire » (`docs/gabarits.md` § 6) ; jamais changer les seuils |
| Dépense non approuvée | `npm run voice -- generate` s'arrête (code 3) avec le coût annoncé | annoncer le coût à Ilyas ; après son accord, relancer avec `--approuve <caractères>` |
| Texte du manifeste ≠ storyboard | la sync échoue (« voix à regénérer ») | regénérer la voix, ne pas maquiller le texte |
| Nombre de textes d'« Écran » changé | `TextError` au chargement | mettre à jour les indices `X.screen(i)` et `{ screen: n }` |
| Instants dans le désordre | `OrderError` au chargement | revoir l'ordre des états, ou la narration avec le Scénariste |
| Clip déclenché dans la vue | `eventStart` vaut null avant la validation | `ev === null ? Infinity : ev + rel` ; locutions vérifiées au chargement avec `eventVoice(id)` |
| Élément caché par `Wipe` | invisible mais à sa place, inerte avant `at` | normal : la mise en page ne bouge pas pendant l'animation |
| Bas de l'image | les sous-titres occupent la bande y ≥ 800 (neutre : jusqu'à 78 % de la largeur ; bimaccess : 1 180 px au plus, en général y ≥ 880 ; carte : x 104, bas à y 1000) ; zone d'action en bas à droite (bimaccess : 48 px des bords ; carte : x 1454, y 834, 360 × 140) | ne rien mettre d'important dessous ni dans la zone d'action ; une scène à gabarit reste dans la face de la signature (`PAGE.face`) |
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
