/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Center,
  GridItem,
  Tooltip,
  useColorModeValue,
} from "@chakra-ui/react"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  ReferenceArea,
  Brush,
} from "recharts"
import { calculateAvg } from "../../../../lib/data/chart/chartHelper"
import { chartHeight, indexChartMargin } from "../../../../lib/data/constant"
import { SmallBoxTitle } from "../../../layout/local/SmallBoxTitle"
import { CustomTooltip } from "../partials/chart/CustomChartToolTip"
import ChartResetBtn from "../partials/chart/ResetBtn"
import { useChartZoom } from "../partials/chart/useChartZoom"

export const OnlineUsers = () => {
  const AxisFontColor = useColorModeValue("#000", "#fff")
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [avg, setAvg] = useState(0)

  const mutateArr = (arr) => {
    return arr.map((item) => {
      return {
        date: format(new Date(item[0] * 1000), "yyyy-MM-dd"),
        value: parseInt(item[1]),
      }
    })
  }

  const fetchData = async () => {
    setIsLoading(true)
    const url = "https://public-metrics.decentraland.org/onlineUsers30d"
    const res = await fetch(`/api/client-fetch?url=${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        mode: "no-cors",
      },
    })
    const data = await res.json()
    const dataArr = data.result && data.result.data.result[0].values
    setIsLoading(false)
    setData(mutateArr(dataArr))
  }

  const {
    chartState,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleReset,
  } = useChartZoom(data)

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <GridItem w="100%" h="auto" colSpan={[6, 3]}>
      <Box mb="2">
        <SmallBoxTitle name="Online Users" description="description" />
        {isLoading ? (
          <Center h={chartHeight}>Loading...</Center>
        ) : (
          <Box>
            <Box pos="relative" w="100%" h={chartHeight} mt="4" mb="2">
              <ChartResetBtn handleReset={handleReset} />
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  margin={indexChartMargin}
                  data={chartState.data}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={() => handleMouseUp()}
                  syncId="anyId"
                >
                  <CartesianGrid strokeDasharray="4 4" opacity={0.5} />
                  {/*<Tooltip
                    content={
                      <CustomTooltip
                        active={undefined}
                        payload={undefined}
                        label={undefined}
                        avg={avg}
                        data={chartState.data}
                      />
                    }
                  />*/}
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
                    dataKey="value"
                    fontSize="10px"
                    style={{
                      fontWeight: "medium",
                    }}
                    tick={{ fill: AxisFontColor }}
                  />
                  <Area
                    animationDuration={150}
                    type="linear"
                    dataKey="value"
                    stroke="#FF5555"
                    strokeWidth="2px"
                    fill="#FF555580"
                  />
                  {chartState.startX !== null && chartState.endX !== null && (
                    <ReferenceArea
                      x1={chartState.startX}
                      x2={chartState.endX}
                      stroke="#CAB2D6"
                      strokeOpacity={0.3}
                    />
                  )}
                  <Brush
                    dataKey="date"
                    height={20}
                    travellerWidth={5}
                    stroke={useColorModeValue("#718096", "#EDF2F7")}
                    fill={useColorModeValue("#EDF2F7", "#4A5568")}
                    fillOpacity={0.5}
                    tickFormatter={(tick) => {
                      const date = new Date(tick)
                      return format(date, "MMM. d")
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        )}
      </Box>
    </GridItem>
  )
}
