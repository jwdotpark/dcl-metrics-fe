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
import { NextSeo } from "next-seo"

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
      <NextSeo
        title={metaData.title}
        description={metaData.description}
        openGraph={{
          url: siteUrl + "/parcels",
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
