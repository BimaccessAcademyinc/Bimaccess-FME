/**
 * Contrôles de composition bloquants d'une scène à gabarit, faits au
 * chargement (npm run check, build) sur le plan (plan.ts). Ils refusent :
 *
 *   1. un vide : un rectangle vide d'au moins VIDE_MIN_LARGEUR × VIDE_MIN_HAUTEUR
 *      px dans la face de carte (ZONE) de la composition finale ;
 *   2. un débord : un texte, une mise en évidence, une illustration ou un
 *      tracé hors de la face, même d'un pixel (seule la ligne de la frise peut
 *      aller jusqu'à x 1500 entre y 360 et y 690, charte) ;
 *   3. un texte sur un trait : tracé, frise, cases des années, ou contour
 *      d'une mise en évidence allumée pendant que le texte est à l'écran ;
 *   4. un chevauchement dans la composition finale entre illustrations et
 *      textes, sauf un élément posé sur son support (`sur`, ou `dans` pour un
 *      texte), qu'il doit tenir en entier.
 *
 * Les textes sont mesurés sans navigateur : avance de chaque caractère lue
 * dans les fichiers des polices de la leçon (metriques.json, écrit par
 * scripts/metriques-polices.mjs), corps, graisse, italique, capitales,
 * interlettrage ; retour à la ligne glouton sur les espaces pour un texte à
 * `largeur`. Le crénage est ignoré (écart de quelques px par ligne, voir
 * docs/gabarits.md, § 9). Tous les défauts sont listés dans une seule
 * GabaritError.
 */
import { getLength, getPointAtLength } from "@remotion/paths"
import type { Point } from "../anim"
import { GabaritError } from "./donnees"
import METRIQUES from "./metriques.json"
import type { Plan, PlanTexte } from "./plan"

/** Face de carte de la charte (CHARTE-FME001 § 4) : x 104 à 1424, du bas du titre (y 180) au haut des sous-titres (y 860). La zone d'action (x 1454, y 834, 360 × 140) est hors de la face. */
export const ZONE = { x0: 104, y0: 180, x1: 1424, y1: 860 } as const
/** Débord permis à la seule ligne de la frise (charte) : jusqu'à x 1500, entre y 360 et y 690. */
export const DEBORD_FRISE = { x1: 1500, y0: 360, y1: 690 } as const
/** Contrôle 1 : aucun rectangle vide d'au moins 200 × 150 px dans la face (le vide de 210 × 160 px de S02 à l'essai 3 est refusé). */
export const VIDE_MIN_LARGEUR = 200
export const VIDE_MIN_HAUTEUR = 150
/** Contrôle 3 : garde autour d'un texte (sa réserve : 6 px à gauche et à droite, 2 px en haut et en bas) qu'aucun trait ne doit toucher. */
export const GARDE_X = 6
export const GARDE_Y = 2
/** Demi-épaisseur du tireté d'une mise en évidence (2,5 px, centré sur le bord du rectangle). */
const DEMI_TIRETE = 1.25
/** Tolérance d'arrondi (px) des contrôles 2 et 4. */
const TOL = 0.5
/** Pas de la grille du contrôle 1 (px) : un vide mesuré est au plus 2 px plus petit que le vrai. */
const PAS = 2

export type Rect = { readonly x0: number; readonly y0: number; readonly x1: number; readonly y1: number; readonly qui: string }

const r1 = (n: number): string => (Math.round(n * 10) / 10).toString().replace(".", ",")
const decrire = (b: Rect): string => `x ${r1(b.x0)} à ${r1(b.x1)}, y ${r1(b.y0)} à ${r1(b.y1)}`

/* ── Mesure des textes ────────────────────────────────────────────────────── */

type Table = Readonly<Record<string, number>>
const M = METRIQUES as unknown as Readonly<Record<string, Readonly<Record<string, Readonly<Record<string, Table>>>>>>

