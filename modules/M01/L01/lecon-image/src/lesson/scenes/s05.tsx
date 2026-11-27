/** S05 : planche image (dessin, repérage, plan : content/design/planches/S05.*). */
import BOITES from "../../../content/design/planches/S05.boites.json"
import PLAN from "../../../content/design/planches/S05.json"
import IMAGE from "../../../content/design/planches/S05.webp"
import SOURCES from "../../../content/sources.json"
import { planche } from "../../engine/planche"

export const s05 = planche(PLAN, BOITES, { base: IMAGE }, SOURCES.sources)
