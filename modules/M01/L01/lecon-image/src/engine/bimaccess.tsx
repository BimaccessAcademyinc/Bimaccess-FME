/**
 * Rendu des composants de scène dans la signature bimaccess (signature CAD 2D,
 * design-system DESIGN.md et components/*.html). components.tsx y délègue
 * quand META.signature vaut « bimaccess » ; mêmes props, mêmes data-testid,
 * mêmes data-role, même comportement : seule la présentation change.
 *
 *   SceneRoot    fond blanc et grille de points (THEME.grid, 24 px), icône
 *                SCU en bas à gauche, zone d'action en bas à droite
 *                (scene-frame.html) ;
 *   Title        Azeret Mono 200, MAJUSCULES, interlettrage -0,03 em ;
 *   Bullets      puce = accrochage « extrémité » or ;
 *   Diagram      cadres au trait de 3 px, libellés mono, accrochage or au
 *                départ puis à l'arrivée de chaque liaison pendant son tracé ;
 *   Callout      ligne de repère (leader.html) : point, oblique, palier, texte mono ;
 *   Captions     bandeau blanc à filet, centré, qui laisse libre la zone d'action ;
 *   ChoicePanel  choix selon quiz-choice.html (sélection = poignées bleues,
 *                réponse attendue = accrochage ■), rétroaction selon
 *                feedback-panel.html, VALIDER et CONTINUER selon
 *                action-button.html dans la zone d'action.
 *
 * Les styles à états (survol, actif, focus) sont des classes de
 * src/player/player-bimaccess.css (bim-btn, bim-choice, bim-feedback, bim-g),
 * en pixels de composition.
 */
import { type CSSProperties, type KeyboardEvent, type ReactNode, useContext, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useVideoConfig } from "remotion"
import { THEME } from "../generated/theme"
import { L } from "../i18n"
import { type Point, rectPath, Trace, TypeText, useT, Wipe, HighlightRect } from "./anim"
import { Osnap } from "./cad"
import { type ChoiceAction, type ChoiceState, type Exercise, select, validate, verdictOf } from "./exercise"
import { ActionZone, currentSentence, SceneClock, sentencesOf, tid } from "./shared"
import { typedUntil } from "./timeline"
import type { Voice } from "./types"

const C = THEME.colors
const F = THEME.fonts

/** Marge de la zone d'action (bas droite de la scène, scene-frame.html). */
export const ACTION_INSET = 48
/** Largeur maximale des sous-titres : la zone d'action (droite) reste libre. */
const CAPTION_MAX = 1180

/** Icône SCU (design-system/assets/icons/ucs.svg), discrète, en bas à gauche de la scène. */
function Ucs() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 70 70" width={56} height={56} style={{ position: "absolute", left: 28, bottom: 24 }}>
      <g stroke={C.muted} strokeWidth={1.4} fill="none">
        <polyline points="8,10 8,58 58,58" />
        <polyline points="3,18 8,8 13,18" />
        <polyline points="50,53 60,58 50,63" />
        <rect x={8} y={48} width={10} height={10} />
      </g>
      <g fill={C.muted} style={{ fontFamily: F.mono, fontSize: 11 }}>
        <text x={14} y={12}>
          Y
        </text>
        <text x={60} y={50}>
          X
        </text>
      </g>
    </svg>
  )
}

export function BimSceneRoot({ id, board, children, style }: { readonly id: string; readonly board: string; readonly children: ReactNode; readonly style?: CSSProperties }) {
  const [zone, setZone] = useState<HTMLDivElement | null>(null)
  const grid = Number(THEME.grid)
  return (
    <div
      data-board={board}
      data-testid={tid(id, "scene")}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        backgroundColor: C.background,
        // Espace objet : grille de points (DESIGN.md § 4)
        backgroundImage: grid > 0 ? `radial-gradient(${C.gridDot} 1px, transparent 1px)` : undefined,
        backgroundSize: grid > 0 ? `${grid}px ${grid}px` : undefined,
        color: C.ink,
        fontFamily: F.body,
        userSelect: "none",
        WebkitUserSelect: "none",
        ...style,
      }}
    >
      <Ucs />
      <ActionZone.Provider value={zone}>{children}</ActionZone.Provider>
      {/* Zone d'action : les boutons de la scène, en bas à droite, jamais au centre (DESIGN.md § 4) */}
      <div ref={setZone} data-zone="actions" style={{ position: "absolute", right: ACTION_INSET, bottom: ACTION_INSET, display: "flex", gap: 28, alignItems: "center", justifyContent: "flex-end" }} />
    </div>
  )
}

