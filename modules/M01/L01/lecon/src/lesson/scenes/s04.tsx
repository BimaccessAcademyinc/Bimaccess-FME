/**
 * S04 · Une équipe doit situer la conduite d'eau reçue (exercice, clips S04-01 et S04-02
 * déclenché). Composition, états et instants : spécification du groupe b, section S04.
 * Verdict : aucun. Le storyboard n'a pas de ligne « Attendu » (mode conséquence) et
 * dit « Mode conséquence, sans verdict (brief) » : verdict={false}.
 *
 *   S04-1   habillage (image 0) ; « Sur un projet » : la feuille et son bandeau ;
 *           « une conduite d'eau » : cadre et tracé ; « sous forme » : tableau ;
 *           « d'entité géographique » : cartouche « Repère » ; « Choisissez, sur la donnée
 *           reçue » : le panneau, la question, puis choix et VALIDER ; jusqu'à la validation
 *   S04-2   validation : la conséquence du choix fait s'écrit dans le panneau
 *   S04-3   « Sur cette donnée, le tracé est la géométrie » (S04-02) : Géométrie sur sa
 *           ligne de repère, mise en évidence sur le cadre du tracé
 *   S04-4   « L'usage et le matériau sont ses attributs » : Attributs, mise en évidence
 *           sur le tableau
 *   S04-5   « le repère du cartouche son système » : Système de coordonnées, mise en
 *           évidence sur le cartouche
 *   S04-FIN « La position de la conduite se lit donc dans deux parties » : l'accolade de
 *           lecture, aucune mise en évidence ; CONTINUER à la fin du clip déclenché
 */
import { type ChoiceAction, ChoicePanel, type ChoiceState, choiceExercise, defineScene, eventVoice, exerciseOf, focusAt, Highlight, illustration, ordered, type Point, SceneRoot, type SceneViewProps, sceneTexts, Svg, THEME, tid, Trace, TypeText, useT, voice, Wipe } from "../../engine"

const ID = "S04"
const X = sceneTexts(ID, { screen: 7 })
const EX = exerciseOf(ID)
const V = voice("S04-01")
const EVENT = "S04-02"
const E = eventVoice(EVENT)
const C = THEME.colors
const SERIF = THEME.fonts.serif
const CAPS = THEME.fonts.capitales

const ECHELLE = illustration("echelle-graphique")
const ROSE = illustration("rose-des-vents")
const CONDUITE = illustration("s04-conduite", ["s04-conduite-cadre", "s04-conduite-tableau", "s04-conduite-cartouche", "s04-conduite-accolade"])

const T = ordered(
  {
    projet: V.said("Sur un projet"),
    conduite: V.said("une conduite d'eau"),
    forme: V.said("sous forme"),
    entite: V.said("d'entité géographique"),
    consigne: V.said("Choisissez, sur la donnée reçue"),
  },
  ID,
)

const TE = ordered(
  {
    geometrie: E.said("Sur cette donnée, le tracé est la géométrie"),
    attributs: E.said("L'usage et le matériau sont ses attributs"),
    systeme: E.said("le repère du cartouche son système"),
    accolade: E.said("La position de la conduite se lit donc dans deux parties"),
    end: E.end,
  },
  `${ID} (${EVENT})`,
)

/** Durées des mouvements : feuille (spécification), zones, ligne de repère (comme Callout du moteur). */
const SHEET_WIPE = 0.4
const ZONE_WIPE = 0.5
const LEADER_TRACE = 0.5

/** Zones de la feuille (px de scène), mises en évidence à 10 px autour. */
const ZONES = [
  { key: "cadre", x: 128, y: 230, w: 472, h: 260 },
  { key: "tableau", x: 128, y: 510, w: 292, h: 100 },
  { key: "cartouche", x: 440, y: 510, w: 160, h: 210 },
] as const

