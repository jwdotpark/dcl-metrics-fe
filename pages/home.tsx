import {
  Box,
  VStack,
  Button,
  Flex,
  Divider,
  chakra,
  Grid,
  GridItem,
  Container,
} from "@chakra-ui/react"
import type { NextPage } from "next"
import Layout from "../src/components/layout/layout"

const Home: NextPage = () => {
  return (
    <Layout>
      <Box
        as={Container}
        minW="full"
        mb="4"
        p="8"
        bg="white"
        border="1px solid gray.100"
        borderRadius="md"
        shadow="md"
      >
        <Grid
          gap={4}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
          }}
        >
          <GridItem colSpan={1}>
            <VStack alignItems="flex-start" spacing="20px">
              <chakra.h2 fontSize="3xl" fontWeight="700">
                Medium length title
              </chakra.h2>
              <Button colorScheme="green" size="md">
                Call To Action
              </Button>
            </VStack>
          </GridItem>
          <GridItem>
            <Flex>
              <chakra.p>
                Provide your customers a story they would enjoy keeping in mind
                the objectives of your website. Pay special attention to the
                tone of voice.
              </chakra.p>
            </Flex>
          </GridItem>
        </Grid>
        <Divider mt={12} mb={12} />
        <Grid
          gap={{ base: "8", sm: "12", md: "16" }}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
        >
          <Feature
            heading={"First Feature"}
            text={"Short text describing one of you features/service"}
          />
          <Feature
            heading={"Second Feature"}
            text={"Short text describing one of you features/service"}
          />
          <Feature
            heading={"Third Feature"}
            text={"Short text describing one of you features/service"}
          />
          <Feature
            heading={"Fourth Feature"}
            text={"Short text describing one of you features/service"}
          />
        </Grid>
      </Box>
      <Box
        as={Container}
        minW="full"
        p="8"
        bg="white"
        border="1px solid gray.100"
        borderRadius="md"
        shadow="md"
      >
        <Grid
          gap={4}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(2, 1fr)",
          }}
        >
          <GridItem colSpan={1}>
            <VStack alignItems="flex-start" spacing="20px">
              <chakra.h2 fontSize="3xl" fontWeight="700">
                Medium length title
              </chakra.h2>
              <Button colorScheme="green" size="md">
                Call To Action
              </Button>
            </VStack>
          </GridItem>
          <GridItem>
            <Flex>
              <chakra.p>
                Provide your customers a story they would enjoy keeping in mind
                the objectives of your website. Pay special attention to the
                tone of voice.
              </chakra.p>
            </Flex>
          </GridItem>
        </Grid>
        <Divider mt={12} mb={12} />
        <Grid
          gap={{ base: "8", sm: "12", md: "16" }}
          templateColumns={{
            base: "repeat(1, 1fr)",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          }}
        >
          <Feature
            heading={"First Feature"}
            text={"Short text describing one of you features/service"}
          />
          <Feature
            heading={"Second Feature"}
            text={"Short text describing one of you features/service"}
          />
          <Feature
            heading={"Third Feature"}
            text={"Short text describing one of you features/service"}
          />
          <Feature
            heading={"Fourth Feature"}
            text={"Short text describing one of you features/service"}
          />
        </Grid>
      </Box>
    </Layout>
  )
}

export default Home

interface FeatureProps {
  heading: string
  text: string
}

const Feature = ({ heading, text }: FeatureProps) => {
  return (
    <GridItem>
      <chakra.h3 fontSize="xl" fontWeight="600">
        {heading}
      </chakra.h3>
      <chakra.p>{text}</chakra.p>
    </GridItem>
  )
}
