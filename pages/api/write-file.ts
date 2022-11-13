import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import { writeFile } from "fs"

// save body to json file in /public/data
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, name } = req.body
  console.log("write-file", data, name)
  const path = "./test.json"
  if (req.method === "POST" && name === "global") {
    // write file
    fs.writeFileSync(path, JSON.stringify(data))
  }
  // read file
  const file = fs.readFile(path, "utf8", (err) => {
    if (err) {
      console.error(err)
      return
    }
  })
  console.log(file)

  return res
    .status(200)
    .json({ message: `${name} static cache created`, data: file })
}

export default handler
