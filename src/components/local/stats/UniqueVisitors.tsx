import { useEffect, useState, useMemo, useCallback } from "react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import BoxTitle from "../../layout/local/BoxTitle"
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
import DateRangeButton from "./daterange/DateRangeButton"
import LineChart from "../../../lib/LineChart"

const UniqueVisitors = ({ data }) => {
  const color = useMemo(() => ["#48BB78", "#9F7AEA", "#4299E1", "#F56565"], [])
  const userKeys = ["unique_users", "guest_users", "new_users", "named_users"]

  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [avgData, setAvgData] = useState([])
  const [lineColor, setLineColor] = useState(color)
  const [avgColor, setAvgColor] = useState(color)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const chartData = useMemo(() => generateChartData(data, userKeys), [data])

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
      mapChartData("Unique Users", "unique_users", partial),
      mapChartData("Guest Users", "guest_users", partial),
      mapChartData("New Users", "new_users", partial),
      mapChartData("Named Users", "named_users", partial),
    ]

    mappedResult.forEach((item: any, i: number) => {
      item.color = color[i]
    })

    return mappedResult
  }, [color, partial])

  const result = useMemo(() => generateResultData(), [generateResultData])

  const lineVisibility = useMemo(() => result.map(() => true), [result])

  const [line, setLine] = useState(lineVisibility)

  const filteredResult = useMemo(
    () => result.filter((item, i) => line[i]),
    [result, line]
  )

  useEffect(() => {
    setAvgData(calculateAverages(partial, userKeys))
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
    <BoxWrapper colSpan={0}>
      <BoxTitle
        name="Unique Visitors"
        description={false}
        date={dateString}
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
        name="global_unique_visitors"
        yesterday={false}
      />
      <LineChart
        data={filteredResult}
        color={lineColor}
        avgColor={avgColor}
        rentalData={undefined}
        name="uniqueVisitors"
        avgData={avgData}
        line={line}
      />
    </BoxWrapper>
  )
}

export default UniqueVisitors
