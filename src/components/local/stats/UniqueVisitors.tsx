// @ts-nocheck
import { useEffect, useState } from "react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import BoxTitle from "../../layout/local/BoxTitle"
import {
  defaultDateRange,
  sliceData,
  date,
  findFalse,
} from "../../../lib/data/chartInfo"
import DateRangeButton from "./daterange/DateRangeButton"
import LineChart from "../../../lib/LineChart"

const UniqueVisitors = ({ data }) => {
  const dataArr = Object.entries(data)
  const chartData = []
  const color = ["#48BB78", "#9F7AEA", "#4299E1", "#F56565"]
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [avgData, setAvgData] = useState([])

  const [lineColor, setLineColor] = useState(color)
  const [avgColor, setAvgColor] = useState(color)

  // TODO type this
  dataArr.map((item) => {
    chartData.push({
      id: item[0],
      date: item[0],
      degraded: item[1].degraded,
      unique_users: item[1].users.unique_users,
      new_users: item[1].users.new_users,
      named_users: item[1].users.named_users,
      guest_users: item[1].users.guest_users,
    })
  })

  const partial = sliceData(chartData, dateRange)
  const dateString = date(chartData, dateRange).date

  const mapData = (id: string, key: string) => {
    return {
      id: id,
      data: partial.map((item) => ({
        x: item.date,
        y: item[key],
        degraded: item.degraded,
      })),
    }
  }

  const result = [
    mapData("Unique Users", "unique_users"),
    mapData("Guest Users", "guest_users"),
    mapData("New Users", "new_users"),
    mapData("Named Users", "named_users"),
  ]

  result.map((item, i) => {
    item.color = color[i]
  })

  const lineVisibility = result.map(() => {
    return true
  })

  const [line, setLine] = useState(lineVisibility)

  const calculateAverages = (partial) => {
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
  }

  const filteredResult = result.filter((item, i) => {
    return line[i]
  })

  useEffect(() => {
    setAvgData(calculateAverages(partial))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  useEffect(() => {
    const res = findFalse(line)
    const newChartColor = color.filter((item, i) => {
      return !res.includes(i.toString())
    })
    const newAvgColor = color.map((item, i) => {
      if (res.includes(i.toString())) {
        return "gray.400"
      } else {
        return item
      }
    })

    setLineColor(newChartColor)
    setAvgColor(newAvgColor)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [line])

  return (
    <BoxWrapper colSpan={0}>
      <BoxTitle
        name="Unique Visitors"
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
        name="uniqueVisitors"
        avgData={avgData}
        line={line}
      />
    </BoxWrapper>
  )
}

export default UniqueVisitors
