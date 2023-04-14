import { Box, Flex, Spacer } from "@chakra-ui/react"

const UserDAOActivityTeam = ({ name, teams }) => {
  return (
    <Flex w="100%" h="100%">
      <Box>Teams</Box>
      <Spacer />
      <Box>
        {/*<Text color={active_dao_committee_member ? "green" : "gray"}>
          {active_dao_committee_member ? "Yes" : "No"}
        </Text>*/}
      </Box>
    </Flex>
  )
}

export default UserDAOActivityTeam
