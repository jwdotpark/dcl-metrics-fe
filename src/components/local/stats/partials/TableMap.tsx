import {
  Box,
  Image,
  Text,
  Center,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react"

const TableMap = ({ mapUrl }) => {
  const size = 15
  const mapWithSize = mapUrl.replace("size=15", `size=${size}`)

  return (
    <Box
      h="100px"
      minW="100px"
      maxW="300px"
      borderRadius="xl"
      border="3px solid"
      borderColor={useColorModeValue("gray.300", "gray.600")}
      overflow="clip"
    >
      <Center h="100%">
        <Image
          borderRadius="md"
          src={mapWithSize}
          alt="map image"
          objectFit="cover"
        />
      </Center>
    </Box>
  )
}

export default TableMap
