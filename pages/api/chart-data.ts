import { NextApiRequest, NextApiResponse } from "next"
import { getDataWithApiKey } from "../../src/lib/data/fetch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url, range, uuid, metric } = req.query

  const endpoint = `${url}?range=${range}&uuid=${uuid}&metric=${metric}`
  console.log(endpoint)

  const result = await getDataWithApiKey(endpoint, endpoint, {})

  res.status(200).json({ result: result })
}
