import {
  Box,
  Text,
  useToast,
  Flex,
  VStack,
  Spacer,
  Button,
} from "@chakra-ui/react"
import { format, formatDistanceToNow } from "date-fns"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"

const UserInfo = ({ data }) => {
  const {
    address,

    dao_member,
    first_seen,
    last_seen,
    guest,
    name,
    verified,
  } = data

  const toast = useToast()

  const handleToast = (value) => {
    navigator.clipboard.writeText(value)
    toast({
      description: "Address " + value + " has been copied to the clipboard.",
      duration: 1000,
      isClosable: true,
      position: "bottom-right",
      status: "success",
    })
  }
  return (
    <BoxWrapper colSpan={[1, 1, 1, 2, 2]}>
      <BoxTitle
        name="User Activity"
        description={`${name}'s activity in Decentraland`}
        date=""
        avgData={[]}
        slicedData={{}}
        color={{}}
        line={false}
        setLine={{}}
      />
      <Flex direction="column" w="auto" m="4" mx="5">
        <Box w="100%">
          <VStack align="stretch" spacing="4">
            <Flex w="100%" h="100%">
              <Box>DAO Member?</Box>
              <Spacer />
              <Box>
                <Text color={dao_member ? "green" : "red"}>
                  {dao_member ? "Yes" : "No"}
                </Text>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Address</Box>
              <Spacer />
              <Box
                _hover={{ cursor: "pointer" }}
                onClick={() => handleToast(address)}
              >
                <Button borderRadius="xl" shadow="md" size="xs">
                  <Text noOfLines={1}>Copy Address</Text>
                </Button>
              </Box>
            </Flex>
            <Box w="100%">
              <Flex w="100%">
                <Box>First Seen At</Box>
                <Spacer />
                <Box>{format(new Date(first_seen), "yyyy MMMM d")}</Box>
              </Flex>
            </Box>
            <Box w="100%">
              <Flex w="100%">
                <Box>Last Seen At</Box>
                <Spacer />
                <Box>
                  {formatDistanceToNow(new Date(last_seen), {
                    addSuffix: true,
                  })}{" "}
                  ago
                </Box>
              </Flex>
            </Box>
            <Box w="100%">
              <Flex w="100%">
                <Box>Status</Box>
                <Spacer />
                <Box>
                  <Text color={verified ? "green" : "gray"}>
                    {verified ? "Verified" : "Guest User"}
                    {(!verified && !guest) ?? "N/A"}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </VStack>
        </Box>
      </Flex>
    </BoxWrapper>
  )
}

export default UserInfo
