// @ts-nocheck
import { ResponsiveLine } from "@nivo/line"
import { useColorModeValue, useColorMode } from "@chakra-ui/react"
import { useState, useEffect, useMemo } from "react"

const LineChart = ({ data, color }) => {
  const min = Math.min(...data[0].data.map((item) => item.y))
  const { colorMode } = useColorMode()

  return (
    <ResponsiveLine
      data={data}
      theme={{
        textColor: useColorModeValue("gray.800", "white"),
        grid: {
          line: {
            stroke: "gray",
            opacity: 0.5,
            strokeDasharray: "1 1",
          },
        },
      }}
      animate={true}
      pointSize={4}
      margin={{ top: 40, right: 45, bottom: 60, left: 55 }}
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
      // enablePointLabel={true}
      axisBottom={{
        orient: "bottom",
        tickSize: 10,
        tickPadding: 15,
        tickRotation: 45,
        format: (value) => value.replace("2022-", ""),
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
              fontSize="12px"
              fill={colorMode === "light" ? "gray.800" : "white"}
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
      pointBorderWidth={6}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      tooltip={(point) => {
        return (
          <div
            style={{
              boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.1)",
              padding: ".3rem",
              border: "1px solid #A0AEC0",
              borderRadius: "5px",
              // eslint-disable-next-line
              background: useColorModeValue("white", "#4A5568"),
              // eslint-disable-next-line
              color: useColorModeValue("#4A5568", "white"),
            }}
          >
            <div>
              {point.point.data.x + ", " + point.point.data.yStacked} counts
            </div>
          </div>
        )
      }}
      colors={color}
      enableArea={true}
      areaBaselineValue={min}
      areaOpacity={0.5}
    />
  )
}

export default LineChart
