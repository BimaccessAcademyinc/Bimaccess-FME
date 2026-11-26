/**
 * Point d'entrée : thème en variables CSS, signature graphique, titre et
 * langue de la page, puis le lecteur. Une scène qui casse au chargement
 * (locution introuvable, texte absent, ordre narratif rompu) affiche son
 * erreur nommée au lieu d'une page blanche, et la laisse en console pour les
 * tests.
 *
 * Signature (studio.config.json « signature ») : `data-signature` sur <html>
 * choisit les styles de la coque (player.css pour « neutral »,
 * player-bimaccess.css en plus pour « bimaccess ») ; generated/fonts.css
 * porte les polices de la signature (aucune pour « neutral »).
 */
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./generated/fonts.css"
import { META } from "./generated/meta"
import { THEME } from "./generated/theme"
import { L, LANG } from "./i18n"
import "./player/player.css"
import "./player/player-bimaccess.css"

const root = document.documentElement
root.dataset.signature = META.signature
for (const [k, v] of Object.entries(THEME.colors)) root.style.setProperty(`--c-${k}`, v)
root.style.setProperty("--f-body", THEME.fonts.body)
root.style.setProperty("--f-display", THEME.fonts.display)
root.style.setProperty("--f-mono", THEME.fonts.mono)
root.style.setProperty("--radius", `${META.signature === "bimaccess" ? 0 : THEME.radius}px`)
root.style.setProperty("--ratio", String(META.width / META.height))
if (META.signature === "bimaccess") root.style.setProperty("--c-program", META.programColor ?? THEME.colors.accent)
root.lang = LANG
document.title = META.title

const container = document.getElementById("root")
if (!container) throw new Error("élément #root absent de index.html")

import("./player/App")
  .then(({ App }) => {
    createRoot(container).render(
      <StrictMode>
        <App />
      </StrictMode>,
    )
  })
  .catch((error: unknown) => {
    const e = error instanceof Error ? error : new Error(String(error))
    console.error(e)
    const box = document.createElement("div")
    box.setAttribute("role", "alert")
    box.setAttribute("data-testid", "load-error")
    box.style.cssText = "margin:32px 16px;padding:24px;border:2px solid var(--c-accent2);border-radius:var(--radius);background:var(--c-panel);font:16px/1.5 var(--f-body)"
    const title = document.createElement("strong")
    title.textContent = L.error
    const detail = document.createElement("pre")
    detail.style.cssText = "white-space:pre-wrap;margin:12px 0 0"
    detail.textContent = `${e.name} : ${e.message}`
    box.append(title, detail)
    container.replaceChildren(box)
  })
