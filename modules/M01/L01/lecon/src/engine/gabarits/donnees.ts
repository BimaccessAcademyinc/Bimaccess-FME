/**
 * Lecture et contrôle des données d'une scène à gabarit
 * (`content/design/scenes/Sxx.json`). Format : docs/gabarits.md.
 *
 * Tout se contrôle au chargement du module de la scène : un champ manquant,
 * inconnu ou mal formé lève une GabaritError qui dit le fichier, le champ et
 * quoi faire. Rien n'est deviné : un champ facultatif a un défaut écrit ici et
 * dans la documentation, jamais un autre.
 */
import { THEME } from "../../generated/theme"
import type { Point } from "../anim"

/** Données de gabarit fausses : le message dit le fichier, le champ et quoi faire. */
export class GabaritError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "GabaritError"
  }
}

export type NomGabarit = "frise" | "fiche-rubriques"

/** Sens d'un balayage, en français dans les données. */
export const SENS = { droite: "right", gauche: "left", bas: "down", haut: "up" } as const
export type Sens = keyof typeof SENS

export type StyleD = {
  readonly police: string
  /** Clé de la police dans THEME.fonts (« serif », « capitales ») : métriques des contrôles de composition. */
  readonly famille: string
  readonly graisse: number
  readonly taille: number
  readonly interligne: number
  readonly couleur: string
  readonly interlettrage: number
  readonly capitales: boolean
  readonly italique: boolean
}
export type IllustrationD = { readonly id: string; readonly fichier: string; readonly x: number; readonly y: number; readonly largeur: number; readonly aplat: string | null; readonly decoupe: "cercle" | null; readonly sur: string | null }
export type TexteD = {
  readonly id: string
  readonly ecran: number
  readonly style: string
  readonly x: number | null
  readonly cx: number | null
  readonly y: number
  readonly largeur: number | null
  /** Ancienne largeur mesurée de la spécification : acceptée, sans effet (les contrôles mesurent le texte, controles.ts). */
  readonly largeurMesuree: number | null
  /** Ancien nombre de lignes : accepté, sans effet (les contrôles calculent le retour à la ligne, controles.ts). */
  readonly lignes: number | null
  /** Couleur de la réserve (jeton résolu), null : aucune. */
  readonly reserve: string | null
  readonly dans: string | null
  /** Support (illustration) sur lequel le texte est posé : seul chevauchement permis (contrôle 4). */
  readonly sur: string | null
  readonly langue: string | null
}
export type CoucheD = { readonly couleur: string; readonly epaisseur: number }
export type TraceD = { readonly id: string; readonly chemin: string; readonly points: readonly Point[] | null; readonly d: string | null; readonly couches: readonly CoucheD[]; readonly remplissage: string | null }
export type FriseD = { readonly de: Point; readonly a: Point; readonly couleur: string; readonly epaisseur: number; readonly pointe: readonly Point[] }
export type AnneesD = { readonly id: string; readonly de: Point; readonly a: Point; readonly couleur: string; readonly epaisseur: number; readonly claire: { readonly de: Point; readonly a: Point; readonly couleur: string; readonly epaisseur: number } }
export type FeuilleD = { readonly illustration: string; readonly bandes: readonly number[] }
export type HabillageD = { readonly fichier: string; readonly x: number; readonly y: number; readonly largeur: number }
export type TypeGeste = "poser" | "balayage" | "frappe" | "trace" | "deplacement" | "bande"
export type GesteD = { readonly type: TypeGeste; readonly cible: string; readonly sens: Sens | null; readonly duree: number | null; readonly avec: boolean; readonly vers: Point | null; readonly chemin: string }
export type EtapeD = { readonly debut: boolean; readonly locution: string | null; readonly repere: string | null; readonly etat: string | null; readonly gestes: readonly GesteD[]; readonly chemin: string }
export type EvidenceD = { readonly id: string; readonly x: number; readonly y: number; readonly largeur: number; readonly hauteur: number; readonly de: string; readonly a: string | null; readonly forme: "rect" | "circle"; readonly chemin: string }

