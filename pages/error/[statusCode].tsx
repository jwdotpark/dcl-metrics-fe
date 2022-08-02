import { Center, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Layout from "../../src/components/layout/layout"

const ErrorPage = () => {
  const router = useRouter()
  const { query } = router
  return (
    <Layout>
      <Center h="calc(100vh - 8rem)">
        <Text fontSize="4xl">
          {query.statusCode ? query.statusCode : "Something bad has happened!"}
        </Text>
      </Center>
    </Layout>
  )
}

export default ErrorPage
