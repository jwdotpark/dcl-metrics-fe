import { Box, useColorModeValue } from "@chakra-ui/react"
import GridBox from "../../GridBox"

const AvgStatBox = () => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  return (
    <Box>
      <GridBox box={box}>
        <Box h={["auto", "auto", "auto", "auto", 400]} p="4">
          avg stag box
        </Box>
      </GridBox>
    </Box>
  )
}

export default AvgStatBox
