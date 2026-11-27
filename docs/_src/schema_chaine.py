#!/usr/bin/env python3
"""Schéma de la chaîne du pilote FME001 en essai : pistes parallèles, retours des portes, cycle d'une leçon à l'autre.

Usage : python3 docs/_src/schema_chaine.py      (écrit docs/chaine-en-essai.svg)
Les nœuds, les liens et les outils se changent dans les listes ci-dessous, jamais dans le SVG.
Signature de la charte FME001 (carte topographique).
"""
import html
from pathlib import Path

OUT = Path(__file__).resolve().parent.parent / "chaine-en-essai.svg"
esc = html.escape
FOND, PAPIER, ENCRE, ENCRE2, CARROYAGE = "#F1F3EC", "#FBFCF8", "#23281F", "#545B4C", "#A3AA9B"
LECTURE, LECTURE_FOND, ECRITURE, MANQUE, MANQUE_FOND, TERME = "#2F6DA8", "#E3ECF4", "#C4472B", "#C99700", "#FBF1C8", "#1E6E3C"
SERIF = "'Source Serif 4', Georgia, 'Times New Roman', serif"
CAPS = "'Barlow Condensed', 'Arial Narrow', 'Helvetica Neue', Arial, sans-serif"
MONO = "ui-monospace, 'SFMono-Regular', Menlo, Consolas, 'DejaVu Sans Mono', monospace"
STYLE = f"""<style>
.titre{{font:600 26px {SERIF}}} .soustitre{{font:italic 14px {SERIF}}} .orch{{font:600 12px {CAPS};letter-spacing:.12em}}
.piste{{font:600 12px {CAPS};letter-spacing:.18em}} .role{{font:600 10.5px {CAPS};letter-spacing:.13em}}
.num{{font:600 12px {CAPS}}} .main{{font:600 15px {SERIF}}} .outil{{font:10px {MONO}}} .fichier{{font:italic 11.5px {SERIF}}}
.lien{{font:italic 11.5px {SERIF}}} .leg{{font:600 11px {CAPS};letter-spacing:.1em}} .note{{font:12px {SERIF}}} .mini{{font:600 10px {CAPS};letter-spacing:.1em}}
</style>"""

W, H, BW, BH = 1400, 1112, 230, 118
X = [44, 314, 584, 854, 1124]
Y1, YA, YB, YC, Y3, Y4 = 128, 300, 440, 600, 782, 944

# id : (x, y, largeur, hauteur, numéro, rôle, titre, outils, fichier, genre) ; genre : "" étape, "porte" Ilyas, "paye" appel payant gardé
N = {
 "pack": (X[0], Y1, BW, BH, "1", "CHERCHEURS · VÉRIFICATEUR", "Pack de recherche", ["skill pack-recherche", "WebSearch, lire_page.py", "check_pack.py"], "affirmations.yaml", ""),
 "porte1": (X[1], Y1, BW, BH, "2", "ILYAS", "Porte de l'expert", ["ce que les sources", "ne tranchent pas"], "porte-expert.md", "porte"),
 "story": (X[2], Y1, BW, BH, "3", "SCÉNARISTE · 3 RELECTEURS", "Storyboard", ["skill scenario (Studio)", "relecture en aveugle", "lint-storyboard.mjs"], "storyboard.md", ""),
 "porte2": (X[3], Y1, BW, BH, "4", "ILYAS", "Porte du ton", ["récit, partir du problème,", "dire ce qu'est l'objet"], "storyboard retenu", "porte"),
 "theme": (X[4], Y1, BW, BH, "5", "DIRECTION ARTISTIQUE", "Thème et charte", ["seulement sans thème", "canevas de design", "4 thèmes, choix d'Ilyas"], "CHARTE-FME001.md", ""),
 "voix": (X[0], YA, BW, BH, "6", "VOIX", "Narration", ["ElevenLabs V4", "voice.mjs, controle_oreille", "--approuve caractères"], "mp3 + alignement", "paye"),
 "ecoute": (X[1], YA, BW, BH, "7", "ILYAS", "Écoute", ["prononciation, rythme"], "voix retenue", "porte"),
 "compo": (X[0], YB, BW, BH, "8", "GRAPHISTE", "Planche sur le canevas", ["skill graphisme (Studio)", "canevas de design (essai 3)", "zones de la charte verrouillées"], "planche de la scène", ""),
 "illus": (X[1], YB, BW, BH, "9", "GRAPHISTE (OUTIL)", "Illustrations", ["illustrations.py", "Gemini 3.1 Flash Image", "vtracer · --approuve $"], "assets/*.svg", "paye"),
 "porte3": (X[2], YB, BW, BH, "10", "ILYAS", "Porte de composition", ["valide ou corrige", "à la main sur le canevas"], "planche validée", "porte"),
 "export": (X[3], YB, BW, BH, "11", "SCRIPT", "Export en données", ["planche_vers_donnees", "refuse une planche", "incomplète"], "scenes/Sxx.json", ""),
 "gabarits": (X[0], YC, 500, BH, "12", "MEILLEUR MODÈLE · UNE FOIS PAR FORME", "Gabarits Remotion", ["Frise, FicheRubriques ; puis Légende,", "Chaîne, Étoile, Territoire", "skills Remotion 4.0.533 · src/engine/gabarits/"], "réutilisés par tout le programme", ""),
 "scenes": (X[4], YA, BW, YC + BH - YA, "13", "UN AGENT PAR SCÈNE", "Scènes par gabarits", ["modèle intermédiaire", "données seulement", "feuille remplie vérifiée"], "S01 à S07 en parallèle", ""),
 "lecteur": (X[0], Y3, BW, BH, "14", "MOTEUR", "Lecteur de la leçon", ["Remotion 4.0.533", "Player, paths, shapes…", "React · Vite"], "dist/index.html", ""),
 "tests": (X[1], Y3, BW, BH, "15", "CONTRÔLES AUTOMATIQUES", "Tests", ["npm run check, build", "check-literals.mjs", "test:play (Playwright)"], "« tout est conforme »", ""),
 "controle": (X[2], Y3, BW, BH, "16", "AGENT PRINCIPAL", "Contrôle de l'agent", ["planche par phrase", "symboles, règles", "essais-qualite.md"], "verdict et corrections", ""),
 "railway": (X[3], Y3, BW, BH, "17", "RAILWAY", "Lecteur de relecture", ["fme-reader-review", "à part de CER001"], "…/FME001-M01-L01-*", ""),
 "final": (X[4], Y3, BW, BH, "18", "ILYAS", "Contrôle final", ["porte du sens", "sur le lecteur"], "ce qui est retenu", "porte"),
 "report": (X[4], Y4, BW, BH, "19", "AGENT PRINCIPAL", "Report dans le harnais", ["dépôt du cours, plugin Studio", "export_studio.py", "→ bimaccess-studio"], "harnais mis à jour", ""),
}

