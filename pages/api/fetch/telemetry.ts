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

  const url = "https://api.dcl-metrics.com/internal_metrics"
  const result = req.body

  try {
    axios({
      url: url,
      method: "post",
      data: JSON.stringify(result),
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
    res.status(200).json({ data: result })
  } catch (error) {
    console.error("error: ", error)
  }

  // const response = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(result),
  // })
  // const data = await response.json()
  // res.json({ data: data })
}
