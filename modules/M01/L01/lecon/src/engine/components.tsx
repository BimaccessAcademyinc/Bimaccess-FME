/**
 * Composants de scène prêts à l'emploi. Ils ne contiennent aucun texte de
 * contenu : les textes arrivent en props, lus par sceneTexts() / exerciseOf()
 * dans le storyboard. Les libellés d'interface (VALIDER, CONTINUER) viennent
 * de src/i18n.ts.
 *
 * Coordonnées en pixels de la composition (META.width × META.height, 1920 ×
 * 1080 par défaut) : le lecteur met la scène à l'échelle de la fenêtre.
 *
 * Signature (studio.config.json « signature ») : avec « bimaccess », SceneRoot,
 * Title, Bullets, Diagram, Callout, Captions et ChoicePanel délèguent à
 * bimaccess.tsx (signature CAD 2D) ; mêmes props, mêmes attributs de test,
 * même comportement. Le code ci-dessous est le rendu de la signature neutre.
 */
import { type CSSProperties, type KeyboardEvent, type ReactNode, useContext, useId, useLayoutEffect, useRef } from "react"
import { useVideoConfig } from "remotion"
import { THEME } from "../generated/theme"
import { L } from "../i18n"
import { HighlightRect, type Point, rectPath, Trace, TypeText, useT, Wipe, type WipeDir, wipeProgress } from "./anim"
import { BimBullets, BimCallout, BimCaptions, BimChoicePanel, BimDiagram, BimSceneRoot, BimTitle, type ChoicePanelProps } from "./bimaccess"
import { select, validate, verdictOf } from "./exercise"
import { currentSentence, SceneClock, sentencesOf, tid } from "./shared"
import { BIM } from "./signature"
import { asset, type Illustration, svgIds, TextError } from "./texts"
import { typedUntil } from "./timeline"
import type { Voice } from "./types"

export { ActionZone, SceneClock, tid } from "./shared"

const C = THEME.colors
const F = THEME.fonts

/**
 * Racine d'une scène : plein cadre, fond du thème, texte non sélectionnable
 * (un double-clic ne doit rien surligner), `data-board` = état affiché.
 * Signature bimaccess : grille de points, icône SCU, zone d'action en bas à droite.
 */
