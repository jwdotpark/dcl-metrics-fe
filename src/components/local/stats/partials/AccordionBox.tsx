import { Box, useColorModeValue } from "@chakra-ui/react"
import GridBox from "../../GridBox"

const AccordionBox = ({ children }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }
  return (
    <Box mb="4" borderRadius="md">
      <GridBox box={box}>{children}</GridBox>
    </Box>
  )
}

export default AccordionBox
