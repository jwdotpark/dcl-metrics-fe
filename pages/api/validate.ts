import { NextApiRequest, NextApiResponse } from "next"

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const ups = process.env.UPS
  const ups_pw = process.env.UPS_PW
  const goldfish = process.env.GOLDFISH
  const goldfish_pw = process.env.GOLDFISH_PW
  const edifice = process.env.EDIFICE
  const edifice_pw = process.env.EDIFICE_PW

  const { account, password } = req.body

  if (
    (account === ups && password === ups_pw) ||
    (account === goldfish && password === goldfish_pw) ||
    (account === edifice && password === edifice_pw)
  ) {
    return res.status(200).json({ isAuthenticated: true })
  } else {
    return res.status(200).json({ isAuthenticated: false })
  }
}

export default handler
