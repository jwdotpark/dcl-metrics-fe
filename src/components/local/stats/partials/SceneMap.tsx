import { Flex, Image, Box, useColorModeValue, Center } from "@chakra-ui/react"
import GridBox from "../../GridBox"

const SceneMap = (props) => {
  const { url } = props

  return (
    <Box
      overflow="clip"
      border="2px solid"
      borderColor={useColorModeValue("gray.300", "gray.700")}
      borderRadius="md"
      shadow="md"
    >
      <Image objectFit="cover" alt="map image" src={url} />
    </Box>
  )
}

export default SceneMap
