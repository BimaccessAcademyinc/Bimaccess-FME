/**
 * Rendu des composants de scène dans la signature carte (« carte
 * topographique » : la scène se lit comme une feuille de carte imprimée).
 * components.tsx y délègue quand META.signature vaut « carte » ; mêmes props,
 * mêmes data-testid, mêmes data-role, même comportement : seule la
 * présentation change.
 *
 *   SceneRoot    fond `background`, feuille dès l'image 0 et jamais animée :
 *                cadre extérieur 2 px, bordure graduée en damier (12 px, cases
 *                de 76 px), filets à 46 (1,2 px) et 58 (0,8 px), carroyage
 *                (croix de 16 px tous les 228 px depuis x 274, y 236) ; aucune
 *                grille de points, aucune icône SCU ; zone d'action
 *                x 1454, y 834, 360 × 140 ;
 *   Title        serif 600, 66 px, -0,01 em, filet double de 300 px dessous ;
 *   Bullets      serif 400, puce = petit aplat carré d'encre ;
 *   Diagram      feuilles : bordure 2 px sur `panel`, contour 1 px décalé de
 *                3 px ; libellés en capitales espacées ; liaisons d'encre
 *                2,5 px à bouts nets ; mise en évidence tiretée bleue ;
 *   Callout      ligne de repère : point, oblique, palier (encre 1,5 px), mot tapé ;
 *   Captions     bandeau `panel`, filet 2 px dessus et 0,8 px dessous, serif
 *                34 px, x 104, bas à y 1000, 1 180 px de large au plus ;
 *   ChoicePanel  panneau cartouche (bordure 2 px, contour 0,8 px décalé de
 *                4 px), choix à lettre en capitales, sélection = bord plein
 *                bleu 3 px et fond `selectBg` (jamais de tireté ni de
 *                data-highlight), rétroaction en rubrique sous un filet double,
 *                sans couleur de verdict ; VALIDER et CONTINUER en cartouche
 *                dans la zone d'action.
 *
 * Couleurs : les clés communes du thème, que scripts/sync.mjs dérive des
 * jetons de la charte (background = fond, panel = papier, ink = encre,
 * ink2 = encre2, line = carroyage, accent = lecture, panel2 = survol,
 * selectBg = lectureFond, lineSoft = verrouTrait) : ce fichier compile dans
 * toutes les signatures. Les styles à états (survol, actif, focus) sont des
 * classes de src/player/player-carte.css (carte-btn, carte-panel,
 * carte-choice, carte-feedback, carte-sr), en pixels de composition.
 */
import { type CSSProperties, type KeyboardEvent, type ReactNode, useContext, useRef, useState } from "react"
import { createPortal } from "react-dom"
import { useVideoConfig } from "remotion"
import { THEME } from "../generated/theme"
import { L } from "../i18n"
import { HighlightRect, type Point, rectPath, Trace, TypeText, useT, Wipe } from "./anim"
import type { ChoicePanelProps } from "./bimaccess"
import { select, validate, verdictOf } from "./exercise"
import { ActionZone, currentSentence, SceneClock, sentencesOf, tid } from "./shared"
import { typedUntil } from "./timeline"
import type { Voice } from "./types"

const C = THEME.colors
/** Serif (Source Serif 4) : titres, texte, choix, sous-titres. */
const SERIF = THEME.fonts.body
/** Capitales (Barlow Condensed) : noms posés sur la face, en-têtes, boutons. */
const CAPS = THEME.fonts.mono

/** Feuille : géométrie de la charte, en pixels de composition (1920 × 1080 ; les bords suivent une autre taille). */
const SHEET = { outer: 34, band: 12, step: 76, rule1: 46, rule2: 58, gridX: 274, gridY: 236, gridStep: 228, arm: 8 } as const
/** Zone d'action : x 1454, y 834, 360 × 140 en 1920 × 1080, soit 106 px du bord droit et du bord bas. */
export const CARTE_ACTION = { right: 106, bottom: 106, width: 360, height: 140, gap: 16 } as const
/** Sous-titres : x 104, bas à y 1000, 1 180 px de large au plus. */
const CAPTIONS = { left: 104, bottom: 80, max: 1180 } as const

