import { useEffect, useState, useMemo } from "react"
import { Box } from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import {
  defaultDateRange,
  sliceData,
  sliceDateRange,
  findFalse,
} from "../../../lib/data/chartInfo"
import BoxTitle from "../../layout/local/BoxTitle"
import DateRangeButton from "./daterange/DateRangeButton"
import LineChart from "../../../lib/LineChart"

const ActiveScenes = ({ data }: { data: Record<string, any> }) => {
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const color = useMemo(() => ["#ffb86c"], [])

  const [avgData, setAvgData] = useState<any[]>([])
  const chartData = useMemo(() => {
    const dataArr = Object.entries(data)
    const generatedChartData: any[] = []

    dataArr.forEach(([date, users]) => {
      generatedChartData.push({
        id: date,
        date,
        active_scenes: users.active_scenes,
        degraded: users.degraded,
      })
    })

    return generatedChartData
  }, [data])

  const [lineColor, setLineColor] = useState(color)
  const [avgColor, setAvgColor] = useState(color)

  const partial = useMemo(
    () => sliceData(chartData, dateRange),
    [chartData, dateRange]
  )

  const dateString = useMemo(
    () => sliceDateRange(chartData, dateRange).date,
    [chartData, dateRange]
  )

  const mapData = useMemo(() => {
    const id = "Scene Visitors"
    const key = "active_scenes"

    return {
      id,
      data: partial.map((item) => ({
        x: item.date,
        y: item[key],
        degraded: item.degraded,
      })),
    }
  }, [partial])

  const result = useMemo(() => {
    const mappedResult = [mapData]
    mappedResult.forEach((item: any, i) => {
      item.color = color[i]
    })
    return mappedResult
  }, [mapData, color])

  const lineVisibility = useMemo(
    () => Array(result.length).fill(true),
    [result.length]
  )

  const [line, setLine] = useState(lineVisibility)

  const calculateAverages = useMemo(() => {
    const validLength = partial.length
    const sum = {
      active_scenes: partial.reduce((acc, cur) => acc + cur.active_scenes, 0),
    }
    const value = {
      active_scenes: Math.floor(sum.active_scenes / validLength),
    }
    const map = [{ id: "Average Value", value: value.active_scenes }]
    return map
  }, [partial])

  useEffect(() => {
    setAvgData(calculateAverages)
  }, [calculateAverages])

  useEffect(() => {
    const res = findFalse(line)
    const newChartColor = color.filter((item, i) => !res.includes(i.toString()))
    const newAvgColor = color.map((item, i) =>
      res.includes(i.toString()) ? "gray.400" : item
    )

    setLineColor(newChartColor)
    setAvgColor(newAvgColor)
  }, [line, color])

  return (
    <BoxWrapper colSpan={3}>
      <Box data-testid="scenesVisited">
        <BoxTitle
          name="Scenes Visited"
          date={dateString}
          description={false}
          avgData={avgData}
          slicedData={partial}
          color={avgColor}
          line={line}
          setLine={setLine}
        />
        <DateRangeButton
          dateRange={dateRange}
          setDateRange={setDateRange}
          validLegnth={90}
          name="global_scenes_visited"
          yesterday={false}
        />
        <LineChart
          data={result}
          color={lineColor}
          name="activeScenes"
          rentalData={undefined}
          avgData={avgData}
          line={line}
          avgColor={avgColor}
        />
      </Box>
    </BoxWrapper>
  )
}

export default ActiveScenes
