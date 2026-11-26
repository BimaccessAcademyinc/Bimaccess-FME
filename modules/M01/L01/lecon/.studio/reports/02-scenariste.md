## Rapport · scénariste · brief 02

**L'idée en trois phrases** : FME portait à l'origine un nom qui décrit son travail : Feature Manipulation Engine, un moteur qui manipule des entités géographiques. Une entité géographique, c'est une chose du monde réel gardée dans des données, avec sa géométrie, ses attributs et son système de coordonnées. L'outil est né en Colombie-Britannique d'un projet d'échange de données forestières, et son éditeur, Safe Software, tient son nom du format de ce projet.

**Test du débutant** : non fait (ce rôle ne peut pas lancer de lecteur neuf) ; à faire par le Super Agent avant la voix, réponses à recopier dans `# Test du débutant`.

### Fichiers écrits
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/storyboard.md : storyboard complet, base Y corrigée en une passe (REGLES § 10.2). Huit scènes au lieu de sept : l'histoire de Y S06 est coupée en S06 (projet et SAIF) et S07 (contrat, fondateurs, dates, siège) ; le pont devient S08. Aucune voix ni repère n'existait : aucun clip à renommer.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/reports/02-scenariste.md : ce rapport.

### Contrôles
- `npm run lint:story -- --max-minutes 8 --forbid Esri --forbid ArcGIS --term feature --max-term 1` → code 0 ; extrait : « 8 scène(s), 9 narration(s), 1 exercice(s), voix ≈ 3:45 à 150 mots/min » ; « aucune erreur, 6 avertissement(s) à examiner ». Les six, gardés :
  - S01 « FME », « Manipulation », « Moteur » dits deux fois : les éléments se calent sur des locutions uniques (« Trois lettres désignent », « en français : manipulation », « par moteur », puis « un moteur qui », « qui manipule »). « dit simplement FME » est la formule de A-nom-17, gardée exprès.
  - S03 « Géométrie », « Système de coordonnées » dits deux fois dans la narration déclenchée : calage sur « le tracé est la géométrie » et « le repère du cartouche son système de coordonnées » ; la seconde mention dit la règle.
  - S08 question dans la narration : voulue, c'est la question du pont (REGLES 2.4, brief point 5).
- `npm run sync` → code 0 ; extrait : « 8 scène(s), 9 clip(s) dont 0 avec voix, 1 exercice(s) » ; avertissement de thème hors de mon rôle (voir signalements).

### Table des scènes

| Scène | Titre | Forme | Accroche | Voix |
|---|---|---|---|---:|
| S01 | Trois lettres, trois mots | Ouverture | nom opaque, sans case vide | 0:35 |
| S02 | Ce qu'est une entité | Exposé avec schéma | idée reçue (un contour dessiné) | 0:42 |
| S03 | Où passe la conduite | Exercice (conséquence) | l'exercice | 0:34 + choix |
| S04 | Lire, manipuler, écrire | Geste | deux formats qui ne s'accordent pas | 0:24 |
| S05 | Un moteur au centre | Exposé avec schéma (VIS-01) | figure incomplète, seul manque or avant le pont | 0:28 |
| S06 | Un nom venu d'un format | Exemple documenté | idée reçue (Safe = sûr), rien de barré | 0:30 |
| S07 | D'un contrat à FME | Frise | frise ouverte | 0:20 |
| S08 | Où vit une entité | Pont (question de X) | deux manques or | 0:12 |

Total voix ≈ 3:45 ; leçon jouée proche de 5 minutes.

### Défauts des trois jugements (bloquants et importants) et ce qui en est fait