# (points, genre, étiquette, position de l'étiquette) ; genre : "flux", "retour" (une porte ou un contrôle renvoie), "cycle"
L = [
 ([(X[0]+BW, Y1+59), (X[1], Y1+59)], "flux", None, None),
 ([(X[1]+BW, Y1+59), (X[2], Y1+59)], "flux", None, None),
 ([(X[2]+BW, Y1+59), (X[3], Y1+59)], "flux", None, None),
 ([(X[3]+BW, Y1+59), (X[4], Y1+59)], "flux", None, None),
 ([(X[1]+30, Y1), (X[1]+30, Y1-14), (X[0]+BW-30, Y1-14), (X[0]+BW-30, Y1)], "retour", "questions, nouvelles sources", (X[0]+BW+20, Y1-19)),
 ([(X[3]+30, Y1), (X[3]+30, Y1-14), (X[2]+BW-30, Y1-14), (X[2]+BW-30, Y1)], "retour", "réécriture", (X[2]+BW+28, Y1-19)),
 # éventail vers les trois pistes parallèles
 ([(X[4]+BW/2, Y1+BH), (X[4]+BW/2, 268), (24, 268), (24, YC+59), (X[0], YC+59)], "flux", None, None),
 ([(X[0]+BW/2, 268), (X[0]+BW/2, YA)], "flux", None, None),
 ([(24, YB+59), (X[0], YB+59)], "flux", None, None),
 # piste voix
 ([(X[0]+BW, YA+59), (X[1], YA+59)], "flux", None, None),
 ([(X[1]+BW, YA+59), (X[4], YA+59)], "flux", None, None),
 ([(X[1]+30, YA+BH), (X[1]+30, YA+BH+9), (X[0]+BW-30, YA+BH+9), (X[0]+BW-30, YA+BH)], "retour", "reprise", (X[0]+150, YA+BH+18)),
 # piste planches
 ([(X[0]+BW, YB+59), (X[1], YB+59)], "flux", None, None),
 ([(X[1]+BW, YB+59), (X[2], YB+59)], "flux", None, None),
 ([(X[2]+BW, YB+59), (X[3], YB+59)], "flux", None, None),
 ([(X[3]+BW, YB+59), (X[4], YB+59)], "flux", None, None),
 ([(X[2]+30, YB+BH), (X[2]+30, YB+BH+9), (X[0]+BW/2, YB+BH+9), (X[0]+BW/2, YB+BH)], "retour", "corrections de la planche", (X[0]+BW/2+12, YB+BH+27)),
 # piste gabarits
 ([(X[0]+500, YC+59), (X[4], YC+59)], "flux", "une fois écrits, servent à chaque scène", (X[0]+520, YC+52)),
 # vers la livraison
 ([(X[4]+BW/2, YC+BH), (X[4]+BW/2, 746), (X[0]+BW/2, 746), (X[0]+BW/2, Y3)], "flux", None, None),
 ([(X[0]+BW, Y3+59), (X[1], Y3+59)], "flux", None, None),
 ([(X[1]+BW, Y3+59), (X[2], Y3+59)], "flux", None, None),
 ([(X[2]+BW, Y3+59), (X[3], Y3+59)], "flux", None, None),
 ([(X[3]+BW, Y3+59), (X[4], Y3+59)], "flux", None, None),
 ([(X[2]+BW/2, Y3), (X[2]+BW/2, 762), (X[4]+60, 762), (X[4]+60, YC+BH)], "retour", "corrections", (X[2]+BW/2+10, 776)),
 ([(X[4]+BW, Y3+59), (1374, Y3+59), (1374, YB+30), (X[4]+BW, YB+30)], "retour", "corrections", (1262, 770)),
 ([(X[4]+BW/2, Y3+BH), (X[4]+BW/2, Y4)], "flux", None, None),
 # cycle : la leçon suivante repart du harnais mis à jour
 ([(X[4]+BW, Y4+59), (1384, Y4+59), (1384, 98), (X[2]+BW/2, 98), (X[2]+BW/2, Y1-14)], "cycle", "leçon suivante (L02 à L05) : même chaîne, harnais à jour", (X[2]+BW/2+12, 93)),
]

