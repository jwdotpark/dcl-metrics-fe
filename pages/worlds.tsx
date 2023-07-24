import Layout from "../src/components/layout/layout"
import { isDev, isLocal, isProd, worldURL } from "../src/lib/data/constant"
import { getData, getDataWithApiKey, writeFile } from "../src/lib/data/fetch"
import staticWorldCurrent from "../public/data/staticWorldCurrent.json"
import { generateMetaData, siteUrl } from "../src/lib/data/metadata"
import { NextSeo } from "next-seo"
import WorldCurrentTop from "../src/components/local/stats/world/WorldCurrentTop"
import WorldStat from "../src/components/local/stats/world/WorldStat"
import { Box } from "@chakra-ui/react"

export async function getStaticProps() {
  if (isProd) {
    const worldCurrentRes = await getDataWithApiKey(
      worldURL,
      "/world/current",
      staticWorldCurrent
    )

    writeFile("staticWorldCurrent", staticWorldCurrent)

    const result = { worldCurrentRes }
    return {
      props: result,
    }
  } else if (isDev && !isLocal) {
    const worldCurrentRes = await getData(
      worldURL,
      "/world/current",
      staticWorldCurrent
    )
    const result = { worldCurrentRes }
    return {
      props: result,
    }
  } else if (isLocal) {
    const worldCurrentRes = staticWorldCurrent
    const result = { worldCurrentRes }
    return {
      props: result,
    }
  }
}

const World = (props: Props) => {
  const { worldCurrentRes } = props

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
        <WorldStat worldCurrentRes={worldCurrentRes} isMainPage={false} />
        <Box mb="4" />
        <WorldCurrentTop worldCurrentRes={worldCurrentRes} pageSize={25} />
      </Layout>
    </>
  )
}

export default World
