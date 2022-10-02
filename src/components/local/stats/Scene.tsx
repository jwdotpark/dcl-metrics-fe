import {
  Image,
  Flex,
  Square,
  Text,
  Box,
  useColorModeValue,
  Center,
  Select,
  useBreakpointValue,
} from "@chakra-ui/react"
import { useState } from "react"
import GridBox from "../GridBox"
import SceneMap from "./partials/SceneMap"
import Scenetable from "./partials/SceneTable"
import SceneMarathonUsers from "./partials/SceneMarathonUsers"
import SceneTimeSpentHistogram from "./partials/SceneTimeSpentHistogram"
import SceneSelector from "./partials/SceneSelector"

const Scene = ({ res }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const breakpoint = useBreakpointValue({
    sm: "100%",
    md: "100%",
    lg: "50%",
    xl: "50%",
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

  // 1. marathon users
  // 2. time spent histogram
  // 3. parcels heatmap

  return (
    <Box mb="4">
      <GridBox box={box}>
        <Flex position="relative" mt="4" mx="5">
          <Flex w="100%" mt="4">
            <Box>
              <Text fontSize="2xl">
                <b>{name}</b>
              </Text>
            </Box>
            <Box position="absolute" top="2" right="0">
              <SceneSelector
                res={res}
                name={name}
                selectedScene={selectedScene}
                setSelectedScene={setSelectedScene}
              />
            </Box>
          </Flex>
        </Flex>
        <Box ml="6">
          <Text fontSize="sm" color="gray.500">
            Most populated scene in the Decentraland
          </Text>
        </Box>

        <Box>
          <Flex>
            <Center
              minW="33%"
              h="auto"
              m="4"
              boxShadow="sm"
              borderRadius="md"
              overflow="clip"
              border="2px solid"
              borderColor={useColorModeValue("gray.300", "gray.500")}
            >
              <SceneMap url={map_url} />
            </Center>
            <Box
              w={breakpoint}
              h="auto"
              m="4"
              p="4"
              borderRadius="md"
              boxShadow="sm"
              border="2px solid"
              borderColor={useColorModeValue("gray.300", "gray.500")}
            >
              <Scenetable 
                res={res}
                selectedScene={selectedScene}
                setSelectedScene={setSelectedScene}
              />
            </Box>
            <Box
              w={breakpoint}
              h="auto"
              m="4"
              p="4"
              borderRadius="md"
              boxShadow="sm"
              border="2px solid"
              borderColor={useColorModeValue("gray.300", "gray.500")}
            >
              <SceneMarathonUsers data={res[selectedScene].marathon_users} />
            </Box>
          </Flex>
          <Flex>
            <Box
              w="100%"
              minH="100%"
              m="4"
              mb="6"
              p="4"
              borderRadius="md"
              boxShadow="sm"
              border="2px solid"
              borderColor={useColorModeValue("gray.300", "gray.500")}
            >
              <SceneTimeSpentHistogram
                data={res}
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
