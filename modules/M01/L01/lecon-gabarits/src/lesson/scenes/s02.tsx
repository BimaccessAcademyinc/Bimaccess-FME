/**
 * S02 · Safe Software commence par traduire vers SAIF (scène narrée, clip S02-01).
 * Composition, états et instants : spécification, section S02 (essai
 * « illustrations commandées » : illustrations `s02-ill-*`, tracés au code).
 *
 * Chaque élément arrive au début de la phrase qui le dit ; les éléments d'une
 * même phrase s'enchaînent, le suivant partant à la fin du geste du précédent
 * (instant de la locution + durées de la spécification) ; les mises en
 * évidence suivent les mots de la voix.
 *
 *   S02-1   image 0 : carte des fondateurs et leurs noms, contrat titré au corps
 *           vide, frise à bout ouvert partant du contrat, mention de source,
 *           échelle, rose ; zone du titre vide
 *   S02-2   « Le gouvernement lance » : « Appel d'offres remporté » tapé, puis le sceau
 *           balayé de haut en bas
 *   S02-3   « De ce contrat naît » : jalon 1993 tracé, puis son libellé tapé
 *   S02-4   « Le gouvernement a son format » : feuille SAIF et son nom, même balayage
 *   S02-5   « Pour échanger avec lui » : fenêtres, routes de traduction, pointes,
 *           puis « Traduction » balayé
 *   S02-6   « Murray et Lutz commencent par ce travail » : titre tapé
 *   S02-7   « une technologie de traduction pour SAIF » : mise en évidence sur « Traduction »
 *   S02-8   « Trois ans après la fondation » : mise en évidence éteinte ; jalon 1996,
 *           cases des années, libellé, logo, nom d'origine
 *   S02-9   « la première version de son logiciel » : mise en évidence sur le libellé 1996
 *   S02-10  « à l'origine Feature Manipulation Engine » : sur le nom d'origine
 *   S02-11  « FME fait passer » : sur le logo
 *   S02-FIN « Son siège est à Surrey » : mise en évidence éteinte ; carte de lieu, puis
 *           « Siège : Surrey » tapé (composition finale)
 * Suivant : libre à la fin de la narration.
 *
 * Routes de traduction : routes d'écriture (axe `ecriture`), gardées par Ilyas à
 * la porte du sens (2026-11-26) ; bouts nets, puisqu'elles finissent sur la
 * fenêtre et sur la base de leur pointe.
 */
import { defineScene, focusAt, getLength, Highlight, illustration, ordered, type Point, SceneRoot, sceneTexts, Svg, THEME, tid, Title, Trace, TypeText, typedUntil, useT, voice, Wipe } from "../../engine"
import { Source, sourceHref } from "../components/s01-commun"
import { poser, RESERVE_CARTE, Texte } from "../components/s02-s04-commun"

const ID = "S02"
const X = sceneTexts(ID, { screen: 11 })
const V = voice("S02-01")
const C = THEME.colors
const SERIF = THEME.fonts.serif
const CAPS = THEME.fonts.capitales

const FONDATEURS = illustration("s02-ill-fondateurs")
const CONTRAT = illustration("s02-ill-contrat")
const SCEAU = illustration("s02-ill-sceau")
const LOGICIELS = illustration("s02-ill-logiciels")
const SAIF = illustration("s02-ill-saif")
const LIEU = illustration("s02-ill-lieu")
/** Logo d'origine, jamais recoloré ni déformé, une seule fois à l'écran. */
const LOGO = illustration("fme-logo")
const ECHELLE = illustration("echelle-graphique")
const ROSE = illustration("rose-des-vents")

/** Places de la spécification (x, y, largeur ; hauteur tirée du viewBox). */
const B = {
  fondateurs: poser(FONDATEURS, 104, 186, 332),
  contrat: poser(CONTRAT, 104, 410, 332),
  sceau: poser(SCEAU, 276, 684, 140),
  logiciels: poser(LOGICIELS, 482, 274.5, 110),
  saif: poser(SAIF, 800, 247, 204),
  lieu: poser(LIEU, 1124, 196, 300),
  logo: poser(LOGO, 1040, 704, 190),
  echelle: poser(ECHELLE, 1480, 84, 300),
  rose: poser(ROSE, 1712, 700, 116),
} as const

