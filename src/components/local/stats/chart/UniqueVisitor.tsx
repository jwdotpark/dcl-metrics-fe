import { Box, useColorModeValue } from "@chakra-ui/react"
import { format } from "date-fns"
import { useEffect } from "react"
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  ReferenceArea,
  Brush,
  Legend,
} from "recharts"
import { calculateAvg } from "../../../../lib/data/chart/chartHelper"
import { chartHeight, indexChartMargin } from "../../../../lib/data/constant"
import PlainBoxTitle from "../../../layout/local/PlainBoxTitle"
import { CustomTooltip } from "../partials/chart/CustomChartToolTip"
import ChartResetBtn from "../partials/chart/ResetBtn"
import { useChartZoom } from "../partials/chart/useChartZoom"

export const UniqueVisitor = ({ chartData, axisFontColor, avg, setAvg }) => {
  const {
    chartState,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleReset,
  } = useChartZoom(chartData)

  useEffect(() => {
    setAvg(calculateAvg(chartState.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartState.data])

  return (
    <Box>
      <PlainBoxTitle
        name="Unique Visitors"
        description="Users that visited at least once in the given
        24hr period and remained in world for at least one minute"
      />
      <Box pos="relative" w="100%" h={chartHeight} mb="4">
        <ChartResetBtn handleReset={handleReset} />
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            margin={indexChartMargin}
            data={chartState.data}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => handleMouseUp()}
            syncId="anyId"
          >
            <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
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
            <Tooltip
              content={
                <CustomTooltip
                  active={undefined}
                  payload={undefined}
                  label={undefined}
                  avg={avg}
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
              tick={{ fill: axisFontColor }}
              tickFormatter={(tick) => {
                const date = new Date(tick)
                return format(date, "MM/dd")
              }}
            />
            <YAxis
              dataKey="unique_users"
              fontSize="10px"
              style={{
                fontWeight: "medium",
              }}
              tick={{ fill: axisFontColor }}
            />
            <Area
              animationDuration={150}
              type="linear"
              dataKey="unique_users"
              stroke="#48BB78"
              strokeWidth="2px"
              fill="#48BB7880"
            />
            <Area
              animationDuration={150}
              type="linear"
              dataKey="guest_users"
              stroke="#9F7AEA"
              strokeWidth="2px"
              fill="#9F7AEA80"
            />
            <Area
              animationDuration={150}
              type="linear"
              dataKey="new_users"
              strokeWidth="2px"
              stroke="#4299E1"
              fill="#4299E180"
            />
            <Legend verticalAlign="top" align="center" />
            <Area
              animationDuration={150}
              type="linear"
              dataKey="named_users"
              strokeWidth="2px"
              stroke="#F56565"
              fill="#F5656580"
            />

            {chartState.startX !== null && chartState.endX !== null && (
              <ReferenceArea
                x1={chartState.startX}
                x2={chartState.endX}
                stroke="#8884d8"
                strokeOpacity={0.3}
              />
            )}
          </AreaChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  )
}
