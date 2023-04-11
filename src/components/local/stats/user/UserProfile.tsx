import BoxWrapper from "../../../layout/local/BoxWrapper"
import {
  Text,
  Box,
  Center,
  Flex,
  Image,
  Table,
  Tbody,
  Td,
  Tr,
  useColorModeValue,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react"

const UserProfile = ({ data }) => {
  const {
    address,
    avatar_url,
    dao_member,
    first_seen,
    last_seen,
    guest,
    name,
    verified,
  } = data

  const responsiveStr = useBreakpointValue({
    xs: 5,
    sm: 5,
    md: 50,
    lg: 20,
    xl: 20,
    base: 10,
  })

  const truncateName = (name: string) => {
    const nameLength = responsiveStr
    if (name.length > nameLength) {
      return name.slice(0, nameLength) + ".."
    }
    return name
  }

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
    <BoxWrapper colSpan={3}>
      <Flex direction={["column", "column", "column", "row"]}>
        <Center
          w={["auto", "auto", "auto", 250]}
          m={[4, 4, 4, 2, 2]}
          bg={useColorModeValue("gray.200", "gray.600")}
          border="1px solid"
          borderColor={useColorModeValue("gray.300", "gray.500")}
          borderRadius="xl"
          shadow="md"
        >
          <Box m="4">
            <Image objectFit="cover" alt={name} src={avatar_url} />
          </Box>
        </Center>
        <Flex
          direction={["column", "column", "column", "row"]}
          w={["auto", "auto", "auto", "100%", "100%"]}
          m={[4, 4, 4, 2, 2]}
        >
          <Box
            overflow="hidden"
            w="100%"
            mr={[0, 0, 0, 4, 4]}
            mb={[4, 4, 4, 0, 0]}
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="xl"
            shadow="md"
          >
            <Table
              overflow="hidden"
              h="100%"
              colorScheme="blackAlpha"
              size="md"
              variant="striped"
            >
              <Tbody>
                <Tr>
                  <Td>Name</Td>
                  <Td isNumeric>
                    <b>{name}</b>
                  </Td>
                </Tr>
                <Tr>
                  <Td>DAO Member?</Td>
                  <Td isNumeric>
                    <b>{dao_member ? "Yes" : "No"}</b>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Address</Td>
                  <Td isNumeric>
                    <Box
                      _hover={{ cursor: "pointer" }}
                      onClick={() => handleToast(address)}
                    >
                      <Text as="kbd" noOfLines={1}>
                        <b>{truncateName(address)}</b>
                      </Text>
                    </Box>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
          <Box
            overflow="hidden"
            w="100%"
            border="1px solid"
            borderColor={useColorModeValue("gray.200", "gray.600")}
            borderRadius="xl"
            shadow="md"
          >
            <Table
              overflow="hidden"
              h="100%"
              colorScheme="blackAlpha"
              size="md"
              variant="striped"
            >
              <Tbody>
                <Tr>
                  <Td>First Seen At</Td>
                  <Td isNumeric>
                    <b>{first_seen}</b>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Last Seen At</Td>
                  <Td isNumeric>
                    <b>{last_seen}</b>
                  </Td>
                </Tr>
                <Tr>
                  <Td>Status</Td>
                  <Td isNumeric>
                    <b>
                      {verified && "Verified"}
                      {guest && "Guest User"}
                    </b>
                  </Td>
                </Tr>
              </Tbody>
            </Table>
          </Box>
        </Flex>
      </Flex>
    </BoxWrapper>
  )
}

export default UserProfile
