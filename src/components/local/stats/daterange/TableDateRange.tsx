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
            w="100%"
            borderRadius="xl"
            shadow="md"
            isAttached
            size="sm"
            variant="outline"
          >
            <Button
              w="100%"
              bgColor={dateRange === "1d" && btnColor}
              onClick={() => setDateRange("1d")}
            >
              1d
            </Button>
            <Button
              w="100%"
              bgColor={dateRange === "7d" && btnColor}
              onClick={() => setDateRange("7d")}
            >
              7d
            </Button>
            <Button
              w="100%"
              bgColor={dateRange === "30d" && btnColor}
              onClick={() => setDateRange("30d")}
            >
              30d
            </Button>
            <Button
              w="100%"
              bgColor={dateRange === "90d" && btnColor}
              onClick={() => setDateRange("90d")}
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
