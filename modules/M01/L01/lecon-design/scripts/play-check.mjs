#!/usr/bin/env node
/**
 * play-check · parcourt la page construite dans un vrai navigateur et vérifie
 * le contrat du lecteur. Codes de sortie : 0 tout passe ; 1 au moins un
 * échec (ou page absente : lancer npm run build) ; 2 environnement : aucun
 * Playwright utilisable, ou un autre Chromium occupe encore la machine à la
 * fin de l'attente (rien n'a été vérifié, le contenu n'est pas en cause).
 *
 * Vérifie, sur dist/index.html ouvert en file:// (et sur --url si donnée) :
 *   - écran « Lancer », puis chaque scène : data-stage-ready, position
 *     « 02 / 03 », démarrage seul, Suivant verrouillé puis libre (curseur
 *     amené à la fin), voix réellement jouée si la scène en a une ;
 *   - exercices joués au clavier (premier passage, Tab d'un choix à VALIDER)
 *     et à la souris (second passage, scène ouverte par l'adresse #/n, geste
 *     pendant la narration d'entrée) : VALIDER inactif sans sélection,
 *     sélection modifiable, double-clic sans effet, Suivant et CONTINUER
 *     jamais avant la fin de la narration d'entrée, clip déclenché demandé
 *     une seule fois, jamais noté entendu par une image d'une autre visite
 *     (aller-retour vers la scène la plus longue), jamais rejoué ;
 *   - position rattachée à la visite : scène neuve ouverte juste après la
 *     fin de la scène la plus longue, puis « Recommencer » après la dernière
 *     scène : verrouillée, non terminée, rien d'enregistré comme terminé ;
 *   - rechargement : scène, état et Suivant restaurés, dernière image, pause ;
 *     données conservées contradictoires (geste après le clip) sans erreur ;
 *   - lecture/pause à l'espace, navigation aux flèches ;
 *   - une mise en évidence au plus à la fois ([data-highlight="on"]) : à la
 *     dernière image de chaque scène et après la validation d'un exercice ;
 *   - écran étroit (390 px, vertical) : pas de défilement horizontal,
 *     contrôles visibles, bandeau « tournez l'appareil » ; téléphone à
 *     l'horizontale (844 × 390) : sans en-tête, la scène prend la hauteur ;
 *     fenêtres d'ordinateur basses (960 × 540, 1280 × 520) : en-tête gardé ;
 *   - aucune erreur de console ou de page, aucun appel réseau externe.
 *
 * Usage :
 *   node scripts/play-check.mjs [--url http://localhost:4173/] [--shots <dossier>]
 *        [--html dist/index.html] [--from <dossier où playwright est installé>]
 *        [--chromium <chemin du navigateur>] [--only-url] [--headed]
 *        [--wait-lock <secondes, défaut 600>] [--no-wait]
 *
 * Un seul Chromium à la fois sur la machine : verrou partagé
 * (scripts/lib/chromium-lock.mjs, fichier studio-chromium.lock du dossier
 * temporaire du système, avec le PID). Si un autre outil en tient un, le
 * parcours attend sa fin (--wait-lock secondes ; --no-wait : pas d'attente),
 * puis sort en code 2 s'il est toujours là.
 *
 * Playwright n'est pas une dépendance du projet : il est cherché dans
 * --from, puis dans le projet, puis dans l'installation globale de npm.
 */
import { execSync } from "node:child_process"
import { existsSync, mkdirSync } from "node:fs"
import { createRequire } from "node:module"
import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"
import { acquireChromiumLock } from "./lib/chromium-lock.mjs"

const args = process.argv.slice(2)
if (args.includes("--help") || args.includes("-h")) {
  console.log((await import("node:fs")).readFileSync(new URL(import.meta.url), "utf8").split("*/")[0])
  process.exit(0)
}
const opt = (name) => {
  const i = args.indexOf(name)
  return i >= 0 ? args[i + 1] : undefined
}
const ROOT = resolve(new URL("..", import.meta.url).pathname)
const htmlPath = resolve(opt("--html") ?? join(ROOT, "dist", "index.html"))
const url = opt("--url")
const shots = opt("--shots") ? resolve(opt("--shots")) : null
const onlyUrl = args.includes("--only-url")
const headed = args.includes("--headed")

/* ── Playwright ─────────────────────────────────────────────────────────── */

/**
 * Candidats, dans l'ordre : --from, le projet (et ses dossiers parents), la
 * racine globale de npm. Le premier dont Chromium démarre est retenu : une
 * ancienne copie de Playwright sans navigateur installé ne bloque pas.
 */
function playwrightCandidates() {
  const out = []
  const from = opt("--from")
  if (from) out.push({ where: `--from ${from}`, base: join(resolve(from), "package.json") })
  out.push({ where: "projet", base: join(ROOT, "package.json") })
  try {
    const globalRoot = execSync("npm root -g", { encoding: "utf8", stdio: ["ignore", "pipe", "ignore"] }).trim()
    if (globalRoot) out.push({ where: `npm global (${globalRoot})`, base: join(globalRoot, "_.js") })
  } catch {
    // npm absent du PATH : candidat ignoré
  }
  return out
}

