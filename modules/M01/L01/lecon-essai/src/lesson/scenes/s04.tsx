/**
 * S04 · Une entité géographique porte trois parties (scène narrée, clip S04-01).
 * Composition, états et instants : spécification, section S04 (essai
 * « illustrations commandées » : illustrations `s04-ill-*`, trait, filet et
 * mise en évidence au code). Projection européenne : le bâtiment réel en
 * élévation au-dessus de son contour sur la carte.
 *
 * Chaque élément arrive au début de la phrase qui le dit ; les éléments d'une
 * même phrase s'enchaînent (instant de la locution + durées de la
 * spécification) ; les mises en évidence suivent les mots de la voix.
 *
 *   S04-1   image 0 : fond de carte, contour seul dans l'îlot central, mention de
 *           source, échelle, rose ; « Traduire une donnée » : le titre se tape
 *   S04-2   « Sur une carte, un bâtiment » : mise en évidence sur le contour
 *   S04-3   « La donnée, elle » : mise en évidence éteinte ; bandeau de la feuille (B1),
 *           bâtiment balayé du sol au toit, trait du bâtiment vers le bandeau,
 *           « Entité géographique » tapé en `terme`
 *   S04-4   « on l'appelle une entité géographique » : mise en évidence sur le bandeau
 *   S04-5   « Sa géométrie porte » : rubrique Géométrie (B2), titre tapé pendant que le
 *           contour quitte la carte pour la rubrique, puis les trois signes ;
 *           mise en évidence sur la rubrique
 *   S04-6   « Ici, le contour forme une surface » : hachures dans le contour
 *   S04-7   « Ses attributs la décrivent » : rubrique Attributs (B3), titre, puis
 *           « Usage : bureaux » tapé pendant que son filet se trace ; mise en évidence
 *   S04-FIN « Son système de coordonnées » : rubrique (B4), titre, globe, emprise posée
 *           sur le globe ; mise en évidence sur la rubrique jusqu'à la fin
 * Suivant : libre à la fin de la narration.
 *
 * La feuille grandit par bandes : la même illustration, découpée en quatre
 * bandes horizontales (chacune sous un filet), chacune balayée de haut en bas
 * sur sa locution. Le moteur n'a pas de découpe d'une illustration en bandes.
 * Les bandes se suivent de haut en bas : ce qui est révélé est toujours un
 * rectangle depuis le haut de la feuille, dont le bas descend bande par bande
 * (même avancement que `Wipe`, `wipeProgress`). Une seule feuille découpée par
 * ce rectangle, et non quatre `Wipe` empilés : ceux-ci laissaient, aux bords
 * 289,5, 497,9 et 624,6 mis à l'échelle de la fenêtre, une ligne claire à
 * travers les traits du cadre (vue sur les captures).
 */
import { defineScene, focusAt, Highlight, illustration, Move, ordered, type Point, SceneRoot, sceneTexts, Svg, THEME, tid, Title, Trace, TypeText, typedUntil, useT, voice, wipeProgress } from "../../engine"
import { Source, sourceHref } from "../components/s01-commun"
import { poser, RESERVE_CARTE, Texte } from "../components/s02-s04-commun"

const ID = "S04"
const X = sceneTexts(ID, { screen: 7 })
const V = voice("S04-01")
const C = THEME.colors
const SERIF = THEME.fonts.serif
const CAPS = THEME.fonts.capitales

const CARTE = illustration("s04-ill-carte")
const CONTOUR = illustration("s04-ill-contour")
const BATIMENT = illustration("s04-ill-batiment")
const FEUILLE = illustration("s04-ill-feuille")
const SIGNES = illustration("s04-ill-signes")
const HACHURE = illustration("s04-ill-hachure")
const GLOBE = illustration("s04-ill-globe")
const REPERE = illustration("s04-ill-repere")
const ECHELLE = illustration("echelle-graphique")
const ROSE = illustration("rose-des-vents")

