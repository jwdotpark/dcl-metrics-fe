import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import type { NextPage } from "next"
import { Grid, useBreakpointValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
// functions
import { fetchResult } from "../src/lib/hooks/fetch"
// components
// import TopUsersTimeSpentComponent from "../src/components/local/stats/TopUsersTimeSpent"
// import TopUsersTimeSpentComponent2 from "../src/components/local/stats/TopUsersTimeSpent2"
const TopUsersTimeSpentComponent = dynamic(
  () => import("../src/components/local/stats/TopUsersTimeSpent"),
  { ssr: false }
)
const TopParcelsTimeSpentComponent = dynamic(
  () => import("../src/components/local/stats/TopParcelsTimeSpent"),
  { ssr: false }
)
import UniqueVisitors from "../src/components/local/stats/UniqueVisitors"

// charts
import LineChartComponent from "../src/components/chart/LineChartComponent"
import PieChartComponent from "../src/components/chart/PieChartComponent"
import BarChartComponent from "../src/components/chart/BarChartComponent"

const GlobalPage: NextPage = () => {
  const [isLoading, setIsLoading] = useState(false)

  const box = {
    h: "600",
    w: "100%",
    bg: "white",
  }

  const gridColumn = useBreakpointValue({ md: 1, lg: 2, xl: 2 })

  return (
    <Layout>
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <TopUsersTimeSpentComponent
          box={box}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <TopParcelsTimeSpentComponent
          // box={box}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <UniqueVisitors
          // box={box}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />

        {/* <LineChartComponent box={box} /> */}
        {/* <PieChartComponent /> */}
        {/* <BarChartComponent /> */}
      </Grid>
    </Layout>
  )
}

export default GlobalPage