| Jugement | Storyboard | Défaut | Ce qui en est fait |
|---|---|---|---|
| Examinateur | Y | Bloquant · S01 « ne garde que les trois lettres » (abandon non dit par A-nom-17) | Corrigé, S01 : « Selon la documentation de l'éditeur, leur nom d'origine est Feature Manipulation Engine. Aujourd'hui, l'éditeur, Safe Software, dit simplement FME. » |
| Examinateur | Y | S04 « attributs donnés par l'utilisateur » change le sens de A-nom-07 | Corrigé par retrait, S04 : attributs utilisateur et attributs de format sortent ensemble (Jauge, « Écarté par choix » ; Points ouverts) |
| Examinateur | Y | S06 trait rouge sur « Sûr » | Corrigé, S06 : rien de barré, aucun rouge ; « Sûr » reste accroché à « Safe », une seconde ligne de repère part de « SAIF » vers le même mot |
| Examinateur | Y | S03 « le nom du système » de coordonnées, hors remise ou L02 | Corrigé, S03 : cartouche titré « Repère » avec un globe au trait, sans nom de système |
| Examinateur | Y | S02 « Elles appellent cette abstraction l'entité géographique » prête le terme aux normes ; glose « forme simplifiée » non signalée | Corrigé, S02 : les normes disent l'abstraction ; le terme est rattaché au premier mot du nom (décision Q3). Glose retirée ; la nouvelle (« ce que les données en retiennent ») est signalée en Points ouverts |
| Examinateur | X | Bloquant · « Complété, il devient une entité » | Non repris (base Y) |
| Examinateur | X | Bloquant · « Ils en font toujours partie » pour tous les attributs | Non repris ; les attributs utilisateur sont hors de cette leçon |
| Examinateur | X | A-nom-13 sans attribution, composant et moteur central fondus | Évité, S05 : « Safe Software décrit FME comme un moteur central » ; le glossaire porte le second sens, à part |
| Examinateur | X | « La première qui manque est la première à réclamer » : procédure sans affirmation | Non repris (voir signalements, Ilyas le demandait) |
| Examinateur | X | Valeurs inventées à l'écran (« Usage : bureaux ») | Laissé, S02 et S03 : exemples d'illustration gardés par décision du brief, sans fait affirmé ; sans valeurs, l'exercice n'a pas de vraie donnée à reconnaître (G6). Points ouverts, ligne 1 |
| Professionnel | Y | S04 attributs de format et second jeu sans explication ni enjeu | Corrigé par retrait, S04 (choix d'Ilyas, que le brief laissait ouvert : les dire ou les retirer) |
| Professionnel | Y | S03 la narration d'entrée donne les trois parties | Corrigé, S03 : l'entrée ne nomme plus les parties, les zones de la donnée n'ont pas de titre de rubrique, et les choix désignent ce qu'elles montrent (le tracé, l'usage et le matériau, le repère) ; les noms des parties arrivent après le choix |
| Professionnel | Y | S06 fourre-tout | Corrigé : S06 (projet, SAIF, nom) et S07 (contrat, fondateurs, 1993, 1996, Surrey) |
| Professionnel | Y | S03 nom de système de coordonnées hors remise | Corrigé, S03 (voir plus haut) |
| Professionnel | Y | S07 pont sans question, finit sur un rappel | Corrigé, S08 : pont de X, une vraie question vers L02 |
| Professionnel | X | Bloquant · choix qui donnent la réponse (« sans », « avec ») | Évité dans l'exercice de Y réécrit : aucun choix ne porte « sans », « avec » ni le nom d'une partie |
| Professionnel | X | « demandes de travaux » lu comme un ordre de chantier | Évité, S05 : « le composant qui exécute chaque traitement demandé » |
| Professionnel | X | Pas d'« en quoi ça compte » | Gardé de Y : S01 (« avant même de l'ouvrir »), S02 (« ces trois parties qu'il faut chercher »), S04 (l'équipe qui attend un autre format), S05 (« Une équipe peut y lire ses données ») |
| Professionnel | X | Trois accroches de suite sur un manque or | Évité : un seul manque or avant le pont (S05), voisins sans or, formes toutes différentes de scène en scène |
| Professionnel | X | Conseil « réclamer » sans appui | Non repris |
| Ilyas | Y | S06 fourre-tout | Corrigé (S06 et S07) |
| Ilyas | Y | S06 trait rouge sur « Sûr » (G21, G11) | Corrigé (S06) |
| Ilyas | Y | G4 cases réservées en S01, S04, S05 ; S04 et S05 ouvrent sur la même image (G20) | Corrigé : S01 sans case vide (les lettres se prolongent en mots) ; S04 ouvre sur deux feuilles qui se font face, rien entre elles ; S05 sur une liaison arrêtée sur un manque or (REGLES 4.8), pas une case |
| Ilyas | Y | S04 attributs de format face aux attributs utilisateur | Corrigé par retrait (S04) |
| Ilyas | Y | S03 « une ligne de description », « le nom du système » : pas de vrais mots (G6, G16) | Corrigé, S03 : « Usage : eau potable », « Matériau : fonte », cartouche « Repère » et globe |
| Ilyas | X | Bloquant · S03 sans donnée, réponse dans les choix | Évité : S03 montre une feuille de donnée, choix sans indice |
| Ilyas | X | G3 S04 redit S01 sur « engine » ; G12 anglais à la voix | Évité : aucun anglais à la voix hors du nom d'origine, dit une fois ; développé de SAIF au tableau Vocabulaire seulement |
| Ilyas | X | G20 même manque or ; « Complété, il devient » ; « demandes de travaux » | Évités (voir plus haut) |

Pris aussi aux mineurs, dans la même passe : « Lu dans l'ordre » retiré (S01, la mise en évidence suit l'ordre dit) ; cote remplacée par une ligne de repère (S01) ; globe de X à la place de la croix de repère (S02) ; « Ce qui reste : » et « Dès le départ, le métier de l'éditeur est donc » retirés ; « Les deux associés en tirent le nom » remplacé par « c'est de lui que l'entreprise tient son nom » ; contrat séparé du projet forestier (S07) ; Surrey hors de la frise (S07) ; « Espaces de travail » retiré (S05) ; « comme un moteur » remplacé par l'attribution « Safe Software décrit FME comme un moteur central ».