/** Lignes de repère : point P, coude K, bout du palier E ; le mot se pose 12 px après le coude, 6 px au-dessus du palier. */
const LEADERS = [
  { key: "geometrie", text: X.screen(4), p: [540, 315], k: [650, 120], e: [802, 120], at: TE.geometrie },
  { key: "attributs", text: X.screen(5), p: [200, 610], k: [240, 806], e: [391, 806], at: TE.attributs },
  { key: "systeme", text: X.screen(6), p: [470, 720], k: [500, 806], e: [839, 806], at: TE.systeme },
] as const

/** En-tête de cartouche (0,32 em) et titre de rubrique (0,16 em) : Barlow 600, 24 px, capitales. */
const caps = (spacing: string) => ({ fontFamily: CAPS, fontWeight: 600, fontSize: 24, lineHeight: 1, letterSpacing: spacing, textTransform: "uppercase", whiteSpace: "nowrap", color: C.encre }) as const
const row = { fontFamily: SERIF, fontWeight: 400, fontSize: 28, lineHeight: 1.25, whiteSpace: "nowrap", color: C.encre } as const

/**
 * Ligne de repère de la charte (§ 5 et § 7) : le point se pose, l'oblique puis le palier
 * se tracent, le mot se tape au-dessus du palier, sur sa réserve de fond.
 * Callout du moteur ne sait pas poser le mot au-dessus d'un palier de longueur donnée,
 * en capitales : composée ici des mêmes primitives (Trace, TypeText).
 */
function Repere({ text, p, k, e, at, testId }: { readonly text: string; readonly p: Point; readonly k: Point; readonly e: Point; readonly at: number; readonly testId: string }) {
  const t = useT()
  const typedAt = at + LEADER_TRACE
  return (
    <>
      <svg aria-hidden="true" width={1920} height={1080} viewBox="0 0 1920 1080" style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        {t >= at ? <circle cx={p[0]} cy={p[1]} r={4} fill={C.encre} /> : null}
        <Trace points={[p, k, e]} at={at} dur={LEADER_TRACE} color={C.encre} width={1.5} />
      </svg>
      <div data-testid={testId} style={{ position: "absolute", left: k[0] + 12 - 2, top: k[1] - 30 - 2, padding: 2, background: t >= typedAt ? C.fond : undefined }}>
        <TypeText text={text} at={typedAt} style={caps("0.16em")} />
      </div>
    </>
  )
}

