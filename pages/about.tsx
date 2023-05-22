import { useBreakpointValue, Grid, GridItem } from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import AboutList from "../src/components/about/"

const About = () => {
  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 1, base: 1 })

  return (
    <Layout>
      <Grid gap={4} templateColumns={`repeat(${gridColumn}, 1fr)`}>
        <GridItem w="100%" h="auto" borderRadius="xl" shadow="md">
          <AboutList />
        </GridItem>
      </Grid>
    </Layout>
  )
}

export default About
