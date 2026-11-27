#!/usr/bin/env node
/**
 * gabarits-selftest · auto-test des gabarits de scène (src/engine/gabarits/,
 * docs/gabarits.md) dans la signature du projet : npm run test:gabarits.
 *
 * Monte un projet jetable (dossier temporaire du système, ou --tmp <dossier>)
 * avec le moteur, le lecteur et les scripts du projet, ses node_modules (lien),
 * sa signature, son programme et son thème, et un contenu d'essai : deux
 * scènes à gabarit, S01 par Frise et S02 par FicheRubriques, pilotées par
 * content/design/scenes/S01.json et S02.json, sans voix (minutage estimé).
 * Les places sont calculées sur la face de la signature active (PAGE.face) :
 * le même essai vaut pour bimaccess, carte et neutral.
 *
 * Vérifie :
 *   - les deux scènes se chargent (npm run sync --scenes : « scènes
 *     chargées : 2 ») et passent tsc ;
 *   - chaque contrôle de chargement refuse sa faute avec une GabaritError qui
 *     nomme le fichier et le champ : locution introuvable, jeton de couleur
 *     inconnu, largeur de texte inconnue, geste qui déborde, et les contrôles
 *     de la composition finale (face non remplie, texte hors de la face, cadre
 *     de mise en évidence hors de la face, texte sur un trait, textes ou
 *     illustrations qui se chevauchent, trait qui traverse une illustration) ;
 *   - avec --play : la page d'essai se construit (vite build) et passe
 *     scripts/play-check.mjs dans un vrai navigateur (rendu, une mise en
 *     évidence au plus, console sans erreur).
 *
 * Usage (depuis le dossier du projet, après npm install) :
 *   node scripts/gabarits-selftest.mjs [--play] [--keep] [--tmp <dossier>]
 *        [--chromium <chemin>] [--from <dossier de playwright>]
 *
 * Codes de sortie : 0 tout passe ; 1 au moins un échec ; 2 environnement
 * (pas un projet studio, node_modules absent : lancer npm install).
 */
import { spawn } from "node:child_process"
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import { tmpdir } from "node:os"
import { dirname, join, resolve } from "node:path"
import { fileURLToPath, pathToFileURL } from "node:url"

const args = process.argv.slice(2)
if (args.includes("--help") || args.includes("-h")) {
  console.log(readFileSync(fileURLToPath(import.meta.url), "utf8").split("*/")[0])
  process.exit(0)
}
const opt = (name) => {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : undefined
}
const env = (m) => {
  console.error(`[gabarits] ${m}`)
  process.exit(2)
}

const PROJECT = resolve(dirname(fileURLToPath(import.meta.url)), "..")
if (!existsSync(join(PROJECT, "studio.config.json"))) env(`${PROJECT} n'est pas un projet studio (studio.config.json absent)`)
if (!existsSync(join(PROJECT, "node_modules", "vite"))) env("node_modules absent : lancer npm install dans le projet")
if (!existsSync(join(PROJECT, "src", "engine", "gabarits", "index.ts"))) env("src/engine/gabarits/ absent : le moteur du projet n'a pas de gabarits")

const base = opt("--tmp") ? resolve(opt("--tmp")) : tmpdir()
mkdirSync(base, { recursive: true })
const root = mkdtempSync(join(base, "studio-gabarits-test-"))
const keep = args.includes("--keep")
const play = args.includes("--play")

let passed = 0
let failed = 0
const check = (cond, label, detail = "") => {
  if (cond) {
    passed += 1
    console.log(`  ok    ${label}`)
  } else {
    failed += 1
    console.log(`  ÉCHEC ${label}${detail ? `\n        ${String(detail).split("\n").slice(-14).join("\n        ")}` : ""}`)
  }
}
const write = (rel, text) => {
  mkdirSync(dirname(join(root, rel)), { recursive: true })
  writeFileSync(join(root, rel), text)
}
const run = (cmd, argv, { timeout = 300_000 } = {}) =>
  new Promise((done) => {
    const p = spawn(cmd, argv, { cwd: root, env: process.env })
    let text = ""
    const timer = setTimeout(() => p.kill("SIGKILL"), timeout)
    p.stdout.on("data", (d) => (text += d))
    p.stderr.on("data", (d) => (text += d))
    p.on("close", (code) => {
      clearTimeout(timer)
      done({ code, out: text })
    })
  })

