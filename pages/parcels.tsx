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
  time,
} from "../src/lib/data/constant"
import { getData, getDataWithProxy, writeFile } from "../src/lib/data/fetch"

export async function getStaticProps() {
  if (isProd) {
    const globalParcelRes = await getDataWithProxy(
      globalParcelURL,
      "/global/parcels",
      staticGlobalParcels
    )

    writeFile("staticGlobalParcels", globalParcelRes)

    const result = { globalParcelRes }
    return {
      props: result,
      revalidate: time,
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
      revalidate: time,
    }
  } else if (isLocal) {
    const globalParcelRes = staticGlobalParcels
    const result = { globalParcelRes }
    return {
      props: result,
      revalidate: time,
    }
  }
}

const Parcels = (props: Props) => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })
  const { globalParcelRes } = props

  return (
    <Layout>
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
