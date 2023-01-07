import { Box, Text, Flex, Spacer, color } from "@chakra-ui/react"
import AvgStat from "../../local/stats/partials/AvgStat"
import DatePicker from "../../local/stats/scenes/DatePicker"

const SceneTitle = ({
  name,
  date,
  dateForPicker,
  setDate,
  availableDate,
  hasMultipleScenes,
}) => {
  return (
    <Flex direction={["column", "column", "row", "row"]}>
      <Box>
        <Flex direction="column" mt="4" mx="5">
          <Box>
            <Text fontSize="2xl">
              <b>{name}</b>
            </Text>
          </Box>
          <Box>
            <Text color="gray.500" fontSize="sm">
              Scene data for {date}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Spacer />
      {!hasMultipleScenes && (
        <Box m="4">
          <DatePicker
            date={dateForPicker}
            setDate={setDate}
            availableDate={availableDate}
          />
        </Box>
      )}
    </Flex>
  )
}

export default SceneTitle
