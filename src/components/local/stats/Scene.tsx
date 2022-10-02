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
import SceneMarathonUsers from "./partials/SceneMarathonUsers"
import SceneTimeSpentHistogram from "./partials/SceneTimeSpentHistogram"

const Scene = ({ res }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

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
          </Flex>
        </Flex>
        <Box ml="6">
          <Text fontSize="sm" color="gray.500">
            Top 10 populated scene in the Decentraland
          </Text>
        </Box>

        <Box>
          <Flex>
            <Box w="33%" minH="100%" m="4">
              <SceneMap url={map_url} />
            </Box>
            <Box w="33%" h="100%" m="4">
              <Scenetable
                res={res}
                selectedScene={selectedScene}
                setSelectedScene={setSelectedScene}
              />
            </Box>
            <Box w="33%" minH="100%" m="4">
              <SceneMarathonUsers data={res[selectedScene].marathon_users} />
            </Box>
          </Flex>
          <Flex>
            <Box w="100%" minH="100%" m="4">
              <Text>each scenes time_spent_histogram</Text>
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
