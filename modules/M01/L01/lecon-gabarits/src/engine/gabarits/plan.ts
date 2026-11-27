/**
 * Plan d'une scène à gabarit : les données lues (donnees.ts) deviennent des
 * instants et des places, avec les contrôles croisés faits au chargement :
 *
 *   - textes : indice dans « ## Écran », chaque texte posé une fois ;
 *   - illustrations : fichier connu, viewBox lisible ;
 *   - étapes : locution dite mot pour mot et unique, ordre de la narration,
 *     gestes enchaînés qui finissent avant l'étape suivante, chaque élément
 *     révélé une fois ;
 *   - états : premier à l'image 0, dernier `Sxx-FIN` ;
 *   - mises en évidence : une seule à la fois (intervalles disjoints) ;
 *   - remplissage : la composition finale occupe la zone utile de la feuille.
 *
 * Aucun instant n'est écrit : chacun vient d'une locution ou d'un repère,
 * plus les durées de la spécification.
 */
import { META } from "../../generated/meta"
import { getBoundingBox, getLength } from "@remotion/paths"
import type { Point, WipeDir } from "../anim"
import { type Illustration, illustration, type SceneTexts, sceneTexts } from "../texts"
import { type Step, voice } from "../timeline"
import type { Voice } from "../types"
import { type AnneesD, type Donnees, type EtapeD, type EvidenceD, type FriseD, type GesteD, type IllustrationD, Lecteur, SENS, type StyleD, type TexteD, type TraceD } from "./donnees"
import { type Boite, poser, sourceHref } from "./pieces"

/**
 * Zone utile de la feuille, la même pour les deux gabarits (px de scène) :
 * du bas du titre au haut des sous-titres, du bord gauche de la face au bord
 * gauche de la marge. La zone d'action (x 1454, y 834) est hors de la zone.
 */
export const ZONE = { x0: 104, y0: 180, x1: 1424, y1: 860 } as const
/** Plus grand vide toléré dans la composition finale : un quart de la largeur ET un quart de la hauteur de la zone. */
export const VIDE_MAX = 0.25

export type Revelation = { readonly at: number; readonly dur: number; readonly type: GesteD["type"]; readonly dir: WipeDir; readonly chemin: string }

export type PlanIllustration = { readonly d: IllustrationD; readonly ill: Illustration; readonly boite: Boite; readonly rev: Revelation | null; readonly move: { readonly at: number; readonly dur: number; readonly vers: Point } | null }
export type PlanTexte = { readonly d: TexteD; readonly texte: string; readonly style: StyleD; readonly rev: Revelation | null }
export type PlanTrace = { readonly d: TraceD; readonly rev: Revelation }
export type PlanAnnees = { readonly d: AnneesD; readonly rev: Revelation; readonly retard: number; readonly durClaire: number }
export type PlanBande = { readonly haut: number; readonly bas: number; readonly at: number; readonly dur: number }
export type PlanEvidence = { readonly d: EvidenceD; readonly at: number; readonly fin: number }
export type Piece = { readonly sorte: "illustration"; readonly id: string } | { readonly sorte: "trace"; readonly id: string } | { readonly sorte: "annees"; readonly id: string } | { readonly sorte: "frise" }

export type Plan = {
  readonly d: Donnees
  readonly V: Voice
  readonly X: SceneTexts
  readonly illustrations: ReadonlyMap<string, PlanIllustration>
  readonly textes: ReadonlyMap<string, PlanTexte>
  readonly traces: ReadonlyMap<string, PlanTrace>
  readonly annees: ReadonlyMap<string, PlanAnnees>
  readonly frise: FriseD | null
  readonly feuille: { readonly id: string; readonly bandes: readonly PlanBande[] } | null
  readonly habillage: readonly { readonly ill: Illustration; readonly boite: Boite }[]
  readonly titre: { readonly texte: string; readonly at: number } | null
  readonly source: { readonly texte: string; readonly href: string } | null
  readonly pieces: readonly Piece[]
  readonly boards: readonly Step<string>[]
  readonly premierEtat: string
  readonly focus: readonly Step<string>[]
  readonly evidences: readonly PlanEvidence[]
}

