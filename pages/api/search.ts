import { NextApiRequest, NextApiResponse } from "next"
import { getDataWithApiKey } from "../../src/lib/data/fetch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const { category, name } = req.query

    const url =
      process.env.NEXT_PUBLIC_PROD_ENDPOINT + `${category}/search?name=${name}`

    const result = await getDataWithApiKey(url, url, {})

    res.status(200).json({ result: result })
  } catch (error) {
    console.error("An error occurred:", error)
    res.status(500).json({ error: "Internal Server Error" })
  }
}