export function SceneRoot({ id, board, children, style }: { readonly id: string; readonly board: string; readonly children: ReactNode; readonly style?: CSSProperties }) {
  if (BIM) return <BimSceneRoot id={id} board={board} style={style}>{children}</BimSceneRoot>
  return (
    <div
      data-board={board}
      data-testid={tid(id, "scene")}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "hidden",
        background: C.background,
        color: C.ink,
        fontFamily: F.body,
        userSelect: "none",
        WebkitUserSelect: "none",
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/** Titre tapé à cadence fixe. Signature bimaccess : display Azeret Mono 200 en MAJUSCULES. */
export function Title({ text, at, size = 64, style, testId }: { readonly text: string; readonly at: number; readonly size?: number; readonly style?: CSSProperties; readonly testId?: string }) {
  if (BIM) return <BimTitle text={text} at={at} size={size} style={style} testId={testId} />
  return (
    <h1 style={{ margin: 0, fontFamily: F.display, fontSize: size, lineHeight: 1.15, fontWeight: 700, letterSpacing: "-0.01em", color: C.ink, ...style }}>
      <TypeText text={text} at={at} testId={testId} />
    </h1>
  )
}

export type BulletItem = { readonly text: string; readonly at: number }

/** Liste dont chaque puce se balaie sur son instant (celui de la phrase qui la dit). Signature bimaccess : puce = accrochage or. */
export function Bullets({ items, size = 44, gap = 30, style, testIdPrefix }: { readonly items: readonly BulletItem[]; readonly size?: number; readonly gap?: number; readonly style?: CSSProperties; readonly testIdPrefix?: string }) {
  if (BIM) return <BimBullets items={items} size={size} gap={gap} style={style} testIdPrefix={testIdPrefix} />
  return (
    <ul style={{ listStyle: "none", margin: 0, padding: 0, display: "flex", flexDirection: "column", gap, ...style }}>
      {items.map((item, i) => (
        <li key={`${i}-${item.text}`}>
          <Wipe at={item.at} dur={0.45} testId={testIdPrefix ? `${testIdPrefix}-${i + 1}` : undefined}>
            <div style={{ display: "flex", alignItems: "flex-start", gap: size * 0.5, fontSize: size, lineHeight: 1.2, fontWeight: 600 }}>
              <span aria-hidden="true" style={{ flex: "none", width: size * 0.36, height: size * 0.36, marginTop: size * 0.42, background: C.accent2 }} />
              <span>{item.text}</span>
            </div>
          </Wipe>
        </li>
      ))}
    </ul>
  )
}

export type DiagramNode = {
  readonly id: string
  readonly x: number
  readonly y: number
  readonly w: number
  readonly h: number
  readonly label: string
  /** Début du tracé du cadre ; le libellé se balaie juste après. */
  readonly at: number
  readonly color?: string
}

export type DiagramLink = {
  readonly id: string
  readonly points: readonly Point[]
  readonly at: number
  readonly dur?: number
  readonly color?: string
  readonly arrow?: boolean
  readonly dashed?: string
  readonly width?: number
}

/**
 * Schéma : cadres et liaisons tracés chacun sur son instant, libellés balayés,
 * mise en évidence unique (`focus` = id d'un nœud, ou null).
 */
export function Diagram({
  width,
  height,
  nodes,
  links,
  focus,
  style,
  testIdPrefix,
  children,
}: {
  readonly width: number
  readonly height: number
  readonly nodes: readonly DiagramNode[]
  readonly links: readonly DiagramLink[]
  readonly focus: string | null
  readonly style?: CSSProperties
  readonly testIdPrefix?: string
  /** Éléments SVG supplémentaires (zones, séparations), dessinés sous les nœuds. */
  readonly children?: ReactNode
}) {
  if (BIM) return <BimDiagram width={width} height={height} nodes={nodes} links={links} focus={focus} style={style} testIdPrefix={testIdPrefix}>{children}</BimDiagram>
  const focused = nodes.find((n) => n.id === focus)
  return (
    <div style={{ position: "relative", width, height, ...style }} data-focus={focus ?? ""}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ position: "absolute", inset: 0, overflow: "visible" }} aria-hidden="true">
        {children}
        {links.map((l) => (
          <Trace key={l.id} points={l.points} at={l.at} dur={l.dur ?? 0.7} color={l.color ?? C.ink} arrow={l.arrow ?? true} dashed={l.dashed} width={l.width ?? 4} />
        ))}
        {nodes.map((n) => (
          <Trace key={n.id} d={rectPath(n.x, n.y, n.w, n.h)} at={n.at} dur={0.5} color={n.color ?? C.ink} width={4} fill={C.panel} />
        ))}
        {focused ? <HighlightRect on x={focused.x} y={focused.y} w={focused.w} h={focused.h} /> : null}
      </svg>
      {nodes.map((n) => (
        <Wipe
          key={n.id}
          at={n.at + 0.35}
          dur={0.4}
          testId={testIdPrefix ? `${testIdPrefix}-${n.id}` : undefined}
          style={{ position: "absolute", left: n.x, top: n.y, width: n.w, height: n.h, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: 12, boxSizing: "border-box", fontSize: 36, fontWeight: 650, lineHeight: 1.15 }}
        >
          {n.label}
        </Wipe>
      ))}
    </div>
  )
}

/** Partie d'une illustration révélée sur ses mots : groupe `<g id="…">` du fichier. */
export type SvgPart = {
  /** Identifiant du groupe dans le SVG (`<g id="maison-pac">`). */
  readonly group: string
  /** Début du balayage de ce groupe (secondes de scène, au plus tôt le `at` de l'illustration). */
  readonly at: number
  readonly dur?: number
  readonly dir?: WipeDir
}

const SVG_NS = "http://www.w3.org/2000/svg"

/** Rectangle de découpe d'un balayage dans la boîte (x, y, w, h), avancement p. */
function wipeRect(dir: WipeDir, p: number, x: number, y: number, w: number, h: number): [number, number, number, number] {
  switch (dir) {
    case "right":
      return [x, y, w * p, h]
    case "left":
      return [x + w * (1 - p), y, w * p, h]
    case "down":
      return [x, y, w, h * p]
    case "up":
      return [x, y + h * (1 - p), w, h * p]
  }
}

/**
 * Illustration de content/design/assets/ révélée par balayage.
 *
 * `name` (nom du fichier sans .svg, lu au rendu) ou `svg` (objet de
 * `illustration("nom", ["groupe"])`, vérifié au chargement : à préférer).
 * Sans `parts`, l'illustration entière se balaie à `at`. Avec `parts`, chaque
 * groupe nommé reste caché jusqu'à son propre `at`, puis se balaie
 * (`dur`, `dir`) ; le reste de l'illustration (le décor) se balaie à `at`.
 * Un groupe absent du fichier lève une TextError.
 */
