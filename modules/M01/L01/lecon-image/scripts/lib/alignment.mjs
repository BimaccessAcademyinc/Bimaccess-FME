/**
 * alignment · contrôle d'un alignement ElevenLabs avant de l'accepter.
 *
 * Utilisé par `voice generate` (une réponse incohérente est refusée et le
 * manifeste reste intact) et par `voice verify` (un fichier incohérent est une
 * erreur). Un alignement accepté ici passe toujours `npm run sync` : mots non
 * vides, instants finis et croissants, fin couverte par duration_s.
 */
import { round, tokens, wordsFromAlignment } from "./storyboard.mjs"

/** Écart toléré entre la fin de l'alignement et la durée mesurée du MP3 (secondes). */
export const ALIGN_AUDIO_TOLERANCE_S = 0.5
const EPS = 0.002 // arrondis des instants (millisecondes)

/**
 * Vérifie un alignement (document complet ou objet { characters, … }).
 * `audioDuration` : durée mesurée dans le MP3 (secondes) ; `sentText` : texte
 * envoyé à la synthèse (tts_text).
 * Renvoie { ok, problems: string[], warnings: string[], words, duration } où
 * `duration` est la durée à écrire dans le manifeste : celle du MP3, portée à
 * la fin de l'alignement si celle-ci la dépasse de moins de la tolérance.
 */
export function checkAlignment(doc, { audioDuration, sentText } = {}) {
  const problems = []
  const warnings = []
  const a = doc?.alignment ?? doc?.normalized_alignment ?? doc
  const ch = a?.characters
  const st = a?.character_start_times_seconds
  const en = a?.character_end_times_seconds
  if (!Array.isArray(ch) || !Array.isArray(st)) return { ok: false, problems: ["alignement sans characters / character_start_times_seconds"], warnings, words: [], duration: 0 }
  if (ch.length !== st.length || (en !== undefined && en !== null && (!Array.isArray(en) || en.length !== ch.length))) {
    problems.push(`alignement de longueurs différentes (${ch.length} caractères, ${st.length} débuts, ${Array.isArray(en) ? en.length : "?"} fins)`)
  }
  if (ch.some((c) => typeof c !== "string")) problems.push("alignement : caractère qui n'est pas du texte")
  const bad = (x) => typeof x !== "number" || !Number.isFinite(x) || x < 0
  const firstBad = (arr) => (Array.isArray(arr) ? arr.findIndex(bad) : -1)
  const bs = firstBad(st)
  const be = firstBad(en)
  if (bs >= 0) problems.push(`alignement : instant de début invalide (${JSON.stringify(st[bs])}) au caractère ${bs + 1}`)
  if (be >= 0) problems.push(`alignement : instant de fin invalide (${JSON.stringify(en[be])}) au caractère ${be + 1}`)
  if (!problems.length) {
    for (let i = 0; i < st.length; i++) {
      if (i > 0 && st[i] + EPS < st[i - 1]) {
        problems.push(`alignement non croissant : le caractère ${i + 1} commence à ${st[i]} s, avant le précédent (${st[i - 1]} s)`)
        break
      }
      if (Array.isArray(en) && en[i] + EPS < st[i]) {
        problems.push(`alignement incohérent : le caractère ${i + 1} finit (${en[i]} s) avant de commencer (${st[i]} s)`)
        break
      }
    }
  }
  if (problems.length) return { ok: false, problems, warnings, words: [], duration: 0 }

  const words = wordsFromAlignment(doc)
  if (!words.length) return { ok: false, problems: ["alignement vide : aucun mot daté"], warnings, words, duration: 0 }
  const end = words.at(-1).end
  let duration = Number(audioDuration)
  if (audioDuration !== undefined) {
    if (!(duration > 0)) problems.push("audio illisible : aucune trame MP3")
    else if (end > duration + ALIGN_AUDIO_TOLERANCE_S) problems.push(`alignement plus long que l'audio : fin à ${end} s pour un MP3 de ${round(duration)} s`)
    else duration = round(Math.max(duration, end))
  } else duration = end

  if (sentText !== undefined) {
    const said = tokens(words.map((w) => w.text).join(" "))
    const sent = tokens(String(sentText))
    if (said.length < sent.length) {
      problems.push(`alignement plus court que le texte envoyé : ${said.length} mot(s) datés pour ${sent.length} mot(s) (« … ${sent.slice(said.length, said.length + 4).join(" ")} … » manque)`)
    } else if (said.join(" ") !== sent.join(" ")) {
      warnings.push("l'alignement ne reprend pas mot pour mot le texte envoyé (normalisation de l'API ?) ; les repères se cherchent dans ce qui est dit")
    }
  }
  return { ok: problems.length === 0, problems, warnings, words, duration }
}