export type Donnees = {
  readonly fichier: string
  readonly gabarit: NomGabarit
  readonly scene: string
  readonly clip: string
  readonly ecran: number
  readonly titre: number | null
  readonly source: number | null
  readonly habillage: readonly HabillageD[]
  readonly styles: ReadonlyMap<string, StyleD>
  readonly illustrations: ReadonlyMap<string, IllustrationD>
  readonly textes: ReadonlyMap<string, TexteD>
  readonly traces: ReadonlyMap<string, TraceD>
  readonly frise: FriseD | null
  readonly annees: ReadonlyMap<string, AnneesD>
  readonly feuille: FeuilleD | null
  readonly ordre: readonly string[] | null
  readonly etapes: readonly EtapeD[]
  readonly evidences: readonly EvidenceD[]
}

type Obj = Readonly<Record<string, unknown>>

/** Chemin d'un champ : « etapes[2].gestes[0].duree », « clip » à la racine. */
const j = (chemin: string, cle: string): string => (chemin && chemin !== "(racine)" ? `${chemin}.${cle}` : cle)

const decrire = (v: unknown): string => (v === undefined ? "rien" : v === null ? "null" : Array.isArray(v) ? "une liste" : typeof v === "string" ? `« ${v} »` : typeof v === "object" ? "un objet" : `${typeof v} ${String(v)}`)

const COULEURS = THEME.colors as Readonly<Record<string, string>>
const POLICES = THEME.fonts as Readonly<Record<string, string>>

/** Lecteur de champs : chaque erreur porte le fichier et le chemin du champ. */
export class Lecteur {
  constructor(readonly fichier: string) {}

  faute(chemin: string, quoi: string, faire: string): never {
    throw new GabaritError(`${this.fichier}, champ « ${chemin} » : ${quoi}. À faire : ${faire}`)
  }

  objet(v: unknown, chemin: string, permis?: readonly string[]): Obj {
    if (typeof v !== "object" || v === null || Array.isArray(v)) this.faute(chemin, `objet attendu, trouvé ${decrire(v)}`, "écrire un objet { … }")
    const o = v as Obj
    if (permis) {
      for (const k of Object.keys(o)) {
        if (!permis.includes(k) && !k.startsWith("_")) this.faute(j(chemin, k), "champ inconnu", `champs permis ici : ${permis.join(", ")} (un champ qui commence par « _ » est un commentaire, ignoré)`)
      }
    }
    return o
  }

  /** Objet nommé (clé = identifiant) ; ordre des clés conservé. */
  table(v: unknown, chemin: string): [string, unknown][] {
    if (v === undefined) return []
    const o = this.objet(v, chemin)
    return Object.entries(o).filter(([k]) => !k.startsWith("_"))
  }

  liste(v: unknown, chemin: string): readonly unknown[] {
    if (!Array.isArray(v)) this.faute(chemin, `liste attendue, trouvé ${decrire(v)}`, "écrire une liste [ … ]")
    return v
  }

  nombre(o: Obj, cle: string, chemin: string): number
  nombre(o: Obj, cle: string, chemin: string, facultatif: true): number | null
  nombre(o: Obj, cle: string, chemin: string, facultatif = false): number | null {
    const v = o[cle]
    if (v === undefined && facultatif) return null
    if (typeof v !== "number" || !Number.isFinite(v)) this.faute(j(chemin, cle), `nombre attendu, trouvé ${decrire(v)}`, "écrire un nombre (px de scène, ou secondes pour une durée), recopié de la spécification")
    return v
  }

  entier(o: Obj, cle: string, chemin: string): number
  entier(o: Obj, cle: string, chemin: string, facultatif: true): number | null
  entier(o: Obj, cle: string, chemin: string, facultatif = false): number | null {
    const v = facultatif ? this.nombre(o, cle, chemin, true) : this.nombre(o, cle, chemin)
    if (v !== null && (!Number.isInteger(v) || v < 0)) this.faute(j(chemin, cle), `entier positif attendu, trouvé ${v}`, "écrire un indice entier, à partir de 0")
    return v
  }

  texte(o: Obj, cle: string, chemin: string): string
  texte(o: Obj, cle: string, chemin: string, facultatif: true): string | null
  texte(o: Obj, cle: string, chemin: string, facultatif = false): string | null {
    const v = o[cle]
    if (v === undefined && facultatif) return null
    if (typeof v !== "string" || v.trim() === "") this.faute(j(chemin, cle), `texte non vide attendu, trouvé ${decrire(v)}`, "écrire une chaîne entre guillemets")
    return v
  }

