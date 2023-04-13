import {
  Box,
  Text,
  Flex,
  Spacer,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverBody,
  Table,
  Tbody,
  Td,
  Tr,
  Center,
  Divider,
  useToast,
} from "@chakra-ui/react"
import moment from "moment"
import ToolTip from "../../../../layout/local/ToolTip"

const UserActivityGrandPopOver = ({ grants }) => {
  const checkGrantActivated = () => {
    if (grants) {
      if (grants.beneficiary.count > 0 || grants.authored.count > 0) {
        return true
      }
    } else {
      return false
    }
  }

  const toast = useToast()

  const handleToast = (value) => {
    navigator.clipboard.writeText(value)
    toast({
      description: "Value " + value + " has been copied to the clipboard.",
      duration: 1000,
      isClosable: true,
      position: "bottom-right",
      status: "success",
    })
  }

  return (
    <Flex w="100%" h="100%">
      <Box>Grants</Box>
      <Spacer />
      <Box>
        <Popover placement="left">
          <PopoverTrigger>
            <Button
              borderRadius="xl"
              disabled={checkGrantActivated() ? false : true}
              size="sm"
              variant="solid"
            >
              {checkGrantActivated() ? "Activated" : "N/A"}
            </Button>
          </PopoverTrigger>
          <PopoverContent borderRadius="xl">
            <PopoverArrow />
            <PopoverBody overflowY="auto" w="100%">
              <Popover>
                <PopoverTrigger>
                  <>
                    {grants && grants.authored.count > 0 && (
                      <>
                        <Popover placement="left">
                          <PopoverTrigger>
                            <Button w="100%" mb="2" size="sm">
                              Authored
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent borderRadius="xl">
                            <PopoverArrow />
                            <PopoverBody overflowY="auto">
                              <Center w="auto" mb="2">
                                <Text>Authored</Text>
                              </Center>
                              <Divider />
                              <Table size="sm" variant="simple">
                                <Tbody>
                                  <Tr>
                                    <Td>title</Td>
                                    <Td isNumeric>
                                      {grants.authored.data[0].title}
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Vesting Contract</Td>
                                    <Td isNumeric>
                                      {grants.authored.data[0].vesting_contract}
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Vesting Released</Td>
                                    <Td isNumeric>
                                      {grants.authored.data[0].vesting_released}
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Tier</Td>
                                    <Td isNumeric>
                                      {grants.authored.data[0].tier}
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Status</Td>
                                    <Td isNumeric>
                                      {grants.authored.data[0].status}
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Category</Td>
                                    <Td isNumeric>
                                      {grants.authored.data[0].category}
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
                                              grants.authored.data[0].created_by
                                            )
                                          }
                                          size="sm"
                                        >
                                          Address
                                        </Button>
                                      </ToolTip>
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Amount</Td>
                                    <Td isNumeric>
                                      {grants.authored.data[0].amount}
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Beneficiery</Td>
                                    <Td isNumeric>
                                      <ToolTip label="Click to copy the address">
                                        <Button
                                          borderRadius="xl"
                                          onClick={() =>
                                            handleToast(
                                              grants.authored.data[0]
                                                .beneficiary
                                            )
                                          }
                                          size="sm"
                                        >
                                          Address
                                        </Button>
                                      </ToolTip>
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Started At</Td>
                                    <Td isNumeric>
                                      {moment(
                                        grants.authored.data[0].started_at
                                      ).format("YYYY MMM. D hh:mm")}{" "}
                                      UTC
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Ended At</Td>
                                    <Td isNumeric>
                                      {moment(
                                        grants.authored.data[0].ended_at
                                      ).format("YYYY MMM. D hh:mm")}{" "}
                                      UTC
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Snapshot ID</Td>
                                    <Td isNumeric>
                                      <ToolTip label="Click to copy the snapshot ID">
                                        <Button
                                          borderRadius="xl"
                                          onClick={() =>
                                            handleToast(
                                              grants.authored.data[0]
                                                .snapshot_id
                                            )
                                          }
                                          size="sm"
                                        >
                                          Snapshot ID
                                        </Button>
                                      </ToolTip>
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Proposal ID</Td>
                                    <Td isNumeric>
                                      <ToolTip label="Click to copy the proposal ID">
                                        <Button
                                          borderRadius="xl"
                                          onClick={() =>
                                            handleToast(
                                              grants.authored.data[0]
                                                .proposal_id
                                            )
                                          }
                                          size="sm"
                                        >
                                          Proposal ID
                                        </Button>
                                      </ToolTip>
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Remaining Updates</Td>
                                    <Td isNumeric>
                                      {
                                        grants.authored.data[0]
                                          .remaining_updates
                                      }
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Missed Updates</Td>
                                    <Td isNumeric>
                                      {grants.authored.data[0].missed_updates}
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Remaining Updates</Td>
                                    <Td isNumeric>
                                      {
                                        grants.authored.data[0]
                                          .remaining_updates
                                      }
                                    </Td>
                                  </Tr>
                                  <Tr>
                                    <Td>Health</Td>
                                    <Td isNumeric>
                                      {grants.authored.data[0].health}
                                    </Td>
                                  </Tr>
                                </Tbody>
                              </Table>
                            </PopoverBody>
                          </PopoverContent>
                        </Popover>
                      </>
                    )}
                    {grants && grants.beneficiary.count > 0 && (
                      <Button w="100%" size="sm">
                        Beneficiary
                      </Button>
                    )}
                  </>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverBody overflowY="auto">
                    {grants && grants.authored.count > 0 && "Authored"}
                  </PopoverBody>
                </PopoverContent>
              </Popover>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </Box>
    </Flex>
  )
}

export default UserActivityGrandPopOver
