# Brief · consolidateur du pack (FME001-M01-L01)

## Lis, dans cet ordre, et rien d'autre

1. `/home/user/Bimaccess-FME/harnais/skills/pack-recherche/SKILL.md`
2. `/home/user/Bimaccess-FME/harnais/skills/pack-recherche/templates/source-pack.md`
3. `/home/user/Bimaccess-FME/modules/M01/L01/sources/cadrage.md`
4. `/home/user/Bimaccess-FME/modules/M01/L01/sources/recherche/nom.yaml`, `origines.yaml`, `sig.yaml`

## Fais

1. **`affirmations.yaml`** : fusion des trois axes. Un seul énoncé par fait : quand deux axes disent la même chose, garde un identifiant, réunis leurs sources, et note l'identifiant abandonné dans `fusionne_depuis`. Garde les identifiants existants (pas de renumérotation). Conserve lacunes et visuels. Ne change pas un énoncé, sauf pour fusionner deux énoncés identiques ; tu peux **baisser** un usage, jamais le monter sans nouvelle source.
2. **Sources manquantes ciblées** (vingt lectures au plus). Seulement pour les affirmations que la leçon ne peut pas perdre : fondateurs, date et lieu de fondation, client de départ, format SAIF, sens de « feature ». Trouve la page par recherche web, lis-la par `python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/lire_page.py /home/user/Bimaccess-FME/modules/M01/L01/sources <url> --chercher "<mot>"`, recopie l'extrait depuis sa sortie. Un site qui refuse se respecte. Ajoute la source à l'affirmation, ou une affirmation nouvelle `A-<axe>-NN` à la suite.
3. **`source-pack.md`** au gabarit : chaque paragraphe cite ses affirmations `[A-axe-NN]`. Écris pour le scénariste : ce qui est sûr, ce qui attend l'expert, ce qui ne se dit pas. La contradiction 1993 contre 1996 (apparition de FME), et les autres, vont au § 5, présentées sans être tranchées.
4. **`porte-expert.md`** : dix questions au plus pour Ilyas, les plus lourdes pour la leçon d'abord. Chacune : `## Qn · <question>`, ce que disent les sources (avec identifiants), l'option recommandée en premier, ce que la leçon fait si personne ne répond. Ne pose pas de question que de nouvelles sources pourraient trancher : cherche d'abord (point 2). Laisse une ligne `Réponse d'Ilyas :` vide sous chaque question.

## Contrôle avant de rendre

```bash
python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/check_pack.py /home/user/Bimaccess-FME/modules/M01/L01/sources --extraits; echo "code $?"
```

Corrige jusqu'au code 0. Aucune opération git. N'écris que les trois fichiers ci-dessus (et le cache `pages/` par le script).

## Rapport (ta réponse finale, court)

1. Fichiers, nombre d'affirmations avant et après fusion, tableau de confiance du script, ligne « extraits », code de sortie.
2. Sources ajoutées et ce qu'elles ont changé (affirmations passées en forte).
3. Les questions de la porte, une ligne chacune.
4. Ce qui t'a coûté le plus (pour améliorer la méthode).
