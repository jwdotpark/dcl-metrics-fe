import staticGlobalDaily from "../../../public/data/staticGlobalDaily.json"
import staticGlobalParcels from "../../../public/data/staticGlobalParcel.json"
import staticGlobalScenes from "../../../public/data/staticGlobalScene.json"
import staticGlobalUsers from "../../../public/data/staticGlobalUsers.json"
import staticScene from "../../../public/data/cached_scenes_top.json"
import staticParcel from "../../../public/data/cached_parcel.json"
import {
  globalDailyURL,
  globalParcelURL,
  globalScenesURL,
  globalUsersURL,
  sceneURL,
  parcelURL,
} from "./constant"

export const globalRequestList = [
  {
    url: globalDailyURL,
    endpoint: "/global/daily",
    staticData: staticGlobalDaily,
  },
  {
    url: globalParcelURL,
    endpoint: "/global/parcels",
    staticData: staticGlobalParcels,
  },
  {
    url: globalScenesURL,
    endpoint: "/global/scenes",
    staticData: staticGlobalScenes,
  },
  {
    url: globalUsersURL,
    endpoint: "/global/users",
    staticData: staticGlobalUsers,
  },
  { url: sceneURL, endpoint: "/scenes/top", staticData: staticScene },
  { url: parcelURL, endpoint: "/parcels/all", staticData: staticParcel },
]

export const globalFileNameArr = [
  "staticGlobalDaily",
  "staticGlobalParcel",
  "staticGlobalScene",
  "staticGlobalUsers",
  "cached_scenes_top",
  "cached_parcel",
]

