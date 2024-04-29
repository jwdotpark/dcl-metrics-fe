import { Box, Center, Text, useColorModeValue } from "@chakra-ui/react"
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
} from "recharts"
import { indexChartMargin } from "../../../../../lib/data/constant"
import ToolTip from "../../../../layout/local/ToolTip"
import { useChartZoom } from "../chart/useChartZoom"

export const TimeSpentHistogram = ({ data }) => {
  const AxisFontColor = useColorModeValue("#000", "#fff")

  const { chartState, handleMouseDown, handleMouseMove, handleMouseUp } =
    useChartZoom(data)

  return (
    <Box w="100%" h="100%">
      <ToolTip label="This chart shows the number of users and the time that user stayed in the scene">
        <Box
          h="435px"
          mt={[2, 2, 6, 0]}
          pt="4"
          pr="4"
          bg={useColorModeValue("white", "gray.700")}
          border="1px solid"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          borderRadius="xl"
          shadow="md"
        >
          <Box pos="relative" w="100%" h={380} mt="4">
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
                <XAxis
                  dataKey="time"
                  fontSize="10px"
                  style={{
                    fontWeight: "medium",
                  }}
                  tick={{ fill: AxisFontColor }}
                  tickFormatter={(tick) => {
                    return tick + "h"
                  }}
                />
                <YAxis
                  dataKey="users"
                  fontSize="10px"
                  style={{
                    fontWeight: "medium",
                  }}
                  tick={{ fill: AxisFontColor }}
                />
                <Area
                  animationDuration={150}
                  type="basis"
                  dataKey="users"
                  stroke="#50967b"
                  strokeWidth="2px"
                  fill="#50967b80"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Box>
          <Center mt="-2">
            <Text fontSize="xs" fontWeight="medium">
              Time spent in hours
            </Text>
          </Center>
        </Box>
      </ToolTip>
    </Box>
  )
}
