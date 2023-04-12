import {
  Flex,
  Divider,
  Box,
  Text,
  VStack,
  Spacer,
  Button,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  List,
  ListItem,
  UnorderedList,
  useBreakpointValue,
  Center,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Tr,
  useToast,
} from "@chakra-ui/react"
import CountUp from "react-countup"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import { useRouter } from "next/router"
import Link from "next/link"
import ToolTip from "../../../layout/local/ToolTip"
import moment from "moment"

const UserDAOActivity = ({ data }) => {
  const {
    name,
    title,
    total_vp,
    votes,
    active_dao_committee_member,
    address,
    collection_creator,
    collections,
    dao_member,
    delegate,
    delegated_vp,
    delegators,
    grants,
    proposals,
    teams,
  } = data

  const router = useRouter()

  const responsiveStr = useBreakpointValue({
    xs: 5,
    sm: 5,
    md: 50,
    lg: 20,
    xl: 50,
    base: 20,
  })

  const truncateName = (name: string) => {
    const nameLength = responsiveStr
    if (name && name.length > nameLength) {
      return name.slice(0, nameLength) + ".."
    }
    return name
  }

  console.log(collections)

  const toast = useToast()

  const handleToast = (value) => {
    navigator.clipboard.writeText(value)
    toast({
      description: "Address " + value + " has been copied to the clipboard.",
      duration: 2000,
      isClosable: true,
      position: "bottom-right",
      status: "success",
    })
  }

  return (
    <BoxWrapper colSpan={[1, 1, 1, 2, 2]}>
      <BoxTitle
        name="DAO Activity"
        description={`${name}'s DAO activity`}
        date=""
        avgData={[]}
        slicedData={{}}
        color={{}}
        line={false}
        setLine={{}}
      />
      <Flex direction="column" w="auto" m="4" mx="5">
        <Box w="100%">
          <VStack align="stretch" spacing={[2, 2, 2, 5, 5]}>
            <Flex w="100%" h="100%">
              <Box>Title</Box>
              <Spacer />
              <Box>
                <Text>
                  <b>{title ? title : "N/A"}</b>
                </Text>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Total VP</Box>
              <Spacer />
              <Box>
                <b>
                  <CountUp end={total_vp} duration={0.5} decimals={0} />
                </b>
              </Box>
            </Flex>
            {votes && (
              <>
                <Flex w="100%" h="100%">
                  <Box>Total Votes</Box>
                  <Spacer />
                  <Box>
                    <b>
                      <CountUp
                        end={votes.total_votes ? votes.total_votes : 0}
                        duration={0.5}
                        decimals={0}
                      />
                    </b>
                  </Box>
                </Flex>
                <Flex w="100%" h="100%">
                  <Box>First Vote</Box>
                  <Spacer />
                  <Box>
                    <b>{votes.first_vote_cast_at}</b>
                  </Box>
                </Flex>
                <Flex w="100%" h="100%">
                  <Box>Latest Vote</Box>
                  <Spacer />
                  <Box>
                    <b>{votes.latest_vote_cast_at}</b>
                  </Box>
                </Flex>
              </>
            )}
            <Flex w="100%" h="100%">
              <Box>Active DAO Committee Member</Box>
              <Spacer />
              <Box>
                <Text color={active_dao_committee_member ? "green" : "red"}>
                  <b>{active_dao_committee_member ? "Yes" : "No"}</b>
                </Text>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Collection Creator</Box>
              <Spacer />
              <Box>
                <Text color={collection_creator ? "green" : "red"}>
                  <b>{collection_creator ? "Yes" : "No"}</b>
                </Text>
              </Box>
            </Flex>
            {/* TODO check if array is not empty */}
            {collections && (
              <Flex w="100%" h="100%">
                <Box>Collection</Box>
                <Spacer />
                <Box>
                  <Text>
                    <b>
                      {collections.length > 0 ? (
                        <Popover placement="left">
                          <PopoverTrigger>
                            <Button
                              borderRadius="xl"
                              disabled={delegators.length > 0 ? false : true}
                              size="sm"
                              variant="solid"
                            >
                              {collections.length > 0
                                ? collections.length
                                : "N/A"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent w="100%" borderRadius="xl">
                            <PopoverArrow />
                            <PopoverBody>
                              {collections.length > 0 &&
                                collections.map((item) => {
                                  return (
                                    <Flex key={item.name} w="100%" mb="2">
                                      <Box w="100%">
                                        <Popover placement="left">
                                          <PopoverTrigger>
                                            <Box w="100%">
                                              <Button
                                                w="100%"
                                                shadow="md"
                                                size="sm"
                                                variant="solid"
                                              >
                                                <Center>
                                                  <Text>{item.name}</Text>
                                                </Center>
                                              </Button>
                                            </Box>
                                          </PopoverTrigger>
                                          <PopoverContent>
                                            <PopoverArrow />
                                            <PopoverBody>
                                              <Center w="auto" mb="2">
                                                <Text>{item.name}</Text>
                                              </Center>
                                              <Divider />
                                              <Box>
                                                <Table
                                                  w="100%"
                                                  size="sm"
                                                  variant="simple"
                                                >
                                                  <Tbody>
                                                    <Tr>
                                                      <Td>Symbol</Td>
                                                      <Td isNumeric>
                                                        {item.symbol}
                                                      </Td>
                                                    </Tr>
                                                    <Tr>
                                                      <Td>Items</Td>
                                                      <Td isNumeric>
                                                        <Text noOfLines={1}>
                                                          {item.items}
                                                        </Text>
                                                      </Td>
                                                    </Tr>
                                                    <Tr>
                                                      <Td>Collection ID</Td>
                                                      <Td isNumeric>
                                                        <ToolTip label="Click to copy the address">
                                                          <Button
                                                            borderRadius="xl"
                                                            onClick={() =>
                                                              handleToast(
                                                                item.collection_id
                                                              )
                                                            }
                                                            size="sm"
                                                          >
                                                            ID
                                                          </Button>
                                                        </ToolTip>
                                                      </Td>
                                                    </Tr>
                                                    <Tr>
                                                      <Td>Approved</Td>
                                                      <Td isNumeric>
                                                        <Text
                                                          color={
                                                            item.approved
                                                              ? "green"
                                                              : "red"
                                                          }
                                                        >
                                                          {item.approved
                                                            ? "Yes"
                                                            : "No"}
                                                        </Text>
                                                      </Td>
                                                    </Tr>
                                                    <Tr>
                                                      <Td>Created At</Td>
                                                      <Td isNumeric>
                                                        {moment(
                                                          item.created_at
                                                        ).format(
                                                          "YYYY MMM. D hh:mm"
                                                        )}{" "}
                                                        UTC
                                                      </Td>
                                                    </Tr>
                                                    <Tr>
                                                      <Td>Created By</Td>
                                                      <Td isNumeric>
                                                        <ToolTip label="Click to copy the address">
                                                          <Button
                                                            borderRadius="xl"
                                                            onClick={() =>
                                                              handleToast(
                                                                item.created_by
                                                              )
                                                            }
                                                            size="sm"
                                                          >
                                                            Address
                                                          </Button>
                                                        </ToolTip>
                                                      </Td>
                                                    </Tr>
                                                  </Tbody>
                                                </Table>
                                              </Box>
                                            </PopoverBody>
                                          </PopoverContent>
                                        </Popover>
                                      </Box>
                                    </Flex>
                                  )
                                })}
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      ) : (
                        "N/A"
                      )}
                    </b>
                  </Text>
                </Box>
              </Flex>
            )}
            <Flex w="100%" h="100%">
              <Box>Delegate</Box>
              <Spacer />
              <Box>
                <Text color={delegate ? "green" : "red"}>
                  <b>{delegate ? "Yes" : "No"}</b>
                </Text>
              </Box>
            </Flex>
            {delegators && (
              <Flex w="100%" h="100%">
                <Box>Delegators</Box>
                <Spacer />
                <Box>
                  <Popover placement="left">
                    <PopoverTrigger>
                      <Button
                        borderRadius="xl"
                        disabled={delegators.length > 0 ? false : true}
                        size="sm"
                        variant="solid"
                      >
                        <b>
                          {delegators.length > 0 ? delegators.length : "N/A"}
                        </b>
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent w="auto" borderRadius="xl">
                      <PopoverArrow />
                      <PopoverBody>
                        <Box p="2">
                          {delegators.length > 0 &&
                            delegators.map((item) => {
                              return (
                                <Flex key={item} mb="2">
                                  <Button shadow="md" size="sm" variant="solid">
                                    <Link
                                      href={`/users/${item}`}
                                      target="_blank"
                                    >
                                      <Text as="kbd">{truncateName(item)}</Text>
                                    </Link>
                                  </Button>
                                </Flex>
                              )
                            })}
                        </Box>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Box>
              </Flex>
            )}
          </VStack>
        </Box>
      </Flex>
    </BoxWrapper>
  )
}

export default UserDAOActivity
