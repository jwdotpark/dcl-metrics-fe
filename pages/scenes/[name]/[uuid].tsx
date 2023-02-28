import { Box, Center, Text } from "@chakra-ui/react"
import Layout from "../../../src/components/layout/layout"
import Scene from "../../../src/components/local/stats/Scene"
import { getEndpoint } from "../../../src/lib/data/constant"
import { getDataWithProxy } from "../../../src/lib/data/fetch"

const SingleScenePage = ({ result, historyResult }) => {
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
          dailyUsers={historyResult}
          uuid={""}
        />
      )}
    </Layout>
  )
}

export default SingleScenePage

export async function getServerSideProps(context) {
  const uuid = context.query.uuid
  const url = getEndpoint("scenes/" + uuid)
  const result = uuid && (await getDataWithProxy(url, "scenes/" + uuid, {}))

  const historyUrl = getEndpoint(`scenes/${uuid}/visitor_history`)
  const historyResult = await getDataWithProxy(historyUrl, historyUrl, {})

  return {
    props: { result, historyResult },
  }
}
