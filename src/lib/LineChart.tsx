/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import { ResponsiveLine } from "@nivo/line"
import { Text, Box, Center, useColorModeValue } from "@chakra-ui/react"
import { useState, useEffect, useMemo } from "react"
import TooltipTable from "../components/local/stats/partials/TableTooltip"
import moment from "moment"
import { chartHeight } from "../lib/data/chartInfo"

const LineChart = ({ data, color, name, rentalData }) => {
  const [localData, setLocalData] = useState([])

  const min = useMemo(() => {
    const lastData = data[data.length - 1].data
    const lastDataY = lastData.map((item) => item.y)
    const res = Math.min(...lastDataY)

    return res
  }, [data])

  const dateRange = data[0].data.length

  const yAxisLabel = (value) => {
    const lastChar = value.toString().slice(-1)
    if (dateRange === 30 && lastChar % 2 !== 0) {
      return ""
    }
    if (dateRange === 31 && lastChar % 2 !== 0) {
      return ""
    }
    if (
      dateRange > 32 &&
      (lastChar % 2 !== 0 || lastChar % 1 !== 0 || lastChar % 6 !== 0)
    ) {
      return ""
    }
    if (
      dateRange > 90 &&
      (lastChar % 2 !== 0 ||
        lastChar % 3 !== 0 ||
        lastChar % 4 !== 0 ||
        lastChar % 1 !== 0 ||
        lastChar % 5 !== 0 ||
        lastChar % 6 !== 0 ||
        lastChar % 7 !== 0)
    ) {
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

  const CustomLayer = (props) => {
    const { innerWidth, innerHeight, width } = props
    return (
      <>
        {rentalData &&
          rentalData.data.map((item, i) => (
            <g key={item.date}>
              <rect
                x={i * Math.min(innerWidth / dateRange) + 5}
                y={chartHeight - item.y * 10 - 100}
                rx={2}
                ry={2}
                width={dateRange > 30 ? 15 : 20}
                height={item.y * 10}
                fill="#4299E190"
                stroke="#4299E1"
              ></rect>
            </g>
          ))}
      </>
    )
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
        layers={[
          CustomLayer,
          "grid",
          "markers",
          "areas",
          "lines",
          "slices",
          "points",
          "axes",
          "legends",
        ]}
        animate={true}
        pointSize={4}
        margin={{ top: 40, right: rentalData ? 50 : 25, bottom: 60, left: 55 }}
        xScale={{ type: "point" }}
        yScale={{
          type: "linear",
          min: "auto",
          max: "auto",
          stacked: false,
          reverse: false,
        }}
        axisTop={null}
        axisRight={
          rentalData && {
            orient: "left",
            tickSize: 0,
            tickPadding: 0,
            tickRotation: 0,
            legend: "Rentals Count",
            renderTick: (tick) => {
              return (
                <text
                  x={tick.x + 20}
                  y={tick.y + 4}
                  fontSize="11px"
                  fill={useColorModeValue("black", "white")}
                >
                  {tick.tickIndex * 2}
                </text>
              )
            },
          }
        }
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
