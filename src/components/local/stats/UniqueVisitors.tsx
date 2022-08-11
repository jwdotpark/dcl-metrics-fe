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

const UniqueVisitors = ({ res, visitorLoading }) => {
  const box = {
    h: "630",
    w: "100%",
    bg: useColorModeValue("white", "gray.800"),
  }

  const LineChartComponent = ({ box, res }) => {
    const result = [
      {
        id: "Unique Users",
        color: "hsl(90, 70%, 50%)",
        data: res.map((item) => ({
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
              Unique vistors per day in the last 7 days
            </Text>
          </Text>
        </Box>
        {res.length > 0 && !visitorLoading ? (
          <Box h="100%">
            <LineChartComponent box={box} res={res} />
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
