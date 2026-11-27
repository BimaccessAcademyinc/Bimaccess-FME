#!/usr/bin/env node
// Écrit la planche d'une scène et sa partition pour le canevas de design (type Design de l'outil Artifact).
//
//   node planche_canevas.mjs --scene S02 --gabarit frise --titre "S02 · …" \
//     --elements S02.elements.html --etapes S02.etapes.txt --blobs blobs.json --sortie <dossier du canevas>
//
// --elements : fragment HTML des éléments posés, dans la notation de ../canevas/notation.md
//              (src="asset:<fichier>" pour une illustration : remplacé par l'adresse téléversée, lue dans --blobs).
// --etapes   : une ligne par étape, « N | état | locution » (étape 1 : locution « début »).
// Sortie : <sortie>/project/<scene>.dc.html et <sortie>/project/<scene>-partition.dc.html.
// Une planche déjà corrigée sur le canevas ne se régénère pas : on la relit (action read) et on l'exporte.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { POLICES_GOOGLE, STYLE_REPERES, habillageSvg, zonesHtml } from "./canevas_commun.mjs"

const args = Object.fromEntries(
  process.argv.slice(2).reduce((acc, a, i, all) => (a.startsWith("--") ? [...acc, [a.slice(2), all[i + 1]]] : acc), []),
)
for (const k of ["scene", "gabarit", "elements", "etapes", "blobs", "sortie"]) {
  if (!args[k]) { console.error(`planche_canevas : --${k} manque`); process.exit(2) }
}
const blobs = JSON.parse(readFileSync(args.blobs, "utf8"))
let elements = readFileSync(args.elements, "utf8")
elements = elements.replace(/src="asset:([a-z0-9-]+)"/g, (_, f) => {
  if (!blobs[f]) { console.error(`planche_canevas : illustration « ${f} » non téléversée (absente de ${args.blobs})`); process.exit(2) }
  return `src="${blobs[f]}"`
})
const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
const etapes = readFileSync(args.etapes, "utf8").split("\n").map((l) => l.trim()).filter((l) => l && !l.startsWith("#"))
  .map((l) => { const [n, etat, ...loc] = l.split("|").map((x) => x.trim()); return { n, etat, locution: loc.join("|") } })

const titre = args.titre ?? `${args.scene} · planche`
const tete = (t) => `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>${esc(t)}</title>
<script src="./support.js"></script>
</head>
<body>
<x-dc>
<helmet>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="${POLICES_GOOGLE}" rel="stylesheet">
<style>
body{margin:0}
a{color:#7A4A22}a:hover{color:#4F2E12}
${STYLE_REPERES}
</style>
</helmet>`
const pied = (props) => `</x-dc>
<script type="text/x-dc" data-dc-script data-props='${JSON.stringify(props)}'>
class Component extends DCLogic {
  renderVals() {
    return { reperes: this.props.reperes === false ? 'non' : 'oui' };
  }
}
</script>
</body>
</html>
`

const planche = `${tete(titre)}
<div data-planche data-scene="${args.scene}" data-gabarit="${args.gabarit}" data-reperes="{{reperes}}" style="width: 1920px; height: 1080px; position: relative; overflow: hidden; background: #F1F3EC; font-family: 'Source Serif 4', serif; color: #23281F">
  ${habillageSvg()}
  ${zonesHtml()}
${elements.trimEnd()}
</div>
${pied({ reperes: { editor: "boolean", default: true }, $preview: { width: 1920, height: 1080 } })}`

const lignes = etapes.map((e) => `    <div data-etape="${esc(e.n)}" style="display: grid; grid-template-columns: 90px 170px minmax(0, 1fr); gap: 24px; padding: 14px 0; border-bottom: 1px solid #7D8576; align-items: baseline">
      <span style="font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 30px">${esc(e.n)}</span>
      <span data-champ="etat" style="font-family: 'Barlow Condensed', sans-serif; font-weight: 500; font-size: 26px; letter-spacing: 0.08em">${esc(e.etat)}</span>
      <span data-champ="locution" style="font-size: 30px">${esc(e.locution)}</span>
    </div>`).join("\n")
const hauteur = 260 + etapes.length * 66
const partition = `${tete(`${args.scene} · partition`)}
<div data-partition data-scene="${args.scene}" style="width: 1920px; min-height: ${hauteur}px; box-sizing: border-box; padding: 64px 104px; background: #FBFCF8; font-family: 'Source Serif 4', serif; color: #23281F">
  <h1 style="margin: 0 0 8px; font-size: 48px; font-weight: 600">${esc(args.scene)} · partition</h1>
  <p style="margin: 0 0 28px; font-size: 26px; font-style: italic; color: #545B4C">Une ligne par étape : numéro, état, locution dite mot pour mot. Sur la planche, chaque repère « 3.2 trace 0,25 » renvoie à l'étape 3, deuxième geste.</p>
  <div style="display: flex; flex-direction: column">
${lignes}
  </div>
</div>
${pied({ $preview: { width: 1920, height: hauteur } })}`

mkdirSync(join(args.sortie, "project"), { recursive: true })
writeFileSync(join(args.sortie, "project", `${args.scene}.dc.html`), planche)
writeFileSync(join(args.sortie, "project", `${args.scene}-partition.dc.html`), partition)
console.log(`planche_canevas : ${args.scene}.dc.html et ${args.scene}-partition.dc.html écrits dans ${join(args.sortie, "project")}`)