/** Places de la spécification (x, y, largeur ; hauteur tirée du viewBox). */
const B = {
  carte: poser(CARTE, 104, 440, 650),
  contour: poser(CONTOUR, 349, 544, 160),
  batiment: poser(BATIMENT, 264, 192, 330),
  feuille: poser(FEUILLE, 777, 192, 647),
  signes: poser(SIGNES, 1120, 376.5, 250),
  hachure: poser(HACHURE, 837.5, 355, 143),
  globe: poser(GLOBE, 829, 672, 104),
  repere: poser(REPERE, 852.5, 698, 32),
  echelle: poser(ECHELLE, 1480, 84, 300),
  rose: poser(ROSE, 1712, 700, 116),
} as const

/** Contour : de l'îlot central de la carte à la rubrique Géométrie, sous son titre. */
const CONTOUR_DEPART = { x: B.contour.left, y: B.contour.top } as const
const CONTOUR_ARRIVEE = { x: 829, y: 344 } as const

/** Une locution par étape : la première de la phrase qui dit l'élément, ou les mots que désigne la mise en évidence. */
const T = ordered(
  {
    title: V.said("Traduire une donnée"),
    carte: V.said("Sur une carte, un bâtiment"),
    donnee: V.said("La donnée, elle"),
    entite: V.said("on l'appelle une entité géographique"),
    geometrie: V.said("Sa géométrie porte"),
    surface: V.said("Ici, le contour forme une surface"),
    attributs: V.said("Ses attributs la décrivent"),
    systeme: V.said("Son système de coordonnées"),
  },
  ID,
)

/** Durées de la spécification (secondes). */
const BANDE_WIPE = 0.25
const BATIMENT_WIPE = 0.5
const TRAIT_TRACE = 0.4
const CONTOUR_MOVE = 0.3
const SIGNES_WIPE = 0.3
const HACHURE_WIPE = 0.4
const GLOBE_WIPE = 0.3
const REPERE_WIPE = 0.2

/** Enchaînements dans une phrase ; chaque fin de geste est contrôlée avant l'étape suivante. */
const BATIMENT_AT = T.donnee + BANDE_WIPE
const TRAIT_AT = BATIMENT_AT + BATIMENT_WIPE
const ENTITE_AT = TRAIT_AT + TRAIT_TRACE
const GEOMETRIE_AT = T.geometrie + BANDE_WIPE
const SIGNES_AT = typedUntil(X.screen(2), GEOMETRIE_AT)
const ATTRIBUTS_AT = T.attributs + BANDE_WIPE
const USAGE_AT = typedUntil(X.screen(3), ATTRIBUTS_AT)
const USAGE_FIN = typedUntil(X.screen(4), USAGE_AT)
const SYSTEME_AT = T.systeme + BANDE_WIPE
const GLOBE_AT = typedUntil(X.screen(5), SYSTEME_AT)
const REPERE_AT = GLOBE_AT + GLOBE_WIPE
ordered(
  {
    titreFin: typedUntil(X.screen(0), T.title),
    carte: T.carte,
    donnee: T.donnee,
    entiteFin: typedUntil(X.screen(1), ENTITE_AT),
    entite: T.entite,
    geometrie: T.geometrie,
    signesFin: SIGNES_AT + SIGNES_WIPE,
    surface: T.surface,
    hachureFin: T.surface + HACHURE_WIPE,
    attributs: T.attributs,
    usageFin: USAGE_FIN,
    systeme: T.systeme,
  },
  `${ID} (enchaînements)`,
)

/** Bandes de la feuille (px de scène) : chacune coupe juste sous un filet, chacune balayée de haut en bas sur sa locution. */
const BANDES = [
  { key: "b1", haut: 192, bas: 289.5, at: T.donnee },
  { key: "b2", haut: 289.5, bas: 497.9, at: T.geometrie },
  { key: "b3", haut: 497.9, bas: 624.6, at: T.attributs },
  { key: "b4", haut: 624.6, bas: B.feuille.top + B.feuille.height, at: T.systeme },
] as const

/** Bas de la partie révélée de la feuille (px de scène) à l'instant t. */
function basFeuille(t: number): number {
  let bas = BANDES[0].haut
  for (const b of BANDES) {
    const p = wipeProgress(t, b.at, BANDE_WIPE)
    if (p <= 0) break
    bas = b.haut + p * (b.bas - b.haut)
  }
  return bas
}

