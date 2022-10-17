import {
  Image,
  Flex,
  Square,
  Text,
  Box,
  useColorModeValue,
  Center,
  useBreakpointValue,
  Spacer,
  Grid,
  GridItem,
} from "@chakra-ui/react"
import { useState } from "react"
import GridBox from "../GridBox"
import SceneMap from "./partials/scene/SceneMap"
//import SceneStats from "./partials/scene/SceneStats"
//import SceneMarathonUsers from "./partials/scene/SceneMarathonUsers"
import SceneLineChart from "./partials/scene/SceneLineChart"
import SceneSelector from "./partials/scene/SceneSelector"
import StatBox from "./partials/scene/SceneStatBox"
import SceneParcelsHeatmap from "./partials/scene/SceneParcelsHeatmap"
import SceneBarChart from "./partials/scene/SceneBarChart"
import SceneMarathonUsers from "./partials/scene/SceneMarathonUsers"

const Scene = ({ res }) => {
  const breakpoint = useBreakpointValue({
    sm: "100%",
    md: "100%",
    lg: "33%",
    xl: "33%",
  })

  const [selectedScene, setSelectedScene] = useState(0)

  const {
    name,
    map_url,
    visitors,
    share_of_global_visitors,
    avg_time_spent,
    avg_time_spent_afk,
    total_logins,
    unique_logins,
    total_logouts,
    unique_logouts,
    complete_sessions,
    avg_complete_session_duration,
    marathon_users,
    time_spent_histogram,
    parcels_heatmap,
  } = res[selectedScene]

  console.log(res)

  // 1. marathon users
  // 2. time spent histogram
  // 3. parcels heatmap

  const gridColumn = useBreakpointValue({
    md: 1,
    lg: 2,
    xl: 2,
  })

  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: false,
    lg: false,
  })

  const chartWidth = useBreakpointValue({
    base: "100%",
    sm: "100%",
    md: "100%",
    lg: "100%",
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
            <Box>
              <Text fontSize="2xl">
                <b>{name}</b>
              </Text>
            </Box>
            <Spacer />
          </Flex>
        </Flex>
        <Box ml="5">
          <Text color="gray.500" fontSize="sm">
            Most populated scene in the Decentraland yesterday
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
              h={["100%", "100%", "100%", "400px"]}
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
            mb="4"
          >
            <Box w={["100%", "100%", "100%", "35%"]}>
              <SceneParcelsHeatmap
                data={parcels_heatmap}
                selectedScene={selectedScene}
              />
            </Box>
            <Box
              w={["100%", "100%", "100%", "65%"]}
              h="400px"
              mt={[4, 0]}
              // ml="2"
            >
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
            mt="4"
          >
            <Box
              w={["100%", "100%", "100%", "35%"]}
              h="400px"
              mt={[4, 4, 8, 0]}
            >
              <SceneMarathonUsers data={res} />
            </Box>
            <Box
              w={["100%", "100%", "100%", "65%"]}
              h="400px"
              mb={[4, 4, 4, 0]}
            >
              <SceneBarChart selectedScene={selectedScene} />
            </Box>
          </Flex>
        </Box>
      </GridBox>
    </Box>
  )
}

export default Scene
