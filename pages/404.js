import { Button, VStack, Center, Text, Box, Spacer } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import { useRouter } from "next/router"

const NotFoundPage = () => {
  const router = useRouter()
  const url = router.asPath
  return (
    <Layout>
      <Center h="calc(100vh - 8rem)">
        <VStack dir="row">
          <Box>
            <Text fontSize="8xl">404</Text>
          </Box>
          <Spacer />
          <Center w={["60%", "100%"]}>
            <Text fontSize="3xl">{url} does not exist!</Text>
          </Center>
          <Center mx="4" pt="8">
            <Button
              borderRadius="xl"
              colorScheme="gray"
              onClick={() => router.push("/")}
              size="sm"
              variant="solid"
            >
              Go back to home
            </Button>
          </Center>
        </VStack>
      </Center>
    </Layout>
  )
}

export default NotFoundPage
