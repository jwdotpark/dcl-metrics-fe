// @ts-nocheck
import { useBreakpointValue, Grid, useColorModeValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import staticGlobal from "../public/data/cached_global_response.json"
import staticPeerStatus from "../public/data/peerstats.json"
import { useAtom } from "jotai"
import { DataAtom, LoadingStateAtom } from "../src/lib/hooks/atoms"

const Status = () => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  // const [data] = useAtom(DataAtom)
  // const [isDataLoading] = useAtom(LoadingStateAtom)
  // const result = data.length !== 0 ? data : staticGlobal
  const data = staticGlobal
  console.log("data", data)

  return (
    <Layout>
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
        {/* <MarathonUsers res={result.users} isLoading={isDataLoading} /> */}
        {/* <Explorer res={result.users} isLoading={isDataLoading} /> */}
      </Grid>
    </Layout>
  )
}

export default Status
