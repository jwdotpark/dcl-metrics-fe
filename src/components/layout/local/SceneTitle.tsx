import { Box, Text, Flex, Spacer, Button, IconButton } from "@chakra-ui/react"
import AvgStat from "../../local/stats/partials/AvgStat"
import DatePicker from "../../local/stats/scenes/DatePicker"
import { FiDownload } from "react-icons/fi"

const SceneTitle = ({
  name,
  date,
  dateForPicker,
  setDate,
  availableDate,
  hasMultipleScenes,
  description,
  uuid,
}) => {
  console.log(uuid)
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
              {description}
            </Text>
          </Box>
        </Flex>
      </Box>
      <Spacer />
      {uuid.length > 0 && (
        <Flex m="4">
          <Box mr="2">
            <IconButton
              sx={{ transform: "translateY(1px)" }}
              border="2px solid"
              borderRadius="lg"
              shadow="md"
              aria-label="Download"
              icon={<FiDownload />}
              variant="outline"
            />
          </Box>
          <Box w="100%">
            <DatePicker
              date={dateForPicker}
              setDate={setDate}
              availableDate={availableDate}
            />
          </Box>
        </Flex>
      )}
    </Flex>
  )
}

export default SceneTitle
