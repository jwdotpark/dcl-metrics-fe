import { Flex, Box, Text, VStack, Spacer } from "@chakra-ui/react"
import CountUp from "react-countup"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import UserDAOActivityCollection from "./partial/UserDAOActivityCollection"
import UserDAOAvtivityDelegate from "./partial/delegate/UserDAOAvtivityDelegate"
import UserDAOActivityGrant from "./partial/grant/UserDAOActivityGrant"
import { parseUTC } from "../../../../lib/hooks/utils"

const UserDAOActivity = ({ data }) => {
  const {
    name,
    title,
    total_vp,
    votes,
    active_dao_committee_member,
    address,
    collection_creator,
    collections,
    delegate,
    delegated_vp,
    delegators,
    grants,
    proposals,
    teams,
  } = data

  console.log(teams)

  return (
    <BoxWrapper colSpan={[1, 1, 1, 2, 2]}>
      <BoxTitle
        name="DAO Activity"
        description={`${name}'s DAO activity`}
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
              <Box>Title</Box>
              <Spacer />
              <Box>
                <Text>{title ? title : "N/A"}</Text>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Total VP</Box>
              <Spacer />
              <Box>
                <CountUp
                  end={total_vp ? total_vp : "N/A"}
                  duration={0.5}
                  decimals={0}
                />
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Delegated VP</Box>
              <Spacer />
              <Box>
                <CountUp
                  end={delegated_vp ? delegated_vp : "N/A"}
                  duration={0.5}
                  decimals={0}
                />
              </Box>
            </Flex>
            {votes && (
              <>
                <Flex w="100%" h="100%">
                  <Box>Total Votes</Box>
                  <Spacer />
                  <Box>
                    <CountUp
                      end={votes.total_votes ? votes.total_votes : 0}
                      duration={0.5}
                      decimals={0}
                    />
                  </Box>
                </Flex>
                <Flex w="100%" h="100%">
                  <Box>First Vote</Box>
                  <Spacer />
                  <Box>
                    <Text as="kbd">{parseUTC(votes.first_vote_cast_at)}</Text>
                  </Box>
                </Flex>
                <Flex w="100%" h="100%">
                  <Box>Latest Vote</Box>
                  <Spacer />
                  <Box>
                    <Text as="kbd">{parseUTC(votes.latest_vote_cast_at)}</Text>
                  </Box>
                </Flex>
              </>
            )}
            <Flex w="100%" h="100%">
              <Box>Active DAO Committee Member</Box>
              <Spacer />
              <Box>
                <Text color={active_dao_committee_member ? "green" : "red"}>
                  {active_dao_committee_member ? "Yes" : "No"}
                </Text>
              </Box>
            </Flex>
            <Flex w="100%" h="100%">
              <Box>Collection Creator</Box>
              <Spacer />
              <Box>
                <Text color={collection_creator ? "green" : "red"}>
                  {collection_creator ? "Yes" : "No"}
                </Text>
              </Box>
            </Flex>
            <UserDAOActivityCollection name={name} collections={collections} />
            <UserDAOAvtivityDelegate
              name={name}
              delegate={delegate}
              delegators={delegators}
            />
            <UserDAOActivityGrant name={name} grants={grants} />
          </VStack>
        </Box>
      </Flex>
    </BoxWrapper>
  )
}

export default UserDAOActivity
