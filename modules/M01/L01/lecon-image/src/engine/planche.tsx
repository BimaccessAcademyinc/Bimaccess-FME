/**
 * Scène « planche image » : une scène entière décrite par des données.
 *
 * Le dessin vient d'un modèle d'image (sans aucun texte), les boîtes de ses
 * éléments d'un modèle de vision, le plan (révélations, textes, mises en
 * évidence) du modèle de langage. Cette scène les assemble dans la grammaire :
 *
 *   - chaque élément se découvre par un balayage sur sa locution (masque SVG ;
 *     un élément plus petit, posé dans un plus grand, reste caché jusqu'à son
 *     propre instant) ; un calque de couleur (routes) se balaie à part ;
 *   - les textes sont ceux du storyboard (`sceneTexts`), posés par le code
 *     autour des boîtes, dans les polices de la signature : jamais de faute ;
 *   - une seule mise en évidence à la fois (`focusAt`), logos en couleurs
 *     d'origine, mention de source cliquable, manques or le temps voulu.
 *
 * Aucune valeur de temps écrite à la main : `at` vaut 0 (première image) ou
 * une locution dite mot pour mot, vérifiée au chargement.
 */
import { type CSSProperties, useState } from "react"
import { THEME } from "../generated/theme"
import { Highlight, useT, Wipe, type WipeDir, wipeProgress } from "./anim"
import { SceneRoot, Svg, Title, tid } from "./components"
import { defineScene } from "./scene"
import { sceneTexts } from "./texts"
import { focusAt, voice } from "./timeline"

type Box = readonly [number, number, number, number]
type At = number | string

export interface PlancheTexte {
  readonly ecran: number
  readonly role: string
  readonly el?: string
  readonly pos?: string
  readonly at?: At
  readonly w?: number
  readonly dx?: number
  readonly dy?: number
  readonly size?: number
}
export interface PlanchePlan {
  readonly scene: string
  readonly revele: readonly { readonly el: string; readonly at: At; readonly dur?: number; readonly dir?: string }[]
  readonly textes: readonly PlancheTexte[]
  readonly focus?: readonly { readonly el: string | null; readonly at: At }[]
  readonly logos?: readonly { readonly nom: string; readonly el?: string; readonly pos?: string; readonly x?: number; readonly y?: number; readonly w: number; readonly dy?: number; readonly at: At }[]
  readonly manques?: readonly { readonly el: string; readonly jusqua: At }[]
  readonly zones?: Readonly<Record<string, readonly number[]>>
  readonly calques?: Readonly<Record<string, string>>
  readonly biblio?: Readonly<Record<string, { readonly biblio: string }>>
  readonly deplace?: readonly { readonly el: string; readonly vers: string; readonly at: At; readonly dur?: number; readonly copie?: boolean }[]
  readonly source?: { readonly x: number; readonly bas: number; readonly largeur?: number }
}
export interface PlancheBoites {
  readonly boites: Readonly<Record<string, readonly number[]>>
}

const C = THEME.colors
const F = THEME.fonts
const PAD = 6

const CAPS: CSSProperties = { fontFamily: F.capitales, fontWeight: 600, textTransform: "uppercase", color: C.encre, background: C.fond, padding: "2px 6px", whiteSpace: "normal", lineHeight: 1.15, textAlign: "center" }
const ROLES: Readonly<Record<string, CSSProperties>> = {
  etiquette: { ...CAPS, fontSize: 26, letterSpacing: "0.24em" },
  terme: { ...CAPS, fontSize: 26, letterSpacing: "0.24em", color: C.terme },
  lieu: { ...CAPS, fontSize: 34, letterSpacing: "0.3em" },
  jalon: { ...CAPS, fontSize: 24, letterSpacing: "0.12em" },
  rubrique: { fontFamily: F.serif, fontWeight: 400, fontSize: 30, lineHeight: 1.2, color: C.encre, background: C.fond, padding: "2px 6px", textAlign: "left" },
}

