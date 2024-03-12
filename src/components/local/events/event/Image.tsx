import { Box, useColorModeValue, Image } from "@chakra-ui/react"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import ToolTip from "../../../layout/local/ToolTip"
import { Details } from "./Details"

export const ImageBox = ({ event }) => {
  return (
    <BoxWrapper colSpan="8">
      <Box pos="relative" m="4" mb={[0, 4]}>
        <Image borderRadius="xl" alt={event.name} src={event.image} />
        <Box
          pos="absolute"
          right="6"
          bottom="6"
          bg={useColorModeValue("whiteAlpha.200", "blackAlpha.400")}
          border="1px solid"
          borderRadius="xl"
          backdropBlur="50px"
          backdropFilter="auto"
        >
          <Details event={event} />
        </Box>
      </Box>
    </BoxWrapper>
  )
}
