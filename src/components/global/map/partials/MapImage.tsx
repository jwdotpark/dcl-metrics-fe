import {
  Image,
  Box,
  Center,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react"

const MapImage = ({ isPicLoading, name, image, isMapExpanded, isIncluded }) => {
  const height = [50, 75, 100]
  return (
    <Box w="100%" h={height} p="2">
      <Center h={height}>
        {isPicLoading ? (
          <Spinner />
        ) : (
          <Box
            overflow="hidden"
            w="100%"
            h={height}
            border="2px solid"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            borderColor={useColorModeValue("gray.200", "gray.700")}
            borderRadius="xl"
            shadow="md"
          >
            <Image
              minW="100%"
              h={height}
              objectFit="cover"
              alt={name}
              src={image}
            />
          </Box>
        )}
      </Center>
    </Box>
  )
}

export default MapImage
