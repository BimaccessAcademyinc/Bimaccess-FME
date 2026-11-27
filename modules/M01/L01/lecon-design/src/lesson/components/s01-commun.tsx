/**
 * Pièces communes à S01 et S02 (groupe a) : composants récurrents de la
 * spécification du groupe, posés en px de scène (1920 × 1080).
 *
 *   partBox   boîte de balayage d'un groupe de SVG, pour qu'un texte HTML posé
 *             dans ce groupe se découvre avec le même bord (même instant, même sens)
 *   RoleName  nom de rôle en en-tête de cartouche, centré dans le bandeau
 *   Source    mention de source en marge, calée par le bas à y 820, filet de 220 px,
 *             lien vers l'adresse de la scène (`content/sources.json`)
 *   RESERVE   réserve `fond` d'un texte posé sur la face (amorces de quadrillage)
 */
import { type CSSProperties, type ReactNode, useState } from "react"
import SOURCES from "../../../content/sources.json"
import { THEME } from "../../engine"

const C = THEME.colors

/**
 * Boîte de balayage d'un groupe : boîte du groupe (getBBox, sans le trait) et
 * marge de `Svg` (8 px au moins, 4 % du plus grand côté). Recopie de la règle
 * du moteur (components.tsx, Svg) : à garder égale si elle change.
 */
export function partBox(x: number, y: number, w: number, h: number): CSSProperties & { readonly left: number; readonly top: number } {
  const m = Math.max(8, 0.04 * Math.max(w, h))
  return { position: "absolute", left: x - m, top: y - m, width: w + 2 * m, height: h + 2 * m }
}

/** Réserve d'un texte posé sur la face hors d'une carte : aplat `fond`, 2 px. */
export const RESERVE: CSSProperties = { background: C.fond, padding: 2 }

/** En-tête de cartouche : Barlow 600, 26 px (agrandi depuis 24 px avec la composition), capitales, 0,32 em, interligne 1,2, encre (l'interlettrage de fin est compensé à gauche). */
const ROLE: CSSProperties = {
  fontFamily: THEME.fonts.capitales,
  fontWeight: 600,
  fontSize: 26,
  lineHeight: 1.2,
  letterSpacing: "0.32em",
  paddingLeft: "0.32em",
  textTransform: "uppercase",
  color: C.encre,
  textAlign: "center",
}

/**
 * Nom de rôle centré dans le bandeau (x, y, w, h en px de scène). Dans un
 * `Wipe` placé par `partBox`, `origin` est cette boîte : la position devient
 * relative à elle.
 */
export function RoleName({ x, y, w, h, origin, maxWidth, children, testId }: { readonly x: number; readonly y: number; readonly w: number; readonly h: number; readonly origin?: { readonly left: number; readonly top: number }; readonly maxWidth?: number; readonly children: ReactNode; readonly testId?: string }) {
  return (
    <div data-testid={testId} style={{ position: "absolute", left: x - (origin?.left ?? 0), top: y - (origin?.top ?? 0), width: w, height: h, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...ROLE, maxWidth }}>{children}</div>
    </div>
  )
}

/**
 * Adresse de la mention de source d'une scène, lue dans `content/sources.json`
 * (clé `sources`, tirée du pack). Jamais écrite en dur dans une scène.
 */
export function sourceHref(id: string): string {
  const href = (SOURCES.sources as Readonly<Record<string, string | undefined>>)[id]
  if (!href) throw new Error(`content/sources.json : aucune adresse pour la scène ${id}`)
  return href
}

/**
 * Mention de source (marge) : x 1448, bas à y 820, 250 px au plus ; serif
 * italique 400, 24 px, interligne 1,2, couleur `lien` (survol `lienSurvol`),
 * soulignée ; filet `encre` 1,2 px de 220 px, 10 px au-dessus de la première
 * ligne. À la première image. Lien ouvert dans un nouvel onglet.
 */
export function Source({ href, children, testId }: { readonly href: string; readonly children: ReactNode; readonly testId: string }) {
  const [hover, setHover] = useState(false)
  return (
    <div style={{ position: "absolute", left: 1448, bottom: 1080 - 820, width: 250 }}>
      <div aria-hidden="true" style={{ width: 220, height: 1.2, background: C.encre, marginBottom: 10 }} />
      <a
        data-testid={testId}
        href={href}
        target="_blank"
        rel="noopener"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ display: "block", fontFamily: THEME.fonts.serif, fontStyle: "italic", fontWeight: 400, fontSize: 24, lineHeight: 1.2, color: hover ? C.lienSurvol : C.lien, textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer", pointerEvents: "auto", ...RESERVE, margin: -2 }}
      >
        {children}
      </a>
    </div>
  )
}
