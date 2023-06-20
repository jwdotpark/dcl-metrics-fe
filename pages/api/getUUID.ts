import { NextApiRequest, NextApiResponse } from "next"
import { getDataWithApiKey } from "../../src/lib/data/fetch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { x, y } = req.query

  const url =
    process.env.NEXT_PUBLIC_PROD_ENDPOINT +
    `/scenes/search?coordinates=${x},${y}`

  const result = await getDataWithApiKey(url, url, {})

  res.status(200).json({ result: result })
}
