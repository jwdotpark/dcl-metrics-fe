import { Flex, Box, Text } from "@chakra-ui/react"
import { format } from "date-fns"
import CountUp from "react-countup"

const WorldStatBox = ({
  total_count,
  current_users,
  currently_occupied,
  timestamp,
}) => {
  return (
    <Flex
      justify="space-between"
      direction={["column", "row"]}
      gap={4}
      m="4"
      mx={[6, 8]}
    >
      <Box>
        <Box>
          <Text fontSize="xs">Total World Count</Text>
        </Box>
        <Box>
          <Text fontSize={["xl", "2xl", "3xl"]} fontWeight="bold">
            <CountUp end={total_count} />
          </Text>
        </Box>
      </Box>
      <Box>
        <Box>
          <Text fontSize="xs">Current World Users</Text>
        </Box>
        <Box>
          <Text fontSize={["xl", "2xl", "3xl"]} fontWeight="bold">
            <CountUp end={current_users} />
          </Text>
        </Box>
      </Box>
      <Box>
        <Box>
          <Text fontSize="xs">Current Occupied</Text>
        </Box>
        <Box>
          <Text fontSize={["xl", "2xl", "3xl"]} fontWeight="bold">
            <CountUp end={currently_occupied} />
          </Text>
        </Box>
      </Box>
      <Box>
        <Box>
          <Text fontSize="xs">Updated At</Text>
        </Box>
        <Box>
          <Text fontSize={["xl", "2xl", "3xl"]} fontWeight="bold">
            {format(timestamp * 1000, "yy MMM d HH:mm")}
          </Text>
        </Box>
      </Box>
    </Flex>
  )
}

export default WorldStatBox
