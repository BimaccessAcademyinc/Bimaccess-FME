# BIMaccess FME

Module de formation sur FME (Feature Manipulation Engine) et son usage en SIG, et dépôt pilote du harnais de production des leçons pour les leçons qui commencent **sans source pack**.

## Deux objectifs, une mesure

1. Produire le module FME001, leçon par leçon, de A à Z.
2. Améliorer le harnais en le faisant : pack de recherche, banc d'essai des modèles, registre de mesures. Ce qui a fait ses preuves ici se reporte dans le dépôt source du harnais (`BimaccessAcademyinc/BIMaccess-Learning-Platform`, `agents/` et `plugins/studio/`), puis s'exporte vers `bimaccess-studio` par `agents/export_studio.py`. On ne modifie jamais `bimaccess-studio` à la main.

La réussite se juge sur la feuille de route (`docs/feuille-de-route.md`, § 1) : qualité au-dessus de CER001, temps et tokens par leçon en baisse, mesurés.

## Autorité

Ilyas est l'autorité finale sur l'exactitude technique, le sens pédagogique, les exemples, les questions et la publication. L'IA propose ; elle ne change jamais en silence un texte qu'il a écrit ou tranché. Un doute de fait que les sources ne tranchent pas va à la porte de l'expert du pack (`sources/porte-expert.md`), jamais tranché par un agent.

## Matière

Une leçon sans pack fourni passe d'abord par le skill `harnais/skills/pack-recherche/`. Après la porte de l'expert, `sources/source-pack.md` et `sources/affirmations.yaml` sont la seule matière de la leçon : ce qui n'y est pas ne se dit pas, aucun chiffre, cas ni exemple inventé. Les marques, logos et captures de Safe Software ou d'Esri ne se reprennent pas sans licence écrite : ils se redessinent ou servent de référence.

## Disposition

| Dossier | Contenu |
|---|---|
| `docs/` | feuille de route, journal de méthode du pilote |
| `harnais/skills/` | skills nouveaux ou modifiés pendant le pilote (à reporter ensuite) |
| `harnais/mesures/` | `tokens.py`, registre des leçons, journal des appels hors Claude |
| `harnais/banc-modeles/` | protocole, `modeles.yaml`, `appel.py`, essais |
| `modules/M01/plan-module.md` | plan du module |
| `modules/M01/Lyy/` | une leçon : `sources/`, puis le projet Studio de la leçon |

Identifiants : programme `FME001`, leçon `FME001-M01-L01`, scène `FME001-M01-L01-S01`. Couleur de programme : vert ACI `#00A64F` (à confirmer par Ilyas).

## Conventions

- Français, sans tiret cadratin.
- Aucun libellé de statut (brouillon, revue, version finale ou semblable), nulle part.
- Aucun nom de modèle de langage dans les contenus de leçon ni dans les messages de commit, hors lignes d'attribution. Les noms et identifiants de modèles vivent seulement dans `harnais/`, `docs/` (le pilote compare des modèles) et les définitions d'agents.
- Chaque étape produit des fichiers ; les fichiers font foi, pas la conversation.
- Chaque étape mesurée : `python3 harnais/mesures/tokens.py --csv harnais/mesures/registre.csv --etape "<leçon> <étape>"` à la fin de l'étape.
- Clés d'API : seulement par le formulaire sécurisé de l'environnement, jamais dans un fichier ni dans la conversation.
- Branche de travail de la session ; jamais de pull request sans demande d'Ilyas. Si un push est refusé, s'arrêter et le dire.
