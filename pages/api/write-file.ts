import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import { writeFile } from "fs"

// save body to json file in /public/data
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, name } = req.body
  if (req.method === "POST") {
    const path = "public/data/example.json"

    // write
    try {
      fs.writeFileSync(path, JSON.stringify(data))
    } catch (e) {
      console.log(e)
    }
    
    // read
    const file = fs.readFileSync(path, "utf8")
    console.log(file)
    res
      .status(200)
      .json({ message: `${name} static cache created`, data: file })
  }
}

export default handler
