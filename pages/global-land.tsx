import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import type { NextPage } from "next"
import { Grid, useBreakpointValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
// functions
import { fetchResult } from "../src/lib/hooks/fetch"
// components
import TopUsersTimeSpentComponent from "../src/components/local/stats/TopUsersTimeSpent"
// import TopUsersTimeSpentComponent2 from "../src/components/local/stats/TopUsersTimeSpent2"
const TopUsersTimeSpentComponent2 = dynamic(
  () => import("../src/components/local/stats/TopUsersTimeSpent2"),
  { ssr: false }
)
import TopParcelSceneTimeSpentComponent from "../src/components/local/stats/TopParcelSceneTimeSpent"
// charts
import LineChartComponent from "../src/components/chart/LineChartComponent"
import PieChartComponent from "../src/components/chart/PieChartComponent"
import BarChartComponent from "../src/components/chart/BarChartComponent"

const GlobalPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const box = {
    h: "450",
    w: "100%",
    bg: "white",
  }

  const gridColumn = useBreakpointValue({ md: 1, lg: 2, xl: 2 })

  // useEffect(() => {
  //   const dailyParcelUrl = "daily-parcel-stats.json"
  //   const dailyUserUrl = "daily-user-stats.json"
  //   const timeSpentUrl = "time_spent.json"
  //   setIsLoading(true)
  //   fetchResult(dailyParcelUrl).then((data) => {
  //     setDailyParcel(data)
  //   })
  //   fetchResult(dailyUserUrl).then((data) => {
  //     setDailyUser(data)
  //   })
  //   fetchResult(timeSpentUrl).then((data) => {
  //     setTimeSpent(data)
  //   })
  //   setIsLoading(false)
  // }, [])

  return (
    <Layout>
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <TopUsersTimeSpentComponent
          box={box}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <TopUsersTimeSpentComponent2
          box={box}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <TopParcelSceneTimeSpentComponent
          box={box}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <LineChartComponent />
        <PieChartComponent />
        <BarChartComponent />
      </Grid>
    </Layout>
  )
}

export default GlobalPage
