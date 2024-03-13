import {
  Text,
  Box,
  Image,
  GridItem,
  useColorModeValue,
  Flex,
  Spacer,
  Center,
} from "@chakra-ui/react"
import { format } from "date-fns"
import { generateOppositeColor, isMobile } from "../../../lib/hooks/utils"
import BoxTitle from "../../layout/local/BoxTitle"
import { PaginatedScheduledEvents } from "./PaginatedScheduledEvents"

export const Scheduled = ({ scheduleData }) => {
  const {
    active_since,
    active_until,
    background,
    description,
    id,
    image,
    name,
  } = scheduleData.data[0]

  const box = {
    h: "auto",
    w: "100%",
    p: [0, 1, 1, 2, 2],
    bg: useColorModeValue(background[0], generateOppositeColor(background[0])),
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
      overflowX="hidden"
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
        name={name}
        description={`From ${format(
          new Date(active_since),
          "MMMM d"
        )} till ${format(new Date(active_until), "MMMM d")}`}
        date={""}
        avgData={[]}
        slicedData={() => {}}
        color={""}
        line={""}
        setLine={""}
      />

      <Flex pos="relative" direction={["column", "row"]} mb="4" mx="4">
        <Spacer />
        <Box
          pos="relative"
          overflow="hidden"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          borderRadius="xl"
          shadow="md"
          _hover={{
            "> div": { opacity: 1 },
          }}
        >
          <Image objectFit="cover" alt={name} src={image} />
          <Box
            pos="absolute"
            top="0"
            right="0"
            bottom="0"
            left="0"
            p="4"
            color="white"
            bg="rgba(0, 0, 0, 0.75)"
            opacity="0"
            transition="opacity 0.3s"
          >
            <Center w="100%" h="100%">
              {description}
            </Center>
          </Box>
        </Box>
      </Flex>

      {isMobile() && (
        <Box m="4">
          <Text fontSize="sm">{description}</Text>
        </Box>
      )}

      <PaginatedScheduledEvents id={id} />
    </GridItem>
  )
}
