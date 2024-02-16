import {
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Link,
  Spacer,
  Text,
} from "@chakra-ui/react"
import { format } from "date-fns"
import { FiAnchor, FiCalendar, FiGlobe } from "react-icons/fi"
import ToolTip from "../../layout/local/ToolTip"

const EventCard = ({ event }) => {
  return (
    <Flex direction="column" h="100%">
      <Box>
        <Link href={`/events/${event.id}`} target="_blank">
          <Box>
            <Image
              w="100%"
              h="200px"
              objectFit="cover"
              alt={event.name}
              src={event.image}
            />
          </Box>
        </Link>
        <Flex direction="column" h="100%" m="2">
          <Box h="auto">
            <ToolTip label={event.name}>
              <Box mb="2">
                <Text fontSize="sm" fontWeight="bold" noOfLines={[1, 2]}>
                  {event.name}
                </Text>
              </Box>
            </ToolTip>
            <Flex
              align={["left", "center"]}
              direction={["column", "row"]}
              gap={[2, 0]}
            >
              <Flex h="100%" fontSize="xs" fontWeight="bold" dir="row">
                <Flex direction="column">
                  <Flex direction="row">
                    <Box sx={{ transform: "translateY(3px)" }} mr="1">
                      <FiCalendar />
                    </Box>
                    <Box>
                      <Text as="span">
                        {format(new Date(event.next_start_at), "yyyy MMMM d")}
                      </Text>
                    </Box>
                  </Flex>
                  <Flex direction="row">
                    <Box sx={{ transform: "translateY(3px)" }} mr="1">
                      <FiAnchor />
                    </Box>
                    {event.scene_name ? (
                      <Text as="span" ml="0">
                        <span>{event.scene_name}</span>
                      </Text>
                    ) : (
                      "N/A"
                    )}
                  </Flex>
                </Flex>
              </Flex>
              <Spacer />
            </Flex>
          </Box>
          <Divider my="2" />
          <Box mb="2">
            <Text fontSize="xs" noOfLines={[1, 2, 3]}>
              {event.description}
            </Text>
          </Box>
          <Spacer />
        </Flex>
      </Box>
      <Spacer />
      <Box mx="4">
        <Link href={event.url} target="_blank">
          <ToolTip label={`Jump in this event`}>
            <Button
              w="100%"
              borderRadius="md"
              shadow="md"
              colorScheme="purple"
              size="xs"
            >
              <Flex
                sx={{ transform: "translateY(-1px)" }}
                direction="row"
                mr="1"
              >
                <Box sx={{ transform: "translateY(2px)" }} mr="2">
                  <FiGlobe />
                </Box>
                <Text>
                  {event.position[0]},{event.position[1]}
                </Text>
              </Flex>
            </Button>
          </ToolTip>
        </Link>
      </Box>
    </Flex>
  )
}

export default EventCard
