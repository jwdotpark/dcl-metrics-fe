import type { NextPage } from "next"
import { Grid, GridItem } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import DashboardBox from "../src/components/local/GridBox"

const About = () => {
  return (
    <Layout>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        About Page
      </Grid>
    </Layout>
  )
}

export default About
