# FME001 · Charte du module « carte topographique »

Portée : les cinq leçons du module FME001-M01 (L01 à L05), scènes 1920 × 1080 et coque du lecteur.
Planche de référence : `Main.dc.html` (scène S05 « Un moteur au centre », état final), choisie par Ilyas. Fond `#F1F3EC` fixé par lui.
Jetons : `design/tokens.json` (mêmes noms, mêmes valeurs). Symboles : `design/symboles/*.svg`. Artboard de contrôle : `Composants.dc.html`.

Cette charte **remplace** la signature « CAD 2D » de BIMaccess pour ce module. Rien n'en est repris : ni poignées, ni accrochages, ni Azeret Mono, ni IBM Plex, ni couleurs ACI, ni grille de points, ni icône SCU, ni ombre décalée. Elle garde les règles de sens de la production : la règle du sens, une couleur = une fonction, une seule mise en évidence à la fois, le type d'image suit le sujet de la phrase.

---

## 1. Concept

**Une leçon se lit comme une feuille de carte topographique imprimée.**

Le public de FME001 vient du BIM et de la construction ; le module l'amène au SIG. La carte topographique imprimée est l'objet que les deux mondes partagent : un professionnel du bâtiment sait en lire une, et c'est le document de base de l'information géographique. Elle a une grammaire normalisée depuis longtemps, que l'on emprunte telle quelle, chaque convention gardant le sens qu'elle a sur une vraie carte.

| Convention de la carte imprimée | Ce qu'elle porte dans la leçon |
|---|---|
| La feuille : cadre, bordure graduée en damier, triple filet | Le cadre de la scène. Il est toujours là, comme la bordure d'une feuille, et ne s'anime jamais |
| Les amorces de quadrillage (petites croix) | La face de carte est rattachée à un système de coordonnées. Habillage, jamais nommé ni désigné |
| La face de carte | Ce que la scène explique : le dessin de la phrase dite |
| La marge : légende, échelle graphique, rose des vents, mention de source | Ce qui aide à lire la face. La légende se remplit avec la voix ; l'échelle et la rose sont l'habillage de la feuille |
| Le point géodésique (triangle et point central) | Le moteur : le point fixe auquel tout se rattache |
| Les routes (bord noir, chaussée blanche, axe coloré) | Le trajet des données. Bleu : ce qui est lu. Rouge : ce qui est écrit |
| Le cartouche et ses capitales espacées | Les en-têtes : bandeaux de feuille, rubriques, légende, boutons |
| Les toponymes en italique | Les légendes et les noms de choses du monde |
| Les couleurs de thème (relief brun, eau bleue, végétation verte, bâti noir) | Le contenu d'une feuille de format : elles disent quel genre de donnée elle porte |
| La limite administrative en tiret-point | Un territoire nommé (Colombie-Britannique) |
| Le signe de localité (cercle à point) | Un lieu nommé (Surrey) |
| Le carton de localisation | Où se trouve la feuille sur la Terre : le système de coordonnées, de L02 à L05 |

Deux couches, deux usages de la couleur :

- **Le contenu des feuilles de format** (les petites cartes dans les feuilles) suit les couleurs conventionnelles de la cartographie : elles disent le genre de donnée (courbes, eau, bâti…). Elles ne sortent jamais d'une feuille.
- **La face de carte de la scène** porte les fonctions de la leçon : lire, écrire, la mise en évidence, le terme nouveau, le manque. Ces couleurs ne servent qu'à leur fonction.

---

## 2. Couleurs

### Règles

- Fond `fond` `#F1F3EC` partout, choisi par Ilyas. Aucun autre fond de page, jamais de fond sombre.
- Une couleur = une fonction. Une couleur de thème cartographique ne sert qu'à l'intérieur d'une feuille de format ; une couleur de fonction ne sert qu'à sa fonction.
- Aplats et traits seulement : aucun dégradé, aucune transparence décorative, aucune ombre, aucun filtre.
- Texte : `encre`, `encre-2`, `terme`, `lien`, `lecture` (ce dernier seulement pour un libellé de lecture, jamais sur `lecture-fond`). Toutes les autres couleurs ne sont jamais du texte.

### Jetons

