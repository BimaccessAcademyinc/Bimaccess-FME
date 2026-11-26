#!/usr/bin/env bash
# Contrôles par script des storyboards du banc (avant tout jugement par un modèle).
# Usage : bash juger_storyboards.sh   (depuis n'importe où)
set -u
ICI="$(cd "$(dirname "$0")" && pwd)"
REMISE="$ICI/../sources/remise-scenariste.md"
DICIBLES=$(sed -n '/peuvent dire/,/Terminologie/p' "$REMISE" | grep -oE 'A-[a-z]+-[0-9]+' | sort -u)
for d in "$ICI"/storyboard-*/; do
  nom=$(basename "$d")
  sb="$d/content/storyboard.md"
  echo "== $nom"
  [ -f "$sb" ] || { echo "storyboard absent"; continue; }
  (cd "$d" && npm run --silent lint:story -- --max-minutes 8 --forbid Esri --forbid ArcGIS --term feature --max-term 1 2>&1 | tail -4; echo "lint : code ${PIPESTATUS[0]}")
  (cd "$d" && npm run --silent sync >/dev/null 2>&1; echo "sync : code $?")
  # seules les scènes comptent : la jauge recense aussi les idées écartées
  cites=$(awk '/^# S[0-9]+ ·/{f=1} f' "$sb" | grep -oE 'A-[a-z]+-[0-9]+' | sort -u)
  hors=$(comm -23 <(echo "$cites") <(echo "$DICIBLES") | tr '\n' ' ')
  echo "affirmations citées : $(echo "$cites" | grep -c . ) ; hors de la liste dicible : ${hors:-aucune}"
  echo "scènes : $(grep -cE '^# S[0-9]+ ·' "$sb") (durée de voix : ligne « voix ≈ » du lint)"
done
