// @ts-nocheck
import { Box } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import staticPeerStatus from "../public/data/peerstats.json"
import StatusBox from "../src/components/local/status/StatusBox"

const Status = () => {
  const data = staticPeerStatus
  return (
    <Layout>
      <Box>
        <StatusBox data={data} />
      </Box>
    </Layout>
  )
}

export default Status
