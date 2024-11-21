import { Box, Text, Flex, Spacer, Center } from "@chakra-ui/react"
import { Handle } from "./Handle"

export const Title = ({ title, description }) => {
  return (
    <Box mb="4" ml="2">
      <Flex direction="row">
        <Center>
          <Text fontSize="2xl" fontWeight="black">
            {title}
          </Text>
        </Center>
        <Spacer />
        <Center>
          <Handle />
        </Center>
      </Flex>
      <Box>
        <Text fontSize="xs" fontWeight="light">
          {description}
        </Text>
      </Box>
    </Box>
  )
}
