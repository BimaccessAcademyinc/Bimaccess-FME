#!/usr/bin/env node
// Planche du canevas de design → fichier de données du gabarit (content/design/scenes/Sxx.json).
//
//   node planche_vers_donnees.mjs --planche <…/project/S02.dc.html> --partition <…/project/S02-partition.dc.html> \
//     --projet <dossier de la leçon> [--sortie content/design/scenes/S02.json] [--apercu planche.png] [--sans-reperes]
//
// Les deux fichiers viennent du canevas publié (outil Artifact, action read avec `paths`). La planche est
// rendue dans Chromium avec les polices de la leçon (@fontsource) et les illustrations du projet : positions,
// tailles, largeurs de texte et nombre de lignes sont mesurés, jamais estimés. Notation : ../canevas/notation.md.
//
// Refus (code 1, rien n'est écrit) : élément sans repère ou repère illisible, étape absente de la partition,
// locution qui n'est pas dite mot pour mot (ou dite deux fois), texte différent de « ## Écran », texte hors
// de la face, texte sur un trait, texte sur un texte, texte de la face sur une illustration, chevauchement
// d'illustrations, élément dans une zone interdite (sous-titres, zone d'action, marge).
// Les contrôles du gabarit (enchaînements, feuille remplie…) suivent : npm run check:scenes.
import { existsSync, mkdtempSync, readFileSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { createRequire } from "node:module"
import { ACTION, FACE, HABILLAGE, MARGE, SOUS_TITRES, STYLE_REPERES } from "./canevas_commun.mjs"

const require = createRequire(import.meta.url)
const { chromium } = require("playwright")

const argv = process.argv.slice(2)
const opt = (k) => { const i = argv.indexOf(`--${k}`); return i >= 0 ? argv[i + 1] : undefined }
const drapeau = (k) => argv.includes(`--${k}`)
const planchePath = opt("planche"), partitionPath = opt("partition"), projet = resolve(opt("projet") ?? ".")
if (!planchePath || !partitionPath) { console.error("usage : --planche <Sxx.dc.html> --partition <Sxx-partition.dc.html> --projet <leçon>"); process.exit(2) }

const erreurs = []
const err = (m) => erreurs.push(m)
const r1 = (v) => Math.round(v * 10) / 10

// ---------- projet : narration, textes d'Écran, jetons, illustrations ----------
const lireTs = (f, debut, fin) => {
  const s = readFileSync(join(projet, "src/generated", f), "utf8")
  const a = s.indexOf("= {", s.indexOf(debut)) + 2
  const b = fin ? s.indexOf(fin, a) : s.length
  return JSON.parse(s.slice(a, b).trim().replace(/;$/, ""))
}
if (!existsSync(join(projet, "src/generated/texts.ts"))) { console.error(`${projet} : lancer d'abord npm run sync`); process.exit(2) }
const TEXTS = lireTs("texts.ts", "export const TEXTS", "\nexport const EXERCISES")
const CLIPS = lireTs("narration.ts", "export const CLIPS", "\nexport ")
const theme = JSON.parse(readFileSync(join(projet, "content/design/theme.json"), "utf8"))
const jetonDe = new Map(Object.entries(theme.colors).map(([k, v]) => [v.toUpperCase(), k]))
const assets = join(projet, "content/design/assets")
const fonts = join(projet, "node_modules/@fontsource")

// ---------- rendu de la planche ----------
const corps = (html) => {
  const a = html.indexOf("<x-dc>"), b = html.lastIndexOf("</x-dc>")
  if (a < 0 || b < 0) throw new Error("pas de <x-dc> : ce n'est pas une planche du canevas")
  return html.slice(a + 6, b).replace(/<helmet>[\s\S]*?<\/helmet>/, "").replace(/<\/?sc-if[^>]*>/g, "")
}
const fontFace = [
  ["Source Serif 4", "normal", 400, "source-serif-4/files/source-serif-4-latin-400-normal.woff2"],
  ["Source Serif 4", "normal", 600, "source-serif-4/files/source-serif-4-latin-600-normal.woff2"],
  ["Source Serif 4", "italic", 400, "source-serif-4/files/source-serif-4-latin-400-italic.woff2"],
  ["Source Serif 4", "italic", 600, "source-serif-4/files/source-serif-4-latin-600-italic.woff2"],
  ["Barlow Condensed", "normal", 500, "barlow-condensed/files/barlow-condensed-latin-500-normal.woff2"],
  ["Barlow Condensed", "normal", 600, "barlow-condensed/files/barlow-condensed-latin-600-normal.woff2"],
].map(([f, s, w, p]) => `@font-face{font-family:'${f}';font-style:${s};font-weight:${w};src:url('${pathToFileURL(join(fonts, p))}') format('woff2')}`).join("\n")

const tmp = mkdtempSync(join(tmpdir(), "planche-"))
const htmlPlanche = corps(readFileSync(planchePath, "utf8")).replace(/\{\{\s*reperes\s*\}\}/g, drapeau("sans-reperes") ? "non" : "oui")
writeFileSync(join(tmp, "planche.html"), `<!doctype html><html><head><meta charset="utf-8"><style>${fontFace}\nbody{margin:0}\n${STYLE_REPERES}</style></head><body>${htmlPlanche}</body></html>`)
writeFileSync(join(tmp, "partition.html"), `<!doctype html><html><head><meta charset="utf-8"></head><body>${corps(readFileSync(partitionPath, "utf8"))}</body></html>`)

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } })
await page.goto(pathToFileURL(join(tmp, "planche.html")).href)
const ASSETS_URL = pathToFileURL(assets + "/").href
await page.evaluate(async (base) => {
  const imgs = [...document.querySelectorAll("[data-fichier] > img")]
  for (const img of imgs) img.src = base + img.parentElement.dataset.fichier + ".svg"
  await Promise.all(imgs.map((i) => (i.complete && i.naturalWidth ? null : new Promise((r) => { i.onload = r; i.onerror = r }))))
  await document.fonts.ready
}, ASSETS_URL)

