import { NextApiRequest, NextApiResponse } from "next"
import { getDataWithApiKey } from "../../src/lib/data/fetch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { url } = req.query
  // NOTE
  const result = await getDataWithApiKey(url, url, {})

  res.status(200).json({ result: result })
}
