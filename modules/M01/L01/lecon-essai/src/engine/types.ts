/**
 * Types du moteur de scènes.
 *
 * Une scène est une composition Remotion : son image ne dépend que du temps
 * de scène (secondes = image / fps) et de son état (choix de l'apprenant).
 * Le lecteur fournit l'état, les instants des clips déclenchés et les
 * actions ; la scène ne dessine jamais le lecteur (titre, boutons, curseur).
 */
import type { ComponentType } from "react"

/** Mot daté, en secondes depuis le début de son clip (ou de la scène une fois placé). */
export type Word = {
  readonly text: string
  readonly start: number
  readonly end: number
}

/** linear : lu à l'entrée de la scène · event : lu une fois, après un geste de l'apprenant. */
export type ClipTrigger = "linear" | "event"

/** Clip de narration généré par scripts/sync.mjs (src/generated/narration.ts). */
export type Clip = {
  /** Identifiant « S03-02 » : scène, rang de la section « Narration… ». */
  readonly id: string
  readonly scene: string
  readonly trigger: ClipTrigger
  /** Texte du storyboard, mot pour mot. */
  readonly text: string
  /** Chemin relatif de l'audio (« audio/S03-02.mp3 ») ; null = sans voix, minutage estimé. */
  readonly src: string | null
  /** Durée du clip, en secondes. */
  readonly duration: number
  /** Mots datés depuis le début du clip (alignement ElevenLabs ou estimation). */
  readonly words: readonly Word[]
  /** Repères nommés (content/beats.json, suggested_beats), en secondes depuis le début du clip. */
  readonly beats: Readonly<Record<string, number>>
}

/** Clip placé sur la ligne de temps d'une scène : tous les instants sont en secondes de scène. */
export type Voice = {
  readonly clip: Clip
  /** Début du clip dans la scène. */
  readonly start: number
  /** Fin du clip dans la scène. */
  readonly end: number
  /** Mots du clip, datés en secondes de scène (sous-titres). */
  readonly words: readonly Word[]
  /** Instant d'un repère de content/beats.json ; lève une TimelineError si le repère n'existe pas. */
  readonly b: (key: string) => number
  /** Début du premier mot d'une locution dite mot pour mot et unique ; LocutionError sinon. */
  readonly said: (phrase: string) => number
  /** Fin du dernier mot d'une locution (pour tenir un état jusqu'à la fin d'une phrase). */
  readonly saidEnd: (phrase: string) => number
  /** Début du i-ème mot dit (à partir de 0) d'une locution. */
  readonly word: (phrase: string, i: number) => number
  /** Le même clip placé ailleurs (clip déclenché : début connu seulement à l'exécution). */
  readonly at: (start: number) => Voice
}

/** Statut d'une scène pour le lecteur. */
export type SceneStatus = {
  /** Suivant permis. */
  readonly nextAllowed: boolean
  /** Scène terminée : notée dans la progression, rouverte à sa dernière image. */
  readonly completed: boolean
}

/** Ce que le lecteur sait d'une scène à l'instant courant. */
export type StatusInput<S> = {
  readonly state: S
  /** Narration linéaire entendue jusqu'au bout (ou curseur amené au-delà). */
  readonly narrationDone: boolean
  /** Tous les clips déclenchés demandés ont été entendus en entier. */
  readonly eventsDone: boolean
}

/** Logique d'une scène interactive : réducteur pur, relecture tolérante, statut, déclencheurs. */
export type SceneModel<S, A> = {
  readonly initial: S
  readonly reduce: (state: S, action: A) => S
  /** Relit l'état conservé ; des données abîmées donnent l'état initial, jamais une erreur. */
  readonly restore: (raw: unknown) => S
  readonly status: (input: StatusInput<S>) => SceneStatus
  /** Clips « event » à demander sur une transition d'état (une seule fois chacun). */
  readonly triggers?: (prev: S, next: S) => readonly string[]
}

/** Props de la vue d'une scène (rendue dans la composition Remotion). */
export type SceneViewProps<S, A> = {
  readonly state: S
  /** Action de l'apprenant : passe par le réducteur de la scène. */
  readonly send: (action: A) => void
  /** Scène déjà terminée lors d'une visite précédente : ouverte à sa dernière image. */
  readonly revisit: boolean
  /** Instant (secondes de scène) de la dernière action de l'apprenant, null s'il n'a rien fait. */
  readonly actedAt: number | null
  /** Début (secondes de scène) d'un clip déclenché, null tant qu'il n'est pas demandé. */
  readonly eventStart: (clipId: string) => number | null
  /** CONTINUER dans la scène : même effet que Suivant (seulement s'il est permis). */
  readonly next: () => void
  /** Il existe une scène après celle-ci. */
  readonly hasNext: boolean
}

export type SceneKind = "narrated" | "exercise" | "custom"

/** Scène normalisée par defineScene. */
export type SceneDef<S, A> = {
  readonly id: string
  /** Titre de la scène, lu dans le storyboard. */
  readonly title: string
  readonly kind: SceneKind
  /** Narration d'entrée placée (voice()), null pour une scène muette. */
  readonly clip: Voice | null
  /** Identifiants des clips déclenchés que la scène peut demander. */
  readonly events: readonly string[]
  /** Durée minimale (secondes) d'une scène sans narration d'entrée. */
  readonly intro: number
  readonly model: SceneModel<S, A>
  readonly View: ComponentType<SceneViewProps<S, A>>
}

/** Scène quelconque : une leçon mêle des scènes d'états différents. */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyScene = SceneDef<any, any>

export type LessonDef = {
  readonly scenes: readonly AnyScene[]
}
