import { Box, useColorModeValue } from "@chakra-ui/react"
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

  return (
    <SceneParcelsHeatmap data={parcels_heatmap} selectedScene={selectedScene} />
  )
}

export default SceneStats
