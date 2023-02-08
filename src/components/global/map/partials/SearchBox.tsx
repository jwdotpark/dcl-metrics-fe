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

  const handleKeyDown = (e, result) => {
    if (e.key === "Enter") {
      clickSearchResult(result)
    }
    if (e.key === "ArrowDown") {
      e.preventDefault()
      if (e.target.nextElementSibling) {
        e.target.nextElementSibling.focus()
      }
    }
    if (e.key === "ArrowUp") {
      e.preventDefault()
      if (e.target.previousElementSibling) {
        e.target.previousElementSibling.focus()
      } else {
        document.getElementById("search-input").focus()
      }
    }
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
            id="search-result"
            onKeyDown={(e) => handleKeyDown(e, result.id)}
            tabIndex={0}
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
