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
      <Table size="sm" variant="simple">
        <Tbody>
          {addressArr.map((address, index) => {
            return (
              <Tr key={index}>
                <Td>
                  <Text
                    as="kbd"
                    // eslint-disable-next-line
                    color={useColorModeValue("gray.800", "gray.200")}
                    _hover={{ color: "gray.600", cursor: "pointer" }}
                    onClick={() => handleToast(address)}
                  >
                    {/* {address.toString().slice(0, 100)} */}
                    {address.slice(0, 7) + ".." + address.slice(-7, -1)}
                  </Text>
                </Td>
                <Td isNumeric>
                  <CountUp
                    // @ts-ignore
                    end={Math.round(valueArr[index])}
                    duration={0.5}
                  />
                </Td>
              </Tr>
            )
          })}
        </Tbody>
      </Table>
    )
  }
  return (
    <Box
      overflowX="hidden"
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
