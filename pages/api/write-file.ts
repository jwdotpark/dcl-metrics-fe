import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import { writeFile } from "fs"

// save body to json file in /public/data
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, name } = req.body
  if (req.method === "POST") {
    try {
      fs.writeFileSync("./example.json", JSON.stringify(data))
      return res.status(200).json({ message: "success" })
    } catch (error) {
      return res.status(500).json({ error: "error" })
    } finally {
      const file = fs.readFileSync("./example.json", "utf8")
      return res
        .status(200)
        .json({ message: `${name} static cache created`, data: file })
    }
  }
}

export default handler
