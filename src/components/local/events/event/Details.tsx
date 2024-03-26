import {
  Flex,
  Button,
  Text,
  Box,
  Tag,
  GridItem,
  useColorModeValue,
} from "@chakra-ui/react"
import { format } from "date-fns"
import Link from "next/link"
import { FiCalendar, FiAtSign, FiTag, FiUser, FiHome } from "react-icons/fi"
import { tagColor } from "../../../../lib/data/constant"
import BoxTitle from "../../../layout/local/BoxTitle"
import ToolTip from "../../../layout/local/ToolTip"

const EventDetail = ({ icon, text }) => (
  <Flex align="center" direction="row" mb="2" mx="2">
    {icon}

    <Text ml="2" fontWeight="medium">
      {text}
    </Text>
  </Flex>
)

export const Details = ({ event, sceneData }) => {
  const category = event.categories[0].toString()

  const box = {
    h: "100%",
    w: "100%",
    p: [0, 1, 1, 2, 2],
    bg: useColorModeValue("white", "gray.800"),
    border: "1px solid",
    borderColor: useColorModeValue("gray.300", "gray.600"),
    borderRadius: "xl",
    shadow: "md",
    pb: 4,
    colSpan: 8,
    hover: {
      shadow: useColorModeValue(
        "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
        "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
      ),
      transition: "outline 0.1s ease-in-out",
    },
    transition: "box-shadow 0.5s ease-in-out",
  }

  return (
    <GridItem
      w={box.w}
      h={box.h}
      p={box.p}
      pb={box.pb}
      bg={box.bg}
      border={box.border}
      borderColor={box.borderColor}
      borderRadius={box.borderRadius}
      shadow={box.shadow}
      _hover={box.hover}
      transition={box.transition}
      colSpan={box.colSpan}
    >
      <BoxTitle
        name={`Event Details`}
        description=""
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />
      <Box h="100%" p="4">
        <EventDetail
          icon={<FiCalendar />}
          text={format(new Date(sceneData.date), "MMM d, yyyy")}
        />
        <EventDetail icon={<FiAtSign />} text={event.scene_name || "N/A"} />
        <EventDetail
          icon={<FiTag />}
          text={
            <Tag
              fontSize="xs"
              _hover={{ cursor: "pointer" }}
              colorScheme={tagColor[category]}
              variant="solid"
            >
              {event.categories[0]?.toUpperCase() || "N/A"}
            </Tag>
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
    </GridItem>
  )
}
