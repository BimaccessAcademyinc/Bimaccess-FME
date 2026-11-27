/**
 * Signature graphique du contenu (studio.config.json « signature ») :
 *
 *   bimaccess  signature CAD 2D de BIMaccess (design-system DESIGN.md) : fond
 *              blanc à grille de points, Azeret Mono et IBM Plex Sans,
 *              couleurs ACI, poignées carrées bleues, aucun coin arrondi,
 *              seule ombre décalée 6 × 8 px pour les panneaux ;
 *   carte      signature « carte topographique » : la scène est une feuille
 *              imprimée (bordure graduée, triple filet, carroyage), fond
 *              papier clair, Source Serif 4 et Barlow Condensed en capitales
 *              espacées, aplats et traits, mise en évidence tiretée bleue
 *              sans poignée, aucun coin arrondi ni ombre ; palette neutre par
 *              défaut, celle du programme dans content/design/theme.json ;
 *   neutral    signature neutre d'origine (fond papier, polices système,
 *              coins arrondis).
 *
 * Les composants du moteur lisent BIM et CARTE pour choisir leur rendu ; une
 * scène n'en a en principe pas besoin (elle passe par les composants et THEME).
 * PAGE donne la mise en page de la signature active (face utile, débord,
 * marge, titre, mention de source) : les gabarits de scène s'y placent et
 * s'y contrôlent (docs/gabarits.md).
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

/** Rectangle en pixels de composition (1920 × 1080) : x0, y0 coin haut gauche, x1, y1 coin bas droit. */
export type Cadre = { readonly x0: number; readonly y0: number; readonly x1: number; readonly y1: number }

/**
 * Mise en page d'une scène dans une signature, en pixels de composition
 * 1920 × 1080. Les gabarits de scène (src/engine/gabarits/) en tirent leurs
 * places et leurs contrôles ; une scène écrite à la main peut s'en servir
 * aussi (PAGE.face pour sa composition, PAGE.titre pour son titre).
 */
export type MiseEnPage = {
  /** Face utile : du bas du titre au haut des sous-titres ; la composition finale la remplit, textes et mises en évidence y restent. */
  readonly face: Cadre
  /** Débord permis d'un dessin (illustration, tracé, frise) hors de la face, jamais d'un texte ni d'une mise en évidence ; null : aucun. */
  readonly debord: Cadre | null
  /** Colonne de marge (habillage : échelle, rose ; mention de source), hors de la face ; null : la signature n'en a pas. */
  readonly marge: Cadre | null
  /** Coin haut gauche du texte du titre de scène. */
  readonly titre: { readonly x: number; readonly y: number }
  /**
   * Mention de source : bord gauche `x`, bas du bloc `bas`, `largeur` au plus,
   * filet de `filet` px au-dessus ; police `body` du thème, `taille` px,
   * `italique` ; `couleur` et `survol` : noms de jetons du thème.
   */
  readonly source: { readonly x: number; readonly bas: number; readonly largeur: number; readonly filet: number; readonly taille: number; readonly italique: boolean; readonly couleur: string; readonly survol: string }
  /** Jeton de la réserve posée sous un texte de la face et sous le titre (fond de la scène). */
  readonly reserve: string
}

const PAGES: Readonly<Record<string, MiseEnPage>> = {
  // Face de carte de la charte : x 104 à 1424, y 180 (bas du titre) à 860 (haut des sous-titres) ;
  // colonne de marge x 1448 à 1830 (échelle, rose, source) ; débord d'un dessin jusqu'à x 1500 entre y 360 et y 690
  carte: {
    face: { x0: 104, y0: 180, x1: 1424, y1: 860 },
    debord: { x0: 1424, y0: 360, x1: 1500, y1: 690 },
    marge: { x0: 1448, y0: 84, x1: 1830, y1: 860 },
    titre: { x: 104, y: 84 },
    source: { x: 1448, bas: 820, largeur: 250, filet: 220, taille: 24, italique: true, couleur: "lien", survol: "lienSurvol" },
    reserve: "background",
  },
  // Gabarit de scène de DESIGN.md § 4 : titre en haut à gauche, sous-titres en bas (y ≥ 880),
  // zone d'action en bas à droite ; pas de colonne de marge : la source va en bas à gauche, à côté de l'icône SCU
  bimaccess: {
    face: { x0: 110, y0: 180, x1: 1810, y1: 860 },
    debord: null,
    marge: null,
    titre: { x: 110, y: 64 },
    source: { x: 110, bas: 1040, largeur: 250, filet: 220, taille: 24, italique: false, couleur: "ink2", survol: "ink" },
    reserve: "background",
  },
  // Signature neutre : même face ; source en haut à droite (les sous-titres neutres couvrent le bas sur 78 % de la largeur)
  neutral: {
    face: { x0: 110, y0: 180, x1: 1810, y1: 860 },
    debord: null,
    marge: null,
    titre: { x: 110, y: 64 },
    source: { x: 1560, bas: 150, largeur: 250, filet: 220, taille: 24, italique: false, couleur: "accent", survol: "ink" },
    reserve: "background",
  },
}

/** Mise en page de la signature active. */
export const PAGE: MiseEnPage = PAGES[META.signature] ?? (PAGES.bimaccess as MiseEnPage)
