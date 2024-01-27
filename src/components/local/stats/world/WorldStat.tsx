import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import WorldStatBox from "./WorldStatBox"

const WorldStat = ({ worldCurrentRes, isMainPage }) => {
  const { total_count, current_users, timestamp, currently_occupied } =
    worldCurrentRes

  return (
    <BoxWrapper colSpan={[4, 4, 4, 4, 2]}>
      <BoxTitle
        name="Concurrent Worlds Metrics"
        description=""
        date={""}
        avgData={undefined}
        slicedData={() => {}}
        color={""}
        line={{}}
        setLine={() => {}}
      />
      <WorldStatBox
        isMainPage={isMainPage}
        total_count={total_count}
        current_users={current_users}
        currently_occupied={currently_occupied}
        timestamp={timestamp}
      />
    </BoxWrapper>
  )
}

export default WorldStat
