import CryptoJS from "crypto-js"
import { format, intervalToDuration, parse } from "date-fns"
import { DataArrayType, DataObjectType } from "../types/IndexPage"

export const isServer = () => {
  return typeof window === "undefined"
}

export const isMobile = () => {
  if (isServer()) return false
  return window.innerWidth < 500
}

export const convertSeconds = (seconds: number) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 })
  const { days, hours, minutes, seconds: formattedSeconds } = duration
  const formattedDuration = [
    days > 0 ? `${days}d` : null,
    hours > 0 ? `${hours}h` : null,
    minutes > 0 ? `${minutes}m` : null,
    formattedSeconds > 0 ? `${formattedSeconds}s` : null,
  ]
    .filter(Boolean)
    .join(" ")

  return formattedDuration
}

export const formatTime = (seconds: number) => {
  const days = Math.floor(seconds / (60 * 60 * 24))
  seconds -= days * (60 * 60 * 24)
  const hours = Math.floor(seconds / (60 * 60))
  seconds -= hours * (60 * 60)
  const minutes = Math.floor(seconds / 60)
  seconds -= minutes * 60
  const result = `${days}d ${hours}h ${minutes}m ${seconds}s`
  return result
}

export const convertHours = (seconds) => {
  const duration = intervalToDuration({ start: 0, end: seconds * 1000 })
  const hours = duration.hours || 0
  return hours
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

export const parseUTC = (date) => {
  const parsedDate = parse(date, "yyyy-MM-dd HH:mm:ss 'UTC'", new Date())
  const outputDate = format(parsedDate, "yyyy MMM dd HH:mm")
  return outputDate
}

export const capitalize = (s: string) => {
  if (typeof s !== "string") return ""
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const getUniqueCategories = (array: string[]) => {
  const uniqueItems = []
  const seenItems = {}
  for (const item of array) {
    if (item !== null && item !== undefined && !seenItems[item]) {
      uniqueItems.push(item)
      seenItems[item] = true
    }
  }
  return uniqueItems
}

export const generateOppositeColor = (hex: string) => {
  hex = hex.replace("#", "")

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  const oppositeColor = luminance > 0.5 ? "#333333" : "#EEEEEE"

  return oppositeColor
}

export const eventStatus = (event) => {
  const today = new Date()
  const eventDate = new Date(event.start_at)
  if (eventDate < today) {
    return "past"
  } else if (eventDate > today) {
    return "upcoming"
  } else {
    return "current"
  }
}

export const mutateString = (inputString: string): string => {
  return inputString.replace("_", " ")
}

export const flattenObject = (
  temp: Record<string, DataObjectType>
): DataArrayType[] => {
  return Object.entries(temp).map(([date, value]) => ({
    date,
    active_parcels: value.active_parcels,
    active_scenes: value.active_scenes,
    guest_users: value.users.guest_users,
    named_users: value.users.named_users,
    new_users: value.users.new_users,
    unique_users: value.users.unique_users,
    degraded: value.degraded,
  }))
}