const lu = await page.evaluate(() => {
  const root = document.querySelector("[data-planche]")
  const R = root.getBoundingClientRect()
  const boite = (r) => ({ x: r.left - R.left, y: r.top - R.top, w: r.width, h: r.height })
  const out = []
  for (const el of root.querySelectorAll("[data-g]")) {
    const badge = el.querySelector(":scope > [data-repere]")
    const clone = el.cloneNode(true)
    clone.querySelectorAll("[data-repere], [data-g]").forEach((n) => n.remove())
    const parent = el.parentElement.closest("[data-g]")
    const o = { g: el.dataset.g, d: { ...el.dataset }, box: boite(el.getBoundingClientRect()), repere: badge ? badge.textContent.trim() : null,
      parent: parent ? parent.dataset.id ?? null : null, parentG: parent ? parent.dataset.g : null, styleWidth: el.style.width || null }
    if (["texte", "titre", "source"].includes(o.g)) {
      const cs = getComputedStyle(el)
      o.texte = clone.textContent.replace(/\s+/g, " ").trim()
      o.css = { famille: cs.fontFamily, taille: parseFloat(cs.fontSize), graisse: parseInt(cs.fontWeight, 10), interligne: cs.lineHeight,
        interlettrage: cs.letterSpacing, transform: cs.textTransform, italique: cs.fontStyle === "italic", couleur: cs.color, align: cs.textAlign }
      const range = document.createRange()
      const noeuds = [...el.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim())
      if (noeuds.length) {
        range.setStart(noeuds[0], 0); range.setEnd(noeuds[noeuds.length - 1], noeuds[noeuds.length - 1].textContent.length)
        o.encre = boite(range.getBoundingClientRect())
        o.lignes = new Set([...range.getClientRects()].map((r) => Math.round(r.top))).size
      }
    }
    if (o.g === "cases") {
      const c = el.querySelector(":scope > [data-g='claire']")
      o.claire = c ? boite(c.getBoundingClientRect()) : null
    }
    if (o.g === "illustration") {
      const img = el.querySelector(":scope > img")
      o.naturel = img ? { w: img.naturalWidth, h: img.naturalHeight } : null
    }
    out.push(o)
  }
  return out
})
if (opt("apercu")) {
  await page.locator("[data-planche]").screenshot({ path: opt("apercu") })
}
await page.goto(pathToFileURL(join(tmp, "partition.html")).href)
const etapesLues = await page.evaluate(() => [...document.querySelectorAll("[data-etape]")].map((e) => ({
  n: e.dataset.etape, etat: e.querySelector("[data-champ='etat']")?.textContent.trim() ?? "", locution: e.querySelector("[data-champ='locution']")?.textContent.replace(/\s+/g, " ").trim() ?? "" })))