/** Point d'ancrage et translation CSS d'un texte autour d'une boîte. */
function place(b: Box, pos: string, dx = 0, dy = 0): { readonly left: number; readonly top: number; readonly transform: string; readonly align: "left" | "center" | "right" } {
  const [x, y, w, h] = b
  const cx = x + w / 2
  const cy = y + h / 2
  const at = (left: number, top: number, transform: string, align: "left" | "center" | "right" = "center") => ({ left: left + dx, top: top + dy, transform, align })
  switch (pos) {
    case "dessus":
      return at(cx, y - 12, "translate(-50%, -100%)")
    case "dessous":
      return at(cx, y + h + 12, "translate(-50%, 0)")
    case "dedans-haut":
      return at(cx, y + 12, "translate(-50%, 0)")
    case "dedans-bas-gauche":
      return at(x + 20, y + h - 20, "translate(0, -100%)", "left")
    case "dedans-haut-droite":
      return at(x + w - 20, y + 20, "translate(-100%, 0)", "right")
    case "droite":
      return at(x + w + 18, cy, "translate(0, -50%)", "left")
    case "gauche":
      return at(x - 18, cy, "translate(-100%, -50%)", "right")
    default:
      return at(cx, cy, "translate(-50%, -50%)")
  }
}

/** Rectangle découvert d'une boîte, selon l'avancement `p` et le sens. */
function revealed(b: Box, p: number, dir: WipeDir): Box {
  const [x, y, w, h] = b
  switch (dir) {
    case "left":
      return [x + w * (1 - p), y, w * p, h]
    case "down":
      return [x, y, w, h * p]
    case "up":
      return [x, y + h * (1 - p), w, h * p]
    default:
      return [x, y, w * p, h]
  }
}

function Source({ href, children, x, bas, largeur = 250, testId }: { readonly href: string; readonly children: string; readonly x: number; readonly bas: number; readonly largeur?: number; readonly testId: string }) {
  const [hover, setHover] = useState(false)
  return (
    <div style={{ position: "absolute", left: x, bottom: 1080 - bas, width: largeur }}>
      <div aria-hidden="true" style={{ width: Math.min(220, largeur), height: 1.2, background: C.encre, marginBottom: 10 }} />
      <a
        data-testid={testId}
        href={href}
        target="_blank"
        rel="noopener"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ display: "block", fontFamily: F.serif, fontStyle: "italic", fontWeight: 400, fontSize: 24, lineHeight: 1.2, color: hover ? C.lienSurvol : C.lien, textDecoration: "underline", textUnderlineOffset: 3, cursor: "pointer", pointerEvents: "auto", background: C.fond, padding: 2, margin: -2 }}
      >
        {children}
      </a>
    </div>
  )
}

type Trace = readonly (string | number)[]
export interface PlancheTraces {
  readonly traces: readonly Trace[]
  readonly images: readonly string[]
  readonly fonds?: Readonly<Record<string, string>>
}
export interface PlancheBiblio {
  readonly w: number
  readonly h: number
  readonly traces: readonly Trace[]
}

/** Avancement 0 → 1 d'un tracé, selon son rang dans l'élément (la moitié de la durée pour échelonner, l'autre pour tracer). */
const traceLocal = (t: number, at: number, dur: number, rang: number): number => (dur <= 0 ? (t >= at ? 1 : 0) : Math.max(0, Math.min(1, (t - at - rang * dur * 0.5) / (dur * 0.5))))

function Chemin({ d, fill: couleur, tx, ty, p, transform }: { readonly d: string; readonly fill: string; readonly tx: number; readonly ty: number; readonly p: number; readonly transform?: string }) {
  if (p <= 0) return null
  const tr = `${transform ?? ""} translate(${tx},${ty})`
  const fill = couleur === "fond" ? C.fond : couleur
  // Le trait se dessine à vitesse constante, puis l'aplat se pose quand il est fermé (jamais de fondu)
  return p < 1 ? <path d={d} transform={tr} pathLength={1} fill="none" stroke={fill} strokeWidth={2.5} strokeDasharray="1" strokeDashoffset={1 - p} /> : <path d={d} transform={tr} fill={fill} />
}

/**
 * Scène narrée tirée d'une planche image tracée. `images.base` : image
 * détourée (éléments en trame) ; `traces` : tracés vectoriels rangés par
 * élément ; `biblio` : éléments de la bibliothèque du programme nommés par le
 * plan ; `sources` : adresses des mentions de source (`content/sources.json`).
 */
