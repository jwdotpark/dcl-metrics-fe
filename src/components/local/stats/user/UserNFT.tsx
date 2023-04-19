import BoxWrapper from "../../../layout/local/BoxWrapper"
import { Box, Flex, Spacer, VStack, Text } from "@chakra-ui/react"
import CountUp from "react-countup"
import BoxTitle from "../../../layout/local/BoxTitle"
import moment from "moment"
import { parseUTC } from "../../../../lib/hooks/utils"

const UserNFT = ({ data }) => {
  const {
    name,
    og_user,
    owns_dclens,
    owns_land,
    owns_nfts,
    owns_wearables,
    participant_in_genesis_auction,
    total_dclens,
    total_lands,
    total_wearables,
    first_dclens_acquired_at,
    first_land_acquired_at,
    first_wearable_acquired_at,
  } = data

  return (
    <BoxWrapper colSpan={[1, 1, 1, 2, 2]}>
      <BoxTitle
        name={`NFT Activity`}
        description={`Stats about NFTs owned by ${name}`}
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
            {og_user && (
              <Flex w="100%" h="100%">
                <Box>OG User</Box>
                <Spacer />
                <Box>
                  <Text color={og_user ? "green" : "gray"}>
                    {og_user ? "Yes" : "No"}
                  </Text>
                </Box>
              </Flex>
            )}
            {owns_dclens && (
              <Flex w="100%" h="100%">
                <Box>Owns DCLENS</Box>
                <Spacer />
                <Box>
                  <Text color={owns_dclens ? "green" : "gray"}>
                    {owns_dclens ? "Yes" : "No"}
                  </Text>
                </Box>
              </Flex>
            )}
            {owns_land && (
              <Flex w="100%" h="100%">
                <Box>Owns Land</Box>
                <Spacer />
                <Box>
                  <Text color={owns_land ? "green" : "gray"}>
                    {owns_land ? "Yes" : "No"}
                  </Text>
                </Box>
              </Flex>
            )}
            {owns_nfts && (
              <Flex w="100%" h="100%">
                <Box>Owns NFT</Box>
                <Spacer />
                <Box>
                  <Text color={owns_nfts ? "green" : "gray"}>
                    {owns_nfts ? "Yes" : "No"}
                  </Text>
                </Box>
              </Flex>
            )}
            {owns_wearables && (
              <Flex w="100%" h="100%">
                <Box>Owns Wearable</Box>
                <Spacer />
                <Box>
                  <Text color={owns_wearables ? "green" : "gray"}>
                    {owns_wearables ? "Yes" : "No"}
                  </Text>
                </Box>
              </Flex>
            )}
            {participant_in_genesis_auction && (
              <Flex w="100%" h="100%">
                <Box>Participants In Genesis Auciton</Box>
                <Spacer />
                <Box>
                  <Text
                    color={participant_in_genesis_auction ? "green" : "gray"}
                  >
                    {participant_in_genesis_auction ? "Yes" : "No"}
                  </Text>
                </Box>
              </Flex>
            )}
            {total_dclens > 0 && (
              <Flex w="100%" h="100%">
                <Box>Total DCLENS</Box>
                <Spacer />
                <Box>{total_dclens ? total_dclens : "N/A"}</Box>
              </Flex>
            )}
            {total_lands !== 0 && (
              <Flex w="100%" h="100%">
                <Box>Total Lands</Box>
                <Spacer />
                <Box>{total_lands}</Box>
              </Flex>
            )}
            {total_wearables && (
              <Flex w="100%" h="100%">
                <Box>Total Wearables</Box>
                <Spacer />
                <Box>{total_wearables > 999 ? "1000+" : total_wearables}</Box>
              </Flex>
            )}
            {first_dclens_acquired_at && (
              <Flex w="100%" h="100%">
                <Box>First DCLENS</Box>
                <Spacer />
                <Box>
                  <Text as="kbd" align="right" noOfLines={1}>
                    {first_dclens_acquired_at
                      ? parseUTC(first_dclens_acquired_at)
                      : "N/A"}
                  </Text>
                </Box>
              </Flex>
            )}
            {first_land_acquired_at && (
              <Flex w="100%" h="100%">
                <Box>First Land</Box>
                <Spacer />
                <Box>
                  <Text as="kbd" align="right" noOfLines={1}>
                    {first_land_acquired_at
                      ? parseUTC(first_land_acquired_at)
                      : "N/A"}
                  </Text>
                </Box>
              </Flex>
            )}
            {first_wearable_acquired_at && (
              <Flex w="100%" h="100%">
                <Box>First Wearable</Box>
                <Spacer />
                <Box>
                  <Text as="kbd" align="right" noOfLines={1}>
                    {first_wearable_acquired_at
                      ? parseUTC(first_wearable_acquired_at)
                      : "N/A"}
                  </Text>
                </Box>
              </Flex>
            )}
          </VStack>
        </Box>
      </Flex>
    </BoxWrapper>
  )
}

export default UserNFT
