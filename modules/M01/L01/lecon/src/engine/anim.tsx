/**
 * Primitives d'animation pilotées par le temps de scène.
 *
 * Grammaire : aucune apparition en fondu d'opacité. On balaie (Wipe, par
 * clip-path), on trace (Trace, par stroke-dashoffset, à vitesse constante),
 * on tape (TypeText, à cadence fixe), on déplace (Move). Une seule mise en
 * évidence à la fois (Highlight, avec focusAt). Il n'existe pas de « Pop » :
 * une apparition brusque et grossissante est interdite.
 *
 * Toutes les primitives prennent des instants en secondes de scène, issus de
 * locutions ou de repères (voice().said, .b), jamais écrits à la main.
 *
 * Signature bimaccess (signature.ts) : traits à bouts nets et angles vifs
 * (dessin technique), mise en évidence en contour tireté et poignées
 * carrées pleines couleur `grip` (DESIGN.md § 5 et § 6).
 */
import { type CSSProperties, type ReactNode, useId } from "react"
import { useCurrentFrame, useVideoConfig } from "remotion"
import { META } from "../generated/meta"
import { THEME } from "../generated/theme"
import { BIM } from "./signature"
import { ease, prog } from "./timeline"

/** Temps de scène, en secondes (image / fps). */
export function useT(): number {
  const frame = useCurrentFrame()
  const { fps } = useVideoConfig()
  return frame / fps
}

export type WipeDir = "right" | "left" | "down" | "up"

const insetFor = (dir: WipeDir, hidden: number): string => {
  const h = `${(hidden * 100).toFixed(3)}%`
  switch (dir) {
    case "right":
      return `inset(0 ${h} 0 0)`
    case "left":
      return `inset(0 0 0 ${h})`
    case "down":
      return `inset(0 0 ${h} 0)`
    case "up":
      return `inset(${h} 0 0 0)`
  }
}

/** Avancement d'un balayage (0 → 1), courbe de sortie courte. */
export const wipeProgress = (t: number, at: number, dur = 0.5): number => ease(prog(t, at, dur))

/**
 * Balayage : l'élément se découvre dans la direction `dir` à partir de `at`.
 * Avant `at`, il occupe sa place mais reste invisible et inerte (ni clic ni
 * focus clavier).
 */
export function Wipe({
  at,
  dur = 0.5,
  dir = "right",
  children,
  style,
  className,
  testId,
}: {
  readonly at: number
  readonly dur?: number
  readonly dir?: WipeDir
  readonly children: ReactNode
  readonly style?: CSSProperties
  readonly className?: string
  readonly testId?: string
}) {
  const t = useT()
  const p = wipeProgress(t, at, dur)
  return (
    <div
      className={className}
      data-testid={testId}
      inert={p <= 0}
      aria-hidden={p <= 0 ? true : undefined}
      style={{ ...style, clipPath: p >= 1 ? undefined : insetFor(dir, 1 - p) }}
    >
      {children}
    </div>
  )
}

export type Point = readonly [number, number]

const pathOf = (points: readonly Point[]): string => points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ")

/** Tracé d'un rectangle (sens horaire depuis le coin haut gauche). */
export const rectPath = (x: number, y: number, w: number, h: number): string => `M${x} ${y} H${x + w} V${y + h} H${x} Z`

const safeId = (raw: string): string => `m${raw.replace(/[^a-zA-Z0-9_-]/g, "")}`

/**
 * Trait tracé à vitesse constante (à placer dans un <svg>). `d` ou `points` ;
 * `arrow` (avec `points`) trace une pointe à la fin quand le trait est complet ;
 * `dashed` trace un trait tireté (révélé par un masque).
 */
