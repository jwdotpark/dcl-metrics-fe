import { NextApiRequest, NextApiResponse } from "next"
import { withSentry } from "@sentry/nextjs"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" })
  }

  try {
    await res.revalidate("/")
    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send("Error revalidating")
  }
}

export default withSentry(handler)
