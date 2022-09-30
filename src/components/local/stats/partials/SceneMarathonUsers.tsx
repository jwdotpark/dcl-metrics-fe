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

  // make a table component that contains addressArr and valueArr
  const MarathonUserTable = () => {
    return (
      <TableContainer>
        <Table size="sm" variant="striped">
          <TableCaption>Marathon Users in this scene</TableCaption>
          <Thead>
            <Tr>
              <Th>Address</Th>
              <Th>Value</Th>
            </Tr>
          </Thead>
          <Tbody>
            {addressArr.map((address, index) => {
              return (
                <Tr>
                  <Td>
                    <Text
                      as="kbd"
                      color={useColorModeValue("gray.800", "gray.200")}
                      _hover={{ color: "gray.600", cursor: "pointer" }}
                      onClick={() => handleToast(address)}
                    >
                      {address.toString().slice(0, 30)}..
                    </Text>
                  </Td>
                  {/* @ts-ignore */}
                  <Td>{Math.round(valueArr[index])}</Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </TableContainer>
    )
  }
  return (
    <Box mt="14">
      <MarathonUserTable />
    </Box>
  )
}

export default SceneMarathonUsers
