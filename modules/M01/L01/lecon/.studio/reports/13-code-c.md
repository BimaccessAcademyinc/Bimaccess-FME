## Rapport · code · brief 13 · groupe c (S05, S06, S07)

### Fichiers écrits
- src/lesson/scenes/s05.tsx, s06.tsx, s07.tsx (contenu remplacé ; lesson.ts, attente.tsx, moteur, beats.json inchangés). Aucun composant propre.

### Contrôles
- check-literals.mjs src/lesson : code 0, « 11 fichier(s) lu(s), 0 texte(s) en dur ».
- flock /tmp/fme001-sync.lock npm run check : code 0, « scènes chargées : 7, locutions, ordre, textes et illustrations nommées vérifiés », tsc sans erreur.

### États et locutions
S05 : S05-1 image 0 (titre tapé sur « Une entité quitte son logiciel ») ; S05-2 « FME commence par lire » (route, Lire ; pointe et sortie de la carte en C1 à +0,4 s) ; S05-3 « Ses outils de transformation manipulent » (cartouche 0,3 s, puis bandeau ; carte en C2 à +0,3 s) ; S05-4 « manipulent la géométrie » (contour) ; S05-5 « et les attributs » (ligne d'attribut) ; S05-6 « FME peut alors écrire » (route, Écrire, pointe et carte en C3 à +0,4 s, aucune mise en évidence) ; S05-FIN « dans le format attendu » (trame quadrillée).
S06 : S06-1 image 0 ; S06-2 « Autour de FME » ; S06-3 « Safe Software décrit FME » (titre, courbes 0,8 s, moteur 0,3 s, Moteur à +0,3 s) ; S06-4 « un moteur central » (cercle) ; S06-5 « Les données se lisent depuis » (8 routes, bouts de lecture à +0,4 s, cercle éteint) ; S06-6 « et s'écrivent vers » (8 routes, bouts d'écriture) ; S06-7 « Pour le problème que Murray et Lutz » (fondateurs, puis nom +0,3 s) ; S06-FIN « un logiciel différent n'empêche pas » (feuilles au trait plein).
S07 : S07-1 image 0 (titre sur « Reste à savoir ») ; S07-2 « dans quel format » ; S07-FIN « dans quel système de coordonnées ».

### Écarts à la spécification
- S06 bouts ronds : `Trace` sans prop `cap` et moteur non modifié : illustration de secours `s06-bouts` sous les routes (lecture à « Les données se lisent depuis » + 0,4 s, écriture à « et s'écrivent vers »), balayage de 0,1 s.
- S05 : la carte se déplace par un calcul de position dans la scène (trois segments en une seule transformation) car `Move` n'enchaîne pas ; C0 à C1 et C2 à C3 linéaires, C1 à C2 en sortie cubique comme demandé.
- S06 courbes de niveau : balayées d'un bloc (point 5 de la spécification, moteur).
- Mention de source : texte seul, sans lien cliquable (aucune adresse de référence dans le storyboard ni le moteur, même choix que S03). À traiter avec l'orchestrateur.
- Titre et réserves : padding 2 px en haut et en bas, 6 px de chaque côté (titre en left 98, top 82).
- Retours à la ligne de `Outils de transformation` (S05, largeur 270) et `Système de coordonnées` (S07, largeur 296) : naturels, sans saut forcé ; coupure après « de » attendue, non vérifiée au rendu (pas de navigateur). L'interlettrage 0,24 em est à appliquer si le rendu dépasse 260 px.
- Mise en évidence S05 : rectangles de la spécification posés tels quels, `pad={0}` (le contour et la ligne d'attribut se partagent le bord y 562, un seul visible à la fois).
- Centrages de `Lire`, `Écrire`, `Formats pris en charge`, `Moteur` par translateX(-50%), pas de calcul de largeur.

### Ce que le moteur devrait savoir faire
- `Trace` avec `cap="round"` (S06) ; tracé de chemin `d` avec transformation, ou mode « tracé » de `Svg` pour un groupe (courbes anneau par anneau) ; `Move` en plusieurs segments ou avec courbe linéaire ; lien cliquable sur la mention de source.

Non lancés (consigne) : build, test:play.
