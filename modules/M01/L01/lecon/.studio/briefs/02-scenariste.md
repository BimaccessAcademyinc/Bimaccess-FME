# Brief 02 · scénariste · storyboard de FME001-M01-L01, correction après le banc

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon. Toutes les commandes se lancent depuis ce dossier.

## Ta tâche

Deux storyboards ont été écrits sur le même brief, puis jugés en aveugle par trois relecteurs. **Y est la base retenue** (deux voix sur trois). Écris `content/storyboard.md` : Y corrigé de ses bloquants et de ses importants, avec ce que les relecteurs demandent de prendre à X. Une seule passe de correction (REGLES § 10.2) ; ce qui reste devient une question dans `# Points ouverts`, cinq au plus.

À faire, au minimum :

1. **Glissements d'exactitude relevés par l'examinateur** : S01 « Safe Software ne garde que les trois lettres » (A-nom-17 dit « à l'origine », pas l'abandon) ; le sens des « attributs utilisateur » (A-nom-07) ; garder chaque « selon l'éditeur », « Safe Software décrit ».
2. **Y S06 fourre-tout** : partager l'histoire en deux scènes comme X (le projet et SAIF, puis l'entreprise et ses dates), « fondateurs de Safe Software » et non « créateurs de FME » ; aucune image qui contredit la voix (le « Sûr » barré de rouge).
3. **Accroches** : jamais deux scènes voisines sur la même forme ni sur le même vide or (G4, G20) ; Y S04 et S05 ouvrent sur la même image.
4. **Y S04** : « attributs propres au format de départ » et « second jeu d'attributs » arrivent sans explication ni enjeu ; les dire en mots du métier, avec en quoi ça compte, ou les retirer.
5. **Le pont** : celui de X, une vraie question vers L02, à la place du résumé de Y S07.
6. **L'exercice** : celui de Y (la conduite d'eau), réécrit pour que la personne **reconnaisse** elle-même les parties d'une entité sur une donnée montrée ; aucun choix ne donne la réponse par ses mots (« sans », « avec »).
7. Pas d'anglais dit à la voix hors du nom d'origine, une fois.

Décisions appliquées, révisables (Ilyas les reverra) : durée d'environ 5 à 6 minutes, sans rien ajouter qui ne soit dans la remise ; les exemples illustratifs (bâtiment, conduite d'eau) restent, sans affirmer de fait ; Don Murray et Dale Lutz nommés une fois.

## À lire, et rien d'autre

- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/brief.md
- /home/user/bimaccess-studio/plugins/studio/skills/scenario/SKILL.md et ses références (references/storyboard-template.md, references/writing-rules.md, references/conventions-bimaccess.md), où `${CLAUDE_SKILL_DIR}` vaut /home/user/bimaccess-studio/plugins/studio/skills/scenario
- /home/user/bimaccess-studio/chaine/agents/REGLES.md, § 2.3, 2.4, 2.8, § 3 à 5, § 11
- /home/user/Bimaccess-FME/modules/M01/L01/sources/remise-scenariste.md (ce que la voix peut dire) et, pour les extraits, affirmations.yaml
- /home/user/Bimaccess-FME/modules/M01/L01/banc/aveugle/Y.md (la base) et X.md
- /home/user/Bimaccess-FME/modules/M01/L01/banc/aveugle/jugement-professionnel.md, jugement-examinateur.md, jugement-ilyas.md

## À écrire, seulement

- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/storyboard.md
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/reports/02-scenariste.md

Aucune opération git ; aucun autre fichier.

## Contrôles à lancer avant de rendre

- `npm run lint:story -- --max-minutes 8 --forbid Esri --forbid ArcGIS --term feature --max-term 1` : code 0
- `npm run sync` : code 0

## Rapport

Au format de la section 3 de /home/user/bimaccess-studio/plugins/studio/skills/produce/references/briefs.md. Ajoute une table : chaque défaut des trois jugements (bloquant ou important), et ce que tu en as fait (corrigé, où ; ou laissé, pourquoi). Et la scène la plus difficile à mettre en image.
