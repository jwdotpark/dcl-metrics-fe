import { Box, Text, Flex, Spacer } from "@chakra-ui/react"
import AvgStat from "../../local/stats/partials/AvgStat"

const BoxTitle = ({ name, description, date, avgData, slicedData, color }) => {
  return (
    <Flex direction={["column", "column", "row", "row"]}>
      <Box>
        <Flex direction="column" mt="2" mx="5">
          <Box>
            <Text fontSize="2xl">
              <b>{name}</b>
            </Text>
          </Box>
          {date !== "" && name !== "Land Picker" && (
            <Box>
              <Text color="gray.500" fontSize="sm">
                {name} from {date.first} - {date.last}
              </Text>
            </Box>
          )}
          {date === "" && (
            <Box>
              <Text color="gray.500" fontSize="sm">
                {description}
              </Text>
            </Box>
          )}
        </Flex>
      </Box>
      <Spacer />
      <Box mt={[2, 0, 4, 4]} mr="4" ml="5">
        <AvgStat avgData={avgData} data={slicedData} color={color} />
      </Box>
    </Flex>
  )
}

export default BoxTitle
