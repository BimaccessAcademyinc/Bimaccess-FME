/**
 * Rendu d'une scène à gabarit, vue pure du temps (useT) : aucun état, aucun
 * minuteur. Ordre de pose (dessous vers dessus) : habillage de marge,
 * illustrations et tracés (dans l'ordre du plan), textes, mention de source,
 * titre, mise en évidence.
 */
import type { CSSProperties, ReactNode } from "react"
import { THEME } from "../../generated/theme"
import { Highlight, Move, Trace, TypeText, useT, Wipe, wipeProgress } from "../anim"
import { SceneRoot, Svg, Title, tid } from "../components"
import { PAGE } from "../signature"
import { focusAt } from "../timeline"
import type { Piece, Plan, PlanIllustration, PlanTexte } from "./plan"
import { cssDe, Source, Texte } from "./pieces"

const PLEIN: CSSProperties = { width: "100%", height: "100%" }
const CALQUE: CSSProperties = { position: "absolute", inset: 0, pointerEvents: "none" }

/** Un calque SVG plein cadre par tracé : l'ordre de pose peut alterner tracés et illustrations. */
function Calque({ children }: { readonly children: ReactNode }) {
  return (
    <svg aria-hidden="true" focusable="false" width={1920} height={1080} viewBox="0 0 1920 1080" style={CALQUE}>
      {children}
    </svg>
  )
}

function Illu({ id, p, scene }: { readonly id: string; readonly p: PlanIllustration; readonly scene: string }) {
  const rev = p.rev
  if (!rev) return null
  const { boite } = p
  const aplat = p.d.aplat ?? undefined
  const posee = { position: "absolute", left: 0, top: 0, width: boite.width, height: boite.height } as const
  const enveloppe = p.move !== null || p.d.decoupe !== null
  let el: ReactNode = <Svg svg={p.ill} at={rev.at} dur={rev.dur} dir={rev.dir} style={enveloppe ? { ...PLEIN, background: aplat } : { ...boite, background: aplat }} testId={tid(scene, id)} />
  // Découpe en cercle (globe) : l'illustration est vue à travers son cercle inscrit
  if (p.d.decoupe === "cercle") el = <div style={{ ...(p.move ? PLEIN : boite), clipPath: "circle(50%)" }}>{el}</div>
  if (p.move) {
    el = (
      <Move at={p.move.at} dur={p.move.dur} from={{ x: boite.left, y: boite.top }} to={{ x: p.move.vers[0], y: p.move.vers[1] }} style={posee}>
        {el}
      </Move>
    )
  }
  return <>{el}</>
}

function Feuille({ plan }: { readonly plan: Plan }) {
  const t = useT()
  const f = plan.feuille
  const p = f ? plan.illustrations.get(f.id) : undefined
  if (!f || !p) return null
  // Une seule découpe dont le bas descend bande par bande (jamais des balayages empilés : couture)
  let bas = f.bandes[0]?.haut ?? p.boite.top
  for (const b of f.bandes) {
    const v = wipeProgress(t, b.at, b.dur)
    if (v <= 0) break
    bas = b.haut + v * (b.bas - b.haut)
  }
  const cache = p.boite.top + p.boite.height - bas
  return (
    <div data-testid={tid(plan.d.scene, f.id)} style={{ ...p.boite, background: p.d.aplat ?? undefined, clipPath: `inset(0 0 ${Math.max(0, cache)}px 0)` }}>
      <Svg svg={p.ill} at={0} dur={0} style={PLEIN} />
    </div>
  )
}

function PieceVue({ piece, plan }: { readonly piece: Piece; readonly plan: Plan }) {
  const scene = plan.d.scene
  if (piece.sorte === "illustration") {
    if (plan.feuille?.id === piece.id) return <Feuille plan={plan} />
    const p = plan.illustrations.get(piece.id)
    return p ? <Illu id={piece.id} p={p} scene={scene} /> : null
  }
  if (piece.sorte === "frise") {
    const f = plan.frise
    if (!f) return null
    const pointe = f.pointe.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ") + " Z"
    return (
      <Calque>
        <Trace points={[f.de, f.a]} at={0} dur={0} color={f.couleur} width={f.epaisseur} />
        <Trace d={pointe} at={0} dur={0} color={f.couleur} width={1} fill={f.couleur} />
      </Calque>
    )
  }
  if (piece.sorte === "annees") {
    const a = plan.annees.get(piece.id)
    if (!a) return null
    return (
      <Calque>
        <Trace points={[a.d.de, a.d.a]} at={a.rev.at} dur={a.rev.dur} color={a.d.couleur} width={a.d.epaisseur} />
        <Trace points={[a.d.claire.de, a.d.claire.a]} at={a.rev.at + a.retard} dur={a.durClaire} color={a.d.claire.couleur} width={a.d.claire.epaisseur} />
      </Calque>
    )
  }
  const tr = plan.traces.get(piece.id)
  if (!tr) return null
  const { rev, d } = tr
  return (
    <Calque>
      {d.couches.map((c, i) => (
        <Trace key={i} points={d.points ?? undefined} d={d.d ?? undefined} at={rev.at} dur={rev.dur} color={c.couleur} width={c.epaisseur} fill={i === d.couches.length - 1 ? (d.remplissage ?? undefined) : undefined} />
      ))}
    </Calque>
  )
}

