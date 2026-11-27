/**
 * Grammaire du dessin CAD (design-system DESIGN.md § 6 et § 7) : marqueurs
 * d'accrochage et cotes. Utilisables dans les deux signatures ; leurs couleurs
 * par défaut sont celles de la charte (or pour les accrochages, cyan pour les
 * cotes), lues dans THEME.
 *
 * Coordonnées en pixels de composition. Aucun texte écrit ici : le texte
 * d'une cote vient du storyboard (sceneTexts).
 */
import type { CSSProperties, ReactNode } from "react"
import { THEME } from "../generated/theme"
import { type Point, Trace, useT } from "./anim"
import { BIM } from "./signature"

/**
 * Accrochages (osnaps) et leur sens dans l'interface (DESIGN.md § 6) :
 * endpoint ■ extrémité = réussi, midpoint ▲ milieu = en cours, center ○
 * centre = essentiel, intersection ✕ = lien, perpendicular ⊥ = prérequis,
 * quadrant ◇ = ressource.
 */
export type OsnapKind = "endpoint" | "midpoint" | "center" | "intersection" | "perpendicular" | "quadrant"

/** Géométrie des icônes design-system/assets/icons/osnap-*.svg (boîte 16 × 16, trait 2). */
function osnapShape(kind: OsnapKind, color: string): ReactNode {
  const s = { fill: "none", stroke: color, strokeWidth: 2 } as const
  switch (kind) {
    case "endpoint":
      return <rect x={2} y={2} width={12} height={12} {...s} />
    case "midpoint":
      return <polygon points="8,2 14,14 2,14" {...s} />
    case "center":
      return <circle cx={8} cy={8} r={6} {...s} />
    case "intersection":
      return (
        <>
          <line x1={2} y1={2} x2={14} y2={14} {...s} />
          <line x1={14} y1={2} x2={2} y2={14} {...s} />
        </>
      )
    case "perpendicular":
      return (
        <>
          <polyline points="2,2 2,14 14,14" {...s} />
          <polyline points="2,9 7,9 7,14" {...s} strokeWidth={1.5} />
        </>
      )
    case "quadrant":
      return <polygon points="8,1 15,8 8,15 1,8" {...s} />
  }
}

/**
 * Marqueur d'accrochage. En HTML : `<Osnap kind="endpoint" size={20} />`
 * (placé par `style`). Dans un `<svg>` : `<Osnap cx={…} cy={…} />`, centré
 * sur le point. Couleur par défaut : or (`gold`), celle des accrochages.
 */
export function Osnap({ kind = "endpoint", size = 16, color = THEME.colors.gold, cx, cy, style, testId }: { readonly kind?: OsnapKind; readonly size?: number; readonly color?: string; readonly cx?: number; readonly cy?: number; readonly style?: CSSProperties; readonly testId?: string }) {
  const at = cx !== undefined && cy !== undefined ? { x: cx - size / 2, y: cy - size / 2 } : {}
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width={size} height={size} overflow="visible" data-testid={testId} style={{ flex: "none", ...style }} {...at}>
      {osnapShape(kind, color)}
    </svg>
  )
}

/**
 * Cote (à placer dans un `<svg>`), d'après design-system/components/dimension.html :
 * lignes d'attache, ligne de cote, traits obliques aux extrémités (style
 * architectural), texte mono centré au-dessus de la ligne, dans la couleur
 * des cotes (cyan par défaut).
 *
 * `from` et `to` : points mesurés ; `offset` : distance de la ligne de cote
 * à ces points, du côté gauche du sens from → to (au-dessus pour une cote
 * horizontale tracée de gauche à droite ; négatif : de l'autre côté).
 * Animation : lignes d'attache puis ligne de cote tracées à vitesse
 * constante à partir de `at`, traits obliques, puis texte tapé à la cadence
 * du thème. Le texte vient du storyboard.
 */
export function Dimension({
  from,
  to,
  offset = 40,
  label,
  at,
  dur = 0.5,
  color = THEME.colors.cyan,
  size = 30,
  width = 1.5,
  testId,
}: {
  readonly from: Point
  readonly to: Point
  readonly offset?: number
  readonly label: string
  readonly at: number
  readonly dur?: number
  readonly color?: string
  readonly size?: number
  readonly width?: number
  readonly testId?: string
}) {
  const t = useT()
  const dx = to[0] - from[0]
  const dy = to[1] - from[1]
  const len = Math.hypot(dx, dy) || 1
  const u: Point = [dx / len, dy / len]
  const n: Point = [u[1], -u[0]]
  const side = offset < 0 ? -1 : 1
  const off = (p: Point, k: number, along = 0): Point => [p[0] + n[0] * k + u[0] * along, p[1] + n[1] * k + u[1] * along]
  const gap = 6
  const ext = 12
  const over = 10
  const a = off(from, offset)
  const b = off(to, offset)
  const tickD: Point = [(u[0] + n[0]) / Math.SQRT2, (u[1] + n[1]) / Math.SQRT2]
  const tick = (p: Point): Point[] => [
    [p[0] - tickD[0] * 9, p[1] - tickD[1] * 9],
    [p[0] + tickD[0] * 9, p[1] + tickD[1] * 9],
  ]
  const lineAt = at + 0.2
  const tickAt = lineAt + dur
  const textAt = tickAt + 0.12
  const cps = Number(THEME.typingCps)
  const shown = Math.max(0, Math.min(label.length, Math.floor((t - textAt) * cps)))
  const mid = off([(from[0] + to[0]) / 2, (from[1] + to[1]) / 2], offset + side * 12)
  const angle = (Math.atan2(u[1], u[0]) * 180) / Math.PI
  return (
    <g data-testid={testId} role="img" aria-label={label}>
      <Trace points={[off(from, side * gap), off(from, offset + side * ext)]} at={at} dur={0.2} color={color} width={width} />
      <Trace points={[off(to, side * gap), off(to, offset + side * ext)]} at={at} dur={0.2} color={color} width={width} />
      <Trace points={[off(from, offset, -over), off(to, offset, over)]} at={lineAt} dur={dur} color={color} width={width} />
      <Trace points={tick(a)} at={tickAt} dur={0.1} color={color} width={width * 1.4} />
      <Trace points={tick(b)} at={tickAt} dur={0.1} color={color} width={width * 1.4} />
      {t >= textAt ? (
        <text
          x={mid[0]}
          y={mid[1]}
          transform={angle ? `rotate(${angle} ${mid[0]} ${mid[1]})` : undefined}
          textAnchor="middle"
          dominantBaseline={side > 0 ? "auto" : "hanging"}
          fill={color}
          aria-hidden="true"
          style={{ fontFamily: THEME.fonts.mono, fontSize: size, fontWeight: 400, letterSpacing: "0.06em", textTransform: BIM ? "uppercase" : undefined }}
        >
          <tspan>{label.slice(0, shown)}</tspan>
          <tspan visibility="hidden">{label.slice(shown)}</tspan>
        </text>
      ) : null}
    </g>
  )
}
