/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import { Center, Box, Text, Flex, useColorModeValue } from "@chakra-ui/react"

const SceneParcelsHeatmap = ({ data }) => {
  console.log("data", data)

  // grab the smallest x and y values from the data
  const minX = Math.min(...Object.keys(data).map((d) => d.split(",")[0]))
  const maxX = Math.max(...Object.keys(data).map((d) => d.split(",")[0]))
  const minY = Math.min(...Object.keys(data).map((d) => d.split(",")[1]))
  const maxY = Math.max(...Object.keys(data).map((d) => d.split(",")[1]))

  // create a grid map
  const grid = []
  for (let y = minY; y <= maxY; y++) {
    const row = []
    for (let x = minX; x <= maxX; x++) {
      row.push({ x, y, value: data[`${x},${y}`] || 0 })
    }
    grid.push(row)
  }

  // normalize data's value into a new array from 0 to 100
  const normalizedData = grid.flat().map((d) => d.value)
  const min = Math.min(...normalizedData)
  const max = Math.max(...normalizedData)
  const normalizedGrid = grid.map((row) =>
    row.map((d) => {
      const normalizedValue = Math.floor(((d.value - min) / (max - min)) * 100)
      return { ...d, normalizedValue }
    })
  )

  return (
    <Box overflow="auto" h="360px" m="4" borderRadius="xl">
      {normalizedGrid.map((row, i) => {
        return (
          <Flex key={i} overflow="hidden">
            {row.map((cell, j) => {
              return (
                <Box
                  key={j}
                  w="100%"
                  h="100px"
                  bg={useColorModeValue(
                    `rgba(98, 114, 164, ${cell.normalizedValue / 100})`,
                    `rgba(16, 164, 114, ${cell.normalizedValue / 100})`
                  )}
                  border="1px solid"
                  borderColor={useColorModeValue("gray.100", "gray.700")}
                >
                  <Box m="2">
                    <Text as="kbd" fontSize="sm">
                      [{cell.x},{cell.y}]
                    </Text>
                  </Box>
                  <Center>
                    <Text fontSize="2xl" fontWeight="bold">
                      {cell.value}
                    </Text>
                  </Center>
                </Box>
              )
            })}
          </Flex>
        )
      })}
    </Box>
  )
}

export default SceneParcelsHeatmap