async function launchBrowser() {
  const executablePath = opt("--chromium") ?? process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
  const tried = []
  for (const c of playwrightCandidates()) {
    let pw
    let file
    try {
      const req = createRequire(c.base)
      file = req.resolve("playwright")
      pw = req("playwright")
    } catch {
      tried.push(`${c.where} : introuvable`)
      continue
    }
    let version = "?"
    try {
      version = createRequire(c.base)("playwright/package.json").version
    } catch {
      // version illisible : sans importance
    }
    try {
      const browser = await pw.chromium.launch({ headless: !headed, ...(executablePath ? { executablePath } : {}) })
      console.log(`[play-check] Playwright ${version} (${file})`)
      return browser
    } catch (e) {
      tried.push(`${c.where} : Playwright ${version}, Chromium ne démarre pas (${e.message.split("\n")[0]})`)
    }
  }
  console.error("[play-check] aucun Playwright utilisable :")
  for (const t of tried) console.error(`  - ${t}`)
  console.error("[play-check] Installez-le hors du projet (npm i -g playwright), indiquez --from <dossier qui l'a dans node_modules>,")
  console.error("[play-check] ou le navigateur avec --chromium <chemin> (ou PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH).")
  console.error("[play-check] Code 2 : environnement, rien n'a été vérifié (le contenu n'est pas en cause).")
  process.exit(2)
}

/* ── Rapport ────────────────────────────────────────────────────────────── */

let failures = 0
const ok = (m) => console.log(`  ok    ${m}`)
const bad = (m) => {
  failures += 1
  console.log(`  ÉCHEC ${m}`)
}
const check = (cond, m) => (cond ? ok(m) : bad(m))

/** Attend une condition dans la page ; renvoie vrai/faux sans lever. */
async function until(page, fn, arg, timeout = 15000) {
  try {
    await page.waitForFunction(fn, arg, { timeout, polling: 50 })
    return true
  } catch {
    return false
  }
}

const pad = (n) => String(n).padStart(2, "0")

const stageAttr = (page, name) => page.getAttribute('[data-testid="stage"]', `data-${name}`)
const stored = (page) =>
  page.evaluate(() => {
    try {
      const key = Object.keys(localStorage).find((k) => k.startsWith("studio."))
      return key ? JSON.parse(localStorage.getItem(key) ?? "null") : null
    } catch {
      return null
    }
  })

async function atScene(page, i, n, label) {
  const ready = await until(page, ([i, n]) => {
    const s = document.querySelector('[data-testid="stage"]')
    const pos = document.querySelector('[data-testid="position"]')?.textContent?.replace(/\s+/g, " ").trim()
    return s?.getAttribute("data-stage-ready") === "true" && pos === `${String(i).padStart(2, "0")} / ${String(n).padStart(2, "0")}`
  }, [i, n])
  check(ready, `${label} : scène ${pad(i)} montée (data-stage-ready) et position « ${pad(i)} / ${pad(n)} »`)
  return ready
}

const locked = (page) => page.locator('[data-testid="next-locked"]').count().then((c) => c > 0)

/** Change de scène par l'adresse (#/k) sans recharger la page. */
async function goHash(page, k, n, label) {
  await page.evaluate((k) => {
    window.location.hash = `#/${k}`
  }, k)
  return atScene(page, k, n, label)
}

/** Instantané de la scène courante (attributs data-* de la scène). */
const snap = (page) =>
  page.evaluate(() => {
    const s = document.querySelector('[data-testid="stage"]')
    const g = (n) => s?.getAttribute(`data-${n}`)
    return { scene: g("scene"), frame: Number(g("frame")), duration: Number(g("duration")), narrationEnd: Number(g("narration-end")), next: g("next"), completed: g("completed"), events: JSON.parse(g("events") ?? "[]"), continue: document.querySelector('[data-role="continue"]') !== null }
  })

/** Mises en évidence visibles dans la scène (Highlight, HighlightRect), hors éléments encore masqués. */
const highlights = (page) =>
  page.evaluate(() => {
    const stage = document.querySelector('[data-testid="stage"]')
    return [...(stage?.querySelectorAll('[data-highlight="on"]') ?? [])].filter((el) => {
      for (let n = el; n && n !== stage; n = n.parentElement) {
        if (n.hasAttribute?.("inert")) return false
      }
      const r = el.getBoundingClientRect()
      return r.width > 0 && r.height > 0
    }).length
  })

/**
 * Parcourt la scène image par image (pas d'environ 0,25 s, curseur de
 * narration) et compte les mises en évidence visibles à chaque pas.
 * Renvoie { max, frame, frames } : le plus grand nombre vu et sa première image.
 */
