/** S04 : planche image tracée (dessin, repérage, tracés, plan : content/design/planches/S04.*). */
import BOITES from "../../../content/design/planches/S04.boites.json"
import PLAN from "../../../content/design/planches/S04.json"
import TRACES from "../../../content/design/planches/S04.traces.json"
import IMAGE from "../../../content/design/planches/S04.webp"
import SOURCES from "../../../content/sources.json"
import { planche } from "../../engine/planche"

export const s04 = planche(PLAN, BOITES, { base: IMAGE }, SOURCES.sources, TRACES, {  })
