#!/usr/bin/env python3
"""Schéma de la chaîne du pilote FME001 telle qu'elle est en essai : étapes, rôles, outils, portes d'Ilyas, dépenses.

Usage : python3 docs/_src/schema_chaine.py      (écrit docs/chaine-en-essai.svg)
Les étapes et les outils se changent dans les listes ci-dessous, jamais dans le SVG.
Signature de la charte FME001 (carte topographique) : fond, papier, encre, lecture, manque.
"""
import html
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "chaine-en-essai.svg"
esc = html.escape
FOND, PAPIER, ENCRE, ENCRE2, CARROYAGE = "#F1F3EC", "#FBFCF8", "#23281F", "#545B4C", "#A3AA9B"
LECTURE, LECTURE_FOND, MANQUE, MANQUE_FOND, TERME = "#2F6DA8", "#E3ECF4", "#C99700", "#FBF1C8", "#1E6E3C"
SERIF = "'Source Serif 4', Georgia, 'Times New Roman', serif"
CAPS = "'Barlow Condensed', 'Arial Narrow', 'Helvetica Neue', Arial, sans-serif"
MONO = "ui-monospace, 'SFMono-Regular', Menlo, Consolas, 'DejaVu Sans Mono', monospace"
STYLE = f"""<style>
.titre{{font:600 26px {SERIF}}} .soustitre{{font:italic 14px {SERIF}}}
.bande{{font:600 13px {CAPS};letter-spacing:.18em}} .role{{font:600 10.5px {CAPS};letter-spacing:.14em}}
.num{{font:600 12px {CAPS}}} .main{{font:600 15px {SERIF}}} .outil{{font:10px {MONO}}} .fichier{{font:italic 11.5px {SERIF}}}
.leg{{font:600 11px {CAPS};letter-spacing:.12em}} .note{{font:12px {SERIF}}}
</style>"""

# (numéro, rôle, étape, outils (lignes), fichier produit, genre) ; genre : "" étape, "porte" décision d'Ilyas, "paye" appel payant gardé
BANDES = [
 ("MATIÈRE ET RÉCIT", [
  ("1", "CHERCHEURS · VÉRIFICATEUR", "Pack de recherche",
   ["Claude · skill pack-recherche", "WebSearch, WebFetch, lire_page.py", "check_pack.py (confiance, extraits)"], "affirmations.yaml, source-pack.md", ""),
  ("2", "ILYAS", "Porte de l'expert",
   ["questions que les sources", "ne tranchent pas", "porte-expert.md"], "décisions Q1 à Q12", "porte"),
  ("3", "SCÉNARISTE · 3 RELECTEURS", "Storyboard",
   ["Claude · skill scenario (Studio)", "relecture en aveugle, grille", "lint-storyboard.mjs"], "storyboard.md", ""),
  ("4", "ILYAS", "Porte du ton",
   ["récit, partir du problème,", "dire ce qu'est l'objet", "grille-ilyas-pilote.md"], "storyboard retenu", "porte"),
  ("5", "DIRECTION ARTISTIQUE", "Thème et charte",
   ["seulement sans thème en place", "/design (canevas Claude Design)", "4 thèmes, choix d'Ilyas"], "CHARTE-FME001.md, tokens.json", ""),
 ]),
 ("IMAGES, VOIX, SCÈNES", [
  ("6", "GRAPHISTE", "Composition",
   ["Claude · skill graphisme (Studio)", "positions au px, états, locutions", "maquette, mesure des textes"], "spec.md", ""),
  ("7", "GRAPHISTE (OUTIL)", "Illustrations",
   ["illustrations.py → Gemini 3.1 Flash", "Image 1K (Pro sur accord)", "style-image.md + référence · vtracer"], "assets/*.svg (un élément)", "paye"),
  ("8", "VOIX", "Narration",
   ["ElevenLabs V4 · Alexandre Boutin", "voice.mjs · controle_oreille.py", "dictionnaire sans balise d'accent"], "mp3 + alignement", "paye"),
  ("9", "CODEUR", "Scènes",
   ["Claude · skill scenes (Studio)", "skills Remotion 4.0.533 (dépôt)", "essai 2 : gabarits + données"], "sNN.tsx / Sxx.json", ""),
  ("10", "MOTEUR", "Lecteur de la leçon",
   ["Remotion 4.0.533 : Player,", "paths, shapes, layout-utils,", "animation-utils · React · Vite"], "dist/index.html", ""),
 ]),
 ("CONTRÔLE ET LIVRAISON", [
  ("11", "CONTRÔLES AUTOMATIQUES", "Tests",
   ["npm run check (sync, tsc)", "check-literals.mjs", "test:play (Playwright, Chromium)"], "« tout est conforme »", ""),
  ("12", "AGENT PRINCIPAL", "Contrôle de l'agent",
   ["planche.mjs (planche par phrase)", "shots.mjs (en cours de geste)", "symboles, règles, essais-qualite"], "docs/essais-qualite.md", ""),
  ("13", "RAILWAY", "Lecteur de relecture",
   ["service fme-reader-review", "reader/build.mjs, server.mjs", "à part du lecteur de CER001"], "…/FME001-M01-L01-*", ""),
  ("14", "ILYAS", "Contrôle final",
   ["porte du sens", "sur le lecteur de relecture", "verdict au registre des essais"], "ce qui est retenu", "porte"),
  ("15", "AGENT PRINCIPAL", "Report dans le harnais",
   ["dépôt du cours : agents/,", "plugins/studio/", "export_studio.py → bimaccess-studio"], "harnais mis à jour", ""),
 ]),
]

REUTILISE = ["Bibliothèque d'éléments : design/bibliotheque/", "Signature d'image : design/style-image.md + référence",
             "Cache des dessins (empreinte de l'invite)", "Gabarits de composition : gabarits.md"]
