/** S06 : planche image (dessin, repérage, plan : content/design/planches/S06.*). */
import BOITES from "../../../content/design/planches/S06.boites.json"
import PLAN from "../../../content/design/planches/S06.json"
import IMAGE from "../../../content/design/planches/S06.webp"
import IMG_LIRE from "../../../content/design/planches/S06-lire.webp"
import IMG_ECRIRE from "../../../content/design/planches/S06-ecrire.webp"
import SOURCES from "../../../content/sources.json"
import { planche } from "../../engine/planche"

export const s06 = planche(PLAN, BOITES, { base: IMAGE, lire: IMG_LIRE, ecrire: IMG_ECRIRE }, SOURCES.sources)
