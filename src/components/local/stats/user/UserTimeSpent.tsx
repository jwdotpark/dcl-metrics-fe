import { useColorModeValue, Box, Spinner, Center } from "@chakra-ui/react"
import { format } from "date-fns"
import { useState, useMemo, useEffect } from "react"
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  ReferenceArea,
} from "recharts"
import { plotMissingDataArr } from "../../../../lib/data/chart/chartInfo"
import {
  getEndpoint,
  indexChartMargin,
  isLocal,
} from "../../../../lib/data/constant"
import { convertSeconds } from "../../../../lib/hooks/utils"
import PlainBoxTitle from "../../../layout/local/PlainBoxTitle"
import { HourBasedToolTip } from "../partials/chart/HourBasedToolTip"
import ChartResetBtn from "../partials/chart/ResetBtn"
import { useChartZoom } from "../partials/chart/useChartZoom"
import staticUserTimeSpent from "../../../../../public/data/staticUserTimeSpent.json"

export const UserTimeSpent = ({ address, chartHeight }) => {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const timeSpentUrl = getEndpoint(`users/${address}/activity/time_spent`)

  const chartData = useMemo(() => {
    return data.map((item) => ({
      date: item.date,
      time_spent: item.time_spent,
    }))
  }, [data])

  const fetchData = async () => {
    const url = `/api/server-fetch?url=${timeSpentUrl}&address=${address}&endpoint=${address}/activity/time_spent/`

    if (isLocal) {
      setIsLoading(true)
      setData(plotMissingDataArr(staticUserTimeSpent))
      setIsLoading(false)
    } else {
      try {
        setIsLoading(true)
        const response = await fetch(url)
        const res = await response.json()
        setData(plotMissingDataArr(res.result))
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
  }

  const AxisFontColor = useColorModeValue("#000", "#fff")
  const {
    chartState,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleReset,
  } = useChartZoom(chartData)

  const calculateAvg = () => {
    let sum = 0
    chartData.forEach((item) => {
      sum += item.time_spent
    })
    return Number(Math.floor(sum / chartData.length))
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Box w="100%" mb="-2">
      <PlainBoxTitle name="User Time Spent" description="User Time Spent" />
      {isLoading ? (
        <Center h={chartHeight}>
          <Spinner />
        </Center>
      ) : (
        <Box pos="relative" w="100%" h={chartHeight}>
          <ChartResetBtn handleReset={handleReset} />
          <ResponsiveContainer width="100%" height={chartHeight}>
            <AreaChart
              margin={indexChartMargin}
              data={chartState.data}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => handleMouseUp()}
              syncId="userChart"
            >
              <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
              <Tooltip
                content={
                  <HourBasedToolTip
                    active={undefined}
                    payload={undefined}
                    label={"user time spent"}
                    avg={calculateAvg()}
                  />
                }
              />
              <XAxis
                dataKey="date"
                fontSize="10px"
                style={{
                  fontWeight: "medium",
                }}
                tick={{ fill: AxisFontColor }}
                tickFormatter={(tick) => {
                  const date = new Date(tick)
                  return format(date, "MMM. d")
                }}
              />
              <YAxis
                fontSize="10px"
                style={{
                  fontWeight: "medium",
                }}
                tickFormatter={(tick) => {
                  return convertSeconds(tick)
                }}
                tick={{ fill: AxisFontColor }}
              />
              <YAxis />
              <Area
                animationDuration={150}
                type="linear"
                dataKey="time_spent"
                stroke="#CAB2D6"
                strokeWidth="2px"
                fill="#CAB2D680"
              />
              {chartState.startX !== null && chartState.endX !== null && (
                <ReferenceArea
                  x1={chartState.startX}
                  x2={chartState.endX}
                  stroke="#CAB2D6"
                  strokeOpacity={0.3}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  )
}