DEPENSES = ["Coût annoncé avant tout appel payant", "Accord d'Ilyas : --approuve (scripts gardés)",
            "Mesures : tokens.py → registre.csv", "Appels hors Claude : appels.csv"]


def boite(x, y, w, h, n, role, main, outils, fichier, genre):
    fill, stroke, sw, dash = PAPIER, ENCRE, 1.4, ""
    if genre == "porte":
        fill, stroke, sw = LECTURE_FOND, LECTURE, 1.8
    elif genre == "paye":
        stroke, sw = MANQUE, 2.2
    s = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"{dash}/>',
         f'<line x1="{x}" y1="{y+24}" x2="{x+w}" y2="{y+24}" stroke="{stroke}" stroke-width="0.8"/>',
         f'<text x="{x+10}" y="{y+16}" class="num" fill="{ENCRE}">{esc(n)}</text>',
         f'<text x="{x+28}" y="{y+16}" class="role" fill="{LECTURE if genre == "porte" else ENCRE2}">{esc(role)}</text>',
         f'<text x="{x+10}" y="{y+45}" class="main" fill="{ENCRE}">{esc(main)}</text>']
    for i, o in enumerate(outils):
        s.append(f'<text x="{x+10}" y="{y+64+i*14}" class="outil" fill="{ENCRE2}">{esc(o)}</text>')
    s.append(f'<line x1="{x+10}" y1="{y+h-24}" x2="{x+w-10}" y2="{y+h-24}" stroke="{CARROYAGE}" stroke-width="0.7"/>')
    s.append(f'<text x="{x+10}" y="{y+h-9}" class="fichier" fill="{TERME}">{esc(fichier)}</text>')
    if genre == "paye":
        s.append(f'<rect x="{x+w-58}" y="{y+5}" width="50" height="15" fill="{MANQUE_FOND}" stroke="{MANQUE}" stroke-width="1"/>')
        s.append(f'<text x="{x+w-33}" y="{y+16}" class="role" fill="{ENCRE}" text-anchor="middle">PAYANT</text>')
    return s


def main():
    W, M, BW, GAP, BH = 1340, 30, 236, 25, 140
    Y0, PITCH = 112, 196
    H = Y0 + PITCH * 3 + 170
    s = [f'<rect width="{W}" height="{H}" fill="{FOND}"/>',
         f'<rect x="10" y="10" width="{W-20}" height="{H-20}" fill="none" stroke="{ENCRE}" stroke-width="2"/>',
         f'<rect x="16" y="16" width="{W-32}" height="{H-32}" fill="none" stroke="{ENCRE}" stroke-width="0.8"/>',
         f'<text x="{M}" y="56" class="titre" fill="{ENCRE}">La chaîne du pilote FME001, telle qu\'elle est en essai</text>',
         f'<text x="{M}" y="80" class="soustitre" fill="{ENCRE2}">Rôles, outils et fichiers de chaque étape · portes d\'Ilyas en bleu · appels payants en or, gardés par son accord · 2026-11-27</text>']
    for r, (nom, etapes) in enumerate(BANDES):
        y = Y0 + r * PITCH
        s.append(f'<text x="{W-M}" y="{y+8}" class="bande" fill="{ENCRE2}" text-anchor="end">{esc(nom)}</text>')
        s.append(f'<line x1="{M}" y1="{y+14}" x2="{W-M}" y2="{y+14}" stroke="{ENCRE2}" stroke-width="0.8"/>')
        by = y + 28
        for i, e in enumerate(etapes):
            x = M + i * (BW + GAP)
            s += boite(x, by, BW, BH, *e)
            if i < len(etapes) - 1:
                ax = x + BW
                s.append(f'<line x1="{ax+2}" y1="{by+BH/2}" x2="{ax+GAP-4}" y2="{by+BH/2}" stroke="{ENCRE}" stroke-width="1.6" marker-end="url(#pointe)"/>')
        if r < len(BANDES) - 1:
            xe = M + (len(etapes) - 1) * (BW + GAP) + BW / 2
            y1, y2 = by + BH, by + PITCH - 4
            s.append(f'<path d="M{xe} {y1+2} V{y1+18} H{M+BW/2} V{y2}" fill="none" stroke="{ENCRE}" stroke-width="1.6" marker-end="url(#pointe)"/>')
    # Deux cartouches : réutilisation, dépenses et mesures
    yb = Y0 + PITCH * 3 + 4
    for j, (titre, lignes, couleur) in enumerate([("RÉUTILISATION", REUTILISE, TERME), ("DÉPENSES ET MESURES", DEPENSES, MANQUE)]):
        x = M + j * 650
        s.append(f'<rect x="{x}" y="{yb}" width="630" height="128" fill="{PAPIER}" stroke="{couleur}" stroke-width="1.6"/>')
        s.append(f'<text x="{x+12}" y="{yb+20}" class="bande" fill="{couleur}">{titre}</text>')
        for k, l in enumerate(lignes):
            s.append(f'<rect x="{x+14}" y="{yb+38+k*22}" width="7" height="7" fill="{couleur}"/>')
            s.append(f'<text x="{x+30}" y="{yb+45+k*22}" class="note" fill="{ENCRE}">{esc(l)}</text>')
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="La chaîne du pilote FME001 en essai">\n'
           f'<title>La chaîne du pilote FME001 en essai</title>\n{STYLE}\n'
           f'<defs><marker id="pointe" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="{ENCRE}"/></marker></defs>\n'
           + "\n".join(s) + "\n</svg>\n")
    OUT.write_text(svg, encoding="utf-8")
    print(f"écrit {OUT}")


if __name__ == "__main__":
    main()
