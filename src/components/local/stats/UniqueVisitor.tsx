/* eslint-disable react-hooks/rules-of-hooks */
import { Box, IconButton, useColorModeValue } from "@chakra-ui/react"
import { format } from "date-fns"
import { FiRotateCcw } from "react-icons/fi"
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  AreaChart,
  Area,
  Brush,
  ReferenceArea,
} from "recharts"
import { chartHeight, indexChartMargin } from "../../../lib/data/constant"
import BoxWrapper from "../../layout/local/BoxWrapper"
import PlainBoxTitle from "../../layout/local/PlainBoxTitle"
import ToolTip from "../../layout/local/ToolTip"
import { CustomTooltip } from "./partials/chart/CustomCharatToolTip"
import { useChartZoom } from "./partials/chart/useChartZoom"

const UniqueVisitor = ({ chartData }) => {
  const AxisFontColor = useColorModeValue("#000", "#fff")
  const {
    chartState,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleReset,
  } = useChartZoom(chartData)

  return (
    <BoxWrapper colSpan={0}>
      <PlainBoxTitle
        name="Unique Visitors"
        description={`Unique visitors in Decentraland are recognized through their status, which is measured by their recent engagement within the platform.`}
      />
      <Box>
        <Box pos="relative" w="100%" h={chartHeight} mt="4" mb="4">
          <Box pos="absolute" top="" right="4">
            <ToolTip label={`Reset`}>
              <IconButton
                zIndex="banner"
                border="1px solid"
                borderColor={useColorModeValue("gray.200", "gray.600")}
                borderRadius="full"
                shadow="md"
                aria-label={""}
                icon={<FiRotateCcw />}
                onClick={() => handleReset()}
                size="xs"
                type="button"
              />
            </ToolTip>
          </Box>
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
                dataKey="unique_users"
                fontSize="10px"
                style={{
                  fontWeight: "medium",
                }}
                tick={{ fill: AxisFontColor }}
              />
              <Area
                animationDuration={150}
                type="linear"
                dataKey="unique_users"
                stroke="#48BB78"
                strokeWidth="2px"
                fill="#48BB7880"
              />
              <Area
                animationDuration={150}
                type="linear"
                dataKey="guest_users"
                stroke="#9F7AEA"
                strokeWidth="2px"
                fill="#9F7AEA80"
              />
              <Area
                animationDuration={150}
                type="linear"
                dataKey="new_users"
                strokeWidth="2px"
                stroke="#4299E1"
                fill="#4299E180"
              />
              <Area
                animationDuration={150}
                type="linear"
                dataKey="named_users"
                strokeWidth="2px"
                stroke="#F56565"
                fill="#F5656580"
              />
              {chartState.startX !== null && chartState.endX !== null && (
                <ReferenceArea
                  x1={chartState.startX}
                  x2={chartState.endX}
                  stroke="#8884d8"
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
    </BoxWrapper>
  )
}

export default UniqueVisitor
