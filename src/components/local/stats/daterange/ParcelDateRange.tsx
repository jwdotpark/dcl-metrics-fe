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
            borderRadius="md"
            shadow="md"
            isAttached
            size="sm"
            variant="outline"
          >
            <Button
              w="100%"
              bgColor={dateRange === 0 && btnColor}
              onClick={() => setDateRange(0)}
            >
              1d
            </Button>
            <Button
              w="100%"
              bgColor={dateRange === 1 && btnColor}
              onClick={() => setDateRange(1)}
            >
              7d
            </Button>
            <Button
              w="100%"
              bgColor={dateRange === 2 && btnColor}
              onClick={() => setDateRange(2)}
            >
              30d
            </Button>
            <Button
              w="100%"
              bgColor={dateRange === 3 && btnColor}
              onClick={() => setDateRange(3)}
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
