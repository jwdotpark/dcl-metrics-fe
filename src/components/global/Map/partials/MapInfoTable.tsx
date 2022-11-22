import {
  Text,
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Box,
  TableContainer,
  useBreakpointValue,
} from "@chakra-ui/react"
import moment from "moment"

const MapInfoTable = ({ selectedParcel, description }) => {
  const { name, id, updatedAt, owner, tokenId } = selectedParcel
  return (
    <TableContainer whiteSpace="pre-wrap">
      <Table h="100%" size="sm" variant="simple">
        <Tbody>
          <Tr>
            <Td>Name</Td>
            <Td isNumeric>
              <Text>{name ? name : "N/A"}</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>Coordinate</Td>
            <Td isNumeric>
              <Text as="kbd">[{id}]</Text>
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
              {/* updatedAt unix time convert */}
              <Text>{moment.unix(updatedAt).format("YYYY MMM. D HH:MM")}</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default MapInfoTable
