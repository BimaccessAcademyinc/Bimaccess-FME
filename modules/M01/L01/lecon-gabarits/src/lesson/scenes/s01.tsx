/**
 * S01 · Chaque entreprise forestière garde son logiciel (scène narrée, clip S01-01).
 * Composition, états et instants : spécification du groupe a, section S01.
 *
 * Chaque élément arrive au début de la phrase qui le dit (première locution de
 * la phrase) ; deux éléments d'une même phrase s'enchaînent.
 *
 *   S01-1   image 0 : territoire et son nom, carte des fondateurs et leurs noms,
 *           mention de source (lien), échelle, rose ; zone du titre vide
 *   S01-2   « Les entreprises forestières doivent » : cartes des entreprises et du
 *           gouvernement balayées ensemble, avec leurs noms
 *   S01-3   même phrase, à la fin du balayage des cartes : la liaison se trace des
 *           entreprises vers le gouvernement, puis le manque or se balaie à son arrivée
 *   S01-4   « Or les entreprises utilisent » : les trois fenêtres
 *   S01-5   « Chaque entreprise garde donc » : titre tapé ; mise en évidence sur les fenêtres
 *   S01-FIN « Murray et Lutz voient » : la mise en évidence passe aux fondateurs
 *           et y reste (la question finale ne change rien à l'écran)
 * Suivant : libre à la fin de la narration.
 */
import { defineScene, focusAt, Highlight, illustration, ordered, SceneRoot, sceneTexts, Svg, THEME, tid, Title, Trace, useT, voice, Wipe } from "../../engine"
import { partBox, RESERVE, RoleName, Source, sourceHref } from "../components/s01-commun"

const ID = "S01"
const X = sceneTexts(ID, { screen: 6 })
const V = voice("S01-01")
const C = THEME.colors
const CAPS = THEME.fonts.capitales

const PROJET = illustration("s01-projet", ["s01-projet-entreprises", "s01-projet-gouvernement", "s01-projet-manque", "s01-projet-logiciels"])
const ECHELLE = illustration("echelle-graphique")
const ROSE = illustration("rose-des-vents")

const T = ordered(
  {
    entreprises: V.said("Les entreprises forestières doivent"),
    logiciels: V.said("Or les entreprises utilisent"),
    garde: V.said("Chaque entreprise garde donc"),
    voient: V.said("Murray et Lutz voient"),
  },
  ID,
)

/** Durées de la spécification (secondes) : cartes, liaison, manque, fenêtres. */
const CARDS_WIPE = 0.3
const LINK_TRACE = 0.4
const GAP_WIPE = 0.25
const WINDOWS_WIPE = 0.4

/** La liaison part à la fin du balayage des cartes, dans la phrase qui dit le partage. */
const LINK_AT = T.entreprises + CARDS_WIPE

const BOARDS = [
  { at: 0, on: "S01-1" },
  { at: T.entreprises, on: "S01-2" },
  { at: LINK_AT, on: "S01-3" },
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

const ENTREPRISES = partBox(150.4, 450.4, 409.2, 255.2)
const GOUVERNEMENT = partBox(990.4, 450.4, 409.2, 255.2)

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
          { group: "s01-projet-manque", at: LINK_AT + LINK_TRACE, dur: GAP_WIPE, dir: "right" },
          { group: "s01-projet-logiciels", at: T.logiciels, dur: WINDOWS_WIPE, dir: "right" },
        ]}
        style={{ position: "absolute", left: 100, top: 180, width: 1400, height: 690 }}
        testId={tid(ID, "projet")}
      />
      <Svg svg={ECHELLE} at={0} dur={0} style={{ position: "absolute", left: 1480, top: 96, width: 300, height: 34 }} testId={tid(ID, "echelle")} />
      <Svg svg={ROSE} at={0} dur={0} style={{ position: "absolute", left: 1712, top: 700, width: 116, height: 116 }} testId={tid(ID, "rose")} />

      {/* Liaison des entreprises vers le gouvernement, arrêtée sur le manque */}
      <svg aria-hidden="true" focusable="false" width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Trace points={[[566, 578], [742, 578]]} at={LINK_AT} dur={LINK_TRACE} color={C.encre} width={2.5} />
      </svg>

      {/* Nom de lieu du territoire, réserve `fond` */}
      <div data-testid={tid(ID, "territoire")} style={{ position: "absolute", right: 1920 - 1400, top: 788, ...RESERVE, fontFamily: CAPS, fontWeight: 600, fontSize: 38, lineHeight: 1, letterSpacing: "0.3em", textTransform: "uppercase", color: C.encre, whiteSpace: "nowrap" }}>
        {X.screen(1)}
      </div>

      <RoleName x={559} y={214} w={432} h={60} testId={tid(ID, "fondateurs")}>
        {X.screen(2)}
      </RoleName>

      <Wipe at={T.entreprises} dur={CARDS_WIPE} dir="right" style={ENTREPRISES} testId={tid(ID, "entreprises")}>
        <RoleName x={154} y={454} w={402} h={96} origin={ENTREPRISES} maxWidth={340}>
          {X.screen(3)}
        </RoleName>
      </Wipe>
      <Wipe at={T.entreprises} dur={CARDS_WIPE} dir="right" style={GOUVERNEMENT} testId={tid(ID, "gouvernement")}>
        <RoleName x={994} y={454} w={402} h={96} origin={GOUVERNEMENT} maxWidth={402}>
          {X.screen(4)}
        </RoleName>
      </Wipe>

      <Source href={sourceHref(ID)} testId={tid(ID, "source")}>
        {X.screen(5)}
      </Source>

      <Title text={X.screen(0)} at={T.garde} style={{ position: "absolute", left: 104, top: 84 }} testId={tid(ID, "title")} />

      <Highlight on={focus === "logiciels"} at={T.garde} style={{ position: "absolute", left: 150, top: 730, width: 410, height: 88 }} testId={tid(ID, "hl-logiciels")}>
        {null}
      </Highlight>
      <Highlight on={focus === "fondateurs"} at={T.voient} style={{ position: "absolute", left: 555, top: 210, width: 440, height: 220 }} testId={tid(ID, "hl-fondateurs")}>
        {null}
      </Highlight>
    </SceneRoot>
  )
}

export const s01 = defineScene({ id: ID, clip: V, View })
