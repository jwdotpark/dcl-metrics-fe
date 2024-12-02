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
export const worldURL = getEndpoint("worlds/current")
export const worldGlobalURL = getEndpoint("worlds/global")

export const COLOR_BY_TYPE: Record<number | string, string> = {
  0: "#ff9990", // my parcels
  1: "#ff4053", // my parcels on sale
  2: "#ff9990", // my estates
  3: "#ff4053", // my estates on sale
  4: "#ffbd33", // parcels/estates where I have permissions
  district: "#5054D4", // districts
  6: "#563db8", // contributions
  road: "#716C7A", // roads
  plaza: "#70AC76", // plazas
  owned: "#3D3A46", // owned parcel/estate
  10: "#3D3A46", // parcels on sale (we show them as owned parcels)
  unowned: "#09080A", // unowned pacel/estate
  12: "#18141a", // background
  13: "#110e13", // loading odd
  14: "#0d0b0e", // loading even
  // new properties
  total_avg_time_spent: "#8be9fd",
  total_avg_time_spent_afk: "#50fa7b",
  total_logins: "#ffb86c",
  total_logouts: "#ff79c6",
  total_visitors: "#bd93f9",
  deploy_count: "#ff5555",
  selected_scene: "#FF9990",
}

export const heatmapProperties = [
  { name: "max_concurrent_users" },
  { name: "visitor_intensity" },
  { name: "avg_time_spent_intensity" },
  { name: "avg_time_spent_afk_intensity" },
  { name: "login_intensity" },
  { name: "logout_intensity" },
]

export const tagColor = {
  gaming: "green",
  competition: "red",
  education: "yellow",
  art: "pink",
  music: "orange",
  social: "blue",
  live: "red",
  giveaway: "teal",
  talks: "yellow",
  party: "cyan",
  health: "yellow",
  town: "blue",
  tv: "yellow",
  other: "blue",
}

export const chartMargin = {
  top: 0,
  right: 0,
  left: -30,
  bottom: 0,
}

export const indexChartMargin = {
  top: 0,
  right: 20,
  left: 0,
  bottom: 10,
}

export const chartHeight = 250
