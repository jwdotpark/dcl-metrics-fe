import type { NextPage } from "next"
import { Box, Grid, GridItem, useBreakpointValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import LineChartComponent from "../src/components/chart/LineChartComponent"
import PieChartComponent from "../src/components/chart/PieChartComponent"
import BarChartComponent from "../src/components/chart/BarChartComponent"

const GlobalPage: NextPage = () => {
  const box = {
    h: "450",
    w: "100%",
    bg: "white",
  }

  const gridColumn = useBreakpointValue({ sm: 1, lg: 2 })

  return (
    <Layout>
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <LineChartComponent />
        <PieChartComponent />
        <BarChartComponent />
        {/* <GridItem h={box.h} bg={box.bg} borderRadius="md" boxShadow="md" /> */}
      </Grid>
    </Layout>
  )
}

export default GlobalPage
