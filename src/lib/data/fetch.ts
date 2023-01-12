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
  fs.writeFileSync(`./public/data/${name}.json`, JSON.stringify(response.data))
}

export const getDataWithProxy = async (targetURL, endpoint, staticFile) => {
  try {
    const result = await axios.get(targetURL, axiosOptions)
    return result
  } catch (error) {
    console.log(error)
    sendNotification(error, `${endpoint}`, "error")
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
