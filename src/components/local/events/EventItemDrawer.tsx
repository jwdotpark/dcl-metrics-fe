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
} from "@chakra-ui/react"
import { format } from "date-fns"
import Link from "next/link"
import { FiCalendar, FiGlobe, FiInfo } from "react-icons/fi"
import ToolTip from "../../layout/local/ToolTip"
import ChakraUIRenderer from "chakra-ui-markdown-renderer"
import ReactMarkdown from "react-markdown"

const EventItemDrawer = ({ data }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  console.log(data)
  const position = {
    x: data.position[0],
    y: data.position[1],
  }

  return (
    <Box>
      <>
        <Button onClick={onOpen} size="sm" variant="ghost">
          <FiInfo />
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} placement="right" size="xl">
          <DrawerOverlay />
          <DrawerContent>
            <DrawerBody>
              <Box overflow="hidden" m="-8" mb="8" borderRadius="md">
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
                    {format(new Date(data.next_start_at), "yyyy MMM. d")}
                  </Text>
                  {data.scene_name && (
                    <Text as="span" ml="1">
                      @ <span>{data.scene_name}</span>
                    </Text>
                  )}
                </Flex>
                <Spacer />
                <Box ml={[0, 2]}>
                  <Link href={data.url} target="_blank">
                    <ToolTip label={`Jump in this event`}>
                      <Button
                        borderRadius="xl"
                        shadow="md"
                        colorScheme="purple"
                        size="sm"
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
              <Box mt="4">
                <ReactMarkdown
                  components={ChakraUIRenderer()}
                  // eslint-disable-next-line react/no-children-prop
                  children={data.description}
                  skipHtml
                />
              </Box>
              <Divider my="4" />
              <Box></Box>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </Box>
  )
}

export default EventItemDrawer
