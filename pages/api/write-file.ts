import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"

// save body to json file in /public/data
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, name } = req.body

  if (req.method === "POST" && name === "global") {
    fs.writeFileSync(
      `./public/data/cached_global_response_temp.json`,
      JSON.stringify(data)
    )
    return res.status(200).json({ message: "Static cache created" })
  }
}

export default handler
