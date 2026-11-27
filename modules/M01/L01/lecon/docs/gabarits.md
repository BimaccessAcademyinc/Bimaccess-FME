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

Tout se vérifie au chargement (`npm run check:scenes`, `check`, `build`) : une donnée fausse arrête la construction avec une `GabaritError` qui dit le fichier, le champ et quoi faire (§ 7) ; la composition finale passe en plus quatre contrôles bloquants (§ 9). Aucun instant n'est écrit : chaque instant vient d'une locution de la voix, plus les durées de la spécification. Aucun texte n'est écrit : les textes viennent de `## Écran` par leur indice.

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
| `sur` | facultatif : identifiant de l'illustration sur laquelle elle est posée dans l'état final (objet sur la feuille, sceau sur le contrat) ; seul chevauchement permis, et elle doit tenir en entier dans son support (§ 9, contrôle 4) |

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
| `dans` | facultatif : identifiant d'une illustration ; le texte se découvre dans son balayage (même boîte, même instant, même sens) et ne prend pas de geste ; l'illustration est aussi son support (contrôle 4) |
| `sur` | facultatif : identifiant de l'illustration sur laquelle le texte est posé (texte dans une carte ou une feuille) ; seul chevauchement permis, le texte doit y tenir en entier (§ 9, contrôle 4) |
| `langue` | facultatif : `"en"` pour un nom anglais |
| `largeurMesuree`, `lignes` | facultatifs, acceptés et sans effet : les contrôles mesurent eux-mêmes chaque texte avec ses polices (§ 9) ; inutile de les écrire |

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
    "contour": { "fichier": "s04-ill-contour", "x": 349, "y": 544, "largeur": 160, "sur": "feuille" }
  },
  "feuille": { "illustration": "feuille", "bandes": [289.5] },
  "textes": { "geometrie": { "ecran": 2, "style": "rubrique", "x": 829, "y": 303, "place": "carte", "sur": "feuille" } },
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

Décision d'Ilyas après l'essai 1 : la composition finale doit occuper la **face de carte** de la charte (`CHARTE-FME001.md` § 4), la même pour les deux gabarits (`ZONE` du moteur) : x 104 à 1424, y 180 (bas du titre) à 860 (haut des sous-titres). La colonne x 1448 à 1830 est la marge (échelle, rose, source) : elle ne se remplit pas ; la zone d'action (x 1454, y 834, 360 × 140) est hors de la face. Seule la ligne de la frise peut déborder jusqu'à x 1500, entre y 360 et y 690 (charte).

Le contrôle est le contrôle 1 du § 9 : aucun rectangle vide de 200 × 150 px ou plus dans la face. Pour remplir sans changer le sens :

- garder les mêmes illustrations, les mêmes gestes, les mêmes locutions ; changer leurs places et leurs tailles (`largeur` libre, la hauteur suit toujours le `viewBox` : jamais étirée) ;
- replacer ensuite, sur les nouvelles boîtes, les textes posés dans une illustration (à la même place relative), les tracés qui la touchent (routes, trait, jalons) et les rectangles de mise en évidence ; aucun texte sur un trait ; vérifier à la planche ;
- `Frise` : la frise peut aller de x 104 à 1424 ; jalons et cases se placent sur sa ligne ; un libellé trop long pour sa place prend une `largeur` (deux lignes) ; un élément au-dessus ou au-dessous de la ligne peut descendre jusqu'à y 860, mise en évidence comprise.

Exemple (S02, rapport 41) : l'essai 3 laissait vides le bas du centre (x 436 à 882, y 700 à 860), le bas à droite et le dessous du lieu (x 1082 à 1424, y 403 à 570). Correction : le lieu passe en bas à droite sous la frise, la feuille SAIF au bout des routes en haut à droite, le jalon 1996 à x 780, les deux libellés sur deux lignes, le logo et le nom d'origine sous les libellés.

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
| `(composition finale)` : `la face n'est pas remplie : vide de …` | contrôle 1 (§ 9) | § 6 |
| `… hors de la face de carte …` | contrôle 2 : un texte, une mise en évidence (tireté compris), une illustration ou un tracé dépasse la face | replacer ou réduire ; une mise en évidence entoure toujours son élément |
| `texte posé sur le trait « … »` | contrôle 3 : un trait passe dans le texte ou sa réserve | déplacer le texte ou le trait ; agrandir le rectangle d'une mise en évidence qui touche son texte |
| `chevauche … dans la composition finale` | contrôle 4 | séparer, ou déclarer `sur` si l'un est posé sur l'autre |
| `posé sur « … » mais en déborde` | contrôle 4 : l'élément sort de son support | le replacer dans son support |
| `police « … » sans métriques` | style d'une police absente de `metriques.json` | l'ajouter à `scripts/metriques-polices.mjs` et le relancer |

## 8. Vérifier une scène

Depuis le dossier du projet :

