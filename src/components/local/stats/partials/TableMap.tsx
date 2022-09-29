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
  const responsiveWidth = useBreakpointValue({
    md: "100px",
    lg: "200px",
    xl: "275px",
  })

  return (
    <Box w={responsiveWidth} borderRadius="xl" overflow="clip">
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
