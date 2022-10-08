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
import SceneBarChart from "./SceneBarChart"
import SceneParcelsHeatmap from "./SceneParcelsHeatmap"

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

  console.log(parcels_heatmap)

  return (
    <Box
      w="100%"
      h="395px"
      // h="400px"
      bg={useColorModeValue("gray.100", "gray.700")}
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius="xl"
      shadow="md"
    >
      <SceneParcelsHeatmap data={parcels_heatmap} />
      {/* <SceneBarChart data={res[selectedScene]} /> */}
      {/* <StatBox data={res[selectedScene]} /> */}
    </Box>
  )
}

export default SceneStats
