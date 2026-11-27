# Banc des illustrations, 2026-11-27

Modèle d'image : `gemini-2.5-flash-image` (Nano Banana), par le point d'accès compatible OpenAI (clé injectée par le proxy). Vision : `gemini-3.5-flash`.

| Essai | Durée | Résultat |
|---|---|---|
| Carte de rôle « DON MURRAY · DALE LUTZ » (`carte-role.png`) | 5,7 s | style de la charte tenu, texte court exact |
| Planche entière de S03 avec texte (`s03-gemini-2.5-flash-image.png`) | 6,1 s | composition juste ; texte faux : « tratements » deux fois, mention de source illisible |
| Planche de S03 sans texte (`s03-sanstexte.png`) | 5,0 s | composition propre, aucun texte |
| Repérage des éléments par la vision (`boxes.json`) | 11,7 s | 13 éléments, positions justes (cadres bleus de `pipeline-demo.png`) |
| Texte exact posé par le code sur les positions repérées (`pipeline-demo.png`) | instantané | texte du storyboard, sans faute |

Comparaison : le graphisme de L01 a pris environ 73 min d'agents (spécification, SVG à la main, charte, thèmes).

Conclusion : l'image dessine, la vision repère, le code pose le texte exact et révèle chaque zone sur ses mots. Une planche de scène coûte environ 20 s d'appels au lieu de 10 à 20 min d'agent.

Limites vues : les modèles d'image plus récents (`gemini-3-pro-image`, `gemini-3.1-flash-image`) génèrent mais ne sont pas renvoyés par le point d'accès compatible OpenAI ; ils demandent l'API native (en-tête `x-goog-api-key`), qui permet aussi de donner des images de référence pour tenir le même style d'une scène à l'autre.
