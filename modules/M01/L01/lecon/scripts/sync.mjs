#!/usr/bin/env node
/**
 * sync · lit les sources du contenu et écrit les modules générés du lecteur.
 *
 * Entrées (chemins dans studio.config.json) :
 *   - storyboard Markdown : scènes « # S01 · Titre » (séparateur « · », « - »,
 *     « – », « — » ou « : »), sections « ## Nom » ; textes à l'écran entre
 *     accents graves ; mots-clés en français ou en anglais :
 *       « ## Écran » ou « ## Screen »
 *       « ## Narration » (clip linéaire, joué à l'entrée de la scène)
 *       « ## Narration déclenchée » ou « ## Triggered narration » (clip event)
 *       « ## Exercice » ou « ## Exercise », avec « Question : `…` »,
 *       « - a · `choix` → `conséquence` », « Attendu : b » ou « Expected: b ».
 *   - manifeste voix (YAML, facultatif) : clips, audio, alignements,
 *     repères suggérés. Sans manifeste, ou pour un clip sans audio, le
 *     minutage est estimé sur le texte et le contenu se joue sans voix.
 *   - repères (JSON, facultatif) : { "S01-01": { "cle": "locution dite" } },
 *     qui complètent ou remplacent les repères suggérés.
 *   - thème (JSON, facultatif) et dossier d'illustrations SVG.
 *   - signature graphique (studio.config.json « signature » : « bimaccess »,
 *     par défaut, « carte » ou « neutral ») et programme (« program »,
 *     « programColor ») :
 *     valeurs validées, exposées dans META ; le thème par défaut et les polices
 *     embarquées suivent la signature. Un thème qui porte « signature » ne
 *     s'applique qu'à cette signature (sinon : thème par défaut, avertissement).
 *
 * Sorties : src/generated/{texts,narration,theme,assets,meta}.ts,
 * src/generated/fonts.css (polices de la signature, en ligne dans la page) et
 * public/audio/*.mp3 (copiés dans dist/audio/ par la construction).
 * Échoue (code 1) sur une locution introuvable ou ambiguë, un texte de
 * manifeste différent du storyboard, un clip du manifeste sans scène, un
 * déclencheur contradictoire, un fichier manquant, une scène en double, un
 * titre de scène mal écrit (« # S02 » sans titre, titre vide, sans
 * séparateur, numéro sans deux chiffres), un choix d'exercice en majuscule
 * ou mal formé, un « Attendu » hors des choix, un alignement aux instants
 * invalides (null, NaN, négatif, qui reculent), un SVG mal formé (analyse
 * XML stricte, lib/svg-xml.mjs : fichier et ligne), une illustration ou un
 * groupe nommés en clair dans src/lesson/ et absents des illustrations
 * (<Svg name="…">, asset("…"), illustration("…"), group: "…") : le contenu
 * ne se construit jamais sur une source fausse. Un repère introuvable ou
 * ambigu est imprimé « introuvable », jamais avec un instant.
 *
 * --scenes : après l'écriture, charge src/lesson/lesson.ts (Vite, rendu
 * serveur) pour exécuter les vérifications de chargement des scènes
 * (locutions said/b/word, ordered, sceneTexts, defineScene, defineLesson) ;
 * échoue (code 1) avec l'erreur nommée au lieu de livrer une page cassée.
 * `npm run check` et `npm run build` le passent.
 *
 * Usage : node scripts/sync.mjs [--config studio.config.json] [--quiet] [--scenes]
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { dirname, join, relative, resolve } from "node:path"
import { parse as parseYaml } from "yaml"
import { checkSvgXml } from "./lib/svg-xml.mjs"

const args = process.argv.slice(2)
if (args.includes("--help") || args.includes("-h")) {
  console.log(readFileSync(new URL(import.meta.url)).toString().split("*/")[0])
  process.exit(0)
}
const quiet = args.includes("--quiet")
const cfgArg = args.indexOf("--config")
const cfgPath = resolve(cfgArg >= 0 && args[cfgArg + 1] ? args[cfgArg + 1] : "studio.config.json")
if (!existsSync(cfgPath)) {
  console.error(`[sync] configuration introuvable : ${cfgPath} (lancer depuis la racine du projet ou passer --config)`)
  process.exit(1)
}
const ROOT = dirname(cfgPath)
const cfg = readJson(cfgPath, "configuration")
const at = (p) => resolve(ROOT, p)
const log = (...m) => quiet || console.log("[sync]", ...m)
const errors = []
const warnings = []
const fail = (m) => errors.push(m)
const warn = (m) => warnings.push(m)

function readJson(path, what) {
  try {
    return JSON.parse(readFileSync(path, "utf8"))
  } catch (e) {
    console.error(`[sync] ÉCHEC ${what} illisible (${path}) : ${e.message}`)
    process.exit(1)
  }
}

for (const key of ["id", "title", "storyboard"]) {
  if (typeof cfg[key] !== "string" || !cfg[key].trim()) fail(`studio.config.json : champ « ${key} » manquant`)
}
if (cfg.id && !/^[a-z0-9][a-z0-9-]*$/i.test(cfg.id)) fail(`studio.config.json : « id » doit être fait de lettres, chiffres et tirets (${cfg.id})`)

/* ── Signature graphique et programme ───────────────────────────────────── */

/**
 * Signatures : « bimaccess » (signature CAD 2D de BIMaccess, design-system
 * DESIGN.md : fond blanc à grille de points, Azeret Mono et IBM Plex Sans,
 * couleurs ACI, poignées, aucun coin arrondi), « carte » (signature « carte
 * topographique » : feuille imprimée à bordure graduée et carroyage, fond
 * #F1F3EC, Source Serif 4 et Barlow Condensed, aplats et traits, mise en
 * évidence tiretée bleue sans poignée, aucun coin arrondi ni ombre) et
 * « neutral » (signature neutre d'origine : fond papier, polices système,
 * coins arrondis).
 */
const SIGNATURES = ["bimaccess", "carte", "neutral"]
const SIGNATURE_LIST = "« bimaccess » (signature CAD 2D de BIMaccess), « carte » (signature carte topographique) ou « neutral » (signature neutre)"
/** Signatures qui affichent le programme (pastille, code, couleur) dans la barre d'état. */
const PROGRAM_SIGNATURES = ["bimaccess", "carte"]
const DEFAULT_SIGNATURE = "bimaccess"
/**
 * Couleur ACI de chaque programme de formation (DESIGN.md § 2, « Couleurs par
 * programme ») : CER001 Certification Foundation = 4 cyan. Les programmes
 * suivants prendront, dans l'ordre, 3 vert, 6 magenta, 1 rouge, 2 or : tant
 * qu'ils n'ont pas de code ici, leur couleur s'écrit dans « programColor ».
 */
