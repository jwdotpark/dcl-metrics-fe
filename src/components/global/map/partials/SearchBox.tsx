import { Box, Divider, Text, useColorModeValue } from "@chakra-ui/react"
import { mutateStringToURL } from "../../../../lib/hooks/utils"
import Link from "next/link"

const SearchBox = ({ searchResult }) => {
  const truncateName = (name: string) => {
    const nameLength = 35
    if (name && name.length > nameLength) {
      return name.slice(0, nameLength) + "..."
    }
    return name
  }

  const address = (data) => {
    return `/scenes/${mutateStringToURL(data.scene.name)}/${
      data.scene.scene_uuid
    }`
  }

  return (
    <Box w="200">
      {searchResult.slice(0, 100).map((result) => {
        return (
          <Box
            key={result.id}
            m="2"
            borderRadius="xl"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            _hover={{ bg: useColorModeValue("gray.100", "gray.700") }}
          >
            <Link href={address(result)} target="_blank">
              <Text ml="2" fontSize="sm">
                {truncateName(result.scene.name)}
              </Text>
              {/*<Text ml="2" fontSize="sm">Visitors: {result.visitors}</Text>*/}
              {/*<Text ml="2" fontSize="sm">avg time spent: {result.avg_time_spent}</Text>*/}
            </Link>
            <Divider />
          </Box>
        )
      })}
    </Box>
  )
}

export default SearchBox
