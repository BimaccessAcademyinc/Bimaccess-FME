/**
 * storyboard · lecture du storyboard et des alignements, partagée par
 * scripts/voice.mjs et scripts/lint-storyboard.mjs.
 *
 * COPIE STRICTE de la logique de scripts/sync.mjs (expressions des titres,
 * familles de sections, découpage en clips, texte d'une narration, exercice,
 * normalisation des mots, mots datés d'un alignement) : la voix doit découper
 * le storyboard exactement comme le lecteur, sinon la synchronisation refuse
 * le manifeste. Toute modification ici se reporte dans sync.mjs, et
 * inversement (`node scripts/voice.mjs test` compare les deux).
 *
 * Différences avec sync.mjs, sans effet sur le résultat : les problèmes sont
 * renvoyés dans des listes au lieu d'arrêter le script, et chaque ligne garde
 * son numéro pour les messages du contrôle de storyboard.
 */

export const SCENE_RE = /^# (S\d\d)\s*(?:·|-|–|—|:)\s*(.+?)\s*$/
export const SECTION_RE = /^## (.+?)\s*$/
export const CODE_RE = /`([^`]+)`/g

/** Familles de sections reconnues, en français et en anglais (identiques à sync.mjs). */
export const isScreen = (name) => /^(écran|ecran|screen|on[- ]screen)\b/i.test(name)
export const isNarration = (name) => /^(narration|voice[- ]?over)\b/i.test(name) || /\bnarration$/i.test(name)
export const isTriggered = (name) => /déclench|declench|event|trigger/i.test(name)
export const isExercise = (name) => /^(exercice|exercise)\b/i.test(name)

/**
 * Scènes du storyboard. Chaque scène : { id, title, line, sections: { [nom]: { name, line, text: string[], nums: number[] } } }.
 * `outside` : titres « # … » hors scène (avec leur ligne), `problems` : sections en double.
 */
export function parseStoryboard(md) {
  const scenes = []
  const outside = []
  const problems = []
  let scene = null
  let section = null
  md.split(/\r?\n/).forEach((raw, i) => {
    const n = i + 1
    const line = raw.replace(/\s+$/, "")
    const s = SCENE_RE.exec(line)
    if (s) {
      scene = { id: s[1], title: s[2], line: n, sections: {} }
      scenes.push(scene)
      section = null
      return
    }
    if (/^# /.test(line)) {
      // Partie hors scène (jauge, budget, addenda…) : jamais une source de textes
      outside.push({ line: n, text: line })
      scene = null
      section = null
      return
    }
    if (!scene) return
    const h = SECTION_RE.exec(line)
    if (h) {
      if (scene.sections[h[1]]) problems.push({ line: n, scene: scene.id, message: `${scene.id} : section « ## ${h[1]} » en double` })
      section = { name: h[1], line: n, text: [], nums: [] }
      scene.sections[h[1]] = section
      return
    }
    if (section) {
      section.text.push(line)
      section.nums.push(n)
    }
  })
  return { scenes, outside, problems }
}

export const clean = (s) => s.replace(/\*\*/g, "").replace(/\s+/g, " ").trim()

/** Textes entre accents graves d'une section, dans l'ordre. */
export const codesOf = (lines) => lines.flatMap((l) => [...l.matchAll(CODE_RE)].map((m) => m[1]))

