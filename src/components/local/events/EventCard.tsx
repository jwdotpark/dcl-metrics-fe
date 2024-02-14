import { Box, Divider, Image, Text } from "@chakra-ui/react"
import ToolTip from "../../layout/local/ToolTip"

const EventCard = ({ event }) => {
  return (
    <>
      <Box>
        <Image
          w="100%"
          h="150px"
          objectFit="cover"
          alt={event.name}
          src={event.image}
        />
      </Box>
      <Box m="2">
        <ToolTip label={event.name}>
          <Box mb="2">
            <Text fontSize="md" fontWeight="medium" noOfLines={[2, 3, 4]}>
              {event.name}
            </Text>
          </Box>
        </ToolTip>
        <Divider my="2" />
        <Box mb="2">
          <Text fontSize="xs" noOfLines={[1, 2, 3]}>
            {event.description}
          </Text>
        </Box>
      </Box>
    </>
  )
}

export default EventCard
