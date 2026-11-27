/** S01 : planche image tracée (dessin, repérage, tracés, plan : content/design/planches/S01.*). */
import BOITES from "../../../content/design/planches/S01.boites.json"
import PLAN from "../../../content/design/planches/S01.json"
import TRACES from "../../../content/design/planches/S01.traces.json"
import IMAGE from "../../../content/design/planches/S01.webp"
import B_FONDATEURS_MURRAY_LUTZ from "../../../content/design/planches/biblio-fondateurs-murray-lutz.json"
import SOURCES from "../../../content/sources.json"
import { planche } from "../../engine/planche"

export const s01 = planche(PLAN, BOITES, { base: IMAGE }, SOURCES.sources, TRACES, { "fondateurs-murray-lutz": B_FONDATEURS_MURRAY_LUTZ })
