import {
  Image,
  Flex,
  Square,
  Text,
  Box,
  useColorModeValue,
  Center,
} from "@chakra-ui/react"
import { useState } from "react"
import GridBox from "../GridBox"
import SceneMap from "./partials/SceneMap"

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
        <Box>
          <Flex>
            <Box boxSize="40%">
              <SceneMap url={map_url} />
            </Box>
            <Box boxSize="40%">{name}</Box>
          </Flex>
        </Box>
      </GridBox>
    </Box>
  )
}

export default Scene
