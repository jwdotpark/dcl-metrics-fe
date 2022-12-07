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
import { convertSeconds } from "../../../../lib/hooks/utils"

const ParcelInfoTable = ({ selectedParcel, description, external_url }) => {
  const { id, updatedAt, owner } = selectedParcel

  return (
    <TableContainer mt="4" px="-2" py="2" whiteSpace="pre-wrap">
      <Table h="100%" fontSize="xs" colorScheme="gray" size="sm">
        <Tbody>
          {/* PARCEL */}
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
          <Tr>
            <Td>Visitors</Td>
            <Td isNumeric>
              <Text as="kbd">{selectedParcel.visitors}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>Max Concurrent User</Td>
            <Td isNumeric>
              <Text as="kbd">
                {selectedParcel.max_concurrent_users &&
                  selectedParcel.max_concurrent_users}
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Td>Deploy Count</Td>
            <Td isNumeric>
              <Text as="kbd">{selectedParcel.deploy_count}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>Logins</Td>
            <Td isNumeric>
              <Text as="kbd">{selectedParcel.logins}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>Logins</Td>
            <Td isNumeric>
              <Text as="kbd">{selectedParcel.logouts}</Text>
            </Td>
          </Tr>
          {/* additional SCENE */}
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
                <Td>Last Deployed At</Td>
                <Td isNumeric>
                  <Text wordBreak="break-all" noOfLines={1}>
                    {selectedParcel.scene.last_deployed_at &&
                      selectedParcel.scene.last_deployed_at}
                  </Text>
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
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default ParcelInfoTable
