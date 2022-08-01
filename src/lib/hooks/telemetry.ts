export const isDev = process.env.NODE_ENV === "development"
const isServer = typeof window === "undefined"

const fingerPrintSessionStorage =
  !isServer && sessionStorage.getItem("fingerPrint")
const fingerPrintSession = JSON.parse(fingerPrintSessionStorage)

const userInfo = {
  pathName: !isServer && window.location.pathname,
  language: !isServer && navigator.language,
  platform: !isServer && navigator.platform,
  userAgent: !isServer && navigator.userAgent,
}

export const fetchFingerprint = async () => {
  const url = "https://hutils.loxal.net/whois"
  const response = await fetch(url)
  const data = await response.json()
  !isServer && sessionStorage.setItem("fingerPrint", JSON.stringify(data))
}

export const postTelemetry = async (ipAddr, geoInfo) => {
  const telemetryBody = {
    endpoint: userInfo.pathName,
    language: userInfo.language,
    platform: userInfo.platform,
    userAgent: userInfo.userAgent,
    ip: fingerPrintSession?.ip,
    city: fingerPrintSession?.city,
    country: fingerPrintSession?.country,
    timeZone: fingerPrintSession?.timeZone,
    fingerprint: fingerPrintSession?.fingerprint,
    tor: fingerPrintSession?.tor,
    latitude: fingerPrintSession?.latitude,
    longitude: fingerPrintSession?.longitude,
  }

  // console.log("asdf: ", geoInfo)
  const url = "/api/fetch/telemetry"
  telemetryBody.ip = ipAddr
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
