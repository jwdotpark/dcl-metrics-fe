import BoxWrapper from "../../../layout/local/BoxWrapper"
import { Box, Flex, Spacer, VStack, Text } from "@chakra-ui/react"
import CountUp from "react-countup"
import BoxTitle from "../../../layout/local/BoxTitle"
import moment from "moment"

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
        name={`NFT`}
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
            <Flex w="100%" h="100%">
              <Box>OG User</Box>
              <Spacer />
              <Box>
                <Text color={og_user ? "green" : "red"}>
                  <b>{og_user ? "Yes" : "No"}</b>
                </Text>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Owns DCLENS</Box>
              <Spacer />
              <Box>
                <Text color={owns_dclens ? "green" : "red"}>
                  <b>{owns_dclens ? "Yes" : "No"}</b>
                </Text>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Owns Land</Box>
              <Spacer />
              <Box>
                <Text color={owns_land ? "green" : "red"}>
                  <b>{owns_land ? "Yes" : "No"}</b>
                </Text>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Owns NFT</Box>
              <Spacer />
              <Box>
                <Text color={owns_nfts ? "green" : "red"}>
                  <b>{owns_nfts ? "Yes" : "No"}</b>
                </Text>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Owns Wearable</Box>
              <Spacer />
              <Box>
                <Text color={owns_wearables ? "green" : "red"}>
                  <b>{owns_wearables ? "Yes" : "No"}</b>
                </Text>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Participants In Genesis Auciton</Box>
              <Spacer />
              <Box>
                <Text color={participant_in_genesis_auction ? "green" : "red"}>
                  <b>{participant_in_genesis_auction ? "Yes" : "No"}</b>
                </Text>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Total DCLENS</Box>
              <Spacer />
              <Box>
                <b>
                  <CountUp end={total_dclens} duration={0.5} decimals={0} />
                </b>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Total Lands</Box>
              <Spacer />
              <Box>
                <b>
                  <CountUp end={total_lands} duration={0.5} decimals={0} />
                </b>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Total Wearables</Box>
              <Spacer />
              <Box>
                <b>
                  <CountUp end={total_wearables} duration={0.5} decimals={0} />
                </b>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>First DCLENS</Box>
              <Spacer />
              <Box>
                <Text as="kbd" align="right" fontWeight="bold" noOfLines={1}>
                  <b>
                    {first_dclens_acquired_at
                      ? first_dclens_acquired_at
                      : "N/A"}
                  </b>
                </Text>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>First Land</Box>
              <Spacer />
              <Box>
                <Text as="kbd" align="right" fontWeight="bold" noOfLines={1}>
                  <b>
                    {first_land_acquired_at ? first_land_acquired_at : "N/A"}
                  </b>
                </Text>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>First Wearable</Box>
              <Spacer />
              <Box>
                <Text as="kbd" align="right" fontWeight="bold" noOfLines={1}>
                  <b>
                    {first_wearable_acquired_at
                      ? first_wearable_acquired_at
                      : "N/A"}
                  </b>
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
