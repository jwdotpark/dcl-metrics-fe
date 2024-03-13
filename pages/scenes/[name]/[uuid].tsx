import { Box, Center, Text } from "@chakra-ui/react"
import { format } from "date-fns"
import { NextSeo } from "next-seo"
import Layout from "../../../src/components/layout/layout"
import Scene from "../../../src/components/local/stats/Scene"
import { getEndpoint } from "../../../src/lib/data/constant"
import { getDataWithApiKey } from "../../../src/lib/data/fetch"
import { generateMetaData, siteUrl } from "../../../src/lib/data/metadata"
import { mutateStringToURL } from "../../../src/lib/hooks/utils"

const SingleScenePage = ({ result, historyResult }) => {
  const res = [result]
  const isResultEmpty = Object.keys(result).length === 0

  const pageTitle = `DCL-Metrics ${res[0].name}`
  const description = `${res[0].name} data on ${format(
    new Date(res[0].date),
    "yyyy MMM d"
  )}`
  const image = res[0].map_url

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

  const link = `${siteUrl}/scenes/${mutateStringToURL(res[0].name)}/${
    res[0].uuid
  }`

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

  return (
    <>
      <NextSeo
        title={metaData.title}
        description={metaData.description}
        openGraph={{
          url: link,
          title: metaData.title,
          description: metaData.description,
          images: [
            {
              url: metaData.image,
              width: 400,
              height: 400,
              alt: metaData.description,
              type: "image/png",
            },
          ],
          siteName: "DCL-Metrics",
        }}
      />
      <Layout>{sceneComponent}</Layout>
    </>
  )
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
