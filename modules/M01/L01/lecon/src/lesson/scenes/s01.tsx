/**
 * S01 · Chaque entreprise forestière garde son logiciel (scène narrée, clip S01-01).
 * Composition, états et instants : spécification du groupe a, section S01.
 *
 *   S01-1   image 0 : territoire et son nom, carte des fondateurs et leurs noms,
 *           mention de source, échelle, rose ; zone du titre vide
 *   S01-2   « Les entreprises forestières doivent » : cartes des entreprises et du
 *           gouvernement balayées ensemble, avec leurs noms
 *   S01-3   « partager leurs données géographiques » : la liaison se trace des
 *           entreprises vers le gouvernement, puis le manque or se balaie à son arrivée
 *   S01-4   « utilisent des logiciels différents » : les trois fenêtres
 *   S01-5   « garde donc son logiciel » : titre tapé ; mise en évidence sur les fenêtres
 *   S01-FIN « voient de près ce problème » : la mise en évidence passe aux fondateurs
 *           et y reste (la question finale ne change rien à l'écran)
 * Suivant : libre à la fin de la narration.
 */
import { type CSSProperties, type ReactNode } from "react"
import { defineScene, focusAt, Highlight, illustration, ordered, SceneRoot, sceneTexts, Svg, THEME, tid, Title, Trace, useT, voice, Wipe } from "../../engine"

const ID = "S01"
const X = sceneTexts(ID, { screen: 6 })
const V = voice("S01-01")
const C = THEME.colors
const SERIF = THEME.fonts.serif
const CAPS = THEME.fonts.capitales

const PROJET = illustration("s01-projet", ["s01-projet-entreprises", "s01-projet-gouvernement", "s01-projet-manque", "s01-projet-logiciels"])
const ECHELLE = illustration("echelle-graphique")
const ROSE = illustration("rose-des-vents")

const T = ordered(
  {
    entreprises: V.said("Les entreprises forestières doivent"),
    partager: V.said("partager leurs données géographiques"),
    logiciels: V.said("utilisent des logiciels différents"),
    garde: V.said("garde donc son logiciel"),
    voient: V.said("voient de près ce problème"),
  },
  ID,
)

/** Durées de la spécification (secondes) : cartes, liaison, manque, fenêtres. */
const CARDS_WIPE = 0.3
const LINK_TRACE = 0.4
const GAP_WIPE = 0.25
const WINDOWS_WIPE = 0.4

const BOARDS = [
  { at: 0, on: "S01-1" },
  { at: T.entreprises, on: "S01-2" },
  { at: T.partager, on: "S01-3" },
  { at: T.logiciels, on: "S01-4" },
  { at: T.garde, on: "S01-5" },
  { at: T.voient, on: "S01-FIN" },
] as const

/** Une seule mise en évidence à la fois ; B (fondateurs) tient jusqu'à la fin. */
const FOCUS = [
  { at: 0, on: null },
  { at: T.garde, on: "logiciels" },
  { at: T.voient, on: "fondateurs" },
] as const

/** Boîte de balayage d'un groupe du SVG (boîte du groupe et marge, comme `Svg` du moteur) : le nom suit le même bord. */
function partBox(x: number, y: number, w: number, h: number): CSSProperties {
  const m = Math.max(8, 0.04 * Math.max(w, h))
  return { position: "absolute", left: x - m, top: y - m, width: w + 2 * m, height: h + 2 * m }
}

/** En-tête de cartouche d'une carte de rôle : Barlow 600, 24 px, capitales espacées, centré dans le bandeau. */
const ROLE: CSSProperties = { fontFamily: CAPS, fontWeight: 600, fontSize: 24, lineHeight: 1.2, letterSpacing: "0.32em", textTransform: "uppercase", color: C.encre, textAlign: "center", paddingLeft: "0.32em" }

/** Texte centré dans une boîte (x, y, w, h) en px de scène, ou relatif à `origin` si donné. */
function Centered({ x, y, w, h, origin, maxWidth, children, testId }: { readonly x: number; readonly y: number; readonly w: number; readonly h: number; readonly origin?: CSSProperties; readonly maxWidth?: number; readonly children: ReactNode; readonly testId?: string }) {
  const ox = typeof origin?.left === "number" ? origin.left : 0
  const oy = typeof origin?.top === "number" ? origin.top : 0
  return (
    <div data-testid={testId} style={{ position: "absolute", left: x - ox, top: y - oy, width: w, height: h, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ ...ROLE, maxWidth }}>{children}</div>
    </div>
  )
}

