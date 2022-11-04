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

  return (
    <Box w={["100%", "100%", "100%", "80%"]} h={h}>
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
          <Box>atlas</Box>
        </Box>
      </GridItem>
    </Box>
  )
}

export default Map
