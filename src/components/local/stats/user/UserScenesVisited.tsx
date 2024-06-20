/* eslint-disable react-hooks/exhaustive-deps */
import staticUserScenesVisited from "../../../../../public/data/staticUserScenesVisited.json"
import { useState, useEffect, useMemo, useCallback } from "react"
import {
  isLocal,
  getEndpoint,
  indexChartMargin,
} from "../../../../lib/data/constant"
import { Box, useColorModeValue } from "@chakra-ui/react"
import PlainBoxTitle from "../../../layout/local/PlainBoxTitle"
import { format } from "date-fns"
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  ReferenceArea,
  Brush,
} from "recharts"
import ChartResetBtn from "../partials/chart/ResetBtn"
import { useChartZoom } from "../partials/chart/useChartZoom"
import { CustomTooltip } from "../partials/chart/CustomChartToolTip"

const UserScenesVisited = ({ address }) => {
  const [data, setData] = useState([])

  const AxisFontColor = useColorModeValue("#000", "#fff")
  const chartHeight = 150

  const scenesVisitedUrl = getEndpoint(
    `users/${address}/activity/scenes_visited`
  )

  const chartData = useMemo(() => {
    return data.map((item) => ({
      date: item.date,
      count: item.count,
    }))
  }, [data])

  const plotMissingDataArr = useCallback((data) => {
    const minDate = new Date(Math.min(...data.map((d) => new Date(d.date))))
    const maxDate = new Date(Math.max(...data.map((d) => new Date(d.date))))
    const dateRange = []
    for (let d = minDate; d <= maxDate; d.setDate(d.getDate() + 1)) {
      dateRange.push(new Date(d))
    }

    const dataByDate = {}
    for (const d of data) {
      dataByDate[d.date] = d
    }

    const plotData = []
    for (const date of dateRange) {
      const dateString = date.toISOString().slice(0, 10)
      const count = dataByDate[dateString]?.count ?? 0
      plotData.push({ date: dateString, count })
    }

    return plotData
  }, [])

  const fetchData = useCallback(async () => {
    let url = `/api/server-fetch?url=${scenesVisitedUrl}&address=${address}&endpoint=${address}/activity/scenes_visited/`

    if (isLocal) {
      setData(plotMissingDataArr(staticUserScenesVisited))
    } else {
      try {
        const response = await fetch(url)
        const res = await response.json()
        setData(plotMissingDataArr(res.result))
      } catch (error) {
        console.log(error)
      } finally {
      }
    }
  }, [scenesVisitedUrl, address, plotMissingDataArr])

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
      sum += item.count
    })
    const avg = Math.floor(sum / chartData.length)
    return Math.max(1, avg)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <Box mb="2" w="100%">
      <PlainBoxTitle
        name="User Scenes Visited"
        description="The number of the scene user has visited"
      />
      <Box pos="relative" w="100%" h={chartHeight} mt="4" mb="2">
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
                <CustomTooltip
                  active={undefined}
                  payload={undefined}
                  label={undefined}
                  avg={calculateAvg()}
                  data={chartState.data}
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
              tick={{ fill: AxisFontColor }}
            />
            <YAxis />
            <Area
              animationDuration={150}
              type="linear"
              dataKey="count"
              stroke="#FFB86C"
              strokeWidth="2px"
              fill="#FFB86C80"
            />
            {chartState.startX !== null && chartState.endX !== null && (
              <ReferenceArea
                x1={chartState.startX}
                x2={chartState.endX}
                stroke="#CAB2D6"
                strokeOpacity={0.3}
              />
            )}
            <Brush
              dataKey="date"
              height={20}
              travellerWidth={15}
              stroke={useColorModeValue("#718096", "#EDF2F7")}
              fill={useColorModeValue("#EDF2F7", "#4A5568")}
              fillOpacity={0.5}
              tickFormatter={(tick) => {
                const date = new Date(tick)
                return format(date, "MMMM d")
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}

export default UserScenesVisited
