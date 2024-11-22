import { Box, useColorModeValue } from "@chakra-ui/react"
import {
  handleHeight,
  gridChartHeight,
} from "../../../../lib/data/chart/chartInfo"

export const GridItemContainer = ({ children }) => {
  return (
    <Box
      h={handleHeight(gridChartHeight)}
      p="4"
      bg={useColorModeValue("gray.50", "gray.800")}
      border="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.600")}
      shadow="md"
      rounded="xl"
    >
      {children}
    </Box>
  )
}
