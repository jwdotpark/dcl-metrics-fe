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
} from "@chakra-ui/react"
import moment from "moment"

const MapInfoTable = ({ selectedParcel, description }) => {
  const { name, id, updatedAt, owner, tokenId } = selectedParcel
  return (
    <Box py="4">
      <Table size="sm" variant="simple">
        <Tbody>
          <Tr>
            <Td>Coordinate</Td>
            <Td isNumeric>
              <Text as="kbd">[{id}]</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>Owner</Td>
            <Td isNumeric>
              <Text as="kbd">{owner.slice(0, 20)}..</Text>
            </Td>
          </Tr>
          <Tr>
            <Td>Description</Td>
            <Td isNumeric>{description ? description : "N/A"}</Td>
          </Tr>
          <Tr>
            <Td>Updated At</Td>
            <Td isNumeric>
              <Text as="kbd">{moment(updatedAt).format("MMM. D HH:MM")}</Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  )
}

export default MapInfoTable
