import {
  Box,
  Text,
  Center,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
  useColorModeValue,
  Link,
  Spinner,
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
  Tooltip,
  ReferenceLine,
} from "recharts"
import { chartFormat } from "../../../../../lib/data/chart/chartInfo"
import { chartHeight, indexChartMargin } from "../../../../../lib/data/constant"
import { GridItemContainer } from "../../../../layout/global/grid/GridItemContainer"
import { Title } from "../../../../layout/global/grid/Title"
import { useChartZoom } from "../../partials/chart/useChartZoom"

export const OnlineUsersGrid = () => {
  const AxisFontColor = useColorModeValue("#000", "#fff")
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [avg, setAvg] = useState(0)
  const fontColor = useColorModeValue("#000", "#fff")

  const { chartState, handleMouseUp } = useChartZoom(data)

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
    const bg = useColorModeValue("whiteAlpha.700", "blackAlpha.600")
    const borderColor = useColorModeValue("gray.200", "gray.800")
    if (active && payload && payload.length) {
      return (
        <Box
          p="2"
          fontSize="xs"
          bg={bg}
          border="1px"
          borderColor={borderColor}
          borderRadius="xl"
          shadow="md"
          backdropFilter="blur(2px)"
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
              <Tr>
                <Td>Online Users</Td>
                <Td isNumeric>{payload[0].value}</Td>
                <Td
                  color={payload[0].value - avg > 0 ? "green.500" : "red.500"}
                  fontWeight="bold"
                  isNumeric
                >
                  {payload[0].value - avg}
                </Td>
              </Tr>
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
  }, [avg, chartState.data])

  return (
    <GridItemContainer>
      <Box mb="1">
        <Title
          title="Online Users"
          description="Active daily users, data from Decentraland Status Page."
          payload={[]}
        />

        {isLoading ? (
          <Center h={chartHeight}>
            <Spinner />
          </Center>
        ) : (
          <Box mt="-1">
            <Box pos="relative" w="100%" h={chartHeight} mt="4" mb="0">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  margin={indexChartMargin}
                  data={chartState.data}
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
                    fontSize={chartFormat.fontSize}
                    tick={{ fill: AxisFontColor }}
                    tickFormatter={(tick) => {
                      const date = new Date(tick)
                      return format(date, "MMM d")
                    }}
                    angle={-45}
                    tickMargin={10}
                  />
                  <YAxis
                    dataKey="value"
                    fontSize={chartFormat.fontSize}
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
                  <ReferenceLine
                    y={avg}
                    label={{
                      position: "insideBottomLeft",
                      value: `AVG. ${avg}`,
                      fill: fontColor,
                      fontSize: chartFormat.fontSize,
                    }}
                    stroke="#FF5555"
                    strokeWidth="2"
                    position="start"
                    strokeDasharray="1"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </Box>
        )}
      </Box>
      <Center fontSize="xs">
        UTC, source from
        <Box ml="1" color="blue.500">
          <Link href="https://status.decentraland.org/metrics" target="_blank">
            https://status.decentraland.org/metrics
          </Link>
        </Box>
      </Center>
    </GridItemContainer>
  )
}
