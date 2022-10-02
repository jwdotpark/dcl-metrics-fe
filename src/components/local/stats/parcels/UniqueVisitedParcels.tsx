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
import GridBox from "../../GridBox"
import LineChartDateRange from "../daterange/LineChartDateRange"
import AvgStat from "../partials/AvgStat"
import Loading from "../../Loading"
import LineChart from "../../../../lib/LineChart"

const UniqueVisitedParcels = ({ visitorLoading, data }) => {
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
      // @ts-ignore
      unique_users: item[1].active_parcels,
      // @ts-ignore
      degraded: item[1].degraded,
    })
  })

  const [dateRange, setDateRange] = useState<number>(7)

  const slicedData = () => {
    if (chartData.length - dateRange > 0) {
      return chartData.slice(chartData.length - dateRange, chartData.length)
    } else {
      return chartData
    }
  }

  const [avgData, setAvgData] = useState(0)

  useEffect(() => {
    const data = slicedData()
    const sum = slicedData().reduce((acc, cur) => acc + cur.unique_users, 0)
    const result = Math.floor(sum / data.length)
    setAvgData(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  const LineChartComponent = ({ box, res }) => {
    const color = "#CAB2D6FF"
    const result = [
      {
        id: "Parcels Visited",
        color: "hsl(90, 70%, 50%)",
        data: slicedData().map((item) => ({
          x: item.date,
          // @ts-ignore
          y: item.unique_users,
          // @ts-ignore
          degraded: item.degraded,
        })),
      },
    ]
    return (
      <GridItem w={box.w} h="300" bg={box.bg} borderRadius="md" mb="4">
        <LineChart data={result} color={color} />
      </GridItem>
    )
  }

  return (
    <>
      <GridBox box={box}>
        <Flex position="relative" mt="4" mx="5">
          <Flex w="100%">
            <Box>
              <Text fontSize="2xl">
                <b>Parcels Visited</b>
              </Text>
            </Box>
            <Spacer />
            <AvgStat avg={avgData} data={slicedData()} />
          </Flex>
        </Flex>
        <Box ml="6">
          <Text fontSize="sm" color="gray.500">
            Parcels visited per day in the last period
          </Text>
        </Box>
        <LineChartDateRange dateRange={dateRange} setDateRange={setDateRange} />
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
    </>
  )
}

export default UniqueVisitedParcels
