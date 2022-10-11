import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Text,
  Box,
  Spacer,
} from "@chakra-ui/react"
import moment from "moment"

const TooltipTable = ({ date, count, degraded, bar }) => {
  const timeDuration = date + ":00" + " - " + (Number(date) + 1) + ":00"
  return (
    <TableContainer>
      <Table size="sm" variant="unstyled">
        <Thead>
          <Tr>
            <Th>{bar ? "Time" : "Date"}</Th>
            <Th isNumeric>{bar ? "User" : "Count"}</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{bar ? timeDuration : moment(date).format("YYYY MMM. D")}</Td>
            <Td
              color={degraded && "red"}
              // eslint-disable-next-line react-hooks/rules-of-hooks
              isNumeric
            >
              <Text as="kbd">
                <b>
                  {count} {degraded && "(Degraded)"}
                </b>
              </Text>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default TooltipTable
