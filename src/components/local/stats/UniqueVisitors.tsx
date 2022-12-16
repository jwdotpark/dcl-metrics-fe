// @ts-nocheck
import {
  Flex,
  Text,
  Box,
  GridItem,
  Center,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import GridBox from "../GridBox"
import LineChartDateRange from "./daterange/LineChartDateRange"
import AvgStat from "./partials/AvgStat"
import Loading from "../Loading"
import LineChart from "../../../lib/LineChart"

// active_users
const UniqueVisitors = ({ visitorLoading, data }) => {
  const box = {
    h: "auto",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const chartData = []
  const dataArr = Object.entries(data)

  dataArr.map((item) => {
    chartData.push({
      date: item[0],
      degraded: item[1].degraded,
      // unique_users: item[1].unique_users,
      unique_users: item[1].users.unique_users,
      new_users: item[1].users.new_users,
      named_users: item[1].users.named_users,
      guest_users: item[1].users.guest_users,
    })
  })

  const [dateRange, setDateRange] = useState<number>(30)

  const slicedData = () => {
    if (chartData.length - dateRange > 0) {
      return chartData.slice(chartData.length - dateRange, chartData.length)
    } else {
      return chartData
    }
  }

  const [avgData, setAvgData] = useState([])

  useEffect(() => {
    const validLength = slicedData().length
    const sumUniqueUsers = slicedData().reduce(
      (acc, cur) => acc + cur.unique_users,
      0
    )
    const sumNewUsers = slicedData().reduce(
      (acc, cur) => acc + cur.new_users,
      0
    )
    const sumNamedUsers = slicedData().reduce(
      (acc, cur) => acc + cur.named_users,
      0
    )
    const sumGuestUsers = slicedData().reduce(
      (acc, cur) => acc + cur.guest_users,
      0
    )

    const result = () => {
      return [
        { id: "Unique Users", value: Math.floor(sumUniqueUsers / validLength) },
        { id: "New Users", value: Math.floor(sumNewUsers / validLength) },
        { id: "Named Users", value: Math.floor(sumNamedUsers / validLength) },
        { id: "Guest Users", value: Math.floor(sumGuestUsers / validLength) },
      ]
    }
    setAvgData(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  const color = useColorModeValue(
    ["#A6CEE3", "#ff79c6", "#ff5555", "#6272a4"],
    ["#6272a4", "#ff5555", "#ff79c6", "#A6CEE3"]
  )

  const LineChartComponent = ({ box, res }) => {
    // const color = ["#A6CEE3", "#ff79c6", "#ff5555", "#6272a4"]

    const result = [
      {
        id: "Unique Users",
        data: slicedData().map((item) => ({
          x: item.date,
          y: item.unique_users,
          degraded: item.degraded,
        })),
      },
      {
        id: "New Users",
        data: slicedData().map((item) => ({
          x: item.date,
          y: item.new_users,
          degraded: item.degraded,
        })),
      },
      {
        id: "Named Users",
        data: slicedData().map((item) => ({
          x: item.date,
          y: item.named_users,
          degraded: item.degraded,
        })),
      },
      {
        id: "Guest Users",
        data: slicedData().map((item) => ({
          x: item.date,
          y: item.guest_users,
          degraded: item.degraded,
        })),
      },
    ]
    return (
      <GridItem w={box.w} h="300" mb="4" bg={box.bg} borderRadius="xl">
        <LineChart data={result} color={color} />
      </GridItem>
    )
  }

  return (
    <GridBox box={box}>
      <Flex direction={["column", "column", "column", "row"]}>
        <Box>
          <Flex direction="column" mt="4" mx="5">
            <Box>
              <Text fontSize="2xl">
                <b>Unique Visitors </b>
              </Text>
            </Box>
            <Box>
              <Text color="gray.500" fontSize="sm">
                Unique vistors per day in the last period
              </Text>
            </Box>
          </Flex>
        </Box>
        <Spacer />
        <Box m="4">
          <AvgStat avg={avgData} data={slicedData()} color={color} />
        </Box>
      </Flex>
      <LineChartDateRange
        dateRange={dateRange}
        setDateRange={setDateRange}
        validLegnth={90}
        name="global_unique_visitors"
      />
      {chartData.length > 0 && !visitorLoading ? (
        <Box h="100%">
          <LineChartComponent box={box} res={chartData} />
        </Box>
      ) : (
        <Center h={box.h}>
          <Loading />
        </Center>
      )}
    </GridBox>
  )
}

export default UniqueVisitors
