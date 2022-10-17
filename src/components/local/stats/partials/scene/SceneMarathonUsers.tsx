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
} from "@chakra-ui/react"
import CountUp from "react-countup"

const SceneMarathonUsers = ({ data }) => {
  // copy toast
  const toast = useToast()
  const handleToast = (value) => {
    navigator.clipboard.writeText(value)
    toast({
      description: "Address " + value + " has been copied to the clipboard.",
      duration: 4000,
      isClosable: true,
      position: "bottom-right",
      status: "success",
      variant: "subtle",
    })
  }

  const dataArr = Object.entries(data)
  const addressArr = dataArr.map((item) => item[0])
  const valueArr = dataArr.map((item) => item[1])

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
                  <Td>
                    <Box w={["50px", "50px", "100px", "100px"]}>
                      <Text
                        as="kbd"
                        // eslint-disable-next-line
                        color={useColorModeValue("gray.800", "gray.200")}
                        fontSize="sm"
                        _hover={{ color: "gray.600", cursor: "pointer" }}
                        onClick={() => handleToast(address)}
                      >
                        {/* {address.slice(0, 10) + ".."} */}
                        {Math.floor(400 / (addressArr.length - 1))}
                      </Text>
                    </Box>
                  </Td>
                  <Td>Pic</Td>
                  <Td>Name</Td>
                  <Td>Status</Td>
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
