// @ts-nocheck
import { useEffect, useState } from "react"
import moment from "moment"
import BoxWrapper from "../../layout/local/BoxWrapper"
import BoxTitle from "../../layout/local/BoxTitle"
import {
  defaultDateRange,
  sliceData,
  dateFormat,
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

  //const slicedData = () => {
  //  if (chartData.length - dateRange > 0) {
  //    return chartData.slice(chartData.length - dateRange, chartData.length)
  //  } else {
  //    return chartData
  //  }
  //}

  const partial = sliceData(chartData, dateRange)

  const date = {
    first: moment(partial[0].date).format(dateFormat),
    last: moment(partial[partial.length - 1].date).format(dateFormat),
  }

  const result = [
    {
      id: "Unique Users",
      data: partial.map((item) => ({
        x: item.date,
        y: item.unique_users,
        degraded: item.degraded,
      })),
    },
    {
      id: "New Users",
      data: partial.map((item) => ({
        x: item.date,
        y: item.new_users,
        degraded: item.degraded,
      })),
    },
    {
      id: "Guest Users",
      data: partial.map((item) => ({
        x: item.date,
        y: item.guest_users,
        degraded: item.degraded,
      })),
    },
    {
      id: "Named Users",
      data: partial.map((item) => ({
        x: item.date,
        y: item.named_users,
        degraded: item.degraded,
      })),
    },
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
        date={date}
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
