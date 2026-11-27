/**
 * S02 · Safe Software commence par traduire vers SAIF (scène narrée, clip S02-01).
 * Scène de données : composition, gestes, locutions et mises en évidence sont dans
 * `content/design/scenes/S02.json` (gabarit `Frise`, voir `docs/gabarits.md`).
 */
import data from "../../../content/design/scenes/S02.json"
import { defineScene, Frise } from "../../engine"

export const s02 = defineScene(Frise.scene(data))
