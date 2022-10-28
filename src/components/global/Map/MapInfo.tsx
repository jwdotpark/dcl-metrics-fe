import { Box, GridItem, useColorModeValue } from "@chakra-ui/react"

const MapInfo = ({ h }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("gray.200", "gray.700"),
  }

  return (
    <Box w={["100%", "100%", "100%", "100%"]} h={h}>
      <GridItem w={box.w} h="100%" mb="4" bg={box.bg} borderRadius="xl">
        <Box p="2">map info</Box>
      </GridItem>
    </Box>
  )
}

export default MapInfo
