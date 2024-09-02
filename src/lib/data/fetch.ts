/* eslint-disable no-unused-vars */

import fs from "fs"
//import { sendNotification } from "../hooks/sendNotification"
import { isDev, isLocal, isProd } from "./constant"
import { globalFileNameArr, globalRequestList } from "./fetchList"
import staticGlobalDaily from "../../../public/data/staticGlobalDaily.json"
import staticParcel from "../../../public/data/cached_parcel.json"
//import staticLandSales from "../../../public/data/staticLandSales.json"
//import staticWorldCurrent from "../../../public/data/staticWorldCurrent.json"
//import staticTopLand from "../../../public/data/staticTopLand.json"
//import staticTopPick from "../../../public/data/staticTopPick.json"
import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import { getPosts } from "../../../markdown/helpers/post"
import { compareDesc, parseISO } from "date-fns"

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

// disable fetch error, errors are handled in the backend

export const getData = async (targetUrl, endpoint, staticFile) => {
  const response = await fetch(targetUrl)
  const result = await response.json()
  if (response.status >= 200) {
    //if (isProd) {
    //  sendNotification(response.status, `${endpoint}`, "error")
    //}
    return staticFile
  }
  return result
}

export const getCSV = async (targetUrl) => {
  const response = await fetch(targetUrl, {
    headers: {
      API_KEY: process.env.BE_API_KEY,
    },
  })
  const result = await response.text()
  return result
}

export const getDataWithApiKey = async (targetUrl, endpoint, staticFile) => {
  const response = await fetch(targetUrl, {
    headers: {
      API_KEY: process.env.BE_API_KEY,
    },
    //cache: isProd ? "default" : "force-cache",
  })
  const result = await response.json()

  // telegram error notification temporarily disabled
  //if (response.status !== 200) {
  //  if (isProd) {
  //    sendNotification(response.status, `${endpoint}`, "error")
  //  }
  //  return staticFile
  //}

  return result
}

export async function fetchGlobalData() {
  let globalDailyRes, parcelRes, landSalesRes

  if (isProd) {
    ;[globalDailyRes, parcelRes] = await Promise.all(
      globalRequestList.map(({ url, endpoint, staticData }) =>
        getDataWithApiKey(url, endpoint, staticData)
      )
    )
    //landSalesRes = await getDataWithApiKey(
    //  "https://www.dcl-property.rentals/api/price_data",
    //  "https://www.dcl-property.rentals/api/price_data",
    //  staticLandSales
    //)
  } else if (isDev && !isLocal) {
    ;[globalDailyRes, parcelRes, landSalesRes] = await Promise.all(
      globalRequestList.map(({ url, endpoint, staticData }) =>
        getDataWithApiKey(url, endpoint, staticData)
      )
    )
  } else if (isLocal) {
    globalDailyRes = staticGlobalDaily
    parcelRes = staticParcel
    //landSalesRes = staticLandSales
  }

  // write heavy res for cache
  if (process.env.CACHE_RESPONSE === "true") {
    for (let i = 0; i < globalFileNameArr.length; i++) {
      writeFile(
        globalFileNameArr[i],
        [
          globalDailyRes,
          parcelRes,
          //landSalesRes
        ][i]
      )
    }
  }

  return {
    globalDailyRes,
    parcelRes,
    //landSalesRes,
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
  const posts = getPosts()

  return posts.reduce((latest, post) => {
    const latestDate = new Date(latest.data.date)
    const postDate = new Date(post.data.date)
    return postDate > latestDate ? post : latest
  })
}
