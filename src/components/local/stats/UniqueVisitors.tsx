import {
  Flex,
  Text,
  Box,
  GridItem,
  Center,
  useColorModeValue,
  Spacer,
} from "@chakra-ui/react"
import { useState } from "react"
import GridBox from "../GridBox"
import LineChartDateRange from "../LineChartDateRange"
import Loading from "../Loading"
import LineChart from "../../../lib/LineChart"

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
      // @ts-ignore
      unique_users: item[1].unique_users,
    })
  })

  const [dateRange, setDateRange] = useState<number>(14)

  const LineChartComponent = ({ box, res }) => {
    const color = "#A6CEE3FF"
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
      <GridItem w={box.w} h="530" bg={box.bg} borderRadius="md" mb="4">
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
                <b>Unique Visitors </b>
              </Text>
            </Box>
          </Flex>
        </Flex>
        <Box ml="6">
          <Text fontSize="sm" color="gray.500">
            Unique vistors per day in the last period
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

export default UniqueVisitors