function tableDe(famille: string, graisse: number, italique: boolean, ou: string): Table {
  const f = M[famille]
  if (!f) throw new GabaritError(`${ou} : police « ${famille} » sans métriques. À faire : l'ajouter à scripts/metriques-polices.mjs et relancer « node scripts/metriques-polices.mjs »`)
  const graisses = Object.keys(f).map(Number)
  const g = graisses.reduce((a, b) => (Math.abs(b - graisse) < Math.abs(a - graisse) ? b : a))
  const parStyle = f[String(g)] ?? {}
  return (italique ? parStyle.italic : undefined) ?? (parStyle.normal as Table)
}

/** Largeur d'encre d'une ligne (px) : avances × corps, plus l'interlettrage entre les caractères (pas après le dernier). */
function largeurLigne(s: string, t: Table, corps: number, track: number): number {
  const cars = [...s]
  if (cars.length === 0) return 0
  const defaut = t["défaut"] ?? 500
  const g = cars.reduce((a, c) => a + (t[c] ?? defaut), 0)
  return (g * corps) / 1000 + track * (cars.length - 1)
}

/** Boîte d'encre d'un texte (px de scène) et ses lignes, telles que le navigateur les pose (left, cx centré, retour à la ligne glouton à `largeur`). */
export function mesurer(id: string, p: PlanTexte, ou: string): Rect & { readonly lignes: readonly string[] } {
  const s = p.style
  const t = tableDe(s.famille, s.graisse, s.italique, ou)
  const texte = s.capitales ? p.texte.toUpperCase() : p.texte
  const track = s.interlettrage * s.taille
  const w = (l: string) => largeurLigne(l, t, s.taille, track)
  let lignes: string[]
  if (p.d.largeur === null) lignes = [texte]
  else {
    lignes = []
    let cur = ""
    for (const mot of texte.split(" ")) {
      const essai = cur === "" ? mot : `${cur} ${mot}`
      if (cur !== "" && w(essai) > p.d.largeur) {
        lignes.push(cur)
        cur = mot
      } else cur = essai
    }
    lignes.push(cur)
  }
  const large = Math.max(...lignes.map(w))
  const x0 = p.d.cx !== null ? p.d.cx - large / 2 : (p.d.x ?? 0)
  const h = s.taille * s.interligne * lignes.length
  return { x0, y0: p.d.y, x1: x0 + large, y1: p.d.y + h, qui: `textes.${id}`, lignes }
}

/* ── Géométrie de la composition ──────────────────────────────────────────── */

const pathOf = (points: readonly Point[]): string => points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ")

/** Un trait : chemin, demi-épaisseur, nom, et intervalle où il est visible. */
type Trait = { readonly d: string; readonly demi: number; readonly qui: string; readonly de: number; readonly a: number; readonly ferme: boolean }

function traits(plan: Plan): Trait[] {
  const r: Trait[] = []
  for (const [id, t] of plan.traces) {
    const e = Math.max(...t.d.couches.map((c) => c.epaisseur))
    r.push({ d: t.d.d ?? pathOf(t.d.points ?? []), demi: e / 2, qui: `traces.${id}`, de: t.rev.at, a: Number.POSITIVE_INFINITY, ferme: t.d.remplissage !== null })
  }
  if (plan.frise) {
    r.push({ d: pathOf([plan.frise.de, plan.frise.a]), demi: plan.frise.epaisseur / 2, qui: "frise", de: 0, a: Number.POSITIVE_INFINITY, ferme: false })
    r.push({ d: `${pathOf(plan.frise.pointe)} Z`, demi: 0.5, qui: "frise.pointe", de: 0, a: Number.POSITIVE_INFINITY, ferme: true })
  }
  for (const [id, a] of plan.annees) r.push({ d: pathOf([a.d.de, a.d.a]), demi: a.d.epaisseur / 2, qui: `annees.${id}`, de: a.rev.at, a: Number.POSITIVE_INFINITY, ferme: false })
  for (const e of plan.evidences) {
    const { x, y, largeur: w, hauteur: h } = e.d
    const d =
      e.d.forme === "circle"
        ? (() => {
            const cx = x + w / 2
            const cy = y + h / 2
            const rr = Math.hypot(w, h) / 2
            return `M${cx - rr} ${cy} A${rr} ${rr} 0 1 0 ${cx + rr} ${cy} A${rr} ${rr} 0 1 0 ${cx - rr} ${cy}`
          })()
        : `${pathOf([[x, y], [x + w, y], [x + w, y + h], [x, y + h]])} Z`
    r.push({ d, demi: DEMI_TIRETE, qui: `evidences.${e.d.id} (contour)`, de: e.at, a: e.fin, ferme: false })
  }
  return r
}

