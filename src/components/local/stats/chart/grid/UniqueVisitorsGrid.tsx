import { Box, useColorModeValue } from "@chakra-ui/react"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  Tooltip,
  XAxis,
  YAxis,
  Area,
  ReferenceArea,
  Legend,
  ReferenceLine,
} from "recharts"
import { calculateAvg } from "../../../../../lib/data/chart/chartHelper"
import {
  chartFormat,
  labelInterval,
} from "../../../../../lib/data/chart/chartInfo"
import { ExtendedTitle } from "../../../../layout/global/grid/ExtendedTitle"
import { GridItemContainer } from "../../../../layout/global/grid/GridItemContainer"
import { CustomTooltip } from "../../partials/chart/CustomChartToolTip"
//import ChartResetBtn from "../../partials/chart/ResetBtn"
import { useChartZoom } from "../../partials/chart/useChartZoom"

export const UniqueVisitorsGrid = ({ chartData, avg, setAvg }) => {
  const axisFontColor = useColorModeValue("#000", "#fff")
  const { chartState, handleMouseMove, handleMouseUp, handleReset } =
    useChartZoom(chartData)

  const [tooltipPayload, setTooltipPayload] = useState(null)

  const handleTooltipChange = (payload) => {
    setTooltipPayload(payload)
  }

  useEffect(() => {
    setAvg(calculateAvg(chartState.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartState.data])
  return (
    <GridItemContainer>
      <Box>
        <ExtendedTitle
          title="Unique Visitors"
          description="Users that visited at least once in the given 24hr period and remained in world for at least one minute."
          payload={tooltipPayload}
        />
        <Box pos="relative" w="100%" h={250} mb="4">
          {/*<Box pos="absolute" zIndex="8" top="4" right="0">
            <ChartResetBtn handleReset={handleReset} />
          </Box>*/}
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              margin={{
                top: 0,
                right: 20,
                left: 0,
                bottom: 0,
              }}
              data={chartState.data}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => handleMouseUp()}
              syncId="anyId"
            >
              <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
              <Tooltip
                content={
                  <CustomTooltip
                    active={undefined}
                    payload={undefined}
                    label={undefined}
                    avg={avg}
                    data={chartState.data}
                    onChange={handleTooltipChange}
                  />
                }
              />
              <XAxis
                dataKey="date"
                fontSize={chartFormat.fontSize}
                style={{
                  fontWeight: "medium",
                }}
                tick={{ fill: axisFontColor }}
                tickFormatter={(tick) => {
                  const date = new Date(tick)
                  return format(date, "MMM d")
                }}
                interval={labelInterval() * 0.75}
              />
              <YAxis
                dataKey="unique_users"
                fontSize={chartFormat.fontSize}
                style={{
                  fontWeight: "medium",
                }}
                tick={{ fill: axisFontColor }}
              />
              <Area
                animationDuration={150}
                type="linear"
                dataKey="unique_users"
                stroke="#14b8a6"
                strokeWidth="2px"
                fill="#14b8a680"
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
                  fontSize: "14px",
                  fontWeight: "medium",
                }}
                payload={[
                  {
                    value: "Unique Users",
                    type: "rect",
                    color: "#14b8a6",
                  },
                  {
                    value: "Guest Users",
                    type: "rect",
                    color: "#9F7AEA",
                  },
                  {
                    value: "New Users",
                    type: "rect",
                    color: "#4299E1",
                  },
                  {
                    value: "Named Users",
                    type: "rect",
                    color: "#eab308",
                  },
                ]}
              />
              <Area
                animationDuration={150}
                type="linear"
                dataKey="named_users"
                strokeWidth="2px"
                stroke="#eab308"
                fill="#eab30880"
              />
              <ReferenceLine
                y={avg.avgUniqueUsers}
                label={{
                  position: "insideBottomLeft",
                  value: `Unique User AVG. ${avg.avgUniqueUsers}`,
                  fontSize: chartFormat.fontSize,
                  fill: useColorModeValue("#000", "#fff"),
                }}
                stroke="#14b8a6"
                strokeWidth="1"
                position="start"
                strokeDasharray="4 2"
              />
              <ReferenceLine
                y={avg.avgGuestUsers}
                label={{
                  position: "insideBottomRight",
                  value: `Guest User AVG. ${avg.avgGuestUsers}`,
                  fontSize: chartFormat.fontSize,
                  fill: useColorModeValue("#000", "#fff"),
                }}
                stroke="#9F7AEA"
                strokeWidth="1"
                position="start"
                strokeDasharray="4 2"
              />
              <ReferenceLine
                y={avg.avgNewUsers}
                label={{
                  position: "insideBottomLeft",
                  value: `New User AVG. ${avg.avgNewUsers}`,
                  fontSize: chartFormat.fontSize,
                  fill: useColorModeValue("#000", "#fff"),
                }}
                stroke="#4299E1"
                strokeWidth="1"
                position="start"
                strokeDasharray="4 2"
              />
              <ReferenceLine
                y={avg.avgNamedUsers}
                label={{
                  position: "insideBottomRight",
                  value: `Named User AVG. ${avg.avgNamedUsers}`,
                  fontSize: chartFormat.fontSize,
                  fill: useColorModeValue("#000", "#fff"),
                }}
                stroke="#eab308"
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
    </GridItemContainer>
  )
}
