import { Box, Flex, Grid, Spacer, useBreakpointValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import ApiList from "../src/components/local/api/ApiList"
import ApiExample from "../src/components/local/api/ApiExample"
import MobileApiList from "../src/components/local/api/MobileApiList"
import moment from "moment"
import { getApiLists } from "../markdown/helpers/post"
import { useState } from "react"

export const getStaticProps = () => {
  const apiList = getApiLists()

  apiList
    .sort((a, b) => {
      return b.data.issue - a.data.issue
    })
    .reverse()

  return {
    props: {
      apiList,
    },
  }
}

const API = ({ apiList }) => {
  const gridColumn = useBreakpointValue({
    base: 1,
    sm: 1,
    md: 1,
    lg: 2,
    xl: 6,
  })

  const [selectedItem, setSelectedItem] = useState(apiList[0].data)
  console.log("current", selectedItem)

  return (
    <Layout>
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
        {gridColumn === 1 ? (
          <MobileApiList data={apiList} />
        ) : (
          <ApiList data={apiList} />
        )}
        <ApiExample apiList={apiList} />
      </Grid>
    </Layout>
  )
}

export default API
