## Rapport · scénariste · brief 01

**L'idée en trois phrases** (partie `# L'idée` du storyboard) :

> FME portait à l'origine un nom qui décrit son travail : Feature Manipulation Engine, un moteur qui manipule des entités géographiques. Une entité géographique, c'est une chose du monde réel gardée dans des données, avec sa géométrie, ses attributs et son système de coordonnées. L'outil est né en Colombie-Britannique d'un projet d'échange de données forestières, et son éditeur, Safe Software, tient son nom du format de ce projet.

**Test du débutant** : pas fait. Il faut un lecteur neuf, et ce rôle ne peut pas lancer d'agent. La partie `# Test du débutant` dit comment le faire ; le Super Agent doit le lancer avant la voix.

### Fichiers écrits
- /home/user/Bimaccess-FME/modules/M01/L01/banc/storyboard-a/content/storyboard.md : storyboard complet, qui remplace la scène du gabarit. Il contient `# L'idée`, `# Jauge`, `# Objectifs` (avec le tableau Vocabulaire FR/EN), `# Budget`, sept scènes S01 à S07, `# Points ouverts` et `# Test du débutant`. Chaque scène a une ligne **Affirmations** qui relie ses phrases de fait à leurs identifiants A-….
- /home/user/Bimaccess-FME/modules/M01/L01/banc/storyboard-a/.studio/reports/01-scenariste.md : ce rapport.
- `npm run sync` a régénéré `src/generated/`, qui est un dérivé.

### Contrôles
- `npm run lint:story -- --max-minutes 8` → code 0 ; extrait : « 7 scène(s), 8 narration(s), 1 exercice(s), voix ≈ 4:18 à 150 mots/min » ; « aucune erreur, 2 avertissement(s) à examiner ».
- Le même contrôle, avec en plus `--forbid clash --forbid Esri --term "Feature Manipulation Engine" --max-term 1 --max-sentence-words 22 --max-screen-words 8`, sort aussi en code 0 avec les deux mêmes avertissements.
- Les deux avertissements portent sur S01 : « Manipulation » et « Moteur » sont dits deux fois dans le clip. C'est voulu : chacun fait partie du nom d'origine et revient dans sa traduction. La mise en scène donne au code des locutions qui ne sont dites qu'une fois : « en français : manipulation » et « se traduit par moteur ».
- `npm run sync` → code 0 ; extrait : « 7 scène(s), 8 clip(s) dont 0 avec voix, 1 exercice(s) … programme FME001 (#00A64F) ». La sync signale aussi que l'accent de `theme.json` (#0096C7) n'est pas la couleur du programme (#00A64F). Ce fichier appartient au graphiste.

| Scène | Titre | Forme | Durée au budget |
|---|---|---|---:|
| S01 | Trois lettres, trois mots | Ouverture (accroche : figure incomplète) | 0:35 |
| S02 | Ce qu'est une entité | Exposé avec schéma (idée reçue) | 0:45 |
| S03 | Où passe la conduite | Exercice, mode conséquence | 1:10 |
| S04 | Lire, manipuler, écrire | Geste fait devant la personne (enjeu sur le projet) | 0:50 |
| S05 | Un moteur au centre | Exposé avec schéma (figure incomplète) | 0:40 |
| S06 | Un nom venu d'un format | Exemple : le cas réel documenté (idée reçue) | 0:50 |
| S07 | La suite : formats et coordonnées | Pont | 0:25 |
| | | **Total** | **5:15** |

### Décisions à prendre par l'utilisateur
- **Durée.** La question : accepter une leçon d'environ 5:15 de voix et de choix, soit près de 6 minutes jouée, alors que le brief demande 6 à 8 minutes ? Options : 1. accepter cette durée ; 2. ouvrir des affirmations en attente pour rallonger, par exemple A-origines-03 (parcours des fondateurs, porte Q8). Je recommande l'option 1 : la remise ne porte pas plus de matière, et la règle « la durée du brief est un plafond » s'applique. Fichier à regarder : /home/user/Bimaccess-FME/modules/M01/L01/banc/storyboard-a/content/storyboard.md, partie `# Budget`. Rien n'est bloqué en attendant.
- **Exemples sans source.** La question : garder le bâtiment et son usage (S02) et la conduite d'eau (S03) ? Les conventions demandent un exemple tiré d'un projet de construction, et le pack n'en donne aucun. Ces exemples n'affirment aucun fait. Options : les garder, ou prendre l'objet que choisit Ilyas. Je recommande de les garder. Rien n'est bloqué : le graphiste peut avancer.
- **Noms des fondateurs (S06).** La question : dire Don Murray et Dale Lutz (A-origines-02), ou seulement « deux associés » ? REGLES § 3.2 demande des fonctions plutôt que des noms. Le brief demande pourtant « qui a créé FME ». Je recommande de garder les noms une fois. Le repli est écrit dans `# Points ouverts`.

### Signalements pour l'utilisateur ou un autre rôle
- **Ilyas.**
  - « Le mot anglais qui veut dire sûr » (S06) est une traduction et non une affirmation du pack. Elle sert l'accroche ; elle est à confirmer.
  - Deux phrases disent ce qu'une notion change pour le professionnel. Elles se tirent de A-nom-13 et de A-nom-07, mais les sources ne les disent pas telles quelles : « un format pris en charge rejoint tous les autres » (S05) et « l'équipe qui reçoit retrouve ce qui décrit l'objet » (S04).
  - « Une entité réunit trois parties » (S02) est une synthèse faite par le pack. J'ai laissé les entités sans géométrie hors contenu.
  - Le développement de SAIF reste dans le tableau Vocabulaire seulement.
- **Voix.**
  - « Feature Manipulation Engine » se dit à l'anglaise, une seule fois.
  - « FME » se dit lettre par lettre.
  - « SAIF » se dit « safe » : la phrase « Ce sigle se prononce safe » repose sur cette homophonie.
  - « Safe Software », « Surrey », « Don Murray » et « Dale Lutz » se disent à l'anglaise.
- **Graphiste.**
  - Le thème n'est pas choisi. Le storyboard décrit des objets et des schémas, pas un style.
  - S05 redessine la figure VIS-01 du pack. Aucune capture ni logo de Safe Software n'est repris.
  - L'accent de `theme.json` (#0096C7) est à remplacer par la couleur du programme (#00A64F), comme le signale la sync.
- **Code.** Pour « Manipulation » et « Moteur » en S01, utiliser les locutions ci-dessus. `content/beats.json` est vide : aucun repère à recaler.
- **Super Agent.**
  - Le test du débutant reste à lancer.
  - La mesure de l'étape (`harnais/mesures/tokens.py`) n'est pas faite : le brief limite mes écritures à deux fichiers.

**Scène la plus difficile à mettre en image : S05, « Un moteur au centre ».** Le schéma doit montrer « un large éventail de formats » sans nommer un seul format. Les sources n'en nomment aucun, la porte Q7 refuse tout chiffre, et les formats sont le sujet de la leçon suivante. La grille d'Ilyas demande pourtant de vrais mots (G6) et refuse les cases à deviner (G21). La couronne repose donc sur des feuilles génériques au tireté, avec une seule étiquette de groupe, « Formats pris en charge ». Le geste fort doit venir des liaisons : elles partent d'une feuille et ressortent vers toutes les autres. Le moteur, lui, est un composant logiciel à montrer sans fenêtre ni capture. Le risque est une étoile abstraite qui « ne montre rien ».

### Blocage
Aucun.
