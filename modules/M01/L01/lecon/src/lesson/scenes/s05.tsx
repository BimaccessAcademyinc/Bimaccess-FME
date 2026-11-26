/**
 * S05 · FME lit, transforme, puis écrit (scène narrée, clip S05-01).
 * Composition, états et instants : spécification du groupe c, section S05.
 *
 *   S05-1   habillage, les deux feuilles et leur bandeau, la carte en C0, mention de
 *           source (image 0) ; le titre se tape sur « Une entité quitte son logiciel »
 *   S05-2   « FME commence par lire » : route de lecture, `Lire` ; à la fin du tracé la
 *           pointe se pose et la carte sort en C1
 *   S05-3   « Ses outils de transformation manipulent » : cartouche, puis bandeau ;
 *           la carte entre en C2 à la fin du balayage du cartouche
 *   S05-4   « manipulent la géométrie » : mise en évidence sur le contour de la carte
 *   S05-5   « et les attributs » : mise en évidence sur la ligne d'attribut
 *   S05-6   « FME peut alors écrire » : route d'écriture, `Écrire`, pointe, la carte
 *           arrive en C3 ; aucune mise en évidence
 *   S05-FIN « dans le format attendu » : la carte prend la trame quadrillée de sa feuille
 * Suivant : libre à la fin de la narration.
 */
import SOURCES from "../../../content/sources.json"
import { defineScene, ease, focusAt, Highlight, illustration, ordered, prog, SceneRoot, sceneTexts, Svg, THEME, tid, Title, Trace, useT, voice, Wipe } from "../../engine"

const ID = "S05"
const X = sceneTexts(ID, { screen: 7 })
const V = voice("S05-01")
const C = THEME.colors
const SERIF = THEME.fonts.serif
const CAPS = THEME.fonts.capitales

const ECHELLE = illustration("echelle-graphique")
const ROSE = illustration("rose-des-vents")
const CHAINE = illustration("s05-chaine", ["s05-chaine-outils", "s05-chaine-lire-pointe", "s05-chaine-ecrire-pointe"])
const CARTE = illustration("s05-carte", ["s05-carte-trame-attendue"])

const T = ordered(
  {
    title: V.said("Une entité quitte son logiciel"),
    lire: V.said("FME commence par lire"),
    outils: V.said("Ses outils de transformation manipulent"),
    geometrie: V.said("manipulent la géométrie"),
    attributs: V.said("et les attributs"),
    ecrire: V.said("FME peut alors écrire"),
    format: V.said("dans le format attendu"),
  },
  ID,
)

const BOARDS = [
  { at: 0, on: "S05-1" },
  { at: T.lire, on: "S05-2" },
  { at: T.outils, on: "S05-3" },
  { at: T.geometrie, on: "S05-4" },
  { at: T.attributs, on: "S05-5" },
  { at: T.ecrire, on: "S05-6" },
  { at: T.format, on: "S05-FIN" },
] as const

/** Une seule mise en évidence à la fois, aucune à la fin. */
const FOCUS = [
  { at: 0, on: null },
  { at: T.geometrie, on: "contour" },
  { at: T.attributs, on: "attribut" },
  { at: T.ecrire, on: null },
] as const

/** Durées (spécification). Les instants qui suivent un tracé ou un balayage s'en déduisent. */
const ROUTE_DUR = 0.4
const POINTE_DUR = 0.1
const OUTILS_DUR = 0.3
const BANDEAU_DUR = 0.3
const T_POINTE_LIRE = T.lire + ROUTE_DUR
const T_POINTE_ECRIRE = T.ecrire + ROUTE_DUR
const T_BANDEAU = T.outils + OUTILS_DUR

/** La carte d'entité, haut gauche : C0 → C1 → C2 → C3 (y constant). */
const CARD_Y = 490
const C0 = 214
const C1 = 656
const C2 = 726
const C3 = 1238

type RouteSpec = { readonly points: readonly (readonly [number, number])[]; readonly at: number; readonly edge: number; readonly pave: number; readonly axe: number; readonly color: string }

/** Une route : trois traits superposés (bord, chaussée, axe), même chemin, même instant. */
function Route({ points, at, edge, pave, axe, color }: RouteSpec) {
  return (
    <g>
      <Trace points={points} at={at} dur={ROUTE_DUR} color={C.encre} width={edge} />
      <Trace points={points} at={at} dur={ROUTE_DUR} color={C.chaussee} width={pave} />
      <Trace points={points} at={at} dur={ROUTE_DUR} color={color} width={axe} />
    </g>
  )
}

/** En-tête de cartouche : Barlow 600, 24 px, capitales. */
const entete = { fontFamily: CAPS, fontWeight: 600, fontSize: 24, lineHeight: 1, letterSpacing: "0.32em", textTransform: "uppercase", whiteSpace: "nowrap", color: C.encre } as const
/** Nom de lieu petit : Barlow 600, 26 px, capitales, sur sa réserve de fond (2 px en haut et en bas, 6 px de chaque côté). */
const lieu = { position: "absolute", transform: "translateX(-50%)", fontFamily: CAPS, fontWeight: 600, fontSize: 26, lineHeight: "26px", letterSpacing: "0.24em", textTransform: "uppercase", whiteSpace: "nowrap", color: C.encre, background: C.fond, padding: "2px 6px", boxSizing: "content-box" } as const