/** Une locution par étape : la première de la phrase qui dit l'élément, ou les mots que désigne la mise en évidence. */
const T = ordered(
  {
    contrat: V.said("Le gouvernement lance"),
    fondee: V.said("De ce contrat naît"),
    format: V.said("Le gouvernement a son format"),
    echanger: V.said("Pour échanger avec lui"),
    commencent: V.said("Murray et Lutz commencent par ce travail"),
    technologie: V.said("une technologie de traduction pour SAIF"),
    trois: V.said("Trois ans après la fondation"),
    premiere: V.said("la première version de son logiciel"),
    origine: V.said("à l'origine Feature Manipulation Engine"),
    passer: V.said("FME fait passer"),
    siege: V.said("Son siège est à Surrey"),
  },
  ID,
)

/** Durées de la spécification (secondes). */
const SCEAU_WIPE = 0.3
const JALON_TRACE = 0.25
const SAIF_WIPE = 0.4
const FENETRES_WIPE = 0.4
const ROUTE_TRACE = 0.4
const POINTE_TRACE = 0.1
const TRADUCTION_WIPE = 0.3
const CASES_TRACE = 0.45
const LOGO_WIPE = 0.3
const LIEU_WIPE = 0.4

/** Frise : trait de 3 px du bord droit du contrat au bout ouvert, puis pointe pleine (sans jalon). */
const FRISE: readonly Point[] = [
  [436, 580],
  [1406, 580],
]
const FRISE_POINTE = "M1406 571 L1424 580 L1406 589 Z"
const JALON_1993: readonly Point[] = [
  [462, 560],
  [462, 600],
]
const JALON_1996: readonly Point[] = [
  [1024, 560],
  [1024, 600],
]
/** Cases des années, entre les deux jalons : couche A `encre` 14 px, couche B (case du milieu) `papier` 10 px. */
const CASES_A: readonly Point[] = [
  [462, 580],
  [1024, 580],
]
const CASES_B: readonly Point[] = [
  [649, 580],
  [837, 580],
]
const ligne = (pts: readonly Point[]): string => pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ")
/** Même vitesse pour les deux couches : durée proportionnelle à la longueur ; B part quand A atteint x 649. */
const CASES_VITESSE = getLength(ligne(CASES_A)) / CASES_TRACE
const CASES_B_RETARD = getLength(ligne([CASES_A[0] ?? [0, 0], CASES_B[0] ?? [0, 0]])) / CASES_VITESSE
const CASES_B_TRACE = getLength(ligne(CASES_B)) / CASES_VITESSE

/** Routes de traduction : du bord droit des fenêtres (x 591,5) à la base de la pointe (x 786), une par fenêtre. */
const ROUTES_Y = [318, 418, 517] as const
const ROUTE_X0 = 591.5
const ROUTE_X1 = 786
/** Route d'écriture : trois traits superposés, même chemin, même instant, même durée. */
const ROUTE_COUCHES = [
  { key: "bord", color: C.encre, width: 11 },
  { key: "chaussee", color: C.chaussee, width: 8 },
  { key: "axe", color: C.ecriture, width: 4 },
] as const
/** Pointe de sens : (786, y − 10), (800, y), (786, y + 10), la pointe touche le bord gauche de SAIF. */
const pointe = (y: number): string => `M${ROUTE_X1} ${y - 10} L800 ${y} L${ROUTE_X1} ${y + 10} Z`

/** Enchaînements dans une phrase ; chaque fin de geste est contrôlée avant l'étape suivante. */
const SCEAU_AT = typedUntil(X.screen(3), T.contrat)
const LABEL_1993_AT = T.fondee + JALON_TRACE
const ROUTES_AT = T.echanger + FENETRES_WIPE
const POINTES_AT = ROUTES_AT + ROUTE_TRACE
const TRADUCTION_AT = POINTES_AT + POINTE_TRACE
const CASES_AT = T.trois + JALON_TRACE
const LABEL_1996_AT = CASES_AT + CASES_TRACE
const LOGO_AT = typedUntil(X.screen(7), LABEL_1996_AT)
const NOM_AT = LOGO_AT + LOGO_WIPE
const TOPONYME_AT = T.siege + LIEU_WIPE
ordered(
  {
    contrat: T.contrat,
    sceauFin: SCEAU_AT + SCEAU_WIPE,
    fondee: T.fondee,
    label1993Fin: typedUntil(X.screen(4), LABEL_1993_AT),
    format: T.format,
    echanger: T.echanger,
    traductionFin: TRADUCTION_AT + TRADUCTION_WIPE,
    commencent: T.commencent,
    titreFin: typedUntil(X.screen(0), T.commencent),
    technologie: T.technologie,
    trois: T.trois,
    nomFin: typedUntil(X.screen(8), NOM_AT),
    premiere: T.premiere,
  },
  `${ID} (enchaînements)`,
)

