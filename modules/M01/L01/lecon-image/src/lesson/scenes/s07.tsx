/** S07 : planche image tracée (dessin, repérage, tracés, plan : content/design/planches/S07.*). */
import BOITES from "../../../content/design/planches/S07.boites.json"
import PLAN from "../../../content/design/planches/S07.json"
import TRACES from "../../../content/design/planches/S07.traces.json"
import IMAGE from "../../../content/design/planches/S07.webp"
import SOURCES from "../../../content/sources.json"
import { planche } from "../../engine/planche"

export const s07 = planche(PLAN, BOITES, { base: IMAGE }, SOURCES.sources, TRACES, {  })
