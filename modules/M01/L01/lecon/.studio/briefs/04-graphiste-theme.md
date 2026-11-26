# Brief 04 · graphiste · planche d'exemple d'un thème (FME001)

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon. Le numéro de ton thème t'est donné dans l'invite (`<n>`).

## Ta tâche

Dessiner **une planche** : l'état final de la scène d'essai, dans **ton** thème, à 1920 × 1080, en un seul fichier SVG. Ilyas choisira le thème du module en comparant les quatre planches côte à côte : la tienne doit montrer ce que ton thème a de meilleur, fidèlement à sa fiche, sans emprunter aux trois autres.

## À lire, et rien d'autre

- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/themes/directions.md : la page des thèmes ; **ta fiche** est sous `## Thème <n>` ; lis les autres seulement pour ne pas leur ressembler
- /home/user/BIMaccess-Learning-Platform/design-system/DESIGN.md : la charte, en entier (jetons de couleur §2, typographie §3, schémas §7, illustration §8)
- /home/user/bimaccess-studio/plugins/studio/skills/graphisme/references/svg-rules.md : règles des SVG
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/storyboard.md : seulement la scène d'essai que nomme `directions.md`, pour les mots exacts de la voix et de l'écran

## Règles

- Textes : seulement ceux de l'écran de la scène dans le storyboard (mot pour mot), et les étiquettes que ta fiche nomme ; aucun texte sous 23 px ; cinq étiquettes au plus par schéma ; jamais de tiret cadratin ; titre display de six mots au plus, terminé par un point.
- Polices par leur nom seulement : `font-family="Azeret Mono"`, `"IBM Plex Sans"` ou `"Fraunces"` (elles sont fournies au rendu) ; couleurs : seulement les jetons de `DESIGN.md`, la couleur de programme est le vert `#00A64F` ; aucun dégradé, aucun filtre, aucune ombre floue, aucun coin arrondi, aucune image matricielle ni logo ou capture de Safe Software.
- Une seule mise en évidence (tireté et poignées carrées), si ta fiche en demande une.
- Laisser libres la bande des sous-titres (y ≥ 880, x < 1300) et la zone d'action en bas à droite (dernier 360 × 140).
- La règle du sens : chaque élément se nomme, répond à un mot de la voix de la scène, se reconnaît sans explication.

## À écrire, seulement

- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/themes/theme-<n>/planche.svg
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/themes/theme-<n>/nom.txt : une ligne, « Thème <n> · <nom du thème> »
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/themes/theme-<n>/notes.md : chaque élément de la planche et le mot de la voix auquel il répond ; ce que tu as dû décider faute d'indication

Aucune opération git ; ne lance pas de navigateur (l'orchestrateur rend les quatre planches ensemble).

## Contrôle avant de rendre

```bash
python3 -c "import xml.dom.minidom,sys; xml.dom.minidom.parse(sys.argv[1]); print('SVG bien formé')" /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/themes/theme-<n>/planche.svg
```

## Rapport (court)

Fichiers écrits, résultat du contrôle, ce que la planche montre en trois lignes, les écarts à la fiche et pourquoi.