/** Points d'un chemin tous les px au plus (un sous-chemin fermé compris). */
const CACHE = new Map<string, Point[]>()
function echantillons(d: string): Point[] {
  const vu = CACHE.get(d)
  if (vu) return vu
  const L = getLength(d)
  const n = Math.max(2, Math.ceil(L))
  const pts: Point[] = []
  for (let i = 0; i <= n; i++) {
    const p = getPointAtLength(d, (L * i) / n)
    if (p) pts.push([p.x, p.y])
  }
  CACHE.set(d, pts)
  return pts
}

function boiteTrait(t: Trait): Rect {
  const pts = echantillons(t.d)
  const xs = pts.map((p) => p[0])
  const ys = pts.map((p) => p[1])
  return { x0: Math.min(...xs) - t.demi, y0: Math.min(...ys) - t.demi, x1: Math.max(...xs) + t.demi, y1: Math.max(...ys) + t.demi, qui: t.qui }
}

const dedans = (p: Point, b: Rect, m: number): boolean => p[0] >= b.x0 - m && p[0] <= b.x1 + m && p[1] >= b.y0 - m && p[1] <= b.y1 + m

/* ── Les quatre contrôles ─────────────────────────────────────────────────── */

type Defaut = { readonly champ: string; readonly quoi: string; readonly faire: string }

/** Boîtes finales des illustrations (place d'arrivée) et des textes (encre mesurée), avec leur support. */
function elementsFinals(plan: Plan): { readonly b: Rect; readonly id: string; readonly support: string | null }[] {
  const r: { b: Rect; id: string; support: string | null }[] = []
  for (const [id, p] of plan.illustrations) {
    const x = p.move ? p.move.vers[0] : p.boite.left
    const y = p.move ? p.move.vers[1] : p.boite.top
    r.push({ b: { x0: x, y0: y, x1: x + p.boite.width, y1: y + p.boite.height, qui: `illustrations.${id}` }, id, support: p.d.sur })
  }
  for (const [id, p] of plan.textes) r.push({ b: mesurer(id, p, `${plan.d.fichier}, champ « textes.${id} »`), id, support: p.d.dans ?? p.d.sur })
  return r
}

