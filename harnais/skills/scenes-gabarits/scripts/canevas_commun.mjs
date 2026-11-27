// Pièces communes aux planches du canevas de design (essai 3 du pilote FME001) :
// habillage de la charte, zones interdites, styles des repères, polices.
// Utilisé par planche_canevas.mjs (écrit les planches) et planche_vers_donnees.mjs (les lit).

export const FACE = { x0: 104, x1: 1424, y0: 180, y1: 860, debordX: 1500, debordY0: 360, debordY1: 690 }
export const SOUS_TITRES = { x0: 104, x1: 1300, y0: 880, y1: 1000 }
export const ACTION = { x0: 1454, y0: 834, x1: 1454 + 360, y1: 834 + 140 }
export const MARGE = { x0: 1448, x1: 1830, y0: 84, y1: 1000 }

// Habillage de marge des gabarits (même valeur pour toutes les scènes du module)
export const HABILLAGE = [
  { fichier: "echelle-graphique", x: 1480, y: 84, largeur: 300 },
  { fichier: "rose-des-vents", x: 1712, y: 700, largeur: 116 },
]

export const POLICES_GOOGLE =
  "https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,wght@0,400;0,600;1,400;1,600&amp;family=Barlow+Condensed:wght@500;600&amp;display=swap"

function bordure() {
  let d = ""
  const pas = 76
  for (let x = 46, b = 0; x < 1874; x += pas, b++) {
    if (b % 2) continue
    const w = Math.min(pas, 1874 - x)
    d += `M${x} 34h${w}v12h-${w}Z M${x} 1034h${w}v12h-${w}Z `
  }
  for (let y = 46, b = 0; y < 1034; y += pas, b++) {
    if (b % 2) continue
    const h = Math.min(pas, 1034 - y)
    d += `M34 ${y}h12v${h}h-12Z M1874 ${y}h12v${h}h-12Z `
  }
  return d.trim()
}

function croix() {
  let d = ""
  for (let x = 274; x < 1860; x += 228) for (let y = 236; y < 1020; y += 228) d += `M${x - 8} ${y}h16 M${x} ${y - 8}v16 `
  return d.trim()
}

// Cadre de feuille, carroyage, échelle et rose : posés à l'image 0 par le moteur, ici verrouillés.
export function habillageSvg() {
  return `<svg data-locked width="1920" height="1080" viewBox="0 0 1920 1080" style="position: absolute; left: 0; top: 0; pointer-events: none" aria-hidden="true">
    <path d="${croix()}" fill="none" stroke="#7D8576" stroke-width="1.2"></path>
    <rect x="34" y="34" width="1852" height="1012" fill="none" stroke="#23281F" stroke-width="2"></rect>
    <path d="${bordure()}" fill="#23281F"></path>
    <rect x="46" y="46" width="1828" height="988" fill="none" stroke="#23281F" stroke-width="1.2"></rect>
    <rect x="58" y="58" width="1804" height="964" fill="none" stroke="#23281F" stroke-width="0.8"></rect>
    <g transform="translate(1480 84)">
      <rect x="2" y="12" width="290" height="12" fill="#FBFCF8" stroke="#23281F" stroke-width="1.5"></rect>
      <path d="M2 12H60V24H2Z M118 12H176V24H118Z M234 12H292V24H234Z" fill="#23281F"></path>
      <path d="M2 4V32 M60 6V30 M118 6V30 M176 6V30 M234 6V30 M292 4V32" stroke="#23281F" stroke-width="1.5"></path>
    </g>
    <g transform="translate(1712 700)">
      <circle cx="58" cy="58" r="40" fill="none" stroke="#23281F" stroke-width="1.2"></circle>
      <circle cx="58" cy="58" r="33" fill="none" stroke="#23281F" stroke-width="0.6"></circle>
      <path d="M58 4L67 58L58 112L49 58Z" fill="none" stroke="#23281F" stroke-width="1.6"></path>
      <path d="M58 4L67 58L49 58Z" fill="#23281F"></path>
      <path d="M4 58L58 51L112 58L58 65Z" fill="none" stroke="#23281F" stroke-width="1.2"></path>
      <path d="M4 58L58 51L58 65Z" fill="#23281F"></path>
    </g>
  </svg>`
}

