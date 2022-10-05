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
    base: "100px",
    sm: "100px",
    md: "125px",
    lg: "150px",
    xl: "200px",
  })

  const responsiveHeight = useBreakpointValue({
    base: "75px",
    sm: "75px",
    md: "75px",
    lg: "75px",
  })

  return (
    <Box
      overflow="clip"
      w={responsiveWidth}
      h={responsiveHeight}
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
