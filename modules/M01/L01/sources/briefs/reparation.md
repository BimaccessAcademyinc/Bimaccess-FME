# Brief · réparation des extraits tronqués (FME001-M01-L01)

Le vérificateur a refusé des affirmations dont l'énoncé résume plusieurs phrases d'une page alors qu'une seule est recopiée. Sa note cite la ou les phrases manquantes.

## Lis, et rien d'autre

1. `/home/user/Bimaccess-FME/harnais/skills/pack-recherche/SKILL.md`, §§ 3 et 4
2. Dans `/home/user/Bimaccess-FME/modules/M01/L01/sources/affirmations.yaml` : les affirmations A-nom-06, A-nom-09, A-nom-10, A-nom-13, A-sig-01, A-sig-02, et leur `note_verification`

## Fais, pour chacune

1. Trouve sur la **même page** la phrase que la note dit manquante : `python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/lire_page.py /home/user/Bimaccess-FME/modules/M01/L01/sources <url> --chercher "<mot>"`.
2. Ajoute-la comme une **source de plus** de l'affirmation (même `url`, `titre`, `editeur`, `niveau`, `consulte`), avec son propre `extrait` recopié de la sortie du script, 30 mots au plus.
3. Si l'énoncé dit encore plus que les extraits réunis, **ne le réécris pas** : écris la raison dans `note_reparation` et laisse l'affirmation telle quelle.
4. Remets `verifie: null` sur chaque affirmation réparée (le vérificateur repassera) et ajoute `repare: true`. Ne touche ni à `usage` ni à `enonce`.

N'écris que `affirmations.yaml`. Aucune opération git, aucune autre affirmation touchée.

## Contrôle avant de rendre

```bash
python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/check_pack.py /home/user/Bimaccess-FME/modules/M01/L01/sources --extraits; echo "code $?"
```

## Rapport (court)

Une ligne par affirmation : réparée (extrait ajouté) ou non (raison). Code de sortie.
