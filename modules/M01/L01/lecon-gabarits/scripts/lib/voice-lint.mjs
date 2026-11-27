/**
 * voice-lint · pièges de synthèse vocale dans le texte d'un clip, avant de
 * dépenser des caractères : sigles, codes, nombres, symboles, ponctuation,
 * abréviations, longueur, consignes de mise en scène glissées dans la
 * narration, termes proscrits. Les passages couverts par le dictionnaire de
 * prononciation ne sont plus signalés (ils sont déjà résolus).
 *
 * Chaque trouvaille : { level: "error" | "warning", kind, excerpt, advice }.
 * Erreur = la génération serait refusée ou fausse ; avertissement = à relire.
 */
import { maskDictionary } from "./pronunciation.mjs"

/** Limite de caractères par requête, par modèle (constats ; `max_chars_per_clip` la remplace). */
export function modelCharLimit(modelId) {
  if (/flash|turbo/.test(modelId ?? "")) return 40000
  if (/multilingual_v2|monolingual/.test(modelId ?? "")) return 10000
  return 5000 // eleven_v3 et modèles inconnus : prudence
}

/** Consignes de mise en scène : la narration enseigne, elle ne décrit pas l'écran. */
export const STAGING_PATTERNS = [
  /\b(à|a|sur) l'écran\b/i,
  /\bs'affich(e|ent|era|eront)\b/i,
  /\bcomme (vous (le )?)?(voyez|pouvez (le )?voir)\b/i,
  /\bregardez (ce|cette|ces|le|la|les)\b/i,
  /\bci-(dessous|dessus|contre)\b/i,
  /\banimation\b/i,
  /\bsurbrillance\b/i,
  /\bse (ré)?organis/i,
  /\bdiapo(sitive)?s?\b/i,
  /\bon (the )?screen\b/i,
  /\bas you can see\b/i,
  /\blook at (this|the)\b/i,
  /\bhighlighted\b/i,
  /\bslides?\b/i,
  /\bS\d\d\b/,
  /\breste(nt)? visibles?\b/i,
  /\bplanches?\b/i,
  /\bappara(î|i)(t|ssent|tra|tront)\s+(à|a|sur)\s+l'écran\b/i,
  /\b(remains?|stays?) visible\b/i,
]

/**
 * Balisage qui serait dit tel quel (commentaire ou balise HTML, italique ou
 * lien Markdown) : la synchronisation ne retire que les accents graves et le
 * gras. Partagé avec scripts/lint-storyboard.mjs.
 */
export const MARKUP_PATTERNS = [
  [/<!--.*?(?:-->|$)|-->/, "commentaire HTML", "il serait dit et affiché en sous-titre : le retirer de la narration (une note va dans « ## Mise en scène »)"],
  [/<\/?[a-z][a-z0-9-]*(\s[^<>]*)?\/?>/i, "balise HTML", "elle serait dite et affichée en sous-titre : la retirer"],
  [/\[[^\]]+\]\([^)]+\)/, "lien Markdown", "il serait dit tel quel : écrire seulement le texte du lien"],
  [/(?<![\p{L}\p{N}*])\*(?![\s*])[^*\n]+(?<![\s*])\*(?![\p{L}\p{N}*])/u, "italique Markdown (*…*)", "les astérisques seraient dits : retirer l'italique"],
  [/(?<![\p{L}\p{N}_])_(?![\s_])[^_\n]+(?<![\s_])_(?![\p{L}\p{N}_])/u, "italique Markdown (_…_)", "les soulignés seraient dits : retirer l'italique"],
]

const SYMBOL_ADVICE = {
  "%": "« pour cent » / « percent »",
  "‰": "« pour mille »",
  "°": "« degrés » / « degrees »",
  "€": "« euros »",
  $: "« dollars »",
  "£": "« livres »",
  "&": "« et » / « and »",
  "@": "« arobase » / « at »",
  "#": "« numéro » / « dièse »",
  "/": "« sur », « par » ou « ou »",
  "\\": "le mot voulu",
  "+": "« plus »",
  "=": "« égale »",
  "<": "« inférieur à »",
  ">": "« supérieur à »",
  "×": "« fois »",
  "÷": "« divisé par »",
  "±": "« plus ou moins »",
  "~": "« environ »",
  "*": "rien (balisage ?)",
  _: "rien (balisage ?)",
  "|": "une virgule",
  "^": "« puissance »",
  "→": "« donne » ou « vers »",
  "←": "« vient de »",
  "⇒": "« donc »",
  "↔": "« et inversement »",
  "•": "une virgule",
  "§": "« paragraphe »",
  "−": "« moins »",
  "²": "« carré »",
  "³": "« cube »",
}

