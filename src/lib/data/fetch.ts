import { ApolloClient, InMemoryCache, gql } from "@apollo/client"
import axios from "axios"
import fs from "fs"
import { sendNotification } from "../hooks/sendNotification"

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
    //sendNotification(error, `${endpoint}`, "error")
    return staticFile
  }
}

export const getData = async (targetUrl, endpoint, staticFile) => {
  const response = await fetch(targetUrl)
  const result = await response.json()
  if (response.status !== 200) {
    sendNotification(response, `${endpoint}`, "error")
    return staticFile
  }
  return result
}
