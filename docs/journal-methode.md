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
| Ilyas précise que l'étape des thèmes ne se fait que si aucun thème n'est déjà en place pour la leçon | | skill `harnais/skills/themes-planches/` : § 0 « Faut-il cette étape ? » ; L02 à L05 suivent la charte FME001 sans nouveau choix |

## 2026-11-26 · Signature « carte » du lecteur (FME001)

| Constat | Mesure | Décision |
|---|---|---|
| Le lecteur ne connaissait que la coque CAD et une coque neutre ; une troisième signature s'ajoute proprement sur le modèle de la coque CAD (thème dérivé des jetons de la charte, polices embarquées, rendu des composants, feuille de style de coque) | 17,7 min d'agent, 66 appels d'outils ; `check`, `build` et le parcours automatique verts, les deux autres signatures toujours vertes | fichiers du template listés pour le report dans le plugin (rapport `.studio/reports/06-code.md`) |
| `defineLesson` refuse une scène absente : on ne peut pas prouver une coque avec une seule scène sans affaiblir un garde-fou | | scènes d'attente génériques (`attente.tsx`), remplacées une à une par les scènes composées |
| Les amorces de quadrillage traversent les textes de la scène | vu sur la capture de S01 | à régler à l'étape des planches (zones de réserve sous les textes) |

## 2026-11-26 · Storyboard refusé sur la forme (FME001-M01-L01)

| Constat | Mesure | Décision |
|---|---|---|
| Ilyas refuse le storyboard sur la forme : « ça fait livre pour bébé » ; il aime la vulgarisation, pas la façon (leçon bâtie sur le sigle comme une devinette, traduction mot à mot, ton scolaire, titres mignons). Trois relecteurs neufs et deux scénaristes ne l'avaient pas vu : la grille de CER001 ne nommait pas ce défaut | 1 storyboard au banc, 3 relectures, 1 correction ; spécification des scènes arrêtée en cours (17 illustrations écartées) | grille du pilote G22 à G25 (`harnais/grille-ilyas-pilote.md`) ; réécriture en partant du problème |
| L'ouverture « problème » demandait un fait à source unique (logiciels différents des entreprises forestières) | 2 affirmations ajoutées depuis le cache ; une confirmée par Ilyas (deuxième porte, Q11) | une demande de l'expert qui change le fil ouvre une deuxième porte ; `check_pack.py` compte les questions porte par porte |
| Leçon de chaîne : le ton se juge avant la charte et la coque, pas après ; une porte courte de l'expert sur l'ouverture d'une scène (titre et narration de S01) aurait évité la spécification perdue | | ajouter à la chaîne une porte du ton : S01 en entier montrée à l'expert dès le storyboard, avant tout dessin |

## 2026-11-26 · Scènes en parallèle, porte du sens (FME001-M01-L01)

| Constat | Mesure | Décision |
|---|---|---|
| Trois graphistes puis trois codeurs en parallèle, chacun sur un groupe de scènes ; spécifications écrites à part et réunies, repères sur locutions (aucun fichier commun écrit à plusieurs), contrôles sous verrou `flock` | codeurs : 5,2 à 5,9 min chacun en parallèle, au lieu d'environ 17 min en série ; graphistes : 13 à 20 min chacun | garder le découpage par groupes ; chaque groupe passe au code dès qu'il rend |
| Banc du code : S05 à S07 codées sur Sonnet, S01 à S04 sur Opus | qualité comparable sur la planche par phrase ; Sonnet : 2,3 M tokens lus en cache contre 4,5 à 5,0 M pour Opus | Sonnet suffit pour le code d'une scène bien spécifiée ; Opus reste pour la spécification et le jugement |
| Sans voix, la planche par phrase se fait sur le minutage estimé du lecteur | `harnais/skills/planche-par-phrase-studio/planche.mjs` : 7 planches, une capture au milieu de chaque phrase | l'outil sert aussi avec la voix (même format d'alignement) |
| Défauts vus à la planche par phrase : éléments calés en milieu de phrase (S02, S07), compositions qui laissent la moitié de la face vide (S01, S02), couleurs de routes sans légende (S06), mentions de source sans lien | 4 scènes à corriger sur 7 | les adresses des sources vont dans `content/sources.json`, tirées du pack ; calage au début de la phrase rappelé aux graphistes |
| Ilyas : aucune voix pour l'instant, revue de l'animation avec sous-titres | | la voix ne se génère qu'à sa demande ; préparation gardée |

## 2026-11-27 · Voix et planches image (méthode B)