await browser.close()

const planche = readFileSync(planchePath, "utf8")
const scene = /data-scene="(S\d+)"/.exec(planche)?.[1]
const gabarit = /data-gabarit="([a-z-]+)"/.exec(planche)?.[1]
if (!scene || !gabarit) { console.error("planche : data-scene ou data-gabarit manquant sur [data-planche]"); process.exit(1) }
const ecran = TEXTS[scene]?.screen
if (!ecran) { console.error(`${scene} absente de src/generated/texts.ts`); process.exit(1) }
const clip = CLIPS[`${scene}-01`]
const ou = (o) => `« ${o.d.id ?? o.g} »`

// ---------- partition ----------
const norm = (s) => s.replace(/[’‘]/g, "'").replace(/\s+/g, " ").trim()
const motsClip = norm(clip.text).replace(/\n/g, " ")
const etapes = new Map()
for (const e of etapesLues) {
  if (!/^\d+$/.test(e.n)) { err(`partition : numéro d'étape « ${e.n} » : un entier`); continue }
  if (etapes.has(+e.n)) err(`partition : étape ${e.n} écrite deux fois`)
  const debut = +e.n === 1
  if (!debut) {
    const loc = norm(e.locution)
    const n = motsClip.split(loc).length - 1
    if (!loc) err(`partition, étape ${e.n} : locution vide`)
    else if (n === 0) err(`partition, étape ${e.n} : « ${loc} » n'est pas dite mot pour mot dans ${scene}-01. À faire : la recopier de la narration`)
    else if (n > 1) err(`partition, étape ${e.n} : « ${loc} » est dite ${n} fois dans ${scene}-01. À faire : l'allonger`)
  }
  etapes.set(+e.n, { n: +e.n, debut, etat: e.etat || null, locution: debut ? null : norm(e.locution), gestes: [] })
}
if (!etapes.has(1)) err("partition : pas d'étape 1 (début, image 0)")

// ---------- repères : « 3.2 trace 0,25 avec | 6.1 deplacement 0,3 » ----------
const SENS = new Set(["droite", "gauche", "bas", "haut"])
function lireRepere(o) {
  if (!o.repere) return []
  const gestes = []
  for (const morceau of o.repere.split("|").map((x) => x.trim()).filter(Boolean)) {
    const m = /^(\d+)\.(\d+)\s+(\S+)(.*)$/.exec(morceau)
    if (!m) {
      if (/^dans\s+\S+$/.test(morceau)) { o.dans = morceau.split(/\s+/)[1]; continue }
      if (/^(évidence|evidence)\b/.test(morceau)) { o.evid = morceau; continue }
      err(`repère de ${ou(o)} illisible : « ${morceau} ». À faire : « 3.2 trace 0,25 », « 1.1 poser », « dans saif » (notation.md)`); continue
    }
    const [, etape, rang, verbe, reste] = m
    const mots = reste.trim().split(/\s+/).filter(Boolean)
    const avec = mots.includes("avec")
    const nombres = mots.filter((w) => /^\d+([.,]\d+)?s?$/.test(w)).map((w) => parseFloat(w.replace(",", ".").replace(/s$/, "")))
    const sens = mots.find((w) => SENS.has(w)) ?? null
    gestes.push({ etape: +etape, rang: +rang, verbe, avec, nombres, sens, src: morceau })
  }
  return gestes
}

// ---------- éléments ----------
const json = { gabarit, scene, ecran: ecran.length, habillage: HABILLAGE, styles: {}, illustrations: {}, textes: {}, traces: {} }
const gestesTous = []
const ids = new Set()
const illus = new Map()
const boites = []   // pour les contrôles de chevauchement : { id, type, box, parent }
const arrivees = new Map()
const evidences = []
const textesPoses = new Map()

