import { Center, Text } from "@chakra-ui/react"
import { useRouter } from "next/router"
import Layout from "../../src/components/layout/layout"

const ErrorPage = () => {
  const router = useRouter()
  const { query } = router
  return (
    <Layout>
      <Center h="calc(100vh - 8rem)">
        <Text fontSize="6xl">
          {query.statusCode === "unknown"
            ? "Something bad has happened!"
            : query.statusCode}
        </Text>
      </Center>
    </Layout>
  )
}

export default ErrorPage