export function Svg({
  name,
  svg: given,
  at,
  dur = 0.8,
  dir = "right",
  parts = [],
  style,
  testId,
}: {
  readonly name?: string
  readonly svg?: Illustration
  readonly at: number
  readonly dur?: number
  readonly dir?: WipeDir
  readonly parts?: readonly SvgPart[]
  readonly style?: CSSProperties
  readonly testId?: string
}) {
  const t = useT()
  const box = useRef<HTMLDivElement>(null)
  const uid = useId().replace(/[^a-zA-Z0-9_-]/g, "")
  if (!given && name === undefined) throw new TextError("<Svg> : « name » ou « svg » (illustration(…)) est obligatoire")
  const label = given?.name ?? name ?? ""
  const raw = given?.svg ?? asset(label)
  const ids = given?.ids ?? svgIds(raw)
  for (const p of parts) {
    if (!ids.has(p.group)) throw new TextError(`illustration « ${label} » : groupe « ${p.group} » absent du fichier (id="${p.group}" attendu sur un <g>)`)
  }
  // Taille imposée en tête de balise : le premier attribut l'emporte sur ceux du fichier
  const html = raw.replace(/<svg\b/, '<svg width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style="display:block"')
  const progress = parts.map((p) => wipeProgress(t, p.at, p.dur ?? dur))
  const key = progress.join(",")

  // Chaque groupe est enveloppé une fois dans un <g> découpé par un rectangle,
  // mis à jour à chaque image (aucun fondu : la découpe avance dans la boîte du groupe).
  useLayoutEffect(() => {
    const root = box.current?.querySelector("svg")
    if (!root) return
    let defs = root.querySelector(`defs[data-parts="${uid}"]`)
    if (!defs) {
      defs = document.createElementNS(SVG_NS, "defs")
      defs.setAttribute("data-parts", uid)
      root.insertBefore(defs, root.firstChild)
    }
    parts.forEach((p, i) => {
      const el = root.querySelector(`[id="${CSS.escape(p.group)}"]`)
      if (!(el instanceof SVGGraphicsElement)) return
      const clipId = `${uid}-part-${i}`
      const parent = el.parentNode
      let wrap: SVGGElement
      if (parent instanceof SVGGElement && parent.getAttribute("data-part") === p.group) wrap = parent
      else {
        wrap = document.createElementNS(SVG_NS, "g")
        wrap.setAttribute("data-part", p.group)
        wrap.setAttribute("clip-path", `url(#${clipId})`)
        parent?.insertBefore(wrap, el)
        wrap.appendChild(el)
      }
      let rect = defs.querySelector(`#${clipId} rect`)
      if (!rect) {
        const clip = document.createElementNS(SVG_NS, "clipPath")
        clip.setAttribute("id", clipId)
        clip.setAttribute("clipPathUnits", "userSpaceOnUse")
        rect = document.createElementNS(SVG_NS, "rect")
        clip.appendChild(rect)
        defs.appendChild(clip)
      }
      // Boîte du groupe dans le repère de l'enveloppe (transformations du groupe comprises), marge pour les traits
      const b = wrap.getBBox()
      const m = Math.max(8, 0.04 * Math.max(b.width, b.height))
      const v = progress[i] ?? 0
      const [x, y, w, h] = wipeRect(p.dir ?? dir, v, b.x - m, b.y - m, b.width + 2 * m, b.height + 2 * m)
      rect.setAttribute("x", String(x))
      rect.setAttribute("y", String(y))
      rect.setAttribute("width", String(Math.max(0, w)))
      rect.setAttribute("height", String(Math.max(0, h)))
      wrap.setAttribute("data-revealed", v >= 1 ? "true" : v > 0 ? "partial" : "false")
    })
  }, [key, html, uid, dir, parts])

  return (
    <Wipe at={at} dur={dur} dir={dir} style={style} testId={testId}>
      <div ref={box} style={{ width: "100%", height: "100%" }} dangerouslySetInnerHTML={{ __html: html }} />
    </Wipe>
  )
}

type CalloutProps = { readonly anchor: Point; readonly label: Point; readonly text: string; readonly at: number; readonly width?: number; readonly color?: string; readonly size?: number; readonly testId?: string }

/**
 * Repère : un trait tracé d'un point de l'image (`anchor`, petit carré) vers
 * un texte (coin haut gauche en `label`), balayé à la fin du tracé.
 * Signature bimaccess : ligne de repère de la charte (point, oblique, palier,
 * texte mono, encre par défaut).
 */
