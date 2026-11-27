/**
 * mp3 · durée d'un fichier MP3 sans outil externe (ni ffprobe ni dépendance) :
 * lecture des en-têtes de trames MPEG (couches I, II, III ; MPEG 1, 2, 2.5),
 * étiquette ID3v2 sautée, en-tête Xing / Info utilisé quand il donne le nombre
 * de trames. Sert aussi à fabriquer un MP3 muet valide pour les essais.
 */

const BITRATES = {
  // [version MPEG1 | MPEG2/2.5][couche] → kbit/s par indice
  "1-1": [0, 32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448],
  "1-2": [0, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384],
  "1-3": [0, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
  "2-1": [0, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256],
  "2-2": [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
  "2-3": [0, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160],
}
const RATES = { 3: [44100, 48000, 32000], 2: [22050, 24000, 16000], 0: [11025, 12000, 8000] }

/** En-tête de trame à la position i, ou null. */
function frameAt(buf, i) {
  if (i + 4 > buf.length || buf[i] !== 0xff || (buf[i + 1] & 0xe0) !== 0xe0) return null
  const ver = (buf[i + 1] >> 3) & 3 // 3 = MPEG1, 2 = MPEG2, 0 = MPEG2.5, 1 réservé
  const layerBits = (buf[i + 1] >> 1) & 3 // 3 = couche I, 2 = II, 1 = III
  const brIdx = buf[i + 2] >> 4
  const srIdx = (buf[i + 2] >> 2) & 3
  const pad = (buf[i + 2] >> 1) & 1
  if (ver === 1 || layerBits === 0 || brIdx === 0 || brIdx === 15 || srIdx === 3) return null
  const layer = 4 - layerBits
  const v1 = ver === 3
  const kbps = BITRATES[`${v1 ? 1 : 2}-${layer}`][brIdx]
  const rate = RATES[ver][srIdx]
  const samples = layer === 1 ? 384 : layer === 2 || v1 ? 1152 : 576
  const length = layer === 1 ? (Math.floor((12 * kbps * 1000) / rate) + pad) * 4 : Math.floor(((samples / 8) * kbps * 1000) / rate) + pad
  const mono = (buf[i + 3] >> 6) === 3
  return { ver, layer, rate, samples, length, mono, v1 }
}

/** Durée en secondes d'un MP3 (0 si aucune trame valide). */
export function mp3Duration(buf) {
  let i = 0
  if (buf.length >= 10 && buf.toString("latin1", 0, 3) === "ID3") {
    const size = ((buf[6] & 0x7f) << 21) | ((buf[7] & 0x7f) << 14) | ((buf[8] & 0x7f) << 7) | (buf[9] & 0x7f)
    i = 10 + size + (buf[5] & 0x10 ? 10 : 0)
  }
  let samples = 0
  let rate = 0
  let first = true
  while (i + 4 <= buf.length) {
    const f = frameAt(buf, i)
    if (!f || f.length < 4) {
      i += 1
      continue
    }
    if (first) {
      first = false
      // En-tête Xing / Info (première trame) : nombre total de trames
      const side = f.v1 ? (f.mono ? 17 : 32) : f.mono ? 9 : 17
      const tag = buf.toString("latin1", i + 4 + side, i + 8 + side)
      if ((tag === "Xing" || tag === "Info") && buf[i + 11 + side] & 1) {
        const frames = buf.readUInt32BE(i + 12 + side)
        if (frames > 0) return frames * f.samples / f.rate
      }
    }
    samples += f.samples
    rate = f.rate
    i += f.length
  }
  return rate ? samples / rate : 0
}

/** MP3 muet valide (MPEG1 couche III, 128 kbit/s, 44,1 kHz, mono) d'au moins `seconds` secondes. */
export function silentMp3(seconds) {
  const frameSeconds = 1152 / 44100
  const count = Math.max(1, Math.ceil(seconds / frameSeconds))
  const frameLength = Math.floor((144 * 128000) / 44100) // 417 octets, sans remplissage
  const frame = Buffer.alloc(frameLength)
  frame[0] = 0xff
  frame[1] = 0xfb // MPEG1, couche III, sans CRC
  frame[2] = 0x90 // 128 kbit/s, 44,1 kHz, sans remplissage
  frame[3] = 0xc0 // mono
  return Buffer.concat(Array.from({ length: count }, () => frame))
}
