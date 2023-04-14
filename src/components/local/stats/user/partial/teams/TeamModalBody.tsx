/* eslint-disable react-hooks/rules-of-hooks */
import {
  Text,
  Box,
  useColorModeValue,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Tbody,
  Td,
  Tr,
  Button,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react"
import moment from "moment"
import { parseUTC } from "../../../../../../lib/hooks/utils"

const TeamModalBody = ({ teams }) => {
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
      {teams.map((item) => {
        return (
          <Box key={item.address}>
            <Accordion allowToggle>
              <AccordionItem isFocusable>
                <AccordionButton
                  _expanded={{
                    bg: useColorModeValue("gray.100", "gray.600"),
                    color: useColorModeValue("black", "white"),
                    fontWeight: "bold",
                  }}
                >
                  <Box as="span" flex="1" h="20px" textAlign="left">
                    {item.team}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Table size="sm" variant="simple">
                    <Tbody>
                      <Tr>
                        <Td>Team</Td>
                        <Td isNumeric>{item.team}</Td>
                      </Tr>
                      <Tr>
                        <Td>Active</Td>
                        <Td isNumeric>
                          <Text color={item.active ? "green" : "gray"}>
                            {item.active ? "Yes" : "No"}
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Address</Td>
                        <Td isNumeric>
                          <Box onClick={() => handleToast(item.address)}>
                            <Button borderRadius="xl" size="xs">
                              Address
                            </Button>
                          </Box>
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

export default TeamModalBody
