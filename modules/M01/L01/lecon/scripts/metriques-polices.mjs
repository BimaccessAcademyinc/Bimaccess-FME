#!/usr/bin/env node
/**
 * Métriques des polices de la leçon, pour les contrôles de composition des
 * gabarits (src/engine/gabarits/plan.ts) : avance de chaque caractère, lue
 * dans les fichiers WOFF des paquets @fontsource embarqués par sync.mjs
 * (sous-ensembles latin et latin-ext), en millièmes de corps.
 *
 * Écrit src/engine/gabarits/metriques.json (fichier dérivé, à relancer si une
 * police ou une graisse change) :
 *
 *   { "serif": { "400": { "normal": { "défaut": 512, "a": 489, … }, "italic": … }, "600": … },
 *     "capitales": { "500": …, "600": … } }
 *
 * Clés de famille : celles de THEME.fonts (content/design/theme.json).
 * L'approche ignore le crénage (GPOS) : quelques px sur une ligne, vérifiés
 * contre la mesure du navigateur (docs/gabarits.md, § contrôles).
 *
 * Usage : node scripts/metriques-polices.mjs
 */
import { readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"
import { inflateSync } from "node:zlib"

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..")
const POLICES = {
  serif: { pkg: "source-serif-4", faces: [[400, "normal"], [400, "italic"], [600, "normal"], [600, "italic"]] },
  capitales: { pkg: "barlow-condensed", faces: [[500, "normal"], [600, "normal"]] },
}

/** Tables d'un fichier WOFF 1.0 (zlib par table). */
function tables(buf) {
  if (buf.toString("latin1", 0, 4) !== "wOFF") throw new Error("pas un fichier WOFF 1.0")
  const n = buf.readUInt16BE(12)
  const t = {}
  for (let i = 0; i < n; i++) {
    const o = 44 + i * 20
    const tag = buf.toString("latin1", o, o + 4)
    const off = buf.readUInt32BE(o + 4)
    const comp = buf.readUInt32BE(o + 8)
    const orig = buf.readUInt32BE(o + 12)
    const raw = buf.subarray(off, off + comp)
    t[tag] = comp < orig ? inflateSync(raw) : raw
  }
  return t
}

/** Code → glyphe (cmap format 4, plateforme Unicode BMP). */
function cmap(b) {
  const n = b.readUInt16BE(2)
  for (let i = 0; i < n; i++) {
    const pid = b.readUInt16BE(4 + i * 8)
    const eid = b.readUInt16BE(6 + i * 8)
    const off = b.readUInt32BE(8 + i * 8)
    if (b.readUInt16BE(off) !== 4 || !((pid === 3 && eid === 1) || pid === 0)) continue
    const segX2 = b.readUInt16BE(off + 6)
    const ends = off + 14
    const starts = ends + segX2 + 2
    const deltas = starts + segX2
    const ranges = deltas + segX2
    const m = new Map()
    for (let s = 0; s < segX2 / 2; s++) {
      const end = b.readUInt16BE(ends + 2 * s)
      const start = b.readUInt16BE(starts + 2 * s)
      const delta = b.readInt16BE(deltas + 2 * s)
      const ro = b.readUInt16BE(ranges + 2 * s)
      for (let c = start; c <= end && c !== 0xffff; c++) {
        let g
        if (ro === 0) g = (c + delta) & 0xffff
        else {
          g = b.readUInt16BE(ranges + 2 * s + ro + 2 * (c - start))
          if (g !== 0) g = (g + delta) & 0xffff
        }
        if (g !== 0) m.set(c, g)
      }
    }
    return m
  }
  throw new Error("aucune table cmap de format 4")
}

function avances(fichier) {
  const t = tables(readFileSync(fichier))
  const upem = t.head.readUInt16BE(18)
  const nMetrics = t.hhea.readUInt16BE(34)
  const adv = (g) => t.hmtx.readUInt16BE(4 * Math.min(g, nMetrics - 1))
  const res = new Map()
  for (const [c, g] of cmap(t.cmap)) res.set(c, Math.round((adv(g) * 1000) / upem))
  return res
}

const out = {}
for (const [cle, p] of Object.entries(POLICES)) {
  out[cle] = {}
  for (const [w, style] of p.faces) {
    const m = new Map()
    for (const sub of ["latin-ext", "latin"]) {
      for (const [c, a] of avances(join(ROOT, "node_modules/@fontsource", p.pkg, "files", `${p.pkg}-${sub}-${w}-${style}.woff`))) m.set(c, a)
    }
    // Caractères imprimables utiles au français et au latin étendu
    const table = {}
    const lettres = []
    for (const [c, a] of [...m].sort((x, y) => x[0] - y[0])) {
      if (c < 0x20 || c > 0x24ff) continue
      table[String.fromCodePoint(c)] = a
      if ((c >= 0x61 && c <= 0x7a) || (c >= 0x41 && c <= 0x5a)) lettres.push(a)
    }
    const defaut = Math.round(lettres.reduce((s, a) => s + a, 0) / lettres.length)
    ;((out[cle][w] ??= {})[style] = { "défaut": defaut, ...table })
  }
}
const dest = join(ROOT, "src/engine/gabarits/metriques.json")
writeFileSync(dest, `${JSON.stringify(out)}\n`)
console.log(`[metriques] ${dest} : ${Object.entries(out).map(([k, v]) => `${k} (${Object.entries(v).map(([w, s]) => `${w} ${Object.keys(s).join("/")}`).join(", ")})`).join(" ; ")}`)