/** Habillage de la feuille (cadre, bordure graduée, triple filet, carroyage), présent dès l'image 0, jamais animé. */
function Sheet() {
  const { width: W, height: H } = useVideoConfig()
  const { outer: o, band: b, step: s, rule1, rule2, arm } = SHEET
  const inner = o + b
  const cells: string[] = []
  // Cases paires pleines, sur les quatre côtés, à partir du coin intérieur ; la dernière s'arrête au filet
  for (let x = inner; x < W - inner; x += 2 * s) {
    const w = Math.min(s, W - inner - x)
    cells.push(`M${x} ${o}h${w}v${b}h${-w}Z`, `M${x} ${H - inner}h${w}v${b}h${-w}Z`)
  }
  for (let y = inner; y < H - inner; y += 2 * s) {
    const h = Math.min(s, H - inner - y)
    cells.push(`M${o} ${y}h${b}v${h}h${-b}Z`, `M${W - inner} ${y}h${b}v${h}h${-b}Z`)
  }
  const crosses: string[] = []
  for (let x = SHEET.gridX; x + arm <= W - rule2; x += SHEET.gridStep) {
    for (let y = SHEET.gridY; y + arm <= H - rule2; y += SHEET.gridStep) crosses.push(`M${x - arm} ${y}h${2 * arm}M${x} ${y - arm}v${2 * arm}`)
  }
  return (
    <svg aria-hidden="true" focusable="false" data-sheet="carte" width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
      <path d={crosses.join("")} fill="none" stroke={C.line} strokeWidth={1.2} />
      <rect x={o} y={o} width={W - 2 * o} height={H - 2 * o} fill="none" stroke={C.ink} strokeWidth={2} />
      <path d={cells.join("")} fill={C.ink} />
      <rect x={rule1} y={rule1} width={W - 2 * rule1} height={H - 2 * rule1} fill="none" stroke={C.ink} strokeWidth={1.2} />
      <rect x={rule2} y={rule2} width={W - 2 * rule2} height={H - 2 * rule2} fill="none" stroke={C.ink} strokeWidth={0.8} />
    </svg>
  )
}

export function CarteSceneRoot({ id, board, children, style }: { readonly id: string; readonly board: string; readonly children: ReactNode; readonly style?: CSSProperties }) {
  const [zone, setZone] = useState<HTMLDivElement | null>(null)
  return (
    <div
      data-board={board}
      data-testid={tid(id, "scene")}
      style={{ position: "absolute", inset: 0, overflow: "hidden", background: C.background, color: C.ink, fontFamily: SERIF, userSelect: "none", WebkitUserSelect: "none", ...style }}
    >
      <Sheet />
      <ActionZone.Provider value={zone}>{children}</ActionZone.Provider>
      {/* Zone d'action : VALIDER puis CONTINUER, alignés à droite, jamais sous le panneau ni au centre de la face */}
      <div
        ref={setZone}
        data-zone="actions"
        style={{ position: "absolute", right: CARTE_ACTION.right, bottom: CARTE_ACTION.bottom, width: CARTE_ACTION.width, height: CARTE_ACTION.height, display: "flex", gap: CARTE_ACTION.gap, alignItems: "center", justifyContent: "flex-end" }}
      />
    </div>
  )
}

export function CarteTitle({ text, at, size = 66, style, testId }: { readonly text: string; readonly at: number; readonly size?: number; readonly style?: CSSProperties; readonly testId?: string }) {
  // Titre de scène : serif 600, puis filet double de 300 px (2 px, 3 px d'écart, 0,8 px), tracé avec la frappe
  return (
    <h1 style={{ margin: 0, fontFamily: SERIF, fontSize: size, lineHeight: 1, fontWeight: 600, letterSpacing: "-0.01em", color: C.ink, ...style }}>
      <TypeText text={text} at={at} testId={testId} />
      <span aria-hidden="true" style={{ display: "block", marginTop: Math.round(size * 0.26) }}>
        <svg width={300} height={6} viewBox="0 0 300 6" style={{ display: "block", overflow: "visible" }}>
          <Trace points={[[0, 1], [300, 1]]} at={at} dur={0.25} color={C.ink} width={2} />
          <Trace points={[[0, 5.4], [300, 5.4]]} at={at} dur={0.25} color={C.ink} width={0.8} />
        </svg>
      </span>
    </h1>
  )
}

