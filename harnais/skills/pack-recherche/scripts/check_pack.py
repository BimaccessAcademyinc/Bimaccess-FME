#!/usr/bin/env python3
"""Contrôle d'un pack de recherche (skill pack-recherche).

Usage :
  python3 check_pack.py <dossier sources/>        tout le pack
  python3 check_pack.py --axe <fichier.yaml>      un seul fichier d'axe (contrôle du chercheur)
  python3 check_pack.py <dossier sources/> --extraits   en plus : télécharge chaque source
                                                  (lire_page.py) et vérifie que l'extrait y figure mot pour mot
  python3 check_pack.py --test                    auto-test

La confiance de chaque affirmation est calculée ici, depuis ses sources ;
une confiance écrite à la main est ignorée et signalée.
Code de sortie : 0 conforme, 1 défauts, 2 usage incorrect.
"""
from __future__ import annotations

import re
import sys
import tempfile
from collections import Counter
from datetime import date
from pathlib import Path

import yaml

NIVEAUX = {"A", "B", "C", "expert"}
USAGES = {"narration", "expert", "contexte"}
VISUEL_USAGES = {"REUSE", "REDRAW", "REFERENCE_ONLY"}
MAX_MOTS_EXTRAIT = 30
MAX_QUESTIONS_PORTE = 10
ID_RE = re.compile(r"^A-[a-z0-9-]+-\d{2,3}$")
CITE_RE = re.compile(r"\[(A-[a-z0-9-]+-\d{2,3})(?:\s*,\s*(A-[a-z0-9-]+-\d{2,3}))*\]")
CITE_ONE_RE = re.compile(r"A-[a-z0-9-]+-\d{2,3}")
CHIFFRE_RE = re.compile(r"\d")
COMMUNIQUE_RE = re.compile(r"^\s*about (?!us\b|about\b|the\b)[a-z0-9&.' -]{2,40}\s*:?\s*$|\bmedia contacts?\s*:|\bpress contacts?\s*:|\bfor more information,? (please )?contact\b|\bprnewswire\b|\bbusiness wire\b|\bmarketwired\b|\bglobe ?newswire\b|\bcision\b", re.M)


def confiance(sources: list[dict]) -> str:
    niveaux_par_editeur: dict[str, set[str]] = {}
    for s in sources:
        niv = s.get("niveau")
        if niv == "expert":
            return "forte"
        ed = str(s.get("editeur", "")).strip().lower() or str(s.get("url", ""))
        niveaux_par_editeur.setdefault(ed, set()).add(niv)
    editeurs = list(niveaux_par_editeur)
    a = [e for e in editeurs if "A" in niveaux_par_editeur[e]]
    b = [e for e in editeurs if "B" in niveaux_par_editeur[e]]
    fiables = set(a) | set(b)
    if a and len(fiables) >= 2:
        return "forte"
    if a or len(b) >= 2:
        return "moyenne"
    return "faible"


class Rapport:
    def __init__(self) -> None:
        self.erreurs: list[str] = []
        self.avis: list[str] = []

    def err(self, ou: str, msg: str) -> None:
        self.erreurs.append(f"{ou} : {msg}")

    def avi(self, ou: str, msg: str) -> None:
        self.avis.append(f"{ou} : {msg}")


def lire_yaml(p: Path, r: Rapport) -> dict | None:
    try:
        d = yaml.safe_load(p.read_text(encoding="utf-8"))
    except yaml.YAMLError as e:
        r.err(p.name, f"YAML illisible ({e})")
        return None
    if not isinstance(d, dict):
        r.err(p.name, "le fichier doit être un dictionnaire (axe, affirmations, lacunes, visuels)")
        return None
    return d