const msg = (e: unknown): string => (e instanceof Error ? `${e.name} : ${e.message}` : String(e))
const s2 = (n: number): string => `${n.toFixed(2).replace(".", ",")} s`
const pathOf = (points: readonly Point[]): string => points.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x} ${y}`).join(" ")
const EPS = 1e-6

export function planifier(d: Donnees): Plan {
  const L: Lecteur = new Lecteur(d.fichier)

  let X: SceneTexts
  try {
    X = sceneTexts(d.scene, { screen: d.ecran })
  } catch (e) {
    L.faute("ecran", msg(e), "mettre « ecran » au nombre de textes de « ## Écran » du storyboard, puis revoir chaque indice « ecran » des textes")
  }
  let V: Voice
  try {
    V = voice(d.clip)
  } catch (e) {
    L.faute("clip", msg(e), `nommer la narration d'entrée de la scène (« ${d.scene}-01 » en général)`)
  }

  // Textes de « ## Écran » : chacun posé une seule fois
  const usage = new Map<number, string>()
  const ecran = (i: number, chemin: string): string => {
    if (i >= X.all.length) L.faute(chemin, `indice ${i} hors de « ## Écran » (${X.all.length} textes, indices 0 à ${X.all.length - 1})`, "recopier l'indice « Rang (X.screen(i)) » de la table des textes de la spécification")
    const avant = usage.get(i)
    if (avant) L.faute(chemin, `le texte n° ${i} (« ${X.screen(i)} ») est déjà posé par ${avant}`, "un texte d'« Écran » ne paraît qu'une fois")
    usage.set(i, chemin)
    return X.screen(i)
  }

  const illustrationDe = (fichier: string, chemin: string): Illustration => {
    try {
      return illustration(fichier)
    } catch (e) {
      L.faute(chemin, msg(e), "nommer un fichier de content/design/assets/, sans « .svg »")
    }
  }

  const illus = new Map<string, { d: IllustrationD; ill: Illustration; boite: Boite; rev: Revelation | null; move: PlanIllustration["move"] }>()
  for (const [id, i] of d.illustrations) {
    const ill = illustrationDe(i.fichier, `illustrations.${id}.fichier`)
    illus.set(id, { d: i, ill, boite: poser(ill, i.x, i.y, i.largeur, `${d.fichier}, champ « illustrations.${id} »`), rev: null, move: null })
  }
  const habillage = d.habillage.map((h, i) => {
    const ill = illustrationDe(h.fichier, `habillage[${i}].fichier`)
    return { ill, boite: poser(ill, h.x, h.y, h.largeur, `${d.fichier}, champ « habillage[${i}] »`) }
  })

  const textes = new Map<string, { d: TexteD; texte: string; style: StyleD; rev: Revelation | null }>()
  for (const [id, t] of d.textes) {
    const style = d.styles.get(t.style)
    if (!style) L.faute(`textes.${id}.style`, `style « ${t.style} » inconnu`, "le déclarer dans « styles »")
    if (t.dans !== null) {
      if (!d.illustrations.has(t.dans)) L.faute(`textes.${id}.dans`, `illustration « ${t.dans} » absente de « illustrations »`, `nommer l'illustration avec laquelle le texte se balaie (connues : ${[...d.illustrations.keys()].join(", ")})`)
      if (d.feuille?.illustration === t.dans) L.faute(`textes.${id}.dans`, "un texte ne se balaie pas avec la feuille à bandes", "le révéler par un geste (frappe, balayage) dans l'étape de sa bande")
    }
    textes.set(id, { d: t, texte: ecran(t.ecran, `textes.${id}.ecran`), style, rev: null })
  }
  const titre = d.titre === null ? null : ecran(d.titre, "titre")
  const sourceTexte = d.source === null ? null : ecran(d.source, "source")
  for (let i = 0; i < X.all.length; i++) {
    if (!usage.has(i)) L.faute("textes", `le texte n° ${i} de « ## Écran » (« ${X.screen(i)} ») n'est posé nulle part`, "le déclarer dans « textes » (ou « titre », « source ») avec « ecran »: " + i)
  }

  // Annees : la case claire doit être sur la case foncée (même droite, entre ses bouts)
  for (const [id, a] of d.annees) {
    const [ax, ay] = a.de
    const lx = a.a[0] - ax
    const ly = a.a[1] - ay
    const len = Math.hypot(lx, ly)
    for (const [nom, p] of [["de", a.claire.de], ["a", a.claire.a]] as const) {
      const px = p[0] - ax
      const py = p[1] - ay
      const ecart = Math.abs(px * ly - py * lx) / (len || 1)
      const proj = (px * lx + py * ly) / (len || 1)
      if (len === 0 || ecart > 0.5 || proj < -0.5 || proj > len + 0.5) L.faute(`annees.${id}.claire.${nom}`, `le point [${p.join(", ")}] n'est pas sur la case foncée de [${a.de.join(", ")}] à [${a.a.join(", ")}]`, "recopier les bouts de la case claire de la spécification : ils sont sur la couche foncée")
    }
  }

  // Feuille à bandes
  let bandesD: { haut: number; bas: number }[] = []
  if (d.feuille) {
    const f = illus.get(d.feuille.illustration)
    if (!f) L.faute("feuille.illustration", "illustration inconnue", "la déclarer dans « illustrations »")
    const haut = f.boite.top
    const bas = f.boite.top + f.boite.height
    const bords = [haut, ...d.feuille.bandes, bas]
    for (let i = 1; i < bords.length; i++) {
      const a = bords[i - 1] ?? 0
      const b = bords[i] ?? 0
      if (!(b > a)) L.faute(`feuille.bandes[${i - 1}]`, `bord ${b} pas plus bas que le précédent (${a}) ; la feuille va de y ${haut} à y ${bas.toFixed(1)}`, "écrire le bas de chaque bande, de haut en bas, sans le bas de la dernière (bas de l'illustration)")
      bandesD.push({ haut: a, bas: b })
    }
  }
  const bandesRev: (Revelation | null)[] = bandesD.map(() => null)

  const sorte = (id: string): "illustration" | "texte" | "trace" | "annees" | "titre" | null =>
    id === "titre" ? (titre === null ? null : "titre") : d.illustrations.has(id) ? "illustration" : d.textes.has(id) ? "texte" : d.traces.has(id) ? "trace" : d.annees.has(id) ? "annees" : null
  const connus = () => [...d.illustrations.keys(), ...d.textes.keys(), ...d.traces.keys(), ...d.annees.keys(), ...(titre === null ? [] : ["titre"])].join(", ")

  const revs = new Map<string, Revelation>()
  const moves = new Map<string, { at: number; dur: number; vers: Point; chemin: string }>()

  // Étapes : instant, gestes enchaînés, contrôle de débordement
  const instantDe = (e: EtapeD): number => {
    if (e.debut) return 0
    try {
      return e.locution !== null ? V.said(e.locution) : V.b(e.repere ?? "")
    } catch (err) {
      L.faute(`${e.chemin}.${e.locution !== null ? "locution" : "repere"}`, msg(err), e.locution !== null ? "copier la locution mot pour mot de la narration du storyboard (début de la phrase), l'allonger si elle est ambiguë" : "ajouter le repère à content/beats.json, ou employer « locution »")
    }
  }
  const instants = d.etapes.map(instantDe)
  const fins: number[] = []
  d.etapes.forEach((e, i) => {
    const t0 = instants[i] ?? 0
    if (i > 0 && t0 < (instants[i - 1] ?? 0)) L.faute(`${e.chemin}`, `l'étape commence à ${s2(t0)}, avant l'étape précédente (${s2(instants[i - 1] ?? 0)})`, "ranger les étapes dans l'ordre de la narration")
    if (e.debut && i > 0) L.faute(`${e.chemin}.debut`, "« debut » seulement pour la première étape", "donner une locution à cette étape")
    let debutGroupe = t0
    let finGroupe = t0
    let dureePrec: number | null = null
    e.gestes.forEach((g, j) => {
      if (g.avec && j === 0) L.faute(`${g.chemin}.avec`, "« avec » sur le premier geste de l'étape", "le retirer : le premier geste part au début de l'étape")
      const start = g.avec ? debutGroupe : finGroupe
      if (!g.avec) debutGroupe = start
      const s = g.type === "bande" ? null : sorte(g.cible)
      if (g.type !== "bande" && s === null) L.faute(`${g.chemin}.${g.type}`, `élément « ${g.cible} » inconnu`, `nommer un élément déclaré (connus : ${connus()})`)
      const permis: Readonly<Record<GesteD["type"], readonly string[]>> = { poser: ["illustration", "texte", "trace", "annees"], balayage: ["illustration", "texte"], frappe: ["texte", "titre"], trace: ["trace", "annees"], deplacement: ["illustration"], bande: [] }
      if (s !== null && !permis[g.type].includes(s)) L.faute(`${g.chemin}.${g.type}`, `un geste « ${g.type} » ne s'applique pas à ${s === "titre" ? "« titre »" : `un élément de « ${s === "texte" ? "textes" : s === "trace" ? "traces" : s === "annees" ? "annees" : "illustrations"} »`} (« ${g.cible} »)`, `gestes permis pour cet élément : ${Object.entries(permis).filter(([, v]) => v.includes(s)).map(([k]) => k).join(", ")}`)
      if (g.sens !== null && g.type !== "balayage") L.faute(`${g.chemin}.sens`, "« sens » ne sert qu'au balayage", "le retirer")
      if (s === "texte" && d.textes.get(g.cible)?.dans) L.faute(`${g.chemin}.${g.type}`, `le texte « ${g.cible} » se balaie avec « ${d.textes.get(g.cible)?.dans} » (champ « dans »)`, "retirer ce geste, ou retirer « dans »")
      let dur: number
      if (g.type === "poser") {
        if (g.duree !== null) L.faute(`${g.chemin}.duree`, "un élément posé paraît d'un coup", "retirer « duree », ou employer un balayage ou un tracé")
        dur = 0
      } else if (g.type === "frappe") {
        if (g.duree !== null) L.faute(`${g.chemin}.duree`, "la frappe dure le temps de la cadence du thème (typingCps)", "retirer « duree »")
        const texte = g.cible === "titre" ? (titre ?? "") : (textes.get(g.cible)?.texte ?? "")
        dur = texte.length / META.typingCps
      } else {
        const v = g.duree ?? (g.avec ? dureePrec : null)
        if (v === null || !(v > 0)) L.faute(`${g.chemin}.duree`, g.duree === null ? "durée manquante" : `durée ${g.duree} : elle doit être positive`, "recopier la durée de la colonne « Mouvement » de la spécification (secondes) ; un geste « avec » sans durée prend celle du geste qu'il accompagne")
        dur = v
      }
      if (g.type === "balayage" && g.sens === null) L.faute(`${g.chemin}.sens`, "sens du balayage manquant", "écrire « droite », « gauche », « bas » ou « haut » (gauche → droite : « droite » ; du sol au toit : « haut »)")
      if (g.type === "deplacement" && g.vers === null) L.faute(`${g.chemin}.vers`, "point d'arrivée manquant", "écrire « vers »: [x, y], coin haut gauche de l'illustration à l'arrivée")
      if (g.type !== "deplacement" && g.vers !== null) L.faute(`${g.chemin}.vers`, "« vers » ne sert qu'au déplacement", "le retirer")
      dureePrec = dur
      const rev: Revelation = { at: start, dur, type: g.type, dir: g.sens === null ? "down" : SENS[g.sens], chemin: g.chemin }
      if (g.type === "bande") {
        const n = Number(g.cible)
        if (!d.feuille) L.faute(`${g.chemin}.bande`, "pas de feuille à bandes", "déclarer « feuille »")
        if (n < 1 || n > bandesD.length) L.faute(`${g.chemin}.bande`, `bande ${n} inconnue (la feuille en a ${bandesD.length}, numérotées de 1 à ${bandesD.length})`, "recopier le numéro de la table des bandes de la spécification")
        if (bandesRev[n - 1]) L.faute(`${g.chemin}.bande`, `bande ${n} déjà révélée par ${bandesRev[n - 1]?.chemin}`, "révéler chaque bande une fois")
        if (n > 1 && !bandesRev[n - 2]) L.faute(`${g.chemin}.bande`, `bande ${n} révélée avant la bande ${n - 1}`, "les bandes se révèlent de haut en bas, dans l'ordre")
        bandesRev[n - 1] = rev
      } else if (g.type === "deplacement") {
        const r = revs.get(g.cible)
        if (!r || r.at > start + EPS) L.faute(`${g.chemin}.deplacement`, `« ${g.cible} » se déplace avant d'être révélé`, "le révéler (poser, balayage) dans une étape plus tôt, ou plus tôt dans cette étape")
        if (moves.has(g.cible)) L.faute(`${g.chemin}.deplacement`, `« ${g.cible} » a déjà un déplacement (${moves.get(g.cible)?.chemin})`, "un seul déplacement par illustration")
        moves.set(g.cible, { at: start, dur, vers: g.vers as Point, chemin: g.chemin })
      } else {
        const avant = revs.get(g.cible)
        if (avant) L.faute(`${g.chemin}.${g.type}`, `« ${g.cible} » est déjà révélé par ${avant.chemin}`, "révéler chaque élément une seule fois")
        revs.set(g.cible, rev)
      }
      finGroupe = Math.max(finGroupe, start + dur)
    })
    fins.push(finGroupe)
  })
  d.etapes.forEach((e, i) => {
    const fin = fins[i] ?? 0
    const suivante = d.etapes[i + 1]
    const tSuiv = instants[i + 1]
    if (suivante && tSuiv !== undefined && fin > tSuiv + EPS) {
      L.faute(`${e.chemin}.gestes`, `les gestes de l'étape finissent à ${s2(fin)}, après le début de l'étape suivante ${suivante.chemin}${suivante.locution ? ` « ${suivante.locution} »` : ""} (${s2(tSuiv)}) : l'enchaînement déborde de ${s2(fin - tSuiv)}`, "raccourcir une durée de 0,05 à 0,2 s, faire partir un geste « avec » le précédent, ou le passer à l'étape suivante ; jamais écrire un instant")
    }
  })
  const finScene = V.end + META.tail
  const derniere = fins[fins.length - 1] ?? 0
  if (derniere > finScene + EPS) L.faute(`etapes[${d.etapes.length - 1}].gestes`, `les gestes finissent à ${s2(derniere)}, après la fin de la scène (${s2(finScene)}) : l'image finale ne serait pas composée`, "raccourcir les durées de la dernière étape, ou passer un geste à une étape plus tôt")

  // Chaque élément révélé, une fois
  for (const [id, p] of illus) {
    if (d.feuille?.illustration === id) {
      if (revs.has(id)) L.faute(revs.get(id)?.chemin ?? "etapes", `la feuille « ${id} » se révèle par bandes`, "remplacer ce geste par des gestes « bande »")
      continue
    }
    const r = revs.get(id)
    if (!r) L.faute(`illustrations.${id}`, "jamais révélée", "ajouter un geste (« poser » dans l'étape « debut » pour un décor de l'image 0, ou « balayage ») dans l'étape de sa locution")
    p.rev = r
  }
  for (const [id, p] of textes) {
    if (p.d.dans !== null) {
      const c = illus.get(p.d.dans)?.rev
      if (!c || (c.type !== "poser" && c.type !== "balayage")) L.faute(`textes.${id}.dans`, `« ${p.d.dans} » n'est ni posée ni balayée`, "un texte « dans » suit une illustration posée ou balayée")
      p.rev = c
      continue
    }
    const r = revs.get(id)
    if (!r) L.faute(`textes.${id}`, "jamais révélé", "ajouter un geste « frappe », « balayage » ou « poser » dans l'étape de sa locution")
    p.rev = r
  }
  for (const [id] of d.traces) if (!revs.has(id)) L.faute(`traces.${id}`, "jamais tracé", "ajouter un geste « trace » (ou « poser » à l'image 0) dans l'étape de sa locution")
  for (const [id] of d.annees) if (!revs.has(id)) L.faute(`annees.${id}`, "jamais tracées", "ajouter un geste « trace » dans l'étape de sa locution")
  if (titre !== null && !revs.has("titre")) L.faute("titre", "le titre n'est jamais tapé", "ajouter { \"frappe\": \"titre\" } dans l'étape de sa locution")
  bandesRev.forEach((r, i) => {
    if (!r) L.faute("feuille.bandes", `la bande ${i + 1} n'est jamais révélée`, `ajouter { "bande": ${i + 1}, "duree": … } dans l'étape de sa locution`)
  })
  for (const [id, m] of moves) {
    const p = illus.get(id)
    if (p) p.move = { at: m.at, dur: m.dur, vers: m.vers }
  }

  const traces = new Map<string, PlanTrace>()
  for (const [id, t] of d.traces) traces.set(id, { d: t, rev: revs.get(id) as Revelation })
  const annees = new Map<string, PlanAnnees>()
  for (const [id, a] of d.annees) {
    const rev = revs.get(id) as Revelation
    const lenA = getLength(pathOf([a.de, a.a]))
    const v = rev.dur > 0 ? lenA / rev.dur : Number.POSITIVE_INFINITY
    annees.set(id, { d: a, rev, retard: rev.dur > 0 ? getLength(pathOf([a.de, a.claire.de])) / v : 0, durClaire: rev.dur > 0 ? getLength(pathOf([a.claire.de, a.claire.a])) / v : 0 })
  }

  // États (data-board)
  const boards: Step<string>[] = []
  const vus = new Set<string>()
  d.etapes.forEach((e, i) => {
    if (e.etat === null) return
    if (!new RegExp(`^${d.scene}-(\\d+|FIN)$`).test(e.etat)) L.faute(`${e.chemin}.etat`, `état « ${e.etat} » mal nommé`, `écrire « ${d.scene}-1 », « ${d.scene}-2 »… et « ${d.scene}-FIN », comme la table des états de la spécification`)
    if (vus.has(e.etat)) L.faute(`${e.chemin}.etat`, `état « ${e.etat} » déjà employé`, "un état par étape qui change l'image")
    vus.add(e.etat)
    boards.push({ at: instants[i] ?? 0, on: e.etat })
  })
  const premier = d.etapes[0]
  if (!premier?.debut || premier.etat === null) L.faute("etapes[0]", "la première étape doit être « debut »: true avec son « etat »", `écrire { "debut": true, "etat": "${d.scene}-1", "gestes": [ … décor de l'image 0 … ] }`)
  const dernierEtat = boards[boards.length - 1]?.on
  if (dernierEtat !== `${d.scene}-FIN`) L.faute("etapes", `dernier état « ${dernierEtat} » au lieu de « ${d.scene}-FIN »`, `nommer « ${d.scene}-FIN » l'état de la composition finale`)

  // Mises en évidence : une seule à la fois
  const locutionDe = (phrase: string, chemin: string): number => {
    try {
      return V.said(phrase)
    } catch (err) {
      L.faute(chemin, msg(err), "copier les mots de la colonne « De » ou « À » de la spécification, mot pour mot")
    }
  }
  const evidences: PlanEvidence[] = d.evidences.map((e) => {
    const at = locutionDe(e.de, `${e.chemin}.de`)
    const fin = e.a === null ? Number.POSITIVE_INFINITY : locutionDe(e.a, `${e.chemin}.a`)
    if (!(fin > at)) L.faute(`${e.chemin}.a`, `la mise en évidence s'éteint (${s2(fin)}) avant de s'allumer (${s2(at)})`, "vérifier « de » et « a » ; « a » absent ou « fin » : jusqu'à la fin de la scène")
    return { d: e, at, fin }
  })
  const triees = [...evidences].sort((a, b) => a.at - b.at)
  for (let i = 1; i < triees.length; i++) {
    const a = triees[i - 1] as PlanEvidence
    const b = triees[i] as PlanEvidence
    if (b.at < a.fin - EPS) L.faute(`${b.d.chemin}.de`, `« ${b.d.id} » s'allume (${s2(b.at)}) pendant « ${a.d.id} » (jusqu'à ${a.fin === Number.POSITIVE_INFINITY ? "la fin" : s2(a.fin)}) : deux mises en évidence à la fois`, `donner à « ${a.d.id} » un « a » égal au « de » de « ${b.d.id} » (« ${b.d.de} »)`)
  }
  const focus: Step<string>[] = [{ at: 0, on: null }]
  triees.forEach((e, i) => {
    focus.push({ at: e.at, on: e.d.id })
    const suiv = triees[i + 1]
    if (e.fin !== Number.POSITIVE_INFINITY && !(suiv && Math.abs(suiv.at - e.fin) < EPS)) focus.push({ at: e.fin, on: null })
  })

  // Ordre de pose (dessous vers dessus) des illustrations et des tracés
  const toutes: Piece[] = [
    ...[...d.illustrations.keys()].map((id): Piece => ({ sorte: "illustration", id })),
    ...(d.frise ? [{ sorte: "frise" } as Piece] : []),
    ...[...d.annees.keys()].map((id): Piece => ({ sorte: "annees", id })),
    ...[...d.traces.keys()].map((id): Piece => ({ sorte: "trace", id })),
  ]
  const cle = (p: Piece): string => (p.sorte === "frise" ? "frise" : p.id)
  let pieces = toutes
  if (d.ordre) {
    const par = new Map(toutes.map((p) => [cle(p), p]))
    const vusO = new Set<string>()
    pieces = d.ordre.map((id, i) => {
      const p = par.get(id)
      if (!p) L.faute(`ordre[${i}]`, `« ${id} » n'est ni une illustration, ni un tracé, ni des années, ni « frise »`, `écrire les identifiants de : ${[...par.keys()].join(", ")}`)
      if (vusO.has(id)) L.faute(`ordre[${i}]`, `« ${id} » deux fois`, "chaque pièce une fois")
      vusO.add(id)
      return p
    })
    const manque = [...par.keys()].filter((k) => !vusO.has(k))
    if (manque.length) L.faute("ordre", `pièces absentes : ${manque.join(", ")}`, "lister toutes les illustrations et tous les tracés, de dessous vers dessus, ou retirer « ordre »")
  }

  const plan: Plan = {
    d,
    V,
    X,
    illustrations: illus,
    textes,
    traces,
    annees,
    frise: d.frise,
    feuille: d.feuille ? { id: d.feuille.illustration, bandes: bandesD.map((b, i) => ({ ...b, at: bandesRev[i]?.at ?? 0, dur: bandesRev[i]?.dur ?? 0 })) } : null,
    habillage,
    titre: titre === null ? null : { texte: titre, at: revs.get("titre")?.at ?? 0 },
    source: sourceTexte === null ? null : { texte: sourceTexte, href: sourceHref(d.scene, `${d.fichier}, champ « source »`) },
    pieces,
    boards,
    premierEtat: premier.etat,
    focus,
    evidences,
  }
  controlerRemplissage(plan, L)
  return plan
}