let sweeping = false
const highlightSweep = async (page) => {
  sweeping = true
  try {
    return await sweepIn(page)
  } finally {
    // Laisse retomber les chargements audio interrompus par le balayage rapide
    await page.waitForTimeout(300)
    sweeping = false
  }
}
const sweepIn = (page) =>
  page.evaluate(async () => {
    const stage = document.querySelector('[data-testid="stage"]')
    const input = document.querySelector('[data-testid="narration-scrub"]')
    if (!stage || !input) return { max: 0, frame: 0, frames: 0 }
    const count = () =>
      [...stage.querySelectorAll('[data-highlight="on"]')].filter((el) => {
        for (let n = el; n && n !== stage; n = n.parentElement) if (n.hasAttribute?.("inert")) return false
        const r = el.getBoundingClientRect()
        return r.width > 0 && r.height > 0
      }).length
    const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set
    const last = Number(input.max)
    const step = 8
    let max = 0
    let at = 0
    let frames = 0
    for (let f = 0; f <= last; f = f === last ? last + 1 : Math.min(last, f + step)) {
      setter?.call(input, String(f))
      input.dispatchEvent(new Event("input", { bubbles: true }))
      input.dispatchEvent(new Event("change", { bubbles: true }))
      for (let k = 0; k < 40 && Number(stage.getAttribute("data-frame")) !== f; k++) await new Promise((r) => requestAnimationFrame(r))
      await new Promise((r) => requestAnimationFrame(r))
      const c = count()
      frames += 1
      if (c > max) {
        max = c
        at = f
      }
    }
    return { max, frame: at, frames }
  })

async function toEnd(page) {
  await page.getByTestId("narration-scrub").focus()
  await page.keyboard.press("End")
}

async function shot(page, name) {
  if (!shots) return
  mkdirSync(shots, { recursive: true })
  await page.locator('[data-testid="stage"]').screenshot({ path: join(shots, `${name}.png`) })
}

/** La voix de la scène est réellement jouée par un élément audio (sans erreur, le temps avance). */
async function voicePlays(page, src, label) {
  const playing = await until(page, (src) => [...document.querySelectorAll("audio")].some((a) => (a.currentSrc || a.src).endsWith(src) && !a.paused && a.currentTime > 0.4 && !a.error), src, 15000)
  const info = await page.evaluate(() => [...document.querySelectorAll("audio")].filter((a) => a.src && !a.src.startsWith("data:")).map((a) => ({ src: (a.currentSrc || a.src).split("/").slice(-2).join("/"), t: Math.round(a.currentTime * 100) / 100, paused: a.paused, error: a.error?.code ?? null })))
  check(playing, `${label} : voix ${src} jouée (${JSON.stringify(info)})`)
}

