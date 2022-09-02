import {
  HStack,
  Box,
  Button,
  ButtonGroup,
  useColorModeValue,
} from "@chakra-ui/react"

const DateRange = ({ dateRange, setDateRange }) => {
  const btnColor = useColorModeValue("gray.200", "gray.600")
  return (
    <Box zIndex="1" mt="1">
      <HStack>
        <ButtonGroup isAttached size="sm" variant="outline" boxShadow="sm">
          <Button
            onClick={() => setDateRange("1d")}
            bgColor={dateRange === "1d" && btnColor}
          >
            1d
          </Button>
          <Button
            onClick={() => setDateRange("7d")}
            bgColor={dateRange === "7d" && btnColor}
          >
            7d
          </Button>
          <Button
            onClick={() => setDateRange("30d")}
            bgColor={dateRange === "30d" && btnColor}
          >
            30d
          </Button>
        </ButtonGroup>
      </HStack>
    </Box>
  )
}

export default DateRange
