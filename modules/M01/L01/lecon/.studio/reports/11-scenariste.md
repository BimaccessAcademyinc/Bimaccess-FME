## Rapport · scénariste · brief 11

### Fichiers écrits
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/storyboard.md : passe de correction. Le récit est plus vivant, et Murray et Lutz agissent de S01 à S06. La chaîne SAIF est réparée (B1) : SAIF arrive en S02, après la question d'ouverture, comme le format vers lequel il faut traduire. Le nom d'origine est dit une fois, sans glose (B2). Il ne reste qu'une attribution dans la voix (I1), et la source de chaque scène va en mention de marge. Les sept titres sont des affirmations (G25). Les défauts des trois relectures sont traités, et `# Points ouverts` est ramené à cinq lignes. Il y a toujours sept scènes, sans voix et sans repères.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/reports/11-scenariste.md : ce rapport.

### Contrôles
- `npm run lint:story -- --max-minutes 8 --forbid Esri --forbid ArcGIS --forbid "se traduit" --forbid "propriétaire" --term feature --max-term 1` → code 0. Extrait : « 7 scène(s), 8 narration(s), 1 exercice(s), voix ≈ 3:27 à 150 mots/min » ; « aucune erreur, 10 avertissement(s) ». Les dix avertissements sont gardés :
  - S01, S03, S05 : les mentions de source ne sont dites par aucune narration. C'est voulu : elles sont en marge dès l'image 0.
  - S01, S07 : une question dans la narration. Ce sont la question d'ouverture et celle du pont (REGLES 2.4).
  - S01 : « Colombie-Britannique » est dit deux fois. Le territoire se cale sur « travaillent en Colombie-Britannique ».
  - S02 : « SAIF » est dit deux fois. La feuille se cale sur « Le gouvernement a son format ».
  - S04 : « Géométrie » et « Système de coordonnées » sont dits deux fois dans la narration déclenchée. Ce texte est inchangé depuis la relecture.
  - S05 : le titre affiché n'a pas de locution propre. Il se tape sur la première phrase.
