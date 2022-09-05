import {
  HStack,
  Box,
  Button,
  ButtonGroup,
  useColorModeValue,
} from "@chakra-ui/react"

const TableDateRange = ({ dateRange, setDateRange }) => {
  const btnColor = useColorModeValue("gray.200", "gray.600")
  return (
    <Box w="100%" mt="4" mx="4" pr="8">
      <Box zIndex="1" mt="1">
        <HStack>
          <ButtonGroup
            isAttached
            size="sm"
            variant="outline"
            w="100%"
            boxShadow="md"
            borderRadius="md"
            overflow="hidden"
          >
            <Button
              w="100%"
              onClick={() => setDateRange("1d")}
              bgColor={dateRange === "1d" && btnColor}
            >
              1d
            </Button>
            <Button
              w="100%"
              onClick={() => setDateRange("7d")}
              bgColor={dateRange === "7d" && btnColor}
            >
              7d
            </Button>
            <Button
              w="100%"
              onClick={() => setDateRange("30d")}
              bgColor={dateRange === "30d" && btnColor}
            >
              30d
            </Button>
            <Button
              w="100%"
              onClick={() => setDateRange("90d")}
              bgColor={dateRange === "90d" && btnColor}
            >
              90d
            </Button>
          </ButtonGroup>
        </HStack>
      </Box>
    </Box>
  )
}

export default TableDateRange
