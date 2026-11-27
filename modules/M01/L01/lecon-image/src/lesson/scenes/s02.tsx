/** S02 : planche image tracée (dessin, repérage, tracés, plan : content/design/planches/S02.*). */
import BOITES from "../../../content/design/planches/S02.boites.json"
import PLAN from "../../../content/design/planches/S02.json"
import TRACES from "../../../content/design/planches/S02.traces.json"
import IMAGE from "../../../content/design/planches/S02.webp"
import B_FONDATEURS_MURRAY_LUTZ from "../../../content/design/planches/biblio-fondateurs-murray-lutz.json"
import SOURCES from "../../../content/sources.json"
import { planche } from "../../engine/planche"

export const s02 = planche(PLAN, BOITES, { base: IMAGE }, SOURCES.sources, TRACES, { "fondateurs-murray-lutz": B_FONDATEURS_MURRAY_LUTZ })
