import { NextApiRequest, NextApiResponse } from "next"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.query.secret !== process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" })
  }

  try {
    // need to bundle things up
    await res.revalidate("/")
    await res.revalidate("/map")
    await res.revalidate("/users")
    await res.revalidate("/scenes")
    await res.revalidate("/parcels")
    await res.revalidate("/status")
    await res.revalidate("/dashboard/ups_store")
    await res.revalidate("/dashboard/goldfish")

    return res.json({ revalidated: true })
  } catch (err) {
    return res.status(500).send("Error revalidating")
  }
}

export default handler
