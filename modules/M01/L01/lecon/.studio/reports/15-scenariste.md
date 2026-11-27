## Rapport · scénariste · brief 15

### Fichiers écrits
- `content/storyboard.md` : l'exercice de la conduite d'eau est retiré (G28). La leçon dit ce qu'est FME dès qu'il paraît (S02, « son logiciel ») et dans une scène à lui, la nouvelle S03, une légende qui classe format, norme et logiciel (G27). Le logo « FME by Safe Software » paraît en S02 et en S03 (G29). Les métadonnées sont mises à jour : L'idée, Jauge, Objectifs, Vocabulaire, Budget, Points ouverts, Test du débutant.
- `.studio/reports/15-scenariste.md` : ce rapport.

### Table des scènes

| Ancienne | Nouvelle | Titre |
|---|---|---|
| S01 | S01 | Chaque entreprise forestière garde son logiciel |
| S02 | S02 | Safe Software commence par traduire vers SAIF (une phrase de narration changée, logo ajouté) |
| (aucune) | **S03** | **FME est un logiciel, SAIF un format et une norme** (nouvelle) |
| S03 | S04 | Une entité géographique porte trois parties (inchangée, renumérotée) |
| S04 | (retirée) | Une équipe doit situer la conduite d'eau reçue (exercice) |
| S05 | S05 | FME lit, transforme, puis écrit |
| S06 | S06 | Un moteur central relie les formats pris en charge |
| S07 | S07 | Une entité géographique vit dans un format |

Comme la scène sur la nature de FME prend la place S03, juste après S02, l'ancienne S05 garde son numéro : le décalage annoncé par le brief (« S05 devient S04 ») ne se produit pas. Seule l'ancienne S03 change de numéro.

### La nouvelle S03, en entier

**S03 · FME est un logiciel, SAIF un format et une norme** (titre affiché : « FME est un logiciel. »)

Écran :
- `FME est un logiciel.`
- `Légende`
- `SAIF`
- `Format : SAIF`
- `Norme : SAIF`
- `Logiciel : FME`
- `FME Form : construire les traitements`
- `FME Flow : automatiser les traitements`
- `D'après Safe Software et la presse spécialisée`

Mise en scène, en bref : à l'image 0, un cartouche « Légende » de carte montre trois cases de symbole (feuille de format, cachet de norme, fenêtre de logiciel) et leurs lignes vides. Sur la droite, la feuille « SAIF » de S02 est redessinée en petit. Les lignes de la légende se remplissent sur la voix. Le logo arrive sous la feuille SAIF sur « FME n'est ni un format » et se relie à « Logiciel : FME » par une ligne de repère. Deux routes rouges de traduction, sans étiquette, vont de SAIF au logo, puis du logo à une feuille sans nom. FME Form et FME Flow s'affichent en retrait sous « Logiciel : FME ». Une seule mise en évidence à la fois.

Narration :

> SAIF et FME ne désignent pas le même genre de chose.
>
> SAIF est un format, celui du gouvernement de la Colombie-Britannique. C'est aussi une norme canadienne d'échange de données géographiques.
>
> FME n'est ni un format ni une norme. C'est un logiciel : un ensemble d'applications qui traitent des données spatiales, le produit phare de Safe Software.
>
> Il lit des données dans un format et les écrit dans un autre.
>
> L'éditeur le présente comme une plateforme d'intégration de données. Elle comprend FME Form, pour construire les traitements, et FME Flow, pour les automatiser.

Affirmations : A-origines-24, A-origines-17, A-nom-19, A-nom-13 (seconde moitié), A-nom-20, A-sig-09 (porte Q12). La voix n'appelle jamais « lire, transformer, écrire » une méthode. Elle ne définit pas « format » ni « norme » au-delà de SAIF, faute d'affirmation.

### Où paraît le logo (`fme-logo.svg`, couleurs d'origine, une fois par écran)
- S02 : sous le jalon « 1996 · Première version de FME », par un balayage, sur « la première version de son logiciel ». C'est la première fois que la voix nomme FME. Le nom d'origine « Feature Manipulation Engine » s'affiche sous le logo.
- S03 : sous la feuille SAIF, par un balayage, sur « FME n'est ni un format ». C'est là que la voix dit ce qu'il est. Une mise en évidence s'y pose ensuite, sur « L'éditeur le présente ».
- Aucune autre scène n'a de logo (S06 garde son point géodésique « Moteur »).

### Textes d'écran par scène (pour le code)
- S01 : inchangés (6).
- S02 : inchangés (11). Le logo est ajouté, sans texte. Une phrase de narration change : « … sort la première version de son logiciel, FME, à l'origine Feature Manipulation Engine. » Les locutions « en 1996 » et « à l'origine Feature Manipulation Engine » restent valables.
- S03 (nouvelle) : 9 textes, listés plus haut. L'illustration du logo se pose sur « FME n'est ni un format ».
- S04 (ancienne S03) : textes inchangés (7) et narration inchangée. Il faut renommer l'ID (S03 → S04), le clip (S03-01 → S04-01) et les boards.
- Ancienne S04 retirée : 7 textes, l'exercice et sa narration déclenchée disparaissent. `s04-conduite.svg` ne sert plus.
- S05, S06, S07 : textes et narrations inchangés. Seule la mise en scène de S05 et de S07 change, pour ne plus nommer la conduite et pour renvoyer au bâtiment de S04.

### Contrôles
- `npm run lint:story -- --max-minutes 8 --forbid Esri --forbid ArcGIS --forbid "se traduit" --forbid "propriétaire" --term feature --max-term 1` → code 0. Extrait : « 7 scène(s), 7 narration(s), 0 exercice(s), voix ≈ 3:31 » ; « aucune erreur, 12 avertissement(s) ». Les deux nouveaux avertissements viennent de S03 : « Légende » est à l'écran dès l'image 0, et « SAIF » est dit deux fois (la feuille est là dès l'image 0). Les dix autres existaient déjà ; ceux de l'ancienne S04 ont disparu.
- `npm run sync` → code 0. Extrait : « 7 scène(s), 7 clip(s) dont 0 avec voix, 0 exercice(s), 16 illustration(s) ».
- Compte des attributions dans la voix (`awk … | grep -ciE "selon (sa|la|leur)|d'après|au sens du"`) → `0`.

### Points à trancher (dans `# Points ouverts`)
- La voix contient désormais deux présentations de l'éditeur par lui-même : « L'éditeur le présente comme une plateforme d'intégration de données » (S03, A-nom-20, demandé par le brief) et « Safe Software décrit FME comme un moteur central » (S06). Elle ne contient aucun « selon » ni « d'après ». Pour revenir à une seule, il suffit de garder A-sig-09 seule en S03.
- A-nom-19 et A-nom-20 n'ont pas encore été vérifiées dans le registre (`verifie` vide).
- Le logo d'aujourd'hui est posé sur le jalon 1996. Il peut aller sur « Aujourd'hui, l'éditeur dit simplement FME ».
- `content/brief.md` est à mettre à jour sur trois points : il n'y a plus d'exercice, FME Form et FME Flow sont nommés (Q12), et l'objectif 3 est montré, plus pratiqué.
