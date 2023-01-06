import {
  HStack,
  Box,
  Button,
  ButtonGroup,
  useColorModeValue,
} from "@chakra-ui/react"

const DateRangeButton = ({ dateRange, setDateRange, validLegnth, name }) => {
  const btnColor = useColorModeValue("gray.200", "gray.600")
  const umamiEvent = `umami--click--${name}`

  return (
    <Box w="100%" mt="4" mx="4" pr="8">
      <Box zIndex="1" mt="1">
        <HStack>
          <ButtonGroup
            className={name.length !== 0 && umamiEvent}
            w="100%"
            borderRadius="xl"
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
              bgColor={dateRange === validLegnth && btnColor}
              onClick={() => setDateRange(validLegnth)}
            >
              {validLegnth}d
            </Button>
          </ButtonGroup>
        </HStack>
      </Box>
    </Box>
  )
}

export default DateRangeButton
