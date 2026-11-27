# Gabarits de scène : une scène = un fichier de données

Une scène de forme connue ne s'écrit pas en code sur mesure : un gabarit du moteur (`src/engine/gabarits/`, importé par `../../engine`) l'anime à partir d'un fichier JSON `content/design/scenes/Sxx.json`. La scène tient en trois lignes :

```tsx
import data from "../../../content/design/scenes/S02.json"
import { defineScene, Frise } from "../../engine"

export const s02 = defineScene(Frise.scene(data))
```

| Gabarit | Forme | Appel | `"gabarit"` |
|---|---|---|---|
| `Frise` | frise chronologique : ligne et pointe posées à l'image 0, jalons et tracés, cases des années (deux couches, même vitesse), éléments au-dessus et au-dessous de la ligne | `Frise.scene(data)` | `"frise"` |
| `FicheRubriques` | fiche à rubriques : feuille révélée bande par bande, bandeau et rubriques, objet qui voyage d'une boîte à l'autre, traits et filets | `FicheRubriques.scene(data)` | `"fiche-rubriques"` |

Tout se vérifie au chargement (`npm run check:scenes`, `check`, `build`) : une donnée fausse ou une composition finale défaillante arrête la construction avec une `GabaritError` qui dit le fichier, le champ et quoi faire (§ 6 et § 7). Aucun instant n'est écrit : chaque instant vient d'une locution de la voix, plus les durées de la spécification. Aucun texte n'est écrit : les textes viennent de `## Écran` par leur indice.

Toutes les coordonnées sont en px de scène 1920 × 1080 (une autre taille de composition est refusée), recopiées de `content/design/spec.md`. Un champ qui commence par `_` est un commentaire (ignoré) ; tout autre champ inconnu est une erreur.

## 0. Mise en page de la signature

La face utile, le débord, la marge, la place du titre et celle de la mention de source viennent de la signature active (`PAGE`, `src/engine/signature.ts`), jamais des données ; les jetons de couleur et les polices viennent de son thème (`THEME`, `content/design/theme.json` et défauts de `scripts/sync.mjs`).

| Signature | Face utile (composition finale) | Débord d'un dessin | Marge | Titre (coin haut gauche du texte) | Mention de source |
|---|---|---|---|---|---|
| `carte` | x 104 à 1424, y 180 à 860 | jusqu'à x 1500 entre y 360 et 690 | colonne x 1448 à 1830 (échelle, rose, source) | x 104, y 84 | x 1448, bas à y 820, 250 px, serif italique 24 px, jeton `lien` (survol `lienSurvol`) |
| `bimaccess` | x 110 à 1810, y 180 à 860 | aucun | aucune | x 110, y 64 | bas gauche : x 110, bas à y 1040, 250 px, 24 px, jeton `ink2` (survol `ink`) |
| `neutral` | x 110 à 1810, y 180 à 860 | aucun | aucune | x 110, y 64 | haut droit : x 1560, bas à y 150, 250 px, 24 px, jeton `accent` (survol `ink`) |

La face va du bas du titre au haut des sous-titres. Le débord ne vaut que pour un dessin (illustration, tracé, frise, années), jamais pour un texte ni une mise en évidence. L'habillage (échelle, rose) se pose hors de la face.

## 1. Racine

| Champ | Obligatoire | Contenu |
|---|---|---|
| `gabarit` | oui | `"frise"` ou `"fiche-rubriques"` ; doit correspondre à l'appel de la scène |
| `scene` | oui | `"S02"` |
| `clip` | non | narration d'entrée, défaut `"S02-01"` |
| `ecran` | oui | nombre de textes de `## Écran` du storyboard (garde-fou : la scène casse si le storyboard change) |
| `titre` | non | indice `## Écran` du titre de scène (`Title` à la place du titre de la signature, réserve du fond posée avec la frappe) ; se tape par le geste `{ "frappe": "titre" }` |
| `source` | non | indice `## Écran` de la mention de source (à la place de la signature, lien lu dans `content/sources.json`), posée à l'image 0 |
| `habillage` | non | liste `{ "fichier", "x", "y", "largeur" }` (échelle, rose), posés à l'image 0, hors de la face |
| `styles` | oui si textes | styles de texte nommés (§ 2) |
| `illustrations` | non | illustrations nommées (§ 2) |
| `textes` | non | textes nommés (§ 2) |
| `traces` | non | tracés nommés (§ 2) |
| `frise`, `annees` | `Frise` seulement | § 3 |
| `feuille` | `FicheRubriques` seulement | § 3 |
| `ordre` | non | ordre de pose (dessous vers dessus) des illustrations, tracés, années et `"frise"` ; tous, une fois chacun. Défaut : illustrations dans l'ordre du fichier, puis `frise`, `annees`, `traces` |
| `etapes` | oui | § 4 |
| `evidences` | non | § 4 |

