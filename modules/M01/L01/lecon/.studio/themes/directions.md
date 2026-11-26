# Quatre thèmes de planches · module FME001

Un thème est une façon de montrer, pas une nouvelle charte : les quatre restent dans la signature CAD 2D de `DESIGN.md` (fond blanc et grille de points, jetons de couleur, aucun coin arrondi, aucune ombre floue hors du décalage 6 × 8 px des feuilles, Azeret Mono et IBM Plex Sans, une seule mise en évidence à la fois). Couleur de programme : vert ACI `#00A64F`.

Un thème vaut pour tout le module (L01 à L05). Il dit comment se dessinent, d'une leçon à l'autre, les choses dont la voix parle le plus : **une entité géographique**, **un format**, **le moteur**, **une personne**, **une date**. Il ne fixe ni le sens d'une scène, ni ses textes, ni ses instants : le storyboard de chaque leçon reste la source.

Les quatre, de la plus sage à la plus audacieuse :

| | Thème | L'idée en une phrase | D'où il vient |
|---|---|---|---|
| 1 | Feuille de donnée | Toute donnée est une feuille titrée, avec ses rubriques ; le monde n'y paraît qu'en petits dessins au trait | les mots du storyboard (« feuille de donnée au bandeau titré », « dessinée comme une feuille de plan », « cartouche ») et ce que le public connaît déjà : plans, cartouches, échanges de fichiers |
| 2 | Feuille de carte | Toute entité est vue comme le cartographe la voit : une face de carte, sa marge, et un carton de localisation qui dit où elle est sur la Terre | les conventions de dessin de la cartographie et de la géomatique : cadre de carte à double filet, informations de marge, carton de localisation, lettrage des toponymes, barre d'échelle |
| 3 | Le flux | Toute donnée circule : l'entité est une carte à ports qui entre, passe par le moteur et ressort ; un format est la forme d'un port | les verbes de la leçon (« lire », « manipuler », « écrire », S04) et les diagrammes de flux que dessinent les gens de l'échange de données (nœuds, ports, liaisons) |
| 4 | La vue éclatée | L'entité se dessine assemblée, puis s'ouvre en vue éclatée isométrique pour montrer ses parties ; le système de coordonnées est la pièce qui l'arrime à la Terre | les mots de la leçon (« une entité porte trois parties », « ce que les données en retiennent », « la rattache à la Terre »), la vue éclatée du dessin d'ensemble, et le motif central de la charte, le passage du plan 2D au volume |

