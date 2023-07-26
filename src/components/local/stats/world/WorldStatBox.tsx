import { Flex, useColorModeValue, Box, Text } from "@chakra-ui/react"
import { format, formatDistanceToNow } from "date-fns"
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
        <Text as="span" fontSize="md" fontWeight="semibold">
          {typeof value === "number" ? (
            <CountUp end={value} />
          ) : (
            "Last update " + value
          )}{" "}
          {label}
        </Text>
      </Box>
      <Box py="2">
        <Text color="gray.500" fontSize="xs">
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
        label="worlds currently occupied"
        description="The number of occupied worlds at last update"
      />
      <WorldStatItem
        value={formatDistanceToNow(new Date(timestamp * 1000))}
        label="ago"
        description={`Data is updated at ${format(
          new Date(timestamp * 1000),
          "yyyy MMM d HH:mm"
        )}`}
      />
    </Flex>
  )
}

export default WorldStatBox
