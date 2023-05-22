import { Box, Center, Text } from "@chakra-ui/react"
import Layout from "../../../src/components/layout/layout"
import Scene from "../../../src/components/local/stats/Scene"
import { getEndpoint } from "../../../src/lib/data/constant"
import { getDataWithApiKey } from "../../../src/lib/data/fetch"

const SingleScenePage = ({ result, historyResult }) => {
  const res = [result]
  const isResultEmpty = Object.keys(result).length === 0

  let sceneComponent: JSX.Element

  if (isResultEmpty) {
    sceneComponent = (
      <Center h="calc(100vh - 200px)">
        <Box>
          <Text fontSize="xl">No data is available</Text>
        </Box>
      </Center>
    )
  } else {
    sceneComponent = (
      <Scene
        res={res}
        dailyUsers={historyResult}
        date=""
        setDate={{}}
        availableDate={[]}
        uuid={""}
      />
    )
  }

  return <Layout>{sceneComponent}</Layout>
}

export default SingleScenePage

export async function getServerSideProps(context) {
  const { uuid, name } = context.query
  const url = getEndpoint("scenes/" + uuid)
  const result =
    uuid && (await getDataWithApiKey(url, `scenes/${name}/${uuid}`, {}))

  const historyUrl = getEndpoint(`scenes/${uuid}/visitor_history`)
  const historyResult = await getDataWithApiKey(historyUrl, historyUrl, {})

  return {
    props: { result, historyResult },
  }
}
