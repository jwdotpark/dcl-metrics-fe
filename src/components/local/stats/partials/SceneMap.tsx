import { Flex, Image, Box, useColorModeValue, Center } from "@chakra-ui/react"

const SceneMap = (props) => {
  const { url } = props
  return (
    <Flex minW="100%" minH="100%" borderRadius="xl" overflow="clip">
      <Image
        minW="100%"
        minH="100%"
        src={url}
        alt="map image"
        objectFit="cover"
      />
    </Flex>
  )
}

export default SceneMap
