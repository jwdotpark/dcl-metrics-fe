/* eslint-disable react-hooks/rules-of-hooks */
import {
  Text,
  Box,
  useColorModeValue,
  Center,
  Table,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react"
import { format } from "date-fns"

const TableRow = ({ dataKey, value, stroke }) => {
  const mutateString = (inputString: string): string => {
    return inputString.replace("_", " ")
  }

  return (
    <>
      <Tr>
        <Td>{mutateString(dataKey).toUpperCase()}</Td>
        <Td isNumeric>
          <Box mx="2" color={stroke} fontWeight="bold">
            {value}
          </Box>
        </Td>
      </Tr>
    </>
  )
}

export const CustomTooltip = ({ active, payload, label }) => {
  const findDegraded = (payloadArray) => {
    for (let item of payloadArray) {
      if (item.payload.degraded === true) {
        return true
      }
    }
    return false
  }

  const isDegraded = findDegraded(payload)

  if (active && payload && payload.length > 0) {
    return (
      <Box
        p="2"
        fontSize="xs"
        bg={useColorModeValue("whiteAlpha.700", "blackAlpha.600")}
        border="1px"
        borderColor={useColorModeValue("gray.200", "gray.800")}
        borderRadius="xl"
        shadow="md"
      >
        <Center fontWeight="bold">
          {format(new Date(label), "yyyy MMMM d")}:{" "}
        </Center>
        {isDegraded && (
          <Center mt="1">
            <Text color="red.500" fontWeight="bold">
              Degraded
            </Text>
          </Center>
        )}
        <Table my="1" size="xs" variant="simple">
          <Tbody>
            {payload.map((item, index) => (
              <TableRow
                key={index}
                dataKey={item.dataKey}
                value={item.value}
                stroke={item.stroke}
              />
            ))}
          </Tbody>
        </Table>
      </Box>
    )
  }
}
