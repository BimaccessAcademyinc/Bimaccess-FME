#!/usr/bin/env node
// Construit le lecteur de relecture : chaque leçon studio du dépôt (modules/*/L*/lecon),
// puis une page d'accueil qui les liste. Sortie : reader/public/.
//
//   node reader/build.mjs            installe et construit chaque leçon (npm ci, npm run build)
//   node reader/build.mjs --no-install   reprend les node_modules présents (essai local)
import { execFileSync } from "node:child_process"
import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath } from "node:url"

const RACINE = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const SORTIE = join(RACINE, "reader", "public")
const install = !process.argv.includes("--no-install")

const lecons = []
for (const mod of readdirSync(join(RACINE, "modules")).filter((d) => /^M\d+$/.test(d)).sort()) {
  for (const lec of readdirSync(join(RACINE, "modules", mod)).filter((d) => /^L\d+$/.test(d)).sort()) {
    const dossier = join(RACINE, "modules", mod, lec, "lecon")
    if (!existsSync(join(dossier, "studio.config.json"))) continue
    const cfg = JSON.parse(readFileSync(join(dossier, "studio.config.json"), "utf8"))
    lecons.push({ module: mod, lecon: lec, dossier, id: cfg.id, titre: cfg.title ?? cfg.id })
  }
}
if (!lecons.length) {
  console.error("[reader] aucune leçon studio trouvée (modules/*/L*/lecon/studio.config.json)")
  process.exit(1)
}

rmSync(SORTIE, { recursive: true, force: true })
mkdirSync(SORTIE, { recursive: true })

for (const l of lecons) {
  console.log(`[reader] ${l.id} : construction`)
  const opts = { cwd: l.dossier, stdio: "inherit" }
  if (install || !existsSync(join(l.dossier, "node_modules"))) execFileSync("npm", ["ci", "--no-audit", "--no-fund"], opts)
  execFileSync("npm", ["run", "build"], opts)
  cpSync(join(l.dossier, "dist"), join(SORTIE, l.id), { recursive: true })
}

const echap = (t) => String(t).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
const date = new Date().toISOString().slice(0, 16).replace("T", " ")
const commit = (process.env.RAILWAY_GIT_COMMIT_SHA ?? "").slice(0, 7)
const parModule = new Map()
for (const l of lecons) parModule.set(l.module, [...(parModule.get(l.module) ?? []), l])
const sections = [...parModule]
  .map(([mod, ls]) => `<section><h2>FME001-${echap(mod)}</h2><ul>${ls.map((l) => `<li><a href="./${encodeURIComponent(l.id)}/"><span class="code">${echap(l.id)}</span><span class="titre">${echap(l.titre)}</span></a></li>`).join("")}</ul></section>`)
  .join("")

writeFileSync(
  join(SORTIE, "index.html"),
  `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>FME001 · Lecteur de relecture</title>
<style>
:root{--fond:#F1F3EC;--papier:#FBFCF8;--encre:#23281F;--encre2:#545B4C;--lien:#7A4A22;--programme:#00A64F}
*{box-sizing:border-box}
body{margin:0;background:var(--fond);color:var(--encre);font:18px/1.45 "Source Serif 4",Georgia,serif}
main{max-width:960px;margin:0 auto;padding:40px 16px 64px}
header{border:2px solid var(--encre);outline:1px solid var(--encre);outline-offset:4px;background:var(--papier);padding:20px 24px;margin-bottom:32px}
.pastille{display:inline-block;width:12px;height:12px;background:var(--programme);margin-right:10px;vertical-align:middle}
.capitales{font:600 15px/1.2 "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.3em;text-transform:uppercase}
h1{margin:12px 0 4px;font-size:34px;line-height:1.15}
header p{margin:0;color:var(--encre2)}
h2{font:600 16px/1.2 "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.3em;text-transform:uppercase;border-bottom:2px solid var(--encre);padding-bottom:6px}
ul{list-style:none;margin:0;padding:0}
li a{display:flex;gap:16px;align-items:baseline;flex-wrap:wrap;padding:14px 12px;border:1.5px solid var(--encre);background:var(--papier);margin-bottom:10px;color:var(--encre);text-decoration:none}
li a:hover,li a:focus-visible{outline:3px solid #2F6DA8;outline-offset:2px}
.code{font:600 15px "Barlow Condensed","Arial Narrow",sans-serif;letter-spacing:.2em}
.titre{font-size:20px}
footer{margin-top:40px;color:var(--encre2);font-size:15px}
</style>
</head>
<body>
<main>
<header>
<div class="capitales"><span class="pastille" aria-hidden="true"></span>FME001 · BIMaccess Academy</div>
<h1>Lecteur de relecture</h1>
<p>Les leçons du module FME001, telles qu'elles sont sur la branche de travail. Sans voix pour l'instant : sous-titres seulement.</p>
</header>
${sections}
<footer>Construit le ${echap(date)} UTC${commit ? ` · commit ${echap(commit)}` : ""}.</footer>
</main>
</body>
</html>
`,
)
console.log(`[reader] ${lecons.length} leçon(s) dans ${SORTIE}`)
