// @ts-nocheck
import { useEffect, useState } from "react"
import moment from "moment"
import BoxWrapper from "../../layout/local/BoxWrapper"
import BoxTitle from "../../layout/local/BoxTitle"
import {
  defaultDateRange,
  sliceData,
  dateFormat,
  date,
} from "../../../lib/data/chartInfo"
import LineChartDateRange from "./daterange/LineChartDateRange"
import LineChart from "../../../lib/LineChart"

const UniqueVisitors = ({ data }) => {
  const chartData = []
  const color = ["#48BB78", "#4299E1", "#9F7AEA", "#F56565"]
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [avgData, setAvgData] = useState([])
  const dataArr = Object.entries(data)

  // TODO type this
  dataArr.map((item) => {
    chartData.push({
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

  const mapData = (id, key) => {
    return {
      id,
      data: partial.map((item) => ({
        x: item.date,
        y: item[key],
        degraded: item.degraded,
      })),
    }
  }

  const result = [
    mapData("Unique Users", "unique_users"),
    mapData("New Users", "new_users"),
    mapData("Guest Users", "guest_users"),
    mapData("Named Users", "named_users"),
  ]

  useEffect(() => {
    const validLength = partial.length

    const sum = {
      uniqueUsers: partial.reduce((acc, cur) => acc + cur.unique_users, 0),
      newUsers: partial.reduce((acc, cur) => acc + cur.new_users, 0),
      namedUsers: partial.reduce((acc, cur) => acc + cur.named_users, 0),
      guestUsers: partial.reduce((acc, cur) => acc + cur.guest_users, 0),
    }

    const result = () => {
      const value = {
        unique_users: Math.floor(sum.uniqueUsers / validLength),
        new_users: Math.floor(sum.newUsers / validLength),
        named_users: Math.floor(sum.namedUsers / validLength),
        guest_users: Math.floor(sum.guestUsers / validLength),
      }

      const map = [
        { id: "Unique Users", value: value.unique_users },
        { id: "New Users", value: value.new_users },
        { id: "Guest Users", value: value.guest_users },
        { id: "Named Users", value: value.named_users },
      ].sort((a, b) => {
        return b.value - a.value
      })
      return map
    }

    setAvgData(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  return (
    <BoxWrapper>
      <BoxTitle
        date={dateString}
        avgData={avgData}
        slicedData={partial}
        color={color}
      />
      <LineChartDateRange
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="global_unique_visitors"
      />
      <LineChart data={result} color={color} name="uniqueVisitors" />
    </BoxWrapper>
  )
}

export default UniqueVisitors