const SENTENCE_SPLIT = /(?<=[.!?…])\s+/
const words = (s) => s.split(/\s+/).filter((w) => /[\p{L}\p{N}]/u.test(w))
const shorten = (s, n = 90) => (s.length > n ? `${s.slice(0, n - 1)}…` : s)

/** Contexte autour d'une trouvaille (la phrase qui la contient, raccourcie). */
function around(text, index, length) {
  const from = Math.max(0, text.lastIndexOf(" ", Math.max(0, index - 30)))
  const to = text.indexOf(" ", Math.min(text.length, index + length + 30))
  return shorten(text.slice(from, to < 0 ? text.length : to).trim(), 80)
}

/**
 * Pièges d'un clip. `clip` = { id, text } ; `tts` = texte envoyé (dictionnaire appliqué).
 * `opts` = { rules, maxChars, forbidden: { terme: remplaçant }, staging: RegExp[] }.
 */
export function lintClipText(clip, tts, opts) {
  const found = []
  const add = (level, kind, excerpt, advice) => found.push({ clip: clip.id, level, kind, excerpt, advice })
  const masked = maskDictionary(clip.text, opts.rules ?? [])
  const once = new Set()
  const addOnce = (level, kind, key, excerpt, advice) => {
    if (once.has(`${kind}|${key}`)) return
    once.add(`${kind}|${key}`)
    add(level, kind, excerpt, advice)
  }

  // Longueur
  if (tts.length > opts.maxChars) add("error", "longueur", `${tts.length} caractères`, `au-delà de la limite d'une requête (${opts.maxChars}) : couper la section de narration en deux`)
  else if (tts.length > 2500) add("warning", "longueur", `${tts.length} caractères`, "clip long : une reprise coûte cher et la voix dérive ; préférer des scènes plus courtes")
  for (const s of clip.text.split(SENTENCE_SPLIT)) {
    const n = words(s).length
    if (n > 40) add("warning", "phrase longue", shorten(s), `${n} mots : la voix perd l'intonation ; couper la phrase`)
  }

  // Sigles et codes
  for (const m of masked.matchAll(/(?<![\p{L}\p{N}])\p{Lu}{2,}[\p{Lu}\p{N}]*(?![\p{L}\p{N}])/gu)) {
    addOnce("warning", "sigle", m[0], `« ${m[0]} »`, `épelé ou lu comme un mot ? ajouter une règle au dictionnaire (ex. « ${[...m[0]].join(". ")}. » pour épeler)`)
  }
  for (const m of masked.matchAll(/(?<![\p{L}\p{N}])(?=[\p{L}\p{N}-]*\p{L})(?=[\p{L}\p{N}-]*\p{N})[\p{L}\p{N}]+(?:-[\p{L}\p{N}]+)*(?![\p{L}\p{N}])/gu)) {
    const t = m[0]
    if (/^\d+(er|re|e|ème|eme|nd|nde|st|rd|th)$/i.test(t)) addOnce("warning", "ordinal", t, `« ${t} »`, "écrire en lettres (« premier », « deuxième »)")
    else if (/^\d{1,2}h\d{0,2}$/i.test(t)) addOnce("warning", "heure", t, `« ${t} »`, "écrire « quatorze heures trente »")
    else addOnce("warning", "code", t, `« ${t} »`, "lettres et chiffres mêlés : écrire comme on veut l'entendre, ou une règle au dictionnaire (ex. « P zéro un »)")
  }

  // Nombres
  const numberChecks = [
    [/(?<![\p{L}\p{N},.])\d{1,3}(?:[  .]\d{3})+(?![\p{N}])/gu, "nombre groupé", "séparateur de milliers lu de façon variable : écrire en lettres"],
    [/(?<![\p{L}\p{N}])\d{4,}(?![\p{N}])/gu, "grand nombre", "année (« dix-neuf cent ») ou quantité (« mille neuf cents ») ? écrire en lettres"],
    [/\d+[.,]\d+/g, "nombre décimal", "virgule ou point lus selon la langue de la voix : écrire en lettres (« trois virgule cinq »)"],
    [/(?:^|[\s(])[-−+]\s?\d/g, "nombre signé", "signe lu ou avalé : écrire « moins dix »"],
    [/\d+\s?\/\s?\d+/g, "fraction", "écrire « un demi », « trois sur quatre »"],
    [/\d+\s?[-–]\s?\d+/g, "intervalle", "écrire « de trois à cinq »"],
    [/(?<![\p{N}])\d{1,2}:\d{2}(?![\p{N}])/gu, "heure", "écrire « quatorze heures trente »"],
  ]
  for (const [re, kind, advice] of numberChecks) {
    for (const m of masked.matchAll(re)) addOnce("warning", kind, m[0].trim(), `« ${around(masked, m.index, m[0].length)} »`, advice)
  }

  // Balisage qui serait dit : erreur, et retiré avant le contrôle des symboles (conseil « < » → « inférieur à » trompeur)
  let plain = masked
  for (const [re, kind, advice] of MARKUP_PATTERNS) {
    const all = new RegExp(re.source, re.flags.includes("g") ? re.flags : `${re.flags}g`)
    for (const m of masked.matchAll(all)) addOnce("error", "balisage", `${kind}|${m[0]}`, `${kind} « ${shorten(m[0], 40)} »`, advice)
    plain = plain.replace(all, (x) => " ".repeat(x.length))
  }

  // Symboles
  for (const m of plain.matchAll(/[%‰°€$£&@#/\\+=<>×÷±~*_|^→←⇒↔•§−²³]/gu)) {
    addOnce("warning", "symbole", m[0], `« ${m[0]} » dans « ${around(masked, m.index, 1)} »`, `écrire ${SYMBOL_ADVICE[m[0]] ?? "le mot voulu"}`)
  }

  // Ponctuation
  const punct = [
    [/—/g, "tiret cadratin", "pause imprévisible : virgule, deux-points ou point"],
    [/\s[-–]\s/g, "tiret entre espaces", "pause imprévisible : virgule ou deux-points"],
    [/…|\.\.\./g, "points de suspension", "hésitation ou pause de durée variable : un point suffit le plus souvent"],
    [/[!?]{2,}|\?!|!\?/g, "ponctuation répétée", "intonation exagérée : un seul signe"],
    [/[()]/g, "parenthèse", "la voix ne marque pas la parenthèse : reformuler avec des virgules"],
    [/[[\]]/g, "crochets", "certains modèles lisent [ … ] comme une directive de jeu : réserver aux balises voulues, dans le dictionnaire"],
    [/(?<![\p{L}])(etc|ex|cf|env|approx|vs|nb|Mme|Mlle|Dr|St|e\.g|i\.e|p\. ?ex)\.|n°/giu, "abréviation", "écrire le mot entier (« et cetera », « par exemple »)"],
    [/https?:\/\/\S+|www\.\S+|\S+@\S+\.\w+/g, "adresse", "une adresse se lit mal : la mettre à l'écran, la décrire dans la voix"],
  ]
  for (const [re, kind, advice] of punct) {
    for (const m of masked.matchAll(re)) addOnce("warning", kind, m[0], `« ${around(masked, m.index, m[0].length)} »`, advice)
  }
  for (const p of clip.text.split(/\n\s*\n/)) {
    const last = p.trim().slice(-1)
    if (last && !/[.!?…:»"”)]/.test(last)) add("warning", "fin de phrase", `« …${p.trim().slice(-40)} »`, "paragraphe sans ponctuation finale : intonation suspendue")
  }

  // Mise en scène et termes proscrits (sur le texte écrit)
  for (const s of clip.text.split(SENTENCE_SPLIT)) {
    if ((opts.staging ?? STAGING_PATTERNS).some((re) => re.test(s))) add("warning", "mise en scène ?", shorten(s), "la narration décrit l'écran : à signaler au scénariste (retirer si c'est une consigne visuelle évidente)")
    for (const [term, repl] of Object.entries(opts.forbidden ?? {})) {
      if (new RegExp(`(?<![\\p{L}\\p{N}])${term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`, "iu").test(s)) add("error", "terme proscrit", shorten(s), `« ${term} » : dire « ${repl} » (décision de la configuration voix)`)
    }
  }
  return found
}