export function controlerComposition(plan: Plan): void {
  const F = plan.d.fichier
  const defauts: Defaut[] = []
  const elements = elementsFinals(plan)
  const parId = new Map(elements.map((e) => [e.id, e]))
  const lesTraits = traits(plan)

  // Supports déclarés : connus, sans boucle
  for (const e of elements) {
    if (e.support === null) continue
    const champ = `${e.b.qui}.${plan.textes.get(e.id)?.d.dans ? "dans" : "sur"}`
    if (!plan.illustrations.has(e.support)) defauts.push({ champ, quoi: `support « ${e.support} » absent de « illustrations »`, faire: `nommer l'illustration sur laquelle l'élément est posé (connues : ${[...plan.illustrations.keys()].join(", ")})` })
    const vus = new Set<string>([e.id])
    let s: string | null = e.support
    while (s !== null) {
      if (vus.has(s)) {
        defauts.push({ champ, quoi: `les supports forment une boucle (${[...vus, s].join(" → ")})`, faire: "un élément est posé sur un support, jamais sur lui-même" })
        break
      }
      vus.add(s)
      s = plan.illustrations.get(s)?.d.sur ?? null
    }
  }
  const ancetres = (id: string): Set<string> => {
    const a = new Set<string>()
    let s = parId.get(id)?.support ?? null
    while (s !== null && !a.has(s)) {
      a.add(s)
      s = parId.get(s)?.support ?? null
    }
    return a
  }

  // 2. Débords hors de la face
  const horsFace = (b: Rect, x1: number = ZONE.x1): string | null => {
    const d: string[] = []
    if (b.x0 < ZONE.x0 - TOL) d.push(`${r1(ZONE.x0 - b.x0)} px à gauche de x ${ZONE.x0}`)
    if (b.x1 > x1 + TOL) d.push(`${r1(b.x1 - x1)} px à droite de x ${x1}`)
    if (b.y0 < ZONE.y0 - TOL) d.push(`${r1(ZONE.y0 - b.y0)} px au-dessus de y ${ZONE.y0}`)
    if (b.y1 > ZONE.y1 + TOL) d.push(`${r1(b.y1 - ZONE.y1)} px au-dessous de y ${ZONE.y1}`)
    return d.length ? d.join(", ") : null
  }
  const faceTxt = `la face de carte (x ${ZONE.x0} à ${ZONE.x1}, y ${ZONE.y0} à ${ZONE.y1})`
  for (const e of elements) {
    const h = horsFace(e.b)
    if (h) defauts.push({ champ: e.b.qui, quoi: `${plan.textes.has(e.id) ? "texte" : "illustration"} hors de ${faceTxt} : ${decrire(e.b)}, ${h}`, faire: "le replacer ou le réduire pour qu'il tienne dans la face ; un texte se mesure avec ses polices (docs/gabarits.md, § 9)" })
  }
  for (const [id, p] of plan.illustrations) {
    if (!p.move) continue
    const b = { x0: p.boite.left, y0: p.boite.top, x1: p.boite.left + p.boite.width, y1: p.boite.top + p.boite.height, qui: `illustrations.${id}` }
    const h = horsFace(b)
    if (h) defauts.push({ champ: b.qui, quoi: `illustration hors de ${faceTxt} avant son déplacement : ${decrire(b)}, ${h}`, faire: "replacer son point de départ dans la face" })
  }
  for (const e of plan.evidences) {
    const { x, y, largeur: w, hauteur: hh } = e.d
    let b: Rect
    if (e.d.forme === "circle") {
      const rr = Math.hypot(w, hh) / 2 + DEMI_TIRETE
      b = { x0: x + w / 2 - rr, y0: y + hh / 2 - rr, x1: x + w / 2 + rr, y1: y + hh / 2 + rr, qui: e.d.chemin }
    } else b = { x0: x - DEMI_TIRETE, y0: y - DEMI_TIRETE, x1: x + w + DEMI_TIRETE, y1: y + hh + DEMI_TIRETE, qui: e.d.chemin }
    const h = horsFace(b)
    if (h) defauts.push({ champ: e.d.chemin, quoi: `mise en évidence hors de ${faceTxt} (tireté de 2,5 px compris${e.d.forme === "circle" ? ", cercle de rayon demi-diagonale" : ""}) : ${decrire(b)}, ${h}`, faire: "réduire ou déplacer le rectangle pour qu'il tienne dans la face, puis vérifier qu'il entoure encore son élément" })
  }
  for (const t of lesTraits) {
    if (t.qui.startsWith("evidences.")) continue
    const b = boiteTrait(t)
    const frise = t.qui === "frise" || t.qui === "frise.pointe"
    const permisFrise = frise && b.y0 >= DEBORD_FRISE.y0 && b.y1 <= DEBORD_FRISE.y1
    const h = horsFace(b, permisFrise ? DEBORD_FRISE.x1 : ZONE.x1)
    if (h) defauts.push({ champ: t.qui, quoi: `tracé hors de ${faceTxt}${frise ? ` (la ligne de la frise seule peut aller jusqu'à x ${DEBORD_FRISE.x1} entre y ${DEBORD_FRISE.y0} et y ${DEBORD_FRISE.y1})` : ""} : ${decrire(b)}, ${h}`, faire: "replacer ses points dans la face" })
  }

  // 3. Texte sur un trait (garde : la réserve du texte)
  for (const [id, p] of plan.textes) {
    const b = parId.get(id)?.b
    const at = p.rev?.at ?? 0
    if (!b) continue
    for (const t of lesTraits) {
      if (t.a <= at) continue
      const g: Rect = { x0: b.x0 - GARDE_X, y0: b.y0 - GARDE_Y, x1: b.x1 + GARDE_X, y1: b.y1 + GARDE_Y, qui: b.qui }
      const touche = echantillons(t.d).find((q) => dedans(q, g, t.demi))
      if (touche) defauts.push({ champ: `textes.${id}`, quoi: `texte posé sur le trait « ${t.qui} » : le texte occupe ${decrire(b)} (réserve de ${GARDE_X} px et ${GARDE_Y} px comprise : ${decrire(g)}), le trait passe en x ${r1(touche[0])}, y ${r1(touche[1])}`, faire: "déplacer le texte (ou le trait) dans une zone vide ; pour un contour de mise en évidence, agrandir le rectangle pour qu'il entoure le texte sans le toucher" })
    }
  }

  // 4. Chevauchements de la composition finale
  for (let i = 0; i < elements.length; i++) {
    const a = elements[i]
    if (!a) continue
    for (let j = i + 1; j < elements.length; j++) {
      const b = elements[j]
      if (!b) continue
      const ix = Math.min(a.b.x1, b.b.x1) - Math.max(a.b.x0, b.b.x0)
      const iy = Math.min(a.b.y1, b.b.y1) - Math.max(a.b.y0, b.b.y0)
      if (ix <= TOL || iy <= TOL) continue
      if (ancetres(a.id).has(b.id) || ancetres(b.id).has(a.id)) continue
      defauts.push({ champ: a.b.qui, quoi: `chevauche ${b.b.qui} dans la composition finale : ${r1(ix)} × ${r1(iy)} px en commun (${decrire(a.b)} ; ${decrire(b.b)})`, faire: `les séparer ; si l'un est posé sur l'autre (texte dans une carte, objet sur la feuille), le déclarer : « sur »: "<support>" sur l'élément posé, qui doit tenir en entier dans son support` })
    }
    if (a.support !== null) {
      const s = parId.get(a.support)?.b
      if (s && (a.b.x0 < s.x0 - TOL || a.b.x1 > s.x1 + TOL || a.b.y0 < s.y0 - TOL || a.b.y1 > s.y1 + TOL)) {
        defauts.push({ champ: a.b.qui, quoi: `posé sur « ${a.support} » mais en déborde : ${decrire(a.b)} ; support ${decrire(s)}`, faire: "le replacer (ou le réduire) pour qu'il tienne en entier dans son support" })
      }
    }
  }

  // 1. Remplissage : aucun rectangle vide d'au moins VIDE_MIN_LARGEUR × VIDE_MIN_HAUTEUR
  const boites: Rect[] = [...elements.map((e) => e.b), ...lesTraits.filter((t) => !t.qui.startsWith("evidences.")).map(boiteTrait)]
  const v = plusGrandVide(boites)
  if (v) {
    const bord = (b: Rect) => b.x1 >= v.x0 - 30 && b.x0 <= v.x1 + 30 && b.y1 >= v.y0 - 30 && b.y0 <= v.y1 + 30
    defauts.push({
      champ: "(composition finale)",
      quoi: `la face n'est pas remplie : vide de ${decrire(v)} (${r1(v.x1 - v.x0)} × ${r1(v.y1 - v.y0)} px), refusé à partir de ${VIDE_MIN_LARGEUR} × ${VIDE_MIN_HAUTEUR} px dans ${faceTxt} ; éléments qui le bordent : ${boites.filter(bord).map((b) => b.qui).join(", ") || "aucun"}`,
      faire: "agrandir ou déplacer des illustrations vers ce vide (largeur libre, hauteur tirée du viewBox), puis replacer textes, tracés et mises en évidence sur les nouvelles boîtes",
    })
  }

  if (defauts.length) {
    const corps = defauts.map((d, i) => `${defauts.length > 1 ? `\n  ${i + 1}. ` : ""}champ « ${d.champ} » : ${d.quoi}. À faire : ${d.faire}`).join("")
    throw new GabaritError(`${F}, ${defauts.length > 1 ? `${defauts.length} défauts de composition (docs/gabarits.md, § 9) :` : ""}${corps}`)
  }
}

/**
 * Contrôle 1 : le plus grand (en aire) des rectangles vides d'au moins
 * VIDE_MIN_LARGEUR × VIDE_MIN_HAUTEUR px, ou null. Grille de PAS px ; une
 * cellule est pleine dès qu'une boîte la touche (le vide mesuré est par défaut,
 * d'au plus 2 px). Méthode de l'histogramme : chaque rectangle vide maximal
 * est vu par la colonne qui le borne en hauteur.
 */
function plusGrandVide(boites: readonly Rect[]): Rect | null {
  const nx = Math.ceil((ZONE.x1 - ZONE.x0) / PAS)
  const ny = Math.ceil((ZONE.y1 - ZONE.y0) / PAS)
  const plein: Uint8Array[] = Array.from({ length: ny }, () => new Uint8Array(nx))
  for (const b of boites) {
    const i0 = Math.max(0, Math.floor((b.x0 - ZONE.x0) / PAS))
    const i1 = Math.min(nx, Math.ceil((b.x1 - ZONE.x0) / PAS))
    const j0 = Math.max(0, Math.floor((b.y0 - ZONE.y0) / PAS))
    const j1 = Math.min(ny, Math.ceil((b.y1 - ZONE.y0) / PAS))
    for (let j = j0; j < j1; j++) (plein[j] as Uint8Array).fill(1, i0, Math.max(i0, i1))
  }
  const wMin = Math.ceil(VIDE_MIN_LARGEUR / PAS)
  const hMin = Math.ceil(VIDE_MIN_HAUTEUR / PAS)
  const haut = new Int32Array(nx)
  let best: { x: number; y: number; w: number; h: number } | null = null
  for (let j = 0; j < ny; j++) {
    const ligne = plein[j] as Uint8Array
    for (let i = 0; i < nx; i++) haut[i] = ligne[i] ? 0 : (haut[i] ?? 0) + 1
    const pile: number[] = []
    for (let i = 0; i <= nx; i++) {
      const hi = i < nx ? (haut[i] ?? 0) : 0
      while (pile.length && (haut[pile[pile.length - 1] as number] ?? 0) >= hi) {
        const h = haut[pile.pop() as number] ?? 0
        const gauche = pile.length ? (pile[pile.length - 1] as number) + 1 : 0
        const w = i - gauche
        if (w >= wMin && h >= hMin && (!best || w * h > best.w * best.h)) best = { x: gauche, y: j - h + 1, w, h }
      }
      pile.push(i)
    }
  }
  if (!best) return null
  const x0 = ZONE.x0 + best.x * PAS
  const y0 = ZONE.y0 + best.y * PAS
  return { x0, y0, x1: Math.min(ZONE.x1, x0 + best.w * PAS), y1: Math.min(ZONE.y1, y0 + best.h * PAS), qui: "vide" }
}
