# Brief · chercheur d'un axe (FME001-M01-L04)

Tu es le chercheur d'un seul axe du pack de recherche de la leçon. L'axe t'est donné dans l'invite.

## Lis, dans cet ordre, et rien d'autre

1. `/home/user/Bimaccess-FME/harnais/skills/pack-recherche/SKILL.md` (la méthode, §§ 2 à 4 surtout)
2. `/home/user/Bimaccess-FME/harnais/skills/pack-recherche/templates/affirmations.yaml` (le format)
3. `/home/user/Bimaccess-FME/modules/M01/L04/sources/cadrage.md` (ton axe et ses questions)

## Fais

- **Cherche d'abord dans le cache** : `python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/lire_page.py /home/user/Bimaccess-FME/modules/M01/L04/sources --cache "<mot>"` (les autres axes lisent en même temps que toi).
- Pour chaque question de ton axe : recherche web pour **trouver** les pages, puis lecture du texte brut par
  `python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/lire_page.py /home/user/Bimaccess-FME/modules/M01/L04/sources <url> --chercher "<mot>"` (lit aussi les PDF ; une URL qui contient une espace s'écrit avec `%20`). L'extrait se recopie depuis la sortie du script.
- Commence par les sources déjà connues du cadrage qui touchent ton axe. Cherche au moins une source indépendante de l'éditeur pour chaque date, chiffre ou nom propre.
- N'écris que ce que tu as lu ; rien de mémoire : ce que tu sais sans l'avoir trouvé va en lacune avec « à sourcer ». Exemples et cas réels : seulement ceux qu'une source décrit.
- Niveaux et usages : SKILL.md § 3. Ne mets pas de champ `confiance`. Visuels (captures de Workbench, schémas de l'éditeur) : section `visuels`, en `REFERENCE_ONLY` ou `REDRAW`, jamais `REUSE`.
- Un site qui refuse (401, 403, 429) se respecte : autre source, ou lacune « à vérifier à la main ».
- Date de consultation : 2026-11-27.

## Les refus du vérificateur à L02, à éviter dès l'écriture

1. **Chaque élément de l'énoncé est dans un extrait** : le sujet, une cause, une moyenne, la fin de la phrase. Sinon, ajoute un second extrait de la même page (une seconde entrée de source : même url, titre, éditeur, niveau, date). C'était 14 refus sur 22.
2. **Garde la modalité et les catégories de la source** : « may », « can », « traditionally », « one of », « many reasons… including » ne deviennent pas des faits nets ou uniques ; une catégorie de la page ne se reclasse pas dans une glose (« industrial facilities » ne devient pas « bâtiments industriels »).
3. **Une précision du titre de la page ne compte pas** : extrais la phrase du corps qui la porte, ou ne mets pas la précision dans l'énoncé.
4. **Une date, un chiffre, un nom propre ou un numéro de norme en confiance moyenne** va en usage `expert`, pas en `narration` (le script refuse un chiffre ; un nom propre, il ne le voit pas : à toi de l'appliquer).
5. Une même page citée sous deux éditeurs, ou un texte qui relaie la présentation d'un organisme par lui-même, ne fait qu'une source.

## Écris

Un seul fichier : `/home/user/Bimaccess-FME/modules/M01/L04/sources/recherche/<axe>.yaml`, identifiants `A-<axe>-01`, `A-<axe>-02`… (le cache `pages/` s'écrit par le script). Aucun autre fichier, aucune opération git.

## Contrôle avant de rendre

```bash
python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/check_pack.py --axe /home/user/Bimaccess-FME/modules/M01/L04/sources/recherche/<axe>.yaml; echo "code $?"
python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/check_pack.py /home/user/Bimaccess-FME/modules/M01/L04/sources --extraits; echo "code $?"
```

Le premier contrôle le format de ton fichier ; le second retrouve chaque extrait mot pour mot dans le cache (`--axe` ne le fait pas). Corrige jusqu'au code 0 pour ton fichier ; une erreur qui vise le fichier d'un autre axe ne te concerne pas.

## Rapport (ta réponse finale, court)

1. Fichier écrit, nombre d'affirmations, tableau de confiance tel que le script l'affiche, code de sortie.
2. Questions mal couvertes et pourquoi.
3. Contradictions trouvées entre sources.
4. Ce qui t'a coûté le plus de recherches (pour améliorer la méthode).
