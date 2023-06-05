import { Grid, useBreakpointValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"

import staticGlobalParcels from "../public/data/staticGlobalParcel.json"
import AFKTimeSpentParcel from "../src/components/local/stats/parcels/AFKTimeSpentParcel"
import AvgTimeSpentParcel from "../src/components/local/stats/parcels/AvgTimeSpentParcel"
import LogInTimeSpentParcel from "../src/components/local/stats/parcels/LogInTimeSpentParcel"
import LogOutTimeSpentParcel from "../src/components/local/stats/parcels/LogOutTimeSpentParcel"
import MostVisitedParcel from "../src/components/local/stats/parcels/MostVisitedParcel"
import {
  globalParcelURL,
  isDev,
  isLocal,
  isProd,
} from "../src/lib/data/constant"
import { getData, getDataWithApiKey, writeFile } from "../src/lib/data/fetch"
import { generateMetaData, siteUrl } from "../src/lib/data/metadata"
import Head from "next/head"

export async function getStaticProps() {
  if (isProd) {
    const globalParcelRes = await getDataWithApiKey(
      globalParcelURL,
      "/global/parcels",
      staticGlobalParcels
    )

    writeFile("staticGlobalParcels", globalParcelRes)

    const result = { globalParcelRes }
    return {
      props: result,
    }
  } else if (isDev && !isLocal) {
    const globalParcelRes = await getData(
      globalParcelURL,
      "/global/parcels",
      staticGlobalParcels
    )
    const result = { globalParcelRes }
    return {
      props: result,
    }
  } else if (isLocal) {
    const globalParcelRes = staticGlobalParcels
    const result = { globalParcelRes }
    return {
      props: result,
    }
  }
}

const Parcels = (props: Props) => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const { globalParcelRes } = props

  const pageTitle = "DCL-Metrics Parcels"
  const description =
    "Discover valuable metrics and data-driven insights that highlight the value and potential of individual parcels and entire regions within Decentraland."
  const image = `${siteUrl}/images/parcels.png`

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
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`} mb="4">
        <AvgTimeSpentParcel parcel={globalParcelRes} />
        <LogInTimeSpentParcel parcel={globalParcelRes} />
        <AFKTimeSpentParcel parcel={globalParcelRes} />
        <LogOutTimeSpentParcel parcel={globalParcelRes} />
        <MostVisitedParcel parcel={globalParcelRes} />
      </Grid>
    </Layout>
  )
}

export default Parcels
