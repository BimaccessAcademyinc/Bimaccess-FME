# Voix et storyboard : mode d'emploi

Deux outils en ligne de commande, lancés depuis la racine du projet (Node 20 ou plus, aucune dépendance en plus de celles du projet) :

- `npm run lint:story` (`scripts/lint-storyboard.mjs`) : contrôle le storyboard avant la voix, le dessin et le code ;
- `npm run voice -- <commande>` (`scripts/voice.mjs`) : produit la narration avec ElevenLabs et tient le manifeste que `npm run sync` relit.

**Le contenu marche sans voix.** Sans manifeste ou sans clé, le lecteur estime le minutage sur le texte et active les sous-titres. La voix s'ajoute quand on veut, sans rien changer au reste.

## 1. Contrôler le storyboard

```
npm run lint:story
npm run lint:story -- content/storyboard.md --max-minutes 8 --forbid "process" --term "pompe à chaleur"
```

Erreurs (code de sortie 1) : ce que le lecteur lirait mal ou pas du tout.

- scènes `# S01 · Titre` numérotées sans trou ni doublon, titre de scène mal écrit ou précédé d'un blanc, scène en `##`, fichier enregistré avec un BOM ;
- sections inconnues ou mal nommées (`## Voix` au lieu de `## Narration`, `## Quiz` au lieu de `## Exercice`), section en double ;
- section que le lecteur ignorerait sans rien dire : `### Narration` (niveau 3 ou plus), `##Narration` (sans espace), `##  Narration` (deux espaces), tabulation ou espace insécable après les dièses, titre indenté (`   ## Narration`), `# Narration` (niveau 1 : il termine la scène), `## Narration…` placée après un titre `# …` qui n'est pas une scène ;
- `## Écran` sans texte entre accents graves, accent grave non fermé, texte à l'écran de plus de 20 mots, **puce ou ligne numérotée (`1. …`) sans accents graves** (elle ne s'afficherait pas : `- \`Bac vert\`` pour l'afficher ; une note pour le graphiste ou le code s'écrit sans puce, ou dans `## Mise en scène`) ;
- narration vide, deuxième narration linéaire dans une scène, balisage qui serait dit et affiché en sous-titre : titre, citation, tableau, commentaire `<!-- … -->` ou balise HTML, lien, italique `*…*` ou `_…_` (seuls les accents graves et le gras sont retirés) ;
- exercice : `Question : \`…\``, 2 à 5 choix `- a · \`choix\` → \`conséquence\``, lettres minuscules, chaque choix avec sa conséquence, `Attendu : b` qui désigne un choix ; dans `## Exercice`, toute puce qui commence par une majuscule suivie d'un séparateur (`- N.B. : …`, `- D · …`, avec ou sans accents graves) est lue comme un choix en majuscule et refusée par `npm run sync` : une note s'y écrit sans puce, ou dans `## Mise en scène` ;
- règles d'écriture : tiret cadratin, première personne dans la voix (`--allow-first-person` si le brief l'impose), verdict (« bravo », « bonne réponse »…) dans la voix ou une conséquence, mot interdit (`--forbid`), terme imposé dit plus de `--max-term` fois dans la voix (`--term`, 1 par défaut), narration totale au-delà de `--max-minutes`, scène plus de deux fois plus longue que prévu (au budget), durée illisible au budget ;
- repères (storyboard du projet seulement) : chaque locution de `content/beats.json` et des `suggested_beats` du manifeste doit être dite une fois exactement dans son clip, et chaque clip de `beats.json` exister : sinon `npm run sync` échouerait.

Avertissements (code 0, `--strict` pour en faire des erreurs) : phrase de plus de 30 mots (`--max-sentence-words`), texte à l'écran de plus de 10 mots (`--max-screen-words`), question ou mise en scène dans la voix (« à l'écran », « comme vous le voyez »), « ce n'est pas… », verdict faible (« parfait »), texte à l'écran que la narration ne nomme pas (l'animation n'aurait aucun mot où se caler) ou nomme plusieurs fois, phrase de narration recopiée à l'écran, scène de plus de trois minutes, plus de deux exercices, même forme deux fois de suite, durée sans unité au budget (lue en minutes), manifeste voix en retard sur le storyboard (`npm run voice -- extract` avant `npm run sync`).

Durées : la voix est estimée à `--wpm` mots par minute (150). Si le storyboard contient un tableau de durées par scène, hors des scènes, sous `# Structure temporelle`, `# Durées`, `# Timing` ou `# Budget` (colonnes `Scène` et `Durée` ; ligne `TOTAL` facultative), chaque scène y est comparée. Durées lues : `1:20`, `1 min 30 s`, `1 min 30`, `2 min`, `1,5 min`, `90 s`, `10 sec`, `45 secondes` ; un nombre seul est lu en minutes, avec un avertissement ; toute autre forme est une erreur.

Un storyboard accepté par `lint:story` passe `npm run sync` tant que le manifeste voix suit le storyboard (sinon : `npm run voice -- extract`).

