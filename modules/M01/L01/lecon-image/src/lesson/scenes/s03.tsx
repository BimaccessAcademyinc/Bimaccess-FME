/** S03 : planche image (dessin, repérage, plan : content/design/planches/S03.*). */
import BOITES from "../../../content/design/planches/S03.boites.json"
import PLAN from "../../../content/design/planches/S03.json"
import IMAGE from "../../../content/design/planches/S03.webp"
import SOURCES from "../../../content/sources.json"
import { planche } from "../../engine/planche"

export const s03 = planche(PLAN, BOITES, { base: IMAGE }, SOURCES.sources)
