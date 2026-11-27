/**
 * Scène : le <Player> Remotion, mis à l'échelle de la fenêtre (16:9 par
 * défaut), sans contrôles natifs ni clic pour lire. Les attributs data-*
 * exposent l'état aux tests (scripts/play-check.mjs) : scène, image, durée,
 * fin de la narration d'entrée (image), voix, clips déclenchés placés,
 * Suivant permis.
 */
import { Player, type PlayerRef } from "@remotion/player"
import { memo, type Ref, useEffect, useState } from "react"
import { META } from "../generated/meta"
import { L } from "../i18n"
import { LessonComposition, type StageInput } from "./composition"

const PlayerBox = memo(function PlayerBox({ ref, input, duration, rate }: { readonly ref: Ref<PlayerRef>; readonly input: StageInput; readonly duration: number; readonly rate: number }) {
  return (
    <Player
      ref={ref}
      component={LessonComposition}
      inputProps={input}
      durationInFrames={duration}
      playbackRate={rate}
      fps={META.fps}
      compositionWidth={META.width}
      compositionHeight={META.height}
      controls={false}
      clickToPlay={false}
      doubleClickToFullscreen={false}
      spaceKeyToPlayOrPause={false}
      moveToBeginningWhenEnded={false}
      numberOfSharedAudioTags={5}
      // Licence Remotion : décision de l'utilisateur seul (studio.config.json), jamais d'un agent
      acknowledgeRemotionLicense={META.acknowledgeRemotionLicense}
      style={{ width: "100%" }}
      errorFallback={({ error }: { readonly error: Error }) => (
        <div className="studio-error" role="alert">
          <strong>{L.error}</strong>
          <code>{error.name} : {error.message}</code>
        </div>
      )}
    />
  )
})

export function Stage({
  ref,
  input,
  duration,
  sceneId,
  frame,
  playing,
  voice,
  nextAllowed,
  completed,
  narrationEnd,
  rate = 1,
}: {
  readonly ref: Ref<PlayerRef>
  readonly input: StageInput
  readonly duration: number
  readonly sceneId: string
  readonly frame: number
  readonly playing: boolean
  readonly voice: string | null
  readonly nextAllowed: boolean
  readonly completed: boolean
  /** Image de fin de la narration d'entrée (Suivant jamais libre avant). */
  readonly narrationEnd: number
  /** Vitesse de lecture (1 = normale), voix comprise. */
  readonly rate?: number
}) {
  // Prête quand la scène courante est montée dans le lecteur
  const [ready, setReady] = useState<string | null>(null)
  useEffect(() => setReady(sceneId), [sceneId])
  const events = input.events.map((e) => ({ id: e.id, start: Math.round(e.start * 1000) / 1000, audible: e.audible, src: e.src }))
  return (
    <div
      className="studio-stage"
      data-testid="stage"
      data-stage-ready={ready === sceneId ? "true" : "false"}
      data-scene={sceneId}
      data-frame={frame}
      data-duration={duration}
      data-narration-end={narrationEnd}
      data-playing={playing ? "true" : "false"}
      data-voice={voice ?? ""}
      data-events={JSON.stringify(events)}
      data-next={nextAllowed ? "open" : "locked"}
      data-completed={completed ? "true" : "false"}
      data-revisit={input.revisit ? "true" : "false"}
      data-rate={rate}
    >
      <PlayerBox ref={ref} input={input} duration={duration} rate={rate} />
    </div>
  )
}
