import BoxWrapper from "../../../layout/local/BoxWrapper"
import { Flex } from "@chakra-ui/react"

import { UserTimeSpent } from "./UserTimeSpent"
import UserScenesVisited from "./UserScenesVisited"

const UserCharts = ({ address }) => {
  const chartHeight = 150
  return (
    <BoxWrapper colSpan={[1, 1, 1, 4, 6]}>
      <Flex direction="column">
        <UserTimeSpent address={address} chartHeight={chartHeight} />
        <UserScenesVisited address={address} chartHeight={chartHeight} />
      </Flex>
    </BoxWrapper>
  )
}

export default UserCharts