const BOARDS = [
  { at: 0, on: "S02-1" },
  { at: T.contrat, on: "S02-2" },
  { at: T.fondee, on: "S02-3" },
  { at: T.format, on: "S02-4" },
  { at: T.echanger, on: "S02-5" },
  { at: T.commencent, on: "S02-6" },
  { at: T.technologie, on: "S02-7" },
  { at: T.trois, on: "S02-8" },
  { at: T.premiere, on: "S02-9" },
  { at: T.origine, on: "S02-10" },
  { at: T.passer, on: "S02-11" },
  { at: T.siege, on: "S02-FIN" },
] as const

/** Une seule mise en évidence à la fois ; aucune à la fin (la carte de lieu est un sujet à part). */
const FOCUS = [
  { at: 0, on: null },
  { at: T.technologie, on: "traduction" },
  { at: T.trois, on: null },
  { at: T.premiere, on: "jalon1996" },
  { at: T.origine, on: "nom" },
  { at: T.passer, on: "logo" },
  { at: T.siege, on: null },
] as const

/** Rectangles de la spécification (le tireté passe sur leur bord) et instant de leur tracé. */
const HL = [
  { key: "traduction", at: T.technologie, left: 597, top: 252, width: 198, height: 50 },
  { key: "jalon1996", at: T.premiere, left: 1030, top: 598, width: 241, height: 89 },
  { key: "nom", at: T.origine, left: 1030, top: 805, width: 384, height: 52 },
  { key: "logo", at: T.passer, left: 1030, top: 694, width: 210, height: 111 },
] as const

/** Styles de texte de la spécification. */
const LIBELLE = { fontFamily: SERIF, fontWeight: 400, fontSize: 30, lineHeight: 1.15, color: C.encre } as const
const RUBRIQUE = { fontFamily: SERIF, fontWeight: 400, fontSize: 28, lineHeight: 1.25, color: C.encre } as const
const capitales = (size: number, track: number, color: string) => ({ fontFamily: CAPS, fontWeight: 600, fontSize: size, lineHeight: 1.2, letterSpacing: `${track}em`, textTransform: "uppercase", color }) as const

