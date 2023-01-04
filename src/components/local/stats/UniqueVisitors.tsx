// @ts-nocheck
import {
  Flex,
  Text,
  Box,
  GridItem,
  Center,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import moment from "moment"
import BoxWrapper from "../../layout/local/BoxWrapper"
import BoxTitle from "../../layout/local/BoxTitle"
import LineChartDateRange from "./daterange/LineChartDateRange"
import LineChart from "../../../lib/LineChart"

const UniqueVisitors = ({ data }) => {
  const chartData = []
  const color = ["#48BB78", "#4299E1", "#9F7AEA", "#F56565"]
  const [dateRange, setDateRange] = useState(30)
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

  const slicedData = () => {
    if (chartData.length - dateRange > 0) {
      return chartData.slice(chartData.length - dateRange, chartData.length)
    } else {
      return chartData
    }
  }

  const date = {
    first: moment(slicedData()[0].date).format("MMM. D"),
    last: moment(slicedData()[slicedData().length - 1].date).format("MMM. D"),
  }

  useEffect(() => {
    const validLength = slicedData().length

    const sum = {
      uniqueUsers: slicedData().reduce((acc, cur) => acc + cur.unique_users, 0),
      newUsers: slicedData().reduce((acc, cur) => acc + cur.new_users, 0),
      namedUsers: slicedData().reduce((acc, cur) => acc + cur.named_users, 0),
      guestUsers: slicedData().reduce((acc, cur) => acc + cur.guest_users, 0),
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
      ]
      map.sort((a, b) => {
        return b.value - a.value
      })
      return map
    }

    setAvgData(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  const result = [
    {
      id: "Unique Users",
      data: slicedData().map((item) => ({
        x: item.date,
        y: item.unique_users,
        degraded: item.degraded,
      })),
    },
    {
      id: "New Users",
      data: slicedData().map((item) => ({
        x: item.date,
        y: item.new_users,
        degraded: item.degraded,
      })),
    },
    {
      id: "Guest Users",
      data: slicedData().map((item) => ({
        x: item.date,
        y: item.guest_users,
        degraded: item.degraded,
      })),
    },
    {
      id: "Named Users",
      data: slicedData().map((item) => ({
        x: item.date,
        y: item.named_users,
        degraded: item.degraded,
      })),
    },
  ]

  const LineChartComponent = ({ box }) => {
    //const result = [
    //  {
    //    id: "Unique Users",
    //    data: slicedData().map((item) => ({
    //      x: item.date,
    //      y: item.unique_users,
    //      degraded: item.degraded,
    //    })),
    //  },
    //  {
    //    id: "New Users",
    //    data: slicedData().map((item) => ({
    //      x: item.date,
    //      y: item.new_users,
    //      degraded: item.degraded,
    //    })),
    //  },
    //  {
    //    id: "Guest Users",
    //    data: slicedData().map((item) => ({
    //      x: item.date,
    //      y: item.guest_users,
    //      degraded: item.degraded,
    //    })),
    //  },
    //  {
    //    id: "Named Users",
    //    data: slicedData().map((item) => ({
    //      x: item.date,
    //      y: item.named_users,
    //      degraded: item.degraded,
    //    })),
    //  },
    //]
    return (
      <Box h="350">
        <LineChart data={result} color={color} name="uniqueVisitors" />
      </Box>
    )
  }

  return (
    <BoxWrapper>
      <BoxTitle
        date={date}
        avgData={avgData}
        slicedData={slicedData()}
        color={color}
      />
      <LineChartDateRange
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="global_unique_visitors"
      />
      {/*<LineChartComponent box={box} />*/}
      <LineChart data={result} color={color} name="uniqueVisitors" />
    </BoxWrapper>
  )
}

export default UniqueVisitors
