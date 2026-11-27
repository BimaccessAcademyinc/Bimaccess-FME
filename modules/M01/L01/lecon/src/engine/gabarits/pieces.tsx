/**
 * Pièces des gabarits, en px de scène 1920 × 1080 :
 *
 *   poser   boîte d'une illustration posée par sa largeur ; sa hauteur suit son
 *           `viewBox` (jamais étirée)
 *   Texte   texte posé sur sa réserve (2 px en haut et en bas, 6 px à gauche et
 *           à droite), balayé avec elle, ou réserve posée à l'instant où le
 *           texte paraît (frappe)
 *   Source  mention de source à la place que donne la signature active
 *           (PAGE.source : colonne de marge en carte, bas gauche en bimaccess,
 *           haut droit en neutral), filet au-dessus, lien vers l'adresse de
 *           la scène (content/sources.json)
 *
 * Aucune mesure de texte au rendu : le cache de `measureText` garderait une
 * mesure faite avant le chargement des polices. Un texte centré l'est par le
 * navigateur (`cx`, translateX(-50 %)), avec ses polices.
 */
import { type CSSProperties, type ReactNode, useState } from "react"
import SOURCES from "../../../content/sources.json"
import { THEME } from "../../generated/theme"
import { useT, Wipe, type WipeDir } from "../anim"
import { PAGE } from "../signature"
import type { Illustration } from "../texts"
import { GabaritError, type StyleD } from "./donnees"

const C = THEME.colors

export type Boite = { readonly position: "absolute"; readonly left: number; readonly top: number; readonly width: number; readonly height: number }

const VIEWBOX = /viewBox\s*=\s*["']\s*(-?[\d.]+)[\s,]+(-?[\d.]+)[\s,]+([\d.]+)[\s,]+([\d.]+)\s*["']/

/** Illustration posée à (x, y) sur `width` px ; hauteur = width × h / w du `viewBox`. `where` : fichier et champ, pour l'erreur. */
export function poser(ill: Illustration, x: number, y: number, width: number, where = ill.name): Boite {
  const m = VIEWBOX.exec(ill.svg)
  const w = Number(m?.[3])
  const h = Number(m?.[4])
  if (!m || !(w > 0) || !(h > 0)) throw new GabaritError(`${where} : l'illustration « ${ill.name} » n'a pas de viewBox lisible, sa hauteur ne peut pas se tirer de sa largeur. À faire : demander au graphiste un SVG avec viewBox="x y largeur hauteur"`)
  if (!(width > 0)) throw new GabaritError(`${where} : largeur ${width} : elle doit être positive. À faire : recopier la largeur de la spécification`)
  return { position: "absolute", left: x, top: y, width, height: (width * h) / w }
}

/** Style CSS d'un style de données. */
export function cssDe(s: StyleD): CSSProperties {
  return {
    fontFamily: s.police,
    fontWeight: s.graisse,
    fontSize: s.taille,
    lineHeight: s.interligne,
    color: s.couleur,
    letterSpacing: s.interlettrage ? `${s.interlettrage}em` : undefined,
    textTransform: s.capitales ? "uppercase" : undefined,
    fontStyle: s.italique ? "italic" : undefined,
  }
}

const PAD_X = 6
const PAD_Y = 2

/**
 * Texte en px de scène. `x` : bord gauche du texte (la réserve déborde de
 * 6 px) ; `cx` : centré sur cette abscisse, `track` (interlettrage en em)
 * compense l'espace de fin des capitales espacées ; `y` : haut du texte.
 * `origin` : coin de la boîte qui le contient quand il est balayé avec une
 * illustration. `wipe` : texte et réserve balayés ensemble à `at` ; sinon la
 * réserve se pose à `at` (début de la frappe).
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
  readonly reserve: string | null
  readonly track?: number
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

/** Adresse de la mention de source d'une scène (content/sources.json, clé `sources`). */
export function sourceHref(id: string, where: string): string {
  const href = (SOURCES.sources as Readonly<Record<string, string | undefined>>)[id]
  if (!href) throw new GabaritError(`${where} : aucune adresse pour la scène ${id} dans content/sources.json. À faire : ajouter « "${id}": "<adresse de la source>" » sous « sources » (adresse tirée des sources de la leçon), ou retirer « source » des données`)
  return href
}

/** Couleur d'un jeton nommé par la mise en page, sinon `repli` (thème qui n'a pas ce jeton). */
const jeton = (nom: string, repli: string): string => (C as Readonly<Record<string, string | undefined>>)[nom] ?? repli
const S = PAGE.source

/**
 * Mention de source, à la place de la signature active (PAGE.source : bord
 * gauche, bas du bloc, largeur) ; police `body` 400, taille et italique de
 * la signature, interligne 1,2, couleur du jeton `couleur` (survol `survol`),
 * soulignée ; filet `ink` 1,2 px de `filet` px, 10 px au-dessus. À l'image 0.
 */
export function Source({ href, children, testId }: { readonly href: string; readonly children: ReactNode; readonly testId: string }) {
  const [hover, setHover] = useState(false)
  return (
    <div style={{ position: "absolute", left: S.x, bottom: 1080 - S.bas, width: S.largeur }}>
      <div aria-hidden="true" style={{ width: S.filet, height: 1.2, background: C.ink, marginBottom: 10 }} />
      <a
        data-testid={testId}
        href={href}
        target="_blank"
        rel="noopener"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ display: "block", fontFamily: THEME.fonts.body, fontStyle: S.italique ? "italic" : "normal", fontWeight: 400, fontSize: S.taille, lineHeight: 1.2, color: hover ? jeton(S.survol, C.ink) : jeton(S.couleur, C.accent), textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer", pointerEvents: "auto", background: jeton(PAGE.reserve, C.background), padding: 2, margin: -2 }}
      >
        {children}
      </a>
    </div>
  )
}
