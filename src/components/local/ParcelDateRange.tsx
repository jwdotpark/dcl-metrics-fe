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
    <Box zIndex="1" mt="1">
      <HStack>
        <ButtonGroup isAttached size="sm" variant="outline" boxShadow="sm">
          <Button
            onClick={() => setDateRange(0)}
            bgColor={dateRange === 0 && btnColor}
          >
            1D
          </Button>
          <Button
            onClick={() => setDateRange(1)}
            bgColor={dateRange === 1 && btnColor}
          >
            7D
          </Button>
          <Button
            onClick={() => setDateRange(2)}
            bgColor={dateRange === 2 && btnColor}
          >
            1M
          </Button>
          <Button
            onClick={() => setDateRange(3)}
            bgColor={dateRange === 3 && btnColor}
          >
            3M
          </Button>
        </ButtonGroup>
      </HStack>
    </Box>
  )
}

export default ParcelDateRange
