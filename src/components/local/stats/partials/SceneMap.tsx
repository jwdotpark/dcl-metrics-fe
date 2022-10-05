import { Flex, Image, Box, useColorModeValue, Center } from "@chakra-ui/react"

const SceneMap = (props) => {
  const { url } = props
  return (
    <Flex w="100%" h="100%">
      <Image w="100%" h="100%" objectFit="cover" alt="map image" src={url} />
    </Flex>
  )
}

export default SceneMap
