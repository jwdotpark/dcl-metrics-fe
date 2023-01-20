/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import { ResponsiveLine } from "@nivo/line"
import { Text, Box, Center, useColorModeValue } from "@chakra-ui/react"
import { useState, useEffect, useMemo } from "react"
import TooltipTable from "../components/local/stats/partials/TableTooltip"
import moment from "moment"
import { chartHeight } from "../lib/data/chartInfo"

const LineChart = ({ data, color, name }) => {
  const [localData, setLocalData] = useState([])

  const min = useMemo(() => {
    const lastData = data[data.length - 1].data
    const lastDataY = lastData.map((item) => item.y)
    const res = Math.min(...lastDataY)
    return res
  }, [data])

  const dateRange = data[0].data.length

  const yAxisLabel = (value) => {
    const lastChar = value.toString().slice(-2)
    if (dateRange === 30 && lastChar % 2 !== 0) {
      return ""
    }
    if (dateRange > 30 && (lastChar % 2 !== 0 || lastChar % 3 !== 0)) {
      return ""
    }
    return moment(value).format("MMM. D")
  }

  const yAxisLabelDegree = () => {
    if (data[0].data.length > 7) {
      return 60
    } else {
      return 0
    }
  }

  useEffect(() => {
    setLocalData(data)
  }, [data])

  return (
    <Box h={chartHeight}>
      <ResponsiveLine
        data={localData}
        theme={{
          textColor: useColorModeValue("black", "white"),
          fontSize: 12,
          grid: {
            line: {
              stroke: "gray",
              opacity: 0.25,
              strokeDasharray: "1 1",
            },
          },
        }}
        animate={true}
        pointSize={4}
        margin={{ top: 40, right: 25, bottom: 60, left: 55 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          orient: "bottom",
          tickSize: 5,
          tickPadding: 10,
          tickRotation: yAxisLabelDegree(),
          format: (value) => yAxisLabel(value),
        }}
        axisLeft={{
          orient: "left",
          tickSize: 5,
          tickPadding: 10,
          tickRotation: 0,
          legend: "Visit Count",
          legendOffset: -60,
          legendPosition: "middle",
          renderTick: (tick) => {
            return (
              <text
                x={tick.x - 37}
                y={tick.y + 4}
                fontSize="11px"
                fill={useColorModeValue("black", "white")}
              >
                {tick.value.toFixed(0)}
              </text>
            )
          },
        }}
        pointColor={{ theme: "background" }}
        pointBorderWidth={2}
        pointBorderColor={{ from: "serieColor" }}
        pointLabelYOffset={-12}
        useMesh={true}
        colors={color}
        enableArea={name === "uniqueVisitors" ? true : true}
        areaBaselineValue={min}
        areaOpacity={0.25}
        curve="linear"
        enablePoints={false}
        enableSlices="x"
        sliceTooltip={({ slice }) => {
          return (
            <Box
              sx={{ backdropFilter: "blur(5px)" }}
              p="2"
              color={useColorModeValue("black", "white")}
            >
              <Center mb="1">
                <Text fontSize="sm" fontWeight="bold">
                  {slice.points[0].data.xFormatted}{" "}
                  <Text display="inline-block" fontSize="xs">
                    {slice.points[0].data.degraded && "degraded!"}
                  </Text>
                </Text>
              </Center>
              {slice.points
                .slice(0)
                .reverse()
                .sort((a, b) => b.data.yFormatted - a.data.yFormatted)
                .map((point, i) => (
                  <Box key={point.serieId}>
                    <TooltipTable
                      name={point.serieId}
                      count={point.data.yFormatted}
                      degraded={point.data.degraded}
                      color={point.borderColor}
                    />
                  </Box>
                ))}
            </Box>
          )
        }}
      />
    </Box>
  )
}

export default LineChart
