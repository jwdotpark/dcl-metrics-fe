import { NextApiRequest, NextApiResponse } from "next"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" })
  }

  try {
    await res.revalidate("/")
    await res.revalidate("/map")
    await res.revalidate("/users")
    await res.revalidate("/scenes")
    await res.revalidate("/parcels")
    await res.revalidate("/status")
    return res.json({ revalidated: true })
  } catch (err) {
    console.log("error", err)
    return res.status(500).send({ message: "Error revalidating", error: err })
  }
}

export default handler
