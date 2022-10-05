import { Flex, Image, Box, useColorModeValue, Center } from "@chakra-ui/react"
import GridBox from "../../GridBox"

const SceneMap = (props) => {
  const { url } = props
  const box = {
    h: "300px",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }
  return (
    <Box w="100%" p="4" border="1px solid red">
      <GridBox box={box}>
        <Center
          overflow="clip"
          border="2px solid"
          borderColor={useColorModeValue("gray.300", "gray.500")}
          borderRadius="md"
          shadow="sm"
        >
          <Image minH="100%" objectFit="cover" alt="map image" src={url} />
        </Center>
      </GridBox>
    </Box>
  )
}

export default SceneMap
