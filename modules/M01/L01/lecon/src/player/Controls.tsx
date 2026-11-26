/**
 * Pied du lecteur : Précédent, lecture/pause, curseur de narration (valeur =
 * image), sous-titres, Suivant avec son verrou visible. Signature bimaccess :
 * curseur rempli à la couleur du programme (variable --p), cadenas au trait
 * d'action-button.html ; le reste est du style (player-bimaccess.css).
 */
import type { CSSProperties } from "react"
import { BIM } from "../engine/signature"
import { L } from "../i18n"

const Icon = ({ d }: { readonly d: string }) => (
  <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false">
    <path d={d} fill="currentColor" />
  </svg>
)

const PLAY = "M7 4.5v15l13-7.5z"
const PAUSE = "M6 4h4.5v16H6zM13.5 4H18v16h-4.5z"
const LOCK = "M7 10V7.5a5 5 0 0 1 10 0V10h1.5v11h-13V10zm2.2 0h5.6V7.5a2.8 2.8 0 0 0-5.6 0z"

/** Cadenas au trait (design-system/components/action-button.html). */
const Padlock = () => (
  <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="1.4">
    <rect x="3" y="7" width="10" height="7" />
    <path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" />
  </svg>
)

export function Controls({
  frame,
  duration,
  playing,
  captions,
  nextAllowed,
  isFirst,
  isLast,
  disabled,
  onPrevious,
  onNext,
  onToggle,
  onSeek,
  onCaptions,
}: {
  readonly frame: number
  readonly duration: number
  readonly playing: boolean
  readonly captions: boolean
  readonly nextAllowed: boolean
  readonly isFirst: boolean
  readonly isLast: boolean
  readonly disabled: boolean
  readonly onPrevious: () => void
  readonly onNext: () => void
  readonly onToggle: () => void
  readonly onSeek: (frame: number) => void
  readonly onCaptions: () => void
}) {
  const max = Math.max(0, duration - 1)
  const scrubStyle = BIM ? ({ "--p": `${max > 0 ? (100 * Math.min(frame, max)) / max : 0}%` } as CSSProperties) : undefined
  return (
    <footer className="studio-foot">
      <button type="button" className="studio-btn studio-prev" data-testid="previous" disabled={disabled || isFirst} onClick={onPrevious}>
        <span aria-hidden="true">‹</span> {L.previous}
      </button>
      <div className="studio-narration">
        <button type="button" className="studio-icon-btn" data-testid="narration-toggle" aria-label={playing ? L.pause : L.play} aria-pressed={playing} disabled={disabled} onClick={onToggle}>
          <Icon d={playing ? PAUSE : PLAY} />
        </button>
        <input
          type="range"
          className="studio-scrub"
          data-testid="narration-scrub"
          aria-label={L.scrub}
          min={0}
          max={max}
          step={1}
          value={Math.min(frame, max)}
          disabled={disabled}
          style={scrubStyle}
          onChange={(e) => onSeek(Number(e.currentTarget.value))}
        />
        <button type="button" className="studio-btn studio-captions" data-testid="captions-toggle" aria-pressed={captions} disabled={disabled} onClick={onCaptions}>
          {L.captions}
        </button>
      </div>
      <div className="studio-next-box">
        {nextAllowed ? null : (
          <span className="studio-lock" data-testid="next-locked" title={L.locked} role="img" aria-label={L.locked}>
            {BIM ? <Padlock /> : <Icon d={LOCK} />}
          </span>
        )}
        <button type="button" className="studio-btn studio-btn-primary studio-next" data-testid="next" disabled={disabled || !nextAllowed} onClick={onNext}>
          {isLast ? L.finish : L.next} <span aria-hidden="true">›</span>
        </button>
      </div>
    </footer>
  )
}
