/**
 * Pièces communes aux composants de scène des signatures (components.tsx,
 * bimaccess.tsx, carte.tsx) : horloge de scène, zone d'action, préfixe des data-testid,
 * découpage des sous-titres en phrases.
 */
import { createContext } from "react"
import type { Word } from "./types"

/**
 * Horloge de la scène fournie par le lecteur (composition) : fin de la
 * narration d'entrée, en secondes de scène. ChoicePanel n'affiche jamais
 * CONTINUER avant elle (Suivant reste verrouillé jusque-là). Hors lecteur : 0.
 */
export const SceneClock = createContext<{ readonly narrationEnd: number }>({ narrationEnd: 0 })

/**
 * Zone d'action de la scène (signatures bimaccess et carte) : élément placé
 * par SceneRoot en bas à droite de la composition, où ChoicePanel
 * rend VALIDER et CONTINUER. null hors SceneRoot : les boutons restent alors
 * sous le panneau.
 */
export const ActionZone = createContext<HTMLElement | null>(null)

/** Préfixe des data-testid d'une scène : « S03 » → « s03 ». */
export const tid = (sceneId: string, name: string): string => `${sceneId.toLowerCase()}-${name}`

export type Sentence = { readonly words: readonly Word[]; readonly start: number; readonly end: number }

/** Phrases d'une suite de mots datés (fin de phrase, ou virgule après 18 mots). */
export function sentencesOf(words: readonly Word[]): Sentence[] {
  const out: Sentence[] = []
  let cur: Word[] = []
  const push = () => {
    const first = cur[0]
    const last = cur[cur.length - 1]
    if (first && last) out.push({ words: cur, start: first.start, end: last.end })
    cur = []
  }
  for (const w of words) {
    cur.push(w)
    if (/[.?!…]["»”)]?$/.test(w.text) || (cur.length > 18 && /[,;:]$/.test(w.text))) push()
  }
  push()
  return out
}

/** Phrase des sous-titres à l'instant t (effacée peu après sa fin : l'image finale reste la composition). */
export function currentSentence(sentences: readonly Sentence[], t: number): Sentence | undefined {
  return sentences.find((s, i) => {
    const next = sentences[i + 1]
    return t >= s.start - 0.05 && t < (next ? Math.min(next.start - 0.05, s.end + 1.2) : s.end + 0.5)
  })
}
