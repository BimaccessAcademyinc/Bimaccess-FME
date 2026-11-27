/**
 * S02 · Safe Software commence par traduire vers SAIF (scène narrée, clip S02-01).
 * Composition, états et instants : spécification du groupe a, section S02.
 *
 * Chaque élément arrive au début de la phrase qui le dit (première locution de
 * la phrase) ; plusieurs éléments d'une même phrase s'enchaînent, le suivant
 * partant à la fin du geste du précédent.
 *
 *   S02-1   image 0 : fondateurs, feuille du contrat titrée, frise à bout ouvert,
 *           mention de source (lien), échelle, rose ; zone du titre vide
 *   S02-2   « Le gouvernement lance » : la rubrique se balaie, « Appel d'offres remporté » se tape
 *   S02-3   « De ce contrat naît » : jalon 1993 tracé, puis son libellé tapé
 *   S02-4   « Le gouvernement a son format » : feuille SAIF et son nom
 *   S02-5   « Pour échanger avec lui » : les trois fenêtres
 *   S02-6   même phrase, à la fin des fenêtres : routes de traduction tracées, pointes,
 *           puis « Traduction » tapé
 *   S02-7   « Murray et Lutz commencent par ce travail » : titre tapé
 *   S02-8   même phrase, à la fin de la frappe du titre : mise en évidence A (routes et étiquette)
 *   S02-9   « Trois ans après la fondation » : jalon 1996 tracé, cases des années, puis son libellé tapé
 *   S02-10  « la première version de son logiciel » : le logo « FME by Safe Software » se balaie sous le jalon 1996
 *   S02-11  « à l'origine Feature Manipulation Engine » : le nom d'origine se tape sous le logo
 *   S02-12  « FME fait passer » : mise en évidence B (1996, logo et nom d'origine)
 *   S02-FIN « Son siège est à Surrey » : mise en évidence éteinte ; carte de lieu
 * Suivant : libre à la fin de la narration.
 *
 * Routes de traduction : route d'écriture (rouge `ecriture`), gardée par Ilyas
 * à la porte du sens (2026-11-26).
 */
import type { CSSProperties } from "react"
import { defineScene, focusAt, Highlight, illustration, ordered, SceneRoot, sceneTexts, Svg, THEME, tid, Title, Trace, TypeText, typedUntil, useT, voice, Wipe } from "../../engine"
import { partBox, RESERVE, RoleName, Source, sourceHref } from "../components/s01-commun"
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
/** Logo d'origine, jamais recoloré ni déformé (220 px de large, rapport 216 × 103,7). */
const LOGO = illustration("fme-logo")

