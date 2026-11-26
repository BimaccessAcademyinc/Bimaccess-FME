# Brief 12 · graphiste · spécification et illustrations d'un groupe de scènes

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon. Toutes les commandes se lancent depuis ce dossier.

Trois graphistes travaillent en même temps, chacun sur un groupe de scènes. Ton groupe et ta lettre (`a`, `b` ou `c`) te sont donnés dans l'invite.

## Ta tâche

Donner à chaque scène de ton groupe sa composition dans la charte FME001 « carte topographique », et une spécification qui dit, état par état, ce qui apparaît sur quels mots de la narration, pour que le code anime sans rien inventer. Ta méthode est le skill graphisme du plugin, **sauf la signature** : la charte FME001 fait foi, pas la charte CAD de BIMaccess ni `signature-bimaccess.md`.

Le storyboard vient d'être validé par Ilyas sur le ton (récit avec Don Murray et Dale Lutz, partir du problème). Ne change aucun texte : un texte qui te manque se signale.

Exigences :

- La règle du sens : chaque élément se nomme, répond à un mot de la voix de sa scène, se reconnaît sans explication ; le type d'image suit le sujet de la phrase (une personne : silhouette dans une carte de rôle nommée, jamais un point ; un document : une feuille lisible ; une date : une frise ; un logiciel : une fenêtre redessinée, sans nom ni logo) ; une seule mise en évidence à la fois.
- La bibliothèque de la charte (`/home/user/Bimaccess-FME/design/symboles/`) d'abord : reprends ses symboles (copiés dans `content/design/assets/`, préfixés par ta scène si tu les modifies), ne redessine pas ce qui existe. Des illustrations d'une version précédente sont dans `.studio/tmp/graphiste-interrompu/` (conduite, couronne, moteur…) : reprends ce qui sert encore, contrôle-le contre le storyboard actuel.
- Un groupe SVG nommé (`<g id="…">`) par partie qui doit apparaître sur ses mots.
- Les textes d'écran sont ceux du storyboard, mot pour mot ; les mentions de source de marge (« D'après … ») vont dans la marge de la feuille, comme sur une carte.
- Zones : sous-titres (y ≥ 880, x < 1300) et zone d'action (x 1454, y 834, 360 × 140) libres ; titre de scène dans sa zone (x 104, y 84).
- Les amorces de quadrillage ne traversent aucun texte : chaque bloc de texte a une réserve au fond de la page ; dis comment dans la spécification.
- Les écarts de la coque relevés par le code (`.studio/reports/06-code.md`, écarts) : là où une de tes scènes en dépend (routes à bouts ronds, cercle de mise en évidence, `at` du tracé), écris ce que le code doit faire.
- Nomme tes fichiers pour ne pas gêner les deux autres graphistes : illustrations `content/design/assets/sNN-…svg` (NN = une scène de ton groupe) ; un symbole partagé que tu copies tel quel garde son nom, et si un autre graphiste l'a déjà copié à l'identique, ne le réécris pas.

## À lire, et rien d'autre

- /home/user/bimaccess-studio/plugins/studio/skills/graphisme/SKILL.md et ses références `spec-template.md`, `svg-rules.md` (où `${CLAUDE_SKILL_DIR}` vaut /home/user/bimaccess-studio/plugins/studio/skills/graphisme), sans `signature-bimaccess.md`
- /home/user/Bimaccess-FME/design/CHARTE-FME001.md, /home/user/Bimaccess-FME/design/tokens.json, /home/user/Bimaccess-FME/design/symboles/*.svg
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/brief.md et content/storyboard.md (toutes les scènes pour le fil ; tu ne spécifies que les tiennes)
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/reports/06-code.md (écarts de la coque)
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/CLAUDE.md, § 4 à 6

## À écrire, seulement

- `.studio/spec/spec-<ta lettre>.md` : une section `## Sxx` par scène de ton groupe, au gabarit du skill (composition finale en px sur 1920 × 1080, états `data-board` nommés `Sxx-1`, `Sxx-2`… `Sxx-FIN`, ce qui apparaît sur quelles locutions exactes de la narration, mise en évidence, couleurs par fonction). L'orchestrateur réunit les trois fichiers dans `content/design/spec.md`.
- `content/design/assets/sNN-*.svg` pour tes scènes (et les symboles partagés copiés tels quels).
- `.studio/reports/12-graphiste-<ta lettre>.md` : ton rapport.

Aucune opération git ; aucun navigateur ; ne lance pas `npm run sync` (trois graphistes en même temps écriraient les mêmes fichiers générés) : l'orchestrateur la lance après vous trois.

## Contrôle avant de rendre

```bash
for f in content/design/assets/s0*.svg; do python3 -c "import xml.dom.minidom,sys;xml.dom.minidom.parse(sys.argv[1])" "$f" || echo "mal formé : $f"; done
grep -c "—" .studio/spec/spec-<ta lettre>.md
```

(aucun SVG mal formé ; 0 tiret cadratin)

## Rapport

Au format de la section 3 de /home/user/bimaccess-studio/plugins/studio/skills/produce/references/briefs.md : fichiers, contrôles, pour chaque scène une ligne (ce qu'elle montre, son moment fort), ce que le code devra ajouter au moteur, et les textes que tu aurais voulus et que le storyboard ne donne pas (signalés, pas ajoutés).
