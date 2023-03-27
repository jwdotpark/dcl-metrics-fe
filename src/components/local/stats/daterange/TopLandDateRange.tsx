import {
  HStack,
  ButtonGroup,
  Button,
  Box,
  useColorMode,
} from "@chakra-ui/react"

const TopLandDateRange = ({ dateRange, setDateRange, name }) => {
  const { colorMode } = useColorMode()
  const btnColor = (value: boolean) => {
    if (value) {
      return colorMode === "light" ? "gray.300" : "gray.900"
    } else {
      return colorMode === "light" ? "gray.100" : "gray.700"
    }
  }
  const umamiEvent = `umami--click--${name}`

  return (
    <Box w="100%" mt="4" mx="4" pr="8">
      <Box zIndex="1" mt="1">
        <HStack>
          <ButtonGroup
            className={umamiEvent}
            w="100%"
            borderRadius="xl"
            shadow="md"
            isAttached
            size="sm"
            variant="outline"
          >
            <Button
              w="100%"
              bgColor={btnColor(dateRange === "totalTop")}
              onClick={() => setDateRange("totalTop")}
            >
              Total
            </Button>
            <Button
              w="100%"
              bgColor={btnColor(dateRange === "yearTop")}
              onClick={() => setDateRange("yearTop")}
            >
              Year
            </Button>
          </ButtonGroup>
        </HStack>
      </Box>
    </Box>
  )
}

export default TopLandDateRange
