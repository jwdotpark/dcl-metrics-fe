import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const target = req.query.url

    if (!target || typeof target !== "string") {
      return res.status(400).json({ error: "Invalid URL parameter" })
    }

    const response = await fetch(target)

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Failed to fetch data from ${target}` })
    }

    const result = await response.json()
    res.status(200).json({ result })
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" })
  }
}
