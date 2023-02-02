import { NextApiRequest, NextApiResponse } from "next"
import { getDataWithProxy } from "../../src/lib/data/fetch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query
  const result = await getDataWithProxy(url, url, {})

  res.status(200).json({ result: result })
}
