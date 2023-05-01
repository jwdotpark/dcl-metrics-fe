import { Box, Text, Flex, Spacer, Center } from "@chakra-ui/react"
import { convertSeconds } from "../../../../lib/hooks/utils"

const TooltipTable = ({ date, count, degraded, bar, name, color }) => {
  const formattedCount =
    name === "Total Time Spent" ? convertSeconds(count) || "None" : count

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
        <Text as="kbd">{formattedCount}</Text>
      </Box>
    </Flex>
  )
}

export default TooltipTable
