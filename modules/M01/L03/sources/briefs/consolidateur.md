# Brief · consolidateur du pack (FME001-M01-L03)

## Lis, dans cet ordre, et rien d'autre

1. `/home/user/Bimaccess-FME/harnais/skills/pack-recherche/SKILL.md`
2. `/home/user/Bimaccess-FME/harnais/skills/pack-recherche/templates/source-pack.md`
3. `/home/user/Bimaccess-FME/modules/M01/L03/sources/cadrage.md`
4. `/home/user/Bimaccess-FME/modules/M01/L03/sources/recherche/espace.yaml`, `lecteurs.yaml`, `transformers.yaml`, `flux.yaml`

## Fais

1. **`affirmations.yaml`** (`lecon: FME001-M01-L03`, `axes: [espace, lecteurs, transformers, flux]`) : fusion des quatre axes. Un seul énoncé par fait : quand deux axes disent la même chose (ce qu'est un espace de travail, un lecteur, un writer, un transformer, un type d'entité, une liaison, un port), garde un identifiant, réunis leurs sources, et note l'identifiant abandonné dans `fusionne_depuis`. Garde les identifiants existants (pas de renumérotation). Conserve lacunes et visuels. Ne change pas un énoncé, sauf pour fusionner deux énoncés identiques ; tu peux **baisser** un usage, jamais le monter sans nouvelle source. **Un énoncé large se découpe dès maintenant** en affirmations d'un fait chacune, avec les mots de la source (leçon de L01 et de L02 : ajouter des extraits ne sauve pas un énoncé qui dit trop). Une mise en garde du pack va en `note`, jamais dans l'énoncé.
2. **Sources manquantes ciblées** (vingt-cinq lectures au plus). Seulement pour ce que la leçon ne peut pas perdre, aujourd'hui en confiance faible ou moyenne :
   - ce qu'est un espace de travail, un lecteur, un writer, un transformer, un type d'entité, une liaison et un port ;
   - comment les entités traversent un flux (une à une, en groupe ; transformers qui attendent un groupe) ;
   - comment voir ce qui passe (compteurs, mise en cache, inspection) ;
   - un petit flux réel, documenté, avec son résultat ;
   - une source indépendante de l'éditeur qui décrit un espace de travail et son flux.

   L'éditeur parle surtout de lui-même : cherche des sources indépendantes (documentation de l'extension ArcGIS Data Interoperability d'Esri, cours universitaires en accès libre, guides d'agences publiques qui emploient FME, publications académiques). Avant de chercher : `python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/lire_page.py /home/user/Bimaccess-FME/modules/M01/L03/sources --cache "<mot>"`. Trouve la page par recherche web, lis-la par `lire_page.py <sources> <url> --chercher "<mot>"`, recopie l'extrait depuis sa sortie. Un site qui refuse se respecte. Ajoute la source à l'affirmation, ou une affirmation nouvelle `A-<axe>-NN` à la suite.
3. **`source-pack.md`** au gabarit : chaque paragraphe cite ses affirmations `[A-axe-NN]`. Écris pour le scénariste : ce qui est sûr, ce qui attend l'expert, ce qui ne se dit pas. Ajoute une section « Exemples et cas réels » (avant les lacunes) : seulement les flux et les cas qu'une source décrit, chacun avec ses identifiants. Les contradictions (entre versions de la documentation, entre l'éditeur et un tiers) vont au § 5, présentées sans être tranchées.
4. **`porte-expert.md`** : dix questions au plus pour Ilyas, les plus lourdes pour la leçon d'abord (le petit flux que la leçon montre et ce qu'il donne, les mots retenus en français pour reader, writer, transformer, feature type, port, les noms de transformers que la voix dira, un chiffre). Chacune : `## Qn · <question>`, ce que disent les sources (avec identifiants), l'option recommandée en premier, ce que la leçon fait si personne ne répond. Une option recommandée ne s'appuie, sans réponse, que sur des affirmations en narration. Ne pose pas de question que de nouvelles sources pourraient trancher : cherche d'abord (point 2). Laisse une ligne `Réponse d'Ilyas :` vide sous chaque question.

Note sur le contrôle : `check_pack.py` refuse en `narration` une affirmation de confiance moyenne dont l'énoncé contient un chiffre (une date, un nombre, un numéro de version ou de norme). La règle du skill vaut aussi pour un nom propre que la voix dira (un nom de transformer, de produit, d'organisme), mais le script ne le voit pas : applique-la toi-même. Ne contourne pas le script : ajoute une source, ou laisse l'affirmation en `expert` et signale-le dans ton rapport.

## Contrôle avant de rendre

```bash
python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/check_pack.py /home/user/Bimaccess-FME/modules/M01/L03/sources --extraits; echo "code $?"
```

Corrige jusqu'au code 0. Aucune opération git. N'écris que les trois fichiers ci-dessus (et le cache `pages/` par le script).

## Rapport (ta réponse finale, court)

1. Fichiers, nombre d'affirmations avant et après fusion, tableau de confiance du script, ligne « extraits », code de sortie.
2. Sources ajoutées et ce qu'elles ont changé (affirmations passées en forte).
3. Les questions de la porte, une ligne chacune.
4. Ce qui t'a coûté le plus (pour améliorer la méthode).