def controle_source(ou: str, s: dict, r: Rapport) -> None:
    niv = s.get("niveau")
    if niv not in NIVEAUX:
        r.err(ou, f"niveau « {niv} » inconnu ({', '.join(sorted(NIVEAUX))})")
        return
    if niv == "expert":
        if not s.get("ref"):
            r.err(ou, "source expert sans « ref » (ex. porte-expert.md#Q3)")
        return
    url = str(s.get("url", ""))
    if not url.startswith(("http://", "https://")):
        r.err(ou, f"url absente ou invalide : « {url} »")
    if not str(s.get("editeur", "")).strip():
        r.err(ou, "editeur absent (sert à juger l'indépendance des sources)")
    c = s.get("consulte")
    if isinstance(c, date):
        c = c.isoformat()
    if not re.fullmatch(r"\d{4}-\d{2}-\d{2}", str(c or "")):
        r.err(ou, f"date « consulte » absente ou pas au format AAAA-MM-JJ : « {c} »")
    ext = str(s.get("extrait", "")).strip()
    if not ext:
        r.err(ou, "extrait absent : la phrase de la page qui porte le fait")
    elif len(ext.split()) > MAX_MOTS_EXTRAIT:
        r.err(ou, f"extrait de {len(ext.split())} mots (au plus {MAX_MOTS_EXTRAIT})")


def controle_affirmations(fichier: str, d: dict, r: Rapport, questions: set[str] | None) -> dict[str, dict]:
    vus: dict[str, dict] = {}
    for i, a in enumerate(d.get("affirmations") or []):
        aid = a.get("id", f"#{i + 1}")
        ou = f"{fichier} {aid}"
        if not ID_RE.match(str(aid)):
            r.err(ou, "identifiant hors format A-<axe>-NN")
        if aid in vus:
            r.err(ou, "identifiant en double")
        for champ in ("question", "enonce", "usage", "sources"):
            if not a.get(champ):
                r.err(ou, f"champ « {champ} » absent ou vide")
        if questions is not None and a.get("question") and a["question"] not in questions:
            r.err(ou, f"question « {a['question']} » absente du cadrage")
        if "confiance" in a:
            r.avi(ou, "confiance écrite à la main, ignorée : le script la calcule")
        usage = a.get("usage")
        if usage and usage not in USAGES:
            r.err(ou, f"usage « {usage} » inconnu ({', '.join(sorted(USAGES))})")
        sources = a.get("sources") or []
        for j, s in enumerate(sources):
            controle_source(f"{ou} source {j + 1}", s, r)
        conf = confiance(sources) if sources else "faible"
        a["_confiance"] = conf
        enonce = str(a.get("enonce", ""))
        if usage == "narration":
            if conf == "faible":
                r.err(ou, "usage narration en confiance faible : passer en « expert » ou ajouter une source")
            elif conf == "moyenne" and CHIFFRE_RE.search(enonce):
                r.err(ou, "date ou chiffre dit par la voix en confiance moyenne : passer en « expert » ou ajouter une source indépendante")
            if a.get("verifie") is False:
                r.err(ou, "le vérificateur l'a refusée (verifie: false) : elle ne peut rester en narration")
        if a.get("contradictions") and usage == "narration":
            r.avi(ou, "contradiction notée sur une affirmation de narration : à mettre à la porte de l'expert")
        vus[str(aid)] = a
    for k, v in enumerate(d.get("visuels") or []):
        ou = f"{fichier} {v.get('id', f'visuel {k + 1}')}"
        u = v.get("usage")
        if u not in VISUEL_USAGES:
            r.err(ou, f"usage visuel « {u} » inconnu ({', '.join(sorted(VISUEL_USAGES))})")
        if u == "REUSE" and not v.get("licence"):
            r.err(ou, "REUSE sans champ « licence » : passer en REDRAW ou REFERENCE_ONLY")
    for k, l in enumerate(d.get("lacunes") or []):
        if not l.get("manque"):
            r.err(f"{fichier} lacune {k + 1}", "champ « manque » vide")
    return vus


def questions_du_cadrage(dossier: Path) -> set[str] | None:
    p = dossier / "cadrage.md"
    if not p.exists():
        return None
    return set(re.findall(r"^\s*-\s*(Q\d+)\s*:", p.read_text(encoding="utf-8"), re.M))


