import { Box, Divider, Text, useColorModeValue } from "@chakra-ui/react"
import { strToCoord } from "../../../../lib/hooks/utils"

const SearchBox = ({ searchResult, setSearchResultID }) => {
  const truncateName = (name: string) => {
    const nameLength = 35
    if (name && name.length > nameLength) {
      return name.slice(0, nameLength) + "..."
    }
    return name
  }

  const clickSearchResult = (data: string) => {
    const coord = strToCoord(data)
    setSearchResultID({ x: coord.x, y: coord.y })
  }

  return (
    <Box w="auto" mt="2" pb="2">
      {searchResult.slice(0, 100).map((result) => {
        return (
          <Box
            key={result.id}
            mx="2"
            _hover={{
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg: useColorModeValue("gray.200", "gray.700"),
              cursor: "pointer",
            }}
          >
            <Box onClick={() => clickSearchResult(result.id)}>
              <Text ml="2" pb="1" fontSize="sm">
                {truncateName(result.scene.name)}
              </Text>
            </Box>
            <Divider />
          </Box>
        )
      })}
    </Box>
  )
}

export default SearchBox