- `npm run sync` → code 0. Extrait : « 7 scène(s), 8 clip(s) dont 0 avec voix, 1 exercice(s), 0 illustration(s), signature carte, programme FME001 (#00A64F) ».
- Compte des attributions dans la voix (`awk … | grep -ciE "selon (sa|la|leur)|d'après|au sens du"`) → `0`. La seule attribution qui reste est « Safe Software décrit FME comme un moteur central » (S06, A-nom-13), là où l'éditeur se décrit lui-même. Le motif du contrôle ne la compte pas.

### S01 et S02 en entier

**S01 · Chaque entreprise forestière garde son logiciel** (titre affiché : « Chaque entreprise garde son logiciel. »)

> Au début des années 1990, Don Murray et Dale Lutz travaillent en Colombie-Britannique sur un projet forestier.
>
> Les entreprises forestières doivent y partager leurs données géographiques avec le gouvernement de la Colombie-Britannique.
>
> Or les entreprises utilisent des logiciels différents, et le gouvernement ne veut pas leur imposer un même éditeur.
>
> Chaque entreprise garde donc son logiciel, et l'échange doit pourtant se faire.
>
> Murray et Lutz voient de près ce problème à résoudre.
>
> Comment faire passer les mêmes données géographiques d'un logiciel à l'autre ?

À l'écran, la liaison qui part des entreprises vers le gouvernement s'arrête sur un manque or. La tension reste ouverte jusqu'en S02.

**S02 · Safe Software commence par traduire vers SAIF** (titre affiché : « Safe Software commence par traduire. »)

> Le gouvernement lance un appel d'offres, et Murray et Lutz remportent le contrat.
>
> De ce contrat naît leur entreprise, Safe Software, fondée en 1993.
>
> Le gouvernement a son format, SAIF, une norme canadienne d'échange de données géographiques.
>
> Pour échanger avec lui, les données de chaque logiciel doivent être traduites vers ce format.
>
> Murray et Lutz commencent par ce travail : leur entreprise développe une technologie de traduction pour SAIF. Son nom, Safe, vient d'ailleurs de ce format.
>
> Trois ans après la fondation, en 1996, leur entreprise sort la première version de FME, à l'origine Feature Manipulation Engine.
>
> FME fait passer les données géographiques d'un logiciel à l'autre.
>
> Aujourd'hui, l'éditeur dit simplement FME. Son siège est à Surrey, en Colombie-Britannique.

Le récit se referme en S06 : « Pour le problème que Murray et Lutz avaient vu de près, c'est la réponse : un logiciel différent n'empêche pas l'échange. »

### Défauts des trois relectures et ce que j'en ai fait

| Relecture · # | Défaut | Fait |
|---|---|---|
| Ilyas · B1 | SAIF est donné avant la question, et la chaîne vers FME est cassée | Corrigé. SAIF quitte S01 et arrive en S02, après la question, comme le format du gouvernement (A-origines-24). Les données de chaque logiciel doivent y être traduites, et Safe Software commence par cette traduction (A-origines-24). FME vient ensuite (A-nom-18). Ni « propriétaire » ni « norme que tous utilisent » |
| Ilyas · B2 | Le nom est glosé, et la suite déroule le sigle mot à mot | Corrigé. Le nom est dit une fois : « à l'origine Feature Manipulation Engine ». La phrase de glossaire du moteur (A-nom-12) est retirée et passe à « Écarté par choix ». S03, S05 et S06 s'ouvrent sur ce qu'il faut pour traduire : ce que contient la donnée, comment elle passe, ce qui relie les formats |
| Ilyas · I1 | Cinq attributions dans la voix | Corrigé. Il en reste une, en S06 (A-nom-13). Le reste est dit au présent, et une mention de source « D'après … » est en marge en S01, S02, S03, S05 et S06 |
| Ilyas · I2 | « Dans FME, elle s'appelle une entité géographique » est inexact | Corrigé : « La donnée, elle, représente le bâtiment réel : on l'appelle une entité géographique. » |
| Ilyas · I3 | Pas de lien vers le public | Appliqué en S06 : « C'est aussi la situation de toute équipe qui reçoit des données géographiques d'un autre bureau, sur un autre logiciel. » À confirmer (Points ouverts) |
| Ilyas · I4 | Les fondateurs ne font rien et disparaissent | Corrigé. Ils voient le problème (S01, extrait Techcouver), remportent le contrat, commencent la traduction, et leur entreprise sort FME (S02). Ils reviennent en S06, carte de rôle comprise |
| Ilyas · I5 | Le pont annonce la suite, et son titre est une étiquette | Corrigé. La phrase d'annonce est retirée, et le titre devient « Une entité géographique vit dans un format » (écran : « Une entité vit dans un format. ») |
| Ilyas · M1 | « sur la Terre » revient trop souvent | En partie : « sur le terrain » dans la narration d'entrée de S04. « Terre » reste là où A-nom-08 le dit |
| Ilyas · M2 | La voix décrit l'animation | Corrigé : « Autour de FME, les formats pris en charge forment un large éventail. » |
| Ilyas · M3 | « n'importe quel format » n'est pas borné | Corrigé : « depuis n'importe lequel d'entre eux » (les formats pris en charge) |
| Ilyas · M4 | Phrase de 23 mots en S03 | Coupée en deux |
| Ilyas · M5 | Deux faits sans lien dans une phrase | Coupée en deux |
| Ilyas · remarque de fond | Une accroche par l'écart DAO / BIM | Non écrite. Elle est à proposer à Ilyas (Points ouverts) |
| Examinateur · B1 | Le titre « Du contrat naissent l'entreprise et FME » | Corrigé. Le contrat fait naître l'entreprise seulement, et le titre devient « Safe Software commence par traduire vers SAIF » |
| Examinateur · B2 | « FME fait ce que le projet forestier demandait » | Retiré. FME est dit par ce qu'il fait (A-nom-18), sans lien de cause avec le projet. La traduction et 1996 se suivent dans le temps |
| Examinateur · I1 | « réunir leurs données » est un ajout | Corrigé : « et l'échange doit pourtant se faire » |
| Examinateur · I2 | « rien ne les relie encore » | Retiré. Le manque or reste à l'écran seul |
| Examinateur · I3 | Pratique de métier non sourcée en S03 | Retirée. « c'est elle qui passe… » devient « C'est sur elle que FME travaille » (A-nom-08) |
| Examinateur · I4 | « abstraction d'une chose » est un glissement | Remplacé par la phrase en clair de la relecture d'Ilyas, les normes étant citées en marge (OGC). Le choix entre les deux relectures est à confirmer (Points ouverts) |
| Examinateur · I5 | Conséquence a de S04 | Réécrite sur l'énoncé de A-nom-08 : « C'est le système de coordonnées qui lui donne sa position sur la Terre. » |
| Examinateur · M1 | « de chaque entité » au lieu de « des données spatiales » | Corrigé : « des données » |
| Examinateur · M2 | « se prononce comme Safe » | Retiré |
| Examinateur · M3 | Titres S01, S04 et S07 | Réécrits en affirmations |
| Examinateur · M4 | Glossaire du moteur et « Ainsi » | Les deux sont retirés |
| Examinateur · M5 | Trois fenêtres, SAIF non développé | Les fenêtres ne sont plus comptées, et c'est noté comme exemple d'illustration. L'expansion de SAIF reste dans le tableau Vocabulaire, pour la version anglaise (REGLES 3.5) |
| Professionnel · B1 | Titre S02 non sourcé | Corrigé (voir Examinateur B1) |
| Professionnel · I1 | Pourquoi SAIF ne suffit pas | Corrigé par B1 : SAIF est le format vers lequel il faut traduire |
| Professionnel · I2 | Le problème n'a pas d'enjeu concret | En partie. La tension est dite sans fait ajouté (« l'échange doit pourtant se faire »), le manque or la montre, et le lien au public arrive en S06. Aucune conséquence inventée |
| Professionnel · I3 | S06 redit S01, S02 et S05 | Corrigé. S06 ne garde que le moteur central et le retour du problème, sous une autre forme (« un logiciel différent n'empêche pas l'échange ») |
| Professionnel · I4 | « rien ne les relie » contredit S02 | Retiré |
| Professionnel · M1 à M3, M5 | Prononciation, attributions, titres, lourdeur en S03 | Corrigés |
| Professionnel · M4 | Durée d'environ 5 minutes | Signalé (Points ouverts) |

### Table des scènes

| Scène | Titre | Forme | Accroche | Voix |
|---|---|---|---|---:|
| S01 | Chaque entreprise forestière garde son logiciel | Ouverture en récit | un enjeu de projet : l'échange arrêté sur un manque or | 0:33 |
| S02 | Safe Software commence par traduire vers SAIF | Exemple (le cas réel, en frise) | une frise ouverte, contrat et fondateurs au départ | 0:47 |
| S03 | Une entité géographique porte trois parties | Exposé avec schéma | une idée reçue : un contour seul sur la carte | 0:31 |
| S04 | Une équipe doit situer la conduite d'eau reçue | Exercice (conséquence) | l'exercice | 0:34 + choix |
| S05 | FME lit, transforme, puis écrit | Geste fait devant la personne | deux formats qui ne s'accordent pas | 0:23 |
| S06 | Un moteur central relie les formats pris en charge | Exposé avec schéma (VIS-01) | une figure incomplète | 0:32 |
| S07 | Une entité géographique vit dans un format | Pont | deux manques or | 0:08 |

La voix fait environ 3:27 au total. Avec l'écran « Lancer », les pauses et le choix, la leçon jouée approche 5 minutes, au bas de la fourchette de 5 à 8 minutes. Rien n'est ajouté hors de la remise.

### Décisions à prendre par l'utilisateur

1. **Les liens de récit.** Trois phrases relient les faits entre eux :
   - « les données de chaque logiciel doivent être traduites vers ce format » (S02). A-origines-24 dit une traduction « pour » SAIF, sans en donner le sens ; le sens « vers SAIF » suit le brief.
   - Le passage de la traduction à FME, en 1996, est raconté comme une suite dans le temps, sans lien de cause.
   - « c'est la réponse » (S06).

   Recommandation : les garder. Si Ilyas ouvre A-origines-08, S02 pourra dire « De ce travail sort FME ».
2. **Les fondateurs comme acteurs.**
   - « voient de près » repose sur l'extrait Techcouver.
   - « leur entreprise sort FME » attribue FME à Safe Software, pas à eux en personne.

   Recommandation : garder ces formulations.
3. **L'objectif 1 du brief.** Il porte encore sur « les trois mots » du sigle.
   - Je l'ai lu comme « expliquer ce que fait FME ».
   - `content/brief.md` est à reformuler. Ce fichier n'est pas à moi : c'est au Super Agent ou à Ilyas de le faire.
4. Les autres points sont dans `# Points ouverts` :
   - le lien au public en S06 ;
   - la phrase en clair pour A-nom-16 ;
   - la conséquence a de S04 ;
   - les exemples d'illustration ;
   - la durée et la question d'ouverture.

Rien n'est bloqué en attendant.

### Signalements pour l'utilisateur ou un autre rôle

- **Graphiste.** Plusieurs changements sont à reporter dans `content/design/spec.md` :
  - S01 n'a plus de feuille SAIF. La liaison s'arrête sur un manque or, et S06 n'est donc plus le seul manque or avant le pont.
  - S02 reçoit la feuille SAIF, les routes de traduction depuis les fenêtres de S01 (étiquette « Traduction ») et un nouveau titre.
  - S06 reçoit la carte de rôle des fondateurs, sans la mise en évidence « au sens du glossaire ».
  - Une mention de source de marge s'ajoute en S01, S02, S03, S05 et S06, à caler sur la convention de la carte.
  - Les titres affichés de S02, S03, S06 et S07 changent.
- **Code.** Le nombre de textes d'écran change :
  - S01 : 6 textes ;
  - S02 : 11 ;
  - S03 : 7 ;
  - S05 : 7 ;
  - S06 : 5 ;
  - S07 : 4.

  `src/lesson/scenes/s01.tsx` existe : son `sceneTexts(…, { screen })` et ses locutions sont à revoir (« Le projet a son format » n'existe plus). `npm run check:scenes` n'a pas été lancé, il est hors de mes contrôles.
- **Super Agent.** Le test du débutant n'est toujours pas fait.

### Blocage
Aucun.