Ordre de pose fixe au-dessus des pièces : textes, mention de source, titre, mise en évidence. L'habillage est dessous.

Chaque texte de `## Écran` doit être posé une fois et une seule (dans `textes`, `titre` ou `source`).

`content/sources.json` : `{ "sources": { "S02": "https://…" } }`, une adresse par scène qui a une mention de source, tirée des sources de la leçon.

## 2. Éléments

Les identifiants (clés de `illustrations`, `textes`, `traces`, `annees`) sont uniques dans le fichier ; `titre` et `frise` sont réservés. Ils servent de `data-testid` (`s02-<id>`).

### Illustration

```json
"sceau": { "fichier": "s02-ill-sceau", "x": 276, "y": 684, "largeur": 140 }
```

| Champ | Contenu |
|---|---|
| `fichier` | nom dans `content/design/assets/`, sans `.svg` |
| `x`, `y`, `largeur` | coin haut gauche et largeur ; la hauteur est tirée du `viewBox` (jamais étirée) |
| `aplat` | facultatif : jeton posé sous l'illustration (`"background"` pour une illustration sans aplat, qui laisserait voir la grille ou le carroyage) |
| `decoupe` | facultatif : `"cercle"` (l'illustration est vue à travers son cercle inscrit : globe) |

### Style

```json
"libelle": { "police": "body", "taille": 30, "interligne": 1.15, "couleur": "ink" }
```

`police` (une clé de `THEME.fonts` : `body`, `display`, `mono`, `paper` dans toutes les signatures ; `serif` et `capitales` en carte), `taille` ; facultatifs : `graisse` (400), `interligne` (1,2), `interlettrage` (em, 0), `capitales` (false), `italique` (false). `couleur` est un **nom de jeton** du thème de la signature (`ink`, `accent`, `panel`… partout ; en carte aussi `encre`, `terme`, `lien`…), jamais `#RRVVBB`.

### Texte

```json
"jalon-1993-libelle": { "ecran": 4, "style": "libelle", "x": 478, "y": 608, "largeur": 370, "lignes": 2 },
"saif-nom": { "ecran": 5, "style": "terme", "cx": 902, "y": 256, "place": "carte", "dans": "saif", "largeurMesuree": 93 }
```

| Champ | Contenu |
|---|---|
| `ecran` | indice dans `## Écran` (à partir de 0 : colonne « Rang » de la spécification) |
| `style` | clé de `styles` |
| `x` ou `cx` | bord gauche du texte, ou centre (un seul des deux) ; texte centré en capitales : l'interlettrage de fin est compensé |
| `y` | haut du texte |
| `largeur` et `lignes` | texte qui revient à la ligne : largeur de retour à la ligne et nombre de lignes vu à la planche (les deux ensemble) |
| `largeurMesuree` | texte sur une ligne : sa largeur mesurée à la planche (colonne « Place » de la spécification) ; sans effet sur l'image |
| `place` | `"face"` (défaut) ou `"carte"` (écrit dans une illustration : carte, feuille, cartouche) |
| `reserve` | un jeton du thème, ou `"aucune"` ; défaut : le fond de la signature (`background`) sur la face, `aucune` dans une carte (aucune réserve sous un texte posé dans une carte ou une feuille tant que les illustrations ne sont pas aux couleurs exactes des jetons) |
| `dans` | facultatif : identifiant d'une illustration ; le texte se découvre dans son balayage (même boîte, même instant, même sens) et ne prend pas de geste ; refusé si l'illustration se déplace |
| `langue` | facultatif : `"en"` pour un nom anglais |

Un texte a toujours une boîte connue : `largeur` et `lignes`, ou `largeurMesuree`. Sans elle, la scène est refusée : les contrôles de composition (§ 6) mesurent chaque texte (hauteur = lignes × taille × interligne).

Réserve : 2 px en haut et en bas, 6 px à gauche et à droite ; balayée avec le texte, ou posée au début de la frappe.

### Tracé

```json
"jalon-1993": { "points": [[462, 560], [462, 600]], "epaisseur": 2.5 },
"route-1": { "points": [[591.5, 318], [786, 318]], "couches": [
  { "couleur": "ink", "epaisseur": 11 }, { "couleur": "panel", "epaisseur": 8 }, { "couleur": "accent2", "epaisseur": 4 } ] },
"pointe-1": { "d": "M786 308 L800 318 L786 328 Z", "epaisseur": 2, "remplissage": "accent2" }
```

`points` (de départ à arrivée : le sens du tracé) ou `d` (chemin SVG) ; `couleur` (défaut `ink`) et `epaisseur`, ou `couches` (de dessous vers dessus, même chemin, même instant, même durée) ; `remplissage` pour une forme fermée, posé quand le contour est complet. Bouts nets, angles vifs en signatures bimaccess et carte. Trait à vitesse constante.

## 3. Pièces propres à chaque gabarit

### `Frise`

```json
"frise": { "de": [436, 580], "a": [1406, 580], "epaisseur": 3, "pointe": [[1406, 571], [1424, 580], [1406, 589]] },
"annees": { "cases": { "de": [462, 580], "a": [1024, 580], "epaisseur": 14,
                       "claire": { "de": [649, 580], "a": [837, 580], "epaisseur": 10 } } }
```

- `frise` (obligatoire) : la ligne et sa pointe pleine, posées à l'image 0 sans geste ; `couleur` défaut `ink`.
- `annees` : cases des années, deux couches. Couche foncée de `de` à `a` (`couleur` défaut `ink`), couche claire `claire` (défaut `panel`) posée dessus, qui part quand la foncée atteint son début et va à la même vitesse ; la durée du geste est celle de la couche foncée, le reste se tire de `getLength`. Les bouts de la couche claire doivent être sur la foncée. Geste : `{ "trace": "cases", "duree": 0.45 }`.
- Les jalons sont des tracés ordinaires (`traces`), tracés de haut en bas.

### `FicheRubriques`

```json
"feuille": { "illustration": "feuille", "bandes": [289.5, 497.9, 624.6] }
```

- `illustration` : identifiant de la feuille dans `illustrations`.
- `bandes` : bas de chaque bande, de haut en bas, sauf la dernière (son bas est le bas de l'illustration). Ici quatre bandes : B1 du haut de la feuille à 289,5, B2, B3, B4 jusqu'au bas.
- La feuille se révèle par une seule découpe dont le bas descend bande par bande (jamais des balayages empilés : couture), par les gestes `{ "bande": 1, "duree": 0.25 }`, dans l'ordre 1, 2, 3, 4 ; elle ne prend pas d'autre geste.
- L'objet qui voyage : une illustration révélée, puis `{ "deplacement": "contour", "vers": [829, 344], "duree": 0.3 }` (coin haut gauche d'arrivée, ligne droite, même échelle, sortie courte ; un seul par illustration).

## 4. Étapes, gestes, états, mises en évidence

Une étape = une ligne de la table « Apparitions » de la spécification.

```json
{ "locution": "De ce contrat naît", "etat": "S02-3", "gestes": [
  { "trace": "jalon-1993", "duree": 0.25 },
  { "frappe": "jalon-1993-libelle" } ] }
```

| Champ | Contenu |
|---|---|
| `debut` | `true` : la première étape, à l'image 0 (décor : gestes `poser`) ; obligatoire pour la première |
| `locution` | mots dits mot pour mot, uniques dans le clip, pris au début de la phrase (colonne « Locution ») |
| `repere` | à la place de `locution` : clé de `content/beats.json` |
| `etat` | facultatif : `data-board` à partir de cette étape (`S02-1`… ; le premier sur l'étape `debut`, le dernier `S02-FIN`) ; une étape sans `etat` garde l'état précédent |
| `gestes` | facultatif : liste, **enchaînés** dans l'ordre (chacun part à la fin du précédent) |

Gestes (un seul type par objet) :

| Geste | Cible | Champs | Durée |
|---|---|---|---|
| `{ "poser": id }` | illustration, texte, tracé, années | | 0 (paraît d'un coup ; décor de l'image 0) |
| `{ "balayage": id, "sens": "droite", "duree": 0.3 }` | illustration, texte | `sens` : `droite` (gauche → droite), `gauche`, `bas` (haut → bas), `haut` (du sol au toit) | `duree` |
| `{ "frappe": id }` | texte, `"titre"` | | cadence du thème (`typingCps`), jamais de `duree` |
| `{ "trace": id, "duree": 0.4 }` | tracé, années | | `duree` |
| `{ "deplacement": id, "vers": [x, y], "duree": 0.3 }` | illustration déjà révélée | | `duree` |
| `{ "bande": n, "duree": 0.25 }` | bande n de la feuille | | `duree` |

`"avec": true` : le geste part **en même temps** que le précédent au lieu de le suivre ; sans `duree`, il dure autant que lui (filet tracé pendant la frappe : `{ "frappe": "usage" }, { "trace": "filet", "avec": true }`). Le geste suivant part quand le plus long du groupe finit. Chaque élément est révélé une seule fois.

Mises en évidence (table « Mise en évidence » de la spécification) :

```json
"evidences": {
  "traduction": { "x": 597, "y": 252, "largeur": 198, "hauteur": 50,
                  "de": "une technologie de traduction pour SAIF", "a": "Trois ans après la fondation" },
  "systeme": { "x": 814.7, "y": 633.8, "largeur": 571.6, "hauteur": 150.2, "de": "Son système de coordonnées" } }
```

Le rectangle est celui du tireté ; `de` et `a` sont des locutions ; `a` absent ou `"fin"` : jusqu'à la fin de la scène (état final). `forme` : `"rectangle"` (défaut) ou `"cercle"` (cercle de rayon demi-diagonale autour du rectangle). Le tireté se trace en 0,25 s à `de` en signature carte (contour tireté et poignées en bimaccess). Une seule à la fois : les intervalles ne se recouvrent pas (un `a` peut égaler le `de` suivant). Le cadre reste dans la face (§ 6).

## 5. Exemples courts

Écrits pour la signature carte (face x 104 à 1424) avec les jetons communs (`ink`, `panel`) : valables dans toute signature, aux places près. Un exemple montre la forme, pas une scène : chargé tel quel, il serait refusé (textes d'Écran non posés, § 1, et face non remplie, § 6). Un exemple complet qui passe tous les contrôles, calculé sur la face de la signature du projet : `scripts/gabarits-selftest.mjs` (`npm run test:gabarits -- --keep` garde le projet d'essai et ses `content/design/scenes/S01.json` et `S02.json`).

`Frise`, trois éléments :

```json
{
  "gabarit": "frise", "scene": "S02", "ecran": 11, "titre": 0, "source": 10,
  "styles": { "libelle": { "police": "body", "taille": 30, "interligne": 1.15, "couleur": "ink" } },
  "frise": { "de": [436, 580], "a": [1406, 580], "epaisseur": 3, "pointe": [[1406, 571], [1424, 580], [1406, 589]] },
  "illustrations": { "contrat": { "fichier": "s02-ill-contrat", "x": 104, "y": 410, "largeur": 332 } },
  "traces": { "jalon-1993": { "points": [[462, 560], [462, 600]], "epaisseur": 2.5 } },
  "textes": { "jalon-1993-libelle": { "ecran": 4, "style": "libelle", "x": 478, "y": 608, "largeurMesuree": 472 } },
  "etapes": [
    { "debut": true, "etat": "S02-1", "gestes": [{ "poser": "contrat" }] },
    { "locution": "De ce contrat naît", "etat": "S02-2", "gestes": [{ "trace": "jalon-1993", "duree": 0.25 }, { "frappe": "jalon-1993-libelle" }] },
    { "locution": "Murray et Lutz commencent par ce travail", "etat": "S02-FIN", "gestes": [{ "frappe": "titre" }] }
  ],
  "evidences": { "libelle": { "x": 468, "y": 598, "largeur": 492, "hauteur": 55, "de": "Trois ans après la fondation" } }
}
```

`FicheRubriques`, une feuille à deux bandes et un objet qui voyage :

```json
{
  "gabarit": "fiche-rubriques", "scene": "S04", "ecran": 7, "titre": 0, "source": 6,
  "styles": { "rubrique": { "police": "mono", "graisse": 600, "taille": 24, "interlettrage": 0.16, "capitales": true, "couleur": "ink" } },
  "illustrations": {
    "feuille": { "fichier": "s04-ill-feuille", "x": 777, "y": 192, "largeur": 647 },
    "contour": { "fichier": "s04-ill-contour", "x": 349, "y": 544, "largeur": 160 }
  },
  "feuille": { "illustration": "feuille", "bandes": [289.5] },
  "textes": { "geometrie": { "ecran": 2, "style": "rubrique", "x": 829, "y": 303, "place": "carte", "largeurMesuree": 470 } },
  "etapes": [
    { "debut": true, "etat": "S04-1", "gestes": [{ "poser": "contour" }] },
    { "locution": "La donnée, elle", "etat": "S04-2", "gestes": [{ "bande": 1, "duree": 0.25 }] },
    { "locution": "Sa géométrie porte", "etat": "S04-FIN", "gestes": [
      { "bande": 2, "duree": 0.25 }, { "frappe": "geometrie" },
      { "deplacement": "contour", "vers": [829, 344], "duree": 0.3, "avec": true } ] }
  ],
  "evidences": { "geometrie": { "x": 814.7, "y": 298.7, "largeur": 571.6, "hauteur": 187.7, "de": "Sa géométrie porte" } }
}
```

## 6. Remplir la feuille : contrôles bloquants de la composition finale

Le remplissage et la propreté de la composition ne se constatent pas après coup : ils se garantissent en amont (le graphiste compose la feuille remplie, skill `scenes-gabarits`) et se contrôlent au chargement, en fin de chaîne. Une composition qui manque à une règle fait échouer `npm run check`, `check:scenes` et `build` avec une seule `GabaritError` qui liste tous ses défauts (quinze au plus), chacun avec sa place et ce qu'il faut faire.

Ce qui est contrôlé : l'état final de la scène, éléments à leur place d'arrivée (après `deplacement`). Éléments : illustrations (feuille comprise), textes, tracés (épaisseur comprise), frise (ligne, et pointe à ses sommets), années ; ni le titre, ni la marge (source, habillage), ni les mises en évidence (sauf règle 2).

| N° | Règle | Seuil |
|---|---|---|
| 1 | chaque texte reste dans la face | face de la signature (§ 0), au dixième de pixel |
| 2 | le cadre de chaque mise en évidence reste dans la face (cercle : son carré englobant) | idem |
| 3 | chaque illustration, tracé, frise et années reste dans la face, ou dans le débord de la signature | face et débord (§ 0) |
| 4 | l'habillage reste hors de la face | `COMPOSITION.tolerance` |
| 5 | aucun texte posé sur un trait (tracé, frise, années) | trait avec son épaisseur, `COMPOSITION.tolerance` |
| 6 | deux textes ne se chevauchent pas | `COMPOSITION.tolerance` |
| 7 | un texte de la face ne chevauche aucune illustration ; un texte `"carte"` (ou `dans`) est contenu dans l'illustration qui le porte (`dans`, sinon la plus petite qui le contient) et ne chevauche aucune autre illustration que celles qui la contiennent | `COMPOSITION.tolerance` |
| 8 | deux illustrations ne se chevauchent pas, sauf si l'une contient entièrement l'autre (élément posé dans une carte ou une feuille, objet arrivé dans sa boîte) | `COMPOSITION.tolerance` |
| 9 | un trait ne traverse pas une illustration : s'il la touche, il y commence ou y finit (route qui relie deux illustrations, filet tracé sur la feuille) | `COMPOSITION.tolerance` |
| 10 | la face est remplie : aucun vide où tient un carré de plus de `videCarre` × la hauteur de la face | `COMPOSITION.videCarre` = 0,2, soit 136 px sur une face de 680 px de haut |
| 11 | la face est remplie : aucune bande vide plus longue que `bandeLongueur` × la largeur de la face et plus épaisse que `bandeEpaisseur` × sa hauteur | `bandeLongueur` = 0,4 (528 px en carte, 680 px en bimaccess), `bandeEpaisseur` = 0,1 (68 px) |

Constantes nommées (`COMPOSITION`, `src/engine/gabarits/plan.ts`, exportées par le moteur) : `videCarre` 0,2 ; `bandeLongueur` 0,4 ; `bandeEpaisseur` 0,1 ; `pas` 5 px (grille du contrôle de remplissage : les boîtes y sont arrondies vers l'extérieur, un vide est donc mesuré au plus juste à 5 px près) ; `tolerance` 2 px (bords qui se touchent, pointe d'une flèche posée sur sa cible). La face et le débord sont ceux de la signature active (`ZONE` = `PAGE.face`).

Calibrage (pilote FME001, signature carte, face 1320 × 680) : ces seuils refusent le vide sous la frise de S02 aux essais 2 et 3 (essai 3 : x 434 à 1059, y 695 à 860, et x 849 à 1039, y 590 à 800 ; essai 2 : x 439 à 879, y 700 à 860, et deux vides à droite) et les cadres de mise en évidence qui sortaient de la face (essai 3 : 10 px à droite de x 1424 ; essai 2 : 5 px sous y 860) ; ils acceptent la composition de S04 des deux essais, dont les vides restants sont des gouttières de 95 px au plus, et les intervalles d'environ 100 px entre les routes de S02. Les textes de S04 à l'essai 2 n'avaient pas de largeur mesurée : ils seraient refusés pour cela d'abord.

Le contrôle voit les boîtes, pas les traits : une illustration au dessin clairsemé compte comme pleine, d'où la découpe serrée des illustrations. Il ne remplace pas la planche : elle se regarde toujours.

Exemple de message :

```
GabaritError : content/design/scenes/S02.json, champ « (composition finale) » : 3 défaut(s) de composition (docs/gabarits.md § 6), à corriger dans les places et les tailles des données, sans changer le sens :
  1. evidences.nom-origine : le cadre de la mise en évidence sort de la face x 104 à 1424, y 180 à 860 de 10 px à droite (x 1434 > 1424). À faire : resserrer le cadre sur l'élément ou le déplacer, …
  2. la face n'est pas remplie : vide de x 434 à 1059, y 695 à 860 (625 × 165 px) : un carré de 165 px y tient (au plus 136 px : 0,2 × la hauteur de la face) ; éléments qui le bordent : illustrations.contrat, illustrations.sceau, illustrations.logo, … À faire : agrandir ou déplacer vers ce vide les illustrations qui le bordent …
```

Pour remplir sans changer le sens :

- garder les mêmes illustrations, les mêmes gestes, les mêmes locutions ; changer leurs places et leurs tailles (`largeur` libre, la hauteur suit toujours le `viewBox` : jamais étirée) ;
- replacer ensuite, sur les nouvelles boîtes, les textes posés dans une illustration, les tracés qui la touchent (routes, traits, jalons) et les rectangles de mise en évidence ; aucun texte sur un trait ; vérifier à la planche ;
- `Frise` : la frise va de bord à bord de la face (et dans le débord de la signature) ; jalons et cases se placent sur sa ligne ; un élément au-dessus ou au-dessous de la ligne peut descendre jusqu'au bas de la face ;
- une illustration manque vraiment : le dire au graphiste (commande d'illustration sur devis), jamais combler par un élément sans rôle dans le sens.

## 7. Erreurs de chargement

Forme : `GabaritError : <fichier>, champ « <chemin> » : <ce qui est faux>. À faire : <correction>`. Les erreurs du moteur (`LocutionError`, `TextError`) arrivent enveloppées avec le champ qui les cause.

| Message (extrait) | Sens | Correction |
|---|---|---|
| `etapes[3].locution : LocutionError … locution introuvable` | les mots ne sont pas dits tels quels dans le clip | copier la locution mot pour mot du storyboard ; `ambiguë` : l'allonger |
| `textes.siege.ecran : indice 14 hors de « ## Écran »` | indice au-delà du nombre de textes | recopier le rang de la spécification |
| `ecran : … TextError … la scène en attend 11` | le storyboard a changé de nombre de textes | mettre `ecran` à jour, revoir les indices |
| `textes : le texte n° 3 … n'est posé nulle part` / `déjà posé par` | chaque texte d'Écran une fois | ajouter ou retirer un texte |
| `textes.entite : largeur du texte inconnue` | ni `largeur` ni `largeurMesuree` | recopier la largeur mesurée à la planche ; `lignes` avec `largeur` |
| `illustrations.sceau.fichier : TextError … absente de content/design/assets/` | fichier inconnu | nommer un fichier présent (la liste est dans le message) |
| `… viewBox lisible` | SVG sans `viewBox` | au graphiste |
| `etapes[4].gestes : … finissent à 25,15 s, après le début de l'étape suivante … déborde de 1,35 s` | l'enchaînement mange l'étape suivante | raccourcir une durée, mettre un geste `avec`, ou le passer à l'étape suivante ; jamais un instant |
| `… après la fin de la scène` | la dernière étape finit après la voix et la traîne | raccourcir |
| `evidences.nom-origine.de : … s'allume pendant « jalon-1996 »` | deux mises en évidence à la fois | `a` de la première = `de` de la seconde |
| `… jamais révélé` / `déjà révélé par` | un élément sans geste, ou deux fois | un geste par élément (ou `dans`) |
| `… se déplace avant d'être révélé` | `deplacement` avant `poser` ou `balayage` | |
| `textes.x.dans : … qui se déplace ensuite` | un texte balayé avec une illustration qui voyage resterait sur place | révéler le texte par un geste à sa place d'arrivée |
| `… bande 2 révélée avant la bande 1` | bandes hors d'ordre | dans l'ordre, de haut en bas |
| `etapes : dernier état « S02-12 » au lieu de « S02-FIN »` | | nommer l'état final `Sxx-FIN` |
| `… sens du balayage manquant`, `durée manquante`, `la frappe dure le temps de la cadence` | champ du geste | ajouter ou retirer le champ |
| `… champ inconnu. À faire : champs permis ici : …` | faute de frappe dans un nom de champ | le message liste les champs permis |
| `… jeton de couleur … inconnu du thème` | couleur écrite en valeur, ou jeton d'une autre signature | nom de jeton du thème (la liste est dans le message) |
| `(composition finale) : N défaut(s) de composition` | § 6 | § 6 |
| `composition de 1280 × 720 px` | taille de composition autre que 1920 × 1080 | revenir à 1920 × 1080, ou écrire la scène à la main |

## 8. Vérifier une scène

Depuis le dossier du projet :

```bash
npm run check:scenes     # chargement seul, une seconde : lire la GabaritError s'il y en a une
npm run check            # code 0, « scènes chargées : N », puis tsc
node "${CLAUDE_PLUGIN_ROOT}/skills/scenes/scripts/check-literals.mjs" src/lesson   # 0 texte en dur
npm run build
npm run test:play
npm run test:gabarits    # auto-test des gabarits dans la signature du projet (--play : rendu dans un vrai navigateur)
```

Puis regarder la planche par phrase (skill `qa` : une capture au milieu de chaque phrase, et l'état final) contre la spécification : chaque élément sur sa phrase, aucun texte sur un trait, une seule mise en évidence, la face remplie. Plusieurs agents sur le même projet (une scène par agent) : `sync`, `check`, `check:scenes` et `build` réécrivent les mêmes fichiers générés ; les lancer sous verrou, `node "${CLAUDE_PLUGIN_ROOT}/scripts/sous-verrou.mjs" -- npm run check:scenes`.
