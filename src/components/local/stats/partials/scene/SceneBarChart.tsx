/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  useColorModeValue,
  useBreakpointValue,
  Tooltip,
} from "@chakra-ui/react"
import { ResponsiveBar } from "@nivo/bar"
import { SceneColor } from "../../../../../lib/hooks/utils"
import TooltipTable from "../TableTooltip"
import ToolTip from "../../../../layout/local/ToolTip"

const SceneBarChart = ({ visitors_by_hour_histogram, selectedScene }) => {
  const chartData = Object.keys(visitors_by_hour_histogram).map((key) => {
    return {
      hour: key,
      count: visitors_by_hour_histogram[key],
    }
  })

  const color = SceneColor[selectedScene]
  const opacity = 0.5
  const colorOpacity = color.substring(0, color.length - 1) + `, ${opacity})`

  const isMobile = useBreakpointValue({
    base: true,
    sm: true,
    md: true,
    lg: true,
  })

  chartData.sort((a, b) => {
    // @ts-ignore
    return a.hour - b.hour
  })

  return (
    <ToolTip label="This chart shows the number of users that is presented in each hour of the day">
      <Box
        w="100%"
        h="520px"
        mt={[2, 2, 2, 0]}
        bg={useColorModeValue("white", "gray.700")}
        border="1px solid"
        borderColor={useColorModeValue("gray.200", "gray.700")}
        borderRadius="xl"
        shadow="md"
      >
        <ResponsiveBar
          data={chartData}
          keys={["count"]}
          indexBy="hour"
          margin={{
            top: 30,
            right: 10,
            bottom: 70,
            left: 45,
          }}
          borderWidth={2}
          padding={isMobile ? 0.4 : 0.2}
          valueScale={{ type: "linear" }}
          indexScale={{ type: "band", round: true }}
          colors={colorOpacity}
          theme={{
            textColor: useColorModeValue("black", "white"),
            fontSize: 12,
            grid: {
              line: {
                stroke: "gray",
                opacity: 0.2,
                strokeDasharray: "1 1",
              },
            },
          }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 1,
            tickRotation: 90,
            legend: "UTC",
            legendPosition: "middle",
            legendOffset: isMobile ? 50 : 40,
            format: (value) => value + ":00",
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 0,
            tickRotation: 0,
            legend: "Number of Users",
            legendPosition: "end",
            legendOffset: 10,
            renderTick: (tick) => {
              return (
                <text
                  x={tick.x - 20}
                  y={tick.y + 4}
                  fontSize="11px"
                  fill={useColorModeValue("black", "white")}
                >
                  {tick.value.toFixed(0)}
                </text>
              )
            },
          }}
          labelSkipWidth={10}
          labelSkipHeight={10}
          labelTextColor={useColorModeValue("#000", "#fff")}
          role="application"
          ariaLabel="scene bar chart"
          barAriaLabel={function (e) {
            return (
              e.id + ": " + e.formattedValue + " in country: " + e.indexValue
            )
          }}
          tooltip={(e) => {
            return (
              <Box
                sx={{ backdropFilter: "blur(5px)" }}
                pt="2"
                color={useColorModeValue("black", "white")}
                borderRadius="xl"
                shadow="md"
              >
                {/* <TooltipTable
                  bar={true}
                  date={e.indexValue}
                  count={e.value}
                  degraded={false}
                /> */}
              </Box>
            )
          }}
        />
      </Box>
    </ToolTip>
  )
}

export default SceneBarChart
