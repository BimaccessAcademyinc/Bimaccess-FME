/**
 * Moteur de scènes : point d'entrée unique des scènes (src/lesson/scenes/).
 *
 *   import { voice, ordered, defineScene, SceneRoot, Wipe, useT, THEME } from "../../engine"
 */
// Thème (couleurs, polices, rayon, cadence) et réglages du contenu, pour les scènes
export { META } from "../generated/meta"
export { THEME } from "../generated/theme"
export { Grips, Highlight, HighlightRect, Move, type Point, type Pose, rectPath, Trace, TypeText, useT, Wipe, type WipeDir, wipeProgress } from "./anim"
// Grammaire du dessin CAD (DESIGN.md § 6 et § 7) : accrochages et cotes
export { Dimension, Osnap, type OsnapKind } from "./cad"
export { ActionZone, type BulletItem, Bullets, Callout, Captions, ChoicePanel, Diagram, type DiagramLink, type DiagramNode, SceneClock, SceneRoot, Svg, type SvgPart, Title, tid } from "./components"
export {
  type ChoiceAction,
  type ChoiceState,
  choiceExercise,
  type Exercise,
  exerciseOf,
  initialChoice,
  reduceChoice,
  restore,
  select,
  statusOf,
  triggersOf,
  validate,
  verdictOf,
} from "./exercise"
export { defineLesson, defineScene, LessonError, type SceneInput } from "./scene"
// Signature graphique (studio.config.json « signature », « program », « programColor »)
export { BIM, PROGRAM_COLOR, SHEET_SHADOW, type Signature } from "./signature"
export { asset, type Illustration, illustration, type SceneTexts, sceneTexts, TextError } from "./texts"
export {
  clipOf,
  ease,
  eventVoice,
  findLocution,
  focusAt,
  LocutionError,
  normalizeToken,
  OrderError,
  ordered,
  prog,
  type Step,
  TimelineError,
  tokenize,
  typedUntil,
  voice,
} from "./timeline"
export type { AnyScene, Clip, ClipTrigger, LessonDef, SceneDef, SceneKind, SceneModel, SceneStatus, SceneViewProps, StatusInput, Voice, Word } from "./types"
