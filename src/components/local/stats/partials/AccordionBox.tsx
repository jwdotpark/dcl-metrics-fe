import { Box, useColorModeValue } from "@chakra-ui/react"
import BoxWrapper from "../../../layout/local/BoxWrapper"

const AccordionBox = ({ children }) => {
  return (
    <Box mb="4" borderRadius="xl">
      <BoxWrapper colSpan={6}>{children}</BoxWrapper>
    </Box>
  )
}

export default AccordionBox
