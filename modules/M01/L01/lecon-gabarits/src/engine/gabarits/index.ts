/**
 * Gabarits de scène : un composant d'animation écrit une fois, piloté par un
 * fichier de données `content/design/scenes/Sxx.json` (format :
 * docs/gabarits.md). Une scène se réduit à :
 *
 *   import data from "../../../content/design/scenes/S02.json"
 *   export const s02 = defineScene(Frise.scene(data))
 *
 *   Frise           forme de S02 : ligne et pointe à l'image 0, jalons et
 *                   tracés, cases des années (deux couches, même vitesse),
 *                   éléments au-dessus et au-dessous de la ligne
 *   FicheRubriques  forme de S04 : feuille révélée bande par bande (une seule
 *                   découpe), rubriques, objet qui voyage d'une boîte à
 *                   l'autre, traits et filets
 *
 * Les données se contrôlent au chargement du module (npm run check, build) :
 * GabaritError, avec le fichier, le champ et quoi faire.
 */
import type { Voice } from "../types"
import { lire, type NomGabarit } from "./donnees"
import { planifier } from "./plan"
import { vueDe } from "./vue"

export { GabaritError } from "./donnees"
export { cssDe, poser, Source, sourceHref, Texte } from "./pieces"
export { VIDE_MAX, ZONE } from "./plan"

/** Ce que `defineScene` attend d'une scène narrée. */
export type SceneDeGabarit = { readonly id: string; readonly clip: Voice; readonly View: () => ReturnType<ReturnType<typeof vueDe>> }

function gabarit(nom: NomGabarit, data: unknown): SceneDeGabarit {
  const plan = planifier(lire(nom, data))
  return { id: plan.d.scene, clip: plan.V, View: vueDe(plan) }
}

/** Gabarit « frise » (forme de S02). */
export const Frise = { scene: (data: unknown): SceneDeGabarit => gabarit("frise", data) } as const

/** Gabarit « fiche à rubriques » (forme de S04). */
export const FicheRubriques = { scene: (data: unknown): SceneDeGabarit => gabarit("fiche-rubriques", data) } as const
