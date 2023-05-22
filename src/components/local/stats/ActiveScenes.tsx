import { useEffect, useState, useMemo, useCallback } from "react"
import { Box } from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import {
  defaultDateRange,
  sliceData,
  sliceDateRange,
  findFalse,
} from "../../../lib/data/chart/chartInfo"
import {
  generateChartData,
  mapChartData,
  calculateAverages,
} from "../../../lib/data/chart/chartHelper"
import BoxTitle from "../../layout/local/BoxTitle"
import DateRangeButton from "./daterange/DateRangeButton"
import LineChart from "../../../lib/LineChart"

const ActiveScenes = ({ data }) => {
  const color = useMemo(() => ["#ffb86c"], [])
  const chartKeys = ["active_scenes"]
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [avgData, setAvgData] = useState([])
  const [lineColor, setLineColor] = useState(color)
  const [avgColor, setAvgColor] = useState(color)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chartData = useMemo(() => generateChartData(data, chartKeys), [data])

  const partial = useMemo(
    () => sliceData(chartData, dateRange),
    [chartData, dateRange]
  )

  const dateString = useMemo(
    () => sliceDateRange(chartData, dateRange).date,
    [chartData, dateRange]
  )
  const generateResultData = useCallback(() => {
    const mappedResult = [
      mapChartData("Scenes Visited", "active_scenes", partial),
    ]

    mappedResult.forEach((item: any, i: number) => {
      item.color = color[i]
    })

    return mappedResult
  }, [color, partial])

  const result = useMemo(() => generateResultData(), [generateResultData])

  const lineVisibility = useMemo(() => result.map(() => true), [result])

  const [line, setLine] = useState(lineVisibility)

  useEffect(() => {
    setAvgData(calculateAverages(partial, chartKeys))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange, calculateAverages])

  useEffect(() => {
    const res = findFalse(line)
    const newChartColor = color.filter((item, i) => !res.includes(i.toString()))
    const newAvgColor = color.map((item, i) =>
      res.includes(i.toString()) ? "gray.400" : item
    )

    setLineColor(newChartColor)
    setAvgColor(newAvgColor)
  }, [color, line])

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
