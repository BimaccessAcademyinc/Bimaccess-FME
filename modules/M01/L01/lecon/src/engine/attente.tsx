/**
 * Scène en attente de sa construction. defineLesson exige toutes les scènes
 * du storyboard dès la déclaration de la leçon, avant que chacune soit écrite
 * (gabarit et données, ou scène écrite) : sceneEnAttente("S04") tient la place
 * d'une scène pas encore construite, et la page se construit et se joue
 * entière dès le premier jour.
 *
 * Elle branche tout ce que le storyboard donne pour la scène, sans rien
 * écrire à la main : narration d'entrée (clip linéaire), narrations
 * déclenchées, exercice. Elle affiche ses textes d'écran à l'image 0, sans
 * composition ni instant calé sur la voix : le premier en titre (à la place
 * du titre de la signature, PAGE.titre), les autres en liste dans la face ;
 * un exercice montre seulement son panneau (VALIDER, conséquence, CONTINUER
 * à la fin des narrations déclenchées). Le rôle code remplace chaque appel
 * par la vraie scène.
 *
 * État affiché (data-board) : <id>-FIN ; exercice : <id>-1, puis <id>-FIN une
 * fois validé.
 */
import { CLIPS } from "../generated/narration"
import { EXERCISES } from "../generated/texts"
import { Bullets, ChoicePanel, SceneRoot, Title, tid } from "./components"
import { type ChoiceAction, type ChoiceState, choiceExercise, exerciseOf } from "./exercise"
import { defineScene } from "./scene"
import { PAGE } from "./signature"
import { sceneTexts } from "./texts"
import { eventVoice, voice } from "./timeline"
import type { SceneViewProps } from "./types"

/** Textes d'écran de la scène, posés à l'image 0 : le premier en titre, les autres en liste dans la face. */
function Textes({ id }: { readonly id: string }) {
  const [premier, ...autres] = sceneTexts(id).all
  const f = PAGE.face
  return (
    <>
      {premier ? <Title text={premier} at={0} style={{ position: "absolute", left: PAGE.titre.x, top: PAGE.titre.y, width: f.x1 - f.x0 }} testId={tid(id, "title")} /> : null}
      {autres.length ? <Bullets items={autres.map((text) => ({ text, at: 0 }))} style={{ position: "absolute", left: f.x0, top: f.y0 + 80, width: f.x1 - f.x0 }} testIdPrefix={tid(id, "texte")} /> : null}
    </>
  )
}

/** Scène en attente : narrations et exercice du storyboard branchés, textes d'écran posés, aucune composition. */
export function sceneEnAttente(id: string) {
  // Vérifie au chargement que la scène existe dans le storyboard (TextError sinon)
  sceneTexts(id)
  const clips = Object.values(CLIPS).filter((c) => c.scene === id)
  const entree = clips.find((c) => c.trigger === "linear")
  const clip = entree ? voice(entree.id) : undefined
  const events = clips.filter((c) => c.trigger === "event").map((c) => c.id)
  if (!EXERCISES[id]) {
    return defineScene({
      id,
      clip,
      View: () => (
        <SceneRoot id={id} board={`${id}-FIN`}>
          <Textes id={id} />
        </SceneRoot>
      ),
    })
  }
  const EX = exerciseOf(id)
  const fins = events.map((e) => eventVoice(e).end)
  function View({ state, send, actedAt, eventStart, next }: SceneViewProps<ChoiceState, ChoiceAction>) {
    // CONTINUER à la fin de la dernière narration déclenchée (sans narration déclenchée : après la validation)
    const debuts = events.map((e) => eventStart(e))
    const continueAt = events.length ? Math.max(...debuts.map((d, i) => (d === null ? Number.POSITIVE_INFINITY : d + (fins[i] ?? 0)))) : undefined
    return (
      <SceneRoot id={id} board={state.validated ? `${id}-FIN` : `${id}-1`}>
        <ChoicePanel sceneId={id} exercise={EX} state={state} send={send} at={0} actedAt={actedAt} continueAt={continueAt} onContinue={next} verdict={EX.expected !== null} style={{ position: "absolute", left: PAGE.titre.x, top: PAGE.titre.y }} />
      </SceneRoot>
    )
  }
  return defineScene({ id, clip, events, exercise: choiceExercise(id, { events }), View })
}
