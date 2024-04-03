/* eslint-disable react-hooks/rules-of-hooks */
import {
  Box,
  Center,
  IconButton,
  Table,
  Tbody,
  Td,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react"
import { format } from "date-fns"
import { useState } from "react"
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
import { indexChartMargin } from "../../../lib/data/constant"
import BoxWrapper from "../../layout/local/BoxWrapper"
import PlainBoxTitle from "../../layout/local/PlainBoxTitle"
import ToolTip from "../../layout/local/ToolTip"
import { useChartZoom } from "./partials/chart/useChartZoom"

const GlobalChart = ({ chartData }) => {
  const AxisFontColor = useColorModeValue("#000", "#fff")
  const {
    chartState,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleReset,
  } = useChartZoom(chartData)

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          p="2"
          fontSize="xs"
          bg={useColorModeValue("whiteAlpha.700", "blackAlpha.600")}
          border="1px"
          borderColor={useColorModeValue("gray.200", "gray.600")}
          borderRadius="xl"
          shadow="md"
        >
          <Center mb="2" fontWeight="bold">
            {format(new Date(label), "yyyy MMMM d")}
          </Center>
          <Table size="xs" variant="simple">
            <Tbody>
              <Tr>
                <Td>Unique Users</Td>
                <Td isNumeric>
                  <Box mx="2" color="#48BB78" fontWeight="bold">
                    {payload[0].value}
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>Guest Users</Td>
                <Td isNumeric>
                  <Box mx="2" color="#9F7AEA" fontWeight="bold">
                    {payload[1].value}
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>New Users</Td>
                <Td isNumeric>
                  <Box mx="2" color="#4299E1" fontWeight="bold">
                    {payload[2].value}
                  </Box>
                </Td>
              </Tr>
              <Tr>
                <Td>Name Users</Td>
                <Td isNumeric>
                  <Box mx="2" color="#F56565" fontWeight="bold">
                    {payload[3].value}
                  </Box>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      )
    }
  }

  return (
    <BoxWrapper colSpan={0}>
      <PlainBoxTitle name="Unique Visitors" description="description" />
      <Box>
        <Box pos="relative" w="100%" h="300px" mt="4" mb="4">
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
              width={500}
              data={chartState.data}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
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
                type="monotone"
                dataKey="unique_users"
                stroke="#48BB78"
                strokeWidth="2px"
                fill="#48BB7880"
              />
              <Area
                type="monotone"
                dataKey="guest_users"
                stroke="#9F7AEA"
                strokeWidth="2px"
                fill="#9F7AEA80"
              />
              <Area
                type="monotone"
                dataKey="new_users"
                strokeWidth="2px"
                stroke="#4299E1"
                fill="#4299E180"
              />
              <Area
                type="monotone"
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
                  return format(date, "M/d")
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </BoxWrapper>
  )
}

export default GlobalChart
