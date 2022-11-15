/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex, Text, Spacer, useColorModeValue } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import LineChart from "../../../../lib/LineChart"
import GridBox from "../../GridBox"
import LineChartDateRange from "../daterange/LineChartDateRange"
import AvgStat from "../partials/AvgStat"

const SceneUserLineChart = ({ data }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("gray.50", "gray.700"),
  }

  const [avgData, setAvgData] = useState(0)
  const [dateRange, setDateRange] = useState<number>(30)

  const userData = data && Object.entries(data)
  const chartData = []
  userData.map((item) => {
    chartData.push({
      date: item[0],
      users: item[1],
    })
  })
  const color = "rgba(80, 150, 123)"

  const slicedData = () => {
    if (chartData.length - dateRange > 0) {
      return chartData.splice(chartData.length - dateRange, chartData.length)
    } else {
      return chartData
    }
  }

  const result = [
    {
      id: "users",
      color: "hsl(90, 70%, 50%)",
      data: slicedData().map((item) => ({
        x: item.date,
        y: item.users,
      })),
    },
  ]

  useEffect(() => {
    const data = slicedData()
    const sum = slicedData().reduce((acc, cur) => acc + cur.users, 0)
    const result = Math.floor(sum / data.length)
    setAvgData(result)
  }, [dateRange])

  return (
    <GridBox box={box}>
      <Box
        border="1px solid"
        borderColor={useColorModeValue("gray.100", "gray.600")}
        borderRadius="xl"
        // shadow="md"
      >
        <Flex pos="relative" mt="4" mx="5">
          <Flex w="100%">
            <Box>
              <Text fontSize="2xl">
                <b>Unique Visitors</b>
              </Text>
            </Box>
            <Spacer />
            <AvgStat avg={avgData} data={chartData} />
          </Flex>
        </Flex>
        <Box ml="6">
          <Text color="gray.500" fontSize="sm">
            Unique vistors per day in the last period
          </Text>
        </Box>
        <LineChartDateRange
          dateRange={dateRange}
          setDateRange={setDateRange}
          validLegnth={90}
          name="scene_users"
        />
        <Box h="300">
          <LineChart data={result} color={color} />
        </Box>
      </Box>
    </GridBox>
  )
}

export default SceneUserLineChart
