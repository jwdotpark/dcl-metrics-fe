import {
  HStack,
  Box,
  Button,
  ButtonGroup,
  useColorModeValue,
} from "@chakra-ui/react"

const LineChartDateRange = ({ dateRange, setDateRange }) => {
  const btnColor = useColorModeValue("gray.200", "gray.600")

  // range 7, 30, 90
  return (
    <Box zIndex="1" mt="1">
      <HStack>
        <ButtonGroup isAttached size="sm" variant="outline" boxShadow="sm">
          <Button
            onClick={() => setDateRange(7)}
            bgColor={dateRange === 7 && btnColor}
          >
            7D
          </Button>
          <Button
            onClick={() => setDateRange(14)}
            bgColor={dateRange === 14 && btnColor}
          >
            14D
          </Button>
          <Button
            onClick={() => setDateRange(30)}
            bgColor={dateRange === 30 && btnColor}
          >
            1M
          </Button>
          <Button
            onClick={() => setDateRange(90)}
            bgColor={dateRange === 90 && btnColor}
          >
            3M
          </Button>
        </ButtonGroup>
      </HStack>
    </Box>
  )
}

export default LineChartDateRange
