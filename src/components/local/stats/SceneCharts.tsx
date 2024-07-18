import { Box } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { getEndpoint, isDev, isLocal, isProd } from "../../../lib/data/constant"
import { tableIndexAtom } from "../../../lib/state/sceneChart"
import BoxWrapper from "../../layout/local/BoxWrapper"
import PlainBoxTitle from "../../layout/local/PlainBoxTitle"

const SceneCharts = ({ sceneRes }) => {
  // eslint-disable-next-line no-unused-vars
  const [tableIndex, setTableIndex] = useAtom(tableIndexAtom)
  const data = sceneRes.slice(tableIndex * 10, tableIndex * 10 + 10)
  const uuidParam = data.map((d) => d.uuid).join(",")

  const [option, setOption] = useState({
    dateRange: 7,
    uuid: uuidParam,
    metric: "visitors",
  })

  const [chartData, setChartData] = useState([])

  //const fetchChartData = async () => {
  //  const endpoint = getEndpoint(`scenes/compare`)
  //  const targetUrl = `/api/chart-data?url=${endpoint}&range=${option.dateRange}&uuid=${option.uuid}&metric=${option.metric}`

  //  if (isProd) {
  //    const response = await fetch(targetUrl)
  //    const data = await response.json()
  //    setChartData(data.result)
  //  } else if (isDev && !isLocal) {
  //    const response = await fetch(targetUrl)
  //    const data = await response.json()
  //    setChartData(data.result)
  //  } else if (isLocal) {
  //    // fix this
  //    const response = await fetch(targetUrl)
  //    const data = await response.json()
  //    setChartData(data.result)
  //  }
  //  console.log(chartData)
  //}

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
        <PlainBoxTitle name="Top 10 Scenes Chart" description="description" />
        {/* charts */}
      </Box>
    </BoxWrapper>
  )
}

export default SceneCharts
