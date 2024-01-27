import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import WorldChartLine from "../partials/world/WorldChartLine"

type WorldStatProps = {
  worldGlobalRes: any
}

const WorldStat = ({ worldGlobalRes }: WorldStatProps) => {
  return (
    <BoxWrapper colSpan={[4, 4, 4, 4, 2]}>
      <BoxTitle
        name="World Trends"
        description="Historical trends of DCL and ENS worlds"
        date={""}
        avgData={undefined}
        slicedData={() => {}}
        color={""}
        line={{}}
        setLine={() => {}}
      />
      <WorldChartLine data={worldGlobalRes} />
    </BoxWrapper>
  )
}

export default WorldStat