function TexteVue({ id, p, plan }: { readonly id: string; readonly p: PlanTexte; readonly plan: Plan }) {
  const rev = p.rev
  if (!rev) return null
  const scene = plan.d.scene
  const d = p.d
  const centre = d.cx !== null
  const commun = {
    x: d.x ?? undefined,
    cx: d.cx ?? undefined,
    y: d.y,
    reserve: d.reserve,
    track: centre ? p.style.interlettrage : 0,
    width: d.largeur ?? undefined,
    style: cssDe(p.style),
    lang: d.langue ?? undefined,
  }
  if (d.dans !== null) {
    const c = plan.illustrations.get(d.dans)
    if (!c) return null
    // Dans le balayage de son illustration : même boîte, même instant, même sens
    return (
      <Wipe at={rev.at} dur={rev.dur} dir={rev.dir} style={c.boite} testId={tid(scene, id)}>
        <Texte {...commun} at={rev.at} origin={c.boite}>
          {p.texte}
        </Texte>
      </Wipe>
    )
  }
  if (rev.type === "frappe") {
    return (
      <Texte {...commun} at={rev.at}>
        <TypeText text={p.texte} at={rev.at} testId={tid(scene, id)} />
      </Texte>
    )
  }
  // Balayé, ou posé (balayage de durée nulle : invisible avant son instant, entier à son instant)
  return (
    <Texte {...commun} at={rev.at} wipe={{ dur: rev.dur, dir: rev.dir }} testId={tid(scene, id)}>
      {p.texte}
    </Texte>
  )
}

/** Vue de la scène d'après son plan. */
export function vueDe(plan: Plan) {
  const scene = plan.d.scene
  // Réserve du titre : le fond de la signature (2 px en haut et en bas, 6 px à gauche et à droite)
  const reserveTitre = (THEME.colors as Readonly<Record<string, string | undefined>>)[PAGE.reserve] ?? THEME.colors.background
  function View() {
    const t = useT()
    const focus = focusAt(plan.focus, t)
    const titre = plan.titre
    return (
      <SceneRoot id={scene} board={focusAt(plan.boards, t) ?? plan.premierEtat}>
        {plan.habillage.map((h, i) => (
          <Svg key={`h${i}`} svg={h.ill} at={0} dur={0} style={h.boite} testId={tid(scene, h.ill.name)} />
        ))}
        {plan.pieces.map((p) => (
          <PieceVue key={p.sorte === "frise" ? "frise" : p.id} piece={p} plan={plan} />
        ))}
        {[...plan.textes].map(([id, p]) => (
          <TexteVue key={id} id={id} p={p} plan={plan} />
        ))}
        {plan.source ? (
          <Source href={plan.source.href} testId={tid(scene, "source")}>
            {plan.source.texte}
          </Source>
        ) : null}
        {titre ? <Title text={titre.texte} at={titre.at} style={{ position: "absolute", left: PAGE.titre.x - 6, top: PAGE.titre.y - 2, padding: "2px 6px", background: t >= titre.at ? reserveTitre : "transparent" }} testId={tid(scene, "title")} /> : null}
        {plan.evidences.map((e) => (
          <Highlight key={e.d.id} on={focus === e.d.id} at={e.at} pad={0} shape={e.d.forme} style={{ position: "absolute", left: e.d.x, top: e.d.y, width: e.d.largeur, height: e.d.hauteur }} testId={tid(scene, `hl-${e.d.id}`)}>
            {null}
          </Highlight>
        ))}
      </SceneRoot>
    )
  }
  return View
}