ENCADRES = [
 ("RÉUTILISATION", TERME, X[2], Y4, 500, ["Bibliothèque d'éléments · signature d'image · cache", "Gabarits de scène et de composition", "Composants de planche du canevas (essai 3)", "Skills Remotion figés à la version des leçons"]),
 ("DÉPENSES ET MESURES", MANQUE, X[0], Y4, 500, ["Coût annoncé avant tout appel payant (or)", "Accord d'Ilyas : --approuve, scripts gardés", "tokens.py → registre.csv · appels.csv", "Registre des essais : essais-qualite.md"]),
]


def boite(x, y, w, h, n, role, main, outils, fichier, genre):
    fill, stroke, sw = PAPIER, ENCRE, 1.4
    if genre == "porte":
        fill, stroke, sw = LECTURE_FOND, LECTURE, 1.8
    elif genre == "paye":
        stroke, sw = MANQUE, 2.2
    s = []
    if n == "9":  # illustrations commandées en parallèle : feuilles empilées
        for d in (8, 4):
            s.append(f'<rect x="{x+d}" y="{y-d}" width="{w}" height="{h}" fill="{PAPIER}" stroke="{stroke}" stroke-width="1"/>')
    s += [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>',
          f'<line x1="{x}" y1="{y+24}" x2="{x+w}" y2="{y+24}" stroke="{stroke}" stroke-width="0.8"/>',
          f'<text x="{x+10}" y="{y+16}" class="num" fill="{ENCRE}">{esc(n)}</text>',
          f'<text x="{x+30}" y="{y+16}" class="role" fill="{LECTURE if genre == "porte" else ENCRE2}">{esc(role)}</text>',
          f'<text x="{x+10}" y="{y+44}" class="main" fill="{ENCRE}">{esc(main)}</text>']
    for i, o in enumerate(outils):
        s.append(f'<text x="{x+10}" y="{y+62+i*13}" class="outil" fill="{ENCRE2}">{esc(o)}</text>')
    if n == "13":  # scènes en parallèle
        for i in range(7):
            yy = y + 112 + i * 34
            s.append(f'<rect x="{x+14}" y="{yy}" width="{w-28}" height="26" fill="{FOND}" stroke="{ENCRE2}" stroke-width="1"/>')
            s.append(f'<text x="{x+24}" y="{yy+17}" class="mini" fill="{ENCRE}">S0{i+1} · AGENT</text>')
            s.append(f'<text x="{x+w-24}" y="{yy+17}" class="mini" fill="{TERME}" text-anchor="end">Sxx.json</text>')
    s.append(f'<line x1="{x+10}" y1="{y+h-24}" x2="{x+w-10}" y2="{y+h-24}" stroke="{CARROYAGE}" stroke-width="0.7"/>')
    s.append(f'<text x="{x+10}" y="{y+h-9}" class="fichier" fill="{TERME}">{esc(fichier)}</text>')
    if genre == "paye":
        s.append(f'<rect x="{x+w-58}" y="{y+5}" width="50" height="15" fill="{MANQUE_FOND}" stroke="{MANQUE}" stroke-width="1"/>')
        s.append(f'<text x="{x+w-33}" y="{y+16}" class="role" fill="{ENCRE}" text-anchor="middle">PAYANT</text>')
    return s


