//export const time = 60 * 60 * 24 * 365 // 1 year
export const isProd = process.env.NEXT_PUBLIC_STAGING === "false"
export const isDev = process.env.NEXT_PUBLIC_STAGING === "true"
export const isLocal = process.env.NODE_ENV === "development"

export function getEndpoint(path: string) {
  //const url = isProd
  //  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + path
  //  : process.env.NEXT_PUBLIC_DEV_ENDPOINT + path

  // NOTE staging endpoint is missing some user data
  const url = process.env.NEXT_PUBLIC_PROD_ENDPOINT + path
  return url
}

export const url = getEndpoint("global")
export const globalDailyURL = getEndpoint("global/daily")
export const globalParcelURL = getEndpoint("global/parcels")
export const globalScenesURL = getEndpoint("global/scenes")
export const globalUsersURL = getEndpoint("global/users")
export const sceneURL = getEndpoint("scenes/top")
export const parcelURL = getEndpoint("parcels/all")
export const statusURL = getEndpoint("peer_status")
