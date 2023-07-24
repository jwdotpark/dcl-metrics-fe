import { Flex, useColorModeValue, Box, Text } from "@chakra-ui/react"
import { format } from "date-fns"
import CountUp from "react-countup"

const WorldStatItem = ({ value, label, description }) => {
  return (
    <Box
      flex={1}
      mb="4"
      mx="4"
      p="2"
      px="4"
      bg={useColorModeValue("gray.100", "gray.800")}
      border="1px solid"
      borderColor={useColorModeValue("gray.100", "gray.700")}
      borderRadius="xl"
      shadow="md"
      _hover={{ bg: useColorModeValue("gray.200", "gray.900") }}
    >
      <Box mb="-2">
        <Text as="span" fontSize={["lg", "xl", "2xl"]} fontWeight="black">
          {typeof value === "number" ? <CountUp end={value} /> : value}
        </Text>
        <Text as="span" ml="2" fontSize="sm">
          {label}
        </Text>
      </Box>
      <Box py="2">
        <Text color="gray.500" fontSize="sm">
          {description}
        </Text>
      </Box>
    </Box>
  )
}

const WorldStatBox = ({
  isMainPage,
  total_count,
  current_users,
  currently_occupied,
  timestamp,
}) => {
  return (
    <Flex justify="space-between" direction={isMainPage ? "column" : "row"}>
      <WorldStatItem
        value={total_count}
        label="total world count"
        description="The number of count of existing world at last update"
      />
      <WorldStatItem
        value={current_users}
        label="current world users"
        description="The number of user in the world at last update"
      />
      <WorldStatItem
        value={currently_occupied}
        label="currently occupied"
        description="The number of count of occupied world at last update"
      />
      <WorldStatItem
        value={format(timestamp * 1000, "yyyy MMM d")}
        label="last Updated at"
        description="Last time data is updated at"
      />
    </Flex>
  )
}

export default WorldStatBox
