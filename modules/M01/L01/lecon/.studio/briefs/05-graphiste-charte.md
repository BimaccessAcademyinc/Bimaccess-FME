# Brief 05 · graphiste · charte du module FME001 « carte topographique »

## Ta tâche

Ilyas a choisi pour tout le module FME001 (cinq leçons, `modules/M01/plan-module.md`) le thème « carte topographique » : une leçon se lit comme une feuille de carte imprimée. La planche qui l'a fait choisir est `Main.dc.html` (lien ci-dessous) ; il a dit : « j'adore l'idée, ajoutez des références à la carte, c'est parfait avec cette couleur de fond ». Le fond `#F1F3EC` est donc fixé.

Écris la **charte du module** : ce qu'un graphiste et un codeur doivent savoir pour dessiner n'importe quelle scène de L01 à L05 dans ce thème, sans rien inventer. Elle **remplace** la charte CAD 2D de BIMaccess pour ce module : n'en reprends rien par habitude (ni poignées, ni Azeret Mono, ni ACI), seulement ce que ce thème justifie. Elle garde les règles de sens de la production (la règle du sens, une couleur = une fonction, une seule mise en évidence à la fois, le type d'image suit le sujet de la phrase).

Sections attendues, sur le modèle de structure de `DESIGN.md` (pas de son contenu) :

1. Concept : la leçon comme feuille de carte ; d'où vient chaque convention (cartographie topographique imprimée) et ce qu'elle porte comme sens.
2. Couleurs : jetons nommés avec leur fonction, tirés de la planche (`#F1F3EC` fond, encre, brun du relief, rouge des routes d'écriture, bleu de lecture et d'hydrographie, vert de végétation, papier des feuilles…) ; le vert de programme FME001 `#00A64F` et sa seule place ; contrastes vérifiés (texte 4,5:1).
3. Typographie : Source Serif 4 (titres, texte, italique des légendes et toponymes), Barlow Condensed (capitales espacées des noms de lieu et des en-têtes de cartouche) ; échelle en px pour 1920 × 1080 ; aucun texte sous 23 px.
4. Mise en page : la feuille (bordure graduée, triple filet, marges), la face de carte, la marge (légende, échelle, rose des vents, mention de source), les zones réservées du lecteur (sous-titres y ≥ 880 et x < 1300 ; zone d'action en bas à droite, 360 × 140).
5. **Bibliothèque de symboles**, chacun avec sa signification et le mot de la voix qui l'appelle : feuille de format (et ses contenus : courbes, hydrographie, cadastre, bâti, routes, végétation, points, image), point géodésique (le moteur), route de lecture, route d'écriture, entité géographique (comment se dessine une entité et ses trois parties dans ce thème : géométrie, attributs, système de coordonnées), carton de localisation (le système de coordonnées, pour L02 à L05), une personne (silhouette d'échelle, jamais un point), un document, une date (frise ou échelle graduée en années), un logiciel (fenêtre redessinée, sans capture ni logo).
6. Coque du lecteur dans ce thème : barre d'état, boutons (LANCER, SUIVANT, VALIDER, CONTINUER), panneau d'exercice et choix sélectionné, rétroaction sans verdict, sous-titres, mise en évidence unique (son dessin exact). Valeurs CSS précises (couleurs, bordures, polices, tailles), pour que le codeur les recopie.
7. Animation : les gestes du thème (un trait qui se trace comme une route, une feuille qui se pose dans la couronne, une légende qui se remplit, une courbe de niveau qui se dessine), sans fondu d'opacité ni rebond.
8. À faire / à éviter, avec les refus d'Ilyas sur CER001 qui valent ici (README de bimaccess-studio, « Ce qui fait une bonne image »).

## À lire, et rien d'autre

- /tmp/claude-0/-home-user/97d54436-af59-5ae1-b5e1-362640cf04f2/scratchpad/fme-themes/project/Main.dc.html : la planche choisie (source de vérité du thème)
- /home/user/BIMaccess-Learning-Platform/design-system/DESIGN.md : modèle de structure seulement
- /home/user/bimaccess-studio/README.md, section « Ce qui fait une bonne image »
- /home/user/Bimaccess-FME/modules/M01/plan-module.md
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/storyboard.md : les huit scènes de L01, pour que la bibliothèque couvre tout ce qu'elles montrent
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/CLAUDE.md, § 4 à 6 : ce que le lecteur sait faire (composants, grammaire d'animation) et ce que la coque dessine

## À écrire, seulement

1. `/home/user/Bimaccess-FME/design/CHARTE-FME001.md` : la charte.
2. `/home/user/Bimaccess-FME/design/tokens.json` : `{"colors": {...}, "fonts": {...}, "sizes": {...}}`, les mêmes jetons que la charte.
3. `/home/user/Bimaccess-FME/design/symboles/<nom>.svg` : un SVG propre par symbole de la bibliothèque (viewBox, couleurs des jetons, aucun dégradé ni filtre, aucune image matricielle), dessiné comme dans la planche choisie.
4. `/tmp/claude-0/-home-user/97d54436-af59-5ae1-b5e1-362640cf04f2/scratchpad/fme-themes/project/Composants.dc.html` : un artboard de 1920 × 1080 qui montre à Ilyas, sur le fond du thème, la coque du lecteur (barre d'état, boutons dans leurs états, panneau d'exercice avec un choix sélectionné et une rétroaction, bandeau de sous-titres, mise en évidence) et la bibliothèque de symboles légendée. Même format que `Main.dc.html` : recopie sa structure (en-tête, `<x-dc>`, `<helmet>` avec le lien Google Fonts, bloc `<script type="text/x-dc" data-dc-script>` avec `class Component extends DCLogic` et `renderVals()`), attributs entre guillemets, chaque élément non vide fermé, aucun script qui fabrique du HTML. Textes d'exemple tirés du storyboard de L01 (pas de lorem ipsum).

Aucune opération git ; ne publie rien (l'orchestrateur publie l'artboard) ; aucun navigateur.

## Contrôles avant de rendre

```bash
python3 -c "import json;json.load(open('/home/user/Bimaccess-FME/design/tokens.json'));print('tokens ok')"
for f in /home/user/Bimaccess-FME/design/symboles/*.svg; do python3 -c "import xml.dom.minidom,sys;xml.dom.minidom.parse(sys.argv[1])" "$f" || echo "SVG mal formé : $f"; done
grep -c "—" /home/user/Bimaccess-FME/design/CHARTE-FME001.md
```

La dernière commande doit afficher 0 (aucun tiret cadratin).

## Rapport (court)

Fichiers écrits, jetons de couleur en une ligne chacun avec leur fonction, liste des symboles, ce que tu as dû décider sans indication, et ce que la coque demande au code (ce qui diffère de la coque actuelle du lecteur).
