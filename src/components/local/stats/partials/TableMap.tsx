import {
  Box,
  Image,
  Text,
  Center,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react"

const TableMap = ({ mapUrl }) => {
  const size = 17
  const mapWithSize = mapUrl.replace("size=15", `size=${size}`)

  return (
    <Box
      sx={{
        "&::-webkit-scrollbar": {
          display: "none",
        },
        msOverflfowStyle: "none",
        scrollbarWidth: "none",
      }}
      overflow="hidden"
      w={["100px", "125px", "150px", "200px"]}
      h="75px"
      border="2px solid"
      borderColor={useColorModeValue("gray.200", "gray.600")}
      borderRadius="xl"
    >
      <Center h="100%">
        <Image
          w={["100px", "125px", "150px", "200px"]}
          borderRadius="xl"
          objectFit="cover"
          alt="map image"
          src={mapWithSize}
        />
      </Center>
    </Box>
  )
}

export default TableMap
