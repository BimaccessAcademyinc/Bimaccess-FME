#!/usr/bin/env node
/**
 * fake-elevenlabs · faux serveur HTTP local qui imite l'API ElevenLabs utilisée
 * par scripts/voice.mjs, pour essayer la chaîne voix sans réseau ni quota.
 *
 *   POST /v1/text-to-speech/{voice_id}/with-timestamps   audio_base64 (MP3 muet) + alignement
 *   POST /v1/text-to-speech/{voice_id}                   MP3 muet
 *   GET  /v1/user/subscription                            forfait fictif, compteur de caractères
 *   GET  /v2/voices?page_size&next_page_token&search      voix fictives (FAKE_VOICES), par pages
 *   GET  /v1/voices                                       les mêmes, d'un seul tenant
 *
 * La clé attendue est lue dans ELEVENLABS_API_KEY (jamais en argument) ; une
 * requête sans elle, ou avec une autre, reçoit 401 comme l'API réelle. Le
 * journal ne contient jamais la clé.
 *
 * En ligne de commande (essais à la main) :
 *   ELEVENLABS_API_KEY=… node scripts/lib/fake-elevenlabs.mjs [--port 8787]
 * puis, dans un autre terminal :
 *   ELEVENLABS_BASE_URL=http://127.0.0.1:8787 ELEVENLABS_API_KEY=… npm run voice -- generate
 * Arrêt : Ctrl+C (ou kill du PID affiché).
 */
import { createServer } from "node:http"
import { fileURLToPath } from "node:url"
import { silentMp3 } from "./mp3.mjs"

/**
 * Voix fictives du faux serveur (françaises et anglaises, catégories
 * variées) : de quoi essayer le choix de voix (npm run voice -- voices,
 * puis try --voice <voice_id>) sans compte.
 */
export const FAKE_VOICES = [
  { voice_id: "fakeFrAlice01", name: "Alice (essai)", category: "premade", description: "voix fictive du faux serveur", labels: { language: "fr", accent: "parisien", gender: "female", use_case: "narration" }, verified_languages: [{ language: "fr", model_id: "eleven_multilingual_v2" }] },
  { voice_id: "fakeFrBruno02", name: "Bruno (essai)", category: "professional", description: "voix fictive du faux serveur", labels: { language: "fr", accent: "québécois", gender: "male", use_case: "informative" }, verified_languages: [{ language: "fr", model_id: "eleven_multilingual_v2" }] },
  { voice_id: "fakeEnClara03", name: "Clara (essai)", category: "premade", description: "voix fictive du faux serveur", labels: { language: "en", accent: "british", gender: "female", use_case: "narration" }, verified_languages: [{ language: "en", model_id: "eleven_multilingual_v2" }] },
  { voice_id: "fakeMultiDan04", name: "Dan (essai)", category: "cloned", description: "voix fictive du faux serveur", labels: { accent: "american", gender: "male" }, verified_languages: [{ language: "en" }, { language: "fr" }] },
]

/** Alignement fictif : une durée par caractère, pauses sur la ponctuation. */
export function fakeAlignment(text) {
  const characters = [...text]
  const starts = []
  const ends = []
  let t = 0.05
  for (const c of characters) {
    const d = /\s/.test(c) ? 0.03 : /[.,;:!?…]/.test(c) ? 0.12 : 0.062
    starts.push(Math.round(t * 1000) / 1000)
    t += d
    ends.push(Math.round(t * 1000) / 1000)
  }
  return { characters, character_start_times_seconds: starts, character_end_times_seconds: ends }
}

/**
 * Démarre le faux serveur. `plan(request)` peut renvoyer une réponse imposée
 * ({ status, body, headers, delayMs }) pour simuler une panne ; sinon réponse
 * normale. Chaque requête notée garde son instant d'arrivée (`at`, ms).
 * Renvoie { url, port, requests, setPlan, close }.
 */
