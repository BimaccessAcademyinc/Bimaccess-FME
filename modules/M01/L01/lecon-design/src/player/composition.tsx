/**
 * Composition Remotion jouée par le lecteur : la vue de la scène courante,
 * ses voix et les sous-titres. L'image ne dépend que de (image, props).
 *
 * L'état descend par les inputProps du <Player> ; les actions de
 * l'apprenant remontent par le contexte fourni AU-DESSUS du <Player>.
 */
import { createContext, useContext, useMemo } from "react"
import { AbsoluteFill, Html5Audio, Sequence, useVideoConfig } from "remotion"
import { Captions, SceneClock } from "../engine/components"
import { eventVoice } from "../engine/timeline"
import type { Voice } from "../engine/types"
import { LESSON } from "../lesson/lesson"
import { type EventPlacement, linearEnd } from "./schedule"

export type StageInput = {
  readonly index: number
  readonly state: unknown
  readonly revisit: boolean
  readonly actedAt: number | null
  readonly events: readonly EventPlacement[]
  readonly captions: boolean
}

export type Runtime = {
  readonly send: (action: unknown) => void
  readonly next: () => void
}

export const RuntimeContext = createContext<Runtime>({ send: () => {}, next: () => {} })

export function LessonComposition(props: StageInput) {
  const { fps } = useVideoConfig()
  const runtime = useContext(RuntimeContext)
  const scene = LESSON.scenes[props.index]
  const voices = useMemo<Voice[]>(() => {
    if (!scene) return []
    const placed = props.events.map((e) => eventVoice(e.id, e.start))
    return scene.clip ? [scene.clip, ...placed] : placed
  }, [scene, props.events])
  if (!scene) return null
  const View = scene.View
  const eventStart = (id: string): number | null => props.events.find((e) => e.id === id)?.start ?? null
  const clip = scene.clip
  return (
    <AbsoluteFill>
      <SceneClock.Provider value={{ narrationEnd: linearEnd(scene) }}>
        <View state={props.state} send={runtime.send} revisit={props.revisit} actedAt={props.actedAt} eventStart={eventStart} next={runtime.next} hasNext={props.index < LESSON.scenes.length - 1} />
      </SceneClock.Provider>
      {clip?.clip.src ? (
        <Sequence key={`${scene.id}-voice`} from={Math.round(clip.start * fps)} durationInFrames={Math.max(1, Math.ceil(clip.clip.duration * fps))} layout="none" name={`voix ${clip.clip.id}`}>
          <Html5Audio src={clip.clip.src} />
        </Sequence>
      ) : null}
      {props.events.map((e) =>
        e.audible && e.src ? (
          <Sequence key={`${scene.id}-${e.id}`} from={Math.round(e.start * fps)} durationInFrames={Math.max(1, Math.ceil((e.end - e.start) * fps))} layout="none" name={`voix ${e.id}`}>
            <Html5Audio src={e.src} />
          </Sequence>
        ) : null,
      )}
      {props.captions ? <Captions voices={voices} /> : null}
    </AbsoluteFill>
  )
}
