/**
 * Déclaration des scènes et de la leçon, avec les vérifications faites au
 * chargement : une scène qui ne branche pas une narration du storyboard, ou
 * une leçon qui oublie une scène, casse avant d'être jouée.
 */
import type { ComponentType } from "react"
import { META } from "../generated/meta"
import { CLIPS } from "../generated/narration"
import { EXERCISES, SCENE_IDS } from "../generated/texts"
import { sceneTexts } from "./texts"
import { clipOf, TimelineError } from "./timeline"
import type { AnyScene, LessonDef, SceneDef, SceneKind, SceneModel, SceneViewProps, Voice } from "./types"

/** Leçon incohérente avec le storyboard. */
export class LessonError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "LessonError"
  }
}

export type SceneInput<S, A> = {
  /** « S01 » : identifiant de la scène dans le storyboard. */
  readonly id: string
  /** Narration d'entrée : `voice("S01-01")` (le même objet que celui des instants de la scène). */
  readonly clip?: Voice | null
  /** Clips déclenchés (« S03-02 ») que la scène demande après un geste. */
  readonly events?: readonly string[]
  /** Durée d'une scène sans narration d'entrée (secondes, défaut META.intro). */
  readonly intro?: number
  /** Exercice à choix : `choiceExercise("S03", { events: ["S03-02"] })`. */
  readonly exercise?: SceneModel<S, A>
  /** Autre logique interactive (réducteur pur, relecture, statut, déclencheurs). */
  readonly model?: SceneModel<S, A>
  readonly View: ComponentType<SceneViewProps<S, A>>
}

/** Scène narrée : Suivant libre à la fin de la narration d'entrée. */
const narratedModel: SceneModel<null, unknown> = {
  initial: null,
  reduce: (state) => state,
  restore: () => null,
  status: ({ narrationDone }) => ({ nextAllowed: narrationDone, completed: narrationDone }),
}

export function defineScene<S = null, A = unknown>(input: SceneInput<S, A>): SceneDef<S, A> {
  const { id } = input
  const texts = sceneTexts(id)
  if (input.exercise && input.model) throw new LessonError(`${id} : « exercise » et « model » ne vont pas ensemble`)
  const clip = input.clip ?? null
  if (clip && clip.clip.scene !== id) throw new TimelineError(`${id} : la narration d'entrée ${clip.clip.id} appartient à la scène ${clip.clip.scene}`)
  const events = input.events ?? []
  for (const e of events) {
    const c = clipOf(e)
    if (c.trigger !== "event") throw new TimelineError(`${id} : ${e} n'est pas une narration déclenchée`)
    if (c.scene !== id) throw new TimelineError(`${id} : le clip déclenché ${e} appartient à la scène ${c.scene}`)
  }
  // Chaque narration du storyboard de cette scène doit être branchée
  for (const c of Object.values(CLIPS)) {
    if (c.scene !== id) continue
    if (c.trigger === "linear" && clip?.clip.id !== c.id) throw new LessonError(`${id} : la narration ${c.id} du storyboard n'est pas branchée (clip: voice("${c.id}"))`)
    if (c.trigger === "event" && !events.includes(c.id)) throw new LessonError(`${id} : la narration déclenchée ${c.id} n'est pas branchée (events: ["${c.id}"])`)
  }
  const interactive = input.exercise ?? input.model
  if (EXERCISES[id] && !interactive) throw new LessonError(`${id} : le storyboard a un exercice, la scène ne le branche pas (exercise: choiceExercise("${id}"))`)
  if (events.length > 0 && !interactive?.triggers) throw new LessonError(`${id} : des clips déclenchés sans logique qui les demande (exercise ou model.triggers)`)
  const kind: SceneKind = input.exercise ? "exercise" : input.model ? "custom" : "narrated"
  const intro = input.intro ?? META.intro
  if (!(intro > 0)) throw new LessonError(`${id} : « intro » doit être positif`)
  return {
    id,
    title: texts.title,
    kind,
    clip,
    events,
    intro,
    // Scène narrée : S = null et A = unknown par défaut
    model: interactive ?? (narratedModel as unknown as SceneModel<S, A>),
    View: input.View,
  }
}

/** Leçon : toutes les scènes du storyboard, dans son ordre, une seule fois. */
export function defineLesson(def: LessonDef): LessonDef {
  const ids = def.scenes.map((s: AnyScene) => s.id)
  const dup = ids.find((id, i) => ids.indexOf(id) !== i)
  if (dup) throw new LessonError(`scène ${dup} déclarée deux fois dans la leçon`)
  const missing = SCENE_IDS.filter((id) => !ids.includes(id))
  if (missing.length) throw new LessonError(`scènes du storyboard absentes de src/lesson/lesson.ts : ${missing.join(", ")}`)
  const extra = ids.filter((id) => !(SCENE_IDS as readonly string[]).includes(id))
  if (extra.length) throw new LessonError(`scènes absentes du storyboard : ${extra.join(", ")}`)
  if (ids.join() !== SCENE_IDS.join()) throw new LessonError(`ordre des scènes différent du storyboard : ${ids.join(", ")} au lieu de ${SCENE_IDS.join(", ")}`)
  return def
}
