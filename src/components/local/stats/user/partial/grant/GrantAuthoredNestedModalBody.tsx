/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  useColorModeValue,
  AccordionIcon,
  AccordionPanel,
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react"
import moment from "moment"
import { useState } from "react"

const GrantAuthoredNestedModalBody = ({ grants }) => {
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

  const responsiveStr = useBreakpointValue({
    xs: 5,
    sm: 5,
    md: 20,
    lg: 20,
    xl: 50,
    base: 10,
  })

  const truncateName = (name: string) => {
    const nameLength = responsiveStr
    if (name && name.length > nameLength) {
      return name.slice(0, nameLength) + ".."
    }
    return name
  }

  return (
    <>
      {grants.authored.data.map((item) => {
        return (
          <Box key={item.created_by} mx="-4">
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton
                  _expanded={{
                    bg: useColorModeValue("gray.100", "gray.600"),
                    color: useColorModeValue("black", "white"),
                    fontWeight: "bold",
                  }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    {item.title}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Box>
                    <Table size="sm" variant="simple">
                      <Tbody>
                        <Tr>
                          <Td>Category</Td>
                          <Td isNumeric>{item.category}</Td>
                        </Tr>
                        <Tr>
                          <Td>Beneficiary</Td>
                          <Td isNumeric>
                            <Button
                              onClick={() => {
                                handleToast(item.beneficiary)
                              }}
                              size="sm"
                              variant="link"
                            >
                              {truncateName(item.beneficiary)}
                            </Button>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Created By</Td>
                          <Td isNumeric>
                            <Button
                              onClick={() => {
                                handleToast(item.created_by)
                              }}
                              size="sm"
                              variant="link"
                            >
                              {truncateName(item.created_by)}
                            </Button>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Proposal ID</Td>
                          <Td isNumeric>
                            <Button
                              onClick={() => {
                                handleToast(item.proposal_id)
                              }}
                              size="sm"
                              variant="link"
                            >
                              {truncateName(item.proposal_id)}
                            </Button>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Snapshot ID</Td>
                          <Td isNumeric>
                            <Button
                              borderRadius="xl"
                              onClick={() => {
                                handleToast(item.snapshot_id)
                              }}
                              size="xs"
                            >
                              Copy Snapshot ID
                            </Button>
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Status</Td>
                          <Td isNumeric>{item.status}</Td>
                        </Tr>
                        <Tr>
                          <Td>Tier</Td>
                          <Td isNumeric>{item.tier}</Td>
                        </Tr>
                        <Tr>
                          <Td>Amount</Td>
                          <Td isNumeric>{item.amount}</Td>
                        </Tr>
                        <Tr>
                          <Td>Health</Td>
                          <Td isNumeric>{item.health}</Td>
                        </Tr>
                        <Tr>
                          <Td>Vesting Contract</Td>
                          <Td isNumeric>{item.vesting_contract}</Td>
                        </Tr>
                        <Tr>
                          <Td>Vesting Released</Td>
                          <Td isNumeric>{item.vesting_released}</Td>
                        </Tr>
                        <Tr>
                          <Td>Remaining Update</Td>
                          <Td isNumeric>{item.remaining_updates}</Td>
                        </Tr>
                        <Tr>
                          <Td>Late Update</Td>
                          <Td isNumeric>{item.late_updates}</Td>
                        </Tr>
                        <Tr>
                          <Td>Missed Update</Td>
                          <Td isNumeric>{item.missed_updates}</Td>
                        </Tr>
                        <Tr>
                          <Td>Missed Update</Td>
                          <Td isNumeric>{item.missed_updates}</Td>
                        </Tr>
                        <Tr>
                          <Td>Done Update</Td>
                          <Td isNumeric>{item.done_updates}</Td>
                        </Tr>
                        <Tr>
                          <Td>Started At</Td>
                          <Td isNumeric>
                            {moment(item.started_at).format("YYYY MMM. D")}
                          </Td>
                        </Tr>
                        <Tr>
                          <Td>Ended At</Td>
                          <Td isNumeric>
                            {moment(item.ended_at).format("YYYY MMM. D")}
                          </Td>
                        </Tr>
                      </Tbody>
                    </Table>
                  </Box>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        )
      })}
    </>
  )
}

export default GrantAuthoredNestedModalBody
