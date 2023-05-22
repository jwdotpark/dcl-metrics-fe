import { Box } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import StatusBox from "../src/components/local/status/StatusBox"
import { isDev, isLocal, isProd, statusURL } from "../src/lib/data/constant"
import { getData, getDataWithApiKey, writeFile } from "../src/lib/data/fetch"
import staticPeerStatus from "../public/data/staticPeerStatus.json"

export async function getStaticProps() {
  if (isProd) {
    // NOTE
    const statusRes = await getDataWithApiKey(
      statusURL,
      "/peer_status",
      staticPeerStatus
    )

    writeFile("staticPeerStatus", statusRes)

    const result = { statusRes }
    return {
      props: result,
    }
  } else if (isDev && !isLocal) {
    const statusRes = await getData(statusURL, "/peer_status", staticPeerStatus)
    const result = { statusRes }
    return {
      props: result,
    }
  } else if (isLocal) {
    const statusRes = staticPeerStatus
    const result = { statusRes }
    return {
      props: result,
    }
  }
}

const Status = (props: Props) => {
  const { statusRes } = props

  return (
    <Layout>
      <Box>
        <StatusBox data={statusRes} />
      </Box>
    </Layout>
  )
}

export default Status
