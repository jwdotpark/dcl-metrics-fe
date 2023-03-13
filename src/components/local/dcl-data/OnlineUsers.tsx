// @ts-nocheck
import { Box } from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import useSWR from "swr"
import BoxTitle from "../../layout/local/BoxTitle"
import LineChart from "../../../lib/LineChart"
import { useState, useEffect } from "react"
import { defaultDateRange, sliceData, date } from "../../../lib/data/chartInfo"
import moment from "moment"

const OnlineUsers = () => {
  const chartData = []
  const color = ["#48BB78"]
  const [dateRange, setDateRange] = useState(defaultDateRange)
  const [avgData, setAvgData] = useState([])

  const fetcher = (url) => fetch(url).then((r) => r.json())
  const endpoint = "https://public-metrics.decentraland.org/onlineUsers30d"

  const { data, error, isLoading } = useSWR(endpoint, fetcher)

  const dataArr = data && data.data.result[0].values

  if (dataArr !== undefined) {
    dataArr.map((item) => {
      chartData.push({
        id: item[0],
        date: moment.unix(item[0]).format("YYYY-MM-DD HH:mm"),
        degraded: false,
        value: item[1],
      })
    })
  }

  const partial = sliceData(chartData, dateRange)
  //const dateString = date(partial, dateRange).date

  const mapData = (id: string, key: number) => {
    return {
      id: id,
      data: partial.map((item) => ({
        x: item.date,
        y: item.value,
        degraded: item.degraded,
      })),
    }
  }

  const result = [mapData("Online Users", "online_users")]

  const calculateAverages = (partial) => {
    const validLength = partial.length
    const sum = {
      onlineUsers: partial.reduce((acc, cur) => acc + cur.online_users, 0),
    }
    const value = {
      online_users: Math.floor(sum.onlineUsers / validLength),
    }
    const map = [{ id: "Online Users", value: value.online_users }].sort(
      (a, b) => {
        return b.value - a.value
      }
    )
    return map
  }

  useEffect(() => {
    setAvgData(calculateAverages(partial))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <BoxWrapper colSpan={6}>
      <BoxTitle
        name="Online Users"
        date={""}
        avgData={avgData}
        slicedData={{}}
        color={color}
        description={
          "Number of users online, data from status.decentraland.org"
        }
      />
      <Box mb="4">
        <LineChart data={result} color={color} name="onlineUsers" />
      </Box>
    </BoxWrapper>
  )
}

export default OnlineUsers