const style = (o) => {
  const c = o.css
  const police = /Barlow/.test(c.famille) ? "capitales" : /Source Serif/.test(c.famille) ? "serif" : null
  if (!police) err(`${ou(o)} : police « ${c.famille} » hors charte (Source Serif 4 ou Barlow Condensed)`)
  const [r, g, b] = c.couleur.match(/\d+/g).map(Number)
  const hex = "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("").toUpperCase()
  const couleur = jetonDe.get(hex)
  if (!couleur) err(`${ou(o)} : couleur ${hex} hors des jetons du thème`)
  const s = { police, taille: r1(c.taille) }
  if (c.graisse !== 400) s.graisse = c.graisse
  const il = c.interligne === "normal" ? 1.2 : Math.round((parseFloat(c.interligne) / c.taille) * 100) / 100
  if (il !== 1.2) s.interligne = il
  const ls = c.interlettrage === "normal" ? 0 : Math.round((parseFloat(c.interlettrage) / c.taille) * 100) / 100
  if (ls) s.interlettrage = ls
  if (c.transform === "uppercase") s.capitales = true
  if (c.italique) s.italique = true
  s.couleur = couleur
  if (c.taille < 23) err(`${ou(o)} : texte de ${c.taille} px (23 px au moins)`)
  return s
}

