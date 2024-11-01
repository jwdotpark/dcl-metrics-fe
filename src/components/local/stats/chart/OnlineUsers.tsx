/* eslint-disable react-hooks/rules-of-hooks */
import {
  Text,
  Box,
  Center,
  GridItem,
  Spinner,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  useColorModeValue,
} from "@chakra-ui/react"
import { format } from "date-fns"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
  ResponsiveContainer,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  Tooltip,
  ReferenceArea,
} from "recharts"
import { chartHeight, indexChartMargin } from "../../../../lib/data/constant"
import BoxWrapper from "../../../layout/local/BoxWrapper"
import PlainBoxTitle from "../../../layout/local/PlainBoxTitle"
import Inspector from "../../../utils/Inspector"
import ChartResetBtn from "../partials/chart/ResetBtn"
import { useChartZoom } from "../partials/chart/useChartZoom"

export const OnlineUsers = () => {
  const AxisFontColor = useColorModeValue("#000", "#fff")
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [avg, setAvg] = useState(0)

  const {
    chartState,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleReset,
  } = useChartZoom(data)

  const mutateArr = (arr) => {
    return arr.map((item) => {
      return {
        date: format(new Date(item[0] * 1000), "yyyy-MM-dd HH:mm"),
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
    setData(mutateArr(dataArr))
    setIsLoading(false)
  }

  const calculateAverage = (dataArray) => {
    const total = dataArray.reduce((acc, item) => acc + item.value, 0)
    return Math.round(total / dataArray.length)
  }

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Box
          p="2"
          fontSize="xs"
          bg={useColorModeValue("whiteAlpha.700", "blackAlpha.600")}
          border="1px"
          borderColor={useColorModeValue("gray.200", "gray.800")}
          borderRadius="xl"
          shadow="md"
        >
          <Center fontSize="md" fontWeight="bold">
            {format(new Date(label), "yyyy MMMM d HH:mm")}
          </Center>
          <Table my="1" size="xs" variant="simple">
            <Thead>
              <Tr>
                <Td>Category</Td>
                <Td>
                  <Box ml="2">Value</Box>
                </Td>
                <Td isNumeric>
                  <Text ml="2">vs. {chartState.data.length} days AVG.</Text>
                </Td>
              </Tr>
            </Thead>
            <Tbody>
              <Td>Online Users</Td>
              <Td isNumeric>{payload[0].value}</Td>
              <Td
                color={payload[0].value - avg > 0 ? "green.500" : "red.500"}
                fontWeight="bold"
                isNumeric
              >
                {payload[0].value - avg}
              </Td>
            </Tbody>
          </Table>
        </Box>
      )
    }

    return null
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setAvg(calculateAverage(chartState.data))
  }, [chartState.data])

  return (
    <Inspector id="Online Users">
      <BoxWrapper colSpan={2}>
        <GridItem w="100%" h="auto" colSpan={[6, 3]}>
          <Box mb="2">
            <PlainBoxTitle
              name="Online Users"
              description="Active daily users, data from Decentraland Status Page"
            />
            {isLoading ? (
              <Center h={chartHeight}>
                <Spinner />
              </Center>
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
                      {chartState.startX !== null &&
                        chartState.endX !== null && (
                          <ReferenceArea
                            x1={chartState.startX}
                            x2={chartState.endX}
                            stroke="#CAB2D6"
                            strokeOpacity={0.3}
                          />
                        )}
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            )}
          </Box>
          <Center mt="-3" mb="1" fontSize="xs">
            UTC, source from
            <Box ml="1" color="blue.500">
              <Link
                href="https://status.decentraland.org/metrics"
                target="_blank"
              >
                https://status.decentraland.org/metrics
              </Link>
            </Box>
          </Center>
        </GridItem>
      </BoxWrapper>
    </Inspector>
  )
}
