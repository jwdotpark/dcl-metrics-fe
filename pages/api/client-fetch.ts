import { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const target = req.query.url as string
  const data = await fetch(target)
  const result = await data.json()
  res.status(200).json({ result })
}
