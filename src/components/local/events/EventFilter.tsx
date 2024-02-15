import {
  Box,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react"
import { useState } from "react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import { filterAtom } from "../../../lib/state/eventFilter"
import { useAtom } from "jotai"

const EventFilter = () => {
  const [selectedFilter, setSelectedFilter] = useAtom(filterAtom)

  const handleCheckboxChange = (newSelectedFilters) => {
    setSelectedFilter(newSelectedFilters)
  }

  return (
    <BoxWrapper colSpan="0">
      <Box m="2">
        <RadioGroup
          colorScheme="purple"
          defaultValue={"all"}
          onChange={handleCheckboxChange}
        >
          <Stack direction={["column", "row"]} spacing={[1, 5]}>
            <Radio value="all">All</Radio>
            <Radio value="oneoff">One-Off Event</Radio>
            <Radio value="regular">Regular Event</Radio>
          </Stack>
        </RadioGroup>
      </Box>
    </BoxWrapper>
  )
}

export default EventFilter