export function startFakeElevenLabs({ key = process.env.ELEVENLABS_API_KEY ?? "", port = 0, host = "127.0.0.1", log = null } = {}) {
  const requests = []
  let plan = null
  let used = 0
  const server = createServer((req, res) => {
    let raw = ""
    req.setEncoding("utf8")
    req.on("data", (c) => (raw += c))
    req.on("end", () => {
      const url = new URL(req.url, `http://${host}`)
      let body = null
      try {
        body = raw ? JSON.parse(raw) : null
      } catch {
        body = { _invalid: raw.slice(0, 80) }
      }
      const entry = { method: req.method, path: url.pathname, query: Object.fromEntries(url.searchParams), body, keyOk: Boolean(key) && req.headers["xi-api-key"] === key, at: Date.now() }
      requests.push(entry)
      const send = (status, payload, headers = {}) => {
        if (res.destroyed || res.writableEnded) return
        const isBuf = Buffer.isBuffer(payload)
        res.writeHead(status, { "content-type": isBuf ? "audio/mpeg" : "application/json", ...headers })
        res.end(isBuf ? payload : JSON.stringify(payload))
        if (log) log(`${req.method} ${url.pathname} → ${status}`)
      }
      const forced = plan?.(entry, requests.length)
      if (forced) {
        // delayMs : réponse retardée (essai de délai dépassé) ; body Buffer : envoyé tel quel (réponse tronquée)
        const go = () => send(forced.status, forced.body ?? { detail: { status: "forced", message: "réponse imposée par l'essai" } }, forced.headers)
        if (forced.delayMs) setTimeout(go, forced.delayMs).unref?.()
        else go()
        return
      }
      if (!entry.keyOk) return send(401, { detail: { status: "invalid_api_key", message: "Invalid API key" } })
      if (req.method === "GET" && url.pathname === "/v1/user/subscription") {
        return send(200, { tier: "fake", character_count: used, character_limit: 100000, next_character_count_reset_unix: 1893456000 })
      }
      if (req.method === "GET" && (url.pathname === "/v2/voices" || url.pathname === "/v1/voices")) {
        const q = (url.searchParams.get("search") ?? "").toLowerCase()
        const all = FAKE_VOICES.filter((v) => !q || `${v.name} ${v.description}`.toLowerCase().includes(q))
        if (url.pathname === "/v1/voices") return send(200, { voices: all })
        const size = Math.max(1, Math.min(100, Number(url.searchParams.get("page_size")) || 10))
        const from = Number(url.searchParams.get("next_page_token") || 0) || 0
        const page = all.slice(from, from + size)
        const more = from + size < all.length
        return send(200, { voices: page, has_more: more, total_count: all.length, next_page_token: more ? String(from + size) : null })
      }
      const tts = /^\/v1\/text-to-speech\/([^/]+)(\/with-timestamps)?$/.exec(url.pathname)
      if (req.method === "POST" && tts) {
        if (!body || typeof body.text !== "string" || !body.text.trim()) return send(400, { detail: { status: "invalid_text", message: "text is required" } })
        if (typeof body.model_id !== "string" || !body.model_id) return send(400, { detail: { status: "invalid_model", message: "model_id is required" } })
        const format = url.searchParams.get("output_format") ?? "mp3_44100_128"
        if (!format.startsWith("mp3_")) return send(422, { detail: { status: "invalid_output_format", message: "only mp3 in the fake server" } })
        used += body.text.length
        const alignment = fakeAlignment(body.text)
        const end = alignment.character_end_times_seconds.at(-1) ?? 0
        const audio = silentMp3(end + 0.3)
        if (!tts[2]) return send(200, audio)
        return send(200, { audio_base64: audio.toString("base64"), alignment, normalized_alignment: alignment })
      }
      send(404, { detail: { status: "not_found", message: `${req.method} ${url.pathname}` } })
    })
  })
  return new Promise((resolveStart, reject) => {
    server.on("error", reject)
    server.listen(port, host, () => {
      const p = server.address().port
      resolveStart({
        url: `http://${host}:${p}`,
        port: p,
        requests,
        setPlan: (fn) => (plan = fn),
        close: () =>
          new Promise((r) => {
            server.close(() => r())
            server.closeAllConnections?.()
          }),
      })
    })
  })
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf("--port")
  const port = i >= 0 ? Number(process.argv[i + 1]) : 0
  if (!process.env.ELEVENLABS_API_KEY) {
    console.error("[faux serveur] ELEVENLABS_API_KEY absente : toutes les requêtes recevront 401")
  }
  const srv = await startFakeElevenLabs({ port, log: (m) => console.log(`[faux serveur] ${m}`) })
  console.log(`[faux serveur] ${srv.url} (PID ${process.pid})`)
  const stop = () => srv.close().then(() => process.exit(0))
  process.on("SIGTERM", stop)
  process.on("SIGINT", stop)
}
