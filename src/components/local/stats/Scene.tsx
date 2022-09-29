import {
  Image,
  Flex,
  Square,
  Text,
  Box,
  useColorModeValue,
  Center,
  Select,
} from "@chakra-ui/react"
import { useState } from "react"
import GridBox from "../GridBox"
import SceneMap from "./partials/SceneMap"
import Scenetable from "./partials/SceneTable"
import SceneSelector from "./partials/SceneSelector"

const Scene = ({ res }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const [selectedScene, setSelectedScene] = useState(2)

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

  return (
    <Box mb="4">
      <GridBox box={box}>
        <Flex position="relative" mt="4" mx="5">
          <Flex w="100%" mt="4">
            <Box>
              <Text fontSize="2xl">
                <b>Top {selectedScene + 1} Scene</b>
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Box ml="6">
          <Text fontSize="sm" color="gray.500">
            Most busy scene in the Decentraland
          </Text>
        </Box>

        <Box>
          <Flex>
            <Box w="25%" h="100%">
              <SceneMap url={map_url} />
            </Box>
            <Box boxSize="40%" m="2" mt="4" mr="4">
              <SceneSelector />
              <Scenetable
                res={res}
                selectedScene={selectedScene}
                setSelectedScene={setSelectedScene}
              />
            </Box>
          </Flex>
        </Box>
      </GridBox>
    </Box>
  )
}

export default Scene
