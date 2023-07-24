import { Box, Flex, Text } from "@chakra-ui/react"
import { format, parseISO } from "date-fns"
import CountUp from "react-countup"
import BoxWrapper from "../../../layout/local/BoxWrapper"

const WorldStat = ({ worldCurrentRes }) => {
  console.log(worldCurrentRes)
  const { total_count, current_users, timestamp, currently_occupied } =
    worldCurrentRes

  console.log(parseISO(timestamp))

  return (
    <Box mb="4">
      <BoxWrapper colSpan={0}>
        <Flex
          justify="space-between"
          direction={["column", "row"]}
          gap={4}
          m="4"
        >
          <Box>
            <Box>
              <Text fontSize="xs">Total World Count</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" fontWeight="bold">
                <CountUp end={total_count} />
              </Text>
            </Box>
          </Box>
          <Box>
            <Box>
              <Text fontSize="xs">Current World Users</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" fontWeight="bold">
                <CountUp end={current_users} />
              </Text>
            </Box>
          </Box>
          <Box>
            <Box>
              <Text fontSize="xs">Current Occupied</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" fontWeight="bold">
                <CountUp end={currently_occupied} />
              </Text>
            </Box>
          </Box>
          <Box>
            <Box>
              <Text fontSize="xs">Updated At</Text>
            </Box>
            <Box>
              <Text fontSize="3xl" fontWeight="bold">
                {format(timestamp * 1000, "yy MMM d HH:mm")}
              </Text>
            </Box>
          </Box>
        </Flex>
      </BoxWrapper>
    </Box>
  )
}

export default WorldStat
