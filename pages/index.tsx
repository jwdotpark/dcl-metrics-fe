import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import type { NextPage } from "next"
import { Box, Grid, useBreakpointValue } from "@chakra-ui/react"
import staticGlobal from "../public/data/global_response.json"
// import tempGlobal from "../public/data/global.json"
const axios = require("axios").default

import Layout from "../src/components/layout/layout"
// const Layout = dynamic(() => import("../src/components/layout/layout"), {
//   ssr: false,
// })
import UniqueVisitors from "../src/components/local/stats/UniqueVisitors"
// const UniqueVisitors = dynamic(
//   () => import("../src/components/local/stats/UniqueVisitors"),
//   { ssr: false }
// )
import VisitedParcels from "../src/components/local/stats/VisitedParcels"
// const VisitedParcels = dynamic(
//   () => import("../src/components/local/stats/VisitedParcels"),
//   { ssr: false }
// )
import MarathonUsers from "../src/components/local/stats/MarathonUsers"
// const MarathonUsers = dynamic(
//   () => import("../src/components/local/stats/MarathonUsers"),
//   { ssr: false }
// )
import Explorer from "../src/components/local/stats/Explorer"
// const Explorer = dynamic(
//   () => import("../src/components/local/stats/Explorer"),
//   { ssr: false }
// )
// const Explorers = dynamic(
//   () => import("../src/components/local/stats/Explorers"),
//   { ssr: false }
// )
// const RecentExplorers = dynamic(
//   () => import("../src/components/local/stats/RecentExplorers"),
//   { ssr: false }
// )
// const RecentMarathonUsers = dynamic(
//   () => import("../src/components/local/stats/RecentMarathonUsers"),
//   { ssr: false }
// )
import TopParcelsTimeSpentComponent from "../src/components/local/stats/TopParcelsTimeSpent"
// const TopParcelsTimeSpentComponent = dynamic(
//   () => import("../src/components/local/stats/TopParcelsTimeSpent"),
//   { ssr: false }
// )
const TopLogins = dynamic(
  () => import("../src/components/local/stats/TopLogins"),
  { ssr: false }
)
const TopLogouts = dynamic(
  () => import("../src/components/local/stats/TopLogouts"),
  { ssr: false }
)
import TempError from "../src/components/local/TempError"

export async function getStaticProps() {
  const day = 60 * 60 * 24
  if (process.env.NEXT_PUBLIC_ENV === "prod") {
    // FIXME now it's using staging server res,
    // change to prod later

    // const url = "http://api.dcl-metrics.com/global"
    const url = "https://dcl-metrics-be-staging.herokuapp.com/global"
    const response = await axios.get(url, {
      method: "get",
      proxy: {
        protocol: "http",
        host: process.env.FIXIE_HOST,
        port: 80,
        auth: {
          username: "fixie",
          password: process.env.FIXIE_TOKEN,
        },
      },
    })
    const ISR = response.data
    return {
      props: { ISR },
      revalidate: day,
    }
  } else {
    const ISR = staticGlobal
    return {
      props: { ISR },
      revalidate: day,
    }
  }
}

const GlobalPage: NextPage = (ISR) => {
  const [isDataLoading, setIsDataLoading] = useState(false)

  // @ts-ignore
  const result = ISR.ISR

  const gridColumn = useBreakpointValue({
    md: 1,
    lg: 2,
    xl: 2,
  })
  
  return (
    <Layout>
      {/* <TempError /> */}
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <UniqueVisitors data={result.global} visitorLoading={isDataLoading} />
        <VisitedParcels data={result.global} visitorLoading={isDataLoading} />
        <MarathonUsers res={result.users} isLoading={isDataLoading} />
        <Explorer res={result.users} isLoading={isDataLoading} />
        <TopParcelsTimeSpentComponent
          parcel={result.parcels}
          isParcelLoading={isDataLoading}
        />
        {/* <TopLogins
          parcel={result.parcels.top.time_spent}
          isParcelLoading={isDataLoading}
        />
        <TopLogouts
          parcel={result.parcels.top.time_spent}
          isParcelLoading={isDataLoading}
        /> */}
      </Grid>
    </Layout>
  )
}

export default GlobalPage
