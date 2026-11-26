## Rapport · scénariste · brief 08

**L'idée en trois phrases** : Au début des années 1990, en Colombie-Britannique, des entreprises forestières qui utilisent des logiciels différents doivent échanger des données géographiques avec le gouvernement, qui ne veut pas leur imposer un même éditeur. De ce projet naissent Safe Software, puis FME, un outil qui permet de partager des données géographiques entre des logiciels différents. Pour cela, FME lit chaque entité géographique (sa géométrie, ses attributs, son système de coordonnées), la transforme et l'écrit dans le format attendu, comme un moteur au centre des formats.

**Test du débutant** : non fait (ce rôle ne peut pas lancer de lecteur neuf) ; à faire par le Super Agent avant la voix.

### Fichiers écrits
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/storyboard.md : réécrit en entier. La leçon part maintenant du problème, raconté à travers Don Murray et Dale Lutz (consigne d'Ilyas reçue en cours de tâche, G26). Elle compte **sept scènes au lieu de huit** : l'histoire de l'entreprise (ancien S06 et ancien S07) se raconte dans le fil, en S01 et S02, et ne vient plus en annexe à la fin. Correspondance avec l'ancienne version : ancien S01 (sigle) supprimé ; S01 et S02 sont nouveaux (ils reprennent la matière des anciens S06 et S07) ; ancien S02 → S03 ; ancien S03 (exercice) → S04 ; ancien S04 → S05 ; ancien S05 → S06 ; ancien S08 (pont) → S07. Il n'existe ni voix ni repère (`beats.json` vide), donc aucun clip à renommer.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/reports/08-scenariste.md : ce rapport.

### Contrôles
- `npm run lint:story -- --max-minutes 8 --forbid Esri --forbid ArcGIS --forbid "se traduit" --term feature --max-term 1` → code 0. Extrait : « 7 scène(s), 8 narration(s), 1 exercice(s), voix ≈ 3:40 à 150 mots/min » ; « aucune erreur, 7 avertissement(s) à examiner ». Les sept sont gardés :
  - S01 : « Colombie-Britannique » est dit deux fois. Le territoire se cale sur « en Colombie-Britannique, Don Murray », la carte du gouvernement sur « le gouvernement de la Colombie-Britannique » (la formule décidée par Ilyas).
  - S01 : une question dans la narration. C'est voulu : c'est la question d'ouverture prévue par REGLES 2.4, et S02 et S06 y répondent. Une variante en affirmation est proposée dans les points ouverts.
  - S04 : « Géométrie » et « Système de coordonnées » sont dits deux fois dans la narration déclenchée. Ce texte a passé la relecture et reste inchangé ; il se cale sur « le tracé est la géométrie » et « le repère du cartouche ».
  - S05 : le titre affiché « FME lit, transforme, puis écrit. » n'a pas de locution dans la narration. Il se pose au début de la scène, sur la première phrase.
  - S06 : « Moteur » est dit trois fois. La mise en évidence se cale sur « au sens du glossaire ».
  - S07 : une question dans la narration. C'est la question du pont, reprise telle qu'elle a passé la relecture.
- `npm run sync` → code 0. Extrait : « 7 scène(s), 8 clip(s) dont 0 avec voix, 1 exercice(s), 0 illustration(s), signature carte, programme FME001 (#00A64F) ».

### Table des scènes

| Scène | Titre | Forme | Accroche | Voix |
|---|---|---|---|---:|
| S01 | Échanger sans imposer de logiciel | Ouverture en récit | un enjeu de projet : deux parties, des logiciels différents, un échange à faire | 0:35 |
| S02 | Du contrat naissent Safe Software et FME | Exemple (le cas réel documenté, en frise) | une frise ouverte, avec le contrat et les fondateurs à son départ | 0:39 |
| S03 | Une entité géographique porte trois parties | Exposé avec schéma | une idée reçue : le contour d'un bâtiment seul sur la carte | 0:40 |
| S04 | Situer une conduite d'eau reçue | Exercice (conséquence) | l'exercice est sa propre accroche | 0:34 + choix |
| S05 | FME lit, transforme, puis écrit | Geste fait devant la personne | deux formats qui ne s'accordent pas | 0:28 |
| S06 | Un moteur au centre des formats | Exposé avec schéma (VIS-01) | une figure incomplète, le seul manque or avant le pont | 0:32 |
| S07 | Format et système de coordonnées | Pont | deux manques or | 0:12 |

La voix totale fait environ 3:40. Le budget annonce 4:50, en comptant les pauses et le temps du choix. La leçon jouée approche 5 minutes, au bas de la fourchette de 5 à 8 minutes. Rien n'est ajouté hors de la remise.

### Ouverture de S01, en entier

Titre de scène : « Échanger sans imposer de logiciel ». Titre affiché : « Chaque entreprise garde son logiciel. »

> Au début des années 1990, en Colombie-Britannique, Don Murray et Dale Lutz travaillent sur un projet d'échange de données géographiques forestières.
>
> L'échange se fait entre les entreprises forestières et le gouvernement de la Colombie-Britannique.
>
> Les entreprises utilisent des logiciels différents, et le gouvernement ne veut pas leur imposer un même éditeur. Chaque entreprise garde donc son logiciel, et l'échange doit pourtant réunir leurs données.
>
> Le projet a son format, SAIF : une norme canadienne d'échange de données géographiques.
>
> Comment des logiciels différents peuvent-ils partager les mêmes données géographiques ?

### Les remarques d'Ilyas, où et comment elles sont tenues

| # | Où | Comment |
|---|---|---|
| G22 · partir du problème | S01, S02, S06 | S01 pose le problème vécu par des gens du métier : un échange de données géographiques entre des parties qui gardent chacune leur logiciel (A-origines-20, A-origines-23), avec SAIF (A-origines-17). S02 apporte FME comme la réponse : « partager des données géographiques entre des logiciels différents » (A-nom-18). Les notions viennent ensuite comme le moyen de comprendre comment : ce qui passe d'un logiciel à l'autre (S03, pratiqué en S04), comment ça passe (S05), et pourquoi chacun peut garder son logiciel (S06, qui referme le problème de S01). |
| G23 · pas de devinette | partout | Aucune scène n'est bâtie sur le sigle. Le nom d'origine est dit une fois, en S02, dans le fil, comme une description du travail : « Son nom d'origine, Feature Manipulation Engine, décrit son travail : un moteur qui manipule des entités géographiques. » À l'écran, il s'écrit en ligne de rubrique sous le jalon 1996, sans lettre détachée. Le nom de l'entreprise est dit simplement : « Son nom vient de SAIF, le format du projet, qui se prononce comme Safe. » Il n'y a plus ni « Sûr », ni seconde ligne de repère, ni « Trois lettres ». |
| G24 · vulgariser sans infantiliser | S03, S05, S06 | Il n'y a plus de traduction mot à mot ni de renvoi aux mots du nom : « Le premier mot… », « c'est le deuxième mot du nom » et « C'est le troisième mot du nom » sont supprimés. Le « D'abord… Ensuite… Enfin » de l'ancien S02 est remplacé par trois phrases qui ont chacune pour sujet la partie qu'elles nomment (« Sa géométrie porte… », « Ses attributs la décrivent… », « Son système de coordonnées lui donne… »). Chaque mécanisme est rattaché à ce qu'il change pour l'équipe : « c'est elle qui passe d'un logiciel à l'autre », « ce sont ces trois parties qu'une équipe cherche », « celui que le logiciel de l'équipe sait ouvrir », « chaque partie d'un échange garde son logiciel ». La narration est au présent et à la troisième personne, avec des phrases de 22 mots au plus. |
| G25 · titres qui affirment | les sept titres de scène et les titres affichés | Les titres de scène sont des affirmations sur le fond : « Échanger sans imposer de logiciel », « Du contrat naissent Safe Software et FME », « Une entité géographique porte trois parties », « FME lit, transforme, puis écrit »… Il en va de même pour les titres affichés : « Chaque entreprise garde son logiciel. », « L'entité géographique a trois parties. ». |
| G26 · ouverture en récit | S01, S02 | Don Murray et Dale Lutz sont les personnages. Ils sont nommés en entier en S01, puis « Murray et Lutz » en S02, et apparaissent chaque fois dans une carte de rôle à deux silhouettes. Le récit tient par l'enchaînement des faits sourcés, sans aucun dialogue, pensée ou détail de vie. Leur parcours d'avant (MDA, BCIT) reste hors de la leçon. |

Ce qui est gardé de la version relue :
- l'exercice de la conduite d'eau (S04) : question, choix, conséquences et narrations sont inchangés ; seul le titre change ;
- le moteur au centre et sa couronne de formats (S06) ;
- le pont vers L02 (S07), dont la narration est inchangée ;
- les décisions de la porte : « entité géographique » partout et « feature » une seule fois ; pas d'Esri ; 1993 puis 1996 ; « le gouvernement de la Colombie-Britannique » ; Surrey seulement comme siège actuel ; les exemples illustratifs gardés.

### Décisions à prendre par l'utilisateur

1. **Les fondateurs sur le projet forestier (S01).** La remise ne nomme pas Murray et Lutz dans l'énoncé de A-origines-20 ; seul son extrait Techcouver le fait (« While working on a geospatial forestry data sharing project… Don Murray and Dale Lutz saw firsthand a challenge »).
   - Options : garder la phrase sur cet extrait, ou s'en tenir à l'énoncé et faire entrer les fondateurs en S02.
   - Recommandation : garder la phrase, puisque c'est elle qui fait d'eux les personnages.
   - Rien n'est bloqué en attendant.
2. **Les liens de récit écrits par le scénariste.** Ce sont trois phrases : « Chaque entreprise garde donc son logiciel… » (S01), « FME fait ce que le projet forestier demandait » (S02) et « chaque partie d'un échange garde son logiciel, et le moteur fait passer les données » (S06).
   - Aucune ne dit ce que firent les entreprises du projet, ni que FME traduisait vers SAIF.
   - Recommandation : les garder. Ilyas les confirme ou les corrige.
3. **Le contrat et le projet forestier.** Ils sont racontés l'un après l'autre sans être soudés, car A-origines-04 est en attente de l'expert. Si Ilyas confirme A-origines-04, S02 peut dire « remportent ce contrat ».
4. **Le titre de la leçon.** Dans le brief et `studio.config.json`, « Feature Manipulation Engine : un nom qui dit le métier » repose encore sur le sigle (G23).
   - Proposition : « FME : partager les données géographiques entre logiciels ».
   - Je n'ai pas fait le changement, ces fichiers n'étant pas à moi : il revient au Super Agent.
5. Les autres propositions sont dans `# Points ouverts` : la question d'ouverture ou une affirmation, les exemples illustratifs, le globe, les gloses et les anciens titres.

### Signalements pour l'utilisateur ou un autre rôle
- Code : la numérotation change (sept scènes, ancien S01 supprimé, voir la correspondance plus haut). Il faut réécrire `src/lesson/lesson.ts` et les scènes, et recaler les locutions. S01 et S02 sont nouveaux.
- Graphiste : la charte § 5 dit « Logiciel : aucun mot en L01 ». Désormais S01 montre trois fenêtres de logiciel différentes, sans nom ni logo, sur « des logiciels différents ».
- Graphiste : la carte de rôle « Don Murray · Dale Lutz » revient en S02.
- Graphiste : en S06, les routes de lecture et d'écriture remplacent les liaisons. `content/design/spec.md` décrit encore l'ancien découpage (son S01 porte l'ancien titre) et est à refaire.
- Voix : SAIF se dit « safe » (S01, S02). « Feature Manipulation Engine » est le seul passage en anglais (S02). Murray, Lutz, Safe Software et Surrey se disent à l'anglaise.
- Super Agent : je n'ai pas lancé la mesure `harnais/mesures/tokens.py` de l'étape, car le brief limite l'écriture à deux fichiers. Elle reste à faire pour « FME001-M01-L01 scénario ».
- Super Agent : le test du débutant est à faire, en donnant la narration et les textes de S01 à S07.

### Blocage
Aucun.
