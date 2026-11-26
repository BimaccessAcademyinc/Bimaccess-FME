---
name: pack-recherche
description: "Construit le pack de sources d'une leçon qui n'en a pas : questions de recherche tirées du cadrage, recherche web par axes en parallèle, registre d'affirmations sourcées dont la confiance est calculée par script, vérification croisée, banque visuelle, lacunes, et une porte courte où l'expert tranche avant tout scénario."
when_to_use: "Avant le scénario d'une leçon dont aucun document source n'est fourni, ou dont les sources fournies ne couvrent pas tout le cadrage."
---

# Pack de recherche · une leçon sans source pack

La chaîne de production repose sur une règle : le pack de la leçon est la seule matière. Quand personne ne fournit de pack, la tentation est d'écrire de mémoire. Ce skill remplace la mémoire par un pack construit, où chaque phrase que la voix pourra dire remonte à une source qu'on peut ouvrir, et où l'expert ne relit que ce qui le demande.

Fichiers du skill : `templates/cadrage.md`, `templates/affirmations.yaml`, `templates/source-pack.md`, `scripts/check_pack.py`.

## 1. Ce que le pack produit

Dans `<leçon>/sources/` :

| Fichier | Écrivain | Contenu |
|---|---|---|
| `cadrage.md` | orchestrateur, avec l'expert | titre, acquis visé, limites, leçons voisines, axes de recherche ; **seule entrée** des chercheurs |
| `recherche/<axe>.yaml` | un chercheur par axe | affirmations de son axe, au format de `templates/affirmations.yaml` |
| `affirmations.yaml` | consolidateur | toutes les affirmations, dédoublonnées, identifiants stables `A-<axe>-NN` |
| `source-pack.md` | consolidateur | le pack lisible par le scénariste, au gabarit `templates/source-pack.md` ; chaque paragraphe renvoie à ses affirmations |
| `porte-expert.md` | consolidateur | dix questions au plus pour l'expert, puis ses réponses |

Après la porte, `source-pack.md` et `affirmations.yaml` sont la matière de la leçon, au même titre qu'un pack fourni : ce qui n'y est pas ne se dit pas.

## 2. Déroulé

