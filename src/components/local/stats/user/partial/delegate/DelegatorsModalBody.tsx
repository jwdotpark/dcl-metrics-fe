/* eslint-disable react-hooks/rules-of-hooks */
import {
  Text,
  Image,
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Table,
  Tbody,
  Td,
  Tr,
  useColorModeValue,
  Flex,
  Spacer,
  Button,
  useToast,
  Link,
} from "@chakra-ui/react"

const DelegatorsModalBody = ({ delegators }) => {
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
      {delegators.map((item) => {
        return (
          <Box key={item}>
            <Accordion allowToggle>
              <AccordionItem isFocusable>
                <AccordionButton
                  _expanded={{
                    bg: useColorModeValue("gray.100", "gray.600"),
                    color: useColorModeValue("black", "white"),
                    fontWeight: "bold",
                  }}
                >
                  <Flex boxSize="25px" mr="4" borderRadius="xl">
                    <Image
                      alt={item.name}
                      fallbackSrc="/images/blank_profile.png"
                      src={item.avatar_url}
                    />
                  </Flex>
                  <Flex as="span" align="center" justify="center">
                    <Text sx={{ transform: "translateY(2px)" }}>
                      {item.name}
                    </Text>
                  </Flex>
                  <Spacer />
                  <Flex mr="2">
                    <Text>{item.vp}</Text>
                  </Flex>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel>
                  <Table size="sm" variant="simple">
                    <Tbody>
                      <Tr>
                        <Td>Name</Td>
                        <Td isNumeric>
                          <Link href={`/users/${item.address}`} target="_blank">
                            <Button borderRadius="xl" size="xs">
                              {item.name}
                            </Button>
                          </Link>
                        </Td>
                      </Tr>
                      <Tr>
                        <Td>DAO User</Td>
                        <Td isNumeric>{item.dao_user ? "Yes" : "No"}</Td>
                      </Tr>
                      <Tr>
                        <Td>Address</Td>
                        <Td isNumeric>
                          <Button
                            borderRadius="xl"
                            onClick={() => handleToast(item.address)}
                            size="xs"
                          >
                            Copy Address
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

export default DelegatorsModalBody
