/* eslint-disable no-unused-vars */
import { Box, Flex, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { filterAtom } from "../../../lib/state/eventFilter"
import { useAtom } from "jotai"
import { Select } from "@chakra-ui/react"

const EventFilter = ({ filters, HandleView }) => {
  const [selectedFilter, setSelectedFilter] = useAtom(filterAtom)

  const handleCheckboxChange = (newSelectedFilters) => {
    setSelectedFilter(newSelectedFilters)
  }

  return (
    <Flex direction={["column", "row"]} w="100%" mt={[8, 0]} mb="-2" pl="4">
      <Flex align="center" minW="40%">
        <HandleView />
        <Box>
          <RadioGroup
            colorScheme="purple"
            defaultValue={"all"}
            onChange={handleCheckboxChange}
          >
            <Stack direction={["row"]} spacing={[1, 5]}>
              <Radio value="all">All</Radio>
              <Radio value="oneoff">One-Off Event</Radio>
              <Radio value="regular">Regular Event</Radio>
            </Stack>
          </RadioGroup>
        </Box>
      </Flex>
      <Box>
        <Select placeholder="Select option">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </Box>
    </Flex>
  )
}

export default EventFilter