/** Une locution par phrase : la première de la phrase qui dit l'élément. */
const T = ordered(
  {
    contrat: V.said("Le gouvernement lance"),
    fondee: V.said("De ce contrat naît"),
    format: V.said("Le gouvernement a son format"),
    echanger: V.said("Pour échanger avec lui"),
    commencent: V.said("Murray et Lutz commencent par ce travail"),
    trois: V.said("Trois ans après la fondation"),
    logiciel: V.said("la première version de son logiciel"),
    origine: V.said("à l'origine Feature Manipulation Engine"),
    passer: V.said("FME fait passer"),
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

/** Enchaînements dans une même phrase : le geste suivant part à la fin du précédent. */
const ROUTES_AT = T.echanger + SHEET_WIPE
const LABEL_1996_AT = T.trois + JALON_TRACE + SHEET_WIPE
const AT = ordered(
  {
    rubriqueText: T.contrat + RUBRIQUE_WIPE,
    label1993: T.fondee + JALON_TRACE,
    routes: ROUTES_AT,
    pointes: ROUTES_AT + ROUTE_TRACE,
    traduction: ROUTES_AT + ROUTE_TRACE + POINTES_WIPE,
    hlTraduction: typedUntil(X.screen(0), T.commencent),
    annees: T.trois + JALON_TRACE,
    label1996: LABEL_1996_AT,
  },
  `${ID} (enchaînements)`,
)

const BOARDS = [
  { at: 0, on: "S02-1" },
  { at: T.contrat, on: "S02-2" },
  { at: T.fondee, on: "S02-3" },
  { at: T.format, on: "S02-4" },
  { at: T.echanger, on: "S02-5" },
  { at: AT.routes, on: "S02-6" },
  { at: T.commencent, on: "S02-7" },
  { at: AT.hlTraduction, on: "S02-8" },
  { at: T.trois, on: "S02-9" },
  { at: T.logiciel, on: "S02-10" },
  { at: T.origine, on: "S02-11" },
  { at: T.passer, on: "S02-12" },
  { at: T.siege, on: "S02-FIN" },
] as const

/** Une seule mise en évidence à la fois ; aucune à la fin (la carte de lieu est un sujet à part). */
const FOCUS = [
  { at: 0, on: null },
  { at: AT.hlTraduction, on: "traduction" },
  { at: T.passer, on: "fme" },
  { at: T.siege, on: null },
] as const

/** Routes de traduction, des fenêtres vers SAIF. */
const ROUTES = [
  [[802, 270], [930, 270], [984, 324], [1080, 324]],
  [[802, 368], [1080, 368]],
  [[802, 466], [930, 466], [984, 412], [1080, 412]],
] as const

const SAIF_BOX = partBox(1110.4, 268.4, 259.2, 211.2)
const LIEU_BOX = partBox(560.4, 770.4, 319.2, 85.2)

/** Ligne de rubrique : serif 400, 30 px (agrandie depuis 28 px avec la composition), interligne 1,25, encre. */
const RUBRIQUE: CSSProperties = { fontFamily: SERIF, fontWeight: 400, fontSize: 30, lineHeight: 1.25, color: C.encre }

/** Libellé de jalon aligné à droite sur `x`, haut à y 609, interligne 1,15, réserve `fond`. */
function Jalon({ x, maxWidth, text, at, testId }: { readonly x: number; readonly maxWidth: number; readonly text: string; readonly at: number; readonly testId: string }) {
  return (
    <div style={{ position: "absolute", right: 1920 - x - 2, top: 607, width: maxWidth + 4, display: "flex", justifyContent: "flex-end" }}>
      <div style={{ ...RUBRIQUE, lineHeight: 1.15, ...RESERVE, textAlign: "right" }}>
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
          <Route key={i} points={points} at={AT.routes} dur={ROUTE_TRACE} />
        ))}
      </svg>
      <Svg
        svg={FRISE}
        at={0}
        dur={0}
        parts={[
          { group: "s02-frise-rubrique", at: T.contrat, dur: RUBRIQUE_WIPE, dir: "down" },
          { group: "s02-frise-saif", at: T.format, dur: SHEET_WIPE, dir: "right" },
          { group: "s02-frise-logiciels", at: T.echanger, dur: SHEET_WIPE, dir: "down" },
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
        <Trace points={[[900, 555], [900, 601]]} at={T.fondee} dur={JALON_TRACE} color={C.encre} width={2.5} />
        <Trace points={[[1350, 555], [1350, 601]]} at={T.trois} dur={JALON_TRACE} color={C.encre} width={2.5} />
      </svg>

      <RoleName x={108} y={214} w={432} h={60} testId={tid(ID, "fondateurs")}>
        {X.screen(2)}
      </RoleName>

      <div data-testid={tid(ID, "contrat")} style={{ position: "absolute", left: 128, top: 474, fontFamily: SERIF, fontWeight: 600, fontSize: 32, lineHeight: 1.15, color: C.encre, whiteSpace: "nowrap" }}>
        {X.screen(1)}
      </div>
      <div style={{ ...RUBRIQUE, position: "absolute", left: 128, top: 596, whiteSpace: "nowrap" }}>
        <TypeText text={X.screen(3)} at={AT.rubriqueText} testId={tid(ID, "rubrique")} />
      </div>

      <Jalon x={900} maxWidth={250} text={X.screen(4)} at={AT.label1993} testId={tid(ID, "jalon-1993")} />

      <Wipe at={T.format} dur={SHEET_WIPE} dir="right" style={SAIF_BOX} testId={tid(ID, "saif")}>
        <div style={{ position: "absolute", left: 1114 - SAIF_BOX.left, top: 272 - SAIF_BOX.top, width: 252, height: 70, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ fontFamily: CAPS, fontWeight: 600, fontSize: 40, lineHeight: 1, letterSpacing: "0.3em", paddingLeft: "0.3em", textTransform: "uppercase", color: C.terme }}>{X.screen(5)}</div>
        </div>
      </Wipe>

      <div style={{ position: "absolute", left: 845, top: 188, ...RESERVE, fontFamily: CAPS, fontWeight: 600, fontSize: 28, lineHeight: 1.2, letterSpacing: "0.24em", textTransform: "uppercase", color: C.encre, whiteSpace: "nowrap" }}>
        <TypeText text={X.screen(6)} at={AT.traduction} testId={tid(ID, "traduction")} />
      </div>

      <Jalon x={1350} maxWidth={350} text={X.screen(7)} at={AT.label1996} testId={tid(ID, "jalon-1996")} />

      <Svg svg={LOGO} at={T.logiciel} dur={SHEET_WIPE} dir="right" style={{ position: "absolute", left: 1130, top: 690, width: 220, height: 106 }} testId={tid(ID, "logo")} />

      <div lang="en" style={{ position: "absolute", right: 1920 - 1350 - 2, top: 804, ...RUBRIQUE, ...RESERVE, fontStyle: "italic", whiteSpace: "nowrap" }}>
        <TypeText text={X.screen(8)} at={T.origine} testId={tid(ID, "nom-origine")} />
      </div>

      <Wipe at={T.siege} dur={SHEET_WIPE} dir="right" style={LIEU_BOX} testId={tid(ID, "lieu")}>
        <div style={{ position: "absolute", left: 628 - LIEU_BOX.left, top: 793 - LIEU_BOX.top, fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 32, lineHeight: 1.2, color: C.encre, whiteSpace: "nowrap" }}>{X.screen(9)}</div>
      </Wipe>

      <Source href={sourceHref(ID)} testId={tid(ID, "source")}>
        {X.screen(10)}
      </Source>

      <Title text={X.screen(0)} at={T.commencent} style={{ position: "absolute", left: 104, top: 84 }} testId={tid(ID, "title")} />

      <Highlight on={focus === "traduction"} at={AT.hlTraduction} style={{ position: "absolute", left: 808, top: 188, width: 288, height: 285 }} testId={tid(ID, "hl-traduction")}>
        {null}
      </Highlight>
      <Highlight on={focus === "fme"} at={T.passer} style={{ position: "absolute", left: 957, top: 599, width: 393, height: 253 }} testId={tid(ID, "hl-fme")}>
        {null}
      </Highlight>
    </SceneRoot>
  )
}

export const s02 = defineScene({ id: ID, clip: V, View })
