# Brief 15 · scénariste · L01 : dire ce qu'est FME, retirer l'exercice, montrer les logos

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon.

## Ce qu'Ilyas a dit en revoyant la leçon jouée (2026-11-27)

- « Y'avait pas besoin d'exercice. »
- « Tu m'as pas expliqué si c'est un format, une norme, une méthode, un logiciel, rien !! »
- « Tu peux utiliser les logos aussi tu sais ! »
- Il confirme que la voix peut nommer FME Form et FME Flow (porte Q12).

## Ta tâche

Une passe sur `content/storyboard.md` :

1. **Retirer l'exercice** (S04, la conduite d'eau) : la scène disparaît ; renumérote les scènes suivantes (S05 devient S04, etc.). Ce que S04 faisait pratiquer (les trois parties d'une entité) est déjà expliqué en S03 : rien à reporter.
2. **Dire ce qu'est FME**, net, dès que FME paraît dans le récit (S02), puis dans une scène à lui si le fil le demande :
   - FME est **un logiciel** : un ensemble d'applications qui traitent des données spatiales, le produit phare de Safe Software (A-nom-19) ; l'éditeur le présente comme une plateforme d'intégration de données (A-nom-20) ;
   - la plateforme comprend **FME Form**, pour construire les traitements, et **FME Flow**, pour les automatiser (A-sig-09, confirmée par Ilyas) ;
   - **la distinction avec ses voisins**, que le récit a déjà nommés : SAIF est un **format**, une **norme** canadienne d'échange (A-origines-17) ; FME n'est ni l'un ni l'autre : c'est le logiciel qui lit des données dans un format et les écrit dans un autre (A-nom-13). « Lire, transformer, écrire » est sa façon de travailler, pas une méthode normalisée : ne pas l'appeler « méthode ».
   - L'écran le montre comme une légende de carte qui classe : format, norme, logiciel, chacun avec son exemple de la leçon (SAIF ; SAIF ; FME), rien d'inventé.
3. **Les logos** (G29) : le logo « FME by Safe Software » (`content/design/assets/fme-logo.svg`, couleurs d'origine) paraît quand la voix nomme FME pour la première fois et quand elle dit ce qu'il est ; écris-le dans la mise en scène (« Écran », un texte d'écran n'est pas nécessaire pour un logo). Une seule fois par écran ; jamais déformé ni recoloré.
4. Le reste tient : récit avec Don Murray et Dale Lutz (G26), partir du problème (G22), ton (G23 à G25), une seule attribution de source dans la voix, durée d'environ 5 minutes (la scène sur la nature de FME peut prendre le temps libéré par l'exercice), exemples illustratifs, routes rouges de traduction, légende Lire / Écrire.

## À lire, et rien d'autre

- /home/user/Bimaccess-FME/harnais/grille-ilyas-pilote.md (G22 à G29)
- content/storyboard.md, content/brief.md
- /home/user/Bimaccess-FME/modules/M01/L01/sources/remise-scenariste.md (ce que la voix peut dire) et affirmations.yaml (extraits)
- les références du skill scénario si besoin : /home/user/bimaccess-studio/plugins/studio/skills/scenario/references/writing-rules.md

## À écrire, seulement

- content/storyboard.md
- .studio/reports/15-scenariste.md

Aucune opération git ; aucun autre fichier (le code et la spécification suivront).

## Contrôles

- `npm run lint:story -- --max-minutes 8 --forbid Esri --forbid ArcGIS --forbid "se traduit" --forbid "propriétaire" --term feature --max-term 1` : code 0
- `npm run sync` : code 0
- Attributions dans la voix (1 au plus) : `awk '/^## Narration/{n=1;next} /^## |^# /{n=0} n' content/storyboard.md | grep -ciE "selon (sa|la|leur)|d'après|au sens du"`

## Rapport (court)

La table des scènes (ancienne et nouvelle numérotation), **la scène qui dit ce qu'est FME citée en entier** (titre, écran, narration), où paraissent les logos, et les textes d'écran ajoutés ou retirés par scène (pour le code).
