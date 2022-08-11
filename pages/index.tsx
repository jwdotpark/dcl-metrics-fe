import { useState, useEffect } from "react"
import dynamic from "next/dynamic"
import type { NextPage } from "next"
import { Grid, useBreakpointValue } from "@chakra-ui/react"
import staticGlobal from "../public/data/global.json"

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

const GlobalPage: NextPage = () => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 2, xl: 2 })

  const [data, setData] = useState(staticGlobal)
  const [isDataLoading, setIsDataLoading] = useState(false)

  const fetchData = async () => {
    setIsDataLoading(true)
    const response = await fetch("/api/fetch/global")
    const result = await response.json()
    setData(result.data)
    setIsDataLoading(false)
  }

  useEffect(() => {
    if (process.env.ENV === "prod") {
      fetchData()
    }
  }, [])

  return (
    <Layout>
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <UniqueVisitors res={data.global} visitorLoading={isDataLoading} />
        <TotalVisitedParcels res={data.global} visitorLoading={isDataLoading} />
        <MarathonUsers
          res={data.users.daily.time_spent}
          isLoading={isDataLoading}
        />
        <RecentMarathonUsers
          res={data.users.daily.time_spent}
          isLoading={isDataLoading}
        />
        <Explorers
          res={data.users.top.parcels_visited}
          isLoading={isDataLoading}
        />
        <RecentExplorers
          res={data.users.daily.parcels_visited}
          isLoading={isDataLoading}
        />
        <TopParcelsTimeSpentComponent
          parcel={data.parcels.top.time_spent}
          isParcelLoading={isDataLoading}
        />
        <TopLogins
          parcel={data.parcels.top.time_spent}
          isParcelLoading={isDataLoading}
        />
        <TopLogouts
          parcel={data.parcels.top.time_spent}
          isParcelLoading={isDataLoading}
        />
      </Grid>
    </Layout>
  )
}

export default GlobalPage