1. **Cadrage.** L'orchestrateur écrit `cadrage.md` depuis le plan du module. Chaque axe y devient trois à six questions précises (« qui a fondé Safe Software, où, quand, pour quel client ? »), jamais un thème vague (« l'histoire de FME »). Pour un sujet où l'éditeur parle surtout de lui-même, le cadrage nomme d'avance des sources indépendantes possibles (presse d'affaires, revues du métier, publications académiques, documentation d'un partenaire) : sans elles, tout reste en confiance moyenne et va à l'expert.
2. **Recherche par axes, en parallèle.** Un agent `chercheur` par axe, sur un brief qui ne liste que `cadrage.md`, ce skill et son fichier de sortie. La recherche web sert à **trouver** les pages ; la lecture se fait sur le texte brut, par `scripts/lire_page.py <sources> <url> --chercher "<mot>"` : la lecture web d'un agent passe par un résumé et ne rend pas la phrase exacte, ce qui coûte des relances. L'extrait se recopie depuis la sortie du script. Le script lit aussi les PDF. Un site qui refuse (401, 403, 429) se respecte : on ne se fait pas passer pour un navigateur ; on cherche une autre source, ou la source reste « à vérifier à la main ».
3. **Consolidation.** Un agent fusionne les axes, garde un seul énoncé par fait, réunit les sources d'un même fait, note les contradictions sans les trancher, écrit `source-pack.md` et `porte-expert.md`.
4. **Contrôle mécanique.** `python3 scripts/check_pack.py <leçon>/sources --extraits` doit sortir en 0. Le script **calcule** la confiance de chaque affirmation à partir de ses sources (celle qu'un agent écrit à la main est ignorée et signalée), et vérifie que **chaque extrait figure mot pour mot** dans le texte brut de sa page : un extrait introuvable sur une affirmation de narration est une erreur.
5. **Vérification du sens.** Un agent `verificateur`, qui n'a rien cherché, lit chaque affirmation de narration à côté de son extrait, et seulement là où le script ne pouvait pas lire la page, rouvre la page. La présence de l'extrait est déjà prouvée par le script : il juge seulement si l'extrait **dit bien** l'énoncé, sans glissement (une date de constitution n'est pas une date de sortie du produit, un siège actuel n'est pas le lieu de fondation). Il peut baisser l'usage d'une affirmation, ou la marquer `verifie: false` avec la raison. Il ne réécrit aucun énoncé.
6. **Porte de l'expert.** Dix questions au plus dans le fichier, l'option recommandée en premier, chacune avec ses sources ; l'orchestrateur en **pose quatre au plus** à l'expert, celles qui pèsent le plus sur la leçon (titre, fil, terme central, fait que la voix dira), et applique l'option recommandée aux autres, notée « appliqué, révisable » sous la question, comme le veut la règle des portes de la chaîne. L'expert répond dans `porte-expert.md`. Une réponse de l'expert devient une source de niveau `expert` (§ 3). Une question sans réponse laisse l'affirmation hors de la narration, et la production continue.

## 3. Sources et confiance

| Niveau | Ce que c'est | Exemples |
|---|---|---|
| `A` | primaire : l'éditeur, l'organisme ou la personne dont on parle, une norme, un document officiel | site et documentation de l'éditeur, entretien d'un fondateur, texte d'une norme |
| `B` | secondaire fiable, indépendante du sujet | presse spécialisée ou d'affaires, publication académique, documentation d'un tiers reconnu |
| `C` | tertiaire ou non contrôlée | encyclopédie collaborative, blog, forum, page d'agrégateur |
| `expert` | réponse écrite de l'expert à la porte | `porte-expert.md`, question Qn |

Deux sources sont **indépendantes** si leur champ `editeur` diffère (deux sous-domaines du même éditeur, ou un communiqué repris tel quel par la presse, ne font qu'une source).

Confiance calculée par `check_pack.py` :

| Confiance | Règle |
|---|---|
| `forte` | une source `expert`, ou au moins deux sources indépendantes dont une `A` |
| `moyenne` | une source `A`, ou deux sources `B` indépendantes |
| `faible` | tout le reste, en particulier une source `C` seule |

Usage d'une affirmation :

| Usage | Condition | Conséquence |
|---|---|---|
| `narration` | confiance `forte` ou `moyenne` | la voix ou l'écran peut la dire |
| `expert` | confiance `faible` mais utile à la leçon, ou chiffre, date, nom propre en confiance `moyenne` | va à la porte de l'expert ; hors narration tant qu'il n'a pas répondu |
| `contexte` | utile pour comprendre, pas pour dire | le scénariste la lit, la voix ne la dit pas |

Une date, un chiffre ou un nom propre que la voix dira demande la confiance `forte` : en `moyenne`, l'affirmation va à la porte.

## 4. Règles d'écriture des affirmations

- Un énoncé, un fait. Paraphrase en français, sans adjectif de jugement (« pionnier », « leader »), sauf si l'énoncé dit justement qui le revendique (« Safe Software se présente comme… »).
- `extrait` : la phrase de la page qui porte le fait, recopiée telle quelle, 30 mots au plus, dans la langue de la page.
- `consulte` : la date du jour de la lecture, `AAAA-MM-JJ`.
- Une contradiction entre sources se note dans `contradictions`, avec les deux versions ; on ne choisit pas.
- Avant de déclarer une lacune, chercher dans toutes les pages déjà lues : `lire_page.py <sources> --cache "<mot>"` (première passe de FME001 : la fiche PDF « illisible » portait les fondateurs, l'année et le siège).
- Un article de presse qui reprend un communiqué compte pour l'éditeur (`editeur` de l'entreprise, niveau `A`), pas pour la presse : repère la dateline, la rubrique « About <entreprise> », le contact presse. `check_pack.py --extraits` le signale sur les sources `B` et `C`.
- Ce qui n'a pas été trouvé va dans les lacunes du pack, jamais comblé de mémoire. Une connaissance générale sans source s'écrit en lacune, avec « à sourcer » : elle ne devient pas une affirmation.
- Marques, captures d'écran et logos de l'éditeur : dans la banque visuelle, en `REFERENCE_ONLY` ou `REDRAW` ; jamais `REUSE` sans licence écrite.

## 5. Ce que le pack ne fait pas

Il n'écrit ni narration, ni découpage en scènes, ni exemple inventé. Il ne réduit pas le cadrage à ce que les sources trouvées couvrent : un axe mal couvert se signale en lacune, et l'expert décide s'il sort de la leçon.

## 6. Coût

Le pack est l'étape la moins chère à refaire et la plus chère à rater : une erreur de fait trouvée après la voix coûte un tour de scénario, de code et de voix. Les chercheurs travaillent à effort moyen sur un modèle économique, le vérificateur à effort élevé ; les essais du banc (`harnais/banc-modeles/`) disent si cette répartition tient.
