/**
 * Signature graphique du contenu (studio.config.json « signature ») :
 *
 *   bimaccess  signature CAD 2D de BIMaccess (design-system DESIGN.md) : fond
 *              blanc à grille de points, Azeret Mono et IBM Plex Sans,
 *              couleurs ACI, poignées carrées bleues, aucun coin arrondi,
 *              seule ombre décalée 6 × 8 px pour les panneaux ;
 *   carte      signature « carte topographique » : la scène est une feuille
 *              imprimée (bordure graduée, triple filet, carroyage), fond
 *              #F1F3EC, Source Serif 4 et Barlow Condensed en capitales
 *              espacées, aplats et traits, mise en évidence tiretée bleue
 *              sans poignée, aucun coin arrondi ni ombre ;
 *   neutral    signature neutre d'origine (fond papier, polices système,
 *              coins arrondis).
 *
 * Les composants du moteur lisent BIM et CARTE pour choisir leur rendu ; une
 * scène n'en a en principe pas besoin (elle passe par les composants et THEME).
 */
import { META } from "../generated/meta"
import { THEME } from "../generated/theme"

export type { Signature } from "../generated/meta"

/** Vrai quand la signature est « bimaccess ». */
export const BIM: boolean = META.signature === "bimaccess"

/** Vrai quand la signature est « carte » (carte topographique). */
export const CARTE: boolean = META.signature === "carte"

/** Couleur du programme (studio.config.json « program » ou « programColor »), sinon accent du thème. En signature carte : barre d'état seulement. */
export const PROGRAM_COLOR: string = META.programColor ?? THEME.colors.accent

/** Ombre autorisée par la charte bimaccess (panneaux, feuilles) : décalage plein, jamais floue. Signature carte : aucune ombre. */
export const SHEET_SHADOW = CARTE ? "none" : `6px 8px 0 ${THEME.colors.shadow}`
