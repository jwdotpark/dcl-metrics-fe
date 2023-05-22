import { Box } from "@chakra-ui/react"
import ScenePageTable from "./partials/scene/table/ScenePageTable"
import BoxTitle from "../../layout/local/BoxTitle"
import BoxWrapper from "../../layout/local/BoxWrapper"
import moment from "moment"

const SceneTable = ({ sceneRes }) => {
  const yesterday = moment(sceneRes[0].date).format("YYYY MMM. D")

  return (
    <BoxWrapper colSpan={6}>
      <Box
        sx={{
          "&::-webkit-scrollbar": {
            display: "none",
          },
          msOverflowStyle: "none",
          scrollbarWidth: "none",
        }}
        overflowY="auto"
        pb="4"
      >
        <BoxTitle
          name="Top 50 Scenes"
          date=""
          avgData=""
          slicedData=""
          color=""
          description={`Check out the busiest top scenes on ${yesterday}`}
          line={undefined}
          setLine={undefined}
        />
        <ScenePageTable sceneRes={sceneRes} />
      </Box>
    </BoxWrapper>
  )
}

export default SceneTable
