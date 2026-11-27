/** S07 : planche image (dessin, repérage, plan : content/design/planches/S07.*). */
import BOITES from "../../../content/design/planches/S07.boites.json"
import PLAN from "../../../content/design/planches/S07.json"
import IMAGE from "../../../content/design/planches/S07.webp"
import SOURCES from "../../../content/sources.json"
import { planche } from "../../engine/planche"

export const s07 = planche(PLAN, BOITES, { base: IMAGE }, SOURCES.sources)
