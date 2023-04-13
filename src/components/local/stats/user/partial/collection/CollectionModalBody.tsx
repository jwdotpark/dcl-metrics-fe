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
} from "@chakra-ui/react"
import moment from "moment"

const CollectionModalBody = ({ collections }) => {
  console.log(collections)

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
      {collections.map((item) => {
        return (
          <Box key={item.collection_id}>
            <Accordion allowMultiple>
              <AccordionItem isFocusable>
                <AccordionButton
                  _expanded={{
                    bg: useColorModeValue("gray.100", "gray.600"),
                    color: useColorModeValue("black", "white"),
                    fontWeight: "bold",
                  }}
                >
                  <Box as="span" flex="1" textAlign="left">
                    {item.name}
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Table size="sm" variant="simple">
                    <Tbody>
                      <Tr>
                        <Td>Name</Td>
                        <Td isNumeric>{item.name}</Td>
                      </Tr>
                      <Tr>
                        <Td>Symbol</Td>
                        <Td isNumeric>{item.symbol}</Td>
                      </Tr>
                      <Tr>
                        <Td>Items</Td>
                        <Td isNumeric>{item.items}</Td>
                      </Tr>
                      <Tr>
                        <Td>Approved</Td>
                        <Td isNumeric>
                          <Text color={item.approved ? "green" : "red"}>
                            {item.approved ? "Yes" : "No"}
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Completed</Td>
                        <Td isNumeric>
                          <Text color={item.completed ? "green" : "red"}>
                            {item.completed ? "Yes" : "No"}
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Collection ID</Td>
                        <Td isNumeric>
                          <Button
                            borderRadius="xl"
                            onClick={() => handleToast(item.collection_id)}
                            size="xs"
                          >
                            Collection ID
                          </Button>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Created At</Td>
                        <Td isNumeric>
                          <Text>
                            {moment(item.created_at).format(
                              "YYYY MMM. D hh:mm"
                            )}{" "}
                            UTC
                          </Text>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Created By</Td>
                        <Td isNumeric>
                          <Button
                            borderRadius="xl"
                            onClick={() => handleToast(item.created_by)}
                            size="xs"
                          >
                            Creator Address
                          </Button>
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

export default CollectionModalBody