export function Trace({
  d,
  points,
  at,
  dur = 0.6,
  color = THEME.colors.ink,
  width = 4,
  dashed,
  arrow = false,
  fill,
}: {
  readonly d?: string
  readonly points?: readonly Point[]
  readonly at: number
  readonly dur?: number
  readonly color?: string
  readonly width?: number
  readonly dashed?: string
  readonly arrow?: boolean
  /** Remplissage d'une forme fermée, posé quand le contour est complet (pas de fondu). */
  readonly fill?: string
}) {
  const t = useT()
  const id = safeId(useId())
  const path = d ?? (points ? pathOf(points) : "")
  const p = prog(t, at, dur)
  if (p <= 0 || !path) return null
  // Signature bimaccess : bouts nets et angles vifs, comme un trait de dessin technique
  const common = { fill: "none", stroke: color, strokeWidth: width, strokeLinecap: (BIM ? "butt" : "round") as "butt" | "round", strokeLinejoin: (BIM ? "miter" : "round") as "miter" | "round" }
  const head = arrow && points && points.length >= 2 ? arrowHead(points, width) : null
  const headP = prog(t, at + dur, 0.15)
  return (
    <g>
      {fill && p >= 1 ? <path d={path} fill={fill} stroke="none" /> : null}
      {dashed ? (
        <>
          <mask id={id} maskUnits="userSpaceOnUse">
            <path d={path} {...common} stroke="#fff" strokeWidth={width + 4} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} />
          </mask>
          <path d={path} {...common} strokeDasharray={dashed} mask={`url(#${id})`} />
        </>
      ) : (
        <path d={path} {...common} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} />
      )}
      {head && headP > 0 ? <path d={head} {...common} pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - headP} /> : null}
    </g>
  )
}

function arrowHead(points: readonly Point[], width: number): string | null {
  const a = points[points.length - 2]
  const b = points[points.length - 1]
  if (!a || !b) return null
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0])
  const len = 10 + width * 2.5
  const l: Point = [b[0] - len * Math.cos(ang - 0.45), b[1] - len * Math.sin(ang - 0.45)]
  const r: Point = [b[0] - len * Math.cos(ang + 0.45), b[1] - len * Math.sin(ang + 0.45)]
  return `M${l[0]} ${l[1]} L${b[0]} ${b[1]} L${r[0]} ${r[1]}`
}

/**
 * Texte tapé à cadence fixe (META.typingCps par défaut) à partir de `at`.
 * La partie non tapée garde sa place (invisible) : la mise en page ne bouge pas.
 */
export function TypeText({
  text,
  at,
  cps = META.typingCps,
  caret = true,
  style,
  className,
  testId,
}: {
  readonly text: string
  readonly at: number
  readonly cps?: number
  readonly caret?: boolean
  readonly style?: CSSProperties
  readonly className?: string
  readonly testId?: string
}) {
  const t = useT()
  const n = Math.max(0, Math.min(text.length, Math.floor((t - at) * cps)))
  const typing = t >= at && n < text.length
  return (
    <span className={className} style={style} data-testid={testId} aria-label={text}>
      <span aria-hidden="true">{text.slice(0, n)}</span>
      {caret && typing ? <span aria-hidden="true" style={{ borderRight: `0.08em solid ${THEME.colors.accent}`, marginRight: "-0.08em" }} /> : null}
      <span aria-hidden="true" style={{ visibility: "hidden" }}>
        {text.slice(n)}
      </span>
    </span>
  )
}

const HANDLE = 12

/** Poignées carrées bleues aux quatre coins d'une boîte (HTML). */
function Handles() {
  if (BIM) return <Grips size={HANDLE} offset={-HANDLE / 2 - 1} />
  const s: CSSProperties = { position: "absolute", width: HANDLE, height: HANDLE, background: THEME.colors.accent, border: `2px solid ${THEME.colors.panel}`, boxSizing: "border-box" }
  const o = -HANDLE / 2 - 1
  return (
    <>
      <span style={{ ...s, left: o, top: o }} />
      <span style={{ ...s, right: o, top: o }} />
      <span style={{ ...s, left: o, bottom: o }} />
      <span style={{ ...s, right: o, bottom: o }} />
    </>
  )
}

/**
 * Poignées (grips) de la signature bimaccess : quatre carrés pleins aux coins
 * de la boîte qui les contient (en `position: relative`), à `offset` px de
 * ses bords (négatif = à l'extérieur). Couleur `grip` par défaut.
 */
