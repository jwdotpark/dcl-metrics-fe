/* eslint-disable react-hooks/rules-of-hooks */
import BoxWrapper from "../../../layout/local/BoxWrapper"
import {
  useColorModeValue,
  Box,
  Flex,
  Spacer,
  VStack,
  Text,
  Button,
  Center,
  Divider,
} from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import { parseUTC } from "../../../../lib/hooks/utils"
import Link from "next/link"
import ToolTip from "../../../layout/local/ToolTip"

const UserNFT = ({ data, address }) => {
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

  const checkFalsyData = () => {
    if (
      !og_user &&
      !owns_dclens &&
      !owns_land &&
      !owns_nfts &&
      !owns_wearables &&
      !participant_in_genesis_auction &&
      !total_dclens &&
      !total_lands &&
      !total_wearables &&
      !first_dclens_acquired_at &&
      !first_land_acquired_at &&
      !first_wearable_acquired_at
    ) {
      return false
    } else {
      return true
    }
  }

  const toolTipText = {
    og_user:
      "User who bought land in genesis auction or acquired names or wearables at launch",
    owns_nfts: "User who owns at least one NFT",
    participant_in_genesis_auction: "User who participated in genesis auction",
    owns_dclens: "The list of DCLens owned by user",
    total_dclens: "Total number of DCLens owned by user",
    first_dclens_acquired_at: "Date of first DCLens acquisition",
    owns_wearables: "The list of wearables owned by user",
    total_wearables: "Total number of wearables owned by user",
    first_wearable_acquired_at: "Date of first wearable acquisition",
    owns_land: "The list of wearables owned by user",
    total_lands: "Total number of lands owned by user",
    first_land_acquired_at: "Date of first land acquisition",
  }

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
      {checkFalsyData() ? (
        <Flex direction="column" w="auto" m="4" mx="5">
          <Box w="100%">
            <VStack align="stretch" spacing={[2, 2, 2, 5, 5]}>
              {og_user && (
                <Flex w="100%" h="100%">
                  <ToolTip label={toolTipText.og_user}>
                    <Box _hover={{ cursor: "help" }}>OG User</Box>
                  </ToolTip>
                  <Spacer />
                  <Box>
                    <Text color={og_user ? "green" : "gray"}>
                      {og_user ? "Yes" : "No"}
                    </Text>
                  </Box>
                </Flex>
              )}
              {owns_nfts && (
                <Flex w="100%" h="100%">
                  <ToolTip label={toolTipText.owns_nfts}>
                    <Box _hover={{ cursor: "help" }}>Owns NFT</Box>
                  </ToolTip>
                  <Spacer />
                  <Box>
                    <Text>{owns_nfts && "Yes"}</Text>
                  </Box>
                </Flex>
              )}
              {participant_in_genesis_auction && (
                <>
                  <Flex w="100%" h="100%">
                    <ToolTip label={toolTipText.participant_in_genesis_auction}>
                      <Box _hover={{ cursor: "help" }}>
                        Participants In Genesis Auciton
                      </Box>
                    </ToolTip>
                    <Spacer />
                    <Box>
                      <Text
                        color={
                          participant_in_genesis_auction ? "green" : "gray"
                        }
                      >
                        {participant_in_genesis_auction ? "Yes" : "No"}
                      </Text>
                    </Box>
                  </Flex>
                </>
              )}
              {owns_dclens && (
                <>
                  <Divider />
                  <Flex w="100%" h="100%">
                    <ToolTip label={toolTipText.owns_dclens}>
                      <Box _hover={{ cursor: "help" }}>DCLENS</Box>
                    </ToolTip>
                    <Spacer />
                    <Box>
                      <Link
                        href={`https://market.decentraland.org/accounts/${address}?assetType=nft&section=ens`}
                        target="_blank"
                      >
                        <Button borderRadius="xl" shadow="md" size="xs">
                          <Text fontWeight="bold">{owns_dclens && "Name"}</Text>
                        </Button>
                      </Link>
                    </Box>
                  </Flex>
                </>
              )}
              {total_dclens > 0 && (
                <Flex w="100%" h="100%">
                  <ToolTip label={toolTipText.total_dclens}>
                    <Box _hover={{ cursor: "help" }}>Total DCLENS</Box>
                  </ToolTip>
                  <Spacer />
                  <Box>{total_dclens ? total_dclens : "N/A"}</Box>
                </Flex>
              )}
              {first_dclens_acquired_at && (
                <>
                  <Flex w="100%" h="100%">
                    <ToolTip label={toolTipText.first_dclens_acquired_at}>
                      <Box _hover={{ cursor: "help" }}>First DCLENS</Box>
                    </ToolTip>
                    <Spacer />
                    <Box>
                      <Text as="kbd" align="right" noOfLines={1}>
                        {first_dclens_acquired_at
                          ? parseUTC(first_dclens_acquired_at)
                          : "N/A"}
                      </Text>
                    </Box>
                  </Flex>
                  <Divider />
                </>
              )}

              {owns_wearables && (
                <Flex w="100%" h="100%">
                  <ToolTip label={toolTipText.owns_wearables}>
                    <Box _hover={{ cursor: "help" }}>Wearable</Box>
                  </ToolTip>
                  <Spacer />
                  <Box>
                    <Link
                      href={`https://market.decentraland.org/accounts/${address}?assetType=nft&section=wearable`}
                      target="_blank"
                    >
                      <Button borderRadius="xl" shadow="md" size="xs">
                        <Text fontWeight="bold">
                          {owns_wearables && "Wearable"}
                        </Text>
                      </Button>
                    </Link>
                  </Box>
                </Flex>
              )}
              {total_wearables && (
                <Flex w="100%" h="100%">
                  <ToolTip label={toolTipText.total_wearables}>
                    <Box _hover={{ cursor: "help" }}>Total Wearables</Box>
                  </ToolTip>
                  <Spacer />
                  <Box>{total_wearables > 999 ? "1000+" : total_wearables}</Box>
                </Flex>
              )}
              {first_wearable_acquired_at && (
                <>
                  <Flex w="100%" h="100%">
                    <ToolTip label={toolTipText.first_wearable_acquired_at}>
                      <Box _hover={{ cursor: "help" }}>First Wearable</Box>
                    </ToolTip>
                    <Spacer />
                    <Box>
                      <Text as="kbd" align="right" noOfLines={1}>
                        {first_wearable_acquired_at
                          ? parseUTC(first_wearable_acquired_at)
                          : "N/A"}
                      </Text>
                    </Box>
                  </Flex>
                </>
              )}
              {owns_land && (
                <>
                  <Divider />
                  <Flex w="100%" h="100%">
                    <ToolTip label={toolTipText.owns_land}>
                      <Box _hover={{ cursor: "help" }}>Land</Box>
                    </ToolTip>
                    <Spacer />
                    <Box>
                      <Link
                        href={`https://market.decentraland.org/accounts/${address}?assetType=nft&section=land`}
                        target="_blank"
                      >
                        <Button borderRadius="xl" shadow="md" size="xs">
                          <Text fontWeight="bold">{owns_land && "Land"}</Text>
                        </Button>
                      </Link>
                    </Box>
                  </Flex>
                </>
              )}

              {total_lands && (
                <Flex w="100%" h="100%">
                  <ToolTip label={toolTipText.total_lands}>
                    <Box _hover={{ cursor: "help" }}>Total Lands</Box>
                  </ToolTip>
                  <Spacer />
                  <Box>{total_lands}</Box>
                </Flex>
              )}
              {first_land_acquired_at && (
                <Flex w="100%" h="100%">
                  <ToolTip label={toolTipText.first_land_acquired_at}>
                    <Box _hover={{ cursor: "help" }}>First Land</Box>
                  </ToolTip>
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
            </VStack>
          </Box>
        </Flex>
      ) : (
        <Center h="225px">
          <Text color={useColorModeValue("gray.200", "gray.600")}>No Data</Text>
        </Center>
      )}
    </BoxWrapper>
  )
}

export default UserNFT
