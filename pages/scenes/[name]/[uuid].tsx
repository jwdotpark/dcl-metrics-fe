import { Box, Center, Text } from "@chakra-ui/react"
import Head from "next/head"
import Layout from "../../../src/components/layout/layout"
import Scene from "../../../src/components/local/stats/Scene"
import { getEndpoint } from "../../../src/lib/data/constant"
import { getDataWithApiKey } from "../../../src/lib/data/fetch"
import { generateMetaData } from "../../../src/lib/data/metadata"

const SingleScenePage = ({ result, historyResult }) => {
  const res = [result]
  const isResultEmpty = Object.keys(result).length === 0

  const pageTitle = `DCL-Metrics ${res[0].name}`
  const description = `${res[0].name} on ${res[0].date}`
  const image = res[0].map_url

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

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
      <>
        <Head>
          <title>{metaData.title}</title>
          <meta name="description" content={metaData.description} />
          <meta property="og:title" content={metaData.title} />
          <meta property="og:description" content={metaData.description} />
          <meta property="og:image" content={metaData.image} />
        </Head>
        <Scene
          res={res}
          dailyUsers={historyResult}
          date=""
          setDate={{}}
          availableDate={[]}
          uuid={""}
        />
      </>
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