export function Grips({ size = 12, offset = -7, color = THEME.colors.grip }: { readonly size?: number; readonly offset?: number; readonly color?: string }) {
  const s: CSSProperties = { position: "absolute", width: size, height: size, background: color, pointerEvents: "none" }
  return (
    <>
      <span aria-hidden="true" style={{ ...s, left: offset, top: offset }} />
      <span aria-hidden="true" style={{ ...s, right: offset, top: offset }} />
      <span aria-hidden="true" style={{ ...s, left: offset, bottom: offset }} />
      <span aria-hidden="true" style={{ ...s, right: offset, bottom: offset }} />
    </>
  )
}

/**
 * Mise en évidence (HTML) : contour tireté et poignées carrées autour de
 * l'enfant quand `on` est vrai. Une seule à la fois : `on={focus === "cle"}`
 * avec `focus = focusAt(steps, t)`. Signature bimaccess : tireté et
 * poignées pleines couleur `grip` (« ce qui est sélectionné », DESIGN.md § 5).
 */
export function Highlight({ on, pad = 10, children, style, testId }: { readonly on: boolean; readonly pad?: number; readonly children: ReactNode; readonly style?: CSSProperties; readonly testId?: string }) {
  return (
    <div style={{ position: "relative", ...style }} data-testid={testId} data-highlight={on ? "on" : undefined}>
      {children}
      {on ? (
        <span aria-hidden="true" style={{ position: "absolute", inset: -pad, border: `2px dashed ${BIM ? THEME.colors.grip : THEME.colors.accent}`, pointerEvents: "none" }}>
          <Handles />
        </span>
      ) : null}
    </div>
  )
}

/** Mise en évidence dans un <svg> : rectangle tireté et poignées autour de (x, y, w, h). */
export function HighlightRect({ on, x, y, w, h, pad = 12 }: { readonly on: boolean; readonly x: number; readonly y: number; readonly w: number; readonly h: number; readonly pad?: number }) {
  if (!on) return null
  const X = x - pad
  const Y = y - pad
  const W = w + 2 * pad
  const H = h + 2 * pad
  const c = BIM ? THEME.colors.grip : THEME.colors.accent
  // Signature bimaccess : poignées pleines, sans liseré (DESIGN.md § 6, grip-button)
  const corner = (cx: number, cy: number) => (BIM ? <rect x={cx - HANDLE / 2} y={cy - HANDLE / 2} width={HANDLE} height={HANDLE} fill={c} /> : <rect x={cx - HANDLE / 2} y={cy - HANDLE / 2} width={HANDLE} height={HANDLE} fill={c} stroke={THEME.colors.panel} strokeWidth={2} />)
  return (
    <g data-highlight="on" aria-hidden="true">
      <rect x={X} y={Y} width={W} height={H} fill="none" stroke={c} strokeWidth={BIM ? 2 : 2.5} strokeDasharray={BIM ? "10 6" : "10 7"} />
      {corner(X, Y)}
      {corner(X + W, Y)}
      {corner(X, Y + H)}
      {corner(X + W, Y + H)}
    </g>
  )
}

export type Pose = { readonly x?: number; readonly y?: number; readonly scale?: number }

/** Mouvement géométrique (position, échelle) de `from` vers `to` entre `at` et `at + dur`. */
export function Move({ at, dur = 0.6, from, to, children, style }: { readonly at: number; readonly dur?: number; readonly from: Pose; readonly to: Pose; readonly children: ReactNode; readonly style?: CSSProperties }) {
  const t = useT()
  const p = ease(prog(t, at, dur))
  const lerp = (a = 0, b = 0) => a + (b - a) * p
  const x = lerp(from.x, to.x)
  const y = lerp(from.y, to.y)
  const s = lerp(from.scale ?? 1, to.scale ?? 1)
  return <div style={{ ...style, transform: `translate(${x}px, ${y}px) scale(${s})`, transformOrigin: "0 0" }}>{children}</div>
}