/** Paragraphes d'une narration (texte dit, sans balisage). */
export const paragraphsOf = (lines) =>
  lines
    .join("\n")
    .split(/\n\s*\n/)
    .map((p) => clean(p.replace(/`/g, "")))
    .filter((p) => p && p !== "---")

export const CHOICE_RE = /^\s*[-*]\s*([a-z])\s*(?:·|-|–|:|\.|\))\s*`([^`]+)`\s*(?:→|->)\s*`([^`]+)`/
export const CHOICE_START_RE = /^\s*[-*]\s*[a-z]\s*(?:·|-|–|:|\.|\))/
/** Puce lue par sync.mjs comme un choix en majuscule (refusée), accents graves ou non : « - N.B. : … », « - D · … ». */
export const CHOICE_UPPER_RE = /^\s*[-*]\s*([A-Z])\s*(?:·|-|–|:|\.|\))/
export const QUESTION_RE = /^\s*Question\s*:\s*`([^`]+)`/i
export const EXPECTED_RE = /^\s*(?:Attendu|Expected)\s*:\s*([a-z])\b/i

/**
 * Exercice : « Question : `…` », « - a · `choix` → `conséquence` », « Attendu : b » (mêmes règles que sync.mjs,
 * dans le même ordre). Chaque problème : { kind, message, index } ; index = rang de la ligne fautive dans `lines`
 * (-1 pour l'exercice entier). Tout problème renvoyé ici fait échouer npm run sync.
 */
export function parseExercise(lines, sceneId) {
  const out = { question: "", choices: [], expected: null }
  const problems = []
  const add = (kind, message, index = -1) => problems.push({ kind, message: `${sceneId} : ${message}`, index })
  lines.forEach((l, i) => {
    const q = QUESTION_RE.exec(l)
    if (q) out.question = q[1]
    const c = CHOICE_RE.exec(l)
    const upper = CHOICE_UPPER_RE.exec(l)
    if (upper) {
      add("upper", `choix « ${upper[1]} » en majuscule « ${l.trim()} » : la lettre s'écrit en minuscule (« - ${upper[1].toLowerCase()} · \`choix\` → \`conséquence\` »)`, i)
    } else if (c) {
      if (out.choices.some((x) => x.key === c[1])) add("duplicate", `choix « ${c[1]} » en double dans l'exercice`, i)
      out.choices.push({ key: c[1], label: c[2], feedback: c[3] })
    } else if (CHOICE_START_RE.test(l)) {
      add("malformed", `choix mal formé « ${l.trim()} » (attendu : - a · \`choix\` → \`conséquence\`)`, i)
    }
    const e = EXPECTED_RE.exec(l)
    if (e && e[1] !== e[1].toLowerCase()) add("expected-upper", `« ${l.trim()} » : la lettre s'écrit en minuscule, comme le choix (« Attendu : ${e[1].toLowerCase()} »)`, i)
    else if (e) out.expected = e[1]
    else if (/^\s*(?:Attendu|Expected)\s*:/i.test(l)) add("expected-malformed", `« ${l.trim()} » mal écrit : « Attendu : b » (une lettre de choix)`, i)
  })
  if (!out.question) add("no-question", "exercice sans « Question : `…` »")
  if (out.choices.length < 2) add("few-choices", "exercice avec moins de deux choix « - a · `choix` → `conséquence` »")
  if (out.expected && !out.choices.some((c) => c.key === out.expected)) add("expected-unknown", `« Attendu : ${out.expected} » ne désigne aucun choix`)
  return { exercise: out, problems }
}

/**
 * Clips du storyboard, dans l'ordre : { id, scene, trigger, text, section, line }.
 * Même numérotation que sync.mjs : rang de la section « Narration… » dans la scène.
 */
export function storyClips(scenes) {
  const clips = []
  const problems = []
  const screens = {}
  for (const s of scenes) {
    let rank = 0
    let linear = 0
    screens[s.id] = []
    for (const [name, sec] of Object.entries(s.sections)) {
      if (isScreen(name)) screens[s.id] = codesOf(sec.text)
      if (isNarration(name)) {
        rank += 1
        const id = `${s.id}-${String(rank).padStart(2, "0")}`
        const trigger = isTriggered(name) ? "event" : "linear"
        const text = paragraphsOf(sec.text).join("\n\n")
        if (!text) problems.push(`${s.id} : section « ## ${name} » vide`)
        if (trigger === "linear") linear += 1
        clips.push({ id, scene: s.id, trigger, text, section: name, line: sec.line })
      }
    }
    if (linear > 1) problems.push(`${s.id} : ${linear} sections de narration linéaire ; une seule par scène (les suivantes : « ## Narration déclenchée »)`)
  }
  return { clips, problems, screens }
}

/** Même comparaison de textes que sync.mjs (espaces normalisés). */
export const sameText = (a, b) => String(a ?? "").replace(/\s+/g, " ").trim() === String(b ?? "").replace(/\s+/g, " ").trim()

export const round = (x) => Math.round(x * 1000) / 1000

/** Même normalisation que src/engine/timeline.ts et sync.mjs (normalizeToken). */
export const norm = (w) =>
  w
    .toLowerCase()
    .replace(/[’‘ʼ`]/g, "'")
    .replace(/^[^\p{L}\p{N}']+|[^\p{L}\p{N}']+$/gu, "")
export const tokens = (phrase) => String(phrase).split(/\s+/).map(norm).filter(Boolean)

/** Mots datés d'un alignement ElevenLabs (caractères et instants), comme sync.mjs. */
export function wordsFromAlignment(al) {
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

/** Nombre d'occurrences d'une locution (suite de mots normalisés) dans une liste de mots. */
export function countLocution(wordTexts, phrase) {
  const want = tokens(phrase)
  const spoken = wordTexts.map(norm).filter(Boolean)
  if (want.length === 0) return 0
  let hits = 0
  for (let i = 0; i + want.length <= spoken.length; i++) {
    if (want.every((t, j) => spoken[i + j] === t)) hits += 1
  }
  return hits
}