```bash
flock /tmp/fme001-sync.lock npm run check:scenes     # chargement seul, une seconde : lire la GabaritError s'il y en a une
flock /tmp/fme001-sync.lock npm run check            # code 0, « scènes chargées : 7 », puis tsc
node /home/user/bimaccess-studio/plugins/studio/skills/scenes/scripts/check-literals.mjs src/lesson   # 0 texte en dur
flock /tmp/fme001-sync.lock npm run build
node /home/user/Bimaccess-FME/harnais/skills/planche-par-phrase-studio/planche.mjs --scenes S02 --out .studio/qa/<dossier>
```

Puis regarder la planche (une capture au milieu de chaque phrase, et l'état final) contre la spécification : chaque élément sur sa phrase, aucun texte sur un trait d'illustration (le contrôle 3 ne voit pas les traits dessinés dans les SVG), une seule mise en évidence, le sens de la composition.

## 9. Contrôles de composition bloquants

`src/engine/gabarits/controles.ts`, appelé à la fin de `planifier` (plan.ts) : au chargement, donc par `npm run check:scenes`, `check` et `build`. Ils portent sur l'état final de la scène (illustrations à leur place d'arrivée), sauf mention. Tous les défauts trouvés sont listés dans une seule `GabaritError` (`<fichier>, n défauts de composition : 1. champ « … » : … À faire : …`). Un contrôle ne s'affaiblit jamais pour faire passer une scène : on corrige les données.

| N° | Refuse | Seuil, règle | Constante |
|---|---|---|---|
| 1 | un vide dans la face | aucun rectangle vide d'au moins **200 × 150 px** (largeur ET hauteur) dans la face x 104 à 1424, y 180 à 860 ; le vide d'environ 210 × 160 px en bas au centre de S02 à l'essai 3 est refusé (vérifié : le même vide, reproduit, donne « vide de x 580 à 790, y 700 à 860 (210 × 160 px) ») | `VIDE_MIN_LARGEUR`, `VIDE_MIN_HAUTEUR`, `ZONE` |
| 2 | un débord hors de la face | tolérance 0,5 px (arrondi) ; vérifié pour chaque texte (encre mesurée), chaque mise en évidence (tireté de 2,5 px compris : 1,25 px de part et d'autre du bord ; cercle : rayon demi-diagonale), chaque illustration (place de départ et d'arrivée), chaque tracé (épaisseur comprise), la frise et les cases ; seule la ligne de la frise (et sa pointe) peut aller jusqu'à x 1500 si elle est tout entière entre y 360 et y 690 | `ZONE`, `DEBORD_FRISE` |
| 3 | un texte sur un trait | aucun point d'un trait (épaisseur comprise) dans la boîte du texte agrandie de sa réserve (6 px à gauche et à droite, 2 px en haut et en bas) ; traits : tracés (`traces`, couches et pointes), ligne et pointe de la frise, cases des années, et contour de chaque mise en évidence allumée pendant que le texte est à l'écran (une mise en évidence ne doit pas toucher le texte qu'elle entoure) ; chemins échantillonnés tous les px | `GARDE_X`, `GARDE_Y` |
| 4 | un chevauchement | dans l'état final, aucune intersection de plus de 0,5 px entre deux boîtes d'illustrations ou de textes, sauf entre un élément et son support (`sur`, ou `dans` pour un texte ; les supports s'enchaînent : repère sur globe sur feuille), et l'élément doit tenir en entier dans son support ; deux éléments posés sur le même support ne se chevauchent pas | |

Hors contrôle (à la planche) : les traits dessinés à l'intérieur des illustrations SVG (un texte de carte sur un trait du dessin), le croisement d'un tracé et d'une illustration (les routes, jalons et traits relient des illustrations par nature), le sens.

**Mesure des textes.** Les contrôles n'ont pas de navigateur : chaque texte est mesuré avec les polices de la leçon. `scripts/metriques-polices.mjs` lit les fichiers WOFF des paquets `@fontsource` embarqués (Source Serif 4 400, 600, italiques 400 et 600 ; Barlow Condensed 500 et 600 ; sous-ensembles latin et latin-ext) et écrit `src/engine/gabarits/metriques.json` : avance de chaque caractère en millièmes de corps (tables `cmap` et `hmtx`). À relancer si une police ou une graisse change (`node scripts/metriques-polices.mjs`). Largeur d'une ligne = somme des avances × corps, plus l'interlettrage entre les caractères (pas après le dernier) ; texte en capitales mis en majuscules d'abord ; graisse la plus proche disponible ; texte à `largeur` : retour à la ligne glouton sur les espaces, comme le navigateur ; `x` : bord gauche, `cx` : encre centrée ; hauteur = lignes × corps × interligne (la boîte de ligne du navigateur). Le crénage est ignoré : vérifié contre Chromium sur les 14 textes de S02 et S04 (`node scripts/metriques-verifier.mjs`, après `npm run build`), l'estimation s'écarte de la largeur réelle de -0,1 à +4,3 px (de -0,1 à +1,2 %, presque toujours par excès), le nombre de lignes est le même ; la boîte de contenu de la police déborde la boîte de ligne de 1 à 4 px en haut et en bas (jambages et accents), l'encre des lettres reste dedans.

