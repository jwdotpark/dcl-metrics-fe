export const time = 60 * 60 * 24 * 365 // 1 year
export const isProd = process.env.NEXT_PUBLIC_STAGING === "false"
export const isDev = process.env.NEXT_PUBLIC_STAGING === "true"
export const isLocal = process.env.LOCAL === "true"

export const url = isProd
  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "global"
  : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "global"

export const sceneURL = isProd
  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "scenes/top"
  : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "scenes/top"

export const parcelURL = isProd
  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "parcels/all"
  : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "parcels/all"
