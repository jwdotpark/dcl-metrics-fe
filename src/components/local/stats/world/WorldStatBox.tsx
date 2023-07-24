import { Flex, useColorModeValue, Box, Text } from "@chakra-ui/react"
import { formatDistanceToNow } from "date-fns"
import CountUp from "react-countup"

const WorldStatItem = ({ value, label, description }) => {
  return (
    <Box
      flex={1}
      mb="4"
      mx="4"
      p="2"
      px="4"
      bg={useColorModeValue("gray.100", "gray.700")}
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
        description=" The total number of currently deployed worlds at last update"
      />
      <WorldStatItem
        value={current_users}
        label="current world users"
        description="The number of users in worlds at last update"
      />
      <WorldStatItem
        value={currently_occupied}
        label="currently occupied"
        description="The number of occupied worlds at last update"
      />
      <WorldStatItem
        value={formatDistanceToNow(new Date(timestamp * 1000))}
        label="ago"
        description="Data is updated at"
      />
    </Flex>
  )
}

export default WorldStatBox
