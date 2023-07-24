import fs from "fs"
import { sendNotification } from "../hooks/sendNotification"
import { isDev, isLocal, isProd } from "./constant"
import { globalFileNameArr, globalRequestList } from "./fetchList"

import staticGlobalDaily from "../../../public/data/staticGlobalDaily.json"
import staticParcel from "../../../public/data/cached_parcel.json"
import staticLandSales from "../../../public/data/staticLandSales.json"
import staticWorldCurrent from "../../../public/data/staticWorldCurrent.json"

//import staticTopLand from "../../../public/data/staticTopLand.json"
//import staticTopPick from "../../../public/data/staticTopPick.json"
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
  let globalDailyRes, parcelRes, landSalesRes, worldCurrentRes

  if (isProd) {
    ;[globalDailyRes, parcelRes, worldCurrentRes] = await Promise.all(
      globalRequestList.map(({ url, endpoint, staticData }) =>
        getDataWithApiKey(url, endpoint, staticData)
      )
    )
    landSalesRes = await getDataWithApiKey(
      "https://www.dcl-property.rentals/api/price_data",
      "https://www.dcl-property.rentals/api/price_data",
      staticLandSales
    )
  } else if (isDev && !isLocal) {
    ;[globalDailyRes, parcelRes, landSalesRes, worldCurrentRes] =
      await Promise.all(
        globalRequestList.map(({ url, endpoint, staticData }) =>
          getDataWithApiKey(url, endpoint, staticData)
        )
      )
  } else if (isLocal) {
    globalDailyRes = staticGlobalDaily
    parcelRes = staticParcel
    landSalesRes = staticLandSales
    worldCurrentRes = staticWorldCurrent
  }

  // write heavy res for cache
  if (isProd) {
    for (let i = 0; i < globalFileNameArr.length; i++) {
      writeFile(
        globalFileNameArr[i],
        [globalDailyRes, parcelRes, landSalesRes, worldCurrentRes][i]
      )
    }
  }

  return {
    globalDailyRes,
    parcelRes,
    landSalesRes,
    worldCurrentRes,
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
