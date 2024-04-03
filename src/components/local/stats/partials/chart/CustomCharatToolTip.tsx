/* eslint-disable react-hooks/rules-of-hooks */
import {
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
  if (active && payload && payload.length) {
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
          {format(new Date(label), "yyyy MMMM d")}
        </Center>
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
  }
}