/** Exercice de la scène courante, au clavier ou à la souris. */
async function playExercise(page, mode, label, ctx = {}) {
  const stage = page.locator('[data-testid="stage"]')
  const sceneOf = await stageAttr(page, "scene")
  if (mode === "clavier") {
    // Choix visibles : on amène la scène à la fin de sa narration d'entrée
    await toEnd(page)
    check(await locked(page), `${label} : Suivant verrouillé avant la validation, même narration finie`)
  } else {
    // Geste dès que les choix sont actifs, pendant la lecture (souvent avant la fin de la narration d'entrée)
    const active = await until(page, () => [...document.querySelectorAll('[data-testid="stage"] [data-role="choice"]')].some((b) => !b.disabled), undefined, 30000)
    check(active, `${label} : choix actifs en cours de lecture`)
    // VALIDER arrive avec les choix : jamais inerte quand un choix est actif (Tab d'un choix mène à VALIDER)
    const reachable = await page.evaluate(() => {
      const v = document.querySelector('[data-testid="stage"] [data-role="validate"]')
      return Boolean(v && !v.closest("[inert]"))
    })
    check(reachable, `${label} : VALIDER présent dans l'ordre de tabulation dès que les choix sont actifs`)
    check(await locked(page), `${label} : Suivant verrouillé avant la validation`)
  }
  const validateBtn = stage.locator('[data-role="validate"]')
  check(await validateBtn.isDisabled(), `${label} : VALIDER inactif sans sélection`)
  const choices = stage.locator('[data-role="choice"]')
  const keys = await choices.evaluateAll((els) => els.map((e) => e.getAttribute("data-key")))
  const first = keys[0]
  const second = keys[1]
  if (mode === "clavier") {
    await choices.first().focus()
    await page.keyboard.press(" ")
    check((await choices.first().getAttribute("aria-checked")) === "true", `${label} : choix « ${first} » sélectionné à l'espace`)
    await page.keyboard.press("ArrowDown")
    const sel = await stage.locator('[data-role="choice"][aria-checked="true"]').getAttribute("data-key")
    check(sel === second, `${label} : flèche bas, sélection modifiée en « ${second} » avant VALIDER (obtenu ${sel})`)
    check((await stageAttr(page, "scene")) === sceneOf, `${label} : les flèches dans la liste ne changent pas de scène`)
    await page.keyboard.press("Tab")
    const focused = await page.evaluate(() => document.activeElement?.getAttribute("data-role") ?? document.activeElement?.tagName ?? null)
    check(focused === "validate", `${label} : Tab depuis le choix mène à VALIDER (focus sur ${focused})`)
    if (focused !== "validate") await validateBtn.focus()
    await page.keyboard.press("Enter")
  } else {
    await validateBtn.click({ force: true, timeout: 2000 }).catch(() => {})
    check((await stage.locator('[data-validated="true"]').count()) === 0, `${label} : clic sur VALIDER sans sélection sans effet`)
    await choices.first().click()
    await choices.nth(keys.length - 1).click()
    const sel = await stage.locator('[data-role="choice"][aria-checked="true"]').getAttribute("data-key")
    check(sel === keys[keys.length - 1], `${label} : sélection modifiée à la souris (« ${sel} »)`)
    await validateBtn.dblclick()
  }
  const validated = await until(page, () => document.querySelector('[data-testid="stage"] [data-validated="true"]') !== null)
  check(validated, `${label} : exercice validé (${mode})`)
  const early = await snap(page)
  if (early.frame < early.narrationEnd - 3) {
    check(early.next === "locked" && !early.continue, `${label} : validé pendant la narration d'entrée (image ${early.frame} < ${early.narrationEnd}), Suivant verrouillé et pas de CONTINUER`)
  } else if (mode === "souris") {
    ok(`${label} : choix arrivés après la narration d'entrée (image ${early.frame}, fin ${early.narrationEnd}) : rien à vérifier avant elle`)
  }
  check(await stage.locator('[data-role="feedback"]').first().isVisible().catch(() => false) || (await until(page, () => document.querySelector('[data-role="feedback"]') !== null, undefined, 5000)), `${label} : conséquence du choix affichée`)
  const hlAfter = await highlights(page)
  check(hlAfter <= 1, `${label} : après la validation, ${hlAfter} mise(s) en évidence visible(s) (une au plus ; le choix sélectionné n'en est pas une)`)
  const verdict = await stage.locator('[data-role="feedback"]').getAttribute("data-verdict").catch(() => null)
  ok(`${label} : verdict affiché = ${verdict ?? "aucun"}`)
  const events = JSON.parse((await stageAttr(page, "events")) ?? "[]")
  const progress = await stored(page)
  const sceneId = await stageAttr(page, "scene")
  const requested = Object.keys(progress?.scenes?.[sceneId]?.requested ?? {})
  if (events.length) {
    check(events.length === requested.length && new Set(events.map((e) => e.id)).size === events.length, `${label} : clip déclenché demandé une seule fois (${events.map((e) => e.id).join(", ")}, double ${mode === "souris" ? "clic" : "validation"} compris)`)
    check(events.every((e) => e.audible), `${label} : clip déclenché placé et audible`)
    check(await locked(page), `${label} : Suivant encore verrouillé pendant le clip déclenché`)
    check(await until(page, () => document.querySelector('[data-testid="stage"]')?.getAttribute("data-playing") === "true", undefined, 5000), `${label} : la lecture continue après la validation`)
    for (const e of events) if (e.src) await voicePlays(page, e.src, `${label} : clip déclenché ${e.id}`)
    if (ctx.roundTrip) {
      // Aller-retour vers la scène la plus longue, amenée à sa fin : aucune de ses images ne compte ici
      const { k, n, i } = ctx.roundTrip
      await goHash(page, k, n, `${label} : aller vers la scène ${pad(k)}`)
      await toEnd(page)
      await goHash(page, i, n, `${label} : retour`)
      const back = await snap(page)
      const rec = (await stored(page))?.scenes?.[sceneId] ?? {}
      check(back.events.length === events.length && back.events.every((e) => e.audible) && !(rec.heard ?? []).some((h) => events.some((e) => e.id === h)), `${label} : au retour, clip déclenché toujours à entendre (${JSON.stringify(back.events.map((e) => ({ id: e.id, audible: e.audible })))}, entendus ${JSON.stringify(rec.heard ?? [])})`)
      check(back.next === "locked" && back.completed === "false" && rec.completed !== true, `${label} : au retour, Suivant verrouillé et scène non terminée (image ${back.frame}, enregistré ${rec.completed === true ? "terminée" : "non terminée"})`)
    }
  } else {
    ok(`${label} : aucun clip déclenché pour cet exercice`)
  }
  await toEnd(page)
  const open = await until(page, () => document.querySelector('[data-testid="next-locked"]') === null, undefined, 5000)
  check(open, `${label} : Suivant libre une fois l'exercice validé et le clip déclenché entendu`)
  if (events.length) {
    const after = await stored(page)
    const heard = after?.scenes?.[sceneId]?.heard ?? []
    check(events.every((e) => heard.includes(e.id)), `${label} : clip déclenché noté entendu (${heard.join(", ")})`)
    const now = JSON.parse((await stageAttr(page, "events")) ?? "[]")
    check(now.every((e) => !e.audible), `${label} : clip déclenché entendu plus jamais audible`)
  }
  check(await until(page, () => document.querySelector('[data-role="continue"]') !== null, undefined, 5000), `${label} : CONTINUER affiché`)
  // Dernière image : conséquence et CONTINUER entièrement balayés (ni masqués ni inertes)
  await toEnd(page)
  const revealed = await until(page, () => {
    const stage = document.querySelector('[data-testid="stage"]')
    const shown = (el) => {
      if (!el) return false
      for (let n = el; n && n !== stage; n = n.parentElement) {
        if (n.hasAttribute("inert")) return false
        const clip = getComputedStyle(n).clipPath
        if (clip && clip !== "none") return false
      }
      return true
    }
    return shown(document.querySelector('[data-role="feedback"]')) && shown(document.querySelector('[data-role="continue"]'))
  }, undefined, 5000)
  check(revealed, `${label} : à la dernière image, conséquence et CONTINUER entièrement visibles et actifs`)
}