/* ── Remplissage de la zone utile ─────────────────────────────────────────── */

type Rect = { readonly x0: number; readonly y0: number; readonly x1: number; readonly y1: number; readonly qui: string }

/**
 * Boîtes de la composition finale (illustrations à leur place d'arrivée,
 * feuille, tracés avec leur épaisseur, textes) ; ni le titre, ni la marge
 * (source, habillage), ni les mises en évidence. Un texte sans `largeur` ni
 * `largeurMesuree` compte pour sa hauteur de ligne seulement (aucune mesure
 * au chargement, polices absentes) : pour qu'il compte en entier, recopier
 * sa largeur mesurée de la spécification.
 */
export function boitesFinales(plan: Plan): Rect[] {
  const r: Rect[] = []
  for (const [id, p] of plan.illustrations) {
    const x = p.move ? p.move.vers[0] : p.boite.left
    const y = p.move ? p.move.vers[1] : p.boite.top
    r.push({ x0: x, y0: y, x1: x + p.boite.width, y1: y + p.boite.height, qui: `illustrations.${id}` })
  }
  const trait = (pts: readonly Point[], e: number, qui: string) => {
    const xs = pts.map((p) => p[0])
    const ys = pts.map((p) => p[1])
    r.push({ x0: Math.min(...xs) - e / 2, y0: Math.min(...ys) - e / 2, x1: Math.max(...xs) + e / 2, y1: Math.max(...ys) + e / 2, qui })
  }
  for (const [id, t] of plan.traces) {
    const e = Math.max(...t.d.couches.map((c) => c.epaisseur))
    if (t.d.points) trait(t.d.points, e, `traces.${id}`)
    else if (t.d.d) {
      const b = getBoundingBox(t.d.d)
      r.push({ x0: b.x1 - e / 2, y0: b.y1 - e / 2, x1: b.x2 + e / 2, y1: b.y2 + e / 2, qui: `traces.${id}` })
    }
  }
  if (plan.frise) trait([plan.frise.de, plan.frise.a, ...plan.frise.pointe], plan.frise.epaisseur, "frise")
  for (const [id, a] of plan.annees) trait([a.d.de, a.d.a], a.d.epaisseur, `annees.${id}`)
  for (const [id, t] of plan.textes) {
    const h = t.style.taille * t.style.interligne
    const w = t.d.largeur ?? t.d.largeurMesuree ?? 0
    const lignes = t.d.largeur !== null && t.d.lignes !== null ? t.d.lignes : 1
    const x0 = t.d.cx !== null ? t.d.cx - w / 2 : (t.d.x ?? 0)
    r.push({ x0, y0: t.d.y, x1: x0 + w, y1: t.d.y + h * lignes, qui: `textes.${id}` })
  }
  return r
}

