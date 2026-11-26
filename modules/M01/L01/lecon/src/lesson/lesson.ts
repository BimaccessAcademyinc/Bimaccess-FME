/**
 * La leçon : toutes les scènes du storyboard, dans son ordre.
 * defineLesson casse au chargement si une scène manque ou est en trop.
 * S02 à S08 sont en attente de leur code (scenes/attente.tsx).
 */
import { defineLesson } from "../engine"
import { exercisePending, narratedPending } from "./scenes/attente"
import { s01 } from "./scenes/s01"

export const LESSON = defineLesson({
  scenes: [s01, narratedPending("S02"), exercisePending("S03"), narratedPending("S04"), narratedPending("S05"), narratedPending("S06"), narratedPending("S07"), narratedPending("S08")],
})
