/**
 * Libellés d'interface du lecteur et des composants d'exercice, en français
 * et en anglais. La langue vient de META.lang (studio.config.json « lang ») :
 * « en… » donne l'anglais, tout le reste le français. Seul module de libellés :
 * aucun libellé d'interface ailleurs dans le code.
 *
 * Ces libellés ne sont pas du contenu : le contenu (titres, textes à l'écran,
 * questions, conséquences) vient toujours du storyboard.
 *
 * Signature bimaccess : les en-têtes du panneau de rétroaction suivent
 * design-system/components/feedback-panel.html (« Réponse attendue »,
 * « À revoir » : jamais de rouge ni d'échec, le quiz n'est pas noté). La
 * coque et les boutons les affichent en MAJUSCULES (Azeret Mono) par le
 * style, pas dans le texte. Aucun tiret cadratin dans un libellé.
 */
import { META } from "./generated/meta"

const fr = {
  start: "Lancer",
  startHint: "La narration démarre avec le son.",
  resume: "Reprendre",
  previous: "Précédent",
  next: "Suivant",
  finish: "Terminer",
  play: "Lire la narration",
  pause: "Mettre la narration en pause",
  scrub: "Position dans la narration",
  captions: "Sous-titres",
  replay: "Revoir la scène depuis le début",
  rate: "Vitesse de lecture",
  locked: "Terminez la scène pour continuer",
  position: "Scène",
  submit: "Valider",
  continue: "Continuer",
  yourChoice: "Votre choix",
  consequence: "Ce qui se passe",
  expected: "Réponse attendue",
  verdictExpected: "C'est la réponse attendue",
  verdictOther: "Ce n'est pas la réponse attendue",
  endTitle: "Fin",
  endText: "Vous avez terminé ce contenu.",
  restart: "Recommencer",
  error: "Le contenu n'a pas pu se charger",
  rotateHint: "Tournez l'appareil à l'horizontale pour lire la scène en grand.",
  fullscreen: "Plein écran",
  exitFullscreen: "Quitter le plein écran",
} as const

export type Labels = { readonly [K in keyof typeof fr]: string }

const en: Labels = {
  start: "Start",
  startHint: "The narration plays with sound.",
  resume: "Resume",
  previous: "Previous",
  next: "Next",
  finish: "Finish",
  play: "Play narration",
  pause: "Pause narration",
  scrub: "Narration position",
  captions: "Captions",
  replay: "Replay the scene from the start",
  rate: "Playback speed",
  locked: "Finish this scene to continue",
  position: "Scene",
  submit: "Submit",
  continue: "Continue",
  yourChoice: "Your choice",
  consequence: "What happens",
  expected: "Expected answer",
  verdictExpected: "This is the expected answer",
  verdictOther: "This is not the expected answer",
  endTitle: "The end",
  endText: "You have completed this content.",
  restart: "Start over",
  error: "The content could not load",
  rotateHint: "Turn your device sideways to read the scene at a larger size.",
  fullscreen: "Full screen",
  exitFullscreen: "Exit full screen",
}

/** Libellés propres à la signature bimaccess (feedback-panel.html). */
const bimaccess: { readonly fr: Partial<Labels>; readonly en: Partial<Labels> } = {
  fr: { verdictExpected: "Réponse attendue", verdictOther: "À revoir" },
  en: { verdictExpected: "Expected answer", verdictOther: "To review" },
}

export const LANG: "fr" | "en" = String(META.lang).toLowerCase().startsWith("en") ? "en" : "fr"

const base: Labels = LANG === "en" ? en : fr

export const L: Labels = META.signature === "bimaccess" ? { ...base, ...bimaccess[LANG] } : base
