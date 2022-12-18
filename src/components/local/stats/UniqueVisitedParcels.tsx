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

// active_parcels
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
      active_parcels: item[1].active_parcels,
      // @ts-ignore
      degraded: item[1].degraded,
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

  const [avgData, setAvgData] = useState(0)

  useEffect(() => {
    const data = slicedData()
    const sum = slicedData().reduce((acc, cur) => acc + cur.active_parcels, 0)
    const result = Math.floor(sum / data.length)
    setAvgData(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  const color = ["#CAB2D6FF"]

  const LineChartComponent = ({ box, res }) => {
    const result = [
      {
        id: "Parcels Visited",
        color: "hsl(90, 70%, 50%)",
        data: slicedData().map((item) => ({
          x: item.date,
          // @ts-ignore
          y: item.active_parcels,
          // @ts-ignore
          degraded: item.degraded,
        })),
      },
    ]
    return (
      <GridItem w={box.w} h="300" mb="4" bg={box.bg} borderRadius="xl">
        <LineChart data={result} color={color} name="uniqueVisitedParcels" />
      </GridItem>
    )
  }

  return (
    <>
      <GridBox box={box}>
        <Flex pos="relative" mt="4" mx="5">
          <Flex w="100%">
            <Box>
              <Text fontSize="2xl">
                <b>Parcels Visited</b>
              </Text>
            </Box>
            <Spacer />
            <AvgStat avg={avgData} data={slicedData()} color={color} />
          </Flex>
        </Flex>
        <Box ml="6">
          <Text color="gray.500" fontSize="sm">
            Parcels visited per day in the last period
          </Text>
        </Box>
        <LineChartDateRange
          dateRange={dateRange}
          setDateRange={setDateRange}
          validLegnth={90}
          name="global_parcels_visited"
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
    </>
  )
}

export default UniqueVisitedParcels
