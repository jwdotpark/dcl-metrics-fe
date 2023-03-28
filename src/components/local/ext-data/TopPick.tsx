import BoxTitle from "../../layout/local/BoxTitle"
import BoxWrapper from "../../layout/local/BoxWrapper"
import BottomLegend from "./partial/BottomLegend"

const TopPick = ({ data }) => {
  return (
    <BoxWrapper colSpan={6}>
      <BoxTitle
        name="Top 50 Picked Land"
        date=""
        avgData=""
        slicedData=""
        color=""
        description="top pick scenes"
        line={undefined}
        setLine={undefined}
      />
      <BottomLegend description="Source from MetaGameHub DAO" />
    </BoxWrapper>
  )
}

export default TopPick