def resume(affs: dict[str, dict]) -> str:
    c = Counter((a["_confiance"], a.get("usage")) for a in affs.values())
    lignes = ["| confiance | narration | expert | contexte |", "|---|---|---|---|"]
    for conf in ("forte", "moyenne", "faible"):
        lignes.append(f"| {conf} | " + " | ".join(str(c[(conf, u)]) for u in ("narration", "expert", "contexte")) + " |")
    return "\n".join(lignes)


def controle_dossier(dossier: Path) -> tuple[Rapport, dict[str, dict]]:
    r = Rapport()
    questions = questions_du_cadrage(dossier)
    if questions is None:
        r.err("cadrage.md", "absent : il est la seule entrée des chercheurs")
    elif not questions:
        r.err("cadrage.md", "aucune question au format « - Qn : … »")
    principal = dossier / "affirmations.yaml"
    toutes: dict[str, dict] = {}
    if principal.exists():
        d = lire_yaml(principal, r)
        if d:
            toutes = controle_affirmations(principal.name, d, r, questions)
    else:
        axes = sorted((dossier / "recherche").glob("*.yaml"))
        if not axes:
            r.err(str(dossier), "ni affirmations.yaml ni recherche/*.yaml")
        for p in axes:
            d = lire_yaml(p, r)
            if d:
                for k, v in controle_affirmations(f"recherche/{p.name}", d, r, questions).items():
                    if k in toutes:
                        r.err(f"recherche/{p.name} {k}", "identifiant déjà pris par un autre axe")
                    toutes[k] = v
        r.avi(str(dossier), "affirmations.yaml absent : consolidation pas encore faite")
    pack = dossier / "source-pack.md"
    if pack.exists():
        texte = pack.read_text(encoding="utf-8")
        cites = set(CITE_ONE_RE.findall(texte))
        for c in sorted(cites - set(toutes)):
            r.err("source-pack.md", f"cite {c}, absente du registre")
        for k, a in toutes.items():
            if a.get("usage") == "narration" and k not in cites:
                r.avi("source-pack.md", f"{k} (narration) n'est citée nulle part dans le pack")
    porte = dossier / "porte-expert.md"
    if porte.exists():
        n = len(re.findall(r"^#{2,3}\s*Q\d+", porte.read_text(encoding="utf-8"), re.M))
        if n > MAX_QUESTIONS_PORTE:
            r.err("porte-expert.md", f"{n} questions (au plus {MAX_QUESTIONS_PORTE}) : regrouper, ou passer le reste en contexte")
    return r, toutes


def controle_extraits(dossier: Path, affs: dict[str, dict], r: Rapport) -> Counter:
    """Chaque extrait doit figurer mot pour mot dans le texte brut de sa page.

    Une affirmation en narration dont un extrait est introuvable est une erreur ;
    une page refusée par son site laisse la source « à vérifier à la main » (avis).
    """
    sys.path.insert(0, str(Path(__file__).resolve().parent))
    import lire_page
    bilan: Counter = Counter()
    for aid, a in affs.items():
        for j, s in enumerate(a.get("sources") or []):
            if s.get("niveau") == "expert" or not s.get("extrait"):
                continue
            url = str(s.get("url", ""))
            ou = f"{aid} source {j + 1}"
            try:
                lire_page.lire(dossier, url)
            except Exception as e:  # page refusée ou illisible
                bilan["page refusée ou illisible"] += 1
                r.avi(ou, f"page non lisible par script ({type(e).__name__}) : extrait à vérifier à la main")
                continue
            texte = lire_page.normaliser(lire_page.texte_du_cache(dossier, url) or "")
            extrait = lire_page.normaliser(str(s["extrait"]).strip(" .\"'"))
            brut = (lire_page.texte_du_cache(dossier, url) or "").lower()
            if s.get("niveau") in ("B", "C") and COMMUNIQUE_RE.search(brut):
                r.avi(ou, f"la page de « {s.get('editeur')} » ressemble à un communiqué (rubrique « about … », contact presse, fil de presse) : vérifier l'éditeur réel, qui compte pour l'indépendance")
            if extrait and extrait in texte:
                bilan["mot pour mot"] += 1
            else:
                bilan["introuvable"] += 1
                msg = f"extrait introuvable mot pour mot sur la page : « {str(s['extrait'])[:80]} »"
                (r.err if a.get("usage") == "narration" else r.avi)(ou, msg)
    return bilan


