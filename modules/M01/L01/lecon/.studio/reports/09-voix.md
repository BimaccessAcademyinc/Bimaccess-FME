# Rapport 09 · voix, préparation

Aucune génération, aucune opération git.

## Fichiers écrits
- content/voice/voice.config.yaml
- content/voice/pronunciations.yaml
- .studio/reports/09-voix.md

## Voix et modèle (lus dans agents/voix/voice.config.yaml de CER001, section fr)
- Voix : Alexandre Boutin - Professional, IPgYtHTNLjC7Bq7IPHrm
- Modèle : eleven_v3 ; réglages stability 0.5, similarity_boost 0.9, style 0.0, speaker boost, speed 1.0 ; mp3_44100_128 ; context_between_clips false (refusé par v3).
- Présente sur le compte connecté au connecteur (creative_list_voices, catégorie professional, accent québécois).
- Pas de language_code (comme CER001 en français). Pas de termes interdits repris (le « clash » de CER001 est propre au BIM).

## Prononciations
| Graphème | Alias |
|---|---|
| Feature Manipulation Engine | [American accent] Feature Manipulation Engine [French Canadian accent] |
| Safe Software | [American accent] Safe Software [French Canadian accent] |
| Don Murray | [American accent] Don Murray [French Canadian accent] |
| Dale Lutz | [American accent] Dale Lutz [French Canadian accent] |
| Surrey | [American accent] Surrey [French Canadian accent] |
| SAIF | safe |
| FME | F. M. E. |
| SIG | S. I. G. |

Notes : « Colombie-Britannique » n'a pas de règle (mot français, un alias identique serait inutile). FME suit la famille CER001 (lettres à points, lues à la française) plutôt qu'une graphie « èf-èm-eu ». Aucun alias ne contient un autre graphème. Toutes ces règles sont à écouter (essai `try`) avant la génération finale ; aucune n'a été testée.

## Clé
ELEVENLABS_API_KEY : absente de l'environnement.

## Contrôles
- `npm run voice -- test` : 96 contrôles réussis, 0 échec, code 0.
- `npm run voice -- status` : 8 clips à générer (S01-01, S02-01, S03-01, S04-01, S04-02, S05-01, S06-01, S07-01), 3772 caractères, 0 à jour ; « aucun manifeste » ; « ELEVENLABS_API_KEY absente ». Le storyboard est en réécriture : ces chiffres bougeront.

## À décider avant la génération
1. Porte du sens passée (planche par phrase vue par Ilyas) et storyboard stabilisé.
2. Fournir la clé par le formulaire sécurisé de l'environnement (voir son compte et le quota : `voice -- quota`).
3. Écoute des prononciations : balises d'accent pour les noms anglais (Don Murray, Dale Lutz, Surrey, Safe Software, Feature Manipulation Engine), SAIF « safe », FME « F. M. E. » ; un `voice -- try` avec variantes, décidé par Ilyas.
4. Le compte de la clé doit donner accès à la voix IPgYtHTNLjC7Bq7IPHrm (voix de bibliothèque : forfait payant requis). Sinon, deux voix françaises masculines claires du compte, sans choix de ma part : Frederic - Professional and Confident (oziFLKtaxVDHQAh7o45V, québécois) et Bastien - Calm & Clear French Teacher (69ujSsYIBOGW4duCBBSW, français standard).
