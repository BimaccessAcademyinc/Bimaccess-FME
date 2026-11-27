/**
 * Progression de l'apprenant, conservée dans localStorage["studio.<META.id>"].
 *
 * Le stockage peut être absent ou refusé (page ouverte en file://, navigation
 * privée, quota plein) : chaque lecture et écriture est protégée, et la
 * progression reste alors en mémoire le temps de la visite. Des données
 * abîmées ne cassent jamais la page : elles sont ignorées champ par champ.
 */
import { META } from "../generated/meta"

export type SceneRecord = {
  readonly visited: boolean
  readonly completed: boolean
  /** État de la scène (exercice…), relu par le `restore` de la scène. */
  readonly state: unknown
  /** Clips déclenchés demandés : image de la demande. */
  readonly requested: Readonly<Record<string, number>>
  /** Clips déclenchés entendus en entier : jamais rejoués. */
  readonly heard: readonly string[]
  /** Instant (secondes de scène) de la dernière action de l'apprenant. */
  readonly actedAt: number | null
}

export type Progress = {
  readonly version: 1
  /** Index de la dernière scène ouverte (à partir de 0). */
  readonly last: number
  readonly scenes: Readonly<Record<string, SceneRecord>>
  /** Préférence de sous-titres de l'apprenant ; null = automatique (actifs sans voix). */
  readonly captions: boolean | null
}

export const STORAGE_KEY = `studio.${META.id}`

export const emptyRecord: SceneRecord = { visited: false, completed: false, state: null, requested: {}, heard: [], actedAt: null }

export const emptyProgress = (): Progress => ({ version: 1, last: 0, scenes: {}, captions: null })

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === "object" && v !== null && !Array.isArray(v)

function parseRecord(raw: unknown): SceneRecord {
  if (!isObj(raw)) return emptyRecord
  const requested: Record<string, number> = {}
  if (isObj(raw.requested)) {
    for (const [k, v] of Object.entries(raw.requested)) if (typeof v === "number" && Number.isFinite(v) && v >= 0) requested[k] = Math.round(v)
  }
  let actedAt = typeof raw.actedAt === "number" && Number.isFinite(raw.actedAt) && raw.actedAt >= 0 ? raw.actedAt : null
  // Champs valides un à un mais contradictoires : le geste qui demande un clip déclenché
  // précède ce clip. Un actedAt postérieur à la première demande est ramené à elle
  // (sinon les états « geste puis clip » d'une scène se retrouveraient dans le désordre).
  const asked = Object.values(requested)
  if (actedAt !== null && asked.length > 0) actedAt = Math.min(actedAt, Math.min(...asked) / META.fps)
  return {
    visited: raw.visited === true,
    completed: raw.completed === true,
    state: raw.state ?? null,
    requested,
    heard: Array.isArray(raw.heard) ? raw.heard.filter((h): h is string => typeof h === "string") : [],
    actedAt,
  }
}

/** Relecture tolérante : tout champ douteux reprend sa valeur vide. */
export function parseProgress(raw: unknown): Progress {
  if (!isObj(raw) || raw.version !== 1) return emptyProgress()
  const scenes: Record<string, SceneRecord> = {}
  if (isObj(raw.scenes)) for (const [id, r] of Object.entries(raw.scenes)) scenes[id] = parseRecord(r)
  return {
    version: 1,
    last: typeof raw.last === "number" && Number.isInteger(raw.last) && raw.last >= 0 ? raw.last : 0,
    scenes,
    captions: typeof raw.captions === "boolean" ? raw.captions : null,
  }
}

export function loadProgress(): Progress {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    return raw ? parseProgress(JSON.parse(raw)) : emptyProgress()
  } catch {
    return emptyProgress()
  }
}

export function saveProgress(progress: Progress): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  } catch {
    // Stockage indisponible : la progression reste en mémoire pour cette visite
  }
}

export function clearProgress(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY)
  } catch {
    // idem
  }
}

export const recordOf = (p: Progress, id: string): SceneRecord => p.scenes[id] ?? emptyRecord

export const withRecord = (p: Progress, id: string, patch: Partial<SceneRecord>): Progress => ({
  ...p,
  scenes: { ...p.scenes, [id]: { ...recordOf(p, id), ...patch } },
})
