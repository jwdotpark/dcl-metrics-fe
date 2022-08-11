export const isDev = process.env.NODE_ENV === "development"
const isServer = typeof window === "undefined"

const userInfo = {
  pathName: !isServer && window.location.pathname,
  language: !isServer && navigator.language,
  platform: !isServer && navigator.platform,
  userAgent: !isServer && navigator.userAgent,
}

export const fetchFingerprint = async () => {
  isDev && console.log("fetching finger print")
  const response = await fetch("/api/fetch/geoinfo")
  const geoInfo = await response.json()
  if (response.ok) {
    sessionStorage.setItem("fingerPrint", JSON.stringify(geoInfo))
  } else if (!response.ok) {
    sessionStorage.removeItem("fingerPrint")
  }
}

export const postTelemetry = async (geoInfo) => {
  const telemetryBody = {
    endpoint: window.location.pathname,
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
