# Brief 09 · voix · préparation, sans aucune génération payante

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon. Toutes les commandes se lancent depuis ce dossier.

## Ta tâche

Préparer la voix finale de la leçon, sans rien générer : la voix finale ne se paie qu'après la porte du sens (planche par phrase vue par Ilyas). Le storyboard est en réécriture : ne travaille pas sur ses textes.

1. **Configuration** : écris `content/voice/voice.config.yaml` du projet en reprenant la voix d'usage de BIMaccess (configuration de CER001, lue seulement : voix, modèle français, réglages). Garde le format attendu par `scripts/voice.mjs` du projet (lis `docs/voice.md`).
2. **Prononciations** : `content/voice/pronunciations.yaml` au format du projet, pour les noms propres et sigles de la leçon : Don Murray, Dale Lutz, Safe Software (à l'anglaise), SAIF (se dit comme « safe »), Surrey, Colombie-Britannique, Feature Manipulation Engine (à l'anglaise), FME (lettre par lettre, à la française : « èf-èm-eu »), SIG. Reprends ce que le dictionnaire de CER001 fait déjà pour les cas semblables (sigles lettre par lettre, noms anglais) ; ne recopie pas ses entrées propres au BIM.
3. **Vérifier que la voix existe sur le compte** : outil de connecteur ElevenLabs `creative_list_voices` (à charger avec ToolSearch : « select:mcp__ElevenLabs__creative_list_voices »), sans aucune génération. Si la voix d'usage n'y est pas, propose dans le rapport deux voix françaises masculines claires du compte, avec leur identifiant, sans en choisir une.
4. **La clé** : le script de voix du projet lit `ELEVENLABS_API_KEY` dans l'environnement. Dis seulement si elle est présente (`test -n "$ELEVENLABS_API_KEY" && echo présente || echo absente`), sans jamais l'afficher.

## À lire, et rien d'autre

- /home/user/BIMaccess-Learning-Platform/agents/voix/voice.config.yaml (lecture seule)
- /home/user/BIMaccess-Learning-Platform/production/CER001/voice/pronunciation-fr.pls (lecture seule)
- /home/user/bimaccess-studio/plugins/studio/skills/voix/SKILL.md et ses références `elevenlabs-notes.md`, `pronunciation.md`
- le projet : docs/voice.md, scripts/voice.mjs, scripts/lib/pronunciation.mjs, studio.config.json

## À écrire, seulement

- content/voice/voice.config.yaml
- content/voice/pronunciations.yaml
- .studio/reports/09-voix.md

Aucune génération (ni `voice -- try`, ni `generate`, ni outil de génération du connecteur) ; aucune opération git ; rien hors de ces fichiers.

## Contrôles

- `npm run voice -- test` (auto-test hors ligne) : code 0
- `npm run voice -- status` : lis la sortie, cite-la

## Rapport (court)

Fichiers écrits, voix et modèle retenus (nom, identifiant, d'où ils viennent), prononciations en table, présence de la voix sur le compte, présence de la clé, sorties des contrôles, et ce qu'il faudra décider avant la génération.