export function planche(plan: PlanchePlan, boites: PlancheBoites, images: Readonly<Record<string, string>>, sources: Readonly<Record<string, string | undefined>>, traces: PlancheTraces, biblio: Readonly<Record<string, PlancheBiblio>> = {}) {
  const ID = plan.scene
  const X = sceneTexts(ID, { screen: plan.textes.length })
  const V = voice(`${ID}-01`)
  const at = (a: At | undefined): number => (a === undefined || a === 0 ? 0 : typeof a === "number" ? a : V.said(a))
  const box = (el: string): Box => {
    const b = plan.zones?.[el] ?? boites.boites[el]
    if (!b || b.length !== 4) throw new Error(`${ID} : élément « ${el} » sans boîte (repérage ou zones du plan)`)
    return [b[0] ?? 0, b[1] ?? 0, b[2] ?? 0, b[3] ?? 0]
  }
  const pad = (b: Box): Box => [b[0] - PAD, b[1] - PAD, b[2] + 2 * PAD, b[3] + 2 * PAD]

  // Tracés par élément ; un élément de bibliothèque remplace ceux de la planche
  const parEl = new Map<string, { d: string; fill: string; tx: number; ty: number; rang: number; i: number }[]>()
  traces.traces.forEach((tr, i) => {
    const [el, d, fill, tx, ty, rang] = tr as [string, string, string, number, number, number]
    if (plan.biblio?.[el]) return
    parEl.set(el, [...(parEl.get(el) ?? []), { d, fill, tx, ty, rang, i }])
  })
  const libs = new Map<string, { transform: string; w: number; h: number; paths: { d: string; fill: string; tx: number; ty: number; rang: number; i: number }[] }>()
  for (const [el, ref] of Object.entries(plan.biblio ?? {})) {
    const lib = biblio[ref.biblio]
    if (!lib) throw new Error(`${ID} : élément de bibliothèque « ${ref.biblio} » absent`)
    const [bx, by, bw, bh] = box(el)
    const k = Math.min(bw / lib.w, bh / lib.h)
    libs.set(el, {
      transform: `translate(${bx + (bw - lib.w * k) / 2},${by + (bh - lib.h * k) / 2}) scale(${k})`,
      w: lib.w,
      h: lib.h,
      paths: lib.traces.map((tr, i) => {
        const [d, fill, tx, ty, rang] = tr as [string, string, number, number, number]
        return { d, fill, tx, ty, rang, i }
      }),
    })
  }

  const deplace = (plan.deplace ?? []).map((m) => {
    const t0 = at(m.at)
    return { el: m.el, vers: m.vers, at: t0, end: t0 + (m.dur ?? 0.9), copie: m.copie ?? false }
  })
  const elements = plan.revele.map((r) => {
    const t0 = at(r.at)
    const b = box(r.el)
    const traced = (parEl.get(r.el)?.length ?? 0) > 0 || libs.has(r.el)
    const mode = traces.images.includes(r.el) || !traced ? "image" : "trace"
    return { el: r.el, b, pb: pad(b), at: t0, dur: r.dur ?? (t0 === 0 ? 0 : mode === "trace" ? 1.2 : 0.6), dir: (r.dir ?? "right") as WipeDir, mode }
  })
  // Cible d'un déplacement : paraît, entière, à l'arrivée
  for (const m of deplace) {
    if (!elements.some((e) => e.el === m.vers)) {
      const b = box(m.vers)
      elements.push({ el: m.vers, b, pb: pad(b), at: m.end, dur: 0, dir: "right", mode: (parEl.get(m.vers)?.length ?? 0) > 0 ? "trace" : "image" })
    }
  }
  const parAire = [...elements].sort((a, b) => b.pb[2] * b.pb[3] - a.pb[2] * a.pb[3])
  const etat = new Map(elements.map((e) => [e.el, e]))
  const vecteurs = [...parEl.entries()].flatMap(([el, ps]) => ps.map((p) => ({ el, ...p }))).sort((a, b) => a.i - b.i)

  const textes = plan.textes.map((tx) => ({ ...tx, t: at(tx.at), text: X.screen(tx.ecran) }))
  const logos = (plan.logos ?? []).map((l) => {
    const p = l.el ? place(box(l.el), l.pos ?? "dessous", 0, l.dy ?? 0) : { left: l.x ?? 0, top: l.y ?? 0, transform: "none", align: "left" as const }
    const left = l.el ? p.left - l.w / 2 : p.left
    return { nom: l.nom, left, top: p.top, w: l.w, t: at(l.at) }
  })
  const focus = (plan.focus ?? []).map((f) => ({ at: at(f.at), on: f.el ?? "__aucun" }))
  const manques = (plan.manques ?? []).map((m) => ({ b: box(m.el), jusqua: at(m.jusqua) }))
  const instants = [...new Set([...elements.map((e) => e.at), ...deplace.map((m) => m.end), ...textes.map((x) => x.t), ...logos.map((l) => l.t)].filter((x) => x > 0))].sort((a, b) => a - b)
  const href = sources[ID]
  const mask = `planche-${ID}`

  /** Transformation d'un élément qui part de sa boîte vers celle de `vers` (centre et échelle interpolés). */
  const trajet = (el: string, vers: string, k: number): string => {
    const [ax, ay, aw, ah] = box(el)
    const [bx, by, bw, bh] = box(vers)
    const s = Math.min(bw / aw, bh / ah)
    const cx = ax + aw / 2 + (bx + bw / 2 - ax - aw / 2) * k
    const cy = ay + ah / 2 + (by + bh / 2 - ay - ah / 2) * k
    return `translate(${cx},${cy}) scale(${1 + (s - 1) * k}) translate(${-(ax + aw / 2)},${-(ay + ah / 2)})`
  }

  function View() {
    const t = useT()
    const passes = instants.filter((x) => t >= x).length
    const board = passes >= instants.length ? `${ID}-FIN` : `${ID}-${passes + 1}`
    const on = focusAt(focus, t)
    const parti = (el: string) => deplace.some((m) => m.el === el && !m.copie && t >= m.at)
    const enRoute = deplace.filter((m) => t >= m.at && t < m.end)
    const progres = (el: string, rang: number) => {
      const e = etat.get(el)
      if (!e || t < e.at || parti(el)) return 0
      return traceLocal(t, e.at, e.dur, rang)
    }
    return (
      <SceneRoot id={ID} board={board}>
        <svg viewBox="0 0 1920 1080" width={1920} height={1080} style={{ position: "absolute", left: 0, top: 0 }} aria-hidden="true">
          <defs>
            {/* Trame : seuls les éléments en image se découvrent par balayage ; les éléments tracés restent masqués */}
            <mask id={mask} maskUnits="userSpaceOnUse" x={0} y={0} width={1920} height={1080}>
              <rect x={0} y={0} width={1920} height={1080} fill="#000" />
              {parAire.map((r) => {
                const p = r.mode === "trace" || parti(r.el) ? 0 : r.dur <= 0 ? (t >= r.at ? 1 : 0) : t < r.at ? 0 : wipeProgress(t, r.at, r.dur)
                const [x, y, w, h] = revealed(r.pb, p, r.dir)
                return (
                  <g key={r.el}>
                    <rect x={r.pb[0]} y={r.pb[1]} width={r.pb[2]} height={r.pb[3]} fill="#000" />
                    {p > 0 ? <rect x={x} y={y} width={w} height={h} fill="#fff" /> : null}
                  </g>
                )
              })}
            </mask>
            {/* Élément de bibliothèque : rien ne déborde de sa boîte d'origine */}
            {[...libs.entries()].map(([el, lib]) => (
              <clipPath key={el} id={`${mask}-lib-${el}`} clipPathUnits="userSpaceOnUse">
                <rect x={0} y={0} width={lib.w} height={lib.h} />
              </clipPath>
            ))}
            {/* Tracés : un élément pas encore dit cache ce qu'un plus grand dessine sur sa boîte */}
            <mask id={`${mask}-v`} maskUnits="userSpaceOnUse" x={0} y={0} width={1920} height={1080}>
              <rect x={0} y={0} width={1920} height={1080} fill="#fff" />
              {parAire.map((r) => (
                <rect key={r.el} x={r.pb[0]} y={r.pb[1]} width={r.pb[2]} height={r.pb[3]} fill={t >= r.at ? "#fff" : "#000"} />
              ))}
            </mask>
          </defs>
          <image href={images.base} x={0} y={0} width={1920} height={1080} preserveAspectRatio="none" mask={`url(#${mask})`} />
          {Object.entries(traces.fonds ?? {}).map(([el, couleur]) => {
            const e = etat.get(el)
            const parent = parAire.find((r) => r.mode === "image" && r.el !== el && e && r.b[0] <= e.b[0] && r.b[1] <= e.b[1] && r.b[0] + r.b[2] >= e.b[0] + e.b[2] && r.b[1] + r.b[3] >= e.b[1] + e.b[3])
            const visible = parent && t >= parent.at && (!e || t < e.at || parti(el))
            return visible && e ? <rect key={`fond-${el}`} x={e.pb[0]} y={e.pb[1]} width={e.pb[2]} height={e.pb[3]} fill={couleur} /> : null
          })}
          <g mask={`url(#${mask}-v)`}>
            {vecteurs.map((v) => (
              <Chemin key={v.i} d={v.d} fill={v.fill} tx={v.tx} ty={v.ty} p={progres(v.el, v.rang)} />
            ))}
            {[...libs.entries()].map(([el, lib]) => (
              <g key={el} transform={lib.transform} clipPath={`url(#${mask}-lib-${el})`} data-testid={tid(ID, `biblio-${el}`)}>
                {lib.paths.map((v) => (
                  <Chemin key={v.i} d={v.d} fill={v.fill} tx={v.tx} ty={v.ty} p={progres(el, v.rang)} />
                ))}
              </g>
            ))}
          </g>
          {/* Déplacements : l'élément (ou sa copie) voyage d'une boîte à l'autre, au-dessus de tout */}
          {enRoute.map((m) => {
            const k = wipeProgress(t, m.at, m.end - m.at)
            const tr = trajet(m.el, m.vers, k)
            const lib = libs.get(m.el)
            const ps = lib ? lib.paths : (parEl.get(m.el) ?? [])
            return (
              <g key={`${m.el}-${m.vers}`} data-testid={tid(ID, `trajet-${m.el}`)}>
                {ps.map((v) => (
                  <Chemin key={v.i} d={v.d} fill={v.fill} tx={v.tx} ty={v.ty} p={1} transform={lib ? `${tr} ${lib.transform}` : tr} />
                ))}
              </g>
            )
          })}
        </svg>

        {manques.map((m, i) =>
          t < m.jusqua ? <div key={i} aria-hidden="true" style={{ position: "absolute", left: m.b[0] + m.b[2] / 2 - 16, top: m.b[1] + m.b[3] / 2 - 16, width: 32, height: 32, boxSizing: "border-box", border: `3px solid ${C.manque}`, background: C.manqueFond }} /> : null,
        )}

        {logos.map((l) => (
          <Svg key={l.nom} name={l.nom} at={l.t} dur={0.6} dir="right" style={{ position: "absolute", left: l.left, top: l.top, width: l.w }} testId={tid(ID, l.nom)} />
        ))}

        {textes.map((tx) => {
          if (tx.role === "source") {
            if (!href) throw new Error(`content/sources.json : aucune adresse pour la scène ${ID}`)
            return (
              <Source key={tx.ecran} href={href} x={plan.source?.x ?? 1448} bas={plan.source?.bas ?? 820} largeur={plan.source?.largeur} testId={tid(ID, "source")}>
                {tx.text}
              </Source>
            )
          }
          if (tx.role === "titre") {
            return (
              <div key={tx.ecran} style={{ position: "absolute", left: 98, top: 82, padding: "2px 6px", background: C.fond }}>
                <Title text={tx.text} at={tx.t} testId={tid(ID, "title")} />
              </div>
            )
          }
          if (!tx.el) throw new Error(`${ID} : texte ${tx.ecran} sans élément d'ancrage`)
          let p = place(box(tx.el), tx.pos ?? "dessus", tx.dx, tx.dy)
          // Texte centré qui sortirait de la feuille : calé sur le bord intérieur
          if (p.align === "center") {
            const size = tx.size ?? (tx.role === "lieu" ? 34 : tx.role === "rubrique" ? 30 : 26)
            const half = Math.min(tx.w ?? 520, tx.text.length * size * (tx.role === "rubrique" ? 0.5 : 0.78)) / 2
            if (p.left - half < 70) p = { ...p, left: 70, transform: p.transform.replace("-50%,", "0,"), align: "left" }
            else if (p.left + half > 1850) p = { ...p, left: 1850, transform: p.transform.replace("-50%,", "-100%,"), align: "right" }
          }
          const style: CSSProperties = { ...(ROLES[tx.role] ?? ROLES.etiquette), ...(tx.size ? { fontSize: tx.size } : {}), textAlign: p.align, maxWidth: tx.w ?? 520, width: "max-content" }
          return (
            <div key={tx.ecran} style={{ position: "absolute", left: p.left, top: p.top, transform: p.transform }}>
              <Wipe at={tx.t} dur={tx.t === 0 ? 0 : 0.35} dir="right" style={style} testId={tid(ID, `texte-${tx.ecran}`)}>
                {tx.text}
              </Wipe>
            </div>
          )
        })}

        {on && on !== "__aucun" ? (
          (() => {
            const [x, y, w, h] = box(on)
            const step = focus.filter((f) => f.on === on && t >= f.at).at(-1)
            return (
              <Highlight on at={step?.at} style={{ position: "absolute", left: x, top: y, width: w, height: h }} testId={tid(ID, `focus-${on}`)}>
                <div style={{ width: w, height: h }} />
              </Highlight>
            )
          })()
        ) : null}
      </SceneRoot>
    )
  }
  return defineScene({ id: ID, clip: V, View })
}
