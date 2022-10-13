// @ts-nocheck
import {
  Flex,
  Box,
  useBreakpointValue,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import staticGlobal from "../public/data/cached_global_response.json"
import staticPeerStatus from "../public/data/peerstats.json"
import { useAtom } from "jotai"
import { DataAtom, LoadingStateAtom } from "../src/lib/hooks/atoms"
import StatusBox from "../src/components/local/status/StatusBox"

const Status = () => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  // const [data] = useAtom(DataAtom)
  // const [isDataLoading] = useAtom(LoadingStateAtom)
  // const result = data.length !== 0 ? data : staticGlobal
  const data = staticPeerStatus
  console.log("data", data)

  return (
    <Layout>
      <Box>
        <StatusBox data={data} />
      </Box>
    </Layout>
  )
}

export default Status
