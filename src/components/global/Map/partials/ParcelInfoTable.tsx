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
  const { name, id, updatedAt, owner, tokenId } = selectedParcel

  return (
    <TableContainer whiteSpace="pre-wrap">
      <Table h="100%" size="sm" variant="simple">
        <Tbody>
          <Tr>
            <Td>Coordinate</Td>
            <Td isNumeric>
              <a target="_blank" rel="noopener noreferrer" href={external_url}>
                <Text
                  _hover={{ color: useColorModeValue("gray.800", "gray.400") }}
                >
                  [{id}]
                </Text>
              </a>
            </Td>
          </Tr>
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
          <Tr>
            <Td>Updated At</Td>
            <Td isNumeric>
              <Text>{moment.unix(updatedAt).format("YYYY MMM. D HH:MM")}</Text>
            </Td>
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

              <Tr>
                <Td>Deploy Count</Td>
                <Td isNumeric>
                  <Text>
                    {selectedParcel.deploy_count && selectedParcel.deploy_count}
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
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ParcelInfoTable
