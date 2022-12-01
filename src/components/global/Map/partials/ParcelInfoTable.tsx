import {
  Text,
  Table,
  Tr,
  Tbody,
  Td,
  TableContainer,
  Box,
  Button,
  useColorModeValue,
} from "@chakra-ui/react"
import moment from "moment"

const ParcelInfoTable = ({ selectedParcel, description, external_url }) => {
  const { id, updatedAt, owner } = selectedParcel
  // const { name, visitors, deploys } = selectedParcel.scene

  return (
    <TableContainer p="2" whiteSpace="pre-wrap">
      <Table
        h="100%"
        fontSize="xs"
        colorScheme="gray"
        size="sm"
        // variant="striped"
      >
        <Tbody>
          <Tr>
            <Td>Coordinate</Td>
            <Td isNumeric>
              <a target="_blank" rel="noopener noreferrer" href={external_url}>
                <Text
                  fontWeight="medium"
                  _hover={{ color: useColorModeValue("gray.800", "gray.400") }}
                >
                  [{id}]
                </Text>
              </a>
            </Td>
          </Tr>
          {selectedParcel.scene && (
            <>
              <Tr>
                <Td>Scene Name</Td>
                <Td isNumeric>
                  <Text wordBreak="break-all" noOfLines={1}>
                    {selectedParcel.scene.name}
                  </Text>
                </Td>
              </Tr>
              <Tr>
                <Td>Visitors</Td>
                <Td isNumeric>
                  <Text as="kbd">{selectedParcel.scene.visitors}</Text>
                </Td>
              </Tr>
              <Tr>
                <Td>Deployed</Td>
                <Td isNumeric>
                  <Text as="kbd">{selectedParcel.scene.deploys}</Text>
                </Td>
              </Tr>
            </>
          )}
          <Tr>
            <Td>Owner</Td>
            <Td isNumeric>
              <Text as="kbd" wordBreak="break-all" noOfLines={1}>
                {owner}
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Td>Description</Td>
            <Td isNumeric>{description ? description : "N/A"}</Td>
          </Tr>
          {selectedParcel.total_visitors ? (
            <>
              <Tr>
                <Td>Total Visitors</Td>
                <Td isNumeric>
                  <Text>
                    {selectedParcel.total_visitors &&
                      selectedParcel.total_visitors}
                  </Text>
                </Td>
              </Tr>

              <Tr>
                <Td>Total AVG Time Spent</Td>
                <Td isNumeric>
                  <Text>
                    {selectedParcel.total_avg_time_spent &&
                      selectedParcel.total_avg_time_spent}
                  </Text>
                </Td>
              </Tr>

              <Tr>
                <Td>Total Logins</Td>
                <Td isNumeric>
                  <Text>
                    {selectedParcel.total_logins && selectedParcel.total_logins}
                  </Text>
                </Td>
              </Tr>

              <Tr>
                <Td>Total Logouts</Td>
                <Td isNumeric>
                  <Text>
                    {selectedParcel.total_logouts &&
                      selectedParcel.total_logouts}
                  </Text>
                </Td>
              </Tr>

              <Tr>
                <Td>Total AVG Time Spent AFK</Td>
                <Td isNumeric>
                  <Text>
                    {selectedParcel.total_avg_time_spent_afk &&
                      selectedParcel.total_avg_time_spent_afk}
                  </Text>
                </Td>
              </Tr>
            </>
          ) : (
            <Tr>
              <Td>Additional Data</Td>
              <Td isNumeric>N/A</Td>
            </Tr>
          )}
          <Tr>
            <Td>Updated At</Td>
            <Td isNumeric>
              <Text>{moment.unix(updatedAt).format("YYYY MMM. D HH:MM")}</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ParcelInfoTable
