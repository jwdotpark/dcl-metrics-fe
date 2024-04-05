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
  Flex,
  Thead,
} from "@chakra-ui/react"
import { format } from "date-fns"

const TableRow = ({ dataKey, value, stroke, avg }) => {
  const mutateString = (inputString: string): string => {
    return inputString.replace("_", " ")
  }

  return (
    <>
      <Tr>
        <Td>{mutateString(dataKey).toUpperCase()}</Td>
        <Td isNumeric>
          <Flex direction="row">
            <Box mx="2" color={stroke} fontWeight="bold">
              {value}
            </Box>
            <Box mr="4" />
          </Flex>
        </Td>
        <Td fontWeight="medium" textAlign="end">
          <Box alignContent="end">
            <Text color={value - avg > 0 ? "green.500" : "red.500"}>
              {value - avg > 0 && "+"}
              {value - avg}
            </Text>
          </Box>
        </Td>
      </Tr>
    </>
  )
}

export const CustomTooltip = ({ active, payload, label, avg, data }) => {
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
        <Center fontSize="md" fontWeight="bold">
          {format(new Date(label), "yyyy MMMM d")}
        </Center>
        {isDegraded && (
          <Center mt="1">
            <Text color="red.500" fontWeight="bold">
              Degraded
            </Text>
          </Center>
        )}
        <Table my="1" size="xs" variant="simple">
          <Thead>
            <Tr>
              <Td>Category</Td>
              <Td>
                <Box ml="2">Value</Box>
              </Td>
              <Td isNumeric>vs. {data && data.length} days AVG.</Td>
            </Tr>
          </Thead>
          <Tbody>
            {avg &&
              payload.map((item, index) => {
                const avgKey = `avg${item.dataKey
                  .split("_")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join("")}`
                const avgValue = avg[avgKey]
                return (
                  <TableRow
                    key={index}
                    dataKey={item.dataKey}
                    value={item.value}
                    avg={avgValue}
                    stroke={item.stroke}
                  />
                )
              })}
          </Tbody>
        </Table>
      </Box>
    )
  }
}