/** Plus grand rectangle vide d'une grille (cellules libres) : méthode de l'histogramme. */
function plusGrandVide(libre: boolean[][], nx: number, ny: number): { x: number; y: number; w: number; h: number } {
  const haut = new Array<number>(nx).fill(0)
  let best = { x: 0, y: 0, w: 0, h: 0 }
  let bestScore = -1
  for (let j = 0; j < ny; j++) {
    for (let i = 0; i < nx; i++) haut[i] = libre[j]?.[i] ? (haut[i] ?? 0) + 1 : 0
    const pile: number[] = []
    for (let i = 0; i <= nx; i++) {
      const hi = i < nx ? (haut[i] ?? 0) : 0
      while (pile.length && (haut[pile[pile.length - 1] ?? 0] ?? 0) >= hi) {
        const top = pile.pop() as number
        const h = haut[top] ?? 0
        const gauche = pile.length ? (pile[pile.length - 1] ?? 0) + 1 : 0
        const w = i - gauche
        // Score : le vide le plus gênant est celui dont le plus petit côté relatif est le plus grand
        const score = Math.min(w / nx, h / ny)
        if (score > bestScore) {
          bestScore = score
          best = { x: gauche, y: j - h + 1, w, h }
        }
      }
      pile.push(i)
    }
  }
  return best
}

