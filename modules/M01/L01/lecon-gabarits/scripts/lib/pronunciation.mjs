/**
 * pronunciation · dictionnaire de prononciation appliqué LOCALEMENT avant l'envoi
 * à ElevenLabs : reproductible, relu, indépendant des permissions de la clé.
 *
 * Formats acceptés (chemin dans voice.config.yaml → dictionary) :
 *   - YAML : `rules: [{ grapheme: "TVA", alias: "T. V. A." }, …]`
 *            ou `rules: { "TVA": "T. V. A." }` (ou ce dictionnaire seul) ;
 *   - PLS (lexique W3C) : `<lexeme><grapheme>TVA</grapheme><alias>T. V. A.</alias></lexeme>`.
 *
 * Remplacement en UNE passe, graphèmes les plus longs d'abord, sensible à la
 * casse, en mots entiers : un alias n'est jamais relu par une autre règle.
 */
import { existsSync, readFileSync } from "node:fs"
import { parse as parseYaml } from "yaml"

const WORD = "[\\p{L}\\p{N}_-]"
const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")

const decodeXml = (s) =>
  s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&")
    .trim()

/** Règles du dictionnaire : { rules: [{ grapheme, alias }], problems: [{ level, message }] }. */
export function loadDictionary(path) {
  const problems = []
  const rules = []
  if (!path) return { rules, problems }
  if (!existsSync(path)) {
    problems.push({ level: "warning", message: `dictionnaire de prononciation introuvable (${path}) : aucune règle appliquée` })
    return { rules, problems }
  }
  const raw = readFileSync(path, "utf8")
  const add = (grapheme, alias, where) => {
    const g = String(grapheme ?? "").trim()
    const a = String(alias ?? "").trim()
    if (!g || !a) return problems.push({ level: "error", message: `dictionnaire : règle incomplète ${where} (graphème et alias obligatoires)` })
    if (rules.some((r) => r.grapheme === g)) return problems.push({ level: "error", message: `dictionnaire : graphème « ${g} » en double` })
    rules.push({ grapheme: g, alias: a })
  }
  if (/\.pls$|\.xml$/i.test(path)) {
    for (const [i, m] of [...raw.matchAll(/<lexeme\b[^>]*>([\s\S]*?)<\/lexeme>/g)].entries()) {
      const graphemes = [...m[1].matchAll(/<grapheme>([\s\S]*?)<\/grapheme>/g)].map((x) => decodeXml(x[1]))
      const alias = /<alias>([\s\S]*?)<\/alias>/.exec(m[1])
      if (!alias) {
        problems.push({ level: "warning", message: `dictionnaire : lexème n° ${i + 1} sans <alias> (un <phoneme> ne s'applique pas localement) : ignoré` })
        continue
      }
      for (const g of graphemes) add(g, decodeXml(alias[1]), `(lexème n° ${i + 1})`)
    }
  } else {
    let doc
    try {
      doc = parseYaml(raw) ?? {}
    } catch (e) {
      problems.push({ level: "error", message: `dictionnaire illisible (${path}) : ${e.message}` })
      return { rules, problems }
    }
    const list = doc.rules ?? doc
    if (Array.isArray(list)) list.forEach((r, i) => add(r?.grapheme, r?.alias, `n° ${i + 1}`))
    else if (list && typeof list === "object") for (const [g, a] of Object.entries(list)) add(g, a, `« ${g} »`)
  }
  rules.sort((a, b) => b.grapheme.length - a.grapheme.length)
  // Une règle douteuse : alias qui contient un autre graphème (sans effet en passe unique, mais signe d'une confusion)
  for (const r of rules) {
    for (const o of rules) {
      if (o !== r && patternOf(o.grapheme).test(r.alias)) problems.push({ level: "warning", message: `dictionnaire : l'alias de « ${r.grapheme} » contient le graphème « ${o.grapheme} »` })
    }
  }
  return { rules, problems }
}

/** Motif d'un graphème : bornes de mot seulement du côté où il commence ou finit par une lettre ou un chiffre. */
function patternSource(g) {
  const pre = /^[\p{L}\p{N}]/u.test(g) ? `(?<!${WORD})` : ""
  const post = /[\p{L}\p{N}]$/u.test(g) ? `(?!${WORD})` : ""
  return `${pre}${escape(g)}${post}`
}
const patternOf = (g) => new RegExp(patternSource(g), "u")

function combined(rules) {
  return new RegExp(rules.map((r) => patternSource(r.grapheme)).join("|"), "gu")
}

/** Texte envoyé à la voix : { text, applied: [graphèmes utilisés, dans l'ordre du dictionnaire] }. */
export function applyDictionary(text, rules) {
  if (!rules.length) return { text, applied: [] }
  const byGrapheme = new Map(rules.map((r) => [r.grapheme, r.alias]))
  const used = new Set()
  const out = text.replace(combined(rules), (m) => {
    used.add(m)
    return byGrapheme.get(m) ?? m
  })
  return { text: out, applied: rules.map((r) => r.grapheme).filter((g) => used.has(g)) }
}

/** Texte où les passages pris en charge par le dictionnaire sont effacés (pour ne pas les signaler au contrôle). */
export function maskDictionary(text, rules) {
  if (!rules.length) return text
  return text.replace(combined(rules), (m) => " ".repeat(m.length))
}
