import { Box, GridItem, useColorModeValue } from "@chakra-ui/react"

const MapInfo = ({ h }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("gray.200", "gray.600"),
  }

  return (
    <Box w={["100%", "100%", "100%", "30%"]} h={h}>
      <GridItem w={box.w} h="100%" mb="4" bg={box.bg} borderRadius="xl">
        <Box p="2">inffo</Box>
      </GridItem>
    </Box>
  )
}

export default MapInfo
