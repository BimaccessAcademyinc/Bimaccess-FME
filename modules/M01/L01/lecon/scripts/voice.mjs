#!/usr/bin/env node
/**
 * voice · narration ElevenLabs du contenu, pilotée par le storyboard.
 *
 * Un clip par section « ## Narration… » d'une scène (mêmes identifiants que le
 * lecteur : S03-01, S03-02…), son audio MP3, son alignement caractère par
 * caractère et un manifeste (content/voice/voice-manifest.yaml) que
 * `npm run sync` relit. Le contenu fonctionne sans voix : minutage estimé
 * sur le texte et sous-titres actifs.
 *
 * Commandes (depuis la racine du projet : npm run voice -- <commande>) :
 *   status                 clips à générer et pourquoi (sans réseau)
 *   extract [--prune]      storyboard → manifeste : garde l'audio des clips au
 *                          texte inchangé (et d'un clip seulement renuméroté),
 *                          invalide les autres ; --prune supprime les fichiers
 *                          audio que plus aucun clip n'utilise (sans réseau)
 *   lint                   pièges de synthèse (sigles, nombres, symboles,
 *                          ponctuation, longueur, mise en scène, termes
 *                          proscrits) et dictionnaire de prononciation
 *   quota                  caractères utilisés et restants sur le compte
 *   generate --approuve <caractères> [--only S02-01|S02 …] [--force] [--no-beats] [--no-quota-check]
 *                          génère les clips nouveaux ou modifiés, un par un ;
 *                          manifeste écrit après chaque clip (relancer reprend).
 *                          Dépense : sans --approuve couvrant les caractères à
 *                          synthétiser (montant approuvé par Ilyas), annonce le
 *                          coût (caractères, crédits estimés) et ne génère rien
 *   verify                 manifeste ↔ storyboard, fichiers, alignements,
 *                          durées, repères proposés, fichiers orphelins
 *   voices [--lang fr] [--search "texte"] [--json]
 *                          voix du compte, une ligne par voix : voice_id, nom,
 *                          catégorie, langues, accent, genre, usage ; --lang
 *                          garde les voix qui annoncent cette langue (ou
 *                          aucune). Lecture seule, aucun caractère dépensé
 *   try "<phrase avec {}>" --approuve <caractères> [--variants "A|B|C"] [--voice <voice_id>] [--out dossier]
 *                          court essai de prononciation, hors du contenu ; payant
 *                          comme generate : coût annoncé, refus sans --approuve
 *                          (défaut : .studio/tmp/voice-try/) ; --voice essaie
 *                          une autre voix que celle de la configuration, sans
 *                          la modifier (défaut : .studio/tmp/voice-try/<voice_id>/,
 *                          un essai n'écrase pas celui d'une autre voix)
 *   test [--keep]          auto-test hors ligne, contre un faux serveur local
 *
 * Options communes : --config studio.config.json (défaut : celui du dossier
 * courant), --voice-config <fichier> (défaut : content/voice/voice.config.yaml).
 *
 * Environnement :
 *   ELEVENLABS_API_KEY   la clé, et seulement là : jamais dans un fichier, jamais
 *                        affichée (toute sortie la masque), jamais en argument
 *   ELEVENLABS_BASE_URL  autre adresse de l'API (défaut https://api.elevenlabs.io),
 *                        par exemple un faux serveur d'essai
 *
 * Dépenses (règle d'Ilyas du 2026-11-27) : aucun appel payant sans son accord, et
 * le coût s'annonce avant. generate et try comptent les caractères à envoyer
 * (après le dictionnaire) et refusent tant que --approuve ne les couvre pas ;
 * un agent délégué prépare la commande et rend la main, l'agent principal
 * annonce le coût. status, extract, lint, verify, quota et voices ne dépensent rien.
 *
 * Codes de sortie : 0 succès, 1 erreur, 2 clé absente ou mal formée (generate, quota, voices, try),
 * 3 dépense non approuvée (generate, try : coût annoncé, rien envoyé).
 */
import { createHash } from "node:crypto"
import { existsSync, mkdirSync, readdirSync, readFileSync, renameSync, rmSync, statSync, writeFileSync } from "node:fs"
import { dirname, join, relative, resolve } from "node:path"
import { fileURLToPath } from "node:url"
import { parse as parseYaml, stringify as stringifyYaml } from "yaml"
import { checkAlignment } from "./lib/alignment.mjs"
import { mp3Duration } from "./lib/mp3.mjs"
import { applyDictionary, loadDictionary } from "./lib/pronunciation.mjs"
import { countLocution, parseStoryboard, round, sameText, storyClips } from "./lib/storyboard.mjs"
import { lintClipText, modelCharLimit, STAGING_PATTERNS } from "./lib/voice-lint.mjs"

/* ── Sorties : la clé n'apparaît jamais ─────────────────────────────────── */

const KEY = (process.env.ELEVENLABS_API_KEY ?? "").trim()
const redact = (s) => (KEY.length >= 4 ? String(s).split(KEY).join("[clé masquée]") : String(s))
const out = (...m) => console.log(redact(m.join(" ")))
const say = (...m) => out("[voice]", ...m)
const warnLine = (...m) => console.error(redact(["[voice] attention", ...m].join(" ")))
const errLine = (...m) => console.error(redact(["[voice] ÉCHEC", ...m].join(" ")))
const die = (msg, code = 1) => {
  errLine(msg)
  process.exit(code)
}
process.on("uncaughtException", (e) => die(e?.message ?? String(e)))
process.on("unhandledRejection", (e) => die(e?.message ?? String(e)))

/* ── Arguments ──────────────────────────────────────────────────────────── */

