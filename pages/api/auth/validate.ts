import { NextApiRequest, NextApiResponse } from "next"
import { sceneID, findUUID } from "../../../src/lib/data/sceneID"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const edifice = process.env.EDIFICE
  const edifice_pw = process.env.EDIFICE_PW
  const kb_homes = process.env.KB_HOMES
  const kb_homes_pw = process.env.KB_HOMES_PW

  const { account, password } = req.body

  const uuid = sceneID[account].uuid

  if (
    (account === edifice && password === edifice_pw) ||
    (account === kb_homes && password === kb_homes_pw)
  ) {
    return res.status(200).json({ isAuthenticated: true, uuid: uuid })
  } else {
    return res.status(200).json({ isAuthenticated: false, uuid: null })
  }
}

export default handler
