/**
 * voice-selftest · auto-test HORS LIGNE de scripts/voice.mjs (npm run voice -- test).
 *
 * Monte un petit projet jetable dans un dossier temporaire, démarre le faux
 * serveur ElevenLabs local (lib/fake-elevenlabs.mjs) et joue la chaîne
 * complète avec une clé factice : extract, lint, generate (avec une panne
 * passagère), verify, sync du lecteur, modification d'une narration, reprise
 * après erreur, réponses incohérentes refusées (alignement vide, NaN,
 * décroissant, plus long que l'audio, plus court que le texte), attentes
 * croissantes sans Retry-After, réponse tronquée, délai dépassé, clé mal
 * formée, renumérotation de scènes, liste des voix (pages /v2/voices, repli
 * /v1/voices, filtre de langue), essai de prononciation et essai d'une autre
 * voix (try --voice), contrôle du
 * storyboard (lint-storyboard) sur des pièges connus. Vérifie enfin que la
 * clé n'apparaît dans aucune sortie ni aucun fichier.
 * Aucune requête ne sort de la machine, aucun caractère n'est consommé.
 */
import { spawn } from "node:child_process"
import { randomBytes } from "node:crypto"
import { existsSync, mkdirSync, mkdtempSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { parse as parseYaml } from "yaml"
import { fakeAlignment, startFakeElevenLabs } from "./fake-elevenlabs.mjs"
import { mp3Duration, silentMp3 } from "./mp3.mjs"
import { wordsFromAlignment } from "./storyboard.mjs"

const STORYBOARD = `# Jauge

Partie hors scène : jamais lue comme texte.

# S01 · Le thermostat

## Écran
- \`Mesurer la température\`
- \`Comparer à la consigne\`

## Narration
Le thermostat fait deux choses. D'abord, il sert à mesurer la température de la pièce. Ensuite, il sert à comparer à la consigne, la température demandée.

# S02 · La facture

## Écran
- \`Le prix comprend la taxe\`

## Narration
Le prix affiché comprend la TVA. Elle représente 20 % du montant.

Le reste paie l'appareil et la pose.

# S03 · À vous

## Narration d'entrée
Choisissez le réglage de la nuit, puis validez.

## Exercice
Question : \`Quelle consigne la nuit ?\`
- a · \`Dix-neuf degrés\` → \`La maison reste confortable, la dépense ne baisse pas.\`
- b · \`Seize degrés\` → \`La dépense baisse, la maison se réchauffe au matin.\`

## Narration déclenchée
Retenez l'idée : chaque degré en moins réduit la dépense.
`

export async function runSelfTest({ scriptsDir, keep = false, tmpRoot } = {}) {
  const base = tmpRoot ?? tmpdir()
  mkdirSync(base, { recursive: true })
  const root = mkdtempSync(join(base, "studio-voice-test-"))
  const key = `fake-${randomBytes(12).toString("hex")}`
  const wrongKey = `wrong-${randomBytes(12).toString("hex")}`
  const srv = await startFakeElevenLabs({ key })
  const outputs = []
  let passed = 0
  let failed = 0
  const check = (cond, label, detail = "") => {
    if (cond) {
      passed += 1
      console.log(`  ok    ${label}`)
    } else {
      failed += 1
      console.log(`  ÉCHEC ${label}${detail ? `\n        ${String(detail).split("\n").slice(-12).join("\n        ")}` : ""}`)
    }
  }
  const write = (rel, text) => {
    mkdirSync(dirname(join(root, rel)), { recursive: true })
    writeFileSync(join(root, rel), text)
  }
  const read = (rel) => readFileSync(join(root, rel), "utf8")
  const manifest = () => parseYaml(read("content/voice/voice-manifest.yaml"))
  const row = (id) => manifest().clips.find((c) => c.clip_id === id)
  const tts = () => srv.requests.filter((r) => r.path.includes("/text-to-speech/"))

  const exec = (script, args, env) =>
    new Promise((done) => {
      const p = spawn(process.execPath, [join(scriptsDir, script), ...args], { env, cwd: root })
      let text = ""
      p.stdout.on("data", (d) => (text += d))
      p.stderr.on("data", (d) => (text += d))
      p.on("close", (code) => {
        outputs.push(text)
        done({ code, out: text })
      })
    })
  const childEnv = (withKey, extra = {}) => {
    const env = { ...process.env, ELEVENLABS_BASE_URL: srv.url, NO_PROXY: "127.0.0.1,localhost", no_proxy: "127.0.0.1,localhost", ...extra }
    delete env.ELEVENLABS_API_KEY
    if (withKey) env.ELEVENLABS_API_KEY = typeof withKey === "string" ? withKey : key
    return env
  }
  const voice = (args, { withKey = true } = {}) => exec("voice.mjs", [...args, "--config", join(root, "studio.config.json")], childEnv(withKey))
  const hasSync = existsSync(join(scriptsDir, "sync.mjs"))
  const sync = () => exec("sync.mjs", ["--config", join(root, "studio.config.json")], childEnv(false))
  const generatedClips = () => JSON.parse(/CLIPS[^=]*=\s*([\s\S]*)\n?$/.exec(read("src/generated/narration.ts"))[1])

  console.log(`[voice] auto-test hors ligne : projet jetable ${root}, faux serveur ${srv.url}`)
  try {
    write(
      "studio.config.json",
      JSON.stringify({ id: "essai-voix", title: "Essai voix", lang: "fr", storyboard: "content/storyboard.md", manifest: "content/voice/voice-manifest.yaml", beats: "content/beats.json" }, null, 2),
    )
    write("content/storyboard.md", STORYBOARD)
    write("content/voice/voice.config.yaml", "voice_id: voix-essai\nvoice_name: Voix d'essai\nmodel_id: eleven_multilingual_v2\nlanguage_code: fr\noutput_format: mp3_44100_128\ndictionary: content/voice/pronunciations.yaml\nretry_delay_s: 0.2\n")
    write("content/voice/pronunciations.yaml", 'rules:\n  - grapheme: "TVA"\n    alias: "T. V. A."\n')
    write("content/voice/forbidden.yaml", "voice_id: voix-essai\ndictionary: content/voice/pronunciations.yaml\nlint:\n  forbidden_terms: { thermostat: régulateur }\n")

    // Durée MP3 mesurée sans outil externe
    const d = mp3Duration(silentMp3(1))
    check(Math.abs(d - 1.0187) < 0.01, `durée d'un MP3 lue dans ses trames (${d.toFixed(4)} s)`)

    // Sans clé
    let r = await voice(["generate"], { withKey: false })
    check(r.code === 2 && /ELEVENLABS_API_KEY/.test(r.out) && /sans voix/.test(r.out), "generate sans clé : arrêt (code 2) et rappel que le contenu marche sans voix", r.out)
    r = await voice(["quota"], { withKey: false })
    check(r.code === 2 && /sans voix/.test(r.out), "quota sans clé : arrêt (code 2)", r.out)
    check(tts().length === 0 && srv.requests.length === 0, "aucune requête envoyée sans clé")

    // État, contrôle, extraction (sans réseau)
    r = await voice(["status"])
    check(r.code === 0 && /4 clip\(s\) à générer/.test(r.out), "status : 4 clips à générer", r.out)
    r = await voice(["lint"])
    check(r.code === 0 && /symbole · « % »/.test(r.out) && !/sigle · « TVA »/.test(r.out), "lint : « % » signalé, « TVA » couvert par le dictionnaire", r.out)
    r = await voice(["lint", "--voice-config", join(root, "content/voice/forbidden.yaml")])
    check(r.code === 1 && /terme proscrit/.test(r.out), "lint : terme proscrit = erreur (code 1)", r.out)
    r = await voice(["extract"])
    const m0 = manifest()
    check(r.code === 0 && m0.clips.length === 4 && m0.clips.every((c) => !c.audio), "extract : manifeste de 4 clips sans audio", r.out)
    check(
      JSON.stringify(m0.clips.map((c) => [c.clip_id, c.trigger])) === JSON.stringify([["S01-01", "linear"], ["S02-01", "linear"], ["S03-01", "linear"], ["S03-02", "event"]]),
      "extract : identifiants et déclencheurs du storyboard",
      JSON.stringify(m0.clips.map((c) => c.clip_id)),
    )
    if (hasSync) {
      r = await sync()
      check(r.code === 0 && /4 clip\(s\) dont 0 avec voix/.test(r.out), "sync accepte le manifeste sans audio (minutage estimé)", r.out)
      const gen = generatedClips()
      const same = m0.clips.every((c) => gen[c.clip_id] && gen[c.clip_id].text === c.text && gen[c.clip_id].trigger === c.trigger) && Object.keys(gen).length === m0.clips.length
      check(same, "découpage en clips identique à celui de sync.mjs (identifiants, déclencheurs, textes)")
    }

    // Génération, avec une panne passagère (429) sur la première requête
    let first = true
    srv.setPlan((req) => {
      if (req.path.includes("/text-to-speech/") && first) {
        first = false
        return { status: 429, headers: { "retry-after": "0" }, body: { detail: { status: "too_many_concurrent_requests", message: "essai de reprise" } } }
      }
      return null
    })
    r = await voice(["generate"])
    srv.setPlan(null)
    check(r.code === 0 && /nouvel essai/.test(r.out) && /terminé : 4 clip\(s\)/.test(r.out), "generate : 4 clips, panne 429 surmontée", r.out)
    const m1 = manifest()
    check(m1.clips.every((c) => c.audio && c.alignment && c.duration_s > 0 && c.synth_hash && c.text_hash), "manifeste complété : audio, alignment, duration_s, empreintes")
    check(m1.clips.every((c) => existsSync(join(root, "content/voice", c.audio)) && existsSync(join(root, "content/voice", c.alignment))), "fichiers Sxx/Sxx-yy.mp3 et .alignment.json écrits")
    const calls = tts()
    check(calls.length === 5 && calls.every((c) => c.keyOk && c.query.output_format === "mp3_44100_128" && c.body.model_id === "eleven_multilingual_v2" && c.body.language_code === "fr"), "requêtes conformes : clé, output_format en paramètre, model_id, language_code", JSON.stringify(calls.map((c) => c.query)))
    const s02 = calls.find((c) => c.body.text.includes("Le prix affiché"))
    check(s02 && s02.body.text.includes("T. V. A.") && !/\bTVA\b/.test(s02.body.text) && row("S02-01").dictionary_rules_applied?.[0] === "TVA", "dictionnaire appliqué au texte envoyé (TVA → T. V. A.), texte du manifeste inchangé")
    const beats = row("S01-01").suggested_beats ?? {}
    check(beats.mesurer_temperature === "Mesurer la température" && beats.comparer_consigne === "Comparer à la consigne", "repères proposés : textes de l'écran dits mot pour mot", JSON.stringify(beats))
    r = await voice(["verify"])
    check(r.code === 0 && /vérification réussie/.test(r.out), "verify : 0", r.out)
    if (hasSync) {
      r = await sync()
      check(r.code === 0 && /4 clip\(s\) dont 4 avec voix/.test(r.out) && /S01-01\.mesurer_temperature/.test(r.out), "sync accepte le manifeste produit (audio, repères)", r.out)
      const gen = generatedClips()
      const al = JSON.parse(read("content/voice/S01/S01-01.alignment.json"))
      check(gen["S01-01"].src === "audio/S01-01.mp3" && existsSync(join(root, "public/audio/S01-01.mp3")), "sync : audio copié dans public/audio/")
      check(JSON.stringify(gen["S01-01"].words) === JSON.stringify(wordsFromAlignment(al)) && gen["S01-01"].duration === row("S01-01").duration_s, "sync : mots datés issus de l'alignement, durée du manifeste")
    }
    r = await voice(["status"])
    check(r.code === 0 && /0 clip\(s\) à générer/.test(r.out), "status : tout est à jour", r.out)
    let before = tts().length
    r = await voice(["generate"])
    check(r.code === 0 && /rien à générer/.test(r.out) && tts().length === before, "generate relancé : aucune requête", r.out)

    // Narration modifiée : seule elle est refaite
    write("content/storyboard.md", read("content/storyboard.md").replace("l'appareil et la pose.", "l'appareil et sa mise en service."))
    r = await voice(["status"])
    check(/S02-01\s+linear\s+À GÉNÉRER\s+texte modifié/.test(r.out) && /1 clip\(s\) à générer/.test(r.out), "status signale la narration modifiée (S02-01 seulement)", r.out)
    if (hasSync) {
      r = await sync()
      check(r.code === 1 && /S02-01 : le texte du manifeste diffère/.test(r.out), "sync refuse un manifeste dont le texte a changé", r.out)
    }
    before = tts().length
    r = await voice(["generate"])
    const redo = tts().slice(before)
    check(r.code === 0 && redo.length === 1 && redo[0].body.text.includes("mise en service"), "generate ne refait que S02-01", r.out)

    // Reprise après erreur : panne durable sur le second clip modifié
    let story = read("content/storyboard.md").replace("Le thermostat fait deux choses.", "Le thermostat fait deux choses, sans relâche.").replace("réduit la dépense.", "réduit nettement la dépense.")
    write("content/storyboard.md", story)
    srv.setPlan((req) => (req.path.includes("/text-to-speech/") && req.body?.text?.includes("nettement") ? { status: 500, headers: { "retry-after": "0" } } : null))
    before = tts().length
    r = await voice(["generate"])
    srv.setPlan(null)
    check(r.code === 1 && /relancer la même commande reprend/.test(r.out) && row("S01-01").audio && !row("S03-02").audio, "panne durable : arrêt propre, S01-01 gardé, S03-02 à refaire", r.out)
    check(tts().length - before === 4, "trois essais sur la panne, puis arrêt", String(tts().length - before))
    before = tts().length
    r = await voice(["generate"])
    const resumed = tts().slice(before)
    check(r.code === 0 && resumed.length === 1 && resumed[0].body.text.includes("nettement"), "reprise : seul le clip manquant est demandé", r.out)

    // Sélection forcée
    before = tts().length
    r = await voice(["generate", "--only", "S01-01", "--force"])
    check(r.code === 0 && tts().length - before === 1, "--only S01-01 --force : une requête", r.out)

    // Réponses incohérentes : refusées, manifeste et fichiers du clip intacts, clip toujours à refaire au prochain generate
    const snapshot = () => [read("content/voice/voice-manifest.yaml"), readFileSync(join(root, "content/voice/S01/S01-01.mp3")).toString("base64"), read("content/voice/S01/S01-01.alignment.json")].join("|")
    const okReply = (text, mutate, audioSeconds) => {
      const alignment = fakeAlignment(text)
      mutate?.(alignment)
      const end = alignment.character_end_times_seconds.filter((x) => typeof x === "number").at(-1) ?? 1
      return { status: 200, body: { audio_base64: silentMp3(audioSeconds ?? end + 0.3).toString("base64"), alignment, normalized_alignment: alignment } }
    }
    const faults = [
      ["alignement vide", (t) => okReply(t, (a) => { a.characters = []; a.character_start_times_seconds = []; a.character_end_times_seconds = [] }, 1), /alignement vide|aucun mot/],
      ["instants NaN (null)", (t) => okReply(t, (a) => { a.character_start_times_seconds = a.character_start_times_seconds.map(() => null); a.character_end_times_seconds = a.character_end_times_seconds.map(() => null) }, 2), /instant de début invalide/],
      ["instants décroissants", (t) => okReply(t, (a) => { a.character_start_times_seconds.reverse(); a.character_end_times_seconds.reverse() }), /non croissant/],
      ["alignement plus long que l'audio", (t) => okReply(t, (a) => { a.character_start_times_seconds = a.character_start_times_seconds.map((x) => x * 10); a.character_end_times_seconds = a.character_end_times_seconds.map((x) => x * 10) }, 1), /plus long que l'audio/],
      ["alignement plus court que le texte", (t) => okReply(t.slice(0, Math.floor(t.length / 2))), /plus court que le texte/],
    ]
    for (const [label, reply, re] of faults) {
      const snap = snapshot()
      srv.setPlan((req) => (req.path.includes("/text-to-speech/") ? reply(req.body.text) : null))
      r = await voice(["generate", "--only", "S01-01", "--force"])
      srv.setPlan(null)
      check(r.code === 1 && /réponse de l'API refusée/.test(r.out) && re.test(r.out) && snapshot() === snap, `${label} : réponse refusée, manifeste et fichiers intacts`, r.out)
    }
    r = await voice(["verify"])
    check(r.code === 0, "verify après les refus : 0 (rien n'a été corrompu)", r.out)
    if (hasSync) {
      r = await sync()
      check(r.code === 0 && /dont 4 avec voix/.test(r.out), "sync après les refus : 0", r.out)
    }
    // verify refuse aussi un fichier d'alignement incohérent posé à la main
    const alPath = "content/voice/S01/S01-01.alignment.json"
    const alGood = read(alPath)
    const alBad = JSON.parse(alGood)
    alBad.alignment.character_end_times_seconds[2] = null
    write(alPath, JSON.stringify(alBad))
    r = await voice(["verify"])
    check(r.code === 1 && /instant de fin invalide/.test(r.out), "verify : alignement avec un instant invalide = erreur", r.out)
    write(alPath, alGood)

    // 429 / 503 sans Retry-After : attentes croissantes (retry_delay_s 0,2 s puis 0,4 s), puis succès
    for (const status of [429, 503]) {
      let n503 = 0
      srv.setPlan((req) => (req.path.includes("/text-to-speech/") && n503++ < 2 ? { status, body: { detail: { status: "busy", message: "réessayer" } } } : null))
      before = srv.requests.length
      r = await voice(["generate", "--only", "S01-01", "--force", "--no-quota-check"])
      srv.setPlan(null)
      const at = srv.requests.slice(before).map((q) => q.at)
      const gaps = at.slice(1).map((t, i) => t - at[i])
      check(r.code === 0 && at.length === 3 && /dans 0\.2 s/.test(r.out) && /dans 0\.4 s/.test(r.out) && gaps[0] >= 180 && gaps[1] >= 380 && gaps[1] > gaps[0], `HTTP ${status} sans Retry-After : attentes croissantes (${gaps.join(" ms, ")} ms) puis succès`, r.out)
    }
    // Retry-After démesuré : arrêt immédiat et clair
    srv.setPlan((req) => (req.path.includes("/text-to-speech/") ? { status: 429, headers: { "retry-after": "3600" } } : null))
    before = tts().length
    r = await voice(["generate", "--only", "S01-01", "--force", "--no-quota-check"])
    srv.setPlan(null)
    check(r.code === 1 && tts().length - before === 1 && /attendre 3600 s/.test(r.out), "Retry-After de 3600 s : arrêt clair sans attendre", r.out)
    // Réponse tronquée une fois : redemandée une fois, puis succès
    let cut = true
    srv.setPlan((req) => {
      if (!req.path.includes("/text-to-speech/") || !cut) return null
      cut = false
      const full = JSON.stringify(okReply(req.body.text).body)
      return { status: 200, body: Buffer.from(full.slice(0, Math.floor(full.length / 2))) }
    })
    before = tts().length
    r = await voice(["generate", "--only", "S01-01", "--force", "--no-quota-check"])
    srv.setPlan(null)
    check(r.code === 0 && tts().length - before === 2 && /tronquée ou non JSON/.test(r.out), "réponse tronquée : message clair, redemandée une fois, succès", r.out)
    // Délai dépassé sur un POST : jamais renvoyé (il a pu être facturé)
    write("content/voice/slow.yaml", read("content/voice/voice.config.yaml") + "request_timeout_s: 1\n")
    srv.setPlan((req) => (req.path.includes("/text-to-speech/") ? { ...okReply(req.body.text), delayMs: 2500 } : null))
    before = tts().length
    const snapSlow = snapshot()
    r = await voice(["generate", "--only", "S01-01", "--force", "--no-quota-check", "--voice-config", join(root, "content/voice/slow.yaml")])
    srv.setPlan(null)
    check(r.code === 1 && tts().length - before === 1 && /délai dépassé/.test(r.out) && /facturée/.test(r.out) && snapshot() === snapSlow, "délai dépassé sur la synthèse : une seule requête, message clair, rien d'écrit", r.out)
    rmSync(join(root, "content/voice/slow.yaml"))
    // Clé mal formée : arrêt (code 2) avant toute requête, clé jamais affichée
    before = srv.requests.length
    r = await voice(["generate"], { withKey: `${key}\nsuite` })
    check(r.code === 2 && /clé mal formée/.test(r.out) && srv.requests.length === before && !r.out.includes(key), "clé avec un retour à la ligne : code 2, aucune requête", r.out)
    // Clé renvoyée par l'API à cheval sur la coupure du message : jamais lisible, même en partie
    srv.setPlan((req) => (req.path.includes("/text-to-speech/") ? { status: 400, body: { detail: { status: "bad", message: `${"x".repeat(285)}${key} fin` } } } : null))
    r = await voice(["generate", "--only", "S01-01", "--force", "--no-quota-check"])
    srv.setPlan(null)
    check(r.code === 1 && !r.out.includes(key.slice(0, 8)), "clé renvoyée dans une erreur longue : aucun fragment affiché", r.out)
    check(row("S03-02").trigger_label === "Narration déclenchée" && row("S03-01").trigger_label === undefined, "trigger_label : titre de section gardé pour un clip déclenché", JSON.stringify(row("S03-02")))

    // Clé refusée : message clair, clé jamais affichée
    r = await voice(["generate", "--only", "S01-01", "--force"], { withKey: wrongKey })
    check(r.code === 1 && /clé refusée/.test(r.out) && !r.out.includes(wrongKey), "clé refusée : arrêt clair, clé masquée", r.out)

    // Scène insérée en tête : les clips existants sont renumérotés sans requête
    story = read("content/storyboard.md")
      .replace("# S03 ·", "# S04 ·")
      .replace("# S02 ·", "# S03 ·")
      .replace("# S01 ·", "# S02 ·")
      .replace("# S02 · Le thermostat", "# S01 · Ouverture\n\n## Narration\nLe chauffage se règle en deux gestes simples.\n\n# S02 · Le thermostat")
    write("content/storyboard.md", story)
    before = tts().length
    r = await voice(["generate"])
    const fresh = tts().slice(before)
    check(r.code === 0 && fresh.length === 1 && fresh[0].body.text.includes("deux gestes") && /fichiers renommés/.test(r.out), "scène insérée : 1 requête, 4 clips renommés", r.out)
    check(existsSync(join(root, "content/voice/S04/S04-02.mp3")) && row("S04-02").trigger === "event", "fichiers déplacés sous leur nouveau numéro (S03-02 → S04-02)")
    r = await voice(["verify"])
    check(r.code === 0 && !/inutilisé/.test(r.out), "verify après renumérotation : 0, aucun orphelin", r.out)
    if (hasSync) {
      r = await sync()
      check(r.code === 0 && /5 clip\(s\) dont 5 avec voix/.test(r.out), "sync après renumérotation : 5 clips avec voix", r.out)
    }

    // Scène retirée : extract --prune supprime ses fichiers
    write("content/storyboard.md", read("content/storyboard.md").split("# S04 ·")[0])
    r = await voice(["extract", "--prune"])
    check(r.code === 0 && !existsSync(join(root, "content/voice/S04/S04-02.mp3")) && manifest().clips.length === 3, "extract --prune : scène retirée, fichiers supprimés", r.out)
    r = await voice(["verify"])
    check(r.code === 0, "verify après retrait : 0", r.out)

    // Quota et essai de prononciation
    r = await voice(["quota"])
    check(r.code === 0 && /restants \d+/.test(r.out), "quota : caractères restants", r.out)
    r = await voice(["try", "Le sigle {} se lit ainsi.", "--variants", "T. V. A.|tévéa"])
    const tryDir = join(root, ".studio/tmp/voice-try")
    check(r.code === 0 && existsSync(join(tryDir, "A.mp3")) && existsSync(join(tryDir, "B.mp3")) && /tévéa/.test(readFileSync(join(tryDir, "README.txt"), "utf8")), "try : deux essais hors du contenu", r.out)

    // Choix de la voix : liste des voix du compte (lecture seule, aucun caractère dépensé)
    r = await voice(["voices"], { withKey: false })
    check(r.code === 2 && /ELEVENLABS_API_KEY/.test(r.out), "voices sans clé : arrêt (code 2)", r.out)
    const ttsBeforeVoices = tts().length
    const v2Before = srv.requests.filter((q) => q.path === "/v2/voices").length
    r = await voice(["voices", "--lang", "fr", "--page-size", "2"])
    const pages = srv.requests.filter((q) => q.path === "/v2/voices").slice(v2Before)
    check(
      r.code === 0 && /3 voix \(langue fr/.test(r.out) && /fakeFrAlice01\s+Alice \(essai\)\s+\(premade · fr · parisien · female · narration\)/.test(r.out) && /fakeMultiDan04/.test(r.out) && !/fakeEnClara03/.test(r.out),
      "voices --lang fr : voice_id, nom, catégorie, langues, accent, genre ; voix anglaise écartée",
      r.out,
    )
    check(pages.length === 2 && pages.every((q) => q.keyOk && q.query.page_size === "2") && pages[1].query.next_page_token === "2", "voices : /v2/voices lu page par page (next_page_token), avec la clé", JSON.stringify(pages.map((q) => q.query)))
    r = await voice(["voices", "--json"])
    let listed = []
    try {
      listed = JSON.parse(r.out)
    } catch {}
    check(r.code === 0 && listed.length === 4 && listed.every((v) => v.voice_id && v.name && v.category && Array.isArray(v.languages)), "voices --json : 4 voix, champs voice_id, name, category, languages", r.out)
    srv.setPlan((req) => (req.path === "/v2/voices" ? { status: 404, body: { detail: { status: "not_found", message: "GET /v2/voices" } } } : null))
    r = await voice(["voices", "--search", "bruno"])
    srv.setPlan(null)
    check(r.code === 0 && /1 voix/.test(r.out) && /fakeFrBruno02/.test(r.out) && srv.requests.at(-1).path === "/v1/voices", "voices : repli sur /v1/voices quand /v2/voices n'existe pas, --search appliqué", r.out)
    check(tts().length === ttsBeforeVoices, "voices : aucune synthèse demandée (aucun caractère dépensé)")
    // Essai d'une autre voix : configuration inchangée, dossier propre à la voix
    const cfgBefore = read("content/voice/voice.config.yaml")
    r = await voice(["try", "Le thermostat règle la pièce.", "--voice", "fakeFrBruno02"])
    const lastTts = tts().at(-1)
    const voiceDir = join(root, ".studio/tmp/voice-try/fakeFrBruno02")
    check(
      r.code === 0 && lastTts?.path === "/v1/text-to-speech/fakeFrBruno02/with-timestamps" && existsSync(join(voiceDir, "A.mp3")) && /fakeFrBruno02/.test(readFileSync(join(voiceDir, "README.txt"), "utf8")) && read("content/voice/voice.config.yaml") === cfgBefore,
      "try --voice : synthèse avec cette voix, fichiers dans voice-try/<voice_id>/, configuration inchangée",
      r.out,
    )
    r = await voice(["try", "Le thermostat règle la pièce.", "--voice", "fakeEnClara03"])
    check(r.code === 0 && existsSync(join(root, ".studio/tmp/voice-try/fakeEnClara03/A.mp3")) && existsSync(join(voiceDir, "A.mp3")), "try --voice : l'essai d'une seconde voix n'écrase pas le premier", r.out)
    r = await voice(["try", "Phrase.", "--voice", "../hors"])
    check(r.code === 1 && /identifiant de voix invalide/.test(r.out), "try --voice : identifiant invalide refusé, aucune requête", r.out)

    r = await voice(["test", "une phrase"])
    check(r.code === 1 && /try/.test(r.out), "test avec une phrase : renvoi vers try", r.out)

    // Contrôle du storyboard : pièges que le lecteur ignorerait sans rien dire
    if (existsSync(join(scriptsDir, "lint-storyboard.mjs"))) {
      // Chaque storyboard d'essai a son petit projet (lint/<nom>/), pour le passer aussi à npm run sync
      const lint = (name, md, lang = "fr") => {
        write(`lint/${name}/story.md`, md)
        write(`lint/${name}/studio.config.json`, JSON.stringify({ id: "essai-lint", title: "Essai", lang, storyboard: "story.md" }))
        return exec("lint-storyboard.mjs", ["--config", join(root, `lint/${name}/studio.config.json`)], childEnv(false))
      }
      const syncOf = (name) => exec("sync.mjs", ["--config", join(root, `lint/${name}/studio.config.json`)], childEnv(false))
      const head = "# S01 · Le tri\n\n## Écran\n- `Bac jaune`\n\n"
      const exo = (extra = "", after = "## Narration déclenchée\nLe bac jaune reçoit les emballages.\n") =>
        "# S01 · Le tri\n\n## Écran\n- `Bac jaune`\n\n## Narration d'entrée\nChoisissez le bac des emballages.\n\n## Exercice\nQuestion : `Où va la bouteille ?`\n- a · `Bac jaune` → `Elle est recyclée.`\n- b · `Bac vert` → `Le verre seul y va.`\n" + extra + "Attendu : a\n\n" + after
      const traps = [
        ["titre de niveau 3", head + "### Narration\nLe bac jaune reçoit les emballages.\n", /« ### Narration » : titre de niveau 3/],
        ["dièses sans espace", head + "##Narration\nLe bac jaune reçoit les emballages.\n", /pas d'espace après les dièses/],
        ["tabulation après les dièses", head + "##\tNarration\nLe bac jaune reçoit les emballages.\n", /tabulation après les dièses, non lu comme section/],
        ["espace insécable après les dièses", head + "##\u00a0Narration\nLe bac jaune reçoit les emballages.\n", /espace insécable ou invisible après les dièses/],
        ["titre de section indenté", head + "   ## Narration\nLe bac jaune reçoit les emballages.\n", /titre indenté, non lu comme section/],
        ["deux espaces après les dièses", exo("", "##  Narration déclenchée\nLe bac jaune reçoit les emballages.\n"), /« ##  Narration déclenchée » : espaces multiples après les dièses/],
        ["narration déclenchée tabulée", exo("", "##\tNarration déclenchée\nLe bac jaune reçoit les emballages.\n"), /tabulation après les dièses/],
        ["narration hors scène", head + "## Narration\nLe bac jaune reçoit les emballages.\n\n# Remarque\n\n## Narration déclenchée\nTexte perdu.\n", /hors scène, après « # Remarque »/],
        ["puce d'écran sans accents graves", "# S01 · Le tri\n\n## Écran\n- `Bac jaune`\n- Bac vert\n\n## Narration\nLe bac jaune et le bac vert.\n", /puce sans accents graves « - Bac vert »/],
        ["ligne numérotée d'écran sans accents graves", "# S01 · Le tri\n\n## Écran\n- `Bac jaune`\n1. Bac vert\n\n## Narration\nLe bac jaune et le bac vert.\n", /puce sans accents graves « 1\. Bac vert »/],
        ["note en majuscule dans l'exercice", exo("- N.B. : l'ordre des choix change à chaque essai.\n"), /puce « - N\.B\. : .* » lue comme un choix en majuscule \(« N »\) : npm run sync échouera/],
        ["choix en majuscule sans accents graves", exo("- C · Bac gris → Il part à l'incinération.\n"), /puce « - C · Bac gris .* » lue comme un choix en majuscule \(« C »\)/],
        ["« Attendu » en majuscule", exo().replace("Attendu : a", "Attendu : A"), /« Attendu : A » : la lettre s'écrit en minuscule/],
        ["commentaire HTML dans la voix", head + "## Narration\nLe bac jaune reçoit les emballages. <!-- note --> Fin.\n", /commentaire HTML/],
        ["italique dans la voix", head + "## Narration\nLe bac jaune reçoit le *carton*.\n", /italique Markdown \(\*…\*\)/],
        ["durée en secondes", head + "## Narration\n" + "Le bac jaune reçoit les emballages en plastique et en carton. ".repeat(7) + "\n\n# Budget\n\n| Scène | Durée |\n|---|---|\n| S01 | 10 sec |\n", /pour 0:10 prévues \(plus du double\)/],
        ["durée illisible", head + "## Narration\nLe bac jaune reçoit les emballages.\n\n# Budget\n\n| Scène | Durée |\n|---|---|\n| S01 | 10 jours |\n", /durée « 10 jours » illisible/],
      ]
      for (const [label, md, re] of traps) {
        r = await lint(label.replace(/\W+/g, "-"), md)
        check(r.code === 1 && re.test(r.out), `lint-storyboard : ${label} = erreur précise`, r.out)
      }
      r = await lint("ok", head + "## Narration\nLe bac jaune reçoit les emballages.\n\n# Budget\n\n| Scène | Durée |\n|---|---|\n| S01 | 1 min 30 s |\n")
      check(r.code === 0 && !/Budget :/.test(r.out), "lint-storyboard : « 1 min 30 s » lu comme 1:30, storyboard correct accepté", r.out)
      // Tout storyboard accepté par lint passe npm run sync
      if (hasSync) {
        const accepted = [
          ["ok", null],
          ["exercice", exo("Une note pour le code, sans puce.\n")],
          ["projet", STORYBOARD],
          ["anglais", "# S01 · Sorting\n\n## Screen\n- `Yellow bin`\n\n## Opening narration\nPick the bin for packaging.\n\n## Exercise\nQuestion: `Where does the bottle go?`\n- a · `Yellow bin` → `It gets recycled.`\n- b · `Green bin` → `Only glass goes there.`\nExpected: a\n\n## Triggered narration\nThe yellow bin takes packaging.\n", "en"],
        ]
        for (const [name, md, lang] of accepted) {
          if (md) {
            r = await lint(name, md, lang)
            check(r.code === 0, `lint-storyboard : storyboard « ${name} » accepté`, r.out)
          }
          r = await syncOf(name)
          check(r.code === 0, `storyboard « ${name} » accepté par lint : npm run sync passe aussi`, r.out)
        }
        // Et les pièges que lint refuse font bien échouer sync, ou y perdraient du texte : aucune divergence silencieuse
        for (const name of ["note-en-majuscule-dans-l-exercice", "choix-en-majuscule-sans-accents-graves", "-Attendu-en-majuscule"]) {
          r = await syncOf(name)
          check(r.code === 1 && /ÉCHEC/.test(r.out), `piège « ${name} » : sync le refuse aussi (lint l'annonce)`, r.out)
        }
      }
    }

    // La clé n'apparaît nulle part
    const leaks = []
    const walk = (dir) => {
      for (const f of readdirSync(dir)) {
        const p = join(dir, f)
        if (statSync(p).isDirectory()) walk(p)
        else {
          const buf = readFileSync(p)
          if (buf.includes(key) || buf.includes(wrongKey)) leaks.push(p)
        }
      }
    }
    walk(root)
    check(leaks.length === 0, "clé absente de tous les fichiers du projet", leaks.join(", "))
    check(outputs.every((o) => !o.includes(key) && !o.includes(wrongKey)), `clé absente de toutes les sorties (${outputs.length} commandes)`)
    check(srv.requests.every((q) => !JSON.stringify(q).includes(key)), "clé absente des corps et paramètres de requête")
  } catch (e) {
    check(false, `exception : ${e.message}`, e.stack)
  } finally {
    await srv.close()
  }
  console.log(`[voice] auto-test : ${passed} contrôle(s) réussi(s), ${failed} échec(s)`)
  if (failed === 0 && !keep) rmSync(root, { recursive: true, force: true })
  else console.log(`[voice] projet d'essai conservé : ${root}`)
  return failed === 0
}
