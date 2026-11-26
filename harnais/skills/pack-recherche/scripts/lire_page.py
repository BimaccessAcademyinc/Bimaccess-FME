#!/usr/bin/env python3
"""Télécharge une page (HTML ou PDF), en garde le texte brut en cache, et le cherche.

La lecture web des agents passe par un résumé : ses « extraits » ne sont pas garantis
mot pour mot. Ce script lit la page elle-même, sans résumé, pour que l'extrait d'une
affirmation se recopie depuis le vrai texte et se vérifie par script (check_pack.py --extraits).

Usage :
  python3 lire_page.py <dossier sources/> <url>                 télécharge et met en cache, affiche le chemin
  python3 lire_page.py <dossier sources/> <url> --chercher "mot" affiche les phrases qui contiennent le mot
  python3 lire_page.py <dossier sources/> <url> --texte          affiche tout le texte
  python3 lire_page.py <dossier sources/> --cache "mot"          cherche dans toutes les pages déjà lues

Le cache vit dans <sources>/pages/ (non versionné : textes de tiers). Le client s'annonce
pour ce qu'il est ; un site qui refuse (401, 403, 429) est respecté, jamais contourné :
la source reste alors à vérifier à la main par le vérificateur.
Code de sortie : 0 texte disponible, 1 page refusée ou illisible, 2 usage incorrect.
"""
from __future__ import annotations

import hashlib
import re
import ssl
import subprocess
import sys
import tempfile
import unicodedata
import urllib.error
import urllib.request
from datetime import date
from pathlib import Path

AGENT = "pack-recherche/1.0 (lecture de sources pour une formation)"


def normaliser(t: str) -> str:
    t = unicodedata.normalize("NFKC", t)
    t = t.replace("\u2019", "'").replace("\u2018", "'").replace("\u201c", '"').replace("\u201d", '"')
    t = t.replace("\u00a0", " ").replace("\u2013", "-").replace("\u2014", "-")
    return re.sub(r"\s+", " ", t).strip().lower()


def chemin_cache(sources: Path, url: str) -> Path:
    h = hashlib.sha1(url.encode()).hexdigest()[:12]
    lisible = re.sub(r"[^a-z0-9]+", "-", url.lower().split("//", 1)[-1])[:60].strip("-")
    return sources / "pages" / f"{lisible}-{h}.txt"


def html_en_texte(octets: bytes) -> str:
    from bs4 import BeautifulSoup
    soupe = BeautifulSoup(octets, "html.parser")
    for balise in soupe(["script", "style", "noscript", "svg", "nav", "footer", "header"]):
        balise.decompose()
    return re.sub(r"\n\s*\n+", "\n\n", soupe.get_text("\n"))


def pdf_en_texte(octets: bytes) -> str:
    with tempfile.NamedTemporaryFile(suffix=".pdf") as f:
        f.write(octets)
        f.flush()
        r = subprocess.run(["pdftotext", "-layout", f.name, "-"], capture_output=True, text=True)
        return r.stdout


def telecharger(url: str) -> tuple[bytes, str]:
    ca = "/root/.ccr/ca-bundle.crt"
    import os
    ca = os.environ.get("SSL_CERT_FILE", ca)
    ctx = ssl.create_default_context(cafile=ca) if Path(ca).exists() else ssl.create_default_context()
    req = urllib.request.Request(url, headers={"User-Agent": AGENT})
    with urllib.request.urlopen(req, context=ctx, timeout=60) as r:
        return r.read(), r.headers.get("content-type", "")


def lire(sources: Path, url: str) -> Path:
    cache = chemin_cache(sources, url)
    if cache.exists():
        return cache
    octets, type_ = telecharger(url)
    texte = pdf_en_texte(octets) if ("pdf" in type_ or url.lower().endswith(".pdf")) else html_en_texte(octets)
    if len(texte.strip()) < 200:
        raise ValueError("texte presque vide (page rendue par script, ou PDF image)")
    cache.parent.mkdir(parents=True, exist_ok=True)
    cache.write_text(f"url: {url}\nlu: {date.today().isoformat()}\n---\n{texte}", encoding="utf-8")
    return cache


def texte_du_cache(sources: Path, url: str) -> str | None:
    c = chemin_cache(sources, url)
    return c.read_text(encoding="utf-8").split("\n---\n", 1)[-1] if c.exists() else None


def main(argv: list[str]) -> int:
    if len(argv) < 2:
        print(__doc__)
        return 2
    sources, url = Path(argv[0]), argv[1]
    if url == "--cache" and len(argv) >= 3:
        mot = argv[2].lower()
        n = 0
        for c in sorted((sources / "pages").glob("*.txt")):
            entete, _, texte = c.read_text(encoding="utf-8").partition("\n---\n")
            phrases = [p.strip() for p in re.split(r"(?<=[.!?])\s+|\n{2,}", re.sub(r"[ \t]+", " ", texte)) if mot in p.lower()]
            if phrases:
                n += len(phrases)
                print(entete.splitlines()[0])
                for p in phrases[:5]:
                    print(f"  - {p[:300]}")
        print(f"{n} phrase(s) avec « {mot} » dans le cache")
        return 0
    try:
        cache = lire(sources, url)
    except urllib.error.HTTPError as e:
        print(f"refusée : HTTP {e.code} ({url}) ; respecter le refus, vérification à la main")
        return 1
    except (urllib.error.URLError, ValueError, OSError) as e:
        print(f"illisible : {e} ({url})")
        return 1
    texte = cache.read_text(encoding="utf-8").split("\n---\n", 1)[-1]
    if "--texte" in argv:
        print(texte)
    elif "--chercher" in argv:
        mot = argv[argv.index("--chercher") + 1].lower()
        phrases = re.split(r"(?<=[.!?])\s+|\n{2,}", re.sub(r"[ \t]+", " ", texte))
        trouve = [p.strip() for p in phrases if mot in p.lower()]
        for p in trouve[:20]:
            print(f"- {p}")
        print(f"{len(trouve)} phrase(s) avec « {mot} »")
    else:
        print(f"{cache} ({len(texte.split())} mots)")
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
