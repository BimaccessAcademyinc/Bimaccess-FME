# Brief · consolidateur du pack (FME001-M01-L02)

## Lis, dans cet ordre, et rien d'autre

1. `/home/user/Bimaccess-FME/harnais/skills/pack-recherche/SKILL.md`
2. `/home/user/Bimaccess-FME/harnais/skills/pack-recherche/templates/source-pack.md`
3. `/home/user/Bimaccess-FME/modules/M01/L02/sources/cadrage.md`
4. `/home/user/Bimaccess-FME/modules/M01/L02/sources/recherche/interop.yaml`, `formats.yaml`, `modeles.yaml`, `coordonnees.yaml`, `semantique.yaml`

## Fais

1. **`affirmations.yaml`** (`lecon: FME001-M01-L02`, `axes: [interop, formats, modeles, coordonnees, semantique]`) : fusion des cinq axes. Un seul énoncé par fait : quand deux axes disent la même chose (définitions de l'interopérabilité, niveaux syntaxique, structurel, sémantique ; GeoJSON et WGS 84 ; OGC et ISO/TC 211), garde un identifiant, réunis leurs sources, et note l'identifiant abandonné dans `fusionne_depuis`. Garde les identifiants existants (pas de renumérotation). Conserve lacunes et visuels. Ne change pas un énoncé, sauf pour fusionner deux énoncés identiques ; tu peux **baisser** un usage, jamais le monter sans nouvelle source.
2. **Sources manquantes ciblées** (vingt-cinq lectures au plus). Seulement pour ce que la leçon ne peut pas perdre, qui est aujourd'hui en confiance faible ou moyenne :
   - une définition de l'interopérabilité des données géographiques, et la distinction des niveaux (syntaxique, structurel ou schématique, sémantique) ;
   - au moins un cas réel et sourcé par obstacle : une perte de format, une différence de modèle, un écart de système de coordonnées, une différence de sens ;
   - la définition d'un système de référence de coordonnées et d'un code EPSG ;
   - ce que sont l'OGC et l'ISO/TC 211, et une norme d'échange.

   Les textes ISO sont payants ou refusés (403) : cherche les textes libres équivalents, par exemple les spécifications et les spécifications abstraites publiées sur `docs.ogc.org`, les guides de données et le modèle conceptuel générique d'INSPIRE (`inspire.ec.europa.eu`, `knowledge-base.inspire.ec.europa.eu`), le registre `epsg.org`, les pages d'agences cartographiques publiques (Ressources naturelles Canada, IGN, NOAA, USGS), les publications académiques en accès libre. Trouve la page par recherche web, lis-la par `python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/lire_page.py /home/user/Bimaccess-FME/modules/M01/L02/sources <url> --chercher "<mot>"`, recopie l'extrait depuis sa sortie. Avant de chercher : `lire_page.py <sources> --cache "<mot>"`. Un site qui refuse se respecte. Ajoute la source à l'affirmation, ou une affirmation nouvelle `A-<axe>-NN` à la suite.
3. **`source-pack.md`** au gabarit : chaque paragraphe cite ses affirmations `[A-axe-NN]`. Écris pour le scénariste : ce qui est sûr, ce qui attend l'expert, ce qui ne se dit pas. Ajoute une section « Exemples et cas réels » (avant les lacunes) : seulement les cas qu'une source décrit, chacun avec ses identifiants. Les contradictions (attribution d'une définition à ISO 19119 ou ISO 19118 ; nombre de formats de FME, 800+ contre 300+ ; trois ou quatre niveaux d'interopérabilité) vont au § 5, présentées sans être tranchées.
4. **`porte-expert.md`** : dix questions au plus pour Ilyas, les plus lourdes pour la leçon d'abord (définition retenue, niveaux d'interopérabilité, cas réels que la voix dira, chiffres). Chacune : `## Qn · <question>`, ce que disent les sources (avec identifiants), l'option recommandée en premier, ce que la leçon fait si personne ne répond. Ne pose pas de question que de nouvelles sources pourraient trancher : cherche d'abord (point 2). Laisse une ligne `Réponse d'Ilyas :` vide sous chaque question.

Note sur le contrôle : `check_pack.py` traite un numéro de norme ou un nom propre comme un fait que la voix dira ; il demande alors la confiance forte pour l'usage `narration`. Ne contourne pas le script : ajoute une source, ou laisse l'affirmation en `expert` et signale-le dans ton rapport.

## Contrôle avant de rendre

```bash
python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/check_pack.py /home/user/Bimaccess-FME/modules/M01/L02/sources --extraits; echo "code $?"
```

Corrige jusqu'au code 0. Aucune opération git. N'écris que les trois fichiers ci-dessus (et le cache `pages/` par le script).

## Rapport (ta réponse finale, court)

1. Fichiers, nombre d'affirmations avant et après fusion, tableau de confiance du script, ligne « extraits », code de sortie.
2. Sources ajoutées et ce qu'elles ont changé (affirmations passées en forte).
3. Les questions de la porte, une ligne chacune.
4. Ce qui t'a coûté le plus (pour améliorer la méthode).
