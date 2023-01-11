import fs from "fs"
import { sendNotification } from "../hooks/sendNotification"

export const time = 60 * 60 * 24 * 365 // 1 year
export const isProd = process.env.NEXT_PUBLIC_STAGING === "false"

export const url = isProd
  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "global"
  : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "global"

export const sceneURL = isProd
  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "scenes/top"
  : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "scenes/top"

export const parcelURL = isProd
  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "parcels/all"
  : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "parcels/all"

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
  if (response.status === 200) {
    fs.writeFileSync(
      `./public/data/${name}.json`,
      JSON.stringify(response.data)
    )
  } else if (response.status !== 200) {
    sendNotification(response, "global", "error")
  }
}
