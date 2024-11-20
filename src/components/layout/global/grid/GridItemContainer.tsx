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
      bg={useColorModeValue("gray.200", "gray.700")}
      border="1px solid"
      borderColor={useColorModeValue("gray.300", "gray.800")}
      shadow="md"
    >
      {children}
    </Box>
  )
}
