import {
  Text,
  useBreakpointValue,
  Grid,
  useColorModeValue,
  Box,
  Switch,
  Button,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import GridBox from "../src/components/local/GridBox"
import MinorChange from "../src/components/local/changelog/MinorChange"
import MajorChange from "../src/components/local/changelog/MajorChange"
import { majorchangeTemplate } from "../src/components/local/changelog/majorchange"

const Roadmap = () => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 1 })

  return (
    <Layout>
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <GridBox box={box}>
          <Tabs variant="line" size="md" align="center" isFitted>
            <TabList>
              <Tab>Roadmap</Tab>
              <Tab>Changelog</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <MajorChange milestones={majorchangeTemplate} />
              </TabPanel>
              <TabPanel>
                <MinorChange />
              </TabPanel>
            </TabPanels>
          </Tabs>
          {/* <MajorChange milestones={majorchangeTemplate} /> */}
        </GridBox>
        {/* <GridBox box={box}>
          <MinorChange />
        </GridBox> */}
      </Grid>
    </Layout>
  )
}

export default Roadmap
