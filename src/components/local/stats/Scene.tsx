import {
  Flex,
  Text,
  Box,
  useColorModeValue,
  useBreakpointValue,
  Spacer,
} from "@chakra-ui/react"
import { useState } from "react"
import GridBox from "../GridBox"
import SceneMap from "./partials/scene/SceneMap"
import SceneLineChart from "./partials/scene/SceneLineChart"
import SceneSelector from "./partials/scene/SceneSelector"
import StatBox from "./partials/scene/SceneStatBox"
import SceneParcelsHeatmap from "./partials/scene/SceneParcelsHeatmap"
import SceneBarChart from "./partials/scene/SceneBarChart"
import SceneMarathonUsers from "./partials/scene/SceneMarathonUsers"
import moment from "moment"

const Scene = ({ res }) => {
  const [selectedScene, setSelectedScene] = useState(0)
  const {
    name,
    map_url,
    marathon_users,
    parcels_heatmap,
    visitors_by_hour_histogram,
  } = res[selectedScene]

  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  })

  const box = {
    h: "100%",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  return (
    <Box h="100%" mb="4">
      <GridBox box={box}>
        {/* title */}
        <Flex pos="relative" mx="5">
          <Flex direction={isMobile ? "column" : "row"} w="100%" mt="4">
            <Flex direction={["column", "row"]} w="100%">
              <Box>
                <Text fontSize="2xl">
                  <b>{name}</b>
                </Text>
              </Box>
              <Spacer />
            </Flex>
            <Spacer />
          </Flex>
        </Flex>
        <Box ml="5" mx="6">
          <Text color="gray.500" fontSize="sm">
            Most populated scene in Decentraland on{" "}
            <i>{moment(res[selectedScene].date).format("dddd MMM. Do YYYY")}</i>
          </Text>
        </Box>

        {/* components */}
        <Box m="4">
          <Flex
            sx={{
              "& > * + *": {
                ml: [0, 0, 0, 4],
                mt: [4, 4, 4, 0],
              },
            }}
            direction={["column", "column", "column", "row"]}
            w="100%"
            h="auto"
            mb="4"
          >
            <Box w={["100%", "100%", "100%", "35%"]}>
              <Box mb="2">
                <SceneSelector
                  res={res}
                  name={name}
                  selectedScene={selectedScene}
                  setSelectedScene={setSelectedScene}
                />
              </Box>
              <SceneMap url={map_url} />
            </Box>
            <Box
              w={["100%", "100%", "100%", "65%"]}
              h={["100%", "100%", "100%", "450px"]}
              mt={[4, 4, 4, 0]}
            >
              <StatBox
                data={res[selectedScene]}
                selectedScene={selectedScene}
              />
            </Box>
          </Flex>
          <Flex
            sx={{
              "& > * + *": {
                ml: [0, 0, 0, 4],
                mt: [4, 4, 4, 0],
              },
            }}
            direction={["column", "column", "column", "row"]}
            w="100%"
            h="auto"
            // mb={[4, 0, 4, 4]}
            mb="4"
          >
            <Box w={["100%", "100%", "100%", "35%"]}>
              <SceneParcelsHeatmap
                data={parcels_heatmap}
                selectedScene={selectedScene}
              />
            </Box>
            <Box w={["100%", "100%", "100%", "65%"]} h="435px" mt={[4, 4, 0]}>
              <SceneLineChart data={res} selectedScene={selectedScene} />
            </Box>
          </Flex>
          <Flex
            sx={{
              "& > * + *": {
                ml: [0, 0, 0, 4],
                mt: [4, 4, 4, 0],
              },
            }}
            direction={["column", "column", "column", "row"]}
            w="100%"
            h="auto"
          >
            <Box w={["100%", "100%", "100%", "50%"]} h="520" mt={[4, 4, 8, 0]}>
              <SceneMarathonUsers data={marathon_users} />
            </Box>
            <Box
              w={["100%", "100%", "100%", "50%"]}
              h="520px"
              mb={[4, 4, 4, 0]}
            >
              <SceneBarChart
                visitors_by_hour_histogram={visitors_by_hour_histogram}
                selectedScene={selectedScene}
              />
            </Box>
          </Flex>
        </Box>
      </GridBox>
    </Box>
  )
}

export default Scene