def lien(pts, genre, etiquette, pos):
    couleur, dash, mk = ENCRE, "", "pointe"
    if genre == "retour":
        couleur, dash, mk = ECRITURE, ' stroke-dasharray="6 4"', "pointe-retour"
    elif genre == "cycle":
        couleur, dash, mk = TERME, ' stroke-dasharray="2 4"', "pointe-cycle"
    d = "M" + " L".join(f"{x} {y}" for x, y in pts)
    s = [f'<path d="{d}" fill="none" stroke="{couleur}" stroke-width="1.6"{dash} marker-end="url(#{mk})"/>']
    if etiquette:
        s.append(f'<text x="{pos[0]}" y="{pos[1]}" class="lien" fill="{couleur}">{esc(etiquette)}</text>')
    return s


def main():
    s = [f'<rect width="{W}" height="{H}" fill="{FOND}"/>',
         f'<rect x="8" y="8" width="{W-16}" height="{H-16}" fill="none" stroke="{ENCRE}" stroke-width="2"/>',
         f'<text x="44" y="46" class="titre" fill="{ENCRE}">La chaîne du pilote FME001, telle qu\'elle est en essai</text>',
         f'<text x="44" y="68" class="soustitre" fill="{ENCRE2}">Pas une ligne : trois pistes en parallèle, des retours à chaque porte et à chaque contrôle, un cycle d\'une leçon à la suivante · 2026-11-27</text>',
         f'<text x="{W-44}" y="46" class="orch" fill="{ENCRE2}" text-anchor="end">AGENT PRINCIPAL : ORCHESTRE, DÉLÈGUE, MESURE</text>',
         f'<text x="{X[0]+BW+40}" y="{YA-8}" class="piste" fill="{ENCRE2}">PISTE VOIX</text>',
         f'<text x="{X[2]}" y="{YB-8}" class="piste" fill="{ENCRE2}">PISTE PLANCHES</text>',
         f'<text x="{X[0]+520}" y="{YC+80}" class="piste" fill="{ENCRE2}">PISTE GABARITS</text>',
         f'<text x="{X[1]}" y="{Y3-8}" class="piste" fill="{ENCRE2}">CONTRÔLE ET LIVRAISON</text>']
    for v in N.values():
        s += boite(*v)
    for v in L:
        s += lien(*v)
    for titre, couleur, x, y, w, lignes in ENCADRES:
        s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{BH}" fill="{PAPIER}" stroke="{couleur}" stroke-width="1.6"/>')
        s.append(f'<text x="{x+12}" y="{y+19}" class="piste" fill="{couleur}">{titre}</text>')
        for k, l in enumerate(lignes):
            s.append(f'<rect x="{x+14}" y="{y+32+k*21}" width="7" height="7" fill="{couleur}"/>')
            s.append(f'<text x="{x+30}" y="{y+39+k*21}" class="note" fill="{ENCRE}">{esc(l)}</text>')
    yl = H - 30
    leg = [("rect", PAPIER, ENCRE, "étape"), ("rect", LECTURE_FOND, LECTURE, "porte d'Ilyas"), ("rect", PAPIER, MANQUE, "appel payant"),
           ("ligne", ENCRE, "", "flux"), ("ligne", ECRITURE, "6 4", "retour"), ("ligne", TERME, "2 4", "cycle")]
    x = 44
    for k, a, b, t in leg:
        if k == "rect":
            s.append(f'<rect x="{x}" y="{yl-10}" width="22" height="12" fill="{a}" stroke="{b}" stroke-width="1.5"/>')
        else:
            s.append(f'<line x1="{x}" y1="{yl-4}" x2="{x+22}" y2="{yl-4}" stroke="{a}" stroke-width="1.8"' + (f' stroke-dasharray="{b}"' if b else "") + "/>")
        s.append(f'<text x="{x+30}" y="{yl}" class="leg" fill="{ENCRE2}">{esc(t)}</text>')
        x += 30 + len(t) * 7 + 34
    marqueurs = "".join(
        f'<marker id="{i}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0 L10 5 L0 10 z" fill="{c}"/></marker>'
        for i, c in (("pointe", ENCRE), ("pointe-retour", ECRITURE), ("pointe-cycle", TERME)))
    svg = (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-label="La chaîne du pilote FME001 en essai">\n'
           f'<title>La chaîne du pilote FME001 en essai</title>\n{STYLE}\n<defs>{marqueurs}</defs>\n' + "\n".join(s) + "\n</svg>\n")
    OUT.write_text(svg, encoding="utf-8")
    print(f"écrit {OUT}")


if __name__ == "__main__":
    main()
