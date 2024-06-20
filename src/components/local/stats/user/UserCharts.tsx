import BoxWrapper from "../../../layout/local/BoxWrapper"
import { Flex } from "@chakra-ui/react"

import { UserTimeSpent } from "./UserTimeSpent"
import UserScenesVisited from "./UserScenesVisited"

const UserCharts = ({ address }) => {
  return (
    <BoxWrapper colSpan={[1, 1, 1, 4, 6]}>
      <Flex direction="column">
        <UserTimeSpent address={address} />
        <UserScenesVisited address={address} />
      </Flex>
    </BoxWrapper>
  )
}

export default UserCharts
