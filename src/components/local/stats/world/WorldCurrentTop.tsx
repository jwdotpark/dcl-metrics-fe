import { Box } from "@chakra-ui/react"
import BoxTitle from "../../../layout/local/BoxTitle"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import WorldTable from "./WorldTable"

const WorldCurrentTop = ({ worldCurrentRes }) => {
  return (
    <Box>
      <BoxWrapper colSpan={0}>
        <BoxTitle
          name="World Data"
          description="A list of Worlds currently deployed to Decentraland servers."
          date={""}
          avgData={undefined}
          slicedData={() => {}}
          color={""}
          line={{}}
          setLine={() => {}}
        />
        <WorldTable worldCurrentRes={worldCurrentRes} />
      </BoxWrapper>
    </Box>
  )
}

export default WorldCurrentTop
