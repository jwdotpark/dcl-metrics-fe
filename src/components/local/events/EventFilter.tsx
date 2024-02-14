import { Box, Checkbox, CheckboxGroup, Stack } from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"

const EventFilter = () => {
  return (
    <BoxWrapper colSpan="0">
      <Box m="2">
        <CheckboxGroup defaultValue={["naruto", "kakashi"]}>
          <Stack direction={["column", "row"]} spacing={[1, 5]}>
            <Checkbox value="naruto">All</Checkbox>
            <Checkbox value="sasuke">One-Off Event</Checkbox>
            <Checkbox value="kakashi">Regular Event</Checkbox>
          </Stack>
        </CheckboxGroup>
      </Box>
    </BoxWrapper>
  )
}

export default EventFilter
