import type { NextPage } from "next"
import { Grid, GridItem } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import DashboardBox from "../src/components/local/DashboardBox"

const GlobalPage: NextPage = () => {
  const box = {
    height: "300px",
  }
  return (
    <Layout>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <DashboardBox height={box.height}>1</DashboardBox>
        <DashboardBox height={box.height}>2</DashboardBox>
      </Grid>
    </Layout>
  )
}

export default GlobalPage
