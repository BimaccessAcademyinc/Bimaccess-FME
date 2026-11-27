#!/usr/bin/env python3
"""Appel d'un modèle hors de Claude Code, pour une étape du banc d'essai.

Dans Claude Code, un sous-agent ne tourne que sur un modèle Claude. Un modèle d'un
autre fournisseur s'emploie donc comme un outil : un fichier d'invite en entrée,
un fichier de réponse en sortie, une ligne de mesures dans appels.csv.

Usage :
  python3 appel.py --modele <alias de modeles.yaml> --invite invite.md --sortie reponse.md
                   [--systeme systeme.md] [--max 8000] [--etape "FME001-M01-L01 relecture"]
  python3 appel.py --lister            alias connus et fournisseur de chacun
  python3 appel.py --test              auto-test hors ligne (format des requêtes)

Clés : variables ANTHROPIC_API_KEY, GEMINI_API_KEY, OPENROUTER_API_KEY. Dans un
environnement cloud où le proxy injecte la clé, la variable peut manquer : le script
envoie alors une valeur factice, que le proxy remplace. La clé n'est jamais affichée.
Code de sortie : 0 réponse écrite, 1 erreur du fournisseur, 2 usage incorrect.
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import ssl
import sys
import time
import urllib.error
import urllib.request
from datetime import datetime
from pathlib import Path

import yaml

ICI = Path(__file__).resolve().parent
MODELES = ICI / "modeles.yaml"
JOURNAL = ICI.parent / "mesures" / "appels.csv"


def contexte_ssl() -> ssl.SSLContext:
    ca = os.environ.get("SSL_CERT_FILE") or os.environ.get("REQUESTS_CA_BUNDLE")
    return ssl.create_default_context(cafile=ca) if ca and Path(ca).exists() else ssl.create_default_context()


def cle(nom: str) -> str:
    return os.environ.get(nom) or "fournie-par-le-proxy"


def requete(fournisseur: str, modele: str, systeme: str, invite: str, maxi: int) -> tuple[str, dict, bytes]:
    if fournisseur == "anthropic":
        corps = {"model": modele, "max_tokens": maxi, "messages": [{"role": "user", "content": invite}]}
        if systeme:
            corps["system"] = systeme
        return ("https://api.anthropic.com/v1/messages",
                {"x-api-key": cle("ANTHROPIC_API_KEY"), "anthropic-version": "2023-06-01",
                 "content-type": "application/json"}, json.dumps(corps).encode())
    if fournisseur == "gemini":
        # Point d'accès compatible OpenAI : il lit la clé en Authorization: Bearer, forme
        # que le proxy de l'environnement injecte (secret réseau) ; l'API native, elle,
        # n'accepte en Bearer qu'un jeton OAuth.
        msgs = ([{"role": "system", "content": systeme}] if systeme else []) + [{"role": "user", "content": invite}]
        return ("https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
                {"authorization": f"Bearer {cle('GEMINI_API_KEY')}", "content-type": "application/json"},
                json.dumps({"model": modele, "max_tokens": maxi, "messages": msgs}).encode())
    if fournisseur == "openrouter":
        msgs = ([{"role": "system", "content": systeme}] if systeme else []) + [{"role": "user", "content": invite}]
        return ("https://openrouter.ai/api/v1/chat/completions",
                {"authorization": f"Bearer {cle('OPENROUTER_API_KEY')}", "content-type": "application/json"},
                json.dumps({"model": modele, "max_tokens": maxi, "messages": msgs}).encode())
    raise ValueError(f"fournisseur inconnu : {fournisseur}")


def lire_reponse(fournisseur: str, d: dict) -> tuple[str, int, int]:
    if fournisseur == "anthropic":
        texte = "".join(b.get("text", "") for b in d.get("content", []) if b.get("type") == "text")
        u = d.get("usage", {})
        return texte, u.get("input_tokens", 0) + u.get("cache_read_input_tokens", 0), u.get("output_tokens", 0)
    texte = ((d.get("choices") or [{}])[0].get("message") or {}).get("content") or ""
    u = d.get("usage", {})
    return texte, u.get("prompt_tokens", 0), u.get("completion_tokens", 0)


def charger_modeles() -> dict:
    return (yaml.safe_load(MODELES.read_text(encoding="utf-8")) or {}).get("modeles", {})


def journaliser(etape: str, alias: str, m: dict, entree: int, sortie: int, secondes: float, statut: str) -> None:
    JOURNAL.parent.mkdir(parents=True, exist_ok=True)
    nouveau = not JOURNAL.exists()
    prix = m.get("prix") or {}
    cout = ""
    if prix.get("entree") is not None and prix.get("sortie") is not None:
        cout = f"{(entree * prix['entree'] + sortie * prix['sortie']) / 1e6:.4f}"
    with JOURNAL.open("a", newline="", encoding="utf-8") as fh:
        w = csv.writer(fh)
        if nouveau:
            w.writerow(["date", "etape", "alias", "fournisseur", "modele", "entree", "sortie", "secondes", "cout_estime", "statut"])
        w.writerow([datetime.now().isoformat(timespec="seconds"), etape, alias, m["fournisseur"], m["id"],
                    entree, sortie, round(secondes, 1), cout, statut])


def autotest() -> int:
    ok = True
    for f in ("anthropic", "gemini", "openrouter"):
        url, entetes, corps = requete(f, "x", "sys", "bonjour", 10)
        d = json.loads(corps)
        if not url.startswith("https://") or "bonjour" not in json.dumps(d):
            ok = False
            print(f"échec requête {f}")
    exemples = {
        "anthropic": {"content": [{"type": "text", "text": "ok"}], "usage": {"input_tokens": 3, "output_tokens": 1}},
        "gemini": {"choices": [{"message": {"content": "ok"}}], "usage": {"prompt_tokens": 3, "completion_tokens": 1}},
        "openrouter": {"choices": [{"message": {"content": "ok"}}], "usage": {"prompt_tokens": 3, "completion_tokens": 1}},
    }
    for f, d in exemples.items():
        if lire_reponse(f, d) != ("ok", 3, 1):
            ok = False
            print(f"échec lecture {f} : {lire_reponse(f, d)}")
    print("auto-test : " + ("réussi" if ok else "ÉCHEC"))
    return 0 if ok else 1


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("--modele")
    ap.add_argument("--invite", type=Path)
    ap.add_argument("--systeme", type=Path)
    ap.add_argument("--sortie", type=Path)
    ap.add_argument("--max", type=int, default=8000)
    ap.add_argument("--etape", default="")
    ap.add_argument("--approuve", type=float, help="montant en $ approuvé par Ilyas (sans lui : rien n'est appelé)")
    ap.add_argument("--lister", action="store_true")
    ap.add_argument("--test", action="store_true")
    a = ap.parse_args()
    if a.test:
        return autotest()
    modeles = charger_modeles()
    if a.lister:
        for alias, m in modeles.items():
            print(f"{alias:24} {m['fournisseur']:11} {m['id']}  {m.get('role', '')}")
        return 0
    if not (a.modele and a.invite and a.sortie):
        ap.print_help()
        return 2
    if a.modele not in modeles:
        print(f"alias inconnu : {a.modele} (voir --lister)")
        return 2
    m = modeles[a.modele]
    # Dépenses (règle d'Ilyas, 2026-11-27) : coût annoncé avant, aucun appel payant sans son accord
    if a.approuve is None:
        print(f"REFUSÉ : appel payant ({a.modele}, au plus {a.max} tokens de sortie). Annoncer le coût estimé à Ilyas, obtenir son accord, puis relancer avec --approuve <montant en $>")
        return 3
    systeme = a.systeme.read_text(encoding="utf-8") if a.systeme else ""
    url, entetes, corps = requete(m["fournisseur"], m["id"], systeme, a.invite.read_text(encoding="utf-8"), a.max)
    t0 = time.time()
    try:
        with urllib.request.urlopen(urllib.request.Request(url, data=corps, headers=entetes), context=contexte_ssl(), timeout=600) as r:
            d = json.loads(r.read())
    except urllib.error.HTTPError as e:
        msg = e.read()[:400].decode(errors="replace")
        journaliser(a.etape, a.modele, m, 0, 0, time.time() - t0, f"http {e.code}")
        print(f"erreur {e.code} du fournisseur : {msg}")
        return 1
    except urllib.error.URLError as e:
        journaliser(a.etape, a.modele, m, 0, 0, time.time() - t0, "réseau")
        print(f"erreur réseau : {e.reason} (domaine autorisé dans l'environnement ?)")
        return 1
    texte, entree, sortie = lire_reponse(m["fournisseur"], d)
    a.sortie.parent.mkdir(parents=True, exist_ok=True)
    a.sortie.write_text(texte, encoding="utf-8")
    journaliser(a.etape, a.modele, m, entree, sortie, time.time() - t0, "ok")
    print(f"{a.sortie} : {len(texte.split())} mots ; {entree} tokens d'entrée, {sortie} de sortie, {time.time() - t0:.0f} s")
    return 0


if __name__ == "__main__":
    sys.exit(main())
