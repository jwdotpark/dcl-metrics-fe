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
} from "@chakra-ui/react"
import Link from "next/link"
import { parseUTC } from "../../../../../../lib/hooks/utils"

const CollectionModalBody = ({ collections }) => {
  return (
    <Box mb="4">
      {collections.map((item) => {
        return (
          <Box key={item.collection_id}>
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
                          <Link
                            href={`https://market.decentraland.org/collections/${item.collection_id}`}
                            target="_blank"
                          >
                            <Button borderRadius="xl" shadow="md" size="xs">
                              Collection
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>Created At</Td>
                        <Td isNumeric>
                          <Text>{parseUTC(item.created_at)}</Text>
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
