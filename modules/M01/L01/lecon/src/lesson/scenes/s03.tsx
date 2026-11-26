/**
 * S03 · Une entité géographique porte trois parties (scène narrée, clip S03-01).
 * Composition, états et instants : spécification du groupe b, section S03.
 *
 *   S03-1   habillage, fond de carte et contour dessus, mention de source (image 0) ;
 *           le titre se tape sur « Traduire une donnée »
 *   S03-2   « La donnée, elle » : la feuille vide se déroule ; « représente le bâtiment
 *           réel » : le bâtiment se balaie du sol au toit, le trait part vers la feuille
 *   S03-3   « on l'appelle une entité géographique » : le bandeau se tape (couleur terme),
 *           mise en évidence sur le bandeau
 *   S03-4   « Sa géométrie porte » : rubrique Géométrie, le contour quitte la carte pour
 *           la rubrique ; « en points, lignes ou surfaces » : les trois signes ;
 *           « Ici, le contour forme une surface » : la hachure ; mise en évidence Géométrie
 *   S03-5   « Ses attributs la décrivent » : rubrique Attributs ; « l'usage, des bureaux » :
 *           la ligne d'attribut et son filet ; mise en évidence Attributs
 *   S03-FIN « Son système de coordonnées » : rubrique et globe ; « lui donne sa position » :
 *           le contour se pose sur le globe ; mise en évidence sur la rubrique jusqu'à la fin
 * Suivant : libre à la fin de la narration.
 */
import SOURCES from "../../../content/sources.json"
import { defineScene, focusAt, Highlight, illustration, Move, ordered, SceneRoot, sceneTexts, Svg, THEME, tid, Title, Trace, TypeText, useT, voice, Wipe } from "../../engine"

const ID = "S03"
const X = sceneTexts(ID, { screen: 7 })
const V = voice("S03-01")
const C = THEME.colors
const SERIF = THEME.fonts.serif
const CAPS = THEME.fonts.capitales

const ECHELLE = illustration("echelle-graphique")
const ROSE = illustration("rose-des-vents")
const CARTE = illustration("s03-carte")
const CONTOUR = illustration("s03-contour", ["s03-contour-hachure"])
const BATIMENT = illustration("s03-batiment")
const ENTITE = illustration("s03-entite", ["s03-entite-feuille", "s03-entite-geometrie", "s03-entite-signes", "s03-entite-attributs", "s03-entite-usage", "s03-entite-systeme", "s03-entite-globe-contour"])

const T = ordered(
  {
    title: V.said("Traduire une donnée"),
    donnee: V.said("La donnée, elle"),
    represente: V.said("représente le bâtiment réel"),
    entite: V.said("on l'appelle une entité géographique"),
    geometrie: V.said("Sa géométrie porte"),
    signes: V.said("en points, lignes ou surfaces"),
    surface: V.said("Ici, le contour forme une surface"),
    attributs: V.said("Ses attributs la décrivent"),
    usage: V.said("l'usage, des bureaux"),
    systeme: V.said("Son système de coordonnées"),
    position: V.said("lui donne sa position"),
  },
  ID,
)

const BOARDS = [
  { at: 0, on: "S03-1" },
  { at: T.donnee, on: "S03-2" },
  { at: T.entite, on: "S03-3" },
  { at: T.geometrie, on: "S03-4" },
  { at: T.attributs, on: "S03-5" },
  { at: T.systeme, on: "S03-FIN" },
] as const

/** Une seule mise en évidence à la fois ; la dernière tient jusqu'à la fin (S03-FIN). */
const FOCUS = [
  { at: 0, on: null },
  { at: T.entite, on: "bandeau" },
  { at: T.geometrie, on: "geometrie" },
  { at: T.attributs, on: "attributs" },
  { at: T.systeme, on: "systeme" },
] as const

/** Rubriques de la feuille : rectangle de mise en évidence en retrait de 10 px (les rubriques se touchent). */
const RUBRIQUES = [
  { key: "geometrie", x: 810, y: 266, w: 600, h: 214, at: T.geometrie },
  { key: "attributs", x: 810, y: 500, w: 600, h: 110, at: T.attributs },
  { key: "systeme", x: 810, y: 630, w: 600, h: 206, at: T.systeme },
] as const

/** Durées des mouvements (spécification) : feuille, bâtiment et trait, contour. */
const SHEET_WIPE = 0.4
const BUILDING_WIPE = 0.5
const CONTOUR_MOVE = 0.3
/** Déplacement du contour : de (327, 287) sur la carte à (821, 327) dans la rubrique Géométrie. */
const CONTOUR_FROM = { x: 327, y: 287 } as const
const CONTOUR_TO = { x: 821, y: 327 } as const

/** En-tête de cartouche et titre de rubrique : Barlow 600, 24 px, capitales. */
const caps = (spacing: string, color: string) => ({ fontFamily: CAPS, fontWeight: 600, fontSize: 24, lineHeight: 1, letterSpacing: spacing, textTransform: "uppercase", whiteSpace: "nowrap", color }) as const

