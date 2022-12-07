import {
  Tooltip,
  Text,
  Table,
  Tr,
  Tbody,
  Td,
  TableContainer,
  Box,
  Button,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import moment from "moment"
import { convertSeconds } from "../../../../lib/hooks/utils"

const ParcelInfoTable = ({ selectedParcel, description, external_url }) => {
  const {
    id,
    name,
    updatedAt,
    owner,
    visitors,
    max_concurrent_users,
    avg_time_spent,
    avg_time_spent_afk,
    logins,
    logouts,
    deploy_count,
    scene,
  } = selectedParcel

  const toast = useToast()
  const handleToast = async (value) => {
    await navigator.clipboard.writeText(value)
    toast({
      description: "Value is copied to the clipboard.",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
      status: "success",
      variant: "subtle",
    })
  }

  return (
    <TableContainer
      // overflowX="scroll"
      m="2"
      p="2"
      py="4"
      bg={useColorModeValue("gray.50", "gray.700")}
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
      shadow="md"
      whiteSpace="pre-wrap"
    >
      <Table h="350" colorScheme="blackAlpha" size="sm">
        <Tbody>
          <Tr>
            <Td>Coordinate</Td>
            <Td isNumeric>
              <Text as="kbd">[{id}]</Text>
            </Td>
          </Tr>
          {name && (
            <Tr>
              <Td>Parcel Name</Td>
              <Td isNumeric>
                <Text
                  wordBreak="break-all"
                  noOfLines={1}
                  onClick={() => handleToast(name)}
                >
                  {name}
                </Text>
              </Td>
            </Tr>
          )}
          {scene && scene.name && (
            <Tr>
              <Td>Scene Name</Td>
              <Td isNumeric>
                <Tooltip
                  p="2"
                  fontSize="sm"
                  borderRadius="md"
                  label={scene.name}
                  placement="auto"
                >
                  <Text wordBreak="break-all" noOfLines={1}>
                    {scene.name}
                  </Text>
                </Tooltip>
              </Td>
            </Tr>
          )}
          {visitors > 0 && (
            <Tr>
              <Td>Visitors</Td>
              <Td isNumeric>
                <Text as="kbd">{visitors}</Text>
              </Td>
            </Tr>
          )}

          {max_concurrent_users > 0 && (
            <Tr>
              <Td>Max Concurrent User</Td>
              <Td isNumeric>
                <Text as="kbd">{max_concurrent_users}</Text>
              </Td>
            </Tr>
          )}

          {avg_time_spent > 0 && (
            <Tr>
              <Td>AVG Time Spent</Td>
              <Td isNumeric>
                <Text as="kbd">{convertSeconds(avg_time_spent)}</Text>
              </Td>
            </Tr>
          )}

          {avg_time_spent_afk > 0 && (
            <Tr>
              <Td>AVG Time Spent AFK</Td>
              <Td isNumeric>
                <Text as="kbd">{convertSeconds(avg_time_spent_afk)}</Text>
              </Td>
            </Tr>
          )}

          {logins > 0 && (
            <Tr>
              <Td>Logins</Td>
              <Td isNumeric>
                <Text as="kbd">{logins}</Text>
              </Td>
            </Tr>
          )}

          {logouts > 0 && (
            <Tr>
              <Td>Logouts</Td>
              <Td isNumeric>
                <Text as="kbd">{logouts}</Text>
              </Td>
            </Tr>
          )}

          {deploy_count > 0 && (
            <Tr>
              <Td>Deploy Count</Td>
              <Td isNumeric>
                <Text as="kbd">{deploy_count}</Text>
              </Td>
            </Tr>
          )}

          {owner && (
            <Tr>
              <Td>Owner</Td>
              <Td isNumeric>
                <Text
                  as="kbd"
                  _hover={{ cursor: "grab", color: "gray.600" }}
                  wordBreak="break-all"
                  noOfLines={1}
                  onClick={() => handleToast(owner)}
                >
                  {owner}
                </Text>
              </Td>
            </Tr>
          )}

          {scene && scene.last_deployed_at && (
            <Tr>
              <Td>Last Deployed At</Td>
              <Td isNumeric>
                <Text wordBreak="break-all" noOfLines={1}>
                  {scene.last_deployed_at && scene.last_deployed_at}
                </Text>
              </Td>
            </Tr>
          )}
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
