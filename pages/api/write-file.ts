import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"

// save body to json file in /public/data
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, name } = req.body
  console.log("write-file", data, name)
  if (req.method === "POST" && name === "global") {
    // write file
    fs.writeFileSync(
      "./public/data/ached_global_response_temp.json",
      JSON.stringify(data, null, 2)
    )
    // read file
    const file = fs.readFileSync(
      "./public/data/ached_global_response_temp.json",
      "utf8"
    )
    return res
      .status(200)
      .json({ message: "Static cache created", data: JSON.parse(file) })
  }
}

export default handler
