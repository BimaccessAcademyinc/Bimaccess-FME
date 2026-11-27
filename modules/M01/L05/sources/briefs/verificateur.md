# Brief · vérificateur du pack (FME001-M01-L05)

## Lis, dans cet ordre, et rien d'autre

1. `/home/user/Bimaccess-FME/harnais/skills/pack-recherche/SKILL.md`, §§ 2 à 4
2. `/home/user/Bimaccess-FME/modules/M01/L05/sources/affirmations.yaml`

## Fais

Pour chaque affirmation dont l'usage est `narration` ou `expert` : lis l'énoncé à côté de ses extraits. La présence des extraits sur leurs pages est déjà prouvée par script. Juge seulement si l'extrait **dit bien** l'énoncé :

- `verifie: true` : l'extrait dit le fait de l'énoncé, ni plus ni moins.
- `verifie: false`, avec `note_verification` : glissement (date de constitution prise pour date de sortie du produit, siège actuel pris pour lieu de fondation, éditeur qui se décrit pris pour un fait établi, « originally » pris pour « aujourd'hui »), ou énoncé qui dit plus que l'extrait.
- Glissements à guetter (relevés à L02, et propres à cette leçon) : un élément de l'énoncé (sujet, cause, moyenne, fin de phrase) absent des extraits ; une modalité perdue (« may », « can », « traditionally », « one of ») ; une catégorie de la source reclassée par une glose ; une précision prise au titre de la page ; une mise en garde du pack glissée dans l'énoncé comme un fait de la source ; une page d'une version de FME ou de l'IFC prise pour une règle de toutes les versions ; un ancien nom de produit pris pour le nom actuel ; un didacticiel ou une étude de cas de l'éditeur pris pour un cas établi ; une recommandation du guide de buildingSMART prise pour une obligation de la norme.
- Si l'énoncé dit plus que l'extrait, baisse l'usage (`narration` vers `expert`) et dis pourquoi ; ne réécris pas l'énoncé.

Pour le contexte sur une page, le texte brut est en cache : `python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/lire_page.py /home/user/Bimaccess-FME/modules/M01/L05/sources <url> --chercher "<mot>"`.

N'écris que `affirmations.yaml` (champs `verifie`, `note_verification`, `usage`). Aucune opération git.

## Contrôle avant de rendre

```bash
python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/check_pack.py /home/user/Bimaccess-FME/modules/M01/L05/sources --extraits; echo "code $?"
```

## Rapport (court)

1. Affirmations vérifiées, refusées, usages baissés, code de sortie.
2. Chaque refus en une ligne : identifiant, glissement.
3. Les glissements que le chercheur ou le consolidateur font le plus souvent (pour améliorer leurs consignes).
