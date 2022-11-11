import { NextApiRequest, NextApiResponse } from "next"
const axios = require("axios").default

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.body
  if (req.method === "POST" && process.env.NEXT_PUBLIC_STAGING === "false") {
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
  } else if (
    req.method === "POST" &&
    process.env.NEXT_PUBLIC_STAGING === "true"
  ) {
    const response = await fetch(url)
    const data = await response.json()
    return res.status(200).json(data)
  } else {
    return res.status(500).json({ error: "Invalid request" })
  }
}

export default handler
