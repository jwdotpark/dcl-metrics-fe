import { useBreakpointValue, Grid, useColorModeValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import staticGlobal from "../public/data/cached_global_response.json"
import { useAtom } from "jotai"
import { DataAtom, LoadingStateAtom } from "../src/lib/hooks/atoms"

import AFKTimeSpentParcel from "../src/components/local/stats/parcels/AFKTimeSpentParcel"
import AvgTimeSpentParcel from "../src/components/local/stats/parcels/AvgTimeSpentParcel"
import LogInTimeSpentParcel from "../src/components/local/stats/parcels/LogInTimeSpentParcel"
import LogOutTimeSpentParcel from "../src/components/local/stats/parcels/LogOutTimeSpentParcel"
import MostVisitedParcel from "../src/components/local/stats/parcels/MostVisitedParcel"
import { sendNotification } from "../src/lib/hooks/sendNotification"
const axios = require("axios").default
import fs from "fs"
import {
  globalParcelURL,
  isDev,
  isLocal,
  isProd,
  time,
} from "../src/lib/data/constant"
import staticGlobalParcels from "../public/data/staticGlobalParcel.json"
import { getData, getDataWithProxy } from "../src/lib/data/fetch"

export async function getStaticProps() {
  if (isProd) {
    const globalParcelRes = await getDataWithProxy(
      globalParcelURL,
      "/global/parcels",
      staticGlobalParcels
    )
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
  //const day = 60 * 60 * 24 * 365
  //const isProd = process.env.NEXT_PUBLIC_STAGING === "false"

  //const url = isProd
  //  ? process.env.NEXT_PUBLIC_PROD_ENDPOINT + "global"
  //  : process.env.NEXT_PUBLIC_DEV_ENDPOINT + "global"

  //// TODO refactor point
  //if (process.env.NEXT_PUBLIC_STAGING === "false") {
  //  const response = await axios
  //    .get(url, {
  //      method: "get",
  //      proxy: {
  //        protocol: "http",
  //        host: process.env.FIXIE_HOST,
  //        port: 80,
  //        auth: {
  //          username: "fixie",
  //          password: process.env.FIXIE_TOKEN,
  //        },
  //      },
  //    })
  //    .catch((error) => {
  //      console.log(error)
  //      return { props: { data: staticGlobal }, revalidate: day }
  //    })

  //  if (response.status !== 200) {
  //    sendNotification(response, "global", "error")
  //  }

  //  const data = response.data
  //  return {
  //    props: { data },
  //    revalidate: day,
  //  }

  //  // staging endpoint
  //} else if (
  //  process.env.NEXT_PUBLIC_STAGING === "true" &&
  //  process.env.LOCAL !== "true"
  //) {
  //  const response = await fetch(url)
  //  const data = await response.json()

  //  if (response.status !== 200) {
  //    sendNotification(response, "global", "error")
  //    return {
  //      props: { data: staticGlobal },
  //      revalidate: day,
  //    }
  //  }
  //  return {
  //    props: { data },
  //    revalidate: day,
  //  }
  //  // use static data
  //} else {
  //  const data = staticGlobal
  //  return {
  //    props: { data },
  //    revalidate: day,
  //  }
  //}
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
