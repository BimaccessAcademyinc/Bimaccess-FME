/**
 * La leçon : toutes les scènes du storyboard, dans son ordre.
 * defineLesson casse au chargement si une scène manque ou est en trop.
 */
import { defineLesson } from "../engine"
import { s01 } from "./scenes/s01"

export const LESSON = defineLesson({ scenes: [s01] })