### Scène la plus difficile à mettre en image
S03. La donnée de la conduite doit se lire comme une vraie donnée, avec trois zones qu'on reconnaît sans titre de rubrique. Le système de coordonnées n'a pas de nom (rien dans la remise, et c'est la matière de L02) : il ne tient qu'au globe du cartouche, qui doit rappeler celui de S02 sans souffler la réponse. Ensuite, les noms des parties et l'accolade arrivent l'un après l'autre sans faire deux mises en évidence à la fois. Viennent après S04 (deux formats qu'on voit différents sans en nommer aucun) et S05 (la figure VIS-01 n'a jamais été vue, seulement sa légende).

### Décisions à prendre par l'utilisateur
Aucune pour continuer : les cinq `# Points ouverts` sont appliqués avec l'option recommandée et révisables (exemples et valeurs ; globe pour le système de coordonnées ; gloses et synthèses ; attributs de format et utilisateur hors de L01 ; huit scènes et environ 5 minutes jouées). Fichier à lire : /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/storyboard.md.

### Signalements pour l'utilisateur ou un autre rôle
- Ilyas : la phrase de X « La première qui manque est la première à réclamer à qui vous a remis la donnée », que le jugement « regard ilyas » proposait de prendre, n'est pas reprise. L'examinateur la classe comme une procédure sans affirmation, et le professionnel ne la garde que si elle est signalée comme consigne pédagogique. Il n'y avait plus de place dans les cinq points ouverts : elle peut revenir en narration déclenchée de S03 si Ilyas la veut.
- Ilyas : les noms de Don Murray et Dale Lutz sont dits une fois (S07), comme le brief le décide ; la voix dit « fondateurs de Safe Software » et non « créateurs de FME ».
- Voix : « Feature Manipulation Engine » à l'anglaise, une fois (S01) ; « FME » lettre par lettre ; « SAIF » se dit « safe » (S06, la phrase « se prononce comme Safe » repose dessus) ; « Safe Software », « Don Murray », « Dale Lutz », « Surrey » à l'anglaise ; « 1990 », « 1993 », « 1996 » en nombres.
- Graphiste : `npm run sync` signale « accent #0096C7 différent de la couleur du programme FME001 (#00A64F) » dans `content/design/theme.json`. Le globe sert deux fois, au même dessin (S02 rubrique, S03 cartouche). S05 porte le crédit cliquable « D'après Safe Software » (REGLES 4.6).
- Super Agent : test du débutant à faire ; mesure `tokens.py` de l'étape non lancée, parce que le brief limite l'écriture à deux fichiers et que le registre en est un troisième.
- Version anglaise : le tableau Vocabulaire garde les termes anglais ; chaque traduction sera une proposition à relire par Ilyas.

### Blocage
Aucun.
