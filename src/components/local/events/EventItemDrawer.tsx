import {
  Divider,
  Image,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  useDisclosure,
  Heading,
  Text,
  Center,
  Flex,
  Spacer,
  useColorModeValue,
} from "@chakra-ui/react"
import { format } from "date-fns"
import Link from "next/link"
import { FiCalendar, FiClock, FiGlobe } from "react-icons/fi"
import ToolTip from "../../layout/local/ToolTip"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import ReactMarkdown from "react-markdown"
import { isMobile } from "../../../lib/hooks/utils"

const EventItemDrawer = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const position = {
    x: data.position[0],
    y: data.position[1],
  }

  // make a function that find the next closed date in data.recurrent_dates
  // eslint-disable-next-line no-unused-vars
  const findNextDate = (recurrentEvents: string[]) => {
    //const dates = data.recurrent_dates
    const now = new Date()
    const nextDate = recurrentEvents.find((d) => {
      const dDate = new Date(d)
      return dDate > now
    })
    return nextDate
  }

  return (
    <Box>
      <>
        <Box _hover={{ cursor: "pointer" }} onClick={onOpen}>
          <Text
            color="blue.400"
            fontSize="xs"
            fontWeight="bold"
            _hover={{ color: "blue.600" }}
          >
            {data.name.slice(0, 80) + (data.name.length > 80 ? "..." : "")}
          </Text>
        </Box>
        <Drawer
          isOpen={isOpen}
          onClose={onClose}
          placement="right"
          size={["lg", "md"]}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody>
              <Box
                overflow="hidden"
                mt="8"
                mb="8"
                border="3px solid"
                borderColor={useColorModeValue("gray.300", "gray.600")}
                borderRadius="xl"
                shadow="sm"
              >
                <Image alt={data.name} src={data.image} />
              </Box>
              <Box mb="-4">
                <Heading>{data.name}</Heading>
              </Box>
              <Divider mb="4" />
              <Flex
                align={["left", "center"]}
                direction={["column", "row"]}
                gap={[2, 0]}
                mt="2"
              >
                <Flex h="100%" dir="row">
                  <Center sx={{ transform: "translateY(-3px)" }} mr="1">
                    <FiCalendar />
                  </Center>
                  <Text as="span">
                    {format(new Date(data.next_start_at), "yyyy MMMM d")}
                  </Text>
                  {data.scene_name && (
                    <Text ml="1">{"@ " + data.scene_name}</Text>
                  )}
                </Flex>
                <Spacer />
                <Box ml={[0, 2]}>
                  <Link href={data.url} target="_blank">
                    <ToolTip label={`Jump in this event`}>
                      <Button
                        borderRadius="lg"
                        shadow="md"
                        colorScheme="purple"
                        size="xs"
                      >
                        <Box sx={{ transform: "translateY(-1px)" }} mr="1">
                          <FiGlobe />
                        </Box>
                        <Text>
                          {position.x},{position.y}
                        </Text>
                      </Button>
                    </ToolTip>
                  </Link>
                </Box>
              </Flex>
              <Divider my="4" />
              <Flex>
                <Box sx={{ transform: "translateY(2px)" }} mr="1">
                  <FiClock />
                </Box>
                <Center>
                  {format(new Date(data.next_start_at), "MMMM d HH:mm")} -{" "}
                  {format(new Date(data.next_finish_at), "MMMM d HH:mm")}
                </Center>
              </Flex>
              <Divider my="4" />
              <Box mt="4">
                <ReactMarkdown
                  components={ChakraUIRenderer()}
                  // eslint-disable-next-line react/no-children-prop
                  children={data.description}
                  skipHtml
                />
              </Box>
              <Divider my="4" />
              {isMobile() && (
                <Box w="100%">
                  <Button
                    w="100%"
                    mb="4"
                    borderRadius="xl"
                    shadow="md"
                    onClick={onClose}
                  >
                    Close
                  </Button>
                </Box>
              )}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </Box>
  )
}

export default EventItemDrawer
