/* eslint-disable react-hooks/rules-of-hooks */
import {
  SimpleGrid,
  ButtonGroup,
  Button,
  Text,
  Image,
  Box,
  Center,
  Flex,
  Spinner,
  useColorModeValue,
} from "@chakra-ui/react"
import { format } from "date-fns"
import Link from "next/link"
import { FiCalendar, FiTag } from "react-icons/fi"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"

type UserEventProps = {
  event: {
    ok?: boolean
    data?: any[]
  }
  userAddressRes: {
    address: string
    name: string
    avatar_url: string
    first_seen: string
    last_seen: string
    guest: boolean
    verified: boolean
    dao_member: boolean
  }
}

const UserEvent = ({ event, userAddressRes }: UserEventProps) => {
  const { data } = event
  const { name } = userAddressRes
  let eventTable: JSX.Element

  if (!event.ok) {
    eventTable = (
      <Center h="350px">
        <Spinner />
      </Center>
    )
  } else {
    eventTable = (
      <Box m="4">
        <SimpleGrid columns={[1, 2]} spacing="4">
          {data.map((event: any) => {
            return (
              <Box
                key={event.name}
                overflow="hidden"
                bg={useColorModeValue("gray.50", "gray.900")}
                border="1px"
                borderColor={useColorModeValue("gray.100", "gray.700")}
                borderRadius="xl"
                shadow="md"
                _hover={{
                  shadow: useColorModeValue(
                    "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                    "rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px"
                  ),
                }}
                transition="box-shadow background-color 0.1s ease-in-out"
              >
                <Image objectFit="cover" alt={event.name} src={event.image} />
                <Box m="4">
                  <Text as="span" fontWeight="bold">
                    {event.name}
                  </Text>
                  <Flex align="center" h="100%" mt="2">
                    <Flex h="100%" dir="row">
                      <Center sx={{ transform: "translateY(-1px)" }} mr="1">
                        <FiCalendar />
                      </Center>
                      <Text as="span">
                        {format(new Date(event.next_start_at), "yyyy MMM. d")}
                      </Text>
                      {event.scene_name && (
                        <Text as="span" ml="1">
                          @ <span>{event.scene_name}</span>
                        </Text>
                      )}
                    </Flex>
                    <Box ml="2">
                      {event.categories.map((item) => {
                        return (
                          <ButtonGroup key={item} as="span" isAttached>
                            <Button borderRadius="full" shadow="sm" size="xs">
                              <Box mr="1">
                                <FiTag />
                              </Box>
                              {item.toUpperCase()}
                            </Button>
                          </ButtonGroup>
                        )
                      })}
                    </Box>
                  </Flex>
                </Box>
                <ButtonGroup w="100%" p="4">
                  <Box w="100%">
                    <Link href={`/events/${event.id}`} target="_blank">
                      <Button w="100%" shadow="md" size="sm">
                        Event Page
                      </Button>
                    </Link>
                  </Box>
                  <Box w="100%">
                    <Link href={event.url} target="_blank">
                      <Button w="100%" shadow="md" size="sm">
                        Join [{event.x}, {event.y}]
                      </Button>
                    </Link>
                  </Box>
                </ButtonGroup>
              </Box>
            )
          })}
        </SimpleGrid>
      </Box>
    )
  }

  return (
    <Box mb="4">
      <BoxWrapper colSpan={[1, 1, 1, 4, 6]}>
        <BoxTitle
          name={`User Event`}
          description={`Event hosted by ${name}`}
          date=""
          avgData={[]}
          slicedData={{}}
          color={""}
          line={false}
          setLine={{}}
        />
        {eventTable}
      </BoxWrapper>
    </Box>
  )
}

export default UserEvent
