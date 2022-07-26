import dynamic from "next/dynamic"
import { Text, Box, GridItem, Center } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import GridBox from "../GridBox"
import staticData from "../../../../public/data/unique-visitors.json"
import { fetchResult } from "../../../lib/hooks/fetch"
import Loading from "../Loading"
import LineChart from "../../../lib/LineChart"

const UniqueVisitors = ({ isLoading, setIsLoading }) => {
  const [res, setRes] = useState([])

  const box = {
    h: "500",
    w: "100%",
    bg: "white",
  }

  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      setIsLoading(true)
      const url = "api/fetch/unique-visitors"
      fetchResult(url, setRes)
      setIsLoading(false)
    } else {
      setIsLoading(true)
      // @ts-ignore
      setRes(staticData)
      setIsLoading(false)
    }
  }, [isLoading, setIsLoading])

  const LineChartComponent = ({ box, res }) => {
    const result = [
      {
        id: "Active Parcels",
        color: "hsl(90, 70%, 50%)",
        data: res.map((item) => ({
          x: item.date,
          y: item.active_parcels,
        })),
      },
    ]
    return (
      <GridItem w={box.w} h="428" bg={box.bg} borderRadius="md" boxShadow="md">
        <LineChart data={result} />
      </GridItem>
    )
  }

  return (
    <>
      <GridBox box={box}>
        <Box position="relative" mt="4" mx="5" mb="1">
          <Text fontSize="xl">
            <b>Top Visited Parcels</b>
            <Text fontSize="sm" color="gray.500">
              Parcels visited per day in the last 7 days
            </Text>
          </Text>
        </Box>
        {res.length > 0 && !isLoading ? (
          <Box mb="200">
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
