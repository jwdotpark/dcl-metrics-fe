import {
  Box,
  Text,
  PopoverBody,
  Center,
  Divider,
  Table,
  Tbody,
  Tr,
  Td,
  Button,
  useToast,
} from "@chakra-ui/react"
import ToolTip from "../../../../layout/local/ToolTip"
import moment from "moment"

const CollectionPopOverBody = ({ item }) => {
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
    <PopoverBody>
      <Center w="auto" mb="2">
        <Text>{item.name}</Text>
      </Center>
      <Divider />
      <Box>
        <Table w="100%" size="sm" variant="simple">
          <Tbody>
            <Tr>
              <Td>Symbol</Td>
              <Td isNumeric>{item.symbol}</Td>
            </Tr>
            <Tr>
              <Td>Items</Td>
              <Td isNumeric>
                <Text noOfLines={1}>{item.items}</Text>
              </Td>
            </Tr>
            <Tr>
              <Td>Collection ID</Td>
              <Td isNumeric>
                <ToolTip label="Click to copy the address">
                  <Button
                    borderRadius="xl"
                    onClick={() => handleToast(item.collection_id)}
                    size="sm"
                  >
                    ID
                  </Button>
                </ToolTip>
              </Td>
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
              <Td>Created At</Td>
              <Td isNumeric>
                {moment(item.created_at).format("YYYY MMM. D hh:mm")} UTC
              </Td>
            </Tr>
            <Tr>
              <Td>Created By</Td>
              <Td isNumeric>
                <ToolTip label="Click to copy the address">
                  <Button
                    borderRadius="xl"
                    onClick={() => handleToast(item.created_by)}
                    size="sm"
                  >
                    Address
                  </Button>
                </ToolTip>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </Box>
    </PopoverBody>
  )
}

export default CollectionPopOverBody
