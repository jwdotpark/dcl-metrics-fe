import {
  Text,
  Thead,
  Box,
  Table,
  TableContainer,
  Th,
  Tr,
  Td,
  Tbody,
  TableCaption,
  useToast,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react"
import CountUp from "react-countup"

const SceneMarathonUsers = ({ data }) => {
  // copy toast
  const toast = useToast()
  const handleToast = async (value) => {
    try {
      await navigator.clipboard.writeText(value)
    } catch (e) {
      console.log(e)
    } finally {
      toast({
        description: "Address has been copied to the clipboard.",
        duration: 4000,
        isClosable: true,
        position: "bottom-right",
        status: "success",
        variant: "subtle",
      })
    }
  }

  const dataArr = Object.entries(data)
  const addressArr = dataArr.map((item) => item[0])
  const valueArr = dataArr.map((item) => item[1])

  const addressWidth = useBreakpointValue({
    base: 8,
    sm: 10,
    md: 50,
    lg: 25,
  })
  const MarathonUserTable = () => {
    return (
      <Box
        overflow="hidden"
        bg={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
      >
        <Table size="sm" variant="simple">
          <Tbody>
            {addressArr.map((address, index) => {
              return (
                <Tr key={index} h="37px">
                  <Td w={["10px", "20px"]}>User</Td>
                  <Td>
                    <Box
                      // w={["50px", "50px", "100%", "150px"]}
                      w="100%"
                    >
                      <Text
                        as="kbd"
                        // eslint-disable-next-line
                        color={useColorModeValue("gray.800", "gray.200")}
                        fontSize="sm"
                        _hover={{ color: "gray.600", cursor: "pointer" }}
                        onClick={() => handleToast(address)}
                      >
                        {address.slice(0, addressWidth)}
                        {address.length > addressWidth ? ".." : ""}
                      </Text>
                    </Box>
                  </Td>
                  <Td isNumeric>
                    <Text as="kbd" fontWeight="bold">
                      <CountUp
                        // @ts-ignore
                        end={Math.round(valueArr[index])}
                        duration={0.5}
                      />
                    </Text>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Box>
    )
  }
  return (
    <Box
      overflow={["scroll", "hidden", "hidden", "hidden"]}
      h="400px"
      bg={useColorModeValue("gray.100", "gray.700")}
      border="2px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      borderRadius="xl"
      shadow="md"
    >
      <Box p="4">
        <MarathonUserTable />
      </Box>
    </Box>
  )
}

export default SceneMarathonUsers
