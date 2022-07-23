import { Box } from "@chakra-ui/react"

const ComponentHeader = ({ name }) => {
  return (
    <Box position="absolute" m="4">
      {name}
    </Box>
  )
}

export default ComponentHeader
