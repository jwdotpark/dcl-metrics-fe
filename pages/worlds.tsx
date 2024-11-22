import Layout from "../src/components/layout/layout"
import { isLocal, worldURL, worldGlobalURL } from "../src/lib/data/constant"
import { getDataWithApiKey } from "../src/lib/data/fetch"
import staticWorldCurrent from "../public/data/staticWorldCurrent.json"
import staticWorldGlobal from "../public/data/staticWorldGlobal.json"
import { generateMetaData, siteUrl } from "../src/lib/data/metadata"
import { NextSeo } from "next-seo"
import WorldCurrentTop from "../src/components/local/stats/world/WorldCurrentTop"
import WorldStat from "../src/components/local/stats/world/WorldStat"
import { Box } from "@chakra-ui/react"
import WorldChart from "../src/components/local/stats/world/WorldChart"

export async function getServerSideProps() {
  if (!isLocal) {
    const worldCurrentRes = await getDataWithApiKey(
      worldURL,
      "/worlds/current",
      staticWorldCurrent
    )
    const worldGlobalRes = await getDataWithApiKey(
      worldGlobalURL,
      "/worlds/global",
      staticWorldGlobal
    )

    const result = { worldCurrentRes, worldGlobalRes }
    return {
      props: result,
    }
  } else {
    const worldCurrentRes = staticWorldCurrent
    const worldGlobalRes = staticWorldGlobal
    const result = { worldCurrentRes, worldGlobalRes }
    return {
      props: result,
    }
  }
}

const World = (props: Props) => {
  const { worldCurrentRes, worldGlobalRes } = props

  const pageTitle = "DCL-Metrics World Data"
  const description =
    "A list of Worlds currently deployed to Decentraland servers."
  const image = `${siteUrl}/images/status.png`

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

  return (
    <>
      <NextSeo
        title={metaData.title}
        description={metaData.description}
        openGraph={{
          url: siteUrl + "/world",
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
        }}
      />
      <Layout>
        <Box>
          <WorldStat worldCurrentRes={worldCurrentRes} isMainPage={false} />
        </Box>
        <Box mb="4" />
        <WorldChart worldGlobalRes={worldGlobalRes} />
        <Box mb="4" />
        <WorldCurrentTop worldCurrentRes={worldCurrentRes} pageSize={10} />
      </Layout>
    </>
  )
}

export default World
