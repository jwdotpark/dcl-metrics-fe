import { Box, Flex, useColorModeValue } from "@chakra-ui/react"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { indexChartMargin } from "../../../../lib/data/constant"
import PlainBoxTitle from "../../../layout/local/PlainBoxTitle"
import { CustomTooltip } from "../partials/chart/CustomChartToolTip"
import ChartResetBtn from "../partials/chart/ResetBtn"
import { useChartZoom } from "../partials/chart/useChartZoom"

export const SceneUserLineChart = ({ data }) => {
  const AxisFontColor = useColorModeValue("#000", "#fff")
  const [avg, setAvg] = useState({
    avgUniqueVisitors: 0,
  })

  const {
    chartState,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleReset,
  } = useChartZoom(data)

  const calculateAvg = (data) => {
    const avgUniqueVisitors = Math.round(
      data.reduce((acc, curr) => acc + curr.visitors, 0) / data.length
    )
    return {
      avgUniqueVisitors,
    }
  }

  useEffect(() => {
    setAvg(calculateAvg(chartState.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartState.data])

  return (
    <Flex
      sx={{
        "& > * + *": {
          ml: [0, 0, 0, 4],
          mt: [4, 4, 4, 0],
        },
      }}
      direction={["column", "column", "column", "row"]}
      w="100%"
      h="auto"
      mb="4"
    >
      <Box w="100%" pt="4" px="0">
        <Box
          p="2"
          bg={useColorModeValue("white", "gray.800")}
          border="1px solid"
          borderColor={useColorModeValue("gray.100", "gray.600")}
          borderRadius="xl"
          shadow="md"
        >
          <PlainBoxTitle
            name="Unique Visitors"
            description="The number of unique visitors in the last period"
          />
          <Box pos="relative" w="100%" h={300} mt="4" mb="2">
            <ChartResetBtn handleReset={handleReset} />
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                margin={indexChartMargin}
                data={chartState.data}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => handleMouseUp()}
              >
                <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
                <Tooltip
                  content={
                    <CustomTooltip
                      active={undefined}
                      payload={undefined}
                      label={undefined}
                      avg={avg.avgUniqueVisitors}
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
                  dataKey="visitors"
                  fontSize="10px"
                  style={{
                    fontWeight: "medium",
                  }}
                  tick={{ fill: AxisFontColor }}
                />
                <Area
                  animationDuration={150}
                  type="linear"
                  dataKey="visitors"
                  stroke="#50967b"
                  strokeWidth="2px"
                  fill="#50967b80"
                />
                <ReferenceLine
                  y={avg.avgUniqueVisitors}
                  label={{
                    position: "insideBottomRight",
                    value: `AVG. ${avg.avgUniqueVisitors}`,
                    fill: useColorModeValue("#000", "#fff"),
                    fontSize: 12,
                  }}
                  stroke="#CAB2D6"
                  strokeWidth="1"
                  position="start"
                  strokeDasharray="4 4"
                />
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
      </Box>
    </Flex>
  )
}
