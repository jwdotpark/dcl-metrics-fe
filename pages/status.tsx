import { Box } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import staticPeerStatus from "../public/data/cached_peerstats.json"
import StatusBox from "../src/components/local/status/StatusBox"
const axios = require("axios").default
import fs from "fs"

export async function getStaticProps(context) {
  const day = 60 * 60 * 24
  const url =
    process.env.NEXT_PUBLIC_STAGING !== "true"
      ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "peer_status"
      : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "peer_status"

  if (process.env.NEXT_PUBLIC_ENV === "prod") {
    const response = await axios.get(url, {
      method: "get",
      proxy: {
        protocol: "http",
        host: process.env.FIXIE_HOST,
        port: 80,
        auth: {
          username: "fixie",
          password: process.env.FIXIE_TOKEN,
        },
      },
    })

    if (response.status === 200) {
      fs.writeFileSync(
        "./public/data/cached_peerstats.json",
        JSON.stringify(response.data)
      )
    }

    if (response.status !== 200) {
      const sendNotification = async () => {
        const URI =
          "https://dcl-metrics-bot-server.herokuapp.com/telegram/internal"
        const data = await fetch(URI, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            level: "warning",
            message: `Peer status endpoint request is ${response.status} while build, check out the log`,
            payload: {
              status: response.status,
            },
          }),
        })
        await data.json()
      }
      sendNotification()
    }
    const data = response.data
    return {
      props: { data },
      revalidate: day,
    }
  } else {
    const data = staticPeerStatus
    return {
      props: { data },
      revalidate: day,
    }
  }
}

const Status = (props) => {
  const data = props.data
  return (
    <Layout>
      <Box>
        <StatusBox data={data} />
      </Box>
    </Layout>
  )
}

export default Status
