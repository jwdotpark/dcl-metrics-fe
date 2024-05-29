import { NextApiRequest, NextApiResponse } from "next"
import { getCSV } from "../../src/lib/data/fetch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { url } = req.query

    if (!url) {
      return res.status(400).json({ error: "Missing 'url' query parameter" })
    }

    const result = await getCSV(url)

    res.setHeader("Content-Type", "text/csv")
    res.setHeader("Content-Disposition", "attachment; filename=report.csv")
    res.status(200).send(result)
  } catch (error) {
    console.error("Error fetching CSV:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
