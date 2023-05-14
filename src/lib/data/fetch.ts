import axios from "axios"
import fs from "fs"
import { sendNotification } from "../hooks/sendNotification"
import { isDev, isLocal, isProd } from "./constant"
import { globalFileNameArr, globalRequestList } from "./fetchList"

import staticGlobalDaily from "../../../public/data/staticGlobalDaily.json"
import staticParcel from "../../../public/data/cached_parcel.json"
import staticLandSales from "../../../public/data/staticLandSales.json"
import staticTopLand from "../../../public/data/staticTopLand.json"
import staticTopPick from "../../../public/data/staticTopPick.json"
import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import moment from "moment"
import { getPosts } from "../../../markdown/helpers/post"

export const axiosOptions = {
  method: "get",
  proxy: {
    protocol: "http",
    host: process.env.FIXIE_HOST,
    port: 80,
    auth: {
      username: "fixie",
      password: process.env.FIXIE_TOKEN,
    },
  },
}

export const writeFile = (name, response) => {
  const path = "./public/data/"
  const file = `${name}.json`
  fs.writeFileSync(path + file, JSON.stringify(response))
}

export const getDataWithProxy = async (targetURL, endpoint, staticFile) => {
  try {
    const res = await axios.get(targetURL, axiosOptions)
    const data = res.data
    return data
  } catch (error) {
    console.log("error", error.response.status, error.response.statusText)
    if (isProd) {
      sendNotification(error.response.statusText, `${endpoint}`, "error")
    }
    return staticFile
  }
}

export const getData = async (targetUrl, endpoint, staticFile) => {
  const response = await fetch(targetUrl)
  const result = await response.json()
  if (response.status >= 200) {
    if (isProd) {
      sendNotification(response.status, `${endpoint}`, "error")
    }
    return staticFile
  }
  return result
}

export const getDataWithApiKey = async (targetUrl, endpoint, staticFile) => {
  const response = await fetch(targetUrl, {
    headers: {
      API_KEY: process.env.BE_API_KEY,
    },
  })
  const result = await response.json()
  if (response.status >= 300) {
    if (isProd) {
      sendNotification(response.status, `${endpoint}`, "error")
    }
    return staticFile
  }
  return result
}

export async function fetchGlobalData() {
  let globalDailyRes, parcelRes, landSalesRes, topLandRes, topPickRes

  if (isProd) {
    ;[globalDailyRes, parcelRes] = await Promise.all(
      globalRequestList.map(({ url, endpoint, staticData }) =>
        getDataWithProxy(url, endpoint, staticData)
      )
    )
    landSalesRes = await getDataWithProxy(
      "https://www.dcl-property.rentals/api/price_data",
      "https://www.dcl-property.rentals/api/price_data",
      staticLandSales
    )

    topLandRes = await getDataWithProxy(
      "https://services.itrmachines.com/val-analytics/topSellingLands?metaverse=decentraland",
      "https://services.itrmachines.com/val-analytics/topSellingLands?metaverse=decentraland",
      staticTopLand
    )

    topPickRes = await getDataWithProxy(
      "https://services.itrmachines.com/val-analytics/topPicks?metaverse=decentraland",
      "https://services.itrmachines.com/val-analytics/topPicks?metaverse=decentraland",
      staticTopPick
    )
  } else if (isDev && !isLocal) {
    ;[globalDailyRes, parcelRes, landSalesRes, topLandRes, topPickRes] =
      await Promise.all(
        globalRequestList.map(({ url, endpoint, staticData }) =>
          getData(url, endpoint, staticData)
        )
      )
  } else if (isLocal) {
    globalDailyRes = staticGlobalDaily
    parcelRes = staticParcel
    landSalesRes = staticLandSales
    topLandRes = staticTopLand
    topPickRes = staticTopPick
  }

  // write heavy res for cache
  if (isProd) {
    for (let i = 0; i < globalFileNameArr.length; i++) {
      writeFile(
        globalFileNameArr[i],
        [globalDailyRes, parcelRes, landSalesRes, topLandRes, topPickRes][i]
      )
    }
  }

  return {
    globalDailyRes,
    parcelRes,
    landSalesRes,
    topLandRes,
    topPickRes,
  }
}

export async function fetchRentalData() {
  const rental = new ApolloClient({
    uri: "https://api.thegraph.com/subgraphs/name/decentraland/rentals-ethereum-mainnet",
    cache: new InMemoryCache(),
  })

  const { data } = await rental.query({
    query: gql`
      query {
        analyticsTotalDatas {
          rentals
          volume
          lessorEarnings
          feeCollectorEarnings
        }
        analyticsDayDatas {
          date
          rentals
          volume
          lessorEarnings
          feeCollectorEarnings
        }
      }
    `,
  })

  return data
}

export function getLatestPost() {
  const posts = getPosts().sort((a, b) => {
    return moment(b.data.date).unix() - moment(a.data.date).unix()
  })

  return posts[0]
}
