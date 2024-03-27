import { Button, Text, Tag, Box, Flex } from "@chakra-ui/react"
import { format } from "date-fns"
import Link from "next/link"
import {
  FiAtSign,
  FiCalendar,
  FiClock,
  FiHome,
  FiTag,
  FiUser,
} from "react-icons/fi"
import { tagColor } from "../../../../lib/data/constant"
import { convertSeconds } from "../../../../lib/hooks/utils"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import ToolTip from "../../../layout/local/ToolTip"

export const EventInfo = ({ event }) => {
  const EventDetail = ({ icon, text }) => (
    <Flex align="center" direction="row" mb="2" mx="2">
      {icon}
      <Text ml="2" fontWeight="medium">
        {text}
      </Text>
    </Flex>
  )
  console.log(event)
  const category = event.categories[0].toString()

  return (
    <BoxWrapper colSpan={[8, 3]}>
      <BoxTitle
        name="Latest Event Details"
        description=""
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      <Box mx="4">
        <EventDetail
          icon={<FiCalendar />}
          text={format(new Date(event.next_start_at), "MMMM d, yyyy")}
        />
        <EventDetail icon={<FiAtSign />} text={event.scene_name || "N/A"} />

        <EventDetail
          icon={<FiClock />}
          text={
            <ToolTip label={`Duration`}>
              <Box>{convertSeconds(Number(event.duration) / 1000)}</Box>
            </ToolTip>
          }
        />
        <EventDetail
          icon={<FiTag />}
          text={
            <ToolTip label={`Category`}>
              <Tag
                fontSize="xs"
                _hover={{ cursor: "pointer" }}
                colorScheme={tagColor[category]}
                variant="solid"
              >
                {event.categories[0]?.toUpperCase() || "N/A"}
              </Tag>
            </ToolTip>
          }
        />

        <EventDetail
          icon={<FiUser />}
          text={
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
          }
        />
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