function View() {
  const t = useT()
  const focus = focusAt(FOCUS, t)
  return (
    <SceneRoot id={ID} board={focusAt(BOARDS, t) ?? "S02-1"}>
      {/* Illustrations, chacune à sa place ; décor de l'image 0 en at={0} dur={0} */}
      <Svg svg={FONDATEURS} at={0} dur={0} style={B.fondateurs} testId={tid(ID, "fondateurs")} />
      <Svg svg={CONTRAT} at={0} dur={0} style={B.contrat} testId={tid(ID, "contrat")} />
      <Svg svg={SCEAU} at={SCEAU_AT} dur={SCEAU_WIPE} dir="down" style={B.sceau} testId={tid(ID, "sceau")} />
      <Svg svg={SAIF} at={T.format} dur={SAIF_WIPE} dir="right" style={B.saif} testId={tid(ID, "saif")} />
      {/* Les fenêtres n'ont pas d'aplat entre elles : réserve `fond` sous l'illustration, pour que l'amorce (502, 464) ne touche pas la fenêtre 2 */}
      <Svg svg={LOGICIELS} at={T.echanger} dur={FENETRES_WIPE} dir="down" style={{ ...B.logiciels, background: C.fond }} testId={tid(ID, "logiciels")} />
      <Svg svg={LOGO} at={LOGO_AT} dur={LOGO_WIPE} dir="right" style={B.logo} testId={tid(ID, "logo")} />
      <Svg svg={LIEU} at={T.siege} dur={LIEU_WIPE} dir="right" style={B.lieu} testId={tid(ID, "lieu")} />
      <Svg svg={ECHELLE} at={0} dur={0} style={B.echelle} testId={tid(ID, "echelle")} />
      <Svg svg={ROSE} at={0} dur={0} style={B.rose} testId={tid(ID, "rose")} />

      {/* Tracés du code, dans l'ordre de pose : frise et cases, jalons, routes, pointes */}
      <svg aria-hidden="true" focusable="false" width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Trace points={FRISE} at={0} dur={0} color={C.encre} width={3} />
        <Trace d={FRISE_POINTE} at={0} dur={0} color={C.encre} width={1} fill={C.encre} />
        <Trace points={CASES_A} at={CASES_AT} dur={CASES_TRACE} color={C.encre} width={14} />
        <Trace points={CASES_B} at={CASES_AT + CASES_B_RETARD} dur={CASES_B_TRACE} color={C.papier} width={10} />
        <Trace points={JALON_1993} at={T.fondee} dur={JALON_TRACE} color={C.encre} width={2.5} />
        <Trace points={JALON_1996} at={T.trois} dur={JALON_TRACE} color={C.encre} width={2.5} />
        {ROUTES_Y.flatMap((y) =>
          ROUTE_COUCHES.map((c) => (
            <Trace
              key={`${y}-${c.key}`}
              points={[
                [ROUTE_X0, y],
                [ROUTE_X1, y],
              ]}
              at={ROUTES_AT}
              dur={ROUTE_TRACE}
              color={c.color}
              width={c.width}
            />
          )),
        )}
        {ROUTES_Y.map((y) => (
          <Trace key={`pointe-${y}`} d={pointe(y)} at={POINTES_AT} dur={POINTE_TRACE} color={C.encre} width={2} fill={C.ecriture} />
        ))}
      </svg>

      {/* Textes et leurs réserves */}
      <Texte cx={270} y={194} at={0} reserve={RESERVE_CARTE} track={0.16} style={capitales(24, 0.16, C.encre)} testId={tid(ID, "fondateurs-nom")}>
        {X.screen(2)}
      </Texte>
      <Texte cx={270} y={430} at={0} reserve={RESERVE_CARTE} style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 24, lineHeight: 1.15, color: C.encre }} testId={tid(ID, "contrat-titre")}>
        {X.screen(1)}
      </Texte>
      <Texte x={124} y={496} width={292} at={T.contrat} reserve={RESERVE_CARTE} style={RUBRIQUE}>
        <TypeText text={X.screen(3)} at={T.contrat} testId={tid(ID, "rubrique")} />
      </Texte>
      <Texte x={478} y={608} at={LABEL_1993_AT} reserve={C.fond} style={LIBELLE}>
        <TypeText text={X.screen(4)} at={LABEL_1993_AT} testId={tid(ID, "jalon-1993")} />
      </Texte>
      {/* SAIF : dans le balayage de sa feuille (même boîte, même instant, même sens) */}
      <Wipe at={T.format} dur={SAIF_WIPE} dir="right" style={B.saif} testId={tid(ID, "saif-nom")}>
        <Texte cx={902} y={256} origin={B.saif} at={T.format} reserve={RESERVE_CARTE} track={0.3} style={capitales(34, 0.3, C.terme)}>
          {X.screen(5)}
        </Texte>
      </Wipe>
      <Texte cx={696} y={262} at={TRADUCTION_AT} wipe={{ dur: TRADUCTION_WIPE, dir: "right" }} reserve={C.fond} track={0.24} style={capitales(26, 0.24, C.encre)} testId={tid(ID, "traduction")}>
        {X.screen(6)}
      </Texte>
      <Texte x={1040} y={608} width={250} at={LABEL_1996_AT} reserve={C.fond} style={LIBELLE}>
        <TypeText text={X.screen(7)} at={LABEL_1996_AT} testId={tid(ID, "jalon-1996")} />
      </Texte>
      <Texte x={1040} y={815} at={NOM_AT} reserve={C.fond} lang="en" style={{ ...RUBRIQUE, fontStyle: "italic", lineHeight: 1.15 }}>
        <TypeText text={X.screen(8)} at={NOM_AT} testId={tid(ID, "nom-origine")} />
      </Texte>
      <Texte x={1229} y={273} at={TOPONYME_AT} reserve={RESERVE_CARTE} style={{ fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 30, lineHeight: 1.2, color: C.encre }}>
        <TypeText text={X.screen(9)} at={TOPONYME_AT} testId={tid(ID, "siege")} />
      </Texte>

      <Source href={sourceHref(ID)} testId={tid(ID, "source")}>
        {X.screen(10)}
      </Source>

      {/* Titre sur sa réserve `fond`, posée avec la frappe */}
      <Title text={X.screen(0)} at={T.commencent} style={{ position: "absolute", left: 98, top: 82, padding: "2px 6px", background: t >= T.commencent ? C.fond : "transparent" }} testId={tid(ID, "title")} />

      {/* Mise en évidence : une seule à la fois */}
      {HL.map((h) => (
        <Highlight key={h.key} on={focus === h.key} at={h.at} pad={0} style={{ position: "absolute", left: h.left, top: h.top, width: h.width, height: h.height }} testId={tid(ID, `hl-${h.key}`)}>
          {null}
        </Highlight>
      ))}
    </SceneRoot>
  )
}

export const s02 = defineScene({ id: ID, clip: V, View })
