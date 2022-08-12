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

  try {
    const response = await axios.get(url, {
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
    })
    const data = response.data
    res.status(200).json({ data: data })
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
