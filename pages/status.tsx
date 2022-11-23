import { Box, Button } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import staticPeerStatus from "../public/data/cached_peerstats.json"
import StatusBox from "../src/components/local/status/StatusBox"
import { sendNotification } from "../src/lib/hooks/sendNotification"
const axios = require("axios").default
import fs from "fs"
import { useState } from "react"

export async function getStaticProps() {
  const day = 60 * 60 * 24
  const url =
    process.env.NEXT_PUBLIC_STAGING === "false"
      ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "peer_status"
      : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "peer_status"

  if (process.env.NEXT_PUBLIC_STAGING === "false") {
    const response = await axios
      .get(url, {
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
      .catch((error) => {
        console.log(error)
        return { props: { data: staticPeerStatus }, revalidate: day }
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
  }

  if (process.env.NEXT_PUBLIC_STAGING === "true") {
    const response = await fetch(url)
    const data = await response.json()
    return {
      props: { data },
      revalidate: day,
    }
  }
}

const Status = ({ data }) => {
  // const [count, setCount] = useState(0)
  // if (count === 3) {
  //   throw new Error("waa waaa")
  // }
  // const TestButton = () => {
  //   return (
  //     <Button
  //       onClick={() => {
  //         setCount(count + 1)
  //       }}
  //     >
  //       count {count}
  //     </Button>
  //   )
  // }

  return (
    <Layout>
      <Box>
        {/* <TestButton /> */}
        <StatusBox data={data} />
      </Box>
    </Layout>
  )
}

export default Status
