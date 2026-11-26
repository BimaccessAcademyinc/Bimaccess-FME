#!/usr/bin/env python3
"""Tokens, durée et appels web d'une session Claude Code, par agent et par modèle.

Lit le journal de la session (~/.claude/projects/<projet>/<session>.jsonl) et ceux
de ses sous-agents (<session>/subagents/agent-*.jsonl). Chaque réponse du modèle
compte une fois (dédoublonnée par identifiant de message).

Usage :
  python3 tokens.py                       session la plus récente
  python3 tokens.py --session <fichier.jsonl>
  python3 tokens.py --depuis 2026-11-26T18:25 --jusqu-a 2026-11-26T19:00
  python3 tokens.py --agents "Chercheur*"   seulement les sous-agents dont la description correspond
  python3 tokens.py --csv registre.csv --etape "FME001-M01-L01 pack"   ajoute les lignes au registre
  python3 tokens.py --tarifs tarifs.yaml  ajoute le coût estimé (prix par million de tokens)

Sortie : un tableau Markdown. Code 0, ou 2 si aucun journal n'est trouvé.
"""
from __future__ import annotations

import argparse
import csv
import fnmatch
import json
import sys
from dataclasses import dataclass, field
from datetime import datetime
from pathlib import Path

PROJETS = Path.home() / ".claude" / "projects"


@dataclass
class Compte:
    entree: int = 0
    cache_ecrit: int = 0
    cache_lu: int = 0
    sortie: int = 0
    reponses: int = 0
    recherches: int = 0
    lectures_web: int = 0
    debut: datetime | None = None
    fin: datetime | None = None
    ids: set = field(default_factory=set)

    def ajoute(self, u: dict, t: datetime | None) -> None:
        self.entree += u.get("input_tokens", 0) or 0
        self.cache_ecrit += u.get("cache_creation_input_tokens", 0) or 0
        self.cache_lu += u.get("cache_read_input_tokens", 0) or 0
        self.sortie += u.get("output_tokens", 0) or 0
        self.reponses += 1
        if t:
            self.debut = t if not self.debut or t < self.debut else self.debut
            self.fin = t if not self.fin or t > self.fin else self.fin

    @property
    def minutes(self) -> float:
        return (self.fin - self.debut).total_seconds() / 60 if self.debut and self.fin else 0.0


def date_iso(s: str | None) -> datetime | None:
    if not s:
        return None
    try:
        return datetime.fromisoformat(s.replace("Z", "+00:00")).replace(tzinfo=None)
    except ValueError:
        return None


def lire(fichier: Path, agent: str, comptes: dict, depuis, jusqua) -> None:
    for ligne in fichier.open(encoding="utf-8", errors="replace"):
        try:
            e = json.loads(ligne)
        except json.JSONDecodeError:
            continue
        m = e.get("message") or {}
        if e.get("type") != "assistant" or not isinstance(m, dict) or "usage" not in m:
            continue
        t = date_iso(e.get("timestamp"))
        if (depuis and t and t < depuis) or (jusqua and t and t > jusqua):
            continue
        cle = (agent, m.get("model", "?"))
        c = comptes.setdefault(cle, Compte())
        # une réponse s'étale sur plusieurs lignes (une par bloc) qui répètent son usage :
        # l'usage compte une fois par identifiant, les blocs d'outils sur chaque ligne
        mid = m.get("id") or e.get("uuid")
        if mid not in c.ids:
            c.ids.add(mid)
            c.ajoute(m["usage"], t)
        for bloc in m.get("content") or []:
            if isinstance(bloc, dict) and bloc.get("type") == "tool_use":
                nom = bloc.get("name", "")
                if nom == "WebSearch":
                    c.recherches += 1
                elif nom == "WebFetch":
                    c.lectures_web += 1


def session_recente() -> Path | None:
    tous = sorted(PROJETS.glob("*/*.jsonl"), key=lambda p: p.stat().st_mtime, reverse=True)
    return tous[0] if tous else None


def nom_agent(meta: Path) -> str:
    try:
        d = json.loads(meta.read_text(encoding="utf-8"))
        return d.get("description") or d.get("agentType") or meta.stem
    except (OSError, json.JSONDecodeError):
        return meta.stem


def cout(c: Compte, modele: str, tarifs: dict) -> float | None:
    t = tarifs.get(modele)
    if not t or any(t.get(k) is None for k in ("entree", "cache_ecrit", "cache_lu", "sortie")):
        return None
    return (c.entree * t["entree"] + c.cache_ecrit * t["cache_ecrit"]
            + c.cache_lu * t["cache_lu"] + c.sortie * t["sortie"]) / 1e6


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--session", type=Path)
    ap.add_argument("--depuis")
    ap.add_argument("--jusqu-a", dest="jusqua")
    ap.add_argument("--agents", help="motif sur la description des sous-agents ; « session » pour la session principale")
    ap.add_argument("--csv", type=Path)
    ap.add_argument("--etape", default="")
    ap.add_argument("--tarifs", type=Path)
    a = ap.parse_args()

    s = a.session or session_recente()
    if not s or not s.exists():
        print("aucun journal de session trouvé")
        return 2
    depuis, jusqua = date_iso(a.depuis), date_iso(a.jusqua)
    comptes: dict = {}
    fichiers = [(s, "session")]
    sous = s.with_suffix("") / "subagents"
    for j in sorted(sous.glob("agent-*.jsonl")):
        fichiers.append((j, nom_agent(j.with_suffix(".meta.json"))))
    for f, agent in fichiers:
        if a.agents and not fnmatch.fnmatch(agent, a.agents):
            continue
        lire(f, agent, comptes, depuis, jusqua)

    tarifs = {}
    if a.tarifs:
        import yaml
        tarifs = yaml.safe_load(a.tarifs.read_text(encoding="utf-8")) or {}

    entetes = ["agent", "modèle", "réponses", "entrée", "cache écrit", "cache lu", "sortie",
               "recherches", "pages lues", "minutes", "coût estimé"]
    print("| " + " | ".join(entetes) + " |")
    print("|" + "---|" * len(entetes))
    lignes = []
    total = Compte()
    for (agent, modele), c in sorted(comptes.items()):
        k = cout(c, modele, tarifs)
        ligne = [agent, modele, c.reponses, c.entree, c.cache_ecrit, c.cache_lu, c.sortie,
                 c.recherches, c.lectures_web, round(c.minutes, 1), "" if k is None else f"{k:.2f}"]
        lignes.append(ligne)
        print("| " + " | ".join(str(x) for x in ligne) + " |")
        for attr in ("entree", "cache_ecrit", "cache_lu", "sortie", "reponses", "recherches", "lectures_web"):
            setattr(total, attr, getattr(total, attr) + getattr(c, attr))
    print(f"| total | | {total.reponses} | {total.entree} | {total.cache_ecrit} | {total.cache_lu} | "
          f"{total.sortie} | {total.recherches} | {total.lectures_web} | | |")
    if a.tarifs and any(l[-1] == "" for l in lignes):
        print("avis : modèle sans tarif complet dans le fichier de tarifs, coût non estimé")

    if a.csv:
        nouveau = not a.csv.exists()
        with a.csv.open("a", newline="", encoding="utf-8") as fh:
            w = csv.writer(fh)
            if nouveau:
                w.writerow(["etape", "session"] + entetes)
            for l in lignes:
                w.writerow([a.etape, s.stem] + l)
        print(f"{len(lignes)} ligne(s) ajoutée(s) à {a.csv}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
