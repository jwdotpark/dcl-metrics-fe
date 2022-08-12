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
    ip: geoInfo?.data.ip,
    city: geoInfo?.data.city.name,
    country: geoInfo?.data.country.name,
    iso_code: geoInfo?.data.country.iso_code,
    latitude: geoInfo?.data.location.latitude,
    longitude: geoInfo?.data.location.longitude,
    continent: geoInfo?.data.continent.name,
  }

  const url = "/api/fetch/telemetry"
  isDev && console.log("client telemetry body: ", telemetryBody)
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(telemetryBody),
  })
  await response.json()
}
