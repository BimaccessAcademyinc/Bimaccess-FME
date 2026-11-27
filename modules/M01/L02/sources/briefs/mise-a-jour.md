# Brief · mise à jour du pack après vérification (FME001-M01-L02)

Le vérificateur a refusé des affirmations dont l'énoncé dit plus que les extraits (modalité perdue, mots de la source changés, fin d'énoncé prise à une autre phrase). Un énoncé ne se réécrit pas : il se **découpe** en une affirmation nouvelle, plus étroite, qui dit seulement ce que l'extrait dit, avec les mots de la source. Puis le pack lisible et la porte suivent l'état vérifié.

## Lis, et rien d'autre

1. `/home/user/Bimaccess-FME/harnais/skills/pack-recherche/SKILL.md`, §§ 3 et 4
2. `/home/user/Bimaccess-FME/modules/M01/L02/sources/affirmations.yaml` (les champs `verifie`, `note_verification`, `note_reparation` disent l'état de chaque affirmation)
3. `/home/user/Bimaccess-FME/modules/M01/L02/sources/source-pack.md` et `porte-expert.md`

## Fais

1. **Affirmations découpées.** Pour les affirmations refusées dont la note dit ce qui tiendrait sans l'excès, au moins : A-semantique-23 (la forêt, sans la fin « met à l'épreuve l'interopérabilité »), A-modeles-17 et A-modeles-18 (exemples de Safe Software « entre » représentations, sans « de… à »), A-semantique-17 (« A common challenge », pas « le problème de départ »), A-semantique-19 (« Traditionally »), A-formats-16 (« many reasons… including »), A-semantique-29 (« peut », « may ») : écris une affirmation nouvelle `A-<axe>-NN` (numéro suivant de l'axe), dont l'énoncé ne dit que ce que ses extraits disent, avec la modalité et les mots de la source. Reprends les sources et extraits existants qui portent ce fait (aucune page nouvelle), mets `verifie: null`, `decoupe_de: A-...`, et l'usage que la confiance permet (le script le contrôle). Laisse l'ancienne affirmation telle quelle (refusée, hors narration). N'en découpe pas une si aucun énoncé plus étroit n'est utile à la leçon ; dis pourquoi dans ton rapport.
   - **A-interop-10** (chiffre du NIST), refusé à la seconde passe : la parenthèse « bâtiments […] industriels » reclasse les catégories de la source, et « américaine » n'est dans aucun extrait. Découpe-la en gardant les catégories telles que la page les découpe (« capital facilities », bâtiments commerciaux et institutionnels, installations industrielles) ; pour celle-ci seulement, tu peux ajouter des extraits de la **même page**, lue dans le cache par `lire_page.py <sources> <url> --chercher "<mot>"` : la phrase « (NIST) have commissioned a study » de l'avant-propos, et la phrase qui porte « in the U.S. ».
   - **A-semantique-25**, vérifiée avec réserve : à la rédaction du pack, garde les mots de la source, « pays membres » et « pour leurs propres besoins ».
2. **`source-pack.md`** : mets-le à l'état vérifié. Une phrase qui s'appuie sur une affirmation refusée (`verifie: false`) ou passée en `expert` ne se présente plus comme sûre : elle cite l'affirmation découpée si elle existe, sinon elle passe dans « ce qui attend l'expert » ou « ce qui ne se dit pas ». Mets à jour la section des exemples et cas réels, la terminologie, les nuances, la carte des sources et la remise au scénariste. Ajoute au § 5 la contradiction relevée par le vérificateur sur la limite de taille du shapefile (2 Go chez Esri, 8 Go et 4 Go chez GDAL) [A-formats-11].
3. **`porte-expert.md`** : garde les dix questions et leur ordre, mais mets à jour ce que disent les sources, les identifiants et les options selon l'état vérifié (en particulier Q1 définition, Q3 cas réels, Q7 chiffre du NIST, Q9 numéros ISO). Une option recommandée ne peut s'appuyer, sans réponse d'Ilyas, que sur des affirmations en narration vérifiées ou découpées. Laisse les lignes `Réponse d'Ilyas :` vides.

## Interdits

N'écris que `affirmations.yaml`, `source-pack.md` et `porte-expert.md`. Ne change ni un énoncé existant, ni un usage à la hausse sans nouvelle source, ni un champ `verifie` existant. Aucune page nouvelle, aucune opération git.

## Contrôle avant de rendre

```bash
python3 /home/user/Bimaccess-FME/harnais/skills/pack-recherche/scripts/check_pack.py /home/user/Bimaccess-FME/modules/M01/L02/sources --extraits; echo "code $?"
```

Corrige jusqu'au code 0. Vérifie aussi que chaque affirmation citée comme sûre dans `source-pack.md` est en narration avec `verifie: true`, ou découpée avec `verifie: null`.

## Rapport (court)

1. Affirmations découpées : ancienne, nouvelle, énoncé nouveau en une ligne, usage.
2. Ce qui a changé dans le pack et la porte, en cinq lignes au plus.
3. Tableau de confiance du script, code de sortie.
