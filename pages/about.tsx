import {
  Image,
  Text,
  Box,
  useBreakpointValue,
  Grid,
  useColorModeValue,
} from "@chakra-ui/react"
import Layout from "../src/components/layout/layout"
import GridBox from "../src/components/local/GridBox"

const About = () => {
  const box = {
    h: "500px",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const gridColumn = useBreakpointValue({ md: 1, lg: 1, xl: 2 })

  return (
    <Layout>
      <Grid templateColumns={`repeat(${gridColumn}, 1fr)`} gap={4}>
        <GridBox box={box}>
          <Box p="4">
            <Text fontSize="md" m="2" my="4">
              In the past year Decentraland has seen wild growth: casinos, P2E
              games, event venues, real estate companies, ad agencies and more
              are terraforming the metaverse, changing it from an endless
              expanse of auto-generated shrubs to a living, breathing world.
            </Text>
            <Text fontSize="md" m="2" my="4">
              On top of that, there is the foundation, tasked with building the
              tools to keep it running and the DAO which, as a community, makes
              choices which affect Decentraland&apos;s future.
            </Text>

            <Text fontSize="md" m="2" my="4">
              It is critically important for each of these groups to understand
              their audience in order to make the best possible decisions - and
              we have the means to do that! The web3 world is literally made of
              data, but it&apos;s difficult to understand and access without
              building your own solution to acquire and interpret it.
            </Text>
            <Text fontSize="md" m="2" my="4">
              DCL-Metrics aims to make that data accessible so it can be used by
              the community to build a better metaverse.
            </Text>
          </Box>
        </GridBox>
        <GridBox box={box}>
          <Image
            borderRadius="md"
            src="/images/background2.png"
            alt="about image"
            boxSize="full"
            objectFit="cover"
          />
        </GridBox>
      </Grid>
    </Layout>
  )
}

export default About
