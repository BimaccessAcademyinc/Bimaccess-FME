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
