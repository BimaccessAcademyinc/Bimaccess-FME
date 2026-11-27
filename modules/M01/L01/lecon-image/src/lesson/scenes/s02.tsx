/** S02 : planche image (dessin, repérage, plan : content/design/planches/S02.*). */
import BOITES from "../../../content/design/planches/S02.boites.json"
import PLAN from "../../../content/design/planches/S02.json"
import IMAGE from "../../../content/design/planches/S02.webp"
import SOURCES from "../../../content/sources.json"
import { planche } from "../../engine/planche"

export const s02 = planche(PLAN, BOITES, { base: IMAGE }, SOURCES.sources)
