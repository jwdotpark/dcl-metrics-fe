/* eslint-disable react-hooks/rules-of-hooks */
import {
  Divider,
  Text,
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
  useToast,
  useBreakpointValue,
  Flex,
  Spacer,
  Center,
} from "@chakra-ui/react"
import { useState } from "react"
import GrandNestedModalBody from "./GrandNestedModalBody"

const GrantModalBody = ({ grants }) => {
  console.log(grants)

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

  return (
    <Box mb="4">
      <Accordion>
        <AccordionItem>
          <AccordionButton
            _expanded={{
              bg: useColorModeValue("gray.100", "gray.600"),
              color: useColorModeValue("black", "white"),
              fontWeight: "bold",
            }}
          >
            <Box as="span" flex="1" textAlign="left">
              <Flex>
                <Center w="40%" mr="2" fontSize="2xl">
                  Authored
                </Center>
                <Spacer />
                <Box w="30%">
                  <Text fontSize={[10, "xs"]}>Total Requested</Text>
                  <Text fontSize="sm">
                    {grants.authored.total_requested_usd} USD
                  </Text>
                </Box>
                <Spacer />
                <Box w="30%">
                  <Text fontSize={[10, 12]}>Total Enacted</Text>
                  <Text fontSize="sm">
                    {grants.authored.total_enacted_usd} USD
                  </Text>
                </Box>
              </Flex>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <GrandNestedModalBody grants={grants} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem isFocusable>
          <AccordionButton
            _expanded={{
              bg: useColorModeValue("gray.100", "gray.600"),
              color: useColorModeValue("black", "white"),
              fontWeight: "bold",
            }}
          >
            <Box as="span" flex="1" textAlign="left">
              Beneficiary
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Table size="sm" variant="simple">
              <Tbody>
                <Tr>
                  <Td>Name</Td>
                  <Td isNumeric>item</Td>
                </Tr>
              </Tbody>
            </Table>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default GrantModalBody