const PROGRAMS = { CER001: { color: "#0096C7", aci: "4 cyan", name: "Certification Foundation" } }
const NEXT_PROGRAM_COLORS = "3 vert #00A64F, puis 6 magenta #C800C8, 1 rouge #E0261B, 2 or #D99A00"
const HEX = /^#[0-9A-Fa-f]{6}$/

const signature = cfg.signature ?? DEFAULT_SIGNATURE
if (!SIGNATURES.includes(signature)) {
  fail(`studio.config.json : « signature » vaut ${JSON.stringify(cfg.signature)} : valeurs possibles ${SIGNATURE_LIST}`)
}
let program = null
let programColor = null
if (cfg.program !== undefined && cfg.program !== null) {
  if (typeof cfg.program !== "string" || !/^[A-Z][A-Z0-9-]{1,15}$/.test(cfg.program)) {
    fail(`studio.config.json : « program » vaut ${JSON.stringify(cfg.program)} : code de programme en majuscules et chiffres (ex. « CER001 »)`)
  } else {
    program = cfg.program
    programColor = PROGRAMS[program]?.color ?? null
  }
}
if (cfg.programColor !== undefined && cfg.programColor !== null) {
  if (typeof cfg.programColor !== "string" || !HEX.test(cfg.programColor)) {
    fail(`studio.config.json : « programColor » vaut ${JSON.stringify(cfg.programColor)} : couleur « #RRVVBB » attendue (couleurs ACI des programmes : ${NEXT_PROGRAM_COLORS})`)
  } else {
    if (programColor && programColor.toUpperCase() !== cfg.programColor.toUpperCase()) {
      warn(`studio.config.json : « programColor » ${cfg.programColor} remplace la couleur du programme ${program} (${programColor}, DESIGN.md § 2)`)
    }
    programColor = cfg.programColor.toUpperCase()
  }
} else if (program && !programColor) {
  fail(`studio.config.json : programme « ${program} » sans couleur connue (programmes connus : ${Object.keys(PROGRAMS).join(", ")}) : ajouter « programColor », la couleur ACI suivante selon DESIGN.md § 2 (${NEXT_PROGRAM_COLORS})`)
}
if (!PROGRAM_SIGNATURES.includes(signature) && SIGNATURES.includes(signature) && (program || programColor)) warn(`studio.config.json : « program » et « programColor » n'ont d'effet visible qu'avec les signatures ${PROGRAM_SIGNATURES.map((x) => `« ${x} »`).join(" et ")}`)

/* ── Storyboard ─────────────────────────────────────────────────────────── */

const SCENE_RE = /^# (S\d\d)\s*(?:·|-|–|—|:)\s*(.+?)\s*$/
const SECTION_RE = /^## (.+?)\s*$/
const CODE_RE = /`([^`]+)`/g

/** Familles de sections reconnues, en français et en anglais. */
const isScreen = (name) => /^(écran|ecran|screen|on[- ]screen)\b/i.test(name)
const isNarration = (name) => /^(narration|voice[- ]?over)\b/i.test(name) || /\bnarration$/i.test(name)
const isTriggered = (name) => /déclench|declench|event|trigger/i.test(name)
const isExercise = (name) => /^(exercice|exercise)\b/i.test(name)

function parseStoryboard(md) {
  const scenes = []
  let scene = null
  let section = null
  for (const raw of md.split(/\r?\n/)) {
    const line = raw.replace(/\s+$/, "")
    const s = SCENE_RE.exec(line)
    if (s) {
      scene = { id: s[1], title: s[2], sections: {} }
      scenes.push(scene)
      section = null
      continue
    }
    if (/^#\s*(S\s?\d|Sc[eè]ne\s*\d)/i.test(line)) {
      // Ressemble à une scène sans en être une : jamais ignoré en silence (scène et contenu perdus)
      fail(`titre de scène mal écrit « ${line} » : attendu « # S01 · Titre » (S, deux chiffres, séparateur « · », titre non vide)`)
      scene = null
      section = null
      continue
    }
    if (/^# /.test(line)) {
      // Partie hors scène (jauge, budget, addenda…) : jamais une source de textes
      scene = null
      section = null
      continue
    }
    if (!scene) continue
    const h = SECTION_RE.exec(line)
    if (h) {
      if (scene.sections[h[1]]) fail(`${scene.id} : section « ## ${h[1]} » en double`)
      section = { name: h[1], text: [] }
      scene.sections[h[1]] = section
      continue
    }
    if (section) section.text.push(line)
  }
  return scenes
}

const clean = (s) => s.replace(/\*\*/g, "").replace(/\s+/g, " ").trim()

/** Textes entre accents graves d'une section, dans l'ordre. */
const codesOf = (lines) => lines.flatMap((l) => [...l.matchAll(CODE_RE)].map((m) => m[1]))

/** Lignes de texte d'une section (puces et paragraphes, accents graves retirés). */
const linesOf = (lines) =>
  lines
    .map((l) => l.replace(/^\s*[-*]\s+/, "").replace(/`/g, ""))
    .map(clean)
    .filter((l) => l && l !== "---")

/** Paragraphes d'une narration (texte dit, sans balisage). */
const paragraphsOf = (lines) =>
  lines
    .join("\n")
    .split(/\n\s*\n/)
    .map((p) => clean(p.replace(/`/g, "")))
    .filter((p) => p && p !== "---")

