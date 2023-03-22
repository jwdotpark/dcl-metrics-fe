import { Box, useColorModeValue } from "@chakra-ui/react"

export const CallOut = ({ children }) => {
  return (
    <Box p="4" bg={useColorModeValue("gray.200", "gray.600")} borderRadius="xl">
      {children}
    </Box>
  )
}
