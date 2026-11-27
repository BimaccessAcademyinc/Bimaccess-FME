/**
 * Pièces communes à S02 et S04 (essai « illustrations commandées ») : règle de
 * placement de la spécification (sections S02 et S04), en px de scène.
 *
 *   poser   boîte d'une illustration posée par sa largeur ; sa hauteur suit son
 *           `viewBox` (jamais étirée) ; lue au chargement du module, TextError
 *           si le `viewBox` manque
 *   Texte   texte posé sur sa réserve (fond du texte, 2 px en haut et en bas,
 *           6 px à gauche et à droite) : `fond` sur la face ; dans une carte ou
 *           une feuille, `RESERVE_CARTE` (ci-dessous). La réserve est dans
 *           l'élément du texte : balayée avec lui (`wipe`), ou posée à l'instant
 *           où il paraît (texte tapé ou posé à la première image)
 */
import type { CSSProperties, ReactNode } from "react"
import { type Illustration, TextError, useT, Wipe, type WipeDir } from "../../engine"

/**
 * Réserve des textes posés dans une carte ou une feuille. La spécification
 * demande `papier` (#FBFCF8), mais l'aplat des illustrations vectorisées n'est
 * pas ce jeton : #F7F8F2 à #F8F9F3 (fondateurs, contrat, lieu, feuille), #F6F7F1
 * (bandeau de SAIF). Une réserve `papier` y fait un pavé plus clair autour du
 * texte, visible sur les captures, et devant lui pendant la frappe. Aucun trait
 * ne passe sous ces textes (places mesurées par la spécification) et l'aplat de
 * l'illustration couvre déjà les amorces : pas de réserve tant que les
 * illustrations ne sont pas ramenées aux jetons. Le jour où elles le sont :
 * `THEME.colors.papier` ici, et la spécification est suivie à la lettre.
 */
export const RESERVE_CARTE: string | null = null

/** Boîte d'une illustration en px de scène. */
export type Boite = { readonly position: "absolute"; readonly left: number; readonly top: number; readonly width: number; readonly height: number }

const VIEWBOX = /viewBox\s*=\s*["']\s*(-?[\d.]+)[\s,]+(-?[\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*["']/

/** Illustration posée à (x, y) sur `width` px ; hauteur = width × h / w du `viewBox`. */
export function poser(ill: Illustration, x: number, y: number, width: number): Boite {
  const m = VIEWBOX.exec(ill.svg)
  const w = Number(m?.[3])
  const h = Number(m?.[4])
  if (!m || !(w > 0) || !(h > 0)) throw new TextError(`illustration « ${ill.name} » : viewBox absent ou illisible, hauteur impossible à tirer de la largeur`)
  return { position: "absolute", left: x, top: y, width, height: (width * h) / w }
}

/** Réserve de la spécification : 2 px en haut et en bas, 6 px à gauche et à droite. */
const PAD_X = 6
const PAD_Y = 2

/**
 * Texte en px de scène. `x` : bord gauche du texte (la réserve déborde de
 * 6 px) ; `cx` : texte centré sur cette abscisse, `track` (interlettrage en
 * em) compense l'espace de fin des capitales espacées ; `y` : haut du texte.
 * `origin` : coin de la boîte qui contient le texte quand il est posé dans un
 * `Wipe` (balayé avec une illustration). `wipe` : texte et réserve balayés
 * ensemble à `at` ; sinon la réserve se pose à `at` (début de la frappe, ou 0).
 */
export function Texte({
  x,
  cx,
  y,
  at,
  reserve,
  track = 0,
  width,
  wipe,
  origin,
  style,
  lang,
  testId,
  children,
}: {
  readonly x?: number
  readonly cx?: number
  readonly y: number
  readonly at: number
  /** Couleur de la réserve ; null : aucune (texte sur l'aplat de son illustration). */
  readonly reserve: string | null
  readonly track?: number
  /** Largeur du texte (retour à la ligne) ; sans elle, une seule ligne. */
  readonly width?: number
  readonly wipe?: { readonly dur: number; readonly dir: WipeDir }
  readonly origin?: { readonly left: number; readonly top: number }
  readonly style: CSSProperties
  readonly lang?: string
  readonly testId?: string
  readonly children: ReactNode
}) {
  const t = useT()
  const ox = origin?.left ?? 0
  const oy = origin?.top ?? 0
  const left = cx !== undefined ? cx - ox : (x ?? 0) - ox - PAD_X
  const box: CSSProperties = {
    position: "absolute",
    left,
    top: y - oy - PAD_Y,
    // Centré : la boîte se décale de sa moitié ; l'interlettrage de fin des capitales est compensé à gauche
    transform: cx !== undefined ? "translateX(-50%)" : undefined,
    padding: `${PAD_Y}px ${PAD_X}px`,
    paddingLeft: track ? `calc(${PAD_X}px + ${track}em)` : PAD_X,
    width: width !== undefined ? width + 2 * PAD_X : undefined,
    boxSizing: "border-box",
    whiteSpace: width !== undefined ? "normal" : "nowrap",
    ...style,
  }
  if (wipe) {
    return (
      <Wipe at={at} dur={wipe.dur} dir={wipe.dir} style={{ ...box, background: reserve ?? undefined }} testId={testId}>
        <span lang={lang}>{children}</span>
      </Wipe>
    )
  }
  return (
    <div data-testid={testId} lang={lang} style={{ ...box, background: reserve !== null && t >= at ? reserve : undefined }}>
      {children}
    </div>
  )
}