| Jeton | Hex | Fonction | Texte ? |
|---|---|---|---|
| `fond` | `#F1F3EC` | Fond de la page et de la feuille (la carte imprimée) | fond |
| `papier` | `#FBFCF8` | Intérieur des feuilles, cartouches, panneaux, sous-titres, boutons au repos | fond |
| `encre` | `#23281F` | Texte, traits, cadre, bâti, bord des routes, points | oui, 13,5:1 |
| `encre-2` | `#545B4C` | Texte secondaire (position, bouton verrouillé), traits des lignes de texte d'un symbole | oui, 6,3:1 |
| `carroyage` | `#7D8576` | Amorces de quadrillage, filets internes, traits du fond de carte (îlots, rues de S02) | non, 3,4:1 |
| `relief` | `#B08A62` | Courbes de niveau ordinaires | non |
| `relief-maitresse` | `#8E6640` | Courbe maîtresse (une sur cinq) | non |
| `chaussee` | `#FFFFFF` | Chaussée des routes, entre le bord et l'axe ; jamais ailleurs | non |
| `ecriture` | `#C4472B` | Axe de la route d'écriture : ce que FME écrit, vers le format attendu. Aussi les routes dans une feuille « routes » | non, 4,4:1 |
| `lecture` | `#2F6DA8` | Axe de la route de lecture ; mise en évidence unique ; accolade de lecture ; choix sélectionné ; focus clavier. Aussi l'eau dans une feuille « hydrographie » | court, 4,9:1 |
| `lecture-fond` | `#E3ECF4` | Fond du choix sélectionné seulement | fond |
| `eau-fond` | `#BFD5E6` | Surfaces d'eau, dans une feuille seulement | non |
| `vegetation` | `#6E8B4E` | Contour et semis de la végétation, dans une feuille seulement | non |
| `vegetation-fond` | `#D3DFC3` | Surface de végétation, dans une feuille seulement | non |
| `image-clair` | `#9DAF8A` | Pixels clairs d'une feuille « image » | non |
| `image-fonce` | `#5F7550` | Pixels foncés d'une feuille « image » | non |
| `terme` | `#1E6E3C` | Le terme nouveau, au moment où la voix le nomme (S01, S02 « Entité géographique ») ; texte seulement | oui, 5,6:1 |
| `manque` | `#C99700` | Contour tireté du manque (REGLES 4.8) ; jamais du texte | non |
| `manque-fond` | `#FBF1C8` | Intérieur du manque | fond |
| `lien` | `#7A4A22` | Lien cliquable, mention de source (« D'après Safe Software ») | oui, 6,6:1 |
| `lien-survol` | `#4F2E12` | Lien survolé | oui, 10,8:1 |
| `survol` | `#E5E9DD` | Fond d'un bouton ou d'un choix survolé | fond |
| `verrou-trait` | `#A3AA9B` | Bord d'un bouton verrouillé | non |
| `programme` | `#00A64F` | Vert de programme FME001 : **seulement dans la barre d'état** (pastille du programme, case de la scène courante dans la progression) | non, 2,9:1 |

### Contrastes vérifiés (WCAG, texte 4,5:1 au moins)

| Texte | sur `fond` | sur `papier` | sur `survol` | sur `lecture-fond` |
|---|---|---|---|---|
| `encre` | 13,46 | 14,61 | 12,21 | 12,60 |
| `encre-2` | 6,30 | 6,84 | 5,72 | 5,90 |
| `terme` | 5,60 | 6,08 | 5,08 | 5,24 |
| `lien` | 6,63 | 7,20 | 6,02 | 6,21 |
| `lecture` | 4,85 | 5,26 | refusé (4,40) | refusé (4,54, trop juste) |
| `papier` sur `lecture` (lettre du choix sélectionné) | | 5,26 | | |
| `papier` sur `encre` (bouton actif) | | 14,61 | | |

Refusés en texte : `ecriture` (4,38), `relief-maitresse` (4,55, trop juste), `carroyage` (3,42), `vegetation` (3,43), `programme` (2,86), `manque` (2,37), `relief` (2,82).

### Le vert de programme et sa seule place

`#00A64F` est la couleur du programme FME001. Il ne paraît que dans la barre d'état : la pastille carrée devant « FME001 » et la case de la scène courante dans l'échelle de progression. Jamais dans une scène, jamais en texte, jamais pour la réussite (il n'y a pas de verdict), jamais pour la végétation (`vegetation`) ni pour le terme nouveau (`terme`).

---

## 3. Typographie

| Famille | Rôle | Graisses |
|---|---|---|
| **Source Serif 4** | Titres, texte, rubriques, choix, sous-titres ; **italique** pour les légendes, les toponymes et la mention de source (comme les noms de la nature sur une carte) | 400, 600, italique 400 et 600 |
| **Barlow Condensed** | Capitales espacées : noms de lieu et d'objet posés sur la face (« MOTEUR »), en-têtes de cartouche et bandeaux de feuille, rubriques, boutons, barre d'état | 500, 600 |

Google Fonts (artboards) : `Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400;1,8..60,600&family=Barlow+Condensed:wght@500;600`. Dans la page livrée : paquets `@fontsource/source-serif-4` et `@fontsource/barlow-condensed`, mis en ligne par la construction, jamais par un lien.

### Échelle (1920 × 1080, aucun texte sous 23 px)

| Niveau | Style | Exemple de L01 |
|---|---|---|
| Vedette | Serif 600, 220 px, interlettrage 0,04 em, interligne 1 | « FME » (S01), « Safe Software » (S06, 120 px si le nom ne tient pas) |
| Titre de scène | Serif 600, 66 px, -0,01 em, interligne 1 ; dessous, filet double de 300 px (2 px, 3 px d'écart, 0,8 px) | « Un moteur au centre. » |
| Intertitre | Serif italique 400, 48 px, interligne 1,1 | « Feature Manipulation Engine » |
| Nom de lieu | Barlow 600, 34 px, capitales, 0,3 em, sur une réserve `fond` de 2 px | « MOTEUR », « SAIF », « COLOMBIE-BRITANNIQUE » |
| Nom de lieu petit | Barlow 600, 26 px, capitales, 0,24 em | « LIRE », « ÉCRIRE » le long d'une route |
| En-tête de cartouche | Barlow 600, 24 px, capitales, 0,32 em | « LÉGENDE », bandeau « CONDUITE D'EAU » |
| Titre de rubrique | Barlow 600, 24 px, capitales, 0,16 em | « GÉOMÉTRIE : POINTS, LIGNES, SURFACES » |
| Corps | Serif 400, 30 px, interligne 1,3 | |
| Ligne de rubrique | Serif 400, 28 px, interligne 1,25 | « Usage : bureaux » |
| Légende | Serif italique 400, 27 px, interligne 1,15 | « Formats pris en charge » |
| Toponyme | Serif italique 400, 30 px | « Siège : Surrey » |
| Mention de source | Serif italique 400, 24 px, `lien` | « D'après Safe Software » |
| Question d'exercice | Serif 600, 32 px, interligne 1,2 | |
| Choix | Serif 400, 28 px, interligne 1,25 | |
| Rétroaction | Serif 400, 26 px, interligne 1,3 | |
| Sous-titres | Serif 400, 34 px, interligne 1,3 | |
| Bouton | Barlow 600, 26 px, capitales, 0,24 em (LANCER : 34 px) | |
| Barre d'état | Barlow 500, 23 px, capitales, 0,12 em ; titre de scène en serif italique 23 px | |

### Règles

- Les capitales viennent du style (`text-transform`), le storyboard garde la casse.
- Titres de scène courts (six mots au plus), terminés par un point.
- Le terme nouveau s'écrit en `terme` au moment où il est nommé, puis passe à `encre` dans les scènes suivantes.
- L'anglais (le nom d'origine) en serif italique ; jamais en capitales espacées.
- Jamais de tiret cadratin : « · », « : » ou une virgule.

---

## 4. Mise en page

Toutes les coordonnées sont en pixels de la composition 1920 × 1080 (`tokens.json`, `sizes.cadre` et `sizes.zones`).

### La feuille (habillage, présent dès l'image 0, jamais animé)

- Cadre extérieur : rectangle `x 34, y 34, 1852 × 1012`, `encre` 2 px.
- Bordure graduée : bande de 12 px entre 34 et 46, en damier de cases de 76 px, cases paires pleines `encre`, sur les quatre côtés.
- Triple filet : le cadre extérieur (2 px), un filet à 46 (1,2 px), un filet à 58 (0,8 px).
- Carroyage : croix `carroyage` de 16 px (1,2 px), tous les 228 px à partir de `x 274, y 236`. Un élément de la face peut les couvrir.
- Fichier : `symboles/cadre-feuille.svg` (groupes `bordure` et `carroyage`).
- Marges internes : 46 px entre le filet de 58 et le contenu (le titre est à `x 104, y 84`).

### La face de carte

- `x 104 à 1424, y 84 à 860`. Le titre de scène en haut à gauche, puis le dessin de la phrase.
- Elle peut déborder dans la marge jusqu'à `x 1500` entre `y 360` et `y 690` (entre la légende et la rose), comme la couronne de S05, jamais sur un élément de marge.
- Une liaison ou une route ne passe jamais sous un texte : le nom de lieu posé dessus a une réserve `fond`.

### La marge (colonne de droite, `x 1448 à 1830`)

| Élément | Place | Règle |
|---|---|---|
| Légende | `x 1448, y 84`, 364 px de large | Cartouche `papier`, bordure 2 px, contour 0,8 px décalé de 4 px ; en-tête « LÉGENDE » ; une entrée par symbole de la face, symbole de 54 × 36 puis libellé en légende. Elle n'existe que si la scène a au moins deux symboles à légender, et chaque libellé est un texte d'« Écran » du storyboard |
| Échelle graphique | sous la légende, 24 px d'écart, `x 1480`, 300 × 34 | Sans chiffre (aucune échelle n'est inventée). Habillage |
| Rose des vents | `x 1712, y 700`, 116 × 116 | Habillage, sans lettre |
| Mention de source | `x 1448, y 772`, 250 px de large au plus | Filet de 220 px au-dessus, texte en mention de source ; lien vers la référence (REGLES 4.6). Remontée par rapport à la planche (`y 858`) pour laisser libre la zone d'action |

### Zones réservées du lecteur

- **Sous-titres** : `x 104` à `x 1284` (1 180 px au plus, toujours `x < 1300`), de `y 880` à `y 1000`. Rien d'important dessous.
- **Zone d'action** : `x 1454, y 834`, 360 × 140 (48 px du filet intérieur à droite et en bas). VALIDER et CONTINUER s'y alignent à droite. Rien de la scène dedans.

---

## 5. Bibliothèque de symboles

Chaque symbole répond à un mot de la voix ; sans ce mot, il ne paraît pas (la règle du sens). Fichiers dans `design/symboles/`. Traits : contour 3 px, trait 2 px, fin 1,2 px, filet 0,8 px, repère 1,5 px ; angles vifs (`stroke-linejoin: miter`), sauf les bouts ronds des routes. Les textes ne sont jamais dans le SVG : ils viennent du storyboard et se posent par le code (les barres grises d'un symbole marquent où ils vont).

| Symbole | Fichier | Signification | Mot de la voix qui l'appelle (L01) |
|---|---|---|---|
| Feuille de format | `feuille-format.svg` (158 × 106) | Un format de données : une feuille `papier` à bordure 2 px et contour 1 px décalé de 3 px | « formats pris en charge » (S05), « un format de départ », « en attend un autre » (S04) |
| Feuille non reliée | `feuille-format-non-reliee.svg` | La même feuille au tireté encre 6 4 : un format que rien ne relie encore | « Rien ne les relie encore » (S05, accroche) |
| Contenus d'une feuille | `feuille-courbes`, `-hydrographie`, `-cadastre`, `-bati`, `-routes`, `-vegetation`, `-points`, `-image` | Le genre de donnée d'un format : courbes de niveau, eau, parcelles, bâti noir, routes, végétation, semis de points, image en pixels. Huit feuilles différentes disent « un large éventail » sans nommer de format (les noms viennent en L02) | « Un large éventail » (S05) |
| Point géodésique | `point-geodesique.svg` (68 × 62) | Le moteur : triangle `papier` contour 3 px, point central | « un moteur central » (S05) ; nom « MOTEUR » dessous en nom de lieu |
| Route de lecture | `route-lecture.svg`, `route-lecture-sens.svg` | FME lit : bord `encre` 13, chaussée 10, axe `lecture` 5 ; la variante à pointe donne le sens quand la scène le demande (S04) | « commence par lire » (S04), « y lire ses données » (S05) |
| Route d'écriture | `route-ecriture.svg`, `route-ecriture-sens.svg` | FME écrit : bord 11, chaussée 8, axe `ecriture` 4 | « Il reste à écrire » (S04), « les écrire vers n'importe quel autre » (S05) |
| Liaison d'échange | `liaison-echange.svg` | Un échange entre deux parties, sans FME : trait `encre` 2,5 px, pointe pleine à chaque bout. Jamais une route (les routes sont réservées à ce que FME lit et écrit) | « Il relie les entreprises forestières » (S06) |
| Entité géographique | `entite-geographique.svg` (320 × 300) | Une chose du monde réel gardée dans des données : feuille `papier` à bandeau titré (en-tête de cartouche), trois rubriques séparées par un filet, chacune son groupe SVG : `geometrie` (le contour, surface hachurée), `attributs` (lignes de texte), `systeme-coordonnees` (le globe et le contour posé dessus) | « l'entité géographique » (S02), « sous forme d'entité géographique » (S03), « où vit une entité géographique » (S08) |
| Géométrie | `geometrie.svg`, `surface-bati.svg` | Information de position : un point (disque 7 px), une ligne (3 px), une surface (contour 3 px, hachure à 45° de 1,2 px tous les 9 px, convention du bâti hachuré). Dans la feuille S03, le tracé de la conduite est une ligne `encre` 3 px | « D'abord sa géométrie », « points, de lignes ou de surfaces » (S02), « le tracé est la géométrie » (S03) |
| Attributs | rubrique de `entite-geographique.svg` | Ce qui décrit l'entité : lignes « Nom : valeur » en ligne de rubrique, filet `carroyage` dessous | « Ensuite ses attributs » (S02), « sont ses attributs » (S03) |
| Système de coordonnées, L01 | `globe.svg`, `globe-contour.svg`, `globe-point.svg` | Ce qui rattache l'entité à la Terre : globe au trait (cercle, méridien, équateur, deux parallèles), sans nom de système ; le contour (S02) ou un point (S03) s'y pose | « Enfin son système de coordonnées » (S02), « le repère du cartouche » (S03), « dans quel système de coordonnées » (S08) |
| Carton de localisation, L02 à L05 | `carton-localisation.svg` (150 × 100) | Où se trouve la feuille sur la Terre : petit cadre double, côte au trait, croix de carroyage, rectangle d'emprise 3 px. Il remplace le globe quand les systèmes de coordonnées se nomment (L02) et se manipulent (L04) ; sans nom de système tant que la leçon n'en donne pas | « système de coordonnées » (L02 à L05) |
| Chose du monde réel | `batiment-elevation.svg` | L'objet avant les données : élévation simple au trait, sol, façade, baies | « une chose du monde réel » (S02) |
| Personne | `personne.svg` (30 × 90), `carte-role.svg` (200 × 150) | Une personne ou un rôle : silhouette d'échelle pleine `encre`, debout, jamais un point ; toujours dans une carte de rôle à bandeau nommé, posée sur un sol | « Ses fondateurs » (S07, deux silhouettes), « les entreprises forestières et le gouvernement provincial » (S06, une silhouette par carte) |
| Document | `document.svg` (150 × 190) | Un document : feuille `papier` titrée (filet double sous le titre), rubriques lisibles ; le texte réel remplace les barres | « un contrat du gouvernement » (S07), rubrique « Appel d'offres remporté » sur « sur appel d'offres » |
| Date | `frise.svg` (320 × 80) | Le temps : échelle graduée en années, cases alternées `encre` et `papier` d'une année chacune, **seulement entre deux jalons dits** ; avant le premier jalon, un trait simple ; bout droit ouvert (pointe pleine) ; jalon = trait vertical 2 px et libellé « 1993 · Fondation de Safe Software » | « fondée en 1993 », « en 1996 » (S07) |
| Logiciel | `logiciel.svg` (220 × 150) | Un logiciel : fenêtre redessinée (barre de titre, deux cases carrées, zone de travail avec trois boîtes liées), sans capture, sans logo, sans nom de produit dessiné | aucun mot en L01 (la leçon ne montre pas l'atelier) ; « l'atelier » ou le nom de l'outil dit, à partir de L03 |
| Lieu | `lieu.svg` | Un lieu nommé : cercle 2,5 px et point central, nom en toponyme à droite | « son siège est à Surrey » (S07) |
| Territoire | `limite-territoire.svg` | Un territoire nommé : limite en tiret-point `encre` 2 px (16 5 3 5), nom en nom de lieu | « en Colombie-Britannique » (S06) |
| Ligne de repère | `ligne-repere.svg` | Rattache un mot à un mot : point 4 px, oblique, palier, `encre` 1,5 px. Elle relie du texte à du texte (une lettre à son mot, un mot à sa traduction), jamais un objet à une idée | « par entité géographique », « par moteur » (S01) ; « se prononce comme Safe » (S06) |
| Accolade de lecture | `accolade-lecture.svg` | Deux parties lues ensemble : accolade `lecture` 2,5 px | « se lit donc dans deux parties » (S03) |
| Manque | `manque.svg` | Ce qui manque encore (REGLES 4.8) : trait `encre` arrêté sur un carré tireté `manque` 3 px (8 5), fond `manque-fond` ; le libellé, s'il y en a un, en `encre` à côté | « Rien ne les relie encore » (S05) ; « dans quel format », « dans quel système de coordonnées » (S08) |
| Courbes de niveau | `courbes-de-niveau.svg` | Le relief autour du centre : anneaux `relief` 1,3 px, une maîtresse `relief-maitresse` 2,2 px sur cinq. Seulement autour de ce que la voix met au centre | « un moteur central » (S05) |
| Mise en évidence | `mise-en-evidence.svg`, `mise-en-evidence-rect.svg` | Voir § 6 | le mot que la voix fait lire |
| Habillage | `cadre-feuille.svg`, `echelle-graphique.svg`, `rose-des-vents.svg` | La feuille, l'échelle sans chiffre, la rose sans lettre. Toujours à leur place, jamais nommés, jamais désignés | aucun : ils sont la feuille |

### Comment se dessine une entité géographique

- Sur la face (le monde, S02 accroche) : le contour seul, `encre` 3 px, sur un fond de carte `carroyage` 1,2 px (îlots, rues au trait). Rien d'autre.
- Dans les données (la feuille d'entité) : la feuille à bandeau ; la géométrie dans la première rubrique, à la même forme que sur la face (le contour y passe par un mouvement géométrique) ; les attributs en lignes « Nom : valeur » ; le système de coordonnées en globe (L01) ou en carton de localisation (L02 à L05).
- Feuille de donnée de S03 : la même feuille, titrée « Conduite d'eau », sans titre de rubrique ; cadre principal avec le tracé (ligne 3 px), petit tableau de deux lignes, cartouche « Repère » en bas à droite avec le globe et son point. Les noms de partie arrivent après la validation, chacun sur une ligne de repère.
- Trois parties, trois places fixes, toujours dans le même ordre : géométrie, attributs, système de coordonnées.

---

## 6. Coque du lecteur

Valeurs à recopier telles quelles (CSS en pixels de la composition 1920 × 1080). Le préfixe `fme-` est indicatif.

### Fond de scène

```css
.fme-scene { background: #F1F3EC; color: #23281F; font-family: 'Source Serif 4', Georgia, serif; }
/* habillage : symboles/cadre-feuille.svg posé à 0,0 en 1920 x 1080, dès l'image 0 ; pas de grille de points, pas d'icône SCU */
```

### Barre d'état (en-tête de feuille)

```css
.fme-statusbar { height: 44px; box-sizing: border-box; display: flex; align-items: center; gap: 22px;
  padding: 0 24px; background: #F1F3EC; color: #23281F; border-bottom: 3px double #23281F;
  font-family: 'Barlow Condensed', sans-serif; font-weight: 500; font-size: 23px;
  letter-spacing: 0.12em; text-transform: uppercase; }
.fme-statusbar .pastille { width: 14px; height: 14px; background: #00A64F; border: 1px solid #23281F; flex: none; }
.fme-statusbar .programme { font-weight: 600; }              /* FME001 */
.fme-statusbar .code { font-weight: 500; }                   /* FME001-M01-L01-S03 */
.fme-statusbar .titre { font-family: 'Source Serif 4', serif; font-style: italic; font-weight: 400;
  text-transform: none; letter-spacing: 0; }                 /* Où passe la conduite */
.fme-statusbar .progression { margin-left: auto; display: flex; height: 12px; border: 1.5px solid #23281F; }
.fme-statusbar .progression span { width: 34px; background: #FBFCF8; border-right: 1.5px solid #23281F; }
.fme-statusbar .progression span:last-child { border-right: 0; }
.fme-statusbar .progression span.faite { background: #23281F; }
.fme-statusbar .progression span.courante { background: #00A64F; }
.fme-statusbar .position { color: #545B4C; font-variant-numeric: tabular-nums; }   /* 3 / 8 */
```

La progression est une échelle graphique : une case par scène, faites en `encre`, courante en vert de programme, à venir en `papier`.

### Boutons (LANCER, SUIVANT, VALIDER, CONTINUER)

```css
.fme-btn { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 26px;
  letter-spacing: 0.24em; text-transform: uppercase; color: #23281F; background: #FBFCF8;
  border: 2px solid #23281F; outline: 1px solid #23281F; outline-offset: 3px;
  min-height: 60px; padding: 12px 26px 12px 32px; border-radius: 0; box-shadow: none; cursor: pointer; }
.fme-btn:hover { background: #E5E9DD; }
.fme-btn:active, .fme-btn[data-state="active"] { background: #23281F; color: #FBFCF8; }
.fme-btn:disabled, .fme-btn[aria-disabled="true"] { background: #F1F3EC; color: #545B4C;
  border-color: #A3AA9B; outline-color: #A3AA9B; cursor: not-allowed; }
.fme-btn:focus-visible { outline: 3px solid #2F6DA8; outline-offset: 5px; }
.fme-btn--lancer { font-size: 34px; min-height: 76px; padding: 16px 40px 16px 48px; }
```

Le bouton est un cartouche : double filet, capitales espacées. Repos `papier`, survol `survol`, actif `encre` plein, verrouillé gris sans couleur. Le padding gauche plus large compense l'interlettrage de la dernière lettre.

### Panneau d'exercice et choix

```css
.fme-panel { background: #FBFCF8; border: 2px solid #23281F; outline: 0.8px solid #23281F;
  outline-offset: 4px; box-sizing: border-box; color: #23281F; }
.fme-panel__question { font-family: 'Source Serif 4', serif; font-weight: 600; font-size: 32px;
  line-height: 1.2; padding: 20px 24px 10px; margin: 0; }
.fme-choices { display: flex; flex-direction: column; gap: 10px; padding: 8px 24px 20px; }
.fme-choice { display: flex; align-items: flex-start; gap: 16px; padding: 12px 18px;
  background: #FBFCF8; border: 1.5px solid #23281F; font-family: 'Source Serif 4', serif;
  font-weight: 400; font-size: 28px; line-height: 1.25; text-align: left; color: #23281F; cursor: pointer; }
.fme-choice .lettre { flex: 0 0 36px; height: 36px; box-sizing: border-box; display: grid; place-items: center;
  border: 1.5px solid #23281F; font-family: 'Barlow Condensed', sans-serif; font-weight: 600;
  font-size: 24px; text-transform: uppercase; }
.fme-choice:hover { background: #E5E9DD; }
.fme-choice[aria-checked="true"] { background: #E3ECF4; border: 3px solid #2F6DA8; padding: 10.5px 16.5px; }
.fme-choice[aria-checked="true"] .lettre { background: #2F6DA8; border-color: #2F6DA8; color: #FBFCF8; }
.fme-choice:focus-visible { outline: 3px solid #2F6DA8; outline-offset: 4px; }
```

Le choix sélectionné a un **bord plein** `lecture` 3 px et un fond `lecture-fond` : jamais de tireté, jamais de `data-highlight`. Ce n'est pas une mise en évidence.

### Rétroaction sans verdict

```css
.fme-feedback { margin: 0 24px 22px; padding: 14px 0 0; border-top: 3px double #23281F;
  font-family: 'Source Serif 4', serif; font-weight: 400; font-size: 26px; line-height: 1.3; color: #23281F; }
.fme-feedback__tete { font-family: 'Barlow Condensed', sans-serif; font-weight: 600; font-size: 24px;
  letter-spacing: 0.32em; text-transform: uppercase; margin: 0 0 6px; }   /* seulement si i18n en fournit une */
```

La conséquence s'écrit comme une rubrique de la feuille, sous un filet double : `encre` sur `papier`, aucune couleur de verdict, aucune icône, aucun « Attendu ».

### Sous-titres

```css
.fme-captions { position: absolute; left: 104px; bottom: 80px; max-width: 1180px; box-sizing: border-box;
  background: #FBFCF8; border-top: 2px solid #23281F; border-bottom: 0.8px solid #23281F;
  padding: 12px 24px 14px; font-family: 'Source Serif 4', serif; font-weight: 400;
  font-size: 34px; line-height: 1.3; color: #23281F; }
```

Deux lignes au plus (haut du bandeau à `y 883`, bas à `y 1000`). Le bandeau reprend le filet du titre : 2 px dessus, 0,8 px dessous.

### Mise en évidence unique (son dessin exact)

```css
.fme-highlight { fill: none; stroke: #2F6DA8; stroke-width: 2.5px; stroke-dasharray: 10 6;
  stroke-linecap: butt; stroke-linejoin: miter; }
```

- Forme : **cercle** autour d'un symbole ponctuel (point géodésique, lieu), rayon = demi-diagonale du symbole + 10 px (planche : cercle de 104 px autour du point géodésique) ; **rectangle à angles vifs** autour d'un texte, d'une rubrique ou d'une feuille, à 10 px de l'élément.
- Pas de poignée, pas de fond, pas d'ombre. Une seule à la fois sur toute la scène ; elle porte `data-highlight`.
- Quand elle passe d'un élément à l'autre, l'ancienne disparaît d'un coup et la nouvelle se trace (§ 7).

### Zone d'action

VALIDER puis CONTINUER, alignés à droite dans `x 1454, y 834, 360 × 140`, 16 px d'écart. Jamais sous le panneau, jamais au centre de la face.

---

## 7. Animation

Grammaire du lecteur : balayage, trait tracé à vitesse constante, frappe à cadence fixe, mouvement géométrique. Jamais de fondu d'opacité, de rebond, d'apparition grossissante ni de rotation. L'image devance la voix : chaque geste est à l'écran au début de la phrase qui le dit.

| Geste | Comment | Primitive |
|---|---|---|
| Un trait qui se trace comme une route | Les trois couches (bord, chaussée, axe) se tracent ensemble, même chemin, même instant, même durée, à vitesse constante (environ 1 200 px/s, entre 0,4 et 1,2 s), du format vers le moteur pour la lecture, du moteur vers le format pour l'écriture. La pointe de sens se pose à l'arrivée | trois `Trace` superposés |
| Une feuille qui se pose dans la couronne | La feuille glisse de 60 px vers sa place, en ligne droite depuis l'extérieur de la couronne, 0,3 s linéaire, sans changer d'échelle | `Move` |
| Une légende qui se remplit | L'entrée arrive avec le symbole qu'elle légende : le symbole de 54 × 36 se trace (0,25 s), puis le libellé se balaie de gauche à droite (0,3 s) | `Trace`, `Wipe` |
| Une courbe de niveau qui se dessine | Chaque anneau se trace depuis son point le plus à gauche, 0,8 s, de l'intérieur vers l'extérieur, la maîtresse en dernier | `Trace` |
| Une ligne de repère | Le point se pose, l'oblique puis le palier se tracent, le mot se tape | `Trace`, `TypeText` |
| Un jalon sur la frise | Le trait vertical se trace de haut en bas, puis le libellé se tape | `Trace`, `TypeText` |
| Une rubrique qui se déroule | La rubrique se balaie de haut en bas, puis son contenu se trace | `Wipe`, `Trace` |
| La mise en évidence | Le tireté se trace en 0,25 s (cercle depuis le haut, rectangle depuis le coin haut gauche) | `Trace` tireté, `Highlight` |
| Le titre | Il se tape à la cadence du thème | `TypeText` |
| L'habillage | Présent dès l'image 0 (`at={0} dur={0}`) : cadre, carroyage, échelle, rose | `Svg` |

Rythme : linéaire, ou un `easeOutCubic` de 200 à 300 ms pour les mouvements. Rien ne bouge en boucle.

---

## 8. À faire / à éviter

| À faire | À éviter |
|---|---|
| Fond `#F1F3EC`, feuille à bordure graduée et triple filet | Fond blanc, fond sombre, un autre crème |
| Une couleur par fonction : bleu lire, rouge écrire, vert foncé le terme nouveau, or le manque | Une couleur « parce qu'elle fait carte » ; une couleur de thème hors d'une feuille de format |
| Le vert de programme dans la barre d'état seulement | Le vert de programme pour une réussite, un terme, une végétation |
| Une personne en silhouette d'échelle dans une carte de rôle nommée | Une personne en point, pastille, rond, losange ou sans nom (refus d'Ilyas sur CER001) |
| Un document en feuille titrée, rubriques lisibles | Un document réduit à une étiquette (refus d'Ilyas sur CER001) |
| L'objet étudié seulement dans les scènes où la voix en parle | Un décor de l'objet dans une scène qui n'en parle pas (refus d'Ilyas sur CER001) |
| Une ligne de repère qui relie un mot à un mot ; une route qui porte des données | Un trait qui pointe un objet pour désigner une idée (refus d'Ilyas sur CER001) |
| Le temps sur une frise graduée en années entre les jalons dits | Des années non dites sur la frise, une échelle chiffrée inventée |
| Un logiciel en fenêtre redessinée | Une capture, un logo ou une charte de Safe Software ou d'Esri sans licence écrite |
| Le moteur en point géodésique, nommé « MOTEUR » | Le moteur en engrenage, en logo, en icône générique |
| Chaque élément nommé, appelé par un mot, reconnu sans explication | Un ornement cartographique qui ne répond à aucun mot (hors habillage fixe de la feuille) |
| Une seule mise en évidence, tiretée bleue, sans poignée | Deux mises en évidence, un tireté sur le choix sélectionné, des poignées |
| Les formats génériques en L01 (contenus de feuille, sans nom) | Des noms de formats, des chiffres de formats pris en charge |
| Aplats, traits, angles vifs | Dégradés, ombres, coins arrondis (sauf cercles du lieu, du globe et de la mise en évidence d'un point), filtres |
| Textes de 23 px et plus, tirés du storyboard | Texte sous 23 px, texte écrit dans un SVG, lorem ipsum |
| Rien sous les sous-titres ni dans la zone d'action | Mention de source, rose ou dessin dans ces zones |
| Une image fixe de 8 s au plus | Une longue scène vide au début |
| Une preuve par planche par phrase | Juger une scène sur son état final seul |
