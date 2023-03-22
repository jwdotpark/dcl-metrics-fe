import { Box, Flex, Spacer } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import ApiList from "../src/components/local/api/ApiList"
import ApiExample from "../src/components/local/api/ApiExample"

const API = () => {
  return (
    <Layout>
      <Flex>
        <ApiList />
        <ApiExample />
      </Flex>
    </Layout>
  )
}

export default API
