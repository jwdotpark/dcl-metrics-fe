import { Flex, Box, Text, Divider, Button } from "@chakra-ui/react"
import { format } from "date-fns"
import Link from "next/link"
import {
  FiCalendar,
  FiAtSign,
  FiCheckSquare,
  FiUser,
  FiHome,
  FiTag,
} from "react-icons/fi"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import ToolTip from "../../../layout/local/ToolTip"

const EventDetail = ({ icon, text }) => (
  <Flex align="center" direction="row" mb="2" mx="2">
    {icon}
    <Text ml="2" fontWeight="medium">
      {text}
    </Text>
  </Flex>
)

export const Title = ({ event }) => {
  console.log(event)
  return (
    <BoxWrapper colSpan="6">
      <Box m="4">
        <Flex>
          <Text fontSize={["xl", "2xl", "3xl", "4xl"]} fontWeight="black">
            {event.name}
          </Text>
        </Flex>
        <Divider my="2" />
        <EventDetail
          icon={<FiCalendar />}
          text={format(new Date(event.start_at), "yyyy MMMM d")}
        />
        <EventDetail icon={<FiAtSign />} text={event.scene_name || "N/A"} />
        <EventDetail
          icon={<FiTag />}
          text={event.categories[0]?.toUpperCase() || "N/A"}
        />
        <EventDetail
          icon={<FiCheckSquare />}
          text={event.approved ? "Approved event" : "Not Approved event"}
        />
        <Flex align="center" direction="row" mb="2" mx="2">
          <FiUser />

          <Text ml="2" fontWeight="medium">
            Organized by
            <Link href={`/users/${event.user_name}`}>
              <Text
                as="span"
                ml="1"
                color="blue.400"
                fontWeight="bold"
                _hover={{ color: "blue.600" }}
              >
                {event.user_name}
              </Text>
            </Link>
          </Text>
        </Flex>
        <EventDetail
          icon={<FiHome />}
          text={
            <ToolTip label={`Jump in [${event.x}, ${event.y}]`}>
              <Link href={event.url} target="_blank">
                <Button
                  borderRadius="md"
                  shadow="sm"
                  colorScheme="purple"
                  size="xs"
                >
                  {event.x}, {event.y}
                </Button>
              </Link>
            </ToolTip>
          }
        />
      </Box>
    </BoxWrapper>
  )
}
