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
      _hover={{
        shadow: useColorModeValue(
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
          "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
        ),
        transition: "outline 3s ease-in-out",
      }}
      transition="box-shadow 0.5s ease-in-out"
      rounded="xl"
    >
      {children}
    </Box>
  )
}
