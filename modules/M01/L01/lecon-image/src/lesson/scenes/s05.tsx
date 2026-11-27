/** S05 : planche image tracée (dessin, repérage, tracés, plan : content/design/planches/S05.*). */
import BOITES from "../../../content/design/planches/S05.boites.json"
import PLAN from "../../../content/design/planches/S05.json"
import TRACES from "../../../content/design/planches/S05.traces.json"
import IMAGE from "../../../content/design/planches/S05.webp"
import SOURCES from "../../../content/sources.json"
import { planche } from "../../engine/planche"

export const s05 = planche(PLAN, BOITES, { base: IMAGE }, SOURCES.sources, TRACES, {  })
