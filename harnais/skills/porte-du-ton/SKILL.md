---
name: porte-du-ton
description: "Faire juger le ton d'une leçon par l'expert avant tout dessin : l'ouverture de la leçon (titre et narration de S01, et S02 si le récit s'y poursuit) lui est montrée en entier, avec au plus deux questions."
when_to_use: "Juste après le premier storyboard relu d'une leçon, avant la spécification visuelle, les planches et le code ; pour chaque nouvelle leçon dont le registre n'a pas encore été validé dans le cours."
---

# Porte du ton

## Pourquoi

Pilote FME001, 2026-11-26 : deux scénaristes et trois relecteurs neufs ont validé un storyboard que l'expert a refusé en une phrase (« ça fait livre pour bébé »). La grille des relecteurs ne nommait pas ce défaut ; la charte, la coque du lecteur et une spécification de scènes étaient déjà en route, et la spécification a été perdue. Le ton se juge en deux minutes sur un texte : c'est l'étape la moins chère pour éviter la plus coûteuse des reprises.

## Quand

- Après le premier storyboard relu d'une leçon, **avant** la spécification visuelle, les planches, le code et la voix.
- Une fois par cours pour fixer le registre ; ensuite, pour une leçon qui change de forme (ouverture en récit, autre public), ou à la demande de l'expert.

## Comment

1. L'orchestrateur montre à l'expert, dans la conversation, l'ouverture **en entier** : titre affiché et narration de S01 (et de S02 si le récit s'y poursuit), en citation, sans résumé.
2. Au plus deux questions, l'option recommandée en premier : le ton (« oui » / « oui, mais plus … » / « non, à reprendre »), et ce que l'ouverture engage (titre de la leçon, fil).
3. En parallèle, les relecteurs lisent le storyboard entier avec la grille, ajouts du cours compris (`harnais/grille-ilyas-pilote.md`) ; la porte n'attend pas leur retour.
4. La réponse de l'expert et les relectures partent dans **une seule passe** de correction ; l'expert revoit l'ouverture corrigée seulement s'il a répondu « non ».
5. Chaque remarque de ton devient une ligne de la grille du cours, avec ses mots et sa date ; un défaut qu'un script peut voir devient une interdiction du contrôle du storyboard (`lint:story --forbid`).
