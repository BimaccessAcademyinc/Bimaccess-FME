/**
 * S07 · Une entité géographique vit dans un format (scène narrée, clip S07-01).
 * Composition, états et instants : spécification du groupe c, section S07.
 *
 *   S07-1   habillage, feuille d'entité et ses deux traits arrêtés sur leurs manques
 *           (image 0) ; le titre se tape sur « Reste à savoir »
 *   S07-2   « dans quel format » : `Format` se balaie à côté du premier manque
 *   S07-FIN « et dans quel » (début de la seconde partie de la phrase, avant « système de coordonnées ») : `Système de coordonnées` à côté du second manque
 * Suivant : libre à la fin de la narration. Aucune mise en évidence.
 */
import { defineScene, focusAt, illustration, ordered, SceneRoot, sceneTexts, Svg, THEME, tid, Title, useT, voice, Wipe } from "../../engine"

const ID = "S07"
const X = sceneTexts(ID, { screen: 4 })
const V = voice("S07-01")
const C = THEME.colors
const CAPS = THEME.fonts.capitales

const ECHELLE = illustration("echelle-graphique")
const ROSE = illustration("rose-des-vents")
const ENTITE = illustration("s07-entite")

const T = ordered(
  {
    title: V.said("Reste à savoir"),
    format: V.said("dans quel format"),
    systeme: V.said("et dans quel"),
  },
  ID,
)

const BOARDS = [
  { at: 0, on: "S07-1" },
  { at: T.format, on: "S07-2" },
  { at: T.systeme, on: "S07-FIN" },
] as const

/** Nom de lieu (Barlow 600, 34 px, capitales, 0,3 em) sur sa réserve de fond : 2 px en haut et en bas, 6 px à gauche et à droite. */
const lieu = { fontFamily: CAPS, fontWeight: 600, fontSize: 34, letterSpacing: "0.3em", textTransform: "uppercase", color: C.encre, background: C.fond, padding: "2px 6px", boxSizing: "content-box" } as const

function View() {
  const t = useT()
  return (
    <SceneRoot id={ID} board={focusAt(BOARDS, t) ?? "S07-1"}>
      {/* Habillage et feuille d'entité : posés à la première image */}
      <Svg svg={ECHELLE} at={0} dur={0} style={{ position: "absolute", left: 1480, top: 84, width: 300, height: 34 }} testId={tid(ID, "echelle")} />
      <Svg svg={ROSE} at={0} dur={0} style={{ position: "absolute", left: 1712, top: 700, width: 116, height: 116 }} testId={tid(ID, "rose")} />
      <Svg svg={ENTITE} at={0} dur={0} style={{ position: "absolute", left: 256, top: 356, width: 744, height: 308 }} testId={tid(ID, "entite")} />

      {/* Titre, sur sa réserve de fond */}
      <div style={{ position: "absolute", left: 98, top: 82, padding: "2px 6px", background: C.fond }}>
        <Title text={X.screen(0)} at={T.title} testId={tid(ID, "title")} />
      </div>

      {/* En-tête de cartouche, centré dans le bandeau de la feuille, posé à la première image */}
      <div
        data-testid={tid(ID, "bandeau")}
        style={{ position: "absolute", left: 302, top: 374, width: 337, height: 30, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: CAPS, fontWeight: 600, fontSize: 24, letterSpacing: "0.32em", textTransform: "uppercase", whiteSpace: "nowrap", color: C.encre }}
      >
        {X.screen(1)}
      </div>

      {/* Les deux noms, chacun sur les mots qui le disent */}
      <Wipe at={T.format} dur={0.3} dir="right" style={{ position: "absolute", left: 1004, top: 426, lineHeight: "40px", whiteSpace: "nowrap", ...lieu }} testId={tid(ID, "format")}>
        {X.screen(2)}
      </Wipe>
      <Wipe at={T.systeme} dur={0.3} dir="right" style={{ position: "absolute", left: 1004, top: 526, width: 296, lineHeight: "40px", ...lieu }} testId={tid(ID, "systeme")}>
        {X.screen(3)}
      </Wipe>
    </SceneRoot>
  )
}

export const s07 = defineScene({ id: ID, clip: V, View })
