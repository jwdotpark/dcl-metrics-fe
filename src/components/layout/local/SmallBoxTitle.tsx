import { Flex, Box, Text } from "@chakra-ui/react"

export const SmallBoxTitle = ({ name, description }) => {
  return (
    <Flex direction="column" mb="4" ml="6">
      <Box>
        <Text fontSize="lg" fontWeight="bold">
          {name}
        </Text>
      </Box>
      <Box>
        <Text color="gray.500" fontSize="sm" fontWeight="">
          {description}
        </Text>
      </Box>
    </Flex>
  )
}
