/* eslint-disable react-hooks/rules-of-hooks */
import { Box, useColorModeValue, Flex, Spacer } from "@chakra-ui/react"

export const SceneChartTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
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
        {payload
          .sort((a, b) => b.value - a.value)
          .map((item) => {
            return (
              <Flex key={item.dataKey} fontSize="xs">
                <Box mr="2">{item.dataKey}</Box>
                <Spacer />
                <Box fontWeight="semibold">{item.value}</Box>
              </Flex>
            )
          })}
      </Box>
    )
  }
  return null
}
