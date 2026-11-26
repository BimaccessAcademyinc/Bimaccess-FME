# Journal de méthode du pilote

D'où vient chaque changement du harnais essayé ici : la date, ce qui a été constaté, la mesure, la décision.

## 2026-11-26 · Pack de recherche, première passe (FME001-M01-L01)

| Constat | Mesure | Décision |
|---|---|---|
| La chaîne CER001 suppose un pack fourni (REGLES § 1.2) ; le plugin Studio, sans source, retombe sur les « connaissances générales » | | skill `pack-recherche` : axes, registre d'affirmations, confiance calculée, porte de l'expert |
| Trois chercheurs en parallèle, un par axe | 36 affirmations, 12 recherches, 59 lectures de pages, environ 2 min par axe | garder le parallèle par axe |
| La lecture web des agents résume la page : les chercheurs ont dû la relancer pour obtenir la phrase exacte, sans pouvoir le prouver | 47 extraits sur 47 retrouvés mot pour mot dans le texte brut après coup, mais au prix de relances | `lire_page.py` (texte brut, cache, PDF) et `check_pack.py --extraits` : la présence de l'extrait se prouve par script, le vérificateur ne juge plus que le sens |
| La fiche PDF de l'éditeur est illisible par la lecture web | | `lire_page.py` lit les PDF (`pdftotext`) |
| Plusieurs sites refusent la lecture automatique (403) | 3 sources connues inexploitables | on respecte le refus, on ne se déguise pas en navigateur ; le cadrage nomme d'avance des sources indépendantes de rechange |
| L'axe « nom » n'a aucune affirmation forte : l'éditeur est presque la seule source | 0 forte sur 15 | le cadrage doit prévoir des sources indépendantes |
| Chaque sous-agent généraliste démarre avec environ 100 000 tokens de contexte en cache (prompt système et liste d'outils) | 99 538 à 108 734 tokens écrits en cache par chercheur | essayer des définitions d'agents à outils restreints et mesurer l'écart |
| Le compteur d'appels d'outils de `tokens.py` sautait des blocs (une réponse s'étale sur plusieurs lignes) | 0 recherche comptée au lieu de 12 | usage compté une fois par réponse, outils sur chaque ligne |

## 2026-11-26 · Consolidation, vérification, porte (FME001-M01-L01)

| Constat | Mesure | Décision |
|---|---|---|
| Deux « articles de presse » étaient des communiqués de Safe Software, comptés en B par les chercheurs : la confiance était gonflée | 2 sources reclassées, 1 affirmation descendue en expert | `check_pack.py` signale un communiqué sur une source B ou C (rubrique « About … », contact presse, fil de presse) ; règle d'écriture au skill |
| Des pages déjà en cache portaient ce que les chercheurs avaient déclaré manquant | fiche PDF : fondateurs, année, siège | `lire_page.py --cache` avant toute lacune |
| Le vérificateur refuse ce que les scripts ne voient pas | 12 refus sur 36 ; 6 extraits tronqués, des mots durcis (« early market » devenu « premiers travaux »), une année prise dans l'URL | consignes au skill : un extrait par fait, une source ne compte que si son extrait dit le fait, l'année se lit dans le texte |
| La consolidation est l'étape la plus chère | 9,7 min, environ 7 millions de tokens lus en cache, 52 réponses | essai à faire : un script de fusion fourni par le skill, l'agent ne fait que juger |
| La porte comptait dix questions, la règle de la chaîne en veut quatre | 4 posées, 6 appliquées et révisables | règle reportée au skill |
| Ilyas veut choisir le thème des planches sur pièces, avant toute planche | | étape 4 de la feuille de route : quatre thèmes, une planche d'exemple chacun |
| La revérification refuse 3 réparations sur 6 : ajouter des extraits ne sauve pas un énoncé qui dit trop | 3 vérifiées, 3 refusées | un énoncé large se découpe dès la consolidation ; la réparation ne traite que les extraits tronqués |

## 2026-11-26 · Storyboard au banc (FME001-M01-L01)

| Constat | Mesure | Décision |
|---|---|---|
| Premier essai du banc sur une étape qui se juge : deux scénaristes sur le même brief, jugés en aveugle par trois relecteurs neufs (la relecture de la chaîne sert de jugement) | | `banc/grille-storyboard.md`, `banc/juger_storyboards.sh` |
| Le candidat Fable s'arrête à la limite d'usage du compte, valable jusqu'au 2026-11-30 | arrêt au premier tour | candidat remplacé par Sonnet ; l'agent de direction artistique de la chaîne, fixé sur Fable, aurait été bloqué de même : chaque agent fixé sur un modèle doit avoir un modèle de repli écrit dans sa définition |

## 2026-11-26 · Thèmes des planches (FME001)

| Constat | Mesure | Décision |
|---|---|---|
| Première série de quatre thèmes écartée par Ilyas : les quatre restaient dans la charte CAD 2D construite pour la formation buildingSMART ; c'est le brief de la direction artistique qui l'imposait (« tous restent dans la signature CAD 2D ») | 1 direction artistique et 4 graphistes, environ 15 min d'agents, refaits | une charte appartient à un cours : un nouveau cours ne l'hérite pas ; l'étape des thèmes propose des identités nées du sujet, et la charte du cours s'écrit seulement après le choix |
| Deuxième série faite avec l'outil de design (canevas), quatre identités nées du SIG et de l'échange de données, sur la scène qui montre à la fois une entité, des formats et le moteur (S05) | 4 artboards | la scène d'essai d'un thème doit montrer ce qui distingue les thèmes (la S03 ne montrait ni format ni moteur) |
