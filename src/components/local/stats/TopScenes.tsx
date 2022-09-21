import { Box, useColorModeValue } from "@chakra-ui/react"
import GridBox from "../GridBox"

const TopScenes = () => {
  const box = {
    h: "600",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  return (
    <Box borderRadius="md" mb="4">
      <GridBox box={box} mb="8">
        <Box h="100%" p="4">
          Top Scene
        </Box>
      </GridBox>
    </Box>
  )
}

export default TopScenes
