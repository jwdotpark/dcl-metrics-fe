import { Box, Input, useColorModeValue } from "@chakra-ui/react"

const GlobalTableFilter = ({ filter, setFilter }) => {
  return (
    <Box>
      <Input
        bg={useColorModeValue("gray.200", "gray.700")}
        borderRadius="xl"
        shadow="md"
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search..."
        size="sm"
        value={filter || ""}
        variant="outline"
      />
    </Box>
  )
}

export default GlobalTableFilter
