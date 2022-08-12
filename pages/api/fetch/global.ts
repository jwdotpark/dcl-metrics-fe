import type { NextApiRequest, NextApiResponse } from "next"
import Cors from "cors"
const axios = require("axios").default

const cors = Cors({
  methods: ["POST", "GET", "HEAD"],
})

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await runMiddleware(req, res, cors)

  const url = process.env.NEXT_PUBLIC_GLOBAL_API

  // using fixie
  try {
    const response = await axios.get(url, {
      method: "get",
      url: process.env.FIXIE_URL,
      proxy: {
        protocol: "http",
        host: "olympic.usefixie.com",
        port: 80,
        auth: {
          username: "fixie",
          password: process.env.FIXIE_TOKEN,
        },
      },
    })
    console.log(response)
    const data = response.data
    res.status(200).json({ data: data })
    return data
  } catch (error) {
    console.error(error)
  }

  // using fetch API
  // const response = await fetch(url, {
  //   method: "GET",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  // })
  // const data = await response.json()
  // res.json({ data: data })
}
