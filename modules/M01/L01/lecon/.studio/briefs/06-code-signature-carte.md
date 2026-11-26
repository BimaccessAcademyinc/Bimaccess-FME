# Brief 06 · code · signature « carte » du lecteur

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon. Toutes les commandes se lancent depuis ce dossier.

## Ta tâche

Le lecteur studio connaît deux signatures graphiques : `bimaccess` (coque CAD 2D) et `neutral`. Le module FME001 a sa propre charte, « carte topographique ». Ajoute une **troisième signature, `carte`**, sur le modèle exact de `bimaccess`, et passe le projet dessus (`studio.config.json` : `"signature": "carte"`).

Ce travail fait partie du pilote du harnais : on modifie ici, exceptionnellement, le moteur et le lecteur du projet (`src/engine/`, `src/player/`, `scripts/sync.mjs`, `src/main.tsx`), pour le reporter ensuite dans le template du plugin. Fais-le donc proprement, comme une fonction du template : aucune référence à FME ou à cette leçon dans le moteur, seulement à la signature `carte`.

À faire :

1. `scripts/sync.mjs` : `carte` dans `SIGNATURES` ; son thème par défaut (jetons de `design/tokens.json`, mappés sur les clés de thème que lisent le moteur et les scènes : `background`, `ink`, `accent`, etc.) ; ses polices (`@fontsource/source-serif-4` 400, 600 et les italiques 400, 600 ; `@fontsource/barlow-condensed` 500, 600 : déjà installés) ; le programme et sa couleur visibles aussi avec `carte` ; les messages d'erreur et d'avertissement qui citent les signatures.
2. `src/engine/signature.ts` : exposer la signature (`CARTE`, à côté de `BIM`) sans casser les usages existants.
3. Un rendu `src/engine/carte.tsx` sur le modèle de `bimaccess.tsx` (mêmes composants, mêmes props, mêmes attributs de test, même comportement) : SceneRoot (fond, cadre de feuille à bordure graduée et carroyage dès l'image 0, aucune grille de points ni icône SCU, zone d'action), Title, Bullets, Diagram, Callout, Captions, ChoicePanel. Branche-le dans `components.tsx` comme `bimaccess`. Dans `anim.tsx`, la mise en évidence (`Highlight`, `HighlightRect`) prend le dessin de la charte (tireté bleu, sans poignées).
4. `src/player/player-carte.css` sur le modèle de `player-bimaccess.css`, importé dans `main.tsx`, actif sous `html[data-signature="carte"]` : barre d'état, boutons (LANCER, SUIVANT, VALIDER, CONTINUER) et leurs états, panneau d'exercice, rétroaction sans verdict, sous-titres, focus clavier ; valeurs du § 6 de la charte.
5. `src/player/App.tsx` : la barre d'état de la charte (hauteur, échelle graphique de progression, case courante en vert de programme) quand la signature est `carte`.
6. `studio.config.json` : `"signature": "carte"`. `content/design/theme.json` : remis aux jetons de la charte (il porte encore l'accent cyan de CER001 ; il t'appartient pour cette tâche).

Les scènes de la leçon ne sont pas encore écrites (le storyboard a huit scènes ; `src/lesson/` n'a que la scène du gabarit) : pour prouver la signature, garde la scène du gabarit, mets-la en accord avec le storyboard au minimum nécessaire pour que `check` passe (une scène S01 qui affiche ses textes d'écran), et ne code pas les autres scènes : c'est l'étape suivante.

## À lire, et rien d'autre

- /home/user/Bimaccess-FME/design/CHARTE-FME001.md, en entier (le § 6 donne les valeurs CSS de la coque)
- /home/user/Bimaccess-FME/design/tokens.json
- /home/user/Bimaccess-FME/design/symboles/cadre-feuille.svg, mise-en-evidence.svg, mise-en-evidence-rect.svg, echelle-graphique.svg
- /home/user/Bimaccess-FME/modules/M01/L01/lecon/CLAUDE.md et docs/player-contract.md
- le code du projet que tu modifies : scripts/sync.mjs, src/engine/*, src/player/*, src/main.tsx, src/lesson/*

## Contrôles à lancer avant de rendre

- `npm run check` : code 0, avec la ligne « scènes chargées »
- `npm run build` : code 0
- `npm run test:play` : code 0 (Playwright est là ; un seul Chromium, fermé à la fin)
- Une capture de la page construite, pour la regarder : `npm run test:play -- --shots /home/user/Bimaccess-FME/modules/M01/L01/lecon/.studio/tmp/shots-signature` ; regarde au moins l'écran de lancement et S01, et compare au § 6 de la charte.
- Les deux autres signatures marchent toujours : passe `studio.config.json` à `bimaccess` puis `neutral`, `npm run check` en 0 pour chacune, puis reviens à `carte`.

## Interdits

Aucune opération git ; ne pas affaiblir un garde-fou (`ordered`, `sceneTexts`, échecs de `sync.mjs`, contrôles de `play-check.mjs`) ; aucun appel réseau à l'exécution (polices embarquées) ; `acknowledgeRemotionLicense` ne change pas.

## Rapport

Au format de la section 3 de /home/user/bimaccess-studio/plugins/studio/skills/produce/references/briefs.md, écrit aussi dans .studio/reports/06-code.md : fichiers modifiés et pourquoi, contrôles (code de sortie, extrait), chemins des captures, écarts à la charte (ce que le lecteur ne peut pas faire tel que la charte le demande), et la liste exacte des fichiers du template à reporter dans le plugin.
