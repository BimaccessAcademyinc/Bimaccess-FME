#!/usr/bin/env node
/**
 * lint-storyboard · contrôle du storyboard avant la voix, le dessin et le code.
 *
 * Structure (erreurs : le lecteur lirait mal ou pas du tout) :
 *   - scènes « # S01 · Titre », numérotées S01, S02… sans trou ni doublon ;
 *     titre de scène mal écrit (il ne serait pas lu comme une scène) ;
 *   - sections connues, en français ou en anglais (Intention, Mise en scène,
 *     Écran / Screen, Narration, Narration d'entrée, Narration déclenchée /
 *     Triggered narration, Exercice / Exercise, Comportement / Behavior) ;
 *     section en double ; titre qui serait lu comme une narration sans l'être ;
 *   - section que le lecteur ignorerait sans rien dire : « ### Narration »
 *     (niveau 3 ou plus), « ##Narration » (sans espace), « ##  Narration »
 *     (espaces multiples), tabulation ou espace insécable après les dièses,
 *     titre indenté, « # Narration » (niveau 1 : termine la scène),
 *     « ## Narration » placée hors scène (après un titre « # … » qui n'est
 *     pas une scène) ; titre de scène indenté ; BOM en tête du fichier ;
 *   - « Écran » : textes entre accents graves, accents graves fermés, puce
 *     ou ligne numérotée (« 1. … ») sans accents graves (elle ne s'afficherait
 *     pas ; une note pour le graphiste s'écrit sans puce ou dans « Mise en
 *     scène ») ;
 *   - « Narration » non vide, sans balisage qui serait dit (titre, citation,
 *     tableau, commentaire ou balise HTML, lien, italique *…* ou _…_), une
 *     seule narration linéaire par scène ;
 *   - « Exercice » : « Question : `…` », 2 à 5 choix « - a · `choix` →
 *     `conséquence` », lettres a, b, c…, « Attendu » qui désigne un choix ;
 *     toute puce « - X · », « - N.B. : » (majuscule puis séparateur) y est
 *     lue comme un choix en majuscule et fait échouer npm run sync : erreur.
 *     Les refus de l'exercice sont ceux de sync.mjs (lib/storyboard.mjs).
 *
 * Règles d'écriture (erreurs ou avertissements) :
 *   - tiret cadratin, première personne dans la voix, verdicts (« bravo »…),
 *     mots interdits (--forbid), terme imposé (--term) dit plus de
 *     --max-term fois dans toute la voix : erreurs ;
 *   - « ceci n'est pas… », questions dans la narration, consignes de mise en
 *     scène dans la voix, phrases trop longues, textes à l'écran trop longs,
 *     texte de l'écran que la narration ne nomme pas (l'animation n'aurait
 *     aucun mot où se caler) ou nomme plusieurs fois, phrase de narration
 *     recopiée à l'écran : avertissements ;
 *   - longueur de la narration par scène (environ --wpm mots par minute)
 *     comparée au tableau de durées par scène s'il existe (partie « # Structure
 *     temporelle », « # Durées », « # Timing » ou « # Budget » : colonnes
 *     « Scène » et « Durée », ligne « TOTAL ») : plus du double = erreur ;
 *     durées en « 1:20 », « 1 min 30 s », « 90 s », « 10 sec », « 2 min » ;
 *     nombre sans unité lu en minutes (avertissement), durée illisible =
 *     erreur ; total comparé à --max-minutes.
 *
 * Repères (storyboard du projet seulement) : chaque locution de
 * content/beats.json et des repères proposés du manifeste voix doit être dite
 * une fois exactement dans son clip (comme le vérifie npm run sync) ; clip
 * inconnu = erreur. Manifeste voix dont le texte ne suit plus le storyboard :
 * avertissement (npm run voice -- extract avant npm run sync).
 *
 * Usage : node scripts/lint-storyboard.mjs [storyboard.md] [--config studio.config.json]
 *         [--max-minutes N] [--wpm 150] [--forbid mot]… [--term terme]… [--max-term 1] [--lang fr|en]
 *         [--allow-first-person] [--max-sentence-words 30] [--max-screen-words 10] [--strict]
 * Code de sortie : 1 s'il y a une erreur (ou un avertissement avec --strict), 0 sinon.
 */