export function BimTitle({ text, at, size = 64, style, testId }: { readonly text: string; readonly at: number; readonly size?: number; readonly style?: CSSProperties; readonly testId?: string }) {
  // Titre display : Azeret Mono 200, MAJUSCULES (DESIGN.md § 3) ; le texte du storyboard garde sa casse
  return (
    <h1 style={{ margin: 0, fontFamily: F.display, fontSize: size, lineHeight: 1.02, fontWeight: 200, letterSpacing: "-0.03em", textTransform: "uppercase", color: C.ink, ...style }}>
      <TypeText text={text} at={at} testId={testId} />
    </h1>
  )
}

export function BimBullets({ items, size = 44, gap = 30, style, testIdPrefix }: { readonly items: readonly { readonly text: string; readonly at: number }[]; readonly size?: number; readonly gap?: number; readonly style?: CSSProperties; readonly testIdPrefix?: string }) {
  const mark = Math.round(size * 0.4)
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap, ...style }}>
      {items.map((item, i) => (
        <li key={`${i}-${item.text}`}>
          <Wipe at={item.at} dur={0.45} testId={testIdPrefix ? `${testIdPrefix}-${i + 1}` : undefined}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: size * 0.5, fontSize: size, lineHeight: 1.2, fontWeight: 500 }}>
              {/* Puce = accrochage « extrémité », or (DESIGN.md § 2 et § 6) */}
              <Osnap kind="endpoint" size={mark} color={C.accent2} style={{ marginTop: (size * 1.2 - mark) / 2 }} />
              <span>{item.text}</span>
            </div>
          </Wipe>
        </li>
      ))}
    </ul>
  )
}

type Node = { readonly id: string; readonly x: number; readonly y: number; readonly w: number; readonly h: number; readonly label: string; readonly at: number; readonly color?: string }
type Link = { readonly id: string; readonly points: readonly Point[]; readonly at: number; readonly dur?: number; readonly color?: string; readonly arrow?: boolean; readonly dashed?: string; readonly width?: number }

export function BimDiagram({ width, height, nodes, links, focus, style, testIdPrefix, children }: { readonly width: number; readonly height: number; readonly nodes: readonly Node[]; readonly links: readonly Link[]; readonly focus: string | null; readonly style?: CSSProperties; readonly testIdPrefix?: string; readonly children?: ReactNode }) {
  const t = useT()
  const focused = nodes.find((n) => n.id === focus)
  return (
    <div style={{ position: "relative", width, height, ...style }} data-focus={focus ?? ""}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden="true">
        {children}
        {links.map((l) => (
          <Trace key={l.id} points={l.points} at={l.at} dur={l.dur ?? 0.7} color={l.color ?? C.ink} arrow={l.arrow ?? true} dashed={l.dashed} width={l.width ?? 3} />
        ))}
        {nodes.map((n) => (
          <Trace key={n.id} d={rectPath(n.x, n.y, n.w, n.h)} at={n.at} dur={0.5} color={n.color ?? C.ink} width={3} fill={C.background} />
        ))}
        {/* Accrochage (DESIGN.md § 9) : marqueur or au point de départ pendant le tracé, puis au point d'arrivée */}
        {links.map((l) => {
          const dur = l.dur ?? 0.7
          const first = l.points[0]
          const last = l.points[l.points.length - 1]
          const p = t >= l.at && t < l.at + dur ? first : t >= l.at + dur && t < l.at + dur + 0.4 ? last : undefined
          return p ? <Osnap key={`${l.id}-osnap`} cx={p[0]} cy={p[1]} size={22} /> : null
        })}
        {focused ? <HighlightRect on x={focused.x} y={focused.y} w={focused.w} h={focused.h} /> : null}
      </svg>
      {nodes.map((n) => (
        <Wipe
          key={n.id}
          at={n.at + 0.35}
          dur={0.4}
          testId={testIdPrefix ? `${testIdPrefix}-${n.id}` : undefined}
          style={{ position: "absolute", left: n.x, top: n.y, width: n.w, height: n.h, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 12, boxSizing: "border-box", fontFamily: F.mono, fontSize: 32, fontWeight: 400, letterSpacing: "0.04em", textTransform: "uppercase", lineHeight: 1.15 }}
        >
          {n.label}
        </Wipe>
      ))}
    </div>
  )
}

