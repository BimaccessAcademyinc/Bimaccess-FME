# Gabarits de scène : une scène = un fichier de données

Deux composants du moteur (`src/engine/gabarits/`, importés par `../../engine`) animent une scène à partir d'un fichier JSON `content/design/scenes/Sxx.json`. La scène tient en trois lignes :

```tsx
import data from "../../../content/design/scenes/S02.json"
import { defineScene, Frise } from "../../engine"

export const s02 = defineScene(Frise.scene(data))
```

| Gabarit | Forme | Appel | `"gabarit"` |
|---|---|---|---|
| `Frise` | S02 : ligne et pointe posées à l'image 0, jalons et tracés, cases des années (deux couches, même vitesse), éléments au-dessus et au-dessous de la ligne | `Frise.scene(data)` | `"frise"` |
| `FicheRubriques` | S04 : feuille révélée bande par bande, bandeau et rubriques, objet qui voyage d'une boîte à l'autre, traits et filets | `FicheRubriques.scene(data)` | `"fiche-rubriques"` |

Tout se vérifie au chargement (`npm run check:scenes`, `check`, `build`) : une donnée fausse arrête la construction avec une `GabaritError` qui dit le fichier, le champ et quoi faire (§ 5). Aucun instant n'est écrit : chaque instant vient d'une locution de la voix, plus les durées de la spécification. Aucun texte n'est écrit : les textes viennent de `## Écran` par leur indice.

Toutes les coordonnées sont en px de scène 1920 × 1080, recopiées de `content/design/spec.md`. Un champ qui commence par `_` est un commentaire (ignoré) ; tout autre champ inconnu est une erreur.

## 1. Racine