  booleen(o: Obj, cle: string, chemin: string): boolean {
    const v = o[cle]
    if (v === undefined) return false
    if (typeof v !== "boolean") this.faute(j(chemin, cle), `true ou false attendu, trouvé ${decrire(v)}`, "écrire true, ou retirer le champ")
    return v
  }

  choix<T extends string>(o: Obj, cle: string, chemin: string, valeurs: readonly T[], defaut?: T): T {
    const v = o[cle]
    if (v === undefined && defaut !== undefined) return defaut
    if (typeof v !== "string" || !(valeurs as readonly string[]).includes(v)) this.faute(j(chemin, cle), `valeur ${decrire(v)} inconnue`, `écrire une de : ${valeurs.join(", ")}`)
    return v as T
  }

  couleur(o: Obj, cle: string, chemin: string, defaut?: string): string {
    const v = o[cle]
    if (v === undefined && defaut !== undefined) return COULEURS[defaut] ?? defaut
    if (typeof v !== "string" || COULEURS[v] === undefined) this.faute(j(chemin, cle), `jeton de couleur ${decrire(v)} inconnu du thème`, `écrire un nom de jeton de content/design/theme.json (encre, papier, fond, terme, ecriture, chaussee, carroyage, lecture, lien…), jamais une valeur #RRVVBB`)
    return COULEURS[v] as string
  }

  police(o: Obj, cle: string, chemin: string): string {
    const v = o[cle]
    if (typeof v !== "string" || POLICES[v] === undefined) this.faute(j(chemin, cle), `police ${decrire(v)} inconnue du thème`, `écrire une de : ${Object.keys(POLICES).join(", ")}`)
    return POLICES[v] as string
  }

  point(v: unknown, chemin: string): Point {
    if (!Array.isArray(v) || v.length !== 2 || !v.every((n) => typeof n === "number" && Number.isFinite(n))) this.faute(chemin, `point [x, y] attendu, trouvé ${decrire(v)}`, "écrire deux nombres en px de scène, par exemple [436, 580]")
    return [v[0] as number, v[1] as number]
  }

  points(v: unknown, chemin: string, min = 2): Point[] {
    const l = this.liste(v, chemin)
    if (l.length < min) this.faute(chemin, `${l.length} point(s), il en faut ${min} au moins`, "recopier tous les points de la spécification")
    return l.map((p, i) => this.point(p, `${chemin}[${i}]`))
  }
}

const COMMUNS = ["gabarit", "scene", "clip", "ecran", "titre", "source", "habillage", "styles", "illustrations", "textes", "traces", "ordre", "etapes", "evidences"] as const
const PROPRES: Readonly<Record<NomGabarit, readonly string[]>> = { frise: ["frise", "annees"], "fiche-rubriques": ["feuille"] }
const GESTES: readonly TypeGeste[] = ["poser", "balayage", "frappe", "trace", "deplacement", "bande"]

/** Fichier de données d'une scène, d'après son identifiant. */
export const fichierDe = (scene: string): string => `content/design/scenes/${scene}.json`

