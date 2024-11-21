import { Box, Input, useColorModeValue } from "@chakra-ui/react"

const GlobalTableFilter = ({ filter, setFilter }) => {
  return (
    <Box>
      <Input
        bg={useColorModeValue("gray.50", "gray.800")}
        borderColor={useColorModeValue("gray.300", "gray.600")}
        borderRadius="md"
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
        size="xs"
        value={filter || ""}
        variant="outline"
      />
    </Box>
  )
}

export default GlobalTableFilter