/** Exercice : « Question : `…` », « - a · `choix` → `conséquence` », « Attendu : b » (ou « Expected: b »). */
function parseExercise(lines, sceneId) {
  const out = { question: "", choices: [], expected: null }
  for (const l of lines) {
    const q = /^\s*Question\s*:\s*`([^`]+)`/i.exec(l)
    if (q) out.question = q[1]
    const c = /^\s*[-*]\s*([a-z])\s*(?:·|-|–|:|\.|\))\s*`([^`]+)`\s*(?:→|->)\s*`([^`]+)`/.exec(l)
    const upper = /^\s*[-*]\s*([A-Z])\s*(?:·|-|–|:|\.|\))/.exec(l)
    if (upper) {
      fail(`${sceneId} : choix « ${upper[1]} » en majuscule « ${l.trim()} » : la lettre s'écrit en minuscule (« - ${upper[1].toLowerCase()} · \`choix\` → \`conséquence\` »)`)
    } else if (c) {
      if (out.choices.some((x) => x.key === c[1])) fail(`${sceneId} : choix « ${c[1]} » en double dans l'exercice`)
      out.choices.push({ key: c[1], label: c[2], feedback: c[3] })
    } else if (/^\s*[-*]\s*[a-z]\s*(?:·|-|–|:|\.|\))/.test(l)) {
      fail(`${sceneId} : choix mal formé « ${l.trim()} » (attendu : - a · \`choix\` → \`conséquence\`)`)
    }
    const e = /^\s*(?:Attendu|Expected)\s*:\s*([a-z])\b/i.exec(l)
    if (e && e[1] !== e[1].toLowerCase()) fail(`${sceneId} : « ${l.trim()} » : la lettre s'écrit en minuscule, comme le choix (« Attendu : ${e[1].toLowerCase()} »)`)
    else if (e) out.expected = e[1]
    else if (/^\s*(?:Attendu|Expected)\s*:/i.test(l)) fail(`${sceneId} : « ${l.trim()} » mal écrit : « Attendu : b » (une lettre de choix)`)
  }
  if (!out.question) fail(`${sceneId} : exercice sans « Question : \`…\` »`)
  if (out.choices.length < 2) fail(`${sceneId} : exercice avec moins de deux choix « - a · \`choix\` → \`conséquence\` »`)
  if (out.expected && !out.choices.some((c) => c.key === out.expected)) fail(`${sceneId} : « Attendu : ${out.expected} » ne désigne aucun choix`)
  return out
}

const storyboardPath = at(cfg.storyboard ?? "content/storyboard.md")
if (!existsSync(storyboardPath)) {
  console.error(`[sync] storyboard introuvable : ${cfg.storyboard}`)
  process.exit(1)
}
const scenes = parseStoryboard(readFileSync(storyboardPath, "utf8"))
if (scenes.length === 0) fail(`aucune scène « # S01 · Titre » dans ${cfg.storyboard}`)
const seen = new Set()
for (const s of scenes) {
  if (seen.has(s.id)) fail(`scène ${s.id} en double dans ${cfg.storyboard}`)
  seen.add(s.id)
}

const TEXTS = {}
const EXERCISES = {}
const STORY_CLIPS = []
for (const s of scenes) {
  const sections = {}
  let screen = []
  let rank = 0
  let linear = 0
  for (const [name, sec] of Object.entries(s.sections)) {
    sections[name] = { codes: codesOf(sec.text), lines: linesOf(sec.text) }
    if (isScreen(name)) screen = codesOf(sec.text)
    if (isNarration(name)) {
      rank += 1
      const id = `${s.id}-${String(rank).padStart(2, "0")}`
      const trigger = isTriggered(name) ? "event" : "linear"
      const text = paragraphsOf(sec.text).join("\n\n")
      if (!text) fail(`${s.id} : section « ## ${name} » vide`)
      if (trigger === "linear") linear += 1
      STORY_CLIPS.push({ id, scene: s.id, trigger, text })
    }
    if (isExercise(name)) EXERCISES[s.id] = parseExercise(sec.text, s.id)
  }
  if (linear > 1) fail(`${s.id} : ${linear} sections de narration linéaire ; une seule par scène (les suivantes : « ## Narration déclenchée »)`)
  TEXTS[s.id] = { title: s.title, screen, sections }
}

/* ── Voix : manifeste, alignements, minutage estimé ────────────────────── */

const RATE = { charsPerSecond: 14.5, comma: 0.25, stop: 0.45, paragraph: 0.8, ...(cfg.speechRate ?? {}) }

/** Mots datés estimés sur le texte (aucune voix) : durée au caractère, pauses sur la ponctuation. */
function estimateWords(text) {
  const words = []
  let t = 0
  for (const para of text.split(/\n\s*\n/)) {
    for (const w of para.split(/\s+/).filter(Boolean)) {
      const d = Math.max(0.12, w.length / RATE.charsPerSecond)
      words.push({ text: w, start: round(t), end: round(t + d) })
      t += d + 0.06
      if (/[,;:]$/.test(w)) t += RATE.comma
      if (/[.?!…»]$/.test(w)) t += RATE.stop
    }
    t += RATE.paragraph
  }
  return { words, duration: round(Math.max(0.5, t - RATE.paragraph)) }
}

/** Mots datés d'un alignement ElevenLabs (caractères et instants). */
function wordsFromAlignment(al) {
  const a = al.alignment ?? al.normalized_alignment ?? al
  const ch = a.characters
  const st = a.character_start_times_seconds
  const en = a.character_end_times_seconds
  if (!Array.isArray(ch) || !Array.isArray(st) || ch.length !== st.length) {
    throw new Error("alignement sans characters / character_start_times_seconds de même longueur")
  }
  const words = []
  let cur = ""
  let start = 0
  let end = 0
  ch.forEach((c, i) => {
    if (/\s/.test(c)) {
      if (cur) words.push({ text: cur, start: round(start), end: round(end) })
      cur = ""
      return
    }
    if (!cur) start = st[i]
    cur += c
    end = en?.[i] ?? st[i]
  })
  if (cur) words.push({ text: cur, start: round(start), end: round(end) })
  return words
}

const round = (x) => Math.round(x * 1000) / 1000
/** Même normalisation que src/engine/timeline.ts (normalizeToken) : les deux doivent rester identiques. */
const norm = (w) =>
  w
    .toLowerCase()
    .replace(/[’‘ʼ`]/g, "'")
    .replace(/^[^\p{L}\p{N}']+|[^\p{L}\p{N}']+$/gu, "")
const tokens = (phrase) => phrase.split(/\s+/).map(norm).filter(Boolean)

/** Instant du premier mot d'une locution dite mot pour mot, unique dans le clip. */
function findLocution(words, phrase, where) {
  const want = tokens(phrase)
  const spoken = words.map((w, i) => ({ i, t: norm(w.text) })).filter((w) => w.t)
  if (want.length === 0) {
    fail(`${where} : locution vide`)
    return null
  }
  const hits = []
  for (let i = 0; i + want.length <= spoken.length; i++) {
    if (want.every((t, j) => spoken[i + j].t === t)) hits.push(i)
  }
  if (hits.length === 0) {
    fail(`${where} : locution introuvable « ${phrase} »`)
    return null
  }
  if (hits.length > 1) {
    fail(`${where} : locution ambiguë « ${phrase} » (${hits.length} fois) : l'allonger`)
    return null
  }
  return words[spoken[hits[0]].i].start
}