export function Callout(props: CalloutProps) {
  return BIM ? <BimCallout {...props} /> : <NeutralCallout {...props} />
}

function NeutralCallout({ anchor, label, text, at, width = 420, color = C.accent2, size = 32, testId }: CalloutProps) {
  const { width: W, height: H } = useVideoConfig()
  const t = useT()
  const dur = 0.5
  const elbow: Point = [label[0] - 16, label[1] + size * 0.65]
  return (
    <>
      <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: "absolute", inset: 0, pointerEvents: "none" }} aria-hidden="true">
        {t >= at ? <rect x={anchor[0] - 7} y={anchor[1] - 7} width={14} height={14} fill={color} /> : null}
        <Trace points={[anchor, elbow]} at={at} dur={dur} color={color} width={3} />
      </svg>
      <Wipe at={at + dur} dur={0.4} testId={testId} style={{ position: "absolute", left: label[0], top: label[1], width, fontSize: size, lineHeight: 1.25, fontWeight: 600, color: C.ink }}>
        {text}
      </Wipe>
    </>
  )
}

/**
 * Sous-titres : la phrase en cours, mots déjà dits en encre, mots à venir en
 * gris. Lus dans les mots datés des clips placés (`voices`). Signature
 * bimaccess : bandeau blanc à filet, 34 px, qui laisse libre la zone d'action.
 */
export function Captions({ voices, size }: { readonly voices: readonly Voice[]; readonly size?: number }) {
  return BIM ? <BimCaptions voices={voices} size={size} /> : <NeutralCaptions voices={voices} size={size} />
}

function NeutralCaptions({ voices, size = 38 }: { readonly voices: readonly Voice[]; readonly size?: number }) {
  const t = useT()
  const words = voices.flatMap((v) => v.words).sort((a, b) => a.start - b.start)
  // Effacés peu après la phrase : l'image finale de la scène reste sa composition, sans sous-titre
  const current = currentSentence(sentencesOf(words), t)
  if (!current) return null
  // Centré par left/right 0 + marges automatiques : la largeur « au plus juste » se mesure sur toute la scène (jusqu'à 78 %), pas sur la moitié droite
  return (
    <div data-testid="captions" style={{ position: "absolute", left: 0, right: 0, bottom: 40, marginInline: "auto", width: "fit-content", maxWidth: "78%", padding: "14px 28px", background: "rgba(16, 18, 22, 0.86)", color: "#FFFFFF", borderRadius: THEME.radius, fontFamily: F.body, fontSize: size, lineHeight: 1.3, textAlign: "center", pointerEvents: "none" }}>
      {current.words.map((w, i) => (
        <span key={`${i}-${w.start}`} style={{ color: t >= w.start ? "#FFFFFF" : "rgba(255, 255, 255, 0.55)" }}>
          {i > 0 ? " " : ""}
          {w.text}
        </span>
      ))}
    </div>
  )
}

/**
 * Exercice à choix. La question se tape à `at` (cadence META.typingCps) ; les
 * choix et VALIDER se balaient ensemble à la fin de la frappe
 * (`typedUntil(question, at) + 0.2`). VALIDER est inactif sans sélection ; la
 * sélection reste modifiable jusqu'à VALIDER ; après, la conséquence du choix
 * se balaie à `actedAt`, puis CONTINUER à `continueAt` (fin du clip
 * déclenché, en général), jamais avant la fin de la narration d'entrée.
 * Verdict seulement si `verdict` est demandé ET que l'exercice a un « Attendu ».
 * Le choix sélectionné porte un bord plein et une barre à gauche, jamais le
 * contour tireté à poignées de la mise en évidence : une scène d'exercice
 * peut mettre un élément en évidence pendant le clip déclenché sans en
 * montrer deux, et l'image finale n'en garde aucune qu'elle n'a pas voulue.
 *
 * Clavier : flèches haut/bas (ou gauche/droite) et lettres a, b, c… dans la
 * liste des choix ; Tab jusqu'à VALIDER puis Entrée ou Espace.
 *
 * Signature bimaccess : choix selon quiz-choice (sélection = bord plein bleu et
 * poignées, jamais le tireté de la mise en évidence ; réponse attendue =
 * accrochage ■), rétroaction selon feedback-panel, VALIDER et CONTINUER
 * selon action-button, dans la zone d'action de SceneRoot (bas droite).
 */
export function ChoicePanel(props: ChoicePanelProps) {
  return BIM ? <BimChoicePanel {...props} /> : <NeutralChoicePanel {...props} />
}

