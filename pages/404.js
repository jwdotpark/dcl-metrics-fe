import { Center, Text } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"

const NotFoundPage = () => {
  return (
    <Layout>
      <Center h="calc(100vh - 8rem)">
        <Text fontSize="6xl">404</Text>
      </Center>
    </Layout>
  )
}

export default NotFoundPage
