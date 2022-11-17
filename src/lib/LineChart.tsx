/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import { ResponsiveLine } from "@nivo/line"
import { Box, useColorModeValue, useColorMode } from "@chakra-ui/react"
import { useState, useEffect, useMemo } from "react"
import TooltipTable from "../components/local/stats/partials/TableTooltip"
import moment from "moment"

const LineChart = ({ data, color }) => {
  const min = Math.min(...data[0].data.map((item) => item.y))
  const dateRange = data[0].data.length

  const avg = useMemo(() => {
    const sum = data[0].data.reduce((acc, item) => acc + item.y, 0)
    return Math.floor(sum / data[0].data.length)
  }, [data])

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
      return 90
    } else {
      return 0
    }
  }

  return (
    <ResponsiveLine
      data={data}
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
        stacked: true,
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
              {tick.value
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                .replace(/00$/, "k")}
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
      enableArea={true}
      areaBaselineValue={min}
      areaOpacity={0.25}
      markers={[
        {
          axis: "y",
          value: avg,
          lineStyle: {
            stroke: useColorModeValue("#ff5555", "#50fa7b"),
            strokeWidth: 2,
            height: 10,
            strokeDasharray: "8 8",
          },
          legendOrientation: "horizontal",
        },
      ]}
      curve="basis"
      enablePoints={false}
      enableSlices="x"
      sliceTooltip={({ slice }) => {
        return (
          <Box>
            {slice.points.map((point, i) => (
              <Box
                key={i}
                sx={{ backdropFilter: "blur(5px)" }}
                pt="2"
                color={useColorModeValue("black", "white")}
                borderRadius="xl"
                shadow="md"
              >
                <TooltipTable
                  p="2"
                  date={point.data.xFormatted}
                  count={point.data.yFormatted}
                  degraded={point.data.degraded}
                />
              </Box>
            ))}
          </Box>
        )
      }}
    />
  )
}

export default LineChart