function NeutralChoicePanel({ sceneId, exercise, state, send, at, actedAt, continueAt, onContinue, verdict = false, width = 1180, style }: ChoicePanelProps) {
  const t = useT()
  const refs = useRef<Record<string, HTMLButtonElement | null>>({})
  const lock = useRef(false)
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

  const btn: CSSProperties = { font: "inherit", fontSize: 28, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", padding: "16px 36px", borderRadius: THEME.radius, border: `2px solid ${C.ink}`, cursor: "pointer" }

  return (
    <div style={{ width, display: "flex", flexDirection: "column", gap: 26, ...style }} data-testid={tid(sceneId, "exercise")} data-validated={state.validated ? "true" : "false"}>
      <div style={{ fontSize: 44, fontWeight: 700, lineHeight: 1.2, fontFamily: F.display }}>
        <TypeText text={exercise.question} at={at} testId={tid(sceneId, "question")} />
      </div>
      <Wipe at={choicesAt} dur={0.5} dir="down">
        <div role="radiogroup" aria-label={exercise.question} onKeyDown={onKey} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {exercise.choices.map((c, i) => {
            const selected = state.selected === c.key
            const dim = state.validated && !selected
            const focusable = selected || (state.selected === null && i === 0)
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
                  style={{
                    width: "100%",
                    display: "grid",
                    gridTemplateColumns: "64px 1fr auto",
                    alignItems: "center",
                    textAlign: "left",
                    font: "inherit",
                    fontSize: 32,
                    lineHeight: 1.3,
                    color: dim ? C.muted : C.ink,
                    background: C.panel,
                    // Sélection : bord plein épais et barre à gauche, jamais le tireté à poignées
                    // de la mise en évidence (une seule mise en évidence à la fois dans la scène)
                    border: `3px solid ${selected ? C.accent : C.line}`,
                    boxShadow: selected ? `inset 10px 0 0 ${C.accent}` : "none",
                    borderRadius: THEME.radius,
                    padding: 0,
                    cursor: state.validated ? "default" : "pointer",
                    outlineOffset: 6,
                  }}
                >
                  <span style={{ fontFamily: F.mono, fontSize: 26, fontWeight: 700, textAlign: "center", paddingLeft: 6, color: selected ? C.accent : C.muted }}>{c.key.toUpperCase()}</span>
                  <span style={{ padding: "16px 12px 16px 0" }}>{c.label}</span>
                  <span style={{ paddingRight: 20, fontSize: 20, fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase", color: C.accent }}>
                    {state.validated && selected ? L.yourChoice : v !== null && c.key === exercise.expected ? L.expected : ""}
                  </span>
                </button>
              </div>
            )
          })}
        </div>
      </Wipe>
      <Wipe at={choicesAt} dur={0.4}>
        <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
          {state.validated ? null : (
            <button type="button" data-role="validate" data-testid={tid(sceneId, "validate")} disabled={!shown || state.selected === null} onClick={onValidate} style={{ ...btn, background: state.selected === null ? C.panel : C.ink, color: state.selected === null ? C.muted : C.panel, borderColor: state.selected === null ? C.line : C.ink, cursor: state.selected === null ? "not-allowed" : "pointer" }}>
              {L.submit}
            </button>
          )}
        </div>
      </Wipe>
      {state.validated && chosen && t >= feedbackAt ? (
        <Wipe at={feedbackAt} dur={0.5} dir="down" testId={tid(sceneId, "feedback")}>
          <div role="status" data-role="feedback" data-verdict={v ?? "none"} style={{ background: C.panel, borderLeft: `8px solid ${v === "other" ? C.accent2 : v === "expected" ? C.success : C.accent}`, borderRadius: THEME.radius, padding: "20px 28px" }}>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "0.05em", textTransform: "uppercase", color: C.muted, marginBottom: 8 }}>{v === "expected" ? L.verdictExpected : v === "other" ? L.verdictOther : L.consequence}</div>
            <div style={{ fontSize: 32, lineHeight: 1.35 }}>{chosen.feedback}</div>
          </div>
        </Wipe>
      ) : null}
      {canContinue ? (
        <Wipe at={contAt} dur={0.4}>
          <button type="button" data-role="continue" data-testid={tid(sceneId, "continue")} onClick={onContinue} style={{ ...btn, background: C.accent, color: C.panel, borderColor: C.accent }}>
            {L.continue}
          </button>
        </Wipe>
      ) : null}
    </div>
  )
}

