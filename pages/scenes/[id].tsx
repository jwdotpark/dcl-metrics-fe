import { Box, Button, Center, Flex, Spacer, Text } from "@chakra-ui/react"
import Layout from "../../src/components/layout/layout"
import Scene from "../../src/components/local/stats/Scene"
import { getDataWithProxy } from "../../src/lib/data/fetch"

const SingleScenePage = (result) => {
  const res = [result]
  const isResultEmpty = Object.keys(result).length === 0

  return (
    <Layout>
      {isResultEmpty ? (
        <Center h="calc(100vh - 200px)">
          <Box>
            <Text fontSize="xl">No data is available</Text>
          </Box>
        </Center>
      ) : (
        <Scene
          res={res}
          date=""
          setDate={{}}
          availableDate={[]}
          dailyUsers={{}}
        />
      )}
    </Layout>
  )
}

export default SingleScenePage

export async function getServerSideProps(context) {
  const id = context.query.scene_uuid
  // TODO change url later
  //const endpoint = isProd
  //  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT
  //  : process.env.NEXT_PUBLIC_DEV_ENDPOINT

  const endPoint = process.env.NEXT_PUBLIC_PROD_ENDPOINT
  const path = "scenes/" + id
  const url = endPoint + path
  const result = await getDataWithProxy(url, path, {})
  return {
    props: result,
  }
}