## 2. Produire la voix

### Une fois : la configuration

`content/voice/voice.config.yaml` : `voice_id` (obligatoire), `model_id` (un seul modèle pour tout le contenu), `language_code`, `output_format` (toujours `mp3_…`), `voice_settings`, `seed`, `context_between_clips`, `dictionary`, `max_chars_per_clip`, `request_timeout_s` (300), `retry_delay_s` (5), et `lint.forbidden_terms` / `lint.staging_patterns`. Changer la voix, le modèle ou les réglages rend tous les clips « à générer ».

La clé vient **seulement** de la variable d'environnement `ELEVENLABS_API_KEY`, définie dans le terminal :

```
export ELEVENLABS_API_KEY=…        # macOS, Linux
$env:ELEVENLABS_API_KEY = "…"      # Windows PowerShell
```

Jamais dans un fichier du projet, jamais en argument. Les scripts ne l'affichent ni ne l'écrivent nulle part (toute sortie la masque, y compris quand l'API la renvoie dans un message d'erreur). Une clé mal recopiée (espace ou retour à la ligne au milieu, caractère accentué ou invisible) arrête `generate`, `quota`, `voices` et `try` avant toute requête, code 2, message « clé mal formée ».

### Le cycle

```
npm run voice -- lint        # pièges de synthèse, avant de dépenser des caractères
npm run voice -- status      # quels clips sont à générer, et pourquoi (sans réseau)
npm run voice -- quota       # caractères restants sur le compte
npm run voice -- generate    # génère les clips nouveaux ou modifiés
npm run voice -- verify      # manifeste ↔ storyboard, fichiers, durées, repères
npm run sync                 # le lecteur reprend audio et minutage
```

- **Un clip par section « Narration… »** d'une scène, numérotés comme dans le lecteur : `S03-01` (narration d'entrée), `S03-02` (narration déclenchée ; le manifeste garde le titre de sa section dans `trigger_label`).
- `extract` écrit `content/voice/voice-manifest.yaml` sans réseau : l'audio d'un clip au texte inchangé est gardé, celui d'un clip modifié est invalidé ; un clip dont seul le numéro change (scène insérée ou déplacée) est renommé sans nouvelle requête. `extract --prune` supprime les fichiers que plus aucun clip n'utilise. `generate` fait d'abord la même chose.
- `generate` ne demande que les clips nouveaux ou modifiés (texte, prononciation, réglages), un par un (0,4 s entre deux requêtes), et écrit le manifeste après chaque clip : après une panne, relancer la même commande reprend là où elle s'est arrêtée. `--only S02-01` (ou `--only S02`) restreint, `--force` refait même un clip à jour, `--no-quota-check` saute le contrôle du quota.
- **Chaque réponse est contrôlée avant d'être écrite.** Refusée (le clip garde ses anciens fichiers, le manifeste reste intact, le clip reste « à générer », arrêt code 1) : alignement vide, instant absent, non numérique ou négatif, instants qui reculent, alignement qui finit plus de 0,5 s après la fin du MP3, alignement plus court que le texte envoyé, MP3 illisible. La requête refusée a été facturée : le message le dit. Un alignement qui ne reprend pas mot pour mot le texte (normalisation de l'API) est seulement signalé.
- Sorties : `content/voice/Sxx/Sxx-yy.mp3`, `Sxx-yy.alignment.json` (instants de chaque caractère), et dans le manifeste `audio`, `alignment`, `duration_s` (durée mesurée dans le MP3, portée à la fin de l'alignement si celle-ci la dépasse de moins de 0,5 s, pour que la voix ne soit jamais coupée), `text_hash`, `synth_hash`, `tts_text` (texte réellement envoyé ; `npm run sync` y compare l'alignement).
- `verify` refait les mêmes contrôles sur les fichiers : un alignement incohérent est une erreur.
- **Repères proposés** (`suggested_beats`) : chaque texte de l'écran de la scène que la voix dit mot pour mot une seule fois devient un repère (`mesurer_temperature: "Mesurer la température"`). Le rôle code les complète ou les remplace dans `content/beats.json`. Un repère qui n'est plus dit après une modification est retiré et signalé. `--no-beats` n'en propose pas.

### Choisir la voix

Liste des voix du compte (lecture seule, aucun caractère dépensé), une ligne par voix : `voice_id`, nom, catégorie, langues, accent, genre, usage. `--lang fr` garde les voix qui annoncent le français (ou aucune langue), `--search "texte"` filtre sur le nom, `--json` donne la liste brute :

```
npm run voice -- voices --lang fr
```

Puis la même phrase de la narration avec chaque voix candidate, sans toucher `voice.config.yaml` (fichiers dans `.studio/tmp/voice-try/<voice_id>/` : un essai n'écrase pas celui d'une autre voix ; `voice.config.yaml` peut ne pas exister encore, les réglages par défaut servent) :

```
npm run voice -- try "Une phrase de la narration." --voice <voice_id>
```

