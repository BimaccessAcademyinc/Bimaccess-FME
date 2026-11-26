#!/usr/bin/env node
// Rend des planches SVG (1920 × 1080) en PNG avec les polices de la charte, puis une planche contact.
//
// Usage : node rendre_planches.mjs <dossier des thèmes> <projet studio>
//   <dossier des thèmes>/theme-<n>/planche.svg  →  theme-<n>/planche.png
//   <dossier des thèmes>/contact.png            →  les planches côte à côte, deux par ligne, titrées
// Les polices viennent des paquets @fontsource du projet studio (aucun réseau).
// Un seul Chromium, fermé à la fin. Code 0 : tout est rendu ; 1 : une planche manque ou échoue.
import { createRequire } from "node:module"
import { existsSync, readdirSync, readFileSync } from "node:fs"
import { join, resolve } from "node:path"
import { execFileSync } from "node:child_process"

const [dossier, projet] = process.argv.slice(2).map((p) => p && resolve(p))
if (!dossier || !projet) {
  console.error("usage : node rendre_planches.mjs <dossier des thèmes> <projet studio>")
  process.exit(2)
}

function chargerPlaywright() {
  const essais = [join(projet, "package.json")]
  try {
    essais.push(join(execFileSync("npm", ["root", "-g"], { encoding: "utf8" }).trim(), "noop.js"))
  } catch {}
  for (const base of essais) {
    try {
      return createRequire(base)("playwright")
    } catch {}
  }
  throw new Error("Playwright introuvable (projet, puis installation globale)")
}

const polices = [
  ["Azeret Mono", "azeret-mono", [200, 300, 400, 500]],
  ["IBM Plex Sans", "ibm-plex-sans", [400, 500, 600]],
  ["Fraunces", "fraunces", [400, 600]],
]
const fontFace = polices
  .flatMap(([nom, paquet, graisses]) =>
    graisses.map((g) => {
      const f = join(projet, "node_modules/@fontsource", paquet, "files", `${paquet}-latin-${g}-normal.woff2`)
      if (!existsSync(f)) return ""
      const b64 = readFileSync(f).toString("base64")
      return `@font-face{font-family:"${nom}";font-weight:${g};src:url(data:font/woff2;base64,${b64}) format("woff2")}`
    }),
  )
  .join("\n")

const themes = readdirSync(dossier, { withFileTypes: true })
  .filter((d) => d.isDirectory() && /^theme-\d+$/.test(d.name))
  .map((d) => d.name)
  .sort()
if (!themes.length) {
  console.error(`aucun dossier theme-<n> dans ${dossier}`)
  process.exit(1)
}

const { chromium } = chargerPlaywright()
const nav = await chromium.launch()
let code = 0
try {
  const page = await nav.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 })
  const rendus = []
  for (const t of themes) {
    const svg = join(dossier, t, "planche.svg")
    if (!existsSync(svg)) {
      console.error(`${t} : planche.svg absente`)
      code = 1
      continue
    }
    const titre = existsSync(join(dossier, t, "nom.txt")) ? readFileSync(join(dossier, t, "nom.txt"), "utf8").trim() : t
    const html = `<!doctype html><meta charset="utf-8"><style>${fontFace}html,body{margin:0;background:#fff}svg{display:block;width:1920px;height:1080px}</style>${readFileSync(svg, "utf8").replace(/^<\?xml[^>]*>/, "")}`
    await page.setContent(html, { waitUntil: "load" })
    await page.evaluate(() => document.fonts.ready)
    const sortie = join(dossier, t, "planche.png")
    await page.screenshot({ path: sortie })
    rendus.push({ titre, b64: readFileSync(sortie).toString("base64") })
    console.log(`${t} : ${sortie}`)
  }
  if (rendus.length) {
    const cellules = rendus
      .map((r) => `<figure><img src="data:image/png;base64,${r.b64}"><figcaption>${r.titre.replace(/</g, "&lt;")}</figcaption></figure>`)
      .join("")
    const lignes = Math.ceil(rendus.length / 2)
    const contact = await nav.newPage({ viewport: { width: 1920, height: lignes * 600 + 20 }, deviceScaleFactor: 1 })
    await contact.setContent(
      `<!doctype html><meta charset="utf-8"><style>${fontFace}body{margin:0;padding:10px;background:#fff;display:grid;grid-template-columns:1fr 1fr;gap:10px;font:500 22px "Azeret Mono"}figure{margin:0}img{width:100%;display:block;border:1px solid #9aa3ad}figcaption{padding:6px 0}</style>${cellules}`,
      { waitUntil: "load" },
    )
    await contact.evaluate(() => document.fonts.ready)
    await contact.screenshot({ path: join(dossier, "contact.png"), fullPage: true })
    console.log(`planche contact : ${join(dossier, "contact.png")}`)
  }
} catch (e) {
  console.error(`échec du rendu : ${e.message}`)
  code = 1
} finally {
  await nav.close()
}
process.exit(code)
