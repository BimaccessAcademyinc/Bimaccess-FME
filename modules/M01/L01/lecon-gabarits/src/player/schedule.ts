/**
 * Horloge d'une scène : narration d'entrée, clips déclenchés, durée.
 *
 *  · Durée = max(fin de la narration d'entrée, fin des clips déclenchés,
 *    dernier geste + ACT_SETTLE) + META.tail ; une scène sans narration dure
 *    `intro`. Un geste fait à la dernière image (exercice sans clip
 *    déclenché, validé narration finie) allonge donc la scène : la
 *    conséquence et CONTINUER, balayés à cet instant, ont le temps d'arriver.
 *  · Un clip déclenché part à l'image où il a été demandé, jamais par-dessus
 *    la narration d'entrée ni par-dessus un autre clip déclenché (écart
 *    EVENT_GAP) : deux voix ne se chevauchent jamais.
 *  · Un clip entendu en entier reste placé (l'image finale de la scène le
 *    montre) mais n'est plus audible : il n'est jamais rejoué.
 */
import { META } from "../generated/meta"
import { clipOf } from "../engine/timeline"
import type { AnyScene } from "../engine/types"
import type { SceneRecord } from "./progress"

/** Silence minimal avant un clip déclenché, en secondes. */
export const EVENT_GAP = 0.4

/** Temps laissé aux animations déclenchées par un geste (balayages de la conséquence, de CONTINUER), en secondes. */
export const ACT_SETTLE = 1

export type EventPlacement = {
  readonly id: string
  /** Début, en secondes de scène. */
  readonly start: number
  readonly end: number
  readonly src: string | null
  /** Faux une fois entendu : le clip n'est plus rejoué. */
  readonly audible: boolean
}

/** Fin de la narration d'entrée (ou de l'intro d'une scène muette), en secondes de scène. */
export const linearEnd = (scene: AnyScene): number => (scene.clip ? scene.clip.end : scene.intro)

/** Clips déclenchés placés sur la ligne de temps de la scène. */
export function placeEvents(scene: AnyScene, record: SceneRecord, fps: number): EventPlacement[] {
  const asked = scene.events
    .map((id, order) => ({ id, order, frame: record.requested[id] }))
    .filter((e): e is { id: string; order: number; frame: number } => e.frame !== undefined)
    .sort((a, b) => a.frame - b.frame || a.order - b.order)
  const out: EventPlacement[] = []
  let free = linearEnd(scene) + EVENT_GAP
  for (const e of asked) {
    const clip = clipOf(e.id)
    const start = Math.max(e.frame / fps, free)
    const end = start + clip.duration
    out.push({ id: e.id, start, end, src: clip.src, audible: !record.heard.includes(e.id) })
    free = end + EVENT_GAP
  }
  return out
}

/** Durée de la scène, en images (actedAt : instant du dernier geste, secondes de scène). */
export function durationInFrames(scene: AnyScene, events: readonly EventPlacement[], fps: number, actedAt: number | null = null): number {
  const voiceEnd = events.reduce((m, e) => Math.max(m, e.end), linearEnd(scene))
  const end = actedAt === null ? voiceEnd : Math.max(voiceEnd, actedAt + ACT_SETTLE)
  return Math.max(1, Math.ceil((end + META.tail) * fps))
}
