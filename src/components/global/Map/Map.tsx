import {
  Box,
  Text,
  Center,
  Flex,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react"

const Map = ({ h }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("gray.200", "gray.600"),
  }

  // create grid
  const grid = []
  const gridNum = 1
  const minX = -gridNum
  const maxX = gridNum
  const minY = -gridNum
  const maxY = gridNum
  for (let x = minX; x <= maxX; x++) {
    const row = []
    for (let y = minY; y <= maxY; y++) {
      row.push({ x, y, value: `${x}, ${y}` })
    }
    grid.push(row)
  }

  const gridSize = 100

  return (
    <Box overflow="scroll" w={["100%", "100%", "100%", "70%"]} h={h}>
      <GridItem w={box.w} h="100%" mb="4" bg={box.bg} borderRadius="xl">
        <Box p="4">
          {grid.reverse().map((row, i) => {
            return (
              <Flex key={i}>
                {row.map((cell, j) => {
                  return (
                    <Box key={j} boxSize={gridSize} border="1px solid">
                      <Center h="100%">
                        <Text>{cell.value}</Text>
                      </Center>
                    </Box>
                  )
                })}
              </Flex>
            )
          })}
        </Box>
      </GridItem>
    </Box>
  )
}

export default Map