L'humain écoute et choisit ; la voix retenue (`voice_id`, `voice_name`) va dans `voice.config.yaml`. Catégories : `premade` (voix fournies avec le compte) ; `cloned`, `generated`, `professional` (voix du compte) ; une voix de bibliothèque peut exiger un forfait payant (402).

### Prononciation

`content/voice/pronunciations.yaml` : règles `grapheme` → `alias` appliquées au texte **avant l'envoi**, en mots entiers, sensibles à la casse. Le storyboard et le champ `text` du manifeste gardent le texte écrit ; seul `tts_text` change. Fiabilité décroissante : écrire le mot comme il se dit, épeler un sigle avec des points (`T. V. A.`), puis les balises phonétiques, seulement après écoute. Un format PLS (`.pls`, `<alias>`) est aussi accepté.

Essai d'une prononciation douteuse, hors du contenu (fichiers dans `.studio/tmp/voice-try/`, à écouter par un humain) :

```
npm run voice -- try "Le sigle {} se dit ainsi." --variants "T. V. A.|tévéa"
```

`npm run voice -- lint` refuse (erreur) le balisage qui serait dit (commentaire ou balise HTML, lien, italique `*…*` ou `_…_`) et signale ce que la voix risque de mal lire et que le dictionnaire ne couvre pas encore : sigles, codes mêlant lettres et chiffres, nombres (grands, décimaux, signés, fractions, intervalles, heures), symboles (`%`, `°`, `€`, `/`…), ponctuation (tiret, points de suspension, parenthèses, crochets), abréviations, adresses, paragraphe sans ponctuation finale, phrase longue, clip trop long pour le modèle, mise en scène dans la voix, terme proscrit (`lint.forbidden_terms`, erreur). Un contrôle automatique ne remplace pas l'écoute.

### Sans clé, ou en essai

Sans `ELEVENLABS_API_KEY`, `generate`, `quota`, `voices` et `try` s'arrêtent (code 2) avec un message qui rappelle que le contenu marche sans voix ; `status`, `extract`, `lint` et `verify` fonctionnent toujours.

`ELEVENLABS_BASE_URL` pointe ailleurs que `https://api.elevenlabs.io`, par exemple vers le faux serveur local livré pour les essais :

```
ELEVENLABS_API_KEY=… node scripts/lib/fake-elevenlabs.mjs --port 8787
ELEVENLABS_BASE_URL=http://127.0.0.1:8787 ELEVENLABS_API_KEY=… npm run voice -- voices --lang fr
ELEVENLABS_BASE_URL=http://127.0.0.1:8787 ELEVENLABS_API_KEY=… npm run voice -- try "Une phrase." --voice fakeFrAlice01
ELEVENLABS_BASE_URL=http://127.0.0.1:8787 ELEVENLABS_API_KEY=… npm run voice -- generate
```

`…` : une valeur quelconque, la même pour le serveur et pour la commande, jamais votre vraie clé. Il imite `GET /v2/voices` (par pages) et `GET /v1/voices` avec quatre voix fictives (`fakeFrAlice01`, `fakeFrBruno02`, `fakeEnClara03`, `fakeMultiDan04` : français, anglais, catégories variées), `GET /v1/user/subscription`, et la synthèse (MP3 muet, alignement fictif) : de quoi essayer toute la chaîne, choix de la voix compris, sans réseau ni quota.

`npm run voice -- test` joue toute la chaîne hors ligne contre ce faux serveur, sur un projet jetable (dossier temporaire du système, ou `--tmp <dossier>` ; `--keep` le conserve) : sans clé, extract, lint, generate avec pannes et reprise, réponses incohérentes refusées, attentes croissantes sans Retry-After, réponse tronquée, délai dépassé, clé mal formée, verify, sync, narration modifiée, scène insérée, liste des voix (pages, repli `/v1/voices`, filtre de langue) et essai d'une autre voix (`try --voice`), pièges du storyboard (`lint:story`), clé absente de toute sortie et de tout fichier. Code 0 si tout passe.

### Codes HTTP fréquents

| Code | Cause probable |
|---|---|
| 400, 422 | `model_id`, `language_code` (pas accepté par tous les modèles), `voice_settings` ou `output_format` refusés |
| 401 | clé invalide, ou forfait gratuit bloqué |
| 402 | voix de bibliothèque sur forfait gratuit, ou crédit épuisé |
| 404 | `voice_id` inconnu |
| 429, 5xx | trop de requêtes ou panne passagère : trois essais en tout, après le délai de l'en-tête `Retry-After` s'il existe, sinon après `retry_delay_s` (5 s) puis le double (10 s) ; un `Retry-After` de plus d'une minute arrête tout de suite ; puis arrêt propre (relancer reprend) |
| délai dépassé | une synthèse restée sans réponse après `request_timeout_s` n'est **pas** renvoyée (elle a pu être traitée et facturée) : vérifier le quota, puis relancer |
| réponse tronquée | réponse coupée ou non JSON (proxy, connexion) : redemandée une fois, puis arrêt avec ce message |
