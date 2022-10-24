import { Box } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import staticPeerStatus from "../public/data/cached_peerstats.json"
import StatusBox from "../src/components/local/status/StatusBox"
import { sendNotification } from "../src/lib/hooks/sendNotification"
const axios = require("axios").default
import fs from "fs"

export async function getStaticProps(context) {
  const day = 60 * 60 * 24
  const url =
    process.env.NEXT_PUBLIC_STAGING !== "true"
      ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "peer_status"
      : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "peer_status"

  // temporary fetching disabled
  if (process.env.NEXT_PUBLIC_ENV !== "prod") {
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
    } else {
      sendNotification(response, "peer_status", "error")
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
