/* eslint-disable react-hooks/rules-of-hooks */
import {
  Flex,
  useColorModeValue,
  Box,
  Text,
  VStack,
  Spacer,
  Center,
  Divider,
} from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import UserDAOActivityCollection from "./partial/collection/UserDAOActivityCollection"
import UserDAOAvtivityDelegate from "./partial/delegate/UserDAOAvtivityDelegate"
import UserDAOActivityGrant from "./partial/grant/UserDAOActivityGrant"
import { parseUTC } from "../../../../lib/hooks/utils"
import UserDAOActivityTeam from "./partial/teams/UserDAOAvtivityTeams"
import UserDAOActivityProposal from "./partial/proposal/UserDAOActivityProposal"
import { FiAlertTriangle } from "react-icons/fi"
import { lineChartAtom } from "../../../../lib/state/lineChartState"
import { useAtom } from "jotai"

const UserDAOActivity = ({ data }) => {
  const {
    name,
    title,
    total_vp,
    votes,
    active_dao_committee_member,
    collection_creator,
    collections,
    delegate,
    delegated_vp,
    delegators,
    grants,
    proposals,
    teams,
  } = data

  const checkFalsyData = () => {
    if (
      !total_vp &&
      !votes &&
      !active_dao_committee_member &&
      !collection_creator &&
      !collections &&
      !delegate &&
      !delegated_vp &&
      !delegators &&
      !grants &&
      !proposals &&
      !teams
    ) {
      return false
    } else {
      return true
    }
  }

  const [chartProps, setChartProps] = useAtom(lineChartAtom)

  return (
    <BoxWrapper colSpan={[1, 1, 1, 4, 2]}>
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
      {checkFalsyData() ? (
        <Flex direction="column" w="auto" m="4" mx="5">
          <Box w="100%">
            <VStack align="stretch" spacing="4">
              {title && (
                <>
                  <Flex w="100%" h="100%">
                    <Box>Title</Box>
                    <Spacer />
                    <Box>
                      <Text>{title ? title : "N/A"}</Text>
                    </Box>
                  </Flex>
                </>
              )}

              {total_vp > 0 && (
                <>
                  <Divider />
                  <Flex w="100%" h="100%">
                    <Box>Total VP</Box>
                    <Spacer />
                    <Box>{total_vp ? Math.round(total_vp) : "N/A"}</Box>
                  </Flex>
                </>
              )}
              {delegated_vp && (
                <>
                  <Flex w="100%" h="100%">
                    <Box>Delegated VP</Box>
                    <Spacer />
                    <Box>{delegated_vp ? delegated_vp : "N/A"}</Box>
                  </Flex>
                </>
              )}

              {votes && (
                <>
                  <Divider />
                  <Flex w="100%" h="100%">
                    <Box>Total Votes</Box>
                    <Spacer />
                    <Box>{votes.total_votes ? votes.total_votes : 0}</Box>
                  </Flex>
                  {votes.first_vote_cast_at !== "" && (
                    <Flex w="100%" h="100%">
                      <Box>First Vote</Box>
                      <Spacer />
                      <Box>
                        <Text as="kbd">
                          {parseUTC(votes.first_vote_cast_at)}
                        </Text>
                      </Box>
                    </Flex>
                  )}
                  {votes.latest_vote_cast_at !== "" && (
                    <Flex w="100%" h="100%">
                      <Box>Latest Vote</Box>
                      <Spacer />
                      <Box>
                        <Text as="kbd">
                          {parseUTC(votes.latest_vote_cast_at)}
                        </Text>
                      </Box>
                    </Flex>
                  )}
                </>
              )}

              {active_dao_committee_member && (
                <>
                  <Flex w="100%" h="100%">
                    <Box>Active DAO Committee Member</Box>
                    <Spacer />
                    <Box>
                      <Text
                        color={active_dao_committee_member ? "green" : "gray"}
                      >
                        {active_dao_committee_member ? "Yes" : "No"}
                      </Text>
                    </Box>
                  </Flex>
                  <Divider />
                </>
              )}

              {collection_creator && (
                <>
                  <Divider />
                  <Flex w="100%" h="100%">
                    <Box>Collection Creator</Box>
                    <Spacer />
                    <Box>
                      <Text color={collection_creator ? "green" : "gray"}>
                        {collection_creator ? "Yes" : "No"}
                      </Text>
                    </Box>
                  </Flex>
                </>
              )}
              {collections && collections.length > 0 && (
                <>
                  <UserDAOActivityCollection
                    name={name}
                    collections={collections}
                  />
                </>
              )}
              <UserDAOAvtivityDelegate
                name={name}
                delegate={delegate}
                delegators={delegators}
              />

              <UserDAOActivityGrant name={name} grants={grants} />
              {teams && teams.length > 0 && (
                <UserDAOActivityTeam name={name} teams={teams} />
              )}
              {proposals && proposals.count > 0 && (
                <UserDAOActivityProposal name={name} proposals={proposals} />
              )}
            </VStack>
          </Box>
        </Flex>
      ) : (
        <Center h={chartProps.height}>No Data</Center>
      )}
    </BoxWrapper>
  )
}

export default UserDAOActivity
