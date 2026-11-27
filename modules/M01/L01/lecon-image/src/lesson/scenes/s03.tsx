/** S03 : planche image tracée (dessin, repérage, tracés, plan : content/design/planches/S03.*). */
import BOITES from "../../../content/design/planches/S03.boites.json"
import PLAN from "../../../content/design/planches/S03.json"
import TRACES from "../../../content/design/planches/S03.traces.json"
import IMAGE from "../../../content/design/planches/S03.webp"
import SOURCES from "../../../content/sources.json"
import { planche } from "../../engine/planche"

export const s03 = planche(PLAN, BOITES, { base: IMAGE }, SOURCES.sources, TRACES, {  })
