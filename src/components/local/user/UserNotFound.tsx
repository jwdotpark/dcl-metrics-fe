import { Center, Flex, Text } from "@chakra-ui/react"

const UserNotFound = ({ address }) => {
  return (
    <Center h="calc(100vh - 8rem)">
      <Flex direction="column" w="100%">
        <Center mb="8">
          <Text fontSize={["3xl", "6xl"]} fontWeight="bold">
            User Not Found
          </Text>
        </Center>
        <Center w="100%" px={[0, 20]} fontSize={["xs", "md"]}>
          <Flex direction="column">
            <Center w="100%">
              <Text>
                User <kbd>{address}</kbd> is not in our system yet.
              </Text>
            </Center>
            <Center>
              <Text>
                This usually means that they have never logged into Decentraland
                client. If you think this is an error, please contact us using{" "}
                <b>feedback menu</b> on the top.
              </Text>
            </Center>
          </Flex>
        </Center>
      </Flex>
    </Center>
  )
}

export default UserNotFound
