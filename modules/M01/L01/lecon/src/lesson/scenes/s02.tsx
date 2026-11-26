/**
 * S02 · Safe Software commence par traduire vers SAIF (scène narrée, clip S02-01).
 * Composition, états et instants : spécification du groupe a, section S02.
 *
 *   S02-1   image 0 : fondateurs, feuille du contrat titrée, frise à bout ouvert,
 *           mention de source, échelle, rose ; zone du titre vide
 *   S02-2   « remportent le contrat » : la rubrique se balaie, « Appel d'offres remporté » se tape
 *   S02-3   « fondée en 1993 » : jalon 1993 tracé, puis son libellé tapé
 *   S02-4   « Le gouvernement a son format » : feuille SAIF et son nom
 *   S02-5   « les données de chaque logiciel » : les trois fenêtres
 *   S02-6   « doivent être traduites » : routes de traduction tracées, pointes, puis « Traduction » tapé
 *   S02-7   « Murray et Lutz commencent par ce travail » : titre tapé
 *   S02-8   « une technologie de traduction pour SAIF » : mise en évidence A (routes et étiquette)
 *   S02-9   « en 1996 » : jalon 1996 tracé, cases des années, puis son libellé tapé
 *   S02-10  « à l'origine Feature Manipulation Engine » : le nom d'origine se tape
 *   S02-11  « fait passer les données géographiques » : mise en évidence B (1996 et son nom)
 *   S02-FIN « Son siège est à Surrey » : mise en évidence éteinte ; carte de lieu
 * Suivant : libre à la fin de la narration.
 *
 * Routes de traduction : route d'écriture (rouge `ecriture`), décision de
 * l'orchestrateur (point ouvert 2 de la spécification, à confirmer par Ilyas).
 */
import type { CSSProperties } from "react"
import { defineScene, focusAt, Highlight, illustration, ordered, SceneRoot, sceneTexts, Svg, THEME, tid, Title, Trace, TypeText, useT, voice, Wipe } from "../../engine"
import { partBox, RESERVE, RoleName, Source } from "../components/s01-commun"
import { Route } from "../components/s02-route"

const ID = "S02"
const X = sceneTexts(ID, { screen: 11 })
const V = voice("S02-01")
const C = THEME.colors
const SERIF = THEME.fonts.serif
const CAPS = THEME.fonts.capitales

const FRISE = illustration("s02-frise", ["s02-frise-rubrique", "s02-frise-saif", "s02-frise-logiciels", "s02-frise-pointes", "s02-frise-annees", "s02-frise-lieu"])
const ECHELLE = illustration("echelle-graphique")
const ROSE = illustration("rose-des-vents")

const T = ordered(
  {
    contrat: V.said("remportent le contrat"),
    fondee: V.said("fondée en 1993"),
    format: V.said("Le gouvernement a son format"),
    logiciels: V.said("les données de chaque logiciel"),
    traduites: V.said("doivent être traduites"),
    commencent: V.said("Murray et Lutz commencent par ce travail"),
    technologie: V.said("une technologie de traduction pour SAIF"),
    en1996: V.said("en 1996"),
    origine: V.said("à l'origine Feature Manipulation Engine"),
    passer: V.said("fait passer les données géographiques"),
    siege: V.said("Son siège est à Surrey"),
  },
  ID,
)

/** Durées de la spécification (secondes). */
const RUBRIQUE_WIPE = 0.25
const JALON_TRACE = 0.25
const SHEET_WIPE = 0.3
const ROUTE_TRACE = 0.4
/** Pointes de sens balayées à l'arrivée des routes (durée non donnée par la spécification : celle de la pointe de `Trace`). */
const POINTES_WIPE = 0.15

const BOARDS = [
  { at: 0, on: "S02-1" },
  { at: T.contrat, on: "S02-2" },
  { at: T.fondee, on: "S02-3" },
  { at: T.format, on: "S02-4" },
  { at: T.logiciels, on: "S02-5" },
  { at: T.traduites, on: "S02-6" },
  { at: T.commencent, on: "S02-7" },
  { at: T.technologie, on: "S02-8" },
  { at: T.en1996, on: "S02-9" },
  { at: T.origine, on: "S02-10" },
  { at: T.passer, on: "S02-11" },
  { at: T.siege, on: "S02-FIN" },
] as const

