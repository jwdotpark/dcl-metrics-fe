import { Box, useColorModeValue } from "@chakra-ui/react"
import { format } from "date-fns"
import { useEffect } from "react"
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  //Tooltip,
  XAxis,
  YAxis,
  Area,
  ReferenceArea,
  Brush,
  Legend,
  ReferenceLine,
} from "recharts"
import { calculateAvg } from "../../../../lib/data/chart/chartHelper"
// eslint-disable-next-line no-unused-vars
import { chartHeight, indexChartMargin } from "../../../../lib/data/constant"
import PlainBoxTitle from "../../../layout/local/PlainBoxTitle"
//import { CustomTooltip } from "../partials/chart/CustomChartToolTip"
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
      <Box pos="relative" w="100%" h={400} mb="4">
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
            {/*<Tooltip
              content={
                <CustomTooltip
                  active={undefined}
                  payload={undefined}
                  label={undefined}
                  avg={avg}
                  data={chartState.data}
                />
              }
            />*/}
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
            <Legend
              verticalAlign="top"
              align="center"
              wrapperStyle={{
                fontSize: "11px",
                fontWeight: "medium",
              }}
              payload={[
                {
                  value: "Unique Users",
                  type: "line",
                  color: "#48BB78",
                },
                {
                  value: "Guest Users",
                  type: "line",
                  color: "#9F7AEA",
                },
                {
                  value: "New Users",
                  type: "line",
                  color: "#4299E1",
                },
                {
                  value: "Named Users",
                  type: "line",
                  color: "#F56565",
                },
              ]}
            />
            <Area
              animationDuration={150}
              type="linear"
              dataKey="named_users"
              strokeWidth="2px"
              stroke="#F56565"
              fill="#F5656580"
            />
            <ReferenceLine
              y={avg.avgUniqueUsers}
              label={{
                position: "insideBottomRight",
                value: `Unique User AVG. ${avg.avgUniqueUsers}`,
                fontSize: 10,
                fill: useColorModeValue("#000", "#fff"),
              }}
              stroke="#48BB78"
              strokeWidth="1"
              position="start"
              strokeDasharray="4 4"
            />
            <ReferenceLine
              y={avg.avgGuestUsers}
              label={{
                position: "insideBottomRight",
                value: `Guest User AVG. ${avg.avgGuestUsers}`,
                fontSize: 10,
                fill: useColorModeValue("#000", "#fff"),
              }}
              stroke="#9F7AEA"
              strokeWidth="1"
              position="start"
              strokeDasharray="4 4"
            />
            <ReferenceLine
              y={avg.avgNewUsers}
              label={{
                position: "insideBottomRight",
                value: `New User AVG. ${avg.avgNewUsers}`,
                fontSize: 10,
                fill: useColorModeValue("#000", "#fff"),
              }}
              stroke="#4299E1"
              strokeWidth="1"
              position="start"
              strokeDasharray="4 4"
            />
            <ReferenceLine
              y={avg.avgNamedUsers}
              label={{
                position: "insideBottomRight",
                value: `Named User AVG. ${avg.avgNamedUsers}`,
                fontSize: 10,
                fill: useColorModeValue("#000", "#fff"),
              }}
              stroke="#F56565"
              strokeWidth="1"
              position="start"
              strokeDasharray="4 4"
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
