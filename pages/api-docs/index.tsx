import { Box, Flex, Grid, Spacer, useBreakpointValue } from "@chakra-ui/react"
import Layout from "../../src/components/layout/layout"
import ApiLayout from "../../src/components/api-docs/ApiLayout"
import ApiList from "../../src/components/local/api/ApiList"
import ApiExample from "../../src/components/local/api/ApiExample"
import MobileApiList from "../../src/components/local/api/MobileApiList"
import { getApiLists } from "../../markdown/helpers/post"
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

const API = ({ children, apiList }) => {
  const [selectedItem, setSelectedItem] = useState(apiList[0])
  return (
    <ApiLayout
      selectedItem={selectedItem}
      setSelectedItem={setSelectedItem}
      apiList={apiList}
    >
      {children}
    </ApiLayout>
  )
}

export default API
