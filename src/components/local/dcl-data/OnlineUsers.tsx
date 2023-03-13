// @ts-nocheck
import { Box, Center, Spinner } from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import useSWR from "swr"
import BoxTitle from "../../layout/local/BoxTitle"
import LineChart from "../../../lib/LineChart"
import { useState, useEffect } from "react"
import { defaultDateRange, sliceData, date } from "../../../lib/data/chartInfo"
import moment from "moment"
import { useMemo } from "react"

const OnlineUsers = () => {
  const chartData = []
  const color = ["#9ccfd8"]
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
  const dateString = partial.length > 0 && date(partial, dateRange).date

  const mapData = (id: string) => {
    return {
      id: id,
      data: partial.map((item) => ({
        x: item.date,
        y: Number(item.value).toFixed(0),
        degraded: item.degraded,
      })),
    }
  }

  const result = [mapData("Online Users")]

  const calculateAverages = (partial) => {
    const validLength = partial.length
    const sum = {
      onlineUsers: partial.reduce((acc, cur) => acc + Number(cur.value), 0),
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
  }, [data])

  return (
    <BoxWrapper colSpan={3}>
      <BoxTitle
        name={`Online Users`}
        date={""}
        avgData={avgData}
        slicedData={{}}
        color={color}
        description={`Data from status.decentraland.org from ${dateString.first} - ${dateString.last}`}
      />
      {!isLoading ? (
        <Box mb="4">
          <LineChart data={result} color={color} name="onlineUsers" />
        </Box>
      ) : (
        <Box>
          <Center h="350">
            <Spinner />
          </Center>
        </Box>
      )}
    </BoxWrapper>
  )
}

export default OnlineUsers