Rien n'est commun aux quatre par choix de la direction. Ce qui se retrouve dans chacun vient d'ailleurs et ne s'écarte pas en choisissant : les textes et la voix du storyboard, les composants du lecteur (panneau de choix, zone d'action en bas à droite, sous-titres), et la règle de la chaîne pour une personne (une silhouette d'échelle dans une carte de rôle nommée, jamais un point).

## La scène d'essai · S03 Où passe la conduite

**Retenue : S03**, comme le dit le rapport du scénariste (`.studio/reports/02-scenariste.md`, « Scène la plus difficile à mettre en image »). Je la garde, pour trois raisons :

- c'est la seule scène où l'image doit **se lire sans ses noms** : trois zones d'une donnée que l'apprenant reconnaît avant qu'on les nomme. Un thème qui échoue ici échoue sur l'objectif 3 de la leçon, et sur tout le module, qui ne parle que de données reçues, lues, transformées ;
- le système de coordonnées n'y a **ni nom ni chiffre** (rien dans la remise, matière de L02) : il ne tient qu'au dessin du globe. C'est le dessin le plus neuf du module, et chaque thème doit l'inventer à sa façon ;
- elle porte en plus le panneau de choix, la conséquence, trois noms posés un à un, une accolade et une seule mise en évidence qui se déplace : la composition la plus chargée de la leçon.

Ce que S03 ne teste pas : le format, le moteur, la personne et la date n'y paraissent pas. Aucune scène de L01 ne les réunit tous ; la partie « Comment il montre » de chaque thème les décrit, et S05 (le moteur) est la seconde scène à essayer si Ilyas hésite entre deux thèmes.

### Ce que la scène impose aux quatre planches (storyboard et lecteur, pas le thème)

- Textes à l'écran, tels quels : `Conduite d'eau`, `Usage : eau potable`, `Matériau : fonte`, `Repère`, `Géométrie`, `Attributs`, `Système de coordonnées`. Question et choix a, b, c du storyboard, dans le panneau de choix.
- Une feuille de donnée au bandeau titré, trois zones **sans titre de rubrique** : le cadre principal et le tracé de la conduite (une ligne) ; un petit tableau de deux lignes ; un cartouche **en bas à droite** de la feuille, titré « Repère », avec un petit globe au trait et un point posé dessus. La voix dit « le repère du cartouche » : le cartouche existe dans les quatre thèmes. Aucune carte de fond.
- Le globe de S03 est le même dessin que celui de S02, sans nom de système : chaque thème dessine donc aussi celui de S02.
- Panneau de choix (moteur, `ChoicePanel`, sans verdict) à droite ; VALIDER puis CONTINUER dans la zone d'action, en bas à droite à 48 px des bords ; rien d'important sous y 860 (sous-titres à partir de y 880).
- Texte jamais sous 23 px.
- Mots de la voix auxquels répond la fin de scène (narration déclenchée) : « le tracé est la géométrie », « sont ses attributs », « le repère du cartouche », « se lit donc dans deux parties », « La géométrie la porte », « le système de coordonnées la rattache à la Terre ».
- La mise en évidence unique se déplace dans l'ordre de la voix : le cadre principal sur « le tracé est la géométrie », le tableau sur « sont ses attributs », le cartouche sur « le repère du cartouche », le cadre principal sur « La géométrie la porte », le cartouche sur « la rattache à la Terre ». **Sur l'état final, elle est sur le cartouche.**
- **Pour comparer les quatre planches**, chacune montre le même choix sélectionné : **a · Le tracé de la conduite**, le piège attendu, avec sa conséquence écrite (« Le tracé est la géométrie : il porte l'information de position de la conduite. Seul, il ne dit pas où cette position se trouve sur la Terre. »).

---

## Thème 1 · Feuille de donnée

**Concept.** Une donnée géographique se reçoit comme un document : une feuille titrée, avec ses rubriques. On lit la feuille comme on lit un plan reçu sur un chantier. Émotion visée : la familiarité (« je sais lire ça »), puis l'écart (« ce n'est pas un dessin, c'est un objet »).

**D'où il vient.** Du storyboard lui-même, qui écrit déjà chaque donnée comme une « feuille au bandeau titré » (S02, S03, S04, S07) et le système de coordonnées comme un « cartouche » ; de la règle de la chaîne pour un document (feuille titrée, rubriques lisibles) ; de ce que le public sait déjà, d'après le brief : plans, cartouches, échanges de fichiers. Ce n'est pas la direction « la planche » de CER001 : ici la feuille est la donnée, pas la page du cours, et il n'y a ni indice de révision ni cartouche de cours.

**Comment il montre**

| Chose | Dessin |
|---|---|
| Une entité géographique | Une feuille à bandeau titré (nom de l'entité), contour 3 px encre ; rubriques séparées par des filets : la géométrie dans un cadre principal (tracé au trait), les attributs en tableau de lignes « Nom : valeur », le système de coordonnées dans un cartouche en bas à droite (petit globe au trait). Quand la scène nomme les parties, les rubriques portent leur titre en Azeret Mono ; en S03, non |
| Un format | La même feuille, d'une autre facture : autre bordure (filet simple, double filet, bande hachurée ANSI31 en marge gauche) et autre trame de fond des rubriques. Le nom du format dans le bandeau, à partir de L02 (en L01, aucun nom de format) |
| Le moteur | Un bloc rectangulaire 3 px encre, titré « Moteur », percé d'une fente d'entrée à gauche et d'une fente de sortie à droite : une feuille y entre d'une facture et en ressort d'une autre |
| Une personne | Une carte de rôle dessinée comme une petite feuille titrée (le rôle dans le bandeau), une silhouette d'échelle au trait, en élévation, et le nom en Azeret Mono dessous |
| Une date | Un repère sur une frise horizontale : triangle vide cyan posé sur l'axe (la convention du repère de niveau, couchée sur le temps), le texte « 1993 · Fondation de Safe Software » au-dessus, en Azeret Mono encre |

**Pour les leçons suivantes.** L02 : deux feuilles de factures différentes côte à côte, dont les rubriques ne s'alignent pas (formats, modèles de données) et dont les cartouches portent deux globes différents (systèmes de coordonnées). L03 : la fenêtre de l'atelier, redessinée, reçoit et rend des feuilles ; le flux de features se montre comme une pile de feuilles qui avance. L04 : un contrôle qualité se lit comme une rubrique vide (valeur « non renseigné » de la charte) ; une intégration, deux feuilles qui fusionnent en une. L05 : le modèle IFC en 3D colorée (registre D1) reçoit une feuille de donnée et son cartouche. Dessins à préparer : trois ou quatre factures de feuille distinctes et sobres.

**Risques.** Le plus sage, et donc le moins géographique : le monde réel n'y paraît qu'en vignettes, et l'apprenant du BIM peut garder l'idée que la donnée SIG est « un document de plus ». Les factures de format (bordures, trames) se distinguent mal au-delà de trois. La fente du moteur est un dessin neuf, sans convention de métier derrière.

### Fiche de planche

**Composition 1920 × 1080.** Trois masses : à gauche, une colonne d'étiquettes (x 96 à 300) ; au centre, la feuille « Conduite d'eau » (x 330 à 1110) ; à droite, le panneau de choix (x 1200 à 1824). La feuille est posée à plat, droite, avec l'ombre décalée 6 × 8 px des feuilles.

| Objet | Place (x, y, largeur × hauteur) | Dessin | Répond à |
|---|---|---|---|
| Feuille | 330, 96, 780 × 604 | contour 3 px `ink`, fond `paper`, ombre décalée 6 × 8 px | « une conduite d'eau » (entrée) |
| Bandeau | 330, 96, 780 × 64 | fond `panel`, filet bas 1,4 px `ink` ; « Conduite d'eau » Azeret Mono 400, 30 px, `ink`, à 24 px du bord gauche | « une conduite d'eau » |
| Cadre principal | 354, 184, 732 × 286 | filet 1,4 px `line` ; dedans, le tracé : polyligne `ink` 4 px, bouts nets, angles vifs, qui entre par le bord gauche du cadre, fait deux coudes et sort par le bord droit | « une conduite d'eau » ; nommé sur « le tracé est la géométrie » |
| Tableau | 354, 494, 366 × 182 | deux lignes de 60 px séparées par un filet 1 px `line-faint` ; « Usage : eau potable », « Matériau : fonte » en Plex 400, 26 px, `ink` | nommé sur « sont ses attributs » |
| Cartouche « Repère » | 744, 494, 342 × 182 | grille de cartouche : case de titre 48 px de haut, « Repère » Azeret Mono 400, 24 px, `ink-2` ; case du globe dessous : cercle Ø 112, contour 1,6 px `ink`, trois méridiens (ellipses) et deux parallèles 1 px `ink-2`, point plein 10 px `ink` posé sur l'hémisphère visible | « le repère du cartouche » |
| Étiquette « Géométrie » | texte à 96, 312 ; point du repère à 380, 330 sur le tracé | ligne de repère de la charte (point 4 px, oblique, palier), 1,2 px `ink` ; texte Azeret Mono 400, 26 px, `ink` | « le tracé est la géométrie » |
| Étiquette « Attributs » | texte à 96, 572 ; point à 370, 555 | idem | « sont ses attributs » |
| Étiquette « Système de coordonnées » | texte à 752, 732 (sous la feuille, aligné à droite sur x 1086) ; point à 915, 650 sur le globe | idem, repère qui descend | « le repère du cartouche son système de coordonnées » |
| Accolade | x 1124 à 1156, y 184 à 676, pointe vers la droite à y 430 | accolade à angles vifs (paliers droits, pas de courbe), 1,6 px `cyan` ; elle tient le bord droit de la feuille, où ne touchent que le cadre principal et le cartouche | « se lit donc dans deux parties » |
| Panneau de choix | 1200, 120, 624 × environ 700 | composant du lecteur : question tapée, choix a, b, c ; a sélectionné (bord plein, poignées bleues) ; conséquence de a écrite sous les choix | « Choisissez » ; conséquence après VALIDER |
| CONTINUER | zone d'action, bas droite | composant du lecteur | fin de la narration déclenchée |

**Couleurs par fonction.** `ink` : la donnée (feuille, tracé, textes). `ink-2` : titre du cartouche et graticule du globe. `line` et `line-faint` : filets des zones. `panel` : bandeau. `cyan` : l'accolade, seule liaison de lecture (« se lit dans »). `grip` bleu : la mise en évidence et la sélection du choix. Le vert de programme ne paraît que dans la barre d'état : aucun terme nouveau dans cette scène. Aucun or (pas de manque), aucun rouge.

**Mise en évidence unique (état final).** Le cartouche « Repère » : contour tireté `grip` à 8 px autour de sa case (736, 486, 358 × 198), poignées carrées pleines aux quatre coins.

**État final à l'écran.** La feuille entière avec ses trois zones ; les trois étiquettes et leurs lignes de repère ; l'accolade cyan ; le cartouche mis en évidence ; le panneau de choix, a sélectionné, sa conséquence ; CONTINUER. Pas de sous-titre sur la planche.

**À éviter.** Un titre de rubrique dans la feuille (la réponse serait soufflée) ; un globe plus grand ou plus coloré que le tracé avant la réponse ; une flèche ou un nord dans le cadre principal (rien ne les nomme).

---

## Thème 2 · Feuille de carte

**Concept.** Une entité géographique se regarde comme le cartographe la regarde : posée sur une face de carte, décrite dans la marge, et située sur la Terre par un carton de localisation. Émotion visée : changer de regard, entrer dans le métier du SIG par son dessin.

**D'où il vient.** Des conventions de dessin de la cartographie et de la géomatique, que le public du BIM n'a jamais eu à lire : le cadre de carte à double filet, la marge où vivent les informations qui décrivent la carte, le **carton de localisation** (la petite carte, souvent un globe, qui dit où se trouve la feuille sur la Terre), le lettrage des toponymes en capitales espacées, la barre d'échelle à segments alternés. Le cartouche « Repère » du storyboard devient ce qu'il est chez un cartographe : un carton de localisation.

**Comment il montre**

| Chose | Dessin |
|---|---|
| Une entité géographique | Une feuille de carte : cadre extérieur 3 px et cadre intérieur 1,4 px à 12 px l'un de l'autre ; titre centré dans la marge haute ; la géométrie seule sur la face de carte, sans fond ; les attributs dans la marge droite, en lignes à filets ; le système de coordonnées dans le carton de localisation, en bas de la marge : un globe en projection orthographique, méridiens et parallèles au trait |
| Un format | Une feuille de carte d'un autre cadre : filet simple, double filet, ou filet doublé d'une bande hachurée. Jamais une bordure à damier : chez le cartographe, le damier gradue les coordonnées, il appartient au système de coordonnées |
| Le moteur | Un bloc de la charte (nœud de schéma, 3 px encre) titré « Moteur », au centre des feuilles de carte. La cartographie n'a pas de dessin pour un moteur : ce thème ne l'invente pas |
| Une personne | Une carte de rôle (silhouette d'échelle au trait, nom en Azeret Mono) posée sur la face de carte, sa ligne de repère arrivant sous le toponyme du lieu où la voix la place (« Colombie-Britannique » en capitales espacées, sans contour de province dessiné) |
| Une date | Une barre d'échelle du temps : segments alternés encre et blanc, un par année (1993 à 1996 : trois segments, les « trois ans » se comptent) ; les jalons écrits aux extrémités, au-dessus de la barre |

**Pour les leçons suivantes.** L02 : deux feuilles de carte dont les cartons montrent deux globes différents et dont les faces ne se superposent pas : le problème des systèmes de coordonnées se voit avant de se nommer ; c'est en L02 que le cadre peut recevoir ses graduations et le carton le nom d'un système. L03 : la fenêtre de l'atelier, redessinée, avec la face de carte d'un lecteur à gauche et celle d'un writer à droite. L04 : la reprojection montre le graticule du carton qui change et la géométrie redessinée ; le contrôle qualité, une ligne de marge vide (« non renseigné ») ; l'intégration, deux faces de carte réunies sous un même carton. L05 : le plan d'un bâtiment issu de l'IFC reçoit un carton de localisation, et le géoréférencement se dessine avec le même signe qu'en L01. Dessins à préparer : le globe orthographique, la feuille de carte et ses trois cadres de format, la barre d'échelle du temps.

**Risques.** Le moteur et le flux sont son point faible : S05 et L03 reposent sur des dessins de la charte (bloc, fenêtre), pas sur la cartographie. Une feuille de carte appelle un fond de carte : la tenir vide demande de la discipline (rien sur la face que la voix ne nomme). Le double cadre peut se lire comme un repère de position s'il reçoit la moindre graduation avant L02.

### Fiche de planche

**Composition 1920 × 1080.** Une feuille de carte paysage occupe la gauche (x 96 à 1130) ; tout ce qui la nomme est écrit **dans son cadre**, comme sur une vraie carte ; à droite, le panneau de choix (x 1180 à 1824). L'accolade passe sous la feuille.

| Objet | Place (x, y, largeur × hauteur) | Dessin | Répond à |
|---|---|---|---|
| Cadre extérieur | 96, 80, 1034 × 712 | 3 px `ink`, ombre décalée 6 × 8 px | « une conduite d'eau » (entrée) |
| Cadre intérieur | 108, 92, 1010 × 688 | 1,4 px `ink` | idem |
| Titre « Conduite d'eau » | centré sur la face, y 112 à 150 | Azeret Mono 300, 34 px, interlettrage 0,12 em, `ink` ; filet 1 px `line` dessous à y 160 | « une conduite d'eau » |
| Face de carte (cadre principal) | 120, 170, 700 × 598 | filet 1,4 px `ink` ; vide sauf le tracé : polyligne `ink` 4 px, deux coudes, qui traverse la face de bord à bord | nommée sur « le tracé est la géométrie » |
| Marge droite | 836, 170, 270 × 598 | séparée de la face par le filet de la face ; aucun titre de marge | |
| Tableau (en marge, haut) | 852, 186, 238 × 140 | deux lignes à filet 1 px `line-faint` ; « Usage : eau potable », « Matériau : fonte » Plex 400, 24 px, `ink`, sur deux lignes si besoin | nommé sur « sont ses attributs » |
| Carton de localisation « Repère » (en marge, bas) | 852, 540, 238 × 212 | cadre 1,4 px `ink` ; « Repère » Azeret Mono 400, 24 px, `ink-2`, en tête ; globe orthographique Ø 150 : contour 1,6 px `ink`, méridiens et parallèles tous les 30° en 1 px `ink-3` (méridiens en ellipses, parallèles en arcs) ; point plein 10 px `ink` | « le repère du cartouche » |
| Étiquette « Géométrie » | sur la face, texte à 150, 230 ; point sur le tracé | ligne de repère 1,2 px `ink`, texte Azeret Mono 400, 26 px, `ink`, posé dans le vide de la face comme une annotation de carte | « le tracé est la géométrie » |
| Étiquette « Attributs » | dans la marge, texte à 852, 350 ; repère qui monte vers le tableau | idem | « sont ses attributs » |
| Étiquette « Système de coordonnées » | dans la marge, texte sur deux lignes à 852, 440 (« Système de » / « coordonnées ») ; repère qui descend vers le globe | idem | « le repère du cartouche son système de coordonnées » |
| Accolade | x 120 à 1106, y 806 à 846, pointe vers le bas au milieu | accolade couchée à angles vifs, 1,6 px `cyan` ; elle tient le bord bas de la feuille, où ne touchent que la face de carte et le carton | « se lit donc dans deux parties » |
| Panneau de choix | 1180, 120, 644 × environ 700 | composant du lecteur ; a sélectionné ; conséquence de a | « Choisissez » ; après VALIDER |
| CONTINUER | zone d'action, bas droite | composant du lecteur | fin de la narration déclenchée |

**Couleurs par fonction.** `ink` : cadres, tracé, textes de marge. `ink-2` : titre du carton. `ink-3` : graticule (le réseau des méridiens et parallèles reste plus pâle que tout ce qui porte du sens). `line`, `line-faint` : filets de marge. `cyan` : l'accolade. `grip` bleu : mise en évidence et sélection. Vert de programme : barre d'état seulement. Aucun bleu pour l'eau (le bleu est la sélection), aucun or, aucun rouge.

**Mise en évidence unique (état final).** Le carton de localisation : contour tireté `grip` à 8 px autour (844, 532, 254 × 228), poignées carrées aux coins.

**État final à l'écran.** La feuille de carte, face et marge ; le tracé ; les trois étiquettes écrites dans le cadre ; l'accolade sous la feuille ; le carton mis en évidence ; le panneau de choix, a sélectionné, sa conséquence ; CONTINUER.

**À éviter.** Flèche du nord, barre d'échelle ou graduations dans cette scène (rien ne les nomme, et les graduations souffleraient la réponse) ; un fond de carte ; le globe en couleur.

---

## Thème 3 · Le flux

**Concept.** Une donnée n'est jamais immobile : elle arrive, elle traverse, elle repart. L'entité est une carte à ports qui circule sur des liaisons ; le moteur est le carrefour où toutes les liaisons se branchent ; un format est la forme d'un port. Émotion visée : l'élan, voir le métier de l'outil en marche avant d'ouvrir l'outil.

**D'où il vient.** Des verbes de la leçon, « lire, manipuler, écrire » (S04), et de « reçoit », « arrive », « écrire vers n'importe quel autre » (S03, S04, S05) ; des diagrammes de flux que dessinent les gens de l'échange de données : des nœuds, des ports d'entrée et de sortie, des liaisons orientées. Ce n'est pas une copie de la fenêtre de Safe Software : rien de sa forme, de ses couleurs ni de ses icônes ; seulement la grammaire nœud, port, liaison.

**Comment il montre**

| Chose | Dessin |
|---|---|
| Une entité géographique | Une carte de donnée à bandeau titré et compartiments (géométrie, attributs, système de coordonnées) ; un port d'entrée carré de 16 px sur son bord gauche, d'où part sa liaison d'arrivée. Elle se déplace sur les liaisons (mouvement géométrique) |
| Un format | La forme du port : une encoche droite, double ou en créneau sur le bord du nœud de format. Deux formats aux encoches différentes ne se branchent pas l'un sur l'autre |
| Le moteur | Un nœud central à bord 3 px titré « Moteur », dont le bord porte toutes les encoches : chaque format s'y branche |
| Une personne | Une carte de rôle (silhouette d'échelle, nom), jamais un nœud ni un port : les ports sont réservés à la donnée. Deux personnes qui échangent sont reliées par une liaison simple, et la donnée échangée se pose sur la liaison |
| Une date | Une frise : liaison horizontale orientée vers la droite, une graduation par année ; chaque jalon est un trait vertical et son texte au-dessus. Pas de port sur la frise |

**Pour les leçons suivantes.** L02 : deux nœuds de formats aux encoches différentes, face à face, qui ne se branchent pas : l'interopérabilité se voit en un geste ; les modèles de données, des compartiments rangés autrement ; la sémantique, deux attributs de même valeur sous deux noms. L03 : la leçon du flux ; la fenêtre de l'atelier, redessinée, montre lecteurs, transformers et writers, et le thème doit **s'effacer devant elle** pour ne pas confondre ses nœuds avec ceux de l'outil (voir risques). L04 : chaque usage type est un petit flux (reprojection, contrôle qualité qui écarte une carte sur une sortie à part, intégration à deux entrées). L05 : FME Form et FME Flow, le même flux lancé sur un poste puis sur un serveur ; un modèle IFC entre par un port et ressort en carte de donnée SIG. Dessins à préparer : les encoches de format, le nœud moteur, la carte de donnée à compartiments.

**Risques.** Le plus fort : en L03, les vrais nœuds de l'atelier ressembleront aux nœuds du thème, et l'apprenant ne saura plus ce qui est l'outil et ce qui est l'image du cours. Les ports ajoutent des objets qu'il faut nommer ou faire répondre à un mot, sinon ils sortent (règle du sens). Le thème est fort sur S04 et S05, plus maigre sur S02 et S03, où la donnée ne bouge pas. Les encoches de format sont un dessin neuf, sans convention du métier.

### Fiche de planche

**Composition 1920 × 1080.** La carte de donnée « Conduite d'eau » est un nœud arrivé de la gauche : sa liaison d'arrivée part du bord gauche de la scène. Les noms des parties se branchent sur des ports qui s'ouvrent au moment où la voix les dit. Le panneau de choix à droite.

| Objet | Place (x, y, largeur × hauteur) | Dessin | Répond à |
|---|---|---|---|
| Liaison d'arrivée | de 0, 172 à 412, 172 | 1,6 px `ink`, flèche pleine à son bout ; la carte glisse le long d'elle à l'entrée (mouvement géométrique, puis immobile) | « une équipe reçoit une conduite d'eau » |
| Port d'entrée | 412, 164, 16 × 16 | carré plein `ink` sur le bord gauche du bandeau | idem |
| Carte de donnée | 420, 140, 680 × 560 | contour 3 px `ink`, ombre décalée 6 × 8 px | « une conduite d'eau » |
| Bandeau | 420, 140, 680 × 64 | fond `panel-2`, « Conduite d'eau » Azeret Mono 400, 30 px, `ink` | idem |
| Compartiment du tracé (cadre principal) | 420, 204, 680 × 280 | filet bas 1,4 px `ink` ; tracé : polyligne `ink` 4 px, deux coudes, de bord à bord ; à l'entrée, un trait qui avance à vitesse constante | nommé sur « le tracé est la géométrie » |
| Compartiment du tableau | 420, 484, 360 × 216 | filet droit 1,4 px `ink` ; deux lignes Plex 400, 26 px | nommé sur « sont ses attributs » |
| Compartiment du cartouche « Repère » | 780, 484, 320 × 216 | « Repère » Azeret Mono 400, 24 px, `ink-2`, en tête sur filet ; globe Ø 120, contour 1,6 px `ink`, deux méridiens et un parallèle 1 px `ink-2`, point plein 10 px `ink` | « le repère du cartouche » |
| Ports de parties | bord gauche de la carte à y 344 (tracé) et y 592 (tableau) ; bord bas à x 940 (cartouche) | carrés vides 14 px `ink`, qui n'apparaissent qu'avec leur nom (jamais avant la réponse : ils compteraient les parties) | chacun avec son nom |
| Étiquette « Géométrie » | boîte de nom 96, 320, 280 × 48, liée au port par une liaison horizontale 1,2 px `ink` | boîte 1,4 px `ink`, Azeret Mono 400, 26 px | « le tracé est la géométrie » |
| Étiquette « Attributs » | boîte 96, 568, 280 × 48, liée au port | idem | « sont ses attributs » |
| Étiquette « Système de coordonnées » | boîte 620, 740, 400 × 48, liée au port du bas par une liaison verticale | idem | « le repère du cartouche son système de coordonnées » |
| Accolade | x 1114 à 1146, y 204 à 700, pointe à droite | à angles vifs, 1,6 px `cyan` ; elle tient le bord droit de la carte, où ne touchent que le compartiment du tracé et le cartouche | « se lit donc dans deux parties » |
| Panneau de choix | 1200, 120, 624 × environ 700 | composant du lecteur ; a sélectionné ; conséquence de a | « Choisissez » ; après VALIDER |
| CONTINUER | zone d'action | composant du lecteur | fin de la narration déclenchée |

**Couleurs par fonction.** `ink` : la donnée, ses ports et ses liaisons (ce qui circule). `panel-2` : bandeau de nœud. `ink-2` : titre du cartouche, graticule. `cyan` : l'accolade, liaison de lecture, distincte des liaisons de flux en encre. `grip` bleu : mise en évidence et sélection. Vert de programme : barre d'état ; dans les autres scènes, la carte de donnée en cours de manipulation (S04). Aucun or, aucun rouge.

**Mise en évidence unique (état final).** Le compartiment du cartouche : contour tireté `grip` à 8 px autour (772, 476, 336 × 232), poignées aux coins.

**État final à l'écran.** La liaison d'arrivée et la carte de donnée ; les trois ports ouverts et leurs boîtes de nom ; l'accolade cyan ; le cartouche mis en évidence ; le panneau de choix, a sélectionné, sa conséquence ; CONTINUER.

**À éviter.** Une liaison de sortie (rien ne sort dans cette scène) ; des ports dessinés avant la réponse ; une ressemblance avec l'interface de Safe Software (couleurs de nœuds, icônes).

---

## Thème 4 · La vue éclatée

**Concept.** L'entité se montre d'abord assemblée, comme une donnée reçue ; puis, au moment de comprendre, elle s'ouvre en vue éclatée isométrique : ses pièces se séparent sur un axe vertical, et la pièce du bas, le repère, est celle qui l'arrime à la Terre. Une seule surprise par leçon : la donnée qui s'ouvre. Émotion visée : le « ah, c'est donc ça » de l'objet démonté.

**D'où il vient.** Des mots de la leçon : « une entité porte trois parties », « ce que les données en retiennent », « le système de coordonnées la rattache à la Terre » ; de la vue éclatée du dessin d'ensemble, que le public de la construction lit sans aide (pièces séparées sur un axe, lignes de rappel vers leur place) ; et du motif central de la charte, le passage du plan 2D au volume (DESIGN § 8), ici appliqué à la donnée et non au bâtiment. Ce n'est pas la figure des « couches » superposées du SIG : là, chaque plaque est un thème entier de la carte ; ici, chaque pièce garde sa forme et sa place dans la feuille, pour ne pas planter une fausse idée avant que L04 parle de couches.

**Comment il montre**

| Chose | Dessin |
|---|---|
| Une entité géographique | Assemblée : une feuille à plat, vue en plan. Éclatée : ses pièces en isométrie filaire à 30°, chacune à sa place en plan, séparées en hauteur, reliées par des lignes de rappel verticales ; la géométrie au milieu, le repère en bas, les attributs en haut. Les textes restent horizontaux, sur lignes de repère, jamais projetés sur les pièces |
| Un format | Un boîtier isométrique ouvert dont les compartiments rangent les pièces d'une certaine façon ; deux formats, deux boîtiers aux compartiments différents (ce que L02 appelle les modèles de données se voit dans la forme des cases) |
| Le moteur | Un poste ouvert en isométrie (bâti à quatre montants, titré « Moteur ») où l'entité sort d'un boîtier, s'éclate, et se range dans un autre ; manipuler, c'est changer une pièce pendant qu'elle est sortie |
| Une personne | Une carte de rôle à plat (silhouette d'échelle au trait en élévation, nom), jamais en isométrie : une personne ne se démonte pas |
| Une date | Une frise sur l'axe isométrique de profondeur ; chaque date est un **jalon d'arpenteur** planté sur l'axe (mât vertical à bandes alternées encre et blanc, la convention du géomètre), son texte horizontal en tête de mât |

**Pour les leçons suivantes.** L02 : la même entité rangée dans deux boîtiers de formats différents ; deux pièces de repère différentes sous la même géométrie (deux systèmes de coordonnées). L03 : le poste du moteur en vrai, à côté de la fenêtre de l'atelier redessinée : lire sort l'entité du boîtier, transformer change une pièce, écrire la range ailleurs. L04 : la reprojection remplace la seule pièce du bas ; le contrôle qualité trouve une pièce manquante (la case vide reste, « non renseigné ») ; l'intégration assemble des pièces de deux sources. L05 : le modèle IFC en 3D colorée (registre D1) se pose sur une pièce de repère, et le BIM vers SIG est une vue éclatée de plus, la dernière du module. Dessins à préparer : la bascule plan vers isométrie, les boîtiers de formats, le poste moteur, le jalon d'arpenteur.

**Risques.** Le plus coûteux à dessiner et à animer : la bascule d'une feuille à plat vers l'isométrie est un geste nouveau pour le moteur de scènes. Il **change le mouvement de S03 du storyboard** (la feuille s'éclate après la réponse au lieu de recevoir ses noms à plat) : à confirmer par Ilyas et le scénariste avant de dessiner la planche d'exemple au-delà de l'essai. La lisibilité baisse en isométrie (pièces petites, textes sur repères seulement, cinq étiquettes au plus). Si la surprise revient dans chaque scène, elle s'use : une vue éclatée par leçon, pas plus.

### Fiche de planche

**Composition 1920 × 1080.** À gauche, la vue éclatée de la feuille « Conduite d'eau » (x 96 à 1120), le bandeau resté à plat en tête comme titre de l'ensemble ; à droite, le panneau de choix (x 1200 à 1824). Avant la réponse, la feuille est à plat au même endroit (x 260 à 1000, y 160 à 700), comme dans le storyboard : l'exercice se fait sur la donnée assemblée.

Géométrie de la vue éclatée : feuille de 440 × 300 unités en plan ; cadre principal sur 440 × 190 au fond, tableau sur 240 × 110 devant à gauche, cartouche sur 200 × 110 devant à droite. Isométrie à 30°, échelle 1 unité = 1 px. Les pièces s'écartent en hauteur de 190 px : tableau en haut, cadre principal au milieu, cartouche en bas, chacune au-dessus de sa place en plan.

| Objet | Place (boîte à l'écran, approchée) | Dessin | Répond à |
|---|---|---|---|
| Bandeau « Conduite d'eau » | 96, 80, 520 × 60, à plat | fond `panel`, contour 1,4 px `ink`, Azeret Mono 400, 30 px | « une conduite d'eau » |
| Pièce du tableau (haut) | 300, 170, 330 × 190 | parallélogramme isométrique, contour 1,6 px `ink`, épaisseur de pièce 6 px ; les deux lignes de texte ne sont **pas** projetées : « Usage : eau potable » et « Matériau : fonte » se lisent à plat, Plex 400, 24 px, dans une étiquette posée sur la pièce par un repère court | nommée sur « sont ses attributs » ; s'élève sur ce mot |
| Pièce du cadre principal (milieu) | 330, 330, 545 × 315 | parallélogramme 3 px `ink` ; le tracé projeté sur la pièce, polyligne 4 px `ink` à deux coudes | nommée sur « le tracé est la géométrie » |
| Pièce du cartouche « Repère » (bas) | 640, 600, 270 × 170 | parallélogramme 1,6 px `ink` ; « Repère » à plat sur un repère court, Azeret Mono 400, 24 px, `ink-2` ; le globe **debout** sur la pièce, de face (cercle Ø 96, deux méridiens, un parallèle, point plein 10 px `ink`), comme un objet posé, jamais écrasé par la projection | « le repère du cartouche » |
| Lignes de rappel | des coins de chaque pièce vers la pièce suivante | traits continus 1 px `line`, verticaux (jamais tiretés : le tireté est la mise en évidence) | accompagnent l'éclatement |
| Étiquette « Attributs » | texte à 96, 250 ; repère vers la pièce du haut | ligne de repère 1,2 px `ink`, Azeret Mono 400, 26 px | « sont ses attributs » |
| Étiquette « Géométrie » | texte à 96, 470 ; repère vers le tracé | idem | « le tracé est la géométrie » |
| Étiquette « Système de coordonnées » | texte à 96, 720 ; repère vers la pièce du bas | idem | « le repère du cartouche son système de coordonnées » |
| Accolade | verticale, x 1080 à 1112, de y 330 (haut de la pièce du milieu) à y 770 (bas de la pièce du bas), pointe à droite | à angles vifs, 1,6 px `cyan` ; elle tient la pièce du tracé et celle du repère, voisines dans l'éclaté | « se lit donc dans deux parties » |
| Panneau de choix | 1200, 120, 624 × environ 700 | composant du lecteur ; a sélectionné ; conséquence de a | « Choisissez » ; après VALIDER |
| CONTINUER | zone d'action | composant du lecteur | fin de la narration déclenchée |

**Mouvement propre au thème (à confirmer).** Sur « le tracé est la géométrie », la feuille bascule de plan en isométrie (sommets en ligne droite, 300 ms, `easeOutCubic`) et la pièce du cadre se détache ; sur « sont ses attributs », la pièce du tableau monte ; sur « le repère du cartouche », la pièce du cartouche descend. Chaque nom arrive avec sa pièce, une mise en évidence à la fois.

**Couleurs par fonction.** `ink` : les pièces et le tracé (3 px pour la géométrie, la pièce qui porte la position ; 1,6 px pour les deux autres). `line` : lignes de rappel. `ink-2` : titre du cartouche, graticule. `panel` : bandeau. `cyan` : l'accolade. `grip` bleu : mise en évidence et sélection. Vert de programme : barre d'état. Aucun or, aucun rouge, aucune couleur de catégorie 3D (ce n'est pas un modèle).

**Mise en évidence unique (état final).** La pièce du cartouche : contour tireté `grip` qui suit son parallélogramme à 8 px, poignées carrées à ses quatre sommets.

**État final à l'écran.** Le bandeau ; la vue éclatée à trois pièces et ses lignes de rappel ; les trois étiquettes à gauche ; l'accolade cyan ; la pièce du repère mise en évidence ; le panneau de choix, a sélectionné, sa conséquence ; CONTINUER.

**À éviter.** Des pièces de même taille empilées comme des couches de carte ; du texte projeté en isométrie ; une ombre portée sous les pièces ; un sol ou un globe géant sous la pile.

---

## Recommandation

**Thème 2 · Feuille de carte**, pour le module.

La raison : le module va de l'outil jusqu'au travail en SIG, pour un public qui n'a jamais lu une carte de géomaticien. Le thème 2 lui apprend ce regard en même temps que la matière, avec les signes du métier enseigné, et il donne au système de coordonnées, l'idée la plus mal comprise de L01, un dessin natif (le carton de localisation) qui grandit ensuite : graduations et nom de système en L02, graticule qui change à la reprojection en L04, géoréférencement d'un IFC en L05. Son point faible, le moteur et le flux, pèse moins qu'il n'y paraît : en L03, la règle « un logiciel se montre par une fenêtre » impose de toute façon la fenêtre de l'atelier redessinée, et le moteur de S05 se dessine bien avec le bloc de la charte. Il reste en 2D, avec les composants existants : le coût est bas.

Si Ilyas veut plus d'élan, le thème 3 est le second choix, à condition de régler d'abord le risque de L03 (nœuds du thème contre nœuds de l'outil). Le thème 4 est le plus fort en S03 et le plus cher ; il change le mouvement de S03 et demande un geste nouveau au moteur de scènes.

## Questions ouvertes

- **Dessins inventés, absents de la charte** (à dessiner une fois pour le module, quel que soit le thème) : le globe au trait sans nom de système (S02, S03 ; demandé par le storyboard, la charte n'a aucun signe pour le système de coordonnées) ; l'accolade à angles vifs (S03 ; la charte n'en a pas) ; la silhouette d'échelle des cartes de rôle (règle de la chaîne, alors que `DESIGN.md` § 8 dit encore « pas de personnage » : à concilier dans la charte).
- **Propres à un thème** : thème 1, la fente du moteur et les factures de feuille par format ; thème 2, la feuille de carte à marge, le carton de localisation orthographique, le lettrage des toponymes, la barre d'échelle du temps, les cadres de format ; thème 3, les ports, les encoches de format, le nœud moteur, la carte de donnée à compartiments ; thème 4, la bascule plan vers isométrie, les pièces éclatées et leurs lignes de rappel, les boîtiers de format, le poste moteur, le jalon d'arpenteur.
- **Repère de niveau pour une date** (thème 1) : détourne un signe de la charte (niveaux) vers le temps ; à garder seulement si Ilyas le lit sans aide.
- **Thème 4 et le storyboard** : la vue éclatée change le mouvement de S03 ; à trancher par Ilyas avant d'aller au-delà de la planche d'essai.
- **`content/design/theme.json`** porte encore `accent` cyan `#0096C7` (couleur de CER001) : le graphiste doit le passer au vert de programme `#00A64F`. Le vert sert alors deux fonctions (programme et « nouveauté, réussite ») : à noter dans `spec.md` pour qu'aucune scène ne lise le vert du programme comme une réussite.
