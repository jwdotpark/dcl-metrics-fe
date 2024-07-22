import { Box } from "@chakra-ui/react"
import { useAtom } from "jotai"
import { useEffect, useState } from "react"
import { getEndpoint } from "../../../lib/data/constant"
import { tableIndexAtom } from "../../../lib/state/sceneChart"
import BoxWrapper from "../../layout/local/BoxWrapper"
import PlainBoxTitle from "../../layout/local/PlainBoxTitle"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

const SceneCharts = ({ sceneRes }) => {
  // eslint-disable-next-line no-unused-vars
  const [tableIndex, setTableIndex] = useAtom(tableIndexAtom)
  const data = sceneRes.slice(tableIndex * 10, tableIndex * 10 + 10)
  const uuidParam = data.map((d) => d.uuid).join(",")

  const [option, setOption] = useState({
    dateRange: 7,
    uuid: uuidParam,
    metric: "total_visitors",
  })

  const [isLoading, setIsLoading] = useState(true)
  const [chartData, setChartData] = useState([])

  const fetchChartData = async () => {
    const endpoint = getEndpoint(`scenes/compare`)
    const targetUrl = `/api/chart-data?url=${endpoint}&range=${option.dateRange}&uuids=${option.uuid}&metric=${option.metric}`

    try {
      setIsLoading(true)
      const response = await fetch(targetUrl)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      return data.result
    } catch (error) {
      console.error("Error fetching chart data:", error)
      return []
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchChartData()
        setChartData(data)
      } catch (error) {
        console.error(error)
      }
    }
    getData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  console.log(chartData)
  // extract name into array
  const names = data.map((d) => d.name)
  console.log(names)

  const transformedData = {}

  chartData.forEach((scene) => {
    scene.values.forEach((entry) => {
      const { date, value } = entry
      if (!transformedData[date]) {
        transformedData[date] = { date }
      }
      transformedData[date][scene.name] = value
    })
  })

  const sortedData = Object.keys(transformedData)
    .sort()
    .map((date) => transformedData[date])

  console.log("sorted", sortedData)

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
        <Box w="100%" h="500px">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              width={500}
              height={300}
              data={sortedData}
              margin={{
                top: 5,
                right: 40,
                left: 10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {names.map((item) => {
                return (
                  <Line
                    key={item}
                    type="monotone"
                    dataKey={item}
                    //stroke="#8884d8"
                    // randomize stroke color
                    stroke={`#${Math.floor(Math.random() * 16777215).toString(
                      16
                    )}`}
                    activeDot={{ r: 8 }}
                  />
                )
              })}
              <Line
                type="monotone"
                dataKey="WonderMine Crafting Game"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                dataKey="Soul Magic"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </BoxWrapper>
  )
}

export default SceneCharts
