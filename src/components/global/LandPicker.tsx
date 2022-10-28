import {
  Text,
  Box,
  useColorModeValue,
  Flex,
  Spacer,
  Center,
  GridItem,
} from "@chakra-ui/react"
import GridBox from "../local/GridBox"
import Loading from "../local/Loading"

const LandPicker = () => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const LandPickerBox = () => {
    return (
      <GridItem w={box.w} h="350" mb="4" bg={box.bg} borderRadius="xl">
        {/* <LineChart data={result} color={color} /> */}
      </GridItem>
    )
  }

  return (
    <GridBox box={box}>
      <Flex pos="relative" mt="4" mx="5">
        <Flex w="100%">
          <Box>
            <Text fontSize="2xl">
              <b>Land Picker </b>
            </Text>
          </Box>
          <Spacer />
        </Flex>
      </Flex>
      <Box ml="6">
        <Text color="gray.500" fontSize="sm">
          Choose the land!
        </Text>
      </Box>

      <Box h="100%">
        <LandPickerBox />
      </Box>
    </GridBox>
  )
}

export default LandPicker
