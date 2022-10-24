import {
  HStack,
  Box,
  Button,
  ButtonGroup,
  useColorModeValue,
} from "@chakra-ui/react"

const ParcelDateRange = ({ dateRange, setDateRange }) => {
  const btnColor = useColorModeValue("gray.200", "gray.600")

  return (
    <Box w="100%" mt="4" mx="4" pr="8">
      <Box zIndex="1" mt="1">
        <HStack>
          <ButtonGroup
            w="100%"
            borderRadius="xl"
            shadow="md"
            isAttached
            size="sm"
            variant="outline"
          >
            <Button
              w="100%"
              bgColor={dateRange === "yesterday" && btnColor}
              onClick={() => setDateRange("yesterday")}
            >
              1d
            </Button>
            <Button
              w="100%"
              bgColor={dateRange === "last_week" && btnColor}
              onClick={() => setDateRange("last_week")}
            >
              7d
            </Button>
            <Button
              w="100%"
              bgColor={dateRange === "last_month" && btnColor}
              onClick={() => setDateRange("last_month")}
            >
              30d
            </Button>
            <Button
              w="100%"
              bgColor={dateRange === "last_quarter" && btnColor}
              onClick={() => setDateRange("last_quarter")}
            >
              90d
            </Button>
          </ButtonGroup>
        </HStack>
      </Box>
    </Box>
  )
}

export default ParcelDateRange
