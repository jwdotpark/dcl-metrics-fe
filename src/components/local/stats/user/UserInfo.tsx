import {
  Box,
  Text,
  useBreakpointValue,
  useToast,
  Flex,
  VStack,
  Spacer,
  Center,
} from "@chakra-ui/react"
import moment from "moment"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"

const UserInfo = ({ data }) => {
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
    base: 20,
  })

  const truncateName = (name: string) => {
    const nameLength = responsiveStr
    if (name && name.length > nameLength) {
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
          <VStack align="stretch" spacing={[2, 2, 2, 5, 5]}>
            <Flex w="100%" h="100%">
              <Box>DAO Member?</Box>
              <Spacer />
              <Box>
                <Text color={dao_member ? "green" : "red"}>
                  <b>{dao_member ? "Yes" : "No"}</b>
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
                <Text as="kbd" noOfLines={1}>
                  <b>{truncateName(address)}</b>
                </Text>
              </Box>
            </Flex>
            <Box w="100%">
              <Flex w="100%">
                <Box>First Seen At</Box>
                <Spacer />
                <Box>
                  <b>{moment(first_seen).format("YYYY MMMM D")}</b>
                </Box>
              </Flex>
            </Box>
            <Box w="100%">
              <Flex w="100%">
                <Box>Last Seen At</Box>
                <Spacer />
                <Box>
                  <b>{moment(last_seen).fromNow(true)} ago</b>
                </Box>
              </Flex>
            </Box>
            <Box w="100%">
              <Flex w="100%">
                <Box>Status</Box>
                <Spacer />
                <Box>
                  <Text color={verified ? "green" : "gray"}>
                    <b>
                      {verified ? "Verified" : "Guest User"}
                      {(!verified && !guest) ?? "N/A"}
                    </b>
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
