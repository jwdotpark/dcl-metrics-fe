import { resolve } from "path"

export const isDev = process.env.NODE_ENV === "development"
const isServer = typeof window === "undefined"

const userInfo = {
  pathName: !isServer && window.location.pathname,
  language: !isServer && navigator.language,
  platform: !isServer && navigator.platform,
  userAgent: !isServer && navigator.userAgent,
}

export const fetchFingerprint = async () => {
  const url = `https://api.geoapify.com/v1/ipinfo?&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
  // const url = "https://hutils.loxal.net/whois"
  const response = await fetch(url)
  const geoInfo = await response.json()
  if (response.ok) {
    sessionStorage.setItem("fingerPrint", JSON.stringify(geoInfo))
  } else if (!response.ok) {
    sessionStorage.removeItem("fingerPrint")
  }
}

export const postTelemetry = async (geoInfo) => {
  const telemetryBody = {
    endpoint: userInfo.pathName,
    language: userInfo.language,
    platform: userInfo.platform,
    userAgent: userInfo.userAgent,
    ip: geoInfo?.ip,
    city: geoInfo?.city.name,
    country: geoInfo?.country.name,
    iso_code: geoInfo?.country.iso_code,
    latitude: geoInfo?.location.latitude,
    longitude: geoInfo?.location.longitude,
    continent: geoInfo?.continent.name,
  }

  const url = "/api/fetch/telemetry"
  isDev && console.log("telemetry sent: ", telemetryBody)
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(telemetryBody),
  })
  const data = await response.json()
  isDev && console.log("telemetry response: ", data)
}
