/**
 * S01 · scène de départ du gabarit : le titre se tape dès la première image,
 * la narration d'entrée (S01-01) est lue à META.voiceStart par le lecteur.
 * Le rôle code la remplace par la vraie scène (skill studio:scenes).
 * État affiché (data-board) : S01-FIN.
 */
import { defineScene, SceneRoot, sceneTexts, Title, voice } from "../../engine"

const ID = "S01"
const TX = sceneTexts(ID, { screen: 1 })
const V = voice("S01-01")

export const s01 = defineScene({
  id: ID,
  clip: V,
  View: () => (
    <SceneRoot id={ID} board="S01-FIN">
      <Title text={TX.screen(0)} at={0} style={{ position: "absolute", left: 120, top: 120, width: 1680 }} testId="s01-title" />
    </SceneRoot>
  ),
})