- Voix ElevenLabs des 7 clips (3 min 31 s, 3 628 caractères) en 1 min 30 s ; années ajoutées au dictionnaire ; la sync ramène désormais les mots dits (alias, balises d'accent) au texte écrit : sous-titres et locutions suivent le storyboard (défaut corrigé dans `scripts/sync.mjs`, à reporter dans le template).
- Méthode B (`modules/M01/L01/lecon-image/`, skill `harnais/skills/planche-image/`) : un plan court par scène écrit par le modèle de langage ; dessin sans texte par le modèle d'image (S01 d'abord, puis S01 en référence de style pour les six autres, en parallèle) ; boîtes par la vision ; papier rendu transparent ; scène générique `src/engine/planche.tsx` (révélation par masque sur locution, textes exacts posés par le code, mise en évidence, logo, source).
- Mesures : appels d'image et de vision 59 s pour 7 scènes ; 21,6 min de session du « go » au push, outillage compris (correctif de sync, script, scène générique, lecteur des variantes) ; coût estimé dans le registre et l'appels.csv.
- Limites : pas de tracé au trait (balayage de boîte), pas de mouvement géométrique (S04, S05 : apparitions successives), feuilles de S06 sans passage du tireté au plein, lignes de repère de S03 absentes.

## 2026-11-27 · Planches tracées, bibliothèque, signature d'image

- Constat d'Ilyas : les images du modèle d'image sont d'un niveau très supérieur aux SVG des agents ; l'animation par boîtes découvertes fait bricolage.
- Décision : vectoriser la planche (vtracer, local, 6 s pour 7 scènes), ranger les tracés par élément (couverture de la boîte, couleur réservée pour les routes), et animer au trait : tracé à vitesse constante, aplat posé quand le trait se ferme, déplacement géométrique d'un élément ou de sa copie (S04, S05). Les trames denses restent en image.
- Méthode pour la rentabilité (proposition d'Ilyas) : signature d'image du programme dans `design/style-image.md` et image de référence `design/references/style-carte.png` ; bibliothèque `design/bibliotheque/` (fondateurs réutilisés en S02 et S06, feuille SAIF de S02 en S03) ; cache des dessins par empreinte de l'invite ; gabarits de composition `harnais/skills/planche-image/gabarits.md`.
- Mesures : 22,4 min de session (outillage compris), un seul appel externe (repérage de S04, environ 0,005 $) ; tracés de la leçon environ 1,3 Mo.
- Reste : route bleue de S03 écrasée par le vectoriseur (tracer les routes par le code à terme) ; feuilles de S06 sans passage du tireté au plein.

## 2026-11-27 · Planches en 4K, relecture des symboles

- Constat d'Ilyas : images extrêmement pixelisées. Cause : sans réglage, le modèle d'image renvoie environ 1376 × 768, agrandi à 1920 px puis affiché à 2× sur un écran haute définition. Correction : `imageSize` « 4K » (5504 × 3072, gardé à 3840 × 2160), vectorisation faite sur la 4K puis ramenée à la composition ; nette sur écran haute définition.
- Relecture à l'agrandissement : le modèle avait dessiné un homme et une femme pour les deux fondateurs, un sceau à l'aigle pour le contrat du gouvernement de la Colombie-Britannique, et des pourcentages sous la frise (repris de l'invite). Corrigé dans les plans ; règle ajoutée au skill (relecture des symboles en premier, positions en mots sur une échelle).
- Mesures : 12 images 4K (essai compris, trois regénérations), environ 3,80 $ ; 11 repérages, environ 0,05 $ ; 30 min de session.

## 2026-11-27 · Voix à la recette V4 du cours, constat sur l'assemblage

- Voix regénérée selon la recette V4 retenue par Ilyas pour CER001 : eleven_v4, Alexandre Boutin, stabilité 0,5, français imposé, termes anglais sans balise d'accent, continuité entre clips. Contrôle d'écriture pour l'oreille du cours (`controle_oreille.py`) : rien à signaler, aucun mot changé. 3 547 caractères, 1 560 crédits (0,44 par caractère). Reste de la recette, non fait : respirations de 0,9 s entre les idées, 0,4 s de silence en fin de clip.
- Lecteur : bouton pour revoir la scène et vitesse ×0,5 à ×2 (hauteur de la voix gardée).
- Constat d'Ilyas sur la version planches image : « c'est l'assemblage, un travail de cochon ». Cause : l'étape du graphiste (spécification par scène, place de chaque texte, états sur les mots) et le skill des scènes ont été remplacés par un assemblage automatique (textes posés par règle autour des boîtes de la vision, décor posé d'un coup à l'image 0, trous dans les traits sous les éléments à venir). Les images ne sont pas en cause.
