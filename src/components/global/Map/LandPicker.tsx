import {
  Text,
  Box,
  useColorModeValue,
  Flex,
  Spacer,
  Center,
  GridItem,
  useBreakpointValue,
} from "@chakra-ui/react"
import GridBox from "../../local/GridBox"
import Loading from "../../local/Loading"
import Map from "./Map"
import MapInfo from "./MapInfo"

const LandPicker = () => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  // const h = useBreakpointValue({ base: 300, md: 400, lg: "auto" })
  const h = "auto"

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
        <Flex
          sx={{
            "& > * + *": {
              ml: [0, 0, 0, 0, 4],
              mt: [4, 4, 4, 0],
            },
          }}
          direction={["column", "column", "column", "column", "row"]}
          m="4"
          mb="4"
        >
          <Map h={h} />
          <MapInfo h={h} />
        </Flex>
      </Box>
    </GridBox>
  )
}

export default LandPicker
