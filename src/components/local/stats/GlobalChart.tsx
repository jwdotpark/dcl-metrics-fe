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
import { TitleHolder } from "./partials/world/TitleHolder"

interface DataObjectType {
  active_parcels: number
  active_scenes: number
  users: {
    guest_users: number
    named_users: number
    new_users: number
    unique_users: number
  }
  degraded: boolean
}

interface DataArrayType {
  date: string
  active_parcels: number
  active_scenes: number
  guest_users: number
  named_users: number
  new_users: number
  unique_users: number
  degraded: boolean
}

const GlobalChart = ({ data }) => {
  const AxisFontColor = useColorModeValue("#000", "#fff")

  const flattenObject = (
    temp: Record<string, DataObjectType>
  ): DataArrayType[] => {
    return Object.entries(temp).map(([date, value]) => ({
      date,
      active_parcels: value.active_parcels,
      active_scenes: value.active_scenes,
      guest_users: value.users.guest_users,
      named_users: value.users.named_users,
      new_users: value.users.new_users,
      unique_users: value.users.unique_users,
      degraded: value.degraded,
    }))
  }

  const chartData = flattenObject(data)

  const [chartState, setChartState] = useState({
    startX: null,
    endX: null,
    startY: null,
    endY: null,
    data: chartData,
  })

  const handleMouseDown = (e) => {
    if (e?.activeLabel && e?.activePayload?.length) {
      const x = e?.activeLabel
      const y = e?.activePayload[0]?.value
      setChartState((prevState) => ({
        ...prevState,
        startX: x,
        endX: x,
        startY: y,
        endY: y,
      }))
    }
  }

  const handleMouseMove = (e) => {
    if (chartState.startX !== null) {
      if (e?.activeLabel && e?.activePayload?.length) {
        const x = e?.activeLabel
        const y = e?.activePayload[0]?.value
        setChartState((prevState) => ({ ...prevState, endX: x, endY: y }))
      }
    }
  }

  const handleMouseUp = () => {
    if (
      chartState.startX !== null &&
      chartState.endX !== null &&
      chartState.startY !== null &&
      chartState.endY !== null
    ) {
      const xValues = chartState.data.map((entry) => entry.date)
      const startIndex = xValues.indexOf(chartState.startX)
      const endIndex = xValues.indexOf(chartState.endX)
      if (startIndex < endIndex) {
        const zoomedData = chartState.data.slice(startIndex, endIndex + 1)
        setChartState({
          startX: null,
          endX: null,
          startY: null,
          endY: null,
          data: zoomedData,
        })
      }
    }
  }

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
                onClick={() =>
                  setChartState({
                    startX: null,
                    endX: null,
                    startY: null,
                    endY: null,
                    data: chartData,
                  })
                }
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
                  //y1={chartState.startY}
                  //y2={chartState.endY}
                  stroke="#8884d8"
                  strokeOpacity={0.3}
                />
              )}
              <Brush
                dataKey="date"
                height={30}
                travellerWidth={10}
                stroke={useColorModeValue("#718096", "#EDF2F7")}
                fill={useColorModeValue("#EDF2F7", "#4A5568")}
                fillOpacity={0.5}
                tickFormatter={(tick) => {
                  const date = new Date(tick)
                  return format(date, "MMM dd")
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
