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

  if (active && payload && payload.length > 1) {
    return (
      <Box
        p="2"
        fontSize="xs"
        bg={useColorModeValue("whiteAlpha.700", "blackAlpha.600")}
        border="1px"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
        shadow="md"
      >
        <Center fontWeight="bold">
          {format(new Date(label), "yyyy MMMM d")}:{" "}
        </Center>
        {isDegraded && (
          <Center my="1">
            <Text color="red.500" fontWeight="bold">
              Degraded
            </Text>
          </Center>
        )}
        <Table size="xs" variant="simple">
          <Tbody>
            <Tr>
              <Td>{payload[0].dataKey}</Td>
              <Td isNumeric>
                <Box mx="2" color={payload[0].stroke} fontWeight="bold">
                  {payload[0].value}
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>{payload[1].dataKey}</Td>
              <Td isNumeric>
                <Box mx="2" color={payload[1].stroke} fontWeight="bold">
                  {payload[1].value}
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>{payload[2].dataKey}</Td>
              <Td isNumeric>
                <Box mx="2" color={payload[2].stroke} fontWeight="bold">
                  {payload[2].value}
                </Box>
              </Td>
            </Tr>
            <Tr>
              <Td>{payload[3].dataKey}</Td>
              <Td isNumeric>
                <Box mx="2" color={payload[3].stroke} fontWeight="bold">
                  {payload[3].value}
                </Box>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    )
  } else if (active && payload && payload.length === 1) {
    return (
      <Box
        p="2"
        fontSize="xs"
        bg={useColorModeValue("whiteAlpha.700", "blackAlpha.600")}
        border="1px"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
        shadow="md"
      >
        <Center mb="2" fontWeight="bold">
          {format(new Date(payload[0].payload.date), "yyyy MMMM d")}
        </Center>
        {isDegraded && (
          <Center my="1">
            <Text color="red.500" fontWeight="bold">
              Degraded
            </Text>
          </Center>
        )}
        <Table size="xs" variant="simple">
          <Tbody>
            <Tr>
              <Td>{payload[0].dataKey}</Td>
              <Td isNumeric>
                <Box mx="2" color={payload[0].stroke} fontWeight="bold">
                  {payload[0].value}
                </Box>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    )
  }
}
