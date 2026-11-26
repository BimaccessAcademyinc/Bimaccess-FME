/**
 * Signature graphique du contenu (studio.config.json « signature ») :
 *
 *   bimaccess  signature CAD 2D de BIMaccess (design-system DESIGN.md) : fond
 *              blanc à grille de points, Azeret Mono et IBM Plex Sans,
 *              couleurs ACI, poignées carrées bleues, aucun coin arrondi,
 *              seule ombre décalée 6 × 8 px pour les panneaux ;
 *   neutral    signature neutre d'origine (fond papier, polices système,
 *              coins arrondis).
 *
 * Les composants du moteur lisent BIM pour choisir leur rendu ; une scène
 * n'en a en principe pas besoin (elle passe par les composants et THEME).
 */
import { META } from "../generated/meta"
import { THEME } from "../generated/theme"

export type { Signature } from "../generated/meta"

/** Vrai quand la signature est « bimaccess ». */
export const BIM: boolean = META.signature === "bimaccess"

/** Couleur du programme (studio.config.json « program » ou « programColor »), sinon accent du thème. */
export const PROGRAM_COLOR: string = META.programColor ?? THEME.colors.accent

/** Ombre autorisée par la charte (panneaux, feuilles) : décalage plein, jamais floue. */
export const SHEET_SHADOW = `6px 8px 0 ${THEME.colors.shadow}`