/* ── Parcours ───────────────────────────────────────────────────────────── */

async function run(browser, target) {
  console.log(`\n[play-check] ${target}`)
  const context = await browser.newContext({ viewport: { width: 1600, height: 900 } })
  const page = await context.newPage()
  const errors = []
  const external = []
  const base = target.startsWith("file:") ? null : new URL(target).origin
  page.on("console", (m) => {
    if (m.type() === "error") errors.push(`console : ${m.text()}`)
  })
  page.on("pageerror", (e) => errors.push(`page : ${e.name} : ${e.message}`))
  page.on("requestfailed", (r) => {
    // Pendant le balayage image par image, un chargement audio interrompu par le saut suivant est attendu
    if (sweeping && r.failure()?.errorText === "net::ERR_ABORTED" && /\.mp3(\?|$)/.test(r.url())) return
    errors.push(`requête échouée : ${r.url()} (${r.failure()?.errorText})`)
  })
  page.on("request", (r) => {
    const u = r.url()
    if (/^(data|blob|about):/.test(u)) return
    if (base ? !u.startsWith(base) : !u.startsWith("file:")) external.push(u)
  })

  await page.goto(target)
  await until(page, () => document.querySelector('[data-testid="start"], [data-testid="load-error"]') !== null)
  const loadError = await page.locator('[data-testid="load-error"]').textContent().catch(() => null)
  if (loadError) {
    bad(`le contenu ne se charge pas : ${loadError.replace(/\s+/g, " ").trim()}`)
    await context.close()
    return
  }
  check(await page.locator('[data-testid="start"]').count() === 1, "écran « Lancer » affiché")
  const position = (await page.textContent('[data-testid="position"]'))?.replace(/\s+/g, " ").trim() ?? ""
  const n = Number(position.split("/")[1])
  check(n > 0, `nombre de scènes lu dans la position (« ${position} »)`)
  check(await page.locator('[data-testid="next"]').isDisabled(), "Suivant inactif avant « Lancer »")
  await page.getByTestId("start").click()
  check(await until(page, () => document.querySelector('[data-testid="start"]') === null), "« Lancer » disparaît au clic")

  /* Premier passage : toutes les scènes, exercices au clavier */
  const exerciseScenes = []
  const durations = []
  for (let i = 1; i <= n; i++) {
    const label = `S${pad(i)}`
    if (!(await atScene(page, i, n, label))) break
    const sceneId = await stageAttr(page, "scene")
    check(await until(page, () => document.querySelector('[data-testid="stage"]')?.getAttribute("data-playing") === "true", undefined, 5000), `${sceneId} : la scène démarre seule`)
    if (i === 1) {
      await page.locator("header").click()
      await page.keyboard.press(" ")
      const paused = await until(page, () => document.querySelector('[data-testid="stage"]')?.getAttribute("data-playing") === "false", undefined, 3000)
      await page.keyboard.press(" ")
      const resumed = await until(page, () => document.querySelector('[data-testid="stage"]')?.getAttribute("data-playing") === "true", undefined, 3000)
      check(paused && resumed, `${sceneId} : espace met en pause puis relance la narration`)
    }
    const voice = await stageAttr(page, "voice")
    if (voice) await voicePlays(page, voice, sceneId)
    check(await locked(page), `${sceneId} : Suivant verrouillé à l'entrée (verrou visible)`)
    check(await page.locator('[data-testid="next"]').isDisabled(), `${sceneId} : Suivant inactif tant qu'il est verrouillé`)
    const isExercise = (await page.locator('[data-testid="stage"] [data-role="choice"]').count()) > 0
    if (isExercise) {
      exerciseScenes.push(i)
      await playExercise(page, "clavier", sceneId)
    } else {
      await toEnd(page)
      check(await until(page, () => document.querySelector('[data-testid="next-locked"]') === null, undefined, 5000), `${sceneId} : Suivant libre une fois la narration au bout (curseur à la fin)`)
    }
    const max = Number(await page.getAttribute('[data-testid="narration-scrub"]', "max"))
    const frame = Number(await stageAttr(page, "frame"))
    check(frame === max, `${sceneId} : curseur de narration = image (${frame} / ${max})`)
    durations[i] = Number(await stageAttr(page, "duration"))
    await shot(page, `${sceneId.toLowerCase()}-fin`)
    const hlEnd = await highlights(page)
    check(hlEnd <= 1, `${sceneId} : dernière image, ${hlEnd} mise(s) en évidence (une au plus à la fois)`)
    const board = await page.getAttribute(`[data-testid="${sceneId.toLowerCase()}-scene"]`, "data-board")
    check(Boolean(board), `${sceneId} : racine de scène avec data-board (« ${board} »)`)
    const selectable = await page.evaluate((id) => getComputedStyle(document.querySelector(`[data-testid="${id}-scene"]`)).userSelect, sceneId.toLowerCase())
    check(selectable === "none", `${sceneId} : texte de scène non sélectionnable`)
    // Une seule mise en évidence à la fois, sur toute la durée (exercice validé : clip déclenché compris)
    const sweep = await highlightSweep(page)
    check(sweep.max <= 1, `${sceneId} : une mise en évidence au plus à la fois sur toute la scène (${sweep.frames} images examinées${sweep.max > 1 ? `, ${sweep.max} à l'image ${sweep.frame}` : ""})`)
    await toEnd(page)
    if (i < n) {
      if (isExercise) {
        await page.locator('[data-testid="stage"] [data-role="continue"]').click()
        ok(`${sceneId} : CONTINUER clique (= Suivant)`)
      } else if (i === 1) {
        await page.locator("header").click()
        await page.keyboard.press("ArrowRight")
      } else {
        await page.getByTestId("next").click()
      }
    } else {
      if (isExercise) await page.locator('[data-testid="stage"] [data-role="continue"]').click()
      else await page.getByTestId("next").click()
      check(await until(page, () => document.querySelector('[data-testid="end"]') !== null, undefined, 5000), "dernière scène : écran de fin (aucune avance automatique avant le geste)")
    }
  }

  /* Rechargement : la dernière scène est restaurée, à sa dernière image, en pause */
  await page.reload()
  check(await until(page, () => document.querySelector('[data-testid="start"]') !== null), "rechargement : écran « Lancer »")
  await page.getByTestId("start").click()
  await atScene(page, n, n, "rechargement")
  check((await stageAttr(page, "revisit")) === "true", "rechargement : scène terminée rouverte en revisite")
  check(await until(page, () => {
    const s = document.querySelector('[data-testid="stage"]')
    return s && Number(s.getAttribute("data-frame")) === Number(s.getAttribute("data-duration")) - 1 && s.getAttribute("data-playing") === "false"
  }, undefined, 5000), "rechargement : dernière image, en pause")
  check(!(await locked(page)), "rechargement : Suivant libre")
  const evAfter = JSON.parse((await stageAttr(page, "events")) ?? "[]")
  check(evAfter.every((e) => !e.audible), `rechargement : aucun clip déclenché rejoué (${JSON.stringify(evAfter)})`)
  await page.waitForTimeout(800)
  const sounding = await page.evaluate(() => [...document.querySelectorAll("audio")].filter((a) => !a.paused && a.currentTime > 0).map((a) => a.currentSrc || a.src))
  check(sounding.length === 0, `rechargement : aucune voix ne joue en revisite${sounding.length ? ` (${sounding.join(", ")})` : ""}`)
  if (exerciseScenes.includes(n)) {
    check((await page.locator('[data-testid="stage"] [data-validated="true"]').count()) === 1, "rechargement : exercice restauré (validé, choix conservé)")
  }
  // Retour en arrière : scène précédente rouverte à sa dernière image, puis flèche droite
  if (n > 1) {
    await page.getByTestId("previous").click()
    await atScene(page, n - 1, n, "Précédent")
    check((await stageAttr(page, "revisit")) === "true" && !(await locked(page)), "Précédent : scène terminée ouverte, Suivant libre")
    await page.locator("header").click()
    await page.keyboard.press("ArrowRight")
    await atScene(page, n, n, "flèche droite")
  }
  // « Recommencer » depuis la dernière image de la dernière scène : la première repart à zéro
  await page.getByTestId("next").click()
  if (await until(page, () => document.querySelector('[data-testid="end"]') !== null, undefined, 5000)) {
    await page.getByTestId("restart").click()
    await atScene(page, 1, n, "Recommencer")
    const fresh = await snap(page)
    await page.waitForTimeout(300)
    const later = await snap(page)
    const rec = (await stored(page))?.scenes?.[fresh.scene]
    check(fresh.next === "locked" && fresh.completed === "false" && later.next === "locked" && later.completed === "false" && rec?.completed !== true, `Recommencer : ${fresh.scene} verrouillée, non terminée, rien d'enregistré comme terminé (image ${fresh.frame} puis ${later.frame}, fin de narration ${fresh.narrationEnd})`)
  } else {
    bad("Recommencer : écran de fin introuvable depuis la dernière scène rouverte")
  }

  /* Scène neuve ouverte juste après la fin de la scène la plus longue */
  if (n > 1) {
    await page.evaluate(() => {
      for (const k of Object.keys(localStorage)) if (k.startsWith("studio.")) localStorage.removeItem(k)
    })
    const order = durations.map((d, i) => ({ i, d })).filter((x) => x.d > 0).sort((a, b) => b.d - a.d)
    const longest = order[0]?.i ?? 1
    const shortest = order.filter((x) => x.i !== longest).at(-1)?.i ?? (longest === 1 ? 2 : 1)
    await page.goto(`${target.split("#")[0]}#/${longest}`)
    await page.reload()
    await page.getByTestId("start").click()
    await atScene(page, longest, n, `scène la plus longue (${pad(longest)})`)
    await toEnd(page)
    await goHash(page, shortest, n, `puis scène la plus courte (${pad(shortest)})`)
    const fresh = await snap(page)
    await page.waitForTimeout(300)
    const later = await snap(page)
    const rec = (await stored(page))?.scenes?.[fresh.scene]
    check(fresh.next === "locked" && fresh.completed === "false" && later.next === "locked" && later.completed === "false" && rec?.completed !== true, `visite neuve après une scène plus longue : ${fresh.scene} verrouillée et non terminée (image ${fresh.frame} puis ${later.frame}, fin de narration ${fresh.narrationEnd}, scène quittée à l'image ${durations[longest] - 1})`)
  }

  /* Second passage : exercices à la souris, scène ouverte par l'adresse */
  for (const i of exerciseScenes) {
    await page.evaluate(() => {
      for (const k of Object.keys(localStorage)) if (k.startsWith("studio.")) localStorage.removeItem(k)
    })
    await page.goto(`${target.split("#")[0]}#/${i}`)
    await page.reload()
    await page.getByTestId("start").click()
    if (!(await atScene(page, i, n, `adresse #/${i}`))) continue
    const sceneId = await stageAttr(page, "scene")
    check((await stageAttr(page, "revisit")) === "false" && (await locked(page)), `${sceneId} : progression effacée, scène neuve et verrouillée`)
    const others = durations.map((d, k) => ({ k, d })).filter((x) => x.d > 0 && x.k !== i).sort((a, b) => b.d - a.d)
    await playExercise(page, "souris", `${sceneId} (souris)`, others.length ? { roundTrip: { k: others[0].k, n, i } } : {})
    await page.reload()
    await page.getByTestId("start").click()
    await atScene(page, i, n, `${sceneId} rechargé`)
    check((await page.locator('[data-testid="stage"] [data-validated="true"]').count()) === 1 && !(await locked(page)), `${sceneId} : rechargé, exercice et Suivant restaurés`)
    // Données conservées valides champ par champ mais contradictoires : geste placé après le clip déclenché
    const placed = JSON.parse((await stageAttr(page, "events")) ?? "[]")
    if (placed.length) {
      await page.evaluate(([id, at]) => {
        const key = Object.keys(localStorage).find((k) => k.startsWith("studio."))
        if (!key) return
        const p = JSON.parse(localStorage.getItem(key) ?? "{}")
        p.scenes[id].actedAt = at
        localStorage.setItem(key, JSON.stringify(p))
      }, [sceneId, Math.max(...placed.map((e) => e.start)) + 30])
      await page.reload()
      await page.getByTestId("start").click()
      await atScene(page, i, n, `${sceneId} données contradictoires`)
      const alerts = await page.locator('[role="alert"]').allTextContents()
      check(alerts.length === 0, `${sceneId} : geste conservé après le clip déclenché, la scène s'affiche sans erreur${alerts.length ? ` (${alerts.join(" | ")})` : ""}`)
    }
  }

  /* Écran étroit */
  await page.setViewportSize({ width: 390, height: 844 })
  await page.waitForTimeout(300)
  const narrow = await page.evaluate(() => {
    const vis = (id) => {
      const r = document.querySelector(`[data-testid="${id}"]`)?.getBoundingClientRect()
      return Boolean(r && r.width > 0 && r.left >= 0 && r.right <= window.innerWidth + 1 && r.bottom <= window.innerHeight + 1)
    }
    return {
      scroll: document.documentElement.scrollWidth,
      width: window.innerWidth,
      stage: document.querySelector('[data-testid="stage"]')?.getBoundingClientRect().width ?? 0,
      controls: ["previous", "next", "narration-toggle", "narration-scrub", "captions-toggle"].every(vis),
    }
  })
  check(narrow.scroll <= narrow.width && narrow.stage <= narrow.width, `écran étroit : aucun défilement horizontal (page ${narrow.scroll} px, scène ${Math.round(narrow.stage)} px, fenêtre ${narrow.width} px)`)
  check(narrow.controls, "écran étroit : contrôles visibles dans la fenêtre")
  check(await page.getByTestId("narrow-hint").isVisible(), "écran étroit à la verticale : bandeau « tournez l'appareil » affiché")
  if (shots) await page.screenshot({ path: join(shots, "ecran-etroit.png") })

  /* Téléphone à l'horizontale : sans en-tête, la scène prend la hauteur */
  await page.setViewportSize({ width: 844, height: 390 })
  await page.waitForTimeout(300)
  const land = await page.evaluate(() => {
    const vis = (id) => {
      const r = document.querySelector(`[data-testid="${id}"]`)?.getBoundingClientRect()
      return Boolean(r && r.width > 0 && r.left >= 0 && r.right <= window.innerWidth + 1 && r.bottom <= window.innerHeight + 1)
    }
    const st = document.querySelector('[data-testid="stage"]')?.getBoundingClientRect()
    const head = document.querySelector("header")
    return {
      scroll: document.documentElement.scrollWidth,
      width: window.innerWidth,
      height: window.innerHeight,
      stageH: st?.height ?? 0,
      stageW: st?.width ?? 0,
      head: head ? getComputedStyle(head).display : "none",
      hint: (() => {
        const h = document.querySelector('[data-testid="narrow-hint"]')
        return h ? getComputedStyle(h).display : "none"
      })(),
      controls: ["previous", "next", "narration-toggle", "narration-scrub", "captions-toggle"].every(vis),
    }
  })
  check(land.head === "none" && land.hint === "none" && land.scroll <= land.width && land.controls && land.stageH >= 0.7 * land.height, `téléphone à l'horizontale : sans en-tête, scène ${Math.round(land.stageW)} × ${Math.round(land.stageH)} px (${Math.round((100 * land.stageH) / land.height)} % de la hauteur), contrôles visibles, aucun défilement horizontal`)
  if (shots) await page.screenshot({ path: join(shots, "telephone-horizontal.png") })

  /* Fenêtre d'ordinateur basse (cadre intégré 16:9, fenêtre écrasée) : l'en-tête reste */
  for (const [w, h] of [
    [960, 540],
    [1280, 520],
  ]) {
    await page.setViewportSize({ width: w, height: h })
    await page.waitForTimeout(300)
    const low = await page.evaluate(() => {
      const shown = (id) => {
        const el = document.querySelector(`[data-testid="${id}"]`)
        const r = el?.getBoundingClientRect()
        return Boolean(el && r && r.width > 0 && r.height > 0 && getComputedStyle(el).visibility !== "hidden" && r.bottom <= window.innerHeight + 1)
      }
      return { title: shown("scene-title"), position: shown("position"), scroll: document.documentElement.scrollWidth, width: window.innerWidth }
    })
    check(low.title && low.position && low.scroll <= low.width, `fenêtre basse ${w} × ${h} : titre de scène et position visibles, aucun défilement horizontal`)
  }

  check(errors.length === 0, `aucune erreur de console ou de page${errors.length ? ` :\n        ${errors.join("\n        ")}` : ""}`)
  check(external.length === 0, `aucun appel réseau externe${external.length ? ` : ${[...new Set(external)].join(", ")}` : ""}`)
  await context.close()
}

/* ── Lancement ──────────────────────────────────────────────────────────── */

const targets = []
if (!onlyUrl) {
  if (!existsSync(htmlPath)) {
    console.error(`[play-check] ${htmlPath} absent : lancer « npm run build » d'abord.`)
    process.exit(1)
  }
  targets.push(pathToFileURL(htmlPath).href)
}
if (url) targets.push(url)
if (targets.length === 0) {
  console.error("[play-check] rien à vérifier (--only-url sans --url)")
  process.exit(1)
}

const waitArg = opt("--wait-lock")
const lock = await acquireChromiumLock({ tool: "play-check", waitS: args.includes("--no-wait") ? 0 : waitArg !== undefined ? Number(waitArg) || 0 : 600, log: (m) => console.log(m) })
if (!lock.ok) {
  const h = lock.holder
  console.error(`[play-check] un autre Chromium tourne toujours (${h.tool}, PID ${h.pid}, ${h.cwd}, depuis ${h.since}) : un seul à la fois sur la machine.`)
  console.error("[play-check] Relancer quand il aura fini (--wait-lock <secondes> pour attendre plus longtemps). Code 2 : rien n'a été vérifié.")
  process.exit(2)
}
const browser = await launchBrowser()
try {
  for (const t of targets) await run(browser, t)
} catch (e) {
  bad(`parcours interrompu : ${e.message}`)
} finally {
  await browser.close()
  lock.release()
}
console.log(failures ? `\n[play-check] ${failures} échec(s)` : "\n[play-check] tout est conforme")
process.exit(failures ? 1 : 0)
