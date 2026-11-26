/**
 * S06 · Un moteur central relie les formats pris en charge (scène narrée, clip S06-01).
 * Composition, états et instants : spécification du groupe c, section S06.
 *
 *   S06-1   habillage, l'éventail des huit feuilles au tireté, la liaison arrêtée sur son
 *           manque, mention de source (image 0)
 *   S06-2   « Autour de FME » : `Formats pris en charge`
 *   S06-3   « Safe Software décrit FME » : le titre se tape ; courbes de niveau, point
 *           géodésique à la place du manque, `Moteur`
 *   S06-4   « un moteur central » : mise en évidence (cercle) sur le moteur
 *   S06-5   « Les données se lisent depuis » : huit routes de lecture ; aucune mise en évidence
 *   S06-6   « et s'écrivent vers » : huit routes d'écriture : l'étoile
 *   S06-7   « Pour le problème que Murray et Lutz » : carte des fondateurs
 *   S06-FIN « un logiciel différent n'empêche pas » : les huit feuilles passent au trait plein
 * Suivant : libre à la fin de la narration.
 *
 * Bouts ronds des routes au moteur : `Trace` n'a pas de prop `cap` (moteur non modifié),
 * l'illustration de secours `s06-bouts` est posée sous les routes.
 */
import { defineScene, focusAt, Highlight, illustration, ordered, SceneRoot, sceneTexts, Svg, THEME, tid, Title, Trace, useT, voice, Wipe } from "../../engine"

const ID = "S06"
const X = sceneTexts(ID, { screen: 5 })
const V = voice("S06-01")
const C = THEME.colors
const SERIF = THEME.fonts.serif
const CAPS = THEME.fonts.capitales

const ECHELLE = illustration("echelle-graphique")
const ROSE = illustration("rose-des-vents")
const COURONNE = illustration("s06-couronne", ["s06-couronne-courbes", "s06-couronne-moteur", "s06-couronne-reliees"])
const BOUTS = illustration("s06-bouts", ["s06-bouts-lecture", "s06-bouts-ecriture"])
const FONDATEURS = illustration("s06-fondateurs")

const T = ordered(
  {
    autour: V.said("Autour de FME"),
    title: V.said("Safe Software décrit FME"),
    moteur: V.said("un moteur central"),
    lecture: V.said("Les données se lisent depuis"),
    ecriture: V.said("et s'écrivent vers"),
    fondateurs: V.said("Pour le problème que Murray et Lutz"),
    reliees: V.said("un logiciel différent n'empêche pas"),
  },
  ID,
)

const BOARDS = [
  { at: 0, on: "S06-1" },
  { at: T.autour, on: "S06-2" },
  { at: T.title, on: "S06-3" },
  { at: T.moteur, on: "S06-4" },
  { at: T.lecture, on: "S06-5" },
  { at: T.ecriture, on: "S06-6" },
  { at: T.fondateurs, on: "S06-7" },
  { at: T.reliees, on: "S06-FIN" },
] as const

/** Une seule mise en évidence à la fois : le moteur, jusqu'aux routes de lecture ; aucune ensuite. */
const FOCUS = [
  { at: 0, on: null },
  { at: T.moteur, on: "moteur" },
  { at: T.lecture, on: null },
] as const

/** Durées (spécification) ; les instants qui suivent un tracé ou un balayage s'en déduisent. */
const ROUTE_DUR = 0.4
const MOTEUR_DUR = 0.3
const T_MOTEUR_NOM = T.title + MOTEUR_DUR
const T_BOUTS_LECTURE = T.lecture + ROUTE_DUR

type Pt = readonly [number, number]
/** Une feuille : routes de lecture et d'écriture, côté feuille puis côté moteur (table de la spécification). */
type Liaison = { readonly lecture: readonly [Pt, Pt]; readonly ecriture: readonly [Pt, Pt] }
const LIAISONS: readonly Liaison[] = [
  { lecture: [[712.8, 358], [816.5, 505.1]], ecriture: [[732.4, 358], [829.5, 495.7]] }, // courbes
  { lecture: [[986.4, 358], [889.6, 495.3]], ecriture: [[1006, 358], [902.8, 504.4]] }, // hydrographie
  { lecture: [[1233, 421.4], [917.7, 524.3]], ecriture: [[1233, 438.3], [922.8, 539.4]] }, // cadastre
  { lecture: [[1328, 553.2], [923.6, 544.8]], ecriture: [[1328, 569.2], [923.4, 560.8]] }, // routes
  { lecture: [[1204, 677.4], [922.2, 567.2]], ecriture: [[1204, 694.6], [916.5, 582.1]] }, // végétation
  { lecture: [[516, 695.7], [804, 583]], ecriture: [[516, 678.5], [798.1, 568.2]] }, // points
  { lecture: [[392, 570.2], [796.8, 561.8]], ecriture: [[392, 554.2], [796.3, 545.8]] }, // image
  { lecture: [[487, 439.3], [797.1, 540.4]], ecriture: [[487, 422.5], [801.9, 525.2]] }, // bâti
]

/** Une route : trois traits superposés (bord, chaussée, axe), même chemin, même instant. */
function Route({ points, at, edge, pave, axe, color }: { readonly points: readonly Pt[]; readonly at: number; readonly edge: number; readonly pave: number; readonly axe: number; readonly color: string }) {
  return (
    <g>
      <Trace points={points} at={at} dur={ROUTE_DUR} color={C.encre} width={edge} />
      <Trace points={points} at={at} dur={ROUTE_DUR} color={C.chaussee} width={pave} />
      <Trace points={points} at={at} dur={ROUTE_DUR} color={color} width={axe} />
    </g>
  )
}

