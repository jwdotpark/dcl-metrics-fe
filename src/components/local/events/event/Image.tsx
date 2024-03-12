import { Box, Image, useColorModeValue } from "@chakra-ui/react"
import BoxWrapper from "../../../layout/local/BoxWrapper"

export const ImageBox = ({ event }) => {
  return (
    <BoxWrapper colSpan={[8, 6]}>
      <Box m="4" mb={[0, 4]}>
        <Box
          border="1px solid"
          borderColor={useColorModeValue("gray.600", "gray.200")}
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
