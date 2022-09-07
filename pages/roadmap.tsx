import {
  useBreakpointValue,
  Grid,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import GridBox from "../src/components/local/GridBox"
import Changelog from "../src/components/local/change/changelog/Changelog"
import RoadMap from "../src/components/local/change/roadmap/RoadMap"

const Roadmap = () => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })

  return (
    <Layout>
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <GridBox box={box}>
          <RoadMap />
          {/* <Tabs variant="line" size="md" align="center" isFitted>
            <TabList>
              <Tab>Roadmap</Tab>
              <Tab>Changelog</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <RoadMap />
              </TabPanel>
              <TabPanel>
                <Changelog />
              </TabPanel>
            </TabPanels>
          </Tabs> */}
        </GridBox>
        <GridBox box={box}>
          <Changelog />
        </GridBox>
      </Grid>
    </Layout>
  )
}

export default Roadmap
