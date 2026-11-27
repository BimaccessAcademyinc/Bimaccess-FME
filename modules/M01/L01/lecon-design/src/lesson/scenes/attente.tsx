/**
 * Scènes en attente de leur code (S02 à S08) : le storyboard en a huit, la
 * leçon doit les déclarer toutes (defineLesson), mais seule S01 est écrite.
 * Chaque scène en attente branche ses narrations et son exercice, affiche ses
 * textes d'écran (le premier en titre, les autres en liste) et rien d'autre :
 * aucune composition, aucun instant calé sur la voix. Le rôle code remplace
 * chaque appel par la vraie scène (skill studio:scenes).
 * État affiché (data-board) : <id>-FIN.
 */
import { Bullets, type ChoiceAction, ChoicePanel, type ChoiceState, choiceExercise, defineScene, eventVoice, exerciseOf, SceneRoot, type SceneViewProps, sceneTexts, tid, Title, voice } from "../../engine"

function Texts({ id }: { readonly id: string }) {
  const X = sceneTexts(id)
  const [first, ...rest] = X.all
  return (
    <>
      {first ? <Title text={first} at={0} style={{ position: "absolute", left: 104, top: 84, width: 1320 }} testId={tid(id, "title")} /> : null}
      <Bullets items={rest.map((text) => ({ text, at: 0 }))} style={{ position: "absolute", left: 104, top: 260, width: 1320 }} testIdPrefix={tid(id, "texte")} />
    </>
  )
}

/** Scène narrée en attente : narration d'entrée <id>-01, textes d'écran. */
export function narratedPending(id: string) {
  return defineScene({
    id,
    clip: voice(`${id}-01`),
    View: () => (
      <SceneRoot id={id} board={`${id}-FIN`}>
        <Texts id={id} />
      </SceneRoot>
    ),
  })
}

/** Exercice en attente : narration d'entrée <id>-01, exercice du storyboard, narration déclenchée <id>-02 ; CONTINUER à la fin de celle-ci. */
export function exercisePending(id: string) {
  const EX = exerciseOf(id)
  const event = `${id}-02`
  const E = eventVoice(event)
  function View({ state, send, actedAt, eventStart, next }: SceneViewProps<ChoiceState, ChoiceAction>) {
    const ev = eventStart(event)
    return (
      <SceneRoot id={id} board={state.validated ? `${id}-FIN` : `${id}-1`}>
        <ChoicePanel sceneId={id} exercise={EX} state={state} send={send} at={0} actedAt={actedAt} continueAt={ev === null ? Number.POSITIVE_INFINITY : ev + E.end} onContinue={next} verdict={false} style={{ position: "absolute", left: 104, top: 84 }} />
      </SceneRoot>
    )
  }
  return defineScene({ id, clip: voice(`${id}-01`), events: [event], exercise: choiceExercise(id, { events: [event] }), View })
}