/** Mention de source en marge : calée par le bas à y 820, filet de 220 px dessus, réserve `fond`. */
function Source({ text, testId }: { readonly text: string; readonly testId: string }) {
  return (
    <div data-testid={testId} style={{ position: "absolute", left: 1448, bottom: 1080 - 820, width: 250 }}>
      <div aria-hidden="true" style={{ width: 220, height: 1.2, background: C.encre, marginBottom: 10 }} />
      <div style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 24, lineHeight: 1.2, color: C.lien, background: C.fond, padding: 2, margin: -2 }}>{text}</div>
    </div>
  )
}

const ENTREPRISES = partBox(170.4, 450.4, 369.2, 199.2)
const GOUVERNEMENT = partBox(980.4, 450.4, 399.2, 199.2)

function View() {
  const t = useT()
  const focus = focusAt(FOCUS, t)
  return (
    <SceneRoot id={ID} board={focusAt(BOARDS, t) ?? "S01-1"}>
      <Svg
        svg={PROJET}
        at={0}
        dur={0}
        parts={[
          { group: "s01-projet-entreprises", at: T.entreprises, dur: CARDS_WIPE, dir: "right" },
          { group: "s01-projet-gouvernement", at: T.entreprises, dur: CARDS_WIPE, dir: "right" },
          { group: "s01-projet-manque", at: T.partager + LINK_TRACE, dur: GAP_WIPE, dir: "right" },
          { group: "s01-projet-logiciels", at: T.logiciels, dur: WINDOWS_WIPE, dir: "right" },
        ]}
        style={{ position: "absolute", left: 100, top: 180, width: 1328, height: 680 }}
        testId={tid(ID, "projet")}
      />
      <Svg svg={ECHELLE} at={0} dur={0} style={{ position: "absolute", left: 1480, top: 96, width: 300, height: 34 }} testId={tid(ID, "echelle")} />
      <Svg svg={ROSE} at={0} dur={0} style={{ position: "absolute", left: 1712, top: 700, width: 116, height: 116 }} testId={tid(ID, "rose")} />

      {/* Liaison des entreprises vers le gouvernement, arrêtée sur le manque */}
      <svg aria-hidden="true" focusable="false" width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Trace points={[[546, 550], [730, 550]]} at={T.partager} dur={LINK_TRACE} color={C.encre} width={2.5} />
      </svg>

      {/* Nom de lieu du territoire, réserve `fond` */}
      <div data-testid={tid(ID, "territoire")} style={{ position: "absolute", left: 888, top: 768, padding: 2, background: C.fond, fontFamily: CAPS, fontWeight: 600, fontSize: 34, lineHeight: 1, letterSpacing: "0.3em", textTransform: "uppercase", color: C.encre, whiteSpace: "nowrap" }}>
        {X.screen(1)}
      </div>

      <Centered x={544} y={230} w={432} h={52} testId={tid(ID, "fondateurs")}>
        {X.screen(2)}
      </Centered>

      <Wipe at={T.entreprises} dur={CARDS_WIPE} dir="right" style={ENTREPRISES} testId={tid(ID, "entreprises")}>
        <Centered x={184} y={454} w={342} h={80} origin={ENTREPRISES} maxWidth={300}>
          {X.screen(3)}
        </Centered>
      </Wipe>
      <Wipe at={T.entreprises} dur={CARDS_WIPE} dir="right" style={GOUVERNEMENT} testId={tid(ID, "gouvernement")}>
        <Centered x={994} y={454} w={372} h={80} origin={GOUVERNEMENT} maxWidth={372}>
          {X.screen(4)}
        </Centered>
      </Wipe>

      <Source text={X.screen(5)} testId={tid(ID, "source")} />

      <Title text={X.screen(0)} at={T.garde} style={{ position: "absolute", left: 104, top: 84 }} testId={tid(ID, "title")} />

      <Highlight on={focus === "logiciels"} at={T.garde} style={{ position: "absolute", left: 170, top: 674, width: 370, height: 78 }} testId={tid(ID, "hl-logiciels")}>
        {null}
      </Highlight>
      <Highlight on={focus === "fondateurs"} at={T.voient} style={{ position: "absolute", left: 540, top: 226, width: 440, height: 190 }} testId={tid(ID, "hl-fondateurs")}>
        {null}
      </Highlight>
    </SceneRoot>
  )
}

export const s01 = defineScene({ id: ID, clip: V, View })