def afficher(r: Rapport, affs: dict[str, dict]) -> int:
    if affs:
        print(f"{len(affs)} affirmations\n" + resume(affs))
    for a in r.avis:
        print(f"avis   {a}")
    for e in r.erreurs:
        print(f"ERREUR {e}")
    print("conforme" if not r.erreurs else f"{len(r.erreurs)} défaut(s)")
    return 0 if not r.erreurs else 1


def autotest() -> int:
    ok = True
    A = {"niveau": "A", "editeur": "Safe"}
    B1 = {"niveau": "B", "editeur": "Presse1"}
    B2 = {"niveau": "B", "editeur": "Presse2"}
    C = {"niveau": "C", "editeur": "Wiki"}
    cas = [([A, B1], "forte"), ([A, dict(A)], "moyenne"), ([A], "moyenne"), ([B1, B2], "moyenne"),
           ([B1, dict(B1)], "faible"), ([C], "faible"), ([C, B1], "faible"), ([{"niveau": "expert"}], "forte")]
    for src, attendu in cas:
        obtenu = confiance(src)
        if obtenu != attendu:
            print(f"échec confiance {[s.get('editeur') for s in src]} : {obtenu} au lieu de {attendu}")
            ok = False
    communiques = ["Surrey, BC - Safe today announced.\n\nAbout Safe Software\nSafe makes FME.",
                   "Growth ahead.\nMedia contact: Jane"]
    pas_communiques = ["GC: In your recent press release, it says growth.", "Menu\n\nAbout us\n\nNews",
                       "It helps businesses make informed decisions."]
    for x in communiques:
        if not COMMUNIQUE_RE.search(x.lower()):
            print(f"échec : communiqué non repéré : {x[:40]!r}")
            ok = False
    for x in pas_communiques:
        if COMMUNIQUE_RE.search(x.lower()):
            print(f"échec : faux communiqué : {x[:40]!r}")
            ok = False
    with tempfile.TemporaryDirectory() as t:
        d = Path(t)
        (d / "cadrage.md").write_text("- Q1 : qui ?\n", encoding="utf-8")
        (d / "recherche").mkdir()
        src = {"url": "https://a.org", "editeur": "Safe", "niveau": "A", "consulte": "2026-11-26", "extrait": "Founded in 1993."}
        (d / "recherche" / "x.yaml").write_text(yaml.safe_dump({"axe": "x", "affirmations": [
            {"id": "A-x-01", "question": "Q1", "enonce": "Fondée en 1993.", "usage": "narration", "sources": [src]},
            {"id": "A-x-02", "question": "Q9", "enonce": "Autre.", "usage": "contexte", "sources": [src]},
        ]}, allow_unicode=True), encoding="utf-8")
        r, _ = controle_dossier(d)
        textes = " ".join(r.erreurs)
        if "confiance moyenne" not in textes or "Q9" not in textes or len(r.erreurs) != 2:
            print("échec contrôle du dossier :", r.erreurs)
            ok = False
    print("auto-test : " + ("réussi" if ok else "ÉCHEC"))
    return 0 if ok else 1


def main(argv: list[str]) -> int:
    if argv == ["--test"]:
        return autotest()
    if len(argv) == 2 and argv[0] == "--axe":
        p = Path(argv[1])
        r = Rapport()
        d = lire_yaml(p, r)
        dossier = p.parent.parent if p.parent.name == "recherche" else p.parent
        affs = controle_affirmations(p.name, d, r, questions_du_cadrage(dossier)) if d else {}
        return afficher(r, affs)
    if argv and Path(argv[0]).is_dir() and set(argv[1:]) <= {"--extraits"}:
        r, affs = controle_dossier(Path(argv[0]))
        if "--extraits" in argv:
            bilan = controle_extraits(Path(argv[0]), affs, r)
            print("extraits : " + ", ".join(f"{k} {v}" for k, v in bilan.items()))
        return afficher(r, affs)
    print(__doc__)
    return 2


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
