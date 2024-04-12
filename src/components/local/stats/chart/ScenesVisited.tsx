import { Box, GridItem, useColorModeValue } from "@chakra-ui/react"
import { format } from "date-fns"
import { useEffect } from "react"
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  ReferenceArea,
  Tooltip,
  ReferenceLine,
} from "recharts"
import { calculateAvg } from "../../../../lib/data/chart/chartHelper"
import { chartHeight, indexChartMargin } from "../../../../lib/data/constant"
import PlainBoxTitle from "../../../layout/local/PlainBoxTitle"
import { CustomTooltip } from "../partials/chart/CustomChartToolTip"
import ChartResetBtn from "../partials/chart/ResetBtn"
import { useChartZoom } from "../partials/chart/useChartZoom"

const ScenesVisited = ({ chartData, avg, setAvg }) => {
  const AxisFontColor = useColorModeValue("#000", "#fff")
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

  console.log(avg)

  return (
    <GridItem w="100%" h="auto" colSpan={[6, 3]}>
      <Box mb="2">
        <PlainBoxTitle
          name="Active Scenes"
          description="Scenes that had any activity for at least one minute"
        />
        <Box>
          <Box pos="relative" w="100%" h={chartHeight} mt="4" mb="2">
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
                  tick={{ fill: AxisFontColor }}
                  tickFormatter={(tick) => {
                    const date = new Date(tick)
                    return format(date, "MM/dd")
                  }}
                />
                <YAxis
                  dataKey="active_scenes"
                  fontSize="10px"
                  style={{
                    fontWeight: "medium",
                  }}
                  tick={{ fill: AxisFontColor }}
                />
                <Area
                  animationDuration={150}
                  type="linear"
                  dataKey="active_scenes"
                  stroke="#FFB86C"
                  strokeWidth="2px"
                  fill="#FFB86C80"
                />
                <ReferenceLine
                  x="2022-07-31"
                  label={{
                    position: "center",
                    value: "Data Collection Starting Point",
                    fill: "#000",
                    fontSize: 12,
                  }}
                  stroke="#E53E3E"
                  strokeWidth="1"
                  position="start"
                  strokeDasharray="4 4"
                />
                <ReferenceLine
                  y={avg.avgActiveScenes}
                  label={{
                    position: "insideBottomRight",
                    value: `AVG. ${avg.avgActiveScenes}`,
                    fill: "#000",
                    fontSize: 12,
                  }}
                  stroke="#FFB86C"
                  strokeWidth="1"
                  position="start"
                  strokeDasharray="4 4"
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
        </Box>
      </Box>
    </GridItem>
  )
}

export default ScenesVisited
