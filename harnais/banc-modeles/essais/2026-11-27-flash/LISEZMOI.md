# Banc des modèles d'image pour les éléments seuls, 2026-11-27

Même commande d'élément (invite, signature d'image du programme, image de référence), trois éléments de l'essai 1 : `s02-ill-fondateurs`, `s02-ill-sceau`, `s04-ill-batiment`. Script : `flash.py <modèle> <noms…>`. Planche côte à côte : `comparaison.png` (les dessins du Pro sont ceux de `modules/M01/L01/lecon-essai/content/design/illustrations/`).

| Modèle | Prix par image 1K (page de prix, lue par résumé, à revérifier) | Temps mesuré | Tokens de sortie mesurés | Qualité vue |
|---|---|---|---|---|
| gemini-3-pro-image | 0,134 $ | environ 15 s | environ 1 170 | référence |
| gemini-3.1-flash-image | 0,067 $ | 9,7 à 10,6 s | 1 402 à 1 456 | presque égale au Pro, élément qui remplit le cadre |
| gemini-3.1-flash-lite-image | 0,034 $ | 5,2 à 6,4 s | 1 415 à 1 537 | juste, plus petit dans le cadre, moins de détails |
| gemini-2.5-flash-image | 0,039 $ | 11,4 à 13,0 s | 1 290 | élément petit au centre (se pixeliserait agrandi), traits fins ; arrêt du service en mars 2027 |

Recommandation, à trancher par Ilyas : Flash 3.1 pour les éléments, Pro pour un dessin complexe. Coût du banc : 9 images, environ 0,42 $.
