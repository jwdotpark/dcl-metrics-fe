import { Box, Image, useColorModeValue } from "@chakra-ui/react"
import BoxWrapper from "../../../layout/local/BoxWrapper"

export const ImageBox = ({ event }) => {
  return (
    <BoxWrapper colSpan={[8, 8]}>
      <Box m="2" mb={[0, 4]}>
        <Box
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          borderRadius="xl"
        >
          <Image
            w="100%"
            borderRadius="xl"
            shadow="md"
            objectFit="cover"
            alt={event.name}
            src={event.image}
          />
        </Box>
      </Box>
    </BoxWrapper>
  )
}