/** Lit et contrôle la forme des données (les références croisées et les instants : plan.ts). */
export function lire(gabarit: NomGabarit, brut: unknown): Donnees {
  const sceneBrute = typeof brut === "object" && brut !== null ? (brut as Obj).scene : undefined
  const scene = typeof sceneBrute === "string" && /^S\d\d$/.test(sceneBrute) ? sceneBrute : null
  const L: Lecteur = new Lecteur(scene ? fichierDe(scene) : "content/design/scenes/(scène inconnue).json")
  const racine = L.objet(brut, "(racine)", [...COMMUNS, ...PROPRES[gabarit]])
  if (!scene) L.faute("scene", `identifiant de scène ${decrire(sceneBrute)} illisible`, "écrire « S02 » (le même que « # S02 · … » du storyboard)")
  const nomGabarit = L.choix(racine, "gabarit", "", ["frise", "fiche-rubriques"] as const)
  if (nomGabarit !== gabarit) L.faute("gabarit", `les données sont pour « ${nomGabarit} », la scène appelle le gabarit « ${gabarit} »`, nomGabarit === "frise" ? "appeler Frise.scene(data)" : "appeler FicheRubriques.scene(data)")
  for (const k of Object.keys(racine)) {
    const autre = (Object.keys(PROPRES) as NomGabarit[]).find((g) => g !== gabarit && PROPRES[g].includes(k))
    if (autre) L.faute(k, `champ du gabarit « ${autre} »`, `le retirer, ou changer de gabarit`)
  }

  const styles = new Map<string, StyleD>()
  for (const [id, v] of L.table(racine.styles, "styles")) {
    const c = `styles.${id}`
    const o = L.objet(v, c, ["police", "graisse", "taille", "interligne", "couleur", "interlettrage", "capitales", "italique"])
    styles.set(id, {
      police: L.police(o, "police", c),
      famille: o.police as string,
      graisse: L.nombre(o, "graisse", c, true) ?? 400,
      taille: L.nombre(o, "taille", c),
      interligne: L.nombre(o, "interligne", c, true) ?? 1.2,
      couleur: L.couleur(o, "couleur", c),
      interlettrage: L.nombre(o, "interlettrage", c, true) ?? 0,
      capitales: L.booleen(o, "capitales", c),
      italique: L.booleen(o, "italique", c),
    })
  }

  const ids = new Map<string, string>()
  const declarer = (id: string, chemin: string) => {
    if (id === "titre" || id === "frise") L.faute(chemin, `« ${id} » est un nom réservé`, "choisir un autre identifiant")
    const avant = ids.get(id)
    if (avant) L.faute(chemin, `identifiant « ${id} » déjà employé par ${avant}`, "donner un identifiant unique à chaque élément")
    ids.set(id, chemin)
  }

  const illustrations = new Map<string, IllustrationD>()
  for (const [id, v] of L.table(racine.illustrations, "illustrations")) {
    const c = `illustrations.${id}`
    declarer(id, c)
    const o = L.objet(v, c, ["fichier", "x", "y", "largeur", "aplat", "decoupe", "sur"])
    illustrations.set(id, {
      id,
      fichier: L.texte(o, "fichier", c),
      x: L.nombre(o, "x", c),
      y: L.nombre(o, "y", c),
      largeur: L.nombre(o, "largeur", c),
      aplat: o.aplat === undefined ? null : L.couleur(o, "aplat", c),
      decoupe: o.decoupe === undefined ? null : L.choix(o, "decoupe", c, ["cercle"] as const),
      sur: L.texte(o, "sur", c, true),
    })
  }

  const textes = new Map<string, TexteD>()
  for (const [id, v] of L.table(racine.textes, "textes")) {
    const c = `textes.${id}`
    declarer(id, c)
    const o = L.objet(v, c, ["ecran", "style", "x", "cx", "y", "largeur", "largeurMesuree", "lignes", "place", "reserve", "dans", "sur", "langue"])
    const style = L.texte(o, "style", c)
    if (!styles.has(style)) L.faute(`${c}.style`, `style « ${style} » absent de « styles »`, `le déclarer dans « styles » (styles connus : ${[...styles.keys()].join(", ") || "aucun"})`)
    const x = L.nombre(o, "x", c, true)
    const cx = L.nombre(o, "cx", c, true)
    if ((x === null) === (cx === null)) L.faute(c, "il faut « x » (bord gauche du texte) ou « cx » (centre), un seul des deux", "recopier la place de la spécification")
    const place = L.choix(o, "place", c, ["face", "carte"] as const, "face")
    const reserve = L.choix(o, "reserve", c, ["fond", "papier", "aucune"] as const, place === "face" ? "fond" : "aucune")
    textes.set(id, {
      id,
      ecran: L.entier(o, "ecran", c),
      style,
      x,
      cx,
      y: L.nombre(o, "y", c),
      largeur: L.nombre(o, "largeur", c, true),
      largeurMesuree: L.nombre(o, "largeurMesuree", c, true),
      lignes: L.entier(o, "lignes", c, true),
      reserve: reserve === "aucune" ? null : (COULEURS[reserve] ?? null),
      dans: L.texte(o, "dans", c, true),
      sur: L.texte(o, "sur", c, true),
      langue: L.texte(o, "langue", c, true),
    })
  }

  const traces = new Map<string, TraceD>()
  for (const [id, v] of L.table(racine.traces, "traces")) {
    const c = `traces.${id}`
    declarer(id, c)
    const o = L.objet(v, c, ["points", "d", "couleur", "epaisseur", "couches", "remplissage"])
    if ((o.points === undefined) === (o.d === undefined)) L.faute(c, "il faut « points » ou « d » (chemin SVG), un seul des deux", "recopier la géométrie de la spécification")
    let couches: CoucheD[]
    if (o.couches !== undefined) {
      if (o.epaisseur !== undefined || o.couleur !== undefined) L.faute(c, "« couches » et « epaisseur » ou « couleur » ensemble", "avec « couches », donner couleur et épaisseur dans chaque couche (de dessous vers dessus)")
      couches = L.liste(o.couches, `${c}.couches`).map((k, i) => {
        const cc = `${c}.couches[${i}]`
        const ko = L.objet(k, cc, ["couleur", "epaisseur"])
        return { couleur: L.couleur(ko, "couleur", cc), epaisseur: L.nombre(ko, "epaisseur", cc) }
      })
      if (couches.length === 0) L.faute(`${c}.couches`, "liste vide", "une couche au moins, ou retirer « couches »")
    } else couches = [{ couleur: L.couleur(o, "couleur", c, "encre"), epaisseur: L.nombre(o, "epaisseur", c) }]
    traces.set(id, {
      id,
      chemin: c,
      points: o.points === undefined ? null : L.points(o.points, `${c}.points`),
      d: o.d === undefined ? null : L.texte(o, "d", c),
      couches,
      remplissage: o.remplissage === undefined ? null : L.couleur(o, "remplissage", c),
    })
  }

  let frise: FriseD | null = null
  if (gabarit === "frise") {
    const c = "frise"
    if (racine.frise === undefined) L.faute(c, "absent", "décrire la ligne de la frise : { \"de\": [x, y], \"a\": [x, y], \"epaisseur\": 3, \"pointe\": [[x, y], [x, y], [x, y]] }")
    const o = L.objet(racine.frise, c, ["de", "a", "couleur", "epaisseur", "pointe"])
    frise = { de: L.point(o.de, `${c}.de`), a: L.point(o.a, `${c}.a`), couleur: L.couleur(o, "couleur", c, "encre"), epaisseur: L.nombre(o, "epaisseur", c), pointe: L.points(o.pointe, `${c}.pointe`, 3) }
  }

  const annees = new Map<string, AnneesD>()
  for (const [id, v] of L.table(racine.annees, "annees")) {
    const c = `annees.${id}`
    declarer(id, c)
    const o = L.objet(v, c, ["de", "a", "couleur", "epaisseur", "claire"])
    const k = L.objet(o.claire, `${c}.claire`, ["de", "a", "couleur", "epaisseur"])
    annees.set(id, {
      id,
      de: L.point(o.de, `${c}.de`),
      a: L.point(o.a, `${c}.a`),
      couleur: L.couleur(o, "couleur", c, "encre"),
      epaisseur: L.nombre(o, "epaisseur", c),
      claire: { de: L.point(k.de, `${c}.claire.de`), a: L.point(k.a, `${c}.claire.a`), couleur: L.couleur(k, "couleur", `${c}.claire`, "papier"), epaisseur: L.nombre(k, "epaisseur", `${c}.claire`) },
    })
  }

  let feuille: FeuilleD | null = null
  if (gabarit === "fiche-rubriques") {
    const c = "feuille"
    if (racine.feuille === undefined) L.faute(c, "absent", "décrire la feuille : { \"illustration\": \"<id d'illustrations>\", \"bandes\": [bas de B1, bas de B2, …] }")
    const o = L.objet(racine.feuille, c, ["illustration", "bandes"])
    const ill = L.texte(o, "illustration", c)
    if (!illustrations.has(ill)) L.faute(`${c}.illustration`, `illustration « ${ill} » absente de « illustrations »`, "nommer l'identifiant de l'illustration de la feuille, déclarée dans « illustrations »")
    const bandes = L.liste(o.bandes, `${c}.bandes`).map((b, i) => {
      if (typeof b !== "number" || !Number.isFinite(b)) L.faute(`${c}.bandes[${i}]`, `nombre attendu, trouvé ${decrire(b)}`, "écrire le bas de chaque bande en px de scène, sauf la dernière (bas de l'illustration)")
      return b
    })
    feuille = { illustration: ill, bandes }
  }

  const habillage = (racine.habillage === undefined ? [] : L.liste(racine.habillage, "habillage")).map((v, i) => {
    const c = `habillage[${i}]`
    const o = L.objet(v, c, ["fichier", "x", "y", "largeur"])
    return { fichier: L.texte(o, "fichier", c), x: L.nombre(o, "x", c), y: L.nombre(o, "y", c), largeur: L.nombre(o, "largeur", c) }
  })

  const ordre = racine.ordre === undefined ? null : L.liste(racine.ordre, "ordre").map((v, i) => (typeof v === "string" ? v : L.faute(`ordre[${i}]`, `identifiant attendu, trouvé ${decrire(v)}`, "écrire l'identifiant d'une illustration, d'un tracé ou des années")))

  const etapes = L.liste(racine.etapes, "etapes").map((v, i): EtapeD => {
    const c = `etapes[${i}]`
    const o = L.objet(v, c, ["debut", "locution", "repere", "etat", "gestes"])
    const debut = L.booleen(o, "debut", c)
    const locution = L.texte(o, "locution", c, true)
    const repere = L.texte(o, "repere", c, true)
    if ([debut, locution !== null, repere !== null].filter(Boolean).length !== 1) L.faute(c, "il faut un seul de « debut »: true (image 0), « locution » (mots dits mot pour mot) ou « repere » (clé de content/beats.json)", "recopier la locution de la table des apparitions de la spécification")
    const gestes = (o.gestes === undefined ? [] : L.liste(o.gestes, `${c}.gestes`)).map((g, j): GesteD => {
      const cg = `${c}.gestes[${j}]`
      const go = L.objet(g, cg, [...GESTES, "sens", "duree", "avec", "vers"])
      const types = GESTES.filter((t) => go[t] !== undefined)
      const [type] = types
      if (type === undefined || types.length !== 1) L.faute(cg, types.length ? `plusieurs gestes dans un seul objet (${types.join(", ")})` : "aucun geste", `écrire un seul de : ${GESTES.join(", ")} ; deux gestes simultanés : deux objets, le second avec « avec »: true`)
      const cible = type === "bande" ? String(L.entier(go, "bande", cg)) : L.texte(go, type, cg)
      return {
        type,
        cible,
        sens: go.sens === undefined ? null : L.choix(go, "sens", cg, Object.keys(SENS) as Sens[]),
        duree: L.nombre(go, "duree", cg, true),
        avec: L.booleen(go, "avec", cg),
        vers: go.vers === undefined ? null : L.point(go.vers, `${cg}.vers`),
        chemin: cg,
      }
    })
    return { debut, locution, repere, etat: L.texte(o, "etat", c, true), gestes, chemin: c }
  })
  if (etapes.length === 0) L.faute("etapes", "liste vide", "une étape « debut » au moins, avec son état")

  const evidences: EvidenceD[] = []
  for (const [id, v] of L.table(racine.evidences, "evidences")) {
    const c = `evidences.${id}`
    const o = L.objet(v, c, ["x", "y", "largeur", "hauteur", "de", "a", "forme"])
    const a = L.texte(o, "a", c, true)
    evidences.push({
      id,
      x: L.nombre(o, "x", c),
      y: L.nombre(o, "y", c),
      largeur: L.nombre(o, "largeur", c),
      hauteur: L.nombre(o, "hauteur", c),
      de: L.texte(o, "de", c),
      a: a === "fin" ? null : a,
      forme: L.choix(o, "forme", c, ["rectangle", "cercle"] as const, "rectangle") === "cercle" ? "circle" : "rect",
      chemin: c,
    })
  }

  return {
    fichier: L.fichier,
    gabarit,
    scene,
    clip: L.texte(racine, "clip", "", true) ?? `${scene}-01`,
    ecran: L.entier(racine, "ecran", ""),
    titre: L.entier(racine, "titre", "", true),
    source: L.entier(racine, "source", "", true),
    habillage,
    styles,
    illustrations,
    textes,
    traces,
    frise,
    annees,
    feuille,
    ordre,
    etapes,
    evidences,
  }
}
