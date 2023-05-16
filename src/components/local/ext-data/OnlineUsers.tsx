// @ts-nocheck
import { Box, Center, Spinner } from "@chakra-ui/react"
import BoxWrapper from "../../layout/local/BoxWrapper"
import BoxTitle from "../../layout/local/BoxTitle"
import LineChart from "../../../lib/LineChart"
import { useState, useEffect } from "react"
import {
  sliceData,
  sliceDateRange,
  chartHeight,
  findFalse,
} from "../../../lib/data/chartInfo"
import moment from "moment"
import BottomLegend from "./partial/BottomLegend"

const OnlineUsers = () => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const chartData = []
  const color = ["#9ccfd8"]

  const [avgData, setAvgData] = useState([])
  const dataArr = (data.result && data.result.data.result[0].values) || []
  const dateRange = dataArr.length - 1

  // eslint-disable-next-line no-unused-vars
  const [lineColor, setLineColor] = useState(color)
  const [avgColor, setAvgColor] = useState(color)

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
  const dateString =
    partial.length > 0 && sliceDateRange(partial, dateRange).date

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

  result.map((item, i) => {
    item.color = color[i]
  })

  const lineVisibility = result.map(() => {
    return true
  })

  // eslint-disable-next-line no-unused-vars
  const [line, setLine] = useState(lineVisibility)

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
    setAvgData(calculateAverages(partial))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

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

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <BoxWrapper colSpan={3}>
      <Box data-testid="onlineUsers">
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
              <LineChart
                data={result}
                color={color}
                name="onlineUsers"
                avgData={avgData}
                avgColor={avgColor}
                line={line}
              />
              <BottomLegend
                description="UTC, source from"
                link="https://status.decentraland.org/metrics"
              />
            </>
          ) : (
            <Center h={chartHeight}>
              <Spinner />
            </Center>
          )}
        </Box>
      </Box>
    </BoxWrapper>
  )
}

export default OnlineUsers
