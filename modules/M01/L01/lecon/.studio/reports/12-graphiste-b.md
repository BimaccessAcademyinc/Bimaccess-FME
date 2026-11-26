## Rapport · graphiste b · brief 12

### Fichiers écrits

- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/spec/spec-b.md : sections `## S03` et `## S04` (composition en px de scène, états `S03-1` à `S03-FIN` et `S04-1` à `S04-FIN`, apparitions calées sur des locutions dites mot pour mot, mises en évidence, couleurs par fonction, réserves du carroyage, écran étroit) et « Points ouverts du groupe b ».
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/s03-carte.svg : fond de carte de l'accroche, îlots et rues au trait `carroyage` (repris de la version précédente, redessiné sans bâtiment autre que le contour).
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/s03-contour.svg : contour du bâtiment 200 × 120, `encre` 3 px ; groupe `s03-contour-hachure` (hachure de surface de la charte, 45°, 9 px). Il se pose sur la carte puis se déplace dans la rubrique Géométrie, même taille.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/s03-batiment.svg : `batiment-elevation` de la bibliothèque à l'échelle 1,3, en px de scène, aligné sous le contour (plan au-dessus de l'élévation).
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/s03-entite.svg : feuille « Entité géographique » (d'après `entite-geographique`, `geometrie`, `globe-contour`) ; groupes `s03-entite-feuille` (décor), `s03-entite-geometrie`, `s03-entite-signes`, `s03-entite-attributs`, `s03-entite-usage`, `s03-entite-systeme`, `s03-entite-globe-contour`.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/s04-conduite.svg : feuille de donnée « Conduite d'eau » (d'après la version précédente, corrigée : le tracé de la conduite manquait dans le cadre) ; groupes `s04-conduite-cadre`, `s04-conduite-tableau`, `s04-conduite-cartouche`, `s04-conduite-accolade`.
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/design/assets/echelle-graphique.svg et rose-des-vents.svg : symboles partagés copiés tels quels de /home/user/Bimaccess-FME/design/symboles/ (absents au moment de la copie ; identiques octet pour octet).

Pour chaque scène :

- S03 : une carte où un bâtiment n'est qu'un contour, puis le bâtiment réel dessous et la feuille de donnée qui le représente ; les trois rubriques se déroulent une à une. Moment fort : le contour quitte la carte et entre dans la rubrique Géométrie (« Sa géométrie porte »), puis se pose en petit sur le globe (« lui donne sa position »).
- S04 : une feuille de plan « Conduite d'eau » à trois zones sans titre (cadre et tracé, tableau, cartouche « Repère »), le panneau d'exercice à droite. Moment fort : après la validation, les trois noms de partie arrivent un à un sur leurs lignes de repère, puis l'accolade de lecture relie le tracé et le cartouche (« se lit donc dans deux parties »).

### Contrôles

- `for f in content/design/assets/s0*.svg; do python3 -c "import xml.dom.minidom,sys;xml.dom.minidom.parse(sys.argv[1])" "$f" || echo "mal formé : $f"; done` → aucune sortie (aucun SVG mal formé).
- recherche du tiret cadratin dans `.studio/spec/spec-b.md` (`grep -c` du brief) → « 0 ».
- `node /home/user/bimaccess-studio/plugins/studio/skills/graphisme/scripts/check-design.mjs content/design --signature neutral`, lancé sur une copie dans le dossier temporaire de la session (spec-b.md en spec.md, storyboard, thème, mes SVG ; le script ne connaît pas la signature carte) → code 0 ; extrait : « 7 SVG contrôlé(s), 26 locution(s) de spec.md contrôlée(s), 0 erreur(s), 30 avertissement(s) ». Avertissements : 28 sur le thème (jetons carte inconnus de ce script, attendus) ; 2 sur `echelle-graphique.svg` et `rose-des-vents.svg` (« width/height fixes sur la racine ») : copies telles quelles de la bibliothèque, sans effet (le moteur impose `width="100%" height="100%"` en tête de balise).
- Largeurs des textes mesurées avec les fontes livrées (`@fontsource/source-serif-4`, `@fontsource/barlow-condensed`) : titre de S03 1 234 px ; `Géométrie : points, lignes, surfaces` 473 px ; `Système de coordonnées` 315 px ; `Usage : eau potable` 256 px ; question de S04 921 px (deux lignes à 540 px de panneau) ; conséquences 1 502 à 1 781 px (quatre lignes, cinq au plus). Compositions finales contrôlées par un rendu d'aperçu hors projet (aucun navigateur).
- `npm run sync` non lancé (consigne du brief).

### Ce que le code devra faire ou ajouter

- Mise en évidence : passer à `Highlight` l'instant `at` de l'étape de `focusAt` (écart 4 du rapport 06), pour le tracé de 0,25 s ; rectangles seulement dans S03 et S04 (écart 5 sans effet) ; dans S03, rectangles en retrait de 10 px dans les rubriques (elles se touchent).
- Routes à bouts ronds (écart 6) : aucune dans S03 ni S04.
- Couleurs par leur nom de charte (écart 8) : `THEME.colors.terme` pour `Entité géographique` (S03), `THEME.colors.fond` pour les réserves des textes posés sur le fond, `THEME.colors.lien` pour la mention de source.
- S03 : `Move` du contour (0,3 s, easeOutCubic, sans changer d'échelle) ; `Trace` du trait bâtiment → feuille ; balayage bas → haut du bâtiment.
- S04 : `Callout` pour les trois lignes de repère, avec le mot en titre de rubrique (Barlow 600, 24 px, capitales, 0,16 em) ; si `Callout` en carte ne permet pas ce style ni un palier de longueur donnée, c'est un ajout au moteur à signaler (je n'ai pas lu son code).
- Mention de source (S03) : filet de 220 px au-dessus du texte et lien cliquable ; un petit composant commun aux scènes qui en ont une (S01, S02, S03, S05, S06) éviterait de le refaire dans chaque scène.

### Décisions à prendre par l'utilisateur

Aucune.

### Signalements pour l'utilisateur ou un autre rôle

- Scénariste : S03, la mention `D'après Safe Software et l'OGC` est dite cliquable sans que le storyboard donne la référence qu'elle ouvre (REGLES 4.6).
- Scénariste (texte souhaité, non ajouté) : S03, la carte et le bâtiment réel ne portent aucun nom à l'écran ; la voix les nomme et l'élévation se reconnaît sans explication. Si Ilyas veut les nommer : deux toponymes à écrire dans `## Écran` (par exemple `Sur la carte`, `Bâtiment réel`).
- Scénariste / Ilyas : écarts de calage au storyboard, choisis pour la règle du sens et la grammaire : S03, la feuille vide arrive sur « La donnée, elle » (le trait du bâtiment doit arriver sur une chose nommée) ; S04, la feuille et son bandeau arrivent sur « Sur un projet » (pas de scène vide sur les premiers mots), les zones sur « une conduite d'eau », « sous forme », « d'entité géographique », toutes avant « Elle doit savoir où » (rien ne désigne le cartouche quand la voix dit « où ») ; les noms de partie sont calés au début de chaque proposition. Les mises en évidence de S04 par zone ne sont pas datées par le storyboard : je les ai calées sur ces mêmes locutions, aucune sur l'accolade.
- Orchestrateur : sans légende (S03, S04), j'ai posé l'échelle graphique à la place du haut de la légende (x 1 480, y 84) ; règle à harmoniser avec les graphistes a et c.
- Charte : le tableau des symboles du § 5 garde l'ancienne numérotation (entité en S02, conduite en S03, pont en S08) ; à mettre à jour (S03, S04, S07).
- Symboles de bibliothèque : `entite-geographique.svg` porte des identifiants non préfixés (`geometrie`, `attributs`, `systeme-coordonnees`) que les règles SVG du skill refusent (préfixe du nom de fichier) ; il ne se copie pas tel quel (je l'ai redessiné dans `s03-entite.svg`).

### Blocage

Aucun.