const manifestPath = cfg.manifest ? at(cfg.manifest) : null
let manifest = null
if (manifestPath && existsSync(manifestPath)) {
  try {
    manifest = parseYaml(readFileSync(manifestPath, "utf8"))
  } catch (e) {
    fail(`manifeste voix illisible (${cfg.manifest}) : ${e.message}`)
  }
  if (manifest && !Array.isArray(manifest.clips)) fail(`manifeste voix sans liste « clips » (${cfg.manifest})`)
}
const beatsPath = cfg.beats ? at(cfg.beats) : null
const extraBeats = beatsPath && existsSync(beatsPath) ? readJson(beatsPath, "repères") : {}

/** Fichier du manifeste : relatif à la racine du projet, sinon au dossier du manifeste. */
const fromManifest = (p) => {
  if (!p) return null
  for (const c of [at(p), resolve(dirname(manifestPath), p)]) if (existsSync(c)) return c
  return null
}

const audioOut = join(ROOT, "public", "audio")
rmSync(audioOut, { recursive: true, force: true })

const sameText = (a, b) => a.replace(/\s+/g, " ").trim() === b.replace(/\s+/g, " ").trim()
const CLIPS = {}
let voiced = 0
const mclips = Array.isArray(manifest?.clips) ? manifest.clips : []
for (const m of mclips) {
  if (!STORY_CLIPS.some((c) => c.id === m.clip_id)) fail(`${m.clip_id ?? "?"} : clip du manifeste absent du storyboard (scène ou section « Narration » supprimée ?)`)
}
for (const sc of STORY_CLIPS) {
  const m = mclips.find((c) => c.clip_id === sc.id)
  let words
  let duration
  let src = null
  if (m) {
    if (m.trigger && m.trigger !== sc.trigger) fail(`${sc.id} : déclencheur « ${m.trigger} » dans le manifeste, « ${sc.trigger} » dans le storyboard`)
    if (!sameText(m.text ?? "", sc.text)) fail(`${sc.id} : le texte du manifeste diffère du storyboard (voix à regénérer)`)
  }
  if (m && (m.audio || m.alignment)) {
    const audioPath = fromManifest(m.audio)
    const alignPath = fromManifest(m.alignment)
    if (!m.audio || !audioPath) fail(`${sc.id} : audio introuvable (${m.audio ?? "champ « audio » absent"})`)
    if (!m.alignment || !alignPath) fail(`${sc.id} : alignement introuvable (${m.alignment ?? "champ « alignment » absent"})`)
    if (audioPath && alignPath) {
      try {
        const al = readJson(alignPath, `${sc.id} alignement`)
        const a = al?.alignment ?? al?.normalized_alignment ?? al
        const times = [...(Array.isArray(a?.character_start_times_seconds) ? a.character_start_times_seconds : []), ...(Array.isArray(a?.character_end_times_seconds) ? a.character_end_times_seconds : [])]
        const starts = Array.isArray(a?.character_start_times_seconds) ? a.character_start_times_seconds : []
        if (times.some((x) => typeof x !== "number" || !Number.isFinite(x) || x < 0)) {
          // Un fichier posé à la main avec null ou NaN donnerait des mots à 0 s : refusé
          fail(`${sc.id} : alignement aux instants invalides (null, NaN ou négatif) (${m.alignment})`)
        } else if (starts.some((x, i) => i > 0 && x < starts[i - 1])) {
          fail(`${sc.id} : alignement aux instants qui reculent (${m.alignment})`)
        } else {
          words = wordsFromAlignment(al)
        }
      } catch (e) {
        fail(`${sc.id} : ${e.message} (${m.alignment})`)
      }
      if (words) {
        if (words.length === 0) fail(`${sc.id} : alignement vide (${m.alignment})`)
        duration = round(Number(m.duration_s) || words.at(-1)?.end || 0)
        if (words.at(-1) && words.at(-1).end > duration + 0.05) fail(`${sc.id} : duration_s (${duration} s) plus court que l'alignement (${words.at(-1).end} s)`)
        // Le dictionnaire de prononciation peut changer des mots (« P-01 » dit « P zéro un ») : avertir seulement
        const said = tokens(words.map((w) => w.text).join(" ")).join(" ")
        const written = tokens(m.tts_text ?? m.text ?? "").join(" ")
        if (said !== written) warn(`${sc.id} : l'alignement ne reprend pas mot pour mot le texte (prononciation adaptée ?) ; les locutions se cherchent dans ce qui est dit`)
        mkdirSync(audioOut, { recursive: true })
        copyFileSync(audioPath, join(audioOut, `${sc.id}.mp3`))
        src = `audio/${sc.id}.mp3`
        voiced += 1
      }
    }
  }
  if (!words) ({ words, duration } = estimateWords(sc.text))
  const beatPhrases = { ...(m?.suggested_beats ?? {}), ...(extraBeats[sc.id] ?? {}) }
  const beats = {}
  for (const [key, phrase] of Object.entries(beatPhrases)) {
    const t = findLocution(words, String(phrase), `${sc.id}.${key}`)
    // Ligne « = instant » seulement pour un repère réellement trouvé ; sinon « introuvable » (l'ÉCHEC suit)
    if (t === null) log(`${sc.id}.${key} introuvable  « ${phrase} »`)
    else {
      beats[key] = t
      log(`${sc.id}.${key} = ${t.toFixed(3)} s  « ${phrase} »`)
    }
  }
  CLIPS[sc.id] = { id: sc.id, scene: sc.scene, trigger: sc.trigger, text: sc.text, src, duration, words, beats }
}
for (const key of Object.keys(extraBeats)) if (!CLIPS[key]) fail(`repères pour un clip inconnu : ${key}`)

/* ── Thème et illustrations ─────────────────────────────────────────────── */

