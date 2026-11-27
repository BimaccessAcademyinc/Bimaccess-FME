/**
 * Outils de dessin de Remotion, entrée unique du moteur (règle de la chaîne :
 * une leçon les importe par `../../engine`, jamais par le nom du paquet).
 * Paquets à la même version exacte que `remotion` (4.0.533).
 *
 *   paths            tracer un chemin à vitesse constante (evolvePath, getLength),
 *                    poser ou faire voyager un objet sur une courbe
 *                    (getPointAtLength, getTangentAtLength), transformer une forme
 *   shapes           formes exactes (makeArrow, makeRect, makeCircle…), en chemin `d`
 *   layout-utils     mesurer un texte avant de le placer (measureText, fitText…),
 *                    dans le navigateur, polices chargées
 *   animation-utils  composer une transformation sans erreur d'ordre (makeTransform)
 *
 * La grammaire du projet passe avant leurs exemples : jamais de fondu, de
 * ressort ni de rebond ; avancement linéaire, à vitesse constante.
 */
export {
  cutPath,
  evolvePath,
  getBoundingBox,
  getLength,
  getPointAtLength,
  getSubpaths,
  getTangentAtLength,
  interpolatePath,
  interpolatePaths,
  reversePath,
  scalePath,
  translatePath,
} from "@remotion/paths"
export { makeArrow, makeCircle, makeEllipse, makePolygon, makeRect, makeTriangle } from "@remotion/shapes"
export { fillTextBox, fitText, fitTextOnNLines, measureText } from "@remotion/layout-utils"
export { makeTransform, rotate, scale, translate } from "@remotion/animation-utils"