export function CarteBullets({ items, size = 30, gap = 22, style, testIdPrefix }: { readonly items: readonly { readonly text: string; readonly at: number }[]; readonly size?: number; readonly gap?: number; readonly style?: CSSProperties; readonly testIdPrefix?: string }) {
  const mark = Math.max(8, Math.round(size * 0.3))
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap, ...style }}>
      {items.map((item, i) => (
        <li key={`${i}-${item.text}`}>
          <Wipe at={item.at} dur={0.45} testId={testIdPrefix ? `${testIdPrefix}-${i + 1}` : undefined}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: size * 0.6, fontFamily: SERIF, fontSize: size, lineHeight: 1.3, fontWeight: 400 }}>
              {/* Puce : aplat carré d'encre (aucune couleur : une couleur = une fonction) */}
              <span aria-hidden="true" style={{ flex: "none", width: mark, height: mark, marginTop: (size * 1.3 - mark) / 2, background: C.ink }} />
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

export function CarteDiagram({ width, height, nodes, links, focus, style, testIdPrefix, children }: { readonly width: number; readonly height: number; readonly nodes: readonly Node[]; readonly links: readonly Link[]; readonly focus: string | null; readonly style?: CSSProperties; readonly testIdPrefix?: string; readonly children?: ReactNode }) {
  const focused = nodes.find((n) => n.id === focus)
  const off = 3
  return (
    <div style={{ position: "relative", width, height, ...style }} data-focus={focus ?? ""}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden="true">
        {children}
        {links.map((l) => (
          <Trace key={l.id} points={l.points} at={l.at} dur={l.dur ?? 0.7} color={l.color ?? C.ink} arrow={l.arrow ?? true} dashed={l.dashed} width={l.width ?? 2.5} />
        ))}
        {/* Feuille : bordure 2 px sur papier, contour 1 px décalé de 3 px, tracés ensemble */}
        {nodes.map((n) => (
          <g key={n.id}>
            <Trace d={rectPath(n.x - off, n.y - off, n.w + 2 * off, n.h + 2 * off)} at={n.at} dur={0.5} color={n.color ?? C.ink} width={1} />
            <Trace d={rectPath(n.x, n.y, n.w, n.h)} at={n.at} dur={0.5} color={n.color ?? C.ink} width={2} fill={C.panel} />
          </g>
        ))}
        {focused ? <HighlightRect on x={focused.x - off} y={focused.y - off} w={focused.w + 2 * off} h={focused.h + 2 * off} /> : null}
      </svg>
      {nodes.map((n) => (
        <Wipe
          key={n.id}
          at={n.at + 0.35}
          dur={0.4}
          testId={testIdPrefix ? `${testIdPrefix}-${n.id}` : undefined}
          // Capitales espacées (nom de lieu petit) ; le padding gauche compense l'interlettrage de la dernière lettre
          style={{ position: "absolute", left: n.x, top: n.y, width: n.w, height: n.h, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "12px 12px 12px calc(12px + 0.24em)", boxSizing: "border-box", fontFamily: CAPS, fontSize: 26, fontWeight: 600, letterSpacing: "0.24em", textTransform: "uppercase", lineHeight: 1.15, color: C.ink }}
        >
          {n.label}
        </Wipe>
      ))}
    </div>
  )
}

/** Ligne de repère : point de 4 px, oblique, palier (encre 1,5 px), puis le mot se tape. Elle relie un mot à un mot. */
export function CarteCallout({ anchor, label, text, at, width = 420, color, size = 30, testId }: { readonly anchor: Point; readonly label: Point; readonly text: string; readonly at: number; readonly width?: number; readonly color?: string; readonly size?: number; readonly testId?: string }) {
  const { width: W, height: H } = useVideoConfig()
  const t = useT()
  const dur = 0.5
  const ink = color ?? C.ink
  const y = label[1] + size * 0.62
  const knee: Point = [label[0] - 40, y]
  const end: Point = [label[0] - 10, y]
  return (
    <>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
        {t >= at ? <circle cx={anchor[0]} cy={anchor[1]} r={4} fill={ink} /> : null}
        <Trace points={[anchor, knee, end]} at={at} dur={dur} color={ink} width={1.5} />
      </svg>
      <div data-testid={testId} style={{ position: "absolute", left: label[0], top: label[1], width, fontFamily: SERIF, fontSize: size, lineHeight: 1.25, fontWeight: 400, color: ink }}>
        <TypeText text={text} at={at + dur} />
      </div>
    </>
  )
}

/** Sous-titres : bandeau papier à filets (2 px dessus, 0,8 px dessous), serif 34 px, mots à venir en encre-2. */
export function CarteCaptions({ voices, size = 34 }: { readonly voices: readonly Voice[]; readonly size?: number }) {
  const t = useT()
  const words = voices.flatMap((v) => v.words).sort((a, b) => a.start - b.start)
  const current = currentSentence(sentencesOf(words), t)
  if (!current) return null
  return (
    <div
      data-testid="captions"
      style={{ position: "absolute", left: CAPTIONS.left, bottom: CAPTIONS.bottom, width: "fit-content", maxWidth: CAPTIONS.max, boxSizing: "border-box", padding: "12px 24px 14px", background: C.panel, borderTop: `2px solid ${C.ink}`, borderBottom: `0.8px solid ${C.ink}`, color: C.ink, fontFamily: SERIF, fontWeight: 400, fontSize: size, lineHeight: 1.3, textAlign: "left", pointerEvents: "none" }}
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

export function CarteChoicePanel({ sceneId, exercise, state, send, at, actedAt, continueAt, onContinue, verdict = false, width = 1180, style }: ChoicePanelProps) {
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
          <button type="button" className="carte-btn" data-role="validate" data-testid={tid(sceneId, "validate")} disabled={!shown || state.selected === null} onClick={onValidate}>
            {L.submit}
          </button>
        </Wipe>
      )}
      {canContinue ? (
        <Wipe at={contAt} dur={0.4}>
          <button type="button" className="carte-btn" data-role="continue" data-testid={tid(sceneId, "continue")} onClick={onContinue}>
            {L.continue}
          </button>
        </Wipe>
      ) : null}
    </>
  )

  return (
    <div style={{ width, ...style }} data-testid={tid(sceneId, "exercise")} data-validated={state.validated ? "true" : "false"}>
      {/* Le panneau se déroule avec la question : aucun cadre vide avant elle */}
      <Wipe at={at} dur={0.4} dir="down" className="carte-panel">
        <div className="carte-panel-question">
          <TypeText text={exercise.question} at={at} testId={tid(sceneId, "question")} />
        </div>
        <Wipe at={choicesAt} dur={0.5} dir="down">
          <div role="radiogroup" aria-label={exercise.question} onKeyDown={onKey} className="carte-choices">
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
                    className={`carte-choice${selected ? " is-selected" : ""}${dim ? " is-dimmed" : ""}`}
                    style={{ cursor: state.validated ? "default" : "pointer" }}
                  >
                    <span className="carte-choice-key">{c.key}</span>
                    <span className="carte-choice-txt">
                      {c.label}
                      {state.validated && selected ? <span className="carte-sr"> · {L.yourChoice}</span> : null}
                    </span>
                    {/* Réponse attendue (verdict demandé) : libellé en capitales, sans couleur ni icône */}
                    {expected ? <span className="carte-choice-mark">{L.expected}</span> : null}
                  </button>
                </div>
              )
            })}
          </div>
        </Wipe>
        {state.validated && chosen && t >= feedbackAt ? (
          <Wipe at={feedbackAt} dur={0.5} dir="down" testId={tid(sceneId, "feedback")}>
            {/* Conséquence écrite comme une rubrique de la feuille : encre sur papier, aucune couleur de verdict */}
            <div role="status" data-role="feedback" data-verdict={v ?? "none"} className="carte-feedback">
              <div className="carte-feedback-head">{v === "expected" ? L.verdictExpected : v === "other" ? L.verdictOther : L.consequence}</div>
              <div className="carte-feedback-body">{chosen.feedback}</div>
            </div>
          </Wipe>
        ) : null}
      </Wipe>
      {zone ? createPortal(actions, zone) : <div style={{ display: "flex", gap: CARTE_ACTION.gap, alignItems: "flex-start", paddingTop: 24 }}>{actions}</div>}
    </div>
  )
}
