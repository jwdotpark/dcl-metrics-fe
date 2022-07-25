import type { NextPage } from "next"
import { Grid, GridItem } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import DashboardBox from "../src/components/local/GridBox"
import LineChartComponent from "../src/components/chart/LineChartComponent"
import PieChartComponent from "../src/components/chart/PieChartComponent"
import BarChartComponent from "../src/components/chart/BarChartComponent"

const SingleLand = () => {
  const box = {
    height: "300px",
  }
  return (
    <Layout>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {/* <LineChartComponent /> */}
        {/* <PieChartComponent /> */}
        {/* <BarChartComponent /> */}
      </Grid>
    </Layout>
  )
}

export default SingleLand
