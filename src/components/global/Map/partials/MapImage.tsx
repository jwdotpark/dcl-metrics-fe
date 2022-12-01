import {
  Image,
  Box,
  Center,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react"

const MapImage = ({ isPicLoading, name, image }) => {
  return (
    <Box w="100%" minH={[100, 125, 125]} p="2">
      <Center minH={[100, 125, 125]}>
        {isPicLoading ? (
          <Spinner />
        ) : (
          <Box
            overflow="hidden"
            w="100%"
            border="2px solid"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            borderColor={useColorModeValue("gray.200", "gray.700")}
            borderRadius="xl"
            shadow="md"
          >
            <Image
              minW="100%"
              h={[100, 125, 125]}
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
