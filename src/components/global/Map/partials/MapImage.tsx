import {
  Image,
  Box,
  Center,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react"

const MapImage = ({ isPicLoading, name, image }) => {
  return (
    <Box w="100%" minH={[150, 175, 400]} p="2">
      <Center minH={[150, 175, 400]}>
        {isPicLoading ? (
          <Spinner />
        ) : (
          <Box
            overflow="hidden"
            w="100%"
            border="2px solid"
            // eslint-disable-next-line react-hooks/rules-of-hooks
            borderColor={useColorModeValue("gray.300", "gray.600")}
            borderRadius="xl"
          >
            <Image
              minW="100%"
              h={[150, 175, 400]}
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
