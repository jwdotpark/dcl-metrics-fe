import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Link,
  position,
  Spacer,
  Text,
} from "@chakra-ui/react"
import { format } from "date-fns"
import { FiCalendar, FiGlobe } from "react-icons/fi"
import ToolTip from "../../layout/local/ToolTip"

const EventCard = ({ event }) => {
  return (
    <>
      <Box>
        <Image
          w="100%"
          h="200px"
          objectFit="cover"
          alt={event.name}
          src={event.image}
        />
      </Box>
      <Flex direction="column" h="100%" m="2">
        <ToolTip label={event.name}>
          <Box mb="2">
            <Text fontSize="md" fontWeight="medium" noOfLines={[1, 2]}>
              {event.name}
            </Text>
          </Box>
        </ToolTip>
        <Divider my="2" />
        <Box mb="2">
          <Text fontSize="xs" noOfLines={[1, 2]}>
            {event.description}
          </Text>
        </Box>
        <Flex
          align={["left", "center"]}
          direction={["column", "row"]}
          gap={[2, 0]}
          mt="2"
        >
          <Flex h="100%" fontSize="xs" dir="row">
            <Center sx={{ transform: "translateY(0px)" }} mr="1">
              <FiCalendar />
            </Center>
            <Text as="span">
              {format(new Date(event.next_start_at), "MMM. d")}
            </Text>
            {event.scene_name && (
              <Text as="span" ml="1">
                @ <span>{event.scene_name}</span>
              </Text>
            )}
          </Flex>
          <Spacer />
        </Flex>
        <Spacer />
        <Box mt="2">
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
    </>
  )
}

export default EventCard
