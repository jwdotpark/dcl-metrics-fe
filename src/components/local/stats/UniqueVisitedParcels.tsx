import { useEffect, useState, useMemo } from "react"
import { Box } from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import {
  defaultDateRange,
  sliceData,
  sliceDateRange,
  findFalse,
} from "../../../lib/data/chart/chartInfo"
import BoxTitle from "../../layout/local/BoxTitle"
import DateRangeButton from "./daterange/DateRangeButton"
import LineChart from "../../../lib/LineChart"

const UniqueVisitedParcels = ({ data }: { data: Record<string, any> }) => {
  const chartData = useMemo(() => {
    const dataArr = Object.entries(data)
    const generatedChartData: any[] = []

    dataArr.forEach(([date, users]) => {
      generatedChartData.push({
        id: date,
        date,
        active_parcels: users.active_parcels,
        degraded: users.degraded,
      })
    })

    return generatedChartData
  }, [data])

  const color = useMemo(() => ["#CAB2D6FF"], [])

  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [avgData, setAvgData] = useState<any[]>([])

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
    const id = "Parcel Visitors"
    const key = "active_parcels"

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
      active_parcels: partial.reduce((acc, cur) => acc + cur.active_parcels, 0),
    }
    const value = {
      active_parcels: Math.floor(sum.active_parcels / validLength),
    }
    const map = [{ id: "Average Value", value: value.active_parcels }]
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
      <Box data-testid="parcelVisitors">
        <BoxTitle
          name="Parcel Visitors"
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
          name="global_parcels_visited"
          yesterday={false}
        />
        <LineChart
          data={result}
          color={lineColor}
          name="uniqueVisitors"
          rentalData={undefined}
          avgData={avgData}
          line={line}
          avgColor={avgColor}
        />
      </Box>
    </BoxWrapper>
  )
}

export default UniqueVisitedParcels
