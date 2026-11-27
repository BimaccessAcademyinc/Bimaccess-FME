/**
 * La leçon : toutes les scènes du storyboard, dans son ordre.
 * defineLesson casse au chargement si une scène manque ou est en trop.
 * Une scène pas encore construite est déclarée par sceneEnAttente.
 */
import { defineLesson } from "../engine"
import { s01 } from "./scenes/s01"
import { s02 } from "./scenes/s02"
import { s03 } from "./scenes/s03"
import { s04 } from "./scenes/s04"
import { s05 } from "./scenes/s05"
import { s06 } from "./scenes/s06"
import { s07 } from "./scenes/s07"

export const LESSON = defineLesson({
  scenes: [s01, s02, s03, s04, s05, s06, s07],
})