/** Ligne de repère (leader.html) : point de 4 px sur l'objet, segment oblique, palier horizontal, texte mono. */
export function BimCallout({ anchor, label, text, at, width = 420, color, size = 32, testId }: { readonly anchor: Point; readonly label: Point; readonly text: string; readonly at: number; readonly width?: number; readonly color?: string; readonly size?: number; readonly testId?: string }) {
  const { width: W, height: H } = useVideoConfig()
  const t = useT()
  const dur = 0.5
  const ink = color ?? C.ink
  const y = label[1] + size * 0.62
  const knee: Point = [label[0] - 52, y]
  const end: Point = [label[0] - 12, y]
  return (
    <>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
        {t >= at ? <circle cx={anchor[0]} cy={anchor[1]} r={6} fill={ink} /> : null}
        <Trace points={[anchor, knee, end]} at={at} dur={dur} color={ink} width={2} />
      </svg>
      <Wipe at={at + dur} dur={0.4} testId={testId} style={{ position: "absolute", left: label[0], top: label[1], width, fontFamily: F.mono, fontSize: size, lineHeight: 1.25, fontWeight: 400, color: ink }}>
        {text}
      </Wipe>
    </>
  )
}

/** Sous-titres sobres : bandeau blanc à filet, Plex, mots à venir en ink-3, sans coin arrondi. */
export function BimCaptions({ voices, size = 34 }: { readonly voices: readonly Voice[]; readonly size?: number }) {
  const t = useT()
  const words = voices.flatMap((v) => v.words).sort((a, b) => a.start - b.start)
  const current = currentSentence(sentencesOf(words), t)
  if (!current) return null
  return (
    <div
      data-testid="captions"
      style={{ position: "absolute", left: 0, right: 0, bottom: 40, marginInline: "auto", width: "fit-content", maxWidth: CAPTION_MAX, boxSizing: "border-box", padding: "12px 28px 14px", background: C.background, border: `1.5px solid ${C.line}`, borderTop: `3px solid ${C.ink}`, color: C.ink, fontFamily: F.body, fontSize: size, lineHeight: 1.35, textAlign: "center", pointerEvents: "none" }}
    >
      {current.words.map((w, i) => (
        <span key={`${i}-${w.start}`} style={{ color: t >= w.start ? C.ink : C.muted }}>
          {i > 0 ? " " : ""}
          {w.text}
        </span>
      ))}
    </div>
  )
}

/** Retour (↵) des boutons qui font avancer, dessiné : le glyphe n'est pas dans les polices embarquées. */
function ReturnIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 16 16" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={1.6}>
      <path d="M13 3v6.5H4" />
      <path d="M7 6.5l-3 3 3 3" />
    </svg>
  )
}

/** Poignées d'un bouton ou d'un choix (classes bim-g de player-bimaccess.css : couleurs selon l'état). */
function BtnGrips() {
  return (
    <>
      <span aria-hidden="true" className="bim-g tl" />
      <span aria-hidden="true" className="bim-g tr" />
      <span aria-hidden="true" className="bim-g bl" />
      <span aria-hidden="true" className="bim-g br" />
    </>
  )
}

export type ChoicePanelProps = {
  readonly sceneId: string
  readonly exercise: Exercise
  readonly state: ChoiceState
  readonly send: (action: ChoiceAction) => void
  readonly at: number
  readonly actedAt: number | null
  readonly continueAt?: number | null
  readonly onContinue?: () => void
  readonly verdict?: boolean
  readonly width?: number
  readonly style?: CSSProperties
}