// Zones interdites, visibles et verrouillées : rien de la scène ne s'y pose.
export function zonesHtml() {
  const hach = "repeating-linear-gradient(45deg, rgba(196,71,43,0.16) 0 6px, rgba(196,71,43,0) 6px 14px)"
  const z = (id, x, y, w, h, texte, extra = "") =>
    `<div data-zone="${id}" data-locked style="position: absolute; left: ${x}px; top: ${y}px; width: ${w}px; height: ${h}px; box-sizing: border-box; background: ${hach}; border: 1px solid rgba(196,71,43,0.6); pointer-events: none; ${extra}"><span style="position: absolute; left: 6px; top: 4px; font: 600 15px/1 'Barlow Condensed', sans-serif; letter-spacing: 0.08em; text-transform: uppercase; color: #9C2F18">${texte}</span></div>`
  return [
    `<div data-zone="face" data-locked style="position: absolute; left: ${FACE.x0}px; top: ${FACE.y0}px; width: ${FACE.x1 - FACE.x0}px; height: ${FACE.y1 - FACE.y0}px; box-sizing: border-box; border: 1.5px dashed rgba(47,109,168,0.55); pointer-events: none"><span style="position: absolute; right: 6px; bottom: 4px; font: 600 15px/1 'Barlow Condensed', sans-serif; letter-spacing: 0.08em; text-transform: uppercase; color: #2F6DA8">Face utile x 104 à 1424, y 180 à 860</span></div>`,
    `<div data-zone="debord" data-locked style="position: absolute; left: ${FACE.x1}px; top: ${FACE.debordY0}px; width: ${FACE.debordX - FACE.x1}px; height: ${FACE.debordY1 - FACE.debordY0}px; box-sizing: border-box; border: 1.5px dashed rgba(47,109,168,0.35); border-left: 0; pointer-events: none"></div>`,
    z("titre", 104, 84, 1320, 96, "Titre de scène (le gabarit le pose)", "background: rgba(196,71,43,0.05)"),
    z("sous-titres", SOUS_TITRES.x0, SOUS_TITRES.y0, SOUS_TITRES.x1 - SOUS_TITRES.x0, SOUS_TITRES.y1 - SOUS_TITRES.y0, "Sous-titres : rien dessous"),
    z("action", ACTION.x0, ACTION.y0, 360, 140, "Zone d'action"),
    z("marge", 1448, 84, 382, 276, "Marge : échelle, source, rose seulement"),
    z("marge", 1500, 360, 330, 330, "Marge"),
    z("marge", 1448, 690, 382, 144, "Marge"),
  ].join("\n  ")
}

// Styles des repères et des pièces. Les repères sont des annotations du canevas :
// le moteur ne les dessine jamais ; la planche les montre si « repères » est coché.
export const STYLE_REPERES = `
[data-reperes="non"] [data-repere] { display: none }
[data-repere] { position: absolute; left: 0; bottom: 100%; margin-bottom: 2px; z-index: 50; white-space: nowrap;
  font: 600 15px/1.1 'Barlow Condensed', sans-serif; letter-spacing: 0.04em; color: #FFFFFF; background: #8A1C7C;
  padding: 2px 5px; font-style: normal; text-transform: none; text-align: left; pointer-events: auto }
[data-g="trait"] > [data-repere], [data-g="pointe"] > [data-repere] { background: #5B2A86 }
[data-g="evidence"] > [data-repere] { background: #2F6DA8; left: auto; right: 0 }
[data-g="arrivee"] > [data-repere] { background: #6B6B6B }
[data-decoupe="cercle"] > img { clip-path: circle(50%) }
`.trim()
