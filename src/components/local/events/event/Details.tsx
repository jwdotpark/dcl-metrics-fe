import { Flex, Button, Text, Box } from "@chakra-ui/react"

import { format } from "date-fns"

import Link from "next/link"

import {
  FiCalendar,
  FiAtSign,
  FiTag,
  FiCheckSquare,
  FiUser,
  FiHome,
} from "react-icons/fi"
import BoxTitle from "../../../layout/local/BoxTitle"

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

export const Details = ({ event }) => {
  console.log(event)
  return (
    <BoxWrapper colSpan={[8, 2]}>
      <BoxTitle
        name="Details"
        description=""
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      <Box p="4">
        <EventDetail
          icon={<FiCalendar />}
          text={format(new Date(event.start_at), "yyyy MMMM d HH:mm")}
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
            <Link href={`/users/${event.user}`}>
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
