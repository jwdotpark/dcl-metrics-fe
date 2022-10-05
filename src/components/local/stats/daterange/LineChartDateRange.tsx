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
            w="100%"
            borderRadius="md"
            shadow="md"
            isAttached
            size="sm"
            variant="outline"
          >
            <Button
              w="100%"
              bgColor={dateRange === 7 && btnColor}
              onClick={() => setDateRange(7)}
            >
              7d
            </Button>
            <Button
              w="100%"
              bgColor={dateRange === 14 && btnColor}
              onClick={() => setDateRange(14)}
            >
              14d
            </Button>
            <Button
              w="100%"
              bgColor={dateRange === 30 && btnColor}
              onClick={() => setDateRange(30)}
            >
              30d
            </Button>
            <Button
              w="100%"
              bgColor={dateRange === 90 && btnColor}
              onClick={() => setDateRange(90)}
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
