export const time = 60 * 60 * 24 * 365 // 1 year
export const isProd = process.env.NEXT_PUBLIC_STAGING === "false"
export const isDev = process.env.NEXT_PUBLIC_STAGING === "true"
export const isLocal = process.env.LOCAL === "true"

function getEndpoint(path) {
  return isProd
    ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + path
    : process.env.NEXT_PUBLIC_DEV_ENDPOINT + path
}

export const url = getEndpoint("global")
export const globalDaily = getEndpoint("global/daily")
export const globalParcel = getEndpoint("global/parcels")
export const globalScenes = getEndpoint("global/scenes")
export const globalUsers = getEndpoint("global/users")
export const parcels = getEndpoint("global/dailystats")
export const sceneURL = getEndpoint("scenes/top")
export const parcelURL = getEndpoint("parcels/all")
