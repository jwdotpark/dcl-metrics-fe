import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import type { NextPage } from "next"
import { Grid, useBreakpointValue } from "@chakra-ui/react"
import staticGlobal from "../public/data/global.json"
const axios = require("axios").default

const Layout = dynamic(() => import("../src/components/layout/layout"), {
  ssr: false,
})
const MarathonUsers = dynamic(
  () => import("../src/components/local/stats/MarathonUsers"),
  { ssr: false }
)
const TopParcelsTimeSpentComponent = dynamic(
  () => import("../src/components/local/stats/TopParcelsTimeSpent"),
  { ssr: false }
)
const UniqueVisitors = dynamic(
  () => import("../src/components/local/stats/UniqueVisitors"),
  { ssr: false }
)
const Explorers = dynamic(
  () => import("../src/components/local/stats/Explorers"),
  { ssr: false }
)
const RecentExplorers = dynamic(
  () => import("../src/components/local/stats/RecentExplorers"),
  { ssr: false }
)
const TotalVisitedParcels = dynamic(
  () => import("../src/components/local/stats/TotalVisitedParcels"),
  { ssr: false }
)
const RecentMarathonUsers = dynamic(
  () => import("../src/components/local/stats/RecentMarathonUsers"),
  { ssr: false }
)
const TopLogins = dynamic(
  () => import("../src/components/local/stats/TopLogins"),
  { ssr: false }
)
const TopLogouts = dynamic(
  () => import("../src/components/local/stats/TopLogouts"),
  { ssr: false }
)

export async function getStaticProps() {
  const day = 60 * 60 * 24
  if (process.env.NODE_ENV === "production") {
    const url = "http://api.dcl-metrics.com/global"
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
  // const [data, setData] = useState(ISR)
  const [isDataLoading, setIsDataLoading] = useState(false)

  // useEffect(() => {
  //   if (process.env.NEXT_PUBLIC_ENV === "prod") {
  //     // @ts-ignore
  //     setData(ISR)
  //   }
  //   // eslint-disable-next-line
  // }, [])

  // @ts-ignore
  const result = ISR.ISR

  const gridColumn = useBreakpointValue({ md: 1, lg: 2, xl: 2 })

  return (
    <Layout>
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <UniqueVisitors res={result.global} visitorLoading={isDataLoading} />
        <TotalVisitedParcels
          res={result.global}
          visitorLoading={isDataLoading}
        />
        <MarathonUsers
          res={result.users.daily.time_spent}
          isLoading={isDataLoading}
        />
        <RecentMarathonUsers
          res={result.users.daily.time_spent}
          isLoading={isDataLoading}
        />
        <Explorers
          res={result.users.top.parcels_visited}
          isLoading={isDataLoading}
        />
        <RecentExplorers
          res={result.users.daily.parcels_visited}
          isLoading={isDataLoading}
        />
        <TopParcelsTimeSpentComponent
          parcel={result.parcels.top.time_spent}
          isParcelLoading={isDataLoading}
        />
        <TopLogins
          parcel={result.parcels.top.time_spent}
          isParcelLoading={isDataLoading}
        />
        <TopLogouts
          parcel={result.parcels.top.time_spent}
          isParcelLoading={isDataLoading}
        />
      </Grid>
    </Layout>
  )
}

export default GlobalPage
