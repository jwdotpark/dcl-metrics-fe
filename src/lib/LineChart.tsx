/* eslint-disable react-hooks/rules-of-hooks */
// @ts-nocheck
import { ResponsiveLine } from "@nivo/line"
import { Text, Box, Center, useColorModeValue } from "@chakra-ui/react"
import { useState, useEffect, useMemo } from "react"
import TooltipTable from "../components/local/stats/partials/TableTooltip"
import { chartHeight } from "../lib/data/chartInfo"
import AverageBtn from "../components/local/chart-partial/AverageBtn"
import AreaBtn from "../components/local/chart-partial/AreaBtn"
import PointBtn from "../components/local/chart-partial/PointBtn"

const LineChart = ({ data, color, name, rentalData, avgData }) => {
  const dataName = data[0].id
  const [toggleMarker, setToggleMarker] = useState(true)
  const [toggleArea, setToggleArea] = useState(true)
  const [togglePoint, setTogglePoint] = useState(false)
  const [localData, setLocalData] = useState([])

  const min = useMemo(() => {
    const lastData = data[data.length - 1].data
    const lastDataY = lastData.map((item) => item.y)
    const res = Math.min(...lastDataY)

    return res
  }, [data])

  const dateRange = data[0].data.length

  const CustomLayer = (props) => {
    const { innerWidth } = props
    return (
      <>
        {rentalData &&
          rentalData.data.map((item, i) => (
            <g key={item.date}>
              <rect
                x={i * Math.min(innerWidth / dateRange) + 5}
                y={chartHeight - item.y * 10 - 90}
                rx={2}
                ry={2}
                width={dateRange > 30 ? 5 : 10}
                height={item.y * 10}
                fill="#9F7AEA90"
                stroke="#9F7AEA"
              ></rect>
            </g>
          ))}
      </>
    )
  }

  const dateRangeLabelNumber = () => {
    if (dateRange > 30) {
      return 5
    } else if (dateRange > 15) {
      return 3
    } else {
      return ""
    }
  }

  const setColor = () => {
    let colors = ["#48BB78", "#9F7AEA", "#4299E1", "#F56565"]
    if (avgData.length > 1) {
      return colors
    } else {
      return color
    }
  }

  const markerData =
    avgData !== typeof number &&
    avgData.map((item, i) => {
      return {
        axis: "y",
        value: item.value,
        lineStyle: {
          stroke: setColor()[i],
          strokeWidth: 2,
          strokeDasharray: "4 4",
        },
        legend: item.id,
        legendOffsetY: 10,
        legendOffsetX: 5,
        legendOrientation: "horizontal",
        textStyle: {
          fill: "#000",
          fontSize: 12,
          stroke: "#000",
          strokeWidth: 0.15,
          fontWeight: 500,
        },
      }
    })

  useEffect(() => {
    setLocalData(data)
  }, [data])

  return (
    <Box pos="relative" h={chartHeight}>
      {avgData.length > 0 && (
        <Box pos="absolute" zIndex="2" top="2" right="2">
          <AverageBtn
            toggleMarker={toggleMarker}
            setToggleMarker={setToggleMarker}
          />
          <AreaBtn toggleArea={toggleArea} setToggleArea={setToggleArea} />
          <PointBtn togglePoint={togglePoint} setTogglePoint={setTogglePoint} />
        </Box>
      )}

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
          top: 50,
          right: rentalData ? 50 : 25,
          bottom: 50,
          left: 70,
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
          tickRotation: 45,
          format: dataName === "Online Users" ? "%b %d" : "%b %d",
          tickValues:
            dataName === "Online Users"
              ? "every day"
              : `every ${dateRangeLabelNumber()} day`,
          legend: "",
          legendOffset: -12,
        }}
        pointColor={{ theme: "background" }}
        pointBorderColor={{ from: "serieColor" }}
        useMesh={true}
        colors={color}
        enableArea={toggleArea}
        enableCrosshair={true}
        crosshairType="bottom-left"
        areaBaselineValue={min}
        areaOpacity={0.25}
        curve="linear"
        enablePoints={togglePoint}
        enablePointLabel={togglePoint}
        pointLabelSize={12}
        pointLabelYOffset={-4}
        pointBorderWidth={4}
        pointSize={2}
        enableSlices="x"
        markers={toggleMarker && markerData}
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
