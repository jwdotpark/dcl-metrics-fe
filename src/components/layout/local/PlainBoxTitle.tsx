import { useColorModeValue, Box, Text, Flex, Spacer } from "@chakra-ui/react"

const BoxTitle = ({ name, description }) => {
  return (
    <Box w="100%">
      <Flex direction={["column", "column", "row", "row"]} w="100%">
        <Box mt="4">
          <Flex direction="column" ml="5">
            <Box>
              <Text fontSize="2xl" fontWeight="bold">
                {name}
              </Text>
            </Box>

            <Box mr="4">
              <Text fontSize="xs" fontWeight="light">
                {description}
              </Text>
            </Box>
          </Flex>
        </Box>
        <Spacer />
      </Flex>
      <Box
        w="auto"
        mt="2"
        mb="4"
        mx="4"
        borderBottom="1px solid"
        borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      />
    </Box>
  )
}

export default BoxTitle
