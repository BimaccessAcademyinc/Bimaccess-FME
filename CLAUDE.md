# BIMaccess FME

Module de formation sur FME (Feature Manipulation Engine) et son usage en SIG, et dépôt pilote du harnais de production des leçons pour les leçons qui commencent **sans source pack**.

## Deux objectifs, une mesure

1. Produire le module FME001, leçon par leçon, de A à Z.
2. Améliorer le harnais en le faisant : pack de recherche, banc d'essai des modèles, registre de mesures. Ce qui a fait ses preuves ici se reporte dans le dépôt source du harnais (`BimaccessAcademyinc/BIMaccess-Learning-Platform`, `agents/` et `plugins/studio/`), puis s'exporte vers `bimaccess-studio` par `agents/export_studio.py`. On ne modifie jamais `bimaccess-studio` à la main.

La réussite se juge sur la feuille de route (`docs/feuille-de-route.md`, § 1) : qualité au-dessus de CER001, temps et tokens par leçon en baisse, mesurés.

## Autorité

Ilyas est l'autorité finale sur l'exactitude technique, le sens pédagogique, les exemples, les questions et la publication. L'IA propose ; elle ne change jamais en silence un texte qu'il a écrit ou tranché. Un doute de fait que les sources ne tranchent pas va à la porte de l'expert du pack (`sources/porte-expert.md`), jamais tranché par un agent.

## Matière

Une leçon sans pack fourni passe d'abord par le skill `harnais/skills/pack-recherche/`. Après la porte de l'expert, `sources/source-pack.md` et `sources/affirmations.yaml` sont la seule matière de la leçon : ce qui n'y est pas ne se dit pas, aucun chiffre, cas ni exemple inventé. Les logos de FME et de Safe Software peuvent paraître, décision d'Ilyas du 2026-11-27 (`design/marques/`) ; les captures d'écran de l'éditeur et les marques d'Esri ne se reprennent pas sans son accord : elles se redessinent ou servent de référence.

## La chaîne d'abord

Constat du 2026-11-27 (`docs/journal-methode.md`, et `bimaccess-studio/docs/pilote-fme/ecarts-de-methode.md`) : la variante « planches image » a contourné le graphiste et le skill des scènes, et son assemblage a été refusé. Règles :

- Un nouvel outil (modèle d'image, vision, vectoriseur) entre dans la chaîne comme outil d'un rôle existant, jamais à sa place. L'agent principal orchestre et délègue ; chaque rôle lit son `CONTEXT.md` et ses skills avant d'agir.
- Un essai reste un essai : une scène, comparée à la méthode en place, montrée comme essai.
- Avant la voix, lire les décisions les plus récentes du rôle Voix du cours (état, notes d'essai), pas seulement sa configuration.

## Méthode des scènes (approuvée par Ilyas le 2026-11-27, essais 1 et 2)

Skill `harnais/skills/scenes-gabarits/` : (1) une scène de forme connue se fait par gabarit du moteur et fichier de données, pas en code sur mesure ; (2) modèle intermédiaire pour les données d'une scène, meilleur modèle pour écrire un gabarit et pour la composition ; (3) une scène par agent, en parallèle ; (4) la composition remplit la face de carte (x 104 à 1424), vérifiée par le gabarit ; (5) aucune réserve sous un texte posé dans une carte ou une feuille tant que les illustrations ne sont pas aux couleurs exactes des jetons. Modèle d'image par défaut : Flash 3.1.

## Disposition

| Dossier | Contenu |
|---|---|
| `docs/` | feuille de route, journal de méthode du pilote |
| `harnais/skills/` | skills nouveaux ou modifiés pendant le pilote (à reporter ensuite) |
| `harnais/mesures/` | `tokens.py`, registre des leçons, journal des appels hors Claude |
| `harnais/banc-modeles/` | protocole, `modeles.yaml`, `appel.py`, essais |
| `modules/M01/plan-module.md` | plan du module |
| `modules/M01/Lyy/` | une leçon : `sources/`, puis le projet Studio de la leçon |

Identifiants : programme `FME001`, leçon `FME001-M01-L01`, scène `FME001-M01-L01-S01`. Couleur de programme : vert ACI `#00A64F`.

## Conventions

- Français, sans tiret cadratin.
- Aucun libellé de statut (brouillon, revue, version finale ou semblable), nulle part.
- Aucun nom de modèle de langage dans les contenus de leçon ni dans les messages de commit, hors lignes d'attribution. Les noms et identifiants de modèles vivent seulement dans `harnais/`, `docs/` (le pilote compare des modèles) et les définitions d'agents.
- Chaque étape produit des fichiers ; les fichiers font foi, pas la conversation.
- Chaque étape mesurée : `python3 harnais/mesures/tokens.py --csv harnais/mesures/registre.csv --etape "<leçon> <étape>"` à la fin de l'étape.
- Clés d'API : seulement par le formulaire sécurisé de l'environnement, jamais dans un fichier ni dans la conversation.
- **Dépenses (règle d'Ilyas, 2026-11-27) : aucun appel payant sans son accord, et le coût s'annonce avant.** Modèles d'image et de vision, voix, modèles hors Claude : on annonce le nombre d'appels et le coût estimé, Ilyas approuve un montant, puis on lance. Les scripts le font respecter : `planche_image.py` et `illustrations.py` (`--approuve <$>`), `appel.py` (`--approuve <$>`), `npm run voice -- generate` (`--approuve <caractères>`) annoncent le coût et refusent sans accord. Un agent délégué ne dépense rien : il prépare ses commandes et rend la main ; l'agent principal annonce le coût à Ilyas.
- Branche de travail de la session ; jamais de pull request sans demande d'Ilyas. Si un push est refusé, s'arrêter et le dire.
