import staticGlobalDaily from "../../../public/data/staticGlobalDaily.json"
import staticParcel from "../../../public/data/cached_parcel.json"
import staticLandSales from "../../../public/data/staticLandSales.json"
import staticTopLand from "../../../public/data/staticTopLand.json"
import staticTopPick from "../../../public/data/staticTopPick.json"
import { globalDailyURL, parcelURL } from "./constant"

export const globalRequestList = [
  {
    url: globalDailyURL,
    endpoint: "/global/daily",
    staticData: staticGlobalDaily,
  },
  //{
  //  url: globalParcelURL,
  //  endpoint: "/global/parcels",
  //  staticData: staticGlobalParcels,
  //},
  //{
  //  url: globalScenesURL,
  //  endpoint: "/global/scenes",
  //  staticData: staticGlobalScenes,
  //},
  //{
  //  url: globalUsersURL,
  //  endpoint: "/global/users",
  //  staticData: staticGlobalUsers,
  //},
  //{ url: sceneURL, endpoint: "/scenes/top", staticData: staticScene },
  { url: parcelURL, endpoint: "/parcels/all", staticData: staticParcel },
  {
    url: "https://www.dcl-property.rentals/api/price_data",
    endpoint: "/dcl-property.rentals",
    staticData: staticLandSales,
  },
  {
    url: "https://services.itrmachines.com/val-analytics/topSellingLands?metaverse=decentraland",
    endpint:
      "https://services.itrmachines.com/val-analytics/topSellingLands?metaverse=decentraland",
    staticData: staticTopLand,
  },
  {
    url: "https://services.itrmachines.com/val-analytics/topPicks?metaverse=decentraland",
    endpoint:
      "https://services.itrmachines.com/val-analytics/topPicks?metaverse=decentraland",
    staticData: staticTopPick,
  },
]

export const globalFileNameArr = [
  "staticGlobalDaily",
  //"staticGlobalParcel",
  //"staticGlobalScene",
  //"staticGlobalUsers",
  //"cached_scenes_top",
  "cached_parcel",
  "staticLandSales",
  "staticTopLand",
]
