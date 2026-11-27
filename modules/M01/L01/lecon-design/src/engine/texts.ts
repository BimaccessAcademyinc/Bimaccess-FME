/**
 * Seule porte d'entrée des textes et illustrations d'une scène.
 *
 * Aucun texte visible n'est écrit dans le code d'une scène : il vient du
 * storyboard (TEXTS, EXERCISES) ou des illustrations (ASSETS), par ces
 * fonctions qui lèvent une TextError quand la source ne contient pas ce que
 * la scène attend. Appelées au niveau du module (`const T = sceneTexts(…)`,
 * `const ILLU = illustration(…)`), elles cassent au chargement, donc dans
 * `npm run check` et `npm run build` ; appelées dans `View` (par exemple
 * `<Svg name="…">`), seulement au rendu. sync.mjs vérifie en plus les noms
 * écrits en clair (`<Svg name="maison">`, `asset("maison")`).
 */
import { ASSETS } from "../generated/assets"
import { TEXTS } from "../generated/texts"

/** Texte ou illustration absent de la source. */
export class TextError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "TextError"
  }
}

export type SceneTexts = {
  readonly id: string
  /** Titre de la scène (« # S01 · Titre »). */
  readonly title: string
  /** Textes à l'écran de la section « ## Écran » / « ## Screen », dans l'ordre. */
  readonly all: readonly string[]
  /** i-ème texte à l'écran (à partir de 0). */
  readonly screen: (i: number) => string
  /** Textes entre accents graves d'une autre section (« Mise en scène »…). */
  readonly codes: (section: string) => readonly string[]
}

/**
 * Textes d'une scène. `expect.screen` = nombre de textes à l'écran attendus :
 * si le storyboard en ajoute ou en retire, la scène casse au chargement au
 * lieu d'afficher un texte décalé.
 */
export function sceneTexts(id: string, expect?: { readonly screen?: number }): SceneTexts {
  const t = TEXTS[id]
  if (!t) throw new TextError(`scène ${id} absente du storyboard (scènes : ${Object.keys(TEXTS).join(", ")})`)
  if (expect?.screen !== undefined && t.screen.length !== expect.screen) {
    throw new TextError(`${id} : ${t.screen.length} texte(s) dans « ## Écran », la scène en attend ${expect.screen} : mettre la scène à jour`)
  }
  return {
    id,
    title: t.title,
    all: t.screen,
    screen: (i) => {
      const s = t.screen[i]
      if (s === undefined) throw new TextError(`${id} : texte à l'écran n° ${i} absent (« ## Écran » en a ${t.screen.length})`)
      return s
    },
    codes: (section) => {
      const s = t.sections[section]
      if (!s) throw new TextError(`${id} : section « ## ${section} » absente du storyboard`)
      return s.codes
    },
  }
}

/** Illustration SVG de content/design/assets/ (nom du fichier sans .svg). */
export function asset(name: string): string {
  const svg = ASSETS[name]
  if (svg === undefined) {
    throw new TextError(`illustration « ${name} » absente de content/design/assets/ (présentes : ${Object.keys(ASSETS).join(", ") || "aucune"})`)
  }
  return svg
}

/** Illustration vérifiée au chargement : `const MAISON = illustration("maison", ["maison-toit"])`. */
export type Illustration = {
  readonly name: string
  readonly svg: string
  /** Identifiants des éléments du fichier (groupes que `<Svg parts>` peut révéler). */
  readonly ids: ReadonlySet<string>
}

/** Identifiants (attribut id) des éléments d'un SVG. */
export const svgIds = (svg: string): ReadonlySet<string> => new Set([...svg.matchAll(/\sid\s*=\s*["']([^"']+)["']/g)].map((m) => m[1] ?? ""))

/**
 * Illustration de content/design/assets/ et groupes attendus, vérifiés au
 * chargement du module : `TextError` si le fichier manque ou si un groupe
 * (`<g id="maison-toit">`) en est absent. À passer à `<Svg svg={MAISON} />`.
 */
export function illustration(name: string, groups: readonly string[] = []): Illustration {
  const svg = asset(name)
  const ids = svgIds(svg)
  const missing = groups.filter((g) => !ids.has(g))
  if (missing.length) {
    throw new TextError(`illustration « ${name} » : groupe(s) ${missing.map((g) => `« ${g} »`).join(", ")} absent(s) du fichier (id="…" attendu sur un <g> ; présents : ${[...ids].join(", ") || "aucun"})`)
  }
  return { name, svg, ids }
}