function View({ state, send, actedAt, eventStart, next }: SceneViewProps<ChoiceState, ChoiceAction>) {
  const t = useT()
  const ev = eventStart(EVENT)
  const acted = actedAt ?? ev ?? Number.POSITIVE_INFINITY
  // Instants du clip déclenché, en secondes de scène (jamais avant la validation)
  const at = (rel: number) => (ev === null ? Number.POSITIVE_INFINITY : Math.max(acted, ev + rel))
  const boards = [
    { at: 0, on: "S04-1" },
    { at: acted, on: "S04-2" },
    { at: at(TE.geometrie), on: "S04-3" },
    { at: at(TE.attributs), on: "S04-4" },
    { at: at(TE.systeme), on: "S04-5" },
    { at: at(TE.accolade), on: "S04-FIN" },
  ] as const
  // Aucune mise en évidence avant la validation ; aucune avec l'accolade (elle porte seule la lecture conjointe)
  const focusSteps = [
    { at: 0, on: null },
    { at: at(TE.geometrie), on: "cadre" },
    { at: at(TE.attributs), on: "tableau" },
    { at: at(TE.systeme), on: "cartouche" },
    { at: at(TE.accolade), on: null },
  ] as const
  const focus = state.validated ? focusAt(focusSteps, t) : null
  const focusStart: Record<(typeof ZONES)[number]["key"], number> = { cadre: at(TE.geometrie), tableau: at(TE.attributs), cartouche: at(TE.systeme) }

  return (
    <SceneRoot id={ID} board={state.validated ? (focusAt(boards, t) ?? "S04-1") : "S04-1"}>
      {/* Habillage : posé à la première image */}
      <Svg svg={ECHELLE} at={0} dur={0} style={{ position: "absolute", left: 1480, top: 84, width: 300, height: 34 }} testId={tid(ID, "echelle")} />
      <Svg svg={ROSE} at={0} dur={0} style={{ position: "absolute", left: 1712, top: 700, width: 116, height: 116 }} testId={tid(ID, "rose")} />

      {/* Feuille de donnée : déroulée zone par zone, l'accolade sur la narration déclenchée */}
      <Svg
        svg={CONDUITE}
        at={T.projet}
        dur={SHEET_WIPE}
        dir="down"
        parts={[
          { group: "s04-conduite-cadre", at: T.conduite, dur: ZONE_WIPE, dir: "down" },
          { group: "s04-conduite-tableau", at: T.forme, dur: ZONE_WIPE, dir: "down" },
          { group: "s04-conduite-cartouche", at: T.entite, dur: ZONE_WIPE, dir: "down" },
          { group: "s04-conduite-accolade", at: at(TE.accolade), dur: ZONE_WIPE, dir: "down" },
        ]}
        style={{ position: "absolute", left: 100, top: 146, width: 572, height: 598 }}
        testId={tid(ID, "conduite")}
      />

      {/* Textes de la feuille : bandeau tapé à la fin du déroulé de la feuille, lignes du tableau et en-tête du cartouche avec leur zone */}
      <div style={{ position: "absolute", left: 132, top: 170 }}>
        <TypeText text={X.screen(0)} at={T.projet + SHEET_WIPE} style={caps("0.32em")} testId={tid(ID, "bandeau")} />
      </div>
      <Wipe at={T.forme} dur={ZONE_WIPE} dir="down" style={{ position: "absolute", left: 144, top: 518, ...row }} testId={tid(ID, "usage")}>
        {X.screen(1)}
      </Wipe>
      <Wipe at={T.forme} dur={ZONE_WIPE} dir="down" style={{ position: "absolute", left: 144, top: 568, ...row }} testId={tid(ID, "materiau")}>
        {X.screen(2)}
      </Wipe>
      <Wipe at={T.entite} dur={ZONE_WIPE} dir="down" style={{ position: "absolute", left: 440, top: 516, width: 160, textAlign: "center", ...caps("0.32em"), paddingLeft: "0.32em", boxSizing: "border-box" }} testId={tid(ID, "repere")}>
        {X.screen(3)}
      </Wipe>

      {/* Mise en évidence d'une zone à la fois, pendant la narration déclenchée */}
      {ZONES.map((z) => (
        <Highlight key={z.key} on={focus === z.key} at={focusStart[z.key]} pad={10} style={{ position: "absolute", left: z.x, top: z.y, width: z.w, height: z.h, pointerEvents: "none" }} testId={tid(ID, `zone-${z.key}`)}>
          {null}
        </Highlight>
      ))}

      {/* Noms de partie, chacun sur sa ligne de repère, après la validation */}
      {LEADERS.map((l) => (
        <Repere key={l.key} text={l.text} p={l.p} k={l.k} e={l.e} at={at(l.at)} testId={tid(ID, `nom-${l.key}`)} />
      ))}

      {/* Panneau d'exercice à droite ; VALIDER et CONTINUER dans la zone d'action */}
      <ChoicePanel sceneId={ID} exercise={EX} state={state} send={send} at={T.consigne} actedAt={actedAt} continueAt={at(TE.end)} onContinue={next} verdict={false} width={540} style={{ position: "absolute", left: 884, top: 140 }} />
    </SceneRoot>
  )
}

export const s04 = defineScene({ id: ID, clip: V, events: [EVENT], exercise: choiceExercise(ID, { events: [EVENT] }), View })
