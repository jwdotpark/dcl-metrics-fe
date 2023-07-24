import { Box } from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import WorldStatBox from "./WorldStatBox"

const WorldStat = ({ worldCurrentRes }) => {
  const { total_count, current_users, timestamp, currently_occupied } =
    worldCurrentRes

  return (
    <Box mb="4">
      <BoxWrapper colSpan={2}>
        <BoxTitle
          name="World Stat"
          description="A list of Worlds currently deployed to Decentraland servers."
          date={""}
          avgData={undefined}
          slicedData={() => {}}
          color={""}
          line={{}}
          setLine={() => {}}
        />
        <WorldStatBox
          total_count={total_count}
          current_users={current_users}
          currently_occupied={currently_occupied}
          timestamp={timestamp}
        />
      </BoxWrapper>
    </Box>
  )
}

export default WorldStat