for (const o of lu) {
  const id = o.d.id
  if (["illustration", "texte", "trait", "pointe", "cases", "evidence"].includes(o.g)) {
    if (!id) { err(`élément ${o.g} sans data-id`); continue }
    const cle = o.g === "evidence" ? "evidence:" + id : id
    if (ids.has(cle)) err(`identifiant « ${id} » employé deux fois${o.g === "evidence" ? " (mises en évidence)" : ""}`)
    ids.add(cle)
  }
  const b = o.box
  const gestes = o.g === "arrivee" ? [] : lireRepere(o)
  for (const g of gestes) gestesTous.push({ ...g, cible: o.g === "titre" ? "titre" : id, o })

  switch (o.g) {
    case "illustration": {
      const fichier = o.d.fichier
      if (!fichier || !existsSync(join(assets, fichier + ".svg"))) err(`${ou(o)} : illustration « ${fichier} » absente de content/design/assets/`)
      const it = { fichier, x: r1(b.x), y: r1(b.y), largeur: r1(b.w) }
      if (o.d.aplat) it.aplat = o.d.aplat
      if (o.d.decoupe) it.decoupe = o.d.decoupe
      json.illustrations[id] = it
      illus.set(id, { ...o, it })
      boites.push({ id, type: "illustration", box: b, parent: o.parent, sur: o.d.sur ?? null })
      if (o.d.bandes) {
        const fr = o.d.bandes.split(/[ ,;]+/).filter(Boolean).map(Number)
        json.feuille = { illustration: id, bandes: fr.map((f) => r1(b.y + f * b.h)) }
      }
      if (!gestes.length && !o.repere) err(`${ou(o)} : aucun repère (étape et geste). À faire : « 1.1 poser » ou « 2.2 balayage bas 0,3 »`)
      break
    }
    case "texte": case "titre": case "source": {
      const i = Number(o.d.ecran)
      if (!Number.isInteger(i) || i < 0 || i >= ecran.length) { err(`${ou(o)} : data-ecran « ${o.d.ecran} » hors de « ## Écran » (0 à ${ecran.length - 1})`); break }
      if (textesPoses.has(i)) err(`texte d'Écran ${i} posé deux fois (${textesPoses.get(i)} et ${id ?? o.g})`)
      textesPoses.set(i, id ?? o.g)
      if (norm(o.texte ?? "") !== norm(ecran[i])) err(`${ou(o)} : le texte « ${o.texte} » n'est pas le texte d'Écran ${i} « ${ecran[i]} ». À faire : recopier le storyboard, ou corriger data-ecran`)
      if (o.g === "titre") { json.titre = i; if (!gestes.length) err("titre : aucun repère (« 6.1 frappe »)"); break }
      if (o.g === "source") { json.source = i; break }
      const nomStyle = o.d.style ?? id
      const s = style(o)
      if (json.styles[nomStyle] && JSON.stringify(json.styles[nomStyle]) !== JSON.stringify(s))
        err(`style « ${nomStyle} » : ${ou(o)} n'a pas le même style que les autres textes de ce nom. À faire : même police, taille, couleur, ou un autre data-style`)
      json.styles[nomStyle] = s
      const centre = o.d.ancre === "centre" || o.css.align === "center"
      const t = { ecran: i, style: nomStyle }
      if (centre) t.cx = r1(b.x + b.w / 2 - (s.interlettrage ? (s.interlettrage * s.taille) / 2 : 0))
      else t.x = r1(b.x)
      t.y = r1(b.y)
      if (!centre && o.styleWidth) { t.largeur = r1(b.w); if (o.lignes > 1) t.lignes = o.lignes }
      if (centre && o.lignes > 1) err(`${ou(o)} : texte centré sur ${o.lignes} lignes ; un texte centré tient sur une ligne`)
      if (o.parentG === "illustration") t.place = "carte"
      if (o.d.reserve) t.reserve = o.d.reserve
      if (o.dans) { t.dans = o.dans; if (o.dans !== o.parent) err(`${ou(o)} : « dans ${o.dans} » mais le texte n'est pas posé dans cette illustration`) }
      if (o.d.langue) t.langue = o.d.langue
      if (o.encre && !t.largeur) t.largeurMesuree = r1(o.encre.w)
      json.textes[id] = t
      boites.push({ id, type: "texte", box: o.encre ?? b, parent: o.parent, place: t.place ?? "face" })
      if (!gestes.length && !o.dans) err(`${ou(o)} : aucun repère (« 3.2 frappe »), ni « dans <illustration> »`)
      break
    }
    case "trait": {
      const horiz = b.w >= b.h
      const sens = o.d.sens ?? (horiz ? "droite" : "bas")
      const m = horiz ? r1(b.y + b.h / 2) : r1(b.x + b.w / 2)
      const ep = r1(horiz ? b.h : b.w)
      let pts
      if (horiz) pts = sens === "gauche" ? [[r1(b.x + b.w), m], [r1(b.x), m]] : [[r1(b.x), m], [r1(b.x + b.w), m]]
      else pts = sens === "haut" ? [[m, r1(b.y + b.h)], [m, r1(b.y)]] : [[m, r1(b.y)], [m, r1(b.y + b.h)]]
      const t = { points: pts }
      if (o.d.couches === "ecriture" || o.d.couches === "lecture") {
        const [a, c, e] = o.d.couches === "ecriture" ? [ep, 8, 4] : [ep, 10, 5]
        t.couches = [{ couleur: "encre", epaisseur: a }, { couleur: "chaussee", epaisseur: c }, { couleur: o.d.couches, epaisseur: e }]
      } else {
        if (o.d.couleur && o.d.couleur !== "encre") t.couleur = o.d.couleur
        t.epaisseur = ep
      }
      json.traces[id] = t
      boites.push({ id, type: "trait", box: b })
      if (!gestes.length) err(`${ou(o)} : aucun repère (« 3.1 trace 0,25 »)`)
      break
    }
    case "pointe": {
      const sens = o.d.sens ?? "droite"
      const [l, t0, r, bo] = [r1(b.x), r1(b.y), r1(b.x + b.w), r1(b.y + b.h)], my = r1(b.y + b.h / 2), mx = r1(b.x + b.w / 2)
      const d = { droite: `M${l} ${t0} L${r} ${my} L${l} ${bo} Z`, gauche: `M${r} ${t0} L${l} ${my} L${r} ${bo} Z`,
        bas: `M${l} ${t0} L${mx} ${bo} L${r} ${t0} Z`, haut: `M${l} ${bo} L${mx} ${t0} L${r} ${bo} Z` }[sens]
      json.traces[id] = { d, epaisseur: Number(o.d.epaisseur ?? 2), remplissage: o.d.remplissage ?? "ecriture" }
      boites.push({ id, type: "trait", box: b })
      if (!gestes.length) err(`${ou(o)} : aucun repère (« 5.5 trace 0,1 »)`)
      break
    }
    case "frise": {
      const ep = Number(o.d.epaisseur ?? 3), m = r1(b.y + b.h / 2), xa = r1(b.x + b.w - b.h)
      json.frise = { de: [r1(b.x), m], a: [xa, m], epaisseur: ep, pointe: [[xa, r1(b.y)], [r1(b.x + b.w), m], [xa, r1(b.y + b.h)]] }
      boites.push({ id: "frise", type: "trait", box: { x: b.x, y: b.y, w: b.w, h: b.h } })
      break
    }
    case "cases": {
      const m = r1(b.y + b.h / 2), c = o.claire
      if (!c) { err(`${ou(o)} : pas de case claire ([data-g="claire"] dans les cases)`); break }
      json.annees = { ...(json.annees ?? {}), [id]: { de: [r1(b.x), m], a: [r1(b.x + b.w), m], epaisseur: r1(b.h),
        claire: { de: [r1(c.x), m], a: [r1(c.x + c.w), m], epaisseur: r1(c.h) } } }
      boites.push({ id, type: "trait", box: b })
      if (!gestes.length) err(`${ou(o)} : aucun repère (« 8.2 trace 0,45 »)`)
      break
    }
    case "arrivee": {
      if (!o.d.de) err("arrivée sans data-de (l'illustration qui s'y déplace)")
      arrivees.set(o.d.de, b)
      break
    }
    case "evidence": {
      evidences.push(o)
      if (!o.evid) err(`${ou(o)} : repère « évidence 7 → 8 » (étape qui l'allume → étape qui l'éteint, ou « fin ») manquant`)
      break
    }
    case "claire": break
    default: err(`data-g « ${o.g} » inconnu (notation.md)`)
  }
}

