# Brief 07 · graphiste · spécification et illustrations des huit scènes

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon. Toutes les commandes se lancent depuis ce dossier.

## Ta tâche

Donner à chaque scène du storyboard sa composition dans la charte FME001 « carte topographique », et une spécification qui dit, état par état, ce qui apparaît sur quels mots de la narration, pour que le code anime sans rien inventer. Ta méthode est le skill graphisme du plugin (fichier ci-dessous), **sauf la signature** : ici la charte FME001 fait foi, pas la charte CAD de BIMaccess ni `signature-bimaccess.md`.

Ordre de travail : de la scène la plus difficile à la plus simple (S03, S05, S04, S02, S06, S07, S01, S08).

Exigences :

- La règle du sens : chaque élément se nomme, répond à un mot de la voix de sa scène, se reconnaît sans explication ; le type d'image suit le sujet de la phrase ; une seule mise en évidence à la fois.
- Les symboles de `design/symboles/` sont la bibliothèque : reprends-les (copiés dans `content/design/assets/`, renommés si besoin), ne redessine pas ce qui existe. Un groupe SVG nommé (`<g id="…">`) par partie qui doit apparaître sur ses mots.
- Les textes d'écran sont ceux du storyboard, mot pour mot ; aucun texte ajouté qui ne soit dans le storyboard, sauf les libellés de légende que la charte prévoit.
- Zones : sous-titres (y ≥ 880, x < 1300) et zone d'action (x 1454, y 834, 360 × 140) libres ; titre de scène dans sa zone de la charte (x 104, y 84).
- **Les amorces de quadrillage ne traversent aucun texte** : chaque bloc de texte de la scène a une réserve au fond de la page (`fond` plein), ou la composition évite les croix ; dis lequel dans la spécification.
- Les écarts à la charte relevés par le code (rapport `.studio/reports/06-code.md`, § écarts) : là où une scène en dépend (routes à bouts ronds, cercle de mise en évidence, `at` du tracé), écris dans la spécification ce que le code doit faire.

## À lire, et rien d'autre

- /home/user/bimaccess-studio/plugins/studio/skills/graphisme/SKILL.md et ses références `spec-template.md`, `svg-rules.md` (où `${CLAUDE_SKILL_DIR}` vaut /home/user/bimaccess-studio/plugins/studio/skills/graphisme), sans `signature-bimaccess.md`
- /home/user/Bimaccess-FME/design/CHARTE-FME001.md et /home/user/Bimaccess-FME/design/tokens.json
- /home/user/Bimaccess-FME/design/symboles/*.svg
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/content/brief.md et content/storyboard.md
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/reports/06-code.md (écarts de la coque)
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/CLAUDE.md, § 4 à 6 (composants et grammaire d'animation)

## À écrire, seulement

- `content/design/spec.md` : une section par scène (`## S01` … `## S08`), au gabarit du skill : composition finale (positions en px sur 1920 × 1080), états `data-board` nommés, ce qui apparaît sur quels mots (locution exacte de la narration), mise en évidence, couleurs par fonction.
- `content/design/assets/*.svg` : les illustrations des scènes.
- `.studio/reports/07-graphiste.md` : ton rapport.

`content/design/theme.json` ne change pas (il porte déjà les jetons de la charte). Aucune opération git ; aucun navigateur.

## Contrôles à lancer avant de rendre

- `node /home/user/bimaccess-studio/plugins/studio/skills/graphisme/scripts/check-design.mjs content/design` : lis sa sortie ; ses contrôles propres à la charte CAD (polices, couleurs ACI) ne s'appliquent pas à cette signature, mais ses contrôles de SVG (bien formés, viewBox, aucun script, aucune image matricielle) oui : ceux-là doivent passer.
- `npm run sync` : code 0 (aucune illustration mal formée).

## Rapport

Au format de la section 3 de /home/user/bimaccess-studio/plugins/studio/skills/produce/references/briefs.md : fichiers, contrôles, pour chaque scène une ligne (ce qu'elle montre, son moment fort), ce que le code devra ajouter au moteur, et les textes ou libellés que tu aurais voulu et que le storyboard ne donne pas (signalés, pas ajoutés).
