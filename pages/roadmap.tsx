import { useBreakpointValue, Grid } from "@chakra-ui/react"
import Head from "next/head"
import Layout from "../src/components/layout/layout"
import BoxWrapper from "../src/components/layout/local/BoxWrapper"
import Changelog from "../src/components/local/change/changelog/Changelog"
import RoadMap from "../src/components/local/change/roadmap/RoadMap"
import { generateMetaData } from "../src/lib/data/metadata"

const Roadmap = () => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })

  const pageTitle = "DCL-Metrics RoadMap"
  const description =
    "Discover our plans to enhance user experiences, expand functionality, and introduce new tools and capabilities."
  const image = "/images/roadmap.png"

  const metaData = generateMetaData({
    title: pageTitle,
    description: description,
    image: image,
  })

  return (
    <Layout>
      <Head>
        <title>{metaData.title}</title>
        <meta name="description" content={metaData.description} />
        <meta property="og:title" content={metaData.title} />
        <meta property="og:description" content={metaData.description} />
        <meta property="og:image" content={metaData.image} />
      </Head>
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
