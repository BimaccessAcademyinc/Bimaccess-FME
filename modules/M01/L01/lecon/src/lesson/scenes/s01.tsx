/**
 * S01 · Trois lettres, trois mots : scène de départ du gabarit, mise en
 * accord avec le storyboard au minimum (ses sept textes d'écran affichés dès
 * la première image). La narration d'entrée (S01-01) est lue à
 * META.voiceStart par le lecteur. Le rôle code la remplace par la vraie
 * scène (skill studio:scenes) : lettres, nom d'origine, lignes de repère et
 * mise en évidence calés sur la voix.
 * État affiché (data-board) : S01-FIN.
 */
import { Bullets, defineScene, SceneRoot, sceneTexts, tid, Title, voice } from "../../engine"

const ID = "S01"
const TX = sceneTexts(ID, { screen: 7 })
const V = voice("S01-01")
const ITEMS = [1, 2, 3, 4, 5, 6].map((i) => ({ text: TX.screen(i), at: 0 }))

export const s01 = defineScene({
  id: ID,
  clip: V,
  View: () => (
    <SceneRoot id={ID} board="S01-FIN">
      <Title text={TX.screen(0)} at={0} style={{ position: "absolute", left: 104, top: 84, width: 1320 }} testId="s01-title" />
      <Bullets items={ITEMS} style={{ position: "absolute", left: 104, top: 260, width: 1320 }} testIdPrefix={tid(ID, "texte")} />
    </SceneRoot>
  ),
})