const PAS = 10

/**
 * La composition finale doit occuper la zone utile (ZONE) : aucun vide de plus
 * d'un quart de la largeur ET d'un quart de la hauteur de la zone. Erreur : la
 * place du vide, et les éléments qui le bordent.
 */
export function controlerRemplissage(plan: Plan, L: Lecteur): void {
  const W = ZONE.x1 - ZONE.x0
  const H = ZONE.y1 - ZONE.y0
  const nx = Math.ceil(W / PAS)
  const ny = Math.ceil(H / PAS)
  const libre: boolean[][] = Array.from({ length: ny }, () => new Array<boolean>(nx).fill(true))
  const boites = boitesFinales(plan)
  for (const b of boites) {
    const i0 = Math.max(0, Math.floor((b.x0 - ZONE.x0) / PAS))
    const i1 = Math.min(nx, Math.ceil((b.x1 - ZONE.x0) / PAS))
    const j0 = Math.max(0, Math.floor((b.y0 - ZONE.y0) / PAS))
    const j1 = Math.min(ny, Math.ceil((b.y1 - ZONE.y0) / PAS))
    for (let j = j0; j < j1; j++) for (let i = i0; i < i1; i++) (libre[j] as boolean[])[i] = false
  }
  const v = plusGrandVide(libre, nx, ny)
  if (v.w * PAS > VIDE_MAX * W && v.h * PAS > VIDE_MAX * H) {
    const x0 = ZONE.x0 + v.x * PAS
    const y0 = ZONE.y0 + v.y * PAS
    const x1 = Math.min(ZONE.x1, x0 + v.w * PAS)
    const y1 = Math.min(ZONE.y1, y0 + v.h * PAS)
    const bord = (b: Rect) => b.x1 >= x0 - 30 && b.x0 <= x1 + 30 && b.y1 >= y0 - 30 && b.y0 <= y1 + 30
    const voisins = boites.filter(bord).map((b) => b.qui)
    L.faute(
      "(composition finale)",
      `la feuille n'est pas remplie : vide de x ${x0} à ${x1}, y ${y0} à ${y1} (${x1 - x0} × ${y1 - y0} px), plus de ${Math.round(VIDE_MAX * 100)} % de la largeur (${Math.round(VIDE_MAX * W)} px) et de la hauteur (${Math.round(VIDE_MAX * H)} px) de la zone utile x ${ZONE.x0} à ${ZONE.x1}, y ${ZONE.y0} à ${ZONE.y1} ; éléments qui le bordent : ${voisins.join(", ") || "aucun"}`,
      "agrandir ou déplacer des illustrations vers ce vide (largeur libre, hauteur tirée du viewBox), puis replacer textes, tracés et mises en évidence sur les nouvelles boîtes, sans texte sur un trait ; un texte sans « largeur » compte pour sa largeur mesurée « largeurMesuree » (à recopier de la spécification)",
    )
  }
}
