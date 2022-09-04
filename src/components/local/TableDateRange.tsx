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
    <Box zIndex="1" mt="1">
      <HStack>
        <ButtonGroup isAttached size="sm" variant="outline" boxShadow="sm">
          <Button
            onClick={() => setDateRange("1d")}
            bgColor={dateRange === "1d" && btnColor}
          >
            1D
          </Button>
          <Button
            onClick={() => setDateRange("7d")}
            bgColor={dateRange === "7d" && btnColor}
          >
            7D
          </Button>
          <Button
            onClick={() => setDateRange("30d")}
            bgColor={dateRange === "30d" && btnColor}
          >
            1M
          </Button>
          <Button
            onClick={() => setDateRange("90d")}
            bgColor={dateRange === "90d" && btnColor}
          >
            3M
          </Button>
        </ButtonGroup>
      </HStack>
    </Box>
  )
}

export default TableDateRange
