import {
  Text,
  TableContainer,
  Table,
  Tbody,
  Tr,
  Td,
  useColorModeValue,
} from "@chakra-ui/react"

const SceneInfoTable = ({ selectedParcel }) => {
  const { name, visitors, deploys } = selectedParcel.scene
  return (
    <TableContainer whiteSpace="pre-wrap">
      <Table h="100%" size="sm" variant="simple">
        <Tbody>
          <Tr>
            <Td>Name</Td>
            <Td isNumeric>
              <Text
                fontWeight="medium"
                _hover={{ color: useColorModeValue("gray.800", "gray.400") }}
              >
                {name}
              </Text>
            </Td>
          </Tr>
          <Tr>
            <Td>Visitors</Td>
            <Td isNumeric>{visitors}</Td>
          </Tr>
          <Tr>
            <Td>Deploys</Td>
            <Td isNumeric>{deploys}</Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default SceneInfoTable
