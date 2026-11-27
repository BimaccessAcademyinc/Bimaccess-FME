import { readFileSync } from "node:fs"
import react from "@vitejs/plugin-react"
import { defineConfig, type Plugin } from "vite"
import { viteSingleFile } from "vite-plugin-singlefile"

// Une seule page HTML autonome (scripts et styles en ligne) : elle s'ouvre
// aussi bien servie par un serveur que directement depuis le disque
// (file://). Les fichiers audio restent à côté, dans dist/audio/ (copiés
// depuis public/audio/ par scripts/sync.mjs puis par la construction).

/** Titre et langue de la page tirés de studio.config.json, avant même le JavaScript. */
function pageMeta(): Plugin {
  return {
    name: "studio-page-meta",
    transformIndexHtml(html) {
      const cfg = JSON.parse(readFileSync(new URL("./studio.config.json", import.meta.url), "utf8")) as { title?: string; lang?: string }
      const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;")
      return html
        .replace(/<html lang="[^"]*">/, `<html lang="${esc(cfg.lang ?? "fr")}">`)
        .replace(/<title>[^<]*<\/title>/, `<title>${esc(cfg.title ?? "Studio")}</title>`)
    },
  }
}

export default defineConfig({
  base: "./",
  plugins: [react(), pageMeta(), viteSingleFile({ removeViteModuleLoader: true })],
  build: { outDir: "dist", assetsInlineLimit: 100_000_000, chunkSizeWarningLimit: 5000 },
})
