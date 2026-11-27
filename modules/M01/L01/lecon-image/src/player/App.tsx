/**
 * Coque du lecteur : en-tête, scène, pied (navigation, narration, sous-titres).
 *
 *  · Écran « Lancer » au chargement : le clic débloque l'audio. Ensuite chaque
 *    scène démarre seule à l'entrée ; jamais d'avance automatique.
 *  · Suivant verrouillé tant que la scène ne le permet pas (fin de narration,
 *    exercice validé et clip déclenché entendu) ; CONTINUER (dans la scène)
 *    a le même effet.
 *  · Scène déjà terminée : rouverte à sa dernière image, en pause, état
 *    restauré, aucun clip déclenché rejoué.
 *  · Adresse #/3 = scène 3, ouverte même si les scènes d'avant ne sont pas
 *    terminées (choix assumé : lien partagé, reprise, tests) ; clavier :
 *    espace (lecture), flèches gauche et droite (précédent, suivant si permis).
 *  · L'image courante et l'image atteinte appartiennent à une visite : une
 *    image rapportée pour une visite précédente ne compte jamais (ni pour la
 *    fin de narration, ni pour les clips entendus, ni pour « terminée »).
 *  · Signature bimaccess : l'en-tête devient la barre d'état mince de la
 *    scène (scene-frame.html) : pastille et code de programme, code de scène
 *    `<id>-<Sxx>`, titre de la scène, barre de progression, position ; le
 *    style est dans player-bimaccess.css. Signature carte : en-tête de
 *    feuille (player-carte.css) : pastille et code du programme, code de
 *    scène, titre de la scène en italique, échelle graphique de progression
 *    (une case par scène : terminées en encre, courante à la couleur du
 *    programme, à venir en papier), position. Signature neutre : rendu
 *    d'origine.
 */
