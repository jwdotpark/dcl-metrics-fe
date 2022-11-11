import { NextApiRequest, NextApiResponse } from "next"
const axios = require("axios").default

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.body
  if (req.method === "POST") {
    // fixie
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
    const data = await response.json()
    return res.status(200).json(data)

    // non fixie
    // const response = await fetch(url)
    // const data = await response.json()
    // return res.status(200).json(data)
  }
}

export default handler
