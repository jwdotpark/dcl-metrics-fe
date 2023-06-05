import { useBreakpointValue, Grid } from "@chakra-ui/react"
import { NextSeo } from "next-seo"
import Layout from "../src/components/layout/layout"
import BoxWrapper from "../src/components/layout/local/BoxWrapper"
import Changelog from "../src/components/local/change/changelog/Changelog"
import RoadMap from "../src/components/local/change/roadmap/RoadMap"
import { generateMetaData, siteUrl } from "../src/lib/data/metadata"

const Roadmap = () => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })

  const pageTitle = "DCL-Metrics RoadMap"
  const description =
    "Discover our plans to enhance user experiences, expand functionality, and introduce new tools and capabilities."
  const image = `${siteUrl}/images/roadmap.png`

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

  return (
    <Layout>
      <NextSeo
        title={metaData.title}
        description={metaData.description}
        openGraph={{
          url: siteUrl + "/roadmap",
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
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`}>
        <BoxWrapper colSpan={1}>
          <RoadMap />
        </BoxWrapper>
        <BoxWrapper colSpan={1}>
          <Changelog />
        </BoxWrapper>
      </Grid>
    </Layout>
  )
}

export default Roadmap
