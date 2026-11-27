# Brief 20 · graphiste · essai : S02 et S04 composées par la chaîne, illustrations commandées au modèle d'image

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon-essai. Toutes les commandes se lancent depuis ce dossier.

## Pourquoi cet essai

Ilyas a jugé la variante « planches image » : les dessins du modèle d'image sont « d'un niveau extrêmement supérieur » aux SVG dessinés à la main, mais l'assemblage automatique est « un travail de cochon » (textes écrits sur les traits du dessin, décor éparpillé à la première image, trous dans les traits, textes qui se chevauchent). Cet essai remet le graphiste à sa place dans la chaîne : **tu composes chaque scène**, et tu commandes au modèle d'image les illustrations dont ta composition a besoin. On mesurera la qualité et le temps.

## Ta tâche

Refaire la composition et la spécification de **S02 et S04 seulement**, dans la charte FME001 « carte topographique ». Ta méthode est le skill graphisme du plugin, **sauf la signature** : la charte FME001 fait foi, pas la charte CAD de BIMaccess.

Les sections `## S02` et `## S04` de `content/design/spec.md` viennent de la version de la chaîne (dessins SVG à la main). Pars d'elles : garde leur sens, leurs états et leurs locutions quand ils restent justes, et réécris la composition avec les nouvelles illustrations. Ne change aucun texte du storyboard ; un texte qui te manque se signale.

## Ton outil : les illustrations commandées

Un élément qui paraît à son propre moment = une illustration à lui : une carte de rôle, une feuille, un sceau, une frise, un jalon, une route… Pour chacune, écris une commande `content/design/illustrations/<nom>.json` :

```json
{ "nom": "s02-ill-contrat", "format": "3:4", "dessin": "description en anglais de cet élément seul, sans aucun texte" }
```

(`format` : 1:1, 2:3, 3:2, 3:4, 4:3, 4:5, 5:4, 9:16, 16:9, 21:9 ; prends celui de la place que l'élément occupera.) Puis :

```bash
python3 /home/user/Bimaccess-FME/harnais/skills/planche-image/scripts/illustrations.py --style /home/user/Bimaccess-FME/design/style-image.md --ref /home/user/Bimaccess-FME/design/references/style-carte.png --etape "FME001-M01-L01 essai illustrations"
```

Il dessine toutes les commandes en parallèle (environ 15 à 30 s), retire le fond, recadre, vectorise, et écrit `content/design/assets/<nom>.svg` (un groupe `<g id="dessin">`, `viewBox` = taille du dessin) et un aperçu `content/design/assets/<nom>.apercu.png`. Une commande inchangée ne redessine rien (cache).

- **Regarde chaque aperçu** (outil Read sur le PNG) avant de le placer : nombre et genre des personnes, emblèmes, absence de tout chiffre ou lettre, ce qui se reconnaît sans explication. Un dessin faux se corrige en précisant `dessin`, puis `--noms <nom> --forcer` ; deux reprises au plus par élément, puis signale-le.
- Budget : une vingtaine d'illustrations au plus pour les deux scènes (environ 0,13 $ chacune).
- Ce que le code dessine mieux qu'une image, garde-le au code et dis-le dans la spécification : les textes (toujours), les routes et liaisons tracées sur les mots (traits droits ou en L, `Trace`), la mise en évidence, le logo FME (`fme-logo`, couleurs d'origine, jamais déformé ni recoloré).

## Exigences (ce qu'Ilyas a déjà refusé ou demandé)

- **La règle du sens** (`/home/user/bimaccess-studio/README.md`, « Ce qui fait une bonne image ») : chaque élément se nomme, répond à un mot de la voix, se reconnaît sans explication ; le type d'image suit le sujet de la phrase (personne : silhouette dans une carte de rôle nommée ; document : feuille lisible ; date : frise ; logiciel : fenêtre redessinée).
- **Aucun texte posé sur un trait du dessin** : chaque texte a sa place libre, dite en px dans la spécification, avec sa réserve au fond de la page.
- **Une première image composée**, jamais des formes éparpillées : ce qui est là à l'image 0 forme une figure lisible (l'accroche du storyboard), et tout le reste arrive sur ses mots, au bon endroit, sans laisser de trou dans ce qui est déjà dessiné.
- **Les symboles justes** : Don Murray et Dale Lutz sont deux hommes ; le contrat du gouvernement de la Colombie-Britannique porte un sceau neutre, jamais un emblème national ; aucun chiffre ni lettre dessiné.
- Grille d'Ilyas du pilote : `/home/user/Bimaccess-FME/harnais/grille-ilyas-pilote.md`. Règles de la chaîne : `/home/user/bimaccess-studio/chaine/agents/REGLES.md` § 4.8, 4.9, 5.7, 5.8.
- Zones : sous-titres libres (y ≥ 880, x < 1300), zone d'action libre (x 1454, y 834, 360 × 140), titre de scène à sa place (x 104, y 84) ; textes de 23 px et plus ; une seule mise en évidence à la fois.

## À lire, et rien d'autre

- /home/user/bimaccess-studio/plugins/studio/skills/graphisme/SKILL.md et ses références `spec-template.md`, `svg-rules.md` (`${CLAUDE_SKILL_DIR}` = /home/user/bimaccess-studio/plugins/studio/skills/graphisme), sans `signature-bimaccess.md`
- /home/user/bimaccess-studio/README.md, section « Ce qui fait une bonne image »
- /home/user/Bimaccess-FME/design/CHARTE-FME001.md, /home/user/Bimaccess-FME/design/tokens.json
- content/storyboard.md (S02 et S04, et le fil des autres scènes), content/design/spec.md (sections S02, S04 et l'en-tête commun), content/brief.md
- CLAUDE.md du projet, § 4 à 6 (ce que le moteur sait faire en signature carte)
- La narration réellement dite : `src/generated/narration.ts` après `flock /tmp/fme001-sync.lock npm run sync` (les locutions de la spécification doivent y être mot pour mot)

## À écrire, seulement

- `content/design/illustrations/*.json` et, par l'outil, `content/design/assets/s02-ill-*.svg`, `s04-ill-*.svg` (ne touche à aucun autre fichier de `assets/`)
- les sections `## S02` et `## S04` de `content/design/spec.md`, au gabarit du skill : composition finale en px sur 1920 × 1080 (chaque illustration : nom, x, y, largeur), chaque texte (indice de `## Écran`, x, y, largeur, style), états `S02-1` … `S02-FIN` avec la locution exacte qui déclenche chacun, geste de chaque apparition (balayage, tracé, déplacement), mise en évidence, couleurs par fonction
- `.studio/reports/20-graphiste-essai.md` : ton rapport

Aucune opération git ; aucun navigateur ; ne touche ni aux scènes ni au moteur.

## Contrôle avant de rendre

```bash
for f in content/design/assets/s0[24]-ill-*.svg; do python3 -c "import xml.dom.minidom,sys;xml.dom.minidom.parse(sys.argv[1])" "$f" || echo "mal formé : $f"; done
grep -c "—" content/design/spec.md
flock /tmp/fme001-sync.lock npm run sync
```

(aucun SVG mal formé ; 0 tiret cadratin ; sync sans échec)

## Rapport

Au format de la section 3 de /home/user/bimaccess-studio/plugins/studio/skills/produce/references/briefs.md : fichiers, contrôles, pour chaque scène sa composition en deux lignes et son moment fort, la liste des illustrations (nom, ce qu'elle montre, reprises), ce que le code devra faire que le moteur ne fait pas encore, et les textes que tu aurais voulus et que le storyboard ne donne pas (signalés, pas ajoutés).
