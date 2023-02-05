import { useBreakpointValue, Grid, useColorModeValue } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
//import GridBox from "../src/components/local/GridBox"
import BoxWrapper from "../src/components/layout/local/BoxWrapper"
import Changelog from "../src/components/local/change/changelog/Changelog"
import RoadMap from "../src/components/local/change/roadmap/RoadMap"

const Roadmap = () => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })

  return (
    <Layout>
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`}>
        <BoxWrapper colSpan={1}>
          <RoadMap />
        </BoxWrapper>
        <BoxWrapper colSpan={1}>
          <Changelog />
        </BoxWrapper>
      </Grid>
    </Layout>
  )
}

export default Roadmap