function View() {
  const t = useT()
  const focus = focusAt(FOCUS, t)
  // Carte d'entité : sort par la route (linéaire), entre dans les outils (sortie cubique), rejoint la feuille d'arrivée (linéaire)
  const cardX = C0 + (C1 - C0) * prog(t, T_POINTE_LIRE, 0.4) + (C2 - C1) * ease(prog(t, T_BANDEAU, 0.25)) + (C3 - C2) * prog(t, T_POINTE_ECRIRE, 0.45)
  return (
    <SceneRoot id={ID} board={focusAt(BOARDS, t) ?? "S05-1"}>
      {/* Habillage : posé à la première image */}
      <Svg svg={ECHELLE} at={0} dur={0} style={{ position: "absolute", left: 1480, top: 84, width: 300, height: 34 }} testId={tid(ID, "echelle")} />
      <Svg svg={ROSE} at={0} dur={0} style={{ position: "absolute", left: 1712, top: 700, width: 116, height: 116 }} testId={tid(ID, "rose")} />

      {/* Titre, sur sa réserve de fond */}
      <div style={{ position: "absolute", left: 98, top: 82, padding: "2px 6px", background: C.fond }}>
        <Title text={X.screen(0)} at={T.title} testId={tid(ID, "title")} />
      </div>

      {/* Chaîne : feuilles en décor ; cartouche des outils et pointes sur leurs locutions (les pointes sous les routes) */}
      <Svg
        svg={CHAINE}
        at={0}
        dur={0}
        parts={[
          { group: "s05-chaine-outils", at: T.outils, dur: OUTILS_DUR, dir: "right" },
          { group: "s05-chaine-lire-pointe", at: T_POINTE_LIRE, dur: POINTE_DUR, dir: "right" },
          { group: "s05-chaine-ecrire-pointe", at: T_POINTE_ECRIRE, dur: POINTE_DUR, dir: "right" },
        ]}
        style={{ position: "absolute", left: 100, top: 356, width: 1392, height: 324 }}
        testId={tid(ID, "chaine")}
      />

      {/* Routes : lecture, puis écriture (bouts nets : ils touchent une feuille ou la base d'une pointe) */}
      <svg aria-hidden="true" width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Route points={[[464, 540], [618, 540]]} at={T.lire} edge={13} pave={10} axe={5} color={C.lecture} />
        <Route points={[[946, 540], [1100, 540]]} at={T.ecrire} edge={11} pave={8} axe={4} color={C.ecriture} />
      </svg>

      {/* Textes des bandeaux : sur le papier des feuilles, posés à la première image */}
      <div data-testid={tid(ID, "depart")} style={{ position: "absolute", left: 124, top: 374, ...entete }}>
        {X.screen(1)}
      </div>
      <div data-testid={tid(ID, "attendu")} style={{ position: "absolute", left: 1148, top: 374, ...entete }}>
        {X.screen(2)}
      </div>
      <Wipe at={T.lire} dur={0.3} dir="right" style={{ ...lieu, left: 541, top: 492 }} testId={tid(ID, "lire")}>
        {X.screen(3)}
      </Wipe>
      <Wipe at={T_BANDEAU} dur={BANDEAU_DUR} dir="right" style={{ position: "absolute", left: 666, top: 370, width: 270, ...entete, lineHeight: "32px", whiteSpace: "normal" }} testId={tid(ID, "outils")}>
        {X.screen(4)}
      </Wipe>
      <Wipe at={T.ecrire} dur={0.3} dir="right" style={{ ...lieu, left: 1023, top: 492 }} testId={tid(ID, "ecrire")}>
        {X.screen(5)}
      </Wipe>

      {/* Mention de source dans la marge, dès la première image : filet de 220 px, puis le texte */}
      <div style={{ position: "absolute", left: 1448, top: 764, width: 220, height: 0, borderTop: `0.8px solid ${C.encre}` }} />
      <a data-testid={tid(ID, "source")} style={{ position: "absolute", left: 1442, top: 770, padding: "2px 6px", whiteSpace: "nowrap", background: C.fond, fontFamily: SERIF, fontStyle: "italic", fontWeight: 400, fontSize: 24, lineHeight: 1.15, color: C.lien, textDecoration: "underline", cursor: "pointer", pointerEvents: "auto" }} href={SOURCES.sources.S05} target="_blank" rel="noopener">
        {X.screen(6)}
      </a>

      {/* Carte d'entité : se déplace d'un bloc ; prend la trame quadrillée sur « dans le format attendu » */}
      <div style={{ position: "absolute", left: 0, top: CARD_Y, width: 140, height: 100, transform: `translateX(${cardX}px)` }}>
        <Svg svg={CARTE} at={0} dur={0} parts={[{ group: "s05-carte-trame-attendue", at: T.format, dur: 0.3, dir: "right" }]} style={{ width: 140, height: 100 }} testId={tid(ID, "carte")} />
      </div>

      {/* Mise en évidence : le contour de la carte en C2, puis sa ligne d'attribut */}
      <Highlight on={focus === "contour"} at={T.geometrie} pad={0} style={{ position: "absolute", left: 738, top: 494, width: 88, height: 68, pointerEvents: "none" }} testId={tid(ID, "focus-contour")}>
        {null}
      </Highlight>
      <Highlight on={focus === "attribut"} at={T.attributs} pad={0} style={{ position: "absolute", left: 738, top: 562, width: 104, height: 24, pointerEvents: "none" }} testId={tid(ID, "focus-attribut")}>
        {null}
      </Highlight>
    </SceneRoot>
  )
}

export const s05 = defineScene({ id: ID, clip: V, View })