// ---------- gestes → étapes ----------
gestesTous.sort((a, b) => a.etape - b.etape || a.rang - b.rang)
const vus = new Set()
for (const g of gestesTous) {
  const e = etapes.get(g.etape)
  if (!e) { err(`repère « ${g.src} » de ${ou(g.o)} : étape ${g.etape} absente de la partition`); continue }
  const cle = `${g.etape}.${g.rang}`
  if (vus.has(cle)) err(`deux gestes au rang ${cle} (dont ${ou(g.o)}). À faire : renuméroter`)
  vus.add(cle)
  const duree = g.nombres[0]
  let geste
  switch (g.verbe) {
    case "poser": geste = { poser: g.cible }; break
    case "balayage":
      if (!g.sens) err(`« ${g.src} » (${ou(g.o)}) : sens du balayage manquant (droite, gauche, bas, haut)`)
      geste = { balayage: g.cible, sens: g.sens, duree }; break
    case "frappe": geste = { frappe: g.cible }; break
    case "trace": geste = { trace: g.cible }; if (duree !== undefined) geste.duree = duree; break
    case "deplacement": {
      const a = arrivees.get(g.cible)
      if (!a) err(`« ${g.src} » (${ou(g.o)}) : pas d'arrivée posée ([data-g="arrivee"][data-de="${g.cible}"])`)
      geste = { deplacement: g.cible, vers: a ? [r1(a.x), r1(a.y)] : [0, 0], duree }; break
    }
    case "bande": geste = { bande: g.nombres[0], duree: g.nombres[1] }; break
    default: err(`« ${g.src} » (${ou(g.o)}) : geste « ${g.verbe} » inconnu (poser, balayage, frappe, trace, deplacement, bande)`); continue
  }
  if (["balayage", "deplacement", "bande"].includes(g.verbe) && geste.duree === undefined) err(`« ${g.src} » (${ou(g.o)}) : durée manquante`)
  if (g.avec) geste.avec = true
  e.gestes.push(geste)
}
json.etapes = [...etapes.values()].sort((a, b) => a.n - b.n).map((e) => {
  const o = e.debut ? { debut: true } : { locution: e.locution }
  if (e.etat) o.etat = e.etat
  if (e.gestes.length) o.gestes = e.gestes
  return o
})

// ---------- mises en évidence ----------
const locDe = (n, o) => {
  if (n === "fin") return null
  const e = etapes.get(Number(n))
  if (!e || e.debut) { err(`${ou(o)} : étape « ${n} » absente de la partition (ou étape 1)`); return "?" }
  return e.locution
}
if (evidences.length) json.evidences = {}
for (const o of evidences) {
  const m = /(?:é|e)vidence\s+(\d+)\s*(?:→|->)\s*(\d+|fin)/.exec(o.evid ?? "")
  if (!m) { if (o.evid) err(`${ou(o)} : « ${o.evid} » illisible (« évidence 7 → 8 »)`); continue }
  const b = o.box, ev = { x: r1(b.x), y: r1(b.y), largeur: r1(b.w), hauteur: r1(b.h), de: locDe(m[1], o) }
  const a = locDe(m[2], o)
  if (a) ev.a = a
  if (o.d.forme === "cercle") ev.forme = "cercle"
  json.evidences[o.d.id] = ev
}

