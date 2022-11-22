import { Image, Box, Center, Spinner } from "@chakra-ui/react"

const MapImage = ({ isPicLoading, name, image }) => {
  return (
    <Box w="100%" h={[125, 150, 175]} p="2">
      <Center h="100%">
        {isPicLoading ? (
          <Spinner />
        ) : (
          <Box overflow="hidden" w="100%" borderRadius="xl">
            <Image
              minW="100%"
              h={[150, 175, 200]}
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
