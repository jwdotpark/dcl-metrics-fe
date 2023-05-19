import { useEffect, useState, useMemo, useCallback } from "react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import BoxTitle from "../../layout/local/BoxTitle"
import {
  defaultDateRange,
  sliceData,
  sliceDateRange,
  findFalse,
} from "../../../lib/data/chartInfo"
import DateRangeButton from "./daterange/DateRangeButton"
import LineChart from "../../../lib/LineChart"

const UniqueVisitors = ({ data }) => {
  const color = useMemo(() => ["#48BB78", "#9F7AEA", "#4299E1", "#F56565"], [])

  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [avgData, setAvgData] = useState([])
  const [lineColor, setLineColor] = useState(color)
  const [avgColor, setAvgColor] = useState(color)

  const generateChartData = useCallback((data: Record<string, any>) => {
    const dataArr = Object.entries(data)
    const generatedChartData: any[] = []

    dataArr.forEach((item) => {
      const [date, users] = item
      generatedChartData.push({
        id: date,
        date,
        degraded: users.degraded,
        unique_users: users.users.unique_users,
        new_users: users.users.new_users,
        named_users: users.users.named_users,
        guest_users: users.users.guest_users,
      })
    })

    return generatedChartData
  }, [])

  const chartData = useMemo(
    () => generateChartData(data),
    [data, generateChartData]
  )

  const partial = useMemo(
    () => sliceData(chartData, dateRange),
    [chartData, dateRange]
  )

  const dateString = useMemo(
    () => sliceDateRange(chartData, dateRange).date,
    [chartData, dateRange]
  )

  const mapData = useCallback(
    (id: string, key: string) => {
      return {
        id,
        data: partial.map((item) => ({
          x: item.date,
          y: item[key],
          degraded: item.degraded,
        })),
      }
    },
    [partial]
  )

  const generateResultData = useCallback(() => {
    const mappedResult = [
      mapData("Unique Users", "unique_users"),
      mapData("Guest Users", "guest_users"),
      mapData("New Users", "new_users"),
      mapData("Named Users", "named_users"),
    ]

    mappedResult.forEach((item: any, i: number) => {
      item.color = color[i]
    })

    return mappedResult
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mapData])

  const result = useMemo(() => generateResultData(), [generateResultData])

  const lineVisibility = useMemo(() => result.map(() => true), [result])

  const [line, setLine] = useState(lineVisibility)

  const calculateAverages = useCallback((partial) => {
    const validLength = partial.length
    const sum = {
      uniqueUsers: partial.reduce((acc, cur) => acc + cur.unique_users, 0),
      guestUsers: partial.reduce((acc, cur) => acc + cur.guest_users, 0),
      newUsers: partial.reduce((acc, cur) => acc + cur.new_users, 0),
      namedUsers: partial.reduce((acc, cur) => acc + cur.named_users, 0),
    }
    const value = {
      unique_users: Math.floor(sum.uniqueUsers / validLength),
      guest_users: Math.floor(sum.guestUsers / validLength),
      new_users: Math.floor(sum.newUsers / validLength),
      named_users: Math.floor(sum.namedUsers / validLength),
    }
    const map = [
      { id: "Unique Users", value: value.unique_users },
      { id: "Guest Users", value: value.guest_users },
      { id: "New Users", value: value.new_users },
      { id: "Named Users", value: value.named_users },
    ].sort((a, b) => {
      return b.value - a.value
    })
    return map
  }, [])

  const filteredResult = useMemo(
    () => result.filter((item, i) => line[i]),
    [result, line]
  )

  useEffect(() => {
    setAvgData(calculateAverages(partial))
  }, [dateRange, calculateAverages, partial])

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