/** Trait « représente » : du bord droit de la façade au cadre gauche de la feuille, au milieu du bandeau. */
const TRAIT: readonly Point[] = [
  [570.5, 253],
  [780, 253],
]
/** Filet de la ligne d'attribut. */
const FILET: readonly Point[] = [
  [829, 593],
  [1372, 593],
]

const BOARDS = [
  { at: 0, on: "S04-1" },
  { at: T.carte, on: "S04-2" },
  { at: T.donnee, on: "S04-3" },
  { at: T.entite, on: "S04-4" },
  { at: T.geometrie, on: "S04-5" },
  { at: T.surface, on: "S04-6" },
  { at: T.attributs, on: "S04-7" },
  { at: T.systeme, on: "S04-FIN" },
] as const

/** Une seule mise en évidence à la fois ; la dernière tient jusqu'à la fin (S04-FIN). */
const FOCUS = [
  { at: 0, on: null },
  { at: T.carte, on: "contour" },
  { at: T.donnee, on: null },
  { at: T.entite, on: "entite" },
  { at: T.geometrie, on: "geometrie" },
  { at: T.attributs, on: "attributs" },
  { at: T.systeme, on: "systeme" },
] as const

/** Rectangles de la spécification (le tireté passe sur leur bord) ; ceux des rubriques sont en retrait de 10 px dans la rubrique. */
const HL = [
  { key: "contour", at: T.carte, left: 339, top: 534, width: 180, height: 132 },
  { key: "entite", at: T.entite, left: 908, top: 228, width: 385, height: 50 },
  { key: "geometrie", at: T.geometrie, left: 814.7, top: 298.7, width: 571.6, height: 187.7 },
  { key: "attributs", at: T.attributs, left: 814.7, top: 507.1, width: 571.6, height: 106 },
  { key: "systeme", at: T.systeme, left: 814.7, top: 633.8, width: 571.6, height: 150.2 },
] as const

/** Titre de rubrique : Barlow Condensed 600, 24 px, capitales, 0,16 em. */
const RUBRIQUE_TITRE = { fontFamily: CAPS, fontWeight: 600, fontSize: 24, lineHeight: 1.2, letterSpacing: "0.16em", textTransform: "uppercase", color: C.encre } as const

