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
 *
 * Signature carte : traits à bouts nets et angles vifs ; mise en évidence en
 * tireté `accent` (lecture) de 2,5 px, motif 10 6, sans poignée, sans fond,
 * à 10 px de l'élément : rectangle à angles vifs, ou cercle autour d'un
 * symbole ponctuel (`shape="circle"`, rayon = demi-diagonale + `pad`) ; avec
 * `at`, le tireté se trace en 0,25 s (rectangle depuis le coin haut gauche,
 * cercle depuis le haut).
 */
import { type CSSProperties, type ReactNode, useId } from "react"
import { useCurrentFrame, useVideoConfig } from "remotion"
import { META } from "../generated/meta"
import { THEME } from "../generated/theme"
import { BIM, CARTE } from "./signature"
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
  // Signatures bimaccess et carte : bouts nets et angles vifs, comme un trait de dessin technique ou de carte imprimée
  const sharp = BIM || CARTE
  const common = { fill: "none", stroke: color, strokeWidth: width, strokeLinecap: (sharp ? "butt" : "round") as "butt" | "round", strokeLinejoin: (sharp ? "miter" : "round") as "miter" | "round" }
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
      {caret && typing ? <span aria-hidden="true" style={{ borderRight: `0.08em solid ${CARTE ? THEME.colors.ink : THEME.colors.accent}`, marginRight: "-0.08em" }} /> : null}
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

/** Dessin de la mise en évidence de la signature carte : tireté `accent` 2,5 px, motif 10 6, bouts nets, angles vifs. */
const CARTE_HL = { stroke: THEME.colors.accent, width: 2.5, dash: "10 6", pad: 10, trace: 0.25 } as const

/**
 * Tireté de la mise en évidence carte (dans un <svg>), tracé à vitesse
 * constante de `at` à `at + 0,25 s` (sans `at` : entier dès son apparition).
 * `children` reçoit les attributs de trait et rend la forme (rect, circle,
 * path) ; la forme du masque est la même, en trait plein.
 */
function CarteDash({ at, children }: { readonly at?: number; readonly children: (stroke: Readonly<Record<string, string | number>>) => ReactNode }) {
  const t = useT()
  const id = safeId(useId())
  const p = at === undefined ? 1 : prog(t, at, CARTE_HL.trace)
  if (p <= 0) return null
  const base = { fill: "none", stroke: CARTE_HL.stroke, strokeWidth: CARTE_HL.width, strokeLinecap: "butt", strokeLinejoin: "miter" } as const
  if (p >= 1) return <>{children({ ...base, strokeDasharray: CARTE_HL.dash })}</>
  return (
    <>
      {/* Masque en grandes coordonnées : un cercle peut dépasser largement la boîte de l'élément */}
      <mask id={id} maskUnits="userSpaceOnUse" x={-4000} y={-4000} width={12000} height={12000}>
        {children({ ...base, stroke: "#fff", strokeWidth: CARTE_HL.width + 4, pathLength: 1, strokeDasharray: "1 1", strokeDashoffset: 1 - p })}
      </mask>
      <g mask={`url(#${id})`}>{children({ ...base, strokeDasharray: CARTE_HL.dash })}</g>
    </>
  )
}

/** Mise en évidence HTML de la signature carte : rectangle à `pad` px de l'élément, ou cercle de rayon demi-diagonale + `pad`. */
function CarteHighlightShape({ shape, pad, at }: { readonly shape: "rect" | "circle"; readonly pad: number; readonly at?: number }) {
  if (shape === "circle") {
    // r en % de la diagonale normalisée de la boîte (√((w² + h²) / 2)) : 70,711 % = demi-diagonale
    const circle: CSSProperties = { r: `calc(70.711% + ${pad}px)`, transform: "rotate(-90deg)", transformBox: "fill-box", transformOrigin: "center" } as CSSProperties
    return (
      <svg aria-hidden="true" focusable="false" width="100%" height="100%" style={{ position: "absolute", inset: 0, overflow: "visible", pointerEvents: "none" }}>
        <CarteDash at={at}>{(stroke) => <circle cx="50%" cy="50%" style={circle} {...stroke} />}</CarteDash>
      </svg>
    )
  }
  return (
    <svg aria-hidden="true" focusable="false" style={{ position: "absolute", left: -pad, top: -pad, width: `calc(100% + ${2 * pad}px)`, height: `calc(100% + ${2 * pad}px)`, overflow: "visible", pointerEvents: "none" }}>
      <CarteDash at={at}>{(stroke) => <rect x={0} y={0} width="100%" height="100%" {...stroke} />}</CarteDash>
    </svg>
  )
}

/**
 * Mise en évidence (HTML) : contour tireté et poignées carrées autour de
 * l'enfant quand `on` est vrai. Une seule à la fois : `on={focus === "cle"}`
 * avec `focus = focusAt(steps, t)`. Signature bimaccess : tireté et
 * poignées pleines couleur `grip` (« ce qui est sélectionné », DESIGN.md § 5).
 * Signature carte : tireté bleu sans poignée (`shape` rectangle ou cercle ;
 * `at` : début du tracé de 0,25 s, en général l'instant de l'étape de
 * `focusAt` qui l'allume) ; `shape` et `at` sont ignorés dans les autres
 * signatures.
 */
export function Highlight({ on, pad = 10, shape = "rect", at, children, style, testId }: { readonly on: boolean; readonly pad?: number; readonly shape?: "rect" | "circle"; readonly at?: number; readonly children: ReactNode; readonly style?: CSSProperties; readonly testId?: string }) {
  return (
    <div style={{ position: "relative", ...style }} data-testid={testId} data-highlight={on ? "on" : undefined}>
      {children}
      {on && CARTE ? <CarteHighlightShape shape={shape} pad={pad} at={at} /> : null}
      {on && !CARTE ? (
        <span aria-hidden="true" style={{ position: "absolute", inset: -pad, border: `2px dashed ${BIM ? THEME.colors.grip : THEME.colors.accent}`, pointerEvents: "none" }}>
          <Handles />
        </span>
      ) : null}
    </div>
  )
}

/**
 * Mise en évidence dans un <svg> : rectangle tireté et poignées autour de
 * (x, y, w, h). Signature carte : tireté bleu sans poignée, `pad` 10 par
 * défaut, tracé en 0,25 s à partir de `at` si donné (ignoré ailleurs).
 */
export function HighlightRect({ on, x, y, w, h, pad = CARTE ? CARTE_HL.pad : 12, at }: { readonly on: boolean; readonly x: number; readonly y: number; readonly w: number; readonly h: number; readonly pad?: number; readonly at?: number }) {
  if (!on) return null
  if (CARTE) {
    return (
      <g data-highlight="on" aria-hidden="true">
        <CarteDash at={at}>{(stroke) => <path d={rectPath(x - pad, y - pad, w + 2 * pad, h + 2 * pad)} {...stroke} />}</CarteDash>
      </g>
    )
  }
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