/*
 * Thème par défaut de chaque signature ; content/design/theme.json le
 * complète ou le remplace clé par clé. Les deux thèmes ont les mêmes clés
 * (les scènes et le moteur les lisent toutes, quelle que soit la signature).
 *
 * bimaccess : jetons de design-system/DESIGN.md § 2 et § 3. paper → background,
 * ink-3 → muted, couleur de programme → accent, aci-2 or (puces, accrochages)
 * → accent2, aci-3 vert → success ; les autres jetons gardent leur nom
 * (panel2 = panel-2, gridDot = grid-dot, lineSoft = line-soft…), plus
 * goldText (#8A6200, en-tête « à revoir » de feedback-panel) et shadow
 * (couleur de l'ombre décalée des panneaux). `grid` :
 * pas de la grille de points en pixels de composition (0 = aucune grille).
 *
 * carte : jetons de la charte « carte topographique » (tokens.json de la
 * charte, noms en camelCase : encre-2 → encre2, relief-maitresse →
 * reliefMaitresse, lecture-fond → lectureFond…), polices `serif` (Source
 * Serif 4) et `capitales` (Barlow Condensed). Les clés communes que lisent le
 * moteur et les scènes (background, ink, accent…) en sont DÉRIVÉES après la
 * fusion avec theme.json (CARTE_ALIASES) : un thème qui change « lecture »
 * change aussi accent, blue, cyan, grip, sauf si la clé commune est donnée
 * elle-même. La couleur de programme n'est pas un jeton de scène : elle vit
 * dans META.programColor (barre d'état seulement). `grid` 0 (aucune grille de
 * points : la feuille porte un carroyage), `radius` 0.
 *
 * neutral : thème d'origine du template (fond papier, polices système, coins
 * arrondis) ; ses clés supplémentaires reprennent les couleurs neutres les
 * plus proches et ne servent qu'aux scènes qui les nomment.
 */
const SYSTEM_SANS = "system-ui, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif"
const SYSTEM_MONO = "ui-monospace, 'SFMono-Regular', Menlo, Consolas, monospace"
/** Fond de la signature carte (charte § 2 : aucun autre fond de page). */
const CARTE_FOND = "#F1F3EC"
/** Clés communes du thème → jeton de la charte carte dont elles prennent la valeur (ou valeur fixe). */
const CARTE_ALIASES = {
  colors: {
    background: "fond",
    ink: "encre",
    muted: "encre2",
    accent: "lecture", // mise en évidence, choix sélectionné, focus
    accent2: "ecriture",
    success: "encre", // aucune couleur de verdict
    line: "carroyage",
    panel: "papier",
    panel2: "survol",
    gridDot: "carroyage",
    lineSoft: "verrouTrait",
    lineFaint: "survol",
    ink2: "encre2",
    red: "ecriture",
    gold: "manque",
    goldText: "encre", // le libellé du manque s'écrit en encre, jamais en or
    yellowFill: "manqueFond",
    green: "terme",
    cyan: "lecture",
    blue: "lecture",
    magenta: "lien",
    grip: "lecture",
    gripHover: "lecture",
    gripHot: "encre",
    selectBg: "lectureFond",
    tooltip: "papier",
    shadow: { value: "rgba(0, 0, 0, 0)" }, // aucune ombre
  },
  fonts: { body: "serif", display: "serif", paper: "serif", mono: "capitales" },
}
const DEFAULT_THEMES = {
  bimaccess: {
    colors: {
      background: "#FFFFFF",
      ink: "#111418",
      muted: "#5E6773",
      accent: programColor ?? "#0096C7",
      accent2: "#D99A00",
      success: "#00A64F",
      line: "#C4CAD2",
      panel: "#F4F6F8",
      panel2: "#E9ECF0",
      gridDot: "#D3D8DF",
      lineSoft: "#D5DAE1",
      lineFaint: "#E6E9ED",
      ink2: "#4A525D",
      red: "#E0261B",
      gold: "#D99A00",
      goldText: "#8A6200",
      yellowFill: "#FFD400",
      green: "#00A64F",
      cyan: "#0096C7",
      blue: "#1F6BFF",
      magenta: "#C800C8",
      grip: "#1F6BFF",
      gripHover: "#FF6FD8",
      gripHot: "#FF2A2A",
      selectBg: "#E3EDFB",
      tooltip: "#FFFFC8",
      shadow: "rgba(17, 20, 24, 0.08)",
    },
    fonts: {
      body: `'IBM Plex Sans', ${SYSTEM_SANS}`,
      mono: `'Azeret Mono', ${SYSTEM_MONO}`,
      display: `'Azeret Mono', ${SYSTEM_MONO}`,
      paper: "Fraunces, Georgia, 'Times New Roman', serif",
    },
    radius: 0,
    grid: 24,
    typingCps: 35,
  },
  neutral: {
    colors: {
      background: "#F4F1EA",
      ink: "#1B1F24",
      muted: "#5F6670",
      accent: "#1F5FBF",
      accent2: "#D9480F",
      success: "#0F7A47",
      line: "#C7CCD3",
      panel: "#FFFFFF",
      panel2: "#FFFFFF",
      gridDot: "#C7CCD3",
      lineSoft: "#C7CCD3",
      lineFaint: "#E4E6EA",
      ink2: "#5F6670",
      red: "#D9480F",
      gold: "#B7791F",
      goldText: "#8A5A00",
      yellowFill: "#FFE066",
      green: "#0F7A47",
      cyan: "#1F5FBF",
      blue: "#1F5FBF",
      magenta: "#9C36B5",
      grip: "#1F5FBF",
      gripHover: "#1F5FBF",
      gripHot: "#1F5FBF",
      selectBg: "#E8EEF8",
      tooltip: "#FFFFFF",
      shadow: "rgba(0, 0, 0, 0)",
    },
    fonts: { body: SYSTEM_SANS, mono: SYSTEM_MONO, display: SYSTEM_SANS, paper: "Georgia, 'Times New Roman', serif" },
    radius: 10,
    grid: 0,
    typingCps: 35,
  },
  carte: {
    colors: {
      fond: CARTE_FOND,
      papier: "#FBFCF8",
      encre: "#23281F",
      encre2: "#545B4C",
      carroyage: "#7D8576",
      relief: "#B08A62",
      reliefMaitresse: "#8E6640",
      chaussee: "#FFFFFF",
      ecriture: "#C4472B",
      lecture: "#2F6DA8",
      lectureFond: "#E3ECF4",
      eauFond: "#BFD5E6",
      vegetation: "#6E8B4E",
      vegetationFond: "#D3DFC3",
      imageClair: "#9DAF8A",
      imageFonce: "#5F7550",
      terme: "#1E6E3C",
      manque: "#C99700",
      manqueFond: "#FBF1C8",
      lien: "#7A4A22",
      lienSurvol: "#4F2E12",
      survol: "#E5E9DD",
      verrouTrait: "#A3AA9B",
    },
    fonts: {
      serif: "'Source Serif 4', Georgia, serif",
      capitales: "'Barlow Condensed', 'Arial Narrow', sans-serif",
    },
    radius: 0,
    grid: 0,
    typingCps: 35,
  },
}
const DEFAULT_THEME = DEFAULT_THEMES[signature] ?? DEFAULT_THEMES[DEFAULT_SIGNATURE]
const themePath = cfg.theme ? at(cfg.theme) : null
let userTheme = themePath && existsSync(themePath) ? readJson(themePath, "thème") : {}
if (userTheme.signature !== undefined && !SIGNATURES.includes(userTheme.signature)) {
  fail(`thème ${cfg.theme} : « signature » vaut ${JSON.stringify(userTheme.signature)} : ${SIGNATURES.map((x) => `« ${x} »`).join(", ")} (ou retirer la clé : le thème vaut alors pour toutes les signatures)`)
} else if (userTheme.signature !== undefined && userTheme.signature !== signature && SIGNATURES.includes(signature)) {
  // Thème écrit pour l'autre signature : la signature choisie garde son rendu par défaut
  warn(`thème ${cfg.theme} écrit pour la signature « ${userTheme.signature} » : ignoré, la signature « ${signature} » prend son thème par défaut (changer ou retirer sa clé « signature » pour l'appliquer)`)
  userTheme = {}
}
const { signature: _themeSignature, ...themeKeys } = userTheme
const THEME = { ...DEFAULT_THEME, ...themeKeys, colors: { ...DEFAULT_THEME.colors, ...(themeKeys.colors ?? {}) }, fonts: { ...DEFAULT_THEME.fonts, ...(themeKeys.fonts ?? {}) } }
if (signature === "carte") {
  // Clés communes dérivées des jetons de la charte (après fusion), sauf celles que theme.json donne lui-même ; elles passent en tête
  for (const part of ["colors", "fonts"]) {
    const derived = {}
    for (const [key, from] of Object.entries(CARTE_ALIASES[part])) {
      const own = themeKeys[part]?.[key]
      if (own !== undefined) derived[key] = own
      else if (typeof from === "object") derived[key] = from.value
      else if (THEME[part][from] === undefined) fail(`thème : jeton « ${from} » de la signature carte absent (clé « ${key} » dérivée de lui)`)
      else derived[key] = THEME[part][from]
    }
    THEME[part] = { ...derived, ...THEME[part] }
  }
}
for (const [k, v] of Object.entries(THEME.colors)) if (typeof v !== "string" || !v.trim()) fail(`thème : couleur « ${k} » invalide`)
for (const [k, v] of Object.entries(THEME.fonts)) if (typeof v !== "string" || !v.trim()) fail(`thème : police « ${k} » invalide`)
if (!(Number(THEME.typingCps) > 0)) fail(`thème : « typingCps » doit être un nombre positif`)
if (!(Number(THEME.radius) >= 0)) fail(`thème : « radius » doit être un nombre positif ou nul`)
if (!(Number(THEME.grid) >= 0)) fail(`thème : « grid » (pas de la grille de points) doit être un nombre positif ou nul`)
if (signature === "bimaccess") {
  // DESIGN.md § 4 : aucun coin arrondi ; § 2 : accent = couleur du programme
  if (Number(THEME.radius) !== 0) warn(`thème : « radius » vaut ${THEME.radius} ; la signature bimaccess n'a aucun coin arrondi (DESIGN.md § 4) : le lecteur l'ignore`)
  if (programColor && String(THEME.colors.accent).toUpperCase() !== programColor) {
    warn(`thème : « accent » ${THEME.colors.accent} différent de la couleur du programme ${program ?? ""} (${programColor}) ; DESIGN.md § 2 : accent = couleur de programme`)
  }
  if (String(THEME.colors.background).toUpperCase() !== "#FFFFFF") {
    warn(`thème : fond ${THEME.colors.background} ; la signature bimaccess a un fond toujours blanc #FFFFFF (DESIGN.md § 2 : jamais de noir, de crème ni de beige)`)
  }
}
if (signature === "carte") {
  // Charte carte : aplats et traits, angles vifs ; un seul fond de page
  if (Number(THEME.radius) !== 0) warn(`thème : « radius » vaut ${THEME.radius} ; la signature carte n'a aucun coin arrondi : le lecteur l'ignore`)
  if (String(THEME.colors.background).toUpperCase() !== CARTE_FOND) warn(`thème : fond ${THEME.colors.background} ; la signature carte a un fond ${CARTE_FOND} partout (charte, § 2 : aucun autre fond de page)`)
  if (Number(THEME.grid) !== 0) warn(`thème : « grid » vaut ${THEME.grid} ; la signature carte n'a pas de grille de points (la feuille porte un carroyage) : le lecteur l'ignore`)
}

