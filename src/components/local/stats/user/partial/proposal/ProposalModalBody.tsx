/* eslint-disable react-hooks/rules-of-hooks */
import {
  Accordion,
  AccordionButton,
  Text,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Tr,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react"
import Link from "next/link"
import { parseUTC } from "../../../../../../lib/hooks/utils"

const ProposalModalBody = ({ proposals }) => {
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
    <Box mb="4">
      {proposals.data.map((item) => {
        return (
          <Box key={item.proposal_id}>
            <Accordion allowToggle>
              <AccordionItem isFocusable>
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
                  <Table size="sm" variant="simple">
                    <Tbody>
                      <Tr>
                        <Td>Title</Td>
                        <Td isNumeric>{item.title ? item.title : "N/A"}</Td>
                      </Tr>
                      <Tr>
                        <Td>Category</Td>
                        <Td isNumeric>
                          {item.category ? item.category : "N/A"}
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Status</Td>
                        <Td isNumeric>{item.status ? item.status : "N/A"}</Td>
                      </Tr>
                      <Tr>
                        <Td>Total Votes</Td>
                        <Td isNumeric>
                          <Text>
                            {item.total_votes ? item.total_votes : "N/A"}
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Total VP</Td>
                        <Td isNumeric>
                          <Text>{item.total_vp ? item.total_vp : "N/A"}</Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Proposal ID</Td>
                        <Td isNumeric>
                          <Link
                            href={`https://governance.decentraland.org/proposal/?id=${item.proposal_id}`}
                            target="_blank"
                          >
                            <Button borderRadius="xl" size="xs">
                              <Text>Proposal</Text>
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Snapshot ID</Td>
                        <Td isNumeric>
                          <Button
                            borderRadius="xl"
                            onClick={() => handleToast(item.snapshot_id)}
                            size="xs"
                          >
                            <Text>Snapshot ID</Text>
                          </Button>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Started At</Td>
                        <Td isNumeric>
                          <Text>{parseUTC(item.start_time)}</Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Ended At</Td>
                        <Td isNumeric>
                          <Text>{parseUTC(item.end_time)}</Text>
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>
        )
      })}
    </Box>
  )
}

export default ProposalModalBody
