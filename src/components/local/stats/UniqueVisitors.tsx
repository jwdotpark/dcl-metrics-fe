import {
  Text,
  Box,
  GridItem,
  Center,
  useColorModeValue,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import GridBox from "../GridBox"

import Loading from "../Loading"
import LineChart from "../../../lib/LineChart"

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

  const LineChartComponent = ({ box, res }) => {
    const result = [
      {
        id: "Unique Users",
        color: "hsl(90, 70%, 50%)",
        data: chartData.slice(0, 90).map((item) => ({
          x: item.date,
          y: item.unique_users,
        })),
      },
    ]
    return (
      <GridItem w={box.w} h="530" bg={box.bg} borderRadius="md">
        <LineChart data={result} />
      </GridItem>
    )
  }

  return (
    <>
      <GridBox box={box}>
        <Box position="relative" mt="4" mx="5" mb="1">
          <Text fontSize="xl">
            <b>Unique Visitors </b>
            <Text fontSize="sm" color="gray.500">
              Unique vistors per day in the last period
            </Text>
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
