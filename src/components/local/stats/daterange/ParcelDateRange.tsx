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
            isAttached
            size="sm"
            variant="outline"
            boxShadow="sm"
            w="100%"
          >
            <Button
              w="100%"
              onClick={() => setDateRange(0)}
              bgColor={dateRange === 0 && btnColor}
            >
              1d
            </Button>
            <Button
              w="100%"
              onClick={() => setDateRange(1)}
              bgColor={dateRange === 1 && btnColor}
            >
              7d
            </Button>
            <Button
              w="100%"
              onClick={() => setDateRange(2)}
              bgColor={dateRange === 2 && btnColor}
            >
              30d
            </Button>
            <Button
              w="100%"
              onClick={() => setDateRange(3)}
              bgColor={dateRange === 3 && btnColor}
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
