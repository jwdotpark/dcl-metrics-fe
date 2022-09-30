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

  // create a table component that contains res[selectedScene] data

  return (
    <Box>
      <SceneSelector
        res={res}
        selectedScene={selectedScene}
        setSelectedScene={setSelectedScene}
      />
      <TableContainer>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Property</Th>
              <Th isNumeric>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td>Visitors</Td>
              <Td isNumeric>{visitors}</Td>
            </Tr>
            <Tr>
              <Td>Share of Global Visitors</Td>
              <Td isNumeric>{share_of_global_visitors}</Td>
            </Tr>
            <Tr>
              <Td>Average Time Spent</Td>
              <Td isNumeric>{avg_time_spent}</Td>
            </Tr>
            <Tr>
              <Td>Average Time Spent AFK</Td>
              <Td isNumeric>{avg_time_spent_afk}</Td>
            </Tr>
            <Tr>
              <Td>Total Logins</Td>
              <Td isNumeric>{total_logins}</Td>
            </Tr>
            <Tr>
              <Td>Unique Logins</Td>
              <Td isNumeric>{unique_logins}</Td>
            </Tr>
            <Tr>
              <Td>Total Logouts</Td>
              <Td isNumeric>{total_logouts}</Td>
            </Tr>
            <Tr>
              <Td>Unique Logouts</Td>
              <Td isNumeric>{unique_logouts}</Td>
            </Tr>
            <Tr>
              <Td>Complete Sessions</Td>
              <Td isNumeric>{complete_sessions}</Td>
            </Tr>
            <Tr>
              <Td>Average Complete Session Duration</Td>
              <Td isNumeric>{avg_complete_session_duration}</Td>
            </Tr>
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default SceneTable