/** Réserve de fond autour d'un texte posé sur le carroyage : 2 px en haut et en bas, 6 px à gauche et à droite. */
const reserve = { background: C.fond, padding: "2px 6px", boxSizing: "content-box", whiteSpace: "nowrap" } as const

function View() {
  const t = useT()
  const focus = focusAt(FOCUS, t)
  return (
    <SceneRoot id={ID} board={focusAt(BOARDS, t) ?? "S06-1"}>
      {/* Habillage : posé à la première image */}
      <Svg svg={ECHELLE} at={0} dur={0} style={{ position: "absolute", left: 1480, top: 84, width: 300, height: 34 }} testId={tid(ID, "echelle")} />
      <Svg svg={ROSE} at={0} dur={0} style={{ position: "absolute", left: 1712, top: 700, width: 116, height: 116 }} testId={tid(ID, "rose")} />

      {/* Titre, sur sa réserve de fond */}
      <div style={{ position: "absolute", left: 98, top: 82, padding: "2px 6px", background: C.fond }}>
        <Title text={X.screen(0)} at={T.title} testId={tid(ID, "title")} />
      </div>

      {/* Couronne : feuilles au tireté et liaison arrêtée sur le manque en décor ; courbes et moteur sur « Safe Software décrit FME » ; feuilles au trait plein sur « un logiciel différent » */}
      <Svg
        svg={COURONNE}
        at={0}
        dur={0}
        parts={[
          { group: "s06-couronne-courbes", at: T.title, dur: 0.8, dir: "right" },
          { group: "s06-couronne-moteur", at: T.title, dur: MOTEUR_DUR, dir: "right" },
          { group: "s06-couronne-reliees", at: T.reliees, dur: 0.6, dir: "right" },
        ]}
        style={{ position: "absolute", left: 230, top: 248, width: 1260, height: 526 }}
        testId={tid(ID, "couronne")}
      />

      {/* Bouts ronds des routes au moteur (illustration de secours), sous les routes */}
      <Svg
        svg={BOUTS}
        at={0}
        dur={0}
        parts={[
          { group: "s06-bouts-lecture", at: T_BOUTS_LECTURE, dur: 0.1, dir: "right" },
          { group: "s06-bouts-ecriture", at: T.ecriture, dur: 0.1, dir: "right" },
        ]}
        style={{ position: "absolute", left: 780, top: 472, width: 160, height: 140 }}
        testId={tid(ID, "bouts")}
      />

      {/* Seize routes : lecture de la feuille vers le moteur, écriture du moteur vers la feuille */}
      <svg aria-hidden="true" width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {LIAISONS.map((l, i) => (
          <Route key={`lecture-${i}`} points={l.lecture} at={T.lecture} edge={13} pave={10} axe={5} color={C.lecture} />
        ))}
        {LIAISONS.map((l, i) => (
          <Route key={`ecriture-${i}`} points={[l.ecriture[1], l.ecriture[0]]} at={T.ecriture} edge={11} pave={8} axe={4} color={C.ecriture} />
        ))}
      </svg>

      {/* Étiquette de groupe, au-dessus des deux feuilles du haut */}
      <Wipe at={T.autour} dur={0.4} dir="right" style={{ position: "absolute", left: 860, top: 186, transform: "translateX(-50%)", fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 27, lineHeight: "32px", color: C.encre, ...reserve }} testId={tid(ID, "formats")}>
        {X.screen(1)}
      </Wipe>

      {/* Nom de lieu du moteur, sous le point géodésique, posé à la fin du balayage du moteur */}
      <Wipe at={T_MOTEUR_NOM} dur={0.3} dir="right" style={{ position: "absolute", left: 860, top: 618, transform: "translateX(-50%)", fontFamily: CAPS, fontWeight: 600, fontSize: 34, lineHeight: "36px", letterSpacing: "0.3em", textTransform: "uppercase", color: C.encre, ...reserve }} testId={tid(ID, "moteur")}>
        {X.screen(2)}
      </Wipe>

      {/* Mise en évidence : cercle autour du point géodésique */}
      <Highlight on={focus === "moteur"} shape="circle" at={T.moteur} style={{ position: "absolute", left: 826, top: 521, width: 68, height: 62, pointerEvents: "none" }} testId={tid(ID, "focus-moteur")}>
        {null}
      </Highlight>

      {/* Carte des fondateurs : balayée de haut en bas, puis le nom dans le bandeau */}
      <Svg svg={FONDATEURS} at={T.fondateurs} dur={0.3} dir="down" style={{ position: "absolute", left: 104, top: 192, width: 420, height: 140 }} testId={tid(ID, "fondateurs")} />
      <Wipe at={T.fondateurs + 0.3} dur={0.3} dir="right" style={{ position: "absolute", left: 124, top: 201, width: 380, height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CAPS, fontWeight: 600, fontSize: 24, letterSpacing: "0.32em", textTransform: "uppercase", whiteSpace: "nowrap", color: C.encre }} testId={tid(ID, "fondateurs-nom")}>
        {X.screen(3)}
      </Wipe>

      {/* Mention de source dans la marge, dès la première image : filet de 220 px, puis le texte */}
      <div style={{ position: "absolute", left: 1448, top: 764, width: 220, height: 0, borderTop: `0.8px solid ${C.encre}` }} />
      <div data-testid={tid(ID, "source")} style={{ position: "absolute", left: 1442, top: 770, fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 24, lineHeight: 1.15, color: C.lien, ...reserve }}>
        {X.screen(4)}
      </div>
    </SceneRoot>
  )
}

export const s06 = defineScene({ id: ID, clip: V, View })
