/**
 * svg-xml · analyse XML stricte d'une illustration SVG, sans dépendance.
 *
 * Un SVG mal formé (un <g> jamais fermé, une balise fermante en trop, deux
 * éléments racines) est inliné quand même par le navigateur, qui le répare
 * à sa façon : des parties disparaissent sans aucune erreur de console.
 * Cette analyse refuse donc tout ce qu'un analyseur XML refuserait :
 *   - balises ouvrantes et fermantes équilibrées et de même nom ;
 *   - un seul élément racine, <svg> ; rien d'autre que des blancs, des
 *     commentaires, le prologue <?xml …?> et un <!DOCTYPE> autour de lui ;
 *   - attributs nom="valeur" ou nom='valeur', sans doublon ni « < » dans la valeur ;
 *   - entités : &amp; &lt; &gt; &quot; &apos; &#123; &#x1F; seulement
 *     (&nbsp; et les autres entités HTML ne sont pas du XML : écrire &#160;) ;
 *   - commentaires sans « -- » intérieur, sections CDATA fermées.
 *
 * checkSvgXml(texte) → [{ line, message }] (vide si le fichier est bien formé).
 * Utilisée par scripts/sync.mjs ; copiable telle quelle dans un autre outil.
 */

const NAME = /^[A-Za-z_:][-A-Za-z0-9_:.]*/
const ENTITY = /^&(?:amp|lt|gt|quot|apos|#[0-9]+|#x[0-9A-Fa-f]+);/

/** Problèmes d'entités dans un texte ou une valeur d'attribut. */
function entityProblems(text, lineAt, where) {
  const out = []
  let i = text.indexOf("&")
  while (i >= 0) {
    if (!ENTITY.test(text.slice(i))) {
      const shown = /^&[A-Za-z0-9#]*;?/.exec(text.slice(i))?.[0] ?? "&"
      out.push({ line: lineAt(i), message: `${where} : « ${shown} » n'est pas une entité XML (écrire &amp; pour « & », &#160; pour une espace insécable)` })
    }
    i = text.indexOf("&", i + 1)
  }
  return out
}

export function checkSvgXml(source) {
  const src = source.replace(/^﻿/, "")
  const problems = []
  // Débuts de ligne, pour traduire une position en numéro de ligne
  const starts = [0]
  for (let k = 0; k < src.length; k++) if (src[k] === "\n") starts.push(k + 1)
  const lineOf = (pos) => {
    let lo = 0
    let hi = starts.length - 1
    while (lo < hi) {
      const mid = (lo + hi + 1) >> 1
      if (starts[mid] <= pos) lo = mid
      else hi = mid - 1
    }
    return lo + 1
  }
  const problem = (pos, message) => problems.push({ line: lineOf(pos), message })

  const stack = [] // { name, pos }
  let roots = 0
  let i = 0
  while (i < src.length) {
    const lt = src.indexOf("<", i)
    const textEnd = lt < 0 ? src.length : lt
    const text = src.slice(i, textEnd)
    if (text) {
      if (stack.length === 0 && text.trim()) problem(i + text.search(/\S/), `texte hors de l'élément racine « ${text.trim().slice(0, 30)} »`)
      if (text.includes(">") && stack.length === 0) problem(i + text.indexOf(">"), "« > » isolé hors de toute balise")
      for (const p of entityProblems(text, (k) => lineOf(i + k), "texte")) problems.push(p)
    }
    if (lt < 0) break
    i = lt
    if (src.startsWith("<!--", i)) {
      const end = src.indexOf("-->", i + 4)
      if (end < 0) {
        problem(i, "commentaire <!-- jamais fermé par -->")
        break
      }
      if (src.slice(i + 4, end).includes("--")) problem(i, "commentaire contenant « -- » (interdit en XML)")
      i = end + 3
      continue
    }
    if (src.startsWith("<![CDATA[", i)) {
      const end = src.indexOf("]]>", i)
      if (end < 0) {
        problem(i, "section <![CDATA[ jamais fermée par ]]>")
        break
      }
      if (stack.length === 0) problem(i, "section CDATA hors de l'élément racine")
      i = end + 3
      continue
    }
    if (src.startsWith("<?", i)) {
      const end = src.indexOf("?>", i)
      if (end < 0) {
        problem(i, "instruction <? jamais fermée par ?>")
        break
      }
      if (roots > 0 || stack.length > 0) problem(i, "instruction <?…?> après le début de l'illustration")
      i = end + 2
      continue
    }
    if (src.startsWith("<!DOCTYPE", i) || src.startsWith("<!doctype", i)) {
      // Sous-ensemble interne [ … ] possible : on cherche le « > » qui suit le « ] » éventuel
      const bracket = src.indexOf("[", i)
      const close = src.indexOf(">", i)
      const end = bracket >= 0 && bracket < close ? src.indexOf(">", src.indexOf("]", bracket)) : close
      if (end < 0) {
        problem(i, "<!DOCTYPE jamais fermé")
        break
      }
      if (roots > 0 || stack.length > 0) problem(i, "<!DOCTYPE après le début de l'illustration")
      i = end + 1
      continue
    }
    if (src.startsWith("</", i)) {
      const m = NAME.exec(src.slice(i + 2))
      const end = src.indexOf(">", i)
      if (!m || end < 0 || src.slice(i + 2 + m[0].length, end).trim()) {
        problem(i, `balise fermante mal écrite « ${src.slice(i, Math.min(end < 0 ? i + 30 : end + 1, i + 30))} »`)
        if (end < 0) break
        i = end + 1
        continue
      }
      const open = stack.pop()
      if (!open) problem(i, `balise fermante </${m[0]}> sans balise ouvrante`)
      else if (open.name !== m[0]) {
        problem(i, `</${m[0]}> ferme <${open.name}> ouvert ligne ${lineOf(open.pos)} : balise <${open.name}> jamais fermée (ou </${m[0]}> en trop)`)
        // Reprise : si le nom fermé existe plus bas dans la pile, on y remonte (une seule erreur par oubli)
        const k = stack.map((s) => s.name).lastIndexOf(m[0])
        if (k >= 0) stack.length = k
        else stack.push(open)
      }
      i = end + 1
      continue
    }
    // Balise ouvrante ou vide
    const m = NAME.exec(src.slice(i + 1))
    if (!m) {
      problem(i, "« < » qui n'ouvre aucune balise (écrire &lt; dans un texte)")
      i += 1
      continue
    }
    const name = m[0]
    const tagStart = i
    let j = i + 1 + name.length
    const seen = new Set()
    let selfClose = false
    let closed = false
    while (j < src.length) {
      const ws = /^\s*/.exec(src.slice(j))[0]
      j += ws.length
      if (src.startsWith("/>", j)) {
        selfClose = true
        closed = true
        j += 2
        break
      }
      if (src[j] === ">") {
        closed = true
        j += 1
        break
      }
      const an = NAME.exec(src.slice(j))
      if (!an || !ws) {
        problem(j, `<${name}> : attribut mal écrit près de « ${src.slice(j, j + 20).split("\n")[0]} »`)
        break
      }
      const attr = an[0]
      j += attr.length
      const eq = /^\s*=\s*/.exec(src.slice(j))
      if (!eq) {
        problem(j, `<${name}> : attribut « ${attr} » sans valeur (attendu ${attr}="…")`)
        break
      }
      j += eq[0].length
      const q = src[j]
      if (q !== '"' && q !== "'") {
        problem(j, `<${name}> : valeur de « ${attr} » sans guillemets`)
        break
      }
      const vend = src.indexOf(q, j + 1)
      if (vend < 0) {
        problem(j, `<${name}> : valeur de « ${attr} » jamais fermée`)
        break
      }
      const value = src.slice(j + 1, vend)
      if (value.includes("<")) problem(j, `<${name}> : « < » dans la valeur de « ${attr} » (écrire &lt;)`)
      for (const p of entityProblems(value, (k) => lineOf(j + 1 + k), `<${name}> ${attr}`)) problems.push(p)
      if (seen.has(attr)) problem(j, `<${name}> : attribut « ${attr} » en double`)
      seen.add(attr)
      j = vend + 1
    }
    if (!closed) {
      // Erreur déjà notée (attribut) ou fin de fichier : on saute au prochain « > »
      if (j >= src.length) problem(i, `<${name} jamais fermé par « > »`)
      const gt = src.indexOf(">", j)
      if (gt < 0) break
      i = gt + 1
      selfClose = src[gt - 1] === "/"
      if (selfClose) continue
    } else {
      i = j
    }
    if (stack.length === 0) {
      roots += 1
      if (roots === 1 && name !== "svg") problem(tagStart, `élément racine <${name}> : une illustration commence par <svg>`)
      if (roots === 2) problem(tagStart, `second élément racine <${name}> après </svg> : un seul élément racine`)
    }
    if (!selfClose) stack.push({ name, pos: tagStart })
  }
  for (const open of stack.reverse()) problems.push({ line: lineOf(open.pos), message: `balise <${open.name}> jamais fermée` })
  if (roots === 0 && !problems.length) problems.push({ line: 1, message: "aucun élément <svg>" })
  return problems.sort((a, b) => a.line - b.line)
}
