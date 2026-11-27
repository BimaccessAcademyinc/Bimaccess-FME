# Contenu narré et interactif

Projet créé par le plugin studio : des scènes animées sur la voix, avec des moments interactifs, construites en une seule page HTML autonome.

## Démarrer

```bash
npm install
npm run dev        # serveur de développement, rechargement à chaud
```

Le contenu vit dans `content/` (storyboard, thème, illustrations, données des scènes à gabarit, voix) ; les scènes dans `src/lesson/scenes/`. Une scène de forme connue (frise, fiche à rubriques) tient en trois lignes et un fichier de données `content/design/scenes/Sxx.json` : `docs/gabarits.md`. Après chaque changement de `content/`, `npm run sync` régénère `src/generated/` (les commandes ci-dessous le font d'elles-mêmes).

## Signature graphique

Le contenu s'affiche par défaut dans la signature « CAD 2D » de BIMaccess (fond blanc à grille de points, Azeret Mono et IBM Plex Sans embarquées, couleurs ACI, poignées). Dans `studio.config.json` : `"signature": "carte"` pour la signature « carte topographique » (feuille imprimée, Source Serif 4 et Barlow Condensed embarquées ; palette neutre par défaut, celle du programme dans `content/design/theme.json`), `"signature": "neutral"` pour la signature neutre, `"program": "CER001"` pour la couleur et le code du programme (`"programColor"` pour un autre programme). Détails : `docs/player-contract.md` § 9.

## Voix

Sans voix, le contenu se joue avec un minutage estimé et des sous-titres. La voix (ElevenLabs, recette V4 du cours dans `content/voice/voice.config.yaml`) est payante : `npm run voice -- status` donne le devis en caractères, et `npm run voice -- generate` refuse tant que `--approuve <caractères>` ne le couvre pas. Mode d'emploi : `docs/voice.md`.

## Construire et ouvrir

```bash
npm run check      # chargement des scènes (locutions, ordre, textes, composition des scènes à gabarit) et contrôle des types
npm run build      # produit dist/index.html (+ dist/audio/ si le contenu a une voix)
```

Ouvrez `dist/index.html` directement (double-clic) ou servez-le avec `npm run preview` (http://localhost:4173/). Pour partager le contenu, envoyez le dossier `dist/` entier : la page et son dossier `audio/`.

Vérification complète dans un navigateur (Playwright installé hors du projet, par exemple `npm i -g playwright`) :

```bash
npm run test:play
npm run test:gabarits   # auto-test des gabarits de scène dans la signature du projet
```

## Licence Remotion

Le lecteur utilise Remotion. Remotion est gratuit pour les particuliers et les structures de trois personnes au plus ; au-delà, une licence d'entreprise est nécessaire (https://remotion.dev/license). Une fois votre situation vérifiée, vous pouvez mettre `"acknowledgeRemotionLicense": true` dans `studio.config.json` pour faire taire la note de licence en console. Cette décision vous appartient : aucun agent ne la prend à votre place.
