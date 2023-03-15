// @ts-nocheck
import { Box, Center, Spinner, Text, useColorModeValue } from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import BoxTitle from "../../layout/local/BoxTitle"
import LineChart from "../../../lib/LineChart"
import { useState, useEffect } from "react"
import { sliceData, date, chartHeight } from "../../../lib/data/chartInfo"
import moment from "moment"
import BottomLegend from "./partial/BottomLegend"

const OnlineUsers = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const chartData = []
  const color = ["#9ccfd8"]

  const [avgData, setAvgData] = useState([])
  const dataArr = (data.result && data.result.data.result[0].values) || []
  const dateRange = useState(dataArr.length - 1)

  if (dataArr !== null) {
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

  const fetchData = async () => {
    setIsLoading(true)

    const url = "https://public-metrics.decentraland.org/onlineUsers30d"
    const res = await fetch(`/api/client-fetch?url=${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    })
    const data = await res.json()
    setData(data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

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
      <Box>
        {!isLoading ? (
          <>
            <LineChart data={result} color={color} name="onlineUsers" />
            <BottomLegend description="UTC, source from status.decentraland.org/metrics" />
          </>
        ) : (
          <Center h={chartHeight}>
            <Spinner />
          </Center>
        )}
      </Box>
    </BoxWrapper>
  )
}

export default OnlineUsers