const VALUED = new Set(["--approuve", "--config", "--voice-config", "--only", "--variants", "--out", "--tmp", "--voice", "--lang", "--search", "--page-size"])
const argv = process.argv.slice(2)
const positional = []
const opt = { only: [] }
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (VALUED.has(a)) {
    const v = argv[++i]
    if (v === undefined) die(`option ${a} sans valeur`)
    if (a === "--only") opt.only.push(...v.split(",").map((x) => x.trim()).filter(Boolean))
    else opt[a.slice(2)] = v
  } else if (a.startsWith("--")) opt[a.slice(2)] = true
  else if (a === "-h") opt.help = true
  else positional.push(a)
}
const command = positional[0]
const HERE = dirname(fileURLToPath(import.meta.url))
if (!command || opt.help || command === "help") {
  console.log(readFileSync(fileURLToPath(import.meta.url), "utf8").split("*/")[0].replace(/^#!.*\n\/\*\*\n?/, "").replace(/^ \* ?/gm, ""))
  process.exit(command || opt.help ? 0 : 1)
}

/* ── Projet ─────────────────────────────────────────────────────────────── */

// Réglages par défaut : recette V4 du rôle Voix du cours (sans voix choisie : voice_id vient de voice.config.yaml)
const DEFAULT_VOICE = {
  voice_id: "",
  voice_name: "",
  model_id: "eleven_v4",
  language_code: "",
  output_format: "mp3_44100_128",
  voice_settings: { stability: 0.5, similarity_boost: 0.9, style: 0, use_speaker_boost: true, speed: 1 },
  apply_text_normalization: "",
  seed: null,
  context_between_clips: true,
  dictionary: "content/voice/pronunciations.yaml",
  max_chars_per_clip: null,
  request_timeout_s: 300,
  retry_delay_s: 5,
  lint: { forbidden_terms: {}, staging_patterns: [] },
}

function loadProject() {
  const cfgPath = resolve(opt.config ?? "studio.config.json")
  if (!existsSync(cfgPath)) die(`configuration introuvable : ${cfgPath} (lancer depuis la racine du projet ou passer --config)`)
  let cfg
  try {
    cfg = JSON.parse(readFileSync(cfgPath, "utf8"))
  } catch (e) {
    die(`configuration illisible (${cfgPath}) : ${e.message}`)
  }
  const ROOT = dirname(cfgPath)
  const storyboardPath = resolve(ROOT, cfg.storyboard ?? "content/storyboard.md")
  const manifestPath = resolve(ROOT, cfg.manifest ?? "content/voice/voice-manifest.yaml")
  const voiceDir = dirname(manifestPath)
  const voiceCfgPath = opt["voice-config"] ? resolve(opt["voice-config"]) : join(voiceDir, "voice.config.yaml")
  let user = {}
  if (existsSync(voiceCfgPath)) {
    try {
      user = parseYaml(readFileSync(voiceCfgPath, "utf8")) ?? {}
    } catch (e) {
      die(`configuration voix illisible (${rel(ROOT, voiceCfgPath)}) : ${e.message}`)
    }
  }
  const vc = { ...DEFAULT_VOICE, ...user, voice_settings: { ...DEFAULT_VOICE.voice_settings, ...(user.voice_settings ?? {}) }, lint: { ...DEFAULT_VOICE.lint, ...(user.lint ?? {}) } }
  const dictionaryPath = vc.dictionary ? resolve(ROOT, vc.dictionary) : null
  const dict = loadDictionary(dictionaryPath)
  return { cfg, ROOT, storyboardPath, manifestPath, voiceDir, voiceCfgPath, voiceCfgExists: existsSync(voiceCfgPath), vc, dictionaryPath, dict }
}

const rel = (root, p) => relative(root, p).split("\\").join("/") || "."

function readStory(P) {
  if (!existsSync(P.storyboardPath)) die(`storyboard introuvable : ${rel(P.ROOT, P.storyboardPath)}`)
  const parsed = parseStoryboard(readFileSync(P.storyboardPath, "utf8"))
  const story = storyClips(parsed.scenes)
  const problems = [...parsed.problems.map((p) => p.message), ...story.problems]
  if (parsed.scenes.length === 0) problems.push(`aucune scène « # S01 · Titre » dans ${rel(P.ROOT, P.storyboardPath)}`)
  const seen = new Set()
  for (const s of parsed.scenes) {
    if (seen.has(s.id)) problems.push(`scène ${s.id} en double`)
    seen.add(s.id)
  }
  if (problems.length) {
    for (const p of problems) errLine(p)
    die("storyboard à corriger avant la voix (détail : npm run lint:story)")
  }
  return story
}

/* ── Empreintes, chemins ────────────────────────────────────────────────── */

const hash = (x) => createHash("sha256").update(typeof x === "string" ? x : JSON.stringify(x)).digest("hex").slice(0, 16)
const ws = (s) => String(s ?? "").replace(/\s+/g, " ").trim()
const textHash = (text) => hash(ws(text))
const synthParams = (vc) => ({
  voice_id: String(vc.voice_id ?? ""),
  model_id: String(vc.model_id ?? ""),
  language_code: vc.language_code ? String(vc.language_code) : null,
  output_format: String(vc.output_format ?? ""),
  voice_settings: vc.voice_settings ?? {},
  apply_text_normalization: vc.apply_text_normalization ? String(vc.apply_text_normalization) : null,
  seed: Number.isInteger(vc.seed) ? vc.seed : null,
})
const synthHash = (tts, vc) => hash({ tts: ws(tts), ...synthParams(vc) })

/** Fichier du manifeste : relatif à la racine du projet, sinon au dossier du manifeste (comme sync.mjs). */
function fileOf(P, p) {
  if (!p) return null
  for (const c of [resolve(P.ROOT, p), resolve(P.voiceDir, p)]) if (existsSync(c) && statSync(c).isFile()) return c
  return null
}
const audioRel = (id) => `${id.slice(0, 3)}/${id}.mp3`
const alignRel = (id) => `${id.slice(0, 3)}/${id}.alignment.json`
const hasVoice = (P, r) => Boolean(r.audio && r.alignment && fileOf(P, r.audio) && fileOf(P, r.alignment))

function atomicWrite(path, data) {
  mkdirSync(dirname(path), { recursive: true })
  const tmp = `${path}.tmp-${process.pid}`
  writeFileSync(tmp, data)
  renameSync(tmp, path)
}

/* ── Manifeste ──────────────────────────────────────────────────────────── */

function readManifest(P) {
  if (!existsSync(P.manifestPath)) return null
  let doc
  try {
    doc = parseYaml(readFileSync(P.manifestPath, "utf8"))
  } catch (e) {
    die(`manifeste illisible (${rel(P.ROOT, P.manifestPath)}) : ${e.message}`)
  }
  if (!doc || !Array.isArray(doc.clips)) die(`manifeste sans liste « clips » (${rel(P.ROOT, P.manifestPath)})`)
  return doc
}

const ROW_ORDER = ["clip_id", "scene", "trigger", "trigger_label", "text", "tts_text", "dictionary_rules_applied", "characters", "text_hash", "synth_hash", "audio", "alignment", "duration_s", "suggested_beats"]
const VOICE_FIELDS = ["audio", "alignment", "duration_s", "synth_hash"]

function orderedRow(r) {
  const o = {}
  for (const k of ROW_ORDER) if (r[k] !== undefined && r[k] !== null && !(k === "suggested_beats" && Object.keys(r[k]).length === 0)) o[k] = r[k]
  for (const [k, v] of Object.entries(r)) if (!ROW_ORDER.includes(k) && !k.startsWith("_") && v !== undefined) o[k] = v
  return o
}

function writeManifest(P, rows) {
  const p = synthParams(P.vc)
  const voiced = rows.filter((r) => r.audio)
  const doc = {
    storyboard: rel(P.ROOT, P.storyboardPath),
    provider: "elevenlabs",
    endpoint: "POST /v1/text-to-speech/{voice_id}/with-timestamps",
    voice_id: p.voice_id,
    voice_name: P.vc.voice_name ?? "",
    model_id: p.model_id,
    language_code: p.language_code ?? "",
    output_format: p.output_format,
    voice_settings: p.voice_settings,
    dictionary: P.vc.dictionary ?? "",
    clip_count: rows.length,
    voiced_count: voiced.length,
    total_duration_s: round(voiced.reduce((s, r) => s + (Number(r.duration_s) || 0), 0)),
    total_characters: rows.reduce((s, r) => s + (Number(r.characters) || 0), 0),
    clips: rows.map(orderedRow),
  }
  const head =
    "# Manifeste voix : écrit par scripts/voice.mjs (extract, generate), relu par npm run sync.\n" +
    "# Ne pas éditer à la main audio, alignment, duration_s, text_hash, synth_hash ; les repères\n" +
    "# suggested_beats peuvent se corriger (locution dite mot pour mot, unique dans le clip).\n"
  atomicWrite(P.manifestPath, head + stringifyYaml(doc, { lineWidth: 0 }))
}

/* ── Rapprochement storyboard ↔ manifeste ───────────────────────────────── */

/**
 * Lignes du manifeste pour les clips actuels du storyboard.
 * Texte inchangé : audio gardé. Texte identique sous un autre numéro (scène
 * insérée, déplacée) : fichiers renommés, rien à regénérer. Texte changé :
 * voix invalidée, repères gardés s'ils se disent encore une fois.
 */
function reconcile(P, story, manifest, { apply }) {
  const oldRows = manifest?.clips ?? []
  const oldById = new Map(oldRows.map((r) => [r.clip_id, r]))
  const storyIds = new Set(story.clips.map((c) => c.id))
  const keptIds = new Set(story.clips.filter((c) => oldById.has(c.id) && sameText(oldById.get(c.id).text, c.text)).map((c) => c.id))
  // Premier passage : l'audio d'une ancienne ligne non gardée sous son numéro peut servir au même texte sous un autre numéro
  const movedFrom = new Map() // nouveau numéro → ancienne ligne
  const movedTo = new Map() // ancienne ligne → nouveau numéro
  for (const c of story.clips) {
    if (keptIds.has(c.id)) continue
    const r = oldRows.find((x) => !keptIds.has(x.clip_id) && !movedTo.has(x) && sameText(x.text, c.text) && hasVoice(P, x))
    if (r) {
      movedFrom.set(c.id, r)
      movedTo.set(r, c.id)
    }
  }
  const rows = []
  const events = []
  const moves = []
  for (const c of story.clips) {
    const tts = applyDictionary(c.text, P.dict.rules)
    const fresh = { clip_id: c.id, scene: c.scene, trigger: c.trigger, trigger_label: c.trigger === "event" ? c.section : undefined, text: c.text, tts_text: tts.text, dictionary_rules_applied: tts.applied, characters: tts.text.length, text_hash: textHash(c.text) }
    const o = oldById.get(c.id)
    if (keptIds.has(c.id)) {
      // Le texte synthétisé reste celui de l'audio existant tant qu'il n'est pas regénéré
      const keep = hasVoice(P, o) ? { tts_text: o.tts_text ?? fresh.tts_text, dictionary_rules_applied: o.dictionary_rules_applied ?? fresh.dictionary_rules_applied, characters: o.characters ?? fresh.characters } : {}
      rows.push({ ...o, ...fresh, ...keep })
      events.push({ id: c.id, kind: "kept" })
      continue
    }
    const moved = movedFrom.get(c.id)
    if (moved) {
      const row = { ...moved, ...fresh, tts_text: moved.tts_text ?? fresh.tts_text, dictionary_rules_applied: moved.dictionary_rules_applied ?? fresh.dictionary_rules_applied, characters: moved.characters ?? fresh.characters, audio: audioRel(c.id), alignment: alignRel(c.id) }
      if (!apply) row._pendingMove = moved.clip_id
      moves.push({ from: [fileOf(P, moved.audio), fileOf(P, moved.alignment)], to: [join(P.voiceDir, audioRel(c.id)), join(P.voiceDir, alignRel(c.id))] })
      rows.push(row)
      events.push({ id: c.id, kind: "renamed", from: moved.clip_id })
      continue
    }
    // Texte nouveau à ce numéro ; les repères de l'ancienne ligne restent s'ils n'ont pas suivi son audio ailleurs
    const own = o && !movedTo.has(o) ? o : null
    const row = { ...fresh, _reason: own ? "texte modifié depuis la génération" : "nouveau clip" }
    for (const [k, v] of Object.entries(own ?? {})) if (!(k in row) && !VOICE_FIELDS.includes(k) && !["suggested_beats", "text_override"].includes(k)) row[k] = v
    const beats = {}
    const lost = []
    for (const [k, v] of Object.entries(own?.suggested_beats ?? {})) {
      if (countLocution(c.text.split(/\s+/), String(v)) === 1) beats[k] = v
      else lost.push(k)
    }
    if (Object.keys(beats).length) row.suggested_beats = beats
    rows.push(row)
    events.push({ id: c.id, kind: own ? "changed" : "new", lost, hadVoice: Boolean(own?.audio) })
  }
  for (const r of oldRows) if (!storyIds.has(r.clip_id) && !movedTo.has(r)) events.push({ id: r.clip_id, kind: "removed" })
  if (apply && moves.length) {
    // Deux temps : un échange de numéros (S02 ↔ S03) ne s'écrase jamais
    const staged = moves.map((m, i) =>
      m.from.map((f, j) => {
        const tmp = `${f}.move-${process.pid}-${i}-${j}`
        renameSync(f, tmp)
        return tmp
      }),
    )
    moves.forEach((m, i) =>
      m.to.forEach((t, j) => {
        mkdirSync(dirname(t), { recursive: true })
        renameSync(staged[i][j], t)
      }),
    )
  }
  return { rows, events }
}

/** État d'un clip : { ok, reason }. */
function stateOf(P, row) {
  if (row._pendingMove) return { ok: true, reason: `renuméroté depuis ${row._pendingMove} : fichiers renommés au prochain extract ou generate, aucune requête` }
  if (!row.audio || !row.alignment) return { ok: false, reason: row._reason ?? "pas encore de voix" }
  if (!fileOf(P, row.audio)) return { ok: false, reason: `fichier audio absent (${row.audio})` }
  if (!fileOf(P, row.alignment)) return { ok: false, reason: `alignement absent (${row.alignment})` }
  if (!row.synth_hash) return { ok: true, reason: "à jour (origine de l'audio inconnue : --force pour le refaire)" }
  const tts = applyDictionary(row.text, P.dict.rules).text
  if (row.synth_hash !== synthHash(tts, P.vc)) {
    if (ws(row.tts_text) !== ws(tts)) return { ok: false, reason: "prononciation modifiée (dictionnaire)" }
    return { ok: false, reason: "réglages de voix modifiés (voix, modèle, réglages ou format)" }
  }
  return { ok: true, reason: "à jour" }
}

function printEvents(events) {
  for (const e of events) {
    if (e.kind === "renamed") say(`${e.id} : texte identique à l'ancien ${e.from}, fichiers renommés (aucune requête)`)
    if (e.kind === "changed") say(`${e.id} : texte modifié${e.hadVoice ? ", voix invalidée" : ""}${e.lost?.length ? ` ; repères à recaler : ${e.lost.join(", ")}` : ""}`)
    if (e.kind === "removed") say(`${e.id} : n'existe plus dans le storyboard, retiré du manifeste (fichiers laissés : extract --prune les supprime)`)
  }
}

/** Fichiers du dossier voix (sous-dossiers Sxx) qu'aucun clip n'utilise. */
function orphans(P, rows) {
  const used = new Set(rows.flatMap((r) => [fileOf(P, r.audio), fileOf(P, r.alignment)]).filter(Boolean))
  const found = []
  if (!existsSync(P.voiceDir)) return found
  for (const d of readdirSync(P.voiceDir)) {
    const dir = join(P.voiceDir, d)
    if (!/^S\d\d$/.test(d) || !statSync(dir).isDirectory()) continue
    for (const f of readdirSync(dir)) {
      const p = join(dir, f)
      if (/\.(mp3|json)$/.test(f) && !used.has(p)) found.push(p)
    }
  }
  return found
}

/* ── API ElevenLabs ─────────────────────────────────────────────────────── */

const BASE = (process.env.ELEVENLABS_BASE_URL || "https://api.elevenlabs.io").replace(/\/+$/, "").replace(/\/v1$/, "")

function requireKey(what) {
  if (KEY && /^[\x21-\x7e]+$/.test(KEY)) return
  if (KEY) {
    // Jamais la clé ni un extrait : seulement la nature du problème
    const why = /\s/.test(KEY) ? "espace ou retour à la ligne au milieu" : "caractère non ASCII ou invisible"
    console.error(`[voice] ${what} : clé mal formée dans ELEVENLABS_API_KEY (${why}) ; aucune requête envoyée.`)
    console.error("[voice] La recopier d'un seul tenant depuis le tableau de bord ElevenLabs, dans le terminal (jamais dans un fichier du projet), puis relancer.")
    process.exit(2)
  }
  console.error(`[voice] ${what} : la variable d'environnement ELEVENLABS_API_KEY est absente.`)
  console.error("[voice] Le contenu fonctionne sans voix : minutage estimé sur le texte, sous-titres actifs (npm run build suffit).")
  console.error("[voice] Pour ajouter la voix : définir ELEVENLABS_API_KEY dans le terminal (jamais dans un fichier du projet), puis relancer.")
  process.exit(2)
}

class ApiError extends Error {
  constructor(status, message) {
    super(message)
    this.status = status
  }
}

const HINTS = {
  400: "requête refusée : vérifier model_id, language_code (pas accepté par tous les modèles) et voice_settings",
  401: "clé refusée (clé invalide, ou forfait gratuit bloqué pour activité inhabituelle)",
  402: "forfait payant requis (voix de bibliothèque) ou crédit épuisé",
  403: "permission manquante pour cette clé",
  404: "introuvable : vérifier voice_id",
  422: "paramètres refusés : vérifier model_id, output_format, voice_settings",
  429: "trop de requêtes ou quota atteint",
}

/** Attente demandée par l'en-tête Retry-After (secondes ou date HTTP), en ms ; null s'il est absent ou illisible. */
function retryAfterMs(header) {
  if (header === null || header === undefined) return null
  const s = String(header).trim()
  if (!s) return null
  if (/^\d+(\.\d+)?$/.test(s)) return Number(s) * 1000
  const d = Date.parse(s)
  return Number.isFinite(d) ? Math.max(0, d - Date.now()) : null
}
const RETRY_MAX_WAIT_S = 60
const NEVER_SENT = new Set(["ECONNREFUSED", "ENOTFOUND", "EAI_AGAIN", "EHOSTUNREACH", "ENETUNREACH"])
const isTimeout = (e) => e?.name === "TimeoutError" || e?.name === "AbortError" || e?.cause?.name === "TimeoutError"
const seconds = (ms) => `${Math.round(ms / 100) / 10} s`

/**
 * Requête à l'API. Nouvel essai (3 au plus) sur 429 et 5xx, après Retry-After
 * s'il est donné (refus au-delà d'une minute), sinon après retry_delay_s puis
 * le double. Un POST resté sans réponse (délai dépassé, connexion coupée) n'est
 * pas renvoyé : il a pu être traité et facturé. Une réponse tronquée ou non
 * JSON est redemandée une fois.
 */
async function api(method, path, { query = {}, body = null, attempts = 3 } = {}) {
  const url = new URL(BASE + path)
  for (const [k, v] of Object.entries(query)) if (v !== null && v !== undefined && v !== "") url.searchParams.set(k, String(v))
  const timeout = (Number(P_TIMEOUT) || 300) * 1000
  const idempotent = method === "GET"
  let rereadDone = false
  for (let attempt = 1; ; attempt++) {
    const base = Number(P_RETRY_S)
    const backoff = (Number.isFinite(base) && base > 0 ? base : 5) * 1000 * 2 ** (attempt - 1)
    const again = async (why, wait = backoff) => {
      warnLine(`${why} ; nouvel essai ${attempt + 1}/${attempts} dans ${seconds(wait)}`)
      await sleep(wait)
    }
    let res
    try {
      res = await fetch(url, {
        method,
        headers: { "xi-api-key": KEY, accept: "application/json", ...(body ? { "content-type": "application/json" } : {}) },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(timeout),
      })
    } catch (e) {
      const code = e?.cause?.code
      const neverSent = NEVER_SENT.has(code)
      const why = isTimeout(e) ? `délai dépassé (${timeout / 1000} s, request_timeout_s)` : `réseau : ${code ?? e?.cause?.message ?? e?.message ?? e}`
      if (attempt < attempts && (idempotent || neverSent)) {
        await again(why)
        continue
      }
      const billed = idempotent || neverSent ? "" : " ; requête non renvoyée : elle a pu être traitée et facturée (npm run voice -- quota pour vérifier), relancer la même commande la refait"
      throw new ApiError(0, `${why} (${url.origin})${billed}`)
    }
    let text = ""
    try {
      text = await res.text()
    } catch (e) {
      const why = isTimeout(e) ? `délai dépassé pendant la lecture de la réponse (${timeout / 1000} s, request_timeout_s)` : `réponse interrompue pendant la lecture (${e?.cause?.code ?? e?.message ?? e})`
      // Réponse d'erreur illisible : traitée plus bas d'après son seul code HTTP
      if (res.ok) {
        if (idempotent && attempt < attempts) {
          await again(why)
          continue
        }
        throw new ApiError(res.status, idempotent ? why : `${why} ; requête non renvoyée : elle a pu être traitée et facturée (npm run voice -- quota pour vérifier), relancer la même commande la refait`)
      }
    }
    if (res.ok) {
      try {
        return JSON.parse(text)
      } catch {
        const why = `réponse de l'API tronquée ou non JSON (${text.length} caractères reçus ; proxy ou connexion coupée ?)`
        if (!rereadDone && attempt < attempts) {
          rereadDone = true
          await again(`${why} ; la requête précédente a pu être facturée`)
          continue
        }
        throw new ApiError(res.status, why)
      }
    }
    if ([429, 500, 502, 503, 504].includes(res.status) && attempt < attempts) {
      const ra = retryAfterMs(res.headers.get("retry-after"))
      if (ra !== null && ra > RETRY_MAX_WAIT_S * 1000) {
        throw new ApiError(res.status, `HTTP ${res.status}${HINTS[res.status] ? ` (${HINTS[res.status]})` : ""} : l'API demande d'attendre ${Math.ceil(ra / 1000)} s, au-delà de ${RETRY_MAX_WAIT_S} s ; relancer la même commande plus tard (elle reprend là où elle s'est arrêtée)`)
      }
      await again(`HTTP ${res.status}`, ra ?? backoff)
      continue
    }
    let detail = text
    try {
      const j = JSON.parse(text)
      const d = j.detail ?? j
      detail = typeof d === "string" ? d : [d.status, d.message].filter(Boolean).join(" : ") || text
    } catch {}
    // Masquer AVANT de couper : une clé renvoyée à cheval sur la coupure resterait sinon en partie lisible
    throw new ApiError(res.status, `HTTP ${res.status}${HINTS[res.status] ? ` (${HINTS[res.status]})` : ""} : ${redact(String(detail)).slice(0, 300)}`)
  }
}
let P_TIMEOUT = 300
let P_RETRY_S = 5
const PAUSE_BETWEEN_CLIPS_MS = 400
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

async function synthesize(vc, text, context = {}) {
  const p = synthParams(vc)
  const body = { text, model_id: p.model_id, voice_settings: p.voice_settings }
  if (p.language_code) body.language_code = p.language_code
  if (p.apply_text_normalization) body.apply_text_normalization = p.apply_text_normalization
  if (p.seed !== null) body.seed = p.seed
  if (vc.context_between_clips) {
    if (context.previous) body.previous_text = context.previous
    if (context.next) body.next_text = context.next
  }
  const data = await api("POST", `/v1/text-to-speech/${encodeURIComponent(p.voice_id)}/with-timestamps`, { query: { output_format: p.output_format }, body })
  if (!data || typeof data.audio_base64 !== "string" || !data.audio_base64) throw new ApiError(200, "réponse sans audio_base64")
  const alignment = data.alignment ?? data.normalized_alignment
  if (!alignment || !Array.isArray(alignment.characters)) throw new ApiError(200, "réponse sans alignement (characters)")
  const out = { alignment }
  if (data.normalized_alignment) out.normalized_alignment = data.normalized_alignment
  return { audio: Buffer.from(data.audio_base64, "base64"), alignmentDoc: out }
}

async function subscription() {
  const d = await api("GET", "/v1/user/subscription", { attempts: 2 })
  const limit = Number(d.character_limit)
  const used = Number(d.character_count)
  const reset = d.next_character_count_reset_unix ? new Date(d.next_character_count_reset_unix * 1000).toISOString().slice(0, 10) : "inconnue"
  return { tier: d.tier ?? "?", limit, used, remaining: limit - used, reset }
}

function checkVoiceConfig(P) {
  const problems = []
  if (!P.voiceCfgExists) problems.push(`configuration voix absente (${rel(P.ROOT, P.voiceCfgPath)}) : la créer depuis le modèle du projet`)
  if (!P.vc.voice_id) problems.push(`« voice_id » vide dans ${rel(P.ROOT, P.voiceCfgPath)} : choisir une voix (essais : npm run voice -- try)`)
  if (!P.vc.model_id) problems.push(`« model_id » vide dans ${rel(P.ROOT, P.voiceCfgPath)}`)
  if (!/^mp3_/.test(String(P.vc.output_format ?? ""))) problems.push(`« output_format » doit être un format mp3_… (le lecteur joue des .mp3), pas « ${P.vc.output_format} »`)
  for (const p of P.dict.problems.filter((x) => x.level === "error")) problems.push(p.message)
  if (problems.length) {
    for (const p of problems) errLine(p)
    process.exit(1)
  }
  P_TIMEOUT = P.vc.request_timeout_s
  P_RETRY_S = P.vc.retry_delay_s
}

/* ── Repères proposés ───────────────────────────────────────────────────── */

const STOP = new Set("le la les l de du des d un une et a à au aux en dans sur pour par ce cette ces son sa ses the of an and to in on for with its".split(" "))
const slug = (s) =>
  s
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter((w) => w && !STOP.has(w))
    .slice(0, 3)
    .join("_")

/**
 * Repères d'un clip après génération : les anciens restent s'ils se disent
 * encore une seule fois ; s'y ajoutent les textes de l'écran de la scène dits
 * mot pour mot une seule fois (dans l'audio ET dans le texte) — l'élément
 * apparaît quand la voix le nomme. Le rôle code reste libre de les remplacer.
 */
function beatsFor(row, saidWords, screenTexts, propose) {
  const written = row.text.split(/\s+/)
  const beats = {}
  const lost = []
  for (const [k, v] of Object.entries(row.suggested_beats ?? {})) {
    if (countLocution(saidWords, String(v)) === 1) beats[k] = v
    else lost.push(k)
  }
  if (propose) {
    const phrases = new Set(Object.values(beats).map((v) => ws(String(v)).toLowerCase()))
    for (const st of screenTexts) {
      const key = slug(st)
      if (!key || key in beats || phrases.has(ws(st).toLowerCase())) continue
      if (countLocution(saidWords, st) === 1 && countLocution(written, st) === 1) {
        beats[key] = st
        phrases.add(ws(st).toLowerCase())
      }
    }
  }
  return { beats, lost }
}

/* ── Commandes ──────────────────────────────────────────────────────────── */

/* ── Dépenses ───────────────────────────────────────────────────────────── */

/** Crédits par caractère constatés par le rôle Voix du cours (compte BIMaccess) ; un autre modèle : non estimé. */
const CREDITS_PAR_CARACTERE = { eleven_v4: 0.44 }

/**
 * Aucun appel payant sans accord : le coût s'annonce, et la commande refuse
 * (code 3, rien envoyé) tant que --approuve <caractères> ne couvre pas les
 * caractères à envoyer.
 */
function requireApproval(what, chars, model, relance) {
  const rate = CREDITS_PAR_CARACTERE[model]
  const cost = `${chars} caractères à synthétiser${rate ? ` (environ ${Math.ceil(chars * rate)} crédits en ${model}, ${String(rate).replace(".", ",")} crédit par caractère, tarif constaté par le rôle Voix du cours)` : ` (${model} : tarif non connu ici, le lire sur le compte)`}`
  const given = opt.approuve === undefined || opt.approuve === true ? null : Number(opt.approuve)
  if (given !== null && !(Number.isFinite(given) && given >= 0)) die(`--approuve : nombre de caractères attendu, trouvé « ${opt.approuve} »`)
  if (given !== null && given >= chars) {
    say(`dépense approuvée : ${chars} caractères (accord : ${given})`)
    return
  }
  errLine(`${what} : coût annoncé : ${cost}.`)
  if (given !== null) errLine(`--approuve ${given} ne couvre pas les ${chars} caractères : rien n'est envoyé`)
  die(`aucune dépense sans l'accord d'Ilyas : annoncer ce coût, obtenir son accord sur un montant, puis relancer avec --approuve ${chars} (${relance})`, 3)
}

function cmdStatus() {
  const P = loadProject()
  const story = readStory(P)
  const manifest = readManifest(P)
  const { rows, events } = reconcile(P, story, manifest, { apply: false })
  let todo = 0
  let chars = 0
  for (const r of rows) {
    const s = stateOf(P, r)
    if (!s.ok) {
      todo += 1
      chars += applyDictionary(r.text, P.dict.rules).text.length
    }
    out(`[voice] ${r.clip_id}  ${r.trigger.padEnd(6)}  ${s.ok ? "à jour     " : "À GÉNÉRER  "}  ${s.ok && r.duration_s ? `${r.duration_s} s  ` : ""}${s.ok && s.reason === "à jour" ? "" : s.reason}`.trimEnd())
  }
  for (const e of events.filter((x) => x.kind === "removed")) say(`${e.id} : n'existe plus dans le storyboard (retiré au prochain extract ou generate)`)
  if (!manifest) say(`aucun manifeste : contenu sans voix pour l'instant (minutage estimé, sous-titres)`)
  say(`${todo} clip(s) à générer (${chars} caractères), ${rows.length - todo} à jour, ${rows.length} au total`)
  if (todo) say(`devis : ${chars} caractères${CREDITS_PAR_CARACTERE[P.vc.model_id] ? `, environ ${Math.ceil(chars * CREDITS_PAR_CARACTERE[P.vc.model_id])} crédits en ${P.vc.model_id}` : ""} ; après l'accord d'Ilyas : npm run voice -- generate --approuve ${chars}`)
  if (todo && !KEY) say("ELEVENLABS_API_KEY absente : sans voix, le contenu se joue avec un minutage estimé et des sous-titres")
}

function cmdExtract() {
  const P = loadProject()
  const story = readStory(P)
  const manifest = readManifest(P)
  const { rows, events } = reconcile(P, story, manifest, { apply: true })
  writeManifest(P, rows)
  printEvents(events)
  let todo = 0
  let chars = 0
  for (const r of rows) {
    const s = stateOf(P, r)
    if (!s.ok) {
      todo += 1
      chars += r.characters
    }
    out(`[voice] ${r.clip_id}  ${r.trigger.padEnd(6)}  ${String(r.characters).padStart(5)} car.  ${s.ok ? "voix gardée" : s.reason}`)
  }
  if (opt.prune) {
    for (const f of orphans(P, rows)) {
      rmSync(f)
      say(`supprimé (plus utilisé) : ${rel(P.ROOT, f)}`)
    }
  }
  say(`${rows.length} clip(s) dans ${rel(P.ROOT, P.manifestPath)} : ${rows.length - todo} avec voix gardée, ${todo} à générer (${chars} caractères)`)
}

function cmdLint() {
  const P = loadProject()
  const story = readStory(P)
  const maxChars = Number(P.vc.max_chars_per_clip) || modelCharLimit(P.vc.model_id)
  const staging = [...STAGING_PATTERNS, ...(P.vc.lint.staging_patterns ?? []).map((s) => new RegExp(s, "i"))]
  const findings = []
  const used = new Set()
  for (const c of story.clips) {
    const tts = applyDictionary(c.text, P.dict.rules)
    tts.applied.forEach((g) => used.add(g))
    findings.push(...lintClipText(c, tts.text, { rules: P.dict.rules, maxChars, forbidden: P.vc.lint.forbidden_terms ?? {}, staging }))
  }
  for (const p of P.dict.problems) findings.push({ clip: "dictionnaire", level: p.level, kind: "règle", excerpt: "", advice: p.message })
  for (const r of P.dict.rules) if (!used.has(r.grapheme)) findings.push({ clip: "dictionnaire", level: "info", kind: "règle inutilisée", excerpt: `« ${r.grapheme} »`, advice: "aucun clip ne la contient" })
  const errors = findings.filter((f) => f.level === "error")
  const warnings = findings.filter((f) => f.level === "warning")
  const infos = findings.filter((f) => f.level === "info")
  const line = (f) => out(`  ${f.clip} · ${f.kind}${f.excerpt ? ` · ${f.excerpt}` : ""} → ${f.advice}`)
  say(`${story.clips.length} clip(s), ${story.clips.reduce((s, c) => s + applyDictionary(c.text, P.dict.rules).text.length, 0)} caractères, ${P.dict.rules.length} règle(s) de prononciation, limite ${maxChars} caractères par clip`)
  if (errors.length) {
    out(`Erreurs (${errors.length}) :`)
    errors.forEach(line)
  }
  if (warnings.length) {
    out(`À examiner (${warnings.length}) :`)
    warnings.forEach(line)
  }
  if (infos.length) {
    out(`Pour information (${infos.length}) :`)
    infos.forEach(line)
  }
  if (!findings.length) say("rien à signaler")
  say("rappel : un contrôle automatique ne remplace pas l'écoute ; toute prononciation nouvelle et douteuse se valide à l'oreille (npm run voice -- try)")
  if (errors.length) die(`${errors.length} erreur(s) à corriger avant de générer`)
}

async function cmdQuota() {
  requireKey("quota")
  const P = loadProject()
  P_TIMEOUT = P.vc.request_timeout_s
  P_RETRY_S = P.vc.retry_delay_s
  try {
    const q = await subscription()
    say(`forfait ${q.tier} · utilisés ${q.used} / ${q.limit} · restants ${q.remaining} · remise à zéro ${q.reset}`)
  } catch (e) {
    die(`quota illisible : ${e.message}`)
  }
  if (existsSync(P.storyboardPath)) {
    try {
      const story = storyClips(parseStoryboard(readFileSync(P.storyboardPath, "utf8")).scenes)
      const { rows } = reconcile(P, story, readManifest(P), { apply: false })
      const pending = rows.filter((r) => !stateOf(P, r).ok)
      say(`à générer : ${pending.length} clip(s), ${pending.reduce((s, r) => s + applyDictionary(r.text, P.dict.rules).text.length, 0)} caractères`)
    } catch {}
  }
}

async function cmdGenerate() {
  requireKey("generate")
  const P = loadProject()
  checkVoiceConfig(P)
  const story = readStory(P)
  const manifest = readManifest(P)
  const { rows, events } = reconcile(P, story, manifest, { apply: true })
  writeManifest(P, rows)
  printEvents(events)

  const ids = new Set(rows.map((r) => r.clip_id))
  const scenes = new Set(rows.map((r) => r.scene))
  for (const o of opt.only) if (!ids.has(o) && !scenes.has(o)) die(`--only ${o} : ni clip ni scène du storyboard (clips : ${[...ids].join(", ")})`)
  const selected = (r) => opt.only.length === 0 || opt.only.includes(r.clip_id) || opt.only.includes(r.scene)
  const todo = rows.filter((r) => selected(r) && (opt.force || !stateOf(P, r).ok))
  const kept = rows.length - todo.length
  if (!todo.length) {
    say(`rien à générer : ${rows.length} clip(s) à jour${opt.only.length ? ` (sélection : ${opt.only.join(", ")})` : ""}`)
    return
  }
  const maxChars = Number(P.vc.max_chars_per_clip) || modelCharLimit(P.vc.model_id)
  const plan = todo.map((r) => ({ row: r, tts: applyDictionary(r.text, P.dict.rules) }))
  const tooLong = plan.filter((x) => x.tts.text.length > maxChars)
  if (tooLong.length) die(`clip(s) au-delà de ${maxChars} caractères : ${tooLong.map((x) => `${x.row.clip_id} (${x.tts.text.length})`).join(", ")} ; couper la narration`)
  const chars = plan.reduce((s, x) => s + x.tts.text.length, 0)
  say(`à générer : ${todo.length} clip(s), ${chars} caractères ; ${kept} clip(s) gardé(s)`)
  // Dépenses (règle d'Ilyas, 2026-11-27) : coût annoncé avant, aucune synthèse sans son accord
  requireApproval("generate", chars, P.vc.model_id, `npm run voice -- generate --approuve ${chars}${opt.only.length ? ` --only ${opt.only.join(",")}` : ""}${opt.force ? " --force" : ""}`)

  if (!opt["no-quota-check"]) {
    try {
      const q = await subscription()
      say(`quota avant : ${q.remaining} caractères restants (forfait ${q.tier}, remise à zéro ${q.reset})`)
      if (q.remaining < chars) die(`quota insuffisant : ${chars} caractères à produire, ${q.remaining} restants. Options : raccourcir, générer une partie (--only), attendre la remise à zéro (${q.reset}), ou dépassement payant ; --no-quota-check pour passer outre.`)
    } catch (e) {
      if (e instanceof ApiError && e.status === 401) die(`clé refusée par l'API : ${e.message}`)
      warnLine(`quota non lu (${e.message}) ; génération lancée sans contrôle du quota`)
    }
  }

  const screens = story.screens
  const order = rows.map((r) => r.clip_id)
  let done = 0
  let sent = 0
  const stop = (row, why) => {
    writeManifest(P, rows)
    errLine(`${row.clip_id} : ${why}`)
    die(`${done} clip(s) produit(s) avant l'arrêt, manifeste à jour ; relancer la même commande reprend là où elle s'est arrêtée`)
  }
  for (const [n, { row, tts }] of plan.entries()) {
    if (n > 0) await sleep(PAUSE_BETWEEN_CLIPS_MS)
    const k = order.indexOf(row.clip_id)
    const neighbour = (i) => (rows[i] ? applyDictionary(rows[i].text, P.dict.rules).text : null)
    let result
    try {
      result = await synthesize(P.vc, tts.text, { previous: neighbour(k - 1), next: neighbour(k + 1) })
    } catch (e) {
      stop(row, e.message)
    }
    // Réponse contrôlée AVANT toute écriture : un clip refusé garde ses anciens fichiers et reste « à générer »
    const check = checkAlignment(result.alignmentDoc, { audioDuration: mp3Duration(result.audio), sentText: tts.text })
    if (!check.ok) stop(row, `réponse de l'API refusée (requête facturée ; aucun fichier de ce clip remplacé, son état dans le manifeste ne change pas) : ${check.problems.join(" ; ")}`)
    for (const w of check.warnings) warnLine(`${row.clip_id} : ${w}`)
    const said = check.words
    atomicWrite(join(P.voiceDir, audioRel(row.clip_id)), result.audio)
    atomicWrite(join(P.voiceDir, alignRel(row.clip_id)), JSON.stringify(result.alignmentDoc))
    Object.assign(row, {
      tts_text: tts.text,
      dictionary_rules_applied: tts.applied,
      characters: tts.text.length,
      text_hash: textHash(row.text),
      synth_hash: synthHash(tts.text, P.vc),
      audio: audioRel(row.clip_id),
      alignment: alignRel(row.clip_id),
      duration_s: check.duration,
    })
    const { beats, lost } = beatsFor(row, said.map((w) => w.text), screens[row.scene] ?? [], !opt["no-beats"])
    if (Object.keys(beats).length) row.suggested_beats = beats
    else delete row.suggested_beats
    writeManifest(P, rows)
    done += 1
    sent += tts.text.length
    say(`OK ${row.clip_id}  ${row.trigger}  ${row.duration_s} s  ${tts.text.length} car.${tts.applied.length ? `  prononciation : ${tts.applied.join(", ")}` : ""}${Object.keys(beats).length ? `  repères : ${Object.keys(beats).join(", ")}` : ""}`)
    if (lost.length) warnLine(`${row.clip_id} : repères retirés (locution plus dite une seule fois) : ${lost.join(", ")} ; à recaler par le rôle code`)
  }
  const total = round(rows.reduce((s, r) => s + (Number(r.duration_s) || 0), 0))
  say(`terminé : ${done} clip(s) générés (${sent} caractères envoyés), ${kept} gardé(s) ; voix totale ${total} s`)
  say("ensuite : npm run voice -- verify, puis npm run sync")
}

function cmdVerify() {
  const P = loadProject()
  const story = readStory(P)
  const manifest = readManifest(P)
  if (!manifest) {
    say(`aucun manifeste (${rel(P.ROOT, P.manifestPath)}) : contenu sans voix, rien à vérifier`)
    return
  }
  const errors = []
  const warnings = []
  const E = (m) => errors.push(m)
  const W = (m) => warnings.push(m)
  const storyById = new Map(story.clips.map((c) => [c.id, c]))
  const seen = new Set()
  for (const r of manifest.clips) {
    if (!r || !r.clip_id) {
      E("ligne du manifeste sans clip_id")
      continue
    }
    if (seen.has(r.clip_id)) E(`${r.clip_id} : en double dans le manifeste`)
    seen.add(r.clip_id)
    if (!storyById.has(r.clip_id)) E(`${r.clip_id} : absent du storyboard (npm run voice -- extract le retire)`)
  }
  let total = 0
  for (const c of story.clips) {
    const r = manifest.clips.find((x) => x?.clip_id === c.id)
    if (!r) {
      E(`${c.id} : absent du manifeste (npm run voice -- generate)`)
      continue
    }
    if (r.trigger && r.trigger !== c.trigger) E(`${c.id} : déclencheur « ${r.trigger} » dans le manifeste, « ${c.trigger} » dans le storyboard`)
    if (!sameText(r.text, c.text)) {
      E(`${c.id} : texte modifié dans le storyboard depuis la génération (npm run voice -- generate)`)
      continue
    }
    if (!r.audio || !r.alignment) {
      E(`${c.id} : pas de voix (npm run voice -- generate)`)
      continue
    }
    const a = fileOf(P, r.audio)
    const l = fileOf(P, r.alignment)
    if (!a) E(`${c.id} : audio introuvable (${r.audio})`)
    if (!l) E(`${c.id} : alignement introuvable (${r.alignment})`)
    if (!a || !l) continue
    const dur = mp3Duration(readFileSync(a))
    if (!(dur > 0)) E(`${c.id} : audio illisible ou vide (${r.audio})`)
    let doc
    try {
      doc = JSON.parse(readFileSync(l, "utf8"))
    } catch (e) {
      E(`${c.id} : alignement illisible (${e.message})`)
      continue
    }
    // Mêmes contrôles qu'à la génération : vide, instants invalides ou décroissants, plus long que l'audio, plus court que le texte
    const check = checkAlignment(doc, { audioDuration: dur > 0 ? dur : undefined, sentText: String(r.tts_text ?? r.text) })
    for (const p of check.problems) E(`${c.id} : ${p} (${r.alignment})`)
    if (!check.ok) continue
    for (const w of check.warnings) W(`${c.id} : ${w}`)
    const said = check.words
    const end = said.at(-1).end
    const ds = Number(r.duration_s)
    if (!(ds > 0)) E(`${c.id} : duration_s absent ou nul`)
    else {
      if (end > ds + 0.05) E(`${c.id} : duration_s (${ds} s) plus court que l'alignement (${end} s)`)
      if (dur > 0 && Math.abs(dur - ds) > 0.25) W(`${c.id} : duration_s ${ds} s, audio mesuré ${round(dur)} s`)
      if (ds < 0.3) W(`${c.id} : clip très court (${ds} s)`)
      total += ds
    }
    const saidText = said.map((w) => w.text)
    for (const [k, v] of Object.entries(r.suggested_beats ?? {})) {
      const n = countLocution(saidText, String(v))
      if (n !== 1) E(`${c.id}.${k} : repère « ${v} » dit ${n} fois dans l'audio (il faut une fois exactement)`)
    }
    const s = stateOf(P, r)
    if (!s.ok) W(`${c.id} : ${s.reason} depuis la génération (npm run voice -- generate)`)
  }
  for (const f of orphans(P, manifest.clips)) W(`fichier inutilisé : ${rel(P.ROOT, f)} (extract --prune le supprime)`)
  say(`${story.clips.length} clip(s) dans le storyboard, ${manifest.clips.length} dans le manifeste, voix totale ${round(total)} s`)
  for (const w of warnings) warnLine(w)
  for (const e of errors) errLine(e)
  if (errors.length) die(`${errors.length} erreur(s), ${warnings.length} avertissement(s)`)
  say(`vérification réussie${warnings.length ? ` (${warnings.length} avertissement(s))` : ""}`)
}

/** Toutes les voix du compte : /v2/voices page par page, repli /v1/voices si l'adresse n'existe pas. */
async function allVoices(search) {
  const size = Math.max(1, Math.min(100, Number(opt["page-size"]) || 100))
  const voices = []
  let token
  try {
    for (let page = 0; page < 100; page++) {
      const d = await api("GET", "/v2/voices", { query: { page_size: size, next_page_token: token, search }, attempts: 2 })
      voices.push(...(Array.isArray(d?.voices) ? d.voices : []))
      if (!d?.has_more || !d?.next_page_token) return voices
      token = d.next_page_token
    }
    return voices
  } catch (e) {
    if (!(e instanceof ApiError) || (e.status !== 404 && e.status !== 405) || voices.length) throw e
  }
  const d = await api("GET", "/v1/voices", { attempts: 2 })
  const q = (search ?? "").toLowerCase()
  return (Array.isArray(d?.voices) ? d.voices : []).filter((v) => !q || `${v.name} ${v.description ?? ""}`.toLowerCase().includes(q))
}

const languagesOf = (v) => {
  const set = new Set()
  for (const l of v.verified_languages ?? []) if (l?.language) set.add(String(l.language).toLowerCase())
  if (v.labels?.language) set.add(String(v.labels.language).toLowerCase())
  if (v.fine_tuning?.language) set.add(String(v.fine_tuning.language).toLowerCase())
  return [...set]
}

async function cmdVoices() {
  requireKey("voices")
  if (existsSync(resolve(opt.config ?? "studio.config.json"))) {
    const P = loadProject()
    P_TIMEOUT = P.vc.request_timeout_s
    P_RETRY_S = P.vc.retry_delay_s
  }
  const lang = typeof opt.lang === "string" ? opt.lang.toLowerCase() : null
  let raw
  try {
    raw = await allVoices(typeof opt.search === "string" ? opt.search : undefined)
  } catch (e) {
    die(`voix illisibles : ${e.message}`)
  }
  const list = raw
    .map((v) => ({
      voice_id: String(v.voice_id ?? ""),
      name: String(v.name ?? ""),
      category: String(v.category ?? ""),
      languages: languagesOf(v),
      accent: String(v.labels?.accent ?? ""),
      gender: String(v.labels?.gender ?? ""),
      use_case: String(v.labels?.use_case ?? v.labels?.["use case"] ?? ""),
    }))
    .filter((v) => v.voice_id)
    .filter((v) => !lang || v.languages.length === 0 || v.languages.some((l) => l === lang || l.startsWith(`${lang}-`)))
    .sort((a, b) => a.category.localeCompare(b.category) || a.name.localeCompare(b.name))
  if (opt.json) {
    out(JSON.stringify(list, null, 2))
    return
  }
  say(`${list.length} voix${lang ? ` (langue ${lang}, ou sans langue annoncée)` : ""}`)
  for (const v of list) out(`  ${v.voice_id}  ${v.name}  (${[v.category, v.languages.join("/") || "langue non annoncée", v.accent, v.gender, v.use_case].filter(Boolean).join(" · ")})`)
  say("catégories : premade = voix fournies avec le compte ; cloned, generated, professional = voix du compte ; une voix de bibliothèque peut exiger un forfait payant")
  say(`essai d'une voix, sans toucher la configuration : npm run voice -- try "<phrase de la narration>" --voice <voice_id>`)
}

async function cmdTry() {
  const phrase = positional[1]
  if (!phrase) die(`phrase manquante : npm run voice -- try "Le sigle {} se dit ainsi." --variants "T. V. A.|tévéa"`)
  if (opt.voice !== undefined && !/^[A-Za-z0-9_-]{4,64}$/.test(String(opt.voice))) die(`--voice : identifiant de voix invalide « ${opt.voice} » (lettres, chiffres, - et _ ; voir npm run voice -- voices)`)
  requireKey("try")
  const P = loadProject()
  if (opt.voice) {
    // Voix essayée à la place de celle de la configuration, pour cet essai seulement (fichier inchangé)
    // (sans voice.config.yaml, par exemple avant le choix de la voix, les réglages par défaut servent)
    P.vc = { ...P.vc, voice_id: String(opt.voice), voice_name: String(opt.voice) }
    P.voiceCfgExists = true
  }
  checkVoiceConfig(P)
  const variants = opt.variants ? String(opt.variants).split("|") : [null]
  const texts = variants.map((v) => (v === null ? phrase : phrase.includes("{}") ? phrase.split("{}").join(v) : `${phrase} ${v}`))
  const tryChars = texts.reduce((n, t) => n + t.length, 0)
  requireApproval("try", tryChars, P.vc.model_id, `même commande avec --approuve ${tryChars}`)
  const dir = resolve(P.ROOT, opt.out ?? (opt.voice ? join(".studio/tmp/voice-try", String(opt.voice)) : ".studio/tmp/voice-try"))
  mkdirSync(dir, { recursive: true })
  const lines = []
  for (const [i, text] of texts.entries()) {
    let r
    try {
      r = await synthesize(P.vc, text)
    } catch (e) {
      die(`essai ${String.fromCharCode(65 + i)} : ${e.message}`)
    }
    const name = `${String.fromCharCode(65 + i)}.mp3`
    atomicWrite(join(dir, name), r.audio)
    const d = round(mp3Duration(r.audio))
    lines.push(`${name} (${d} s) : ${text}`)
    say(`OK ${name}  ${d} s  « ${text} »`)
  }
  writeFileSync(join(dir, "README.txt"), `Essai de prononciation · ${P.vc.voice_name || P.vc.voice_id} · ${P.vc.model_id}\n${lines.join("\n")}\n`)
  say(`fichiers dans ${rel(P.ROOT, dir)} : à écouter par un humain, qui choisit ; la règle retenue va dans le dictionnaire`)
}

async function cmdTest() {
  if (positional[1]) die(`« test » est l'auto-test hors ligne et ne prend pas de phrase ; pour un essai de prononciation : npm run voice -- try "${positional[1]}"`)
  const { runSelfTest } = await import("./lib/voice-selftest.mjs")
  const ok = await runSelfTest({ scriptsDir: HERE, keep: Boolean(opt.keep), tmpRoot: opt.tmp })
  process.exit(ok ? 0 : 1)
}

const COMMANDS = { status: cmdStatus, extract: cmdExtract, lint: cmdLint, quota: cmdQuota, voices: cmdVoices, generate: cmdGenerate, verify: cmdVerify, try: cmdTry, test: cmdTest }
if (!COMMANDS[command]) die(`commande inconnue « ${command} » (commandes : ${Object.keys(COMMANDS).join(", ")} ; aide : --help)`)
await COMMANDS[command]()