/* ── Projet d'essai ─────────────────────────────────────────────────────── */

const cfg = JSON.parse(readFileSync(join(PROJECT, "studio.config.json"), "utf8"))
const signature = cfg.signature ?? "bimaccess"
console.log(`[gabarits] auto-test des gabarits, signature ${signature} : projet jetable ${root}`)

for (const rel of ["src/engine", "src/player", "src/i18n.ts", "src/main.tsx", "scripts", "index.html", "vite.config.ts", "tsconfig.json", "package.json"]) {
  if (existsSync(join(PROJECT, rel))) cpSync(join(PROJECT, rel), join(root, rel), { recursive: true })
}
if (existsSync(join(PROJECT, "content", "design", "theme.json"))) cpSync(join(PROJECT, "content", "design", "theme.json"), join(root, "content", "design", "theme.json"))
symlinkSync(join(PROJECT, "node_modules"), join(root, "node_modules"), process.platform === "win32" ? "junction" : "dir")

const { program, programColor } = cfg
write(
  "studio.config.json",
  `${JSON.stringify(
    {
      id: "essai-gabarits",
      title: "Essai des gabarits",
      lang: "fr",
      signature,
      ...(program ? { program } : {}),
      ...(programColor ? { programColor } : {}),
      fps: 30,
      width: 1920,
      height: 1080,
      voiceStart: 0.4,
      tail: 0.8,
      storyboard: "content/storyboard.md",
      manifest: "content/voice/voice-manifest.yaml",
      beats: "content/beats.json",
      theme: "content/design/theme.json",
      assets: "content/design/assets",
      intro: 3,
      acknowledgeRemotionLicense: false,
    },
    null,
    2,
  )}\n`,
)
write(
  "content/storyboard.md",
  `# S01 · Une frise

## Écran

- \`Une frise d'essai.\`
- \`Le projet commence\`
- \`La première version\`
- \`Nom posé dans la carte\`
- \`Source de la scène\`

## Narration

Le projet commence par une idée simple. La première version sort trois ans plus tard. Le logiciel grandit ensuite avec ses utilisateurs.

# S02 · Une fiche

## Écran

- \`Une fiche d'essai.\`
- \`Géométrie\`
- \`Attributs\`
- \`Système de coordonnées\`

## Narration

La donnée se range dans une fiche. Sa géométrie vient en premier. Ses attributs la décrivent ensuite. Son système de coordonnées la situe enfin.
`,
)
write("content/beats.json", "{}\n")
write("content/sources.json", `${JSON.stringify({ sources: { S01: "https://example.org/source-s01" } }, null, 2)}\n`)
/** Illustration d'essai : un cadre et une diagonale, viewBox de w × h (la hauteur posée suit le viewBox). */
const svg = (w, h) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="none" stroke="#545B4C" stroke-width="2"/><path d="M1 1 L${w - 1} ${h - 1}" stroke="#545B4C" stroke-width="1"/></svg>\n`
write("src/lesson/scenes/s01.tsx", `import data from "../../../content/design/scenes/S01.json"\nimport { defineScene, Frise } from "../../engine"\n\nexport const s01 = defineScene(Frise.scene(data))\n`)
write("src/lesson/scenes/s02.tsx", `import data from "../../../content/design/scenes/S02.json"\nimport { defineScene, FicheRubriques } from "../../engine"\n\nexport const s02 = defineScene(FicheRubriques.scene(data))\n`)
write("src/lesson/lesson.ts", `import { defineLesson } from "../engine"\nimport { s01 } from "./scenes/s01"\nimport { s02 } from "./scenes/s02"\n\nexport const LESSON = defineLesson({ scenes: [s01, s02] })\n`)
// Données provisoires : remplacées une fois la face connue (le premier sync ne charge pas les scènes)
write("content/design/scenes/S01.json", "{}\n")
write("content/design/scenes/S02.json", "{}\n")

/* ── Données d'essai, calculées sur la face de la signature ─────────────── */

const r1 = (n) => Math.round(n * 10) / 10

function donnees(f) {
  const W = f.x1 - f.x0
  const H = f.y1 - f.y0
  const X = (k) => r1(f.x0 + k * W)
  const Y = (k) => r1(f.y0 + k * H)
  const ill = {}
  const assets = {}
  // viewBox de 1000 de large, hauteur arrondie par défaut : la boîte posée ne dépasse jamais w × h
  const boite = (w, h) => ({ largeur: Math.floor(w * 10) / 10, vbH: Math.floor((10000 * h) / w) / 10 })
  const poser = (id, x, y, w, h) => {
    const fichier = `essai-${id}`
    const b = boite(w, h)
    assets[fichier] = svg(1000, b.vbH)
    ill[id] = { fichier, x, y, largeur: b.largeur }
    return { x, y, w: b.largeur, h: (b.largeur * b.vbH) / 1000 }
  }
  // S01 · Frise : colonne à gauche, bandeau au-dessus de la ligne, bandeau au-dessous, jalons et libellés entre les deux
  const gauche = poser("gauche", f.x0, f.y0, 0.2 * W, H)
  const haut = poser("haut", X(0.22), f.y0, 0.78 * W, 0.4 * H)
  const ligne = Y(0.48)
  const j1 = X(0.3)
  const j2 = X(0.62)
  poser("bas", X(0.22), Y(0.62), 0.78 * W, 0.38 * H)
  const libelle = { police: "body", taille: 30, interligne: 1.2, couleur: "ink" }
  const s01 = {
    gabarit: "frise",
    scene: "S01",
    ecran: 5,
    titre: 0,
    source: 4,
    styles: { libelle },
    illustrations: ill,
    frise: { de: [X(0.22), ligne], a: [r1(f.x1 - 18), ligne], epaisseur: 3, pointe: [[r1(f.x1 - 18), ligne - 9], [f.x1, ligne], [r1(f.x1 - 18), ligne + 9]] },
    annees: { cases: { de: [j1, ligne], a: [j2, ligne], epaisseur: 14, claire: { de: [X(0.4), ligne], a: [X(0.5), ligne], epaisseur: 10 } } },
    traces: {
      "jalon-1": { points: [[j1, ligne - 20], [j1, ligne + 20]], epaisseur: 2.5 },
      "jalon-2": { points: [[j2, ligne - 20], [j2, ligne + 20]], epaisseur: 2.5 },
      lien: { points: [[r1(gauche.x + gauche.w - 12), Y(0.2)], [r1(haut.x + 12), Y(0.2)]], epaisseur: 4 },
    },
    textes: {
      "libelle-1": { ecran: 1, style: "libelle", x: r1(j1 + 16), y: Y(0.53), largeurMesuree: 300 },
      "libelle-2": { ecran: 2, style: "libelle", x: r1(j2 + 16), y: Y(0.53), largeurMesuree: 300 },
      nom: { ecran: 3, style: "libelle", x: r1(haut.x + 24), y: r1(haut.y + 24), place: "carte", largeurMesuree: 340 },
    },
    etapes: [
      { debut: true, etat: "S01-1", gestes: [{ poser: "gauche" }, { poser: "haut" }, { poser: "nom" }] },
      { locution: "Le projet commence", etat: "S01-2", gestes: [{ trace: "lien", duree: 0.3 }, { trace: "jalon-1", duree: 0.25 }, { frappe: "libelle-1" }] },
      { locution: "La première version", etat: "S01-3", gestes: [{ trace: "cases", duree: 0.45 }, { trace: "jalon-2", duree: 0.25 }, { frappe: "libelle-2" }] },
      { locution: "Le logiciel grandit", etat: "S01-FIN", gestes: [{ balayage: "bas", sens: "haut", duree: 0.4 }, { frappe: "titre" }] },
    ],
    evidences: {
      "libelle-2": { x: r1(j2 + 6), y: Y(0.53) - 8, largeur: 320, hauteur: 52, de: "La première version", a: "Le logiciel grandit" },
    },
  }
  // S02 · FicheRubriques : objet et carte à gauche, feuille à trois bandes à droite, contour qui voyage dans la bande 2
  const ill2 = {}
  const poser2 = (id, x, y, w, h) => {
    const fichier = `essai2-${id}`
    const b = boite(w, h)
    assets[fichier] = svg(1000, b.vbH)
    ill2[id] = { fichier, x, y, largeur: b.largeur }
    return { x, y, w: b.largeur, h: (b.largeur * b.vbH) / 1000 }
  }
  poser2("objet", f.x0, f.y0, 0.45 * W, 0.48 * H)
  poser2("carte", f.x0, Y(0.52), 0.45 * W, 0.48 * H)
  const feuille = poser2("feuille", X(0.48), f.y0, 0.52 * W, H)
  poser2("contour", X(0.1), Y(0.66), 0.15 * W, 0.2 * H)
  const b1 = Y(0.35)
  const b2 = Y(0.7)
  const rubrique = { police: "mono", taille: 24, graisse: 600, interlettrage: 0.16, capitales: true, couleur: "ink" }
  const s02 = {
    gabarit: "fiche-rubriques",
    scene: "S02",
    ecran: 4,
    titre: 0,
    styles: { rubrique },
    illustrations: ill2,
    feuille: { illustration: "feuille", bandes: [b1, b2] },
    traces: { filet: { points: [[r1(feuille.x + 20), r1(b2 - 10)], [r1(feuille.x + feuille.w - 20), r1(b2 - 10)]], epaisseur: 1.2 } },
    textes: {
      geometrie: { ecran: 1, style: "rubrique", x: r1(feuille.x + 24), y: r1(f.y0 + 24), place: "carte", largeurMesuree: 260 },
      attributs: { ecran: 2, style: "rubrique", x: r1(feuille.x + 24), y: r1(b1 + 24), place: "carte", largeurMesuree: 260 },
      systeme: { ecran: 3, style: "rubrique", x: r1(feuille.x + 24), y: r1(b2 + 24), place: "carte", largeurMesuree: 420 },
    },
    etapes: [
      { debut: true, etat: "S02-1", gestes: [{ poser: "objet" }, { poser: "carte" }, { poser: "contour" }] },
      { locution: "Sa géométrie vient", etat: "S02-2", gestes: [{ bande: 1, duree: 0.25 }, { frappe: "geometrie" }] },
      { locution: "Ses attributs la décrivent", etat: "S02-3", gestes: [{ bande: 2, duree: 0.25 }, { frappe: "attributs" }, { deplacement: "contour", vers: [r1(feuille.x + 24), r1(b1 + 80)], duree: 0.3, avec: true }] },
      { locution: "Son système de coordonnées", etat: "S02-FIN", gestes: [{ bande: 3, duree: 0.25 }, { trace: "filet", duree: 0.3, avec: true }, { frappe: "systeme" }, { frappe: "titre" }] },
    ],
    evidences: {
      attributs: { x: r1(feuille.x + 12), y: r1(b1 + 12), largeur: r1(feuille.w - 24), hauteur: r1(b2 - b1 - 24), de: "Ses attributs la décrivent", a: "Son système de coordonnées" },
    },
  }
  return { s01, s02, assets, W, H }
}

/* ── Déroulé ────────────────────────────────────────────────────────────── */

const clone = (o) => JSON.parse(JSON.stringify(o))
let code = 0
let server
try {
  let r = await run(process.execPath, ["scripts/sync.mjs", "--quiet"])
  check(r.code === 0, "sync du contenu d'essai (sans les scènes)", r.out)
  if (r.code !== 0) throw new Error("sync impossible")

  const vite = await import(pathToFileURL(createRequire(join(root, "package.json")).resolve("vite")).href)
  const quiet = { info() {}, warn() {}, warnOnce() {}, error() {}, clearScreen() {}, hasErrorLogged: () => false, hasWarned: false }
  server = await vite.createServer({ root, configFile: join(root, "vite.config.ts"), customLogger: quiet, appType: "custom", server: { middlewareMode: true, hmr: false, watch: null }, optimizeDeps: { noDiscovery: true, include: [] } })
  const sig = await server.ssrLoadModule("/src/engine/signature.ts")
  const face = sig.PAGE.face
  check(face && face.x1 > face.x0 && face.y1 > face.y0, `face de la signature ${signature} : x ${face.x0} à ${face.x1}, y ${face.y0} à ${face.y1}`)
  const { s01, s02, assets } = donnees(face)
  for (const [name, body] of Object.entries(assets)) write(`content/design/assets/${name}.svg`, body)
  write("content/design/scenes/S01.json", `${JSON.stringify(s01, null, 2)}\n`)
  write("content/design/scenes/S02.json", `${JSON.stringify(s02, null, 2)}\n`)
  await server.close()
  server = null

  r = await run(process.execPath, ["scripts/sync.mjs", "--scenes"])
  check(r.code === 0 && /scènes chargées : 2/.test(r.out), "npm run check:scenes : les deux scènes à gabarit se chargent (Frise, FicheRubriques)", r.out)
  r = await run(process.execPath, [join(root, "node_modules", "typescript", "bin", "tsc"), "--noEmit", "-p", root])
  check(r.code === 0, "tsc : scènes, gabarits et données typés", r.out)

  // Fautes, une par une, sur le moteur chargé une seule fois
  server = await vite.createServer({ root, configFile: join(root, "vite.config.ts"), customLogger: quiet, appType: "custom", server: { middlewareMode: true, hmr: false, watch: null }, optimizeDeps: { noDiscovery: true, include: [] } })
  const G = await server.ssrLoadModule("/src/engine/gabarits/index.ts")
  const refus = (label, gab, data, re) => {
    let err = null
    try {
      ;(gab === "frise" ? G.Frise : G.FicheRubriques).scene(data)
    } catch (e) {
      err = e
    }
    check(err?.name === "GabaritError" && re.test(err.message), label, err ? `${err.name} : ${err.message}` : "aucune erreur levée")
  }
  let ok = null
  try {
    G.Frise.scene(clone(s01))
    G.FicheRubriques.scene(clone(s02))
  } catch (e) {
    ok = e
  }
  check(ok === null, "données d'essai acceptées par les contrôles de composition", ok ? `${ok.name} : ${ok.message}` : "")

  let d = clone(s01)
  d.etapes[1].locution = "Le projet démarre"
  refus("locution introuvable : refusée avec son champ", "frise", d, /S01\.json, champ « etapes\[1\]\.locution »/)
  d = clone(s01)
  d.styles.libelle.couleur = "#FF0000"
  refus("couleur écrite en valeur : jeton inconnu du thème", "frise", d, /champ « styles\.libelle\.couleur » : jeton de couleur/)
  d = clone(s01)
  delete d.textes["libelle-1"].largeurMesuree
  refus("texte sans largeur : refusé (la composition ne peut pas le mesurer)", "frise", d, /textes\.libelle-1 » : largeur du texte inconnue/)
  d = clone(s01)
  d.etapes[1].gestes[0].duree = 30
  refus("enchaînement qui déborde sur l'étape suivante : refusé", "frise", d, /l'enchaînement déborde/)
  d = clone(s01)
  d.illustrations.bas.largeur = r1(d.illustrations.bas.largeur * 0.4)
  refus("face non remplie : vide refusé, avec sa place et ses voisins", "frise", d, /la face n'est pas remplie : vide de x [\d,]+ à [\d,]+, y [\d,]+ à [\d,]+ .*éléments qui le bordent : .*À faire : agrandir ou déplacer/)
  d = clone(s01)
  d.textes["libelle-2"].largeurMesuree = 2000
  refus("texte qui sort de la face : refusé, de combien et de quel côté", "frise", d, /textes\.libelle-2 sort de la face .* à droite/)
  d = clone(s01)
  d.evidences["libelle-2"].largeur = 2000
  refus("cadre de mise en évidence hors de la face : refusé", "frise", d, /evidences\.libelle-2 : le cadre de la mise en évidence sort de la face/)
  d = clone(s01)
  d.textes["libelle-1"].y = d.frise.de[1] - 18
  refus("texte posé sur un trait : refusé", "frise", d, /textes\.libelle-1 .* est posé sur le trait (frise|traces\.jalon-1|annees\.cases)/)
  d = clone(s01)
  d.textes["libelle-2"].x = d.textes["libelle-1"].x + 40
  d.evidences["libelle-2"].x = d.textes["libelle-2"].x - 10
  refus("deux textes qui se chevauchent : refusés", "frise", d, /textes\.libelle-1 et textes\.libelle-2 se chevauchent/)
  d = clone(s01)
  d.textes.nom.place = "face"
  refus("texte de la face posé sur une illustration : refusé", "frise", d, /textes\.nom chevauche illustrations\.haut/)
  d = clone(s01)
  d.illustrations.haut.x = r1(d.illustrations.haut.x - 60)
  d.textes.nom.x = r1(d.textes.nom.x - 60)
  refus("deux illustrations qui se chevauchent sans s'emboîter : refusées", "frise", d, /illustrations\.gauche et illustrations\.haut se chevauchent/)
  d = clone(s02)
  // Le filet passe à travers le contour arrivé dans la bande 2, sans y commencer ni y finir
  {
    const [[x0], [x1]] = d.traces.filet.points
    const y = d.feuille.bandes[0] + 120
    d.traces.filet.points = [[x0, y], [x1, y]]
  }
  refus("trait qui traverse une illustration sans y commencer ni y finir : refusé", "fiche-rubriques", d, /traces\.filet traverse illustrations\.contour/)
  await server.close()
  server = null

  if (play) {
    r = await run(process.execPath, [join(root, "node_modules", "vite", "bin", "vite.js"), "build", "--logLevel", "warn"])
    check(r.code === 0 && existsSync(join(root, "dist", "index.html")), "vite build : page d'essai construite", r.out)
    const extra = []
    for (const k of ["--chromium", "--from"]) if (opt(k)) extra.push(k, opt(k))
    r = await run(process.execPath, ["scripts/play-check.mjs", ...extra], { timeout: 900_000 })
    if (r.code === 2) {
      console.log(`  ----  play-check : environnement indisponible (code 2), rendu non vérifié\n        ${r.out.split("\n").slice(-4).join("\n        ")}`)
    } else check(r.code === 0, "play-check : les deux scènes à gabarit se jouent dans un vrai navigateur", r.out)
  }
} catch (e) {
  check(false, `déroulé interrompu : ${e?.message ?? e}`)
} finally {
  await server?.close()
  if (keep) console.log(`[gabarits] projet d'essai gardé : ${root}`)
  else rmSync(root, { recursive: true, force: true })
}
console.log(`[gabarits] ${passed} contrôle(s) réussi(s), ${failed} échec(s)`)
code = failed === 0 ? 0 : 1
process.exit(code)
