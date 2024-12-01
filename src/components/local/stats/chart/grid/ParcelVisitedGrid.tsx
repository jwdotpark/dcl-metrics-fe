import { Box, useColorModeValue } from "@chakra-ui/react"
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
  Tooltip,
  ReferenceLine,
} from "recharts"
import { calculateAvg } from "../../../../../lib/data/chart/chartHelper"
import {
  chartFormat,
  labelInterval,
} from "../../../../../lib/data/chart/chartInfo"
import { indexChartMargin } from "../../../../../lib/data/constant"
import { GridItemContainer } from "../../../../layout/global/grid/GridItemContainer"
import { Title } from "../../../../layout/global/grid/Title"
import { CustomTooltip } from "../../partials/chart/CustomChartToolTip"
//import { CustomTooltip } from "../../partials/chart/CustomChartToolTip"
//import ChartResetBtn from "../../partials/chart/ResetBtn"
import { useChartZoom } from "../../partials/chart/useChartZoom"

export const ParcelVisitedGrid = ({ chartData, avg, setAvg }) => {
  const AxisFontColor = useColorModeValue("#000", "#fff")
  const { chartState, handleMouseMove, handleMouseUp, handleReset } =
    useChartZoom(chartData)

  const [tooltipPayload, setTooltipPayload] = useState(null)

  const handleTooltipChange = (payload) => {
    setTooltipPayload(payload)
  }

  useEffect(() => {
    setAvg(calculateAvg(chartState.data))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartState.data])

  return (
    <GridItemContainer>
      <Title
        title="Active Parcel"
        description="Parcels that had any activity for at least one minute."
        payload={tooltipPayload}
      />
      <Box>
        <Box
          pos="relative"
          w="100%"
          h="100%"
          onDoubleClick={() => handleReset()}
        >
          {/*<ChartResetBtn handleReset={handleReset} />*/}
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart
              margin={indexChartMargin}
              data={chartState.data}
              onMouseMove={handleMouseMove}
              onMouseLeave={() => handleMouseUp()}
              //onMouseEnter={}
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
                    onChange={handleTooltipChange}
                  />
                }
              />*/}
              <Tooltip
                content={
                  <CustomTooltip
                    active={undefined}
                    payload={undefined}
                    label={undefined}
                    avg={avg}
                    data={chartState.data}
                    onChange={handleTooltipChange}
                  />
                }
              />
              <XAxis
                dataKey="date"
                fontSize={chartFormat.fontSize}
                style={{
                  fontWeight: "medium",
                }}
                tick={{ fill: AxisFontColor }}
                tickFormatter={(tick) => {
                  const date = new Date(tick)
                  return format(date, "MMM d")
                }}
                interval={labelInterval()}
              />
              <YAxis
                dataKey="active_parcels"
                fontSize={chartFormat.fontSize}
                style={{
                  fontWeight: "medium",
                }}
                tick={{ fill: AxisFontColor }}
              />
              <Area
                animationDuration={150}
                type="linear"
                dataKey="active_parcels"
                stroke="#CAB2D6"
                strokeWidth="2px"
                fill="#CAB2D680"
              />
              <ReferenceLine
                y={avg.avgActiveParcels}
                label={{
                  position: "insideBottomRight",
                  value: `AVG. ${avg.avgActiveParcels}`,
                  fill: useColorModeValue("#000", "#fff"),
                  fontSize: 12,
                }}
                stroke="#CAB2D6"
                strokeWidth="1"
                position="start"
                strokeDasharray="4 4"
              />
              {chartState.startX !== null && chartState.endX !== null && (
                <ReferenceArea
                  x1={chartState.startX}
                  x2={chartState.endX}
                  stroke="#CAB2D6"
                  strokeOpacity={0.5}
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </GridItemContainer>
  )
}
