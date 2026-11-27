# Brief · réparation des extraits tronqués (FME001-M01-L02)

Le vérificateur a refusé des affirmations dont l'énoncé résume plusieurs phrases d'une page alors qu'une seule est recopiée, ou dont un élément (sujet, cause, moyenne, fin de phrase) n'est dans aucun extrait. Sa note (`note_verification`, après « Vérification : ») cite ce qui manque.

## Lis, et rien d'autre

1. `/home/user/Bimaccess-FME/harnais/skills/pack-recherche/SKILL.md`, §§ 3 et 4
2. Dans `/home/user/Bimaccess-FME/modules/M01/L02/sources/affirmations.yaml` : les affirmations listées ci-dessous et leur `note_verification`

## A. Extraits tronqués, à réparer

A-interop-01, A-interop-10, A-formats-17, A-modeles-04, A-modeles-17, A-modeles-18, A-modeles-22, A-modeles-27, A-coordonnees-17, A-coordonnees-20, A-coordonnees-25, A-coordonnees-26, A-semantique-05, A-semantique-07, A-semantique-19, A-semantique-25.

Pour chacune :

1. Trouve sur la **même page** la phrase que la note dit manquante : `python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/lire_page.py /home/user/Bimaccess-FME/modules/M01/L02/sources <url> --chercher "<mot>"` (le texte est en cache).
2. Ajoute-la comme une **source de plus** de l'affirmation (même `url`, `titre`, `editeur`, `niveau`, `consulte`), avec son propre `extrait` recopié de la sortie du script, 30 mots au plus. Une source de plus sur la même page ne compte pas pour l'indépendance : c'est voulu.
3. Si l'énoncé dit encore plus que les extraits réunis (une modalité perdue, un sens « de… à » que la page ne montre pas, un élément qui n'est que dans le titre de la page), **ne le réécris pas** : écris la raison dans `note_reparation` et laisse l'affirmation telle quelle.
4. Remets `verifie: null` sur chaque affirmation réparée (le vérificateur repassera) et ajoute `repare: true`. Ne touche ni à `usage` ni à `enonce`.

## B. Fausse indépendance, à corriger

A-semantique-10, A-semantique-27, A-semantique-28 : le vérificateur juge que le cadre IGIF de l'ONU relaie ici la présentation de l'OGC et de l'ISO/TC 211 par eux-mêmes. Règle du skill (§ 4) : une source qui reprend la présentation d'un organisme compte pour cet organisme. Pour la source IGIF de ces trois affirmations seulement, mets `editeur` à celui de l'organisme décrit (le même que l'autre source de l'affirmation), et écris la raison dans `note_reparation`. Puis relance le contrôle : si le script refuse une narration, baisse l'usage à `expert` (baisser est permis, monter non). Ne touche pas à A-semantique-26, 29, 30 (l'IGIF y est indépendant).

## Interdits

N'écris que `affirmations.yaml`. Aucune opération git, aucune autre affirmation touchée, aucune page nouvelle à chercher.

## Contrôle avant de rendre

```bash
python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/check_pack.py /home/user/Bimaccess-FME/modules/M01/L02/sources --extraits; echo "code $?"
```

## Rapport (court)

Une ligne par affirmation : réparée (extrait ajouté), non réparée (raison), ou éditeur corrigé (usage avant et après). Tableau de confiance du script, code de sortie.
