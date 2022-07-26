import { Box } from "@chakra-ui/react"

const ComponentHeader = ({ children }) => {
  return (
    <Box position="absolute" m="4">
      {children}
    </Box>
  )
}

export default ComponentHeader
