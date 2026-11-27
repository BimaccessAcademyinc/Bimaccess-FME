#!/usr/bin/env node
// Serveur du lecteur de relecture FME001 : fichiers de reader/public, sans dépendance.
// Mot de passe comme le lecteur de relecture de CER001 : ACCESS_PASSWORD (sans elle, pas
// de mot de passe) et ACCESS_USER (facultative ; sans elle, tout identifiant est accepté).
// La sonde /api/health reste ouverte et ne renvoie que « ok ».
import { createReadStream, existsSync, statSync } from "node:fs"
import { createServer } from "node:http"
import { timingSafeEqual } from "node:crypto"
import { dirname, extname, join, normalize, resolve, sep } from "node:path"
import { fileURLToPath } from "node:url"

const PUBLIC = resolve(dirname(fileURLToPath(import.meta.url)), "public")
const PORT = Number(process.env.PORT ?? 3000)
const MDP = process.env.ACCESS_PASSWORD ?? ""
const UTILISATEUR = process.env.ACCESS_USER ?? ""
const TYPES = {
  ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg",
  ".mp3": "audio/mpeg", ".woff2": "font/woff2", ".woff": "font/woff", ".ico": "image/x-icon", ".txt": "text/plain; charset=utf-8",
}

function egal(a, b) {
  const x = Buffer.from(a), y = Buffer.from(b)
  return x.length === y.length && timingSafeEqual(x, y)
}

function autorise(req) {
  if (!MDP) return true
  const h = req.headers.authorization ?? ""
  if (!h.startsWith("Basic ")) return false
  const [u, ...reste] = Buffer.from(h.slice(6), "base64").toString("utf8").split(":")
  const p = reste.join(":")
  return egal(p, MDP) && (!UTILISATEUR || egal(u, UTILISATEUR))
}

createServer((req, res) => {
  res.setHeader("X-Robots-Tag", "noindex, nofollow")
  const url = new URL(req.url ?? "/", "http://x")
  if (url.pathname === "/api/health") {
    res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" })
    return res.end("ok")
  }
  if (!autorise(req)) {
    res.writeHead(401, { "WWW-Authenticate": 'Basic realm="FME001", charset="UTF-8"', "Content-Type": "text/plain; charset=utf-8" })
    return res.end("Identifiant et mot de passe demandés.")
  }
  let chemin
  try {
    chemin = decodeURIComponent(url.pathname)
  } catch {
    res.writeHead(400)
    return res.end()
  }
  let fichier = normalize(join(PUBLIC, chemin))
  if (fichier !== PUBLIC && !fichier.startsWith(PUBLIC + sep)) {
    res.writeHead(403)
    return res.end()
  }
  if (existsSync(fichier) && statSync(fichier).isDirectory()) {
    if (!url.pathname.endsWith("/")) {
      res.writeHead(301, { Location: `${url.pathname}/${url.search}` })
      return res.end()
    }
    fichier = join(fichier, "index.html")
  }
  if (!existsSync(fichier) || !statSync(fichier).isFile()) {
    res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" })
    return res.end("Introuvable.")
  }
  res.writeHead(200, { "Content-Type": TYPES[extname(fichier).toLowerCase()] ?? "application/octet-stream", "Cache-Control": "no-cache" })
  createReadStream(fichier).pipe(res)
}).listen(PORT, "0.0.0.0", () => console.log(`[reader] http://0.0.0.0:${PORT} (mot de passe ${MDP ? "actif" : "inactif"})`))
