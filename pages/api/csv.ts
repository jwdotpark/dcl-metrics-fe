import { NextApiRequest, NextApiResponse } from "next"
import { getEndpoint } from "../../src/lib/data/constant"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uuid = req.query.uuid
  const path = `reports/${uuid}`
  const endpoint = getEndpoint(path)

  const response = await fetch(endpoint)
  const data = await response.json()

  const csvData = data.map((d) => Object.values(d).join(",")).join("\n")

  res.setHeader("Content-Disposition", `attachment; filename="name.csv"`)
  res.setHeader("Content-Type", "text/csv")
  res.status(200).send(csvData)
}
