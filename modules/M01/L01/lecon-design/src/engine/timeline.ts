/**
 * Ligne de temps d'une scène : clips placés, locutions, repères, garde-fous.
 *
 * Un instant d'animation n'est jamais écrit à la main : c'est une locution
 * dite mot pour mot (retrouvée dans les mots datés du clip) ou un repère de
 * content/beats.json. Introuvable ou ambiguë, la locution lève une erreur
 * nommée dès le chargement du module de la scène : la page casse bruyamment
 * au lieu de jouer une animation décalée.
 */
import { CLIPS } from "../generated/narration"
import { META } from "../generated/meta"
import type { Clip, Voice, Word } from "./types"

/** Locution absente du clip, ambiguë (plusieurs fois) ou vide. */
export class LocutionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "LocutionError"
  }
}

/** Clip inconnu, mauvais déclencheur, repère absent. */
export class TimelineError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "TimelineError"
  }
}

/** Instants qui ne suivent plus l'ordre de la narration. */
export class OrderError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "OrderError"
  }
}

/**
 * Forme de comparaison d'un mot : minuscules, apostrophes unifiées,
 * ponctuation de bord retirée. Identique à `norm` de scripts/sync.mjs.
 */
export function normalizeToken(word: string): string {
  return word
    .toLowerCase()
    .replace(/[’‘ʼ`]/g, "'")
    .replace(/^[^\p{L}\p{N}']+|[^\p{L}\p{N}']+$/gu, "")
}

/** Mots de comparaison d'une locution (les signes isolés comme « : » disparaissent). */
export function tokenize(phrase: string): string[] {
  return phrase.split(/\s+/).map(normalizeToken).filter((t) => t.length > 0)
}

export type LocutionMatch = {
  /** Index, dans `words`, de chaque mot dit de la locution. */
  readonly indexes: readonly number[]
  /** Début du premier mot. */
  readonly start: number
  /** Fin du dernier mot. */
  readonly end: number
}

/** Retrouve une locution dite mot pour mot et unique ; LocutionError sinon. */
export function findLocution(words: readonly Word[], phrase: string, where: string): LocutionMatch {
  const want = tokenize(phrase)
  if (want.length === 0) throw new LocutionError(`${where} : locution vide`)
  const spoken: { readonly index: number; readonly token: string }[] = []
  words.forEach((w, index) => {
    const token = normalizeToken(w.text)
    if (token) spoken.push({ index, token })
  })
  const hits: number[] = []
  for (let i = 0; i + want.length <= spoken.length; i++) {
    if (want.every((t, j) => spoken[i + j]?.token === t)) hits.push(i)
  }
  const [from] = hits
  if (from === undefined) throw new LocutionError(`${where} : locution introuvable « ${phrase} » (elle doit être dite mot pour mot)`)
  if (hits.length > 1) throw new LocutionError(`${where} : locution ambiguë « ${phrase} » (${hits.length} fois) : l'allonger`)
  const indexes = spoken.slice(from, from + want.length).map((s) => s.index)
  const first = words[indexes[0] ?? -1]
  const last = words[indexes[indexes.length - 1] ?? -1]
  if (!first || !last) throw new LocutionError(`${where} : locution hors limites « ${phrase} »`)
  return { indexes, start: first.start, end: last.end }
}

/** Clip généré ; TimelineError s'il n'existe pas. */
export function clipOf(clipId: string): Clip {
  const clip = CLIPS[clipId]
  if (!clip) {
    const known = Object.keys(CLIPS).join(", ") || "aucun"
    throw new TimelineError(`clip inconnu « ${clipId} » (clips du storyboard : ${known})`)
  }
  return clip
}

function place(clip: Clip, start: number): Voice {
  const where = clip.id
  const cache = new Map<string, LocutionMatch>()
  const match = (phrase: string): LocutionMatch => {
    let m = cache.get(phrase)
    if (!m) {
      m = findLocution(clip.words, phrase, where)
      cache.set(phrase, m)
    }
    return m
  }
  return {
    clip,
    start,
    end: start + clip.duration,
    words: clip.words.map((w) => ({ text: w.text, start: start + w.start, end: start + w.end })),
    b: (key) => {
      const t = clip.beats[key]
      if (t === undefined) {
        const known = Object.keys(clip.beats).join(", ") || "aucun"
        throw new TimelineError(`${where} : repère inconnu « ${key} » (repères de content/beats.json : ${known})`)
      }
      return start + t
    },
    said: (phrase) => start + match(phrase).start,
    saidEnd: (phrase) => start + match(phrase).end,
    word: (phrase, i) => {
      const index = match(phrase).indexes[i]
      const w = index === undefined ? undefined : clip.words[index]
      if (!w) throw new LocutionError(`${where} : mot ${i} absent de « ${phrase} »`)
      return start + w.start
    },
    at: (next) => place(clip, next),
  }
}

/**
 * Narration d'entrée d'une scène, placée `offset` secondes après le début de
 * la scène (META.voiceStart par défaut : c'est aussi là que le lecteur la joue).
 */
export function voice(clipId: string, offset: number = META.voiceStart): Voice {
  const clip = clipOf(clipId)
  if (clip.trigger !== "linear") throw new TimelineError(`${clipId} est un clip déclenché : utiliser eventVoice("${clipId}")`)
  return place(clip, offset)
}

/**
 * Clip déclenché par un geste. Au chargement du module, `startAt` vaut 0 :
 * les instants sont relatifs au début du clip et les locutions sont déjà
 * vérifiées. Dans la vue, `.at(eventStart)` le place dans la scène.
 */
export function eventVoice(clipId: string, startAt = 0): Voice {
  const clip = clipOf(clipId)
  if (clip.trigger !== "event") throw new TimelineError(`${clipId} n'est pas un clip déclenché : utiliser voice("${clipId}")`)
  return place(clip, startAt)
}

/** Avancement 0 → 1 d'une étape qui commence à `start` et dure `dur` secondes. */
export function prog(t: number, start: number, dur: number): number {
  if (dur <= 0) return t >= start ? 1 : 0
  return Math.min(1, Math.max(0, (t - start) / dur))
}

/** Courbe courte autorisée (sortie cubique) : pour les mouvements, jamais pour un tracé. */
export function ease(x: number): number {
  const p = Math.min(1, Math.max(0, x))
  return 1 - (1 - p) ** 3
}

/**
 * Garde-fou : les instants doivent suivre l'ordre de la narration. Accepte une
 * liste ou un objet (l'ordre des clés est l'ordre attendu) et le renvoie tel
 * quel. Lève une OrderError nommée au chargement du module sinon.
 */
export function ordered<T extends readonly number[] | Readonly<Record<string, number>>>(instants: T, where: string): T {
  const entries: [string, number][] = Array.isArray(instants)
    ? (instants as readonly number[]).map((v, i) => [String(i), v])
    : Object.entries(instants as Readonly<Record<string, number>>)
  for (let i = 1; i < entries.length; i++) {
    const prev = entries[i - 1]
    const cur = entries[i]
    if (!prev || !cur) continue
    if (!Number.isFinite(cur[1])) throw new OrderError(`${where} : instant « ${cur[0]} » non défini`)
    if (cur[1] < prev[1]) {
      throw new OrderError(`${where} : « ${cur[0]} » (${cur[1].toFixed(2)} s) arrive avant « ${prev[0]} » (${prev[1].toFixed(2)} s) : les états ne suivent plus l'ordre de la narration`)
    }
  }
  return instants
}

/** Étape d'une suite d'états : à partir de `at`, l'état `on` (null = aucun). */
export type Step<K extends string> = { readonly at: number; readonly on: K | null }

/**
 * État actif à l'instant t dans une suite ordonnée : la dernière étape commencée.
 * Sert à la mise en évidence (une seule à la fois) et à l'identifiant d'état
 * (data-board). Lève une OrderError si la suite n'est pas ordonnée.
 */
export function focusAt<K extends string>(steps: readonly Step<K>[], t: number): K | null {
  let on: K | null = null
  let last = -Infinity
  for (const s of steps) {
    if (s.at < last) throw new OrderError(`focusAt : étape « ${s.on ?? "aucune"} » à ${s.at.toFixed(2)} s placée après une étape plus tardive`)
    last = s.at
    if (t >= s.at) on = s.on
  }
  return on
}

/** Fin de frappe d'un texte tapé à cadence fixe à partir de `at`. */
export function typedUntil(text: string, at: number, cps: number = META.typingCps): number {
  return at + text.length / cps
}
