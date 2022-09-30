import {
  Box,
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
import CountUp from "react-countup"
import RoadMap from "../../change/roadmap/RoadMap"
import SceneSelector from "./SceneSelector"

const SceneTable = ({ res, selectedScene, setSelectedScene }) => {
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
    <Box>
      <SceneSelector
        res={res}
        selectedScene={selectedScene}
        setSelectedScene={setSelectedScene}
      />
      <TableContainer>
        <Table size="sm" variant="striped">
          <TableCaption>Stats in this scene</TableCaption>
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th isNumeric>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Visitors</Td>
              <Td isNumeric>
                <CountUp end={visitors} duration={0.5} />
              </Td>
            </Tr>
            <Tr>
              <Td>Share of Global Visitors</Td>
              <Td isNumeric>
                <CountUp
                  end={share_of_global_visitors}
                  duration={0.5}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>Average Time Spent</Td>
              <Td isNumeric>
                <CountUp end={avg_time_spent} duration={0.5} />
              </Td>
            </Tr>
            <Tr>
              <Td>Average Time Spent AFK</Td>
              <Td isNumeric>
                <CountUp
                  end={avg_time_spent_afk}
                  duration={0.5}
                />
              </Td>
            </Tr>
            <Tr>
              <Td>Total Logins</Td>
              <Td isNumeric>
                <CountUp end={total_logins} duration={0.5} />
              </Td>
            </Tr>
            <Tr>
              <Td>Unique Logins</Td>
              <Td isNumeric>
                <CountUp end={unique_logins} duration={0.5} />
              </Td>
            </Tr>
            <Tr>
              <Td>Total Logouts</Td>
              <Td isNumeric>
                <CountUp end={total_logouts} duration={0.5} />
              </Td>
            </Tr>
            <Tr>
              <Td>Unique Logouts</Td>
              <Td isNumeric>
                <CountUp end={unique_logouts} duration={0.5} />
              </Td>
            </Tr>
            <Tr>
              <Td>Complete Sessions</Td>
              <Td isNumeric>
                <CountUp end={complete_sessions} duration={0.5} />
              </Td>
            </Tr>
            <Tr>
              <Td>Average Complete Session Duration</Td>
              <Td isNumeric>
                <CountUp
                  end={avg_complete_session_duration}
                  duration={0.5}
                />
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default SceneTable