function View() {
  const t = useT()
  const focus = focusAt(FOCUS, t)
  return (
    <SceneRoot id={ID} board={focusAt(BOARDS, t) ?? "S04-1"}>
      {/* Ordre de pose : carte, bandes de la feuille, bâtiment, trait, contour, hachures, signes, globe, emprise, textes, mise en évidence */}
      <Svg svg={CARTE} at={0} dur={0} style={B.carte} testId={tid(ID, "carte")} />
      <div data-testid={tid(ID, "feuille")} style={{ ...B.feuille, clipPath: `inset(0 0 ${B.feuille.top + B.feuille.height - basFeuille(t)}px 0)` }}>
        <Svg svg={FEUILLE} at={0} dur={0} style={{ width: "100%", height: "100%" }} />
      </div>
      {/* Le bâtiment n'a pas d'aplat autour de la façade : réserve `fond` sous l'illustration, qui couvre l'amorce (274, 236) comme les autres */}
      <Svg svg={BATIMENT} at={BATIMENT_AT} dur={BATIMENT_WIPE} dir="up" style={{ ...B.batiment, background: C.fond }} testId={tid(ID, "batiment")} />
      <svg aria-hidden="true" focusable="false" width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <Trace points={TRAIT} at={TRAIT_AT} dur={TRAIT_TRACE} color={C.encre} width={2} />
        <Trace points={FILET} at={USAGE_AT} dur={USAGE_FIN - USAGE_AT} color={C.carroyage} width={1.2} />
      </svg>
      {/* Contour : dans l'îlot dès l'image 0, puis dans la rubrique Géométrie (même échelle, ligne droite) */}
      <Move at={GEOMETRIE_AT} dur={CONTOUR_MOVE} from={CONTOUR_DEPART} to={CONTOUR_ARRIVEE} style={{ position: "absolute", left: 0, top: 0, width: B.contour.width, height: B.contour.height }}>
        <Svg svg={CONTOUR} at={0} dur={0} style={{ width: "100%", height: "100%" }} testId={tid(ID, "contour")} />
      </Move>
      <Svg svg={HACHURE} at={T.surface} dur={HACHURE_WIPE} dir="right" style={B.hachure} testId={tid(ID, "hachure")} />
      <Svg svg={SIGNES} at={SIGNES_AT} dur={SIGNES_WIPE} dir="right" style={B.signes} testId={tid(ID, "signes")} />
      {/* Le fichier du globe garde un fond sombre hors du cercle (l'aperçu ne le montre pas) : découpé à son cercle, il redevient le globe au trait de la spécification */}
      <div style={{ ...B.globe, clipPath: "circle(50%)" }}>
        <Svg svg={GLOBE} at={GLOBE_AT} dur={GLOBE_WIPE} dir="down" style={{ width: "100%", height: "100%" }} testId={tid(ID, "globe")} />
      </div>
      <Svg svg={REPERE} at={REPERE_AT} dur={REPERE_WIPE} dir="down" style={B.repere} testId={tid(ID, "repere")} />
      <Svg svg={ECHELLE} at={0} dur={0} style={B.echelle} testId={tid(ID, "echelle")} />
      <Svg svg={ROSE} at={0} dur={0} style={B.rose} testId={tid(ID, "rose")} />

      {/* Textes de la feuille, sur leur réserve `papier` */}
      <Texte cx={1100.5} y={238} at={ENTITE_AT} reserve={RESERVE_CARTE} track={0.32} style={{ ...RUBRIQUE_TITRE, fontSize: 26, lineHeight: 1.15, letterSpacing: "0.32em", color: C.terme }}>
        <TypeText text={X.screen(1)} at={ENTITE_AT} testId={tid(ID, "entite")} />
      </Texte>
      <Texte x={829} y={303} at={GEOMETRIE_AT} reserve={RESERVE_CARTE} style={RUBRIQUE_TITRE}>
        <TypeText text={X.screen(2)} at={GEOMETRIE_AT} testId={tid(ID, "geometrie")} />
      </Texte>
      <Texte x={829} y={511} at={ATTRIBUTS_AT} reserve={RESERVE_CARTE} style={RUBRIQUE_TITRE}>
        <TypeText text={X.screen(3)} at={ATTRIBUTS_AT} testId={tid(ID, "attributs")} />
      </Texte>
      <Texte x={829} y={550} at={USAGE_AT} reserve={RESERVE_CARTE} style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, lineHeight: 1.25, color: C.encre }}>
        <TypeText text={X.screen(4)} at={USAGE_AT} testId={tid(ID, "usage")} />
      </Texte>
      <Texte x={829} y={638} at={SYSTEME_AT} reserve={RESERVE_CARTE} style={RUBRIQUE_TITRE}>
        <TypeText text={X.screen(5)} at={SYSTEME_AT} testId={tid(ID, "systeme")} />
      </Texte>

      <Source href={sourceHref(ID)} testId={tid(ID, "source")}>
        {X.screen(6)}
      </Source>

      {/* Titre sur sa réserve `fond`, posée avec la frappe */}
      <Title text={X.screen(0)} at={T.title} style={{ position: "absolute", left: 98, top: 82, padding: "2px 6px", background: t >= T.title ? C.fond : "transparent" }} testId={tid(ID, "title")} />

      {/* Mise en évidence : une seule à la fois */}
      {HL.map((h) => (
        <Highlight key={h.key} on={focus === h.key} at={h.at} pad={0} style={{ position: "absolute", left: h.left, top: h.top, width: h.width, height: h.height }} testId={tid(ID, `hl-${h.key}`)}>
          {null}
        </Highlight>
      ))}
    </SceneRoot>
  )
}

export const s04 = defineScene({ id: ID, clip: V, View })
