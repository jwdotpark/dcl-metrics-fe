import { NextApiRequest, NextApiResponse } from "next"
import { getEndpoint } from "../../src/lib/data/constant"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const uuid = req.query.uuid

  console.log(uuid)

  const path = `reports/${uuid}`
  const endpoint = getEndpoint(path)

  const response = await fetch(endpoint)
  const data = await response.json()
  //console.log("data", data)

  // convert data to CSV format
  const csvData = data.map((d) => Object.values(d).join(",")).join("\n")
  console.log(csvData)

  // set response headers
  res.setHeader("Content-Disposition", `attachment; filename="name.csv"`)
  res.setHeader("Content-Type", "text/csv")

  // send the CSV data as the response body
  res.status(200).send(csvData)
}
