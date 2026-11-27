#!/usr/bin/env node
/**
 * Vérifie la mesure des textes des contrôles de composition (controles.ts,
 * metriques.json) contre le navigateur : pour chaque scène à gabarit
 * (content/design/scenes/Sxx.json), boîte estimée de chaque texte et boîte
 * posée par Chromium dans l'état final de dist/index.html (npm run build
 * d'abord). Une colonne par mesure : lignes, x0, x1, y (estimé / navigateur).
 * Un texte « dans » ou balayé est mesuré par le navigateur avec sa boîte
 * (padding, interlettrage de fin) : quelques px de plus, attendus.
 *
 * Usage : node scripts/metriques-verifier.mjs   (Playwright cherché dans le projet, puis l'installation globale de npm)
 */
import { readdirSync, readFileSync } from "node:fs"
import { createRequire } from "node:module"
import { execSync } from "node:child_process"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { acquireChromiumLock } from "./lib/chromium-lock.mjs"
const P = join(dirname(fileURLToPath(import.meta.url)), "..")
process.chdir(P)
const { createServer } = await import("vite")
const server = await createServer({ root: P, configFile: P + "/vite.config.ts", logLevel: "silent", appType: "custom", server: { middlewareMode: true, hmr: false, watch: null }, optimizeDeps: { noDiscovery: true, include: [] } })
const D = await server.ssrLoadModule("/src/engine/gabarits/donnees.ts")
const PL = await server.ssrLoadModule("/src/engine/gabarits/plan.ts")
const C = await server.ssrLoadModule("/src/engine/gabarits/controles.ts")
const est = {}
const G = await server.ssrLoadModule("/src/generated/texts.ts")
const scenes = readdirSync("content/design/scenes").filter((f) => /^S\d\d\.json$/.test(f)).map((f) => f.slice(0, 3))
for (const sc of scenes) {
  const data = JSON.parse(readFileSync(`content/design/scenes/${sc}.json`, "utf8"))
  const plan = PL.planifier(D.lire(data.gabarit, data))
  est[sc] = Object.fromEntries([...plan.textes].map(([id, p]) => [id, C.mesurer(id, p, "x")]))
}
await server.close()
const require = createRequire(import.meta.url)
let pw
try { pw = require(join(P, "node_modules/playwright")) } catch { pw = require(join(execSync("npm root -g").toString().trim(), "playwright")) }
const { chromium } = pw
const lock = await acquireChromiumLock({ tool: "metriques-verifier", log: (m) => console.error(m) })
if (!lock.ok) {
  console.error("[metriques] un autre Chromium tourne toujours : relancer plus tard")
  process.exit(2)
}
const b = await chromium.launch()

for (const sc of scenes) {
  const n = G.SCENE_IDS.indexOf(sc) + 1
  const page = await b.newPage({ viewport: { width: 1920, height: 1080 } })
  await page.goto(`file://${P}/dist/index.html#/${n}`)
  await page.getByTestId("start").click()
  await page.waitForFunction(() => document.querySelector('[data-testid="stage"]')?.getAttribute("data-stage-ready") === "true")
  if ((await page.getAttribute('[data-testid="stage"]', "data-playing")) === "true") await page.getByTestId("narration-toggle").click()
  await page.evaluate(() => { const i = document.querySelector('[data-testid="narration-scrub"]'); const s = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set; s.call(i, i.max); i.dispatchEvent(new Event("input", { bubbles: true })); i.dispatchEvent(new Event("change", { bubbles: true })) })
  await page.waitForTimeout(800)
  const res = await page.evaluate((sc) => {
    const scene = document.querySelector(`[data-testid="${sc.toLowerCase()}-scene"]`).getBoundingClientRect()
    const k = scene.width / 1920
    const out = {}
    for (const el of document.querySelectorAll(`[data-testid^="${sc.toLowerCase()}-"]`)) {
      const id = el.getAttribute("data-testid").slice(4)
      const r = document.createRange(); r.selectNodeContents(el)
      const rects = [...r.getClientRects()].filter((q) => q.width > 0)
      if (!rects.length || !el.textContent.trim()) continue
      const tops = new Set(rects.map((q) => Math.round(q.top)))
      const x0 = Math.min(...rects.map((q) => q.left)), x1 = Math.max(...rects.map((q) => q.right))
      const y0 = Math.min(...rects.map((q) => q.top)), y1 = Math.max(...rects.map((q) => q.bottom))
      out[id] = { x0: (x0 - scene.left) / k, x1: (x1 - scene.left) / k, y0: (y0 - scene.top) / k, y1: (y1 - scene.top) / k, lignes: tops.size }
    }
    return out
  }, sc)
  for (const [id, e] of Object.entries(est[sc])) {
    const r = res[id]
    if (!r) { console.log(sc, id, "absent du DOM"); continue }
    const f = (v) => v.toFixed(1).padStart(7)
    console.log(`${sc} ${id.padEnd(20)} lignes ${e.lignes.length}/${r.lignes}  x0 ${f(e.x0)} / ${f(r.x0)}  x1 ${f(e.x1)} / ${f(r.x1)}  y ${f(e.y0)}-${f(e.y1)} / ${f(r.y0)}-${f(r.y1)}`)
  }
}
await b.close()
lock.release()
