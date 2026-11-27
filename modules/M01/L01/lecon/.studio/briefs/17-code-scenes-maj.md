# Brief 17 · code · mise à jour des scènes après le nouveau storyboard

Projet : /home/user/Bimaccess-FME/modules/M01/L01/lecon.

Le storyboard a changé (voir `.studio/reports/15-scenariste.md`) : l'exercice est retiré, une nouvelle S03 « FME est un logiciel » est insérée, l'ancienne S03 devient S04, le logo FME paraît en S02. Ta tâche est la plomberie ; **la nouvelle S03 n'est pas à toi** (un autre agent la compose ensuite avec la bibliothèque de composants).

1. **Renuméroter** : `src/lesson/scenes/s03.tsx` (l'entité géographique) devient `s04.tsx` : identifiant `S04`, clip `S04-01`, états `S04-…`, `testId` préfixés `s04-`. Les illustrations `s03-*.svg` gardent leur nom de fichier (pas de renommage d'illustration) ; mets à jour seulement le code et, dans `content/design/spec.md`, le titre de section et les états (`## S03` de l'entité devient `## S04`).
2. **Retirer l'exercice** : supprime l'ancien `s04.tsx` (la conduite d'eau) ; sa section de `content/design/spec.md` est retirée ; `content/design/assets/s04-conduite.svg` est supprimé (plus aucune scène ne l'emploie : vérifie-le par grep).
3. **Nouvelle S03 en attente** : `s03.tsx` exporte pour l'instant la scène en attente (`narratedPending("S03")` de `scenes/attente.tsx`), pour que la leçon se charge.
4. **`src/lesson/lesson.ts`** : les sept scènes dans l'ordre du storyboard (s01, s02, s03, s04, s05, s06, s07).
5. **S02** : la phrase de voix changée (« … sort la première version de son logiciel, FME, à l'origine Feature Manipulation Engine ») ; vérifie que les locutions tiennent ; ajoute le logo `fme-logo` (illustration `content/design/assets/fme-logo.svg`, couleurs d'origine, jamais recoloré) sous le jalon 1996, sur la locution « la première version de son logiciel », largeur 220 px environ, sans recouvrir le nom d'origine ni les routes ; ajoute-le à la section S02 de la spécification.
6. **S05 et S07** : le storyboard dit maintenant que leur mise en scène renvoie au bâtiment de S04 et plus à la conduite ; si leur code ou leur spécification nomme la conduite ou l'ancienne S04, mets-le à jour ; sinon rien.

Règles : textes du storyboard seulement (aucun texte littéral) ; instants sur des locutions ; contrôles sous verrou `flock /tmp/fme001-sync.lock npm run check` (code 0, « scènes chargées : 7 ») et `node /home/user/bimaccess-studio/plugins/studio/skills/scenes/scripts/check-literals.mjs src/lesson` (code 0). Ne touche pas à `src/engine/` (un autre agent y écrit la bibliothèque en même temps). Pas de build ni de navigateur. Aucune opération git.

## Rapport (court)

Fichiers renommés, supprimés, modifiés ; contrôles ; ce qui a changé dans S02.
