/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Center,
  Flex,
  Spacer,
  Text,
  useColorModeValue,
} from "@chakra-ui/react"
import { format } from "date-fns"

export const SceneChartTooltip = ({ active, payload, colorMap }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        p="2"
        fontSize="xs"
        bg={useColorModeValue("whiteAlpha.900", "blackAlpha.600")}
        border="1px"
        borderColor={useColorModeValue("gray.200", "gray.800")}
        borderRadius="xl"
        shadow="md"
      >
        <Center>
          <Text fontWeight="semibold">
            {format(new Date(payload[0].payload.date), "d MMMM yyyy")}
          </Text>
        </Center>
        {payload
          .sort((a, b) => b.value - a.value)
          .map((entry) => (
            <Flex key={entry.name} fontSize="xs">
              <Box mr="4">
                <Text color={colorMap[entry.name]}>{entry.name}</Text>
              </Box>
              <Spacer />
              <Box fontWeight="semibold">{entry.value}</Box>
            </Flex>
          ))}
      </Box>
    )
  }

  return null
}
