import { Box, Center, Image, useColorModeValue } from "@chakra-ui/react"
import BoxWrapper from "../../../layout/local/BoxWrapper"

export const ImageBox = ({ event }) => {
  return (
    <BoxWrapper colSpan={[8, 5]}>
      <Box mt={[4, 2]} mb={[0, 2]} mx={[4, 2]}>
        <Center>
          <Image
            w="100%"
            h="100%"
            maxH="600px"
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="xl"
            shadow="md"
            objectFit="cover"
            alt={event.name}
            src={event.image}
          />
        </Center>
      </Box>
    </BoxWrapper>
  )
}
