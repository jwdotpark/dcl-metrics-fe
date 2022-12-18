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
import moment from "moment"
import GridBox from "../GridBox"
import LineChartDateRange from "./daterange/LineChartDateRange"
import AvgStat from "./partials/AvgStat"
import Loading from "../Loading"
import LineChart from "../../../lib/LineChart"

// active_scenes
const ActiveScenes = ({ visitorLoading, data }) => {
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
      // if active_scenes is undefined, set it to 0
      // @ts-ignore
      active_scenes: item[1].active_scenes ? item[1].active_scenes : 0,
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
    const sum = slicedData().reduce((acc, cur) => acc + cur.active_scenes, 0)
    const result = Math.floor(sum / data.length)
    setAvgData(result)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateRange])

  // get the length of the array that active_scenes is not 0
  const validLegnth = chartData.filter(
    (item) => item.active_scenes !== 0
  ).length

  const color = ["#ffb86c"]

  const date = {
    first: moment(slicedData()[0].date).format("MMM. D"),
    last: moment(slicedData()[slicedData().length - 1].date).format("MMM. D"),
  }

  const LineChartComponent = ({ box, res }) => {
    const result = [
      {
        id: "Active Scenes",
        color: "hsl(90, 70%, 50%)",
        data: slicedData().map((item) => ({
          x: item.date,
          // @ts-ignore
          y: item.active_scenes,
          // @ts-ignore
          degraded: item.degraded,
        })),
      },
    ]
    return (
      <GridItem w={box.w} h="300" mb="4" bg={box.bg} borderRadius="xl">
        <LineChart data={result} color={color} name="activeScenes" />
      </GridItem>
    )
  }

  return (
    <>
      <GridBox box={box}>
        <Box>
          <Flex direction="row" mt="4" mx="5">
            <Flex direction="column">
              <Box>
                <Text fontSize="2xl">
                  <b>Scenes Visited </b>
                </Text>
              </Box>
              <Box>
                <Text color="gray.500" fontSize="sm">
                  Scenes visited from {date.first} to {date.last}
                </Text>
              </Box>
            </Flex>
            <Spacer />
            <Box>
              <AvgStat avg={avgData} data={slicedData()} color={color} />
            </Box>
          </Flex>
        </Box>
        <LineChartDateRange
          dateRange={dateRange}
          setDateRange={setDateRange}
          validLegnth={validLegnth}
          name="global_scenes_visited"
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

export default ActiveScenes
