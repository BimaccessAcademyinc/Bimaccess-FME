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
.lien{{font:italic 11.5px {SERIF}}} .modele{{font:600 10.5px {MONO}}} .skill{{font:italic 11px {SERIF}}} .leg{{font:600 11px {CAPS};letter-spacing:.1em}} .note{{font:12px {SERIF}}} .mini{{font:600 10px {CAPS};letter-spacing:.1em}}
</style>"""

W, H, BW, BH = 1400, 1460, 230, 140
X = [44, 314, 584, 854, 1124]
Y1, YA, YB, YC, Y3, Y4 = 128, 322, 492, 678, 878, 1062
Y5 = Y4 + BH + 40

# id : (x, y, largeur, hauteur, numéro, rôle, titre, outils, fichier, genre) ; genre : "" étape, "porte" Ilyas, "paye" appel payant gardé
N = {
 "pack": (X[0], Y1, BW, BH, "1", "CHERCHEURS · VÉRIFICATEUR", "Pack de recherche", "Sonnet·medium ×3 · Opus·high", "skill pack-recherche", ["WebSearch, lire_page.py", "check_pack.py"], "affirmations.yaml", ""),
 "porte1": (X[1], Y1, BW, BH, "2", "ILYAS", "Porte de l'expert", "", "", ["ce que les sources", "ne tranchent pas"], "porte-expert.md", "porte"),
 "story": (X[2], Y1, BW, BH, "3", "SCÉNARISTE · 3 RELECTEURS", "Storyboard", "Opus · high (×4)", "skills scenario, porte-du-ton", ["relecture en aveugle", "lint-storyboard.mjs"], "storyboard.md", ""),
 "porte2": (X[3], Y1, BW, BH, "4", "ILYAS", "Porte du ton", "", "", ["récit, partir du problème,", "dire ce qu'est l'objet"], "storyboard retenu", "porte"),
 "theme": (X[4], Y1, BW, BH, "5", "DIRECTION ARTISTIQUE", "Thème et charte", "Fable·high (Opus au pilote)", "skill themes-planches", ["canevas de design", "seulement sans thème"], "CHARTE-FME001.md", ""),
 "voix": (X[0], YA, BW, BH, "6", "VOIX", "Voix provisoire muette", "Haiku · low · aucun coût", "skill voix (Studio)", ["minutage estimé, sous-titres", "écriture pour l'oreille contrôlée"], "voice.config, dictionnaire", ""),
 "compo": (X[0], YB, BW, BH, "7", "GRAPHISTE", "Planche sur le canevas", "Opus · high", "skill graphisme (Studio)", ["canevas de design (essai 3)", "zones de la charte verrouillées"], "planche de la scène", ""),
 "illus": (X[1], YB, BW, BH, "8", "GRAPHISTE (OUTIL)", "Illustrations", "Gemini 3.1 Flash Image 1K", "skill planche-image", ["devis annoncé à Ilyas, puis", "--approuve $ · vtracer"], "assets/*.svg", "paye"),
 "verif": (X[2], YB, BW, BH, "9", "GRAPHISTE", "Contrôle de la planche", "aucune porte d'Ilyas", "skills graphisme, scenes-gabarits", ["feuille remplie, rien sur un trait,", "hors face et chevauchement refusés"], "planche prête", ""),
 "export": (X[3], YB, BW, BH, "10", "SCRIPT", "Export en données", "aucun modèle", "skill scenes-gabarits", ["planche_vers_donnees,", "aucune position recopiée"], "scenes/Sxx.json", ""),
 "gabarits": (X[0], YC, 500, BH, "11", "UNE FOIS PAR FORME", "Gabarits Remotion", "Opus · high (meilleur modèle)", "skills scenes (Studio), remotion-markup (4.0.533)", ["Frise, FicheRubriques ; puis Légende, Chaîne,", "Étoile, Territoire · src/engine/gabarits/"], "réutilisés par tout le programme", ""),
 "scenes": (X[4], YA, BW, YC + BH - YA, "12", "UN AGENT PAR SCÈNE", "Scènes par gabarits", "Sonnet (intermédiaire)", "skill scenes-gabarits", ["données seulement", "feuille remplie vérifiée"], "S01 à S07 en parallèle", ""),
 "lecteur": (X[0], Y3, BW, BH, "13", "MOTEUR", "Lecteur de la leçon", "aucun modèle", "", ["Remotion 4.0.533 : Player,", "paths, shapes… · React · Vite"], "dist/index.html", ""),
 "tests": (X[1], Y3, BW, BH, "14", "CONTRÔLES AUTOMATIQUES", "Tests", "aucun modèle", "", ["npm run check, build", "check-literals · test:play"], "« tout est conforme »", ""),
 "controle": (X[2], Y3, BW, BH, "15", "AGENT PRINCIPAL", "Contrôle de l'agent", "Opus · agent qa Sonnet·medium", "skills qa, planche-par-phrase", ["symboles, règles", "essais-qualite.md"], "verdict et corrections", ""),
 "railway": (X[3], Y3, BW, BH, "16", "RAILWAY", "Lecteur de relecture", "aucun modèle", "", ["fme-reader-review", "à part de CER001"], "…/FME001-M01-L01-*", ""),
 "final": (X[4], Y3, BW, BH, "17", "ILYAS", "Contrôle final", "", "", ["porte du sens sur le lecteur ;", "corrige sur le canevas s'il veut"], "ce qui est retenu", "porte"),
 "voixfin": (X[4], Y4, BW, BH, "18", "VOIX", "Voix finale", "Haiku·low + eleven_v4", "skill voice-production (V4)", ["devis annoncé à Ilyas, puis", "--approuve caractères"], "mp3 + alignement", "paye"),
 "ecoute": (X[3], Y4, BW, BH, "19", "ILYAS", "Écoute", "", "", ["prononciation, rythme", "respirations entre les idées"], "voix retenue", "porte"),
 "recalage": (X[2], Y4, BW, BH, "20", "CODE · QA", "Recalage sur la vraie voix", "Sonnet · agent qa Sonnet·medium", "skills scenes-gabarits, qa", ["locutions recalées par sync", "test:play une seule fois"], "leçon prête", ""),
 "report": (X[1], Y4, BW, BH, "21", "AGENT PRINCIPAL", "Report dans le harnais", "Opus (session)", "export_studio.py (cours)", ["dépôt du cours, plugin Studio", "→ bimaccess-studio"], "harnais mis à jour", ""),
 "suivante": (X[0], Y4, BW, BH, "", "CYCLE", "Leçon suivante", "", "", ["L02 à L05 : même chaîne,", "harnais à jour, sans étape de thème"], "", "cycle"),
}

# (points, genre, étiquette, position de l'étiquette) ; genre : "flux", "retour" (une porte ou un contrôle renvoie), "cycle"
L = [
 ([(X[0]+BW, Y1+70), (X[1], Y1+70)], "flux", None, None),
 ([(X[1]+BW, Y1+70), (X[2], Y1+70)], "flux", None, None),
 ([(X[2]+BW, Y1+70), (X[3], Y1+70)], "flux", None, None),
 ([(X[3]+BW, Y1+70), (X[4], Y1+70)], "flux", None, None),
 ([(X[1]+30, Y1), (X[1]+30, Y1-14), (X[0]+BW-30, Y1-14), (X[0]+BW-30, Y1)], "retour", "questions, nouvelles sources", (X[0]+BW+20, Y1-19)),
 ([(X[3]+30, Y1), (X[3]+30, Y1-14), (X[2]+BW-30, Y1-14), (X[2]+BW-30, Y1)], "retour", "réécriture", (X[2]+BW+28, Y1-19)),
 # éventail vers les trois pistes parallèles
 ([(X[4]+BW/2, Y1+BH), (X[4]+BW/2, 290), (24, 290), (24, YC+70), (X[0], YC+70)], "flux", None, None),
 ([(X[0]+BW/2, 290), (X[0]+BW/2, YA)], "flux", None, None),
 ([(24, YB+70), (X[0], YB+70)], "flux", None, None),
 # piste voix provisoire : minutage estimé, sans coût
 ([(X[0]+BW, YA+70), (X[4], YA+70)], "flux", "minutage estimé sur le texte : les scènes se calent dessus, sans dépense", (X[0]+BW+20, YA+63)),
 # piste planches
 ([(X[0]+BW, YB+70), (X[1], YB+70)], "flux", None, None),
 ([(X[1]+BW, YB+70), (X[2], YB+70)], "flux", None, None),
 ([(X[2]+BW, YB+70), (X[3], YB+70)], "flux", None, None),
 ([(X[3]+BW, YB+70), (X[4], YB+70)], "flux", None, None),
 ([(X[2]+30, YB+BH), (X[2]+30, YB+BH+10), (X[0]+BW/2, YB+BH+10), (X[0]+BW/2, YB+BH)], "retour", "le graphiste reprend sa planche", (X[0]+BW/2+12, YB+BH+30)),
 # piste gabarits
 ([(X[0]+500, YC+70), (X[4], YC+70)], "flux", "une fois écrits, servent à chaque scène", (X[0]+520, YC+63)),
 # contrôle sur la voix muette
 ([(X[4]+BW/2, YC+BH), (X[4]+BW/2, 840), (X[0]+BW/2, 840), (X[0]+BW/2, Y3)], "flux", None, None),
 ([(X[0]+BW, Y3+70), (X[1], Y3+70)], "flux", None, None),
 ([(X[1]+BW, Y3+70), (X[2], Y3+70)], "flux", None, None),
 ([(X[2]+BW, Y3+70), (X[3], Y3+70)], "flux", None, None),
 ([(X[3]+BW, Y3+70), (X[4], Y3+70)], "flux", None, None),
 ([(X[2]+BW/2, Y3), (X[2]+BW/2, 856), (X[4]+60, 856), (X[4]+60, YC+BH)], "retour", "corrections", (X[2]+BW/2+10, 870)),
 ([(X[4]+BW, Y3+70), (1374, Y3+70), (1374, YB+40), (X[4]+BW, YB+40)], "retour", "corrections", (1262, 866)),
 # voix finale seulement après la porte du sens, puis recalage
 ([(X[4]+BW/2, Y3+BH), (X[4]+BW/2, Y4)], "flux", "porte du sens passée, devis accepté", (X[4]+BW/2+22, Y3+BH+26)),
 ([(X[4], Y4+70), (X[3]+BW, Y4+70)], "flux", None, None),
 ([(X[3]+30, Y4+BH), (X[3]+30, Y4+BH+10), (X[4]+BW-30, Y4+BH+10), (X[4]+BW-30, Y4+BH)], "retour", "reprise d'un clip", (X[3]+44, Y4+BH+26)),
 ([(X[3], Y4+70), (X[2]+BW, Y4+70)], "flux", None, None),
 ([(X[2], Y4+70), (X[1]+BW, Y4+70)], "flux", None, None),
 ([(X[1], Y4+70), (X[0]+BW, Y4+70)], "flux", None, None),
 # cycle : la leçon suivante repart du harnais mis à jour
 ([(X[0], Y4+70), (14, Y4+70), (14, 98), (X[2]+BW/2, 98), (X[2]+BW/2, Y1-14)], "cycle", "leçon suivante : même chaîne, harnais à jour", (X[2]+BW/2+12, 93)),
]


ENCADRES = [
 ("DÉPENSES ET MESURES", MANQUE, X[0], Y5, 333, ["Devis annoncé, accord d'Ilyas, puis dépense", "Voix payée seulement après le sens", "tokens.py → registre.csv, appels.csv", "Registre : essais-qualite.md"]),
 ("RÉUTILISATION", TERME, X[0]+353, Y5, 333, ["Bibliothèque, signature d'image, cache", "Gabarits de scène et de composition", "Composants de planche (essai 3)", "Skills Remotion figés en 4.0.533"]),
 ("HOOKS ET GARDES", LECTURE, X[0]+706, Y5, 334, ["Session : Stop → commit et push", "Dépôt FME : aucun hook de dépôt ;", "gardes dans sync, gabarits, --approuve", "Cours : garde_bash, gate.sh, commit-msg"]),
]


def boite(x, y, w, h, n, role, main, modele, skill, outils, fichier, genre):
    fill, stroke, sw = PAPIER, ENCRE, 1.4
    if genre == "porte":
        fill, stroke, sw = LECTURE_FOND, LECTURE, 1.8
    elif genre == "paye":
        stroke, sw = MANQUE, 2.2
    elif genre == "cycle":
        fill, stroke, sw = FOND, TERME, 1.6
    s = []
    if main == "Illustrations":  # illustrations commandées en parallèle : feuilles empilées
        for d in (8, 4):
            s.append(f'<rect x="{x+d}" y="{y-d}" width="{w}" height="{h}" fill="{PAPIER}" stroke="{stroke}" stroke-width="1"/>')
    s += [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>',
          f'<line x1="{x}" y1="{y+24}" x2="{x+w}" y2="{y+24}" stroke="{stroke}" stroke-width="0.8"/>',
          f'<text x="{x+10}" y="{y+16}" class="num" fill="{ENCRE}">{esc(n)}</text>',
          f'<text x="{x+30}" y="{y+16}" class="role" fill="{LECTURE if genre == "porte" else ENCRE2}">{esc(role)}</text>',
          f'<text x="{x+10}" y="{y+44}" class="main" fill="{ENCRE}">{esc(main)}</text>']
    ligne = y + 62
    if modele:
        s.append(f'<text x="{x+10}" y="{ligne}" class="modele" fill="{LECTURE}">{esc(modele)}</text>')
        ligne += 14
    if skill:
        s.append(f'<text x="{x+10}" y="{ligne}" class="skill" fill="{TERME}">{esc(skill)}</text>')
        ligne += 14
    for i, o in enumerate(outils):
        s.append(f'<text x="{x+10}" y="{ligne+i*13}" class="outil" fill="{ENCRE2}">{esc(o)}</text>')
    if main == "Scènes par gabarits":  # scènes en parallèle
        for i in range(7):
            yy = y + 140 + i * 34
            s.append(f'<rect x="{x+14}" y="{yy}" width="{w-28}" height="26" fill="{FOND}" stroke="{ENCRE2}" stroke-width="1"/>')
            s.append(f'<text x="{x+24}" y="{yy+17}" class="mini" fill="{ENCRE}">S0{i+1} · AGENT</text>')
            s.append(f'<text x="{x+w-24}" y="{yy+17}" class="mini" fill="{TERME}" text-anchor="end">Sxx.json</text>')
    s.append(f'<line x1="{x+10}" y1="{y+h-24}" x2="{x+w-10}" y2="{y+h-24}" stroke="{CARROYAGE}" stroke-width="0.7"/>')
    s.append(f'<text x="{x+10}" y="{y+h-9}" class="fichier" fill="{TERME}">{esc(fichier)}</text>')
    if genre == "paye":
        s.append(f'<rect x="{x+w-58}" y="{y+5}" width="50" height="15" fill="{MANQUE_FOND}" stroke="{MANQUE}" stroke-width="1"/>')
        s.append(f'<text x="{x+w-33}" y="{y+16}" class="role" fill="{ENCRE}" text-anchor="middle">PAYANT</text>')
    return s


ACCORDS = [(X[1] - 20, YB + 70), (X[4] + BW / 2, Y3 + BH + 22)]


def accord(x, y):
    """Pastille « accord d'Ilyas sur le coût » posée sur un lien qui mène à une dépense."""
    return [f'<circle cx="{x}" cy="{y}" r="11" fill="{LECTURE_FOND}" stroke="{LECTURE}" stroke-width="1.8"/>',
            f'<text x="{x}" y="{y+4.5}" class="num" fill="{LECTURE}" text-anchor="middle">$</text>']


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
         f'<text x="44" y="68" class="soustitre" fill="{ENCRE2}">Pas une ligne : voix provisoire muette au départ, voix finale payée après la porte du sens ; pistes en parallèle, retours, cycle d\'une leçon à la suivante · 2026-11-27</text>',
         f'<text x="{W-44}" y="46" class="orch" fill="{ENCRE2}" text-anchor="end">AGENT PRINCIPAL (OPUS 5.5) : ORCHESTRE, DÉLÈGUE, MESURE</text>',
         f'<text x="{X[0]+BW+40}" y="{YA-8}" class="piste" fill="{ENCRE2}">PISTE VOIX PROVISOIRE (MUETTE)</text>',
         f'<text x="{X[2]}" y="{YB-8}" class="piste" fill="{ENCRE2}">PISTE PLANCHES</text>',
         f'<text x="{X[0]+520}" y="{YC+100}" class="piste" fill="{ENCRE2}">PISTE GABARITS</text>',
         f'<text x="{X[1]}" y="{Y3-8}" class="piste" fill="{ENCRE2}">CONTRÔLE SUR LA VOIX MUETTE, SOUS-TITRES</text>', f'<text x="{X[1]}" y="{Y4-8}" class="piste" fill="{ENCRE2}">VOIX FINALE ET LIVRAISON</text>']
    for v in N.values():
        s += boite(*v)
    for v in L:
        s += lien(*v)
    for x, y in ACCORDS:
        s += accord(x, y)
    for titre, couleur, x, y, w, lignes in ENCADRES:
        s.append(f'<rect x="{x}" y="{y}" width="{w}" height="{BH}" fill="{PAPIER}" stroke="{couleur}" stroke-width="1.6"/>')
        s.append(f'<text x="{x+12}" y="{y+19}" class="piste" fill="{couleur}">{titre}</text>')
        for k, l in enumerate(lignes):
            s.append(f'<rect x="{x+14}" y="{y+32+k*21}" width="7" height="7" fill="{couleur}"/>')
            s.append(f'<text x="{x+30}" y="{y+39+k*21}" class="note" fill="{ENCRE}">{esc(l)}</text>')
    s.append(f'<text x="{X[0]}" y="{H-50}" class="note" fill="{ENCRE2}">Modèle · effort : définitions d\'agents du plugin Studio et de .claude/agents (modèle intermédiaire, Sonnet, pour les données de scène : règle d\'Ilyas du 2026-11-27). Au pilote, Fable remplacé par Opus jusqu\'au 30 novembre (limite d\'usage).</text>')
    yl = H - 24
    leg = [("texte", LECTURE, "modele", "modèle · effort"), ("texte", TERME, "skill", "skill"), ("rect", PAPIER, ENCRE, "étape"), ("rect", LECTURE_FOND, LECTURE, "porte d'Ilyas"), ("rect", PAPIER, MANQUE, "appel payant"), ("accord", LECTURE, "", "accord sur le devis"),
           ("ligne", ENCRE, "", "flux"), ("ligne", ECRITURE, "6 4", "retour"), ("ligne", TERME, "2 4", "cycle")]
    x = 44
    for k, a, b, t in leg:
        if k == "texte":
            s.append(f'<text x="{x}" y="{yl}" class="{b}" fill="{a}">{esc(t)}</text>')
            x += len(t) * 7 + 30
            continue
        if k == "accord":
            s += accord(x + 11, yl - 4)
            s.append(f'<text x="{x+30}" y="{yl}" class="leg" fill="{ENCRE2}">{esc(t)}</text>')
            x += 30 + len(t) * 7 + 34
            continue
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
