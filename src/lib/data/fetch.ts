import axios from "axios"
import fs from "fs"
import { sendNotification } from "../hooks/sendNotification"
import { time } from "./constant"

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
  await axios.get(targetURL, axiosOptions).catch((error) => {
    console.log(error)
    sendNotification(error, `${endpoint}`, "error")
    return { props: { data: staticFile }, revalidate: time }
  })
}