const ASSETS = {}
const assetsDir = cfg.assets ? at(cfg.assets) : null
if (assetsDir && existsSync(assetsDir)) {
  for (const f of readdirSync(assetsDir).filter((f) => f.endsWith(".svg")).sort()) {
    const raw = readFileSync(join(assetsDir, f), "utf8")
    // Analyse XML stricte : un SVG mal formé serait réparé en silence par le navigateur (parties perdues)
    const xml = checkSvgXml(raw)
    for (const p of xml) fail(`illustration ${f}, ligne ${p.line} : ${p.message}`)
    if (xml.length) continue
    // Prologue XML et doctype retirés : l'illustration est inlinée dans la page
    const svg = raw
      .replace(/<\?xml[\s\S]*?\?>/g, "")
      .replace(/<!DOCTYPE[^[>]*(?:\[[\s\S]*?\])?\s*>/gi, "")
      .trim()
    if (!/^<svg[\s>]/.test(svg.replace(/^(<!--[\s\S]*?-->\s*)+/, ""))) fail(`illustration ${f} : le fichier ne commence pas par <svg>`)
    if (/<script[\s>]/i.test(svg)) fail(`illustration ${f} : un SVG ne doit pas contenir de <script>`)
    ASSETS[f.replace(/\.svg$/, "")] = svg
  }
}

/** Identifiants des éléments d'une illustration (groupes animés par `parts`). */
const idsOf = (svg) => new Set([...svg.matchAll(/\sid\s*=\s*["']([^"']+)["']/g)].map((m) => m[1]))

/*
 * Illustrations nommées en clair dans les scènes : `<Svg name="maison" …/>`,
 * `asset("maison")`, `illustration("maison", […])`, et les groupes de `parts`
 * (`group: "maison-toit"`). Svg lit son illustration au RENDU : sans ce
 * contrôle, un fichier renommé ou supprimé passerait check et build et ne
 * casserait qu'à l'écran. Un nom calculé (variable) n'est pas vu ici :
 * préférer `const ILLU = illustration("nom", ["groupe"])` au niveau du module,
 * vérifié au chargement (--scenes).
 */
const lessonDir = join(ROOT, "src", "lesson")
const sourcesOf = (dir) =>
  existsSync(dir)
    ? readdirSync(dir).flatMap((f) => {
        const p = join(dir, f)
        return statSync(p).isDirectory() ? sourcesOf(p) : /\.(tsx?|jsx?)$/.test(f) ? [p] : []
      })
    : []
const known = () => Object.keys(ASSETS).join(", ") || "aucune"
for (const file of sourcesOf(lessonDir)) {
  const code = readFileSync(file, "utf8")
  const where = (index) => `${relative(ROOT, file).split("\\").join("/")}:${code.slice(0, index).split("\n").length}`
  for (const m of code.matchAll(/\b(?:asset|illustration)\(\s*["'`]([^"'`$]+)["'`]/g)) {
    if (ASSETS[m[1]] === undefined) fail(`${where(m.index)} : illustration « ${m[1]} » absente de ${cfg.assets ?? "content/design/assets"}/ (présentes : ${known()})`)
  }
  for (const m of code.matchAll(/<Svg\b[\s\S]*?\/>/g)) {
    const tag = m[0]
    const name = /\bname\s*=\s*(?:"([^"]+)"|'([^']+)'|\{\s*["'`]([^"'`$]+)["'`]\s*\})/.exec(tag)
    // <Svg svg={MAISON}> : nom repris de « const MAISON = illustration("maison", …) » du même fichier
    const byVar = /\bsvg\s*=\s*\{\s*([A-Za-z_$][\w$]*)\s*\}/.exec(tag)
    const declared = byVar ? new RegExp(`\\b${byVar[1]}\\s*=\\s*illustration\\(\\s*["'\`]([^"'\`$]+)["'\`]`).exec(code) : null
    const literal = name ? (name[1] ?? name[2] ?? name[3]) : declared ? declared[1] : null
    if (!literal) continue
    if (ASSETS[literal] === undefined) {
      fail(`${where(m.index)} : <Svg name="${literal}"> : illustration absente de ${cfg.assets ?? "content/design/assets"}/ (présentes : ${known()})`)
      continue
    }
    const ids = idsOf(ASSETS[literal])
    for (const g of tag.matchAll(/\bgroup\s*:\s*["'`]([^"'`$]+)["'`]/g)) {
      if (!ids.has(g[1])) fail(`${where(m.index + g.index)} : groupe « ${g[1]} » absent de l'illustration ${literal}.svg (id="${g[1]}" attendu sur un <g>)`)
    }
  }
}

/* ── Polices de la signature ────────────────────────────────────────────── */

/*
 * Signature bimaccess : Azeret Mono (200, 300, 400, 500) et IBM Plex Sans
 * (400, 500, 600), paquets @fontsource (licence OFL), sous-ensemble latin
 * (français et anglais : accents, œ, « », −, °, espaces fines), woff2
 * seulement. La construction les met en ligne dans dist/index.html (aucune
 * requête réseau, page lisible en file://). Fraunces (espace papier : 300,
 * 600, 600 italique) n'est embarquée que si une scène ou une illustration
 * l'emploie (`fonts.paper` ou « Fraunces » dans src/lesson/, « Fraunces »
 * dans un SVG) : aucun composant du moteur ne l'utilise. Signature carte :
 * Source Serif 4 (400, 600, italiques 400 et 600) et Barlow Condensed (500,
 * 600), mêmes paquets, même mise en ligne. Signature neutre : aucune police
 * (polices système).
 */
const usesPaperFont = () =>
  sourcesOf(lessonDir).some((f) => /\bfonts\.paper\b|Fraunces/.test(readFileSync(f, "utf8"))) || Object.values(ASSETS).some((svg) => /Fraunces/.test(svg))
const FONT_FACES = {
  bimaccess: [
    { family: "Azeret Mono", pkg: "@fontsource/azeret-mono", file: "azeret-mono", faces: [[200], [300], [400], [500]] },
    { family: "IBM Plex Sans", pkg: "@fontsource/ibm-plex-sans", file: "ibm-plex-sans", faces: [[400], [500], [600]] },
    { family: "Fraunces", pkg: "@fontsource/fraunces", file: "fraunces", faces: [[300], [600], [600, "italic"]], when: usesPaperFont },
  ],
  carte: [
    { family: "Source Serif 4", pkg: "@fontsource/source-serif-4", file: "source-serif-4", faces: [[400], [600], [400, "italic"], [600, "italic"]] },
    { family: "Barlow Condensed", pkg: "@fontsource/barlow-condensed", file: "barlow-condensed", faces: [[500], [600]] },
  ],
  neutral: [],
}
const fontFaces = (FONT_FACES[signature] ?? []).filter((f) => !f.when || f.when())
// Paquets cherchés depuis le projet, puis à côté de ce script (comme ses propres dépendances)
const fontRequires = [createRequire(join(ROOT, "package.json")), createRequire(import.meta.url)]
const packageDir = (pkg) => {
  for (const req of fontRequires) {
    try {
      return dirname(req.resolve(`${pkg}/package.json`))
    } catch {
      // candidat suivant
    }
  }
  return null
}
const fontCss = []
for (const f of fontFaces) {
  const dir = packageDir(f.pkg)
  if (!dir) {
    fail(`police « ${f.family} » de la signature ${signature} : paquet ${f.pkg} absent (lancer « npm install »)`)
    continue
  }
  for (const [w, style = "normal"] of f.faces) {
    const name = `files/${f.file}-latin-${w}-${style}.woff2`
    if (!existsSync(join(dir, name))) {
      fail(`police « ${f.family} » ${w} ${style} : ${f.pkg}/${name} absent (paquet incomplet : relancer « npm install »)`)
      continue
    }
    // Chemin de paquet : résolu par Vite à la construction, mis en ligne (data:) par vite-plugin-singlefile
    fontCss.push(`@font-face {\n  font-family: "${f.family}";\n  font-style: ${style};\n  font-weight: ${w};\n  font-display: block;\n  src: url("${f.pkg}/${name}") format("woff2");\n}`)
  }
}

/* ── Écriture ───────────────────────────────────────────────────────────── */

for (const w of warnings) console.warn(`[sync] attention ${w}`)
if (errors.length) {
  for (const e of errors) console.error(`[sync] ÉCHEC ${e}`)
  process.exit(1)
}
const HEAD = "// GÉNÉRÉ par scripts/sync.mjs à partir de content/ : ne pas éditer à la main.\n"
const gen = join(ROOT, "src", "generated")
mkdirSync(gen, { recursive: true })
/** N'écrit que ce qui change : le serveur de développement ne recharge pas pour rien. */
const write = (name, body) => {
  const file = join(gen, name)
  const next = HEAD + body
  if (!existsSync(file) || readFileSync(file, "utf8") !== next) writeFileSync(file, next)
}
/* Typographie française des textes affichés (écran, exercices) : espace insécable
 * avant « : ; ? ! » et à l'intérieur des guillemets, pour qu'aucun signe ne commence
 * une ligne. La narration n'est pas touchée : les locutions s'y calent mot pour mot. */
if ((cfg.lang ?? "fr") === "fr") {
  const nbsp = (t) => (typeof t === "string" ? t.replace(/ ([:;?!»])/g, "\u00a0$1").replace(/« /g, "«\u00a0") : t)
  for (const id of Object.keys(TEXTS)) {
    TEXTS[id].title = nbsp(TEXTS[id].title)
    TEXTS[id].screen = TEXTS[id].screen.map(nbsp)
  }
  for (const id of Object.keys(EXERCISES)) {
    const ex = EXERCISES[id]
    ex.question = nbsp(ex.question)
    ex.choices = ex.choices.map((c) => ({ ...c, label: nbsp(c.label), feedback: nbsp(c.feedback) }))
  }
}

write("texts.ts", `export const TEXTS: Readonly<Record<string, { readonly title: string; readonly screen: readonly string[]; readonly sections: Readonly<Record<string, { readonly codes: readonly string[]; readonly lines: readonly string[] }>> }>> = ${JSON.stringify(TEXTS, null, 2)}\n\nexport const EXERCISES: Readonly<Record<string, { readonly question: string; readonly choices: readonly { readonly key: string; readonly label: string; readonly feedback: string }[]; readonly expected: string | null }>> = ${JSON.stringify(EXERCISES, null, 2)}\n\nexport const SCENE_IDS = ${JSON.stringify(scenes.map((s) => s.id))} as const\n`)
write("narration.ts", `import type { Clip } from "../engine/types"\n\nexport const CLIPS: Readonly<Record<string, Clip>> = ${JSON.stringify(CLIPS)}\n`)
write("theme.ts", `export const THEME = ${JSON.stringify(THEME, null, 2)} as const\n`)
write("assets.ts", `export const ASSETS: Readonly<Record<string, string>> = ${JSON.stringify(ASSETS, null, 2)}\n`)
const metaBase = JSON.stringify(
  {
    id: cfg.id,
    title: cfg.title,
    lang: cfg.lang ?? "fr",
    fps: cfg.fps ?? 30,
    width: cfg.width ?? 1920,
    height: cfg.height ?? 1080,
    voiceStart: cfg.voiceStart ?? 0.4,
    tail: cfg.tail ?? 0.8,
    intro: cfg.intro ?? 3,
    typingCps: THEME.typingCps,
    // Décision de l'utilisateur seul (licence Remotion) : jamais changée par un agent
    acknowledgeRemotionLicense: cfg.acknowledgeRemotionLicense === true,
  },
  null,
  2,
)
// Signature et programme typés en union (pas en littéral) : le code compare librement les valeurs
const metaSignature = `,\n  "signature": ${JSON.stringify(signature)} as Signature,\n  "program": ${JSON.stringify(program)} as string | null,\n  "programColor": ${JSON.stringify(programColor)} as string | null\n}`
write(
  "meta.ts",
  `/** Signature graphique : « bimaccess » (CAD 2D, design-system DESIGN.md), « carte » (carte topographique) ou « neutral ». */\nexport type Signature = ${SIGNATURES.map((x) => JSON.stringify(x)).join(" | ")}\n\nexport const META = ${metaBase.replace(/\n}$/, metaSignature)} as const\n`,
)
{
  const file = join(gen, "fonts.css")
  const body = `/* GÉNÉRÉ par scripts/sync.mjs (signature « ${signature} ») : ne pas éditer à la main. */\n${fontCss.length ? `${fontCss.join("\n")}\n` : "/* Signature sans police embarquée : polices système. */\n"}`
  if (!existsSync(file) || readFileSync(file, "utf8") !== body) writeFileSync(file, body)
}
log(`${scenes.length} scène(s), ${STORY_CLIPS.length} clip(s) dont ${voiced} avec voix, ${Object.keys(EXERCISES).length} exercice(s), ${Object.keys(ASSETS).length} illustration(s), signature ${signature}${program ? `, programme ${program} (${programColor})` : programColor ? `, couleur de programme ${programColor}` : ""}, ${fontCss.length} police(s) embarquée(s)`)

/* ── Chargement des scènes (--scenes) ───────────────────────────────────── */

if (args.includes("--scenes")) {
  // Les scènes vérifient leurs locutions, leur ordre et leurs textes AU CHARGEMENT :
  // on les charge ici pour qu'une erreur arrête check/build au lieu d'une page cassée.
  const { createServer } = await import("vite")
  const server = await createServer({
    root: ROOT,
    configFile: existsSync(join(ROOT, "vite.config.ts")) ? join(ROOT, "vite.config.ts") : false,
    logLevel: "silent",
    appType: "custom",
    server: { middlewareMode: true, hmr: false, watch: null },
    optimizeDeps: { noDiscovery: true, include: [] },
  })
  let failed = null
  try {
    const mod = await server.ssrLoadModule("/src/lesson/lesson.ts")
    const n = mod.LESSON?.scenes?.length ?? 0
    if (n !== scenes.length) failed = `src/lesson/lesson.ts déclare ${n} scène(s), le storyboard en a ${scenes.length}`
    else log(`scènes chargées : ${n}, locutions, ordre, textes et illustrations nommées vérifiés`)
  } catch (e) {
    failed = `${e?.name ?? "Error"} : ${e?.message ?? String(e)}`
  } finally {
    await server.close()
  }
  if (failed) {
    console.error(`[sync] ÉCHEC chargement des scènes : ${failed}`)
    process.exit(1)
  }
}