/** Une seule mise en évidence à la fois ; aucune à la fin (la carte de lieu est un sujet à part). */
const FOCUS = [
  { at: 0, on: null },
  { at: T.technologie, on: "traduction" },
  { at: T.passer, on: "fme" },
  { at: T.siege, on: null },
] as const

/** Routes de traduction, des fenêtres vers SAIF. */
const ROUTES = [
  [[748, 260], [870, 260], [914, 304], [1028, 304]],
  [[748, 350], [1028, 350]],
  [[748, 440], [870, 440], [914, 396], [1028, 396]],
] as const

/** Enchaînements sur une même locution : le geste suivant part à la fin du précédent. */
const AT = {
  rubriqueText: T.contrat + RUBRIQUE_WIPE,
  label1993: T.fondee + JALON_TRACE,
  pointes: T.traduites + ROUTE_TRACE,
  traduction: T.traduites + ROUTE_TRACE + POINTES_WIPE,
  annees: T.en1996 + JALON_TRACE,
  label1996: T.en1996 + JALON_TRACE + SHEET_WIPE,
} as const

const SAIF_BOX = partBox(1060.4, 280.4, 189.2, 139.2)
const LIEU_BOX = partBox(1100.4, 736.4, 299.2, 83.2)

/** Ligne de rubrique : serif 400, 28 px, interligne 1,25, encre. */
const RUBRIQUE: CSSProperties = { fontFamily: SERIF, fontWeight: 400, fontSize: 28, lineHeight: 1.25, color: C.encre }

/** Libellé de jalon aligné à droite sur `x`, haut à y 576, réserve `fond`. */
function Jalon({ x, maxWidth, text, at, testId }: { readonly x: number; readonly maxWidth: number; readonly text: string; readonly at: number; readonly testId: string }) {
  return (
    <div style={{ position: "absolute", right: 1920 - x - 2, top: 574, width: maxWidth + 4, display: "flex", justifyContent: "flex-end" }}>
      <div style={{ ...RUBRIQUE, ...RESERVE, textAlign: "right" }}>
        <TypeText text={text} at={at} testId={testId} />
      </div>
    </div>
  )
}