| Champ | Obligatoire | Contenu |
|---|---|---|
| `gabarit` | oui | `"frise"` ou `"fiche-rubriques"` ; doit correspondre à l'appel de la scène |
| `scene` | oui | `"S02"` |
| `clip` | non | narration d'entrée, défaut `"S02-01"` |
| `ecran` | oui | nombre de textes de `## Écran` du storyboard (garde-fou : la scène casse si le storyboard change) |
| `titre` | non | indice `## Écran` du titre de scène (`Title`, x 104, y 84, réserve `fond` posée avec la frappe) ; se tape par le geste `{ "frappe": "titre" }` |
| `source` | non | indice `## Écran` de la mention de source (marge, calée par le bas à y 820, lien lu dans `content/sources.json`), posée à l'image 0 |
| `habillage` | non | liste `{ "fichier", "x", "y", "largeur" }` (échelle, rose), posés à l'image 0 |
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
| `aplat` | facultatif : jeton posé sous l'illustration (`"fond"` pour une illustration sans aplat, qui laisserait voir les amorces du carroyage) |
| `decoupe` | facultatif : `"cercle"` (l'illustration est vue à travers son cercle inscrit : globe) |

### Style

```json
"libelle": { "police": "serif", "taille": 30, "interligne": 1.15, "couleur": "encre" }
```

`police` (`serif`, `capitales`, ou autre clé de `THEME.fonts`), `taille` ; facultatifs : `graisse` (400), `interligne` (1,2), `interlettrage` (em, 0), `capitales` (false), `italique` (false). `couleur` est un **nom de jeton** du thème (`encre`, `terme`, `lien`…), jamais `#RRVVBB`.

### Texte

```json
"jalon-1993-libelle": { "ecran": 4, "style": "libelle", "x": 478, "y": 608, "largeurMesuree": 472 },
"saif-nom": { "ecran": 5, "style": "terme", "cx": 902, "y": 256, "place": "carte", "dans": "saif" }
```

| Champ | Contenu |
|---|---|
| `ecran` | indice dans `## Écran` (à partir de 0 : colonne « Rang » de la spécification) |
| `style` | clé de `styles` |
| `x` ou `cx` | bord gauche du texte, ou centre (un seul des deux) ; texte centré en capitales : l'interlettrage de fin est compensé |
| `y` | haut du texte |
| `largeur` | facultatif : largeur de retour à la ligne ; sans elle, une seule ligne |
| `place` | `"face"` (défaut) ou `"carte"` (dans une carte ou une feuille) |
| `reserve` | `"fond"`, `"papier"` ou `"aucune"` ; défaut : `fond` sur la face, `aucune` dans une carte (recommandation du rapport 21 tant que les aplats des illustrations ne sont pas au jeton `papier` ; décision d'Ilyas ouverte : `"papier"` suit la spécification à la lettre) |
| `dans` | facultatif : identifiant d'une illustration ; le texte se découvre dans son balayage (même boîte, même instant, même sens) et ne prend pas de geste |
| `langue` | facultatif : `"en"` pour un nom anglais |
| `largeurMesuree`, `lignes` | facultatifs, sans effet sur l'image : pour le contrôle de remplissage (§ 6) |

Réserve : 2 px en haut et en bas, 6 px à gauche et à droite ; balayée avec le texte, ou posée au début de la frappe.

### Tracé

```json
"jalon-1993": { "points": [[462, 560], [462, 600]], "epaisseur": 2.5 },
"route-1": { "points": [[591.5, 318], [786, 318]], "couches": [
  { "couleur": "encre", "epaisseur": 11 }, { "couleur": "chaussee", "epaisseur": 8 }, { "couleur": "ecriture", "epaisseur": 4 } ] },
"pointe-1": { "d": "M786 308 L800 318 L786 328 Z", "epaisseur": 2, "remplissage": "ecriture" }
```

`points` (de départ à arrivée : le sens du tracé) ou `d` (chemin SVG) ; `couleur` (défaut `encre`) et `epaisseur`, ou `couches` (de dessous vers dessus, même chemin, même instant, même durée) ; `remplissage` pour une forme fermée, posé quand le contour est complet. Bouts nets, angles vifs. Trait à vitesse constante.

## 3. Pièces propres à chaque gabarit

### `Frise`

```json
"frise": { "de": [436, 580], "a": [1406, 580], "epaisseur": 3, "pointe": [[1406, 571], [1424, 580], [1406, 589]] },
"annees": { "cases": { "de": [462, 580], "a": [1024, 580], "epaisseur": 14,
                       "claire": { "de": [649, 580], "a": [837, 580], "epaisseur": 10 } } }
```

- `frise` (obligatoire) : la ligne et sa pointe pleine, posées à l'image 0 sans geste ; `couleur` défaut `encre`.
- `annees` : cases des années, deux couches. Couche foncée de `de` à `a` (`couleur` défaut `encre`), couche claire `claire` (défaut `papier`) posée dessus, qui part quand la foncée atteint son début et va à la même vitesse ; la durée du geste est celle de la couche foncée, le reste se tire de `getLength`. Les bouts de la couche claire doivent être sur la foncée. Geste : `{ "trace": "cases", "duree": 0.45 }`.
- Les jalons sont des tracés ordinaires (`traces`), tracés de haut en bas.

### `FicheRubriques`

```json
"feuille": { "illustration": "feuille", "bandes": [289.5, 497.9, 624.6] }
```

- `illustration` : identifiant de la feuille dans `illustrations`.
- `bandes` : bas de chaque bande, de haut en bas, sauf la dernière (son bas est le bas de l'illustration). Ici quatre bandes : B1 de 192 à 289,5, B2, B3, B4 jusqu'au bas.
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

Le rectangle est celui du tireté ; `de` et `a` sont des locutions ; `a` absent ou `"fin"` : jusqu'à la fin de la scène (état final). `forme` : `"rectangle"` (défaut) ou `"cercle"`. Le tireté se trace en 0,25 s à `de`. Une seule à la fois : les intervalles ne se recouvrent pas (un `a` peut égaler le `de` suivant).

## 5. Exemples courts

`Frise`, trois éléments. Un exemple montre la forme, pas une scène : chargé tel quel, il serait refusé (textes d'Écran non posés, § 1, et feuille non remplie, § 6).

```json
{
  "gabarit": "frise", "scene": "S02", "ecran": 11, "titre": 0, "source": 10,
  "styles": { "libelle": { "police": "serif", "taille": 30, "interligne": 1.15, "couleur": "encre" } },
  "frise": { "de": [436, 580], "a": [1406, 580], "epaisseur": 3, "pointe": [[1406, 571], [1424, 580], [1406, 589]] },
  "illustrations": { "contrat": { "fichier": "s02-ill-contrat", "x": 104, "y": 410, "largeur": 332 } },
  "traces": { "jalon-1993": { "points": [[462, 560], [462, 600]], "epaisseur": 2.5 } },
  "textes": { "jalon-1993-libelle": { "ecran": 4, "style": "libelle", "x": 478, "y": 608 } },
  "etapes": [
    { "debut": true, "etat": "S02-1", "gestes": [{ "poser": "contrat" }] },
    { "locution": "De ce contrat naît", "etat": "S02-2", "gestes": [{ "trace": "jalon-1993", "duree": 0.25 }, { "frappe": "jalon-1993-libelle" }] },
    { "locution": "Murray et Lutz commencent par ce travail", "etat": "S02-FIN", "gestes": [{ "frappe": "titre" }] }
  ],
  "evidences": { "libelle": { "x": 468, "y": 598, "largeur": 492, "hauteur": 55, "de": "Trois ans après la fondation" } }
}
```

`FicheRubriques`, une feuille à deux bandes et un objet qui voyage (même remarque) :

```json
{
  "gabarit": "fiche-rubriques", "scene": "S04", "ecran": 7, "titre": 0, "source": 6,
  "styles": { "rubrique": { "police": "capitales", "graisse": 600, "taille": 24, "interlettrage": 0.16, "capitales": true, "couleur": "encre" } },
  "illustrations": {
    "feuille": { "fichier": "s04-ill-feuille", "x": 777, "y": 192, "largeur": 647 },
    "contour": { "fichier": "s04-ill-contour", "x": 349, "y": 544, "largeur": 160 }
  },
  "feuille": { "illustration": "feuille", "bandes": [289.5] },
  "textes": { "geometrie": { "ecran": 2, "style": "rubrique", "x": 829, "y": 303, "place": "carte" } },
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

## 6. Remplir la feuille

Décision d'Ilyas après l'essai 1 : la composition finale doit occuper la **zone utile** de la feuille, la même pour les deux gabarits (`ZONE` du moteur) : x 104 à 1816 (même retrait des deux côtés de la face, colonne de droite comprise : l'essai 1 laissait vide le tiers droit, x 1448 à 1816, défaut relevé par Ilyas), y 180 (bas du titre) à 860 (haut des sous-titres). La marge fixe y compte comme occupée (`MARGE_OCCUPEE`) : mention de source et rose des vents (x 1448 à 1828, y 700 à 820), zone d'action (x 1454, y 834). Au-dessus de y 700, la colonne x 1448 à 1816 est donc à remplir par la composition.

Contrôle au chargement : les boîtes de la composition finale (illustrations à leur place d'arrivée, feuille, tracés avec leur épaisseur, frise, années, textes ; ni titre, ni marge, ni mises en évidence) sont posées sur une grille de 10 px ; le plus grand rectangle vide ne doit pas dépasser **à la fois** 20 % de la largeur (342 px, `VIDE_MAX_LARGEUR`) et 25 % de la hauteur (170 px, `VIDE_MAX`) de la zone. Sinon :

```
GabaritError : content/design/scenes/S02.json, champ « (composition finale) » : la feuille n'est pas remplie :
vide de x 444 à 854, y 650 à 860 (410 × 210 px), … ; éléments qui le bordent : illustrations.contrat, …
```

C'est le vide qu'a la composition S02 de la spécification sous la frise. Pour remplir sans changer le sens :

- garder les mêmes illustrations, les mêmes gestes, les mêmes locutions ; changer leurs places et leurs tailles (`largeur` libre, la hauteur suit toujours le `viewBox` : jamais étirée) ;
- replacer ensuite, sur les nouvelles boîtes, les textes posés dans une illustration, les tracés qui la touchent (routes, trait, jalons) et les rectangles de mise en évidence ; aucun texte sur un trait ; vérifier à la planche ;
- `Frise` : la frise peut aller de x 104 à 1816 (sa pointe au-dessus de la mention de source, qui commence à y 700) ; jalons et cases se placent sur sa ligne ; un élément au-dessus ou au-dessous de la ligne peut descendre jusqu'à y 860 ;
- un texte sans `largeur` compte pour une ligne de largeur nulle : donner `largeurMesuree` (largeur mesurée de la spécification, colonne « Place ») pour qu'il compte en entier ; `lignes` pour un texte à `largeur` sur plusieurs lignes.

Le contrôle voit les boîtes, pas les traits : une illustration au dessin clairsemé compte comme pleine. Il ne remplace pas la planche.

## 7. Erreurs de chargement

Forme : `GabaritError : <fichier>, champ « <chemin> » : <ce qui est faux>. À faire : <correction>`. Les erreurs du moteur (`LocutionError`, `TextError`) arrivent enveloppées avec le champ qui les cause.

| Message (extrait) | Sens | Correction |
|---|---|---|
| `etapes[3].locution : LocutionError … locution introuvable` | les mots ne sont pas dits tels quels dans le clip | copier la locution mot pour mot du storyboard ; `ambiguë` : l'allonger |
| `textes.siege.ecran : indice 14 hors de « ## Écran »` | indice au-delà du nombre de textes | recopier le rang de la spécification |
| `ecran : … TextError … la scène en attend 11` | le storyboard a changé de nombre de textes | mettre `ecran` à jour, revoir les indices |
| `textes : le texte n° 3 … n'est posé nulle part` / `déjà posé par` | chaque texte d'Écran une fois | ajouter ou retirer un texte |
| `illustrations.sceau.fichier : TextError … absente de content/design/assets/` | fichier inconnu | nommer un fichier présent (la liste est dans le message) |
| `… viewBox lisible` | SVG sans `viewBox` | au graphiste |
| `etapes[4].gestes : … finissent à 25,15 s, après le début de l'étape suivante … déborde de 1,35 s` | l'enchaînement mange l'étape suivante | raccourcir une durée, mettre un geste `avec`, ou le passer à l'étape suivante ; jamais un instant |
| `… après la fin de la scène` | la dernière étape finit après la voix et la traîne | raccourcir |
| `evidences.nom-origine.de : … s'allume pendant « jalon-1996 »` | deux mises en évidence à la fois | `a` de la première = `de` de la seconde |
| `… jamais révélé` / `déjà révélé par` | un élément sans geste, ou deux fois | un geste par élément (ou `dans`) |
| `… se déplace avant d'être révélé` | `deplacement` avant `poser` ou `balayage` | |
| `… bande 2 révélée avant la bande 1` | bandes hors d'ordre | dans l'ordre, de haut en bas |
| `etapes : dernier état « S02-12 » au lieu de « S02-FIN »` | | nommer l'état final `Sxx-FIN` |
| `… sens du balayage manquant`, `durée manquante`, `la frappe dure le temps de la cadence` | champ du geste | ajouter ou retirer le champ |
| `… champ inconnu. À faire : champs permis ici : …` | faute de frappe dans un nom de champ | le message liste les champs permis |
| `… jeton de couleur … inconnu du thème` | couleur écrite en valeur | nom de jeton |
| `(composition finale) : la feuille n'est pas remplie : vide de …` | § 6 | § 6 |

## 8. Vérifier une scène

Depuis le dossier du projet :

```bash
flock /tmp/fme001-sync.lock npm run check:scenes     # chargement seul, une seconde : lire la GabaritError s'il y en a une
flock /tmp/fme001-sync.lock npm run check            # code 0, « scènes chargées : 7 », puis tsc
node /home/user/bimaccess-studio/plugins/studio/skills/scenes/scripts/check-literals.mjs src/lesson   # 0 texte en dur
flock /tmp/fme001-sync.lock npm run build
node /home/user/Bimaccess-FME/harnais/skills/planche-par-phrase-studio/planche.mjs --scenes S02 --out .studio/qa/<dossier>
```

Puis regarder la planche (une capture au milieu de chaque phrase, et l'état final) contre la spécification : chaque élément sur sa phrase, aucun texte sur un trait, une seule mise en évidence, la feuille remplie.
