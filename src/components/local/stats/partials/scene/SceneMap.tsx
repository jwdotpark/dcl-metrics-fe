import { Flex, Image, Box, useColorModeValue, Center } from "@chakra-ui/react"
import GridBox from "../../../GridBox"

const SceneMap = (props) => {
  const { url } = props

  return (
    <Box
      overflow="clip"
      w="100%"
      h="350px"
      border="3px solid"
      borderColor={useColorModeValue("gray.300", "gray.700")}
      borderRadius="xl"
      shadow="md"
    >
      <Image minW="100%" h="100%" objectFit="cover" alt="map image" src={url} />
    </Box>
  )
}

export default SceneMap
