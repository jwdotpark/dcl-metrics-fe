import { Box, Select } from "@chakra-ui/react"

const SceneSelector = () => {
  return (
    <Box mb="4">
      <Select placeholder="Select option">
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Select>
    </Box>
  )
}

export default SceneSelector