export function BimChoicePanel({ sceneId, exercise, state, send, at, actedAt, continueAt, onContinue, verdict = false, width = 1180, style }: ChoicePanelProps) {
  const t = useT()
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const lock = useRef(false)
  const zone = useContext(ActionZone)
  const keys = exercise.choices.map((c) => c.key)
  const { narrationEnd } = useContext(SceneClock)
  // Choix et VALIDER arrivent ensemble, à la fin de la frappe de la question
  const choicesAt = typedUntil(exercise.question, at) + 0.2
  const shown = t >= choicesAt
  const v = verdictOf(exercise, state, verdict)
  const chosen = exercise.choices.find((c) => c.key === state.selected)
  const feedbackAt = actedAt ?? Number.POSITIVE_INFINITY
  const contAt = Math.max(continueAt ?? feedbackAt, narrationEnd)
  const canContinue = state.validated && onContinue !== undefined && t >= contAt
  // Rétroaction (feedback-panel.html) : réponse attendue = vert, à revoir = or (jamais rouge), sans verdict = information
  const tone = v === "expected" ? "right" : v === "other" ? "review" : "info"

  const pick = (key: string) => {
    if (state.validated) return
    send(select(key))
    refs.current[key]?.focus()
  }
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (state.validated) return
    const i = state.selected ? keys.indexOf(state.selected) : -1
    let target: string | undefined
    if (e.key === "ArrowDown" || e.key === "ArrowRight") target = keys[(i + 1) % keys.length]
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") target = keys[(i - 1 + keys.length) % keys.length]
    else if (keys.includes(e.key.toLowerCase())) target = e.key.toLowerCase()
    if (target) {
      e.preventDefault()
      e.stopPropagation()
      pick(target)
    }
  }
  const onValidate = () => {
    // Garde contre le double-clic : une seule validation par rendu
    if (lock.current || state.validated || state.selected === null) return
    lock.current = true
    send(validate())
    queueMicrotask(() => {
      lock.current = false
    })
  }

  const actions = (
    <>
      {state.validated ? null : (
        <Wipe at={choicesAt} dur={0.4}>
          <button type="button" className="bim-btn is-primary" data-role="validate" data-testid={tid(sceneId, "validate")} disabled={!shown || state.selected === null} onClick={onValidate}>
            {L.submit}
            <BtnGrips />
          </button>
        </Wipe>
      )}
      {canContinue ? (
        <Wipe at={contAt} dur={0.4}>
          <button type="button" className="bim-btn" data-role="continue" data-testid={tid(sceneId, "continue")} onClick={onContinue}>
            {L.continue}
            <ReturnIcon />
            <BtnGrips />
          </button>
        </Wipe>
      ) : null}
    </>
  )

  return (
    <div style={{ width, display: "flex", flexDirection: "column", gap: 26, ...style }} data-testid={tid(sceneId, "exercise")} data-validated={state.validated ? "true" : "false"}>
      <div style={{ fontFamily: F.body, fontSize: 40, fontWeight: 600, lineHeight: 1.25 }}>
        <TypeText text={exercise.question} at={at} testId={tid(sceneId, "question")} />
      </div>
      <Wipe at={choicesAt} dur={0.5} dir="down">
        <div role="radiogroup" aria-label={exercise.question} onKeyDown={onKey} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {exercise.choices.map((c, i) => {
            const selected = state.selected === c.key
            const dim = state.validated && !selected
            const focusable = selected || (state.selected === null && i === 0)
            const expected = v !== null && c.key === exercise.expected
            return (
              <div key={c.key} data-selected={selected ? "true" : undefined}>
                <button
                  ref={(el) => {
                    refs.current[c.key] = el
                  }}
                  type="button"
                  role="radio"
                  aria-checked={selected}
                  data-role="choice"
                  data-key={c.key}
                  data-testid={tid(sceneId, `choice-${c.key}`)}
                  disabled={!shown || state.validated}
                  tabIndex={focusable ? 0 : -1}
                  onClick={() => pick(c.key)}
                  className={`bim-choice${selected ? " is-selected" : ""}${dim ? " is-dimmed" : ""}`}
                  style={{ cursor: state.validated ? "default" : "pointer" }}
                >
                  <span className="bim-choice-key">{c.key.toUpperCase()}</span>
                  <span className="bim-choice-txt">
                    {c.label}
                    {state.validated && selected ? <span className="bim-sr"> · {L.yourChoice}</span> : null}
                  </span>
                  <span className="bim-choice-mark">
                    {/* Réponse attendue (verdict demandé) : accrochage « extrémité » (quiz-choice.html) */}
                    {expected ? (
                      <>
                        <Osnap kind="endpoint" size={28} />
                        <span className="bim-sr">{L.expected}</span>
                      </>
                    ) : null}
                  </span>
                  <BtnGrips />
                </button>
              </div>
            )
          })}
        </div>
      </Wipe>
      {zone ? createPortal(actions, zone) : <div style={{ display: "flex", gap: 28, alignItems: "flex-start", paddingTop: 8 }}>{actions}</div>}
      {state.validated && chosen && t >= feedbackAt ? (
        <Wipe at={feedbackAt} dur={0.5} dir="down" testId={tid(sceneId, "feedback")}>
          <div role="status" data-role="feedback" data-verdict={v ?? "none"} className={`bim-feedback is-${tone}`}>
            <div className="bim-feedback-head">
              {tone === "right" ? <Osnap kind="endpoint" size={22} /> : null}
              {v === "expected" ? L.verdictExpected : v === "other" ? L.verdictOther : L.consequence}
            </div>
            <div className="bim-feedback-body">{chosen.feedback}</div>
          </div>
        </Wipe>
      ) : null}
    </div>
  )
}
