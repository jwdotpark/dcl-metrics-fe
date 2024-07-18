import { NextApiRequest, NextApiResponse } from "next"
import { getDataWithApiKey } from "../../src/lib/data/fetch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { endpoint, url } = req.query

    if (!endpoint || typeof endpoint !== "string") {
      return res.status(400).json({ error: "Invalid endpoint parameter" })
    }

    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "Invalid URL parameter" })
    }

    const result = await getDataWithApiKey(url, endpoint, {})

    res.status(200).json({ result })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
