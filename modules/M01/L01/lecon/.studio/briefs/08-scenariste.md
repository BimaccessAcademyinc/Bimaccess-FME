# Brief 08 · scénariste · réécriture du storyboard de FME001-M01-L01 : partir du problème

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon. Toutes les commandes se lancent depuis ce dossier.

## Ta tâche

Ilyas a lu le storyboard et le refuse sur la forme : « ça fait livre pour bébé ; j'aime beaucoup la vulgarisation des notions compliquées, mais j'ai un problème avec la façon que c'est fait ». Sa décision : **on commence par le problème.** Réécris `content/storyboard.md` en entier.

Ce qui ne va pas, et qu'il ne doit plus y avoir (grille du pilote, G22 à G25) :

- la leçon bâtie sur le sigle comme sur une devinette (« Trois lettres, trois mots », « Un nom venu d'un format », le mot « Sûr ») ;
- la traduction mot à mot (« Le premier mot se traduit par… Le deuxième reste le même… ») ;
- l'échafaudage scolaire (« D'abord… Ensuite… Enfin », « C'est le troisième mot du nom ») et les phrases courtes et plates qui tiennent la main ;
- les titres « mignons ».

Ce qu'il veut :

- **Partir du problème** : au début des années 1990, en Colombie-Britannique, entreprises forestières et gouvernement provincial doivent échanger des données géographiques ; les entreprises utilisent des logiciels différents et le gouvernement ne veut pas leur imposer un même éditeur (A-origines-20, A-origines-23, confirmée par Ilyas) ; une norme canadienne d'échange, SAIF (A-origines-17).
- **FME comme réponse** : il permet de partager des données géographiques entre des logiciels différents (A-nom-18) ; son nom d'origine, Feature Manipulation Engine, dit une fois, comme une description de son travail, pas comme une énigme.
- **Les notions pour comprendre comment** : ce que FME fait passer (l'entité géographique et ses trois parties), comment (lire, transformer la géométrie et les attributs, écrire), le moteur au milieu des formats. La vulgarisation : un mécanisme expliqué avec ce qu'il change pour l'équipe qui reçoit ou envoie la donnée, en mots du métier.
- **L'entreprise** : le contrat, les fondateurs, 1993, le nom tiré de SAIF (dit simplement, sans jeu sur « sûr »), 1996, le siège.
- Registre de professionnel : narration à la troisième personne, phrases de 22 mots au plus mais qui expliquent ; titres qui affirment le fond.

Tu décides du découpage, des formes et des accroches (REGLES § 2.8 : chaque scène ouvre sur un écart, jamais deux fois de suite la même forme). Garde ce qui a passé la relecture et n'est pas mis en cause : l'exercice de la conduite d'eau (où la personne reconnaît elle-même les parties d'une entité), le moteur au centre et sa couronne de formats (S05 actuelle, qui a servi d'essai aux thèmes), le pont vers L02. Les décisions d'Ilyas restent : « entité géographique » partout, « feature » une seule fois (dans le nom d'origine) ; pas d'Esri ; 1993 puis 1996 ; « le gouvernement de la Colombie-Britannique » ; Surrey seulement comme siège actuel ; les exemples illustratifs (bâtiment, conduite) gardés sans affirmer de fait ; Don Murray et Dale Lutz nommés une fois. Durée : 5 à 8 minutes, sans rien ajouter qui ne soit dans la remise.

Le thème graphique est choisi (charte FME001 « carte topographique ») : tu peux écrire la mise en scène avec ses objets (feuilles de format, routes de lecture et d'écriture, point géodésique, légende, carton de localisation), sans décrire de style.

## À lire, et rien d'autre

- /home/user/Bimaccess-FME/harnais/grille-ilyas-pilote.md : les remarques d'Ilyas, à respecter en premier
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/brief.md
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/storyboard.md : la version refusée, pour savoir ce qui change et ce qui reste
- /home/user/bimaccess-studio/plugins/studio/skills/scenario/SKILL.md et ses références (references/storyboard-template.md, references/writing-rules.md, references/conventions-bimaccess.md), où `${CLAUDE_SKILL_DIR}` vaut /home/user/bimaccess-studio/plugins/studio/skills/scenario
- /home/user/bimaccess-studio/chaine/agents/REGLES.md, § 2.3, 2.4, 2.8, § 3 à 5, § 11
- /home/user/Bimaccess-FME/modules/M01/L01/sources/remise-scenariste.md : ce que la voix peut dire (tout fait dit renvoie à un identifiant de cette liste) ; affirmations.yaml pour les extraits
- /home/user/Bimaccess-FME/design/CHARTE-FME001.md, § 5 (symboles) : les objets que l'écran peut montrer

## À écrire, seulement

- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/storyboard.md
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/reports/08-scenariste.md

Aucune opération git ; aucun autre fichier (le code des scènes s'adaptera après toi).

## Contrôles à lancer avant de rendre

- `npm run lint:story -- --max-minutes 8 --forbid Esri --forbid ArcGIS --forbid "se traduit" --term feature --max-term 1` : code 0
- `npm run sync` : code 0

## Rapport

Au format de la section 3 de /home/user/bimaccess-studio/plugins/studio/skills/produce/references/briefs.md. Ajoute : la table des scènes (titre, forme, accroche, durée) ; pour chaque remarque d'Ilyas (G22 à G25), où et comment elle est tenue ; l'ouverture de S01 citée en entier (titre et narration), pour qu'Ilyas la juge sans ouvrir le fichier.
