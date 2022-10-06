import {
  Box,
  Container,
  SimpleGrid,
  useColorModeValue,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tfoot,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react"
import StatBox from "./SceneStatBox"
import CountUp from "react-countup"
import RoadMap from "../../change/roadmap/RoadMap"
import SceneSelector from "./SceneSelector"

const SceneStats = ({ res, selectedScene, setSelectedScene }) => {
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
    <Box
      w="100%"
      // border="2px solid"
      // borderColor={useColorModeValue("gray.400", "gray.700")}
      // borderRadius="md"
      // shadow="md"
    >
      <StatBox data={res[selectedScene]} />
    </Box>
  )
}

export default SceneStats
