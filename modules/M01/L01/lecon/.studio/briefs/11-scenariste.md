# Brief 11 · scénariste · correction du storyboard réécrit, après la porte du ton et trois relectures

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon. Toutes les commandes se lancent depuis ce dossier.

## Ce qu'Ilyas a dit à la porte du ton

Sur l'ouverture de S01 : **« Oui, plus vivant »** : la direction (récit avec Don Murray et Dale Lutz, partir du problème) est la bonne, mais le récit est trop sec. Titre de la leçon décidé : « FME : partager les données géographiques entre logiciels ».

## Ta tâche

Une passe de correction de `content/storyboard.md`, qui traite :

1. **Le récit plus vivant**, sans rien inventer : de l'élan (des phrases qui avancent, des verbes d'action, un enjeu qui monte, une tension puis sa résolution), Murray et Lutz **acteurs** du début à la fin : ils voient le problème de près (extrait Techcouver de A-origines-20 : « saw firsthand a challenge to be solved »), remportent le contrat (A-origines-15), commencent par une technologie de traduction pour SAIF (A-origines-24), fondent Safe Software en 1993, sortent FME en 1996 ; ils reviennent quand le moteur referme le problème. Toujours aucune scène, aucun dialogue, aucune pensée, aucun détail de vie absent de la remise.
2. **Bloquant B1, la chaîne SAIF** : SAIF est le format du gouvernement de la Colombie-Britannique ; chaque entreprise garde son logiciel ; il faut donc **traduire** les données de chaque logiciel vers ce format, et c'est ce travail de traduction que Safe Software commence (A-origines-24). FME est ce qui en sort : un outil qui fait passer les données géographiques d'un logiciel à l'autre (A-nom-18). Ne pas dire « format propriétaire » ni « norme commune que tous utilisent » ; « norme canadienne d'échange » reste possible (A-origines-17). La question d'ouverture ne doit pas arriver après que sa réponse a été donnée.
3. **Bloquant B2, le nom déroulé mot à mot** : le nom d'origine se dit une fois, sans être traduit ni glosé (« Feature Manipulation Engine »), et les scènes suivantes ne sont pas bâties comme le déroulé de ses trois mots. Les notions (entité géographique, lire-transformer-écrire, moteur) s'expliquent parce que le récit en a besoin : pour traduire une donnée d'un logiciel à l'autre, il faut savoir ce qu'elle contient, comment on la fait passer, et ce qui relie tous les formats.
4. **Important I1, les attributions dans la voix** : une seule attribution de source dans toute la narration, là où l'éditeur se décrit lui-même (le moteur central, A-nom-13) ; les faits de la documentation sur le fonctionnement de FME se disent au présent ; la source de chaque scène va à l'écran, en mention de source dans la marge (convention de la carte : « D'après Safe Software » et équivalents, un texte d'écran par scène qui en a besoin).
5. Les autres défauts des trois relectures (`.studio/relecture/ilyas.md`, `examinateur.md`, `professionnel.md`) : corrige les bloquants et les importants ; le reste, cinq points au plus, va dans `# Points ouverts`.
6. Titres (G25) : chaque titre de scène et chaque titre affiché est une affirmation, pas une étiquette ni un infinitif.

Garde ce qui tient : l'ouverture en récit, l'exercice de la conduite d'eau, le moteur au centre, le pont vers L02, les décisions de la porte (« entité géographique » partout et « feature » une seule fois, pas d'Esri, 1993 puis 1996, gouvernement de la Colombie-Britannique, Surrey comme siège seulement, exemples illustratifs). Durée : 5 à 8 minutes, rien hors de la remise.

## À lire, et rien d'autre

- /home/user/Bimaccess-FME/harnais/grille-ilyas-pilote.md
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/relecture/ilyas.md, examinateur.md, professionnel.md
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/storyboard.md et content/brief.md
- /home/user/Bimaccess-FME/modules/M01/L01/sources/remise-scenariste.md et affirmations.yaml (extraits)
- les références du skill scénario si besoin : /home/user/bimaccess-studio/plugins/studio/skills/scenario/references/writing-rules.md, storyboard-template.md
- /home/user/bimaccess-studio/chaine/agents/REGLES.md, § 2.3, 2.4, 2.8, § 3 à 5

## À écrire, seulement

- content/storyboard.md
- .studio/reports/11-scenariste.md

Aucune opération git ; aucun autre fichier.

## Contrôles

- `npm run lint:story -- --max-minutes 8 --forbid Esri --forbid ArcGIS --forbid "se traduit" --forbid "propriétaire" --term feature --max-term 1` : code 0
- `npm run sync` : code 0
- Compte des attributions dans la voix (doit afficher 1 au plus) : `awk '/^## Narration/{n=1;next} /^## |^# /{n=0} n' content/storyboard.md | grep -ciE "selon (sa|la|leur)|d'après|au sens du"`

## Rapport

Au format habituel (section 3 du gabarit des briefs). Ajoute : la table des défauts des trois relectures et ce que tu en as fait ; **S01 et S02 en entier** (titres et narration), pour qu'Ilyas juge l'élan du récit ; la table des scènes.
