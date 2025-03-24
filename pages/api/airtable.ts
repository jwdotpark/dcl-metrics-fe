import { NextApiRequest, NextApiResponse } from "next"
import Airtable from "airtable"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { baseID, tableName, apiKey } = req.query

  if (!baseID || !tableName || !apiKey) {
    return res.status(400).json({ error: "Missing required parameters" })
  }

  Airtable.configure({
    apiKey: apiKey as string,
  })

  const base = Airtable.base(baseID as string)

  try {
    const records = await base(tableName as string)
      .select()
      .all()
    const data = records.map((record) => record.fields)
    res.status(200).json(data)
  } catch (error) {
    console.error("Error fetching data from Airtable:", error)
    res.status(500).json({
      error: "Failed to fetch data from Airtable",
      details: error.message,
    })
  }
}
