import { NextApiRequest, NextApiResponse } from "next"
import fs from "fs"
import { writeFile } from "fs"

// save body to json file in /public/data
async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { data, name } = req.body
  console.log("write-file", data, name)
  const path = "./public/data/test.json"
  if (req.method === "POST" && name === "global") {
    // write file
    writeFile(path, JSON.stringify(data, null, 2), (error) => {
      if (error) {
        console.error(error)
        return
      }
      console.log("File has been created")
    })
  }

  // read file
  const file = fs.readFile(path, "utf8", (err, jsonString) => {
    if (err) {
      console.error(err)
      return
    }
    console.log(jsonString)
  })

  return res.status(200).json({ message: "Static cache created", data: file })
}

export default handler
