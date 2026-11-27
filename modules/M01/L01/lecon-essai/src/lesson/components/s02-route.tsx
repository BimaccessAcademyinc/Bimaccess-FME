/**
 * Route d'écriture de S02 (dans un <svg>) : trois traits superposés, même
 * chemin, même instant, même durée (bord `encre` 13, chaussée `chaussee` 9,
 * axe `ecriture` 5), tracés à vitesse constante, **bouts ronds** et angles
 * vifs (charte : « angles vifs, sauf les bouts ronds des routes »).
 *
 * Écart au moteur : `Trace` est à bouts nets en signature carte et n'a pas de
 * prop de bout ; le moteur ne se modifie pas pendant la production. Ce
 * composant reprend le procédé de `Trace` (pathLength 1, stroke-dashoffset,
 * avancement linéaire `prog`) avec `stroke-linecap: round`. À remplacer par
 * trois `Trace cap="round"` quand le moteur saura le faire.
 */
import { type Point, prog, THEME, useT } from "../../engine"

const C = THEME.colors
const LAYERS = [
  { color: C.encre, width: 13 },
  { color: C.chaussee, width: 9 },
  { color: C.ecriture, width: 5 },
] as const

export function Route({ points, at, dur }: { readonly points: readonly Point[]; readonly at: number; readonly dur: number }) {
  const t = useT()
  const p = prog(t, at, dur)
  if (p <= 0 || points.length < 2) return null
  const d = points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ")
  return (
    <g>
      {LAYERS.map((l) => (
        <path key={l.width} d={d} fill="none" stroke={l.color} strokeWidth={l.width} strokeLinecap="round" strokeLinejoin="miter" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - p} />
      ))}
    </g>
  )
}
