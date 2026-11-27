/**
 * Exercice à choix : logique pure (aucun React), testable sans navigateur.
 *
 *  · VALIDER n'a d'effet qu'avec une sélection ; la sélection reste
 *    modifiable jusqu'à VALIDER, figée ensuite (garde contre le double-clic :
 *    une seconde validation ne change rien et ne redemande aucun clip).
 *  · Les clips déclenchés sont demandés une seule fois, sur la transition
 *    « non validé → validé ».
 *  · Mode conséquence (sans « Attendu ») : aucun verdict, la conséquence du
 *    choix tient lieu de rétroaction.
 */
import { EXERCISES } from "../generated/texts"
import { TextError } from "./texts"
import type { SceneModel, SceneStatus } from "./types"

export type Exercise = {
  readonly question: string
  readonly choices: readonly { readonly key: string; readonly label: string; readonly feedback: string }[]
  /** Clé du choix attendu ; null = mode conséquence (aucun verdict possible). */
  readonly expected: string | null
}

export type ChoiceState = {
  readonly selected: string | null
  readonly validated: boolean
}

export type ChoiceAction = { readonly type: "select"; readonly key: string } | { readonly type: "validate" }

export const initialChoice: ChoiceState = { selected: null, validated: false }

/** Action « choisir ». */
export const select = (key: string): ChoiceAction => ({ type: "select", key })
/** Action « valider ». */
export const validate = (): ChoiceAction => ({ type: "validate" })

/** Exercice d'une scène, lu dans le storyboard ; TextError s'il n'y en a pas. */
export function exerciseOf(sceneId: string): Exercise {
  const ex = EXERCISES[sceneId]
  if (!ex) throw new TextError(`${sceneId} : aucune section « ## Exercice » dans le storyboard`)
  return ex
}

/** Réducteur pur. */
export function reduceChoice(exercise: Exercise, state: ChoiceState, action: ChoiceAction): ChoiceState {
  if (state.validated) return state
  switch (action.type) {
    case "select":
      if (!exercise.choices.some((c) => c.key === action.key) || state.selected === action.key) return state
      return { ...state, selected: action.key }
    case "validate":
      return state.selected === null ? state : { ...state, validated: true }
  }
}

/** Relecture tolérante d'un état conservé : tout ce qui est douteux redevient l'état initial. */
export function restore(exercise: Exercise, raw: unknown): ChoiceState {
  if (typeof raw !== "object" || raw === null) return initialChoice
  const r = raw as Record<string, unknown>
  const selected = typeof r.selected === "string" && exercise.choices.some((c) => c.key === r.selected) ? r.selected : null
  const validated = r.validated === true && selected !== null
  return { selected, validated }
}

/** Statut propre à l'exercice (le lecteur y ajoute l'écoute des clips déclenchés). */
export function statusOf(state: ChoiceState): SceneStatus {
  return { nextAllowed: state.validated, completed: state.validated }
}

/** Clips à demander sur une transition : ceux de `clips`, seulement au passage à « validé ». */
export function triggersOf(prev: ChoiceState, next: ChoiceState, clips: readonly string[]): readonly string[] {
  return !prev.validated && next.validated ? clips : []
}

/** Verdict à afficher : seulement si l'exercice a un attendu ET que la scène le demande. */
export function verdictOf(exercise: Exercise, state: ChoiceState, wanted: boolean): "expected" | "other" | null {
  if (!wanted || exercise.expected === null || !state.validated) return null
  return state.selected === exercise.expected ? "expected" : "other"
}

/**
 * Modèle de scène d'un exercice à choix : Suivant est verrouillé jusqu'à la
 * validation, jusqu'à la fin des clips déclenchés par elle ET jusqu'à la fin
 * de la narration d'entrée (valider tôt ne coupe jamais la narration).
 */
export function choiceExercise(sceneId: string, options: { readonly events?: readonly string[] } = {}): SceneModel<ChoiceState, ChoiceAction> {
  const exercise = exerciseOf(sceneId)
  const events = options.events ?? []
  return {
    initial: initialChoice,
    reduce: (state, action) => reduceChoice(exercise, state, action),
    restore: (raw) => restore(exercise, raw),
    status: ({ state, narrationDone, eventsDone }) => {
      const own = statusOf(state)
      return { nextAllowed: own.nextAllowed && eventsDone && narrationDone, completed: own.completed && eventsDone && narrationDone }
    },
    triggers: (prev, next) => triggersOf(prev, next, events),
  }
}
