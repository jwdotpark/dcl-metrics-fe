import { Box, Text, Flex, Spacer, Center } from "@chakra-ui/react"
import { convertSeconds } from "../../../../lib/hooks/utils"

const TooltipTable = ({ date, count, degraded, bar, name, color }) => {
  const formatCount = (val) => {
    if (Number(val) === 0) {
      return "None"
    } else if (val < 60 * 60 * 24) {
      return convertSeconds(val)
    } else {
      return "24h"
    }
  }
  return (
    <Flex fontSize="sm">
      <Center mr="2">
        <Box boxSize="3" bg={color} borderRadius="xl" shadow="md" />
      </Center>
      <Box mr="2">
        <Text>{name}</Text>
      </Box>
      <Spacer />
      <Box ml="2" color={degraded && "red"}>
        <Text as="kbd">
          {name === "Total Time Spent" && formatCount(count)}
        </Text>
      </Box>
    </Flex>
  )
}

export default TooltipTable
