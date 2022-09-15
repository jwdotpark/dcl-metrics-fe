import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  useColorModeValue,
} from "@chakra-ui/react"
import moment from "moment"

const TooltipTable = ({ date, count, degraded }) => {
  return (
    <TableContainer>
      <Table variant="unstyled" size="sm">
        <Thead>
          <Tr>
            <Th>Date</Th>
            <Th isNumeric>Count</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{moment(date).format("YYYY MMMM Do")}</Td>
            <Td
              isNumeric
              // eslint-disable-next-line react-hooks/rules-of-hooks
              color={degraded && "red"}
            >
              {count} {degraded && "(Degraded)"}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TooltipTable