function View() {
  const t = useT()
  const focus = focusAt(FOCUS, t)
  return (
    <SceneRoot id={ID} board={focusAt(BOARDS, t) ?? "S02-1"}>
      {/* Routes sous l'illustration : les pointes de sens couvrent le bout rond de chaque route */}
      <svg aria-hidden="true" focusable="false" width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {ROUTES.map((points, i) => (
          <Route key={i} points={points} at={T.traduites} dur={ROUTE_TRACE} />
        ))}
      </svg>
      <Svg
        svg={FRISE}
        at={0}
        dur={0}
        parts={[
          { group: "s02-frise-rubrique", at: T.contrat, dur: RUBRIQUE_WIPE, dir: "down" },
          { group: "s02-frise-saif", at: T.format, dur: SHEET_WIPE, dir: "right" },
          { group: "s02-frise-logiciels", at: T.logiciels, dur: SHEET_WIPE, dir: "down" },
          { group: "s02-frise-pointes", at: AT.pointes, dur: POINTES_WIPE, dir: "right" },
          { group: "s02-frise-annees", at: AT.annees, dur: SHEET_WIPE, dir: "right" },
          { group: "s02-frise-lieu", at: T.siege, dur: SHEET_WIPE, dir: "right" },
        ]}
        style={{ position: "absolute", left: 100, top: 180, width: 1328, height: 680 }}
        testId={tid(ID, "frise")}
      />
      <Svg svg={ECHELLE} at={0} dur={0} style={{ position: "absolute", left: 1480, top: 96, width: 300, height: 34 }} testId={tid(ID, "echelle")} />
      <Svg svg={ROSE} at={0} dur={0} style={{ position: "absolute", left: 1712, top: 700, width: 116, height: 116 }} testId={tid(ID, "rose")} />

      {/* Jalons tracés de haut en bas, au-dessus de la frise et des cases des années */}
      <svg aria-hidden="true" focusable="false" width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Trace points={[[900, 514], [900, 566]]} at={T.fondee} dur={JALON_TRACE} color={C.encre} width={2} />
        <Trace points={[[1350, 514], [1350, 566]]} at={T.en1996} dur={JALON_TRACE} color={C.encre} width={2} />
      </svg>

      <RoleName x={108} y={230} w={432} h={52} testId={tid(ID, "fondateurs")}>
        {X.screen(2)}
      </RoleName>

      <div data-testid={tid(ID, "contrat")} style={{ position: "absolute", left: 124, top: 468, fontFamily: SERIF, fontWeight: 600, fontSize: 30, lineHeight: 1.15, color: C.encre, whiteSpace: "nowrap" }}>
        {X.screen(1)}
      </div>
      <div style={{ ...RUBRIQUE, position: "absolute", left: 124, top: 540, whiteSpace: "nowrap" }}>
        <TypeText text={X.screen(3)} at={AT.rubriqueText} testId={tid(ID, "rubrique")} />
      </div>

      <Jalon x={900} maxWidth={230} text={X.screen(4)} at={AT.label1993} testId={tid(ID, "jalon-1993")} />

      <Wipe at={T.format} dur={SHEET_WIPE} dir="right" style={SAIF_BOX} testId={tid(ID, "saif")}>
        <div style={{ position: "absolute", left: 1064 - SAIF_BOX.left, top: 284 - SAIF_BOX.top, width: 182, height: 56, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: CAPS, fontWeight: 600, fontSize: 34, lineHeight: 1, letterSpacing: "0.3em", paddingLeft: "0.3em", textTransform: "uppercase", color: C.terme }}>{X.screen(5)}</div>
        </div>
      </Wipe>

      <div style={{ position: "absolute", left: 788, top: 192, ...RESERVE, fontFamily: CAPS, fontWeight: 600, fontSize: 26, lineHeight: 1.2, letterSpacing: "0.24em", textTransform: "uppercase", color: C.encre, whiteSpace: "nowrap" }}>
        <TypeText text={X.screen(6)} at={AT.traduction} testId={tid(ID, "traduction")} />
      </div>

      <Jalon x={1350} maxWidth={320} text={X.screen(7)} at={AT.label1996} testId={tid(ID, "jalon-1996")} />

      <div lang="en" style={{ position: "absolute", right: 1920 - 1350 - 2, top: 644, ...RUBRIQUE, ...RESERVE, fontStyle: "italic", whiteSpace: "nowrap" }}>
        <TypeText text={X.screen(8)} at={T.origine} testId={tid(ID, "nom-origine")} />
      </div>

      <Wipe at={T.siege} dur={SHEET_WIPE} dir="right" style={LIEU_BOX} testId={tid(ID, "lieu")}>
        <div style={{ position: "absolute", left: 1166 - LIEU_BOX.left, top: 760 - LIEU_BOX.top, fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 30, lineHeight: 1.2, color: C.encre, whiteSpace: "nowrap" }}>{X.screen(9)}</div>
      </Wipe>

      <Source testId={tid(ID, "source")}>{X.screen(10)}</Source>

      <Title text={X.screen(0)} at={T.commencent} style={{ position: "absolute", left: 104, top: 84 }} testId={tid(ID, "title")} />

      <Highlight on={focus === "traduction"} at={T.technologie} style={{ position: "absolute", left: 754, top: 194, width: 292, height: 252 }} testId={tid(ID, "hl-traduction")}>
        {null}
      </Highlight>
      <Highlight on={focus === "fme"} at={T.passer} style={{ position: "absolute", left: 983, top: 576, width: 367, height: 105 }} testId={tid(ID, "hl-fme")}>
        {null}
      </Highlight>
    </SceneRoot>
  )
}

export const s02 = defineScene({ id: ID, clip: V, View })
