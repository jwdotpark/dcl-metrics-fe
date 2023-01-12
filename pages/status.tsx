import { Box } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import StatusBox from "../src/components/local/status/StatusBox"
import {
  isDev,
  isLocal,
  isProd,
  statusURL,
  time,
} from "../src/lib/data/constant"
import { getData, getDataWithProxy, writeFile } from "../src/lib/data/fetch"
import staticPeerStatus from "../public/data/staticPeerStatus.json"

export async function getStaticProps() {
  if (isProd) {
    const statusRes = await getDataWithProxy(
      statusURL,
      "/peer_status",
      staticPeerStatus
    )
    writeFile("staticPeerStatus", statusRes)
    const result = { statusRes }
    return {
      props: result,
      revalidate: time,
    }
  } else if (isDev && !isLocal) {
    const statusRes = await getData(statusURL, "/peer_status", staticPeerStatus)
    const result = { statusRes }
    return {
      props: result,
      revalidate: time,
    }
  } else if (isLocal) {
    const statusRes = staticPeerStatus
    const result = { statusRes }
    return {
      props: result,
      revalidate: time,
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
