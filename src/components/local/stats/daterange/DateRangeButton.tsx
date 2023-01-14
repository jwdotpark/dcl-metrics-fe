import {
  HStack,
  Box,
  Button,
  ButtonGroup,
  useColorMode,
} from "@chakra-ui/react"

const DateRangeButton = ({
  dateRange,
  setDateRange,
  validLegnth,
  name,
  yesterday,
}) => {
  const { colorMode } = useColorMode()
  const umamiEvent = `umami--click--${name}`

  const buttonColor = (value: boolean) => {
    if (value) {
      return colorMode === "light" ? "gray.300" : "gray.900"
    } else {
      return colorMode === "light" ? "gray.100" : "gray.700"
    }
  }

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
            {yesterday && (
              <Button
                w="100%"
                bg={buttonColor(dateRange === 1)}
                onClick={() => setDateRange(1)}
              >
                1d
              </Button>
            )}

            <Button
              w="100%"
              bg={buttonColor(dateRange === 7)}
              onClick={() => setDateRange(7)}
            >
              7d
            </Button>
            {!yesterday && (
              <Button
                w="100%"
                bg={buttonColor(dateRange === 14)}
                onClick={() => setDateRange(14)}
              >
                14d
              </Button>
            )}
            <Button
              w="100%"
              bg={buttonColor(dateRange === 30)}
              onClick={() => setDateRange(30)}
            >
              30d
            </Button>
            <Button
              w="100%"
              bg={buttonColor(dateRange === validLegnth)}
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
