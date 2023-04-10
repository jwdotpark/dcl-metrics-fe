import CryptoJS from "crypto-js"

export const isServer = () => {
  return typeof window === "undefined"
}

export const convertSeconds = (seconds: number) => {
  const hrs = `${Math.floor(seconds / 3600)}`.slice(-3)
  const min =
    Math.floor((seconds % 3600) / 60) < 10
      ? `0${Math.floor((seconds % 3600) / 60)}`
      : Math.floor((seconds % 3600) / 60)
  const sec = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60
  return `${hrs}h ${min}m ${sec}s`
}

export const SceneColor = [
  "rgba(80, 150, 123)",
  "rgba(255, 121, 198)",
  "rgba(255, 85, 85)",
  "rgba(78, 114, 264)",
  "rgba(255, 184, 108)",
  "rgba(255, 121, 198)",
  "rgba(189, 147, 249)",
  "rgba(255, 85, 85)",
  "rgba(241, 150, 140)",
  "rgba(255, 121, 198)",
]

const passPhrase = "okgu"

export const encrypt = (text) => {
  return CryptoJS.AES.encrypt(text, passPhrase).toString()
}

export const decrypt = (ciphertext) => {
  if (ciphertext) {
    ciphertext = ciphertext.replace(/ /g, "+")
    const bytes = CryptoJS.AES.decrypt(ciphertext, passPhrase)
    const originalText = bytes.toString(CryptoJS.enc.Utf8)
    return originalText
  }
}

export const heatmapColor = (value) => {
  let h
  if (value < 25) {
    h = (1.0 - value / 25) * 240
  } else if (value < 50) {
    h = (1.0 - (value - 25) / 25) * 120 + 240
  } else if (value < 75) {
    h = (1.0 - (value - 50) / 25) * 60 + 360
  } else {
    h = (1.0 - value / 100) * 240
  }
  return "hsl(" + h + ", 100%, 50%)"
}

export const mutateStringToURL = (string: string) => {
  string = string.toLowerCase()
  string = string.replace(/[^a-z0-9]+/g, "-")
  string = string.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  string = string.replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue")
  string = encodeURIComponent(string)
  if (string.slice(-1) === "-") {
    string = string.slice(0, -1)
  }
  return string
}

export const strToCoord = (val: string) => {
  const coord = {
    x: Number(val.split(",")[0]),
    y: Number(val.split(",")[1]),
  }
  return coord
}
