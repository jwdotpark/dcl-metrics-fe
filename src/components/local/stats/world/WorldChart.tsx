import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import staticWorldGlobal from "../../../../../public/data/staticWorldGlobal.json"
import WorldChartLine from "../partials/world/WorldChartLine"

const WorldStat = () => {
  console.log(staticWorldGlobal)
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
      <WorldChartLine data={staticWorldGlobal} />
    </BoxWrapper>
  )
}

export default WorldStat
