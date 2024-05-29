import { Box, Flex, IconButton, useColorModeValue } from "@chakra-ui/react"
import { format } from "date-fns"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { FiDownload, FiMaximize2 } from "react-icons/fi"
import {
  Area,
  AreaChart,
  Brush,
  CartesianGrid,
  ReferenceArea,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { getEndpoint, indexChartMargin } from "../../../../lib/data/constant"
import PlainBoxTitle from "../../../layout/local/PlainBoxTitle"
import ToolTip from "../../../layout/local/ToolTip"
import { CustomTooltip } from "../partials/chart/CustomChartToolTip"
import ChartResetBtn from "../partials/chart/ResetBtn"
import { useChartZoom } from "../partials/chart/useChartZoom"

export const SceneUserLineChart = ({ data }) => {
  const router = useRouter()
  const AxisFontColor = useColorModeValue("#000", "#fff")
  const [localData, setLocalData] = useState(data)
  const [avg, setAvg] = useState({
    avgUniqueVisitors: 0,
  })

  const {
    chartState,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleReset,
  } = useChartZoom(localData)

  const calculateAvg = (data) => {
    const avgUniqueVisitors = Math.round(
      data.reduce((acc, curr) => acc + curr.visitors, 0) / data.length
    )
    return {
      avgUniqueVisitors,
    }
  }

  const uuid = router.query.uuid

  const fetchFullData = async () => {
    const url = getEndpoint(`scenes/${uuid}/visitor_history?show_all=true`)
    const result = await fetch(`/api/fetch?url=${url}`)
    const data = await result.json()
    setLocalData(data.result)
  }

  const downloadData = async () => {
    try {
      const endpoint = getEndpoint(`scenes/${uuid}/report`)
      const response = await fetch(`/api/fetch-csv?url=${endpoint}`)

      if (!response.ok) {
        throw new Error("Network response was not ok")
      }

      const csvData = await response.text()
      const blob = new Blob([csvData], { type: "text/csv" })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")

      const sceneName = router.query.name as string
      const today = format(new Date(), "yyyy-MM-dd")
      link.href = url
      link.download = `${sceneName}_${today}.csv`
      link.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error downloading the data:", error)
    }
  }

  useEffect(() => {
    setAvg(calculateAvg(chartState.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartState.data])

  return (
    <Flex
      sx={{
        "& > * + *": {
          ml: [0, 0, 0, 4],
          mt: [4, 4, 4, 0],
        },
      }}
      direction={["column", "column", "column", "row"]}
      w="100%"
      h="auto"
      mb="4"
    >
      <Box w="100%" pt="4" px="0">
        <Box
          p="2"
          bg={useColorModeValue("white", "gray.800")}
          border="1px solid"
          borderColor={useColorModeValue("gray.100", "gray.600")}
          borderRadius="xl"
          shadow="md"
        >
          <PlainBoxTitle
            name="Unique Visitors"
            description="The number of unique visitors in the last period"
          />
          <Box pos="relative" w="100%" h={300} mt="4" mb="2">
            <Box pos="absolute" zIndex="banner" top="0" right="14">
              <ToolTip label={`Load full range data`}>
                <IconButton
                  zIndex="auto"
                  border="1px solid"
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                  borderRadius="full"
                  shadow="md"
                  aria-label={""}
                  icon={<FiMaximize2 />}
                  onClick={() => fetchFullData()}
                  size="xs"
                  type="button"
                />
              </ToolTip>
            </Box>
            <Box pos="absolute" zIndex="banner" top="0" right="24">
              <ToolTip label={`Download CSV data`}>
                <IconButton
                  zIndex="auto"
                  border="1px solid"
                  borderColor={useColorModeValue("gray.200", "gray.600")}
                  borderRadius="full"
                  shadow="md"
                  aria-label={""}
                  icon={<FiDownload />}
                  onClick={() => downloadData()}
                  size="xs"
                  type="button"
                />
              </ToolTip>
            </Box>
            <ChartResetBtn handleReset={handleReset} />
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
                <Tooltip
                  content={
                    <CustomTooltip
                      active={undefined}
                      payload={undefined}
                      label={undefined}
                      avg={avg.avgUniqueVisitors}
                      data={chartState.data}
                    />
                  }
                />
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
                  dataKey="visitors"
                  fontSize="10px"
                  style={{
                    fontWeight: "medium",
                  }}
                  tick={{ fill: AxisFontColor }}
                />
                <Area
                  animationDuration={150}
                  type="linear"
                  dataKey="visitors"
                  stroke="#50967b"
                  strokeWidth="2px"
                  fill="#50967b80"
                />
                <ReferenceLine
                  y={avg.avgUniqueVisitors}
                  label={{
                    position: "insideBottomRight",
                    value: `AVG. ${avg.avgUniqueVisitors}`,
                    fill: useColorModeValue("#000", "#fff"),
                    fontSize: 12,
                  }}
                  stroke="#CAB2D6"
                  strokeWidth="1"
                  position="start"
                  strokeDasharray="4 4"
                />
                <Brush
                  dataKey="date"
                  height={20}
                  travellerWidth={15}
                  stroke={useColorModeValue("#718096", "#EDF2F7")}
                  fill={useColorModeValue("#EDF2F7", "#4A5568")}
                  fillOpacity={0.5}
                  tickFormatter={(tick) => {
                    const date = new Date(tick)
                    return format(date, "MMMM d")
                  }}
                />
                {chartState.startX !== null && chartState.endX !== null && (
                  <ReferenceArea
                    x1={chartState.startX}
                    x2={chartState.endX}
                    stroke="#8884d8"
                    strokeOpacity={0.3}
                  />
                )}
              </AreaChart>
            </ResponsiveContainer>
          </Box>
        </Box>
      </Box>
    </Flex>
  )
}
