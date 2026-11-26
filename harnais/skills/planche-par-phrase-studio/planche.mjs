#!/usr/bin/env node
// Planche par phrase d'un projet studio : une capture au milieu de chaque phrase de la
// narration, la phrase dessous, une planche PNG par scène.
//
// Usage (depuis le dossier du projet, après npm run build) :
//   node planche.mjs [--scenes S01,S03] [--out .studio/qa/sens] [--choose a]
//
// Les instants viennent de src/generated/narration.ts (alignement de la voix quand elle
// existe, sinon minutage estimé sur le texte) et de META.voiceStart. Les captures sont
// faites par shots.mjs du skill qa du plugin (un seul Chromium, verrou partagé). Pour une
// scène d'exercice, la narration d'entrée est capturée telle quelle, puis le choix
// --choose (défaut : le premier) est validé et la narration déclenchée capturée.
// Code 0 : planches écrites ; 1 : échec.
import { createRequire } from "node:module"
import { execFileSync } from "node:child_process"
import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs"
import { join, resolve } from "node:path"

const arg = (k, d) => {
  const i = process.argv.indexOf(k)
  return i >= 0 && process.argv[i + 1] ? process.argv[i + 1] : d
}
const PROJET = process.cwd()
const OUT = resolve(arg("--out", ".studio/qa/sens"))
const CHOIX = arg("--choose", "a")
const SHOTS = resolve(arg("--shots", "/home/user/bimaccess-studio/plugins/studio/skills/qa/scripts/shots.mjs"))

function objetApres(texte, marque) {
  const i = texte.indexOf(marque)
  if (i < 0) throw new Error(`« ${marque} » introuvable`)
  let k = texte.indexOf("{", i), prof = 0, dansChaine = false, echap = false
  for (let j = k; j < texte.length; j++) {
    const c = texte[j]
    if (dansChaine) {
      if (echap) echap = false
      else if (c === "\\") echap = true
      else if (c === '"') dansChaine = false
    } else if (c === '"') dansChaine = true
    else if (c === "{") prof++
    else if (c === "}" && --prof === 0) return JSON.parse(texte.slice(k, j + 1))
  }
  throw new Error(`objet après « ${marque} » non fermé`)
}

const CLIPS = objetApres(readFileSync(join(PROJET, "src/generated/narration.ts"), "utf8"), "CLIPS")
const metaTexte = readFileSync(join(PROJET, "src/generated/meta.ts"), "utf8")
const voiceStart = Number((metaTexte.match(/"voiceStart":\s*([\d.]+)/) || [])[1] ?? 0)

function phrases(clip) {
  const out = []
  let cur = []
  for (const w of clip.words) {
    cur.push(w)
    if (/[.?!]["»)]?$/.test(w.text)) {
      out.push(cur)
      cur = []
    }
  }
  if (cur.length) out.push(cur)
  return out.map((ws) => ({ texte: ws.map((w) => w.text).join(" "), milieu: (ws[0].start + ws.at(-1).end) / 2 }))
}

const scenesVoulues = arg("--scenes", null)?.split(",")
const ids = [...new Set(Object.values(CLIPS).map((c) => c.scene))].sort()
mkdirSync(OUT, { recursive: true })

function captures(n, times, extra, dossier) {
  mkdirSync(dossier, { recursive: true })
  execFileSync("node", [SHOTS, "--scene", String(n), "--times", times.join(","), "--out", dossier, ...extra], { stdio: ["ignore", "ignore", "inherit"] })
}

function fichiers(dossier, prefixe) {
  return readdirSync(dossier)
    .filter((f) => f.startsWith(prefixe) && f.endsWith(".png"))
    .map((f) => ({ f, t: f.includes("-end") ? Infinity : Number((f.match(/-t([\d.]+)\.png$/) || [])[1]) }))
    .sort((a, b) => a.t - b.t)
    .map((x) => join(dossier, x.f))
}

const planches = []
for (const [index, id] of ids.entries()) {
  if (scenesVoulues && !scenesVoulues.includes(id)) continue
  const n = index + 1
  const nn = id.slice(1)
  const entree = Object.values(CLIPS).find((c) => c.scene === id && c.trigger !== "event")
  const declenche = Object.values(CLIPS).find((c) => c.scene === id && c.trigger === "event")
  const dossier = join(OUT, id)
  const lignes = []
  const pe = phrases(entree)
  captures(n, [...pe.map((p) => (voiceStart + p.milieu).toFixed(2)), "end"], [], dossier)
  const imgs = fichiers(dossier, `s${nn}-t`).concat(fichiers(dossier, `s${nn}-end`))
  pe.forEach((p, i) => lignes.push({ img: imgs[i], texte: p.texte }))
  lignes.push({ img: imgs[pe.length], texte: declenche ? "Fin de la narration d'entrée, avant le choix." : "État final de la scène." })
  if (declenche) {
    const pd = phrases(declenche)
    captures(n, [...pd.map((p) => (0.3 + p.milieu).toFixed(2)), "end"], ["--choose", CHOIX], dossier)
    const imgsD = fichiers(dossier, `s${nn}-${CHOIX}-t`).concat(fichiers(dossier, `s${nn}-${CHOIX}-end`))
    pd.forEach((p, i) => lignes.push({ img: imgsD[i], texte: `(après le choix ${CHOIX}) ${p.texte}` }))
    lignes.push({ img: imgsD[pd.length], texte: `État final après le choix ${CHOIX}.` })
  }
  planches.push({ id, lignes: lignes.filter((l) => l.img && existsSync(l.img)) })
  console.log(`${id} : ${lignes.length} captures`)
}

const req = createRequire(join(PROJET, "package.json"))
let pw
try {
  pw = req("playwright")
} catch {
  pw = createRequire(join(execFileSync("npm", ["root", "-g"], { encoding: "utf8" }).trim(), "x.js"))("playwright")
}
const nav = await pw.chromium.launch()
try {
  for (const p of planches) {
    const cellules = p.lignes
      .map((l, i) => `<figure><img src="data:image/png;base64,${readFileSync(l.img).toString("base64")}"><figcaption><b>${i + 1}.</b> ${l.texte.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</figcaption></figure>`)
      .join("")
    const page = await nav.newPage({ viewport: { width: 1800, height: 900 }, deviceScaleFactor: 1 })
    await page.setContent(`<!doctype html><meta charset="utf-8"><style>body{margin:0;padding:16px;font:18px/1.35 system-ui,sans-serif;background:#fff}h1{font-size:24px;margin:0 0 12px}main{display:grid;grid-template-columns:1fr 1fr;gap:16px}img{width:100%;display:block;border:1px solid #999}figure{margin:0}figcaption{padding:6px 2px}</style><h1>${p.id} · planche par phrase</h1><main>${cellules}</main>`)
    const sortie = join(OUT, `planche-${p.id}.png`)
    await page.screenshot({ path: sortie, fullPage: true })
    await page.close()
    console.log(`planche : ${sortie}`)
  }
} finally {
  await nav.close()
}
writeFileSync(join(OUT, "planches.json"), JSON.stringify(planches.map((p) => ({ id: p.id, phrases: p.lignes.map((l) => l.texte) })), null, 2))