import type { PlayerRef } from "@remotion/player"
import { type MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from "react"
import { BIM, CARTE } from "../engine/signature"
import { META } from "../generated/meta"
import { L } from "../i18n"
import { LESSON } from "../lesson/lesson"
import { type Runtime, RuntimeContext, type StageInput } from "./composition"
import { Controls } from "./Controls"
import { clearProgress, emptyProgress, loadProgress, type Progress, recordOf, saveProgress, withRecord } from "./progress"
import { durationInFrames, linearEnd, placeEvents } from "./schedule"
import { Stage } from "./Stage"

const SCENES = LESSON.scenes
const N = SCENES.length
const FPS = META.fps
const pad = (n: number) => String(n).padStart(2, "0")
/** Programme affiché à part seulement si l'identifiant ne commence pas déjà par lui (CER001-M01-L01). */
const PROGRAM_PREFIX = META.program && !META.id.toUpperCase().startsWith(META.program) ? META.program : null
/** Barre d'état : bimaccess et carte (la carte nomme toujours le programme, avant le code de scène). */
const STATUS_BAR = BIM || CARTE
const PROGRAM_LABEL = CARTE ? META.program : PROGRAM_PREFIX

/** Index de scène lu dans l'adresse (#/3 → 2), null si absent ou hors limites. */
function indexFromHash(): number | null {
  const m = /^#\/(\d+)$/.exec(window.location.hash)
  if (!m) return null
  const n = Number(m[1])
  return n >= 1 && n <= N ? n - 1 : null
}

type Visit = { readonly index: number; readonly revisit: boolean; readonly key: number }
/** Position dans la scène, rattachée à la visite (key) qui l'a produite. */
type Position = { readonly key: number; readonly frame: number; readonly reached: number }

export function App() {
  const [progress, setProgress] = useState<Progress>(loadProgress)
  const [visit, setVisit] = useState<Visit>(() => {
    const index = indexFromHash() ?? Math.min(progress.last, N - 1)
    const scene = SCENES[index]
    return { index, revisit: scene ? recordOf(progress, scene.id).completed : false, key: 0 }
  })
  // Progression trouvée au chargement : le bouton de départ dit « Reprendre »
  const [hasHistory] = useState(() => Object.values(progress.scenes).some((r) => r.visited))
  const [started, setStarted] = useState(false)
  const [ended, setEnded] = useState(false)
  const [position, setPosition] = useState<Position>({ key: -1, frame: 0, reached: 0 })
  const [playing, setPlaying] = useState(false)
  const playerRef = useRef<PlayerRef>(null)
  const shellRef = useRef<HTMLDivElement>(null)
  const [fullscreen, setFullscreen] = useState(false)
  const canFullscreen = typeof document !== "undefined" && document.fullscreenEnabled === true
  const resume = useRef(false)
  // Visite à laquelle le lecteur rapporte ses images : posée à l'entrée, après le positionnement
  const reportKey = useRef(-1)

  const scene = SCENES[visit.index]
  if (!scene) throw new Error(`scène ${visit.index + 1} absente de la leçon`)
  const record = recordOf(progress, scene.id)
  const state = useMemo(() => scene.model.restore(record.state), [scene, record.state])
  const events = useMemo(() => placeEvents(scene, record, FPS), [scene, record])
  const duration = durationInFrames(scene, events, FPS, record.actedAt)
  const durationRef = useRef(duration)
  durationRef.current = duration
  const hasVoice = Boolean(scene.clip?.clip.src) || events.some((e) => e.src)
  const captions = progress.captions ?? !hasVoice

  /* Position de la visite courante : tant que l'entrée n'a pas eu lieu, l'image de départ */
  const entered = position.key === visit.key
  const startFrame = visit.revisit ? duration - 1 : 0
  const frame = entered ? position.frame : startFrame
  const reached = entered ? position.reached : startFrame

  /* Statut de la scène à l'image courante (jamais libre avant la fin de la narration d'entrée) */
  const narrationDone = record.completed || (entered && reached >= Math.floor(linearEnd(scene) * FPS))
  const eventsDone = Object.keys(record.requested).every((id) => record.heard.includes(id))
  const own = scene.model.status({ state, narrationDone, eventsDone })
  const status = { nextAllowed: own.nextAllowed && narrationDone, completed: own.completed && narrationDone }
  const nextAllowed = record.completed || status.nextAllowed

  /* Persistance */
  useEffect(() => saveProgress(progress), [progress])

  /* Entrée dans une scène : visitée, dernière ouverte ; position de départ */
  useEffect(() => {
    setProgress((p) => withRecord({ ...p, last: visit.index }, scene.id, { visited: true }))
    // Nouvelle position rattachée à cette visite : aucune image d'une visite précédente ne compte ici
    const start = visit.revisit ? duration - 1 : 0
    reportKey.current = visit.key
    setPosition({ key: visit.key, frame: start, reached: start })
    const player = playerRef.current
    if (!player) return
    if (visit.revisit) {
      player.pause()
      player.seekTo(duration - 1)
    } else {
      player.seekTo(0)
      if (started) player.play()
    }
    // Uniquement à l'entrée (nouvelle visite) : pas à chaque changement de durée
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visit.key])

  /* Adresse : #/n tient la scène courante */
  useEffect(() => {
    const want = `#/${visit.index + 1}`
    if (window.location.hash !== want) window.history.replaceState(null, "", want)
  }, [visit.index])

  const enter = useCallback(
    (index: number) => {
      const target = SCENES[index]
      if (!target) return
      setEnded(false)
      setVisit((v) => ({ index, revisit: recordOf(progress, target.id).completed, key: v.key + 1 }))
    },
    [progress],
  )

  useEffect(() => {
    const onHash = () => {
      const i = indexFromHash()
      if (i !== null && i !== visit.index) enter(i)
    }
    window.addEventListener("hashchange", onHash)
    return () => window.removeEventListener("hashchange", onHash)
  }, [enter, visit.index])

  /* Suivi de l'image courante */
  useEffect(() => {
    const player = playerRef.current
    if (!player) return
    const onFrame = (e: { detail: { frame: number } }) => {
      const f = e.detail.frame
      // Image rapportée avant l'entrée de la visite courante : rattachée à l'ancienne, donc ignorée
      setPosition((p) => (p.key === reportKey.current ? { key: p.key, frame: f, reached: Math.max(p.reached, f) } : p))
    }
    const onPlay = () => setPlaying(true)
    const onPause = () => setPlaying(false)
    player.addEventListener("frameupdate", onFrame)
    player.addEventListener("seeked", onFrame)
    player.addEventListener("play", onPlay)
    player.addEventListener("pause", onPause)
    player.addEventListener("ended", onPause)
    return () => {
      player.removeEventListener("frameupdate", onFrame)
      player.removeEventListener("seeked", onFrame)
      player.removeEventListener("play", onPlay)
      player.removeEventListener("pause", onPause)
      player.removeEventListener("ended", onPause)
    }
  }, [])

  /* Clips déclenchés entendus en entier : notés, plus jamais rejoués */
  useEffect(() => {
    if (!entered) return
    const done = events.filter((e) => e.audible && frame >= Math.floor(e.start * FPS) && frame >= Math.floor(e.end * FPS)).map((e) => e.id)
    if (done.length) setProgress((p) => withRecord(p, scene.id, { heard: [...new Set([...recordOf(p, scene.id).heard, ...done])] }))
  }, [entered, events, frame, scene.id])

  /* Scène terminée (seulement pour la visite entrée : status.completed exige narrationDone, qui l'exige) */
  useEffect(() => {
    if (entered && status.completed && !record.completed) setProgress((p) => withRecord(p, scene.id, { completed: true }))
  }, [entered, status.completed, record.completed, scene.id])

  /* Clip déclenché demandé, ou geste à la dernière image : la durée s'allonge, la lecture continue */
  useEffect(() => {
    if (!resume.current) return
    resume.current = false
    playerRef.current?.play()
  }, [duration])

  const goNext = useCallback(() => {
    if (!nextAllowed) return
    if (visit.index >= N - 1) {
      playerRef.current?.pause()
      setEnded(true)
      return
    }
    enter(visit.index + 1)
  }, [nextAllowed, visit.index, enter])

  const goPrevious = useCallback(() => {
    if (visit.index > 0) enter(visit.index - 1)
  }, [visit.index, enter])

  const toggle = useCallback(() => {
    const player = playerRef.current
    if (!player) return
    if (player.isPlaying()) player.pause()
    else player.play()
  }, [])

  /* Actions de l'apprenant : réducteur de la scène, clips déclenchés demandés une seule fois */
  const sceneRef = useRef(scene)
  sceneRef.current = scene
  const send = useCallback((action: unknown) => {
    const s = sceneRef.current
    const at = playerRef.current?.getCurrentFrame() ?? 0
    setProgress((p) => {
      const rec = recordOf(p, s.id)
      const prev = s.model.restore(rec.state)
      const next = s.model.reduce(prev, action)
      if (next === prev) return p
      const asked = (s.model.triggers?.(prev, next) ?? []).filter((id) => s.events.includes(id) && rec.requested[id] === undefined && !rec.heard.includes(id))
      const requested = { ...rec.requested }
      for (const id of asked) requested[id] = at
      // Geste à la dernière image (lecture finie) : la scène s'allonge, la lecture reprend pour le montrer
      if (asked.length || at >= durationRef.current - 1) resume.current = true
      return withRecord(p, s.id, { state: next, actedAt: at / FPS, requested })
    })
  }, [])

  const nextRef = useRef(goNext)
  nextRef.current = goNext
  const runtime = useMemo<Runtime>(() => ({ send, next: () => nextRef.current() }), [send])

  /* Clavier */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!started || ended || e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return
      const el = e.target instanceof HTMLElement ? e.target : null
      const tag = el?.tagName ?? ""
      const field = tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || Boolean(el?.isContentEditable)
      if (e.key === " " || e.key === "Spacebar") {
        if (field || tag === "BUTTON") return
        e.preventDefault()
        toggle()
      } else if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        if (field || el?.closest('[role="radiogroup"]')) return
        e.preventDefault()
        if (e.key === "ArrowRight") goNext()
        else goPrevious()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [started, ended, toggle, goNext, goPrevious])

  const onStart = (e: MouseEvent) => {
    const player = playerRef.current
    setStarted(true)
    if (!player) return
    // play(e) dans le clic débloque les éléments audio partagés du lecteur
    player.play(e)
    if (visit.revisit) {
      player.pause()
      player.seekTo(duration - 1)
    }
  }

  /* Plein écran (écran étroit) : la scène prend toute la hauteur, à l'horizontale si possible */
  useEffect(() => {
    const onChange = () => setFullscreen(document.fullscreenElement !== null)
    document.addEventListener("fullscreenchange", onChange)
    return () => document.removeEventListener("fullscreenchange", onChange)
  }, [])
  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      void document.exitFullscreen().catch(() => {})
      return
    }
    const el = shellRef.current
    if (!el) return
    el.requestFullscreen()
      .then(() => {
        // Verrouillage d'orientation : seulement là où le navigateur le permet (en plein écran)
        const orientation = screen.orientation as ScreenOrientation & { lock?: (o: string) => Promise<void> }
        return orientation.lock?.("landscape")
      })
      .catch(() => {})
  }

  const onRestart = () => {
    clearProgress()
    const fresh = { ...emptyProgress(), captions: progress.captions }
    setProgress(fresh)
    setEnded(false)
    setVisit((v) => ({ index: 0, revisit: false, key: v.key + 1 }))
  }

  const input = useMemo<StageInput>(
    () => ({ index: visit.index, state, revisit: visit.revisit, actedAt: record.actedAt, events, captions }),
    [visit.index, state, visit.revisit, record.actedAt, events, captions],
  )


  return (
    <RuntimeContext.Provider value={runtime}>
      <div className="studio" ref={shellRef} data-started={started ? "true" : "false"} data-fullscreen={fullscreen ? "true" : "false"}>
        <header className="studio-head">
          {STATUS_BAR ? (
            <span className="studio-code" data-testid="scene-code">
              <i className="studio-chip" aria-hidden="true" />
              {PROGRAM_LABEL ? (
                <>
                  <span className="studio-program">{PROGRAM_LABEL}</span>
                  <span className="studio-sep" aria-hidden="true">
                    ·
                  </span>
                </>
              ) : null}
              <span>{`${META.id}-${scene.id}`}</span>
            </span>
          ) : null}
          <div className="studio-titles">
            <span className="studio-title">{META.title}</span>
            <span className="studio-scene-title" data-testid="scene-title">
              {scene.title}
            </span>
          </div>
          {BIM ? (
            <span className="studio-progress" aria-hidden="true">
              <i style={{ width: `${(100 * (visit.index + 1)) / N}%` }} />
            </span>
          ) : null}
          {CARTE ? (
            <span className="studio-scale" data-testid="progress-scale" aria-hidden="true">
              {SCENES.map((s, i) => (
                <i key={s.id} className={i === visit.index ? "is-current" : recordOf(progress, s.id).completed ? "is-done" : undefined} />
              ))}
            </span>
          ) : null}
          <span className="studio-position" data-testid="position" aria-label={`${L.position} ${visit.index + 1} / ${N}`}>
            {pad(visit.index + 1)} / {pad(N)}
          </span>
        </header>
        <main className="studio-main">
          <Stage
            ref={playerRef}
            input={input}
            duration={duration}
            sceneId={scene.id}
            frame={frame}
            playing={playing}
            voice={scene.clip?.clip.src ?? null}
            nextAllowed={nextAllowed}
            completed={record.completed || status.completed}
            narrationEnd={Math.floor(linearEnd(scene) * FPS)}
          />
          {!started ? (
            <div className="studio-overlay" data-testid="start-screen">
              <div className="studio-card">
                {STATUS_BAR ? <p className="studio-card-code">{PROGRAM_PREFIX ? `${PROGRAM_PREFIX} · ${META.id}` : META.id}</p> : null}
                <p className="studio-card-title">{META.title}</p>
                <button type="button" className="studio-btn studio-btn-primary" data-testid="start" onClick={onStart} autoFocus>
                  {hasHistory ? L.resume : L.start}
                </button>
                <p className="studio-card-hint">{L.startHint}</p>
              </div>
            </div>
          ) : null}
          {ended ? (
            <div className="studio-overlay" data-testid="end">
              <div className="studio-card">
                <p className="studio-card-title">{L.endTitle}</p>
                <p className="studio-card-hint">{L.endText}</p>
                <button type="button" className="studio-btn studio-btn-primary" data-testid="restart" onClick={onRestart} autoFocus>
                  {L.restart}
                </button>
              </div>
            </div>
          ) : null}
        </main>
        <div className="studio-narrow" data-testid="narrow-hint">
          <span>{L.rotateHint}</span>
          {canFullscreen ? (
            <button type="button" className="studio-btn" data-testid="fullscreen" aria-pressed={fullscreen} onClick={toggleFullscreen}>
              {fullscreen ? L.exitFullscreen : L.fullscreen}
            </button>
          ) : null}
        </div>
        <Controls
          frame={frame}
          duration={duration}
          playing={playing}
          captions={captions}
          nextAllowed={nextAllowed}
          isFirst={visit.index === 0}
          isLast={visit.index === N - 1}
          disabled={!started || ended}
          onPrevious={goPrevious}
          onNext={goNext}
          onToggle={toggle}
          onSeek={(f) => playerRef.current?.seekTo(f)}
          onCaptions={() => setProgress((p) => ({ ...p, captions: !captions }))}
        />
      </div>
    </RuntimeContext.Provider>
  )
}
