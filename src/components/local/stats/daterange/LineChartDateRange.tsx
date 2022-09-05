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
    <Box w="100%" mt="4" mx="4" pr="8">
      <Box zIndex="1" mt="1">
        <HStack>
          <ButtonGroup
            isAttached
            size="sm"
            variant="outline"
            boxShadow="sm"
            w="100%"
          >
            <Button
              w="100%"
              onClick={() => setDateRange(7)}
              bgColor={dateRange === 7 && btnColor}
            >
              7d
            </Button>
            <Button
              w="100%"
              onClick={() => setDateRange(14)}
              bgColor={dateRange === 14 && btnColor}
            >
              14d
            </Button>
            <Button
              w="100%"
              onClick={() => setDateRange(30)}
              bgColor={dateRange === 30 && btnColor}
            >
              30d
            </Button>
            <Button
              w="100%"
              onClick={() => setDateRange(90)}
              bgColor={dateRange === 90 && btnColor}
            >
              90d
            </Button>
          </ButtonGroup>
        </HStack>
      </Box>
    </Box>
  )
}

export default LineChartDateRange
