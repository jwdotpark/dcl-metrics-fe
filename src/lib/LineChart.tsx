import { ResponsiveLine } from "@nivo/line"
import { Text, Box, Center, useColorModeValue } from "@chakra-ui/react"
import { useState, useEffect, useMemo } from "react"
import TooltipTable from "../components/local/stats/partials/TableTooltip"
import { lineChartAtom } from "../lib/state/lineChartState"
import { useAtom } from "jotai"
import { convertSeconds } from "./hooks/utils"

const LineChart = ({
  data,
  color,
  avgColor,
  name,
  rentalData,
  avgData,
  line,
}) => {
  const [localData, setLocalData] = useState([])
  const dataName = data[0]?.id

  const [chartProps, setChartProps] = useAtom(lineChartAtom)

  const min = useMemo(() => {
    const lastData = data[data.length - 1].data
    const lastDataY = lastData.map((item) => item.y)
    const res = Math.min(...lastDataY)

    return res
  }, [data])

  const dateRange = data[0].data.length

  const CustomLayer = (props) => {
    const { innerWidth, innerHeight } = props
    return (
      <>
        {rentalData &&
          rentalData.data.map((item, i) => (
            <g key={item.date}>
              <rect
                x={i * Math.min(innerWidth / dateRange)}
                y={innerHeight - item.y * 10}
                ry={2}
                width={dateRange > 30 ? 5 : 10}
                height={item.y * 10}
                fill="#9F7AEA90"
                stroke="#9F7AEA"
              />
            </g>
          ))}
      </>
    )
  }

  const dateRangeLabelNumber = () => {
    if (dateRange > 180) {
      return 30
    } else if (dateRange > 90) {
      return 15
    } else if (dateRange > 30) {
      return 5
    } else if (dateRange > 10) {
      return 3
    } else {
      return ""
    }
  }

  const markerData =
    avgData !== typeof Number &&
    avgData
      .map((item, i) => {
        return {
          axis: "y",
          value: item.value,
          lineStyle: {
            stroke: avgColor[i],
            strokeWidth: 2,
            strokeDasharray: "4 4",
          },
          legendOffsetY: 10,
          legendOffsetX: 5,
          legendOrientation: "horizontal",
          textStyle: {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            fill: useColorModeValue("black", "white"),
            fontSize: 12,
            stroke: "#000",
            strokeWidth: 0.15,
            fontWeight: 500,
          },
        }
      })
      .filter((item, i) => {
        return line[i]
      })

  // TODO set for 7/14/30d
  const setTickValues = () => {
    if (dataName === "Online Users") {
      return "every day"
    } else if (dataName === "User Time Spent") {
      return "every 15 day"
    } else {
      return `every ${dateRangeLabelNumber()} day`
    }
  }

  const setMarginLeft = () => {
    if (dataName === "User Time Spent") {
      return 100
    } else {
      return 70
    }
  }

  useEffect(() => {
    setLocalData(data)
  }, [data])

  return (
    <Box pos="relative" h={chartProps.height}>
      {/* @ts-ignore */}
      <ResponsiveLine
        data={localData}
        theme={{
          textColor: useColorModeValue("black", "white"),
          fontSize: 11,
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
          "crosshair",
          "legends",
        ]}
        animate={true}
        margin={{
          top: 20,
          right: rentalData ? 50 : 25,
          bottom: 50,
          left: setMarginLeft(),
        }}
        xScale={{
          type: "time",
          format: dataName === "Online Users" ? "%Y-%m-%d %H:%M" : "%Y-%m-%d",
          useUTC: false,
          precision: dataName === "Online Users" ? "minute" : "day",
        }}
        xFormat={
          dataName === "Online Users" ? "time:%Y-%m-%d %H:%M" : "time:%Y-%m-%d"
        }
        yScale={{
          type: "linear",
          stacked: false,
          reverse: false,
          min: "auto",
          max: "auto",
        }}
        axisTop={null}
        axisLeft={
          dataName === "User Time Spent"
            ? {
                renderTick: (tick) => {
                  return (
                    <text
                      x={tick.x - 70}
                      y={tick.y}
                      // eslint-disable-next-line react-hooks/rules-of-hooks
                      fill={useColorModeValue("#000", "#fff")}
                      fontSize="11px"
                    >
                      {convertSeconds(tick.value)}
                    </text>
                  )
                },
              }
            : {}
        }
        axisRight={
          rentalData && {
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
                  // eslint-disable-next-line react-hooks/rules-of-hooks
                  fill={useColorModeValue("black", "white")}
                >
                  {chartProps.height === 700 && tick.tickIndex * 10}
                  {chartProps.height !== 700 && tick.tickIndex * 4}
                </text>
              )
            },
          }
        }
        axisBottom={{
          tickRotation: 45,
          format: dataName === "Online Users" ? "%b %d" : "%b %d",
          tickValues: setTickValues(),
          legend: "",
          legendOffset: -12,
        }}
        pointColor={{ theme: "background" }}
        pointBorderColor={{ from: "serieColor" }}
        useMesh={true}
        colors={color}
        enableArea={chartProps.toggleArea}
        enableCrosshair={true}
        crosshairType="bottom-left"
        areaBaselineValue={min}
        areaOpacity={0.25}
        // @ts-ignore
        curve={chartProps.curveType}
        enableSlices="x"
        markers={chartProps.toggleMarker && markerData}
        sliceTooltip={({ slice }) => {
          return (
            <Box
              sx={{ backdropFilter: "blur(5px)" }}
              p="2"
              // eslint-disable-next-line react-hooks/rules-of-hooks
              bg={useColorModeValue("whiteAlpha.700", "blackAlpha.500")}
              borderRadius="xl"
              shadow="md"
            >
              <Center mb="1">
                <Text fontSize="sm" fontWeight="bold">
                  {slice.points[0].data.xFormatted}{" "}
                  <Text display="inline-block" fontSize="xs">
                    {/* @ts-ignore */}
                    {slice.points[0].data.degraded && "degraded!"}
                  </Text>
                </Text>
              </Center>
              {slice.points
                .slice(0)
                .reverse()
                // @ts-ignore
                .sort((a, b) => b.data.yFormatted - a.data.yFormatted)
                .map((point, i) => (
                  <Box key={point.serieId}>
                    <TooltipTable
                      name={point.serieId}
                      count={point.data.yFormatted}
                      // @ts-ignore
                      degraded={point.data.degraded}
                      color={point.borderColor}
                      date={undefined}
                      bar={undefined}
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
