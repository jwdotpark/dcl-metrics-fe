import { NextApiRequest, NextApiResponse } from "next"
import { getLatestPost } from "../../src/lib/data/fetch"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const latestPost = getLatestPost()
  console.log(latestPost)
  res.status(200).json({ latestPost: latestPost })
}
