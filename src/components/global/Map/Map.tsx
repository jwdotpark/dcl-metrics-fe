/* eslint-disable react-hooks/rules-of-hooks */
import {
  Image,
  Box,
  Text,
  Center,
  Flex,
  GridItem,
  useColorModeValue,
  useBreakpointValue,
  Button,
  Spacer,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"

const Map = ({ h }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("gray.200", "gray.700"),
  }

  const mapBoxCss = {
    "&::-webkit-scrollbar": {
      display: "none",
    },
    scrollbarWidth: "none",
    "-webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none",
  }

  // create 4*4 grid
  const grid = {
    num: 1,
    size: useBreakpointValue({ base: 100, md: 150, lg: 250 }),
  }

  const minX = -Number(grid.num)
  const maxX = Number(grid.num)
  const minY = -Number(grid.num)
  const maxY = Number(grid.num)

  const gridData = []
  for (let x = minX; x <= maxX; x++) {
    const row = []
    for (let y = minY; y <= maxY; y++) {
      row.push({ x, y, value: `${x},${y}` })
    }
    gridData.push(row)
  }

  const [level, setLevel] = useState(1)

  const getPic = (x: number, y: number) => {
    console.log(`[${x},${y}]`)
    const num = x * 2 + y * 5 + level * 10
    return `https://picsum.photos/id/${num}/200/200`
  }

  const handleCellClick = () => {
    setLevel((prev) => prev + 1)
  }

  const Control = () => {
    return (
      <Box mx="4">
        <Flex>
          <Box>Level: {level}</Box>
          <Spacer />
          <Box>
            <Button
              isDisabled={level === 1 ? true : false}
              onClick={() => setLevel((prev) => prev - 1)}
              size="sm"
            >
              Go Back
            </Button>
          </Box>
        </Flex>
      </Box>
    )
  }

  return (
    <Box w={["100%", "100%", "100%", "auto"]} h={h}>
      <GridItem
        sx={mapBoxCss}
        // overflow="scroll"
        w={box.w}
        h="100%"
        mb="4"
        bg={box.bg}
        borderRadius="xl"
        shadow="md"
      >
        <Box p="2">
          <Box p="4">
            {gridData.map((row, i) => (
              <Center key={i}>
                <Flex>
                  {row.reverse().map((item, j) => (
                    <Box
                      key={j}
                      minW={grid.size}
                      maxW={grid.size}
                      minH={grid.size}
                      maxH={grid.size}
                      bg={useColorModeValue("gray.50", "gray.700")}
                      border="1px solid"
                      borderColor={useColorModeValue("gray.200", "gray.600")}
                    >
                      <Center
                        zIndex="2"
                        h="100%"
                        id={`${item.value}`}
                        onClick={() => handleCellClick()}
                      >
                        <Image
                          boxSize={grid.size}
                          minW={grid.size}
                          maxW={grid.size}
                          minH={grid.size}
                          maxH={grid.size}
                          objectFit="cover"
                          alt="pic"
                          src={getPic(item.x, item.y)}
                        />
                      </Center>
                    </Box>
                  ))}
                </Flex>
              </Center>
            ))}
          </Box>
          <Control />
        </Box>
      </GridItem>
    </Box>
  )
}

export default Map
