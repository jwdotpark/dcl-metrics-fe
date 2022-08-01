export const isDev = process.env.NODE_ENV === "development"
const isServer = typeof window === "undefined"

const userInfo = {
  pathName: !isServer && window.location.pathname,
  language: !isServer && navigator.language,
  platform: !isServer && navigator.platform,
  userAgent: !isServer && navigator.userAgent,
}

export const fetchFingerprint = async () => {
  const url = "https://hutils.loxal.net/whois"
  const response = await fetch(url)
  const geoInfo = await response.json()
  sessionStorage.setItem("fingerPrint", JSON.stringify(geoInfo))
}

export const postTelemetry = async (geoInfo) => {
  const telemetryBody = {
    endpoint: userInfo.pathName,
    language: userInfo.language,
    platform: userInfo.platform,
    userAgent: userInfo.userAgent,
    ip: geoInfo.ip,
    city: geoInfo.city,
    country: geoInfo.country,
    timeZone: geoInfo.timeZone,
    fingerprint: geoInfo.fingerprint,
    tor: geoInfo.tor,
    latitude: geoInfo.latitude,
    longitude: geoInfo.longitude,
  }

  const url = "/api/fetch/telemetry"
  isDev && console.log("telemetry body: ", telemetryBody)
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