function View() {
  const t = useT()
  const focus = focusAt(FOCUS, t)
  return (
    <SceneRoot id={ID} board={focusAt(BOARDS, t) ?? "S03-1"}>
      {/* Habillage, fond de carte : posés à la première image */}
      <Svg svg={ECHELLE} at={0} dur={0} style={{ position: "absolute", left: 1480, top: 84, width: 300, height: 34 }} testId={tid(ID, "echelle")} />
      <Svg svg={ROSE} at={0} dur={0} style={{ position: "absolute", left: 1712, top: 700, width: 116, height: 116 }} testId={tid(ID, "rose")} />
      <Svg svg={CARTE} at={0} dur={0} style={{ position: "absolute", left: 104, top: 210, width: 600, height: 310 }} testId={tid(ID, "carte")} />

      {/* Titre, sur sa réserve de fond (2 px de marge) */}
      <div style={{ position: "absolute", left: 102, top: 82, padding: 2, background: C.fond }}>
        <Title text={X.screen(0)} at={T.title} testId={tid(ID, "title")} />
      </div>

      {/* Mention de source dans la marge, dès la première image : filet de 220 px, puis le texte */}
      <div style={{ position: "absolute", left: 1448, top: 764, width: 220, height: 0, borderTop: `0.8px solid ${C.encre}` }} />
      <a data-testid={tid(ID, "source")} style={{ position: "absolute", left: 1446, top: 770, padding: 2, maxWidth: 250, background: C.fond, fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 24, lineHeight: 1.15, color: C.lien, textDecoration: "underline", cursor: "pointer", pointerEvents: "auto" }} href={SOURCES.sources.S03} target="_blank" rel="noopener">
        {X.screen(6)}
      </a>

      {/* Bâtiment réel, balayé du sol au toit, et trait du bâtiment vers la feuille */}
      <Svg svg={BATIMENT} at={T.represente} dur={BUILDING_WIPE} dir="up" style={{ position: "absolute", left: 300, top: 600, width: 260, height: 221 }} testId={tid(ID, "batiment")} />
      <svg aria-hidden="true" width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Trace points={[[526, 720], [796, 720]]} at={T.represente} dur={BUILDING_WIPE} color={C.encre} width={2} />
      </svg>

      {/* Feuille « Entité géographique » : décor sur « La donnée, elle », rubriques révélées chacune sur sa locution */}
      <Svg
        svg={ENTITE}
        at={T.donnee}
        dur={SHEET_WIPE}
        dir="down"
        parts={[
          { group: "s03-entite-geometrie", at: T.geometrie, dur: 0.5, dir: "down" },
          { group: "s03-entite-signes", at: T.signes, dur: 0.5, dir: "right" },
          { group: "s03-entite-attributs", at: T.attributs, dur: 0.5, dir: "down" },
          { group: "s03-entite-usage", at: T.usage, dur: 0.5, dir: "right" },
          { group: "s03-entite-systeme", at: T.systeme, dur: 0.5, dir: "down" },
          { group: "s03-entite-globe-contour", at: T.position, dur: 0.4, dir: "down" },
        ]}
        style={{ position: "absolute", left: 796, top: 196, width: 628, height: 654 }}
        testId={tid(ID, "entite")}
      />

      {/* Textes de la feuille, tous à x 824 */}
      <Highlight on={focus === "bandeau"} at={T.entite} pad={10} style={{ position: "absolute", left: 824, top: 216, width: 337, height: 26 }} testId={tid(ID, "bandeau")}>
        <TypeText text={X.screen(1)} at={T.entite} style={caps("0.32em", C.terme)} />
      </Highlight>
      <Wipe at={T.geometrie} dir="down" style={{ position: "absolute", left: 824, top: 274, ...caps("0.16em", C.encre) }} testId={tid(ID, "geometrie")}>
        {X.screen(2)}
      </Wipe>
      <Wipe at={T.attributs} dir="down" style={{ position: "absolute", left: 824, top: 508, ...caps("0.16em", C.encre) }} testId={tid(ID, "attributs")}>
        {X.screen(3)}
      </Wipe>
      <Wipe at={T.usage} dir="right" style={{ position: "absolute", left: 824, top: 554, fontFamily: SERIF, fontWeight: 400, fontSize: 28, lineHeight: 1.25, whiteSpace: "nowrap", color: C.encre }} testId={tid(ID, "usage")}>
        {X.screen(4)}
      </Wipe>
      <Wipe at={T.systeme} dir="down" style={{ position: "absolute", left: 824, top: 638, ...caps("0.16em", C.encre) }} testId={tid(ID, "systeme")}>
        {X.screen(5)}
      </Wipe>

      {/* Mise en évidence des rubriques (rectangles en retrait de 10 px dans la rubrique) */}
      {RUBRIQUES.map((r) => (
        <Highlight key={r.key} on={focus === r.key} at={r.at} pad={0} style={{ position: "absolute", left: r.x, top: r.y, width: r.w, height: r.h, pointerEvents: "none" }} testId={tid(ID, `rubrique-${r.key}`)}>
          {null}
        </Highlight>
      ))}

      {/* Contour du bâtiment : sur la carte dès l'image 0, puis dans la rubrique Géométrie ; hachure de surface sur sa locution */}
      <Move at={T.geometrie} dur={CONTOUR_MOVE} from={{ x: 0, y: 0 }} to={{ x: CONTOUR_TO.x - CONTOUR_FROM.x, y: CONTOUR_TO.y - CONTOUR_FROM.y }} style={{ position: "absolute", left: CONTOUR_FROM.x, top: CONTOUR_FROM.y, width: 206, height: 126 }}>
        <Svg svg={CONTOUR} at={0} dur={0} parts={[{ group: "s03-contour-hachure", at: T.surface, dur: 0.5, dir: "right" }]} style={{ width: 206, height: 126 }} testId={tid(ID, "contour")} />
      </Move>
    </SceneRoot>
  )
}

export const s03 = defineScene({ id: ID, clip: V, View })
