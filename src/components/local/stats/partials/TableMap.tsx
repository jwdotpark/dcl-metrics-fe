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
    base: "100%",
    sm: "150px",
    md: "100px",
    lg: "200px",
    xl: "275px",
  })

  return (
    <Box
      overflow="clip"
      w={responsiveWidth}
      maxH="100px"
      border="2px solid"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
    >
      <Center h="100%">
        <Image
          borderRadius="md"
          objectFit="cover"
          alt="map image"
          src={mapWithSize}
        />
      </Center>
    </Box>
  )
}

export default TableMap