// ---------- contrôles de la planche ----------
for (let i = 0; i < ecran.length; i++) if (!textesPoses.has(i)) err(`texte d'Écran ${i} « ${ecran[i]} » posé nulle part`)
const inter = (a, b, marge = 0) => a.x < b.x + b.w - marge && b.x < a.x + a.w - marge && a.y < b.y + b.h - marge && b.y < a.y + a.h - marge
const dedans = (b, z) => b.x < z.x1 && b.x + b.w > z.x0 && b.y < z.y1 && b.y + b.h > z.y0
const fmt = (b) => `x ${Math.round(b.x)} à ${Math.round(b.x + b.w)}, y ${Math.round(b.y)} à ${Math.round(b.y + b.h)}`
const ancetres = (id) => { const s = new Set(); let p = boites.find((x) => x.id === id)?.parent; while (p) { s.add(p); p = boites.find((x) => x.id === p)?.parent } return s }
for (const x of boites) {
  const b = x.box
  if (dedans(b, SOUS_TITRES)) err(`« ${x.id} » (${fmt(b)}) est sous les sous-titres (y 880 et plus, x < 1300)`)
  if (dedans(b, ACTION)) err(`« ${x.id} » (${fmt(b)}) est dans la zone d'action`)
  const horsFace = b.x < FACE.x0 - 0.5 || b.y < FACE.y0 - 0.5 || b.y + b.h > FACE.y1 + 0.5 ||
    (b.x + b.w > FACE.x1 + 0.5 && !(b.x + b.w <= FACE.debordX + 0.5 && b.y >= FACE.debordY0 && b.y + b.h <= FACE.debordY1))
  if (horsFace) err(`« ${x.id} » (${fmt(b)}) sort de la face (x 104 à 1424, y 180 à 860 ; jusqu'à x 1500 entre y 360 et 690)`)
}
for (const t of boites.filter((x) => x.type === "texte")) {
  for (const tr of boites.filter((x) => x.type === "trait")) if (inter(t.box, tr.box)) err(`texte « ${t.id} » (${fmt(t.box)}) sur le trait « ${tr.id} » (${fmt(tr.box)})`)
  for (const u of boites.filter((x) => x.type === "texte" && x.id > t.id)) if (inter(t.box, u.box)) err(`texte « ${t.id} » sur le texte « ${u.id} »`)
  if (t.place === "face") for (const il of boites.filter((x) => x.type === "illustration")) if (inter(t.box, il.box, 1)) err(`texte de la face « ${t.id} » (${fmt(t.box)}) sur l'illustration « ${il.id} » (${fmt(il.box)}). À faire : le déplacer, ou le poser dans l'illustration (élément enfant)`)
  if (t.place === "carte") {
    const p = boites.find((x) => x.id === t.parent)
    if (p && !(t.box.x >= p.box.x - 0.5 && t.box.y >= p.box.y - 0.5 && t.box.x + t.box.w <= p.box.x + p.box.w + 0.5 && t.box.y + t.box.h <= p.box.y + p.box.h + 0.5))
      err(`texte « ${t.id} » (${fmt(t.box)}) déborde de son illustration « ${t.parent} » (${fmt(p.box)})`)
  }
}
const ills = boites.filter((x) => x.type === "illustration")
for (let i = 0; i < ills.length; i++) for (let j = i + 1; j < ills.length; j++) {
  const [a, c] = [ills[i], ills[j]]
  if (ancetres(a.id).has(c.id) || ancetres(c.id).has(a.id) || (a.sur ?? "").split(/\s+/).includes(c.id) || (c.sur ?? "").split(/\s+/).includes(a.id)) continue
  if (inter(a.box, c.box, 1)) err(`illustrations « ${a.id} » (${fmt(a.box)}) et « ${c.id} » (${fmt(c.box)}) se chevauchent. À faire : les écarter, ou data-sur="${c.id}" si l'une se pose sur l'autre`)
}

if (erreurs.length) {
  console.error(`planche ${scene} refusée (${erreurs.length}) :\n` + erreurs.map((e) => "  - " + e).join("\n"))
  process.exit(1)
}
const sortie = opt("sortie") ?? join(projet, "content/design/scenes", `${scene}.json`)
const ordreCles = ["gabarit", "scene", "ecran", "titre", "source", "habillage", "styles", "illustrations", "feuille", "frise", "annees", "traces", "textes", "etapes", "evidences"]
const final = Object.fromEntries(ordreCles.filter((k) => json[k] !== undefined).map((k) => [k, json[k]]))
writeFileSync(sortie, JSON.stringify(final, null, 2) + "\n")
console.log(`planche ${scene} : ${Object.keys(json.illustrations).length} illustrations, ${Object.keys(json.textes).length} textes, ${Object.keys(json.traces).length} tracés, ${json.etapes.length} étapes, ${Object.keys(json.evidences ?? {}).length} mises en évidence → ${sortie}`)
