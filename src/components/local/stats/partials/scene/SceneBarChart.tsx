import { Box, Text, Center, useColorModeValue } from "@chakra-ui/react"
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from "recharts"
import { indexChartMargin } from "../../../../../lib/data/constant"
import ToolTip from "../../../../layout/local/ToolTip"
import { useChartZoom } from "../chart/useChartZoom"

const SceneBarChart = ({ visitors_by_hour_histogram }) => {
  const AxisFontColor = useColorModeValue("#000", "#fff")

  const chartData = Object.keys(visitors_by_hour_histogram).map((key) => {
    return {
      hour: key,
      count: visitors_by_hour_histogram[key],
    }
  })

  const { chartState, handleMouseDown, handleMouseMove, handleMouseUp } =
    useChartZoom(chartData)

  return (
    <ToolTip label="This chart shows the number of users that is presented in each hour of the day">
      <Box
        w="100%"
        //h="300px"
        mt={[2, 2, 2, 0]}
        bg={useColorModeValue("white", "gray.700")}
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.600")}
        borderRadius="xl"
        shadow="md"
      >
        <Box pos="relative" w="100%" h={300} mt="4" mb="2" pt="4" pb="4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              margin={indexChartMargin}
              data={chartState.data}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={() => handleMouseUp()}
            >
              <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
              <XAxis
                dataKey="hour"
                fontSize="10px"
                style={{
                  fontWeight: "medium",
                }}
                tick={{ fill: AxisFontColor }}
                tickFormatter={(tick) => {
                  return tick + ":00"
                }}
              />
              <YAxis
                dataKey="count"
                fontSize="10px"
                style={{
                  fontWeight: "medium",
                }}
                tick={{ fill: AxisFontColor }}
              />
              <Bar
                animationDuration={150}
                type="linear"
                dataKey="count"
                stroke="#50967b"
                strokeWidth="2px"
                fill="#50967b80"
              />
            </BarChart>
          </ResponsiveContainer>
          <Center pb="4">
            <Text pb="4" fontSize="xs" fontWeight="medium">
              Hour in UTC
            </Text>
          </Center>
        </Box>
      </Box>
    </ToolTip>
  )
}

export default SceneBarChart
