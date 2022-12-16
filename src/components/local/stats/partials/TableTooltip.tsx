import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Box,
  Text,
  Flex,
  Spacer,
  Center,
} from "@chakra-ui/react"
import moment from "moment"

const TooltipTable = ({ date, count, degraded, bar, name, color }) => {
  // const timeDuration = date + ":00" + " - " + (Number(date) + 1) + ":00"

  return (
    <Flex fontSize="sm">
      <Center mr="2">
        <Box boxSize="3" bg={color} borderRadius="xl" shadow="md" />
      </Center>
      <Box mr="2">
        <Text>{name}</Text>
      </Box>
      <Spacer />
      <Box ml="2">
        <Text as="kbd">{count}</Text>
      </Box>
    </Flex>
    // <TableContainer>
    //   <Table size="sm" variant="simple">
    //     <Thead>
    //       <Tr>
    //         {/* <Th>{bar ? "Time (UTC)" : "Date"}</Th> */}
    //         {/* <Th isNumeric>{bar ? "User" : "Count"}</Th> */}
    //       </Tr>
    //     </Thead>
    //     <Tbody>
    //       <Tr>
    //         {/* <Td>{bar ? timeDuration : moment(date).format("YYYY MMM. D")}</Td> */}
    //         <Td
    //           color={degraded && "red"}
    //           // eslint-disable-next-line react-hooks/rules-of-hooks
    //           isNumeric
    //         >
    //           <Text as="kbd">
    //             <b>
    //               {count} {degraded && "(Degraded)"}
    //             </b>
    //           </Text>
    //         </Td>
    //       </Tr>
    //     </Tbody>
    //   </Table>
    // </TableContainer>
  )
}

export default TooltipTable
