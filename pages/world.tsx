import { Box } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import { isDev, isLocal, isProd, statusURL } from "../src/lib/data/constant"
import { getData, getDataWithApiKey, writeFile } from "../src/lib/data/fetch"
import staticWorldCurrent from "../public/data/staticWorldCurrent.json"
import { generateMetaData, siteUrl } from "../src/lib/data/metadata"
import { NextSeo } from "next-seo"
import WorldTable from "../src/components/local/stats/world/WorldTable"
import BoxWrapper from "../src/components/layout/local/BoxWrapper"
import BoxTitle from "../src/components/layout/local/BoxTitle"
import WorldCurrentTop from "../src/components/local/stats/world/WorldCurrentTop"

export async function getStaticProps() {
  if (isProd) {
    const worldCurrentRes = await getDataWithApiKey(
      statusURL,
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
      statusURL,
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
        <WorldCurrentTop worldCurrentRes={worldCurrentRes} />
      </Layout>
    </>
  )
}

export default World
