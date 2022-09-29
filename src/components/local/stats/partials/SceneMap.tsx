import { Image, Box, useColorModeValue, Center } from "@chakra-ui/react"

const SceneMap = (props) => {
  const { url } = props
  return (
    <Box overflow="clip">
      <Center h="100%">
        <Box
          border="2px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          borderRadius="md"
          overflow="clip"
        >
          <Image
            // borderRadius="md"
            src={url}
            alt="map image"
            objectFit="cover"
          />
        </Box>
      </Center>
    </Box>
  )
}

export default SceneMap