import { existsSync, readFileSync } from "node:fs"
import { dirname, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import {
  CHOICE_START_RE,
  CHOICE_UPPER_RE,
  codesOf,
  countLocution,
  isExercise,
  isNarration,
  isScreen,
  isTriggered,
  norm,
  paragraphsOf,
  parseExercise,
  parseStoryboard,
  QUESTION_RE,
  SCENE_RE,
  SECTION_RE,
  sameText,
  storyClips,
  tokens,
  wordsFromAlignment,
} from "./lib/storyboard.mjs"
import { MARKUP_PATTERNS, STAGING_PATTERNS } from "./lib/voice-lint.mjs"
import { parse as parseYaml } from "yaml"

/* ── Arguments ──────────────────────────────────────────────────────────── */

const argv = process.argv.slice(2)
const opt = { forbid: [], term: [] }
const positional = []
const VALUED = new Set(["--config", "--max-minutes", "--wpm", "--forbid", "--term", "--max-term", "--lang", "--max-sentence-words", "--max-screen-words"])
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (VALUED.has(a)) {
    const v = argv[++i]
    if (v === undefined) fatal(`option ${a} sans valeur`)
    if (a === "--forbid" || a === "--term") opt[a.slice(2)].push(v)
    else opt[a.slice(2)] = v
  } else if (a === "--help" || a === "-h") {
    console.log(readFileSync(fileURLToPath(import.meta.url), "utf8").split("*/")[0].replace(/^#!.*\n\/\*\*\n?/, "").replace(/^ \* ?/gm, ""))
    process.exit(0)
  } else if (a.startsWith("--")) opt[a.slice(2)] = true
  else positional.push(a)
}
function fatal(m) {
  console.error(`[lint:story] ÉCHEC ${m}`)
  process.exit(1)
}

let cfg = {}
const cfgPath = resolve(opt.config ?? "studio.config.json")
if (existsSync(cfgPath)) {
  try {
    cfg = JSON.parse(readFileSync(cfgPath, "utf8"))
  } catch (e) {
    fatal(`configuration illisible (${cfgPath}) : ${e.message}`)
  }
} else if (opt.config) fatal(`configuration introuvable : ${cfgPath}`)
const storyPath = positional[0] ? resolve(positional[0]) : cfg.storyboard ? resolve(dirname(cfgPath), cfg.storyboard) : null
if (!storyPath) fatal("aucun storyboard : passer son chemin, ou lancer depuis la racine du projet (studio.config.json)")
if (!existsSync(storyPath)) fatal(`storyboard introuvable : ${storyPath}`)
const shown = relative(process.cwd(), storyPath) || storyPath
const lang = String(opt.lang ?? cfg.lang ?? "fr").toLowerCase().startsWith("en") ? "en" : "fr"
const WPM = Number(opt.wpm) || 150
const MAX_SENTENCE = Number(opt["max-sentence-words"]) || 30
const MAX_SCREEN = Number(opt["max-screen-words"]) || 10
const MAX_TERM = opt["max-term"] !== undefined && Number.isFinite(Number(opt["max-term"])) ? Number(opt["max-term"]) : 1

/* ── Lecture ────────────────────────────────────────────────────────────── */

const md = readFileSync(storyPath, "utf8")
const lines = md.split(/\r?\n/)
const { scenes, outside, problems: parseProblems } = parseStoryboard(md)
const issues = []
const seenIssue = new Set()
/** Un même constat (ligne, lieu, message) n'est signalé qu'une fois. */
const report = (level, line, where, message) => {
  const k = `${level}|${line}|${where}|${message}`
  if (seenIssue.has(k)) return
  seenIssue.add(k)
  issues.push({ level, line, where, message })
}
const E = (line, where, message) => report("error", line, where, message)
const W = (line, where, message) => report("warning", line, where, message)

const STOP = new Set(
  "le la les l un une des de du d et ou à a au aux en dans sur pour par avec ce cet cette ces son sa ses leur leurs qui que quoi est sont il elle ils elles on se s ne pas plus the a an of and or to in on for with is are it its this that be by as at from".split(" "),
)
const countWords = (s) => (String(s).match(/[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu) ?? []).length
const sentences = (s) => String(s).split(/(?<=[.!?…])\s+/).map((x) => x.trim()).filter(Boolean)
const short = (s, n = 70) => (s.length > n ? `${s.slice(0, n - 1)}…` : s)
const mmss = (min) => `${Math.floor(min)}:${String(Math.round((min % 1) * 60)).padStart(2, "0")}`

/* ── Titres hors des scènes reconnues ───────────────────────────────────── */

lines.forEach((raw, i) => {
  const line = raw.replace(/\s+$/, "")
  const n = i + 1
  if (/^#\s*(S\s?\d|Sc[eè]ne\s*\d)/i.test(line) && !SCENE_RE.test(line)) {
    E(n, "titre", `titre de scène mal écrit « ${short(line)} » : il ne sera pas lu comme une scène ; écrire « # S01 · Titre » (S, deux chiffres, point médian, titre)`)
  }
  if (/^[\s\u200B-\u200D\u2060\uFEFF]+#\s*(S\s?\d|Sc[eè]ne\s*\d)/i.test(line)) {
    E(n, "titre", `titre de scène précédé d'un blanc « ${short(line.trim())} » : il ne sera pas lu (scène et contenu perdus sans message) ; écrire « # S01 · Titre » en début de ligne`)
  }
  if (/^##\s*S\d\d\b/.test(line)) E(n, "titre", `« ${short(line)} » : une scène est un titre de niveau 1 (« # S01 · Titre »)`)
  const s = SCENE_RE.exec(line)
  if (s && /^# S\d\d\s*—/.test(line)) W(n, s[1], "tiret cadratin dans le titre de scène : écrire « # S01 · Titre »")
  if (s && s[2].length > 50) W(n, s[1], `titre de scène long (${s[2].length} caractères) : il s'affiche dans l'en-tête du lecteur`)
})

if (md.startsWith("\uFEFF")) E(1, "storyboard", "marque d'ordre des octets (BOM) en tête du fichier : le premier titre n'est pas lu ; enregistrer en UTF-8 sans BOM")

/* ── Sections que le lecteur ignorerait sans rien dire ──────────────────── */

/** Nom sans blancs ni caractères invisibles en tête (le lecteur, lui, les garde). */
const stripBlank = (s) => s.replace(/^[\s\u200B-\u200D\u2060\uFEFF]+/, "")
// Familles lues par le lecteur (mêmes fonctions que sync.mjs), plus les noms qu'un auteur leur donne souvent
const readFamily = (name) => isScreen(name) || isNarration(name) || isExercise(name)
const looksFamily = (name) => readFamily(name) || /^(voix|voice|question|quiz)\b/i.test(name)
{
  let scene = null // scène en cours, comme parseStoryboard
  let lastScene = null
  let head = null // dernier titre « # … » hors scène
  lines.forEach((raw, i) => {
    const line = raw.replace(/\s+$/, "")
    const n = i + 1
    const sc = SCENE_RE.exec(line)
    if (sc) {
      scene = lastScene = sc[1]
      head = null
      return
    }
    if (/^# /.test(line)) {
      const name = line.replace(/^#\s+/, "")
      if (scene && readFamily(name)) E(n, scene, `« ${short(line)} » : titre de niveau 1, il termine la scène ${scene} et sa section n'est pas lue ; écrire « ## ${name} »`)
      scene = null
      head = { line: n, text: line }
      return
    }
    const h = SECTION_RE.exec(line)
    if (h) {
      const name = stripBlank(h[1])
      if (scene && name !== h[1] && looksFamily(name)) {
        // « ##  Narration » : sync garde l'espace en trop dans le nom, qui n'est plus reconnu
        E(n, scene, `« ${short(line)} » : ${separatorIssue(" " + h[1].slice(0, h[1].length - name.length))}, non lu comme section (son texte serait perdu ou mêlé à la section précédente) ; écrire « ## ${name} »`)
        return
      }
      if (!scene && readFamily(h[1])) {
        const where = head ? `après « ${short(head.text, 40)} » (ligne ${head.line}), qui n'est pas une scène` : "avant la première scène"
        const msg = `section « ## ${h[1]} » hors scène, ${where} : ignorée par le lecteur ; la placer dans une scène, avant tout titre « # … » qui n'en est pas une`
        if (lastScene) E(n, "hors scène", msg)
        else W(n, "hors scène", msg)
      }
      return
    }
    // Tout autre titre qui ressemble à une section : indenté, autre niveau, autre séparateur qu'une espace ASCII unique
    const m = /^([\s\u200B-\u200D\u2060\uFEFF]*)(#{1,6})([\s\u200B-\u200D\u2060\uFEFF]*)(\S.*)$/.exec(line)
    if (scene && m && looksFamily(m[4])) {
      const why = []
      if (m[1]) why.push("titre indenté")
      if (m[2].length !== 2) why.push(`titre de niveau ${m[2].length}`)
      if (m[3] !== " ") why.push(separatorIssue(m[3]))
      E(n, scene, `« ${short(line)} » : ${why.join(", ")}, non lu comme section (son texte serait perdu ou mêlé à la section précédente) ; écrire « ## ${m[4]} » en début de ligne`)
    }
  })
}

/** Ce qui ne va pas dans le séparateur entre les dièses et le nom (le lecteur exige une espace ASCII unique). */
function separatorIssue(sep) {
  if (sep === " ") return ""
  if (!sep) return "pas d'espace après les dièses"
  if (sep.includes("\t")) return "tabulation après les dièses"
  if (/[^ ]/.test(sep)) return "espace insécable ou invisible après les dièses"
  return "espaces multiples après les dièses"
}

/* ── Scènes ─────────────────────────────────────────────────────────────── */

if (scenes.length === 0) E(1, "storyboard", "aucune scène « # S01 · Titre »")
scenes.forEach((s, i) => {
  const want = `S${String(i + 1).padStart(2, "0")}`
  if (scenes.findIndex((x) => x.id === s.id) !== i) E(s.line, s.id, `scène ${s.id} en double`)
  else if (s.id !== want) E(s.line, s.id, `scène ${s.id} à la place de ${want} : les scènes se suivent sans trou (S01, S02, S03…)`)
})
for (const p of parseProblems) E(p.line, p.scene, p.message.replace(/^S\d\d : /, ""))

const KNOWN = [
  /^intention$/i,
  /^intent(ion)?$/i,
  /^objectifs?$/i,
  /^mise en sc[eè]ne$/i,
  /^staging$/i,
  /^direction$/i,
  /^comportement$/i,
  /^behaviou?r$/i,
  /^notes?$/i,
  /^narration d['’]entr[ée]e$/i,
  /^narration$/i,
  /^opening narration$/i,
  /^voice[- ]?over$/i,
  /^narration d[ée]clench[ée]e$/i,
  /^triggered narration$/i,
]

const STRONG_VERDICT = {
  fr: [/\bbravo\b/i, /\bf[ée]licitations\b/i, /\bbonne r[ée]ponse\b/i, /\bmauvaise r[ée]ponse\b/i, /\bc['’]est exact\b/i, /\bc['’]est faux\b/i, /\bbien jou[ée]\b/i],
  en: [/\bbravo\b/i, /\bcongratulations\b/i, /\bwell done\b/i, /\b(correct|right|wrong) answer\b/i, /\bgood job\b/i, /\bthat['’]s (right|wrong|correct)\b/i],
}
const WEAK_VERDICT = { fr: [/(?<![\p{L}])(parfait|exact|excellent)(?![\p{L}])/iu], en: [/\b(perfect|correct|excellent|great)\b/i] }
const NEGATION = { fr: /\b(ce|ceci|cela|ça) n['’]est pas\b/i, en: /\b(this|that|it) is not\b|\b(this|that|it)['’]s not\b|\bisn['’]t\b/i }
const FIRST_PERSON = {
  fr: [/(^|[^\p{L}'’])(je|j['’]|me|m['’]|mes|ma|mon|moi|mien|mienne|miens|miennes)(?=[^\p{L}]|$)/iu],
  en: [/(^|[^\p{L}'’])(I|I['’]m|I['’]ve|I['’]ll|I['’]d)(?![\p{L}])/u, /\b(me|my|mine|myself)\b/i],
}
const forbidRe = (w) => new RegExp(`(?<![\\p{L}\\p{N}])${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}\\p{N}])`, "iu")

/** Règles d'écriture communes à tout texte affiché ou dit. */
function commonText(text, line, where) {
  if (text.includes("—")) E(line, where, `tiret cadratin dans « ${short(text, 50)} » : deux-points, point médian ou virgule`)
  for (const w of opt.forbid) if (forbidRe(w).test(text)) E(line, where, `mot interdit « ${w} » dans « ${short(text, 50)} »`)
}

/** Règles de la voix. */
function voiceText(text, line, where) {
  commonText(text, line, where)
  if (!opt["allow-first-person"]) {
    for (const re of FIRST_PERSON[lang]) {
      const m = re.exec(text)
      if (m) E(line, where, `première personne (« ${m[2] ?? m[1]} ») : le narrateur décrit, le « vous » sert aux consignes (--allow-first-person si le brief l'impose)`)
    }
  }
  for (const re of [...STRONG_VERDICT.fr, ...STRONG_VERDICT.en]) {
    const m = re.exec(text)
    if (m) E(line, where, `verdict « ${m[0]} » : décrire la conséquence, jamais juger`)
  }
  for (const re of WEAK_VERDICT[lang]) {
    const m = re.exec(text)
    if (m) W(line, where, `« ${m[0]} » : verdict ? décrire la conséquence plutôt`)
  }
  if (NEGATION[lang].test(text)) W(line, where, `« ${short(NEGATION[lang].exec(text)[0])} » : dire ce que c'est plutôt que ce que ce n'est pas`)
  for (const s of sentences(text)) {
    if (/\?$/.test(s)) W(line, where, `question dans la narration « ${short(s)} » : une question rhétorique se dit en affirmation ; une consigne, à l'impératif`)
    if (STAGING_PATTERNS.some((re) => re.test(s))) W(line, where, `mise en scène dans la voix « ${short(s)} » : la narration enseigne, elle ne décrit pas l'écran`)
    const n = countWords(s)
    if (n > MAX_SENTENCE) W(line, where, `phrase de ${n} mots (au-delà de ${MAX_SENTENCE}) : « ${short(s)} »`)
  }
}

let exerciseCount = 0
const voiceTexts = []
const sceneWords = {}
const sceneLine = {}

for (const s of scenes) {
  const narrations = []
  let screenTexts = []
  let screenSections = 0
  let exerciseSections = 0
  let linear = 0
  let firstTriggered = null
  sceneLine[s.id] = s.line
  for (const [name, sec] of Object.entries(s.sections)) {
    const where = `${s.id} · ${name}`
    const family = isScreen(name) ? "screen" : isNarration(name) ? "narration" : isExercise(name) ? "exercise" : null
    if (!family && !KNOWN.some((re) => re.test(name)) && !(stripBlank(name) !== name && looksFamily(stripBlank(name)))) {
      if (/^(voix|voice|annotations?|textes? (à|a) l['’][ée]cran|on-screen text)$/i.test(name)) E(sec.line, where, `section « ## ${name} » non lue par le lecteur : écrire « ## ${/voi/i.test(name) ? "Narration" : "Écran"} »`)
      else if (/question|quiz|choix|exercic|exercis/i.test(name)) E(sec.line, where, `section « ## ${name} » non lue comme un exercice : écrire « ## Exercice »`)
      else W(sec.line, where, `section « ## ${name} » inconnue : ignorée par le lecteur (sections : Intention, Mise en scène, Écran, Narration, Narration d'entrée, Exercice, Narration déclenchée)`)
    }
    if (family === "narration" && !KNOWN.some((re) => re.test(name))) {
      W(sec.line, where, `« ## ${name} » sera lue comme une narration ${isTriggered(name) ? "déclenchée" : "linéaire"} (un clip de voix) : est-ce voulu ?`)
    }

    if (family === "screen") {
      screenSections += 1
      if (screenSections > 1) E(sec.line, where, "deuxième section d'écran dans la scène : seule la dernière est lue")
      sec.text.forEach((l, k) => {
        if ((l.match(/`/g) ?? []).length % 2) E(sec.nums[k], where, `accent grave non fermé : « ${short(l.trim())} »`)
        const bullet = /^\s*(?:[-*+]|\d+[.)])\s+(\S.*)$/.exec(l)
        if (bullet && !l.includes("`")) {
          E(sec.nums[k], where, `puce sans accents graves « ${short(l.trim())} » : elle ne s'affiche pas ; à afficher : « - \`${short(bullet[1].trim(), 40)}\` » ; note pour le graphiste ou le code : l'écrire sans puce, ou dans « ## Mise en scène »`)
        }
      })
      screenTexts = codesOf(sec.text).map((t, k) => ({ text: t, line: sec.nums[sec.text.findIndex((l) => l.includes(`\`${t}\``))] ?? sec.line, k }))
      if (screenTexts.length === 0) E(sec.line, where, "aucun texte entre accents graves : seul ce qui est entre accents graves s'affiche (- `Texte`)")
      for (const t of screenTexts) {
        commonText(t.text, t.line, where)
        const n = countWords(t.text)
        if (n > 20) E(t.line, where, `texte à l'écran de ${n} mots « ${short(t.text, 50)} » : un paragraphe ne se lit pas sur un téléphone ; une idée, huit mots environ`)
        else if (n > MAX_SCREEN) W(t.line, where, `texte à l'écran de ${n} mots « ${short(t.text, 50)} » : une idée, huit mots environ`)
      }
    }

    if (family === "narration") {
      const trigger = isTriggered(name) ? "event" : "linear"
      const text = paragraphsOf(sec.text).join("\n\n")
      const id = `${s.id}-${String(narrations.length + 1).padStart(2, "0")}`
      narrations.push({ id, trigger, text, line: sec.line })
      if (!text) E(sec.line, where, "narration vide : écrire le texte dit, ou retirer la section")
      if (trigger === "linear") {
        linear += 1
        if (linear > 1) E(sec.line, where, "deuxième narration linéaire dans la scène : une seule par scène ; la suivante s'intitule « ## Narration déclenchée »")
        if (firstTriggered) W(sec.line, where, `la narration d'entrée vient après une narration déclenchée (${firstTriggered}) : la placer en premier`)
      } else firstTriggered ??= id
      sec.text.forEach((l, k) => {
        const n = sec.nums[k]
        const markup = MARKUP_PATTERNS.filter(([re]) => re.test(l))
        for (const [re, kind, advice] of markup) E(n, where, `${kind} « ${short(re.exec(l)[0], 40)} » dans la narration : ${advice}`)
        if (/^\s*(#|>|\||```|<\/?[a-z]|<!--)/i.test(l)) E(n, where, `balisage dans la narration « ${short(l.trim())} » : ce qui est écrit ici est dit`)
        else if (markup.length) {
          // déjà signalé ci-dessus
        } else if (/\[[^\]]+\]\([^)]+\)|(?<![\p{L}\p{N}])_[^_]+_(?![\p{L}\p{N}])/u.test(l)) E(n, where, `lien ou italique Markdown dans la narration « ${short(l.trim())} » : ce qui est écrit ici est dit`)
        else if (/`|\*\*/.test(l)) W(n, where, "accents graves ou gras dans la narration : retirés à la lecture, mais le texte dit s'écrit sans balisage")
        if (/^\s*[-*]\s+/.test(l)) W(n, where, "puce dans la narration : la voix lit un texte suivi ; écrire des phrases")
      })
      if (text) {
        voiceText(text, sec.line, where)
        voiceTexts.push(text)
      }
    }

    if (family === "exercise") {
      exerciseSections += 1
      exerciseCount += 1
      if (exerciseSections > 1) E(sec.line, where, "deuxième exercice dans la scène : un seul par scène")
      const { exercise, problems } = parseExercise(sec.text, s.id)
      // Mêmes refus que npm run sync (lib/storyboard.mjs est sa copie) : chaque problème sur sa ligne
      for (const p of problems) {
        const l = p.index >= 0 ? sec.text[p.index] : ""
        const n = p.index >= 0 ? sec.nums[p.index] : sec.line
        // Choix mal formé sans flèche : le contrôle « choix sans conséquence » ci-dessous le dit déjà
        if (p.kind === "malformed" && !/(→|->)/.test(l)) continue
        if (p.kind === "upper") {
          const letter = CHOICE_UPPER_RE.exec(l)[1]
          E(n, where, `puce « ${short(l.trim())} » lue comme un choix en majuscule (« ${letter} ») : npm run sync échouera ; choix : « - ${letter.toLowerCase()} · \`choix\` → \`conséquence\` », note : sans puce ou dans « ## Mise en scène »`)
        } else E(n, where, p.message.replace(/^S\d\d : /, ""))
      }
      let questions = 0
      sec.text.forEach((l, k) => {
        const n = sec.nums[k]
        if (/^\s*Question\s*:/i.test(l)) {
          questions += 1
          if (!QUESTION_RE.test(l)) E(n, where, "question sans accents graves : « Question : `Texte de la question` »")
        }
        if ((l.match(/`/g) ?? []).length % 2) E(n, where, `accent grave non fermé : « ${short(l.trim())} »`)
        if (CHOICE_START_RE.test(l) && !/(→|->)/.test(l)) E(n, where, "choix sans conséquence : chaque choix montre ce qui se passe (« → `conséquence` »)")
      })
      if (questions > 1) W(sec.line, where, `${questions} lignes « Question » : seule la dernière est lue`)
      if (exercise.choices.length > 5) E(sec.line, where, `${exercise.choices.length} choix : cinq au plus (trois plausibles valent mieux)`)
      exercise.choices.forEach((c, k) => {
        const want = String.fromCharCode(97 + k)
        if (c.key !== want) W(sec.line, where, `choix « ${c.key} » en position ${k + 1} : lettres attendues dans l'ordre (a, b, c…)`)
        commonText(c.label, sec.line, where)
        commonText(c.feedback, sec.line, where)
        if (countWords(c.label) > 12) W(sec.line, where, `choix ${c.key} long (${countWords(c.label)} mots) : des choix courts et de longueur comparable`)
        if (countWords(c.feedback) > 45 || sentences(c.feedback).length > 2) W(sec.line, where, `conséquence ${c.key} longue : une ou deux phrases`)
        for (const re of [...STRONG_VERDICT.fr, ...STRONG_VERDICT.en]) if (re.test(c.feedback)) E(sec.line, where, `conséquence ${c.key} : verdict « ${re.exec(c.feedback)[0]} » ; décrire ce qui se passe`)
      })
      if (exercise.question) {
        commonText(exercise.question, sec.line, where)
        if (countWords(exercise.question) > 25) W(sec.line, where, `question longue (${countWords(exercise.question)} mots)`)
      }
    }
  }

  // Narrations et exercice de la scène
  const hasExercise = exerciseSections > 0
  if (!narrations.length && !hasExercise) W(s.line, s.id, "scène sans narration ni exercice : elle dure le temps d'« intro » (3 s), sans voix")
  if (!narrations.length && hasExercise) W(s.line, s.id, "exercice sans narration : aucune consigne n'est dite")
  if (narrations.some((x) => x.trigger === "event") && !hasExercise) W(s.line, s.id, "narration déclenchée sans exercice : une logique de scène propre doit la demander (rôle code)")

  // Écran ↔ narration : chaque élément affiché est nommé par la voix
  if (narrations.length) {
    const words = narrations.map((x) => ({ id: x.id, toks: tokens(x.text) }))
    // Mots dits, élisions retirées (« l'évaporateur » nomme « Évaporateur »)
    const bare = (w) => w.replace(/^(l|d|j|m|n|s|t|c|qu|jusqu|lorsqu|puisqu)'/, "")
    const all = new Set(words.flatMap((x) => x.toks.map(bare)))
    const sentencesSaid = narrations.flatMap((x) => sentences(x.text)).map((x) => tokens(x).join(" "))
    for (const t of screenTexts) {
      const want = tokens(t.text)
      if (!want.length) continue
      const counts = words.map((x) => {
        let c = 0
        for (let i = 0; i + want.length <= x.toks.length; i++) if (want.every((w, j) => x.toks[i + j] === w)) c += 1
        return { id: x.id, c }
      })
      const total = counts.reduce((a, b) => a + b.c, 0)
      if (total > 0 && !counts.some((x) => x.c === 1)) {
        const where = counts.filter((x) => x.c > 1).map((x) => `${x.c} fois dans ${x.id}`).join(", ")
        W(t.line, `${s.id} · Écran`, `« ${short(t.text, 50)} » dit ${where} : l'élément ne pourra se caler que sur une locution plus longue, unique dans le clip`)
      }
      if (total === 0) {
        const significant = want.map(bare).filter((w) => (w.length >= 4 || /\d/.test(w)) && !STOP.has(w))
        if (significant.length && !significant.some((w) => all.has(w))) {
          W(t.line, `${s.id} · Écran`, `« ${short(t.text, 50)} » n'est nommé par aucune narration de la scène : l'animation n'aura aucun mot où se caler`)
        }
      }
      if (want.length >= 8 && sentencesSaid.includes(want.join(" "))) W(t.line, `${s.id} · Écran`, `« ${short(t.text, 50)} » recopie une phrase de la narration : l'écran porte les mots-clés, la voix l'explication`)
    }
  }
  sceneWords[s.id] = narrations.reduce((a, x) => a + countWords(x.text), 0)
}

/* ── Durées ─────────────────────────────────────────────────────────────── */

/**
 * Durée d'une cellule : { minutes, warning?, error? }, ou null si elle est vide.
 * Formes lues : « 1:20 », « 1 min 30 s », « 1 min 30 », « 1min30 », « 2 min »,
 * « 1,5 min », « 90 s », « 10 sec », « 45 secondes » ; un nombre seul est lu
 * en minutes (avertissement) ; toute autre forme est une erreur.
 */
const SEC = String.raw`(?:s|sec|secs|seconde|secondes|second|seconds|")`
const MIN = String.raw`(?:min|mins|mn|minute|minutes|m|')`
const NUM = String.raw`(\d+(?:\.\d+)?)`
function durationOf(cell) {
  const c = cell.replace(/\*/g, "").trim().toLowerCase().replace(/(\d),(\d)/g, "$1.$2").replace(/^(≈|~|env\.?|environ|about|approx\.?)\s*/, "")
  if (!c || /^[-–—]$/.test(c)) return null
  let m = /^(\d+):(\d\d)(?:\s*min)?$/.exec(c)
  if (m) return { minutes: Number(m[1]) + Number(m[2]) / 60 }
  m = new RegExp(`^${NUM}\\s*${MIN}\\s*(?:(\\d+)\\s*${SEC}?)?$`).exec(c)
  if (m) return { minutes: Number(m[1]) + (m[2] ? Number(m[2]) / 60 : 0) }
  m = new RegExp(`^${NUM}\\s*${SEC}$`).exec(c)
  if (m) return { minutes: Number(m[1]) / 60 }
  m = new RegExp(`^${NUM}$`).exec(c)
  if (m) return { minutes: Number(m[1]), warning: `durée « ${cell.trim()} » sans unité : lue comme ${m[1]} min ; écrire « ${m[1]} min », « ${m[1]} s » ou « m:ss »` }
  if (/\d/.test(c)) return { minutes: null, error: `durée « ${cell.trim()} » illisible : écrire « 1:20 », « 1 min 30 s », « 90 s » ou « 2 min »` }
  return null
}

/** Tableau de durées par scène sous un titre hors scène ; null s'il n'a aucune ligne de scène. */
function readDurations(head) {
  const rows = new Map() // groupe « S02 S03 » → { minutes, line }
  const forms = []
  const cellIssues = [] // { level, line, message }
  const minutesOf = (cell, line) => {
    const d = durationOf(cell)
    if (d?.error) cellIssues.push({ level: "error", line, message: d.error })
    if (d?.warning) cellIssues.push({ level: "warning", line, message: d.warning })
    return d && d.minutes !== null ? d.minutes : null
  }
  let total = null
  let header = null
  let prevForm = null
  for (let i = head.line; i < lines.length; i++) {
    const l = lines[i]
    if (/^# /.test(l)) break
    if (!/^\s*\|/.test(l)) continue
    const cells = l.trim().replace(/^\||\|$/g, "").split("|").map((c) => c.trim())
    if (cells.every((c) => /^:?-+:?$/.test(c))) continue
    if (!header) {
      header = cells.map((c) => norm(c.replace(/\*/g, "")))
      continue
    }
    const col = (re) => header.findIndex((h) => re.test(h))
    const sceneCol = col(/^(scène|scene|scènes|scenes)$/)
    const durCol = col(/^(durée|duree|duration|minutes|temps)$/)
    if (durCol < 0 || sceneCol < 0) break
    const formCol = col(/^(forme|form)$/)
    // Ligne de total : « Total » dans la colonne Scène, ou seul dans une autre cellule d'une ligne sans scène
    const sceneCell = cells[sceneCol] ?? ""
    if (/total/i.test(sceneCell) || (!/S\d\d/.test(sceneCell) && cells.some((c) => /^total$/i.test(c.replace(/\*/g, "").trim())))) {
      total = minutesOf(cells[durCol] ?? "", i + 1)
      continue
    }
    const ids = (cells[sceneCol] ?? "").match(/S\d\d/g) ?? []
    const min = minutesOf(cells[durCol] ?? "", i + 1)
    if (!ids.length || min === null) continue
    const key = ids.join(" ")
    const prev = rows.get(key)
    rows.set(key, { minutes: (prev?.minutes ?? 0) + min, line: i + 1 })
    if (formCol >= 0) {
      const form = norm((cells[formCol] ?? "").split(/[·:]/)[0] ?? "")
      if (form && form === prevForm) forms.push({ line: i + 1, text: cells[formCol] })
      prevForm = form
    }
  }
  return rows.size || total !== null || cellIssues.length ? { head, rows, total, forms, cellIssues } : null
}

const PLAN_HEAD = /^#\s+(Structure temporelle|Durées?|Timing|Budget)\b/i
const plan = outside
  .filter((o) => PLAN_HEAD.test(o.text))
  .map(readDurations)
  .find(Boolean)
const budgetHead = plan?.head ?? null
const planName = budgetHead ? budgetHead.text.replace(/^#\s+/, "").split(/\s+(?:validé|par|le)\s+/)[0] : "Budget"
const declared = plan?.rows ?? new Map()
const declaredTotal = plan?.total ?? null
for (const f of plan?.forms ?? []) W(f.line, planName, `forme « ${f.text} » deux fois de suite : varier les formes`)
for (const c of plan?.cellIssues ?? []) report(c.level, c.line, planName, c.message)

const estimate = (ids) => ids.reduce((a, id) => a + (sceneWords[id] ?? 0), 0) / WPM
const covered = new Set()
for (const [key, d] of declared) {
  const ids = key.split(" ")
  ids.forEach((id) => covered.add(id))
  const missing = ids.filter((id) => !(id in sceneWords))
  if (missing.length) {
    W(d.line, planName, `${missing.join(", ")} au budget mais absente(s) du storyboard`)
    continue
  }
  const est = estimate(ids)
  if (est > d.minutes * 2 + 0.1) E(d.line, planName, `${key} : narration ≈ ${mmss(est)} pour ${mmss(d.minutes)} prévues (plus du double) : couper le texte ou revoir le budget`)
  else if (est > d.minutes * 1.2 + 0.1) W(d.line, planName, `${key} : narration ≈ ${mmss(est)} pour ${mmss(d.minutes)} prévues`)
}
if (budgetHead && declared.size) {
  for (const s of scenes) if (!covered.has(s.id) && sceneWords[s.id]) W(s.line, s.id, `scène absente du tableau « # ${planName} »`)
} else {
  for (const s of scenes) {
    const est = estimate([s.id])
    if (est > 3) W(s.line, s.id, `narration ≈ ${mmss(est)} : une scène de plus de trois minutes se découpe`)
  }
}
const totalEst = estimate(scenes.map((s) => s.id))
if (opt["max-minutes"] && totalEst > Number(opt["max-minutes"])) E(1, "storyboard", `narration totale ≈ ${mmss(totalEst)} au-delà de --max-minutes ${opt["max-minutes"]}`)
if (declaredTotal !== null && totalEst > declaredTotal * 1.2 + 0.1) W(budgetHead.line, planName, `narration totale ≈ ${mmss(totalEst)} pour un total prévu de ${mmss(declaredTotal)}`)
const voiceAll = voiceTexts.join(" ")
for (const t of opt.term) {
  const n = (voiceAll.match(new RegExp(`(?<![\\p{L}\\p{N}])${t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}\\p{N}])`, "giu")) ?? []).length
  if (n > MAX_TERM) E(1, "storyboard", `terme « ${t} » dit ${n} fois dans la voix (--max-term ${MAX_TERM}) : le nommer une fois, puis le reprendre par « il », « ce document »…`)
}
if (exerciseCount > 2) W(1, "storyboard", `${exerciseCount} exercices : deux au plus, chacun difficile et utile pour la suite`)

/* ── Repères et manifeste voix (storyboard du projet seulement) ─────────── */

// Les mêmes contrôles que npm run sync : un storyboard accepté ici ne fait pas échouer la synchronisation sur ses repères
const projectStory = existsSync(cfgPath) && cfg.storyboard && resolve(dirname(cfgPath), cfg.storyboard) === storyPath
if (projectStory) {
  const ROOT = dirname(cfgPath)
  const story = storyClips(scenes)
  const clipById = new Map(story.clips.map((c) => [c.id, c]))
  let manifest = null
  const manifestPath = cfg.manifest ? resolve(ROOT, cfg.manifest) : null
  if (manifestPath && existsSync(manifestPath)) {
    try {
      manifest = parseYaml(readFileSync(manifestPath, "utf8"))
    } catch (e) {
      W(1, "voix", `manifeste voix illisible (${cfg.manifest}) : ${e.message} ; npm run sync échouera`)
    }
  }
  const rows = Array.isArray(manifest?.clips) ? manifest.clips : []
  const stale = []
  for (const r of rows) {
    const c = clipById.get(r?.clip_id)
    if (!c) stale.push(`${r?.clip_id ?? "?"} n'existe plus`)
    else if (!sameText(String(r.text ?? ""), c.text)) stale.push(`${c.id} a changé`)
  }
  for (const c of story.clips) if (manifest && !rows.some((r) => r?.clip_id === c.id)) stale.push(`${c.id} est nouveau`)
  if (stale.length) W(1, "voix", `manifeste voix en retard sur le storyboard (${stale.join(", ")}) : npm run voice -- extract (ou generate) avant npm run sync, qui sinon le refuse`)

  /** Mots où le lecteur cherchera la locution : alignement de la voix si elle suit le texte, sinon le texte lui-même. */
  const wordsOf = (c) => {
    const r = rows.find((x) => x?.clip_id === c.id)
    if (r && sameText(String(r.text ?? ""), c.text) && r.alignment) {
      for (const p of [resolve(ROOT, String(r.alignment)), manifestPath && resolve(dirname(manifestPath), String(r.alignment))]) {
        if (!p || !existsSync(p)) continue
        try {
          return { words: wordsFromAlignment(JSON.parse(readFileSync(p, "utf8"))).map((w) => w.text), from: "la voix" }
        } catch {
          break
        }
      }
    }
    return { words: c.text.split(/\s+/), from: "la narration" }
  }
  const beatsPath = cfg.beats ? resolve(ROOT, cfg.beats) : null
  let extra = {}
  if (beatsPath && existsSync(beatsPath)) {
    try {
      extra = JSON.parse(readFileSync(beatsPath, "utf8")) ?? {}
    } catch (e) {
      E(1, "repères", `${cfg.beats} illisible : ${e.message}`)
    }
  }
  for (const id of Object.keys(extra)) if (!clipById.has(id)) E(1, "repères", `${cfg.beats} : repères pour « ${id} », clip absent du storyboard (clips : ${[...clipById.keys()].join(", ") || "aucun"}) ; renommer ou retirer l'entrée`)
  for (const c of story.clips) {
    const r = rows.find((x) => x?.clip_id === c.id)
    const suggested = r && sameText(String(r.text ?? ""), c.text) ? (r.suggested_beats ?? {}) : {}
    const all = { ...suggested, ...(extra[c.id] ?? {}) }
    if (!Object.keys(all).length) continue
    const { words, from } = wordsOf(c)
    for (const [key, phrase] of Object.entries(all)) {
      const n = countLocution(words, String(phrase))
      const origin = key in (extra[c.id] ?? {}) ? cfg.beats : "suggested_beats du manifeste"
      if (n === 0) E(c.line, `${c.id}.${key}`, `repère « ${phrase} » (${origin}) introuvable dans ${from} du clip : npm run sync échouera ; recaler la locution sur des mots dits`)
      else if (n > 1) E(c.line, `${c.id}.${key}`, `repère « ${phrase} » (${origin}) dit ${n} fois dans ${from} du clip : l'allonger pour qu'il soit unique`)
    }
  }
}

/* ── Sortie ─────────────────────────────────────────────────────────────── */

const clipCount = scenes.reduce((a, s) => a + Object.keys(s.sections).filter(isNarration).length, 0)
console.log(`[lint:story] ${shown} : ${scenes.length} scène(s), ${clipCount} narration(s), ${exerciseCount} exercice(s), voix ≈ ${mmss(totalEst)} à ${WPM} mots/min`)
for (const s of scenes) console.log(`  ${s.id} · ${short(s.title, 60)}  (${sceneWords[s.id]} mots ≈ ${mmss(estimate([s.id]))})`)
const byLine = (a, b) => a.line - b.line
const show = (i) => console.log(`  L${i.line} · ${i.where} : ${i.message}`)
const errors = issues.filter((i) => i.level === "error").sort(byLine)
const warnings = issues.filter((i) => i.level === "warning").sort(byLine)
if (errors.length) {
  console.log(`\nErreurs (${errors.length}) :`)
  errors.forEach(show)
}
if (warnings.length) {
  console.log(`\nAvertissements (${warnings.length}) :`)
  warnings.forEach(show)
}
const failed = errors.length > 0 || (opt.strict && warnings.length > 0)
if (failed) {
  console.log(`\n[lint:story] ÉCHEC : ${errors.length} erreur(s), ${warnings.length} avertissement(s)${!errors.length ? " (--strict)" : ""}`)
  process.exit(1)
}
console.log(`\n[lint:story] ${warnings.length ? `aucune erreur, ${warnings.length} avertissement(s) à examiner` : "rien à signaler"}`)
