import { GridItemContainer } from "../../../../layout/global/grid/GridItemContainer"
import { Title } from "../../../../layout/global/grid/Title"
import WorldStatBox from "../../world/WorldStatBox"

export const WorldStatGrid = ({ worldCurrentRes }) => {
  const { total_count, current_users, timestamp, currently_occupied } =
    worldCurrentRes

  return (
    <GridItemContainer>
      <Title title="Concurrent Worlds Metrics" description="" payload={[]} />
      <WorldStatBox
        isMainPage={true}
        total_count={total_count}
        current_users={current_users}
        currently_occupied={currently_occupied}
        timestamp={timestamp}
      />
    </GridItemContainer>
  )
}
