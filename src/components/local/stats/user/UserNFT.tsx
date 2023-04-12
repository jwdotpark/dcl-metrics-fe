import BoxWrapper from "../../../layout/local/BoxWrapper"
import {
  Box,
  Center,
  Flex,
  Image,
  Spacer,
  useColorModeValue,
  VStack,
  Text,
} from "@chakra-ui/react"
import moment from "moment"

const UserNFT = ({ data }) => {
  const {
    og_user,
    first_dclens_acquired_at,
    first_land_acquired_at,
    first_wearable_acquired_at,
    owns_dclens,
    owns_land,
    owns_nfts,
    owns_wearables,
    participant_in_genesis_auction,
    total_dclens,
    total_lands,
    total_wearables,
  } = data

  return (
    <BoxWrapper colSpan={[1, 1, 1, 2, 3]}>
      <Flex direction="column" w="auto" m="4">
        <Box w="100%">
          <VStack align="stretch" spacing={[2, 2, 2, 5, 5]}>
            <Flex w="100%" h="100%">
              <Box>OG User?</Box>
              <Spacer />
              <Box>
                <Text color={og_user ? "green" : "red"}>
                  <b>{og_user ? "Yes" : "No"}</b>
                </Text>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Owns dclens</Box>
              <Spacer />
              <Box>
                <Text color={og_user ? "green" : "red"}>
                  <b>{og_user ? "Yes" : "No"}</b>
                </Text>
              </Box>
            </Flex>
          </VStack>
        </Box>
      </Flex>
    </BoxWrapper>
  )
}

export default UserNFT
