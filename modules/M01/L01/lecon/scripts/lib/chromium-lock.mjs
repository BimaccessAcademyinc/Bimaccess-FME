/**
 * chromium-lock · un seul Chromium à la fois sur la machine, pour tous les
 * projets et tous les outils (play-check, captures de la QA).
 *
 * Verrou : fichier `studio-chromium.lock` dans le dossier temporaire du
 * système (os.tmpdir()), créé en exclusif, contenant
 * { "pid": 1234, "tool": "play-check", "cwd": "/chemin/du/projet", "since": "ISO" }.
 * Un verrou dont le processus n'existe plus est périmé : il est retiré.
 * Un verrou vivant fait attendre (message une fois, puis vérification toutes
 * les 2 s) jusqu'à `waitS` secondes ; au-delà, ou tout de suite avec
 * `waitS = 0`, acquireChromiumLock renvoie { ok: false, holder }.
 * Le verrou est rendu à la sortie du processus (exit, SIGINT, SIGTERM).
 *
 * Même protocole à suivre par tout autre outil qui lance Chromium :
 *   const lock = await acquireChromiumLock({ tool: "shots", waitS: 600 })
 *   if (!lock.ok) { …message avec lock.holder…; process.exit(2) }
 *   … lancer, utiliser, fermer le navigateur …
 *   lock.release()
 */
import { readFileSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"

export const LOCK_PATH = join(tmpdir(), "studio-chromium.lock")

const alive = (pid) => {
  if (!Number.isInteger(pid) || pid <= 0) return false
  try {
    process.kill(pid, 0)
    return true
  } catch (e) {
    return e?.code === "EPERM"
  }
}

const readHolder = () => {
  try {
    return JSON.parse(readFileSync(LOCK_PATH, "utf8"))
  } catch {
    return null
  }
}

export async function acquireChromiumLock({ tool = "outil", waitS = 600, log = (m) => console.log(m) } = {}) {
  const deadline = Date.now() + Math.max(0, waitS) * 1000
  let told = false
  for (;;) {
    try {
      writeFileSync(LOCK_PATH, JSON.stringify({ pid: process.pid, tool, cwd: process.cwd(), since: new Date().toISOString() }), { flag: "wx" })
      let released = false
      const release = () => {
        if (released) return
        released = true
        if (readHolder()?.pid === process.pid) rmSync(LOCK_PATH, { force: true })
      }
      process.on("exit", release)
      for (const sig of ["SIGINT", "SIGTERM"]) {
        process.once(sig, () => {
          release()
          process.exit(sig === "SIGINT" ? 130 : 143)
        })
      }
      return { ok: true, release }
    } catch (e) {
      if (e?.code !== "EEXIST") throw e
    }
    const holder = readHolder()
    if (!holder || !alive(holder.pid)) {
      // Verrou périmé (processus disparu) ou illisible : retiré, nouvel essai
      if (!holder) {
        // Fichier en cours d'écriture par un autre processus : on lui laisse un instant
        await new Promise((r) => setTimeout(r, 200))
        if (readHolder() === null) rmSync(LOCK_PATH, { force: true })
      } else if (readHolder()?.pid === holder.pid) rmSync(LOCK_PATH, { force: true })
      continue
    }
    if (Date.now() >= deadline) return { ok: false, holder }
    if (!told) {
      log(`[${tool}] un autre Chromium tourne déjà (${holder.tool}, PID ${holder.pid}, ${holder.cwd}, depuis ${holder.since}) : attente de sa fin (au plus ${waitS} s)…`)
      told = true
    }
    await new Promise((r) => setTimeout(r, 2000))
  }
}
