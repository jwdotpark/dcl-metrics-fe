import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import staticWorldGlobal from "../../../../../public/data/staticWorldGlobal.json"
import { Box } from "@chakra-ui/react"

const WorldStat = () => {
  console.log(staticWorldGlobal)
  return (
    <BoxWrapper colSpan={[4, 4, 4, 4, 2]}>
      <BoxTitle
        name="World Trends"
        description="World Trends description"
        date={""}
        avgData={undefined}
        slicedData={() => {}}
        color={""}
        line={{}}
        setLine={() => {}}
      />
      <Box></Box>
    </BoxWrapper>
  )
}

export default WorldStat
