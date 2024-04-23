import { Box, Text, Flex } from "@chakra-ui/react"

export const PanelLegend = () => {
  return (
    <Flex direction="column" m="4">
      <Box mb="2">
        <Box
          p="1"
          px="2"
          fontSize="sm"
          bg="#FF5555"
          borderRadius="xl"
          shadow="sm"
        >
          Actual Duration
        </Box>
        <Text m="2" fontSize="xs">
          Time spent rendering the committed update. This indicates how long the
          render phase took in milliseconds.
        </Text>
      </Box>
      <Box mb="2">
        <Box
          p="1"
          px="2"
          fontSize="sm"
          bg="#BD93F9"
          borderRadius="xl"
          shadow="sm"
        >
          Base Duration
        </Box>
        <Text m="2" fontSize="xs">
          Estimated time to render the entire subtree without memoization. This
          value indicates how long rendering the descendants of the profiled
          tree took without caching.
        </Text>
      </Box>
    </Flex>
  )
}
