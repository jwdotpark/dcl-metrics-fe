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
import LineChartDateRange from "../LineChartDateRange"
import Loading from "../Loading"
import LineChart from "../../../lib/LineChart"
import SliderLineChart from "../SliderLineChart"

const UniqueVisitors = ({ visitorLoading, data }) => {
  const box = {
    h: "630",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const chartData = []
  const dataArr = Object.entries(data)

  dataArr.map((item) => {
    chartData.push({
      date: item[0],
      // @ts-ignore
      unique_users: item[1].unique_users,
    })
  })

  const [dateRange, setDateRange] = useState<number>(7)

  const LineChartComponent = ({ box, res }) => {
    const result = [
      {
        id: "Unique Users",
        color: "hsl(90, 70%, 50%)",
        data: chartData
          .slice(dataArr.length - dateRange, dataArr.length)
          .map((item) => ({
            x: item.date,
            y: item.unique_users,
          })),
      },
    ]
    return (
      <GridItem w={box.w} h="530" bg={box.bg} borderRadius="md">
        <LineChart data={result} dateRange={dateRange} />
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
                <b>Unique Visitors </b>
              </Text>
            </Box>
            <Spacer />
            <LineChartDateRange
              dateRange={dateRange}
              setDateRange={setDateRange}
            />
          </Flex>
        </Flex>
        <Box ml="6">
          <Text fontSize="sm" color="gray.500">
            Unique vistors per day in the last period
          </Text>
        </Box>
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

export default UniqueVisitors
