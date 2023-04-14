/* eslint-disable react-hooks/rules-of-hooks */
import {
  Text,
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  useColorModeValue,
  AccordionIcon,
  AccordionPanel,
  Flex,
  Spacer,
  Center,
} from "@chakra-ui/react"
import GrantAuthoredNestedModalBody from "./GrantAuthoredNestedModalBody"
import GrantBeneficiaryNestedModalBody from "./GrantBeneficiaryNestedModalBody"

const GrantModalBody = ({ grants }) => {
  return (
    <Box mb="4">
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton
            _expanded={{
              bg: useColorModeValue("gray.300", "gray.800"),
              color: useColorModeValue("black", "white"),
              fontWeight: "bold",
            }}
          >
            <Box as="span" flex="1" textAlign="left">
              <Flex>
                <Center mr="6" fontSize={["md", "xl"]}>
                  {grants.authored.count} authored
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
            <GrantAuthoredNestedModalBody grants={grants} />
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem isFocusable>
          <AccordionButton
            _expanded={{
              bg: useColorModeValue("gray.300", "gray.800"),
              color: useColorModeValue("black", "white"),
              fontWeight: "bold",
            }}
          >
            <Box as="span" flex="1" textAlign="left">
              <Flex>
                <Center mr="2" fontSize={["md", "xl"]}>
                  {grants.beneficiary.count} beneficiary
                </Center>
                <Spacer />
                <Box w="30%">
                  <Text fontSize={[10, "xs"]}>Total Requested</Text>
                  <Text fontSize="sm">
                    {grants.beneficiary.total_requested_usd
                      ? grants.beneficiary.total_requested_usd + " USD"
                      : "N/A"}
                  </Text>
                </Box>
                <Spacer />
                <Box w="30%">
                  <Text fontSize={[10, 12]}>Total Enacted</Text>
                  <Text fontSize="sm">
                    {grants.beneficiary.total_enacted_usd
                      ? grants.beneficiary.total_enacted_usd + " USD"
                      : "N/A"}
                  </Text>
                </Box>
              </Flex>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <GrantBeneficiaryNestedModalBody grants={grants} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}

export default GrantModalBody
